# SPEC-004: GBP Products Tab Weaponization
## Silas Engine — Route 1: GBP Optimization Pipeline
### Version 1.0 | GBP Optimization Group

---

## 1. PURPOSE

This specification defines Silas's methodology for transforming the GBP Products tab from an empty afterthought into a visual conversion engine. Each product entry functions as a visual menu item with image, description, price, and CTA button — creating a browsable catalog that converts searchers before they even visit the website. The Products tab is the most visual element on a GBP listing and directly influences click-through and call rates.

**Core principle:** "Products tab is your visual storefront. Every entry should make the searcher think 'I want that' and tap the call button."

---

## 2. DEPENDENCIES

| Spec | Relationship |
|------|-------------|
| SPEC-001: GBP Services | Products mirror services as visual conversion elements |
| SPEC-002: GBP Description | Products reinforce services mentioned in description |
| SPEC-005: GBP Posting Strategy | Posts can feature specific products with images |
| SPEC-008: Schema & Structured Data | hasOfferCatalog schema should match product entries |
| SPEC-011: Conversion Optimization | Product CTAs follow conversion optimization principles |

---

## 3. PRODUCT ENTRY ARCHITECTURE

### 3.1 Entry Components

| Component | Requirements |
|-----------|-------------|
| **Product Name** | Specific, descriptive service/product name (not generic) |
| **Collection** | Category grouping (max 10 collections) |
| **Description** | 300-1,000 characters: what's included, who it's for, key benefit |
| **Price** | Exact price, range ($X - $Y), or "Request Quote" |
| **CTA Button** | Call, Learn More, Book Online, Order Online |
| **Image** | Professional photo of the service/product in action (real > stock) |

### 3.2 Product Name Engineering

Product names serve the same keyword-targeting function as service names but with visual real estate:

**Bad:** "Plumbing Repair"
**Good:** "Emergency Same-Day Plumbing Repair & Diagnostics"

**Bad:** "Haircut"
**Good:** "Precision Men's Haircut & Grooming Experience"

**Bad:** "Appetizers"
**Good:** "Game Day Appetizer Platter for 4-8 Guests"

### 3.3 Description Template

```
[What it is + who it's for]. [What's included — specific details]. 
[Key benefit or outcome]. [Differentiator — why choose this business]. 
[Service area or availability details].
```

### 3.4 Image Requirements

| Requirement | Standard |
|-------------|----------|
| Resolution | 720×720px minimum (1200×1200 preferred) |
| Format | JPG or PNG (JPG preferred for file size) |
| Content | Real photos of the actual service/product |
| Lighting | Well-lit, professional quality |
| Branding | Subtle — no heavy logo overlays or text on images |
| Stock photos | Avoid. Real photos significantly outperform stock. |
| Variety | Different image for every product (no repeated images) |

---

## 4. COLLECTION STRATEGY

### 4.1 Organization Principles

Collections are categories that group related products. They should match the customer's mental model, not the business's internal structure.

**Rules:**
- Maximum 10 collections
- 3-8 products per collection
- Highest-value collections listed first
- Collection names should be benefit-oriented or service-category based

### 4.2 Collection Examples by Vertical

**Home Services:**
```
Collections:
1. Emergency Services (same-day repair, after-hours, leak response)
2. Water Heater Solutions (repair, replacement, tankless conversion)
3. Drain & Sewer (cleaning, repair, camera inspection, relining)
4. Bathroom Remodeling (full remodel, fixture upgrade, accessibility)
5. Maintenance Plans (annual inspection, drain maintenance, whole-home)
```

**Restaurant:**
```
Collections:
1. Signature Experiences (brunch, happy hour, game day packages)
2. Private Events (event hosting, custom menus, corporate packages)
3. Catering (off-site catering, boxed lunches, cocktail service)
4. Featured Menu (seasonal specials, chef's picks)
5. Bar Program (craft cocktails, wine selection, beer flights)
```

**Salon:**
```
Collections:
1. Color Services (balayage, highlights, corrective, gloss)
2. Cut & Style (women's cut, men's cut, blowout, special occasion)
3. Treatments (keratin, Olaplex repair, scalp therapy, deep conditioning)
4. Bridal & Events (bridal party, prom, special occasion styling)
5. Membership Packages (monthly blowout club, color maintenance plan)
```

---

## 5. PRIORITIZATION FRAMEWORK

### 5.1 Product Priority Score

For each potential product entry, calculate:

```
Priority Score = (Search Volume × Margin) + Conversion Potential

Where:
- Search Volume: 1-5 (how often people search for this)
- Margin: 1-5 (how profitable this service is)
- Conversion Potential: 1-5 (how likely a searcher converts from seeing this)
```

### 5.2 Ordering Rules

Within each collection, order products by:
1. **Highest priority score first** (most searched + most profitable)
2. **Flagship offering** at position 1 (the product you're known for)
3. **Entry-level offering** at position 2 (low barrier to first contact)
4. **Premium offering** at position 3 (anchoring effect for pricing)

---

## 6. DELIVERABLE FORMAT

```markdown
# GBP PRODUCTS TAB OPTIMIZATION
## [Client Name] — [Date]

### Current Score: [X]/10
### Current Products: [N] across [M] collections

---

### Collection: [Collection Name]

**Product 1: [Product Name]**
Description: [Full description]
Price: [Price/Range]
CTA: [Call / Learn More / Book]
Image Notes: [Description of needed photo — subject, angle, setting]

[...repeat for all products...]

---

### IMAGE SHOT LIST
[List of photos needed from client, organized by collection]

### IMPLEMENTATION NOTES
- [Products requiring pricing confirmation]
- [Images client needs to provide]
- [Any CTA button configuration details]
```

---

## 7. SCORING RUBRIC

| Score | Criteria |
|-------|----------|
| **0** | Products tab completely empty. |
| **1** | 1-3 products, no images, no descriptions. |
| **2** | Some products with stock images, generic descriptions. |
| **3** | 5-10 products, some descriptions, inconsistent quality. |
| **4** | 10+ products with descriptions but generic images. |
| **5** | 10+ products, real images on some, descriptions on all. |
| **6** | 15+ products in organized collections, most with real images and pricing. |
| **7** | 15+ products, all with real images, detailed descriptions, pricing, organized collections. |
| **8** | 20+ products, professional images, compelling descriptions, strategic CTA selection, all priced. |
| **9** | Complete product catalog matching all GBP services, professional photography, optimized descriptions, pricing, strategic collection ordering. |
| **10** | Score 9 + regular refresh (seasonal updates), A/B tested descriptions, image quality audit, conversion tracking on CTAs. |

---

## 8. AUTOMATION PIPELINE

```
TRIGGER: New client onboarded OR quarterly refresh cycle

1. PULL current GBP products inventory
2. COMPARE against GBP services list (SPEC-001) — identify gaps
3. SCORE current state (Section 7)
4. IF score < 7:
   a. DESIGN collection structure
   b. GENERATE product entries with priority scoring
   c. CREATE image shot list for operator/client
   d. FORMAT deliverable
   e. DELIVER to operator for GBP implementation
5. FLAG: Images require human creation/collection — this is always an escalation point

ESCALATION POINTS:
- No professional photos available → provide shot list + smartphone photo guidelines
- Client resistant to publishing pricing → explain CTR data showing price transparency wins
- Products require seasonal rotation → set quarterly refresh reminders
```

---

*This spec is part of the Silas Engine, Route 1: GBP Optimization Pipeline.*
