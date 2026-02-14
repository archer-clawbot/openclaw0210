<?php
/**
 * Template Name: LC: Home Page
 * Description: Home page template with hero, features, and CTA sections
 * 
 * @package LocalCatalyst
 */

get_header(); ?>

<main id="site-content" class="lc-main" role="main">
    <?php
    
    // Output page content from the block editor
    if (have_posts()) {
        while (have_posts()) {
            the_post();
            the_content();
        }
    }
    
    ?>
</main>

<?php get_footer();
