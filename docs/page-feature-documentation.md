# DIOnce Website — Page Feature Documentation

**Project:** DIOnce Company Website (`Company_Website_platform`)  
**Branch:** `CWP_SLM_04`  
**Date:** August 2026  
**Status:** Frontend implemented; NestJS contact API available as alternate backend

Use this document as a **Notion-style markdown template** — one section per route/page. Copy any section into Word/Notion as needed.

---

## Table of Contents

| # | Route | Document section |
|---|-------|------------------|
| 1 | `/` | [Home (Landing Page)](#page-1-home-landing-page) |
| 2 | `/about` | [About Us](#page-2-about-us) |
| 3 | `/platform` | [Platform](#page-3-platform) |
| 4 | `/use-cases` | [Use Cases](#page-4-use-cases) |
| 5 | `/contact` | [Contact](#page-5-contact) |
| 6 | `/cx-solutions` | [CX Solutions](#page-6-cx-solutions) |
| 7 | `/cx` | [CX Overview (Scaffold)](#page-7-cx-overview-scaffold) |
| 8 | `/slm-factory` | [SLM Factory](#page-8-slm-factory) |
| 9 | `/trustbridge` | [TrustBridge](#page-9-trustbridge) |
| 10 | `/privacy-policy` | [Privacy Policy](#page-10-privacy-policy) |
| 11 | `/terms-of-services` | [Terms of Services](#page-11-terms-of-services) |
| 12 | *(disabled)* `/pricing` | [Pricing](#page-12-pricing-not-routed) |
| — | Global | [Shared Components](#shared-global-components) |

---

# Page 1: Home (Landing Page)

**Route:** `/`  
**Component:** `src/app/pages/home/home.component.*`

## 1. Feature Name

**DIOnce Home — Agentic AI Platform Landing Page**

## 2. Description

- **What it does:** Primary marketing landing page for DIOnce.AI. Communicates the core value proposition (build, test, deploy, and monitor AI workflows in under one hour), highlights platform capabilities, lifecycle, testimonials, and drives visitors to Platform exploration or demo requests.
- **Problem solved:** Gives first-time visitors a fast understanding of the product and clear CTAs without requiring product login.
- **Primary user:** Prospects, enterprise buyers, and partners evaluating Agentic AI platforms.
- **Consumers:** End users (public website); no internal service consumers.

### Key technical decisions & trade-offs

| Decision | Rationale |
|----------|-----------|
| Canvas particle network hero | Visual “AI/tech” brand; runs client-side only (`isPlatformBrowser`) |
| Shared animation services | Reuses `ScrollAnimationService`, `CounterAnimationService`, `MagneticButtonService` across pages |
| Lazy-loaded route | Reduces initial bundle via `loadComponent` in `app.routes.ts` |
| Counter stats on scroll | Animated numbers (1 Hour, 100%, 75%) engage without blocking first paint |

## 3. Scope of Work (by function)

### Frontend

| Area | Details |
|------|---------|
| **Sections** | Hero (particles, CTAs, stats), Features grid (6 cards), Agent lifecycle, Platform capabilities, Testimonials |
| **Components** | `HomeComponent` (standalone) |
| **State** | Local arrays for features, stats, testimonials; no global store |
| **Libraries** | Angular Router, Font Awesome icons, custom animation services |
| **Navigation** | `navigateToContact()` → `/contact#contact-form`; `navigateToPlatform()` → `/platform#top` |

### Backend

None — static marketing content.

### Data Science

N/A.

## 4. API Contracts

**Not applicable.**

## 5. Dependencies & Integrations

- Global header/footer shell (`app.component`)
- Routes: `/platform`, `/contact`
- `ScrollAnimationService`, `CounterAnimationService`, `MagneticButtonService`

## 6. Future Scope

| Category | Items |
|----------|-------|
| **Limitations** | Particle canvas duplicated across several pages (not shared service) |
| **Planned** | Extract shared `ParticleBackgroundService`; hero typing effect (`fullText` currently empty) |
| **Out of scope** | Auth, CMS, dynamic content |

## 7. Links

| Resource | Path |
|----------|------|
| Component | `src/app/pages/home/home.component.ts` |
| Template | `src/app/pages/home/home.component.html` |
| Styles | `src/app/pages/home/home.component.scss` |
| PR / Jira | _TBD_ |

---

# Page 2: About Us

**Route:** `/about`  
**Component:** `src/app/pages/about/about.component.*`

## 1. Feature Name

**About DIOnce — Company Story, Timeline & Values**

## 2. Description

- **What it does:** Presents company history, mission, animated timeline, team stats, core values, expertise areas, and global office locations. Ends with a contact CTA.
- **Problem solved:** Builds trust and context for enterprise buyers who need company background before requesting demos.
- **Primary user:** Prospects and partners researching DIOnce credibility.
- **Consumers:** End users only.

### Key technical decisions & trade-offs

| Decision | Rationale |
|----------|-----------|
| Scroll-driven timeline | Progress bar + active milestone highlight as user scrolls |
| Alternating timeline layout | Visual rhythm on desktop (`isTimelineItemLeft`) |
| Counter animations | Stats (150+ years experience, 25 team, 3 locations, 100% satisfaction) animate on viewport entry |

## 3. Scope of Work (by function)

### Frontend

| Area | Details |
|------|---------|
| **Sections** | Hero, stats, scroll timeline (Jan 2025 → Ongoing), values, locations, expertise, CTA |
| **Components** | `AboutComponent` |
| **Services** | `ScrollAnimationService`, `CounterAnimationService` |
| **Data** | Static `timeline`, `values`, `expertise`, `locations` arrays in component TS |

### Backend

None.

### Data Science

N/A.

## 4. API Contracts

**Not applicable.**

## 5. Dependencies & Integrations

- Header nav link: `/about`
- CTA → `/contact#contact-form`

## 6. Future Scope

| Category | Items |
|----------|-------|
| **Limitations** | Timeline content is hard-coded; updates require code change |
| **Planned** | CMS or markdown-driven timeline; team photos |
| **Out of scope** | Careers/jobs portal |

## 7. Links

| Resource | Path |
|----------|------|
| Component | `src/app/pages/about/about.component.ts` |
| Template | `src/app/pages/about/about.component.html` |
| PR / Jira | _TBD_ |

---

# Page 3: Platform

**Route:** `/platform`  
**Component:** `src/app/pages/platform/platform.component.*`

## 1. Feature Name

**DIOnce Platform — Agent Lifecycle & Integrations Overview**

## 2. Description

- **What it does:** Product-focused page describing platform capabilities, benefits, and integration ecosystem (LLM providers, observability, channels, agent frameworks). Includes infinite marquee rows of integration logos and scroll-reveal animations.
- **Problem solved:** Explains the technical platform depth beyond the home-page summary; supports integration-aware buyers.
- **Primary user:** Technical evaluators, architects, and ops leaders.
- **Consumers:** End users only.

### Key technical decisions & trade-offs

| Decision | Rationale |
|----------|-----------|
| `duplicateMarqueeItems()` | Seamless CSS marquee loop by duplicating item halves |
| Dynamic marquee duration | Row speed scales with unique item count |
| Simple Icons CDN | External SVG logos without bundling assets |
| `IntersectionObserver` reveal | Lightweight scroll animation for `.tb-reveal` elements |

## 3. Scope of Work (by function)

### Frontend

| Area | Details |
|------|---------|
| **Sections** | Hero, capabilities (`#capabilities`), benefits (`#benefits`), integrations banner (`#integrations`), final CTA (`#demo`) |
| **Components** | `PlatformComponent` |
| **Integration groups** | LLM Providers, Observability, Channels & APIs, Agent-framework adapters |
| **Libraries** | Font Awesome, Simple Icons CDN |

### Backend

None.

### Data Science

N/A.

## 4. API Contracts

**Not applicable.**

## 5. Dependencies & Integrations

- Header nav: `/platform`
- Home CTA: `navigateToPlatform()` scrolls to `#top`
- External CDN: `cdn.simpleicons.org`, `cdn.jsdelivr.net/npm/simple-icons`

## 6. Future Scope

| Category | Items |
|----------|-------|
| **Limitations** | Integration list is static in TS |
| **Planned** | Link each integration to docs; TrustBridge cross-links |
| **Out of scope** | Live integration status API |

## 7. Links

| Resource | Path |
|----------|------|
| Component | `src/app/pages/platform/platform.component.ts` |
| Template | `src/app/pages/platform/platform.component.html` |
| PR / Jira | _TBD_ |

---

# Page 4: Use Cases

**Route:** `/use-cases`  
**Component:** `src/app/pages/use-cases/use-cases.component.*`

## 1. Feature Name

**Industry Use Cases & Customer Success Stories**

## 2. Description

- **What it does:** Showcases six vertical use cases (Banking, Fintech, Operations/BPM, Product Management, Customer Experience, Research & Analytics) with capability bullets and three success-story cards with metrics.
- **Problem solved:** Helps visitors map DIOnce to their industry and see social proof.
- **Primary user:** Industry-specific buyers (especially BFSI).
- **Consumers:** End users only.

### Key technical decisions & trade-offs

| Decision | Rationale |
|----------|-----------|
| Gradient map in TS | Maps Tailwind-like class strings to CSS gradients for card styling |
| Particle hero | Consistent visual language with Home/About |
| Static success stories | Fast to ship; no CMS dependency |

## 3. Scope of Work (by function)

### Frontend

| Area | Details |
|------|---------|
| **Sections** | Hero, use-case grid (6 cards), success stories (3), CTA |
| **Components** | `UseCasesComponent` |
| **Services** | `ScrollAnimationService` |

### Backend

None.

### Data Science

N/A.

## 4. API Contracts

**Not applicable.**

## 5. Dependencies & Integrations

- CTA → `/contact#contact-form`
- Not currently linked in main header nav (reachable via content/SEO)

## 6. Future Scope

| Category | Items |
|----------|-------|
| **Limitations** | Route not in primary header navigation |
| **Planned** | Add to nav or mega-menu; case-study detail pages |
| **Out of scope** | Customer logo wall with legal approvals |

## 7. Links

| Resource | Path |
|----------|------|
| Component | `src/app/pages/use-cases/use-cases.component.ts` |
| PR / Jira | _TBD_ |

---

# Page 5: Contact

**Route:** `/contact`  
**Component:** `src/app/pages/contact/contact.component.*`

## 1. Feature Name

**Contact & Demo Request Form**

## 2. Description

- **What it does:** Collects lead information (name, email, company, message) and sends it to the sales team. Supports deep-link scroll to `#contact-form` from CTAs across the site. Shows office/contact info cards.
- **Problem solved:** Central conversion point for demo requests and sales inquiries.
- **Primary user:** Prospects submitting demo or sales requests.
- **Consumers:** Sales team (via email); optional NestJS backend for Resend delivery.

### Key technical decisions & trade-offs

| Decision | Rationale |
|----------|-----------|
| **EmailJS (frontend)** | Current production path — no backend required for static hosting |
| **NestJS + Resend (backend)** | Alternate/server-side path with admin + auto-reply emails |
| Reactive forms + validators | Client-side validation before submit |
| Fragment routing | `#contact-form` scroll from Home, About, Use Cases, footer |

## 3. Scope of Work (by function)

### Frontend

| Area | Details |
|------|---------|
| **Components** | `ContactComponent`, `ToastComponent` (feedback) |
| **Services** | `ContactService` (EmailJS), `ToastService`, `ScrollAnimationService` |
| **Form fields** | `name`, `email`, `company`, `message` (all required on frontend) |
| **UX** | Loading state (`isSubmitting`), field-level errors, success/error toasts |

### Backend

| Area | Details |
|------|---------|
| **Module** | `backend/src/contact/` (NestJS) |
| **Service** | `ContactService.sendDiOnceEmail()` via Resend API |
| **Validation** | `ContactFormDto` with class-validator |
| **Security** | HTML sanitization on email body fields |

### Data Science

N/A.

## 4. API Contracts

### Frontend (EmailJS — current)

| Item | Detail |
|------|--------|
| **Provider** | EmailJS browser SDK |
| **Config** | `environment.emailjs.publicKey`, `serviceID`, `templateID` |
| **Payload** | Template params: `name`, `email`, `company`, `message`, etc. |
| **Auth** | EmailJS public key (client-side) |

### Backend (NestJS — alternate)

#### `GET /api/contact`

Health/info endpoint.

**Response:**
```json
{
  "success": true,
  "message": "Contact API is running!",
  "endpoint": "/api/contact",
  "method": "POST"
}
```

**Auth:** None.

#### `POST /api/contact`

**Request body:**
```json
{
  "name": "Jane Doe",
  "email": "jane@company.com",
  "phone": "+1-555-0100",
  "companyName": "Acme Corp",
  "message": "Interested in a demo."
}
```

| Field | Required | Notes |
|-------|----------|-------|
| `name` | Yes | Min 2 chars |
| `email` | Yes | Valid email |
| `phone` | No | Optional |
| `companyName` | No | Frontend sends as `company` — map if switching backends |
| `message` | No | Optional on backend; required on frontend |

**Success (200):**
```json
{
  "success": true,
  "message": "Contact form submitted successfully",
  "result": {
    "adminEmailSent": true,
    "userEmailSent": true
  }
}
```

**Errors:**

| Status | Meaning |
|--------|---------|
| `400` | Missing name/email or invalid email format |
| `500` | Resend failure, missing API key, etc. |

**Auth:** None (consider rate limiting in production).

**Env vars:** `RESEND_API_KEY`, `ADMIN_EMAIL`, `FROM_EMAIL`

## 5. Dependencies & Integrations

- EmailJS account + template (frontend)
- Resend API (backend alternate)
- Footer CTAs, Home/About/Use Cases CTAs → `#contact-form`
- CORS: backend allows `http://localhost:4200`

## 6. Future Scope

| Category | Items |
|----------|-------|
| **Limitations** | Frontend/backend field names differ (`company` vs `companyName`); dual email paths |
| **Planned** | Unify on NestJS API; honeypot/spam protection; CRM webhook (HubSpot/Salesforce) |
| **Out of scope** | Live chat handoff to human agents |

## 7. Links

| Resource | Path |
|----------|------|
| Frontend service | `src/app/services/contact.service.ts` |
| Backend controller | `backend/src/contact/contact.controller.ts` |
| Backend setup | `backend/SETUP_INSTRUCTIONS.md` |
| PR / Jira | _TBD_ |

---

# Page 6: CX Solutions

**Route:** `/cx-solutions`  
**Component:** `src/app/pages/cx-solutions/cx-solutions.component.*`

## 1. Feature Name

**CX Solutions — Agentic AI for Customer Experience (Full Marketing Page)**

## 2. Description

- **What it does:** Long-form marketing page for DIOnce Customer Experience offerings: autonomous agents across voice, chat, WhatsApp, email; platform pillars; knowledge, channels, 24/7 coverage, integrations, reliability, trust, compliance, proof, and FAQ.
- **Problem solved:** Explains CX product depth for contact-center and CX leaders evaluating autonomous agents.
- **Primary user:** CX leaders, contact-center ops, digital transformation teams.
- **Consumers:** End users only.

### Key technical decisions & trade-offs

| Decision | Rationale |
|----------|-----------|
| CSS hero animations | Performance on first paint |
| `IntersectionObserver` scroll reveal | Efficient vs scroll listeners; unobserve after reveal |
| Selector-based reveal in TS | Avoids editing 700+ lines of HTML |
| `--cx-reveal-delay` CSS variable | Stagger without inline styles |
| `prefers-reduced-motion` | Accessibility |
| `environment.cxPageIndexable` | `noindex` until content is production-ready |
| FAQ accordion | Single open item via `openFaqIndex` |

## 3. Scope of Work (by function)

### Frontend

| Area | Details |
|------|---------|
| **Sections** | Hero, pillars, use cases, platform, knowledge, channels, always-on (24/7 bar), interruption, integrations, reliability, trust, compliance, proof, FAQ |
| **Anchor IDs** | `#usecases`, `#platform`, `#knowledge`, `#channels`, `#always-on`, `#demo`, `#faq`, etc. |
| **Animations** | Hero stagger, trace panel, iso stack, scroll reveal, 24-bar hours animation |
| **Files** | `cx-solutions.component.ts`, `.html`, `.scss`, `_cx-solutions-styles.scss` |

### Backend

None.

### Data Science

N/A.

## 4. API Contracts

**Not applicable.**

## 5. Dependencies & Integrations

- Footer CTA: `/cx-solutions#demo`, `/contact`
- Header CX mega-menu links to `/cx-solutions` fragments
- SEO: dynamic title + meta description on init; restored on destroy

## 6. Future Scope

| Category | Items |
|----------|-------|
| **Limitations** | Reveal targets maintained via TS selector list |
| **Planned** | Shared `ScrollAnimationService`; hero electric border; animated stat counters; pricing section (commented in HTML) |
| **Out of scope** | CMS-driven content, animation analytics |

## 7. Links

| Resource | Path |
|----------|------|
| Component | `src/app/pages/cx-solutions/cx-solutions.component.ts` |
| Styles | `src/app/pages/cx-solutions/_cx-solutions-styles.scss` |
| Detailed animation doc | `docs/features-footer-cx-animations.md` |
| PR / Jira | _TBD_ |

---

# Page 7: CX Overview (Scaffold)

**Route:** `/cx`  
**Component:** `src/app/pages/cx/cx.component.*`

## 1. Feature Name

**CX Overview Page — Navigation Scaffold & Design System Shell**

## 2. Description

- **What it does:** Placeholder page that defines section anchor IDs matching the CX mega-menu (`voice-agents`, `platform`, `knowledge`, etc.). Loads CX-specific fonts and runs a dev-time placeholder audit when enabled.
- **Problem solved:** Enables header mega-menu fragment links and CX design-token work before full content is copied from `/cx-solutions`.
- **Primary user:** Internal dev/design team; eventually CX prospects (when content is filled).
- **Consumers:** Header `CxMegaMenuComponent` navigation targets.

### Key technical decisions & trade-offs

| Decision | Rationale |
|----------|-----------|
| Empty section shells | Incremental content migration without breaking nav |
| `CxFontLoaderService` | Deferred CX font loading for performance |
| `CxPlaceholderAuditService` | Dev-only warnings for unfilled sections |
| `noindex` when `cxPageIndexable: false` | Prevents indexing incomplete page |

## 3. Scope of Work (by function)

### Frontend

| Area | Details |
|------|---------|
| **Components** | `CxComponent`, `CxCtaButtonComponent` |
| **Services** | `CxFontLoaderService`, `CxPlaceholderAuditService` |
| **Design tokens** | `pages/cx/design-tokens/_cx-*.scss` |
| **Nav config** | `src/app/navigation/cx-nav.config.ts` |

### Backend

None.

### Data Science

N/A.

## 4. API Contracts

**Not applicable.**

## 5. Dependencies & Integrations

- `CX_NAV_BY_JOB`, `CX_NAV_BY_CAPABILITY` in `cx-nav.config.ts`
- Full content reference: `/cx-solutions` (production-ready page)
- Environment: `cxPageIndexable`, `cxPlaceholderAudit`, `cxAllowPlaceholders`

## 6. Future Scope

| Category | Items |
|----------|-------|
| **Limitations** | All sections empty — not suitable for public launch |
| **Planned** | Port `/cx-solutions` content or shared partials; enable indexing |
| **Out of scope** | Separate CMS instance for CX |

## 7. Links

| Resource | Path |
|----------|------|
| Component | `src/app/pages/cx/cx.component.ts` |
| Nav config | `src/app/navigation/cx-nav.config.ts` |
| PR / Jira | _TBD_ |

---

# Page 8: SLM Factory

**Route:** `/slm-factory`  
**Component:** `src/app/pages/slm-factory/slm-factory.component.*`

## 1. Feature Name

**SLM Factory — Small Language Model Evaluation & Selection**

## 2. Description

- **What it does:** Marketing page for SLM Factory: discover, benchmark, verify, and human-test small language models before production commitment. Includes evaluation trace demo, pillars, problem statement, workflow steps, and CTAs.
- **Problem solved:** Addresses “which small model should we ship?” — replaces ad-hoc leaderboard picks with an evidence-based pipeline narrative.
- **Primary user:** ML engineers, platform teams, and tech leads choosing SLMs.
- **Consumers:** End users; AI chat widget uses SLM-specific copy on this route.

### Key technical decisions & trade-offs

| Decision | Rationale |
|----------|-----------|
| Dedicated page styling (`slm-factory-page` host class) | Distinct visual identity from main site |
| Footer CTA hidden on this route | `FooterComponent.syncFooterCta` excludes `/slm-factory` |
| SEO meta on init | Title + description for search when indexed |
| Static trace panel | Illustrates workflow without live backend |

## 3. Scope of Work (by function)

### Frontend

| Area | Details |
|------|---------|
| **Sections** | Hero + trace, pillars (`#why`), problem, workflow (`#workflow`), gates, CTA |
| **Components** | `SlmFactoryComponent` |
| **CTAs** | `/contact` (Evaluate a model), in-page `#workflow` anchor |

### Backend

None on website (product backend is separate/out of scope).

### Data Science

Describes (marketing copy): Hugging Face catalog sync, curated leaderboard (19 models), LLM advisor, inference probe, human test sessions.

## 4. API Contracts

**Not applicable** for marketing page.

## 5. Dependencies & Integrations

- Header nav: `/slm-factory`
- AI chat widget: SLM-specific welcome + keyword replies
- Footer: CTA block suppressed

## 6. Future Scope

| Category | Items |
|----------|-------|
| **Limitations** | Benchmark stats in trace are illustrative; no live API |
| **Planned** | Link to product app; hero stats strip (commented in HTML) |
| **Out of scope** | In-browser model benchmarking |

## 7. Links

| Resource | Path |
|----------|------|
| Component | `src/app/pages/slm-factory/slm-factory.component.ts` |
| Template | `src/app/pages/slm-factory/slm-factory.component.html` |
| PR / Jira | _TBD_ |

---

# Page 9: TrustBridge

**Route:** `/trustbridge`  
**Component:** `src/app/pages/trustbridge/trustbridge.component.*`

## 1. Feature Name

**TrustBridge — AI Governance & Policy (Placeholder Page)**

## 2. Description

- **What it does:** Reserved route and component for TrustBridge product marketing. **Currently empty template** — page renders blank content area with global header/footer only.
- **Problem solved:** Route and nav slot exist for upcoming TrustBridge launch; prevents 404 for early links.
- **Primary user:** Intended: compliance, risk, and platform governance buyers.
- **Consumers:** Header nav (`TrustBridge` → `/trustbridge`).

### Key technical decisions & trade-offs

| Decision | Rationale |
|----------|-----------|
| Empty shell component | Ship nav structure before content is ready |
| Listed first in header nav | Product priority signaling |

## 3. Scope of Work (by function)

### Frontend

| Area | Details |
|------|---------|
| **Status** | `trustbridge.component.html` is empty |
| **Components** | `TrustbridgeComponent` (no logic) |

### Backend

None.

### Data Science

N/A.

## 4. API Contracts

**Not applicable.**

## 5. Dependencies & Integrations

- Header nav entry
- AI chat widget mentions TrustBridge in keyword replies

## 6. Future Scope

| Category | Items |
|----------|-------|
| **Limitations** | **No page content — not launch-ready** |
| **Planned** | Full marketing page (governance, audit trail, policy runtime) mirroring Platform/SLM Factory quality |
| **Out of scope** | Product console UI |

## 7. Links

| Resource | Path |
|----------|------|
| Component | `src/app/pages/trustbridge/trustbridge.component.ts` |
| PR / Jira | _TBD_ |

---

# Page 10: Privacy Policy

**Route:** `/privacy-policy`  
**Component:** `src/app/pages/privacy/privacy.component.*`

## 1. Feature Name

**Privacy Policy — Legal Disclosure Page**

## 2. Description

- **What it does:** Displays DIOnce privacy policy content for regulatory and user transparency requirements.
- **Problem solved:** Legal compliance and trust for data collection (contact forms, analytics, etc.).
- **Primary user:** All website visitors; legal/compliance reviewers.
- **Consumers:** End users only.

### Key technical decisions & trade-offs

| Decision | Rationale |
|----------|-----------|
| Static HTML content | Simple to audit; no CMS |
| Particle hero background | Visual consistency with site theme |

## 3. Scope of Work (by function)

### Frontend

| Area | Details |
|------|---------|
| **Components** | `PrivacyComponent` |
| **Content** | `privacy.component.html` (legal text) |

### Backend

None.

### Data Science

N/A.

## 4. API Contracts

**Not applicable.**

## 5. Dependencies & Integrations

- Footer legal links → `/privacy-policy`

## 6. Future Scope

| Category | Items |
|----------|-------|
| **Limitations** | Manual updates when policy changes |
| **Planned** | Version date + changelog; i18n |
| **Out of scope** | Cookie consent management platform |

## 7. Links

| Resource | Path |
|----------|------|
| Component | `src/app/pages/privacy/privacy.component.html` |
| PR / Jira | _TBD_ |

---

# Page 11: Terms of Services

**Route:** `/terms-of-services`  
**Component:** `src/app/pages/terms-of-services/terms-of-services.component.*`

## 1. Feature Name

**Terms of Services — Legal Agreement Page**

## 2. Description

- **What it does:** Displays terms of service governing use of DIOnce website and services.
- **Problem solved:** Legal protection and clear user obligations.
- **Primary user:** All website visitors; legal reviewers.
- **Consumers:** End users only.

### Key technical decisions & trade-offs

Same pattern as Privacy Policy — static content, particle hero, footer-linked.

## 3. Scope of Work (by function)

### Frontend

| Area | Details |
|------|---------|
| **Components** | `TermsOfServicesComponent` |
| **Content** | `terms-of-services.component.html` |

### Backend

None.

### Data Science

N/A.

## 4. API Contracts

**Not applicable.**

## 5. Dependencies & Integrations

- Footer legal links → `/terms-of-services`

## 6. Future Scope

| Category | Items |
|----------|-------|
| **Limitations** | Manual legal updates |
| **Planned** | Last-updated metadata; separate product vs website terms |
| **Out of scope** | E-signature acceptance flow |

## 7. Links

| Resource | Path |
|----------|------|
| Component | `src/app/pages/terms-of-services/terms-of-services.component.html` |
| PR / Jira | _TBD_ |

---

# Page 12: Pricing (Not Routed)

**Route:** `/pricing` *(commented out in `app.routes.ts`)*  
**Component:** `src/app/pages/pricing/pricing.component.*`

## 1. Feature Name

**Pricing Plans — Free / Pro / Enterprise (Dormant)**

## 2. Description

- **What it does:** Three-tier pricing UI (Free $0, Pro $99/mo, Enterprise custom) with feature lists and FAQ component. **Not accessible via router** — route is commented out.
- **Problem solved:** Prepared pricing presentation for future self-serve or sales-assisted conversion.
- **Primary user:** Would-be self-serve and SMB buyers.
- **Consumers:** End users (when enabled).

### Key technical decisions & trade-offs

| Decision | Rationale |
|----------|-----------|
| Route disabled | Product pricing not finalized for public launch |
| `FaqComponent` reuse | Consistent FAQ UX with rest of site |

## 3. Scope of Work (by function)

### Frontend

| Area | Details |
|------|---------|
| **Components** | `PricingComponent`, `FaqComponent` |
| **Plans** | Free, Pro (popular), Enterprise — static data in TS |

### Backend

None.

### Data Science

N/A.

## 4. API Contracts

**Not applicable.**

## 5. Dependencies & Integrations

- Would link to `/contact` for Enterprise/demo CTAs when enabled

## 6. Future Scope

| Category | Items |
|----------|-------|
| **Limitations** | Route disabled; prices may not reflect actual packaging |
| **Planned** | Re-enable route; Stripe/billing integration |
| **Out of scope** | Usage-based metering UI |

## 7. Links

| Resource | Path |
|----------|------|
| Component | `src/app/pages/pricing/pricing.component.ts` |
| Routes | `src/app/app.routes.ts` (commented) |
| PR / Jira | _TBD_ |

---

# Shared Global Components

These are not standalone routes but affect every (or most) pages.

---

## Shared: Site Header & CX Mega Menu

**Components:** `header.component.*`, `cx-mega-menu.component.*`

### 1. Feature Name

**Global Navigation Header with CX Mega Menu**

### 2. Description

- Sticky header with primary nav: TrustBridge, SLM Factory, Platform, About; CX entry opens mega-menu with job-based and capability-based links to `/cx` and `/cx-solutions` fragments; mobile hamburger menu; Request Demo CTA.
- **Primary user:** All site visitors.

### 3. Scope of Work

| Layer | Details |
|-------|---------|
| **Frontend** | Scroll state (`isScrolled`), active route highlighting, `CX_NAV_*` config |
| **Backend** | None |

### 4. API Contracts

N/A.

### 5. Dependencies

`src/app/navigation/cx-nav.config.ts`

### 6. Future Scope

Add Use Cases to nav; unify CX links to single canonical page.

### 7. Links

`src/app/components/header/header.component.ts`

---

## Shared: Site Footer

**Component:** `footer.component.*`

### 1. Feature Name

**Global Footer with Conditional CTA**

### 2. Description

- Site-wide footer with links, copyright (`DIOnce.AI`), scroll-to-top, and CTA block (“Book a build session”, “Call a live agent”) with diagonal arrow icons.
- **`showFooterCta`:** hidden on `/slm-factory`.

### 3. Scope of Work

| Layer | Details |
|-------|---------|
| **Frontend** | `footer.component.html/scss`, route-aware CTA visibility |
| **Backend** | None |

### 4–7

See `docs/features-footer-cx-animations.md` for footer CTA arrow implementation details.

---

## Shared: AI Chat Widget

**Component:** `ai-chat-widget.component.*`

### 1. Feature Name

**On-Site Rule-Based AI Assistant Widget**

### 2. Description

- Floating chat bubble with keyword-based replies about Platform, TrustBridge, CX, SLM Factory, and demo requests. Context-aware on `/slm-factory`. Resets on route change. **Not a live LLM** — pattern matching in `buildReply()`.

### 3. Scope of Work

| Layer | Details |
|-------|---------|
| **Frontend** | Angular signals, `RouterLink` action buttons |
| **Backend** | None |

### 6. Future Scope

Connect to real LLM/API; conversation persistence; analytics.

### 7. Links

`src/app/components/ai-chat-widget/ai-chat-widget.component.ts`

---

# Appendix: Route Map

```
/                    → HomeComponent
/about               → AboutComponent
/cx                  → CxComponent (scaffold)
/cx-solutions        → CxSolutionsComponent
/trustbridge         → TrustbridgeComponent (empty)
/slm-factory         → SlmFactoryComponent
/platform            → PlatformComponent
/use-cases           → UseCasesComponent
/contact             → ContactComponent
/privacy-policy      → PrivacyComponent
/terms-of-services   → TermsOfServicesComponent
/pricing             → (disabled) PricingComponent
/**                  → redirect to /
```

---

# Appendix: Copy to Word / Notion

1. Open this file in any markdown viewer or paste into Notion (headings and tables import cleanly).
2. For Word: paste section-by-section or use **Pandoc**:  
   `pandoc page-feature-documentation.md -o DIOnce-Page-Documentation.docx`
3. Fill in **PR / Jira** placeholders per page before sending to stakeholders.
