<?php
/**
 * LocalCatalyst Theme - Article Template Helpers
 *
 * Functions for article pages (template-article.php)
 * Includes TOC generation, article schema, related articles, etc.
 *
 * @package LocalCatalyst
 */

if (!defined('ABSPATH')) exit;

/**
 * Get article category from post meta
 * Fallback: first WP category slug
 * Default: 'strategy'
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
 * Extract H2 headings from content for Table of Contents
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
 * Ensures all headings are linkable for TOC
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
 * Returns array of WP_Post objects
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
 * Called in wp_head for article pages
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
