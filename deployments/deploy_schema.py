#!/usr/bin/env python3
"""
LocalCatalyst Schema Deployment Script
Deploys Organization, LocalBusiness, Service, and FAQPage schema to all pages
"""

import json
import base64
import requests
import sys

# Configuration
DOMAIN = "https://darkgreen-moose-683278.hostingersite.com"
API_BASE = f"{DOMAIN}/wp-json/rankmath/v1"
USERNAME = "cody@spartandigital.co"
PASSWORD = "yQ4A eDDO n5TD EooW ytnr jYZr"

# Create Basic Auth header
credentials = base64.b64encode(f"{USERNAME}:{PASSWORD}".encode()).decode()
headers = {
    "Authorization": f"Basic {credentials}",
    "Content-Type": "application/json"
}

print("=" * 50)
print("LocalCatalyst Schema Deployment")
print(f"Domain: {DOMAIN}")
print("=" * 50)
print()

def deploy_schema(post_id, title, description, schema):
    """Deploy schema to a post via RankMath API"""
    print(f">>> Deploying to POST ID: {post_id}")
    print(f"    Title: {title}")
    
    url = f"{API_BASE}/posts/{post_id}/metadata"
    payload = {
        "title": title,
        "description": description,
        "schema": schema
    }
    
    try:
        response = requests.post(url, json=payload, headers=headers, timeout=30)
        print(f"    Status: {response.status_code}")
        
        if response.status_code in [200, 201]:
            print(f"    ✅ Success")
        else:
            print(f"    ❌ Error: {response.text[:200]}")
        print()
        return response.status_code in [200, 201]
    except Exception as e:
        print(f"    ❌ Exception: {str(e)}")
        print()
        return False

# ============================================
# PAGE 1: HOMEPAGE (ID 6)
# ============================================
print(">>> DEPLOYING HOMEPAGE SCHEMA (ID 6)")
print()

homepage_schema = [
    {
        "@context": "https://schema.org",
        "@type": "Organization",
        "@id": "https://darkgreen-moose-683278.hostingersite.com#organization",
        "name": "LocalCatalyst",
        "url": "https://darkgreen-moose-683278.hostingersite.com",
        "description": "Local SEO agency delivering Google Business Profile optimization, local SEO, and review management for small businesses.",
    },
    {
        "@context": "https://schema.org",
        "@type": "LocalBusiness",
        "@id": "https://darkgreen-moose-683278.hostingersite.com#business",
        "name": "LocalCatalyst",
        "url": "https://darkgreen-moose-683278.hostingersite.com",
        "telephone": "+1-555-123-4567",
        "email": "hello@localcatalyst.com",
        "areaServed": [
            {"@type": "Country", "name": "United States"}
        ],
        "hasOfferCatalog": {
            "@type": "OfferCatalog",
            "name": "Local SEO Services",
            "itemListElement": [
                {
                    "@type": "Offer",
                    "itemOffered": {
                        "@type": "Service",
                        "name": "Google Business Profile Optimization",
                    },
                    "price": "500",
                    "priceCurrency": "USD",
                },
                {
                    "@type": "Offer",
                    "itemOffered": {
                        "@type": "Service",
                        "name": "Local SEO Services",
                    },
                    "price": "1200",
                    "priceCurrency": "USD",
                },
                {
                    "@type": "Offer",
                    "itemOffered": {
                        "@type": "Service",
                        "name": "Review Management",
                    },
                    "price": "400",
                    "priceCurrency": "USD",
                },
                {
                    "@type": "Offer",
                    "itemOffered": {
                        "@type": "Service",
                        "name": "Local Citations",
                    },
                    "price": "600",
                    "priceCurrency": "USD",
                },
                {
                    "@type": "Offer",
                    "itemOffered": {
                        "@type": "Service",
                        "name": "Monthly Local SEO Management",
                    },
                    "price": "800",
                    "priceCurrency": "USD",
                },
            ]
        }
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
            },
            {
                "@type": "Question",
                "name": "What is included in your monthly service?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "GBP management (posts, photos, Q&A), review monitoring and responses, monthly reporting, and ongoing optimization."
                }
            },
            {
                "@type": "Question",
                "name": "How much does local SEO cost?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Our plans start at $500/month depending on your market and service area. Contact us for a custom quote."
                }
            }
        ]
    },
    {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
            {
                "@type": "ListItem",
                "position": 1,
                "name": "Home",
                "item": "https://darkgreen-moose-683278.hostingersite.com"
            }
        ]
    }
]

