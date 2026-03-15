# Promote "Stories" Design to Root Site

**Created:** 2026-03-15
**Status:** Draft
**Related PRD:** N/A
**Refinements:** 2

## Executive Summary

Promote the client-selected "Stories" design from `/designs/stories/` to the root of the Emergent Works website. This replaces the original 7 placeholder pages with the editorial/magazine-style Stories design while preserving all `/designs/` pages (including the original Stories) as internal reference. The root site will serve the Stories layout, header, footer, and all 7 content pages at clean root-level URLs.

## Current State

- **7 original root pages** exist: `/`, `/about-us`, `/programs`, `/our-team`, `/impact`, `/partner-with-us`, `/donate`
- **Stories design** lives at `/designs/stories/` with 8 pages (7 content + 1 summary)
- Stories has its own layout (`StoriesLayout.astro`), Header, Footer, and `--st-` CSS namespace
- Stories imports fonts via Google Fonts in the layout `<head>` (Outfit, Plus Jakarta Sans, Cormorant Garamond)
- The original root pages use `BaseLayout.astro` with a separate Header/Footer and different component set
- **47 hardcoded `/designs/stories/` path references** exist across 10 files (8 pages + Header + Footer)
- The shared data layer in `src/data/` is used by both the original site and the Stories design
- The `/designs/index.astro` gallery page links to all 6 designs

## Assumptions Made

These assumptions were made during plan creation. Challenge any that seem incorrect.

- [x] The Stories design pages will be **duplicated** to root (not moved), keeping `/designs/stories/` intact as reference
- [x] The original root pages (`index.astro`, `about-us.astro`, `programs.astro`, `our-team.astro`, `impact.astro`, `partner-with-us.astro`, `donate.astro`) will be deleted — they are placeholder pages being replaced
- [x] The original `BaseLayout.astro`, root-level `Header.astro`, `Footer.astro`, and other original components remain in place (they may still be used by `/designs/` pages from other design variants)
- [x] The Stories `summary.astro` page will NOT be promoted to root — it's a development reference page
- [x] The `/designs/index.astro` gallery page stays as-is (hidden internal reference, no public link to it)
- [x] The `--st-` CSS namespace is preserved in the promoted pages to avoid any refactoring risk
- [x] The developer (not Claude) will start the dev server for visual verification — Claude should never start or stop dev/preview servers
- [x] The root URL structure uses Stories naming (`/about`, `/team`, `/get-involved`) — cleaner, shorter URLs with no SEO redirect concerns
- [x] The StoriesLayout, Header, and Footer will be **copied to top-level directories** (`src/layouts/`, `src/components/`) for the root pages, while the `/designs/stories/` reference pages keep their original copies

## Open Questions & Decisions

### Blocking (must resolve before implementation)

- [x] **Root URL structure** [DECIDED: 2026-03-15]
  The Stories design uses `/about`, `/team`, `/get-involved` while the original site used `/about-us`, `/our-team`, `/partner-with-us`, `/donate`. Which URL scheme should the promoted root site use?
  > **Decision:** Use Stories naming (`/about`, `/team`, `/get-involved`)
  > **Rationale:** Cleaner, shorter URLs. The client hasn't seen the original URLs publicly so there are no SEO redirects needed.

- [x] **Component and layout file locations** [DECIDED: 2026-03-15]
  Should the promoted root pages import components/layouts from their current `designs/stories/` locations, or should we copy them to top-level directories?
  > **Decision:** Copy to top level — duplicate `StoriesLayout.astro` → `src/layouts/`, Header/Footer → `src/components/`. The `/designs/stories/` reference pages keep their original copies.
  > **Rationale:** Cleaner imports for production root pages. The slight maintenance cost of two copies is acceptable since the `/designs/stories/` pages are frozen reference copies that won't change.

### Non-Blocking (can resolve during implementation)

- [x] **SEO meta tags** [DECIDED: 2026-03-15]
  The original `BaseLayout.astro` uses `astro-seo` for meta tags. `StoriesLayout.astro` has basic `<title>` and `<meta name="description">` but doesn't use `astro-seo`. Should we add `astro-seo` to the promoted pages?
  > **Decision:** Add `astro-seo` now, integrated into the promoted StoriesLayout. The layout provides sensible defaults (site name, default OG image, etc.) while each page can override title, description, OG tags via props. This keeps per-page boilerplate minimal — pages just pass `title` and `description` props, and the layout handles the rest.
  > **Rationale:** Proper SEO is important for the live site. `astro-seo` already supports per-page customization via props — no need for a custom wrapper.

