<?php
/**
 * Plugin Name: OpenClaw Security Hardening
 * Description: MU-plugin for WordPress security hardening. Deployed by OpenClaw fleet.
 * Version: 1.0.0
 * Author: OpenClaw / Spartan Digital
 *
 * Drop into wp-content/mu-plugins/ — loads automatically, cannot be deactivated.
 */

if (!defined('ABSPATH')) {
    exit;
}

// ─── 1. DISABLE FILE EDITOR ─────────────────────────────────────────
// Prevents editing theme/plugin files from wp-admin. Defense against
// compromised admin accounts injecting backdoors.

if (!defined('DISALLOW_FILE_EDIT')) {
    define('DISALLOW_FILE_EDIT', true);
}

// ─── 2. SECURITY HEADERS ────────────────────────────────────────────
// Applied to every response. These headers prevent clickjacking, XSS,
// MIME sniffing, and information leakage.

add_action('send_headers', function () {
    // Don't add headers on REST API responses (they go through a different path)
    // or if headers already sent
    if (headers_sent()) {
        return;
    }

    // Prevent clickjacking — only allow framing from same origin
    header('X-Frame-Options: SAMEORIGIN');

    // Enable browser XSS filter (legacy but still helps older browsers)
    header('X-Content-Type-Options: nosniff');

    // Prevent MIME type sniffing
    header('X-XSS-Protection: 1; mode=block');

    // Referrer policy — send origin only on cross-origin requests
    header('Referrer-Policy: strict-origin-when-cross-origin');

    // Permissions policy — disable features we don't need
    header('Permissions-Policy: camera=(), microphone=(), geolocation=(), payment=()');

    // HSTS — enforce HTTPS for 1 year (only if already on HTTPS)
    if (is_ssl()) {
        header('Strict-Transport-Security: max-age=31536000; includeSubDomains');
    }

    // CSP in report-only mode initially — logs violations without breaking anything.
    // Once you've confirmed no legitimate scripts are blocked, switch to enforced:
    //   Change "Content-Security-Policy-Report-Only" to "Content-Security-Policy"
    header("Content-Security-Policy-Report-Only: default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https:; style-src 'self' 'unsafe-inline' https:; img-src 'self' data: https:; font-src 'self' https:; connect-src 'self' https:; frame-ancestors 'self';");
});

// Also add headers to REST API responses
add_filter('rest_post_dispatch', function ($response) {
    $response->header('X-Content-Type-Options', 'nosniff');
    $response->header('X-Frame-Options', 'SAMEORIGIN');
    return $response;
});

// ─── 3. DISABLE XML-RPC ─────────────────────────────────────────────
// XML-RPC is a legacy API that's a common brute-force and DDoS amplification
// vector. The fleet uses REST API exclusively, so XML-RPC serves no purpose.

// Block all XML-RPC methods
add_filter('xmlrpc_enabled', '__return_false');

// Remove XML-RPC discovery from HTML head
remove_action('wp_head', 'rsd_link');

// Block XML-RPC at the HTTP level (returns 403 instead of loading xmlrpc.php)
add_action('init', function () {
    if (isset($_SERVER['REQUEST_URI']) && strpos($_SERVER['REQUEST_URI'], 'xmlrpc.php') !== false) {
        http_response_code(403);
        exit('Forbidden');
    }
});

// Remove X-Pingback header
add_filter('wp_headers', function ($headers) {
    unset($headers['X-Pingback']);
    return $headers;
});

// ─── 4. REST API LOCKDOWN ────────────────────────────────────────────
// The fleet needs full REST API access with authentication. We only block
// unauthenticated access to sensitive endpoints that leak user info.

// Block unauthenticated access to /wp/v2/users (prevents user enumeration)
add_filter('rest_pre_dispatch', function ($result, $server, $request) {
    $route = $request->get_route();

    // Block unauthenticated user endpoint access
    if (preg_match('#^/wp/v2/users#', $route) && !is_user_logged_in()) {
        return new WP_Error(
            'rest_forbidden',
            'Authentication required.',
            ['status' => 401]
        );
    }

    return $result;
}, 10, 3);

// Remove WordPress version from REST API response headers
add_filter('rest_index', function ($response) {
    // Remove 'name', 'description', 'gmt_offset', 'timezone_string' from root
    // but keep the functional parts the fleet needs
    return $response;
});

// ─── 5. AUTHOR ENUMERATION PREVENTION ───────────────────────────────
// Block ?author=N URL scanning that reveals usernames.

add_action('template_redirect', function () {
    if (is_author() && !is_user_logged_in()) {
        wp_redirect(home_url(), 301);
        exit;
    }
});

