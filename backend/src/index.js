import 'dotenv/config';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import jwt from 'jsonwebtoken';
import { Client, Databases, ID, Storage, Query } from 'node-appwrite';
import nodemailer from 'nodemailer';
import multer from 'multer';
import bcrypt from 'bcryptjs';

const app = express();
const PORT = process.env.PORT || 4000;

// Middlewares
app.use(morgan('dev'));
// CORS: allow localhost in dev and production frontends
const allowedOrigins = [
  /^http:\/\/localhost:\d+$/,
  'https://samuelindrabastian.me',
  'https://www.samuelindrabastian.me',
  process.env.FRONTEND_ORIGIN,
  process.env.NEXT_PUBLIC_SITE_URL,
].filter(Boolean);

app.use(
  cors({
    origin(origin, callback) {
      if (!origin) return callback(null, true); // same-origin or curl
      const ok = allowedOrigins.some((o) => (typeof o === 'string' ? o === origin : o.test(origin)));
      if (ok) return callback(null, true);
      return callback(new Error(`Not allowed by CORS: ${origin}`));
    },
    credentials: true,
  })
);
// Handle preflight
app.options('*', cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.set('view engine', 'ejs');
// Resolve views both in dev (src) and prod (dist)
// Support both ESM (dev) and CJS (prod bundle) for resolving views
let __dirname;
try {
  const __filename = fileURLToPath(import.meta.url);
  __dirname = path.dirname(__filename);
} catch {
  // import.meta may be undefined in CJS bundle warnings; fallback to process.cwd()
  __dirname = process.cwd();
}
const viewsPath = path.join(__dirname, 'views');
app.set('views', viewsPath);

// Appwrite SDK
const client = new Client()
  .setEndpoint(process.env.APPWRITE_ENDPOINT)
  .setProject(process.env.APPWRITE_PROJECT_ID)
  .setKey(process.env.APPWRITE_API_KEY);
const db = new Databases(client);
const storage = new Storage(client);

const DB_ID = process.env.APPWRITE_DATABASE_ID;
const COL_PROJECTS = process.env.APPWRITE_COLLECTION_PROJECTS;
const COL_ADMINS = 'admins';
const COL_TAXONOMY = 'taxonomy';
const COL_MESSAGES = 'messages';
const BUCKET_IMAGES = 'project-images';

const upload = multer({ storage: multer.memoryStorage() });

// Auth helpers
function sign(payload) {
  return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '2h' });
}
function verify(token) {
  try { return jwt.verify(token, process.env.JWT_SECRET); } catch { return null; }
}
function requireAuth(req, res, next) {
  const token = req.cookies['auth'];
  const payload = token && verify(token);
  if (!payload) return res.redirect('/admin/login');
  req.user = payload;
  next();
}

// Home
app.get('/', (req, res) => res.json({ ok: true, service: 'portfolio-backend' }));

// Public API: list projects
app.get('/api/projects', async (req, res) => {
  try {
    const list = await db.listDocuments(DB_ID, COL_PROJECTS, [/* filters can be added */]);
    res.json({ ok: true, items: list.documents });
  } catch (e) {
    res.status(500).json({ ok: false, error: e.message });
  }
});

// Public API: contact - create message
app.post('/api/contact-messages', async (req, res) => {
  try {
    const { subject, senderEmail, message } = req.body || {};
    if (!subject || !senderEmail || !message) {
      return res.status(400).json({ ok: false, error: 'Semua field wajib diisi' });
    }
    const emailRegex = /^(?:[^\s@]+)@(?:[^\s@]+)\.[^\s@]+$/;
    if (!emailRegex.test(senderEmail)) {
      return res.status(400).json({ ok: false, error: 'Format email tidak valid' });
    }
    // Create minimal document first (robust to attribute propagation)
    const doc = await db.createDocument(DB_ID, COL_MESSAGES, ID.unique(), {
      subject,
      senderEmail,
      body: message,
      createdAt: new Date().toISOString(),
    });
    // Best-effort update for status/createdAt; ignore if attributes not ready yet
    try {
      await db.updateDocument(DB_ID, COL_MESSAGES, doc.$id, { status: 'unread' });
    } catch (_) {
      // ignore attribute readiness errors
    }
    return res.status(201).json({ ok: true, id: doc.$id });
  } catch (e) {
    res.status(500).json({ ok: false, error: e.message });
  }
});

