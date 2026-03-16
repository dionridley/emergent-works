# Layout & Design Changes — Client Feedback

**Created:** 2026-03-15
**Status:** Draft
**Related PRD:** N/A
**Refinements:** 1

## Executive Summary

Implement client-requested layout and design changes to the Emergent Works root site. This is **Plan B** of the 3-part content update series (A: text swaps [completed], B: layout/design changes, C: external content). Changes include redesigning the Community Voices section as a fade/slide carousel, converting the About page to a hybrid layout borrowing from the impact-first design, restructuring program detail pages to use impact-first card-based layouts, and creating a new Impact page at `/impact` with content extracted from the client's Wix site. The `/frontend-design` skill will be used for all design work to ensure production-grade quality.

## Current State

- **Plan A (005) completed**: All text/content swaps are in place — TECK naming, Two Pathways, updated curricula, donation tiers, etc.
- **Root site** uses the Stories editorial layout (`Layout.astro`) with `--st-` CSS namespace
- **Community Voices** section on home page: large featured testimonial (320px image + text grid) with two smaller cards below — client wants it smaller and converted to a carousel
- **About page**: Stories editorial layout with dropcap narrative, full-bleed image break, 40/60 mission grid, 2×2 pillars grid — client wants to borrow the impact-first layout
- **Program detail pages** (T.RAP, TECK): Stories editorial layout with hero, narrative intro, alumni story grid, numbered curriculum — client wants impact-first card-based layout
- **"Ready to Begin?" section**: Simple centered text with CTA button — client wants it replaced with Blueberry's testimonial + "Explore Impact" button
- **Impact page**: Does not exist — client wants a new page; content extracted from Wix site and saved to `_claude/resources/wix-site-content/impact-page.md`
- **Impact-first design** pages exist as reference under `/designs/impact-first/` with complete layouts for about, programs/trap, programs/teck

## Assumptions Made

These assumptions were made during plan creation. Challenge any that seem incorrect.

