# Plan: `public/images/` Cleanup and Portrait Wire-Up

## Metadata

- **Number:** 010
- **Status:** draft
- **Created:** 2026-05-03
- **Last refreshed:** 2026-05-03
- **Refinement count:** 2
- **Plan type:** standard-feature
- **Verification Policy:** Adaptive (default)
- **Related PRD:** N/A

## Executive Summary

Plan 008's Phase 1 audit produced an "Other `public/images/` subdirectories — informational audit" section in `_claude/docs/single-design-cleanup-manifest.md` that enumerated ~26 files in `public/images/` with zero references in `src/`. This plan acts on that audit — but during the question-resolution phase, deeper investigation revealed that **the "orphans" split into two cleanly different categories**:

1. **True orphans (~19 files across categories 1–9):** scaffolding from PR #4 / plan 002's image folder reorganization in Feb 2026, plus the now-orphaned brand logos. Never wired to any kept-site page (or, in the logos' case, just unwired by the random-improvements branch's text-only wordmark decision). Pure deletion targets — `whatwedo-circle*`, `buildwithus/`, `community/`, `partner/` (singular), `impact/hero.jpg`, `header-logo.png`, `footer-logo.png`, etc.
2. **Photos of real people whose portraits are unwired (22 files in `people/graduates/` and `people/mentors/`):** These match real entries in `testimonials.ts`, `team.ts`, `mentorTestimonials`, and `mentorshipPairings[]` inline data in `get-involved.astro`. Deleting them would lose actual content. Wiring them up adds value.

Per the developer's per-category decisions during question resolution, this plan does **both**: deletes the true orphans (cleanup) AND wires up the portrait files into the existing data and rendering code (content enrichment). The latter expands Phase 4 to include a UI change: `mentorshipPairings[]` currently has no image field; rendering needs to be extended to display the portraits.

The scope is bigger than the original "pure cleanup" framing, but it's coherent — every change traces back to a file that already exists in `public/images/`.

**Refinement 2 (2026-05-03) note:** Hero/logo work on the `random-improvements` branch (now merged into main) removed the `<img>` tags from Header.astro and Footer.astro entirely — both now render text-only "Emergent Works." That flips category 9 from WIRE-UP to DELETE (both `header-logo.png` and `footer-logo.png` are now orphans), and the `organization.branding` block becomes truly dead code that should be removed from `organization.ts` rather than wired through.

## Current State

After plan 008 completion AND the random-improvements branch (heroes + logo removal) merge:
- **`public/images/`** has 72 files. The "orphan" count grew by 1: `header-logo.png` is now an orphan too (Header.astro and Footer.astro were updated to render text-only "Emergent Works", removing both `<img>` tags).
- **Manifest source of truth:** `_claude/docs/single-design-cleanup-manifest.md`, section "Other `public/images/` subdirectories — informational audit." Note: the manifest pre-dates the logo removal; Phase 1 of this plan must reconcile that.
- **Known manifest inaccuracy** (from plan 008): the manifest's `people/graduates/` row listed 10 names including `dontay` and `zeek`, but those were `public/images/testimonial/` files deleted by plan 008 Phase 3. Actual `public/images/people/graduates/` orphan count is 8.
- **`mentorshipPairings[]` carousel** in `src/pages/get-involved.astro` (data block now ~lines 16–65 after the random-improvements merge added a `PageHero` import) has 8 pairings, each `{mentee: {name, role}, mentor: {name, role}, menteeQuote, mentorQuote}`. **No image field today.** The carousel renders names + roles + quotes only. Adding portraits requires both data shape change AND rendering-code change.
- **`Header.astro` and `Footer.astro`** no longer render any logo image — the `<a class="st-header__logo">` and `<div class="st-footer__logo">` wrappers contain only `<span>Emergent Works</span>`. The `.st-header__logo img` and `.st-footer__logo img` CSS rules were also removed from `Layout.astro`.
- **`organization.ts.branding.headerLogo` / `.footerLogo`** keys still exist in `organization.ts` (lines 31–34) but are now genuinely dead — there's no consumer and no plausible future consumer since the design decision is text-only logos. The `branding` block should be removed.
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
| 9a | `footer-logo.png` | DELETE | **Refinement 2 flip:** was WIRE-UP. Header/Footer now render text-only "Emergent Works"; no consumer for the wordmark image. |
| 9b | `header-logo.png` | DELETE | **Refinement 2 add:** was implicitly KEEP. Header.astro `<img>` was removed; no remaining consumer. |
| 9c | `organization.ts.branding` block | REMOVE FROM CODE | **Refinement 2 add:** dead-code cleanup that flows from 9a+9b. Not a `public/images/` change but lives in the same conceptual unit. |
| 10 | `people/graduates/` 8 portraits | **WIRE-UP (full)** | All 8 are real people; wire into testimonials.ts (4 entries), team.ts (Nasiar), mentorshipPairings (Alberto, Lori, Voice + reuse Blueberry/Kat) |
| 11 | `people/mentors/` 6 portraits | **WIRE-UP (full)** | All 6 are real people; wire into mentorTestimonials (Dawn, Meagan, Melissa) and mentorshipPairings (Baraka, Dylan, Meagan, Melissa, Sneha) |

