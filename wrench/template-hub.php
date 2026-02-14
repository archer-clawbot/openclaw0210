<?php
/**
 * Template Name: LC: Hub/Category Page
 * Description: Template for hub, category, or index pages with intro and content list
 * 
 * @package LocalCatalyst
 */

get_header(); ?>

<main id="site-content" class="lc-main lc-hub-page" role="main">
    <?php
    
    if (have_posts()) {
        while (have_posts()) {
            the_post();
            
            // Output hero and intro content
            the_content();
            
            ?>
            <!-- Hub page structure for consistent layout -->
            <div class="lc-container">
                <div class="lc-hub-content">
                    <!-- Child pages or related content can be listed here -->
                    <!-- Content is managed via page blocks in editor -->
                </div>
            </div>
            <?php
        }
    }
    
    ?>
</main>

<?php get_footer();
