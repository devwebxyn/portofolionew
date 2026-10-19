package server

import (
	"encoding/json"
	"net/http/httptest"
	"testing"
)

func newTestServer() *Server {
	return &Server{conf: &Config{JWTSecret: "test-secret"}}
}

func TestBase64(t *testing.T) {
	if got := base64Encode([]byte("hello")); got != "aGVsbG8=" {
		t.Fatalf("base64(hello) = %q", got)
	}
}

func TestEncodeSubject(t *testing.T) {
	if got := encodeSubject("Re: Hello"); got != "Re: Hello" {
		t.Fatalf("short ascii subject changed: %q", got)
	}
	for _, s := range []string{"Re: Pembaruan proyek — batas 60 karakter lebih", "replý nonascii"} {
		if !isASCII(encodeSubject(s)) {
			t.Fatalf("encodeSubject(%q) not pure ascii: %q", s, encodeSubject(s))
		}
	}
}

func TestOriginAllowed(t *testing.T) {
	s := newTestServer()
	s.conf.Origins = parseOrigins() // localhost regex always allowed
	for _, o := range []string{"http://localhost:3000", "http://localhost:9999"} {
		if !s.originAllowed(o) {
			t.Fatalf("origin %q should be allowed", o)
		}
	}
	if s.originAllowed("https://evil.com") {
		t.Fatal("evil origin should be rejected")
	}
}

func TestSignVerify(t *testing.T) {
	s := newTestServer()
	tok, err := s.sign(map[string]any{"username": "sam"})
	if err != nil {
		t.Fatal(err)
	}
	claims := s.claims(tok)
	if claims == nil {
		t.Fatal("claims nil for valid token")
	}
	if u, _ := claims["username"].(string); u != "sam" {
		t.Fatalf("username = %q", u)
	}
	if s.claims("garbage") != nil {
		t.Fatal("garbage token should be rejected")
	}
}

func TestDocID(t *testing.T) {
	doc, _ := json.Marshal(map[string]any{"$id": "abc123", "title": "x"})
	if id := docID(doc); id != "abc123" {
		t.Fatalf("docID = %q", id)
	}
}

// TestRoutesUnauthed proves admin endpoints 401 without a token (auth boundary).
func TestRoutesUnauthed(t *testing.T) {
	s := newTestServer()
	rec := httptest.NewRecorder()
	s.Router().ServeHTTP(rec, httptest.NewRequest("GET", "/api/admin/messages", nil))
	if rec.Code != 401 {
		t.Fatalf("admin without token: got %d, want 401", rec.Code)
	}
}
