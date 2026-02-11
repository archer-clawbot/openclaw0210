<?php
/**
 * Schema Markup Rendering Function
 * 
 * Add this to your WordPress theme's functions.php or as a must-use plugin
 * 
 * This function renders JSON-LD schema from the custom post meta field
 * created during deployment (field name: _schema_markup)
 * 
 * Usage: Add one of the three methods below to your WordPress installation
 */

// ============================================================
// METHOD 1: Add to Theme Functions File (RECOMMENDED)
// ============================================================
// 
// File: wp-content/themes/[your-theme]/functions.php
// Add this code at the bottom of the file:
//

if ( ! function_exists( 'localcatalyst_render_schema_markup' ) ) {
    function localcatalyst_render_schema_markup() {
        // Only render on singular posts/pages
        if ( ! is_singular( array( 'page', 'post' ) ) ) {
            return;
        }
        
        // Get schema from custom post meta
        $schema = get_post_meta( get_the_ID(), '_schema_markup', true );
        
        if ( empty( $schema ) ) {
            return;
        }
        
        // Handle if stored as JSON string
        if ( is_string( $schema ) ) {
            $schema = json_decode( $schema, true );
        }
        
        // Verify we have valid schema
        if ( ! is_array( $schema ) ) {
            return;
        }
        
        // Output schema as JSON-LD
        echo "\n<!-- LocalCatalyst Schema Markup -->\n";
        echo '<script type="application/ld+json">' . "\n";
        echo json_encode( $schema, JSON_UNESCAPED_SLASHES | JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE );
        echo "\n</script>\n";
        echo "<!-- End LocalCatalyst Schema Markup -->\n\n";
    }
    
    // Hook to wp_footer with priority 99 (runs early)
    add_action( 'wp_footer', 'localcatalyst_render_schema_markup', 99 );
}

// ============================================================
// METHOD 2: Add to Theme Header (Alternative)
// ============================================================
//
// File: wp-content/themes/[your-theme]/header.php
// Add this code before closing </head> tag:
//

/*
<?php
if ( is_singular( array( 'page', 'post' ) ) ) {
    $schema = get_post_meta( get_the_ID(), '_schema_markup', true );
    if ( ! empty( $schema ) ) {
        if ( is_string( $schema ) ) {
            $schema = json_decode( $schema, true );
        }
        if ( is_array( $schema ) ) {
            echo "\n<!-- LocalCatalyst Schema Markup -->\n";
            echo '<script type="application/ld+json">' . "\n";
            echo json_encode( $schema, JSON_UNESCAPED_SLASHES | JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE );
            echo "\n</script>\n";
            echo "<!-- End LocalCatalyst Schema Markup -->\n";
        }
    }
}
?>
*/

// ============================================================
// METHOD 3: Create As Must-Use Plugin (Most Reliable)
// ============================================================
//
// File: wp-content/mu-plugins/localcatalyst-schema.php
// (Create mu-plugins folder if it doesn't exist)
//
// Content:
/*
<?php
/**
 * Plugin Name: LocalCatalyst Schema Markup Renderer
 * Plugin URI: https://localcatalyst.ai/
 * Description: Renders JSON-LD schema markup from custom post meta
 * Version: 1.0.0
 * Author: LocalCatalyst
 * License: MIT
 */

if ( ! function_exists( 'localcatalyst_render_schema_markup' ) ) {
    function localcatalyst_render_schema_markup() {
        if ( ! is_singular( array( 'page', 'post' ) ) ) {
            return;
        }
        
        $schema = get_post_meta( get_the_ID(), '_schema_markup', true );
        if ( empty( $schema ) ) {
            return;
        }
        
        if ( is_string( $schema ) ) {
            $schema = json_decode( $schema, true );
        }
        
        if ( ! is_array( $schema ) ) {
            return;
        }
        
        echo "\n<!-- LocalCatalyst Schema Markup -->\n";
        echo '<script type="application/ld+json">' . "\n";
        echo json_encode( $schema, JSON_UNESCAPED_SLASHES | JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE );
        echo "\n</script>\n";
        echo "<!-- End LocalCatalyst Schema Markup -->\n\n";
    }
    
    add_action( 'wp_footer', 'localcatalyst_render_schema_markup', 99 );
}
?>
*/

// ============================================================
// VERIFICATION: Check if Schema is Rendering
// ============================================================
//
// Step 1: After adding code above, visit a page
// Step 2: Right-click → View Page Source
// Step 3: Press Ctrl+F, search for: "application/ld+json"
// Step 4: You should see the schema JSON block
//
// If not showing:
// - Clear WordPress cache
// - Disable any caching plugins
// - Check browser cache (Ctrl+Shift+R to hard refresh)
// - Verify code was added to correct file
//

// ============================================================
// ADVANCED: Schema Validation Function (Optional)
// ============================================================
//
// Add this function to validate schema before output:
//

