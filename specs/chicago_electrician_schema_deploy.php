<?php
/**
 * Chicago's Electrician - LocalBusiness & Service Schema Deployment
 * 
 * This file contains JSON-LD schema markup for Google Rich Results
 * Includes: LocalBusiness, Organization, Service, and AggregateRating schemas
 * 
 * Add to functions.php or use Code Snippets plugin with this code:
 */

// Hook to add schema to wp_head
add_action('wp_head', 'mcc_electric_add_schema_markup');

function mcc_electric_add_schema_markup() {
    // Only add on specific pages or homepage
    if (is_home() || is_front_page() || is_page()) {
        echo mcc_electric_localbusiness_schema();
        
        // Add Service schemas based on page
        if (is_page('residential-electrician')) {
            echo mcc_electric_residential_service_schema();
        } elseif (is_page('commercial-electrician')) {
            echo mcc_electric_commercial_service_schema();
        } elseif (is_page('emergency-electrician')) {
            echo mcc_electric_emergency_service_schema();
        }
    }
}

/**
 * LocalBusiness Schema for Homepage
 */
function mcc_electric_localbusiness_schema() {
    $schema = [
        "@context" => "https://schema.org",
        "@type" => ["LocalBusiness", "ElectricalContractor"],
        "name" => "MCC Electric",
        "alternateName" => "Chicago's Electrician",
        "description" => "Licensed electrical contractor providing 24/7 emergency electrical services for residential and commercial properties across Chicago and suburbs for over 25 years.",
        "url" => "https://www.chicagoselectrician.com",
        "priceRange" => "$$",
        "telephone" => "+1-847-401-8393",
        "email" => "info@mccelectric.com",
        "address" => [
            "@type" => "PostalAddress",
            "streetAddress" => "376 Monaco Drive",
            "addressLocality" => "Roselle",
            "addressRegion" => "IL",
            "postalCode" => "60172",
            "addressCountry" => "US"
        ],
        "geo" => [
            "@type" => "GeoCoordinates",
            "latitude" => 41.8071,
            "longitude" => -88.0357
        ],
        "openingHoursSpecification" => [
            [
                "@type" => "OpeningHoursSpecification",
                "dayOfWeek" => ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
                "opens" => "08:00",
                "closes" => "18:00"
            ],
            [
                "@type" => "OpeningHoursSpecification",
                "dayOfWeek" => ["Saturday"],
                "opens" => "09:00",
                "closes" => "17:00"
            ],
            [
                "@type" => "OpeningHoursSpecification",
                "dayOfWeek" => ["Sunday"],
                "opens" => "10:00",
                "closes" => "16:00"
            ]
        ],
        "areaServed" => [
            [
                "@type" => "City",
                "name" => "Chicago, IL"
            ],
            [
                "@type" => "City",
                "name" => "Roselle, IL"
            ],
            [
                "@type" => "City",
                "name" => "Oak Park, IL"
            ],
            [
                "@type" => "AdministrativeArea",
                "name" => "Cook County, IL"
            ],
            [
                "@type" => "AdministrativeArea",
                "name" => "DuPage County, IL"
            ]
        ],
        "foundingDate" => "1999",
        "founders" => [
            [
                "@type" => "Person",
                "name" => "MCC Electric Team"
            ]
        ],
        "contactPoint" => [
            [
                "@type" => "ContactPoint",
                "contactType" => "Customer Service",
                "telephone" => "+1-847-401-8393",
                "availableLanguage" => "en"
            ],
            [
                "@type" => "ContactPoint",
                "contactType" => "Emergency Service",
                "telephone" => "+1-847-401-8393",
                "areaServed" => "Chicago, IL and surrounding suburbs"
            ]
        ],
        "aggregateRating" => [
            "@type" => "AggregateRating",
            "ratingValue" => "4.9",
            "ratingCount" => "150",
            "bestRating" => "5",
            "worstRating" => "1"
        ],
        "knowsAbout" => [
            "Emergency Electrical Services",
            "Residential Electrical",
            "Commercial Electrical",
            "Lighting Installation",
            "Electrical Panel Upgrade",
            "Circuit Breaker Repair",
            "Electrical Wiring",
            "EV Charger Installation",
            "Generator Installation",
            "Security Systems Installation"
        ],
        "sameAs" => [
            "https://www.google.com/maps/place/MCC+Electric",
            "https://www.facebook.com/chicagoelectrician"
        ],
        "image" => [
            "@type" => "ImageObject",
            "url" => "https://www.chicagoselectrician.com/wp-content/uploads/2025/07/mcc-electric-logo.jpg",
            "width" => 300,
            "height" => 300
        ]
    ];
    
    return '<script type="application/ld+json">' . json_encode($schema, JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE) . '</script>' . "\n";
}

/**
 * Residential Electrical Service Schema
 */
