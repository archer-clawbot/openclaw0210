<?php
/**
 * Template Name: LC: Service Page
 * Description: Template for service/product pages with hero, features, pricing, and FAQ
 * 
 * @package LocalCatalyst
 */

get_header(); ?>

<main id="site-content" class="lc-main lc-service-page" role="main">
    <?php
    
    if (have_posts()) {
        while (have_posts()) {
            the_post();
            
            // Output main page content
            the_content();
            
            // Add structured schema for service/product pages
            ?>
            <script type="application/ld+json">
            {
                "@context": "https://schema.org",
                "@type": "Service",
                "name": "<?php echo wp_kses_post(get_the_title()); ?>",
                "description": "<?php echo wp_kses_post(get_the_excerpt()); ?>",
                "url": "<?php echo esc_url(get_permalink()); ?>",
                "provider": {
                    "@type": "Organization",
                    "name": "LocalCatalyst",
                    "url": "<?php echo esc_url(home_url('/')); ?>"
                }
            }
            </script>
            <?php
        }
    }
    
    ?>
</main>

<?php get_footer();
