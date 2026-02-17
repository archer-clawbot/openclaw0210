# Dashboard WooCommerce Integration — Phase 5 Handoff

## Project Overview

You're continuing work on `dashboard.localcatalyst.ai`, a React 19 + Convex + Tailwind + Vite app deployed on Vercel. It's an admin ops dashboard + customer portal for a local SEO agency (LocalCatalyst / Brawn Media). The repo is at the current working directory.

**Stack:** React 19, Convex (backend-as-a-service), Tailwind CSS 4, Vite 7, React Router 7, deployed to Vercel (frontend) + Convex Cloud (backend).

**Convex deployments:**
- Dev: `spotted-shepherd-486`
- Prod: `valuable-partridge-851` (serves `dashboard.localcatalyst.ai`)

## What's Been Built (Phases 1-4 Complete)

### Phase 1 — WooCommerce Sync + Schema
- `convex/schema.ts`: 15 tables including 6 WooCommerce tables (wooCustomers, wooOrders, wooProducts, wooSyncState, wooPackageConfigs, wooPackageItems, wooDeliverables, customerPortalUsers)
- `convex/wooSync.ts`: WC REST API client + sync actions
- `convex/wooWebhook.ts`: Webhook handler + HMAC validation
- `convex/wooMutations.ts`: Upsert mutations for customers/orders/products
- `convex/wooQueries.ts`: Complete query layer (312 lines) — listCustomers, listOrders, listProducts, getDeliverable, listAllDeliverables, listPackageConfigs, getPackageConfig, plus portal queries
- `convex/http.ts`: Webhook route at /woo/webhook + dispatcher HTTP routes
- `convex/crons.ts`: 15-minute WC polling sync + daily deliverable generation at 6 AM UTC
- `convex/email.ts`: Resend integration with 4 email actions (welcome, deliverable-ready, cycle-complete, password-reset)
- `convex/portalAuth.ts`: Role resolution + customer-user linking

### Phase 2 — Customer Auth + Routing
- React Router v7 with BrowserRouter
- Route guards: `AdminGuard`, `CustomerGuard`, `RoleRedirect`
- `App.tsx`: Complete routing — `/admin/*`, `/portal/*`, `/login`
- `PortalLayout.tsx`: Sidebar nav (Dashboard, Orders, Deliverables, Profile)
- Portal pages: PortalHome, OrdersPage, DeliverablesPage, DeliverableDetailPage, ProfilePage
- `LoginPage.tsx`: Auth entry point

### Phase 3 — Package Configuration Admin
- `convex/wooPackages.ts`: CRUD for package configs + items (createPackageConfig, updatePackageConfig, deletePackageConfig, addPackageItem, updatePackageItem, deletePackageItem)
- `convex/wooDeliverables.ts`: Full lifecycle mutations + generation engine:
  - createDeliverable, updateDeliverableStatus, updateDeliverable, deleteDeliverable
  - markDelivered (sets status, saves timestamp, fires Resend email via scheduler)
  - generateCycleDeliverables (cron-driven: iterates active packages, applies frequency rules, creates deliverable instances)
  - generateForPackage (manual trigger for specific package)
  - shouldGenerate() frequency logic: monthly, first_month, one_time, quarterly
- Admin pages:
  - `PackagesPage.tsx`: List all packages, create new with customer dropdown
  - `PackageDetailPage.tsx`: Edit config, add/remove items with type/frequency/quantity, generate deliverables, pause/resume/delete
  - `AdminDeliverablesPage.tsx`: Cross-client deliverable list with status/type filters, quick-start buttons, run cycle generation
  - `AdminDeliverableDetailPage.tsx`: Edit deliverable, attach download URLs, mark delivered + notify client, delete

### Phase 4 — Customer Portal UI (built during Phase 2)
Already complete — portal pages are functional and wired up.

## What Needs to Be Built — Phase 5: Agent Integration + Polish

Reference: `convex/WOOCOMMERCE-PACKAGES-SPEC.md` section 8 ("Connecting Agents to Deliverables")

### 5A. Task-to-Deliverable Completion Trigger

The `tasks` table already has `deliverableId: v.optional(v.id("wooDeliverables"))` in the schema. What's missing is the trigger logic.

**Build a mutation or modify the existing dispatcher `complete` mutation** (`convex/dispatcher.ts`) so that when a task with a `deliverableId` transitions to `done`:

