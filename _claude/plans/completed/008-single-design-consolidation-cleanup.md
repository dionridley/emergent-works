# Plan: Single-Design Consolidation and Project Cleanup

## Metadata

- **Number:** 008
- **Status:** completed
- **Created:** 2026-05-03
- **Last refreshed:** 2026-05-03
- **Refinement count:** 2
- **Plan type:** standard-feature
- **Verification Policy:** Adaptive
- **Related PRD:** N/A

## Executive Summary

The project was scaffolded as a multi-design comparison harness — a `/designs` route at `src/pages/designs/` holds several alternative theme variants (community-mosaic, bold-movement, impact-first, mentorship, the-journey, stories) used to evaluate design directions. We have selected one direction — the design implemented at `src/pages/index.astro`, `src/pages/about.astro`, `src/pages/programs/*`, `src/pages/team.astro`, and `src/pages/get-involved.astro`. This plan removes everything tied exclusively to the unselected variants, migrates the few shared assets that currently live under `public/images/designs/` to a non-design location, and consolidates the file structure into a single-purpose website foundation suitable for ongoing build-out.

The plan also produces a written recommendation on whether to migrate from raw `<img src="/images/...">` references in `public/` to Astro's `<Image>` component with `astro:assets` (which requires assets to live under `src/`). The investigation deliverable is a recommendation document; if the recommendation is to migrate, the migration itself is scoped as a follow-up plan rather than expanding this one.

## Current State

- **Routes kept:** `/`, `/about`, `/programs`, `/programs/teck`, `/programs/trap`, `/team`, `/get-involved`. These constitute the chosen design.
- **Routes to remove:** Everything under `/designs/*`. Subdirectories observed: `community-mosaic/`, `bold-movement/`, `impact-first/`, `mentorship/`, `the-journey/`, `stories/`. Each variant has its own pages, often including nested `programs/` subroutes and a `get-involved.astro`.
- **Known shared assets** referenced by the kept site but located in `public/images/designs/stock/`:
  - `portrait-7.jpg` — used by the homepage Featured Story (`src/pages/index.astro`).
  - `community-group-4.jpg` — used by the homepage CTA (`src/pages/index.astro`).
  Phase 1 will surface any others.
- **Known orphaned assets after PR #10:** `public/images/testimonial/{dontay,nashid,sheisty,zeek}.png` are no longer referenced. `decorative.png` in the same folder may still be in use — Phase 1 verifies.
- **Known placeholder data:** `fabricatedTestimonials` in `src/data/testimonials.ts`. Likely imported only by `/designs/*` pages — Phase 1 verifies.
- **Image strategy today:** All images live in `public/`. References use raw `<img src="/images/...">` and bypass Astro's `<Image>` / `astro:assets` optimization pipeline (no automatic format conversion to AVIF/WebP, no responsive `srcset` generation, no automatic lazy-loading defaults).

## Assumptions

- [x] PR #10 ("Replace placeholders with real team, timeline, and portrait content") has been merged to `main`.
- [x] The chosen design = pages directly under `src/pages/` excluding the `designs/` subtree.
- [x] `/designs/*` routes are internal evaluation surfaces — no external site, marketing material, or stakeholder link points at them, so a hard delete is acceptable.
- [x] Astro 5's `<Image>` component requires assets to live under `src/` (typically `src/assets/`). Assets in `public/` are served as-is without optimization.
- [?] Beyond the two known stock images (`portrait-7.jpg`, `community-group-4.jpg`), no other files under `public/images/designs/` are referenced by the kept site. Phase 1 verifies via grep.
- [?] No component, layout, or data export imported by the kept site's pages lives in a `/designs`-suffixed location. Phase 1 verifies.
- [?] `decorative.png` under `public/images/testimonial/` is referenced by at least one kept-site page. Phase 1 verifies.

## Open Questions & Decisions

### Execution Policy

These settings control how phases verify completion. They can be changed at any time via `/dr-plan @[this-plan] answer questions` — they are not terminal decisions.

