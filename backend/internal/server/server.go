// Package server implements the portfolio HTTP API (migrated from the legacy
// Express backend). Handlers are shared by the standalone cmd/server binary and
// the thin Vercel functions in /api.
package server

import (
	"encoding/json"
	"fmt"
	"mime/multipart"
	"net/http"
	"os"
	"regexp"
	"strings"
	"time"

	"github.com/golang-jwt/jwt/v5"
	"golang.org/x/crypto/bcrypt"

	"portfolio-backend/internal/appwrite"
)

type Server struct {
	db   *appwrite.Client
	hc   *http.Client
	conf *Config
}

type Config struct {
	JWTSecret string
	Origins   []*regexp.Regexp
}

func NewFromEnv() (*Server, error) {
	db, err := appwrite.New()
	if err != nil {
		return nil, err
	}
	return &Server{
		db: db,
		hc: &http.Client{Timeout: 30 * time.Second},
		conf: &Config{
			JWTSecret: os.Getenv("JWT_SECRET"),
			Origins:   parseOrigins(),
		},
	}, nil
}

func parseOrigins() []*regexp.Regexp {
	// Always allow any localhost origin (dev); plus explicit origins from env.
	patterns := []string{`^http://localhost:\d+$`}
	for _, env := range []string{"ALLOWED_ORIGINS", "FRONTEND_ORIGIN", "NEXT_PUBLIC_SITE_URL"} {
		if v := os.Getenv(env); v != "" {
			patterns = append(patterns, v)
		}
	}
	var out []*regexp.Regexp
	for _, p := range patterns {
		if re, err := regexp.Compile(strings.TrimSpace(p)); err == nil {
			out = append(out, re)
		}
	}
	return out
}

// WithCORS applies the shared CORS policy (mirrors the legacy Express config).
func (s *Server) WithCORS(h http.HandlerFunc) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		origin := r.Header.Get("Origin")
		if origin != "" && s.originAllowed(origin) {
			w.Header().Set("Access-Control-Allow-Origin", origin)
			w.Header().Set("Access-Control-Allow-Credentials", "true")
			w.Header().Set("Access-Control-Allow-Methods", "GET, POST, OPTIONS")
			w.Header().Set("Access-Control-Allow-Headers", "Content-Type, Authorization")
			w.Header().Set("Vary", "Origin")
		}
		if r.Method == http.MethodOptions {
			w.WriteHeader(http.StatusNoContent)
			return
		}
		h(w, r)
	}
}

func (s *Server) originAllowed(origin string) bool {
	for _, re := range s.conf.Origins {
		if re.MatchString(origin) {
			return true
		}
	}
	return false
}

// ---- JSON helpers ----
func writeJSON(w http.ResponseWriter, status int, v any) {
	w.Header().Set("Content-Type", "application/json; charset=utf-8")
	w.WriteHeader(status)
	_ = json.NewEncoder(w).Encode(v)
}

func errJSON(w http.ResponseWriter, status int, msg string) {
	writeJSON(w, status, map[string]any{"ok": false, "error": msg})
}

func okJSON(w http.ResponseWriter, status int, extra map[string]any) {
	m := map[string]any{"ok": true}
	for k, v := range extra {
		m[k] = v
	}
	writeJSON(w, status, m)
}

// ---- Auth (JWT) ----
func (s *Server) sign(payload jwt.MapClaims) (string, error) {
	payload["iat"] = time.Now().Unix()
	payload["exp"] = time.Now().Add(2 * time.Hour).Unix()
	return jwt.NewWithClaims(jwt.SigningMethodHS256, payload).SignedString([]byte(s.conf.JWTSecret))
}

func (s *Server) token(r *http.Request) string {
	if c, err := r.Cookie("auth"); err == nil && c.Value != "" {
		return c.Value
	}
	if h := r.Header.Get("Authorization"); strings.HasPrefix(h, "Bearer ") {
		return strings.TrimPrefix(h, "Bearer ")
	}
	return ""
}

func (s *Server) claims(tok string) jwt.MapClaims {
	if tok == "" || s.conf.JWTSecret == "" {
		return nil
	}
	parsed, err := jwt.Parse(tok, func(t *jwt.Token) (any, error) {
		if _, ok := t.Method.(*jwt.SigningMethodHMAC); !ok {
			return nil, fmt.Errorf("unexpected signing method")
		}
		return []byte(s.conf.JWTSecret), nil
	})
	if err != nil || !parsed.Valid {
		return nil
	}
	if c, ok := parsed.Claims.(jwt.MapClaims); ok {
		return c
	}
	return nil
}

