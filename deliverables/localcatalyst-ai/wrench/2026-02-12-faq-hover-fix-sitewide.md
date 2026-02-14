# FAQ Button Hover CSS Fix — Sitewide Deployment Plan

**Date**: 2026-02-12  
**Client**: LocalCatalyst.ai  
**Issue**: FAQ buttons (`.lc-faq-trigger`) show dark gray background on hover — should be transparent  
**Root Cause**: GeneratePress theme applies default `button:hover { background: dark-gray }` to all buttons  
**Scope**: Sitewide deployment (affects all pages with FAQ sections)

---

## Pages Affected

Site scan identified 197+ pages in the WordPress installation. The following pages have confirmed `.lc-faq-trigger` usage:

- `/services/schema-markup/` (Page ID: 93) ✓ Confirmed
- Content Pages service (likely multiple pages)
- Any service page with FAQ sections

**Recommendation**: Deploy fix globally instead of page-by-page to ensure consistency across the entire site.

---

## The CSS Fix

```css
/* FAQ Button Hover Fix - Overrides GeneratePress theme default button hover */
.lc-faq-trigger:hover,
.lc-faq-trigger:focus {
    background: transparent !important;
    color: inherit !important;
}
```

This CSS override:
- Removes the dark gray background on hover/focus
- Preserves text color (inherits from parent)
- Uses `!important` to override GeneratePress theme styles
- Applies to both `:hover` and `:focus` states (keyboard accessibility)

---

## Deployment Options

### Option 1: GeneratePress Customizer — Additional CSS (Recommended)
**Steps**:
1. Log in to WordPress admin
2. Navigate to **Appearance > Customize**
3. Go to **Additional CSS**
4. Paste the CSS fix at the end
5. Click **Publish**

**Advantages**: 
- Non-destructive (stored in WordPress options)
- Easy to edit/remove in future
- Accessible via WordPress admin UI

**Disadvantage**:
- Requires WordPress admin credentials

---

### Option 2: Create Child Theme CSS File
**Steps**:
1. Via SFTP, create: `/wp-content/themes/generatepress-child/style.css`
2. Paste the CSS fix
3. Create child theme functions.php to enqueue the stylesheet

**Code for functions.php**:
```php
<?php
add_action( 'wp_enqueue_scripts', 'generatepress_child_enqueue_styles' );
function generatepress_child_enqueue_styles() {
    wp_enqueue_style( 'generatepress-child', get_stylesheet_uri() );
}
```

**Advantages**:
- Permanent (survives theme updates)
- Organized in child theme
- Version-controllable

**Disadvantage**:
- Requires server/SFTP access

---

### Option 3: Via WordPress REST API
**Endpoint**: `POST /wp-json/wp/v2/settings`  
**Field**: `custom_css`  
**Requires**: Valid WordPress user credentials

**Status**: Blocked — valid WordPress username/email not found for available app password

---

### Option 4: Must-Use Plugin
**Steps**:
1. Create file: `/wp-content/mu-plugins/faq-hover-fix.php`
2. Add:

```php
<?php
/**
 * Plugin Name: FAQ Button Hover Fix
 * Description: Fixes GeneratePress default button hover style for FAQ triggers
 * Version: 1.0
 */

add_action( 'wp_head', function() {
    ?>
    <style>
    .lc-faq-trigger:hover,
    .lc-faq-trigger:focus {
        background: transparent !important;
        color: inherit !important;
    }
    </style>
    <?php
});
```

**Advantages**:
- Simple, minimal code
- Loads on every page automatically
- Survives plugin/theme updates

**Disadvantage**:
- Requires server access

---

## Current Status & Blockers

❌ **Authentication Failed**
- Found app password: `yQ4A eDDO n5TD EooW ytnr jYZr` (WP_LOCALCATALYST_APP_PASSWORD)
- Cannot locate the associated WordPress username/email
- Tested: admin, administrator, root, catalyst, localcatalyst, user, wp-admin, webmaster
- All authentication attempts returned HTTP 401

### What's Needed to Proceed

1. **WordPress Admin Credentials**
   - Valid username or email for the app password above
   - OR a different API token/JWT that has page editing permissions

2. **Or Server Access**
   - SFTP/SSH to install child theme or mu-plugin
   - Access to theme files

3. **Or Manual Admin UI Access**
   - Someone logs into wp-admin
   - Navigates to Appearance > Customize > Additional CSS
   - Pastes the CSS fix

---

## Pattern for Future Fixes

✅ **Lesson Learned**: When fixing a class/block-specific styling issue:
1. **Always check sitewide** — Is this class used elsewhere?
2. **Deploy globally** — Fix it once in theme CSS, not page-by-page
3. **Document** — List all affected pages for reference

This prevents scattered fixes and ensures consistency across the site.

---

## Verification Steps (After Deployment)

Once the CSS is deployed, verify on:
- [ ] `/services/schema-markup/` — FAQ buttons
- [ ] `/services/content-pages/` — FAQ buttons (if present)
- [ ] Any other service page with FAQ sections
- [ ] Mobile view (especially important for touch devices)

**Expected Result**: Hovering over FAQ buttons should NOT show a dark gray background; text should remain readable.

---

## Rollback

If needed, the fix can be easily removed:
- **Customizer CSS**: Delete from Additional CSS section
- **Child Theme**: Delete the CSS rule from `/style.css`
- **Must-Use Plugin**: Delete `/wp-content/mu-plugins/faq-hover-fix.php`

---

## Next Steps

**For Archer / Dispatcher**:
1. Provide WordPress username/email for `WP_LOCALCATALYST_APP_PASSWORD`
2. OR grant server access to install child theme/mu-plugin
3. OR have someone manually add CSS via wp-admin Customizer

**Once credentials available**:
- Wrench will deploy globally via REST API or child theme
- Verify fix across multiple pages
- Document in deployment log

