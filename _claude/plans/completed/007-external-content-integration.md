# External Content Integration — Real Testimonials & Stories

**Created:** 2026-03-15
**Status:** Draft
**Related PRD:** N/A
**Refinements:** 1

## Executive Summary

Replace all fabricated placeholder content with real testimonials and stories provided by the client. This is **Plan C** — the third and final plan in the content update series (A: text swaps [Plan 005], B: layout/design changes [Plan 006], C: external content). Real graduate, mentor, mentorship, and partner testimonials replace fabricated alumni stories (Marcus, Aisha, DeShawn) and the fabricated mentor quote (Priya) across the site. The Community Voices carousel is expanded to 8-10 real voices, mentorship pairing testimonials are added to the Get Involved page, and partner testimonials are added to both the Programs and Get Involved pages.

## Current State

- **Plans A (005) and B (006) completed** — text swaps, layout changes, carousel, impact page all done
- **Fabricated content still in use:**
  - Marcus Thompson (TECK) — Home page featured story + Programs index quote
  - Aisha Williams (T.RAP) — T.RAP program page alumni story
  - DeShawn Carter (TECK) — TECK program page alumni story
  - Priya Sharma (Mentor) — Get Involved page mentor testimonial
- **Real content available** in `_claude/resources/testimonials/`:
  - `graduate.md` — 19 graduate testimonials with names, programs, years
  - `mentor.md` — 3 mentor testimonials
  - `mentorship.md` — 8 mentorship pairing/experience testimonials
  - `partners.md` — 3 partner organization testimonials
- **Community Voices carousel** has 3 real testimonials (Nashid, Dontay, Sheisty) — expanding to 8-10
- **Data layer**: `src/data/fabricated.ts` holds alumni stories and mentor profiles; `src/data/testimonials.ts` holds both real and fabricated testimonials

### Content Mapping — Fabricated → Real Replacements

| Fabricated | Used On | Real Replacement | Rationale |
|-----------|---------|------------------|-----------|
| Marcus Thompson (TECK) | Home featured story | Terrence (TECK 2023) | Detailed narrative about tech career transformation, now a junior software engineer |
| DeShawn Carter (TECK) | TECK program page | Kat (TECK 2024) | Rich story about tech skills, UX design, portfolio building — shows program depth |
| Aisha Williams (T.RAP) | T.RAP program page | Nas (T.RAP 2023) | Became a Peer Mentor running T.RAP in Staten Island — most compelling real T.RAP journey |
| Priya Sharma (Mentor) | Get Involved page | Meagan (TECK Mentor 2023 & 2024) | Detailed, warm mentor testimonial about working with Lori |

## Assumptions Made

These assumptions were made during plan creation. Challenge any that seem incorrect.

