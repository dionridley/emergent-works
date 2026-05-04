# Plan: `public/images/` Cleanup and Portrait Wire-Up

## Metadata

- **Number:** 010
- **Status:** draft
- **Created:** 2026-05-03
- **Last refreshed:** 2026-05-03
- **Refinement count:** 1
- **Plan type:** standard-feature
- **Verification Policy:** Adaptive (default)
- **Related PRD:** N/A

## Executive Summary

Plan 008's Phase 1 audit produced an "Other `public/images/` subdirectories — informational audit" section in `_claude/docs/single-design-cleanup-manifest.md` that enumerated ~26 files in `public/images/` with zero references in `src/`. This plan acts on that audit — but during the question-resolution phase, deeper investigation revealed that **the "orphans" split into two cleanly different categories**:

1. **True orphans (~17 files across categories 1–8):** scaffolding from PR #4 / plan 002's image folder reorganization in Feb 2026. Never wired to any page. Pure deletion targets — `whatwedo-circle*`, `buildwithus/`, `community/`, `partner/` (singular), `impact/hero.jpg`, etc.
2. **Photos of real people whose portraits are unwired (~14 files in `people/graduates/` and `people/mentors/` plus the `footer-logo.png` wordmark):** These match real entries in `testimonials.ts`, `team.ts`, `mentorTestimonials`, and `mentorshipPairings[]` inline data in `get-involved.astro`. Deleting them would lose actual content. Wiring them up adds value.

Per the developer's per-category decisions during question resolution, this plan does **both**: deletes the true orphans (cleanup) AND wires up the portrait/logo files into the existing data and rendering code (content enrichment). The latter expands Phase 4 to include a UI change: `mentorshipPairings[]` currently has no image field; rendering needs to be extended to display the portraits.

The scope is bigger than the original "pure cleanup" framing, but it's coherent — every change traces back to a file that already exists in `public/images/`.

## Current State

After plan 008 completion:
- **`public/images/`** has 72 files. ~47 are referenced from `src/`. The other ~26 were flagged orphans per the plan 008 manifest. Question-resolution investigation refined that classification (see Executive Summary).
- **Manifest source of truth:** `_claude/docs/single-design-cleanup-manifest.md`, section "Other `public/images/` subdirectories — informational audit."
- **Known manifest inaccuracy** (from plan 008): the manifest's `people/graduates/` row listed 10 names including `dontay` and `zeek`, but those were `public/images/testimonial/` files deleted by plan 008 Phase 3. Actual `public/images/people/graduates/` orphan count is 8.
- **`mentorshipPairings[]` carousel** in `src/pages/get-involved.astro` (lines 13–62) has 8 pairings, each `{mentee: {name, role}, mentor: {name, role}, menteeQuote, mentorQuote}`. **No image field today.** The carousel renders names + roles + quotes only. Adding portraits requires both data shape change AND rendering-code change.
- **`Footer.astro:9`** currently uses `/images/header-logo.png` (small heart icon). The dedicated `public/images/footer-logo.png` (the full "EMERGENT WORKS" wordmark) exists but is unused. Conventional pattern: header = icon, footer = wordmark.
- **`organization.ts.branding.headerLogo` / `.footerLogo`** keys exist but are never read; both Header.astro and Footer.astro hardcode `/images/header-logo.png`.
- **Tests / lint / typecheck:** N/A. `npm run build` is the entire CI loop.

### Resolved per-category decisions (from question-resolution flow, 2026-05-03)

