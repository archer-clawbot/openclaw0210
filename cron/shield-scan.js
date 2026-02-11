#!/usr/bin/env node

// Shield Scanner CLI — security scanning for OpenClaw codebase.
// Usage:
//   node shield-scan.js <path>                    Scan a file or directory
//   node shield-scan.js <path> --severity critical,high   Filter by severity
//   node shield-scan.js <path> --json             Output raw JSON
//   node shield-scan.js --self                    Scan the entire OpenClaw codebase

const path = require('path');
const shield = require('./lib/shield');

const args = process.argv.slice(2);

if (args.length === 0 || args.includes('--help')) {
  console.log(`
Shield Security Scanner

Usage:
  node shield-scan.js <path>                      Scan file or directory
  node shield-scan.js <path> --severity critical   Filter by severity
  node shield-scan.js <path> --json                JSON output
  node shield-scan.js --self                       Scan OpenClaw codebase

Options:
  --severity <levels>   Comma-separated: critical,high,medium,low
  --json                Output raw JSON instead of formatted report
  --no-recursive        Don't recurse into subdirectories
  --self                Scan the OpenClaw home directory
`);
  process.exit(0);
}

const OPENCLAW_HOME = process.env.OPENCLAW_HOME || path.resolve(__dirname, '..');

let targetPath;
if (args.includes('--self')) {
  targetPath = OPENCLAW_HOME;
} else {
  targetPath = path.resolve(args.find(a => !a.startsWith('--')) || '.');
}

const opts = {
  recursive: !args.includes('--no-recursive'),
};

const sevIdx = args.indexOf('--severity');
if (sevIdx !== -1 && args[sevIdx + 1]) {
  opts.severity = args[sevIdx + 1];
}

const report = shield.scan(targetPath, opts);

if (args.includes('--json')) {
  console.log(JSON.stringify(report, null, 2));
} else {
  console.log(shield.formatReport(report));
}

process.exit(report.severitySummary.critical > 0 ? 2 : report.totalFindings > 0 ? 1 : 0);
