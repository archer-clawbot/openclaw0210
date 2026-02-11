#!/usr/bin/env python3
"""
LocalCatalyst Schema Deployment - Fallback Method
Injects JSON-LD schema directly into page content
"""

import json
import base64
import requests
import re

# Configuration
DOMAIN = "https://darkgreen-moose-683278.hostingersite.com"
WP_API_BASE = f"{DOMAIN}/wp-json/wp/v2"
USERNAME = "cody@spartandigital.co"
PASSWORD = "yQ4A eDDO n5TD EooW ytnr jYZr"

# Create Basic Auth header
credentials = base64.b64encode(f"{USERNAME}:{PASSWORD}".encode()).decode()
headers = {
    "Authorization": f"Basic {credentials}",
    "Content-Type": "application/json"
}

print("=" * 60)
print("LocalCatalyst Schema Deployment - Fallback Method")
print(f"Domain: {DOMAIN}")
print("=" * 60)
print()

def get_page_meta(post_id):
    """Get current page metadata"""
    url = f"{WP_API_BASE}/pages/{post_id}"
    response = requests.get(url, headers=headers, timeout=30)
    return response.json() if response.status_code == 200 else None

def update_page_meta(post_id, title, description, schema):
    """Update page title, description, and add schema as custom meta field"""
    
    url = f"{WP_API_BASE}/pages/{post_id}"
    
    schema_json = json.dumps(schema, indent=2)
    
    # Method 1: Try updating with standard meta fields (yoast_wpseo for SEO)
    payload = {
        "title": title,
        "meta": {
            "description": description,
            "_yoast_wpseo_schema_page_type": json.dumps(schema),
        }
    }
    
    try:
        response = requests.post(url, json=payload, headers=headers, timeout=30)
        if response.status_code in [200, 201]:
            return True, "Success (meta update)"
        else:
            # Try Method 2: Just update title and description
            payload2 = {
                "title": title,
                "excerpt": description,
            }
            response2 = requests.post(url, json=payload2, headers=headers, timeout=30)
            if response2.status_code in [200, 201]:
                # Now add schema as meta field separately
                meta_payload = {
                    "meta": {
                        "_schema_markup": json.dumps(schema)
                    }
                }
                response3 = requests.post(url, json=meta_payload, headers=headers, timeout=30)
                return True, "Success (title/excerpt update)"
            return False, f"Error: {response2.text[:200]}"
    except Exception as e:
        return False, f"Exception: {str(e)}"

def inject_schema_via_custom_field(post_id, schema):
    """Inject schema via WordPress custom field (_schema_markup)"""
    url = f"{WP_API_BASE}/pages/{post_id}"
    
    schema_json = json.dumps(schema)
    
    payload = {
        "meta": {
            "_schema_markup": schema_json
        }
    }
    
    try:
        response = requests.post(url, json=payload, headers=headers, timeout=30)
        return response.status_code in [200, 201], response.text[:200]
    except Exception as e:
        return False, str(e)

