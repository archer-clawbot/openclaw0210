#!/bin/bash
# LocalCatalyst Schema Deployment Script
# Deploys Organization, LocalBusiness, Service, and FAQPage schema to all pages
# Usage: bash localcatalyst-schema-deployment.sh

set -e

# Configuration — credentials loaded from environment variables
DOMAIN="${WP_DOMAIN:-https://darkgreen-moose-683278.hostingersite.com}"
API_BASE="${DOMAIN}/wp-json/rankmath/v1"
WP_API_BASE="${DOMAIN}/wp-json/wp/v2"
USERNAME="${WP_USERNAME:?ERROR: Set WP_USERNAME environment variable}"
PASSWORD="${WP_APP_PASSWORD:?ERROR: Set WP_APP_PASSWORD environment variable}"

# Create Basic Auth header
CREDENTIALS=$(echo -n "${USERNAME}:${PASSWORD}" | base64)

echo "=========================================="
echo "LocalCatalyst Schema Deployment"
echo "Domain: $DOMAIN"
echo "=========================================="
echo ""

# Helper function to deploy schema via RankMath
deploy_rankmath_schema() {
  local POST_ID=$1
  local TITLE=$2
  local DESCRIPTION=$3
  local SCHEMA_JSON=$4
  
  echo "Deploying to POST ID: $POST_ID"
  echo "Title: $TITLE"
  
  PAYLOAD=$(cat <<EOF
{
  "title": "$TITLE",
  "description": "$DESCRIPTION",
  "schema": $SCHEMA_JSON
}
EOF
)

  RESPONSE=$(curl -s -X POST "${API_BASE}/posts/${POST_ID}/metadata" \
    -H "Authorization: Basic ${CREDENTIALS}" \
    -H "Content-Type: application/json" \
    -d "$PAYLOAD")
  
  echo "Response: $RESPONSE"
  echo ""
}

# ============================================
# PAGE 1: HOMEPAGE (ID 6)
# ============================================
echo ">>> DEPLOYING HOMEPAGE SCHEMA (ID 6)"
echo ""

HOMEPAGE_SCHEMA='[
  {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": "https://darkgreen-moose-683278.hostingersite.com#organization",
    "name": "LocalCatalyst",
    "url": "https://darkgreen-moose-683278.hostingersite.com",
    "logo": "https://darkgreen-moose-683278.hostingersite.com/logo.png",
    "description": "Local SEO agency delivering Google Business Profile optimization, local SEO, and review management for small businesses.",
    "sameAs": [
      "https://www.facebook.com/localcatalyst",
      "https://www.instagram.com/localcatalyst",
      "https://www.linkedin.com/company/localcatalyst"
    ]
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
      { "@type": "Country", "name": "United States" }
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
            "description": "Claim, verify, optimize, and manage your Google Business Profile for Map Pack rankings"
          },
          "price": "500",
          "priceCurrency": "USD",
          "availability": "InStock"
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Local SEO Services",
            "description": "Service pages, location pages, and content that ranks for local searches"
          },
          "price": "1200",
          "priceCurrency": "USD",
          "availability": "InStock"
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Review Management",
            "description": "Get more reviews, respond professionally, and turn reputation into revenue"
          },
          "price": "400",
          "priceCurrency": "USD",
          "availability": "InStock"
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Local Citations",
            "description": "Build and clean up your business listings across 50+ directories"
          },
          "price": "600",
          "priceCurrency": "USD",
          "availability": "InStock"
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Monthly Local SEO Management",
            "description": "Ongoing GBP posts, content updates, ranking tracking, and optimization"
          },
          "price": "800",
          "priceCurrency": "USD",
          "availability": "InStock"
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
          "text": "Not necessarily. If you dont have one, we can build a simple local site. But Google Business Profile optimization works even without a website."
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
]'

