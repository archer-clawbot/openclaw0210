<?php
/**
 * Spectators Bar & Grill - Location-Specific Schema Markup
 * 
 * Add this code via:
 * 1. AIOSEO > Tools > Code Snippets (if Pro), OR
 * 2. Install "Code Snippets" plugin and add there, OR
 * 3. Add to theme's functions.php via Astra > Customize > Hooks
 * 
 * This replaces the generic schema with location-specific LocalBusiness schema
 */

add_action('wp_head', 'spectators_location_schema', 5);

function spectators_location_schema() {
    // Only run on location pages
    if (!is_page()) return;
    
    $page_id = get_the_ID();
    $schema = null;
    
    // Sugar Land - Page ID: 2535
    if ($page_id == 2535 || is_page('spectators-sugar-land')) {
        $schema = [
            '@context' => 'https://schema.org',
            '@type' => 'Restaurant',
            '@id' => 'https://spectatorsbargrill.com/locations/spectators-sugar-land/#restaurant',
            'name' => 'Spectators Bar and Grill - Sugar Land',
            'image' => 'https://spectatorsbargrill.com/wp-content/uploads/2022/09/facebook-profile-logo-dark.jpg',
            'url' => 'https://spectatorsbargrill.com/locations/spectators-sugar-land/',
            'telephone' => '+1-346-874-7275',
            'priceRange' => '$$',
            'servesCuisine' => ['American', 'Bar Food', 'Wings', 'Burgers'],
            'address' => [
                '@type' => 'PostalAddress',
                'streetAddress' => '1525 Lake Pointe Pkwy, Suite 100',
                'addressLocality' => 'Sugar Land',
                'addressRegion' => 'TX',
                'postalCode' => '77478',
                'addressCountry' => 'US'
            ],
            'geo' => [
                '@type' => 'GeoCoordinates',
                'latitude' => 29.5963,
                'longitude' => -95.6349
            ],
            'openingHoursSpecification' => [
                [
                    '@type' => 'OpeningHoursSpecification',
                    'dayOfWeek' => ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
                    'opens' => '09:00',
                    'closes' => '00:00'
                ],
                [
                    '@type' => 'OpeningHoursSpecification',
                    'dayOfWeek' => 'Saturday',
                    'opens' => '10:00',
                    'closes' => '01:00'
                ],
                [
                    '@type' => 'OpeningHoursSpecification',
                    'dayOfWeek' => 'Sunday',
                    'opens' => '10:00',
                    'closes' => '00:00'
                ]
            ],
            'sameAs' => [
                'https://www.facebook.com/spectatorsbargrill/',
                'https://www.instagram.com/spectatorsbarandgrill/',
                'https://www.yelp.com/biz/spectators-bar-and-grill-sugar-land'
            ],
            'hasMenu' => 'https://spectatorsbargrill.com/food-menu/',
            'acceptsReservations' => 'Yes'
        ];
    }
    
    // Riverstone - Page ID: 2559
    elseif ($page_id == 2559 || is_page('spectators-riverstone')) {
        $schema = [
            '@context' => 'https://schema.org',
            '@type' => 'Restaurant',
            '@id' => 'https://spectatorsbargrill.com/locations/spectators-riverstone/#restaurant',
            'name' => 'Spectators Bar and Grill - Riverstone',
            'image' => 'https://spectatorsbargrill.com/wp-content/uploads/2022/09/facebook-profile-logo-dark.jpg',
            'url' => 'https://spectatorsbargrill.com/locations/spectators-riverstone/',
            'telephone' => '+1-346-585-3078',
            'priceRange' => '$$',
            'servesCuisine' => ['American', 'Bar Food', 'Wings', 'Burgers'],
            'address' => [
                '@type' => 'PostalAddress',
                'streetAddress' => '18702 University Blvd',
                'addressLocality' => 'Sugar Land',
                'addressRegion' => 'TX',
                'postalCode' => '77479',
                'addressCountry' => 'US'
            ],
            'geo' => [
                '@type' => 'GeoCoordinates',
                'latitude' => 29.5389,
                'longitude' => -95.6792
            ],
            'openingHoursSpecification' => [
                [
                    '@type' => 'OpeningHoursSpecification',
                    'dayOfWeek' => ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
                    'opens' => '11:00',
                    'closes' => '00:00'
                ],
                [
                    '@type' => 'OpeningHoursSpecification',
                    'dayOfWeek' => 'Saturday',
                    'opens' => '10:00',
                    'closes' => '01:00'
                ],
                [
                    '@type' => 'OpeningHoursSpecification',
                    'dayOfWeek' => 'Sunday',
                    'opens' => '10:00',
                    'closes' => '00:00'
                ]
            ],
            'sameAs' => [
                'https://www.facebook.com/spectatorsbargrill/',
                'https://www.instagram.com/spectatorsbarandgrill/',
                'https://www.opentable.com/r/spectators-bar-and-grill-riverstone-sugar-land'
            ],
            'hasMenu' => 'https://spectatorsbargrill.com/food-menu/',
            'acceptsReservations' => 'Yes'
        ];
    }
    
    // Harvest Green - Page ID: 2740
    elseif ($page_id == 2740 || is_page('harvest-green')) {
        $schema = [
            '@context' => 'https://schema.org',
            '@type' => 'Restaurant',
            '@id' => 'https://spectatorsbargrill.com/locations/harvest-green/#restaurant',
            'name' => 'Spectators Bar and Grill - Harvest Green',
            'image' => 'https://spectatorsbargrill.com/wp-content/uploads/2022/09/facebook-profile-logo-dark.jpg',
            'url' => 'https://spectatorsbargrill.com/locations/harvest-green/',
            'telephone' => '+1-346-391-8065',
            'priceRange' => '$$',
            'servesCuisine' => ['American', 'Bar Food', 'Wings', 'Burgers'],
            'address' => [
                '@type' => 'PostalAddress',
                'streetAddress' => '18822 West Airport Blvd, #700',
                'addressLocality' => 'Richmond',
                'addressRegion' => 'TX',
                'postalCode' => '77406',
                'addressCountry' => 'US'
            ],
            'geo' => [
                '@type' => 'GeoCoordinates',
                'latitude' => 29.5456,
                'longitude' => -95.7512
            ],
            'openingHoursSpecification' => [
                [
                    '@type' => 'OpeningHoursSpecification',
                    'dayOfWeek' => ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
                    'opens' => '11:00',
                    'closes' => '00:00'
                ],
                [
                    '@type' => 'OpeningHoursSpecification',
                    'dayOfWeek' => 'Saturday',
                    'opens' => '10:00',
                    'closes' => '01:00'
                ],
                [
                    '@type' => 'OpeningHoursSpecification',
                    'dayOfWeek' => 'Sunday',
                    'opens' => '10:00',
                    'closes' => '00:00'
                ]
            ],
            'sameAs' => [
                'https://www.facebook.com/spectatorsbargrill/',
                'https://www.instagram.com/spectatorsbarandgrill/',
                'https://www.opentable.com/r/spectators-bar-and-grill-richmond-2'
            ],
            'hasMenu' => 'https://spectatorsbargrill.com/food-menu/',
            'acceptsReservations' => 'Yes'
        ];
    }
    
    // Output schema if we have one for this page
    if ($schema) {
        echo '<script type="application/ld+json">' . "\n";
        echo json_encode($schema, JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES);
        echo "\n" . '</script>' . "\n";
    }
}
