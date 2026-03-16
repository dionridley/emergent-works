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

- [ ] Marcus fabricated story replaced with Terrence's real TECK testimonial on Home page
- [ ] DeShawn fabricated story replaced with Kat's real TECK testimonial on TECK page
- [ ] Aisha fabricated story replaced with Nas's real T.RAP testimonial on T.RAP page
- [ ] Priya fabricated mentor quote replaced with Meagan's real testimonial on Get Involved page
- [ ] Community Voices carousel expanded to 8-10 real testimonials
- [ ] Mentorship pairing testimonials added to Get Involved page
- [ ] Partner testimonials added to both Programs and Get Involved pages
- [ ] Alumni story sections simplified to testimonial quote + attribution layout
- [ ] Data layer updated: new real testimonials added, fabricated flags removed from replaced content
- [ ] All fabricated alumni stories (Marcus, Aisha, DeShawn) no longer appear on root pages
- [ ] `npm run build` succeeds with no errors
- [ ] Visual verification via Playwright confirms all replacements render correctly

## Implementation Plan

### Phase 1: Update Data Layer with Real Testimonials

**Estimated Time:** 2 hours

#### Tasks
- [ ] Add real graduate testimonials to `src/data/testimonials.ts`:
  - [ ] Add Terrence (TECK 2023) with full testimonial text
  - [ ] Add Kat (TECK 2024) with full testimonial text
  - [ ] Add Nas (T.RAP 2023) with full testimonial text
  - [ ] Add 5-7 additional graduates for carousel expansion (e.g., Makeda, Maria, Wayne, Alberto, Natasha, Crystal, Lori)
  - [ ] All new entries: no `fabricated` flag
- [ ] Add real mentor testimonials to `src/data/testimonials.ts`:
  - [ ] Add Meagan (TECK Mentor 2023 & 2024)
  - [ ] Add Dawn (TECK Mentor 2024)
  - [ ] Add Melissa (TECK Mentor 2023 & 2024)
- [ ] Add mentorship pairing testimonials to `src/data/testimonials.ts`:
  - [ ] Add 3-4 selected mentorship pairings (e.g., Alberto/Dylan, Voice/Baraka, Lori/Meagan, Kat/Sneha)
- [ ] Add partner testimonials to `src/data/partners.ts` or new export:
  - [ ] Add Workforce 1 Harlem testimonial
  - [ ] Add Center for Community Alternatives testimonial
  - [ ] Add Staten Island Justice Center testimonial
- [ ] Update `src/data/fabricated.ts`:
  - [ ] Mark replaced alumni stories as deprecated or remove from active exports
  - [ ] Keep fabricated.ts file intact for reference pages that still import from it

#### Test Verification
- [ ] All new testimonials export correctly with no TypeScript errors
- [ ] `npm run build` succeeds

---

### Phase 2: Replace Fabricated Alumni Stories on Pages

**Estimated Time:** 3 hours

#### Tasks
- [ ] **Home page** (`src/pages/index.astro`):
  - [ ] Replace Marcus featured story section with Terrence's testimonial
  - [ ] Simplify the featured story layout: large quote + name/program/year attribution (not narrative structure)
  - [ ] Update the stock photo alt text to "Terrence"
  - [ ] Update imports to use real testimonial data instead of fabricated alumniStories
- [ ] **TECK program page** (`src/pages/programs/teck.astro`):
  - [ ] Replace DeShawn alumni story with Kat's testimonial
  - [ ] Simplify the story section to testimonial quote + attribution layout
  - [ ] Update name, quote, and attribution
- [ ] **T.RAP program page** (`src/pages/programs/trap.astro`):
  - [ ] Replace Aisha alumni story with Nas's testimonial
  - [ ] Simplify the story section to testimonial quote + attribution layout
  - [ ] Update name, quote, and attribution
- [ ] **Programs index page** (`src/pages/programs/index.astro`):
  - [ ] Update the dynamic story matching to use real testimonials instead of fabricated alumniStories
  - [ ] Ensure program card quotes show real graduate quotes

#### Test Verification
- [ ] No references to "Marcus Thompson", "Aisha Williams", or "DeShawn Carter" in root page rendered content
- [ ] All alumni story sections show real graduate content in simplified layout
- [ ] `npm run build` succeeds

---

### Phase 3: Mentor, Carousel, Mentorship & Partner Updates

**Estimated Time:** 3 hours