- [ ] **Verification Policy** [OPEN] Current: Adaptive
  Last changed: 2026-05-03 (was: Never)

  How should Phase Exit Gates verify completion?
  - Option A (Always): Every phase spawns `project-management:plan-verifier`. Highest rigor, highest token cost. Use for high-stakes work or when self-verification has been unreliable.
  - Option B (Adaptive): Each phase is annotated at create-time with `<!-- verifier-recommendation: yes|no -->`. The verifier runs only on phases the model judged worth the cost.
  - Option C (Never): No verifier subagent. Agent self-review only. Lowest cost, lowest rigor.

### Blocking

Must resolve before implementation starts.

- _None._

### Non-Blocking

Can resolve during implementation.

- [x] [DECIDED: 2026-05-03] **Phase 5 outcome routing.** If the Astro image-optimization investigation recommends migrating to `src/assets/` + `<Image>`, do we (a) scope the migration as a follow-up plan, or (b) expand this plan with an additional phase to perform the migration?
  > **Decision:** Scope the migration as a follow-up plan.
  > **Rationale:** Keeps this plan focused on cleanup. A separate plan (e.g. `009-astro-image-optimization-migration`) is easier to scope, schedule, and roll back independently.
- [x] [DECIDED: 2026-05-03] **Naming for the migrated stock-image folder.** Phase 2 needs a destination folder under `public/images/`. Options: `public/images/stock/`, `public/images/featured/`, or split by purpose (`hero/`, `cta/`).
  > **Decision:** `public/images/stock/`.
  > **Rationale:** Drops the misleading `designs/` parent while preserving the existing "stock" naming. Smallest deviation from current structure.
- [x] [DECIDED: 2026-05-03] **`decorative.png` retention.** If Phase 1 finds no references to `public/images/testimonial/decorative.png`, delete it with the other orphans. If found in use, keep and migrate location alongside Phase 4.
  > **Decision:** Delete it if unreferenced.
  > **Rationale:** Treats it as another orphan and lets us remove the `testimonial/` folder cleanly. If Phase 1 finds it in active use, the contingent path (keep + relocate in Phase 4) still applies.

## Success Criteria

- [x] `/designs/*` routes are removed; `npm run build` produces no `dist/designs/` output.
- [x] `npm run build` exits 0 with no warnings about missing image references.
- [x] No file under `public/images/designs/` exists after the cleanup.
- [x] No file under `public/images/testimonial/` exists unless verified in active use. (None in active use; whole directory removed.)
- [x] No component, layout, or data export remains in `src/` whose only consumer was a `/designs/*` page.
- [x] `src/data/testimonials.ts` no longer exports `fabricatedTestimonials` unless a kept-site page genuinely uses it.
- [x] A recommendation document exists at `_claude/docs/image-optimization-recommendation.md` covering: tradeoffs of `public/` vs `src/assets/`, what optimization gains are forfeited today, estimated migration effort, and a clear recommend / don't-recommend conclusion with reasoning.
- [x] All kept-site pages render correctly when the developer runs the dev server and spot-checks them. (Developer confirmed 2026-05-03: "everything is functioning properly and no images are missing.")

## Definition of Done

Every Phase Exit Gate must confirm these before flipping any `[x]` in the phase:

- Build passes: `npm run build` exits 0.
- TypeScript validation: covered by `npm run build` (Astro 5 runs TS through Vite during build; no separate `astro check` script is configured).
- Tests: N/A — the project has no test infrastructure.
- Lint: N/A — the project has no lint configuration.

If a category genuinely doesn't apply, that's already noted above. Do not gate phases on commands that aren't wired up.

## Implementation Plan

### Phase 1: Audit and Deletion Manifest

This phase produces a written manifest. **No code, files, or assets are deleted in this phase.**

#### Tasks

- [x] Enumerate every page under `src/pages/designs/` (recursive). Record the full list.
- [x] For each component in `src/components/`, run `Grep` across `src/` for its import. Classify:
  - **KEEP** — imported by at least one kept-site page (anything under `src/pages/` excluding `designs/`).
  - **DELETE** — imported only by pages under `src/pages/designs/`.
  - **ORPHAN** — imported nowhere.
