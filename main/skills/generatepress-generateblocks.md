# GeneratePress & GenerateBlocks Premium

**For:** Wrench (site optimization), Builder (new site builds), and Archer (task routing)  
**Purpose:** Master the GeneratePress theme and GenerateBlocks Premium plugin for LocalCatalyst client sites

---

## Overview

**GeneratePress** is our standard WordPress theme for all LocalCatalyst client sites. It's lightweight, performance-focused, and highly customizable.

**GenerateBlocks Premium** is our block-building toolkit for custom layouts without page builders.

**Why we use them:**
- ✅ Fast performance (scores 100 on PageSpeed)
- ✅ Modular premium add-ons (Elements, Typography, Spacing, etc.)
- ✅ Developer-friendly hooks and filters
- ✅ No bloat, no page builders
- ✅ Schema-ready structure

---

## Core Concepts

### GeneratePress Theme Structure

```
GeneratePress (free theme)
├── Core theme (minimal, fast)
├── Customizer integration (colors, typography, layout)
└── Hook system (70+ action/filter hooks)

GP Premium (add-on plugin)
├── Elements module (custom layouts, hooks, conditions)
├── Typography module (Google Fonts, custom font stacks)
├── Spacing module (padding/margin control)
├── Colors module (advanced color schemes)
├── Backgrounds module (gradients, images, videos)
├── Menu Plus module (mega menus, off-canvas, mobile menus)
├── Blog module (post layouts, featured images)
├── WooCommerce module (product layouts, cart customization)
├── Sections module (full-width sections, containers)
└── Copyright module (footer customization)
```

### GenerateBlocks (free plugin)

```
GenerateBlocks
├── Container (flexbox/grid layouts)
├── Grid (responsive column layouts)
├── Headline (styled headings)
├── Buttons (call-to-action buttons)
├── Image (responsive images)
└── Query Loop (dynamic content from posts/CPT)

GenerateBlocks Pro (premium add-on)
├── Effects (animations, transforms, interactions)
├── Advanced typography (letter spacing, text shadow)
├── Global styles (reusable design tokens)
├── Pattern Library (pre-built layouts)
└── Dynamic content (ACF fields, meta, user data)
```

---

## Installation & Setup

### Installing GP Premium

1. **Download** from GeneratePress.com account
2. **Upload** via WordPress Admin → Plugins → Add New → Upload
3. **Activate** GP Premium plugin
4. **Enter license key** in Appearance → GeneratePress → License

**Critical:** GP Premium is a plugin, NOT a theme. Install it AFTER activating GeneratePress theme.

### Activating Modules

Appearance → GeneratePress → Modules

**Recommended modules for LocalCatalyst sites:**
- ✅ **Elements** (required for custom layouts)
- ✅ **Typography** (Google Fonts integration)
- ✅ **Spacing** (fine-tuned padding/margin)
- ✅ **Colors** (brand color management)
- ✅ **Sections** (hero sections, full-width layouts)
- ⚠️ **WooCommerce** (only if client sells products)
- ⚠️ **Menu Plus** (only if complex navigation needed)

**Don't activate what you don't need** — keeps admin UI clean.

### Child Theme Setup

**Always use a child theme for customizations.**

```bash
# SSH into server
cd /path/to/wp-content/themes/
mkdir generatepress-child
cd generatepress-child

# Create style.css
cat > style.css <<'EOF'
/*
Theme Name:   GeneratePress Child
Template:     generatepress
Version:      1.0.0
*/
EOF

# Create functions.php
cat > functions.php <<'EOF'
<?php
/**
 * GeneratePress Child Theme Functions
 */

// Enqueue child theme styles
add_action('wp_enqueue_scripts', 'gp_child_enqueue_styles', 100);
function gp_child_enqueue_styles() {
    wp_enqueue_style(
        'generatepress-child',
        get_stylesheet_directory_uri() . '/style.css',
        array('generate-style'),
        wp_get_theme()->get('Version')
    );
}
?>
EOF

# Activate child theme via WP-CLI
wp theme activate generatepress-child
```

---

## GeneratePress Hooks

GeneratePress provides 70+ hooks for injecting custom code without editing theme files.

### Most Used Hooks