// Admin: login page
app.get('/admin/login', (req, res) => {
  res.render('login', { error: null });
});
app.post('/admin/login', async (req, res) => {
  const { username, password } = req.body;
  try {
    const { documents } = await db.listDocuments(DB_ID, COL_ADMINS, [Query.equal('username', [username])]);
    const u = documents[0];
    if (u && await bcrypt.compare(password, u.passwordHash)) {
      res.cookie('auth', sign({ username }), { httpOnly: true, sameSite: 'lax' });
      return res.redirect('/admin/dashboard');
    }
    return res.render('login', { error: 'Invalid credentials' });
  } catch (e) {
    return res.render('login', { error: 'Error: ' + e.message });
  }
});

// Admin: logout
app.get('/admin/logout', (req, res) => {
  res.clearCookie('auth');
  res.redirect('/admin/login');
});

// Admin: dashboard
app.get('/admin/dashboard', requireAuth, async (req, res) => {
  try {
    const list = await db.listDocuments(DB_ID, COL_PROJECTS, []);
    const tax = await db.listDocuments(DB_ID, COL_TAXONOMY, []);
    const frameworks = tax.documents.filter((d) => d.kind === 'framework');
    const languages = tax.documents.filter((d) => d.kind === 'language');
    res.render('dashboard', { user: req.user, items: list.documents, frameworks, languages });
  } catch (e) {
    res.status(500).send(e.message);
  }
});

// Admin: messages list
app.get('/admin/messages', requireAuth, async (req, res) => {
  try {
    let documents = [];
    try {
      const list = await db.listDocuments(DB_ID, COL_MESSAGES, [Query.orderDesc('createdAt')]);
      documents = list.documents;
    } catch (err) {
      // Fallback without ordering if index/attribute not yet available
      const list = await db.listDocuments(DB_ID, COL_MESSAGES, []);
      documents = list.documents;
    }
    res.render('messages', { user: req.user, items: documents });
  } catch (e) {
    res.status(500).send(e.message);
  }
});

// Admin: message detail + mark read
app.get('/admin/messages/:id', requireAuth, async (req, res) => {
  try {
    const id = req.params.id;
    const doc = await db.getDocument(DB_ID, COL_MESSAGES, id);
    if (doc.status === 'unread') {
      try {
        await db.updateDocument(DB_ID, COL_MESSAGES, id, { status: 'read' });
        doc.status = 'read';
      } catch (_) {
        // Attribute status may not be available yet; ignore
      }
    }
    res.render('message_detail', { user: req.user, m: doc });
  } catch (e) {
    res.status(500).send(e.message);
  }
});

// Admin: reply endpoint (API)
app.post('/api/admin/reply-message', requireAuth, async (req, res) => {
  try {
    const { originalMessageId, replyContent } = req.body || {};
    if (!originalMessageId || !replyContent) {
      return res.status(400).json({ ok: false, error: 'Data tidak lengkap' });
    }
    // Preflight SMTP config check
    const { SMTP_HOST, SMTP_PORT, SMTP_SECURE, SMTP_USER, SMTP_PASS, SMTP_FROM } = process.env;
    if (!SMTP_HOST || !SMTP_USER || !SMTP_PASS) {
      return res.status(400).json({
        ok: false,
        error: 'SMTP belum dikonfigurasi. Set SMTP_HOST, SMTP_PORT, SMTP_SECURE, SMTP_USER, SMTP_PASS, SMTP_FROM di backend/.env',
      });
    }
    const msg = await db.getDocument(DB_ID, COL_MESSAGES, originalMessageId);
    const to = msg.senderEmail;
    const subject = `Re: ${msg.subject}`;

    // Nodemailer transporter (SMTP). Configure via env.
    const transporter = nodemailer.createTransport({
      host: SMTP_HOST,
      port: Number(SMTP_PORT || 587),
      secure: SMTP_SECURE === 'true',
      auth: { user: SMTP_USER, pass: SMTP_PASS },
    });

    // Optional: verify connection
    try {
      await transporter.verify();
    } catch (err) {
      return res.status(500).json({ ok: false, error: `SMTP verify gagal: ${err.message}` });
    }

    await transporter.sendMail({
      from: SMTP_FROM || SMTP_USER,
      to,
      subject,
      text: replyContent,
    });

      // Try to update all fields; fallback if 'status' attribute is not available
      try {
        await db.updateDocument(DB_ID, COL_MESSAGES, originalMessageId, {
          status: 'replied',
          repliedAt: new Date().toISOString(),
          replyContent,
        });
      } catch (_) {
        try {
          await db.updateDocument(DB_ID, COL_MESSAGES, originalMessageId, {
            repliedAt: new Date().toISOString(),
            replyContent,
          });
        } catch (_) {
          // Ignore if attributes not yet available; reply was sent successfully
        }
      }

      res.json({ ok: true });
  } catch (e) {
    res.status(500).json({ ok: false, error: e.message });
  }
});

