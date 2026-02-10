'use strict';

const fs = require('fs');
const path = require('path');
const { chromium } = require('playwright-core');
const brand = require('./brand');

const TEMPLATES_DIR = path.join(__dirname, '..', 'templates');

/**
 * Interpolate brand color/font placeholders in CSS.
 */
function interpolateCSS(css) {
  const replacements = {
    '{{COLOR_PRIMARY}}':    brand.colors.primary,
    '{{COLOR_SECONDARY}}':  brand.colors.secondary,
    '{{COLOR_ACCENT}}':     brand.colors.accent,
    '{{COLOR_SUCCESS}}':    brand.colors.success,
    '{{COLOR_DANGER}}':     brand.colors.danger,
    '{{COLOR_WARNING}}':    brand.colors.warning,
    '{{COLOR_NEUTRAL}}':    brand.colors.neutral,
    '{{COLOR_LIGHT}}':      brand.colors.light,
    '{{COLOR_WHITE}}':      brand.colors.white,
    '{{COLOR_TEXT}}':        brand.colors.text,
    '{{COLOR_TEXT_LIGHT}}':  brand.colors.textLight,
    '{{COLOR_BORDER}}':     brand.colors.border,
    '{{FONT_BODY}}':        brand.fonts.body,
    '{{FONT_MONO}}':        brand.fonts.mono,
    '{{FONT_HEADING}}':     brand.fonts.heading,
  };

  for (const [placeholder, value] of Object.entries(replacements)) {
    css = css.split(placeholder).join(value);
  }
  return css;
}

/**
 * Assemble the final HTML document from template + parsed content.
 */
function assembleHTML(template, css, parsed) {
  const { meta, toc, content } = parsed;

  const replacements = {
    '{{CSS}}':              css,
    '{{LOGO_URI}}':         brand.logo.dataUri,
    '{{REPORT_TITLE}}':     meta.reportTitle || 'SEO Audit Report',
    '{{REPORT_TYPE}}':      meta.reportTitle || 'SEO Audit Report',
    '{{BUSINESS_NAME}}':    meta.businessName || 'Client Report',
    '{{DOMAIN}}':           meta.domain || '',
    '{{AUDIT_DATE}}':       meta.auditDate || new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
    '{{PREPARED_BY}}':      meta.preparedBy || brand.company.name,
    '{{AUDIT_TYPE}}':       meta.auditType || 'SEO Audit',
    '{{AUDITOR}}':          meta.auditor || 'APEX Engine',
    '{{TOC}}':              toc,
    '{{CONTENT}}':          content,
    '{{COMPANY_NAME}}':     brand.company.name,
    '{{COMPANY_TAGLINE}}':  brand.company.tagline,
    '{{COMPANY_WEBSITE}}':  brand.company.website,
  };

  let html = template;
  for (const [placeholder, value] of Object.entries(replacements)) {
    html = html.split(placeholder).join(value);
  }
  return html;
}

/**
 * Render HTML to PDF using Chrome via playwright-core.
 *
 * @param {string} html - Full HTML document
 * @param {string} outputPath - Absolute path for the output PDF
 * @param {object} meta - Metadata for header/footer
 * @returns {Promise<string>} The output path
 */
async function renderPDF(html, outputPath, meta = {}) {
  const browser = await chromium.launch({
    channel: 'chrome',
    headless: true,
  });

  try {
    const page = await browser.newPage();

    await page.setContent(html, { waitUntil: 'networkidle' });

    // Short pause to ensure fonts and layout settle
    await page.waitForTimeout(500);

    const footerBiz = meta.businessName || '';
    const footerCompany = brand.company.name;

    await page.pdf({
      path: outputPath,
      format: 'Letter',
      printBackground: true,
      margin: {
        top: '0.4in',
        bottom: '0.6in',
        left: '0in',
        right: '0in',
      },
      displayHeaderFooter: true,
      headerTemplate: '<span></span>',
      footerTemplate: `
        <div style="width: 100%; font-size: 7pt; font-family: 'Segoe UI', system-ui, sans-serif; color: #7F8C8D; display: flex; justify-content: space-between; padding: 0 60px;">
          <span>${footerCompany} &mdash; ${footerBiz}</span>
          <span>Page <span class="pageNumber"></span> of <span class="totalPages"></span></span>
        </div>
      `,
    });

    return outputPath;
  } finally {
    await browser.close();
  }
}

/**
 * Main render function: load template + CSS, assemble, render PDF.
 *
 * @param {object} parsed - Output from parser.parse()
 * @param {string} outputPath - Where to save the PDF
 * @param {object} options - { template: 'audit' }
 * @returns {Promise<string>} The output path
 */
async function render(parsed, outputPath, options = {}) {
  const templateName = options.template || 'audit';
  const templatePath = path.join(TEMPLATES_DIR, `${templateName}.html`);
  const cssPath = path.join(TEMPLATES_DIR, 'styles.css');

  if (!fs.existsSync(templatePath)) {
    throw new Error(`Template not found: ${templatePath}`);
  }
  if (!fs.existsSync(cssPath)) {
    throw new Error(`Stylesheet not found: ${cssPath}`);
  }

  const template = fs.readFileSync(templatePath, 'utf8');
  const rawCSS = fs.readFileSync(cssPath, 'utf8');
  const css = interpolateCSS(rawCSS);

  const html = assembleHTML(template, css, parsed);

  return renderPDF(html, outputPath, parsed.meta);
}

module.exports = { render };
