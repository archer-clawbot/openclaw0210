# JSON-LD Schema Templates
## Ready-to-deploy templates for CATALYST clients

Skills reference this file by ID: `ref:schema-templates`.

When `cseo-schema-validator` identifies missing or incomplete schema, generate corrected markup using these templates. Replace all `[bracketed]` values with client-specific data.

---

## 1. LocalBusiness (Required — every client)

```json
{
  "@context": "https://schema.org",
  "@type": "[specific subtype: Plumber, Electrician, RoofingContractor, etc.]",
  "@id": "[website URL]#business",
  "name": "[Exact GBP business name]",
  "image": "[Logo URL]",
  "telephone": "[Exact GBP phone — E.164 format: +1XXXXXXXXXX]",
  "email": "[Business email]",
  "url": "[Website URL]",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "[Exact GBP street address]",
    "addressLocality": "[City]",
    "addressRegion": "[State — 2-letter abbreviation]",
    "postalCode": "[ZIP]",
    "addressCountry": "US"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": "[latitude]",
    "longitude": "[longitude]"
  },
  "openingHoursSpecification": [
    {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      "opens": "08:00",
      "closes": "17:00"
    }
  ],
  "priceRange": "[$ to $$$$]",
  "areaServed": [
    { "@type": "City", "name": "[Primary city]" },
    { "@type": "City", "name": "[Secondary city]" }
  ],
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "Services",
    "itemListElement": [
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "[Service Name]",
          "description": "[1-2 sentence service description]",
          "areaServed": { "@type": "City", "name": "[City]" }
        }
      }
    ]
  },
  "sameAs": [
    "[Google Business Profile URL]",
    "[Facebook URL]",
    "[Instagram URL]",
    "[YouTube URL]",
    "[Yelp URL]",
    "[LinkedIn URL]",
    "[BBB URL]",
    "[Apple Maps URL]"
  ],
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "[rating — e.g., 4.8]",
    "reviewCount": "[count — e.g., 142]",
    "bestRating": "5"
  }
}
```

**Subtype selection guide:**
| Business Type | Schema @type |
|--------------|-------------|
| Plumber | Plumber |
| Electrician | Electrician |
| HVAC | HVACBusiness |
| Roofer | RoofingContractor |
| General contractor | GeneralContractor |
| Locksmith | Locksmith |
| Moving company | MovingCompany |
| Pest control | LocalBusiness (no specific subtype) |
| Cleaning service | LocalBusiness |
| Landscaper | LocalBusiness |
| Auto repair | AutoRepair |
| Dentist | Dentist |
| Law firm | LegalService or Attorney |
| Real estate agent | RealEstateAgent |
| Restaurant | Restaurant |
| Other | LocalBusiness |

---

## 2. Service (Per service page)

```json
{
  "@context": "https://schema.org",
  "@type": "Service",
  "name": "[Service Name] in [City]",
  "description": "[2-3 sentence description with location and specifics]",
  "provider": {
    "@type": "[LocalBusiness subtype]",
    "@id": "[website URL]#business"
  },
  "areaServed": [
    { "@type": "City", "name": "[City 1]" },
    { "@type": "City", "name": "[City 2]" }
  ],
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "itemListElement": [
      {
        "@type": "Offer",
        "priceSpecification": {
          "@type": "PriceSpecification",
          "price": "[starting price]",
          "priceCurrency": "USD",
          "description": "[pricing context — e.g., Starting from]"
        }
      }
    ]
  }
}
```

---

## 3. FAQPage (Per page with FAQ content)

```json
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "[Question text]",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "[Answer text — can include HTML for links and formatting]"
      }
    },
    {
      "@type": "Question",
      "name": "[Question text]",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "[Answer text]"
      }
    }
  ]
}
```

**Note:** FAQ rich results no longer display for general business sites (restricted Aug 2023). Schema still valuable for AI systems. See `ref:schema-deprecations`.

---

## 4. BreadcrumbList (Every page)

```json
{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "Home",
      "item": "[homepage URL]"
    },
    {
      "@type": "ListItem",
      "position": 2,
      "name": "[Parent Page]",
      "item": "[parent page URL]"
    },
    {
      "@type": "ListItem",
      "position": 3,
      "name": "[Current Page]",
      "item": "[current page URL]"
    }
  ]
}
```

---