// requireAuth runs h only when a valid token is present.
func (s *Server) requireAuth(h func(w http.ResponseWriter, r *http.Request)) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		c := s.claims(s.token(r))
		if c == nil {
			errJSON(w, http.StatusUnauthorized, "Unauthorized")
			return
		}
		h(w, r)
	}
}

// ---- Health ----
func (s *Server) HandleHealth(w http.ResponseWriter, r *http.Request) {
	writeJSON(w, http.StatusOK, map[string]any{"ok": true, "service": "portfolio-backend"})
}

// ---- Public: projects ----
func (s *Server) HandleProjects(w http.ResponseWriter, r *http.Request) {
	items, err := s.db.ListDocuments("projects", nil)
	if err != nil {
		errJSON(w, http.StatusInternalServerError, err.Error())
		return
	}
	writeJSON(w, http.StatusOK, map[string]any{"ok": true, "items": items})
}

// ---- Public: contact ----
func (s *Server) HandleContactMessages(w http.ResponseWriter, r *http.Request) {
	var in struct {
		Subject     string `json:"subject"`
		SenderEmail string `json:"senderEmail"`
		Message     string `json:"message"`
	}
	if err := json.NewDecoder(r.Body).Decode(&in); err != nil {
		errJSON(w, http.StatusBadRequest, "Body JSON tidak valid")
		return
	}
	if in.Subject == "" || in.SenderEmail == "" || in.Message == "" {
		errJSON(w, http.StatusBadRequest, "Semua field wajib diisi")
		return
	}
	emailRe := regexp.MustCompile(`^[^\s@]+@[^\s@]+\.[^\s@]+$`)
	if !emailRe.MatchString(in.SenderEmail) {
		errJSON(w, http.StatusBadRequest, "Format email tidak valid")
		return
	}
	doc, err := s.db.CreateDocument("messages", map[string]any{
		"subject":     in.Subject,
		"senderEmail": in.SenderEmail,
		"body":        in.Message,
		"createdAt":   time.Now().UTC().Format(time.RFC3339),
	})
	if err != nil {
		errJSON(w, http.StatusInternalServerError, err.Error())
		return
	}
	// Best-effort: status attribute may not exist yet on a fresh collection.
	if err := s.db.UpdateDocument("messages", string(docID(doc)), map[string]any{"status": "unread"}); err != nil {
		// ignore attribute readiness errors
	}
	okJSON(w, http.StatusCreated, map[string]any{"id": string(docID(doc))})
}

// ---- Admin: auth ----
func (s *Server) HandleLogin(w http.ResponseWriter, r *http.Request) {
	var in struct {
		Username string `json:"username"`
		Password string `json:"password"`
	}
	if err := json.NewDecoder(r.Body).Decode(&in); err != nil {
		errJSON(w, http.StatusBadRequest, "Body JSON tidak valid")
		return
	}
	if in.Username == "" || in.Password == "" {
		errJSON(w, http.StatusBadRequest, "Username dan password wajib diisi")
		return
	}
	docs, err := s.db.ListDocuments("admins", []string{appwrite.Q("equal", "username", []string{in.Username})})
	if err != nil {
		errJSON(w, http.StatusInternalServerError,
			"Gagal memeriksa kredensial. Pastikan collection 'admins' dan koneksi Appwrite benar.")
		return
	}
	if len(docs) == 0 {
		errJSON(w, http.StatusUnauthorized, "Username atau password salah")
		return
	}
	var u struct {
		PasswordHash string `json:"passwordHash"`
	}
	_ = json.Unmarshal(docs[0], &u)
	if bcrypt.CompareHashAndPassword([]byte(u.PasswordHash), []byte(in.Password)) != nil {
		errJSON(w, http.StatusUnauthorized, "Username atau password salah")
		return
	}
	tok, err := s.sign(jwt.MapClaims{"username": in.Username})
	if err != nil {
		errJSON(w, http.StatusInternalServerError, err.Error())
		return
	}
	okJSON(w, http.StatusOK, map[string]any{"username": in.Username, "token": tok})
}

func (s *Server) HandleLogout(w http.ResponseWriter, r *http.Request) {
	okJSON(w, http.StatusOK, nil)
}

func (s *Server) HandleMe(w http.ResponseWriter, r *http.Request) {
	c := s.claims(s.token(r))
	if c == nil {
		errJSON(w, http.StatusUnauthorized, "Unauthorized")
		return
	}
	u, _ := c["username"].(string)
	okJSON(w, http.StatusOK, map[string]any{"username": u})
}

// ---- Admin: projects ----
func (s *Server) HandleAdminProjects(w http.ResponseWriter, r *http.Request) {
	switch r.Method {
	case http.MethodGet:
		s.listAdminProjects(w, r)
	case http.MethodPost:
		s.createProject(w, r)
	default:
		errJSON(w, http.StatusMethodNotAllowed, "Method not allowed")
	}
}

