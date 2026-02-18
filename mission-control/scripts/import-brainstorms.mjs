#!/usr/bin/env node
/**
 * Import brainstorm markdown files into Convex.
 *
 * Usage:
 *   CONVEX_URL=<your-convex-url> TENANT_ID=default node scripts/import-brainstorms.mjs [directory]
 *
 * Default directory: C:\Users\spart\.openclaw\deliverables\_system\archer
 */
import { ConvexHttpClient } from "convex/browser";
import fs from "fs";
import path from "path";

const CONVEX_URL = process.env.CONVEX_URL;
const TENANT_ID = process.env.TENANT_ID || "default";
const DEFAULT_DIR = String.raw`C:\Users\spart\.openclaw\deliverables\_system\archer`;
const targetDir = process.argv[2] || DEFAULT_DIR;

if (!CONVEX_URL) {
  console.error("❌ CONVEX_URL env variable is required");
  process.exit(1);
}

const client = new ConvexHttpClient(CONVEX_URL);

function slugify(str) {
  return str
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .trim();
}

function parseBrainstormFile(filePath) {
  const raw = fs.readFileSync(filePath, "utf-8");
  const filename = path.basename(filePath, path.extname(filePath));

  // Extract title from first # heading
  const titleMatch = raw.match(/^#\s+(.+)$/m);
  const title = titleMatch ? titleMatch[1].trim() : filename.replace(/-/g, " ");

  // Extract date
  const dateMatch = raw.match(/\*\*Date:\*\*\s*(.+)/i) || raw.match(/(\d{4}-\d{2}-\d{2})/);
  const sourceDate = dateMatch ? dateMatch[1].trim() : new Date().toISOString().split("T")[0];

  // Extract agent
  const agentMatch = raw.match(/\*\*Agent:\*\*\s*(.+)/i);
  const sourceAgent = agentMatch ? agentMatch[1].trim() : "Archer";

  // Extract summary (first paragraph after frontmatter)
  const contentLines = raw.split("\n");
  let summary = "";
  let pastTitle = false;
  for (const line of contentLines) {
    if (line.startsWith("# ")) { pastTitle = true; continue; }
    if (pastTitle && line.trim() && !line.startsWith("**") && !line.startsWith("---")) {
      summary = line.trim().slice(0, 300);
      break;
    }
  }

  // Auto-tag based on content keywords
  const tags = [];
  const lowerContent = raw.toLowerCase();
  const tagKeywords = {
    revenue: ["revenue", "pricing", "monetiz", "income"],
    agents: ["agent", "openclaw", "orchestrat", "workflow"],
    infra: ["server", "deploy", "hosting", "docker", "ssh", "cloudways"],
    marketing: ["marketing", "outreach", "campaign", "email", "social"],
    clients: ["client", "customer", "onboard"],
    hardware: ["hardware", "gpu", "server rack"],
    outreach: ["outreach", "lead gen", "cold email", "prospect"],
    bugfix: ["bug", "fix", "error", "debug"],
    cro: ["conversion", "cro", "landing page", "funnel"],
    seo: ["seo", "ranking", "keyword", "backlink", "serp"],
    content: ["content", "blog", "article", "copywriting"],
  };

  for (const [tag, keywords] of Object.entries(tagKeywords)) {
    if (keywords.some((kw) => lowerContent.includes(kw))) {
      tags.push(tag);
    }
  }

  return {
    title,
    slug: slugify(filename),
    content: raw,
    summary,
    sourceDate,
    sourceAgent,
    tags,
  };
}

async function main() {
  if (!fs.existsSync(targetDir)) {
    console.error(`❌ Directory not found: ${targetDir}`);
    process.exit(1);
  }

  const files = fs.readdirSync(targetDir).filter((f) => f.endsWith(".md"));
  console.log(`📂 Found ${files.length} markdown files in ${targetDir}`);

  if (files.length === 0) {
    console.log("No .md files found. Exiting.");
    return;
  }

  const brainstorms = files.map((f) => parseBrainstormFile(path.join(targetDir, f)));
  console.log(`📝 Parsed ${brainstorms.length} brainstorms`);

  // Bulk import via mutation
  const result = await client.mutation("brainstorms:bulkImport", {
    brainstorms,
    tenantId: TENANT_ID,
  });

  console.log(`✅ Import complete: ${result.imported} imported, ${result.skipped} unchanged`);
}

main().catch((err) => {
  console.error("❌ Import failed:", err);
  process.exit(1);
});