deploy_schema(6,
    "Local SEO Services for Small Businesses | LocalCatalyst",
    "Get found by local customers. LocalCatalyst delivers Google Business Profile optimization, local SEO, and review management for small businesses across the USA.",
    homepage_schema)

# ============================================
# PAGE 2: GBP OPTIMIZATION (ID 7)
# ============================================
print(">>> DEPLOYING GBP OPTIMIZATION SCHEMA (ID 7)")
print()

gbp_schema = [
    {
        "@context": "https://schema.org",
        "@type": "Service",
        "@id": "https://darkgreen-moose-683278.hostingersite.com/services/google-business-profile/#service",
        "name": "Google Business Profile Optimization",
        "description": "Professional GBP optimization to rank in the Map Pack. Claim, verify, optimize, and manage your Google Business Profile.",
        "serviceType": "Google Business Profile Optimization",
        "provider": {
            "@type": "LocalBusiness",
            "@id": "https://darkgreen-moose-683278.hostingersite.com#business",
            "name": "LocalCatalyst",
        },
        "areaServed": {"@type": "Country", "name": "United States"},
        "hasOfferCatalog": {
            "@type": "OfferCatalog",
            "name": "GBP Services",
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
                    "text": "Most businesses see improvement within 30-60 days. Highly competitive markets can take 90 days. Less competitive markets may see results in 2-3 weeks."
                }
            },
            {
                "@type": "Question",
                "name": "What if I don't have a verified GBP yet?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "No problem. We will claim it, verify it, and optimize it from scratch. Verification typically takes 5-7 days."
                }
            },
            {
                "@type": "Question",
                "name": "Can you optimize a service-area business?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Absolutely. Plumbers, electricians, and other mobile businesses can rank in the Map Pack. We optimize your service area and can hide your address if needed."
                }
            },
            {
                "@type": "Question",
                "name": "What if I have multiple locations?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "We can manage multi-location GBPs. Pricing is per location. Each location gets its own optimized profile."
                }
            },
            {
                "@type": "Question",
                "name": "Do I need a website?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "No. Your GBP can rank without a website. However, having a website improves your rankings and gives customers more information."
                }
            }
        ]
    },
    {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
            {"@type": "ListItem", "position": 1, "name": "Home", "item": "https://darkgreen-moose-683278.hostingersite.com"},
            {"@type": "ListItem", "position": 2, "name": "Services", "item": "https://darkgreen-moose-683278.hostingersite.com/services/"},
            {"@type": "ListItem", "position": 3, "name": "Google Business Profile", "item": "https://darkgreen-moose-683278.hostingersite.com/services/google-business-profile/"}
        ]
    }
]

deploy_schema(7,
    "Google Business Profile Optimization Services | LocalCatalyst",
    "Professional GBP optimization to rank in the Map Pack. Claim, verify, optimize, and manage your Google Business Profile.",
    gbp_schema)

# ============================================
# PAGE 3: LOCAL SEO (ID 8)
# ============================================
print(">>> DEPLOYING LOCAL SEO SCHEMA (ID 8)")
print()

local_seo_schema = [
    {
        "@context": "https://schema.org",
        "@type": "Service",
        "@id": "https://darkgreen-moose-683278.hostingersite.com/services/local-seo/#service",
        "name": "Local SEO Services",
        "description": "Rank higher in local search results. Our local SEO services include service pages, location pages, content strategy, and technical optimization.",
        "serviceType": "Local SEO Services",
        "provider": {
            "@type": "LocalBusiness",
            "@id": "https://darkgreen-moose-683278.hostingersite.com#business",
            "name": "LocalCatalyst",
        },
        "areaServed": {"@type": "Country", "name": "United States"},
        "hasOfferCatalog": {
            "@type": "OfferCatalog",
            "name": "Local SEO Services",
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
                    "text": "Most businesses see measurable improvement in 90-120 days. Highly competitive markets may take 6 months. Less competitive markets can see results in 60 days."
                }
            },
            {
                "@type": "Question",
                "name": "Do I need a new website?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Not necessarily. If you have a website, we optimize what you have. If you don't, we can build a simple local site."
                }
            },
            {
                "@type": "Question",
                "name": "What if I serve multiple cities?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "We build dedicated location pages for each city you serve. Each page is unique, locally-focused, and optimized."
                }
            },
            {
                "@type": "Question",
                "name": "Will local SEO help my GBP rank?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Yes. Local SEO and GBP optimization work together. A well-optimized website improves your GBP rankings."
                }
            },
            {
                "@type": "Question",
                "name": "What's the difference between local SEO and national SEO?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Local SEO targets searches with geographic intent (city names, near me). National SEO targets broader keywords. If you serve a specific area, local SEO is what you need."
                }
            }
        ]
    },
    {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
            {"@type": "ListItem", "position": 1, "name": "Home", "item": "https://darkgreen-moose-683278.hostingersite.com"},
            {"@type": "ListItem", "position": 2, "name": "Services", "item": "https://darkgreen-moose-683278.hostingersite.com/services/"},
            {"@type": "ListItem", "position": 3, "name": "Local SEO", "item": "https://darkgreen-moose-683278.hostingersite.com/services/local-seo/"}
        ]
    }
]

