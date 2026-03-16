# Client Content Swaps — Text & Data Updates

**Created:** 2026-03-15
**Status:** Draft
**Related PRD:** N/A
**Refinements:** 2

## Executive Summary

Implement all client-requested text and content changes where exact replacement text was provided. This is the first of 3 plans to apply client feedback after the Stories design was promoted to the root site (Plan 004). Changes span 6 pages and the shared data layer — covering global terminology updates, program curriculum rewrites, donation tier updates, team bio corrections, and new introductory copy. No layout or design changes; no external content dependencies.

## Current State

- **Root site** serves the Stories design at 7 routes (Plan 004 completed)
- **Data layer** (`src/data/`) centralizes most content: programs, team, donations, testimonials, fabricated content
- **Some content is hardcoded** directly in page files: hero text, origin story narrative, "Ways to contribute" descriptions
- **Client change document** at `_claude/resources/requested_changes/website-redesign-20260315.md` provides exact replacement text for all items in this plan
- Content currently uses placeholder/fabricated text for curriculum, tools, schedules, and some bios

### Content Location Map

| Content | Location | Type |
|---------|----------|------|
| Program names/descriptions | `src/data/programs.ts` | Data layer |
| Curriculum, tools, schedules | `src/data/fabricated.ts` | Data layer |
| Donation tiers & amounts | `src/data/donation.ts` | Data layer |
| Team bios (Angie) | `src/data/team.ts` | Data layer |
| "Three Pathways. Thousands of Stories." | `src/pages/index.astro` | Hardcoded |
| Origin story narrative | `src/pages/about.astro` | Hardcoded |
| "Ways to contribute" descriptions | `src/pages/get-involved.astro` | Hardcoded |
| Program hero subtitles | `src/pages/programs/trap.astro`, `teck.astro` | Hardcoded |
| "How Our Programs Work" section | Does not exist yet | New content |
| Partner program descriptions | `src/pages/programs/index.astro` | Hardcoded/data |

## Assumptions Made

These assumptions were made during plan creation. Challenge any that seem incorrect.

