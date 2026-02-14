<?php
/**
 * LocalCatalyst Theme - Block Patterns & Blocks
 *
 * Register custom block patterns and reusable blocks
 *
 * @package LocalCatalyst
 */

if (!defined('ABSPATH')) exit;

/**
 * Register custom block patterns
 * These are template-based block patterns available in the editor
 */
add_action('init', function () {
    $patterns_dir = get_stylesheet_directory() . '/patterns/';

    if (!is_dir($patterns_dir)) return;

    $patterns = [
        'lc/hero-product'        => ['title' => 'LC: Product Hero',         'categories' => ['localcatalyst']],
        'lc/hero-hub'            => ['title' => 'LC: Hub Hero (Centered)',  'categories' => ['localcatalyst']],
        'lc/hero-vertical'       => ['title' => 'LC: Vertical Hero',       'categories' => ['localcatalyst']],
        'lc/gradient-transition'  => ['title' => 'LC: Gradient Transition', 'categories' => ['localcatalyst']],
        'lc/card-grid-services'  => ['title' => 'LC: Service Card Grid',   'categories' => ['localcatalyst']],
        'lc/pricing-table'       => ['title' => 'LC: Pricing Table',       'categories' => ['localcatalyst']],
        'lc/faq-accordion'       => ['title' => 'LC: FAQ Accordion',       'categories' => ['localcatalyst']],
        'lc/cta-bottom'          => ['title' => 'LC: CTA Bar (Dark)',      'categories' => ['localcatalyst']],
        'lc/cta-light'           => ['title' => 'LC: CTA Bar (Light)',     'categories' => ['localcatalyst']],
        'lc/case-study-card'     => ['title' => 'LC: Case Study Card',     'categories' => ['localcatalyst']],
        'lc/timeline-vertical'   => ['title' => 'LC: Vertical Timeline',   'categories' => ['localcatalyst']],
        'lc/stats-row'           => ['title' => 'LC: Stats Row',           'categories' => ['localcatalyst']],
        'lc/footer-5col'         => ['title' => 'LC: Footer (5-col)',      'categories' => ['localcatalyst']],
    ];

    // Register pattern category
    register_block_pattern_category('localcatalyst', ['label' => 'LocalCatalyst']);

    foreach ($patterns as $slug => $meta) {
        $filename = str_replace('lc/', '', $slug) . '.html';
        $filepath = $patterns_dir . $filename;

        if (file_exists($filepath)) {
            register_block_pattern($slug, array_merge($meta, [
                'content' => file_get_contents($filepath),
            ]));
        }
    }
});

/**
 * Register reusable block category
 * NOTE: Reusable blocks are managed via post type 'wp_block' in the admin
 * This function could be used for programmatically creating reusable blocks
 */
add_action('init', function () {
    // Register block category for organization in editor
    if (function_exists('register_block_type')) {
        register_block_pattern_category('lc-reusable', [
            'label' => 'LC: Reusable Components'
        ]);
    }
});

/**
 * Create default reusable blocks if they don't exist
 * This runs on theme activation to set up common reusable blocks
 * Uncomment to use in theme activation hook
 */
function lc_create_default_reusable_blocks() {
    $existing_blocks = get_posts([
        'post_type'  => 'wp_block',
        'numberposts' => -1,
        'meta_key'    => '_lc_managed',
        'meta_value'  => 'true',
    ]);

    if (count($existing_blocks) > 0) {
        return; // Blocks already created
    }

    $blocks_to_create = [
        [
            'title' => 'LC: Service Card',
            'content' => '<!-- wp:html --><div class="lc-card" style="padding: 28px;">
                <h3 style="font-size: 18px; font-weight: 600; margin-bottom: 12px; color: var(--lc-primary);">Service Title</h3>
                <p style="font-size: 14px; color: var(--lc-text-muted); line-height: 1.6;">Service description goes here. This card can be reused across multiple pages for consistent styling.</p>
                <a href="#" style="color: var(--lc-emerald); font-weight: 600; text-decoration: none; margin-top: 16px; display: inline-block;">Learn more →</a>
            </div><!-- /wp:html -->',
        ],
        [
            'title' => 'LC: FAQ Item Block',
            'content' => '<!-- wp:html --><div class="lc-faq-item">
                <button class="lc-faq-trigger" aria-expanded="false">
                    <span class="lc-faq-question">What is this service?</span>
                    <span class="lc-faq-icon">+</span>
                </button>
                <div class="lc-faq-answer">
                    <p>Answer to the question goes here. This block is reusable across FAQ sections.</p>
                </div>
            </div><!-- /wp:html -->',
        ],
        [
            'title' => 'LC: CTA Button Group',
            'content' => '<!-- wp:html --><div style="display: flex; gap: 16px; flex-wrap: wrap;">
                <a href="#" class="lc-btn lc-btn-primary">Primary Action</a>
                <a href="#" class="lc-btn lc-btn-ghost">Secondary Action</a>
            </div><!-- /wp:html -->',
        ],
        [
            'title' => 'LC: Stats Item',
            'content' => '<!-- wp:html --><div style="text-align: center;">
                <div style="font-size: 36px; font-weight: 700; color: var(--lc-emerald); margin-bottom: 8px;">99%</div>
                <div style="font-size: 14px; color: var(--lc-text-muted);">Metric Description</div>
            </div><!-- /wp:html -->',
        ],
    ];

    foreach ($blocks_to_create as $block_data) {
        $existing = get_posts([
            'post_type'      => 'wp_block',
            'title'          => $block_data['title'],
            'numberposts'    => 1,
        ]);

        if (empty($existing)) {
            $block_id = wp_insert_post([
                'post_title'    => $block_data['title'],
                'post_content'  => $block_data['content'],
                'post_type'     => 'wp_block',
                'post_status'   => 'publish',
            ]);

            if ($block_id) {
                update_post_meta($block_id, '_lc_managed', 'true');
            }
        }
    }
}

// Uncomment to automatically create reusable blocks on theme activation:
// add_action('after_setup_theme', 'lc_create_default_reusable_blocks');

/**
 * Add WooCommerce "Add to Cart" URL helper shortcode
 * Usage: [lc_buy_url id="123"] → returns ?add-to-cart=123
 */
add_shortcode('lc_buy_url', function ($atts) {
    $atts = shortcode_atts(['id' => ''], $atts);
    if (!$atts['id']) return '#';
    return esc_url(wc_get_checkout_url() . '?add-to-cart=' . intval($atts['id']));
});
