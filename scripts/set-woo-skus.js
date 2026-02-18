#!/usr/bin/env node
// set-woo-skus.js — Set SKUs on LocalCatalyst WooCommerce products/variations
// Usage: node set-woo-skus.js
// Reads WP credentials from ../.env

import { readFileSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const envPath = resolve(__dirname, "../.env");

// Parse .env manually (avoid dotenv dependency)
const env = {};
for (const line of readFileSync(envPath, "utf8").split("\n")) {
  const match = line.match(/^([^#=]+)=(.*)$/);
  if (match) env[match[1].trim()] = match[2].trim();
}

const WC_API_URL    = env.WC_API_URL;   // https://localcatalyst.ai/wp-json/wc/v3
const CONSUMER_KEY  = env.WC_CONSUMER_KEY;
const CONSUMER_SEC  = env.WC_CONSUMER_SECRET;

if (!WC_API_URL || !CONSUMER_KEY || !CONSUMER_SEC) {
  console.error("Missing WC_API_URL, WC_CONSUMER_KEY, or WC_CONSUMER_SECRET in .env");
  process.exit(1);
}

const BASE = WC_API_URL;
const AUTH = Buffer.from(`${CONSUMER_KEY}:${CONSUMER_SEC}`).toString("base64");

const headers = {
  "Authorization": `Basic ${AUTH}`,
  "Content-Type": "application/json",
};

// SKU assignments
// Format: [type, wcId, sku]
//   type "product"   → PATCH /products/{id}
//   type "variation" → PATCH /products/{parentId}/variations/{id}
const SKU_MAP = [
  // Topical Map (simple, product 41)
  ["product",   41,   null,  "LC-TOPICAL-MAP"],

  // SEO Audit (variable 42, variations 43, 44)
  ["variation", 43,   42,    "LC-AUDIT-MINI"],
  ["variation", 44,   42,    "LC-AUDIT-CATALYST"],

  // SEO Content Pages (variable 45, variations 46, 47, 48)
  ["variation", 46,   45,    "LC-CONTENT-1"],
  ["variation", 47,   45,    "LC-CONTENT-5"],
  ["variation", 48,   45,    "LC-CONTENT-10"],

  // Schema Markup (variable 49, variations 50, 51)
  ["variation", 50,   49,    "LC-SCHEMA-1"],
  ["variation", 51,   49,    "LC-SCHEMA-FULL"],

  // GBP Optimization (variable 52, variations 53, 54)
  ["variation", 53,   52,    "LC-GBP-STD"],
  ["variation", 54,   52,    "LC-GBP-PRE"],

  // Citation Building (variable 55, variations 56, 57, 58)
  ["variation", 56,   55,    "LC-CIT-25"],
  ["variation", 57,   55,    "LC-CIT-50"],
  ["variation", 58,   55,    "LC-CIT-100"],

  // Website Build (variable 59, variations 60, 61, 62)
  ["variation", 60,   59,    "LC-WEB-STARTER"],
  ["variation", 61,   59,    "LC-WEB-PRO"],
  ["variation", 62,   59,    "LC-WEB-ENT"],
];

async function setSku(type, id, parentId, sku) {
  const url = type === "product"
    ? `${BASE}/products/${id}`
    : `${BASE}/products/${parentId}/variations/${id}`;

  const res = await fetch(url, {
    method: "PUT",
    headers,
    body: JSON.stringify({ sku }),
  });

  const data = await res.json();
  if (!res.ok) {
    console.error(`  ✗ ${sku} (${type} ${id}): ${data.message || res.status}`);
    return false;
  }
  console.log(`  ✓ ${sku} → ${type} ${id} (${data.name})`);
  return true;
}

async function main() {
  console.log(`\nSetting SKUs on ${WC_API_URL}...\n`);
  let ok = 0, fail = 0;
  for (const [type, id, parentId, sku] of SKU_MAP) {
    const success = await setSku(type, id, parentId, sku);
    success ? ok++ : fail++;
    // Small delay to avoid hammering the API
    await new Promise(r => setTimeout(r, 300));
  }
  console.log(`\nDone: ${ok} set, ${fail} failed`);
}

main().catch(console.error);