deploy_schema(8,
    "Local SEO Services for Small Businesses | LocalCatalyst",
    "Rank higher in local search results. Our local SEO services include service pages, location pages, content strategy, and technical optimization.",
    local_seo_schema)

# ============================================
# PAGE 4: REVIEW MANAGEMENT (ID 9)
# ============================================
print(">>> DEPLOYING REVIEW MANAGEMENT SCHEMA (ID 9)")
print()

review_schema = [
    {
        "@context": "https://schema.org",
        "@type": "Service",
        "@id": "https://darkgreen-moose-683278.hostingersite.com/services/review-management/#service",
        "name": "Online Review Management",
        "description": "Get more 5-star reviews and manage your online reputation. We help you generate reviews, respond professionally, and turn reputation into revenue.",
        "serviceType": "Online Review Management",
        "provider": {
            "@type": "LocalBusiness",
            "@id": "https://darkgreen-moose-683278.hostingersite.com#business",
            "name": "LocalCatalyst",
        },
        "areaServed": {"@type": "Country", "name": "United States"},
        "hasOfferCatalog": {
            "@type": "OfferCatalog",
            "name": "Review Management",
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
                    "text": "It depends on how many customers you serve. On average, businesses see a 3-5x increase in review volume within the first 60 days."
                }
            },
            {
                "@type": "Question",
                "name": "Can you remove negative reviews?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "We can flag reviews that violate platform policies. Google and Yelp will remove those. Legitimate reviews stay but we respond professionally."
                }
            },
            {
                "@type": "Question",
                "name": "Do you write the review responses?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "We write them. You can approve them before they go live, or give us full autonomy."
                }
            },
            {
                "@type": "Question",
                "name": "What if I don't have many customers yet?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "That's okay. Even 1-2 reviews per month compounds over time. We will work with your current volume and scale as you grow."
                }
            },
            {
                "@type": "Question",
                "name": "Will asking for reviews hurt relationships?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Not if done right. We use polite, well-timed requests that feel natural. Most customers are happy to leave a review if asked."
                }
            }
        ]
    },
    {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
            {"@type": "ListItem", "position": 1, "name": "Home", "item": "https://darkgreen-moose-683278.hostingersite.com"},
            {"@type": "ListItem", "position": 2, "name": "Services", "item": "https://darkgreen-moose-683278.hostingersite.com/services/"},
            {"@type": "ListItem", "position": 3, "name": "Review Management", "item": "https://darkgreen-moose-683278.hostingersite.com/services/review-management/"}
        ]
    }
]

deploy_schema(9,
    "Online Review Management Services | LocalCatalyst",
    "Get more 5-star reviews and manage your online reputation. We help you generate reviews, respond professionally, and turn reputation into revenue.",
    review_schema)

# ============================================
# PAGE 5: LOCAL CITATIONS (ID 10)
# ============================================
print(">>> DEPLOYING LOCAL CITATIONS SCHEMA (ID 10)")
print()

citations_schema = [
    {
        "@context": "https://schema.org",
        "@type": "Service",
        "@id": "https://darkgreen-moose-683278.hostingersite.com/services/local-citations/#service",
        "name": "Local Citation Building",
        "description": "Accurate business listings across 50+ directories. We build, clean up, and manage your local citations to improve local SEO and Map Pack rankings.",
        "serviceType": "Local Citation Building",
        "provider": {
            "@type": "LocalBusiness",
            "@id": "https://darkgreen-moose-683278.hostingersite.com#business",
            "name": "LocalCatalyst",
        },
        "areaServed": {"@type": "Country", "name": "United States"},
        "hasOfferCatalog": {
            "@type": "OfferCatalog",
            "name": "Citation Services",
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
                    "text": "Most campaigns are complete within 4 weeks. Some directories take time to approve listings (up to 30 days), but we submit everything within the first 2 weeks."
                }
            },
            {
                "@type": "Question",
                "name": "How many citations do I need?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "We recommend at least 50 for most businesses. Competitive markets benefit from 75-100+."
                }
            },
            {
                "@type": "Question",
                "name": "What if I move or change my phone number?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "We update all your citations as part of our ongoing management service."
                }
            },
            {
                "@type": "Question",
                "name": "Can you remove old listings?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Yes. We claim the old listing and either update it to your new location or remove it entirely depending on platform policies."
                }
            },
            {
                "@type": "Question",
                "name": "Do citations help my GBP rank?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Absolutely. Consistent citations are a top ranking factor for the local Map Pack. They signal that your business is legitimate."
                }
            }
        ]
    },
    {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
            {"@type": "ListItem", "position": 1, "name": "Home", "item": "https://darkgreen-moose-683278.hostingersite.com"},
            {"@type": "ListItem", "position": 2, "name": "Services", "item": "https://darkgreen-moose-683278.hostingersite.com/services/"},
            {"@type": "ListItem", "position": 3, "name": "Local Citations", "item": "https://darkgreen-moose-683278.hostingersite.com/services/local-citations/"}
        ]
    }
]

