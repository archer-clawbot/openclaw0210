# WooCommerce Integration — Part 2: Package & Deliverable System
## Detailed Spec Following Architecture Review

---

## 1. Answers Applied

**Tenant:** Everything runs under `tenantId: "default"`. No multi-tenant complexity.

**Email:** Resend (free tier: 3,000 emails/month). Sending domain: `localcatalyst.ai`. API key stored as Convex env var `RESEND_API_KEY`. From address: `portal@localcatalyst.ai` or `noreply@localcatalyst.ai`.

**Existing data:** Zero customers, zero orders. Clean slate — no backfill needed. The polling sync job will start with an empty `wooSyncState` and build from the first purchase forward.

**WC webhook secret:** Stored as `WC_WEBHOOK_SECRET` Convex env var.

---

## 2. The Package System — Core Concept

A "Monthly SEO Package" isn't a single deliverable — it's a **configured bundle** of SEO services that varies per client. Some items are one-time (topical map, initial citation package, business schema), others recur monthly (content pages, page-level schema, link building).

This means we need three layers:

```
WooCommerce Product          →  What the client purchases
  ↓
Package Configuration        →  What's included, per client, with frequency rules
  ↓
Deliverable Instances        →  Actual work items generated each billing cycle
```

### How it works in practice:

1. Client purchases "Monthly SEO Package" on localcatalyst.ai
2. You (or Silas) configure their package: "This client gets 8 content pages/month, topical map in month 1 only, citation package in month 1 only, org schema one-time, page schema on every content page"
3. Each month, the system generates that month's deliverable instances based on the config
4. As agents complete work, deliverables get marked delivered and the client gets notified
5. Client logs into portal, sees everything organized by order/month/product type

---

## 3. Revised Schema — Package Configuration Tables

The original 6 tables from Part 1 still apply. Here are the additions and refinements:

### New: `wooPackageConfigs`

This is the per-client package definition. Created once when onboarding a customer, editable anytime.

```
wooPackageConfigs
├── customerId: Id<"wooCustomers">
├── wcOrderId: number                    // Which WC order/subscription this config belongs to
├── name: string                         // "Acme Corp - Monthly SEO Package"
├── status: string                       // "active" | "paused" | "cancelled"
├── billingCycleDay: number              // Day of month deliverables generate (1-28)
├── startDate: string                    // ISO date — when this package began
├── currentCycleNumber: number           // Increments each month (1, 2, 3...)
├── tenantId: optional string
├── notes: optional string               // Internal notes about this client's package
├── lastGeneratedCycle: optional number  // Last cycle for which deliverables were generated
└── indexes: by_customerId, by_tenant, by_status
```

### New: `wooPackageItems`

Individual line items within a package config. Each row = one type of deliverable with its frequency rules.

```
wooPackageItems
├── packageConfigId: Id<"wooPackageConfigs">
├── wcProductId: optional number          // Links to a WC product if applicable
├── itemType: string                      // "content_pages" | "topical_map" | "citation_package" |
│                                         // "org_schema" | "page_schema" | "link_building" |
│                                         // "gbp_optimization" | "technical_audit" | "custom"
├── label: string                         // Display name: "Blog Content Pages"
├── frequency: string                     // "monthly" | "first_month" | "one_time" | "quarterly"
├── quantity: number                      // How many per cycle (e.g., 8 content pages)
├── quantityUnit: optional string         // "pages" | "citations" | "links" | "reports" | etc.
├── completedCycles: optional string      // JSON array of cycle numbers where this was delivered
│                                         // (for one_time/first_month: once delivered, skip future)
├── tenantId: optional string
├── notes: optional string
└── indexes: by_packageConfigId, by_tenant
```

### Revised: `wooDeliverables`

Now generated from package items each cycle, not just from orders directly.

```
wooDeliverables
├── packageConfigId: optional Id<"wooPackageConfigs">  // Which package config generated this
├── packageItemId: optional Id<"wooPackageItems">      // Which line item this fulfills
├── orderId: optional Id<"wooOrders">
├── customerId: Id<"wooCustomers">
├── wcOrderId: optional number
├── wcProductId: optional number
├── cycleNumber: optional number           // Which billing cycle (1, 2, 3...)
├── title: string                          // "Blog Content Pages - March 2026 (Cycle 3)"
├── itemType: string                       // Matches packageItem.itemType
├── status: string                         // "pending" | "in_progress" | "delivered" | "revision"
├── quantity: optional number              // e.g., 8 pages
├── quantityDelivered: optional number     // e.g., 5 of 8 pages done so far
├── deliveredAt: optional number
├── dueDate: optional string               // ISO date
├── documentIds: optional string           // JSON array of Id<"documents"> — links to actual files
├── downloadUrls: optional string          // JSON array of download links
├── notes: optional string
├── emailSentAt: optional number           // When notification email was sent
├── tenantId: optional string
└── indexes: by_customerId, by_packageConfigId, by_tenant_status,
             by_customerId_cycleNumber, by_itemType
```