- [x] Repeat for layouts in `src/layouts/`.
- [x] Repeat for data exports in `src/data/*.ts`. For exports (not whole files), classify each named export. `fabricatedTestimonials` and `mentorTestimonials` are likely candidates.
- [x] For every file under `public/images/designs/`, grep `src/` for the path. Classify:
  - **KEEP-MIGRATE** — referenced by a kept-site page (must move out of `designs/`).
  - **DELETE** — referenced only by `/designs/*` pages or unreferenced.
- [x] For every file under `public/images/testimonial/` (post-PR-10 leftovers + `decorative.png`), grep `src/` for the path. Classify KEEP / DELETE.
- [x] Audit any other `public/images/` subdirectories for similar issues (e.g. unreferenced subfolders).
- [x] Write the manifest to `_claude/docs/single-design-cleanup-manifest.md` with five sections: **Pages to delete**, **Components — keep / delete / orphan**, **Layouts — keep / delete / orphan**, **Data exports — keep / delete**, **Assets — keep / migrate / delete**. Each entry lists the path and the list of importers (or "none").

#### Verification

- [x] Read `_claude/docs/single-design-cleanup-manifest.md` — every section populated, no `[?]` placeholders left in.
- [x] Spot-check three random KEEP entries by re-running `Grep` for the import — confirms classification.
- [x] Spot-check three random DELETE entries by re-running `Grep` for the import — confirms only `/designs/*` (or no) consumers exist.
- [x] Confirm `portrait-7.jpg` and `community-group-4.jpg` appear in the **Assets — keep / migrate** section.

#### Acceptance Criteria

- Manifest exists at `_claude/docs/single-design-cleanup-manifest.md`.
- Every component, layout, and data export is classified.
- Every asset under `public/images/designs/` is classified.
- The classification is reproducible — i.e. each KEEP/DELETE entry cites at least one Grep result the developer or verifier can re-run.
- No code, files, or assets have been deleted in this phase.

#### Phase Exit Gate

<!-- verifier-recommendation: yes — Manifest is the authoritative input to Phase 3's deletions. A misclassification here causes a wrong delete in Phase 3, and the cost of catching it post-delete (git revert + re-audit) outweighs the verifier cost. -->

- [x] Run Definition of Done commands (see plan header). All must pass. (`npm run build` exit 0, 57 pages built.)
- [x] **Spawn plan-verifier.** Invoke `subagent_type="project-management:plan-verifier"` with the plan file path and phase number. Wait for its report.
- [x] **Apply verification report.** Flip `[x]` only for tasks the verifier reports as PASS. Keep `[ ]` for FAIL and UNVERIFIED with a note referencing the verifier's reasoning. (Verifier returned PASS on every Phase-1 item; manifest tally fix `42 → 49 pages` applied per verifier observation.)
- [x] **Agent self-review.** Re-read Tasks above, confirm the verifier's recommendations are reflected, note any UNVERIFIEDs that need follow-up in future phases or the Retro. (Two manifest-flagged developer questions deferred to Phase 3 entry: `/impact` route inclusion; 5 KEEP-MIGRATE assets vs plan's 2.)

---

### Phase 2: Migrate Shared Assets Out of `/images/designs/`

For every asset classified as **KEEP-MIGRATE** in Phase 1's manifest, copy it to a non-design location and update kept-site references. Originals stay in `public/images/designs/` for now — they will be deleted with `/designs` pages in Phase 3, and `/designs` pages still need them until then.

#### Tasks

- [x] Decide migration destination. Default per resolved question: `public/images/stock/`. Confirm against any pattern that surfaced in Phase 1's audit (e.g. if multiple migrate-worthy categories exist, split into `public/images/featured/` etc.). (Stayed with `public/images/stock/` — only one migrate-worthy category surfaced, all 5 assets are stock photography.)
- [x] For each KEEP-MIGRATE asset, **copy** (not move) the file to the chosen destination. (5 files: community-group-4, music-studio-2, portrait-5, portrait-7, tech-coding-4.)
- [x] In every kept-site page that references the original path, update the `src` to point at the new location. Use exact-string replace. (5 references in `index.astro` x2, `programs/teck.astro`, `programs/trap.astro`, `get-involved.astro`.)
- [x] Re-grep `src/` (excluding `src/pages/designs/`) for the original `/images/designs/` path — should return zero matches in kept-site code. (Confirmed: all remaining 9 hits are under `src/pages/designs/`.)
- [x] Confirm `src/pages/designs/*` references are unchanged — those still point at originals (which still exist).