### Resolved non-blocking decisions

- **Empty directory removal:** YES — remove emptied subdirs after deletions.
- **`organization.branding` handling:** REMOVE (was WIRE THROUGH at refinement 1; flipped at refinement 2 because logos themselves were removed). Drop the `branding` key entirely from `organization.ts`.
- **Verification Policy:** kept at Adaptive.

## Assumptions

Mark `[x]` when validated. Mark `[?]` when uncertain and needing verification.

- [x] Plan 008 has been merged (or at least lives at the tip of the working branch).
- [x] The plan 008 manifest is the most recent comprehensive audit; no other audits have been done since (note: random-improvements branch did NOT produce a new audit; it just changed Header/Footer/heroes).
- [x] **`/images/header-logo.png` is no longer referenced from `src/`** (refinement 2 verified via Grep — only matches are in plan/doc files, not code).
- [x] **`/images/footer-logo.png` is not referenced from `src/`** (refinement 2 verified via Grep — only matches in plan/doc files; the `organization.ts.branding.footerLogo` literal exists but is unread).
- [?] No NEW pages, components, or data files have been added since the random-improvements branch merged that reference any of the candidate files. **Phase 1 verifies via fresh Grep.**
- [x] **The `people/graduates/` orphan portraits ARE photos of real people who appear in the site's data without being wired up** (refuted the original "NOT staged" assumption — see Executive Summary). Plan now includes wire-ups in Phase 3 and Phase 4.
- [x] **The `people/mentors/` portraits ARE photos of real people similarly.** Same restructure.
- [x] `about/whatwedo-circle*.png` and `about/whywedoit-*.png` are NOT queued for an About-page redesign. Confirmed by category 1 decision (DELETE).
- [x] `buildwithus/`, `community/`, `partner/` (singular), and the program/impact/about hero leftovers are old scaffolding, safe to delete. Confirmed by category decisions 4–8 (all DELETE).
- [x] The `mentorshipPairings[]` carousel in `get-involved.astro` is a kept-site UI surface — extending it with portraits is a desired enhancement, not breaking change. Confirmed by category 10/11 decisions and the wire-up-split decision (full scope).
- [x] **Random-improvements branch left `src/components/PageHero.astro` in place and uses `src/assets/impact/career-development.jpg` for both `/get-involved` hero and homepage CTA.** This does NOT touch any `public/images/` candidate file, so plan 010's scope is unchanged by it.

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

- [x] [DECIDED: 2026-05-03, REVISED: 2026-05-03 r2] **Per-category retention decisions.** Now 12 rows (was 11) — see "Resolved per-category decisions" table in Current State above. Categories 1–8 = DELETE. Category 9 (a/b/c) = DELETE/REMOVE-FROM-CODE. Categories 10–11 = WIRE-UP.
  > **Decision:** See table.
  > **Rationale (refinement 1):** The `people/{graduates,mentors}/` "orphans" are photos of real people that the data references implicitly. Deleting would lose content; wiring them up adds value.
  > **Refinement 2 update:** Category 9 (`footer-logo.png`) was originally WIRE-UP, on the assumption that the wordmark image would replace the heart icon in Footer. The random-improvements branch made a different design call: text-only "Emergent Works" in both Header and Footer. That removes the consumer for both `header-logo.png` AND `footer-logo.png`, so both are now DELETE. The `organization.branding` block becomes truly dead code — remove it.