- [x] **Sitemap configuration** [DECIDED: 2026-03-15]
  The `@astrojs/sitemap` integration generates a sitemap for all pages. After promotion, both `/designs/stories/about/` and `/about/` will exist with similar content. Should we exclude `/designs/*` paths from the sitemap?
  > **Decision:** Exclude `/designs/*` paths from the sitemap.
  > **Rationale:** Design reference pages are internal only. Preventing duplicate content in the sitemap is best practice.

- [x] **Original component cleanup** [DECIDED: 2026-03-15]
  After promotion, the original root-level components (`Button.astro`, `Section.astro`, `HeroSection.astro`, `ProgramCard.astro`, etc.) may be unused if no other design references them. Should we clean them up now or defer?
  > **Decision:** Defer cleanup. Leave original components in place for now.
  > **Rationale:** They may still be used by other design variants under `/designs/`. Clean up in a separate plan later when the design reference pages are removed.

## Success Criteria

- [ ] Root site (`/`, `/about`, `/programs`, `/programs/teck`, `/programs/trap`, `/team`, `/get-involved`) serves the Stories design
- [ ] All internal navigation links on the root Stories pages use root-level paths (no `/designs/stories/` references)
- [ ] The `/designs/stories/` pages remain fully functional with their original `/designs/stories/` paths
- [ ] All other `/designs/{name}/` pages remain fully functional
- [ ] The `/designs` gallery index page remains accessible
- [ ] The original 7 root pages are removed
- [ ] `npm run build` succeeds with no errors
- [ ] No CSS or component leakage between root Stories pages and the remaining design reference pages
- [ ] `astro-seo` integrated into promoted layout with per-page customization via props
- [ ] `/designs/*` paths excluded from sitemap
- [ ] Visual verification via Playwright confirms all root pages render correctly with expected content, navigation, and styling

## Implementation Plan

### Phase 1: Copy Layout & Components to Top Level

**Estimated Time:** 1 hour

#### Tasks
- [ ] Copy `src/layouts/designs/StoriesLayout.astro` → `src/layouts/StoriesLayout.astro`
  - [ ] Update the copy to integrate `astro-seo`: replace basic `<title>` and `<meta>` with the `<SEO>` component from `astro-seo`
  - [ ] Add layout props for SEO customization: `title`, `description`, `ogImage`, `noindex` (with sensible defaults for Emergent Works — site name, default description, etc.)
  - [ ] Keep the `--st-` CSS namespace, fonts, and all existing styles intact
- [ ] Copy `src/components/designs/stories/Header.astro` → `src/components/StoriesHeader.astro`
  - [ ] Update the `navLinks` array: replace `/designs/stories/` prefix with `/` for all links
  - [ ] Update the donate button link to `/get-involved/#donate`
- [ ] Copy `src/components/designs/stories/Footer.astro` → `src/components/StoriesFooter.astro`
  - [ ] Update all footer nav links: replace `/designs/stories/` prefix with `/`

#### Test Verification
- [ ] New layout and components exist at top-level locations
- [ ] No `/designs/stories/` path references in the new header or footer
- [ ] `astro-seo` import resolves (package already installed in project)

---

### Phase 2: Create Root Pages from Stories Design

**Estimated Time:** 2 hours

#### Tasks
- [ ] Create new root pages by adapting the Stories design pages:
  - [ ] `src/pages/index.astro` — adapted from `src/pages/designs/stories/index.astro`
  - [ ] `src/pages/about.astro` — adapted from `src/pages/designs/stories/about.astro`
  - [ ] `src/pages/programs/index.astro` — adapted from `src/pages/designs/stories/programs/index.astro`
  - [ ] `src/pages/programs/teck.astro` — adapted from `src/pages/designs/stories/programs/teck.astro`
  - [ ] `src/pages/programs/trap.astro` — adapted from `src/pages/designs/stories/programs/trap.astro`
  - [ ] `src/pages/team.astro` — adapted from `src/pages/designs/stories/team.astro`
  - [ ] `src/pages/get-involved.astro` — adapted from `src/pages/designs/stories/get-involved.astro`
