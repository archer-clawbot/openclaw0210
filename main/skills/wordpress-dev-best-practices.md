# WordPress Development Best Practices

**For:** Wrench (site optimization) and Builder (new site builds)  
**Purpose:** Prevent HTML parsing issues, deployment failures, and cache-related bugs

---

## Deploy Fixes Sitewide, Not Page-by-Page

**RULE:** When fixing a block/class-specific issue, ALWAYS check if that class/block appears elsewhere on the site and fix it globally.

### The Pattern

1. **Identify the issue class/selector** (e.g., `.lc-faq-trigger`, `.woocommerce-button`, `.custom-hero`)
2. **Scan the site for ALL occurrences** (don't assume it's just one page)
3. **Deploy the fix globally** via:
   - Child theme `style.css`
   - GeneratePress Additional CSS (Customizer)
   - Global code snippet (via Code Snippets plugin or functions.php)
4. **Never add page-specific CSS blocks** unless the issue is truly unique to that page

### Why This Matters

**Bad approach (page-by-page):**
```python
# Add CSS to page 91
page_91_content = "<style>.lc-faq-trigger:hover { ... }</style>" + page_91_content
update_page(91, page_91_content)

# Later: same issue on page 157
page_157_content = "<style>.lc-faq-trigger:hover { ... }</style>" + page_157_content
update_page(157, page_157_content)
# Now you have duplicate CSS on multiple pages
```

**Good approach (sitewide):**
```python
# Scan for the class across the site
pages_with_class = []
for page in all_pages:
    if '.lc-faq-trigger' in page['content']:
        pages_with_class.append(page['id'])

print(f"Found .lc-faq-trigger on {len(pages_with_class)} pages: {pages_with_class}")

# Deploy once, globally
add_global_css("""
.lc-faq-trigger:hover,
.lc-faq-trigger:focus {
    background: transparent !important;
    color: inherit !important;
}
""")
```

### Sitewide Deployment Methods

**1. GeneratePress Additional CSS** (preferred for live sites):
```python
# Via Customizer API (not REST API - custom_css not exposed)
# Use wp-cli or direct database update
exec("wp option update theme_mods_generatepress '...'")
```

**2. Child Theme style.css** (best for permanent fixes):
```python
child_css_path = "/home/user/public_html/wp-content/themes/localcatalyst/style.css"

with open(child_css_path, 'a') as f:
    f.write("""
/* Fix FAQ button hover - 2026-02-12 */
.lc-faq-trigger:hover,
.lc-faq-trigger:focus {
    background: transparent !important;
}
""")
```

**3. Code Snippets Plugin** (if CSS needs dynamic logic):
```python
snippet = {
    'code': '''
add_action('wp_head', function() {
    echo '<style>.lc-faq-trigger:hover { background: transparent !important; }</style>';
}, 100);
''',
    'name': 'Global FAQ Hover Fix',
    'scope': 'global',
    'active': True
}
# Deploy via Code Snippets API (if available) or direct database insert
```

### When Page-Specific IS Appropriate

- Issue is unique to one page's custom layout
- Page uses a different theme/template than the rest of the site
- Fix conflicts with global styles elsewhere

**Even then:** Document why it's page-specific in a comment.

---

## Critical Rule: Always Escape Code Examples

**Problem:** WordPress content often includes instructional code examples. If HTML tags appear in backticks without escaping, browsers parse them as real HTML, breaking the page.

### Examples That Break Pages

```markdown
❌ WRONG (breaks the page):
"It sits in a `<script>` tag in your `<head>`"

✅ CORRECT (displays as text):
"It sits in a `&lt;script&gt;` tag in your `&lt;head&gt;`"
```

### Common Tags That MUST Be Escaped

When these appear in instructional text (e.g., in backticks or code examples), escape them:

- `<script>` → `&lt;script&gt;`
- `</script>` → `&lt;/script&gt;`
- `<head>` → `&lt;head&gt;`
- `<body>` → `&lt;body&gt;`
- `<html>` → `&lt;html&gt;`
- `<style>` → `&lt;style&gt;`
- `<div>`, `<p>`, `<span>`, etc. → Escape if they're examples, not actual layout

### Why This Matters

