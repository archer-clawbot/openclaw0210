<?php
/**
 * LocalCatalyst Theme - JavaScript Behaviors
 *
 * Scroll animations, FAQ accordion, navigation scroll behavior, etc.
 *
 * @package LocalCatalyst
 */

if (!defined('ABSPATH')) exit;

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
 * Handles .lc-faq-item click behavior for expand/collapse
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
 * Fills .lc-progress-bar-fill based on scroll position within .lc-article
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
 * Highlights active section in table of contents
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