deploy_rankmath_schema 6 \
  "Local SEO Services for Small Businesses | LocalCatalyst" \
  "Get found by local customers. LocalCatalyst delivers Google Business Profile optimization, local SEO, and review management for small businesses across the USA." \
  "$HOMEPAGE_SCHEMA"

# ============================================
# PAGE 2: GBP OPTIMIZATION (ID 7)
# ============================================
echo ">>> DEPLOYING GBP OPTIMIZATION SCHEMA (ID 7)"
echo ""

GBP_SCHEMA='[
  {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": "https://darkgreen-moose-683278.hostingersite.com/services/google-business-profile/#service",
    "name": "Google Business Profile Optimization",
    "description": "Professional GBP optimization to rank in the Map Pack. Claim, verify, optimize, and manage your Google Business Profile. Get more local customers.",
    "serviceType": "Google Business Profile Optimization",
    "provider": {
      "@type": "LocalBusiness",
      "@id": "https://darkgreen-moose-683278.hostingersite.com#business",
      "name": "LocalCatalyst",
      "telephone": "+1-555-123-4567"
    },
    "areaServed": {
      "@type": "Country",
      "name": "United States"
    },
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "GBP Optimization Services",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "GBP Optimization + Monthly Management"
          },
          "price": "500",
          "priceCurrency": "USD",
          "priceValidFrom": "2026-02-10",
          "availability": "InStock",
          "url": "https://darkgreen-moose-683278.hostingersite.com/services/google-business-profile/"
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
        "name": "What if I dont have a verified GBP yet?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "No problem. We will claim it, verify it, and optimize it from scratch. Verification typically takes 5-7 days via Google mail postcard."
        }
      },
      {
        "@type": "Question",
        "name": "Can you optimize a service-area business with no physical storefront?",
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
        "name": "Do I need a website for my GBP to rank?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "No. Your GBP can rank without a website. However, having a website improves your rankings and gives customers more information. We recommend it but its not required."
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
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Services",
        "item": "https://darkgreen-moose-683278.hostingersite.com/services/"
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": "Google Business Profile Optimization",
        "item": "https://darkgreen-moose-683278.hostingersite.com/services/google-business-profile/"
      }
    ]
  }
]'

deploy_rankmath_schema 7 \
  "Google Business Profile Optimization Services | LocalCatalyst" \
  "Professional GBP optimization to rank in the Map Pack. Claim, verify, optimize, and manage your Google Business Profile. Get more local customers." \
  "$GBP_SCHEMA"

# ============================================
# PAGE 3: LOCAL SEO (ID 8)
# ============================================
echo ">>> DEPLOYING LOCAL SEO SCHEMA (ID 8)"
echo ""

LOCAL_SEO_SCHEMA='[
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
      "telephone": "+1-555-123-4567"
    },
    "areaServed": {
      "@type": "Country",
      "name": "United States"
    },
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Local SEO Services",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Local SEO Package"
          },
          "price": "1200",
          "priceCurrency": "USD",
          "priceValidFrom": "2026-02-10",
          "availability": "InStock",
          "url": "https://darkgreen-moose-683278.hostingersite.com/services/local-seo/"
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
          "text": "Not necessarily. If you have a website, we optimize what you have. If you dont, we can build a simple local site as part of the service."
        }
      },
      {
        "@type": "Question",
        "name": "What if I serve multiple cities?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "We build dedicated location pages for each city you serve. Each page is unique, locally-focused, and optimized for service + city searches."
        }
      },
      {
        "@type": "Question",
        "name": "Will local SEO help my Google Business Profile rank?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes. Local SEO and GBP optimization work together. A well-optimized website improves your GBP rankings, and vice versa."
        }
      },
      {
        "@type": "Question",
        "name": "Whats the difference between local SEO and national SEO?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Local SEO targets searches with geographic intent (city names, near me). National SEO targets broader, non-location-specific keywords. If you serve a specific area, local SEO is what you need."
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
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Services",
        "item": "https://darkgreen-moose-683278.hostingersite.com/services/"
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": "Local SEO Services",
        "item": "https://darkgreen-moose-683278.hostingersite.com/services/local-seo/"
      }
    ]
  }
]'