## 5. VideoObject (Pages with embedded video)

```json
{
  "@context": "https://schema.org",
  "@type": "VideoObject",
  "name": "[Video title]",
  "description": "[2-3 sentence description]",
  "thumbnailUrl": "[thumbnail URL]",
  "uploadDate": "[ISO 8601 date — e.g., 2026-01-15]",
  "duration": "[ISO 8601 duration — e.g., PT5M30S]",
  "contentUrl": "[direct video URL if available]",
  "embedUrl": "[YouTube embed URL]",
  "publisher": {
    "@type": "Organization",
    "@id": "[website URL]#business"
  }
}
```

---

## 6. AggregateRating (Standalone — for review/testimonial pages)

```json
{
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "@id": "[website URL]#business",
  "name": "[Business Name]",
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "[rating]",
    "reviewCount": "[count]",
    "bestRating": "5",
    "worstRating": "1"
  },
  "review": [
    {
      "@type": "Review",
      "author": {
        "@type": "Person",
        "name": "[Reviewer name]"
      },
      "reviewRating": {
        "@type": "Rating",
        "ratingValue": "[rating]",
        "bestRating": "5"
      },
      "reviewBody": "[Review text]",
      "datePublished": "[ISO 8601 date]"
    }
  ]
}
```

---

## 7. ProductGroup (Businesses with product variants/tiers)

```json
{
  "@context": "https://schema.org",
  "@type": "ProductGroup",
  "name": "[Product/Service Category]",
  "description": "[Category description]",
  "url": "[Category page URL]",
  "brand": {
    "@type": "Brand",
    "name": "[Business Name]"
  },
  "hasVariant": [
    {
      "@type": "Product",
      "name": "[Variant name — e.g., Basic Package]",
      "description": "[Variant description]",
      "offers": {
        "@type": "Offer",
        "price": "[price]",
        "priceCurrency": "USD",
        "availability": "https://schema.org/InStock"
      }
    },
    {
      "@type": "Product",
      "name": "[Variant name — e.g., Premium Package]",
      "description": "[Variant description]",
      "offers": {
        "@type": "Offer",
        "price": "[price]",
        "priceCurrency": "USD",
        "availability": "https://schema.org/InStock"
      }
    }
  ]
}
```

---

## 8. Event (For businesses running events)

```json
{
  "@context": "https://schema.org",
  "@type": "Event",
  "name": "[Event name]",
  "description": "[Event description]",
  "startDate": "[ISO 8601 datetime]",
  "endDate": "[ISO 8601 datetime]",
  "location": {
    "@type": "Place",
    "name": "[Venue name]",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "[address]",
      "addressLocality": "[city]",
      "addressRegion": "[state]",
      "postalCode": "[zip]"
    }
  },
  "organizer": {
    "@type": "LocalBusiness",
    "@id": "[website URL]#business"
  },
  "offers": {
    "@type": "Offer",
    "price": "[price or 0 for free]",
    "priceCurrency": "USD",
    "availability": "https://schema.org/InStock",
    "url": "[registration URL]"
  }
}
```

---

## 9. Article (Blog posts)

```json
{
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "[Article title — max 110 chars]",
  "description": "[1-2 sentence summary]",
  "image": "[Featured image URL]",
  "author": {
    "@type": "Person",
    "name": "[Author name]",
    "url": "[Author bio page URL]"
  },
  "publisher": {
    "@type": "Organization",
    "@id": "[website URL]#business",
    "name": "[Business Name]",
    "logo": {
      "@type": "ImageObject",
      "url": "[Logo URL]"
    }
  },
  "datePublished": "[ISO 8601 date]",
  "dateModified": "[ISO 8601 date]",
  "mainEntityOfPage": "[Article URL]"
}
```

---

## Validation Checklist

Before deploying any schema, verify:
- [ ] All facts match GBP listing exactly (name, address, phone, hours)
- [ ] URLs are absolute (not relative)
- [ ] Dates are ISO 8601 format
- [ ] Phone is E.164 format (+1XXXXXXXXXX)
- [ ] `@id` references are consistent across all schema blocks on the site
- [ ] Test with Google Rich Results Test (search.google.com/test/rich-results)
- [ ] Test with Schema.org Validator (validator.schema.org)
- [ ] No deprecated properties used (check `ref:schema-deprecations`)