```php
<?php
// Before site header
add_action('generate_before_header', 'custom_function');

// Inside header (before navigation)
add_action('generate_inside_header', 'custom_function');

// After header (hero sections)
add_action('generate_after_header', 'custom_function');

// Before main content
add_action('generate_before_content', 'custom_function');

// After main content
add_action('generate_after_content', 'custom_function');

// Before footer
add_action('generate_before_footer', 'custom_function');

// Inside footer
add_action('generate_footer', 'custom_function');

// After footer (analytics, scripts)
add_action('generate_after_footer', 'custom_function');
?>
```

### Hook Locations Map

```
<body>
  generate_before_header
  <header>
    generate_inside_header
      generate_before_logo
      [Site Logo]
      generate_after_logo
      
      generate_before_navigation
      [Primary Navigation]
      generate_after_navigation
  </header>
  generate_after_header

  <div id="page">
    generate_before_main_content
    
    <main>
      generate_before_content
      [Page Content]
      generate_after_content
    </main>
    
    <aside>
      generate_before_sidebar_content
      [Sidebar Widgets]
      generate_after_sidebar_content
    </aside>
    
    generate_after_main_content
  </div>

  generate_before_footer
  <footer>
    generate_footer
    [Footer Widgets]
    [Copyright]
  </footer>
  generate_after_footer
</body>
```

### Real-World Hook Examples

**1. Add Google Tag Manager (after opening <body>)**
```php
add_action('wp_body_open', 'add_gtm_noscript');
function add_gtm_noscript() {
    ?>
    <!-- Google Tag Manager (noscript) -->
    <noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-XXXXXXX"
    height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>
    <!-- End Google Tag Manager (noscript) -->
    <?php
}
```

**2. Add custom hero section after header**
```php
add_action('generate_after_header', 'custom_hero_section');
function custom_hero_section() {
    if (is_front_page()) {
        ?>
        <section class="hero-section">
            <div class="grid-container">
                <h1>Welcome to Our Site</h1>
                <a href="/services/" class="button">Get Started</a>
            </div>
        </section>
        <?php
    }
}
```

**3. Modify footer copyright text**
```php
add_filter('generate_copyright', 'custom_copyright');
function custom_copyright() {
    return '© ' . date('Y') . ' Your Company Name. All rights reserved.';
}
```

---

## GeneratePress Elements (Premium)

**Elements = Custom layouts/code injected via UI instead of code**

### Element Types

| Type | Purpose | Use Case |
|------|---------|----------|
| **Header** | Custom site header | Sticky header, custom logo layout |
| **Hook** | Inject HTML/PHP at any hook | Analytics, CTAs, notices |
| **Layout** | Custom page templates | Landing pages, custom layouts |
| **Block** | Reusable content blocks | Testimonials, pricing tables |
| **Section** | Full-width sections | Hero sections, backgrounds |

### Creating an Element

Appearance → Elements → Add New

**Example: Custom header element**
1. Type: Header
2. Display Rules: All locations (or specific pages)
3. Hook: generate_before_header
4. Content: Your HTML/CSS/PHP
5. Publish

**Pro tip:** Use Elements instead of editing theme files. Survives theme updates.

### Display Rules (Conditional Logic)

Elements can show/hide based on:
- Post type
- Taxonomy terms
- User role
- Device (mobile/desktop)
- Custom PHP conditions

**Example:** Show CTA only on service pages
```
Display Rule: Post Type = page
Conditional Logic: Exclude = Homepage, Contact
```

---

## GenerateBlocks Workflow

### Block Structure

GenerateBlocks uses **semantic HTML** (not divs soup):

```html
<!-- Container = wrapper, flexbox/grid -->
<div class="gb-container">
  
  <!-- Grid = column layout -->
  <div class="gb-grid">
    <div class="gb-grid-column">
      
      <!-- Headline = heading -->
      <h2 class="gb-headline">Your Heading</h2>
      
      <!-- Buttons = CTA -->
      <div class="gb-button-wrapper">
        <a class="gb-button" href="/contact/">Get Started</a>
      </div>
      
    </div>
  </div>
  
</div>
```

### Building a Hero Section with GenerateBlocks

1. Add **Container** block
   - Set background image
   - Padding: 100px top, 100px bottom
   - Set to full width

2. Inside Container, add **Grid** block
   - Columns: 1
   - Max width: 1200px
   - Center align

3. Inside Grid column, add:
   - **Headline** block (h1, custom typography)
   - **Paragraph** block (intro text)
   - **Buttons** block (CTA button)

**Save as pattern** for reuse across client sites.

### GenerateBlocks Pro Features

**1. Global Styles**
Define colors, fonts, spacing once → apply everywhere