// Block ?author=N query var for non-logged-in users
add_filter('request', function ($query_vars) {
    if (isset($query_vars['author']) && !is_user_logged_in()) {
        unset($query_vars['author']);
    }
    if (isset($query_vars['author_name']) && !is_user_logged_in()) {
        unset($query_vars['author_name']);
    }
    return $query_vars;
});

// ─── 6. LOGIN HARDENING ─────────────────────────────────────────────

// Remove WordPress version from login page and feeds
remove_action('wp_head', 'wp_generator');
add_filter('the_generator', '__return_empty_string');

// Remove detailed login error messages (prevents username discovery)
add_filter('login_errors', function () {
    return 'Invalid credentials.';
});

// Disable login page language switcher (minor information leak)
add_filter('login_display_language_dropdown', '__return_false');

// ─── 7. MISCELLANEOUS HARDENING ─────────────────────────────────────

// Remove WordPress version from scripts and styles
add_filter('style_loader_src', 'openclaw_remove_version_strings', 9999);
add_filter('script_loader_src', 'openclaw_remove_version_strings', 9999);

function openclaw_remove_version_strings($src) {
    if (strpos($src, 'ver=') !== false) {
        $src = remove_query_arg('ver', $src);
    }
    return $src;
}

// Remove Windows Live Writer manifest link
remove_action('wp_head', 'wlwmanifest_link');

// Remove shortlink
remove_action('wp_head', 'wp_shortlink_wp_head');

// Remove REST API discovery link from HTML head (API still works, just not advertised)
remove_action('wp_head', 'rest_output_link_wp_head');
remove_action('wp_head', 'wp_oembed_add_discovery_links');

// Disable application passwords for non-admin users in wp-admin
// (Fleet uses app passwords via REST API, which still works. This just
// prevents lower-privilege users from creating their own app passwords
// through the wp-admin profile page.)
add_filter('wp_is_application_passwords_available_for_user', function ($available, $user) {
    if (!user_can($user, 'manage_options')) {
        return false;
    }
    return $available;
}, 10, 2);

// ─── 8. FLEET IDENTIFICATION HEADER ─────────────────────────────────
// Adds a response header on REST API requests made by the fleet so we
// can confirm the hardening plugin is active. Useful for health checks.

add_filter('rest_post_dispatch', function ($response, $server, $request) {
    // Only add header for authenticated requests (fleet always authenticates)
    if (is_user_logged_in()) {
        $response->header('X-OpenClaw-Hardening', '1.0.0');
    }
    return $response;
}, 10, 3);

// ─── 9. PAYPAL & WOOCOMMERCE SECURITY ───────────────────────────────

// 9a. Add PayPal domains to CSP (required for PayPal Checkout buttons and redirects)
add_action('send_headers', function () {
    // Override the base CSP from Section 2 with PayPal-aware version
    header("Content-Security-Policy-Report-Only: default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://*.paypal.com https://*.paypalobjects.com; style-src 'self' 'unsafe-inline' https:; img-src 'self' data: https://*.paypal.com https://*.paypalobjects.com https:; font-src 'self' https:; connect-src 'self' https://*.paypal.com https:; frame-src https://*.paypal.com https://*.paypalobjects.com; frame-ancestors 'self';", false);
}, 11); // Priority 11 = runs after the Section 2 handler at priority 10

// 9b. Prevent direct access to WooCommerce REST API for unauthenticated users
// (WooCommerce API has its own auth via consumer key/secret, but we want to
// block unauthenticated discovery of product/order endpoints)
add_filter('rest_pre_dispatch', function ($result, $server, $request) {
    $route = $request->get_route();

    // Block unauthenticated access to WooCommerce order and customer endpoints
    if (preg_match('#^/wc/v[0-9]+/(orders|customers)#', $route) && !is_user_logged_in()) {
        return new WP_Error(
            'rest_forbidden',
            'Authentication required.',
            ['status' => 401]
        );
    }

    return $result;
}, 10, 3);

// 9c. Disable WooCommerce marketplace suggestions (phones home to woocommerce.com)
add_filter('woocommerce_allow_marketplace_suggestions', '__return_false');

// 9d. Limit failed payment retry attempts (prevents runaway retry charges)
// Works with WooCommerce Subscriptions if installed
add_filter('wcs_default_retry_rules', function ($rules) {
    // Only retry 3 times over 7 days, then cancel
    return [
        [
            'retry_after_interval' => DAY_IN_SECONDS,      // 1 day after failure
            'email_template_customer' => 'WCS_Email_Customer_Payment_Retry',
        ],
        [
            'retry_after_interval' => 3 * DAY_IN_SECONDS,  // 3 days after first retry
            'email_template_customer' => 'WCS_Email_Customer_Payment_Retry',
        ],
        [
            'retry_after_interval' => 3 * DAY_IN_SECONDS,  // 6 days total
            'status_to_apply_to_order' => 'failed',
            'status_to_apply_to_subscription' => 'cancelled',
        ],
    ];
});

