<?php
/**
 * Template Name: LC: Standard Page
 * Description: Standard full-width page template (default)
 * 
 * @package LocalCatalyst
 */

get_header(); ?>

<main id="site-content" class="lc-main lc-standard-page" role="main">
    <?php
    
    if (have_posts()) {
        while (have_posts()) {
            the_post();
            the_content();
        }
    }
    
    ?>
</main>

<?php get_footer();