```
Settings → GenerateBlocks → Global Styles
- Primary color: #10b981
- Button border radius: 4px
- Heading font: Inter
```

**2. Effects**
- Fade in on scroll
- Hover transforms (scale, rotate)
- Entrance animations

**3. Dynamic Content**
Pull data from ACF fields, post meta, user info

```
Headline block → Dynamic data → Post title
Button block → Dynamic data → ACF field: cta_url
```

---

## Common Customizations

### 1. Disable Sidebar on Specific Pages

```php
add_filter('generate_sidebar_layout', 'custom_sidebar_layout');
function custom_sidebar_layout($layout) {
    if (is_page('landing-page-slug')) {
        return 'no-sidebar';
    }
    return $layout;
}
```

### 2. Add Custom CSS Class to Body

```php
add_filter('body_class', 'custom_body_classes');
function custom_body_classes($classes) {
    if (is_singular('service')) {
        $classes[] = 'service-page';
    }
    return $classes;
}
```

### 3. Change Mobile Breakpoint

```php
add_filter('generate_mobile_menu_breakpoint', 'custom_mobile_breakpoint');
function custom_mobile_breakpoint() {
    return '1024'; // Default is 768px
}
```

### 4. Remove Page Title on Specific Pages

```php
add_filter('generate_show_title', 'hide_page_title');
function hide_page_title($show) {
    if (is_front_page()) {
        return false;
    }
    return $show;
}
```

### 5. Modify Navigation HTML

```php
add_filter('wp_nav_menu_items', 'add_custom_nav_item', 10, 2);
function add_custom_nav_item($items, $args) {
    if ($args->theme_location == 'primary') {
        $items .= '<li class="menu-item"><a href="/special-page/">Special</a></li>';
    }
    return $items;
}
```

---

## Performance Best Practices

### 1. Only Load What's Needed

```php
// Dequeue unused GeneratePress modules
add_action('wp_enqueue_scripts', 'remove_unused_gp_assets', 100);
function remove_unused_gp_assets() {
    // If not using Menu Plus
    if (!is_page('special-menu-page')) {
        wp_dequeue_style('generate-menu-plus');
        wp_dequeue_script('generate-menu-plus');
    }
}
```

### 2. Optimize Google Fonts Loading

Appearance → Customize → Typography

- Use **system font stack** when possible (faster)
- Limit font weights (regular + bold only)
- Use `font-display: swap` (default in GP)

### 3. Lazy Load Images

GeneratePress 3.0+ includes native lazy loading. No plugins needed.

### 4. Minimize CSS/JS

WP Rocket or similar will minify. Don't add custom minification.

---

## Troubleshooting

### Elements Not Showing

**Check:**
1. ✅ Element is Published (not Draft)
2. ✅ Display Rules match current page
3. ✅ Hook location is correct
4. ✅ Element has content
5. ✅ No PHP errors (check debug.log)

**Test:** Add `echo 'TEST';` in Element content. If it shows, Element works.

### Mobile Menu Not Working

**Check:**
1. ✅ Primary menu assigned (Appearance → Menus)
2. ✅ Mobile breakpoint set correctly
3. ✅ JavaScript not conflicting (check console)
4. ✅ Theme updated to latest version

### Styling Not Applying

**Common causes:**
1. ❌ CSS specificity too low (parent theme CSS wins)
2. ❌ Cache not cleared
3. ❌ Wrong selector (check browser inspector)

**Fix:** Increase specificity
```css
/* ❌ Too weak */
.button { color: red; }

/* ✅ Stronger */
.site-content .button { color: red; }

/* ✅ Nuclear option */
.button { color: red !important; }
```

### Child Theme Not Loading

**Check:**
1. ✅ `Template: generatepress` in child style.css header
2. ✅ Child theme activated (Appearance → Themes)
3. ✅ functions.php properly enqueues child styles

---

## GeneratePress vs GenerateBlocks

**When to use which:**

| Task | Use |
|------|-----|
| Site header/footer | **GeneratePress hooks** or **Elements (Header)** |
| Navigation menus | **WordPress Menu Builder** + GP Menu Plus (if needed) |
| Page layouts | **GenerateBlocks Container + Grid** |
| Hero sections | **GenerateBlocks** or **Elements (Section)** |
| Custom widgets | **WordPress Widgets** + GenerateBlocks |
| Styling (colors, fonts) | **Customizer** (Appearance → Customize) |
| PHP/functions | **Child theme functions.php** |
| CTAs, buttons | **GenerateBlocks Buttons** |
| Reusable components | **GenerateBlocks Patterns** |
| Conditional content | **Elements with Display Rules** |