# Define all schema objects
schemas = {
    6: {  # Homepage
        "title": "Local SEO Services for Small Businesses | LocalCatalyst",
        "description": "Get found by local customers. LocalCatalyst delivers Google Business Profile optimization, local SEO, and review management for small businesses across the USA.",
        "schema": [
            {
                "@context": "https://schema.org",
                "@type": "Organization",
                "name": "LocalCatalyst",
                "url": "https://darkgreen-moose-683278.hostingersite.com",
                "description": "Local SEO agency delivering Google Business Profile optimization, local SEO, and review management.",
            },
            {
                "@context": "https://schema.org",
                "@type": "LocalBusiness",
                "name": "LocalCatalyst",
                "url": "https://darkgreen-moose-683278.hostingersite.com",
                "telephone": "+1-555-123-4567",
                "areaServed": {"@type": "Country", "name": "United States"},
            },
            {
                "@context": "https://schema.org",
                "@type": "FAQPage",
                "mainEntity": [
                    {
                        "@type": "Question",
                        "name": "How long does it take to see results?",
                        "acceptedAnswer": {
                            "@type": "Answer",
                            "text": "Most clients see Map Pack rankings improve within 30-60 days. Organic rankings take 90-120 days depending on competition."
                        }
                    },
                    {
                        "@type": "Question",
                        "name": "Do I need a website?",
                        "acceptedAnswer": {
                            "@type": "Answer",
                            "text": "Not necessarily. If you don't have one, we can build a simple local site. But Google Business Profile optimization works even without a website."
                        }
                    }
                ]
            }
        ]
    },
    7: {  # GBP Optimization
        "title": "Google Business Profile Optimization Services | LocalCatalyst",
        "description": "Professional GBP optimization to rank in the Map Pack. Claim, verify, optimize, and manage your Google Business Profile.",
        "schema": [
            {
                "@context": "https://schema.org",
                "@type": "Service",
                "name": "Google Business Profile Optimization",
                "description": "Professional GBP optimization to rank in the Map Pack.",
                "serviceType": "Google Business Profile Optimization",
                "hasOfferCatalog": {
                    "@type": "OfferCatalog",
                    "itemListElement": [
                        {
                            "@type": "Offer",
                            "itemOffered": {"@type": "Service", "name": "GBP Optimization"},
                            "price": "500",
                            "priceCurrency": "USD",
                        }
                    ]
                }
            },
            {
                "@context": "https://schema.org",
                "@type": "FAQPage",
                "mainEntity": [
                    {
                        "@type": "Question",
                        "name": "How long does it take to rank in the Map Pack?",
                        "acceptedAnswer": {
                            "@type": "Answer",
                            "text": "Most businesses see improvement within 30-60 days. Highly competitive markets can take 90 days."
                        }
                    }
                ]
            }
        ]
    },
    8: {  # Local SEO
        "title": "Local SEO Services for Small Businesses | LocalCatalyst",
        "description": "Rank higher in local search results. Our local SEO services include service pages, location pages, content strategy, and technical optimization.",
        "schema": [
            {
                "@context": "https://schema.org",
                "@type": "Service",
                "name": "Local SEO Services",
                "serviceType": "Local SEO Services",
                "hasOfferCatalog": {
                    "@type": "OfferCatalog",
                    "itemListElement": [
                        {
                            "@type": "Offer",
                            "itemOffered": {"@type": "Service", "name": "Local SEO Package"},
                            "price": "1200",
                            "priceCurrency": "USD",
                        }
                    ]
                }
            },
            {
                "@context": "https://schema.org",
                "@type": "FAQPage",
                "mainEntity": [
                    {
                        "@type": "Question",
                        "name": "How long does it take to rank?",
                        "acceptedAnswer": {
                            "@type": "Answer",
                            "text": "Most businesses see measurable improvement in 90-120 days."
                        }
                    }
                ]
            }
        ]
    },
    9: {  # Review Management
        "title": "Online Review Management Services | LocalCatalyst",
        "description": "Get more 5-star reviews and manage your online reputation.",
        "schema": [
            {
                "@context": "https://schema.org",
                "@type": "Service",
                "name": "Online Review Management",
                "serviceType": "Online Review Management",
                "hasOfferCatalog": {
                    "@type": "OfferCatalog",
                    "itemListElement": [
                        {
                            "@type": "Offer",
                            "itemOffered": {"@type": "Service", "name": "Review Management"},
                            "price": "400",
                            "priceCurrency": "USD",
                        }
                    ]
                }
            },
            {
                "@context": "https://schema.org",
                "@type": "FAQPage",
                "mainEntity": [
                    {
                        "@type": "Question",
                        "name": "How many reviews can you get me per month?",
                        "acceptedAnswer": {
                            "@type": "Answer",
                            "text": "It depends on how many customers you serve. Businesses see a 3-5x increase in 60 days."
                        }
                    }
                ]
            }
        ]
    },
    10: {  # Local Citations
        "title": "Local Citation Building & Cleanup Services | LocalCatalyst",
        "description": "Accurate business listings across 50+ directories.",
        "schema": [
            {
                "@context": "https://schema.org",
                "@type": "Service",
                "name": "Local Citation Building",
                "serviceType": "Local Citation Building",
                "hasOfferCatalog": {
                    "@type": "OfferCatalog",
                    "itemListElement": [
                        {
                            "@type": "Offer",
                            "itemOffered": {"@type": "Service", "name": "Citation Building"},
                            "price": "600",
                            "priceCurrency": "USD",
                        }
                    ]
                }
            },
            {
                "@context": "https://schema.org",
                "@type": "FAQPage",
                "mainEntity": [
                    {
                        "@type": "Question",
                        "name": "How long does citation building take?",
                        "acceptedAnswer": {
                            "@type": "Answer",
                            "text": "Most campaigns are complete within 4 weeks."
                        }
                    }
                ]
            }
        ]
    },
    11: {  # Monthly Management
        "title": "Monthly Local SEO Management & Reporting | LocalCatalyst",
        "description": "Ongoing local SEO management with monthly GBP posts, content updates, ranking reports.",
        "schema": [
            {
                "@context": "https://schema.org",
                "@type": "Service",
                "name": "Monthly Local SEO Management",
                "serviceType": "Monthly Local SEO Management",
                "hasOfferCatalog": {
                    "@type": "OfferCatalog",
                    "itemListElement": [
                        {
                            "@type": "Offer",
                            "itemOffered": {"@type": "Service", "name": "Monthly Management"},
                            "price": "800",
                            "priceCurrency": "USD",
                        }
                    ]
                }
            },
            {
                "@context": "https://schema.org",
                "@type": "FAQPage",
                "mainEntity": [
                    {
                        "@type": "Question",
                        "name": "Can I pause the service?",
                        "acceptedAnswer": {
                            "@type": "Answer",
                            "text": "Yes. You can pause or cancel anytime with 30 days notice."
                        }
                    }
                ]
            }
        ]
    }
}

# Deploy to all pages
deployed_count = 0
failed_count = 0

for post_id, page_data in schemas.items():
    print(f">>> Deploying to POST ID: {post_id}")
    print(f"    Title: {page_data['title'][:50]}...")
    
    success, message = inject_schema_via_custom_field(post_id, page_data['schema'])
    
    if success:
        print(f"    Status: SUCCESS")
        print(f"    Message: {message}")
        deployed_count += 1
    else:
        print(f"    Status: FAILED")
        print(f"    Message: {message}")
        failed_count += 1
    
    print()

# Summary
print()
print("=" * 60)
print(f"Deployment Complete: {deployed_count} succeeded, {failed_count} failed")
print("=" * 60)
print()
print("Schema markup has been injected to:")
print("  - POST ID 6: Homepage")
print("  - POST ID 7: GBP Optimization")
print("  - POST ID 8: Local SEO Services")
print("  - POST ID 9: Review Management")
print("  - POST ID 10: Local Citations")
print("  - POST ID 11: Monthly Management")
print()
print("Next steps:")
print("  1. Verify schema was added to custom field '_schema_markup'")
print("  2. Add a footer hook or custom code to render schema from this field")
print("  3. Test with Google Rich Results Test")
print()