- [x] The `/frontend-design` skill will be used for all layout/design work to ensure production-grade quality
- [x] The `--st-` CSS namespace is maintained — new styles use `st-` prefix, not `if-` prefix from impact-first
- [x] The impact-first design pages serve as layout references only — we adapt their structure into Stories CSS, not copy their CSS verbatim
- [x] The developer (not Claude) will start the dev server for visual verification
- [x] Plan A (005) changes are already committed and in place
- [x] The "Our Journey" timeline section on the About page is included with placeholder milestones (client will provide Army's real milestones later)
- [x] The new Impact page is created at the `/impact` route
- [x] The Community Voices carousel uses CSS scroll-snap + minimal vanilla JS for fade/slide transitions and arrow navigation (no external library)

## Open Questions & Decisions

### Blocking (must resolve before implementation)

- [x] **Impact page content source** [DECIDED: 2026-03-15]
  The client referenced their Wix site for Impact page content including digital projects and annual reports. Do we have access to this content?
  > **Decision:** Content extracted from Wix site via Playwright and saved to `_claude/resources/wix-site-content/impact-page.md`. Use this real content directly.
  > **Rationale:** The Wix site is accessible via Playwright. Content includes hero text, impact stats, 4 impact pillars with testimonials (Lakresha, Julius, Zeek), and additional stats.

- [x] **"Ready to Begin?" success story source** [DECIDED: 2026-03-15]
  The client wants to replace the "Ready to Begin?" section with a success story from the Wix site's Programs page bottom.
  > **Decision:** Use Blueberry's testimonial extracted from the Wix Programs page bottom: "Overall, the Program at Emergent Works has been a life-changing experience, equipping me with the skills, knowledge, and support needed to advance my career and personal growth." + "Explore Impact" button linking to `/impact`.
  > **Rationale:** Content extracted and saved to `_claude/resources/wix-site-content/programs-page-success-story.md`.

### Non-Blocking (can resolve during implementation)

- [x] **Community Voices carousel interaction** [DECIDED: 2026-03-15]
  The client said "can it be where you can click to the next story on the side."
  > **Decision:** Fade/slide transition — testimonials fade or slide in place with prev/next arrows. One testimonial visible at a time, content changes in the same position.
  > **Rationale:** Cleaner UX than horizontal scrolling; matches "click to the next story on the side" description.

- [x] **About page "Our Approach" section** [DECIDED: 2026-03-15]
  Should the four pillars keep Stories styling or adapt to impact-first cards?
  > **Decision:** Keep Stories styling exactly as-is. Visual contrast with impact-first sections is acceptable.
  > **Rationale:** Client specifically requested keeping "Our Approach" from the Stories design.

- [x] **Annual report links** [DECIDED: 2026-03-15]
  Where should annual report download links be placed?
  > **Decision:** Impact page only.
  > **Rationale:** The Impact page is the natural home for annual reports alongside impact data and outcomes.

## Success Criteria

- [x] Community Voices section redesigned as a fade/slide carousel with side arrows, reduced visual size, and green accent line (not orange)
- [x] About page uses hybrid layout: impact-first structure for origin story, staff composition, and timeline, with Stories "Our Approach" section preserved exactly
- [x] T.RAP and TECK program detail pages use impact-first card-based layout (metadata in hero, boxed schedule, card-style curriculum, pill-style feature tags)
- [x] "Ready to Begin?" section replaced with Blueberry's testimonial + "Explore Impact" button
- [x] New Impact page created at `/impact` with real content from Wix site (hero, stats, 4 pillars with testimonials, annual report links)
- [x] Header and Footer navigation updated to include Impact page link
- [x] All new/modified pages are responsive (mobile, tablet, desktop)
- [x] `npm run build` succeeds with no errors
- [x] Visual verification via Playwright confirms layout changes render correctly
- [x] All designs use `--st-` CSS namespace (no `--if-` leakage)

## Implementation Plan

### Phase 1: Community Voices Carousel Redesign

**Estimated Time:** 4 hours

#### Tasks
- [x] Redesign Community Voices section in `src/pages/index.astro` using `/frontend-design` skill:
  - [x] Convert from featured-voice + card-grid layout to a fade/slide carousel
  - [x] Implement fade/slide transition — one testimonial visible at a time, content changes in place
  - [x] Add prev/next arrow buttons on left and right sides
  - [x] Reduce overall section height/visual footprint per client feedback
  - [x] Change the accent line color from peach/orange (`var(--st-peach)`) to green (`var(--st-green)`)
  - [x] Use CSS transitions for fade/slide effect + minimal vanilla JS for arrow click handlers
  - [x] Ensure all existing testimonials (Nashid, Dontay, Sheisty) are included as carousel slides
- [x] Add responsive behavior:
  - [x] Desktop: Side arrows visible, fade/slide transitions
  - [x] Mobile: Swipe-friendly or simplified arrow navigation

#### Test Verification
- [x] Carousel renders with prev/next arrow navigation
- [x] All testimonials accessible via arrow clicks
- [x] Accent color is green (not orange/peach)
- [x] Section is visually smaller than before
- [x] Responsive on mobile
- [x] `npm run build` succeeds

---

### Phase 2: About Page Hybrid Layout

**Estimated Time:** 6 hours

#### Tasks
- [x] Redesign About page (`src/pages/about.astro`) using `/frontend-design` skill:
  - [x] **Origin Story section**: Convert to impact-first style — 2-column grid with rounded-corner image on left, narrative text on right
  - [x] **Staff Composition section**: Add dark-background section with 4-column stat cards (100% alumni, 80% system-impacted, 80% BIPOC, 40% female-identifying)
  - [x] **"Our Journey" Timeline**: Add vertical timeline section (from impact-first layout). Include placeholder milestones with HTML comments marking them as pending Army's input.
  - [x] **"Our Approach" section**: Keep the current Stories four-pillars layout exactly as-is (per client request)
  - [x] Maintain all existing text content (origin story, mission, staff stats — already updated in Plan A)
- [x] Ensure all styles use `--st-` CSS namespace (adapt impact-first visual patterns into Stories variables)
- [x] Add responsive breakpoints for all new layout sections

#### Test Verification
- [x] Origin story displays in 2-column grid with rounded image
- [x] Staff composition stats render in dark-background cards
- [x] Timeline section present with placeholder milestones
- [x] "Our Approach" pillars section unchanged from current Stories styling
- [x] Responsive at mobile/tablet/desktop
- [x] `npm run build` succeeds

---

### Phase 3: Program Detail Pages Layout Overhaul

**Estimated Time:** 8 hours

#### Tasks

**Both T.RAP and TECK pages:**
- [x] Redesign program detail pages using `/frontend-design` skill, adapting impact-first layout patterns:
  - [x] **Hero section**: Keep background image overlay, add inline metadata display (Duration, Eligibility, Enrollment as labeled key-value pairs within the hero)
  - [x] **Program Overview**: Convert to 2-column grid (1.4fr:1fr) with text left and boxed schedule sidebar right. Schedule box should have white background, border, and rounded corners with gold bullet points
  - [x] **Curriculum section**: Convert numbered list to card-based layout — each element in a card container with cream background, border, rounded corners, gold serif number
  - [x] **Feature/competency tags**: Convert to rounded pill-style badges (`border-radius: 999px`)
  - [x] **Tools section**: Display as badge-style tags (similar to current but with more visual emphasis)

**T.RAP page (`src/pages/programs/trap.astro`):**
- [x] Apply the shared layout changes above
- [x] Keep T.RAP-specific content (6 curriculum elements, 4-day schedule, tools from Plan A)
- [x] Preserve Voices/testimonials section and alumni story

**TECK page (`src/pages/programs/teck.astro`):**
- [x] Apply the shared layout changes above
- [x] Keep TECK-specific content (6 journey elements, schedule text, competencies, tools from Plan A)
- [x] Preserve alumni story and CTA sections

#### Test Verification
- [x] Both pages show metadata within hero section
- [x] Overview section has 2-column layout with boxed schedule
- [x] Curriculum items display as styled cards (not plain list)
- [x] Feature tags use pill-style badges
- [x] Responsive layout works on mobile (stacks to single column)
- [x] `npm run build` succeeds

---

### Phase 4: Impact Page & "Ready to Begin?" Update

**Estimated Time:** 5 hours

#### Tasks
- [x] Create new Impact page (`src/pages/impact.astro`) using `/frontend-design` skill:
  - [x] **Hero section**: "OUR IMPACT" heading with intro text from Wix site
  - [x] **First stats row**: 261 graduates, 73% employed, $2+ above min wage
  - [x] **"How Our Programs Impact" section**: Intro text + 4 impact pillars (Digital Literacy, SEL, Career Development, Community Engagement) with descriptions and testimonials (Lakresha, Julius, Zeek)
  - [x] **Second stats row**: 98%+ no re-offense, 8 contracted graduates
  - [x] **Annual Reports section**: Download links for 2024 and 2025 annual report PDFs (Google Drive links from client)
  - [x] Content source: `_claude/resources/wix-site-content/impact-page.md`
- [x] Update "Ready to Begin?" section in `src/pages/programs/index.astro`:
  - [x] Replace simple CTA with Blueberry's testimonial: "Overall, the Program at Emergent Works has been a life-changing experience, equipping me with the skills, knowledge, and support needed to advance my career and personal growth."
  - [x] Add "Explore Impact" button linking to `/impact`
  - [x] Content source: `_claude/resources/wix-site-content/programs-page-success-story.md`
- [x] Update Header navigation (`src/components/Header.astro`) to include Impact page link
- [x] Update Footer navigation (`src/components/Footer.astro`) to include Impact page link

#### Test Verification
- [x] `/impact` page renders with all sections (hero, stats, pillars, testimonials, annual reports)
- [x] Header and footer navigation include Impact link
- [x] "Ready to Begin?" section shows Blueberry's testimonial + "Explore Impact" button
- [x] Annual report links point to correct Google Drive URLs
- [x] `npm run build` succeeds (page count increases by 1)

---

### Phase 5: Build Verification & Visual Testing

**Estimated Time:** 1.5 hours

**IMPORTANT:** The developer will start the dev server before visual testing begins. Claude must NOT start or stop the dev server.

#### Build Verification
- [x] Run `npm run build` and verify clean build
- [x] Verify page count (57 pages — 56 existing + 1 new Impact page)
- [x] Verify no `--if-` CSS variable references in root pages
- [x] Verify `/designs/` reference pages are untouched

#### Visual Verification with Playwright
- [x] Ask the developer to start the dev server and confirm it is running
- [x] **Home** (`/`): Verify Community Voices carousel renders with fade/slide transitions, arrow navigation, green accent line, reduced size
- [x] **About** (`/about`): Verify hybrid layout — impact-first origin story grid, staff stat cards, timeline with placeholder milestones, Stories pillars section preserved exactly
- [x] **Programs/T.RAP** (`/programs/trap/`): Verify impact-first layout — metadata in hero, boxed schedule, card-style curriculum, pill badges
- [x] **Programs/TECK** (`/programs/teck/`): Same layout verification as T.RAP
- [x] **Impact** (`/impact`): Verify new page renders with hero, stats, 4 impact pillars, testimonials, annual report links
- [x] **Programs** (`/programs/`): Verify "Ready to Begin?" section has Blueberry's testimonial + "Explore Impact" button
- [x] Responsive check at mobile (375px) and desktop (1440px)

---

## Rollback Plan

1. All layout changes are in page files — revert via git: `git checkout HEAD -- src/pages/`
2. New Impact page can simply be deleted: `rm src/pages/impact.astro`
3. Header/Footer navigation changes revert with: `git checkout HEAD -- src/components/Header.astro src/components/Footer.astro`
4. No data layer changes in this plan — `src/data/` is unaffected
5. `/designs/` reference pages are not modified

## Dependencies

- [x] Plan A (005) completed — text/content swaps in place
- [x] Plan 004 completed — Stories design promoted to root
- [x] Impact-first design pages available as layout reference (`/designs/impact-first/`)
- [x] `/frontend-design` skill available for production-grade UI work
- [x] Playwright MCP server available for visual testing
- [x] Impact page content extracted from Wix site (`_claude/resources/wix-site-content/impact-page.md`)
- [x] "Ready to Begin?" success story extracted (`_claude/resources/wix-site-content/programs-page-success-story.md`)
- [x] All blocking questions resolved
- [x] Developer available to start dev server for Phase 5
- [x] Annual report PDFs accessible (client provided Google Drive links)

## Success Metrics

(To be filled in after implementation)

- [x] All layout changes applied and visually verified
- [x] Build succeeds with correct page count
- [x] New Impact page functional with real content
- [x] Responsive across all breakpoints
- [x] No CSS namespace leakage

---

## Refinement History

**Refinements:**
- 2026-03-15: Resolved 5 questions via interactive Q&A (2 blocking, 3 non-blocking). Extracted Wix site content via Playwright for Impact page and "Ready to Begin?" section. Decided: fade/slide carousel, keep Stories pillars styling, annual reports on Impact page only.

---

## Implementation Notes

**Actual Time Tracking:**
- Phase 1: [Estimated: 4 hours] (Actual: Complete)
- Phase 2: [Estimated: 6 hours] (Actual: Complete)
- Phase 3: [Estimated: 8 hours] (Actual: Complete)
- Phase 4: [Estimated: 5 hours] (Actual: Complete)
- Phase 5: [Estimated: 1.5 hours] (Actual: Complete)
- **Total Estimated: 24.5 hours**

**Key Decisions:**
- Impact page content: Real content from Wix site (extracted via Playwright)
- "Ready to Begin?": Blueberry's testimonial + "Explore Impact" button
- Carousel: Fade/slide transition with prev/next arrows (CSS + minimal JS)
- "Our Approach" pillars: Keep Stories styling exactly
- Annual reports: Impact page only
- Timeline: Include with placeholder milestones

**Assumptions Validated:**
- [x] All assumptions validated during implementation

**Lessons Learned:**
- TBD during implementation