**Unclosed `<script>` tags cause catastrophic failures:**
1. Browser sees `<script>` and starts JavaScript mode
2. Everything after becomes unparseable
3. Sidebar, footer, and remaining content disappear from DOM
4. Users see a broken half-page

**Detection pattern:**
```python
import re

# Find unescaped code examples
pattern = r'`(</?(?:script|head|body|html|style)[^`]*>)`'
matches = re.findall(pattern, content)

if matches:
    print(f"Found {len(matches)} unescaped code examples")
    # Replace with HTML entities
    content = re.sub(r'`<script([^`]*)>`', r'`&lt;script\1&gt;`', content)
    content = re.sub(r'`</script>`', r'`&lt;/script&gt;`', content)
```

---

## WordPress Filters Modify Content During Rendering

### The `wpautop` Filter

WordPress automatically wraps standalone content in `<p>` tags. This causes issues with:

**1. Standalone HTML Comments**
```html
<!-- HERO SECTION -->
<section class="lc-hero">
```

WordPress renders as:
```html
<p><!-- HERO SECTION --></p>
<section class="lc-hero">
```

**Problem:** Browser auto-closes `<p>` when it sees `<section>` (block element), creating an orphaned `</p>`.

**Solution:** Remove standalone HTML comments entirely, or wrap them in proper containers.

**2. Block Elements Inside P Tags**
```html
<p>
  <div>This is invalid HTML</div>
</p>
```

Browser auto-closes the `<p>` before the `<div>`, breaking your structure.

**Rule:** Never put block elements (`<div>`, `<section>`, `<article>`, etc.) inside `<p>` tags.

---

## Post-Deployment Verification (MANDATORY)

**Never claim "deployment complete" without verifying end-user experience.**

### Checklist After Every Deployment

1. **Fetch rendered HTML from live URL**
   ```python
   import requests
   r = requests.get('https://example.com/page/')
   html = r.text
   ```

2. **Check for expected elements**
   ```python
   assert '<aside' in html, "Sidebar missing from HTML"
   assert '<footer' in html, "Footer missing from HTML"
   ```

3. **Verify no unescaped code examples**
   ```python
   import re
   unescaped = re.findall(r'[^&]<script[^>]*>', html)
   if unescaped:
       print(f"WARNING: {len(unescaped)} unescaped <script> tags")
   ```

4. **Test DOM parsing with browser automation**
   ```python
   # Use browser tool to check DOM
   sidebar = document.querySelector('aside')
   footer = document.querySelector('footer')
   total_elements = document.querySelectorAll('*').length
   
   # Healthy pages have 200+ elements
   if total_elements < 150:
       print("WARNING: Low element count suggests parser stopped early")
   ```

5. **Compare database vs rendered output**
   ```python
   # Fetch from REST API
   auth_header = {'Authorization': 'Basic {base64_credentials}'}
   db_content = requests.get(
       'https://example.com/wp-json/wp/v2/pages/123?context=edit',
       headers=auth_header
   ).json()['content']['raw']
   
   # Fetch rendered HTML
   rendered = requests.get('https://example.com/page/').text
   
   # Check for major differences
   if '<aside' in db_content and '<aside' not in rendered:
       print("ERROR: Sidebar in database but not rendered")
   ```

---

## HTML Structure Validation

### Tag Balance Checks

Before deploying, verify all tags are balanced:

```python
import re

def check_tag_balance(html, tag):
    opens = len(re.findall(f'<{tag}[\\s>]', html))
    closes = len(re.findall(f'</{tag}>', html))
    return opens, closes, opens - closes

# Critical tags to check
for tag in ['div', 'p', 'section', 'script', 'style']:
    opens, closes, diff = check_tag_balance(html, tag)
    if diff != 0:
        print(f"UNBALANCED {tag}: {opens} opens, {closes} closes, diff={diff}")
```

### Common HTML Parsing Killers

1. **Unclosed script/style tags** → Everything after becomes unparseable
2. **Nested P tags** → Browser auto-closes, breaking structure
3. **Block elements in P tags** → Auto-closes P, orphans closing tag
4. **Mismatched div depth** → Sidebar/footer end up outside containers

**Quick diagnosis:**
```python
# Find where parser might break
entry_content_start = html.find('<div class="entry-content"')
aside_start = html.find('<aside', entry_content_start)

before_aside = html[entry_content_start:aside_start]

# Check div balance in this section
div_opens = len(re.findall(r'<div[\s>]', before_aside))
div_closes = len(re.findall(r'</div>', before_aside))

if div_opens != div_closes:
    print(f"DIV IMBALANCE before aside: {div_opens} opens, {div_closes} closes")
```

---

## Cache Management

### When Deployment "Doesn't Work"

If you deploy a fix but the page still looks broken:

**1. Check if it's actually deployed**
```python
# Fetch from WordPress REST API (bypasses cache)
content = requests.get(
    'https://example.com/wp-json/wp/v2/pages/123',
    headers={'Authorization': 'Basic {credentials}'}
).json()['content']['rendered']

if '<aside' in content:
    print("✅ Fix is in database")
else:
    print("❌ Fix didn't save — try again")
```

**2. Check cache headers**
```python
r = requests.get('https://example.com/page/')
cache_status = r.headers.get('X-LiteSpeed-Cache', 'unknown')
print(f"Cache status: {cache_status}")
# "hit" = serving cached version
# "miss" = serving fresh version
```

**3. Don't spend hours trying to clear cache remotely**

If cache won't clear after 3 attempts, escalate to the operator:
- Some hosting providers require server-level cache purging
- LiteSpeed Cache often ignores HTTP-level purge requests
- Browser cache can layer on top of server cache

**Escalation template:**
> "The fix is deployed to the database (verified via REST API), but LiteSpeed Cache is serving the old version. I've attempted:
> 1. HTTP purge headers (X-LiteSpeed-Purge)
> 2. Cache-bust query parameters
> 3. Updated page modification timestamp
>
> This requires manual cache purging via hosting control panel or SSH access."

### Cache-Busting Techniques (In Order)

1. **Add query parameter** (bypasses browser cache)
   ```
   https://example.com/page/?v=1234567890
   ```

2. **Update page modification timestamp** (forces new cache entry)
   ```python
   # Re-save page via REST API with tiny change
   requests.post(
       'https://example.com/wp-json/wp/v2/pages/123',
       headers=headers,
       data=json.dumps({'meta': {'_cache_bust': str(time.time())}})
   )
   ```

3. **X-LiteSpeed-Purge header** (sometimes works)
   ```python
   requests.get(url, headers={'X-LiteSpeed-Purge': url})
   ```

4. **Escalate** (if above fail after 3 tries)

---

## REST API vs Rendered Output

### Two Content Fields

WordPress REST API returns two versions:

1. **`content.raw`** (editable) — What's stored in the database
2. **`content.rendered`** (read-only) — After WordPress filters apply

**Always fetch with `?context=edit` to get `raw`:**
```python
# ✅ CORRECT
r = requests.get(
    'https://example.com/wp-json/wp/v2/pages/123?context=edit',
    headers={'Authorization': 'Basic {credentials}'}
)
raw_content = r.json()['content']['raw']

# ❌ WRONG (read-only, can't see what you're editing)
rendered = r.json()['content']['rendered']
```

### Updating Content

```python
import requests
import base64
import json

auth = base64.b64encode(b'username:app_password').decode()
headers = {
    'Authorization': f'Basic {auth}',
    'Content-Type': 'application/json'
}

# Fetch current content
r = requests.get(
    'https://example.com/wp-json/wp/v2/pages/123?context=edit',
    headers=headers
)
raw_content = r.json()['content']['raw']

# Modify it
fixed_content = raw_content.replace('broken', 'fixed')

# Update
update = requests.post(
    'https://example.com/wp-json/wp/v2/pages/123',
    headers=headers,
    data=json.dumps({'content': fixed_content})
)

if update.status_code == 200:
    print(f"✅ Updated: {update.json()['modified']}")
else:
    print(f"❌ Error: {update.text}")
```

---

## DOM Health Checks

### Healthy vs Broken Pages

**Healthy page indicators:**
- 200+ DOM elements (`document.querySelectorAll('*').length`)
- `aside` and `footer` elements exist
- No JavaScript console errors
- Content extends to the footer

**Broken page indicators:**
- < 150 DOM elements (parser stopped early)
- `querySelector('aside')` returns `null` but `<aside` is in `innerHTML`
- Content ends abruptly mid-article
- JavaScript code appears in article text

### Browser-Based Validation

```javascript
// Run in browser console or via automation
const validation = {
    sidebarExists: !!document.querySelector('aside'),
    footerExists: !!document.querySelector('footer'),
    totalElements: document.querySelectorAll('*').length,
    sidebarInHTML: document.body.innerHTML.includes('<aside'),
    articleComplete: document.querySelector('.entry-content')?.children.length > 5
};

console.log(validation);

// Red flags:
if (validation.sidebarInHTML && !validation.sidebarExists) {
    console.error('CRITICAL: Sidebar in HTML but not in DOM — parser broke');
}

if (validation.totalElements < 150) {
    console.error('WARNING: Low element count suggests parsing stopped early');
}
```

---

## Common WordPress Gotchas

### 1. Application Passwords ≠ Login Passwords

WordPress Application Passwords:
- Work ONLY for REST API authentication
- Do NOT work for `/wp-admin` login
- Must remove spaces when using programmatically

```python
# ✅ CORRECT — remove spaces from the app password
app_password = os.environ['WP_APP_PASSWORD'].replace(' ', '')

# ❌ WRONG (spaces from WordPress UI left in)
app_password = 'xxxx xxxx xxxx xxxx xxxx xxxx'  # raw from WP — strip spaces first
```

### 2. Comments Aren't Always Disabled

**Always disable comments on new sites:**
1. Settings → Discussion
2. Uncheck "Allow people to submit comments on new posts"
3. Prevents spam and comment moderation overhead

### 3. RankMath vs AIOSEO API Differences

- **RankMath:** `/wp-json/rankmath/v1/updateMeta`
- **AIOSEO:** `/wp-json/aioseo/v1/post/{id}`

Different plugins = different API endpoints. Check which SEO plugin is active first.

### 4. Code Snippets Plugin Deployment

Use REST API to deploy PHP snippets:
```python
snippet_data = {
    'title': 'Schema Markup',
    'code': '<?php /* your code here */',
    'scope': 'global',
    'active': True
}

requests.post(
    'https://example.com/wp-json/code-snippets/v1/snippets',
    headers=headers,
    data=json.dumps(snippet_data)
)
```

---

## Deployment Workflow (MANDATORY)

### Before Deployment

1. ✅ Validate HTML structure (tag balance)
2. ✅ Escape all code examples
3. ✅ Check for block elements in P tags
4. ✅ Verify no standalone HTML comments
5. ✅ Test content in local HTML file first (optional but recommended)

### During Deployment

1. ✅ Fetch current content with `?context=edit`
2. ✅ Make changes to `content.raw`
3. ✅ POST update via REST API
4. ✅ Verify 200 response
5. ✅ Check `modified` timestamp changed

### After Deployment (CRITICAL)

1. ✅ Fetch rendered content from REST API
2. ✅ Verify expected elements exist (`<aside>`, `<footer>`)
3. ✅ Load live URL in browser automation
4. ✅ Check DOM element count (should be 200+)
5. ✅ Verify `querySelector('aside')` and `querySelector('footer')` return elements
6. ✅ Screenshot full page
7. ✅ Check browser console for errors

**If any check fails:** Do NOT report "deployment complete." Investigate and fix before claiming success.

---

## When to Escalate

Escalate to Archer/Cody if:
- ✅ Deployment verified in database
- ✅ HTML structure validated
- ✅ Cache clearing attempted 3+ times
- ❌ Still not rendering correctly

Provide:
- Page ID and URL
- Exact issue (sidebar missing, footer broken, etc.)
- Database validation result (REST API check)
- Live page validation result (browser check)
- Cache status
- Steps already attempted

**Don't spend hours debugging in circles.** If the root cause isn't clear after 30 minutes, escalate with full diagnostics.

---

## Tools & Commands

### Fetch Page Content
```python
import requests
import base64

auth = base64.b64encode(b'user:password').decode()
headers = {'Authorization': f'Basic {auth}'}

# Get editable content
r = requests.get(
    'https://example.com/wp-json/wp/v2/pages/123?context=edit',
    headers=headers
)
content = r.json()['content']['raw']
```

### Find Page by Slug
```python
r = requests.get(
    'https://example.com/wp-json/wp/v2/pages?slug=my-page-slug',
    headers=headers
)
pages = r.json()
page_id = pages[0]['id'] if pages else None
```

### Update Page Content
```python
import json

update_data = {'content': fixed_content}
r = requests.post(
    'https://example.com/wp-json/wp/v2/pages/123',
    headers=headers,
    data=json.dumps(update_data)
)
```

### Validate HTML Structure
```python
import re

def validate_html(html):
    issues = []
    
    # Check for unescaped code examples
    unescaped = re.findall(r'`<(script|head|body|html)[^`]*>`', html)
    if unescaped:
        issues.append(f"Unescaped code examples: {len(unescaped)}")
    
    # Check tag balance
    for tag in ['div', 'script', 'style', 'section']:
        opens = len(re.findall(f'<{tag}[\\s>]', html))
        closes = len(re.findall(f'</{tag}>', html))
        if opens != closes:
            issues.append(f"{tag}: {opens} opens, {closes} closes")
    
    return issues

issues = validate_html(content)
if issues:
    print("HTML VALIDATION FAILED:")
    for issue in issues:
        print(f"  - {issue}")
```

---

---

## WordPress Theme Development

### Child Themes (ALWAYS Use for Modifications)

**Never edit parent themes directly** — updates will overwrite your changes.

**Creating a child theme:**
```bash
# SSH into server or use WP-CLI
cd /path/to/wp-content/themes/

# Create child theme directory
mkdir parent-theme-name-child
cd parent-theme-name-child

# Create style.css (required)
cat > style.css <<'EOF'
/*
Theme Name:   Parent Theme Name Child
Template:     parent-theme-name
Version:      1.0
*/
EOF

# Create functions.php (required)
cat > functions.php <<'EOF'
<?php
// Enqueue parent and child theme styles
function child_theme_enqueue_styles() {
    wp_enqueue_style('parent-style', get_template_directory_uri() . '/style.css');
    wp_enqueue_style('child-style', 
        get_stylesheet_directory_uri() . '/style.css',
        array('parent-style'),
        wp_get_theme()->get('Version')
    );
}
add_action('wp_enqueue_scripts', 'child_theme_enqueue_styles');
?>
EOF

# Activate via WP-CLI
wp theme activate parent-theme-name-child
```

### Theme File Hierarchy

WordPress loads template files in this order (first match wins):

```
1. Child theme directory
2. Parent theme directory
3. WordPress core fallbacks
```

**Common overrides:**
- `header.php` — Site header
- `footer.php` — Site footer
- `functions.php` — Theme functions (child functions.php loads AFTER parent)
- `page.php` — Default page template
- `single.php` — Single post template
- `archive.php` — Archive pages
- `404.php` — Not found page

**Custom templates:**
```php
<?php
/*
Template Name: Landing Page
Template Post Type: page
*/
get_header();
// Your custom HTML
get_footer();
?>
```

### Safe Function Modifications

**❌ WRONG — breaks if parent theme updates:**
```php
// In child theme functions.php
function parent_function_name() {
    // This won't work — parent version still loads first
}
```

**✅ CORRECT — use hooks and filters:**
```php
// Remove parent action
remove_action('wp_footer', 'parent_footer_function');

// Add your replacement
add_action('wp_footer', 'child_footer_function');

function child_footer_function() {
    // Your custom footer code
}
```

### Template Parts

**Overriding template parts:**
```
Parent: /themes/parent/template-parts/header/site-branding.php
Child:  /themes/parent-child/template-parts/header/site-branding.php
```

Copy the parent file to child theme (same directory structure), then modify.

### Hooks Priority

WordPress action hooks run in priority order (default: 10):

```php
// Run first (priority 1)
add_action('wp_head', 'critical_function', 1);

// Run at default (priority 10)
add_action('wp_head', 'normal_function');

// Run last (priority 999)
add_action('wp_head', 'late_function', 999);
```

**Common hooks:**
- `wp_head` — Inject into `<head>` (analytics, fonts)
- `wp_footer` — Inject before `</body>` (scripts)
- `wp_body_open` — Inject after `<body>` (GTM noscript)
- `wp_enqueue_scripts` — Load CSS/JS files
- `after_setup_theme` — Theme configuration

### Enqueueing Assets Properly

**❌ WRONG:**
```php
// Don't hardcode in header.php
<script src="<?php echo get_stylesheet_directory_uri(); ?>/js/custom.js"></script>
```

**✅ CORRECT:**
```php
function child_enqueue_custom_assets() {
    // CSS
    wp_enqueue_style('custom-styles', 
        get_stylesheet_directory_uri() . '/css/custom.css',
        array(), // Dependencies
        '1.0.0', // Version
        'all'    // Media
    );
    
    // JavaScript
    wp_enqueue_script('custom-scripts',
        get_stylesheet_directory_uri() . '/js/custom.js',
        array('jquery'), // Dependencies
        '1.0.0',         // Version
        true             // Load in footer
    );
}
add_action('wp_enqueue_scripts', 'child_enqueue_custom_assets');
```

### Theme Customization Best Practices

1. **Use Customizer API for settings:**
   ```php
   function child_customize_register($wp_customize) {
       $wp_customize->add_setting('header_color', array(
           'default' => '#ffffff',
           'transport' => 'refresh',
       ));
       
       $wp_customize->add_control(new WP_Customize_Color_Control(
           $wp_customize, 'header_color', array(
               'label' => 'Header Background Color',
               'section' => 'colors',
           )
       ));
   }
   add_action('customize_register', 'child_customize_register');
   ```

2. **Store custom settings in theme mods:**
   ```php
   // Save
   set_theme_mod('custom_setting', 'value');
   
   // Retrieve
   $value = get_theme_mod('custom_setting', 'default');
   ```

3. **Never hardcode paths:**
   ```php
   // ❌ WRONG
   <img src="/wp-content/themes/mytheme/images/logo.png">
   
   // ✅ CORRECT
   <img src="<?php echo get_stylesheet_directory_uri(); ?>/images/logo.png">
   ```

### GeneratePress / GP Premium Hooks

LocalCatalyst sites use GeneratePress. Key hooks:

```php
// Before header
add_action('generate_before_header', 'custom_function');

// Inside header
add_action('generate_inside_header', 'custom_function');

// Before content
add_action('generate_before_content', 'custom_function');

// Before footer
add_action('generate_before_footer', 'custom_function');

// Remove default elements
remove_action('generate_after_header', 'generate_featured_page_header_inside_single');
```

**GP Elements (Premium):**
- Create custom layouts via UI
- Hook into template positions
- Conditional display rules
- Better than hardcoding in theme files

### Custom Page Templates

Create in child theme root:

```php
<?php
/*
Template Name: Full Width Landing Page
Template Post Type: page, landing-page
*/

// Remove sidebar
add_filter('generate_sidebar_layout', function() { return 'no-sidebar'; });

get_header();
?>

<div class="landing-page-container">
    <?php
    while (have_posts()) {
        the_post();
        the_content();
    }
    ?>
</div>

<?php
get_footer();
?>
```

Assign in Page Editor → Page Attributes → Template dropdown.

### Theme Functions.php Organization

**Structure your child theme functions.php:**

```php
<?php
/**
 * Child Theme Functions
 * Parent Theme: GeneratePress
 */

// 1. Enqueue styles/scripts
require_once get_stylesheet_directory() . '/inc/enqueue.php';

// 2. Custom post types
require_once get_stylesheet_directory() . '/inc/post-types.php';

// 3. Theme customizations
require_once get_stylesheet_directory() . '/inc/customizer.php';

// 4. Hook modifications
require_once get_stylesheet_directory() . '/inc/hooks.php';

// 5. Utility functions
require_once get_stylesheet_directory() . '/inc/helpers.php';

// 6. Admin customizations
if (is_admin()) {
    require_once get_stylesheet_directory() . '/inc/admin.php';
}
```

Keep functions.php under 200 lines — split into organized files.

### Debugging Theme Issues

**Check template file being used:**
```php
// Add to functions.php temporarily
add_filter('template_include', function($template) {
    error_log('Template: ' . $template);
    return $template;
});

// Check: tail -f /path/to/debug.log
```

**Check what hooks are firing:**
```php
add_action('all', function($hook) {
    if (strpos($hook, 'generate_') === 0) {
        error_log('Hook: ' . $hook);
    }
});
```

**Enable WP_DEBUG:**
```php
// In wp-config.php
define('WP_DEBUG', true);
define('WP_DEBUG_LOG', true);
define('WP_DEBUG_DISPLAY', false);
define('SCRIPT_DEBUG', true);

// Check: /wp-content/debug.log
```

### Theme Update Safety

**Before updating a parent theme:**

1. ✅ Verify all customizations are in child theme
2. ✅ Test update on staging site first
3. ✅ Backup database and files
4. ✅ Check theme changelog for breaking changes
5. ✅ Document custom hooks that might change

**After updating:**
1. ✅ Clear all caches
2. ✅ Test critical pages
3. ✅ Check browser console for JS errors
4. ✅ Verify custom functionality still works

### Common Theme Gotchas

1. **CSS specificity wars:**
   ```css
   /* ❌ WRONG — low specificity, parent theme wins */
   .button { color: red; }
   
   /* ✅ CORRECT — higher specificity */
   body .button { color: red; }
   
   /* OR use !important sparingly */
   .button { color: red !important; }
   ```

2. **jQuery conflicts:**
   ```php
   // Always wrap in noConflict mode
   jQuery(document).ready(function($) {
       // Use $ here safely
       $('.element').click(function() { });
   });
   ```

3. **Mobile menu breakpoints:**
   ```php
   // GeneratePress: customize mobile breakpoint
   add_filter('generate_mobile_menu_breakpoint', function() {
       return '1024'; // Default is 768
   });
   ```

4. **Plugin dependency issues:**
   ```php
   // Check if plugin is active before running code
   if (class_exists('RankMath')) {
       // RankMath-specific code
   }
   ```

### Theme Performance

**Optimize asset loading:**
```php
function child_optimize_assets() {
    // Remove unused parent assets
    wp_dequeue_style('parent-unused-css');
    wp_dequeue_script('parent-unused-js');
    
    // Defer non-critical JS
    add_filter('script_loader_tag', function($tag, $handle) {
        if ('custom-script' === $handle) {
            return str_replace(' src', ' defer src', $tag);
        }
        return $tag;
    }, 10, 2);
    
    // Preload critical assets
    add_action('wp_head', function() {
        echo '<link rel="preload" href="' . get_stylesheet_directory_uri() . '/fonts/custom.woff2" as="font" type="font/woff2" crossorigin>';
    }, 1);
}
add_action('wp_enqueue_scripts', 'child_optimize_assets', 100);
```

### Theme Documentation

**Document changes in child theme README.md:**

```markdown
# LocalCatalyst Child Theme

## Custom Modifications

### Layout
- Removed default page header (functions.php line 45)
- Added custom hero section (template-parts/hero.php)
- Modified footer layout (footer.php)

### Functionality
- Custom CTA tracking (inc/tracking.php)
- Form submission handling (inc/forms.php)
- Service page schema (inc/schema.php)

### Hooks Modified
- `generate_before_header` — GTM container
- `wp_footer` — Custom analytics events
- `the_content` — Auto-inject CTAs after 3rd paragraph

### Dependencies
- GeneratePress 3.4+
- GP Premium (Elements + WooCommerce module)
- RankMath SEO
- Contact Form 7

## Testing Checklist
- [ ] Homepage displays correctly
- [ ] Service pages show schema
- [ ] Contact form submits
- [ ] Mobile menu works
- [ ] Analytics fires
```

---

## Remember

1. **Escape code examples** — Always
2. **Verify after deployment** — Never trust the database alone
3. **Don't fight cache for hours** — Escalate after 3 attempts
4. **Check DOM, not just HTML** — Browser rendering is what matters
5. **Tag balance matters** — Unbalanced divs break layouts
6. **Use child themes** — Never edit parent themes directly
7. **Document customizations** — Future you will thank you

**The goal:** Deploy once, verify thoroughly, move on. No 2-hour debugging sessions for cache issues.