- [x] Changes are made to ROOT pages only — `/designs/stories/` reference pages remain untouched
- [x] All replacement text comes directly from the client's change document — no creative decisions needed
- [x] The data layer (`src/data/`) is the correct place for structured content (programs, donations, team) and page files for narrative copy
- [x] The `$50` donation tier is unchanged (client didn't mention it)
- [x] The developer (not Claude) will start the dev server for visual verification — Claude should never start or stop dev/preview servers
- [x] The existing `$200` donation tier is replaced by the new `$250` tier (final tiers: $50, $100, $250, $1000)
- [x] The `$1,000` tier text uses Option A (graduation stipends)
- [x] "Technical Mentorship" → "TECK" updates the data layer program name in addition to page text (cascades to all consumers including /designs/ reference pages)

## Open Questions & Decisions

### Blocking (must resolve before implementation)

- [x] **$200 tier replacement** [DECIDED: 2026-03-15]
  The client provided new text for $100, $250, and $1000 tiers but didn't mention the existing $200 tier. What should happen to it?
  > **Decision:** Replace $200 with $250 — the $250 tier takes the $200 slot with new text. Final tiers: $50, $100, $250, $1000.
  > **Rationale:** Client provided $250 text as a replacement; keeping $200 alongside would create an awkward close-together tier gap.

- [x] **$1,000 tier text** [DECIDED: 2026-03-15]
  The client provided two alternative texts for the $1,000 tier.
  > **Decision:** Use Option A: "$1000 covers graduation stipends for 10 T.RAP graduates obtaining essential digital, music production and workforce readiness skills and completing milestone projects."
  > **Rationale:** More concise and impact-focused; ties directly to T.RAP graduate outcomes.

### Non-Blocking (can resolve during implementation)

- [x] **Program name in data layer** [DECIDED: 2026-03-15]
  The "Technical Mentorship" program is defined in `src/data/programs.ts` with `title: "Technical Mentorship"`. Should this be renamed to "TECK" in the data layer as well, or only in user-facing page text?
  > **Decision:** Update data layer too — rename to "TECK" in `programs.ts`. This cascades to all consumers including `/designs/` reference pages.
  > **Rationale:** Cleaner long-term. The data layer should reflect the current brand terminology. Reference pages are temporary and will eventually be removed.

- [x] **Fabricated flag cleanup** [DECIDED: 2026-03-15]
  Content that was previously `fabricated: true` is now being replaced with real client-provided text. Should we remove the `fabricated` flag from updated items?
  > **Decision:** Remove `fabricated` flags from items updated with real client-provided text. Since the data layer is shared between root and reference pages, both will reflect the updated (real) content. This is acceptable because reference pages are frozen snapshots that will eventually be removed.
  > **Rationale:** Data accuracy matters — content that is no longer fabricated shouldn't be flagged as such. The shared data layer means we can't have different flags for root vs reference pages without duplicating the data files, which isn't worth the complexity.

## Success Criteria

- [x] "Technical Mentorship" does not appear anywhere in root page rendered content (replaced with "TECK")
- [x] "Three Pathways" / "Thousands of Stories" replaced with "Two Pathways" / "Hundreds of Stories" on all root pages
- [x] About page origin story uses client-provided text
- [x] Programs page includes "How Our Programs Work" intro section
- [x] T.RAP page has updated curriculum (6 elements), schedule (4-day), and tools
- [x] TECK page has updated title ("More Than Technology"), description, competencies, schedule, curriculum (6 elements), and tools
- [x] Partner program descriptions expanded with client-provided text
- [x] Angie's bio updated on team page
- [x] Donation tiers updated with client-provided text ($50, $100, $250, $1000)
- [x] Get Involved page mentor/volunteer descriptions updated
- [x] T.RAP dates show "July – June" (no specific years)
- [x] `fabricated` flags removed from updated content
- [x] `npm run build` succeeds with no errors
- [x] `/designs/stories/` reference pages remain untouched (page files)
- [x] Visual verification via Playwright confirms all text changes are visible and correct across all root pages

## Implementation Plan

### Phase 1: Global Text Replacements

**Estimated Time:** 1 hour

#### Tasks
- [x] Replace "Technical Mentorship" → "TECK" across all root pages and data files:
  - [x] `src/pages/index.astro` — programs section heading and description
  - [x] `src/pages/programs/index.astro` — program card heading and content
  - [x] `src/pages/about.astro` — any mentions in narrative
  - [x] `src/data/programs.ts` — program title field
  - [x] `src/data/fabricated.ts` — expandedProgramDetails program name references
  - [x] `src/data/testimonials.ts` — any program association labels
- [x] Replace "Three Pathways. Thousands of Stories." → "Two Pathways. Hundreds of Stories." in `src/pages/index.astro`
- [x] Replace "Three distinct pathways" → "Two distinct pathways" (and similar variants) across:
  - [x] `src/pages/index.astro`
  - [x] `src/pages/programs/index.astro`
  - [x] `src/pages/about.astro`
- [x] Update T.RAP dates: remove specific year references, use "July – June" in:
  - [x] `src/data/programs.ts` — T.RAP duration field
  - [x] `src/pages/programs/index.astro` — if dates are hardcoded
  - [x] `src/pages/programs/trap.astro` — if dates are hardcoded

#### Test Verification
- [x] Grep for "Technical Mentorship" in root pages returns 0 results
- [x] Grep for "Three Pathways" or "Three distinct" in root pages returns 0 results
- [x] Grep for "2025" or "2026" in program date contexts returns 0 results (root pages only)
- [x] `npm run build` succeeds

---

### Phase 2: Program Content Updates (T.RAP & TECK)

**Estimated Time:** 2 hours

#### Tasks

**T.RAP (`src/pages/programs/trap.astro` and `src/data/fabricated.ts`):**
- [x] Replace curriculum outline with 6 new non-timebound elements:
  1. Community Research & Participatory Action
  2. Album Creation & Artistic Development
  3. Digital & Career Development Projects
  4. Social-Emotional Learning & Mental Wellness
  5. Workforce & Education Pathways
  6. Culminating Showcase & Public Presentation
- [x] Add/update weekly schedule section:
  - Mondays: Digital Literacy and Workreadiness (5 hours)
  - Tuesdays: Therapeutic Song Writing and Workreadiness (5 hours)
  - Wednesdays: Studio Recording and Workreadiness (5 hours)
  - Thursdays: Certificate Training and Guest Speakers (5 hours)
- [x] Update tools list: Pro Tools, Bandcamp, Google Suite, Chat GPT/Gemini, Canva
- [x] Remove `fabricated: true` flag from updated T.RAP curriculum/tools/schedule data

**TECK (`src/pages/programs/teck.astro` and `src/data/fabricated.ts`):**
- [x] Change program overview title/heading to "More Than Technology"
- [x] Replace program description with client-provided 12-week mentorship text
- [x] Replace competency categories with: Digital Literacy Basics, UI/UX Design, Coding Fundamentals, Project Development, Website Basics, Mentorship
- [x] Update schedule text: "Coordinate weekly virtual sessions with your mentor, ensuring a minimum of two hours of engagement each week."
- [x] Replace curriculum with 6 new journey elements:
  1. Mentor Matching & Goal Setting
  2. Weekly Mentorship Sessions
  3. Project-Based Learning
  4. Digital & AI Skills Development
  5. Mentor Relationship & Professional Growth
  6. Portfolio Completion
- [x] Update tools list: Google Suite, Chat GPT/Gemini, Canva, Figma, The Odin Project, Website Building Softwares
- [x] Remove `fabricated: true` flag from updated TECK curriculum/tools/schedule data

#### Test Verification
- [x] T.RAP page shows 6 curriculum elements (not 4 time-bound phases)
- [x] T.RAP page shows 4-day weekly schedule
- [x] TECK page heading shows "More Than Technology"
- [x] TECK page shows 6 journey elements (not module-based curriculum)
- [x] Both pages show updated tools lists
- [x] `npm run build` succeeds

---

### Phase 3: Programs Overview & Partner Programs

**Estimated Time:** 1 hour

#### Tasks
- [x] Add "How Our Programs Work" section to `src/pages/programs/index.astro`:
  - [x] Insert new section before program breakdowns with client-provided intro paragraph
  - [x] Style consistently with existing editorial sections (use `st-section`, `st-container` classes)
- [x] Update partner programs section in `src/pages/programs/index.astro`:
  - [x] Add introductory paragraph about booking T.RAP and TECK programs
  - [x] Replace TECK partner description with expanded client-provided text
  - [x] Replace T.RAP partner description with expanded client-provided text

#### Test Verification
- [x] Programs page shows "How Our Programs Work" section before program cards
- [x] Partner programs section shows expanded descriptions
- [x] `npm run build` succeeds

---

### Phase 4: About Page, Team & Get Involved Updates

**Estimated Time:** 1.5 hours

#### Tasks

**About Page (`src/pages/about.astro`):**
- [x] Replace origin story text (hardcoded narrative) with client-provided text
  - Note: Adjust "three distinct programs" to "two" per global change rule

**Team Page (`src/pages/team.astro` or `src/data/team.ts`):**
- [x] Replace Angie Agosta's bio with client-provided text
- [x] Remove `fabricated: true` flag from Angie's bio

**Get Involved Page (`src/pages/get-involved.astro` and `src/data/donation.ts`):**
- [x] Update donation tier text in `src/data/donation.ts`:
  - [x] $100 tier: "$100 covers weekly stipend for one T.RAP student to learn digital literacy, SEL, music production and partake in certificate trainings."
  - [x] Replace $200 tier with $250: "$250 covers one week of paid hours for an alumni instructor to gain more work experience."
  - [x] $1,000 tier: "$1000 covers graduation stipends for 10 T.RAP graduates obtaining essential digital, music production and workforce readiness skills and completing milestone projects."
- [x] Update "Ways to contribute" section (hardcoded in page):
  - [x] Mentor: change second line to "Min 2 hours a week transforms lives."
  - [x] Volunteer: change description to "Support events, outreach, and community building or join our Advisory Board. There's a place for every skill."

#### Test Verification
- [x] About page shows client-provided origin story text
- [x] Team page shows Angie's updated bio
- [x] Get Involved page shows updated donation amounts ($50, $100, $250, $1000)
- [x] Mentor and Volunteer descriptions reflect client updates
- [x] `npm run build` succeeds

---

### Phase 5: Build Verification

**Estimated Time:** 0.5 hours

#### Tasks
- [x] Run `npm run build` and verify clean build with 56 pages
- [x] Grep verification:
  - [x] "Technical Mentorship" → 0 results in root pages
  - [x] "Three Pathways" → 0 results in root pages
  - [x] "Thousands of Stories" → 0 results in root pages
- [x] Verify `/designs/stories/` page files are untouched (spot-check one page)
- [x] Review all changed data files for consistency

#### Test Verification
- [x] `npm run build` succeeds with 56 pages
- [x] All grep checks pass
- [x] No regressions in design reference page files

---

### Phase 6: Visual Verification with Playwright

**Estimated Time:** 1 hour

**IMPORTANT:** The developer will start the dev server before this phase begins. Claude must NOT start or stop the dev server. At the start of this phase, ask the developer to start the server and confirm it is running (e.g., `npm run dev` at `localhost:4321`) before proceeding with any Playwright navigation.

#### Pre-Flight
- [x] Ask the developer to start the dev server and wait for confirmation that it is running
- [x] Verify the server is accessible by navigating to `http://localhost:4321/` with Playwright

#### Root Pages — Text Change Verification
For each root page, navigate via Playwright and verify the specific text changes are visible:

- [x] **Home** (`/`) — Verify "Two Pathways. Hundreds of Stories." appears (not "Three Pathways. Thousands of Stories."). Verify "TECK" appears instead of "Technical Mentorship" in programs section.
- [x] **About** (`/about`) — Verify updated origin story text appears ("In 2020, Army Armstead Co-founded Emergent Works..."). Verify "two" pathways language (not "three").
- [x] **Programs Overview** (`/programs/`) — Verify "How Our Programs Work" intro section is present before program cards. Verify "Two Pathways" language. Verify "TECK" instead of "Technical Mentorship". Verify expanded partner program descriptions. Verify T.RAP dates show "July – June" without specific years.
- [x] **Programs/TECK** (`/programs/teck/`) — Verify "More Than Technology" heading. Verify updated program description. Verify 6 competency categories (Digital Literacy Basics, UI/UX Design, etc.). Verify 6 journey elements (Mentor Matching & Goal Setting, etc.). Verify updated tools list (Google Suite, Figma, The Odin Project, etc.). Verify updated schedule text.
- [x] **Programs/T.RAP** (`/programs/trap/`) — Verify 6 curriculum elements (Community Research & Participatory Action, etc.). Verify 4-day weekly schedule (Mon–Thu with 5 hours each). Verify updated tools list (Pro Tools, Bandcamp, Google Suite, etc.). Verify "July – June" dates.
- [x] **Team** (`/team/`) — Verify Angie Agosta's bio shows updated text ("Angie manages all communication, social media, and design...").
- [x] **Get Involved** (`/get-involved/`) — Verify updated donation tier amounts and descriptions ($100, $250, $1000). Verify Mentor description includes "Min 2 hours a week transforms lives." Verify Volunteer description includes "Advisory Board" mention.

#### Reference Pages — Spot Check
- [x] Navigate to `/designs/stories/` — verify page still renders (note: data layer changes like "TECK" will be reflected here since data is shared, but page files are untouched)
- [x] Navigate to `/designs/stories/programs/teck/` — verify page renders (will show updated data layer content)

---

## Rollback Plan

1. All changes are to content/text only — no structural or layout modifications
2. Data layer changes can be reverted via git: `git checkout HEAD -- src/data/`
3. Page changes can be reverted via git: `git checkout HEAD -- src/pages/index.astro src/pages/about.astro src/pages/team.astro src/pages/get-involved.astro src/pages/programs/`
4. `/designs/stories/` page files are not modified — no rollback needed there
5. Single `git checkout HEAD -- src/` would revert all changes if needed

## Dependencies

- [x] Plan 004 completed — Stories design promoted to root site
- [x] Client change document available at `_claude/resources/requested_changes/website-redesign-20260315.md`
- [x] Data layer exists in `src/data/` (programs, team, donation, fabricated)
- [x] Playwright MCP server available for browser automation
- [x] All blocking questions resolved
- [x] Developer available to start dev server for Phase 6

## Success Metrics

(To be filled in after implementation)

- [x] All client-requested text changes applied
- [x] Build succeeds with no errors
- [x] Zero fabricated content remaining in updated sections
- [x] Reference design page files unaffected
- [x] Playwright visual verification passes for all 7 root pages

---

## Refinement History

**Refinements:**
- 2026-03-15: Added Phase 6 (Visual Verification with Playwright) — browser-based verification of all text changes across 7 root pages, plus spot-check that /designs/stories/ reference pages remain untouched. Developer starts dev server manually.
- 2026-03-15: Resolved 4 questions via interactive Q&A (2 blocking, 2 non-blocking). Decided: replace $200 with $250 tier, use graduation stipends for $1000, update data layer program name to TECK, remove fabricated flags from updated content.

---

## Implementation Notes

**Actual Time Tracking:**
- Phase 1: [Estimated: 1 hour] (Actual: Complete)
- Phase 2: [Estimated: 2 hours] (Actual: Complete)
- Phase 3: [Estimated: 1 hour] (Actual: Complete)
- Phase 4: [Estimated: 1.5 hours] (Actual: Complete)
- Phase 5: [Estimated: 0.5 hours] (Actual: Complete)
- Phase 6: [Estimated: 1 hour] (Actual: Complete)
- **Total Estimated: 7 hours**

**Key Decisions:**
- $200 tier replaced by $250 (final: $50, $100, $250, $1000)
- $1,000 tier uses graduation stipends text (Option A)
- "Technical Mentorship" → "TECK" in data layer too (cascades to reference pages)
- Fabricated flags removed from content updated with real client text

**Assumptions Validated:**
- [x] All assumptions validated during implementation

**Lessons Learned:**
- TBD during implementation
