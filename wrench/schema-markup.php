<?php
/**
 * LocalCatalyst Schema Markup
 * Adds structured data: Organization, Product, FAQPage, BreadcrumbList
 *
 * @package LocalCatalyst
 */

if (!defined('ABSPATH')) exit;

/**
 * Output Organization schema (site-wide, on every page)
 */
function lc_organization_schema() {
    $schema = array(
        '@context'       => 'https://schema.org',
        '@type'          => 'Organization',
        'name'           => 'LocalCatalyst',
        'url'            => home_url('/'),
        'logo'           => home_url('/wp-content/themes/localcatalyst/img/logo.png'), // Update path to actual logo
        'description'    => 'AI-powered SEO deliverables for local businesses. Transparent pricing, autonomous production, results you can measure.',
        'sameAs'         => array(
            // Add social media URLs if available
        ),
        'contactPoint'   => array(
            '@type'      => 'ContactPoint',
            'contactType' => 'Customer Support',
            'url'        => home_url('/contact/'),
        ),
        'address'        => array(
            '@type'           => 'PostalAddress',
            'addressCountry'  => 'US',
        ),
    );

    echo '<script type="application/ld+json">' . wp_json_encode($schema, JSON_UNESCAPED_SLASHES) . '</script>' . "\n";
}
add_action('wp_head', 'lc_organization_schema', 5);

/**
 * Output BreadcrumbList schema
 */
function lc_breadcrumb_schema() {
    if (is_front_page()) {
        return; // No breadcrumb on home
    }

    $breadcrumbs = array(
        array('name' => 'Home', 'url' => home_url('/'))
    );

    if (is_single() || is_page()) {
        global $post;
        
        // Get page ancestors
        $ancestors = get_post_ancestors($post);
        if (!empty($ancestors)) {
            $ancestors = array_reverse($ancestors);
            foreach ($ancestors as $ancestor_id) {
                $breadcrumbs[] = array(
                    'name' => get_the_title($ancestor_id),
                    'url'  => get_permalink($ancestor_id),
                );
            }
        }
        
        // Add current page
        $breadcrumbs[] = array(
            'name' => get_the_title(),
            'url'  => get_permalink(),
        );
    } elseif (is_category() || is_tag()) {
        $term = get_queried_object();
        $breadcrumbs[] = array(
            'name' => $term->name,
            'url'  => get_term_link($term),
        );
    }

    if (count($breadcrumbs) <= 1) return;

    $schema = array(
        '@context'        => 'https://schema.org',
        '@type'           => 'BreadcrumbList',
        'itemListElement' => array(),
    );

    foreach ($breadcrumbs as $index => $crumb) {
        $schema['itemListElement'][] = array(
            '@type'    => 'ListItem',
            'position' => $index + 1,
            'name'     => $crumb['name'],
            'item'     => $crumb['url'],
        );
    }

    echo '<script type="application/ld+json">' . wp_json_encode($schema, JSON_UNESCAPED_SLASHES) . '</script>' . "\n";
}
add_action('wp_head', 'lc_breadcrumb_schema', 6);

/**
 * Output FAQPage schema for pages with FAQ content
 */
function lc_faqpage_schema() {
    if (!is_singular()) {
        return;
    }

    global $post;
    $content = $post->post_content;

    // Check if page has FAQ items
    if (strpos($content, 'lc-faq-item') === false && strpos($content, 'faq') === false) {
        return;
    }

    // Extract FAQ items from content
    // Look for patterns: .lc-faq-item with .lc-faq-question and .lc-faq-answer
    $faq_items = array();
    
    // Simple regex to find FAQ blocks
    if (preg_match_all('/<div[^>]*class="[^"]*lc-faq-item[^"]*"[^>]*>.*?<div[^>]*class="[^"]*lc-faq-question[^"]*"[^>]*>(.*?)<\/div>.*?<div[^>]*class="[^"]*lc-faq-answer[^"]*"[^>]*>(.*?)<\/div>.*?<\/div>/si', $content, $matches)) {
        
        foreach ($matches[1] as $i => $question) {
            $answer = isset($matches[2][$i]) ? $matches[2][$i] : '';
            
            // Strip HTML tags and clean up
            $q_clean = wp_strip_all_tags($question);
            $a_clean = wp_strip_all_tags($answer);
            
            if (!empty($q_clean) && !empty($a_clean)) {
                $faq_items[] = array(
                    '@type'          => 'Question',
                    'name'           => trim($q_clean),
                    'acceptedAnswer' => array(
                        '@type' => 'Answer',
                        'text'  => trim($a_clean),
                    ),
                );
            }
        }
    }

    if (empty($faq_items)) {
        return; // No FAQ items found
    }

    $schema = array(
        '@context'      => 'https://schema.org',
        '@type'         => 'FAQPage',
        'mainEntity'    => $faq_items,
    );

    echo '<script type="application/ld+json">' . wp_json_encode($schema, JSON_UNESCAPED_SLASHES) . '</script>' . "\n";
}
add_action('wp_head', 'lc_faqpage_schema', 7);

