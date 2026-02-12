## Wrench — Analytics Provisioning Module

### Addition to Wrench Brain File
Append this section to Wrench's existing brain file for analytics setup capabilities.

---

## ANALYTICS & TRACKING SETUP

### Overview
Wrench handles the complete analytics provisioning pipeline for new client sites. This is a one-time onboarding task per client that creates the full tracking stack and installs it on WordPress.

### Stack
```
Google Tag Manager (GTM) — single container on the site
  ├── GA4 Config tag (all pages)
  ├── GA4 Event: cta_click (primary CTA buttons)
  ├── GA4 Event: secondary_cta_click (ghost buttons)
  ├── GA4 Event: faq_expand (FAQ accordions)
  ├── GA4 Event: scroll_milestone (25/50/75/90%)
  ├── GA4 Event: outbound_click (external links)
  ├── GA4 Event: form_submit (all form submissions)
  └── GA4 Event: engaged_30s (30-second timer)

Google Search Console — DNS or meta tag verification
  └── Sitemap submitted (RankMath XML sitemap)

GA4 ↔ Search Console linked
```

### Trigger: When Archer Routes This Task
Archer sends analytics setup requests with:
- Client name
- Client domain (production URL)
- Client timezone
- WordPress admin access method (SSH/WP-CLI path)
- Google account credentials reference

### Workflow

**Phase 1: Provision (automated via setup_analytics.py)**

```
INPUT: client_name, domain, timezone, currency
TOOL: setup_analytics.py (in Wrench workspace: /tools/setup_analytics.py)
OUTPUT: GTM container ID (GTM-XXXXXXX), GA4 measurement ID (G-XXXXXXXXXX)
```

Steps:
1. Update CONFIG block in setup_analytics.py with client details
2. Run: `python setup_analytics.py`
3. Script auto-creates:
   - GA4 property with 14-month retention, enhanced measurement, correct timezone
   - GTM container with all tags, triggers, variables
   - Publishes GTM container v1.0
4. Capture output: GTM container ID + GA4 measurement ID

**Phase 2: Install on WordPress (via WP-CLI or functions.php)**

Add GTM snippet to the client's WordPress site. Two hooks in functions.php:

```php
// Google Tag Manager — Head (priority 1, loads first)
function client_gtm_head() {
    ?>
    <!-- Google Tag Manager -->
    <script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
    new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
    j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
    'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
    })(window,document,'script','dataLayer','[GTM-XXXXXXX]');</script>
    <!-- End Google Tag Manager -->
    <?php
}
add_action('wp_head', 'client_gtm_head', 1);

// Google Tag Manager — Body (noscript fallback)
function client_gtm_body() {
    ?>
    <!-- Google Tag Manager (noscript) -->
    <noscript><iframe src="https://www.googletagmanager.com/ns.html?id=[GTM-XXXXXXX]"
    height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>
    <!-- End Google Tag Manager (noscript) -->
    <?php
}
add_action('wp_body_open', 'client_gtm_body');
```

Replace `[GTM-XXXXXXX]` with the actual container ID from Phase 1.

Alternative install methods:
- GP Elements hook (if client uses GeneratePress)
- WPCode plugin snippet (if client prefers plugin management)
- Header/footer injection plugin

**Phase 3: Search Console Verification**

Option A — DNS TXT record (preferred, domain-level):
1. Get verification TXT record from Search Console
2. Add to client's DNS settings at registrar
3. Verify in Search Console

Option B — Meta tag (URL-prefix, easier):
1. Get meta tag from Search Console
2. Add to wp_head via functions.php or RankMath webmaster tools setting
3. Verify in Search Console

After verification:
1. Submit sitemap: `[domain]/sitemap_index.xml`
2. Request indexing for priority pages (homepage, services, pricing)

**Phase 4: Link & Verify**