- [ ] Update all import paths in the new root pages:
  - [ ] Layout: `import StoriesLayout from "../layouts/StoriesLayout.astro"`
  - [ ] Header: `import Header from "../components/StoriesHeader.astro"`
  - [ ] Footer: `import Footer from "../components/StoriesFooter.astro"`
  - [ ] Data imports: adjust relative paths from `src/data/` as needed
- [ ] Update all internal links in the new root pages: replace `/designs/stories/` prefix with `/` (e.g., `/designs/stories/about/` → `/about/`)
- [ ] Pass appropriate `title` and `description` props to the layout for each page's SEO

#### Test Verification
- [ ] Each new root page renders without import errors
- [ ] All internal links on root pages use root-level paths
- [ ] No references to `/designs/stories/` exist in the new root page files
- [ ] SEO meta tags render correctly in page source

---

### Phase 3: Remove Original Root Pages & Configure Sitemap

**Estimated Time:** 0.5 hours

#### Tasks
- [ ] Delete original root pages that are being replaced:
  - [ ] `src/pages/index.astro` (replaced in Phase 2)
  - [ ] `src/pages/about-us.astro`
  - [ ] `src/pages/programs.astro`
  - [ ] `src/pages/our-team.astro`
  - [ ] `src/pages/impact.astro`
  - [ ] `src/pages/partner-with-us.astro`
  - [ ] `src/pages/donate.astro`
- [ ] Update sitemap configuration in `astro.config.mjs` to exclude `/designs/*` paths from the generated sitemap

**Note:** Phase 2 creates the new `src/pages/index.astro` first. The old one must be removed before or as part of the Phase 2 write. The other 6 original pages have different filenames than the new Stories pages, so they won't conflict — they just need to be cleaned up.

#### Test Verification
- [ ] No orphaned routes exist from the old site (e.g., `/about-us` should 404)
- [ ] `npm run build` succeeds
- [ ] Only the intended routes are generated
- [ ] Sitemap output does not include `/designs/*` paths

---

### Phase 4: Build Verification & Cleanup

**Estimated Time:** 0.5 hours

#### Tasks
- [ ] Run `npm run build` and verify clean build
- [ ] Verify total page count is correct:
  - 7 new root pages
  - 49 design reference pages (6 designs × 8 pages + 1 gallery index)
  - = 57 total pages expected
- [ ] Verify the `/designs/stories/` pages still work with their original `/designs/stories/` internal links
- [ ] Verify no `/designs/stories/` path references leaked into the root pages (grep check)
- [ ] Verify the `/designs` gallery index still loads correctly

#### Test Verification
- [ ] `npm run build` succeeds with expected page count
- [ ] Grep for `/designs/stories/` in `src/pages/*.astro` and `src/pages/programs/*.astro` returns 0 results
- [ ] Grep for `/designs/stories/` in `src/components/StoriesHeader.astro` and `src/components/StoriesFooter.astro` returns 0 results

---

### Phase 5: Visual Verification with Playwright

**Estimated Time:** 1 hour

**IMPORTANT:** The developer will start the dev server before this phase begins. Claude must NOT start or stop the dev server. At the start of this phase, ask the developer to start the server and confirm it is running (e.g., `npm run dev` at `localhost:4321`) before proceeding with any Playwright navigation.

#### Pre-Flight
- [ ] Ask the developer to start the dev server and wait for confirmation that it is running
- [ ] Verify the server is accessible by navigating to `http://localhost:4321/` with Playwright

#### Root Pages — Visual Checks
For each of the 7 root pages, navigate via Playwright, take a screenshot, and verify:

- [ ] **Home** (`/`) — Hero section renders with community photo, featured story section visible, programs section shows "Two Pathways", community voices section present, CTA section at bottom
- [ ] **About** (`/about`) — Origin story narrative renders, mission section visible, staff composition stats present, approach pillars section loads
- [ ] **Programs Overview** (`/programs/`) — Program cards for T.RAP and TECK render, editorial layout with asymmetric grids, partner programs section visible
- [ ] **Programs/TECK** (`/programs/teck/`) — TECK detail page renders with curriculum, testimonials, enrollment CTA
- [ ] **Programs/T.RAP** (`/programs/trap/`) — T.RAP detail page renders with curriculum phases, studio imagery, milestone progression
- [ ] **Team** (`/team/`) — Staff grid with circular photos renders, board and advisory sections present
- [ ] **Get Involved** (`/get-involved/`) — Mentor section visible, donation tiers render, contact information present