#### Tasks
- [ ] **Get Involved page** (`src/pages/get-involved.astro`):
  - [ ] Replace Priya's fabricated mentor quote with Meagan's real testimonial
  - [ ] Update the mentor name, attribution, and quote text
  - [ ] Update the stock photo alt text
  - [ ] Add mentorship pairing testimonials section — show 2-3 mentor/mentee pair quotes to encourage new mentors
  - [ ] Add partner testimonials to the partner pathway section
- [ ] **Community Voices carousel** (`src/pages/index.astro`):
  - [ ] Expand carousel from 3 to 8-10 testimonials
  - [ ] Add real graduate testimonials as new carousel slides (use shorter quotes for carousel)
  - [ ] Ensure carousel JS handles the additional slides correctly
  - [ ] Verify dot navigation updates for new slide count
- [ ] **Programs page partner section** (`src/pages/programs/index.astro`):
  - [ ] Add partner testimonials below the partner program descriptions
  - [ ] Style as editorial quote cards consistent with existing design

#### Test Verification
- [ ] No reference to "Priya" in root pages
- [ ] Carousel shows 8-10 testimonials with working navigation
- [ ] Mentorship pairing content visible on Get Involved page
- [ ] Partner testimonials visible on both Programs and Get Involved pages
- [ ] `npm run build` succeeds

---

### Phase 4: Build Verification & Visual Testing

**Estimated Time:** 1 hour

**IMPORTANT:** The developer will start the dev server before visual testing begins. Claude must NOT start or stop the dev server.

#### Build Verification
- [ ] Run `npm run build` and verify clean build with 57 pages
- [ ] Grep for fabricated names: "Marcus Thompson", "Aisha Williams", "DeShawn Carter", "Priya Sharma" → 0 results in root pages
- [ ] Verify `/designs/` reference page files are untouched

#### Visual Verification with Playwright
- [ ] Ask the developer to start the dev server and confirm it is running
- [ ] **Home** (`/`): Verify featured story shows Terrence (not Marcus). Verify carousel has 8-10 slides with working navigation.
- [ ] **Programs/TECK** (`/programs/teck/`): Verify alumni story shows Kat (not DeShawn)
- [ ] **Programs/T.RAP** (`/programs/trap/`): Verify alumni story shows Nas (not Aisha)
- [ ] **Get Involved** (`/get-involved/`): Verify Meagan's mentor testimonial (not Priya). Verify mentorship pairing section. Verify partner testimonials.
- [ ] **Programs** (`/programs/`): Verify partner testimonials in partner section. Verify program card quotes use real content.

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
- [ ] Developer available to start dev server for Phase 4

## Success Metrics

(To be filled in after implementation)

- [ ] All fabricated alumni stories replaced with real content
- [ ] Fabricated mentor quote replaced
- [ ] Carousel expanded to 8-10 real testimonials
- [ ] Mentorship pairings added to Get Involved
- [ ] Partner testimonials on both Programs and Get Involved
- [ ] Build succeeds with no errors
- [ ] Visual verification passes

---

## Refinement History

**Refinements:**
- 2026-03-15: Resolved 4 questions via interactive Q&A (1 blocking, 3 non-blocking). Decided: adapt page layouts for simpler testimonial format, expand carousel to 8-10, mentorship pairings on Get Involved page, partner testimonials on both Programs and Get Involved pages.

---

## Implementation Notes

**Actual Time Tracking:**
- Phase 1: [Estimated: 2 hours] (Actual: TBD)
- Phase 2: [Estimated: 3 hours] (Actual: TBD)
- Phase 3: [Estimated: 3 hours] (Actual: TBD)
- Phase 4: [Estimated: 1 hour] (Actual: TBD)
- **Total Estimated: 9 hours**

**Key Decisions:**
- Alumni story format: Adapt page layouts to simpler testimonial quote + attribution (no narrative wrappers)
- Carousel: Expand to 8-10 testimonials
- Mentorship pairings: Get Involved page
- Partner testimonials: Both Programs and Get Involved pages
- Replacements: Terrence (Home), Kat (TECK), Nas (T.RAP), Meagan (mentor)

**Items Deferred:**
- Army's "Our Journey" timeline milestones — not available
- Team bios for Army, Tine, LaQuan, Nasiar — no replacements provided
- Pull quote "We don't just talk about reentry..." on About page — needs client approval

**Assumptions Validated:**
- [ ] TBD during implementation

**Lessons Learned:**
- TBD during implementation
