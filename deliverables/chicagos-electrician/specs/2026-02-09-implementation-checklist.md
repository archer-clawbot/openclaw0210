# LocalBusiness Schema — Implementation Checklist
**Client:** Chicago's Electrician  
**Agent:** Specs  
**Date:** 2026-02-09

---

## Pre-Implementation (Owner Confirmation Needed)

- [ ] **Primary Business Address** — Confirm which is PRIMARY:
  - Option A: 207 E Ohio St Ste 308, Chicago, IL 60611 ✓ (currently in schema)
  - Option B: 376 Monaco Drive, Roselle, IL 60172 (from footer)
  
- [ ] **Business Hours** — Current incomplete, confirm actual hours:
  - Monday-Friday: 08:00-17:00
  - Saturday: 09:00-14:00 (assumed)
  - Sunday: Closed (assumed)
  - 24/7 Emergency Service: Yes/No?
  
- [ ] **Phone Number** — Confirm +1 847-401-8393 is correct

- [ ] **Service Area** — Confirm service radius:
  - Currently: 20 km radius from Chicago office
  - Actual service area: _______________

- [ ] **Secondary Location** — Should 376 Monaco Drive be separate LocalBusiness entry?
  - Yes / No / Need clarification

---

## Implementation Phase 1: Homepage LocalBusiness

### Via RankMath Admin Panel

**Access:** https://www.chicagoselectrician.com/wp-admin/  
**Plugin:** RankMath → Schema Settings

**Fields to Configure:**
- [ ] Business Type: "LocalBusiness" → "Plumber" or "Electrician"
- [ ] Business Name: "MCC Electric"
- [ ] Description: "Licensed and insured 24-hour electrician..."
- [ ] Phone: +1 847-401-8393
- [ ] Email: info@mccelectricinc.com
- [ ] Address: (primary address per owner confirmation)
- [ ] Latitude: 41.8924034
- [ ] Longitude: -87.6219606
- [ ] Business Hours: (per owner confirmation)
- [ ] Service Area: 20 km radius
- [ ] Social Media: Facebook, LinkedIn, Yelp, Pinterest

**Validation:**
- [ ] Open https://search.google.com/test/rich-results
- [ ] Paste: https://www.chicagoselectrician.com
- [ ] Verify LocalBusiness schema shows correctly
- [ ] **Confirm: No warnings or errors**

---

## Implementation Phase 2: Commercial Electrician Service Schema

### Edit Page: `/commercial-electrician/`

**Via RankMath on page edit:**

**Schema Type:** Service

**Fields to Configure:**
- [ ] Service Name: "Commercial Electrical Services"
- [ ] Description: "Professional commercial electrician services for offices, retail, multi-family buildings, factories, and manufacturers in Chicago. Same-day service available."
- [ ] Image: Select commercial service image
- [ ] Provider: Link to MCC Electric (LocalBusiness)
- [ ] Area Served: "Chicago, IL"
- [ ] Offers:
  - [ ] Price Currency: USD
  - [ ] Price: "Contact for quote"
  - [ ] CTA URL: https://www.chicagoselectrician.com/contact-us-free-estimate-for-your-electrical-job/

**Validation:**
- [ ] Open https://search.google.com/test/rich-results
- [ ] Paste: https://www.chicagoselectrician.com/commercial-electrician/
- [ ] Verify Service schema shows correctly
- [ ] **Confirm: No warnings or errors**

---

## Implementation Phase 3: Residential Electrician Service Schema

### Edit Page: `/residential-electrician/`

**Via RankMath on page edit:**

**Schema Type:** Service

**Fields to Configure:**
- [ ] Service Name: "Residential Electrical Services"
- [ ] Description: "Expert residential electrician services for homes in Chicago. 24-hour emergency electrician available. Licensed and insured."
- [ ] Image: Select residential service image
- [ ] Provider: Link to MCC Electric (LocalBusiness)
- [ ] Area Served: "Chicago, IL"
- [ ] Offers:
  - [ ] Price Currency: USD
  - [ ] Price: "Contact for quote"
  - [ ] Availability: "24/7 Emergency Service"
  - [ ] CTA URL: https://www.chicagoselectrician.com/contact-us-free-estimate-for-your-electrical-job/

**Validation:**
- [ ] Open https://search.google.com/test/rich-results
- [ ] Paste: https://www.chicagoselectrician.com/residential-electrician/
- [ ] Verify Service schema shows correctly
- [ ] **Confirm: No warnings or errors**

---

## Post-Implementation Verification

- [ ] **Homepage LocalBusiness:**
  - Rich snippet shows in test
  - Phone, address, hours visible
  - No warnings

- [ ] **Commercial Service Page:**
  - Service type and provider visible
  - CTA button appears
  - No warnings

- [ ] **Residential Service Page:**
  - Service type and provider visible
  - 24/7 Emergency availability shows
  - No warnings

- [ ] **Submit to Google Search Console:**
  - Go to GSC > URL Inspection
  - Enter: https://www.chicagoselectrician.com
  - Click "Request Indexing" (if not indexed)

---

## Backup: Manual JSON-LD (If RankMath UI Insufficient)

If RankMath GUI doesn't provide all fields, add JSON-LD manually via:
- **Option A:** RankMath → Custom Code (if available)
- **Option B:** Theme Header (add to wp_head hook)
- **Option C:** Custom plugin

**File:** Prepared in deployment guide  
**Location:** C:\Users\spart\.openclaw\deliverables\chicagos-electrician\specs\2026-02-09-localbusiness-schema-deployment.md

---

## Sign-Off

**Prepared by:** Specs  
**Status:** Ready for implementation  
**Pending:** Business data verification from owner  