- [x] [DECIDED: 2026-05-03] **Wire-up complexity split.** Cat 10/11 wire-ups have two tiers: easy data adds (testimonials.ts, team.ts, mentorTestimonials, Footer.astro) vs hard UI change (`mentorshipPairings[]` data shape extension + carousel rendering update).
  > **Decision:** Include all wire-ups in plan 010 (full scope).
  > **Rationale:** Coherent unit of work. Splitting would create a gap between deleted orphans and wired-up content. Phase 4 isolates the UI complexity so it can be reviewed independently.

### Non-Blocking

Can resolve during implementation.

- [x] [DECIDED: 2026-05-03] **Empty directory removal.**
  > **Decision:** Remove emptied subdirectories after deletions (`approach/`, `buildwithus/`, `community/`, `partner/` singular).
  > **Rationale:** Cleaner public/images/ tree. Directories can be recreated when needed.
- [x] [DECIDED: 2026-05-03, REVISED: 2026-05-03 r2] **`organization.branding` handling.**
  > **Decision:** REMOVE the `branding` block from `organization.ts` entirely (was: WIRE THROUGH).
  > **Rationale:** Refinement 2 — the random-improvements branch decided text-only logos in Header and Footer. With no `<img>` tags consuming the paths, the `branding` block has no consumer and no plausible future consumer. Per CLAUDE.md "no half-finished implementations" / "no dead code," remove it rather than leave dangling.

## Success Criteria

Plan-level outcomes. Flipping all of these is how we know the plan succeeded.

### Cleanup outcomes

- [ ] A fresh manifest exists at `_claude/docs/public-images-cleanup-and-wireup-manifest.md` listing every plan-008-flagged candidate plus the two newly-orphaned logo files, with current Grep status and per-file decision.
- [ ] Every file in categories 1–8 (DELETE-classified) is removed; build green; no missing-image warnings.
- [ ] **Category 9a/9b:** `public/images/footer-logo.png` and `public/images/header-logo.png` are removed.
- [ ] **Category 9c:** the `branding` block is removed from `src/data/organization.ts` (the `as const` shape stays valid; no consumer means no other change needed).
- [ ] No now-empty subdirectory remains under `public/images/` (default = remove).

### Wire-up outcomes

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

- [x] For each plan-008-flagged candidate file (categories 1–8), use `Glob` to confirm the file currently exists, then `Grep` `src/` for both the bare filename and the full `/images/...` path. Classify: **STILL-ORPHAN** / **NOW-REFERENCED** (status changed since plan 008) / **STATUS-CHANGED** (file no longer exists). — All 17 confirmed STILL-ORPHAN.
- [x] Cross-check the plan 008 `dontay`/`zeek` discrepancy: confirm those files are NOT in `public/images/people/graduates/`. — Confirmed not in folder; text-only entries in testimonials.ts work via the `t.image &&` conditional in the homepage carousel.
- [x] **Build the wire-up table.** For each file in categories 10–11, determine its target wire-up location (category 9 is now DELETE-only — no wire-up needed):
  - **`people/graduates/{blueberry,julius,kat,terrence}.png`** → `testimonials.ts` entries (each gains an `image:` field).
  - **`people/graduates/nasiar.png`** → `team.ts` entry for Nasiar (replaces `placeholder-4.jpg`).
  - **`people/graduates/{alberto,lori,voice}.png`** → `mentorshipPairings[]` in `get-involved.astro` (Alberto as mentee, Lori as mentee, Voice as mentor).
  - **`people/mentors/{dawn,meagan,melissa}.png`** → `mentorTestimonials` entries in `testimonials.ts`.
  - **`people/mentors/{baraka,dylan,sneha}.png`** → `mentorshipPairings[]` (Baraka as mentee — note: file is misfiled in `mentors/` folder, see follow-up note; Dylan as mentor; Sneha as mentor).
  - **Cross-check existing `people/graduates/{nashid,sheisty,makeda,maria,wayne,crystal,rahiem,kindel}.png`** to identify which are already wired and which the carousel could reuse.
