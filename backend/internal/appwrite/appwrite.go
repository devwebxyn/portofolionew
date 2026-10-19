// Package appwrite is a minimal REST client for Appwrite (Databases + Storage).
// ponytail: covers only the calls this backend needs; swap for the official
// sdk-for-go if the Appwrite surface grows.
package appwrite

import (
	"bytes"
	"encoding/json"
	"fmt"
	"io"
	"mime/multipart"
	"net/http"
	"net/url"
	"os"
	"strings"
)

// Doc is a raw Appwrite document, passed through to the API untouched.
type Doc = json.RawMessage

// Q builds an Appwrite v2 query in JSON-object form, e.g.
// {"method":"equal","attribute":"username","values":["admin"]}.
// The old string form `equal("username", ["admin"])` is rejected by
// Appwrite >= 2.5.0 ("Invalid query: Syntax error").
func Q(method, attribute string, values any) string {
	m := map[string]any{"method": method}
	if attribute != "" {
		m["attribute"] = attribute
	}
	if values != nil {
		m["values"] = values
	}
	b, _ := json.Marshal(m)
	return string(b)
}

type Client struct {
	Endpoint string
	Project  string
	Key      string
	DBID     string
	Col      map[string]string
	Bucket   string
	hc       *http.Client
}

func New() (*Client, error) {
	c := &Client{
		Endpoint: strings.TrimRight(os.Getenv("APPWRITE_ENDPOINT"), "/"),
		Project:  os.Getenv("APPWRITE_PROJECT_ID"),
		Key:      os.Getenv("APPWRITE_API_KEY"),
		DBID:     os.Getenv("APPWRITE_DATABASE_ID"),
		Col: map[string]string{
			"projects": os.Getenv("APPWRITE_COLLECTION_PROJECTS"),
			"admins":   "admins",
			"taxonomy": "taxonomy",
			"messages": "messages",
		},
		Bucket: "project-images",
		hc:     &http.Client{},
	}
	if c.Endpoint == "" || c.Project == "" || c.Key == "" || c.DBID == "" || c.Col["projects"] == "" {
		return nil, fmt.Errorf("appwrite: missing env (need APPWRITE_ENDPOINT, APPWRITE_PROJECT_ID, APPWRITE_API_KEY, APPWRITE_DATABASE_ID, APPWRITE_COLLECTION_PROJECTS)")
	}
	return c, nil
}

func (c *Client) docsURL(col string) string {
	return fmt.Sprintf("%s/databases/%s/collections/%s/documents", c.Endpoint, c.DBID, c.Col[col])
}

func (c *Client) ListDocuments(col string, queries []string) ([]Doc, error) {
	u := c.docsURL(col)
	if len(queries) > 0 {
		var sb strings.Builder
		sb.WriteString(u)
		sb.WriteString("?")
		for i, q := range queries {
			if i > 0 {
				sb.WriteString("&")
			}
			sb.WriteString("queries[]=")
			sb.WriteString(url.QueryEscape(q))
		}
		u = sb.String()
	}
	var out struct {
		Documents []Doc `json:"documents"`
	}
	if err := c.do(http.MethodGet, u, nil, &out); err != nil {
		return nil, err
	}
	return out.Documents, nil
}

func (c *Client) CreateDocument(col string, data map[string]any) (Doc, error) {
	var out Doc
	err := c.do(http.MethodPost, c.docsURL(col), map[string]any{"documentId": "unique()", "data": data}, &out)
	return out, err
}

func (c *Client) GetDocument(col, id string) (Doc, error) {
	var out Doc
	err := c.do(http.MethodGet, c.docsURL(col)+"/"+url.PathEscape(id), nil, &out)
	return out, err
}

func (c *Client) UpdateDocument(col, id string, data map[string]any) error {
	return c.do(http.MethodPatch, c.docsURL(col)+"/"+url.PathEscape(id), map[string]any{"data": data}, nil)
}

func (c *Client) DeleteDocument(col, id string) error {
	return c.do(http.MethodDelete, c.docsURL(col)+"/"+url.PathEscape(id), nil, nil)
}

// UploadFile stores a file in a storage bucket and returns its file ID.
func (c *Client) UploadFile(bucket, filename string, data []byte, mime string) (string, error) {
	var buf bytes.Buffer
	mw := multipart.NewWriter(&buf)
	if err := mw.WriteField("fileId", "unique()"); err != nil {
		return "", err
	}
	fw, err := mw.CreateFormFile("file", filename)
	if err != nil {
		return "", err
	}
	if _, err := fw.Write(data); err != nil {
		return "", err
	}
	if err := mw.Close(); err != nil {
		return "", err
	}
	u := fmt.Sprintf("%s/storage/buckets/%s/files", c.Endpoint, bucket)
	req, err := http.NewRequest(http.MethodPost, u, &buf)
	if err != nil {
		return "", err
	}
	req.Header.Set("X-Appwrite-Project", c.Project)
	req.Header.Set("X-Appwrite-Key", c.Key)
	req.Header.Set("Content-Type", mw.FormDataContentType())
	resp, err := c.hc.Do(req)
	if err != nil {
		return "", err
	}
	defer resp.Body.Close()
	b, err := io.ReadAll(resp.Body)
	if err != nil {
		return "", err
	}
	if resp.StatusCode >= 300 {
		return "", fmt.Errorf("appwrite upload -> %d: %s", resp.StatusCode, string(b))
	}
	var out struct {
		ID string `json:"$id"`
	}
	if err := json.Unmarshal(b, &out); err != nil {
		return "", err
	}
	return out.ID, nil
}

func (c *Client) do(method, u string, bodyIn any, out any) error {
	var body io.Reader
	if bodyIn != nil {
		b, err := json.Marshal(bodyIn)
		if err != nil {
			return err
		}
		body = bytes.NewReader(b)
	}
	req, err := http.NewRequest(method, u, body)
	if err != nil {
		return err
	}
	req.Header.Set("X-Appwrite-Project", c.Project)
	req.Header.Set("X-Appwrite-Key", c.Key)
	req.Header.Set("Content-Type", "application/json")
	resp, err := c.hc.Do(req)
	if err != nil {
		return err
	}
	defer resp.Body.Close()
	b, err := io.ReadAll(resp.Body)
	if err != nil {
		return err
	}
	if resp.StatusCode >= 300 {
		return fmt.Errorf("appwrite %s %s -> %d: %s", method, u, resp.StatusCode, strings.TrimSpace(string(b)))
	}
	if out != nil {
		return json.Unmarshal(b, out)
	}
	return nil
}