---

## 4. Frequency Logic

The deliverable generation engine runs on a schedule (or is triggered manually). Here's the logic per `wooPackageItems` row:

| `frequency` value | Rule | Example |
|---|---|---|
| `monthly` | Generate every cycle | 8 content pages every month |
| `first_month` | Generate only when `currentCycleNumber == 1` | Citation package in month 1 only |
| `one_time` | Generate once, skip if `completedCycles` is non-empty | Topical map, org-level schema |
| `quarterly` | Generate when `currentCycleNumber % 3 == 1` | Quarterly technical audit |

**Pseudocode for monthly generation:**
```
for each active packageConfig:
  if already generated for this cycle → skip
  for each packageItem in config:
    if shouldGenerate(item.frequency, config.currentCycleNumber, item.completedCycles):
      create wooDeliverable {
        title: "{item.label} - {monthName} {year} (Cycle {n})"
        status: "pending"
        quantity: item.quantity
        quantityDelivered: 0
        cycleNumber: config.currentCycleNumber
      }
  update config.lastGeneratedCycle = currentCycleNumber
  increment config.currentCycleNumber
```

---

## 5. Deliverable Lifecycle & Email Notifications

### Lifecycle:

```
pending → in_progress → delivered
                     ↘ revision → delivered
```

**Status transitions:**
- `pending`: Generated by the cycle engine, work hasn't started
- `in_progress`: An agent (Silas, Scribe, etc.) has picked up the work, or you manually started it
- `delivered`: All items complete, files attached, client notified
- `revision`: Client requested changes (future feature)

### Email Touchpoints (via Resend):

| Trigger | Email | Template |
|---|---|---|
| New customer purchase | Welcome + portal login credentials | `welcome.tsx` |
| Deliverable status → `delivered` | "Your {title} is ready" + portal link | `deliverable-ready.tsx` |
| All deliverables in a cycle delivered | "Your monthly package is complete" | `cycle-complete.tsx` |
| Password reset | Standard reset flow | `password-reset.tsx` |

**Deliverable-ready email content:**
```
Subject: Your {deliverable.title} is ready — LocalCatalyst

Hi {customer.firstName},

Your {deliverable.title} has been completed and is ready for review.

[View in Portal →] (link to dashboard.localcatalyst.ai/portal/deliverables/{id})

If you have any questions or need revisions, you can reach us
directly through the portal.

— The LocalCatalyst Team
```

### Convex Action for Sending:

```typescript
// convex/email.ts (Convex action — actions can make external HTTP calls)
"use node";
import { action } from "./_generated/server";
import { v } from "convex/values";

export const sendDeliverableReadyEmail = action({
  args: {
    customerEmail: v.string(),
    customerFirstName: v.string(),
    deliverableTitle: v.string(),
    deliverableId: v.string(),
  },
  handler: async (ctx, args) => {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: "LocalCatalyst <portal@localcatalyst.ai>",
        to: [args.customerEmail],
        subject: `Your ${args.deliverableTitle} is ready — LocalCatalyst`,
        html: `...`, // Build from template
      }),
    });
    return { ok: response.ok };
  },
});
```

---

## 6. Portal UI — How the Client Finds Their Stuff

The portal needs to make deliverables dead simple to find. Two primary navigation paths:

### Path 1: By Month / Billing Cycle (default view)

```
/portal → Portal Home

  ┌─────────────────────────────────────────────────┐
  │  March 2026 — Cycle 3                    [Active]│
  │                                                   │
  │  ✅ Blog Content Pages (8 pages)     [Delivered]  │
  │  ✅ Page Schema Markup (8 pages)     [Delivered]  │
  │  🔄 Link Building Package (15 links) [In Progress]│
  │                                                   │
  │  6 of 8 items delivered this month                │
  └─────────────────────────────────────────────────┘

  ┌─────────────────────────────────────────────────┐
  │  February 2026 — Cycle 2                         │
  │                                                   │
  │  ✅ Blog Content Pages (8 pages)     [Delivered]  │
  │  ✅ Page Schema Markup (8 pages)     [Delivered]  │
  │  ✅ Link Building Package (15 links) [Delivered]  │
  │                                                   │
  │  All items delivered ✓                            │
  └─────────────────────────────────────────────────┘

  ┌─────────────────────────────────────────────────┐
  │  January 2026 — Cycle 1 (Onboarding)            │
  │                                                   │
  │  ✅ Topical Map                      [Delivered]  │
  │  ✅ Citation Package (50 citations)  [Delivered]  │
  │  ✅ Organization Schema              [Delivered]  │
  │  ✅ Blog Content Pages (8 pages)     [Delivered]  │
  │  ✅ Page Schema Markup (8 pages)     [Delivered]  │
  │  ✅ Link Building Package (15 links) [Delivered]  │
  │                                                   │
  │  All items delivered ✓                            │
  └─────────────────────────────────────────────────┘
```

