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
 * Enqueue parent + child styles, Google Fonts
 */
add_action('wp_enqueue_scripts', function () {
    // Parent theme
    wp_enqueue_style('generatepress', get_template_directory_uri() . '/style.css');

    // Child theme
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
 * Add WooCommerce "Add to Cart" URL helper
 * Usage: [lc_buy id="123"] → returns ?add-to-cart=123
 */
add_shortcode('lc_buy_url', function ($atts) {
    $atts = shortcode_atts(['id' => ''], $atts);
    if (!$atts['id']) return '#';
    return esc_url(wc_get_checkout_url() . '?add-to-cart=' . intval($atts['id']));
});

/**
 * Disable default WP emoji scripts (performance)
 */
remove_action('wp_head', 'print_emoji_detection_script', 7);
remove_action('wp_print_styles', 'print_emoji_styles');

/**
 * Remove WP version from head (security)
 */
remove_action('wp_head', 'wp_generator');

/**
 * Add custom image sizes for cards
 */
add_action('after_setup_theme', function () {
    add_image_size('lc-card-thumb', 400, 260, true);
    add_image_size('lc-hero-bg', 1920, 800, true);
});

/**
 * Inject site-wide navigation header
 */
add_action('generate_before_header', function () {
    ?>
    <div class="lc-nav">
        <a href="/" class="lc-nav-logo">
            <span class="lc-nav-logo-mark">LC</span>
            <span class="lc-nav-logo-text">Local<span>Catalyst</span></span>
        </a>
        <div class="lc-nav-links">
            <a class="lc-nav-link" href="/services/">Services</a>
            <a class="lc-nav-link" href="/learn/">Learn</a>
            <a class="lc-nav-link" href="/industries/">Industries</a>
            <a class="lc-nav-link" href="/case-studies/">Case Studies</a>
            <a class="lc-btn lc-btn-primary-sm" href="/services/topical-map/">Get Started</a>
        </div>
    </div>
    <?php
});

/**
 * Inject site-wide footer via generate_after_main_content hook
 * Falls back to wp_footer if GP hook unavailable
 */
add_action('generate_after_main_content', 'lc_render_footer', 50);
add_action('wp_footer', function () {
    if (!did_action('generate_after_main_content')) {
        lc_render_footer();
    }
}, 5);

function lc_render_footer() {
    ?>
    <footer class="lc-footer">
        <div class="lc-container">
            <div style="display: grid; grid-template-columns: 2fr 1fr 1fr 1fr 1fr; gap: 48px; margin-bottom: 48px;">
                <div>
                    <a href="/" class="lc-nav-logo" style="margin-bottom: 16px;">
                        <span class="lc-nav-logo-mark">LC</span>
                        <span class="lc-nav-logo-text">Local<span>Catalyst</span></span>
                    </a>
                    <p style="font-size: 13px; color: var(--lc-hero-muted); line-height: 1.7; max-width: 260px;">
                        AI-powered SEO deliverables for local businesses. Transparent pricing, autonomous production, results you can measure.
                    </p>
                </div>
                <div>
                    <div class="lc-footer-col-title">Services</div>
                    <a class="lc-footer-link" href="/services/topical-map/">Topical Map</a>
                    <a class="lc-footer-link" href="/services/seo-audit/">SEO Audit</a>
                    <a class="lc-footer-link" href="/services/content-pages/">Content Pages</a>
                    <a class="lc-footer-link" href="/services/gbp-optimization/">GBP Optimization</a>
                    <a class="lc-footer-link" href="/services/citation-building/">Citation Building</a>
                    <a class="lc-footer-link" href="/services/schema-markup/">Schema Markup</a>
                </div>
                <div>
                    <div class="lc-footer-col-title">Learn</div>
                    <a class="lc-footer-link" href="/learn/">All Guides</a>
                    <a class="lc-footer-link" href="/case-studies/">Case Studies</a>
                    <a class="lc-footer-link" href="/learn/seo-glossary/">SEO Glossary</a>
                    <a class="lc-footer-link" href="/services/">Pricing</a>
                </div>
                <div>
                    <div class="lc-footer-col-title">Company</div>
                    <a class="lc-footer-link" href="/about/">About</a>
                    <a class="lc-footer-link" href="/platform/">CATALYST System</a>
                    <a class="lc-footer-link" href="/about/our-process/">Methodology</a>
                    <a class="lc-footer-link" href="/contact/">Contact</a>
                </div>
                <div>
                    <div class="lc-footer-col-title">Legal</div>
                    <a class="lc-footer-link" href="/privacy-policy/">Privacy Policy</a>
                    <a class="lc-footer-link" href="/terms-of-service/">Terms of Service</a>
                </div>
            </div>
            <div class="lc-footer-bottom">
                <span style="font-size: 12px; color: rgba(148,163,184,0.5);">&copy; 2026 LocalCatalyst.ai &mdash; All rights reserved.</span>
                <span style="font-size: 11px; color: rgba(148,163,184,0.4); font-family: var(--lc-font-mono); letter-spacing: 0.5px;">Powered by the CATALYST System</span>
            </div>
        </div>
    </footer>
    <?php
}

// Mobile hamburger menu
function lc_hamburger_menu() { ?>
<script>
(function() {
    var nav = document.querySelector('.lc-nav');
    if (!nav) return;
    var links = nav.querySelector('.lc-nav-links');
    if (!links) return;
    var btn = document.createElement('button');
    btn.className = 'lc-nav-hamburger';
    btn.setAttribute('aria-label', 'Menu');
    btn.innerHTML = '&#9776;';
    btn.addEventListener('click', function() {
        links.classList.toggle('mobile-open');
        btn.innerHTML = links.classList.contains('mobile-open') ? '&#10005;' : '&#9776;';
    });
    nav.appendChild(btn);
    // Close menu when clicking a link
    links.querySelectorAll('a').forEach(function(a) {
        a.addEventListener('click', function() {
            links.classList.remove('mobile-open');
            btn.innerHTML = '&#9776;';
        });
    });
})();
</script>
<?php }
add_action('wp_footer', 'lc_hamburger_menu');


/* ===========================================
   ARTICLE TEMPLATE HELPERS
   =========================================== */

/**
 * Get article category from post meta, fallback to WP category, default 'strategy'
 */
function lc_get_article_category($post_id) {
    $cat = get_post_meta($post_id, '_lc_article_category', true);
    if ($cat) {
        return $cat;
    }

    // Fallback: first WP category slug
    $cats = get_the_category($post_id);
    if (!empty($cats)) {
        return $cats[0]->slug;
    }

    return 'strategy';
}

/**
 * Map category slug to badge CSS class
 */
function lc_get_category_badge_class($category) {
    $map = array(
        'strategy'  => 'lc-badge-cat-strategy',
        'technical' => 'lc-badge-cat-technical',
        'content'   => 'lc-badge-cat-content',
        'local'     => 'lc-badge-cat-local',
        'link'      => 'lc-badge-cat-link',
    );
    return isset($map[$category]) ? $map[$category] : 'lc-badge-cat-strategy';
}

/**
 * Extract H2 headings from content for TOC
 * Returns array of ['id' => '...', 'text' => '...']
 */
function lc_extract_toc_from_content($content) {
    $toc = array();
    if (preg_match_all('/<h2[^>]*(?:id="([^"]*)")?[^>]*>(.*?)<\/h2>/si', $content, $matches, PREG_SET_ORDER)) {
        foreach ($matches as $match) {
            $text = wp_strip_all_tags($match[2]);
            $id   = !empty($match[1]) ? $match[1] : sanitize_title($text);
            $toc[] = array('id' => $id, 'text' => $text);
        }
    }
    return $toc;
}

/**
 * Add id attributes to H2 tags that lack them
 */
function lc_add_h2_ids($content) {
    return preg_replace_callback('/<h2([^>]*)>(.*?)<\/h2>/si', function ($m) {
        $attrs = $m[1];
        $text  = $m[2];
        // Already has an id — leave it alone
        if (preg_match('/\bid=["\']/', $attrs)) {
            return $m[0];
        }
        $id = sanitize_title(wp_strip_all_tags($text));
        return '<h2' . $attrs . ' id="' . esc_attr($id) . '">' . $text . '</h2>';
    }, $content);
}

/**
 * Get related articles (same template, prefer same category)
 */
function lc_get_related_articles($post_id, $category, $count = 3) {
    $args = array(
        'post_type'      => array('page', 'post'),
        'posts_per_page' => $count + 5, // fetch extra to filter
        'post_status'    => 'publish',
        'post__not_in'   => array($post_id),
        'meta_query'     => array(
            array(
                'key'   => '_wp_page_template',
                'value' => 'template-article.php',
            ),
        ),
        'orderby'        => 'modified',
        'order'          => 'DESC',
    );

    $all = get_posts($args);
    if (empty($all)) {
        return array();
    }

    // Separate same-category and others
    $same  = array();
    $other = array();
    foreach ($all as $p) {
        $p_cat = lc_get_article_category($p->ID);
        if ($p_cat === $category) {
            $same[] = $p;
        } else {
            $other[] = $p;
        }
    }

    // Prioritize same category, fill with others
    $result = array_merge($same, $other);
    return array_slice($result, 0, $count);
}

/**
 * Output Article JSON-LD schema on article template pages
 */
function lc_article_schema() {
    if (!is_singular()) return;

    $template = get_page_template_slug();
    if ($template !== 'template-article.php') return;

    $post    = get_post();
    $content = $post->post_content;
    $words   = str_word_count(wp_strip_all_tags($content));

    $schema = array(
        '@context'         => 'https://schema.org',
        '@type'            => 'Article',
        'headline'         => get_the_title(),
        'description'      => get_the_excerpt(),
        'datePublished'    => get_the_date('c'),
        'dateModified'     => get_the_modified_date('c'),
        'wordCount'        => $words,
        'publisher'        => array(
            '@type' => 'Organization',
            'name'  => 'LocalCatalyst',
            'url'   => home_url('/'),
        ),
        'mainEntityOfPage' => get_permalink(),
    );

    echo '<script type="application/ld+json">' . wp_json_encode($schema, JSON_UNESCAPED_SLASHES) . '</script>' . "\n";
}
add_action('wp_head', 'lc_article_schema');

/**
 * Disable wpautop on pages — LC pages use hand-written HTML
 * that wpautop destroys (wraps comments in <p>, inserts <br />).
 */
function lc_maybe_disable_wpautop() {
    if ( ! is_singular( 'page' ) ) {
        return;
    }
    remove_filter( 'the_content', 'wpautop' );
}
add_action( 'template_redirect', 'lc_maybe_disable_wpautop' );