- [x] Read `src/pages/get-involved.astro` lines 17–66 (the `mentorshipPairings[]` array) and lines surrounding the carousel rendering. Captured shape, markup, classes, and `sizePairingStage()` measurement strategy in manifest.
- [x] Decide the visual pattern for the carousel update. **Final: ~72px circular thumbnails (within 60–80px target) at top of each pairing card, mentee left / mentor right, name labels under each, first-letter initial in matching circle as fallback for missing portraits.** Documented in manifest.
- [x] Read `src/components/Header.astro` and `src/components/Footer.astro` — confirmed text-only "Emergent Works" (no `<img>` tags). `src/data/organization.ts` still has the `branding` block at lines 31–34 with no consumer.
- [x] Write the manifest to `_claude/docs/public-images-cleanup-and-wireup-manifest.md`. All sections populated.
- [x] Note the `baraka.png` misfiling: portrait lives in `public/images/people/mentors/` but Baraka appears as a **mentee** in `mentorshipPairings`. Leave the file in `mentors/`; data points at the correct path either way. (Voice has the mirror issue — file in `graduates/`, role is mentor — same disposition.)

**Audit observation flowing into Phase 2:** `public/images/about/` contains exactly 6 files, all in cats 1+2 (DELETE). After Phase 2 it will be empty. Add `about/` to the remove-emptied-subdir list.

#### Verification

- [x] Read `_claude/docs/public-images-cleanup-and-wireup-manifest.md` — every section populated, no `[?]` placeholders, every plan-008 candidate accounted for, every category-10/11 portrait has a wire-up target.
- [x] Spot-check 3 random STILL-ORPHAN entries by re-running Grep — `whatwedo-circle2|community/fullwidth|partner/cca-spotlight` returned zero matches.
- [x] Spot-check 1 NOW-REFERENCED entry — N/A, no flips since plan 008.
- [x] Spot-check 3 random wire-up rows — confirmed Blueberry (line 37), Julius (line 48), Kat (line 68), Terrence (line 61) in testimonials.ts; Nasiar at lines 35–37 in team.ts; mentor section in get-involved.astro lines 84–87 uses static `portrait5` (Phase 3 fix needed).
- [x] The dontay/zeek discrepancy is documented as resolved (manifest "Re-verification summary" section).

#### Acceptance Criteria

- Manifest exists at `_claude/docs/public-images-cleanup-and-wireup-manifest.md`.
- Every plan-008 candidate file appears in the manifest with current status + decision.
- Every category-9/10/11 portrait has a documented wire-up target (file + line + suggested edit).
- The carousel UI plan documents the chosen visual pattern and current/proposed shapes.
- The classification is reproducible — each STILL-ORPHAN entry cites a re-runnable Grep query.
- No code, files, or assets have been deleted or modified in this phase.

#### Phase Exit Gate

<!-- verifier-recommendation: yes — Manifest is the authoritative input to Phases 2–4. Plus the wire-up table needs cross-file consistency (every portrait → real testimonial/team/inline-data row). Catching a mis-mapping here vs after a wire-up commit (and hunting down a stale image: field reference) is much cheaper. Plan 008 followed the same pattern. -->

- [x] Run Definition of Done commands (see plan header). All must pass. — `npm run build` exited 0 (baseline; no code changes in this phase).
- [x] **Spawn plan-verifier.** Invoke `subagent_type="project-management:plan-verifier"` with the plan file path and phase number. Wait for its report. — Verifier reported all PASS. Two non-blocking observations: off-by-one line numbers in manifest wire-up tables (FIXED), and Phase 2's task list missing `about/` from empty-dir removal (FIXED).
- [x] **Apply verification report.** All tasks PASS — flipped `[x]` for everything in Phase 1.
- [x] **Agent self-review.** Verified the verifier's two observations are addressed (manifest line numbers corrected; Phase 2 task list updated to include `about/`). No carry-overs to future phases.

---

### Phase 2: Delete Confirmed Orphans (Categories 1–8 + Cat 9a/9b Logos)

Mechanical deletion of the 19 confirmed-orphan files (17 from cats 1–8 plus the two newly-orphaned logo PNGs) plus their now-empty parent directories.

#### Tasks