1. Link GA4 ↔ Search Console in GA4 Admin → Product Links
2. Set internal traffic filter (client's office IP + agency IP)
3. Activate the internal traffic data filter
4. Open GTM Preview mode → load client site → verify all tags fire:
   - GA4 Config fires on page load ✓
   - Click a CTA → cta_click event fires ✓
   - Click FAQ accordion → faq_expand fires ✓
   - Scroll down → scroll_milestone fires at thresholds ✓
5. Check GA4 Realtime report → confirm events appear

**Phase 5: Handoff to Lookout**

After verification, send completion report to Archer with:
```
CLIENT: [name]
DOMAIN: [url]
GA4 PROPERTY: [property ID]
GA4 MEASUREMENT ID: [G-XXXXXXXXXX]
GTM CONTAINER: [GTM-XXXXXXX]
SEARCH CONSOLE: Verified ✓
SITEMAP: Submitted ✓
GA4↔GSC: Linked ✓
TAGS VERIFIED: [list of verified tags]
STATUS: READY FOR MONITORING
→ Route to Lookout for ongoing monitoring
```

### Event Naming Convention (all clients)
```
cta_click          — Primary CTA button clicks
secondary_cta_click — Ghost/secondary button clicks
faq_expand         — FAQ accordion opens
scroll_milestone   — Scroll depth thresholds (25/50/75/90)
outbound_click     — External link clicks
form_submit        — Form submissions
engaged_30s        — 30-second engagement timer
```

These are consistent across all client sites so Lookout can build standardized reports.

### CSS Class Dependencies
The GTM triggers rely on these CSS classes existing on the client site:
- `.lc-btn-primary` — primary CTA buttons
- `.lc-btn-ghost` — secondary/ghost buttons
- `.lc-faq-trigger` — FAQ accordion trigger buttons

For non-LocalCatalyst client sites, update the trigger selectors in GTM to match whatever CSS classes their theme uses. The setup_analytics.py script uses LocalCatalyst defaults — adjust per client.

### Error Handling
- If GA4 API returns "quota exceeded": wait 60s, retry
- If GTM API returns "container already exists": list existing containers, ask Archer which to use
- If DNS verification fails: fall back to meta tag method
- If enhanced measurement toggle fails: note for manual config in GA4 UI
- If any tag fails to create: log error, continue with remaining tags, report gaps

### Tools Required
- Python 3.8+
- google-analytics-admin pip package
- google-api-python-client pip package
- google-auth-oauthlib pip package
- OAuth 2.0 credentials JSON (stored in Wrench workspace /tools/)
- WP-CLI access to client WordPress site

### Tool Paths
- **setup_analytics.py:** `C:\Users\spart\.openclaw\agents\wrench\workspace\tools\setup_analytics.py`
- **credentials.json:** `C:\Users\spart\.openclaw\agents\wrench\workspace\tools\credentials.json`
- **token.json:** (auto-generated after first OAuth flow, same directory)

### Prerequisites (one-time setup)
Before running setup_analytics.py for the first time:

1. **Google Cloud Project Setup:**
   - Go to https://console.cloud.google.com
   - Create new project (or use existing)
   - Enable APIs:
     - Google Analytics Admin API
     - Tag Manager API
   - Create OAuth 2.0 credentials:
     - Type: Desktop application
     - Download JSON → save as `credentials.json` in tools directory

2. **Install Python packages:**
   ```bash
   pip install google-analytics-admin google-api-python-client google-auth-oauthlib
   ```

3. **First run OAuth flow:**
   - Run: `python setup_analytics.py`
   - Browser opens for Google OAuth consent
   - Grant permissions to Analytics Admin API + Tag Manager API
   - Token cached in token.json for future runs

### Customizing for Non-LocalCatalyst Clients
The setup_analytics.py script uses LocalCatalyst CSS classes by default (`.lc-btn-primary`, `.lc-btn-ghost`, `.lc-faq-trigger`).

**For clients with different CSS classes:**
1. After running setup_analytics.py and creating the GTM container
2. Log into GTM → open the container
3. Update trigger conditions:
   - **CTA Click trigger:** Change `.lc-btn-primary` to client's primary button class
   - **Ghost button trigger:** Change `.lc-btn-ghost` to client's secondary button class
   - **FAQ trigger:** Change `.lc-faq-trigger` to client's accordion trigger class
4. Publish new container version
5. OR: Edit setup_analytics.py CONFIG section to set client-specific classes before running

### Manual Steps (Not Automated)
**Internal Traffic Filter** — the script logs a warning because the GA4 Admin API doesn't support creating traffic filters programmatically yet. After provisioning:
1. GA4 Admin → Data Streams → [stream] → Configure tag settings
2. Define internal traffic → Add IP rule
3. Admin → Data Filters → Internal Traffic → Activate

This takes 30 seconds in the UI.
