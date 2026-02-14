<?php
/**
 * LocalCatalyst Theme - Enqueue & Setup
 *
 * Handles theme setup, styles, fonts, and image sizes
 *
 * @package LocalCatalyst
 */

if (!defined('ABSPATH')) exit;

/**
 * Theme setup after init
 */
add_action('after_setup_theme', function () {
    // Custom image sizes for cards and heroes
    add_image_size('lc-card-thumb', 400, 260, true);
    add_image_size('lc-hero-bg', 1920, 800, true);
});

/**
 * Enqueue parent (GeneratePress) + child styles
 */
add_action('wp_enqueue_scripts', function () {
    // Parent theme
    wp_enqueue_style('generatepress', get_template_directory_uri() . '/style.css');

    // Child theme main stylesheet
    wp_enqueue_style('localcatalyst', get_stylesheet_uri(), ['generatepress'], '1.0.0');

    // Google Fonts
    wp_enqueue_style(
        'localcatalyst-fonts',
        'https://fonts.googleapis.com/css2?family=DM+Sans:ital,wght@0,400;0,500;0,700&family=Space+Mono:wght@400;700&display=swap',
        [],
        null
    );
});

/**
 * Disable default WP emoji scripts (performance optimization)
 */
remove_action('wp_head', 'print_emoji_detection_script', 7);
remove_action('wp_print_styles', 'print_emoji_styles');

/**
 * Remove WP version from head (security)
 */
remove_action('wp_head', 'wp_generator');

/**
 * Hide default GeneratePress header, navigation, and footer
 * We use our own custom nav and footer via hooks below
 */
add_action('after_setup_theme', function () {
    remove_action('generate_header', 'generate_construct_header');
    remove_action('generate_footer', 'generate_construct_footer');
}, 20);

// Hide GP site info bar and footer widgets
add_filter('generate_footer_widgets', '__return_zero');
add_filter('generate_show_footer', '__return_false');
add_filter('generate_copyright', '__return_empty_string');
