package server

import (
	"crypto/tls"
	"fmt"
	"net"
	"net/smtp"
	"strings"
)

// smtpSend sends a plain-text email via SMTP, supporting both implicit TLS
// (SMTP_SECURE=true, port 465) and STARTTLS (default, port 587).
func smtpSend(c SMTPConfig, port int, to, subject, body string) error {
	addr := net.JoinHostPort(c.Host, fmt.Sprint(port))
	var conn net.Conn
	var err error
	if c.Secure {
		conn, err = tls.Dial("tcp", addr, &tls.Config{ServerName: c.Host})
	} else {
		conn, err = net.Dial("tcp", addr)
	}
	if err != nil {
		return err
	}
	client, err := smtp.NewClient(conn, c.Host)
	if err != nil {
		conn.Close()
		return err
	}
	defer client.Close()
	if !c.Secure {
		if err := client.StartTLS(&tls.Config{ServerName: c.Host}); err != nil {
			return err
		}
	}
	if err := client.Auth(smtp.PlainAuth("", c.User, c.Pass, c.Host)); err != nil {
		return err
	}
	from := c.From
	if from == "" {
		from = c.User
	}
	if err := client.Mail(from); err != nil {
		return err
	}
	if err := client.Rcpt(to); err != nil {
		return err
	}
	w, err := client.Data()
	if err != nil {
		return err
	}
	msg := "From: " + from + "\r\n" +
		"To: " + to + "\r\n" +
		"Subject: " + encodeSubject(subject) + "\r\n" +
		"MIME-Version: 1.0\r\n" +
		"Content-Type: text/plain; charset=UTF-8\r\n" +
		"\r\n" + body
	if _, err := w.Write([]byte(msg)); err != nil {
		return err
	}
	return w.Close()
}

// encodeSubject wraps long/non-ASCII subjects (RFC 2047) so UTF-8 subjects survive.
func encodeSubject(s string) string {
	if len(s) > 60 || !isASCII(s) {
		return "=?UTF-8?B?" + base64Encode([]byte(s)) + "?="
	}
	return s
}

func isASCII(s string) bool {
	for _, c := range s {
		if c > 127 {
			return false
		}
	}
	return true
}

func base64Encode(b []byte) string {
	const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/"
	var sb strings.Builder
	for i := 0; i < len(b); i += 3 {
		var chunk [3]byte
		n := copy(chunk[:], b[i:])
		sb.WriteByte(chars[chunk[0]>>2])
		sb.WriteByte(chars[(chunk[0]&0x03)<<4|chunk[1]>>4])
		if n > 1 {
			sb.WriteByte(chars[(chunk[1]&0x0f)<<2|chunk[2]>>6])
		} else {
			sb.WriteByte('=')
		}
		if n > 2 {
			sb.WriteByte(chars[chunk[2]&0x3f])
		} else {
			sb.WriteByte('=')
		}
	}
	return sb.String()
}
