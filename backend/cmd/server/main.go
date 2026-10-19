// Standalone server for local dev / non-Vercel hosting.
// Deploying to Vercel? Ignore this; Vercel injects env vars directly.
package main

import (
	"log"
	"net/http"
	"os"
	"strings"

	"portfolio-backend/internal/server"
)

func main() {
	loadEnv()
	srv, err := server.NewFromEnv()
	if err != nil {
		log.Fatal(err)
	}
	port := os.Getenv("PORT")
	if port == "" {
		port = "4000"
	}
	log.Printf("[backend] listening on http://localhost:%s", port)
	if err := http.ListenAndServe(":"+port, srv.Router()); err != nil {
		log.Fatal(err)
	}
}

// loadEnv reads KEY=VALUE lines from .env (local dev only). Existing env vars
// win, so shell/Vercel env is never overridden.
func loadEnv() {
	b, err := os.ReadFile(".env")
	if err != nil {
		return
	}
	for _, line := range strings.Split(string(b), "\n") {
		line = strings.TrimSpace(line)
		if line == "" || strings.HasPrefix(line, "#") {
			continue
		}
		k, v, ok := strings.Cut(line, "=")
		if !ok {
			continue
		}
		if _, exists := os.LookupEnv(k); !exists {
			os.Setenv(k, strings.Trim(v, `"'`))
		}
	}
}
