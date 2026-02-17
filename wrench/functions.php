<?php
/**
 * LocalCatalyst Child Theme Functions
 *
 * @package LocalCatalyst
 */

// Prevent direct access
if (!defined('ABSPATH')) exit;

/**
 * Load schema markup functions
 */
require_once get_stylesheet_directory() . '/includes/schema-markup.php';

/**
 * Hide default GP header, navigation, and footer
 * We use our own custom nav and footer via hooks below
 */
add_action('after_setup_theme', function () {
    remove_action('generate_header', 'generate_construct_header');
    remove_action('generate_footer', 'generate_construct_footer');
}, 20);

// Hide GP site info bar
add_filter('generate_footer_widgets', '__return_zero');
add_filter('generate_show_footer', '__return_false');
add_filter('generate_copyright', '__return_empty_string');

/**
 * Enqueue parent + child styles, Google Fonts, design tokens
 */
add_action('wp_enqueue_scripts', function () {
    // Parent theme
    wp_enqueue_style('generatepress', get_template_directory_uri() . '/style.css');

    // Child theme
    wp_enqueue_style('localcatalyst', get_stylesheet_uri(), ['generatepress'], '1.0.0');

    // Design tokens (must load before global styles)
    wp_enqueue_style(
        'localcatalyst-tokens',
        get_stylesheet_directory_uri() . '/css/design-tokens.css',
        ['localcatalyst'],
        '1.0.1'
    );

    // Global component styles
    wp_enqueue_style(
        'localcatalyst-global',
        get_stylesheet_directory_uri() . '/css/localcatalyst_global-styles.css',
        ['localcatalyst-tokens'],
        '1.0.2'
    );

    // WooCommerce styles
    wp_enqueue_style(
        'localcatalyst-woocommerce',
        get_stylesheet_directory_uri() . '/css/localcatalyst_woocommerce.css',
        ['localcatalyst-global'],
        '1.0.1'
    );

    // Google Fonts
    wp_enqueue_style(
        'localcatalyst-fonts',
        'https://fonts.googleapis.com/css2?family=DM+Sans:ital,wght@0,400;0,500;0,700&family=Space+Mono:wght@400;700&display=swap',
        [],
        null
    );
});

/**
 * Inline scroll animation observer
 * Adds .is-visible class to elements with .lc-fade-in when they enter viewport
 */
add_action('wp_footer', function () {
    ?>
    <script>
    (function() {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('is-visible');
                    }
                });
            },
            { threshold: 0.12 }
        );

        document.querySelectorAll('.lc-fade-in').forEach(el => observer.observe(el));

        // Re-observe after any AJAX content loads (WooCommerce, etc.)
        const mutationObserver = new MutationObserver(() => {
            document.querySelectorAll('.lc-fade-in:not(.is-visible)').forEach(el => observer.observe(el));
        });
        mutationObserver.observe(document.body, { childList: true, subtree: true });
    })();
    </script>
    <?php
});

/**
 * Inline nav scroll behavior
 * Adds .scrolled class to .lc-nav after 80px scroll
 */
add_action('wp_footer', function () {
    ?>
    <script>
    (function() {
        const nav = document.querySelector('.lc-nav');
        if (!nav) return;
        let ticking = false;
        window.addEventListener('scroll', function() {
            if (!ticking) {
                window.requestAnimationFrame(function() {
                    nav.classList.toggle('scrolled', window.scrollY > 80);
                    ticking = false;
                });
                ticking = true;
            }
        }, { passive: true });
    })();
    </script>
    <?php
});

/**
 * FAQ accordion functionality
 */
add_action('wp_footer', function () {
    ?>
    <script>
    (function() {
        document.querySelectorAll('.lc-faq-trigger').forEach(function(trigger) {
            trigger.addEventListener('click', function() {
                const item = this.closest('.lc-faq-item');
                const wasOpen = item.classList.contains('open');
                // Close all siblings
                item.parentElement.querySelectorAll('.lc-faq-item.open').forEach(function(el) {
                    el.classList.remove('open');
                });
                // Toggle clicked
                if (!wasOpen) item.classList.add('open');
            });
        });
    })();
    </script>
    <?php
});

/**
 * Reading progress bar (for article pages)
 */
add_action('wp_footer', function () {
    if (!is_singular()) return;
    ?>
    <script>
    (function() {
        const bar = document.querySelector('.lc-progress-bar-fill');
        const article = document.querySelector('.lc-article');
        if (!bar || !article) return;

        window.addEventListener('scroll', function() {
            const rect = article.getBoundingClientRect();
            const total = article.scrollHeight - window.innerHeight;
            const scrolled = -rect.top;
            const pct = Math.min(100, Math.max(0, (scrolled / total) * 100));
            bar.style.width = pct + '%';
        }, { passive: true });
    })();
    </script>
    <?php
});

/**
 * TOC active section tracking (for article pages)
 */
add_action('wp_footer', function () {
    if (!is_singular()) return;
    ?>
    <script>
    (function() {
        const tocLinks = document.querySelectorAll('.lc-toc-link');
        if (!tocLinks.length) return;

        const ids = Array.from(tocLinks).map(a => a.getAttribute('href').replace('#', ''));

        window.addEventListener('scroll', function() {
            let active = ids[0];
            for (let i = ids.length - 1; i >= 0; i--) {
                const el = document.getElementById(ids[i]);
                if (el && el.getBoundingClientRect().top < 140) {
                    active = ids[i];
                    break;
                }
            }
            tocLinks.forEach(link => {
                link.classList.toggle('active', link.getAttribute('href') === '#' + active);
            });
        }, { passive: true });
    })();
    </script>
    <?php
});

/**
 * Register custom block patterns
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
 * Add WooCommerce support
 */
add_action('after_setup_theme', function () {
    add_theme_support('woocommerce');
});

/**
 * Mobile hamburger menu toggle
 */
add_action('wp_footer', function () {
    ?>
    <script>
    (function() {
        const hamburger = document.querySelector('.lc-nav-hamburger');
        const navLinks = document.querySelector('.lc-nav-links');
        if (!hamburger || !navLinks) return;

        hamburger.addEventListener('click', function(e) {
            e.stopPropagation();
            navLinks.classList.toggle('mobile-open');
            hamburger.textContent = navLinks.classList.contains('mobile-open') ? '✕' : '☰';
        });

        // Close on outside click
        document.addEventListener('click', function(e) {
            if (!navLinks.contains(e.target) && !hamburger.contains(e.target)) {
                navLinks.classList.remove('mobile-open');
                hamburger.textContent = '☰';
            }
        });
    })();
    </script>
    <?php
});
