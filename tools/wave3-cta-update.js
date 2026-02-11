const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, '..', 'deliverables', 'localcatalyst', 'scribe');

// Get all .md files, excluding platform pages (already have correct CTAs)
const files = fs.readdirSync(dir)
  .filter(f => f.endsWith('.md') && !f.includes('-platform-'))
  .map(f => path.join(dir, f));

console.log(`Processing ${files.length} files...`);

// Ordered replacement rules (most specific first)
const replacements = [
  // URL replacements
  [/\/free-seo-audit\//g, '/services/seo-audit/'],

  // Full markdown link CTAs — specific patterns
  [/\[Schedule Your Free Strategy Call\]\(\/contact\/\)/gi, '[Browse Our Services](/services/)'],
  [/\[Schedule a Free Strategy Call\]\(\/contact\/\)/gi, '[Browse Our Services](/services/)'],
  [/\[Schedule a Strategy Call\]\(\/contact\/\)/gi, '[Browse Our Services](/services/)'],
  [/\[Contact us\]\(\/contact\/\)/gi, '[See Our Services](/services/)'],
  [/\[Contact Us Today\]\(\/contact\/\)/gi, '[Browse Our Services](/services/)'],

  // "Get Your Free X Audit" button-style CTAs
  [/\*\*\[Get Your Free Local SEO Audit\]\*\*/g, '**[Order Your SEO Audit](/services/seo-audit/)**'],
  [/\*\*\[Get Your Free SEO Audit\]\*\*/g, '**[Order Your SEO Audit](/services/seo-audit/)**'],
  [/\*\*\[Get Your Free Technical SEO Audit\]\*\*/g, '**[Order Your Technical SEO Audit](/services/seo-audit/)**'],
  [/\*\*\[Get Your Free On-Page SEO Audit\]\*\*/g, '**[Order Your On-Page SEO Audit](/services/seo-audit/)**'],
  [/\*\*\[Get Your Free GBP Audit\]\*\*/g, '**[Order GBP Optimization](/services/gbp-optimization/)**'],
  [/\*\*\[Schedule Your Free Strategy Call\]\*\*/g, '**[Browse Our Services](/services/)**'],
  [/\*\*\[Schedule a Free Strategy Call\]\*\*/g, '**[Browse Our Services](/services/)**'],

  // Markdown link CTAs with /free-seo-audit/ (already rewritten to /services/seo-audit/ above)
  [/\[Get [Yy]our [Ff]ree SEO [Aa]udit\]/g, '[Order Your SEO Audit]'],
  [/\[Get [Yy]our [Ff]ree [Ll]ocal SEO [Aa]udit\]/g, '[Order Your SEO Audit]'],
  [/\[Get [Yy]our [Ff]ree [Tt]echnical SEO [Aa]udit\]/g, '[Order Your Technical SEO Audit]'],
  [/\[Get [Yy]our [Ff]ree [Oo]n-[Pp]age SEO [Aa]udit\]/g, '[Order Your On-Page SEO Audit]'],
  [/\[Get [Yy]our [Ff]ree GBP [Aa]udit\]/g, '[Order GBP Optimization]'],
  [/\[Request a free SEO audit\]/gi, '[Order an SEO Audit]'],
  [/\[Request your free SEO audit\]/gi, '[Order Your SEO Audit]'],

  // Inline text CTAs (not inside links)
  [/\*\*\[Primary Button\]\*\* Get Your Free SEO Audit/g, '**[Primary Button]** Order Your SEO Audit'],
  [/\*\*\[Primary Button\]\*\* Get Your Free Local SEO Audit/g, '**[Primary Button]** Order Your SEO Audit'],
  [/\*\*\[Primary Button\]\*\* Get Your Free Technical SEO Audit/g, '**[Primary Button]** Order Your Technical SEO Audit'],
  [/\*\*\[CTA Button\]\*\* Get Your Free SEO Audit/g, '**[CTA Button]** Order Your SEO Audit'],
  [/\*\*\[CTA Button\]\*\* Get Your Free Local SEO Audit/g, '**[CTA Button]** Order Your SEO Audit'],
  [/\*\*\[CTA Button\]\*\* Get Your Free Technical SEO Audit/g, '**[CTA Button]** Order Your Technical SEO Audit'],
  [/\*\*\[CTA Button\]\*\* Get Your Free On-Page SEO Audit/g, '**[CTA Button]** Order Your On-Page SEO Audit'],
  [/\*\*\[CTA Button\]\*\* Get Your Free GBP Audit/g, '**[CTA Button]** Order GBP Optimization'],

  // Button text patterns
  [/\*\*Button Text:\*\* Get Your Free Local SEO Audit/g, '**Button Text:** Order Your SEO Audit'],
  [/\*\*CTA Button Text:\*\* Get Your Free Local SEO Audit/g, '**CTA Button Text:** Order Your SEO Audit'],

  // Standalone text CTA phrases (careful — only in CTA-like contexts)
  [/Get Your Free Local SEO Audit/g, 'Order Your SEO Audit'],
  [/Get Your Free SEO Audit/g, 'Order Your SEO Audit'],
  [/Get Your Free Technical SEO Audit/g, 'Order Your Technical SEO Audit'],
  [/Get Your Free On-Page SEO Audit/g, 'Order Your On-Page SEO Audit'],
  [/Get Your Free GBP Audit/g, 'Order GBP Optimization'],

  // "Request a free SEO audit" in running text (common blog CTA)
  [/[Rr]equest a \[?free SEO audit\]?/g, (match) => match.startsWith('R') ? 'Order an SEO audit' : 'order an SEO audit'],
  [/[Rr]equest your \[?free SEO audit\]?/g, (match) => match.startsWith('R') ? 'Order your SEO audit' : 'order your SEO audit'],

  // "Schedule a free strategy call" text
  [/[Ss]chedule a free strategy call/g, (match) => match.startsWith('S') ? 'Browse our services' : 'browse our services'],
  [/[Ss]chedule your free strategy call/gi, 'Browse our services'],

  // "Contact us for custom pricing and strategy" → platform pricing link
  [/Contact us for custom pricing and strategy\.?/gi, 'See our [pricing page](/pricing/) for all options.'],
  [/Contact us for custom pricing and scope\.?/gi, 'See our [pricing page](/pricing/) for all options.'],
  [/\*\*\[Contact us\]\(\/contact\/\)\*\* for custom pricing and strategy\.?/gi, 'See our **[pricing page](/pricing/)** for all options.'],

  // "Contact us for a custom quote"
  [/Contact us for a custom quote\.?/gi, 'See our [pricing page](/pricing/) for current rates.'],

  // Primary CTA references in implementation notes
  [/\*\*Primary CTA:\*\* Schedule free strategy call/g, '**Primary CTA:** Browse services catalog'],
  [/\*\*Primary CTA:\*\* Free SEO audit/g, '**Primary CTA:** Order SEO audit'],

  // "free audit" in meta descriptions — make it product-oriented
  [/Get your free audit today\./gi, 'Order your SEO audit today.'],

  // Free SEO audit as a list item in "what you'll get" sections
  [/- Free SEO audit \(on-page \+ GBP \+ technical\)/g, '- Comprehensive SEO audit (on-page + GBP + technical)'],
  [/Free SEO audit form submission/g, 'SEO audit order submission'],
  [/- Free consultation with no obligation/g, '- No-obligation product catalog — buy only what you need'],

  // "Get your free audit" generic
  [/\*\*\[Get your free audit\]\(\/free-seo-audit\/\)\*\*/gi, '**[Order your audit](/services/seo-audit/)**'],
  [/\[Get your free audit\]\(\/free-seo-audit\/\)/gi, '[Order your audit](/services/seo-audit/)'],
  [/Get your free audit/gi, 'Order your SEO audit'],

  // agency → platform language in CTA contexts only
  [/\*\*Q: What if I'm not ready to hire an agency\?\*\*/g, "**Q: What if I'm not ready for managed SEO?**"],
];

let totalChanges = 0;
let filesChanged = 0;

for (const file of files) {
  const original = fs.readFileSync(file, 'utf8');
  let content = original;

  for (const [pattern, replacement] of replacements) {
    content = content.replace(pattern, replacement);
  }

  if (content !== original) {
    fs.writeFileSync(file, content, 'utf8');
    filesChanged++;
    // Count approximate changes
    const changes = original.length - content.length; // rough indicator
    console.log(`  Updated: ${path.basename(file)}`);
  }
}

console.log(`\nDone. ${filesChanged} files updated out of ${files.length} processed.`);