| # | Category | Decision | Notes |
| --- | --- | --- | --- |
| 1 | About widgets (`whatwedo-circle{1,2,3}.png`, `whywedoit-{bottom,left}.png`) | DELETE | Pure orphan, PR #4 scaffolding, no live consumer |
| 2 | `about/ourstory-portrait.jpg` | DELETE | Was used only by deleted /designs/* pages |
| 3 | `approach/decorative.png` (whole folder) | DELETE | Single orphan file, no live consumer |
| 4 | `buildwithus/` (whole folder, 2 files) | DELETE | No "Build With Us" page exists or planned |
| 5 | `community/` (whole folder, 2 files) | DELETE | Pure orphan, no live consumer |
| 6 | `impact/hero.jpg` | DELETE | impact.astro hero is text-only; this file unused |
| 7 | `partner/` singular (3 files) | DELETE | Distinct from `partners/` plural; no consumer |
| 8 | `programs/{hero,laptop-illustration}` | DELETE | programs/index.astro hero is text-only |
| 9 | `footer-logo.png` | **WIRE-UP** | Wire Footer.astro to use the full wordmark via `organization.branding.footerLogo` |
| 10 | `people/graduates/` 8 portraits | **WIRE-UP (full)** | All 8 are real people; wire into testimonials.ts (4 entries), team.ts (Nasiar), mentorshipPairings (Alberto, Lori, Voice + reuse Blueberry/Kat) |
| 11 | `people/mentors/` 6 portraits | **WIRE-UP (full)** | All 6 are real people; wire into mentorTestimonials (Dawn, Meagan, Melissa) and mentorshipPairings (Baraka, Dylan, Meagan, Melissa, Sneha) |

### Resolved non-blocking decisions

- **Empty directory removal:** YES — remove emptied subdirs after deletions.
- **`organization.branding` handling:** WIRE THROUGH — Footer.astro and Header.astro both read from `organization.branding.headerLogo` / `.footerLogo`. Make the data block load-bearing.
- **Verification Policy:** kept at Adaptive.

## Assumptions

Mark `[x]` when validated. Mark `[?]` when uncertain and needing verification.

- [x] Plan 008 has been merged (or at least lives at the tip of the working branch).
- [x] The plan 008 manifest is the most recent comprehensive audit; no other audits have been done since.
- [?] No new pages, components, or data files have been added since plan 008 completion that reference any of the candidate files. **Phase 1 verifies via fresh Grep** — uncertainty is appropriate since this plan was drafted close to plan 008 completion.
- [x] **The `people/graduates/` orphan portraits ARE photos of real people who appear in the site's data without being wired up** (refuted the original "NOT staged" assumption — see Executive Summary). Plan now includes wire-ups in Phase 3 and Phase 4.
- [x] **The `people/mentors/` portraits ARE photos of real people similarly.** Same restructure.
- [x] `about/whatwedo-circle*.png` and `about/whywedoit-*.png` are NOT queued for an About-page redesign. Confirmed by category 1 decision (DELETE).
- [x] `buildwithus/`, `community/`, `partner/` (singular), and the program/impact/about hero leftovers are old scaffolding, safe to delete. Confirmed by category decisions 4–8 (all DELETE).
- [x] The `mentorshipPairings[]` carousel in `get-involved.astro` is a kept-site UI surface — extending it with portraits is a desired enhancement, not breaking change. Confirmed by category 10/11 decisions and the wire-up-split decision (full scope).

## Open Questions & Decisions

### Execution Policy

These settings control how phases verify completion. They can be changed at any time via `/dr-plan @[this-plan] answer questions` — they are not terminal decisions.

- [ ] **Verification Policy** [OPEN] Current: Adaptive (default)
  Last changed: never

  How should Phase Exit Gates verify completion?
  - Option A (Always): Every phase spawns `project-management:plan-verifier`. Highest rigor, highest token cost. Use for high-stakes work or when self-verification has been unreliable.
  - Option B (Adaptive): Each phase is annotated at create-time with `<!-- verifier-recommendation: yes|no -->`. The verifier runs only on phases the model judged worth the cost.
  - Option C (Never): No verifier subagent. Agent self-review only. Lowest cost, lowest rigor.

### Blocking

Must resolve before implementation starts.

- [x] [DECIDED: 2026-05-03] **Per-category retention decisions.** 11 sub-categories of files in `public/images/`, each needing an explicit DELETE / KEEP / DEFER / WIRE-UP call.
  > **Decision:** See "Resolved per-category decisions" table in Current State above. Categories 1–8 = DELETE. Categories 9–11 = WIRE-UP.
  > **Rationale:** Question-resolution investigation revealed that the `people/{graduates,mentors}/` "orphans" and `footer-logo.png` are all photos/wordmarks of real people / real branding that the data references implicitly. Deleting would lose content. Wiring them up matches user intent ("clean up what isn't needed" — and what's needed is wired).

- [x] [DECIDED: 2026-05-03] **Wire-up complexity split.** Cat 10/11 wire-ups have two tiers: easy data adds (testimonials.ts, team.ts, mentorTestimonials, Footer.astro) vs hard UI change (`mentorshipPairings[]` data shape extension + carousel rendering update).
  > **Decision:** Include all wire-ups in plan 010 (full scope).
  > **Rationale:** Coherent unit of work. Splitting would create a gap between deleted orphans and wired-up content. Phase 4 isolates the UI complexity so it can be reviewed independently.

### Non-Blocking

Can resolve during implementation.

- [x] [DECIDED: 2026-05-03] **Empty directory removal.**
  > **Decision:** Remove emptied subdirectories after deletions (`approach/`, `buildwithus/`, `community/`, `partner/` singular).
  > **Rationale:** Cleaner public/images/ tree. Directories can be recreated when needed.
- [x] [DECIDED: 2026-05-03] **`organization.branding` handling.**
  > **Decision:** Wire through (data-driven). Footer.astro and Header.astro both read from `organization.branding.headerLogo` / `.footerLogo`. Make the `branding` block load-bearing.
  > **Rationale:** Most architecturally correct. Single source of truth for logo paths. Avoids the "unread block" smell while solving the cat 9 wire-up cleanly.

## Success Criteria

Plan-level outcomes. Flipping all of these is how we know the plan succeeded.

### Cleanup outcomes

- [ ] A fresh manifest exists at `_claude/docs/public-images-cleanup-and-wireup-manifest.md` listing every plan-008-flagged candidate with its current Grep status and per-file decision.
- [ ] Every file in categories 1–8 (DELETE-classified) is removed; build green; no missing-image warnings.
- [ ] No now-empty subdirectory remains under `public/images/` (default = remove).

### Wire-up outcomes

- [ ] **Footer.astro** renders the dedicated wordmark from `organization.branding.footerLogo` (`/images/footer-logo.png`); Header.astro reads from `organization.branding.headerLogo`. Both routes the path through the data block instead of hardcoding.
- [ ] **`testimonials.ts`** entries for Blueberry, Julius, Kat, Terrence each gain an `image:` field pointing at the matching `public/images/people/graduates/X.png` portrait.
- [ ] **`testimonials.ts.mentorTestimonials`** entries for Dawn, Meagan, Melissa each gain an `image:` field pointing at the matching `public/images/people/mentors/X.png` portrait.
- [ ] **`team.ts`** entry for Nasiar Denobrega has its `image:` field swapped from `placeholder-4.jpg` to `/images/people/graduates/nasiar.png`.
- [ ] **`mentorshipPairings[]`** in `get-involved.astro` data shape extended: each `mentee` and `mentor` object gains an optional `image?: string` field. The 8 pairings are populated with image refs where portraits exist (Alberto, Baraka, Blueberry, Dylan, Kat, Lori, Meagan, Melissa, Nashid, Sheisty if available, Sneha, Voice — using existing portrait files).
- [ ] **`mentorshipPairings[]` carousel rendering** in `get-involved.astro` updated to display portraits alongside names. Visual design: small circular thumbnails (60-80px diameter) at the top of each pairing card. (Default; adjustable at execution time if visually wrong.)

### Build / verification

- [ ] `npm run build` exits 0 with no warnings.
- [ ] Developer dev-server spot-check confirms no visual regressions on all 8 kept-site routes, with particular attention to Footer (now showing wordmark), team page (Nasiar's real photo), homepage testimonial carousel (4 new portraits), and get-involved mentorship carousel (new UI).

## Definition of Done

Every Phase Exit Gate must confirm these before flipping any `[x]` in the phase:

- Build passes: `npm run build` exits 0.
- TypeScript validation: covered by `npm run build` (Astro 5 runs TS through Vite during build; no separate `astro check` script is configured).
- Tests: N/A — the project has no test infrastructure.
- Lint: N/A — the project has no lint configuration.

If a category genuinely doesn't apply, that's already noted above. Do not gate phases on commands that aren't wired up.

## Implementation Plan

### Phase 1: Re-Verify Orphans and Map Wire-Ups (Audit)

This phase produces a written manifest. **No code, files, or assets are deleted or modified in this phase.** Plan 008 used the same audit-first pattern; it caught manifest errors before any destructive action. This plan adds: a wire-up table that captures every portrait file's destination data location.

#### Tasks

- [ ] For each plan-008-flagged candidate file (categories 1–8), use `Glob` to confirm the file currently exists, then `Grep` `src/` for both the bare filename and the full `/images/...` path. Classify: **STILL-ORPHAN** / **NOW-REFERENCED** (status changed since plan 008) / **STATUS-CHANGED** (file no longer exists).
- [ ] Cross-check the plan 008 `dontay`/`zeek` discrepancy: confirm those files are NOT in `public/images/people/graduates/`.
- [ ] **Build the wire-up table.** For each file in categories 9–11, determine its target wire-up location:
  - **`footer-logo.png`** → Footer.astro logo render path; `organization.ts.branding.footerLogo` becomes load-bearing.
  - **`people/graduates/{blueberry,julius,kat,terrence}.png`** → `testimonials.ts` entries (each gains an `image:` field).
  - **`people/graduates/nasiar.png`** → `team.ts` entry for Nasiar (replaces `placeholder-4.jpg`).
  - **`people/graduates/{alberto,lori,voice}.png`** → `mentorshipPairings[]` in `get-involved.astro` (Alberto as mentee, Lori as mentee, Voice as mentor).
  - **`people/mentors/{dawn,meagan,melissa}.png`** → `mentorTestimonials` entries in `testimonials.ts`.
  - **`people/mentors/{baraka,dylan,sneha}.png`** → `mentorshipPairings[]` (Baraka as mentee — note: file is misfiled in `mentors/` folder, see follow-up note; Dylan as mentor; Sneha as mentor).
  - **Cross-check existing `people/graduates/{nashid,sheisty,makeda,maria,wayne,crystal,rahiem,kindel}.png`** to identify which are already wired and which the carousel could reuse.
- [ ] Read `src/pages/get-involved.astro` lines 13–62 (the `mentorshipPairings[]` array) and lines surrounding the carousel rendering. Capture:
  - Current data shape: `{mentee: {name, role}, mentor: {name, role}, menteeQuote, mentorQuote}`.
  - Current rendering markup and CSS classes.
  - Note any constraints that would break if portraits are added (e.g., layout grids that would need to grow).
- [ ] Decide the visual pattern for the carousel update. **Default: small circular thumbnails (60-80px) at the top of each pairing card.** Document the chosen pattern in the manifest. Implementation can adjust at execution time.
- [ ] Read `src/components/Footer.astro` and `src/components/Header.astro`. Capture the current logo render line. Plan the swap to read from `organization.branding`.
- [ ] Write the manifest to `_claude/docs/public-images-cleanup-and-wireup-manifest.md`. Sections:
  - **Re-verification summary** — total candidates from plan 008; how many still orphan; how many flipped status.
  - **Per-category tables** — one per category, with columns: filename, plan-008 status, current Grep result, decision (per resolved Q1), notes.
  - **Wire-up plan — easy** — table mapping each "easy" wire-up file to its target data file + line number + suggested edit.
  - **Wire-up plan — hard (mentorshipPairings)** — current data shape, proposed extended shape, current rendering markup, proposed rendering update, list of pairings populated with image refs.
  - **Footer/Header logo wire-up** — current Footer.astro and Header.astro logo render lines; proposed edits to read from `organization.branding`.
  - **Empty directories that will result from deletions** — list of subdirs that go to zero files after Phase 2.
- [ ] Note the `baraka.png` misfiling: portrait lives in `public/images/people/mentors/` but Baraka appears as a **mentee** in `mentorshipPairings`. **Decision in this plan:** leave the file in `mentors/` (don't rename — that's a follow-up cleanup if anyone cares). Just point the mentee record at `/images/people/mentors/baraka.png`.

#### Verification

- [ ] Read `_claude/docs/public-images-cleanup-and-wireup-manifest.md` — every section populated, no `[?]` placeholders, every plan-008 candidate accounted for, every category-9/10/11 portrait has a wire-up target.
- [ ] Spot-check 3 random STILL-ORPHAN entries by re-running Grep — confirms classification.
- [ ] Spot-check 1 NOW-REFERENCED entry (if any) by reading the new consumer.
- [ ] Spot-check 3 random wire-up rows by reading the target data file at the cited line — confirms the rewrite is mechanical, not invented.
- [ ] The dontay/zeek discrepancy is documented as resolved.

#### Acceptance Criteria

- Manifest exists at `_claude/docs/public-images-cleanup-and-wireup-manifest.md`.
- Every plan-008 candidate file appears in the manifest with current status + decision.
- Every category-9/10/11 portrait has a documented wire-up target (file + line + suggested edit).
- The carousel UI plan documents the chosen visual pattern and current/proposed shapes.
- The classification is reproducible — each STILL-ORPHAN entry cites a re-runnable Grep query.
- No code, files, or assets have been deleted or modified in this phase.

#### Phase Exit Gate

<!-- verifier-recommendation: yes — Manifest is the authoritative input to Phases 2–4. Plus the wire-up table needs cross-file consistency (every portrait → real testimonial/team/inline-data row). Catching a mis-mapping here vs after a wire-up commit (and hunting down a stale image: field reference) is much cheaper. Plan 008 followed the same pattern. -->

- [ ] Run Definition of Done commands (see plan header). All must pass.
- [ ] **Spawn plan-verifier.** Invoke `subagent_type="project-management:plan-verifier"` with the plan file path and phase number. Wait for its report.
- [ ] **Apply verification report.** Flip `[x]` only for tasks the verifier reports as PASS. Keep `[ ]` for FAIL and UNVERIFIED with a note referencing the verifier's reasoning.
- [ ] **Agent self-review.** Re-read Tasks above, confirm the verifier's recommendations are reflected, note any UNVERIFIEDs that need follow-up in future phases or the Retro.

---

### Phase 2: Delete Confirmed Orphans (Categories 1–8)

Mechanical deletion of the 17 confirmed-orphan files plus their now-empty parent directories.

#### Tasks

- [ ] Delete files per categories 1–8:
  - `public/images/about/{whatwedo-circle1,whatwedo-circle2,whatwedo-circle3,whywedoit-bottom,whywedoit-left,ourstory-portrait}.png/jpg` (6 files; cat 1+2)
  - `public/images/approach/decorative.png` (1 file; cat 3)
  - `public/images/buildwithus/{group.jpg,portrait.png}` (2 files; cat 4)
  - `public/images/community/{circle.png,fullwidth.jpg}` (2 files; cat 5)
  - `public/images/impact/hero.jpg` (1 file; cat 6)
  - `public/images/partner/{cca-spotlight.png,hero.jpg,ways-illustration.png}` (3 files; cat 7)
  - `public/images/programs/{hero.jpg,laptop-illustration.png}` (2 files; cat 8)
- [ ] After all deletions, list directories under `public/images/`. Remove any that are now empty: `approach/`, `buildwithus/`, `community/`, `partner/` (singular). Use `rmdir` (errors if non-empty — safe).
- [ ] `about/`, `programs/`, `impact/` will NOT go empty (other files in those dirs ARE used). Don't touch them.
- [ ] Re-grep `src/` for the deleted paths — expected: zero matches.
- [ ] Run `npm run build` — confirm exit 0.

#### Verification

- [ ] `npm run build` — exits 0, no missing-image warnings.
- [ ] Glob `public/images/**/*` — confirm every deleted file is gone.
- [ ] Glob `public/images/{approach,buildwithus,community,partner}` — confirm zero results (directories removed).
- [ ] Grep `src/` for `/images/about/whatwedo|/images/about/whywedoit|/images/about/ourstory|/images/approach|/images/buildwithus|/images/community|/images/impact/hero|/images/partner/|/images/programs/hero|/images/programs/laptop` — zero hits across all patterns.

#### Acceptance Criteria

- All 17 cat-1–8 files removed.
- 4 now-empty directories removed.
- All KEEP files (everything not in cat 1–8) still present.
- Build green.

#### Phase Exit Gate

<!-- verifier-recommendation: no — Mechanical execution against an already-verified manifest. Build catches dangling references; per-file rm + grep + build is self-checking. The audit phase already had verifier coverage. -->

- [ ] Run Definition of Done commands (see plan header). All must pass.
- [ ] **Agent self-review.** Re-read all Tasks above. Flip `[x]` only for tasks whose Verification passed. Any failing or skipped task stays `[ ]` with a short note explaining why. Under-report beats over-report.

---

### Phase 3: Easy Wire-Ups (Data Adds + Logo Routing)

Wire up everything that doesn't require UI rendering changes. Pure data edits plus the Header/Footer logo routing.

#### Tasks

- [ ] **Header.astro / Footer.astro logo routing.**
  - Edit `src/components/Header.astro`: import `organization` from `../data/organization`. Change the logo `<img src="/images/header-logo.png" ...>` to `<img src={organization.branding.headerLogo} ...>`.
  - Edit `src/components/Footer.astro`: it already imports `organization`. Change the logo `<img src="/images/header-logo.png" ...>` to `<img src={organization.branding.footerLogo} ...>`. (Footer was using the heart icon; this swap makes it use the wordmark, per category 9 decision.)
  - **Do NOT** delete the `branding` block from `organization.ts` (per non-blocking decision: wire through, not hardcode).
- [ ] **`testimonials.ts` — main testimonials.** Add `image:` field to entries whose name has a matching portrait file in `public/images/people/graduates/`:
  - Blueberry → `image: "/images/people/graduates/blueberry.png"`
  - Julius → `image: "/images/people/graduates/julius.png"`
  - Kat → `image: "/images/people/graduates/kat.png"`
  - Terrence → `image: "/images/people/graduates/terrence.png"`
- [ ] **`testimonials.ts.mentorTestimonials`** — add `image:` field:
  - Dawn → `image: "/images/people/mentors/dawn.png"`
  - Meagan → `image: "/images/people/mentors/meagan.png"`
  - Melissa → `image: "/images/people/mentors/melissa.png"`
- [ ] **`team.ts`** — for the Nasiar Denobrega entry (Program Associate), change `image: "/images/team/placeholder-4.jpg"` to `image: "/images/people/graduates/nasiar.png"`.
- [ ] Confirm rendering works for the new `image:` fields:
  - Read `src/pages/index.astro` carousel rendering of `testimonials` — verify it conditionally renders portraits when `image` is present.
  - Read `src/pages/team.astro` rendering — verify `member.image` is used directly (no special handling).
  - Read `src/pages/get-involved.astro` mentorTestimonials rendering — verify it conditionally renders portraits.
  - If any rendering does NOT conditionally show portraits when `image` is present, add the conditional in the rendering. (Plan 008 confirmed `Testimonial.image?: string` is the optional field; rendering should already handle both cases.)
- [ ] Run `npm run build` — confirm exit 0.

#### Verification

- [ ] `npm run build` — exits 0.
- [ ] Read `src/components/Header.astro` and `src/components/Footer.astro` — both source the logo from `organization.branding.*`; no hardcoded `/images/header-logo.png` literal in either file.
- [ ] Read `src/data/testimonials.ts` — Blueberry, Julius, Kat, Terrence entries each have an `image:` field pointing at the correct path.
- [ ] Read `src/data/testimonials.ts` `mentorTestimonials` — Dawn, Meagan, Melissa each have `image:` field.
- [ ] Read `src/data/team.ts` — Nasiar's `image:` is `/images/people/graduates/nasiar.png`.
- [ ] Manual: developer dev-server spot-check — homepage testimonial carousel shows 4 new portraits (Blueberry, Julius, Kat, Terrence); team page shows Nasiar's real photo; get-involved mentor testimonial shows Meagan's portrait; Footer shows the wordmark.

#### Acceptance Criteria

- Header.astro and Footer.astro both render their logos from `organization.branding`.
- Footer visually displays the wordmark (not the heart icon).
- 7 testimonial entries (4 main + 3 mentor) have `image:` fields pointing at existing portrait files.
- Nasiar's team entry uses his real photo.
- Build green; visual parity confirmed by spot-check.

#### Phase Exit Gate

<!-- verifier-recommendation: yes — Cross-file refactor: Header + Footer + organization.ts + testimonials.ts + team.ts all touched. Easy to mis-paste a path or miss a rendering check. Verifier confirms (a) every edit is consistent with the manifest's wire-up table, (b) no rendering surface accidentally lost the conditional-portrait check, (c) `branding` block is correctly load-bearing now. -->

- [ ] Run Definition of Done commands (see plan header). All must pass.
- [ ] **Spawn plan-verifier.** Invoke `subagent_type="project-management:plan-verifier"` with the plan file path and phase number. Wait for its report.
- [ ] **Apply verification report.** Flip `[x]` only for tasks the verifier reports as PASS. Keep `[ ]` for FAIL and UNVERIFIED with a note referencing the verifier's reasoning.
- [ ] **Agent self-review.** Re-read Tasks above, confirm the verifier's recommendations are reflected, note any UNVERIFIEDs that need follow-up in future phases or the Retro.

---

### Phase 4: Mentorship Pairings UI Redesign + Remaining Wire-Ups

The bigger UI change. `mentorshipPairings[]` data shape grows to include image refs, and the carousel rendering is updated to display portraits. Remaining portrait wire-ups (Alberto, Lori, Voice, Baraka, Dylan, Sneha) land here.

#### Tasks

- [ ] **Extend the data shape** in `src/pages/get-involved.astro` `mentorshipPairings[]`:
  - Each `mentee` and `mentor` object gains an optional `image?: string` field.
  - Populate every pairing with image refs where portraits exist:
    - Pairing 1: mentee Baraka → `/images/people/mentors/baraka.png` (file misfiled in mentors/, doesn't matter for rendering); mentor Voice → `/images/people/graduates/voice.png` (Voice is in graduates/ folder).
    - Pairing 2: mentee Lori → `/images/people/graduates/lori.png`; mentor Meagan → `/images/people/mentors/meagan.png`.
    - Pairing 3: mentee Alberto → `/images/people/graduates/alberto.png`; mentor Dylan → `/images/people/mentors/dylan.png`.
    - Pairing 4: mentee Kat → `/images/people/graduates/kat.png`; mentor Sneha → `/images/people/mentors/sneha.png`.
    - Pairing 5: mentee Blueberry → `/images/people/graduates/blueberry.png`; mentor Octavia → no portrait file (omit `image`).
    - Pairing 6: mentee Nashid → `/images/people/graduates/nashid.png`; mentor Army → no portrait file (omit `image`).
    - Pairing 7: mentee Crystal → `/images/people/graduates/crystal.png`; mentor Melissa → `/images/people/mentors/melissa.png`.
    - Pairing 8: mentee Blueberry (graduate; reuses portrait); mentor Octavia (no portrait).
- [ ] **Update the carousel rendering** in `get-involved.astro` to display portraits:
  - Default visual pattern: small circular thumbnails (60-80px diameter) at the top of each pairing card, side by side (mentee on left, mentor on right) with a small label underneath each.
  - When `image` is missing (e.g., Octavia, Army), render a name initial in a circle of the same dimensions as a fallback.
  - Adjust CSS in the existing carousel block to accommodate the new portrait row above the quotes.
  - At execution time, the developer can adjust visual pattern (size, position, layout) — the manifest's documented default is a starting point.
- [ ] Run `npm run build` — confirm exit 0.
- [ ] Visual spot-check (developer): the get-involved mentorship carousel now renders portraits; missing portraits fall back gracefully.

#### Verification

- [ ] `npm run build` — exits 0.
- [ ] Read `src/pages/get-involved.astro` — `mentorshipPairings[]` data shape extended; every pairing populated with `image:` field where a portrait exists.
- [ ] Read the carousel rendering markup — new portrait elements present; fallback logic for missing images present.
- [ ] Manual: developer dev-server spot-check — every pairing in the carousel shows mentee + mentor portraits (or fallback initials). Carousel layout doesn't break on mobile.

#### Acceptance Criteria

- `mentorshipPairings[]` data shape includes optional `image?: string` on both `mentee` and `mentor`.
- Every pairing is populated with image refs where matching portrait files exist (8 pairings × up to 2 images = up to 16 image refs).
- Carousel rendering displays portraits with graceful fallback for missing images.
- Visual design works on desktop and mobile (developer spot-check confirms).
- Build green.

#### Phase Exit Gate

<!-- verifier-recommendation: yes — UI change + data-shape change + cross-pairing consistency. Easy to misroute a portrait (e.g., put Alberto's photo on Lori's pairing). Verifier confirms (a) every pairing's image refs match the manifest's wire-up table, (b) the rendering markup uses the new image fields and the fallback path, (c) no other consumer of mentorshipPairings broke. -->

- [ ] Run Definition of Done commands (see plan header). All must pass.
- [ ] **Spawn plan-verifier.** Invoke `subagent_type="project-management:plan-verifier"` with the plan file path and phase number. Wait for its report.
- [ ] **Apply verification report.** Flip `[x]` only for tasks the verifier reports as PASS. Keep `[ ]` for FAIL and UNVERIFIED with a note referencing the verifier's reasoning.
- [ ] **Agent self-review.** Re-read Tasks above, confirm the verifier's recommendations are reflected, note any UNVERIFIEDs that need follow-up in future phases or the Retro.

---

### Phase 5: Final Verification

Confirm the project is in a clean, fully-wired state. Mirrors plan 008 Phase 6 in shape.

#### Tasks

- [ ] Delete `dist/`. Run `npm run build` from a clean tree — confirm exits 0, no warnings.
- [ ] Grep `src/` for `/images/about/whatwedo|/images/about/whywedoit|/images/about/ourstory|/images/approach|/images/buildwithus|/images/community|/images/impact/hero|/images/partner/|/images/programs/hero|/images/programs/laptop` — expected: zero matches.
- [ ] Grep `src/` for hardcoded `/images/header-logo.png` and `/images/footer-logo.png` literal strings — expected: zero matches outside the `organization.ts.branding` block (which now serves them).
- [ ] List `public/images/` subdirectories — confirm `approach/`, `buildwithus/`, `community/`, `partner/` (singular) are gone.
- [ ] Confirm `_claude/docs/public-images-cleanup-and-wireup-manifest.md` exists and matches the executed work.
- [ ] **Ask the developer to start the dev server** (`npm run dev`) and spot-check each kept-site route:
  - `/` (homepage testimonial carousel — 4 new portraits visible: Blueberry, Julius, Kat, Terrence)
  - `/about`
  - `/programs` and detail pages
  - `/team` (Nasiar's real photo replaces placeholder)
  - `/get-involved` (mentor testimonial shows Meagan's portrait; mentorship pairings carousel now shows portraits with fallback)
  - `/impact`
  - All pages: footer shows the EMERGENT WORKS wordmark (not the heart icon)

#### Verification

- [ ] `npm run build` from clean tree exits 0.
- [ ] All grep checks above return zero (or only the expected `organization.branding` location).
- [ ] Public/images/ has no removed subdirs.
- [ ] Developer confirmation that all kept-site routes render correctly with the new portraits and footer.

#### Acceptance Criteria

- Every Plan-level Success Criterion is met.
- No grep finds deleted paths in `src/`.
- Empty subdirs are gone.
- Manifest matches executed work.
- Developer dev-server spot-check confirms no regressions and the new portraits render correctly.

#### Phase Exit Gate

<!-- verifier-recommendation: no — This phase IS verification. Recursive verifier-on-verifier adds no signal. Self-review against the explicit checklist plus the developer spot-check is sufficient. -->

- [ ] Run Definition of Done commands (see plan header). All must pass.
- [ ] **Agent self-review.** Re-read all Tasks above. Flip `[x]` only for tasks whose Verification passed. Any failing or skipped task stays `[ ]` with a short note explaining why. Under-report beats over-report.

## Refinement History

- **2026-05-03:** Initial plan creation. Acts on plan 008's "Other `public/images/` subdirectories — informational audit." Two-phase shape (audit → execute). 11 categorical retention questions captured for the developer.
- **2026-05-03:** Resolved 1 blocking (per-category retention: 8 DELETE + 3 WIRE-UP) + 1 wire-up-split decision (full scope) + 2 non-blocking questions (remove empty dirs; wire `organization.branding` data-driven). Verified 8 assumptions (5 confirmed, 2 refuted via deeper investigation — `people/{graduates,mentors}/` portraits ARE photos of real people, not orphans; rewrote those assumptions). Verification Policy kept at Adaptive. **Plan restructured from 2 phases to 5** to accommodate the expanded scope: Re-Verify → Delete → Easy Wire-Ups → Mentorship UI Redesign → Final Verification. Plan title updated from "`public/images/` Orphan Cleanup" to "`public/images/` Cleanup and Portrait Wire-Up" to reflect dual purpose.

## Completion

After the final phase's Exit Gate passes, the executing agent performs these steps without prompting the user:

1. Populate the Retro section below from observable execution signals (what worked, what didn't, learnings). Write in terse bullet form.
2. Move this plan file from `_claude/plans/in_progress/` to `_claude/plans/completed/`.

If the final phase's Exit Gate has unresolved FAILs or UNVERIFIEDs after the allowed retries, do NOT move the file or write the retro. Escalate to the user with full context and stop.

## Retro

<!-- populated at completion — do not hand-edit before execution finishes -->

### What worked

- [Populated at completion]

### What didn't

- [Populated at completion]

### Learnings

- [Populated at completion — things a future plan would do differently]