1. Fetch the linked deliverable
2. Increment `quantityDelivered` by 1
3. If the task produced a document (check `messages` table for attachments from the task's agent), append the document ID to `deliverable.documentIds` (JSON array string)
4. If `quantityDelivered >= quantity`, auto-set status to `"delivered"` and `deliveredAt` to `Date.now()`
5. If auto-delivered, fire `sendDeliverableReadyEmail` via `ctx.scheduler.runAfter(0, ...)`

Look at the existing `complete` mutation in `convex/dispatcher.ts` — it already handles task status transitions. Add the deliverable logic there, or create a separate internal mutation that `complete` calls.

### 5B. Cycle-Complete Email

After a deliverable is marked delivered (either manually or via the trigger above), check if ALL deliverables for that customer + cycle are now delivered. If so, fire `sendCycleCompleteEmail` from `convex/email.ts`.

This could be:
- A check at the end of `markDelivered` in `wooDeliverables.ts`
- A check at the end of the task completion trigger
- Both (belt and suspenders)

The query to check: get all deliverables where `customerId` matches and `cycleNumber` matches — if every one has `status === "delivered"`, fire the cycle-complete email.

### 5C. Dispatcher CreateTask — Accept deliverableId

The HTTP route `POST /dispatcher/tasks/create` in `convex/http.ts` calls `api.dispatcher.createTask`. Make sure `createTask` accepts and stores `deliverableId` so that when agents (like Silas or Scribe) create tasks via the HTTP API, they can link them to deliverables.

Check `convex/dispatcher.ts` for the `createTask` mutation and add `deliverableId` to its args if not already present.

### 5D. Admin UI — Link tasks to deliverables

On `AdminDeliverableDetailPage.tsx`, add a section showing linked tasks (query tasks where `deliverableId` matches). Show task title, status, agent, and completion time. This gives visibility into which agent work feeds each deliverable.

### 5E. Polish Items

1. **Loading states**: Ensure all pages have proper loading spinners (most already do with `=== undefined` checks)
2. **Error boundaries**: Add try/catch around mutations in admin pages where missing
3. **SiteName placeholder**: In `src/components/Header.tsx`, the badge says "SiteName" — change to "LocalCatalyst"
4. **Responsive cleanup**: Admin pages use `max-w-5xl`/`max-w-6xl` — verify they look acceptable on smaller screens
5. **Empty state for deliverables list page**: Already handled, but verify `/admin/deliverables` shows proper empty state

## Key Files Reference

```
convex/
├── schema.ts              — All 15 tables (tasks table has deliverableId already)
├── dispatcher.ts          — Task lifecycle: queryTasks, dispatch, complete, fail, createTask, recordUsage, promote
├── wooDeliverables.ts     — Deliverable lifecycle + generation engine
├── wooPackages.ts         — Package config CRUD
├── wooQueries.ts          — All read queries (portal + admin)
├── email.ts               — Resend email actions (welcome, deliverable-ready, cycle-complete, password-reset)
├── http.ts                — HTTP routes (webhook, dispatcher API)
├── crons.ts               — Scheduled jobs (WC sync, deliverable generation)

src/
├── App.tsx                — All routes defined
├── components/Header.tsx  — Admin header with Packages/Deliverables nav links
├── pages/admin/
│   ├── MissionControlApp.tsx          — Ops kanban dashboard
│   ├── PackagesPage.tsx               — Package list + create
│   ├── PackageDetailPage.tsx          — Package detail + item management
│   ├── AdminDeliverablesPage.tsx      — Cross-client deliverable management
│   └── AdminDeliverableDetailPage.tsx — Deliverable detail + delivery workflow
├── pages/portal/                      — Customer-facing portal pages
├── guards/                            — AdminGuard, CustomerGuard, RoleRedirect
└── layouts/PortalLayout.tsx           — Portal sidebar layout
```

## Important Notes

- **Tenant ID**: Everything uses `tenantId: "default"` — no multi-tenant complexity
- **TypeScript strict mode**: `noUnusedLocals: true`, `noUnusedParameters: true` in tsconfig.app.json — unused variables will fail the Vercel build
- **Convex patterns**: Mutations can call `ctx.scheduler.runAfter()` to trigger actions (like email sends). Mutations cannot make HTTP calls directly — only actions (`"use node"`) can
- **Deploy flow**: `npx convex deploy` for backend, `npx vercel --prod` for frontend, or just `git push` if Vercel is connected to the repo
- **The spec file** `convex/WOOCOMMERCE-PACKAGES-SPEC.md` has the full architectural context including email templates, portal wireframes, and the agent integration design

## Suggested Order

1. Modify `convex/dispatcher.ts` complete mutation to handle deliverable updates
2. Add deliverableId support to createTask in dispatcher
3. Add cycle-complete check to markDelivered in wooDeliverables.ts
4. Add linked tasks section to AdminDeliverableDetailPage.tsx (needs a new query in wooQueries.ts)
5. Fix "SiteName" → "LocalCatalyst" in Header.tsx
6. Run `npx tsc --noEmit` to verify zero errors
7. Deploy: `npx convex deploy` then `npx vercel --prod`