if ( ! function_exists( 'localcatalyst_validate_schema' ) ) {
    function localcatalyst_validate_schema( $schema ) {
        // Check for required fields
        if ( ! isset( $schema['@context'] ) || ! isset( $schema['@type'] ) ) {
            return false;
        }
        
        // Validate @context
        if ( $schema['@context'] !== 'https://schema.org' ) {
            return false;
        }
        
        // Valid schema types for LocalCatalyst
        $valid_types = array(
            'Organization',
            'LocalBusiness',
            'Service',
            'FAQPage',
            'BreadcrumbList',
            'Review',
            'AggregateRating',
        );
        
        if ( ! in_array( $schema['@type'], $valid_types ) ) {
            return false;
        }
        
        return true;
    }
}

// ============================================================
// TROUBLESHOOTING FUNCTIONS (Optional)
// ============================================================

/**
 * Debug function to check if schema is stored
 * Usage: Add to functions.php and visit:
 * https://example.com/?debug_schema=1
 */
if ( ! function_exists( 'localcatalyst_debug_schema' ) ) {
    function localcatalyst_debug_schema() {
        if ( ! current_user_can( 'edit_posts' ) || ! isset( $_GET['debug_schema'] ) ) {
            return;
        }
        
        if ( is_singular( array( 'page', 'post' ) ) ) {
            $schema = get_post_meta( get_the_ID(), '_schema_markup', true );
            
            echo '<pre style="background: #f5f5f5; padding: 20px; margin: 20px 0; overflow: auto;">';
            echo '<h3>Schema Debug Info</h3>';
            echo 'Post ID: ' . get_the_ID() . '<br>';
            echo 'Has Schema: ' . ( ! empty( $schema ) ? 'Yes' : 'No' ) . '<br>';
            
            if ( ! empty( $schema ) ) {
                if ( is_string( $schema ) ) {
                    $schema = json_decode( $schema, true );
                }
                
                echo '<h4>Schema JSON:</h4>';
                echo '<code>' . json_encode( $schema, JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES ) . '</code>';
            }
            
            echo '</pre>';
        }
    }
    
    add_action( 'wp_footer', 'localcatalyst_debug_schema', 1 );
}

// ============================================================
// FILTERS FOR CUSTOMIZATION
// ============================================================

/**
 * Filter to modify schema before output
 * Usage:
 * add_filter( 'localcatalyst_schema_before_output', function( $schema, $post_id ) {
 *     // Modify schema here
 *     return $schema;
 * }, 10, 2 );
 */
if ( ! function_exists( 'localcatalyst_render_schema_markup_with_filter' ) ) {
    function localcatalyst_render_schema_markup_with_filter() {
        if ( ! is_singular( array( 'page', 'post' ) ) ) {
            return;
        }
        
        $schema = get_post_meta( get_the_ID(), '_schema_markup', true );
        
        if ( empty( $schema ) ) {
            return;
        }
        
        if ( is_string( $schema ) ) {
            $schema = json_decode( $schema, true );
        }
        
        if ( ! is_array( $schema ) ) {
            return;
        }
        
        // Allow modification via filter
        $schema = apply_filters( 'localcatalyst_schema_before_output', $schema, get_the_ID() );
        
        if ( ! is_array( $schema ) || empty( $schema ) ) {
            return;
        }
        
        echo "\n<!-- LocalCatalyst Schema Markup -->\n";
        echo '<script type="application/ld+json">' . "\n";
        echo json_encode( $schema, JSON_UNESCAPED_SLASHES | JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE );
        echo "\n</script>\n";
        echo "<!-- End LocalCatalyst Schema Markup -->\n\n";
    }
    
    // Uncomment to use this version instead:
    // add_action( 'wp_footer', 'localcatalyst_render_schema_markup_with_filter', 99 );
}

// ============================================================
// NOTES
// ============================================================

/*
IMPORTANT:
1. Choose ONE method (1, 2, or 3) to add the code
2. Add it to your WordPress installation
3. Test by viewing page source for <script type="application/ld+json">
4. Verify in Google Rich Results Test: https://search.google.com/test/rich-results
5. Monitor Google Search Console for rich snippet appearance

RECOMMENDED METHOD: Method 1 (add to functions.php)
- Easiest to manage
- Survives theme updates if placed in child theme
- Can be easily removed if needed

MOST RELIABLE METHOD: Method 3 (must-use plugin)
- Won't be affected by theme changes
- Always loads before other plugins
- Professional implementation

TESTING:
After adding code, visit a page and right-click → View Page Source
Search for: "LocalCatalyst Schema Markup"
You should see the JSON-LD block between these comments

If not showing:
1. Check code was added to correct location
2. Clear all caches (WordPress, browser, CDN)
3. Disable caching plugins temporarily
4. Hard refresh browser (Ctrl+Shift+R)
5. Check browser console for JavaScript errors
*/
?>