func (s *Server) listAdminProjects(w http.ResponseWriter, r *http.Request) {
	items, err := s.db.ListDocuments("projects", nil)
	if err != nil {
		errJSON(w, http.StatusInternalServerError, err.Error())
		return
	}
	writeJSON(w, http.StatusOK, map[string]any{"ok": true, "items": items})
}

type projectForm struct {
	ID          string
	Title       string
	Description string
	Tags        []string
	LiveURL     string
	GithubURL   string
	Category    string
	Language    string
}

func parseProjectForm(w http.ResponseWriter, r *http.Request) (projectForm, *multipart.FileHeader, bool) {
	if err := r.ParseMultipartForm(10 << 20); err != nil { // 10 MB
		errJSON(w, http.StatusBadRequest, "Multipart tidak valid: "+err.Error())
		return projectForm{}, nil, false
	}
	pf := projectForm{
		ID:          r.FormValue("id"),
		Title:       r.FormValue("title"),
		Description: r.FormValue("description"),
		LiveURL:     r.FormValue("liveUrl"),
		GithubURL:   r.FormValue("githubUrl"),
		Category:    r.FormValue("category"),
		Language:    r.FormValue("language"),
	}
	for _, t := range strings.Split(r.FormValue("tags"), ",") {
		if s := strings.TrimSpace(t); s != "" {
			pf.Tags = append(pf.Tags, s)
		}
	}
	var file *multipart.FileHeader
	if f, h, err := r.FormFile("image"); err == nil {
		_ = f.Close()
		file = h
	}
	return pf, file, true
}

func (s *Server) createProject(w http.ResponseWriter, r *http.Request) {
	pf, file, ok := parseProjectForm(w, r)
	if !ok {
		return
	}
	data := map[string]any{
		"title":       pf.Title,
		"description": pf.Description,
		"tags":        pf.Tags,
		"liveUrl":     pf.LiveURL,
		"githubUrl":   pf.GithubURL,
		"category":    pf.Category,
		"language":    pf.Language,
		"createdAt":   time.Now().UTC().Format(time.RFC3339),
	}
	if file != nil {
		id, imageURL, err := s.upload(w, file)
		if err != nil {
			return
		}
		data["imageId"] = id
		data["imageUrl"] = imageURL
	}
	if _, err := s.db.CreateDocument("projects", data); err != nil {
		errJSON(w, http.StatusInternalServerError, err.Error())
		return
	}
	okJSON(w, http.StatusOK, nil)
}

func (s *Server) HandleAdminProjectUpdate(w http.ResponseWriter, r *http.Request) {
	pf, file, ok := parseProjectForm(w, r)
	if !ok {
		return
	}
	if pf.ID == "" {
		errJSON(w, http.StatusBadRequest, "id wajib diisi")
		return
	}
	data := map[string]any{
		"title":       pf.Title,
		"description": pf.Description,
		"tags":        pf.Tags,
		"liveUrl":     pf.LiveURL,
		"githubUrl":   pf.GithubURL,
		"category":    pf.Category,
		"language":    pf.Language,
	}
	if file != nil {
		id, imageURL, err := s.upload(w, file)
		if err != nil {
			return
		}
		data["imageId"] = id
		data["imageUrl"] = imageURL
	}
	if err := s.db.UpdateDocument("projects", pf.ID, data); err != nil {
		errJSON(w, http.StatusInternalServerError, err.Error())
		return
	}
	okJSON(w, http.StatusOK, nil)
}

func (s *Server) HandleAdminProjectDelete(w http.ResponseWriter, r *http.Request) {
	var in struct {
		ID string `json:"id"`
	}
	if err := json.NewDecoder(r.Body).Decode(&in); err != nil || in.ID == "" {
		errJSON(w, http.StatusBadRequest, "id wajib diisi")
		return
	}
	if err := s.db.DeleteDocument("projects", in.ID); err != nil {
		errJSON(w, http.StatusInternalServerError, err.Error())
		return
	}
	okJSON(w, http.StatusOK, nil)
}

func (s *Server) upload(w http.ResponseWriter, file *multipart.FileHeader) (string, string, error) {
	f, err := file.Open()
	if err != nil {
		errJSON(w, http.StatusBadRequest, "Gagal baca file: "+err.Error())
		return "", "", err
	}
	defer f.Close()
	buf := make([]byte, file.Size)
	if _, err := f.Read(buf); err != nil {
		errJSON(w, http.StatusBadRequest, "Gagal baca file: "+err.Error())
		return "", "", err
	}
	id, err := s.db.UploadFile(s.db.Bucket, file.Filename, buf, file.Header.Get("Content-Type"))
	if err != nil {
		errJSON(w, http.StatusInternalServerError, err.Error())
		return "", "", err
	}
	viewURL := fmt.Sprintf("%s/storage/buckets/%s/files/%s/view?project=%s",
		s.db.Endpoint, s.db.Bucket, id, s.db.Project)
	return id, viewURL, nil
}

