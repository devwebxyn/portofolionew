var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));

// scripts/setup-appwrite.js
var import_config = require("dotenv/config");
var import_node_appwrite = require("node-appwrite");
var import_bcryptjs = __toESM(require("bcryptjs"), 1);
var client = new import_node_appwrite.Client().setEndpoint(process.env.APPWRITE_ENDPOINT).setProject(process.env.APPWRITE_PROJECT_ID).setKey(process.env.APPWRITE_API_KEY);
var db = new import_node_appwrite.Databases(client);
var storage = new import_node_appwrite.Storage(client);
var DB_ID = process.env.APPWRITE_DATABASE_ID || "portfolio";
var COL_PROJECTS = process.env.APPWRITE_COLLECTION_PROJECTS || "projects";
var COL_ADMINS = "admins";
var COL_TAXONOMY = "taxonomy";
var COL_MESSAGES = "messages";
var BUCKET_IMAGES = "project-images";
async function ensureDatabase() {
  try {
    await db.get(DB_ID);
  } catch {
    await db.create(DB_ID, DB_ID);
  }
}
async function ensureCollectionProjects() {
  try {
    await db.getCollection(DB_ID, COL_PROJECTS);
  } catch {
    await db.createCollection(DB_ID, COL_PROJECTS, COL_PROJECTS);
    await db.createStringAttribute(DB_ID, COL_PROJECTS, "title", 256, true);
    await db.createStringAttribute(DB_ID, COL_PROJECTS, "description", 8192, true);
    await db.createStringAttribute(DB_ID, COL_PROJECTS, "imageId", 128, false);
    await db.createStringAttribute(DB_ID, COL_PROJECTS, "imageUrl", 1024, false);
    await db.createStringAttribute(DB_ID, COL_PROJECTS, "liveUrl", 1024, false);
    await db.createStringAttribute(DB_ID, COL_PROJECTS, "githubUrl", 1024, false);
    await db.createStringAttribute(DB_ID, COL_PROJECTS, "category", 128, true);
    await db.createStringAttribute(DB_ID, COL_PROJECTS, "language", 128, true);
    await db.createStringAttribute(DB_ID, COL_PROJECTS, "createdAt", 64, true);
    await db.createStringAttribute(DB_ID, COL_PROJECTS, "tags", 64, false, void 0, true);
    await waitAttr(COL_PROJECTS, "title");
    await waitAttr(COL_PROJECTS, "category");
    await waitAttr(COL_PROJECTS, "language");
    await db.createIndex(DB_ID, COL_PROJECTS, "idx_title", "fulltext", ["title"]);
    await db.createIndex(DB_ID, COL_PROJECTS, "idx_category", "key", ["category"]);
    await db.createIndex(DB_ID, COL_PROJECTS, "idx_language", "key", ["language"]);
  }
}
async function ensureCollectionAdmins() {
  try {
    await db.getCollection(DB_ID, COL_ADMINS);
  } catch {
    await db.createCollection(DB_ID, COL_ADMINS, COL_ADMINS);
    await db.createStringAttribute(DB_ID, COL_ADMINS, "username", 64, true);
    await db.createStringAttribute(DB_ID, COL_ADMINS, "passwordHash", 256, true);
    await waitAttr(COL_ADMINS, "username");
    await db.createIndex(DB_ID, COL_ADMINS, "idx_username", "unique", ["username"]);
  }
}
async function ensureCollectionTaxonomy() {
  try {
    await db.getCollection(DB_ID, COL_TAXONOMY);
  } catch {
    await db.createCollection(DB_ID, COL_TAXONOMY, COL_TAXONOMY);
    await db.createStringAttribute(DB_ID, COL_TAXONOMY, "kind", 32, true);
    await db.createStringAttribute(DB_ID, COL_TAXONOMY, "key", 64, true);
    await db.createStringAttribute(DB_ID, COL_TAXONOMY, "name", 128, true);
    await waitAttr(COL_TAXONOMY, "kind");
    await waitAttr(COL_TAXONOMY, "key");
    await db.createIndex(DB_ID, COL_TAXONOMY, "idx_kind_key", "unique", ["kind", "key"]);
  }
}
async function ensureBucket() {
  try {
    await storage.getBucket(BUCKET_IMAGES);
  } catch {
    await storage.createBucket(BUCKET_IMAGES, BUCKET_IMAGES);
  }
}
async function seedAdmin() {
  const username = "admin";
  const password = "samuelindra123";
  const hash = await import_bcryptjs.default.hash(password, 10);
  try {
    await db.createDocument(DB_ID, COL_ADMINS, import_node_appwrite.ID.unique(), { username, passwordHash: hash });
    console.log("Seeded admin credentials (admin / samuelindra123)");
  } catch (e) {
    console.log("Admin seed skipped:", e.message);
  }
}
async function seedTaxonomy() {
  const frameworks = ["react", "nextjs", "laravel", "svelte", "spring", "express", "nestjs"];
  const languages = ["javascript", "typescript", "php", "cpp", "java", "csharp"];
  for (const key of frameworks) {
    try {
      await db.createDocument(DB_ID, COL_TAXONOMY, import_node_appwrite.ID.unique(), { kind: "framework", key, name: key });
    } catch {
    }
  }
  for (const key of languages) {
    try {
      await db.createDocument(DB_ID, COL_TAXONOMY, import_node_appwrite.ID.unique(), { kind: "language", key, name: key });
    } catch {
    }
  }
}
(async () => {
  await ensureDatabase();
  await ensureCollectionProjects();
  await ensureCollectionAdmins();
  await ensureCollectionTaxonomy();
  await ensureCollectionMessages();
  await ensureBucket();
  await seedAdmin();
  await seedTaxonomy();
  console.log("Appwrite setup completed");
})();
function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}
async function waitAttr(collectionId, key) {
  for (let i = 0; i < 30; i++) {
    try {
      const attr = await db.getAttribute(DB_ID, collectionId, key);
      if (attr && attr.status === "available") return;
    } catch (e) {
    }
    await sleep(500);
  }
  console.warn(`Attribute ${collectionId}.${key} may not be available yet`);
}
async function ensureCollectionMessages() {
  let exists = true;
  try {
    await db.getCollection(DB_ID, COL_MESSAGES);
  } catch {
    exists = false;
  }
  if (!exists) {
    await db.createCollection(DB_ID, COL_MESSAGES, COL_MESSAGES);
    await sleep(800);
  }
  const tryAttr = async (fn) => {
    try {
      await fn();
    } catch (_) {
    }
  };
  await tryAttr(() => db.createStringAttribute(DB_ID, COL_MESSAGES, "subject", 128, true));
  await tryAttr(() => db.createStringAttribute(DB_ID, COL_MESSAGES, "senderEmail", 255, true));
  await tryAttr(() => db.createStringAttribute(DB_ID, COL_MESSAGES, "body", 4096, true));
  await tryAttr(() => db.createEnumAttribute(DB_ID, COL_MESSAGES, "status", ["unread", "read", "replied"], true, "unread"));
  await tryAttr(() => db.createStringAttribute(DB_ID, COL_MESSAGES, "createdAt", 32, true));
  await tryAttr(() => db.createStringAttribute(DB_ID, COL_MESSAGES, "repliedAt", 32, false));
  await tryAttr(() => db.createStringAttribute(DB_ID, COL_MESSAGES, "replyContent", 4096, false));
  await waitAttr(COL_MESSAGES, "status");
  await waitAttr(COL_MESSAGES, "createdAt");
  await waitAttr(COL_MESSAGES, "senderEmail");
  await tryAttr(() => db.createIndex(DB_ID, COL_MESSAGES, "idx_status", "key", ["status"]));
  await tryAttr(() => db.createIndex(DB_ID, COL_MESSAGES, "idx_createdAt", "key", ["createdAt"]));
  await tryAttr(() => db.createIndex(DB_ID, COL_MESSAGES, "idx_sender", "fulltext", ["senderEmail"]));
}