deploy_rankmath_schema 8 \
  "Local SEO Services for Small Businesses | LocalCatalyst" \
  "Rank higher in local search results. Our local SEO services include service pages, location pages, content strategy, and technical optimization." \
  "$LOCAL_SEO_SCHEMA"

# ============================================
# PAGE 4: REVIEW MANAGEMENT (ID 9)
# ============================================
echo ">>> DEPLOYING REVIEW MANAGEMENT SCHEMA (ID 9)"
echo ""

REVIEW_SCHEMA='[
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
      "telephone": "+1-555-123-4567"
    },
    "areaServed": {
      "@type": "Country",
      "name": "United States"
    },
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Review Management Services",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Review Management"
          },
          "price": "400",
          "priceCurrency": "USD",
          "priceValidFrom": "2026-02-10",
          "availability": "InStock",
          "url": "https://darkgreen-moose-683278.hostingersite.com/services/review-management/"
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
          "text": "We can flag reviews that violate platform policies. Google and Yelp will remove those. Legitimate negative reviews stay but we respond professionally and generate fresh positive reviews to offset them."
        }
      },
      {
        "@type": "Question",
        "name": "Do you write the review responses or do I?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "We write them. You can approve them before they go live, or you can give us full autonomy (most clients do after the first month once they trust our tone)."
        }
      },
      {
        "@type": "Question",
        "name": "What if I dont have many customers yet?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Thats okay. Even 1-2 reviews per month compounds over time. We will work with your current volume and scale as you grow."
        }
      },
      {
        "@type": "Question",
        "name": "Will asking for reviews hurt my relationship with customers?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Not if done right. We use polite, well-timed requests that feel natural. Most customers are happy to leave a review if asked - they just forget unless prompted."
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
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Services",
        "item": "https://darkgreen-moose-683278.hostingersite.com/services/"
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": "Review Management",
        "item": "https://darkgreen-moose-683278.hostingersite.com/services/review-management/"
      }
    ]
  }
]'

deploy_rankmath_schema 9 \
  "Online Review Management Services | LocalCatalyst" \
  "Get more 5-star reviews and manage your online reputation. We help you generate reviews, respond professionally, and turn reputation into revenue." \
  "$REVIEW_SCHEMA"

# ============================================
# PAGE 5: LOCAL CITATIONS (ID 10)
# ============================================
echo ">>> DEPLOYING LOCAL CITATIONS SCHEMA (ID 10)"
echo ""

CITATIONS_SCHEMA='[
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
      "telephone": "+1-555-123-4567"
    },
    "areaServed": {
      "@type": "Country",
      "name": "United States"
    },
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Citation Building Services",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Citation Building & Cleanup"
          },
          "price": "600",
          "priceCurrency": "USD",
          "priceValidFrom": "2026-02-10",
          "availability": "InStock",
          "url": "https://darkgreen-moose-683278.hostingersite.com/services/local-citations/"
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
          "text": "Most citation campaigns are complete within 4 weeks. Some directories take time to approve listings (up to 30 days), but we submit everything within the first 2 weeks."
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
          "text": "We update all your citations as part of our ongoing management service. If youre not on the monthly plan, we can update citations for a one-time fee."
        }
      },
      {
        "@type": "Question",
        "name": "Can you remove old listings from a previous location?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes. We claim the old listing and either update it to your new location or remove it entirely depending on platform policies."
        }
      },
      {
        "@type": "Question",
        "name": "Do citations help my Google Business Profile rank?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Absolutely. Consistent citations are one of the top ranking factors for the local Map Pack. They signal to Google that your business is legitimate and located where you say it is."
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
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Services",
        "item": "https://darkgreen-moose-683278.hostingersite.com/services/"
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": "Local Citations",
        "item": "https://darkgreen-moose-683278.hostingersite.com/services/local-citations/"
      }
    ]
  }
]'