deploy_schema(10,
    "Local Citation Building & Cleanup Services | LocalCatalyst",
    "Accurate business listings across 50+ directories. We build, clean up, and manage your local citations to improve local SEO and Map Pack rankings.",
    citations_schema)

# ============================================
# PAGE 6: MONTHLY MANAGEMENT (ID 11)
# ============================================
print(">>> DEPLOYING MONTHLY MANAGEMENT SCHEMA (ID 11)")
print()

monthly_schema = [
    {
        "@context": "https://schema.org",
        "@type": "Service",
        "@id": "https://darkgreen-moose-683278.hostingersite.com/services/monthly-management/#service",
        "name": "Monthly Local SEO Management",
        "description": "Ongoing local SEO management with monthly GBP posts, content updates, ranking reports, and strategy refinement.",
        "serviceType": "Monthly Local SEO Management",
        "provider": {
            "@type": "LocalBusiness",
            "@id": "https://darkgreen-moose-683278.hostingersite.com#business",
            "name": "LocalCatalyst",
        },
        "areaServed": {"@type": "Country", "name": "United States"},
        "hasOfferCatalog": {
            "@type": "OfferCatalog",
            "name": "Monthly Management",
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
                    "text": "Yes. We operate on a month-to-month basis. You can pause or cancel anytime with 30 days notice."
                }
            },
            {
                "@type": "Question",
                "name": "Can I get more than 2 blog posts per month?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Yes. We can add more content for an additional fee ($200/month for 2 more posts)."
                }
            },
            {
                "@type": "Question",
                "name": "Do you handle multiple locations?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Yes. Pricing is per location. If you have 3 locations, we can manage all 3 for separate fees."
                }
            },
            {
                "@type": "Question",
                "name": "How do I access monthly reports?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "We send reports via email on the 1st of each month. You can also access a live dashboard."
                }
            },
            {
                "@type": "Question",
                "name": "What if my rankings drop?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Rankings fluctuate. If we see a drop, we investigate and adjust strategy immediately. You will be notified within 48 hours."
                }
            }
        ]
    },
    {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
            {"@type": "ListItem", "position": 1, "name": "Home", "item": "https://darkgreen-moose-683278.hostingersite.com"},
            {"@type": "ListItem", "position": 2, "name": "Services", "item": "https://darkgreen-moose-683278.hostingersite.com/services/"},
            {"@type": "ListItem", "position": 3, "name": "Monthly Management", "item": "https://darkgreen-moose-683278.hostingersite.com/services/monthly-management/"}
        ]
    }
]

deploy_schema(11,
    "Monthly Local SEO Management & Reporting | LocalCatalyst",
    "Ongoing local SEO management with monthly GBP posts, content updates, ranking reports, and strategy refinement.",
    monthly_schema)

# ============================================
# SUMMARY
# ============================================
print()
print("=" * 50)
print("✅ Schema Deployment Complete")
print("=" * 50)
print()
print("Pages deployed:")
print("  ✓ Homepage (ID 6) - Organization + LocalBusiness + FAQPage + Breadcrumb")
print("  ✓ GBP Optimization (ID 7) - Service + FAQPage + Breadcrumb")
print("  ✓ Local SEO (ID 8) - Service + FAQPage + Breadcrumb")
print("  ✓ Review Management (ID 9) - Service + FAQPage + Breadcrumb")
print("  ✓ Local Citations (ID 10) - Service + FAQPage + Breadcrumb")
print("  ✓ Monthly Management (ID 11) - Service + FAQPage + Breadcrumb")
print()
print("Next steps:")
print("  1. Verify in Google Rich Results Test")
print("  2. Check GSC Rich Results report (24-72 hours)")
print("  3. Monitor for rich snippet appearance (7-14 days)")
print()
