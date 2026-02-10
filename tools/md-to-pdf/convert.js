#!/usr/bin/env node
'use strict';

// Add openclaw's bundled node_modules to the resolve path so
// markdown-it, playwright-core, etc. can be found from any CWD.
const _path = require('path');
const _Module = require('module');
const OPENCLAW_MODULES = _path.join(
  process.env.APPDATA || require('os').homedir(),
  'npm', 'node_modules', 'openclaw', 'node_modules'
);
if (require('fs').existsSync(OPENCLAW_MODULES)) {
  const existing = process.env.NODE_PATH || '';
  process.env.NODE_PATH = existing ? `${existing}${_path.delimiter}${OPENCLAW_MODULES}` : OPENCLAW_MODULES;
  _Module._initPaths();
}

const fs = require('fs');
const path = require('path');
const { parse } = require('./lib/parser');
const { render } = require('./lib/renderer');

// ---------- CLI argument parsing ----------

function parseArgs(argv) {
  const args = argv.slice(2);
  const opts = {
    input: null,
    output: null,
    template: 'audit',
  };

  for (let i = 0; i < args.length; i++) {
    const arg = args[i];

    if (arg === '--output' || arg === '-o') {
      opts.output = args[++i];
    } else if (arg === '--template' || arg === '-t') {
      opts.template = args[++i];
    } else if (arg === '--help' || arg === '-h') {
      printUsage();
      process.exit(0);
    } else if (!arg.startsWith('-')) {
      opts.input = arg;
    }
  }

  return opts;
}

function printUsage() {
  console.log(`
  md-to-pdf — LocalCatalyst.ai Branded PDF Report Generator

  Usage:
    node convert.js <input.md> [options]

  Options:
    --output, -o <path>     Output PDF path (default: same dir as input, .pdf ext)
    --template, -t <name>   HTML template name (default: audit)
    --help, -h              Show this help

  Examples:
    node convert.js audit-report.md
    node convert.js audit.md --output "C:\\Reports\\client-audit.pdf"
    node convert.js report.md --template audit
  `);
}

// ---------- Main ----------

async function main() {
  const opts = parseArgs(process.argv);

  if (!opts.input) {
    console.error('Error: No input file specified.');
    printUsage();
    process.exit(1);
  }

  // Resolve input path
  const inputPath = path.resolve(opts.input);
  if (!fs.existsSync(inputPath)) {
    console.error(`Error: Input file not found: ${inputPath}`);
    process.exit(1);
  }

  // Resolve output path
  const outputPath = opts.output
    ? path.resolve(opts.output)
    : inputPath.replace(/\.md$/i, '.pdf');

  console.log(`[md-to-pdf] Input:    ${inputPath}`);
  console.log(`[md-to-pdf] Output:   ${outputPath}`);
  console.log(`[md-to-pdf] Template: ${opts.template}`);

  // Read & parse markdown
  const markdown = fs.readFileSync(inputPath, 'utf8');
  const parsed = parse(markdown);

  console.log(`[md-to-pdf] Client:   ${parsed.meta.businessName || '(unknown)'}`);
  console.log(`[md-to-pdf] Sections: ${parsed.toc.split('toc-item').length - 1}`);

  // Render PDF
  const start = Date.now();
  await render(parsed, outputPath, { template: opts.template });
  const elapsed = ((Date.now() - start) / 1000).toFixed(1);

  console.log(`[md-to-pdf] Done in ${elapsed}s → ${outputPath}`);
}

main().catch(err => {
  console.error('[md-to-pdf] Fatal error:', err.message);
  process.exit(1);
});
