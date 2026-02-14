<?php
/**
 * LocalCatalyst Child Theme - Main Functions
 *
 * Loads all modular components and initializes the theme.
 * Organized for maintainability and clarity.
 *
 * @package LocalCatalyst
 */

// Prevent direct access
if (!defined('ABSPATH')) exit;

/**
 * ============================================================
 * LOAD MODULAR COMPONENTS
 * ============================================================
 *
 * Each include file handles a specific functionality area:
 * - enqueue: Styles, fonts, image sizes, theme setup
 * - nav-footer: Navigation header and footer output
 * - scripts: JavaScript behaviors (animations, FAQ toggle, etc.)
 * - blocks: Block patterns and reusable blocks
 * - articles: Article template helpers and schema
 * - schema-markup: Comprehensive structured data schemas
 */

// Theme setup and asset enqueuing
require_once get_stylesheet_directory() . '/includes/enqueue.php';

// Custom navigation header and footer
require_once get_stylesheet_directory() . '/includes/nav-footer.php';

// JavaScript behaviors and animations
require_once get_stylesheet_directory() . '/includes/scripts.php';

// Block patterns and reusable blocks
require_once get_stylesheet_directory() . '/includes/blocks.php';

// Article-specific helpers
require_once get_stylesheet_directory() . '/includes/articles.php';

// Structured data schemas (Organization, Product, FAQPage, etc.)
require_once get_stylesheet_directory() . '/includes/schema-markup.php';

/**
 * Theme version constant
 * Used for cache busting in asset enqueuing
 */
if (!defined('LC_VERSION')) {
    define('LC_VERSION', '1.0.0');
}

/**
 * ============================================================
 * THEME CUSTOMIZATION HOOKS
 * ============================================================
 *
 * Add custom hooks below for site-specific functionality
 * that doesn't fit into the existing modules
 */

// Example: Custom post type registration
// Example: Custom REST API endpoints
// Example: WooCommerce integration hooks
// Example: Custom shortcodes for specific functionality
