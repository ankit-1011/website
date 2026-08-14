# DIOnce Website — Feature Documentation

**Branch:** `CWP_SLM_04`  
**Date:** August 2026  
**Author:** Ankit (with Cursor)  
**Status:** Implemented (frontend)

---

## Table of Contents

1. [Footer CTA Visual Enhancement](#feature-1-footer-cta-visual-enhancement)
2. [CX Solutions Page Motion & Scroll Reveal](#feature-2-cx-solutions-page-motion--scroll-reveal)
3. [Maintenance: Git Merge Conflict](#maintenance-git-merge-conflict-resolution)

---

# Feature 1: Footer CTA Visual Enhancement

## 1. Feature Name

**Footer Call-to-Action Button Icons**

## 2. Description

| Item | Detail |
|------|--------|
| **What it does** | Adds diagonal arrow icons to the footer “Get started” CTAs — **Book a build session** and **Call a live agent** — matching the CX Solutions page button style. |
| **Problem solved** | Footer buttons looked like plain text links; arrows signal navigation and align with the rest of the marketing site. |
| **Primary users** | Website visitors on any page that renders the global footer CTA block. |
| **Consumers** | End users (prospects/customers); no internal service consumers. |

### Key technical decisions & trade-offs

- **Inline SVG** (14×14 diagonal arrow) instead of Font Awesome — consistent with CX Solutions, no extra icon dependency.
- **Flex + gap** on `.site-footer-btn` — icon aligns with label without extra wrapper components.
- **Merge resolution:** During `git pull origin CWP_SLM_04`, combined local © styling with remote `DIOnce.AI` branding.

## 3. Scope of Work (by function)

### Frontend

| Area | Details |
|------|---------|
| **Components modified** | `footer.component.html`, `footer.component.scss` |
| **New styles** | `.site-footer-btn__icon` (flex-none, opacity 0.85) |
| **State management** | None — static template |
| **Libraries** | Angular `RouterLink` only |

### Backend

None.

### Data Science

N/A.

## 4. API Contracts

**Not applicable** — static UI only.

## 5. Dependencies & Integrations

- Angular routing: `/contact`, `/cx-solutions#demo`
- Existing footer logic: `showFooterCta` controls CTA visibility
- Visual parity with CX Solutions hero CTA arrow SVG

## 6. Future Scope

| Category | Items |
|----------|-------|
| **Limitations** | Arrow SVG duplicated in footer and CX Solutions (not yet a shared component). |
| **Planned improvements** | Extract reusable CTA component; optional animated border on footer CTAs. |
| **Explored but not shipped** | Electric SVG border on hero button (hover trace effect). |
| **Out of scope** | Backend, analytics, A/B testing |

## 7. Links

| Resource | Path / URL |
|----------|------------|
| HTML | `src/app/components/footer/footer.component.html` |
| SCSS | `src/app/components/footer/footer.component.scss` |
| PR | _TBD_ |
| Jira | _TBD_ |

---

# Feature 2: CX Solutions Page Motion & Scroll Reveal

## 1. Feature Name

**CX Solutions Page Animation System**

## 2. Description

| Item | Detail |
|------|--------|
| **What it does** | Adds entrance and scroll-triggered animations across the `/cx-solutions` marketing page. |
| **Problem solved** | Long, static page lacked visual hierarchy; sections appeared abruptly on scroll. |
| **Primary users** | Prospects and customers evaluating DIOnce CX offerings. |
| **Consumers** | End users only. |

### Key technical decisions & trade-offs

| Decision | Rationale |
|----------|-----------|
| CSS for hero load | Better performance; no JS required for first paint |
| `IntersectionObserver` for scroll reveal | Efficient vs scroll listeners; unobserve after reveal |
| Selector-based reveal in TS | Avoids editing 700+ lines of HTML |
| CSS variable `--cx-reveal-delay` | Stagger without inline styles per element |
| `prefers-reduced-motion` | Accessibility — disables motion for sensitive users |
| Keep existing trace animation | Agent trace line-by-line reveal already implemented |

## 3. Scope of Work (by function)

### Frontend

| Area | Details |
|------|---------|
| **Files modified** | `cx-solutions.component.ts`, `_cx-solutions-styles.scss` |
| **Hero animations (page load)** | Staggered fade-up (eyebrow → stats); trace panel slide-in; grid background drift; 3D iso stack float |
| **Scroll reveal** | Sections fade up when entering viewport |
| **Animated elements** | Eyebrows, H2, ledes, pillars, use-case cards, platform steps, knowledge blocks, channels, integrations, reliability/trust features, proof cards, FAQ items, 24/7 hours bar |
| **Hours bar** | 24 bars pop in left-to-right when section is visible |
| **Libraries** | Angular core (`ElementRef`, `PLATFORM_ID`, `isPlatformBrowser`); native `IntersectionObserver` |

### Backend

None.

### Data Science

N/A.

## 4. API Contracts

**Not applicable** — client-side UI only.

## 5. Dependencies & Integrations

- Browser: `IntersectionObserver`, `prefers-reduced-motion` media query
- SSR-safe: scroll logic gated with `isPlatformBrowser`
- Does not affect: routing, SEO meta tags, FAQ accordion toggle logic

## 6. Future Scope

| Category | Items |
|----------|-------|
| **Limitations** | Reveal targets maintained via TS selector list; new layouts need selector updates |
| **Planned improvements** | Hero electric border (auto-loop or hover); knowledge graph SVG flow animation; shared `ScrollAnimationService`; animated stat counters on proof section |
| **Out of scope** | Backend APIs, animation analytics, CMS-driven animation config |

## 7. Links

| Resource | Path / URL |
|----------|------------|
| Component TS | `src/app/pages/cx-solutions/cx-solutions.component.ts` |
| Styles | `src/app/pages/cx-solutions/_cx-solutions-styles.scss` |
| Template | `src/app/pages/cx-solutions/cx-solutions.component.html` |
| Live route | `/cx-solutions` |
| PR | _TBD_ |
| Jira | _TBD_ |

---

# Maintenance: Git Merge Conflict Resolution

## Context

`git pull origin CWP_SLM_04` produced a conflict in `footer.component.html`.

## Conflict

Copyright line in the footer bar:

| Version | Content |
|---------|---------|
| **Local (HEAD)** | Styled © mark + `DIOnce` |
| **Remote** | Plain © + `DIOnce.AI` |

## Resolution

```html
<span class="site-foot__copy">
  <span class="site-foot__copy-mark" aria-hidden="true">©</span>
  {{ currentYear }} DIOnce.AI. All rights reserved.
</span>
```

## Follow-up

Complete merge if not already done:

```bash
git commit -m "Merge branch CWP_SLM_04 — resolve footer copyright conflict"
```

---

# Quick Reference — Files Changed

| File | Change type |
|------|-------------|
| `src/app/components/footer/footer.component.html` | Arrow icons + merge fix |
| `src/app/components/footer/footer.component.scss` | Icon styles |
| `src/app/pages/cx-solutions/cx-solutions.component.ts` | Scroll reveal observer |
| `src/app/pages/cx-solutions/_cx-solutions-styles.scss` | Hero + scroll animations |

---

# Test Checklist

- [ ] Footer CTAs show arrow icons on desktop and mobile
- [ ] Footer links navigate to `/contact` and `/cx-solutions#demo`
- [ ] `/cx-solutions` hero animates on first load
- [ ] Sections reveal smoothly on scroll
- [ ] 24/7 hours bar animates when scrolled into view
- [ ] Animations disabled when OS “Reduce motion” is on
- [ ] No console errors on page load
- [ ] Footer shows `DIOnce.AI` in copyright line