#### Verification

- [x] Run `npm run build` — expected: exits 0, no missing-image warnings. (57 pages built, 7.55s.)
- [x] Read `src/pages/index.astro` — `portrait-7.jpg` and `community-group-4.jpg` references point at new location.
- [x] Grep `src/` excluding `src/pages/designs/` for `/images/designs/` — expected: zero matches.
- [x] Inspect file existence: both originals and copies exist (originals will be deleted in Phase 3).

#### Acceptance Criteria

- Every Phase-1 KEEP-MIGRATE asset has a copy at the new location.
- No kept-site page references `/images/designs/` anywhere.
- Originals still exist at `public/images/designs/` — they remain referenced by `/designs/*` pages until those pages are deleted in Phase 3.
- Build is green.

#### Phase Exit Gate

<!-- verifier-recommendation: no — Phase scope is small (a copy + a few exact-string replaces). Build catches any broken reference. Self-review is sufficient. -->

- [x] Run Definition of Done commands (see plan header). All must pass.
- [x] **Agent self-review.** Re-read all Tasks above. Flip `[x]` only for tasks whose Verification passed. Any failing or skipped task stays `[ ]` with a short note explaining why. Under-report beats over-report.

---

### Phase 3: Delete `/designs` Pages and Exclusive Code & Assets

This is the high-blast-radius phase. Every deletion below must trace to an entry in the Phase 1 manifest.

#### Tasks

- [x] Delete the entire `src/pages/designs/` directory. (49 files)
- [x] Delete every file under `src/components/` classified as DELETE in the manifest. (21 files under `src/components/designs/`; **plus 13 ORPHAN root components** deleted with explicit user approval — Button, CenteredBlock, ContentSection, DonationForm, HeroSection, MobileNav, PageHero, ProgramCard, QuoteSection, Section, StatCard, TeamMemberCard, TestimonialBlock)
- [x] Delete every file under `src/layouts/` classified as DELETE in the manifest. (6 files under `src/layouts/designs/`)
- [x] Remove DELETE-classified named exports from data files (e.g. `fabricatedTestimonials` from `src/data/testimonials.ts`). If a whole data file is now empty or is itself classified DELETE, delete the file. (Removed: `fabricatedTestimonials`, `allTestimonials`, `secondaryStats`, `allStats`, `nationalComparisons`, `alumniStories`, `mentorProfiles`, `fabricatedEvents` + their interfaces. **Plus ORPHAN exports** with explicit user approval: `allTeam`, `donationFrequencies`, `DonationFrequency`. No data file was deleted; `fabricated.ts` retained for `expandedProgramDetails` — Phase 4 candidate to rename.)
- [x] Delete the entire `public/images/designs/` directory (originals of migrated assets are now redundant since copies live elsewhere; the rest were `/designs`-only).
- [x] Delete `public/images/testimonial/{dontay,nashid,sheisty,zeek}.png` — confirmed unreferenced post-PR-10.
- [x] Delete `public/images/testimonial/decorative.png` if Phase 1 confirmed it is unreferenced (per resolved question — delete-if-unreferenced is the chosen policy). Otherwise leave; it will be addressed in Phase 4 if it needs relocating.
- [x] If `public/images/testimonial/` is now empty, remove the directory.
- [x] Re-grep `src/` for any of the deleted paths — should return zero matches (if any remain, they are dangling imports that must be fixed before the build passes).

#### Verification

- [x] Run `npm run build` — expected: exits 0. Build will fail loudly if any dangling import or missing-image reference survived. (8 pages built, 4.92s.)
- [x] Grep `src/` for `from "../components/[deleted-name]"` patterns for each deleted component — expected: zero matches.
- [x] Grep `src/` for `from "../data/testimonials"` and inspect each result — confirms no kept-site page imports a now-removed export.
- [x] List `public/images/` — expected: no `designs/` subdirectory.
- [x] List `src/pages/` — expected: no `designs/` subdirectory.
- [x] Compute total deletion count from `git status` — should match Phase 1 manifest's DELETE count (page deletions, component deletions, layout deletions, asset deletions). Variance is acceptable but should be explainable. (Verifier confirmed all deletions trace to manifest entries or pre-approved ORPHAN scope.)

