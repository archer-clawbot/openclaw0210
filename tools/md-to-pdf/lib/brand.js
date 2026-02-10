'use strict';

const fs = require('fs');
const path = require('path');

// Read the SVG file and encode as base64 data URI
const logoSvgPath = path.join(__dirname, '..', 'assets', 'logo.svg');
let logoDataUri = '';
try {
  const svgContent = fs.readFileSync(logoSvgPath, 'utf8');
  logoDataUri = 'data:image/svg+xml;base64,' + Buffer.from(svgContent).toString('base64');
} catch {
  // Fallback: empty string if logo not found
  logoDataUri = '';
}

module.exports = {
  colors: {
    primary:   '#1B2A4A', // Navy
    secondary: '#2E86AB', // Teal
    accent:    '#F18F01', // Amber
    success:   '#2D8B46', // Green
    danger:    '#C0392B', // Red
    warning:   '#E67E22', // Orange
    neutral:   '#7F8C8D', // Gray
    light:     '#F4F6F8', // Light background
    white:     '#FFFFFF',
    text:      '#2C3E50', // Body text
    textLight: '#6C7A89', // Secondary text
    border:    '#DDE2E8', // Table borders
  },

  fonts: {
    body:  "'Inter', 'Segoe UI', system-ui, -apple-system, sans-serif",
    mono:  "'Cascadia Code', 'Consolas', 'Courier New', monospace",
    heading: "'Inter', 'Segoe UI', system-ui, -apple-system, sans-serif",
  },

  logo: {
    dataUri: logoDataUri,
    width: 280,
    height: 48,
  },

  company: {
    name: 'LocalCatalyst.ai',
    tagline: 'AI-Powered Local SEO',
    website: 'localcatalyst.ai',
  },
};