function mcc_electric_residential_service_schema() {
    $schema = [
        "@context" => "https://schema.org",
        "@type" => "Service",
        "name" => "Residential Electrical Services",
        "description" => "Professional residential electrical services including lighting installation, panel upgrades, rewiring, repairs, troubleshooting, and emergency services for homes across Chicago and surrounding areas.",
        "serviceType" => "Electrical Services",
        "category" => "Residential Electrical",
        "provider" => [
            "@type" => "LocalBusiness",
            "name" => "MCC Electric",
            "url" => "https://www.chicagoselectrician.com",
            "telephone" => "+1-847-401-8393"
        ],
        "areaServed" => [
            [
                "@type" => "City",
                "name" => "Chicago, IL"
            ],
            [
                "@type" => "City",
                "name" => "Roselle, IL"
            ],
            [
                "@type" => "AdministrativeArea",
                "name" => "Cook County, IL"
            ],
            [
                "@type" => "AdministrativeArea",
                "name" => "DuPage County, IL"
            ]
        ],
        "offers" => [
            "@type" => "Offer",
            "priceCurrency" => "USD",
            "priceRange" => "$$"
        ],
        "hasOfferCatalog" => [
            "@type" => "OfferCatalog",
            "name" => "Residential Services",
            "itemListElement" => [
                [
                    "@type" => "Offer",
                    "itemOffered" => [
                        "@type" => "Service",
                        "name" => "Lighting Installation"
                    ]
                ],
                [
                    "@type" => "Offer",
                    "itemOffered" => [
                        "@type" => "Service",
                        "name" => "Electrical Panel Upgrades"
                    ]
                ],
                [
                    "@type" => "Offer",
                    "itemOffered" => [
                        "@type" => "Service",
                        "name" => "Electrical Wiring & Rewiring"
                    ]
                ],
                [
                    "@type" => "Offer",
                    "itemOffered" => [
                        "@type" => "Service",
                        "name" => "Electrical Repairs"
                    ]
                ]
            ]
        ]
    ];
    
    return '<script type="application/ld+json">' . json_encode($schema, JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE) . '</script>' . "\n";
}

/**
 * Commercial Electrical Service Schema
 */
function mcc_electric_commercial_service_schema() {
    $schema = [
        "@context" => "https://schema.org",
        "@type" => "Service",
        "name" => "Commercial Electrical Services",
        "description" => "Comprehensive commercial electrical services including tenant buildouts, new construction, rewiring, code compliance, and large-scale electrical projects for businesses across Chicago.",
        "serviceType" => "Electrical Services",
        "category" => "Commercial Electrical",
        "provider" => [
            "@type" => "LocalBusiness",
            "name" => "MCC Electric",
            "url" => "https://www.chicagoselectrician.com",
            "telephone" => "+1-847-401-8393"
        ],
        "areaServed" => [
            [
                "@type" => "City",
                "name" => "Chicago, IL"
            ],
            [
                "@type" => "AdministrativeArea",
                "name" => "Cook County, IL"
            ]
        ],
        "offers" => [
            "@type" => "Offer",
            "priceCurrency" => "USD",
            "priceRange" => "$$$"
        ]
    ];
    
    return '<script type="application/ld+json">' . json_encode($schema, JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE) . '</script>' . "\n";
}

/**
 * Emergency Electrical Service Schema
 */
function mcc_electric_emergency_service_schema() {
    $schema = [
        "@context" => "https://schema.org",
        "@type" => "Service",
        "name" => "24/7 Emergency Electrical Services",
        "description" => "24/7 emergency electrical services available anytime for urgent electrical issues in Chicago area homes and businesses.",
        "serviceType" => "Emergency Electrical Services",
        "category" => "Emergency Services",
        "provider" => [
            "@type" => "LocalBusiness",
            "name" => "MCC Electric",
            "url" => "https://www.chicagoselectrician.com",
            "telephone" => "+1-847-401-8393"
        ],
        "areaServed" => [
            [
                "@type" => "AdministrativeArea",
                "name" => "Chicago, IL and surrounding suburbs"
            ]
        ],
        "offers" => [
            "@type" => "Offer",
            "priceCurrency" => "USD",
            "priceRange" => "$$"
        ],
        "availableLanguage" => "en",
        "isAvailableAtLocation" => [
            "@type" => "PostalAddress",
            "streetAddress" => "376 Monaco Drive",
            "addressLocality" => "Roselle",
            "addressRegion" => "IL",
            "postalCode" => "60172"
        ]
    ];
    
    return '<script type="application/ld+json">' . json_encode($schema, JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE) . '</script>' . "\n";
}

/**
 * BreadcrumbList Schema (for all pages)
 */
function mcc_electric_breadcrumb_schema() {
    $schema = [
        "@context" => "https://schema.org",
        "@type" => "BreadcrumbList",
        "itemListElement" => [
            [
                "@type" => "ListItem",
                "position" => 1,
                "name" => "Home",
                "item" => "https://www.chicagoselectrician.com"
            ],
            [
                "@type" => "ListItem",
                "position" => 2,
                "name" => "Services",
                "item" => "https://www.chicagoselectrician.com/services"
            ]
        ]
    ];
    
    return '<script type="application/ld+json">' . json_encode($schema, JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE) . '</script>' . "\n";
}

// Optional: Add breadcrumb schema to all pages
add_action('wp_head', 'mcc_electric_add_breadcrumb_schema');
function mcc_electric_add_breadcrumb_schema() {
    echo mcc_electric_breadcrumb_schema();
}

?>