#### Acceptance Criteria

- `src/pages/designs/` does not exist.
- `public/images/designs/` does not exist.
- All Phase-1 DELETE-classified components, layouts, and data exports are removed.
- The leftover testimonial images (`dontay.png`, `nashid.png`, `sheisty.png`, `zeek.png`) are removed.
- Build is green.
- Every deletion traces to a manifest entry; no opportunistic side-deletions.

#### Phase Exit Gate

<!-- verifier-recommendation: yes — Largest deletion phase. Verifier checks (a) every deletion has a manifest entry and (b) no kept-site reference points at a deleted path. Cost of catching a wrong delete here vs after merge is significant. -->

- [x] Run Definition of Done commands (see plan header). All must pass.
- [x] **Spawn plan-verifier.** Invoke `subagent_type="project-management:plan-verifier"` with the plan file path and phase number. Wait for its report.
- [x] **Apply verification report.** Flip `[x]` only for tasks the verifier reports as PASS. Keep `[ ]` for FAIL and UNVERIFIED with a note referencing the verifier's reasoning. (PASS on every item.)
- [x] **Agent self-review.** Re-read Tasks above, confirm the verifier's recommendations are reflected, note any UNVERIFIEDs that need follow-up in future phases or the Retro. (Two items confirmed for Phase 4: vestigial `/designs/` filter in `astro.config.mjs:16`; `src/data/fabricated.ts` rename/relocate.)

---

### Phase 4: Structural Pass — Rename and Flatten

With `/designs` gone, walk the surviving structure and look for naming or indirection that only made sense in the multi-design world. This phase is intentionally light — most of the structure already fits a single-design app. Expected scope: a handful of renames, possibly none.

#### Tasks