### Path 2: By Product Type (tab/filter view)

```
/portal/deliverables?type=content_pages

  Showing: Blog Content Pages

  March 2026 (Cycle 3)   8 pages  ✅ Delivered   [View →]
  February 2026 (Cycle 2) 8 pages  ✅ Delivered   [View →]
  January 2026 (Cycle 1)  8 pages  ✅ Delivered   [View →]
```

### Path 3: Orders View

```
/portal/orders

  Order #1042 — Monthly SEO Package    Jan 15, 2026    $X,XXX/mo
    → 3 cycles completed, 18 deliverables total
    [View Package Details →]
```

### Deliverable Detail Page

```
/portal/deliverables/{id}

  Blog Content Pages — March 2026 (Cycle 3)
  Status: Delivered ✅
  Delivered: March 18, 2026

  Files:
  📄 acme-guide-to-widget-repair.pdf          [Download]
  📄 acme-top-10-maintenance-tips.pdf         [Download]
  📄 acme-how-to-choose-the-right-widget.pdf  [Download]
  ... (8 total)

  Notes from your SEO team:
  "This month's content focuses on your top-performing keyword
   clusters from the Q1 topical map. All pages include optimized
   schema markup and internal linking."
```

---

## 7. Admin Side — Managing Packages & Deliverables

You need admin UI to:

1. **Configure packages** — After a purchase, set up the client's package items, quantities, and frequencies
2. **View/edit deliverables** — See what's pending across all clients, mark items as delivered, attach files
3. **Trigger delivery notifications** — One-click to email client when something's ready
4. **Override generation** — Add ad-hoc deliverables outside the normal cycle (rush jobs, bonus items)

This can live as a new tab in the existing admin ops dashboard (alongside the kanban), or as additional routes under `/admin/packages` and `/admin/deliverables`. Recommend the latter to keep the ops kanban clean.

```
/admin                        → Existing kanban (unchanged)
/admin/packages               → All client package configs
/admin/packages/:configId     → Edit a client's package
/admin/deliverables           → All deliverables across clients (filterable)
/admin/deliverables/:id       → Edit deliverable, attach files, mark delivered
```

---

## 8. Connecting Agents to Deliverables

When Silas or Scribe completes work for a client, the deliverable should get updated. Two approaches:

### Option A: Agent writes to deliverable directly (recommended for Phase 1)
The dispatcher creates a task that references a `deliverableId`. When the agent completes the task, a Convex mutation updates the deliverable status and attaches the output document.

Add to the existing `tasks` schema:
```
deliverableId: optional Id<"wooDeliverables">
```

When a task with a `deliverableId` transitions to `done`, a trigger mutation:
1. Updates the deliverable's `quantityDelivered`
2. Appends the task's document output to `deliverable.documentIds`
3. If `quantityDelivered >= quantity`, sets status to `delivered`
4. Fires the Resend notification email

### Option B: Manual linking (fallback)
You manually go into `/admin/deliverables/:id`, attach files, and click "Mark Delivered." Good as a fallback and for items agents don't produce directly.

---

## 9. Revised Implementation Phases

### Phase 1: WooCommerce Sync + Schema (Week 1)
- Add all new tables to `schema.ts`
- Build WC API client (`wooSync.ts`)
- Build webhook handler + HTTP route (`wooWebhook.ts`, update `http.ts`)
- Build scheduled polling job (`wooScheduled.ts`)
- Set up Resend account + verify `localcatalyst.ai` domain
- Store all env vars in Convex
- **Test:** Create a test product + test order in WC, verify data flows to Convex

### Phase 2: Customer Auth + Routing (Week 2)
- Install `react-router`
- Build role resolution (`portalAuth.ts`)
- Build route guards (`AdminGuard`, `CustomerGuard`, `RoleRedirect`)
- Restructure `main.tsx` / `App.tsx` for routing
- Build `LoginPage` (replaces current `SignInForm`)
- Build welcome email template + auto-account-creation flow
- **Test:** Create test customer, verify portal login + redirect