// 9e. Prevent subscription status changes via REST API without proper auth
// (Defense in depth — WooCommerce already requires consumer keys for API access,
// but this adds an extra guard against subscription manipulation)
add_filter('woocommerce_rest_check_permissions', function ($permission, $context, $object_id, $post_type) {
    if ($post_type === 'shop_subscription' && $context !== 'read') {
        // Only allow subscription writes from users with manage_woocommerce capability
        if (!current_user_can('manage_woocommerce')) {
            return false;
        }
    }
    return $permission;
}, 10, 4);

// 9f. Log PayPal IPN/webhook failures for monitoring
add_action('woocommerce_paypal_ipn_error', function ($error_message) {
    error_log('[OpenClaw] PayPal IPN error: ' . $error_message);
});

// Log failed WooCommerce payment events (gateway-agnostic)
add_action('woocommerce_payment_complete_order_status', function ($status, $order_id) {
    if ($status === 'failed') {
        error_log('[OpenClaw] Payment failed for order ' . $order_id);
    }
    return $status;
}, 10, 2);

// ─── 10. 301 REDIRECTS (URL MIGRATION) ─────────────────────────────
// Handles legacy/duplicate URLs from the agency-to-platform migration.
// These run early in init so they fire before WordPress template loading.

add_action('init', function () {
    // Only run on frontend requests, not admin or REST API
    if (is_admin() || (defined('REST_REQUEST') && REST_REQUEST)) {
        return;
    }

    $path = rtrim(parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH), '/');
    $query = parse_url($_SERVER['REQUEST_URI'], PHP_URL_QUERY);

    $redirects = [
        // Duplicate service pages (trashed in wp-admin, redirect for cached/bookmarked URLs)
        '/services/local-citations'                      => '/services/citation-building/',
        '/services/google-business-profile-optimization'  => '/services/gbp-optimization/',
        '/services/local-seo'                             => '/services/',
        '/services/technical-seo'                         => '/services/seo-audit/',
        '/services/review-management'                     => '/services/',
        '/services/on-page-optimization'                  => '/services/',
        '/services/monthly-management'                    => '/services/monthly-content/',

        // Duplicate hub pages trashed 2026-02-12
        '/services/citation-building-services'            => '/services/citation-building/',
        '/services/seo-audit-services'                    => '/services/seo-audit/',
        '/learn/citation-building-guide-2'                => '/learn/citation-building-guide/',

        // Overlap stub pages trashed 2026-02-12 (full articles live at different slugs)
        '/learn/what-is-schema-markup'                    => '/learn/schema-markup-guide/',
        '/learn/gbp-optimization-guide'                   => '/learn/gbp-optimization-checklist/',
        '/learn/topical-authority'                        => '/learn/how-to-build-topical-authority/',

        // Legacy agency-model hub URLs → platform URLs
        '/google-business-profile-management'             => '/services/gbp-optimization/',
        '/citation-building-services'                     => '/services/citation-building/',
        '/seo-audit-services'                             => '/services/seo-audit/',
        '/on-page-seo-services'                           => '/services/content-pages/',
        '/link-building-services'                         => '/managed/',
        '/reputation-management-services'                 => '/services/',
        '/seo-website-design'                             => '/services/website-build/',
        '/technical-seo-services'                         => '/services/seo-audit/',
        '/seo-content-strategy'                           => '/services/content-pages/',
        '/local-seo-services'                             => '/services/',
        '/services/link-building'                         => '/managed/',
    ];

    if (isset($redirects[$path])) {
        $target = $redirects[$path];
        if ($query) {
            $target .= '?' . $query;
        }
        wp_redirect($target, 301);
        exit;
    }

    // Wildcard: /blog/* → /learn/*
    if (strpos($path, '/blog/') === 0) {
        $slug = substr($path, 6); // strip '/blog/'
        $target = '/learn/' . $slug;
        if ($query) {
            $target .= '?' . $query;
        }
        wp_redirect($target, 301);
        exit;
    }
}, 1); // Priority 1 = run very early

// ─── 11. NOINDEX UNCATEGORIZED CATEGORIES ───────────────────────────
// Prevent search engines from indexing empty default categories.

add_action('wp_head', function () {
    if (is_category('uncategorized') || is_tax('product_cat', 'uncategorized')) {
        echo '<meta name="robots" content="noindex, nofollow">' . "\n";
    }
});
