// Standalone server for local dev / non-Vercel hosting.
// Deploying to Vercel? Ignore this; Vercel uses the functions in /api instead.
package main

import (
	"log"
	"net/http"
	"os"

	"portfolio-backend/internal/server"
)

func main() {
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