deploy_rankmath_schema 10 \
  "Local Citation Building & Cleanup Services | LocalCatalyst" \
  "Accurate business listings across 50+ directories. We build, clean up, and manage your local citations to improve local SEO and Map Pack rankings." \
  "$CITATIONS_SCHEMA"

# ============================================
# PAGE 6: MONTHLY MANAGEMENT (ID 11)
# ============================================
echo ">>> DEPLOYING MONTHLY MANAGEMENT SCHEMA (ID 11)"
echo ""

MONTHLY_SCHEMA='[
  {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": "https://darkgreen-moose-683278.hostingersite.com/services/monthly-management/#service",
    "name": "Monthly Local SEO Management",
    "description": "Ongoing local SEO management with monthly GBP posts, content updates, ranking reports, and strategy refinement. Stay ahead of your competitors.",
    "serviceType": "Monthly Local SEO Management",
    "provider": {
      "@type": "LocalBusiness",
      "@id": "https://darkgreen-moose-683278.hostingersite.com#business",
      "name": "LocalCatalyst",
      "telephone": "+1-555-123-4567"
    },
    "areaServed": {
      "@type": "Country",
      "name": "United States"
    },
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Monthly Management Services",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Monthly Local SEO Management"
          },
          "price": "800",
          "priceCurrency": "USD",
          "priceValidFrom": "2026-02-10",
          "availability": "InStock",
          "url": "https://darkgreen-moose-683278.hostingersite.com/services/monthly-management/"
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
        "name": "Can I pause the service if I need to?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes. We operate on a month-to-month basis. You can pause or cancel anytime with 30 days notice."
        }
      },
      {
        "@type": "Question",
        "name": "What if I want more than 2 blog posts per month?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "We can add more content for an additional fee ($200/month for 2 more posts). Just let us know."
        }
      },
      {
        "@type": "Question",
        "name": "Do you handle multiple locations?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes. Pricing is per location. If you have 3 locations, we can manage all 3 (each gets its own GBP posts, content, and reporting)."
        }
      },
      {
        "@type": "Question",
        "name": "How do I access my monthly reports?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "We send reports via email on the 1st of each month. You can also access a live dashboard where you can check rankings and traffic anytime."
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
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://darkgreen-moose-683278.hostingersite.com"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Services",
        "item": "https://darkgreen-moose-683278.hostingersite.com/services/"
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": "Monthly Management",
        "item": "https://darkgreen-moose-683278.hostingersite.com/services/monthly-management/"
      }
    ]
  }
]'

deploy_rankmath_schema 11 \
  "Monthly Local SEO Management & Reporting | LocalCatalyst" \
  "Ongoing local SEO management with monthly GBP posts, content updates, ranking reports, and strategy refinement. Stay ahead of your competitors." \
  "$MONTHLY_SCHEMA"

# ============================================
# SUMMARY
# ============================================
echo ""
echo "=========================================="
echo "✅ Schema Deployment Complete"
echo "=========================================="
echo ""
echo "Pages deployed:"
echo "  ✓ Homepage (ID 6) - Organization + LocalBusiness + FAQPage"
echo "  ✓ GBP Optimization (ID 7) - Service + FAQPage + Breadcrumb"
echo "  ✓ Local SEO (ID 8) - Service + FAQPage + Breadcrumb"
echo "  ✓ Review Management (ID 9) - Service + FAQPage + Breadcrumb"
echo "  ✓ Local Citations (ID 10) - Service + FAQPage + Breadcrumb"
echo "  ✓ Monthly Management (ID 11) - Service + FAQPage + Breadcrumb"
echo ""
echo "Next steps:"
echo "  1. Verify in Google Rich Results Test (https://search.google.com/test/rich-results)"
echo "  2. Check GSC Rich Results report (24-72 hours)"
echo "  3. Monitor for rich snippet appearance in search results (7-14 days)"
echo ""