#### Navigation Verification
- [ ] Click through header nav links on the home page — each link navigates to the correct root page (not `/designs/stories/`)
- [ ] Click through footer nav links — each resolves to root-level pages
- [ ] Verify the "Donate" button in the header navigates to `/get-involved/#donate`
- [ ] Test mobile navigation: resize browser to mobile width, open hamburger menu, verify links work

#### Reference Pages — Spot Check
- [ ] Navigate to `/designs/stories/` — verify it still renders correctly with its own `/designs/stories/` internal links
- [ ] Navigate to `/designs/` — verify the gallery index page still loads with all 6 design links
- [ ] Spot-check one other design (e.g., `/designs/impact-first/`) — verify it still renders independently

#### Visual Comparison
- [ ] Compare root home page (`/`) side-by-side with reference (`/designs/stories/`) — content and layout should be visually identical (only URLs differ)
- [ ] Verify Cormorant Garamond serif font loads correctly on root pages (check pull quotes, chapter markers)
- [ ] Verify no broken images on any root page
- [ ] Verify responsive layout by testing at mobile (375px), tablet (768px), and desktop (1440px) widths

---

## Rollback Plan

1. All Stories design source files remain untouched in `/designs/stories/` — they are the reference copies
2. The new root pages are net-new files that can simply be deleted
3. The copied layout/header/footer at top level can simply be deleted
4. The original root pages are tracked in git — restore with `git checkout HEAD -- src/pages/index.astro src/pages/about-us.astro src/pages/programs.astro src/pages/our-team.astro src/pages/impact.astro src/pages/partner-with-us.astro src/pages/donate.astro`
5. Revert any `astro.config.mjs` sitemap changes via git
6. No existing files are modified by this plan (only additions and deletions) except `astro.config.mjs` for sitemap exclusion

## Dependencies

- [x] Stories design fully implemented (Plan 003 — all phases complete)
- [x] Shared data layer exists in `src/data/` (created in Plan 003 Phase 1)
- [x] Stock images exist in `public/images/designs/stock/` (created in Plan 003 Phase 1)
- [x] StoriesLayout.astro and Stories components exist and are functional
- [x] `astro-seo` package installed (already used by original BaseLayout)
- [x] Playwright MCP server available for browser automation
- [x] All blocking questions resolved
- [ ] Developer available to start dev server for Phase 5

## Success Metrics

(To be filled in after implementation)

- [ ] Root site serves Stories design at all 7 routes
- [ ] Build succeeds with no errors
- [ ] All design reference pages remain functional
- [ ] Zero `/designs/stories/` path references in root pages
- [ ] `astro-seo` meta tags render on all root pages
- [ ] Sitemap excludes `/designs/*` paths
- [ ] Playwright visual verification passes for all 7 root pages
- [ ] Navigation links verified working via browser automation

---

## Refinement History

**Refinements:**
- 2026-03-15: Added Phase 5 (Visual Verification with Playwright) — browser-based testing of all root pages, navigation, reference pages, and responsive layout. Developer starts the dev server manually; Claude never starts/stops servers.
- 2026-03-15: Resolved 5 questions via interactive Q&A (2 blocking, 3 non-blocking). Decided: Stories URL naming, copy components to top level, add astro-seo, exclude /designs/* from sitemap, defer original component cleanup.

---

## Implementation Notes

**Actual Time Tracking:**
- Phase 1: [Estimated: 1 hour] (Actual: TBD)
- Phase 2: [Estimated: 2 hours] (Actual: TBD)
- Phase 3: [Estimated: 0.5 hours] (Actual: TBD)
- Phase 4: [Estimated: 0.5 hours] (Actual: TBD)
- Phase 5: [Estimated: 1 hour] (Actual: TBD)
- **Total Estimated: 5 hours**

**Key Decisions:**
- URL structure: Stories naming (`/about`, `/team`, `/get-involved`)
- File locations: Copy layout/header/footer to top-level directories
- SEO: Integrate `astro-seo` into promoted layout with per-page props
- Sitemap: Exclude `/designs/*` paths
- Cleanup: Defer original component removal to a later plan

**Assumptions Validated:**
- [ ] TBD during implementation

**Lessons Learned:**
- TBD during implementation