- [x] Inspect `src/components/` for component names that imply variant-specific design (e.g. names suffixed with a design variant). Rename to neutral names if found. (Only `Header.astro` and `Footer.astro` remain — both neutral. CSS class prefix `st-` originated from "Stories" but is now an opaque prefix used consistently across all kept files; renaming would be high-effort, zero-functional-benefit, deferred.)
- [x] Inspect `src/layouts/` for layouts named after a design variant. The kept site uses `Layout.astro`; verify nothing in the surviving layout names references a variant. (File name fine. Removed the "Stories — Layout (Root Site Version)" header comment block from `Layout.astro` — was actively misleading.)
- [x] Inspect `src/data/` files for exports that exist only because of multi-design A/B comparisons (e.g. an array of "variants" or "themes"). Remove if found. (Merged `ExpandedProgramDetail` + `expandedProgramDetails` from `fabricated.ts` into `programs.ts` and deleted `fabricated.ts`. Updated 2 imports in `programs/{teck,trap}.astro`. Dropped unused `fabricated?: boolean` field from `Testimonial` and `Program` interfaces — no rows set it after Phase 3. Kept the field on `TeamMember` (8 active placeholder markers) and `ExpandedProgramDetail` (3 active placeholder markers).)
- [x] Inspect `public/images/` subdirectories for naming that no longer fits (e.g. a `stock/` folder that was named generically but is in fact only used by one feature could be renamed). This is a judgment call — only rename when a current name is actively misleading. (No misleading names. `stock/` accurately describes its 5 stock photographs.)
- [x] If anything in `astro.config.mjs`, `tsconfig.json`, or other config references the deleted `/designs` paths or design-variant-specific aliases, remove those entries. (Removed `filter: (page) => !page.includes('/designs/')` from `astro.config.mjs`'s sitemap integration — vestigial. `tsconfig.json` had no `/designs` references.)

#### Verification

- [x] Run `npm run build` — expected: exits 0. (8 pages built, 4.87s, no warnings.)
- [x] Read `src/components/`, `src/layouts/`, `src/data/` listings — names align with single-purpose app conventions. (`src/components/`: Header.astro, Footer.astro. `src/layouts/`: Layout.astro. `src/data/`: donation, organization, partners, programs, stats, team, testimonials — all single-purpose names.)
- [x] Read `astro.config.mjs` — no orphan references to deleted paths.

#### Acceptance Criteria

- No surviving file or directory name implies multi-variant design.
- Config files have no references to deleted paths.
- Build is green.

#### Phase Exit Gate

<!-- verifier-recommendation: no — Light scope. Naming choices are judgment-driven and not high-blast-radius. Self-review and a clean build are sufficient. -->

- [x] Run Definition of Done commands (see plan header). All must pass.
- [x] **Agent self-review.** Re-read all Tasks above. Flip `[x]` only for tasks whose Verification passed. Any failing or skipped task stays `[ ]` with a short note explaining why. Under-report beats over-report.

---

### Phase 5: Astro Image Optimization Investigation

Research-only phase. Produces a written recommendation. No code changes.

#### Tasks

- [x] Read Astro 5's documentation on `astro:assets`, the `<Image>` component, and the `image()` helper for content-collections. Identify exactly what optimization Astro performs (format conversion, responsive `srcset`, lazy-loading defaults, build-time sizing) and what requirements it imposes on asset location.
- [x] Document the current state in this repo: total image count under `public/`, total reference count via `<img src="/images/...">`, and which pages are most image-heavy. (72 files / 21 MB raw / 9.5 MB after `astro-compress` / 19 `<img>` tags across 10 files.)
- [x] Quantify the gap: which optimizations are forfeited today by serving images from `public/`? Be concrete (e.g. "AVIF/WebP conversion: not happening; estimated payload reduction: X%"). (Estimated additional 2–3 MB savings from WebP; further mobile savings from `srcset`; CLS prevention via build-time `width`/`height`.)
- [x] Estimate migration cost if we were to move all images to `src/assets/` and adopt `<Image>`. Include: file moves, source updates, build-time impact, dev-mode impact, and any third-party CDN considerations.
- [x] Identify alternatives to a full migration. Examples: hybrid approach (only optimize hero/above-the-fold images, leave portraits in `public/`); use a build-time image processor without moving sources; do nothing (acceptable if the site stays small).
- [x] Make a clear recommendation: **migrate**, **partial migrate**, or **don't migrate** — with reasoning. State the threshold at which the recommendation would change. (Recommendation: **partial migrate** — top ~13 above-the-fold images. Revisit thresholds documented.)
- [x] Write the deliverable to `_claude/docs/image-optimization-recommendation.md`. Sections: **Current state**, **What's forfeited**, **Migration options**, **Recommendation**, **When to revisit**.
- [x] Per resolved question, if the recommendation is to migrate, the migration itself is out of scope for this plan. Note the suggested follow-up plan slug (e.g. `009-astro-image-optimization-migration`) in the Refinement History at the bottom of this plan.

#### Verification

- [x] Read `_claude/docs/image-optimization-recommendation.md` — all five sections populated; recommendation is unambiguous.
- [x] Recommendation cites at least one concrete data point per option (file count, payload estimate, etc.) — no hand-waving.
- [x] No code or asset changes were made in this phase (`git status` should show only the new doc). (Confirmed: only `_claude/docs/image-optimization-recommendation.md` added in this phase; all prior tracked changes are from Phases 2–4.)

#### Acceptance Criteria

- `_claude/docs/image-optimization-recommendation.md` exists and is internally consistent.
- The recommendation is actionable — the reader knows what to do next (start a follow-up plan, or do nothing and revisit at a stated threshold).
- No code changes in this phase.

#### Phase Exit Gate

<!-- verifier-recommendation: no — Research output. Self-review against the section checklist is adequate; semantic correctness of the recommendation is best validated by the developer reading it. -->

- [x] Run Definition of Done commands (see plan header). All must pass. (Build still green from Phase 4; no code changes in Phase 5.)
- [x] **Agent self-review.** Re-read all Tasks above. Flip `[x]` only for tasks whose Verification passed. Any failing or skipped task stays `[ ]` with a short note explaining why. Under-report beats over-report.

---

### Phase 6: Final Verification

Confirm the project is in a clean, single-design state. The developer is asked to spot-check rendered pages because the dev server is started by the developer per CLAUDE.md.

#### Tasks

- [x] Run `npm run build` from a clean working tree — expected: exits 0, dist/ generated, no warnings about missing assets. (Cleaned `dist/` first; build succeeded in 4.77s, 8 pages.)
- [x] List `dist/` — confirm no `dist/designs/` output exists. (Confirmed.)
- [x] Grep entire `src/` for any remaining `/designs/` path — expected: zero matches.
- [x] Grep entire `src/` for any remaining `/images/designs/` path — expected: zero matches.
- [x] Grep entire `src/` for `fabricated` (case-insensitive) — expected: zero matches if `fabricatedTestimonials` was removed in Phase 3. **Hits remain but all legitimate**: `Testimonial.fabricated` field is gone (Phase 4); `TeamMember.fabricated` field still in use (8 placeholder rows); `ExpandedProgramDetail.fabricated: true` still in use (3 rows). Zero hits for deleted exports (`fabricatedTestimonials`, `fabricatedEvents`, `alumniStories`, `mentorProfiles`).
- [x] List `public/images/` — confirm no `designs/` subdirectory and no orphaned testimonial leftovers. (Confirmed: `about/`, `approach/`, `buildwithus/`, `community/`, `hero/`, `impact/`, `partner/`, `partners/`, `people/`, `programs/`, `stock/`, `team/` + 2 logos. No `designs/`, no `testimonial/`.)
- [x] **Ask the developer to start the dev server** (`npm run dev`) and spot-check each kept-site route: `/`, `/about`, `/programs`, `/programs/teck`, `/programs/trap`, `/team`, `/get-involved`. Confirm each renders without console errors and without missing images. (Developer confirmed 2026-05-03: all good.) Note also: `/impact` is a kept-site page that was included in the spot-check.
- [x] Confirm `_claude/docs/single-design-cleanup-manifest.md` and `_claude/docs/image-optimization-recommendation.md` both exist and match the executed work.

#### Verification

- [x] Run `npm run build` — expected: exits 0.
- [x] All grep checks above return zero. (Caveat: `fabricated` case-insensitive still has hits — all legitimate as noted.)
- [x] Developer confirmation that all kept-site routes render correctly. (Confirmed 2026-05-03.)

#### Acceptance Criteria

- Every Plan-level Success Criterion above is met.
- No grep finds `/designs/` or `/images/designs/` references in `src/`.
- Dev-server spot-check confirms no visual regressions on kept-site pages.
- Both deliverable docs exist (`single-design-cleanup-manifest.md`, `image-optimization-recommendation.md`).

#### Phase Exit Gate

<!-- verifier-recommendation: no — This phase IS verification. Recursive verifier-on-verifier adds no signal. Self-review against the explicit checklist is sufficient. -->

- [x] Run Definition of Done commands (see plan header). All must pass.
- [x] **Agent self-review.** Re-read all Tasks above. Flip `[x]` only for tasks whose Verification passed. Any failing or skipped task stays `[ ]` with a short note explaining why. Under-report beats over-report. (One task and one verification item remain `[ ]`: developer dev-server spot-check.)

## Refinement History

- **2026-05-03:** Initial plan creation.
- **2026-05-03:** Resolved 0 blocking + 3 non-blocking questions, verified 0 assumptions (deferred to Phase 1 audit), changed Verification Policy Adaptive → Never and regenerated 6 phase exit gates.
- **2026-05-03:** Changed Verification Policy Never → Adaptive and regenerated 6 phase exit gates (yes on Phase 1 + Phase 3, no on Phases 2/4/5/6).

## Completion

After the final phase's Exit Gate passes, the executing agent performs these steps without prompting the user:

1. Populate the Retro section below from observable execution signals (what worked, what didn't, learnings). Write in terse bullet form.
2. Move this plan file from `_claude/plans/in_progress/` to `_claude/plans/completed/`.

If the final phase's Exit Gate has unresolved FAILs or UNVERIFIEDs after the allowed retries, do NOT move the file or write the retro. Escalate to the user with full context and stop.

## Retro

### What worked

- **Phase 1 audit caught 5 KEEP-MIGRATE assets, not the 2 the plan named.** The reproducibility requirement (every classification cites a Grep query the verifier can re-run) was load-bearing — the 3 extra assets (`music-studio-2.jpg`, `tech-coding-4.jpg`, `portrait-5.jpg`) would otherwise have become dead links in Phase 3.
- **Phase 1 also surfaced `/impact` as an undocumented kept-site route.** Treating it as kept and asking the developer to confirm before Phase 3 prevented an accidental nav break (Header and Footer both link to `/impact/`).
- **Verifier on Phase 1 + Phase 3 paid off cheaply.** Phase 1 verifier caught the page-count tally error (42→49). Phase 3 verifier independently confirmed every deletion traced to the manifest, including the pre-approved ORPHAN cleanup, and flagged the vestigial `astro.config.mjs:16` filter for Phase 4.
- **Cascade-aware data-export deletion in Phase 3.** Removing `fabricatedTestimonials` would have left `allTestimonials = [...testimonials, ...fabricatedTestimonials]` broken. Recognizing the cascade and deleting both in one pass kept the build green throughout.
- **Pausing for orphan-component confirmation in Phase 3.** The 13 orphan root components were not strictly DELETE in the manifest; pausing for user auth before the destructive sweep matched the "destructive actions need confirmation" guidance and let the developer apply judgment.
- **Phase 4 file consolidation (`fabricated.ts` → `programs.ts`).** Removing a now-misnamed file rather than renaming it produced one fewer data file and a clearer mental model: programs and their expanded details live together.

### What didn't

- **Plan understated Phase 3 scope.** The plan listed 2 KEEP-MIGRATE assets when the audit found 5; named no orphan components when 13 existed; and pointed to `_claude/docs/` as if it would reflect what was deleted in Phase 3 (Phase 1 manifest already covered this — no doc update needed). All caught and adjusted, but a re-refinement based on Phase 1 manifest before starting Phase 2 would have made the boundaries cleaner upfront.
- **CLAUDE.md "Do NOT start the dev server" rule means Phase 6 always blocks on developer action.** Acceptable but worth flagging — the plan's "Completion" section auto-moves the file only if the final Exit Gate has zero unresolved items, which created a hand-off pause. Worked as intended; just note for future plans.
- **`fabricated` field semantic on `TeamMember` and `ExpandedProgramDetail` is now write-only.** No code reads `.fabricated`, so the field is purely a developer annotation that "this is placeholder content awaiting real data." Decision: keep, on the assumption the developer will use it as a TODO marker. If a more durable mechanism is wanted (e.g. `// TODO` comments + a CI check), that's a separate cleanup.

### Learnings

- **Manifest-first phases (audit → migrate → delete → restructure) compose well.** Each phase had a single concern and a clean exit. Future structural cleanups should follow the same shape: produce an authoritative classification document first, get sign-off on discrepancies, then act.
- **Cascade-dependent exports need to be classified explicitly during audit.** `allTestimonials` and `allStats` were classified ORPHAN in the manifest but their classification was load-bearing for Phase 3 because they depended on DELETE exports. A future audit phase should flag cascade dependencies in a separate column rather than burying them in the prose.
- **Orphan classification distinct from DELETE classification matters.** ORPHANs are unimported; DELETEs have `/designs/` consumers. The plan's strict-letter Phase 3 only targeted DELETEs, but in practice the developer wanted ORPHANs cleaned too. Future plans should either (a) include ORPHANs as a separate explicit Phase 3 sub-task with up-front user approval, or (b) keep them as a separate follow-up plan. Bundling them via mid-Phase confirmation worked here but added a hand-off.
- **Image audit uncovered ~25 `public/images/` orphans outside the strict scope.** Captured in the manifest's "Other `public/images/` subdirectories" section and flagged as a possible follow-up plan (`010-public-images-orphan-cleanup`). Not actioned in this plan to keep scope tight.

### Follow-up plans surfaced by this work

- **`009-astro-image-optimization-migration`** — implement the Phase 5 partial-migrate recommendation if/when the developer accepts it.
- **`010-public-images-orphan-cleanup`** — delete the ~25 unreferenced files in `public/images/{about,approach,buildwithus,community,impact,partner,programs,people}/` plus orphan portrait PNGs in `people/graduates/`. Audit data already captured in the Phase 1 manifest's informational section.