### Phase 3: Package Configuration Admin (Week 2-3)
- Build `wooPackageConfigs` + `wooPackageItems` mutations and queries
- Build `/admin/packages` UI for configuring client packages
- Build deliverable generation engine (scheduled function)
- Build `/admin/deliverables` list + detail UI
- **Test:** Configure a test package, run generation, verify deliverables created

### Phase 4: Customer Portal UI (Week 3-4)
- Build `PortalLayout` with sidebar navigation
- Build `PortalHome` (cycle-based deliverable overview)
- Build `OrdersPage` + `OrderDetailPage`
- Build `DeliverablesPage` with type filtering
- Build `DeliverableDetailPage` with file downloads
- Build `ProfilePage`
- **Test:** Full customer journey — purchase → package config → deliverable generation → agent completion → email notification → portal viewing

### Phase 5: Agent Integration + Polish (Week 4+)
- Add `deliverableId` to tasks schema
- Build task-to-deliverable completion trigger
- Build delivery notification emails
- Build cycle-complete summary email
- Polish portal UI, add loading states, error handling
- **Test:** End-to-end flow with actual Silas/Scribe task completion

---

## 10. Complete Convex Env Vars Needed

```
# WooCommerce API
WC_API_URL=https://localcatalyst.ai/wp-json/wc/v3
WC_CONSUMER_KEY=ck_xxxx
WC_CONSUMER_SECRET=cs_xxxx
WC_WEBHOOK_SECRET=whsec_xxxx

# Email (Resend)
RESEND_API_KEY=re_xxxx
RESEND_FROM_EMAIL=portal@localcatalyst.ai

# Existing
CONVEX_SITE_URL=https://xxxx.convex.site
```

---

## 11. File Inventory (Complete)

### Convex Backend (new/modified)
```
convex/
├── schema.ts                ← MODIFY: add 9 new tables
├── http.ts                  ← MODIFY: add /woo/webhook route
├── wooSync.ts               ← NEW: WC API client + sync actions
├── wooWebhook.ts            ← NEW: webhook handler + HMAC validation
├── wooQueries.ts            ← NEW: portal queries
├── wooMutations.ts          ← NEW: upsert customers/orders/products
├── wooScheduled.ts          ← NEW: cron polling + deliverable generation
├── wooPackages.ts           ← NEW: package config + item CRUD
├── wooDeliverables.ts       ← NEW: deliverable lifecycle mutations
├── portalAuth.ts            ← NEW: customer account creation + role resolution
├── email.ts                 ← NEW: Resend integration (Convex action, "use node")
```

### Frontend (new/modified)
```
src/
├── main.tsx                     ← MODIFY: add BrowserRouter
├── App.tsx                      ← MODIFY: route definitions
├── layouts/
│   ├── AdminLayout.tsx          ← NEW
│   └── PortalLayout.tsx         ← NEW
├── guards/
│   ├── AdminGuard.tsx           ← NEW
│   ├── CustomerGuard.tsx        ← NEW
│   └── RoleRedirect.tsx         ← NEW
├── pages/
│   ├── LoginPage.tsx            ← NEW
│   ├── portal/
│   │   ├── PortalHome.tsx       ← NEW (cycle-based overview)
│   │   ├── OrdersPage.tsx       ← NEW
│   │   ├── OrderDetailPage.tsx  ← NEW
│   │   ├── DeliverablesPage.tsx ← NEW (filterable by type)
│   │   ├── DeliverableDetailPage.tsx ← NEW (files + downloads)
│   │   └── ProfilePage.tsx      ← NEW
│   └── admin/
│       ├── PackagesPage.tsx     ← NEW (all client packages)
│       ├── PackageDetailPage.tsx← NEW (configure items/frequencies)
│       └── AdminDeliverablesPage.tsx ← NEW (cross-client deliverable management)
├── components/
│   ├── portal/
│   │   ├── CycleCard.tsx        ← NEW (monthly deliverable group)
│   │   ├── DeliverableCard.tsx  ← NEW
│   │   ├── DeliverableStatusBadge.tsx ← NEW
│   │   ├── PortalSidebar.tsx    ← NEW
│   │   └── FileDownloadList.tsx ← NEW
│   ├── admin/
│   │   ├── PackageConfigForm.tsx← NEW
│   │   ├── PackageItemRow.tsx   ← NEW
│   │   └── DeliverableManager.tsx ← NEW
│   └── shared/
│       └── StatusBadge.tsx      ← NEW
```

### Config
```
vercel.json                      ← NEW: SPA rewrite rules
```

### New dependency
```
react-router (v7)
```