// Admin: add project (multipart for image)
app.post('/admin/projects', requireAuth, upload.single('image'), async (req, res) => {
  const { title, description, tags, liveUrl, githubUrl, category, language } = req.body;
  try {
    let imageId = null;
    let imageUrl = null;
    if (req.file) {
      // Use Appwrite REST to upload (avoids SDK file type constraints)
      const fd = new FormData();
      const filename = req.file.originalname || 'image';
      const file = new File([req.file.buffer], filename, { type: req.file.mimetype || 'application/octet-stream' });
      fd.append('fileId', 'unique()');
      fd.append('file', file);

      const resUp = await fetch(`${process.env.APPWRITE_ENDPOINT}/storage/buckets/${BUCKET_IMAGES}/files`, {
        method: 'POST',
        headers: {
          'X-Appwrite-Project': process.env.APPWRITE_PROJECT_ID,
          'X-Appwrite-Key': process.env.APPWRITE_API_KEY,
        },
        body: fd,
      });
      if (!resUp.ok) {
        const txt = await resUp.text();
        throw new Error(`Upload gagal: ${resUp.status} ${txt}`);
      }
      const uploaded = await resUp.json();
      imageId = uploaded.$id;
      imageUrl = `${process.env.APPWRITE_ENDPOINT}/storage/buckets/${BUCKET_IMAGES}/files/${imageId}/view?project=${process.env.APPWRITE_PROJECT_ID}`;
    }
    const doc = await db.createDocument(DB_ID, COL_PROJECTS, ID.unique(), {
      title,
      description,
      tags: (tags || '').split(',').map((s) => s.trim()).filter(Boolean),
      imageId,
      imageUrl,
      liveUrl,
      githubUrl,
      category,
      language,
      createdAt: new Date().toISOString(),
    });
    res.redirect('/admin/dashboard');
  } catch (e) {
    res.status(500).send(e.message);
  }
});

// Admin: delete project
app.post('/admin/projects/:id/delete', requireAuth, async (req, res) => {
  try {
    await db.deleteDocument(DB_ID, COL_PROJECTS, req.params.id);
    res.redirect('/admin/dashboard');
  } catch (e) {
    res.status(500).send(e.message);
  }
});

// Admin: edit project form
app.get('/admin/projects/:id/edit', requireAuth, async (req, res) => {
  try {
    const doc = await db.getDocument(DB_ID, COL_PROJECTS, req.params.id);
    const tax = await db.listDocuments(DB_ID, COL_TAXONOMY, []);
    const frameworks = tax.documents.filter((d) => d.kind === 'framework');
    const languages = tax.documents.filter((d) => d.kind === 'language');
    res.render('edit', { user: req.user, p: doc, frameworks, languages });
  } catch (e) {
    res.status(500).send(e.message);
  }
});

// Admin: update project
app.post('/admin/projects/:id', requireAuth, upload.single('image'), async (req, res) => {
  const { title, description, tags, liveUrl, githubUrl, category, language } = req.body;
  const id = req.params.id;
  try {
    let data = {
      title,
      description,
      tags: (tags || '').split(',').map((s) => s.trim()).filter(Boolean),
      liveUrl,
      githubUrl,
      category,
      language,
    };
    if (req.file) {
      const fd = new FormData();
      const filename = req.file.originalname || 'image';
      const file = new File([req.file.buffer], filename, { type: req.file.mimetype || 'application/octet-stream' });
      fd.append('fileId', 'unique()');
      fd.append('file', file);
      const resUp = await fetch(`${process.env.APPWRITE_ENDPOINT}/storage/buckets/${BUCKET_IMAGES}/files`, {
        method: 'POST',
        headers: {
          'X-Appwrite-Project': process.env.APPWRITE_PROJECT_ID,
          'X-Appwrite-Key': process.env.APPWRITE_API_KEY,
        },
        body: fd,
      });
      if (!resUp.ok) {
        const txt = await resUp.text();
        throw new Error(`Upload gagal: ${resUp.status} ${txt}`);
      }
      const uploaded = await resUp.json();
      data.imageId = uploaded.$id;
      data.imageUrl = `${process.env.APPWRITE_ENDPOINT}/storage/buckets/${BUCKET_IMAGES}/files/${uploaded.$id}/view?project=${process.env.APPWRITE_PROJECT_ID}`;
    }
    await db.updateDocument(DB_ID, COL_PROJECTS, id, data);
    res.redirect('/admin/dashboard');
  } catch (e) {
    res.status(500).send(e.message);
  }
});

app.listen(PORT, () => {
  console.log(`[backend] listening on http://localhost:${PORT}`);
});
