<?php
/**
 * LocalCatalyst Theme - Navigation & Footer
 *
 * Custom sitewide navigation header and footer
 *
 * @package LocalCatalyst
 */

if (!defined('ABSPATH')) exit;

/**
 * Inject site-wide navigation header
 */
add_action('generate_before_header', function () {
    ?>
    <div class="lc-nav">
        <a href="/" class="lc-nav-logo">
            <img class="lc-nav-logo-icon" src="<?php echo get_stylesheet_directory_uri(); ?>/assets/localcatalyst-icon.svg" alt="LC" width="30" height="30">
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
 * Inject site-wide footer
 * Uses generate_after_main_content hook with wp_footer fallback
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
                        <img class="lc-nav-logo-icon" src="<?php echo get_stylesheet_directory_uri(); ?>/assets/localcatalyst-icon.svg" alt="LC" width="30" height="30">
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

/**
 * Mobile hamburger menu
 */
add_action('wp_footer', function () {
    ?>
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
    <?php
});