- [x] Delete files per categories 1–8 — all 17 removed via `git rm`.
- [x] **Delete category 9a/9b logos** — `header-logo.png` and `footer-logo.png` removed via `git rm`.
- [x] After all deletions, removed empty subdirectories — `git rm` auto-cleaned all 5 (about, approach, buildwithus, community, partner) when their last files were removed; `rmdir` returned "No such file or directory" for all 5, confirming they're gone.
- [x] `programs/`, `impact/` not touched — confirmed via Glob: both directories still present with their kept files.
- [x] Re-grep `src/` for the deleted paths — zero matches for the cats 1–8 paths; logos return only the two `organization.ts.branding` literals as expected.
- [x] Run `npm run build` — exit 0, 8 pages built, no warnings.

#### Verification

- [x] `npm run build` — exits 0, no missing-image warnings.
- [x] Glob `public/images/**/*` — confirms every deleted file is gone (including `header-logo.png` and `footer-logo.png` at root).
- [x] Glob `public/images/{approach,buildwithus,community,partner,about}` — zero results (directories removed).
- [x] Grep `src/` for cats-1–8 paths — zero hits across all patterns.
- [x] Grep `src/` for `/images/header-logo|/images/footer-logo` — only matches: the two literals in `organization.ts:32` and `:33` (will go away in Phase 3).

#### Acceptance Criteria

- All 17 cat-1–8 files removed.
- Both cat-9a/9b logo files (`header-logo.png`, `footer-logo.png`) removed.
- 5 now-empty directories removed (`approach/`, `buildwithus/`, `community/`, `partner/` singular, `about/`).
- All KEEP files (everything not in cat 1–8 or 9a/9b) still present.
- Build green.

#### Phase Exit Gate

<!-- verifier-recommendation: no — Mechanical execution against an already-verified manifest. Build catches dangling references; per-file rm + grep + build is self-checking. The audit phase already had verifier coverage. -->

- [x] Run Definition of Done commands (see plan header). All must pass. — `npm run build` exited 0.
- [x] **Agent self-review.** All Phase 2 tasks completed. Build green. Zero src/ references to deleted paths (logos retain only the two expected `organization.ts.branding` literals, scheduled for removal in Phase 3). All 5 emptied subdirs gone.

---

### Phase 3: Easy Wire-Ups (Data Adds + Branding Block Cleanup)

Wire up everything that doesn't require UI rendering changes. Pure data edits plus removing the now-dead `organization.branding` block.

#### Tasks

- [x] **Remove the `branding` block from `src/data/organization.ts`.** Done; `as const` shape intact.
- [x] **`testimonials.ts` — main testimonials.** Added `image:` to Blueberry (line 38), Julius (line 50), Kat (line 72), Terrence (line 64).
- [x] **`testimonials.ts.mentorTestimonials`** — added `image:` to Meagan (line 140), Dawn (line 147), Melissa (line 154).
- [x] **`team.ts`** — Nasiar Denobrega image swapped from `placeholder-4.jpg` to `/images/people/graduates/nasiar.png` at line 37.
- [x] Confirm rendering works for the new `image:` fields:
  - `src/pages/index.astro:136-140` — `t.image && (...)` conditional already present; no change needed.
  - `src/pages/team.astro:33` — direct `member.image` rendering; no change needed.
  - `src/pages/get-involved.astro:84-88` — was hardcoded `portrait5`; updated to ternary `mentorQuote.image ? <img src=...> : <Image src={portrait5} ...>` so the data drives rendering with portrait5 as fallback.
- [x] Run `npm run build` — exit 0, no warnings.

#### Verification