---

## Documentation Reference

**Official Docs:** https://docs.generatepress.com/

### Key Sections

1. **General**
   - Installing GP Premium
   - Updating GP Premium
   - Debugging Tips
   - Child Theme Issues

2. **Customization**
   - Adding a Logo/Header
   - Sidebar Layout
   - Footer Widgets
   - Sticky Navigation
   - Mobile Header

3. **Pro Modules**
   - Elements Overview
   - Hooks Overview
   - Sections Overview
   - Header Element
   - Typography Module

4. **Developers**
   - Adding CSS (child theme)
   - Adding PHP (functions.php)
   - Using Hooks (action hooks)
   - Using Filters (modify output)
   - Beta Testing

### Hook Reference

**Full hook documentation:** https://docs.generatepress.com/article/hooks-overview/

**Common hooks:**
- `generate_before_header`
- `generate_inside_header`
- `generate_after_header`
- `generate_before_content`
- `generate_after_content`
- `generate_before_footer`
- `generate_footer`
- `wp_head` (WordPress core)
- `wp_footer` (WordPress core)
- `generate_404_text` (404 page content)

---

## LocalCatalyst Standards

### Theme Configuration

**Every LocalCatalyst site uses:**
- ✅ GeneratePress free theme (latest version)
- ✅ GP Premium plugin (all standard modules)
- ✅ GenerateBlocks free plugin
- ✅ GenerateBlocks Pro (if client budget allows)
- ✅ Child theme for customizations

**Don't use:**
- ❌ Elementor, Divi, or other page builders
- ❌ Visual Composer
- ❌ Beaver Builder (conflicts with our workflow)

### Design System

**Colors:**
- Primary: `#10b981` (teal-green)
- Secondary: `#0f172a` (dark blue-black)
- Accent: `#3b82f6` (bright blue)
- Text: `#475569` (slate gray)
- Background: `#ffffff` (white)

**Typography:**
- Headings: **Inter** (Google Font)
- Body: **Inter** or system font stack
- Monospace: `Consolas, Monaco, monospace`

**Spacing:**
- Containers: 1200px max-width
- Section padding: 60px top/bottom (desktop), 40px (mobile)
- Grid gap: 24px (desktop), 16px (mobile)

**Buttons:**
- Border radius: 4px
- Padding: 12px 24px
- Font weight: 600
- Hover: 10% darker background

### File Organization

```
generatepress-child/
├── style.css                 # Theme header + critical CSS
├── functions.php             # All PHP functions
├── inc/                      # Organized includes
│   ├── enqueue.php          # Asset loading
│   ├── hooks.php            # GP hook customizations
│   ├── filters.php          # GP filter modifications
│   └── schema.php           # Schema markup
├── assets/
│   ├── css/
│   │   └── custom.css       # Additional styles
│   ├── js/
│   │   └── custom.js        # Custom scripts
│   └── images/
│       └── logo.svg         # Client logo
└── patterns/                # GenerateBlocks patterns
    ├── hero-section.json
    ├── service-grid.json
    └── cta-banner.json
```

---

## Quick Reference Commands

### Update GeneratePress via WP-CLI
```bash
wp plugin update gp-premium
wp theme update generatepress
```

### List All Active GP Modules
```bash
wp option get generate_settings --format=json | jq
```

### Export Customizer Settings
```bash
wp option get theme_mods_generatepress --format=export > gp-settings.json
```

### Clear All Caches
```bash
wp cache flush
wp transient delete --all
```

---

## Remember

1. **Always use child themes** — Parent theme updates overwrite changes
2. **Use hooks instead of editing theme files** — Easier to maintain
3. **Elements for UI, functions.php for logic** — Separation of concerns
4. **Test on mobile** — GP is mobile-first, verify breakpoints
5. **Keep modules minimal** — Only activate what you need
6. **Document customizations** — Comment your code
7. **Check browser compatibility** — GP supports modern browsers (IE11 dropped)

**The goal:** Fast, clean, maintainable sites that survive theme updates.

---

## External Resources

- **Official Site:** https://generatepress.com/
- **Documentation:** https://docs.generatepress.com/
- **Support Forum:** https://generatepress.com/support/
- **Facebook Group:** GeneratePress Users
- **YouTube:** GeneratePress Official Channel

---

*Last Updated: 2026-02-12*  
*For LocalCatalyst internal use*