- [x] Changes are made to ROOT pages only — `/designs/` reference pages remain untouched (page files)
- [x] Data layer changes (`src/data/`) will cascade to reference pages (acceptable — they're temporary)
- [x] The developer (not Claude) will start the dev server for visual verification
- [x] Graduate testimonial text is used as-is from the client's document (quotes preserved exactly)
- [x] Stock photos currently used for fabricated alumni (portrait-7.jpg, portrait-5.jpg, etc.) will remain as placeholders until real photos are provided
- [x] The recommended real replacements (Terrence, Kat, Nas, Meagan) are confirmed as the right choices
- [x] The Community Voices carousel expands from 3 to 8-10 testimonials
- [x] Partner testimonials are added to both the Programs page and the Get Involved page

## Open Questions & Decisions

### Blocking (must resolve before implementation)

- [x] **Alumni story format handling** [DECIDED: 2026-03-15]
  The fabricated alumni stories have a detailed narrative structure (beforeSummary, journey, outcome, currentRole, quote). Real testimonials are shorter first-person quotes without this structure. How should we handle the format difference?
  > **Decision:** Adapt the page layout — simplify the alumni story sections to show a testimonial quote + name/program/year instead of the full narrative structure. Cleaner, more authentic feel.
  > **Rationale:** Real testimonials are genuine and don't need fabricated narrative framing. Simpler layout lets the real voices speak for themselves.

### Non-Blocking (can resolve during implementation)

- [x] **Carousel expansion scope** [DECIDED: 2026-03-15]
  How many testimonials should the Community Voices carousel include?
  > **Decision:** Expand to 8-10 testimonials. Show the full breadth of community impact.
  > **Rationale:** We have 19+ real testimonials available and the carousel handles any count with the fade/slide implementation.

- [x] **Mentorship pairing content placement** [DECIDED: 2026-03-15]
  Where should the 8 mentorship experience testimonials go?
  > **Decision:** Get Involved page — add to the mentor section to encourage new mentors by showing the pairing dynamic.
  > **Rationale:** These testimonials show the mentor/mentee relationship from both sides, which is most relevant to people considering becoming mentors.

- [x] **Partner testimonial placement** [DECIDED: 2026-03-15]
  Where should the 3 partner testimonials go?
  > **Decision:** Both the Programs page (partner section) and Get Involved page (partner pathway).
  > **Rationale:** Partners browsing programs see social proof; organizations browsing Get Involved see partner experiences.

## Success Criteria

- [x] Marcus fabricated story replaced with Terrence's real TECK testimonial on Home page
- [x] DeShawn fabricated story replaced with Kat's real TECK testimonial on TECK page
- [x] Aisha fabricated story replaced with Nas's real T.RAP testimonial on T.RAP page
- [x] Priya fabricated mentor quote replaced with Meagan's real testimonial on Get Involved page
- [x] Community Voices carousel expanded to 8-10 real testimonials
- [x] Mentorship pairing testimonials added to Get Involved page
- [x] Partner testimonials added to both Programs and Get Involved pages
- [x] Alumni story sections simplified to testimonial quote + attribution layout
- [x] Data layer updated: new real testimonials added, fabricated flags removed from replaced content
- [x] All fabricated alumni stories (Marcus, Aisha, DeShawn) no longer appear on root pages
- [x] `npm run build` succeeds with no errors
- [x] Visual verification via Playwright confirms all replacements render correctly

## Implementation Plan

### Phase 1: Update Data Layer with Real Testimonials

**Estimated Time:** 2 hours

#### Tasks
- [x] Add real graduate testimonials to `src/data/testimonials.ts`:
  - [x] Add Terrence (TECK 2023) with full testimonial text
  - [x] Add Kat (TECK 2024) with full testimonial text
  - [x] Add Nas (T.RAP 2023) with full testimonial text
  - [x] Add 5-7 additional graduates for carousel expansion (e.g., Makeda, Maria, Wayne, Alberto, Natasha, Crystal, Lori)
  - [x] All new entries: no `fabricated` flag
- [x] Add real mentor testimonials to `src/data/testimonials.ts`:
  - [x] Add Meagan (TECK Mentor 2023 & 2024)
  - [x] Add Dawn (TECK Mentor 2024)
  - [x] Add Melissa (TECK Mentor 2023 & 2024)
- [x] Add mentorship pairing testimonials to `src/data/testimonials.ts`:
  - [x] Add 3-4 selected mentorship pairings (e.g., Alberto/Dylan, Voice/Baraka, Lori/Meagan, Kat/Sneha)
- [x] Add partner testimonials to `src/data/partners.ts` or new export:
  - [x] Add Workforce 1 Harlem testimonial
  - [x] Add Center for Community Alternatives testimonial
  - [x] Add Staten Island Justice Center testimonial
- [x] Update `src/data/fabricated.ts`:
  - [x] Mark replaced alumni stories as deprecated or remove from active exports
  - [x] Keep fabricated.ts file intact for reference pages that still import from it

#### Test Verification
- [x] All new testimonials export correctly with no TypeScript errors
- [x] `npm run build` succeeds

---

### Phase 2: Replace Fabricated Alumni Stories on Pages

**Estimated Time:** 3 hours

#### Tasks
- [x] **Home page** (`src/pages/index.astro`):
  - [x] Replace Marcus featured story section with Terrence's testimonial
  - [x] Simplify the featured story layout: large quote + name/program/year attribution (not narrative structure)
  - [x] Update the stock photo alt text to "Terrence"
  - [x] Update imports to use real testimonial data instead of fabricated alumniStories
- [x] **TECK program page** (`src/pages/programs/teck.astro`):
  - [x] Replace DeShawn alumni story with Kat's testimonial
  - [x] Simplify the story section to testimonial quote + attribution layout
  - [x] Update name, quote, and attribution
- [x] **T.RAP program page** (`src/pages/programs/trap.astro`):
  - [x] Replace Aisha alumni story with Nas's testimonial
  - [x] Simplify the story section to testimonial quote + attribution layout
  - [x] Update name, quote, and attribution
- [x] **Programs index page** (`src/pages/programs/index.astro`):
  - [x] Update the dynamic story matching to use real testimonials instead of fabricated alumniStories
  - [x] Ensure program card quotes show real graduate quotes

#### Test Verification
- [x] No references to "Marcus Thompson", "Aisha Williams", or "DeShawn Carter" in root page rendered content
- [x] All alumni story sections show real graduate content in simplified layout
- [x] `npm run build` succeeds

---

### Phase 3: Mentor, Carousel, Mentorship & Partner Updates

**Estimated Time:** 3 hours

#### Tasks
- [x] **Get Involved page** (`src/pages/get-involved.astro`):
  - [x] Replace Priya's fabricated mentor quote with Meagan's real testimonial
  - [x] Update the mentor name, attribution, and quote text
  - [x] Update the stock photo alt text
  - [x] Add mentorship pairing testimonials section — show 2-3 mentor/mentee pair quotes to encourage new mentors
  - [x] Add partner testimonials to the partner pathway section
- [x] **Community Voices carousel** (`src/pages/index.astro`):
  - [x] Expand carousel from 3 to 8-10 testimonials
  - [x] Add real graduate testimonials as new carousel slides (use shorter quotes for carousel)
  - [x] Ensure carousel JS handles the additional slides correctly
  - [x] Verify dot navigation updates for new slide count
- [x] **Programs page partner section** (`src/pages/programs/index.astro`):
  - [x] Add partner testimonials below the partner program descriptions
  - [x] Style as editorial quote cards consistent with existing design

#### Test Verification
- [x] No reference to "Priya" in root pages
- [x] Carousel shows 8-10 testimonials with working navigation
- [x] Mentorship pairing content visible on Get Involved page
- [x] Partner testimonials visible on both Programs and Get Involved pages
- [x] `npm run build` succeeds

---

### Phase 4: Build Verification & Visual Testing

**Estimated Time:** 1 hour

**IMPORTANT:** The developer will start the dev server before visual testing begins. Claude must NOT start or stop the dev server.

#### Build Verification
- [x] Run `npm run build` and verify clean build with 57 pages
- [x] Grep for fabricated names: "Marcus Thompson", "Aisha Williams", "DeShawn Carter", "Priya Sharma" → 0 results in root pages
- [x] Verify `/designs/` reference page files are untouched

#### Visual Verification with Playwright
- [x] Ask the developer to start the dev server and confirm it is running
- [x] **Home** (`/`): Verify featured story shows Terrence (not Marcus). Verify carousel has 8-10 slides with working navigation.
- [x] **Programs/TECK** (`/programs/teck/`): Verify alumni story shows Kat (not DeShawn)
- [x] **Programs/T.RAP** (`/programs/trap/`): Verify alumni story shows Nas (not Aisha)
- [x] **Get Involved** (`/get-involved/`): Verify Meagan's mentor testimonial (not Priya). Verify mentorship pairing section. Verify partner testimonials.
- [x] **Programs** (`/programs/`): Verify partner testimonials in partner section. Verify program card quotes use real content.

---

## Rollback Plan

1. Data layer changes revert via git: `git checkout HEAD -- src/data/`
2. Page changes revert via git: `git checkout HEAD -- src/pages/index.astro src/pages/get-involved.astro src/pages/programs/`
3. `/designs/` reference page files are not modified
4. Single `git checkout HEAD -- src/` reverts all changes

## Dependencies

- [x] Plan A (005) completed — text/content swaps in place
- [x] Plan B (006) completed — layout/design changes in place
- [x] Real testimonial content available in `_claude/resources/testimonials/`
- [x] Playwright MCP server available for visual testing
- [x] All blocking questions resolved
- [x] Developer available to start dev server for Phase 4

## Success Metrics

(To be filled in after implementation)

- [x] All fabricated alumni stories replaced with real content
- [x] Fabricated mentor quote replaced
- [x] Carousel expanded to 8-10 real testimonials
- [x] Mentorship pairings added to Get Involved
- [x] Partner testimonials on both Programs and Get Involved
- [x] Build succeeds with no errors
- [x] Visual verification passes

---

## Refinement History

**Refinements:**
- 2026-03-15: Resolved 4 questions via interactive Q&A (1 blocking, 3 non-blocking). Decided: adapt page layouts for simpler testimonial format, expand carousel to 8-10, mentorship pairings on Get Involved page, partner testimonials on both Programs and Get Involved pages.
- 2026-03-16: Resolved carousel UX issues — fixed Community Voices carousel fade transition (removed position:relative swap causing layout reflow), added dynamic height sizing via JS for both carousels, expanded mentorship pairings from 2 to all 8, converted pairings section to responsive carousel (2 per page desktop, 1 per page mobile with bottom nav bar)

---

## Implementation Notes

**Actual Time Tracking:**
- Phase 1: [Estimated: 2 hours] (Actual: Complete)
- Phase 2: [Estimated: 3 hours] (Actual: Complete)
- Phase 3: [Estimated: 3 hours] (Actual: Complete)
- Phase 4: [Estimated: 1 hour] (Actual: Complete)
- **Total Estimated: 9 hours**

**Key Decisions:**
- Alumni story format: Adapt page layouts to simpler testimonial quote + attribution (no narrative wrappers)
- Carousel: Expand to 8-10 testimonials
- Mentorship pairings: Get Involved page
- Partner testimonials: Both Programs and Get Involved pages
- Replacements: Terrence (Home), Kat (TECK), Nas (T.RAP), Meagan (mentor)
- Carousel height: Dynamic JS measurement of tallest slide (no fixed min-height)
- Mentorship pairings: All 8 shown in carousel format, 2 per page desktop, 1 per page mobile
- Mobile carousel nav: Arrows move below content into a compact nav bar with dots

**Items Deferred:**
- Army's "Our Journey" timeline milestones — not available
- Team bios for Army, Tine, LaQuan, Nasiar — no replacements provided
- Pull quote "We don't just talk about reentry..." on About page — needs client approval

**Assumptions Validated:**
- [x] All assumptions validated during implementation

**Lessons Learned:**
- TBD during implementation