- [x] `npm run build` — exits 0.
- [x] Grep `src/` for `organization.branding` and `branding:` — zero hits.
- [x] Read `src/components/Header.astro` and `src/components/Footer.astro` — confirmed not modified by this phase (per git status).
- [x] Read `src/data/testimonials.ts` — Blueberry, Julius, Kat, Terrence entries each have correct `image:` field.
- [x] Read `src/data/testimonials.ts` `mentorTestimonials` — Dawn, Meagan, Melissa each have `image:` field.
- [x] Read `src/data/team.ts` — Nasiar's `image:` is `/images/people/graduates/nasiar.png`.
- [ ] Manual: developer dev-server spot-check — deferred to Phase 5 final verification (developer hasn't started server yet).

#### Acceptance Criteria

- `branding` block removed from `organization.ts`; no remaining references to `organization.branding` anywhere in `src/`.
- Header.astro and Footer.astro unchanged from the random-improvements branch state (text-only wordmark).
- 7 testimonial entries (4 main + 3 mentor) have `image:` fields pointing at existing portrait files.
- Nasiar's team entry uses his real photo.
- Build green; visual parity confirmed by spot-check.

#### Phase Exit Gate

<!-- verifier-recommendation: yes — Cross-file refactor: organization.ts + testimonials.ts + team.ts all touched, plus rendering surfaces in 3 page files inspected. Easy to mis-paste a path or miss a rendering check. Verifier confirms (a) every edit is consistent with the manifest's wire-up table, (b) no rendering surface accidentally lost the conditional-portrait check, (c) `branding` block is fully removed (no orphan references). -->

- [x] Run Definition of Done commands (see plan header). All must pass. — Build exit 0.
- [x] **Spawn plan-verifier.** Verifier reported all Tasks PASS, all Acceptance Criteria PASS except dev-server spot-check (deferred to Phase 5) and Header/Footer non-regression (verified by absence from `git status` modified list).
- [x] **Apply verification report.** All PASS items flipped above.
- [x] **Agent self-review.** Verifier confirmed scope was clean (only the 4 expected source files modified plus plan/manifest docs). One observation about dual "Meagan" entries (mentor in testimonials.ts + advisory board in team.ts) — both retain distinct `image:` values, no conflict.

---

### Phase 4: Mentorship Pairings UI Redesign + Remaining Wire-Ups

The bigger UI change. `mentorshipPairings[]` data shape grows to include image refs, and the carousel rendering is updated to display portraits. Remaining portrait wire-ups (Alberto, Lori, Voice, Baraka, Dylan, Sneha) land here.

#### Tasks

- [x] **Extend the data shape** in `src/pages/get-involved.astro` `mentorshipPairings[]` — added `Person` and `Pairing` interfaces with `image?: string` on `Person`. All 8 pairings populated per the manifest; Octavia (×2) and Army correctly omit `image` (no portrait files).
- [x] **Update the carousel rendering** — added `pairing-card__portraits` row above existing header. Conditional `{image ? <img/> : <div class="...fallback">{initial}</div>}` for both mentee and mentor; `aria-hidden="true"` on fallback divs (initial is decorative; person-name span provides accessible name).
- [x] Run `npm run build` — exit 0, no warnings.
- [ ] Visual spot-check (developer): deferred to Phase 5 final verification.

#### Verification

- [x] `npm run build` — exits 0.
- [x] Read `src/pages/get-involved.astro` — data shape extended; every pairing populated with `image:` field where a portrait exists (14 of 16 slots).
- [x] Read the carousel rendering markup — new portrait elements present; fallback logic for missing images present.
- [ ] Manual: developer dev-server spot-check — deferred to Phase 5.

#### Acceptance Criteria

- `mentorshipPairings[]` data shape includes optional `image?: string` on both `mentee` and `mentor`.
- Every pairing is populated with image refs where matching portrait files exist (8 pairings × up to 2 images = up to 16 image refs).
- Carousel rendering displays portraits with graceful fallback for missing images.
- Visual design works on desktop and mobile (developer spot-check confirms).
- Build green.

#### Phase Exit Gate

<!-- verifier-recommendation: yes — UI change + data-shape change + cross-pairing consistency. Easy to misroute a portrait (e.g., put Alberto's photo on Lori's pairing). Verifier confirms (a) every pairing's image refs match the manifest's wire-up table, (b) the rendering markup uses the new image fields and the fallback path, (c) no other consumer of mentorshipPairings broke. -->

- [x] Run Definition of Done commands (see plan header). All must pass. — Build exit 0.
- [x] **Spawn plan-verifier.** All Tasks PASS, all Acceptance Criteria PASS except dev-server spot-check (deferred to Phase 5). Verifier confirmed every image ref matches the manifest, fallback path renders sage initial circle for Octavia/Army, JS measurement (`scrollHeight`) handles the new row automatically, mobile breakpoint preserved.
- [x] **Apply verification report.** All PASS items flipped above.
- [x] **Agent self-review.** Verifier flagged a non-blocking observation: Phase 4 task description used pre-edit line numbers ("17–66" / "113–132") which are now stale post-Phase-4 (data block is 17–78). Carry-over: noted in retro.

---

### Phase 5: Final Verification

Confirm the project is in a clean, fully-wired state. Mirrors plan 008 Phase 6 in shape.

#### Tasks

- [x] Delete `dist/`. Run `npm run build` from a clean tree — exit 0, 8 pages built, no warnings.
- [x] Grep `src/` for cats-1–8 deleted paths — zero matches.
- [x] Grep `src/` for `/images/header-logo|/images/footer-logo` — zero matches anywhere.
- [x] Grep `src/` for `organization.branding|branding:` — zero matches.
- [x] List `public/images/` subdirectories — only `partners/`, `team/`, `people/graduates/`, `people/mentors/` remain. `about/`, `approach/`, `buildwithus/`, `community/`, `partner/` singular all gone. `header-logo.png` and `footer-logo.png` no longer at `public/images/` root.
- [x] `_claude/docs/public-images-cleanup-and-wireup-manifest.md` exists and matches the executed work.
- [ ] **Ask the developer to start the dev server** (`npm run dev`) and spot-check each kept-site route:
  - `/` (homepage testimonial carousel — 4 new portraits visible: Blueberry, Julius, Kat, Terrence)
  - `/about`
  - `/programs` and detail pages
  - `/team` (Nasiar's real photo replaces placeholder)
  - `/get-involved` (mentor testimonial shows Meagan's portrait; mentorship pairings carousel now shows portraits with fallback initials for Octavia/Army)
  - `/impact`
  - All pages: Header and Footer still render text-only "Emergent Works" (no regression from random-improvements work).

#### Verification

- [x] `npm run build` from clean tree exits 0.
- [x] All grep checks above return zero.
- [x] `public/images/` has no removed subdirs.
- [x] Developer confirmation that all kept-site routes render correctly with the new portraits and footer. — Confirmed by developer; one post-spot-check adjustment to the mentorship pairings carousel (avatars no longer use a circular crop wrapper — image displays at natural aspect; name labels under each avatar removed since the existing pairing-card header already names them).

#### Acceptance Criteria

- Every Plan-level Success Criterion is met.
- No grep finds deleted paths in `src/`.
- Empty subdirs are gone.
- Manifest matches executed work.
- Developer dev-server spot-check confirms no regressions and the new portraits render correctly.

#### Phase Exit Gate

<!-- verifier-recommendation: no — This phase IS verification. Recursive verifier-on-verifier adds no signal. Self-review against the explicit checklist plus the developer spot-check is sufficient. -->

- [x] Run Definition of Done commands (see plan header). All must pass. — Clean build exit 0.
- [x] **Agent self-review.** All programmatic verification passes (build, greps, dir listing, file scope). The remaining unchecked item is the developer dev-server spot-check, which per CLAUDE.md must be run by the developer (Claude does not start the dev server). Per the Completion section, the plan stays in `in_progress/` until the spot-check confirms no regressions.

## Refinement History

- **2026-05-03:** Initial plan creation. Acts on plan 008's "Other `public/images/` subdirectories — informational audit." Two-phase shape (audit → execute). 11 categorical retention questions captured for the developer.
- **2026-05-03:** Resolved 1 blocking (per-category retention: 8 DELETE + 3 WIRE-UP) + 1 wire-up-split decision (full scope) + 2 non-blocking questions (remove empty dirs; wire `organization.branding` data-driven). Verified 8 assumptions (5 confirmed, 2 refuted via deeper investigation — `people/{graduates,mentors}/` portraits ARE photos of real people, not orphans; rewrote those assumptions). Verification Policy kept at Adaptive. **Plan restructured from 2 phases to 5** to accommodate the expanded scope: Re-Verify → Delete → Easy Wire-Ups → Mentorship UI Redesign → Final Verification. Plan title updated from "`public/images/` Orphan Cleanup" to "`public/images/` Cleanup and Portrait Wire-Up" to reflect dual purpose.
- **2026-05-03 r2:** Reconciled with the random-improvements branch (heroes + logo removal) which merged to main between draft revisions. Two changes flow downstream into this plan: (1) Header.astro and Footer.astro are now text-only "Emergent Works" — both `<img>` tags and the corresponding CSS rules in Layout.astro are gone. (2) Therefore `/images/header-logo.png` and `/images/footer-logo.png` are both orphans, and `organization.ts.branding` is dead code. **Category 9 split into 9a/9b/9c:** `footer-logo.png` flips from WIRE-UP → DELETE, `header-logo.png` added as DELETE, and the `branding` block flagged for removal from `organization.ts`. Phase 2 now deletes 19 files (was 17). Phase 3 swaps "Header/Footer logo routing" for "remove `branding` block." Phase 5 grep checks updated. Success Criteria's "Footer wordmark / Header data-driven" outcomes removed; "branding block removed / both logo PNGs deleted" added. Verified the random-improvements branch did NOT touch any other plan-010 candidate file — `mentorshipPairings[]`, testimonials.ts, team.ts, and all 22 portrait files in `people/{graduates,mentors}/` are unchanged.

## Completion

After the final phase's Exit Gate passes, the executing agent performs these steps without prompting the user:

1. Populate the Retro section below from observable execution signals (what worked, what didn't, learnings). Write in terse bullet form.
2. Move this plan file from `_claude/plans/in_progress/` to `_claude/plans/completed/`.

If the final phase's Exit Gate has unresolved FAILs or UNVERIFIEDs after the allowed retries, do NOT move the file or write the retro. Escalate to the user with full context and stop.

## Retro

### What worked

- **Audit-first phase paid for itself.** Phase 1's manifest caught two surprises before any deletion: (1) `public/images/about/` would also go to zero files (not flagged in original Phase 2 task list), and (2) the get-involved mentor section hardcoded `portrait5` instead of consuming `mentorQuote.image`. Both were cheap to fix once mapped; would have been confusing if discovered mid-execution.
- **Adaptive verifier policy matched the work.** Three verifier runs (Phases 1, 3, 4) all returned PASS with only minor non-blocking observations. Phase 2 (mechanical deletion) and Phase 5 (verification-of-verification) correctly skipped the verifier per the per-phase recommendations.
- **Splitting wire-ups into "easy" (Phase 3) and "hard" (Phase 4) kept blast radius small.** Phase 3 was pure data + one rendering-conditional fix; Phase 4 was the only phase that touched UI markup + CSS. If the carousel needed iteration, Phase 3's wire-ups were already locked in.
- **Random-improvements branch reconciliation in r2 refinement was correct.** Re-categorizing the logos as DELETE rather than WIRE-UP avoided shipping dead-code branding paths that nothing would consume.
- **`git rm` autocleaned empty subdirectories on Windows.** Saved a separate `rmdir` step; `rmdir` returning "No such file or directory" was harmless confirmation.

### What didn't

- **Manifest line numbers were off-by-one** for several testimonials.ts entries (Julius/Terrence/Kat/Meagan/Dawn/Melissa). Verifier flagged it as non-blocking since edits were keyed by name, not line number, but it cost a small fix-up pass. Future audits should grep + cite the matched line directly rather than counting from a Read offset.
- **Initial avatar styling needed two iterations after spot-check.** First pass put avatars in 72px clipping circles (mismatch — source images are already avatar-style with embedded vignette, so faces became tiny). Second pass added `transform: scale(1.6)` like the homepage. Third pass removed the circle entirely and dropped name labels per developer preference. Would have been one pass if Phase 1 had checked the actual visual style of an existing avatar source file.
- **Phase 4 task description used pre-edit line refs** ("17–66" / "113–132") that became stale after the edits. Cosmetic but noisy in retrospect.

### Learnings

- **Eyeball one source asset before designing rendering for new image categories.** Knowing the source is "already an avatar with vignette" vs "raw portrait" determines whether you wrap-and-clip or display-as-is. Cheaper to look once than iterate three times.
- **Audit phase should grep with `output_mode: content` + `-n: true`** when capturing target line numbers in a manifest. Reading + counting offsets drifts; grep cites the authoritative line.
- **When there's an existing pattern for the same problem on another page, mirror it from the start.** The homepage `voices-carousel__portrait` had already solved the avatar-vignette problem; the pairings carousel reinvented the wheel and had to be retrofitted to match.
- **For data-driven rendering changes, check the rendering surface in Phase 1.** The `mentorQuote.image` hardcode discovery was a Phase 1 win because the manifest's "Rendering check" table forced a read of the consumer. That pattern should generalize: any time the wire-up touches an existing field, check that the consumer reads it conditionally.