// ---- Admin: messages ----
func (s *Server) HandleAdminMessages(w http.ResponseWriter, r *http.Request) {
	queries := []string{appwrite.Q("orderDesc", "$createdAt", nil)}
	items, err := s.db.ListDocuments("messages", queries)
	if err != nil {
		// Fallback without ordering if the index/attribute isn't ready yet.
		items, err = s.db.ListDocuments("messages", nil)
	}
	if err != nil {
		errJSON(w, http.StatusInternalServerError, err.Error())
		return
	}
	writeJSON(w, http.StatusOK, map[string]any{"ok": true, "items": items})
}

func (s *Server) HandleAdminMessageRead(w http.ResponseWriter, r *http.Request) {
	var in struct {
		ID string `json:"id"`
	}
	if err := json.NewDecoder(r.Body).Decode(&in); err != nil || in.ID == "" {
		errJSON(w, http.StatusBadRequest, "id wajib diisi")
		return
	}
	// Best-effort: status attribute may not exist yet.
	if err := s.db.UpdateDocument("messages", in.ID, map[string]any{"status": "read"}); err != nil {
		// ignore attribute readiness errors
	}
	okJSON(w, http.StatusOK, nil)
}

func (s *Server) HandleAdminMessageReply(w http.ResponseWriter, r *http.Request) {
	var in struct {
		OriginalMessageID string `json:"originalMessageId"`
		ReplyContent      string `json:"replyContent"`
	}
	if err := json.NewDecoder(r.Body).Decode(&in); err != nil || in.OriginalMessageID == "" || in.ReplyContent == "" {
		errJSON(w, http.StatusBadRequest, "Data tidak lengkap")
		return
	}
	// SMTP removed — reply hanya dicatat sebagai balasan, tidak dikirim email.
	if err := s.db.UpdateDocument("messages", in.OriginalMessageID, map[string]any{
		"status":       "replied",
		"repliedAt":    time.Now().UTC().Format(time.RFC3339),
		"replyContent": in.ReplyContent,
	}); err != nil {
		errJSON(w, http.StatusInternalServerError, err.Error())
		return
	}
	okJSON(w, http.StatusOK, nil)
}

// docID extracts the $id from a raw Appwrite document.
func docID(doc appwrite.Doc) string {
	var m struct {
		ID string `json:"$id"`
	}
	_ = json.Unmarshal(doc, &m)
	return m.ID
}

// Router returns the full mux used by the standalone server.
func (s *Server) Router() http.Handler {
	mux := http.NewServeMux()
	mux.HandleFunc("GET /", s.WithCORS(s.HandleHealth))
	mux.HandleFunc("GET /api/health", s.WithCORS(s.HandleHealth))
	mux.HandleFunc("GET /api/projects", s.WithCORS(s.HandleProjects))
	mux.HandleFunc("POST /api/contact-messages", s.WithCORS(s.HandleContactMessages))
	mux.HandleFunc("POST /api/admin/login", s.WithCORS(s.HandleLogin))
	mux.HandleFunc("POST /api/admin/logout", s.WithCORS(s.HandleLogout))
	mux.HandleFunc("GET /api/admin/me", s.WithCORS(s.requireAuth(s.HandleMe)))
	mux.HandleFunc("GET /api/admin/projects", s.WithCORS(s.requireAuth(s.HandleAdminProjects)))
	mux.HandleFunc("POST /api/admin/projects", s.WithCORS(s.requireAuth(s.HandleAdminProjects)))
	mux.HandleFunc("POST /api/admin/projects/update", s.WithCORS(s.requireAuth(s.HandleAdminProjectUpdate)))
	mux.HandleFunc("POST /api/admin/projects/delete", s.WithCORS(s.requireAuth(s.HandleAdminProjectDelete)))
	mux.HandleFunc("GET /api/admin/messages", s.WithCORS(s.requireAuth(s.HandleAdminMessages)))
	mux.HandleFunc("POST /api/admin/messages/read", s.WithCORS(s.requireAuth(s.HandleAdminMessageRead)))
	mux.HandleFunc("POST /api/admin/messages/reply", s.WithCORS(s.requireAuth(s.HandleAdminMessageReply)))
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		if r.Method == http.MethodOptions {
			// Method-specific mux patterns don't match OPTIONS; answer preflights here.
			s.WithCORS(func(http.ResponseWriter, *http.Request) {})(w, r)
			return
		}
		mux.ServeHTTP(w, r)
	})
}
