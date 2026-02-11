'use strict';

const MarkdownIt = require('markdown-it');

// ---------- Metadata extraction ----------

/**
 * Extract structured metadata from the CATALYST audit header.
 * Looks for the standard pattern:
 *   # CATALYST SEO Audit Report
 *   ## Business Name
 *   ### domain.com
 *   **Audit Date:** ...
 *   **Prepared By:** ...
 *   **Audit Type:** ...
 *   **Auditor:** ...
 */
function extractMetadata(md) {
  const meta = {
    reportTitle: 'SEO Audit Report',
    businessName: '',
    domain: '',
    auditDate: '',
    preparedBy: 'LocalCatalyst.ai',
    auditType: '',
    auditor: '',
  };

  const lines = md.split('\n');

  for (let i = 0; i < Math.min(lines.length, 30); i++) {
    const line = lines[i].trim();

    // # Title
    if (/^#\s+(.+)$/.test(line) && !meta.reportTitle) {
      meta.reportTitle = line.replace(/^#\s+/, '');
    }
    // ## Business Name (first h2 before any ---)
    if (/^##\s+(.+)$/.test(line) && !meta.businessName) {
      meta.businessName = line.replace(/^##\s+/, '');
    }
    // ### domain
    if (/^###\s+(.+)$/.test(line) && !meta.domain) {
      meta.domain = line.replace(/^###\s+/, '');
    }
    // **Key:** Value patterns
    const kvMatch = line.match(/^\*\*(.+?):\*\*\s*(.+)$/);
    if (kvMatch) {
      const key = kvMatch[1].toLowerCase().trim();
      const val = kvMatch[2].trim();
      if (key === 'audit date')   meta.auditDate = val;
      if (key === 'prepared by')  meta.preparedBy = val;
      if (key === 'audit type')   meta.auditType = val;
      if (key === 'auditor')      meta.auditor = val;
    }

    // Stop scanning after first horizontal rule
    if (/^---+$/.test(line) && meta.businessName) break;
  }

  return meta;
}

// ---------- Emoji preprocessing ----------

const EMOJI_MAP = {
  '\u2705': { cls: 'status-pass',  label: 'Pass' },    // ✅
  '\u274C': { cls: 'status-fail',  label: 'Fail' },    // ❌
  '\u26A0\uFE0F': { cls: 'status-warn',  label: 'Warning' }, // ⚠️
  '\u26A0':       { cls: 'status-warn',  label: 'Warning' }, // ⚠ (without variation selector)
};

function preprocessEmoji(html) {
  for (const [emoji, info] of Object.entries(EMOJI_MAP)) {
    const re = new RegExp(emoji, 'g');
    html = html.replace(re, `<span class="${info.cls}" title="${info.label}">${emoji}</span>`);
  }
  return html;
}

// ---------- Score color coding ----------

function scoreClass(num) {
  if (num <= 2)  return 'score-critical';
  if (num <= 4)  return 'score-low';
  if (num <= 6)  return 'score-mid';
  if (num <= 8)  return 'score-good';
  return 'score-great';
}

/**
 * Color-code [X/10] and [X.X/10] patterns in scorecard blocks.
 */
function colorCodeScores(html) {
  return html.replace(/\[(\d+(?:\.\d+)?)\/10\]/g, (match, numStr) => {
    const num = parseFloat(numStr);
    const cls = scoreClass(num);
    return `<span class="${cls}">[${numStr}/10]</span>`;
  });
}

// ---------- Scorecard detection & restyling ----------

/**
 * Detect code blocks that contain tree characters (├──, └──, ═══) and
 * restyle them as scorecard blocks with semantic classes.
 */
function restyleScorecard(html) {
  // Match <pre><code>...</code></pre> blocks
  return html.replace(/<pre><code>([\s\S]*?)<\/code><\/pre>/g, (match, content) => {
    const hasTree = /[├└─═║│┌┐┘┤┬┴┼]/.test(content) || /ROUTE \d|OVERALL/.test(content);
    if (!hasTree) return match;

    // Filter out the TRACKING section (internal-only) and strip SPEC refs
    let rawLines = content.split('\n');
    let filtered = [];
    let skipping = false;
    for (const line of rawLines) {
      // Start skipping at TRACKING header
      if (/^ROUTE 5|TRACKING/i.test(line.trim())) { skipping = true; continue; }
      // Stop skipping at next route header, overall, or divider
      if (skipping && (/^ROUTE \d|^AI\/|OVERALL|═{4,}/.test(line.trim()))) { skipping = false; }
      if (skipping) continue;
      filtered.push(line);
    }

    // Process line by line
    let lines = filtered.map(line => {
      // Strip SPEC references like "(SPEC-001)" or "(SPEC-001/002)"
      line = line.replace(/\s*\(SPEC-[\d/]+\)/g, '');
      // Also strip standalone "(013/014)" style refs
      line = line.replace(/\s*\(\d{3}\/\d{3}\)/g, '');

      // Route headers — strip "ROUTE X: " prefix (internal jargon)
      if (/^ROUTE \d/.test(line)) {
        line = line.replace(/^ROUTE \d+:\s*/, '');
        return `<span class="route-header">${line}</span>`;
      }
      if (/^AI\//.test(line)) {
        return `<span class="route-header">${line}</span>`;
      }
      // Route average lines — strip "Route X " prefix
      if (/Average:/.test(line)) {
        line = line.replace(/Route \d+\s+/, '');
        return `<span class="route-avg">${line}</span>`;
      }
      // Overall score line
      if (/OVERALL/.test(line)) {
        return `<span class="overall-line">${line}</span>`;
      }
      // Divider lines (═══)
      if (/═{4,}/.test(line)) {
        return `<span class="score-divider">${line}</span>`;
      }
      return line;
    });

    let result = lines.join('\n');
    result = colorCodeScores(result);
    return `<div class="scorecard">${result}</div>`;
  });
}

// ---------- Section wrapping & TOC generation ----------

// Sections that are internal-only and should be stripped from client-facing PDFs
const INTERNAL_SECTIONS = [
  /AGENT DISPATCH/i,
  /DISPATCH QUEUE/i,
  /APPENDIX/i,
];

function isInternalSection(title) {
  return INTERNAL_SECTIONS.some(re => re.test(title));
}

/**
 * Wrap each <h2> section in a <section class="report-section"> for page breaks.
 * Also extract headings for TOC generation.
 * Internal-only sections (e.g. Agent Dispatch Queue) are stripped entirely.
 */
function wrapSections(html) {
  const headings = [];

  // Split at h2 boundaries
  const parts = html.split(/(?=<h2[ >])/);
  let result = '';
  let sectionIndex = 0;

  for (const part of parts) {
    const h2Match = part.match(/<h2[^>]*>(.*?)<\/h2>/);
    if (h2Match) {
      const title = h2Match[1].replace(/<[^>]+>/g, '').trim();

      // Skip internal-only sections entirely
      if (isInternalSection(title)) continue;

      const id = `section-${sectionIndex}`;

      // Extract section number if present (e.g., "1. EXECUTIVE SUMMARY")
      const numMatch = title.match(/^(\d+)\.\s*/);
      const number = numMatch ? numMatch[1] : '';
      const label = numMatch ? title.replace(/^\d+\.\s*/, '') : title;

      headings.push({ id, number, label, title });

      // Replace the h2 with one that has an id, wrap in section
      const partWithId = part.replace(/<h2([^>]*)>/, `<h2$1 id="${id}">`);
      result += `<section class="report-section">${partWithId}</section>`;
      sectionIndex++;
    } else {
      // Content before the first h2 (title block, etc.)
      result += part;
    }
  }

  return { html: result, headings };
}

function generateTOC(headings) {
  return headings.map(h => {
    const num = h.number ? `<span class="toc-number">${h.number}.</span>` : '';
    return `<li class="toc-item">${num}<span class="toc-label">${h.label}</span></li>`;
  }).join('\n');
}

// ---------- Strip header from content ----------

/**
 * Remove the metadata header (everything before the first ---) from the
 * markdown content so it doesn't duplicate with the cover page.
 */
function stripHeader(md) {
  const lines = md.split('\n');
  let firstHrIndex = -1;

  for (let i = 0; i < Math.min(lines.length, 30); i++) {
    if (/^---+$/.test(lines[i].trim())) {
      firstHrIndex = i;
      break;
    }
  }

  if (firstHrIndex >= 0) {
    return lines.slice(firstHrIndex + 1).join('\n');
  }
  return md;
}

// ---------- Client-friendly route name replacement ----------

const ROUTE_NAMES = {
  '1': 'GBP',
  '2': 'Website',
  '3': 'Content',
  '4': 'Off-Site',
  '5': 'Tracking',
};

/**
 * Replace internal "Route X" references with client-friendly category names
 * and strip SPEC references and Tracking weight lines.
 */
function replaceRouteLabels(html) {
  for (const [num, name] of Object.entries(ROUTE_NAMES)) {
    html = html.replace(new RegExp(`Route ${num}\\b`, 'g'), name);
  }
  // Strip SPEC references like "SPEC-001", "(SPEC-008)", "SPEC-001/002"
  html = html.replace(/\s*\(?SPEC-[\d/]+\)?\s*/g, ' ');
  // Strip standalone parenthetical number refs like "(013/014)"
  html = html.replace(/\s*\(\d{3}\/\d{3}\)/g, '');
  // Remove the Tracking weight line from score calculation lists
  // e.g. "<li>Tracking (10%): 0.0 × 0.10 = 0.00</li>"
  html = html.replace(/<li>Tracking\s*\(\d+%\):[^<]*<\/li>\s*/g, '');
  return html;
}

// ---------- Main parse function ----------

/**
 * Parse a markdown audit file into structured data ready for rendering.
 *
 * @param {string} markdown - Raw markdown content
 * @returns {{ meta: object, toc: string, content: string }}
 */
function parse(markdown) {
  const meta = extractMetadata(markdown);

  // Strip the header block (covered by cover page)
  const body = stripHeader(markdown);

  // Run markdown-it
  const mdi = new MarkdownIt({
    html: true,
    typographer: true,
    linkify: true,
  });

  let html = mdi.render(body);

  // Post-processing pipeline
  html = restyleScorecard(html);
  html = replaceRouteLabels(html);
  html = preprocessEmoji(html);

  // Wrap sections & generate TOC
  const { html: sectionedHtml, headings } = wrapSections(html);
  const toc = generateTOC(headings);

  return {
    meta,
    toc,
    content: sectionedHtml,
  };
}

module.exports = { parse, extractMetadata };