/**
 * Output Product schema for service/product pages
 * Detects pages with pricing or product info via custom fields or content patterns
 */
function lc_product_schema() {
    if (!is_singular()) {
        return;
    }

    global $post;
    $post_id = $post->ID;
    
    // Check for product/service pricing in page (look for .lc-price classes)
    if (strpos($post->post_content, 'lc-price') === false) {
        return; // Not a product page
    }

    // Get pricing from page meta or extract from content
    $price = get_post_meta($post_id, '_lc_product_price', true);
    $currency = get_post_meta($post_id, '_lc_product_currency', true) ?: 'USD';

    // Fallback: try to extract price from content
    if (!$price) {
        // Look for currency symbol + number pattern
        if (preg_match('/\$[\d,]+/', $post->post_content, $matches)) {
            $price = str_replace('$', '', $matches[0]);
        }
    }

    if (!$price) {
        return; // No price found
    }

    $schema = array(
        '@context'    => 'https://schema.org',
        '@type'       => 'Product',
        'name'        => get_the_title(),
        'description' => get_the_excerpt(),
        'url'         => get_permalink(),
        'offers'      => array(
            '@type'         => 'Offer',
            'url'           => get_permalink(),
            'priceCurrency' => $currency,
            'price'         => str_replace(['$', ','], '', $price),
            'availability'  => 'https://schema.org/InStock',
        ),
    );

    // Add image if available
    if (has_post_thumbnail()) {
        $image_id = get_post_thumbnail_id();
        $image_url = wp_get_attachment_url($image_id);
        if ($image_url) {
            $schema['image'] = $image_url;
        }
    }

    echo '<script type="application/ld+json">' . wp_json_encode($schema, JSON_UNESCAPED_SLASHES) . '</script>' . "\n";
}
add_action('wp_head', 'lc_product_schema', 8);

/**
 * Output WebPage schema (general page metadata)
 */
function lc_webpage_schema() {
    if (!is_singular()) {
        return;
    }

    global $post;

    $schema = array(
        '@context'      => 'https://schema.org',
        '@type'         => 'WebPage',
        'name'          => get_the_title(),
        'description'   => get_the_excerpt(),
        'url'           => get_permalink(),
        'datePublished' => get_the_date('c'),
        'dateModified'  => get_the_modified_date('c'),
        'isPartOf'      => array(
            '@type' => 'WebSite',
            'name'  => get_bloginfo('name'),
            'url'   => home_url('/'),
        ),
    );

    // Add featured image
    if (has_post_thumbnail()) {
        $image_id = get_post_thumbnail_id();
        $image_url = wp_get_attachment_url($image_id);
        if ($image_url) {
            $schema['image'] = array(
                '@type'  => 'ImageObject',
                'url'    => $image_url,
                'width'  => 1200,
                'height' => 630,
            );
        }
    }

    // Add author if it's an article/blog post
    $author_id = $post->post_author;
    if ($author_id) {
        $author = get_user_by('id', $author_id);
        if ($author) {
            $schema['author'] = array(
                '@type' => 'Person',
                'name'  => $author->display_name,
                'url'   => get_author_posts_url($author_id),
            );
        }
    }

    echo '<script type="application/ld+json">' . wp_json_encode($schema, JSON_UNESCAPED_SLASHES) . '</script>' . "\n";
}
add_action('wp_head', 'lc_webpage_schema', 9);
