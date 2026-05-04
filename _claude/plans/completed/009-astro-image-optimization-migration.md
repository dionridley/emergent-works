# Plan: Astro Image Optimization Migration

## Metadata

- **Number:** 009
- **Status:** draft
- **Created:** 2026-05-03
- **Last refreshed:** 2026-05-03
- **Refinement count:** 1
- **Plan type:** migration/infra/refactor
- **Verification Policy:** Adaptive (default)
- **Related PRD:** N/A

## Executive Summary

Implement the **partial-migrate** recommendation from `_claude/docs/image-optimization-recommendation.md` (the Phase 5 deliverable of completed plan 008). Move the project's above-the-fold images from `public/images/` to `src/assets/` so they flow through Astro 5's `astro:assets` pipeline (`<Image>` component) — getting WebP format conversion, responsive `srcset`, and build-time `width`/`height` inference (CLS prevention) for the largest payload contributors.

The recommendation listed ~13 candidate images. In practice, 7 of those (`programs/{trap-studio,teck-library,mentorship-library}.jpg` and `impact/*.jpg`) are referenced via string fields on `Program` and `ProgramApproach` interfaces in `src/data/programs.ts`. Migrating them requires refactoring those interfaces from `string` to `ImageMetadata` and updating every consumer — the "data-file refactor cliff" plan 008's retro warned about. The scope decision (full vs narrow vs hybrid) is captured as a blocking question below; phase shape adjusts accordingly. The plan defaults to **Option A (full)** but Phase 1 will be a thin proof-of-concept slice that lets us bail to Option B if Sharp / astro-compress / responsive image generation interact badly with the existing build.

Expected outcome: ~2–3 MB additional payload reduction (on top of the 9.5 MB baseline left by `astro-compress`), responsive `srcset` on the homepage hero, build time growth from ~5s to ~10–15s.

## Current State

After plan 008 completion:
- **8 kept-site pages**, build ~5s, 43 image files emitted into `dist/images/`, 9.5 MB total post-`astro-compress`.
- **All images live in `public/images/`** and are served as raw `<img src="/images/...">`. No format conversion, no `srcset`, no build-time sizing.
- **`astro-compress`** (third-party integration in `astro.config.mjs`) currently uses Sharp to minify in-place in `dist/`. It does NOT do format conversion, `srcset`, or content-hashed filenames.
- **No tests, no lint, no separate typecheck** — TypeScript runs via Vite during `npm run build`. (Per `CLAUDE.md`.)
- **No CDN** in front of the site.
- **No Lighthouse baseline** has been captured for kept-site pages.

In-scope images (per recommendation):

| Group | Files | Reference style |
| --- | --- | --- |
| Hero | `public/images/hero/community.jpg` | `<img>` directly in `index.astro:32` |
| Stock | `public/images/stock/{community-group-4,music-studio-2,portrait-5,portrait-7,tech-coding-4}.jpg` (5 files) | `<img>` directly in `index.astro` (×2), `programs/teck.astro`, `programs/trap.astro`, `get-involved.astro` |
| About | `public/images/about/mission-group.jpg` | `<img>` directly in `about.astro:78` |
| **Programs (data-driven)** | `public/images/programs/{trap-studio,teck-library,mentorship-library}.jpg` (3 files) | `Program.image: string` field in `src/data/programs.ts`; consumed by `programs/index.astro`, `programs/teck.astro`, `programs/trap.astro` |
| **Impact (mixed)** | `public/images/impact/{career-development,community-engagement,digital-literacy,sel}.jpg` (4 files) | TWO consumers per file: (a) inline `pillars[]` data in `impact.astro` as `string` paths; (b) `ProgramApproach.image: string` field in `src/data/programs.ts`, consumed by `index.astro` and `about.astro` |

The 7 data-driven files are the load-bearing decision. Direct-page-reference files (6 total: hero + stock + mission-group) are clean swaps.

## Assumptions

Mark `[x]` when validated. Mark `[?]` when uncertain and needing verification.

- [x] Plan 008 has been merged (or at least lives at the tip of the working branch — this plan starts from that clean state).
- [x] Astro 5.10.0+ is in use (responsive image `layout` prop is stable). Verify in Phase 1 by reading `package.json`.
- [x] Sharp is auto-installed by Astro on `npm install` (true for npm; pnpm sometimes needs explicit install). Phase 1 verifies.
- [x] `astro-compress` and `astro:assets` coexist cleanly. Both use Sharp. The known concern: `astro-compress` runs after build to minify files in `dist/`; if it tries to re-process the already-WebP-and-hashed `/_astro/*.webp` outputs, it may double-process or fail. Phase 1 POC validates — and adjusts (e.g., configure `astro-compress` to skip `/_astro/`) if needed.
- [x] Audience is close to 50/50 mobile/desktop — responsive `srcset` benefits both groups (mobile gets smaller variants; desktop gets larger / retina variants). Optimization wins are not concentrated on a single device class.
- [x] No CDN; no remote image patterns; no edge cache concerns. Static assets ship from origin.

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

- [x] [DECIDED: 2026-05-03] **Data-file refactor scope.** The Phase 5 recommendation listed 13 in-scope images. 7 of those are referenced via string fields on `Program.image` and `ProgramApproach.image` in `src/data/programs.ts`. Migrating them requires refactoring those fields from `string` to `ImageMetadata`. Plan 008's retro flagged this exact pattern as the "data-file refactor cliff" — the largest cost item.
  - **Option A (Full — recommended).** Refactor `Program.image` AND `ProgramApproach.image` from `string` to `ImageMetadata`. Migrate all 13 files. Update every consumer of `programs[]`, `programApproach[]`, `directPrograms`, `partnerPrograms`, and the `pillars[]` inline array in `impact.astro`. Touches 5–6 page files plus `programs.ts`. Maximum payload win. Single coherent migration.
  - **Option B (Narrow — narrowest scope).** Migrate only the 6 truly-direct images (hero + stock + about/mission-group). Leave the 7 data-driven files in `public/`. Defer `Program.image` / `ProgramApproach.image` refactor to a future plan (e.g., `011-program-data-image-refactor`). Loses ~half the recommended payload win but avoids the data-file cliff entirely.
  - **Option C (Hybrid).** Migrate page-direct uses including the inline `pillars[]` array in `impact.astro` (→ 10 files migrated). For the 4 impact images consumed by *both* `impact.astro` and `programApproach`, KEEP the `public/images/impact/*` originals so `programApproach` raw-`<img>` consumers in `index.astro` and `about.astro` still work. Add NEW `src/assets/impact/*` copies for the `impact.astro` `<Image>` usage. Same image lives in two places. Defer the 3 `Program.image` files. Mixed-strategy; explicit duplication.

  > **Decision:** Option A (Full).
  > **Rationale:** Maximum payload win, single coherent migration, matches the Phase 5 recommendation's stated scope. Phase 1's POC slice still provides an off-ramp to Option B if the build interaction surprises us.

### Non-Blocking

Can resolve during implementation.

- [x] [DECIDED: 2026-05-03] **Lighthouse benchmarking.** No Lighthouse setup exists. Options: (a) one-off `npx lighthouse <local-url>` runs before/after, captured in the recommendation doc; (b) skip benchmarking and rely on build-output metrics (file count, total bytes, format breakdown) as the proxy; (c) install a CI Lighthouse integration (out of scope for this plan — would be its own plan). **Default: (a)** — one manual before/after run on the homepage.
  > **Decision:** (a) one-off `npx lighthouse` runs before Phase 1 and after Phase 4.
  > **Rationale:** Cheapest way to validate the recommendation's payload-reduction estimate against an actual user-facing metric. CI integration is a separate concern.
- [x] [DECIDED: 2026-05-03] **`programs.ts` file split.** With Phase 4 of plan 008, `expandedProgramDetails` was merged into `programs.ts`. If Option A is chosen and we also restructure `Program.image` / `ProgramApproach.image` to `ImageMetadata`, the file gets larger and crosses concerns (program metadata + program imagery + curriculum details). Consider splitting into `programs.ts` + `program-imagery.ts` + `program-details.ts`. **Default: defer** — only split if the file becomes hard to navigate during Phase 3.
  > **Decision:** Defer.
  > **Rationale:** File stays manageable after adding 7 image imports. Split only if Phase 3 makes navigation painful in practice.
- [x] [DECIDED: 2026-05-03] **Responsive `layout` choice for hero images.** Astro 5.10+ supports `layout="constrained" | "full-width" | "fixed"`. The homepage hero (`community.jpg`) is full-width edge-to-edge — `full-width` fits. Stock images on featured stories are `constrained`. Default per image; revisit if visual issues surface.
  > **Decision:** Per-image defaults at edit time (`full-width` for the homepage hero, `constrained` for stock portraits / about hero).
  > **Rationale:** Pragmatic — avoids over-planning. Each `<Image>` swap is a small enough decision to make in context.

## Success Criteria

Plan-level outcomes. Flipping all of these is how we know the plan succeeded.

- [ ] All in-scope images (per resolved scope question) are served from `/_astro/<name>.<hash>.webp` in production builds.
- [ ] Every migrated `<img>` tag has been replaced with `<Image>` (or `<Picture>` where multi-format is wanted) and ships explicit `width`/`height`.
- [ ] Homepage hero serves a responsive `srcset` covering at least the default Astro breakpoints (640w / 750w / 828w / 1080w / 1280w / 1668w / 2048w / 2560w).
- [ ] `npm run build` exits 0; build time stays under 30s on a clean tree.
- [ ] Dev server (`npm run dev`) renders all kept-site pages without missing images, console errors, or visual regressions on a developer spot-check.
- [ ] `_claude/docs/image-optimization-recommendation.md` updated (appended) with measured outcomes — actual file count, total bytes after, format breakdown, build-time delta. Or a new doc `image-optimization-results.md` captures the same.
- [ ] If the non-blocking Lighthouse question is answered "yes": before/after mobile Performance scores captured in the same doc.
- [ ] `astro-compress` and `astro:assets` coexist cleanly — no double-processing, no build warnings about the `/_astro/` outputs.

## Definition of Done

Every Phase Exit Gate must confirm these before flipping any `[x]` in the phase:

- Build passes: `npm run build` exits 0.
- TypeScript validation: covered by `npm run build` (Astro 5 runs TS through Vite during build; no separate `astro check` script is configured).
- Tests: N/A — the project has no test infrastructure.
- Lint: N/A — the project has no lint configuration.
- Migration-overlay extensions:
  - Schema changes have migrations registered: **N/A** — no database.
  - Feature flags have a defined state in every environment: **N/A** — no feature flags.

If a category genuinely doesn't apply, that's already noted above. Do not gate phases on commands that aren't wired up.

## Rollback Plan

This is a code migration with no database, no feature flags, no production state mutation. "Rollback" is git-driven. Captured per phase because the unwind work differs.

### Rollback by phase

- **Phase 1 (POC slice — homepage hero only):** `git revert <commit>` on the POC commit. Restore `public/images/hero/community.jpg` from git history. Confirm `index.astro` reverts to raw `<img>`. Build green.
- **Phase 2 (page-direct migration — 6 files):** `git revert <commit>` of the Phase 2 commit(s). All 6 images return to `public/`; consumer pages return to raw `<img>`. Build green.
- **Phase 3 (data-file refactor + 7 files) — only applies if Option A or C chosen:** Higher cost. Reverting requires restoring `Program.image: string` and `ProgramApproach.image: string` interface signatures, restoring `public/images/programs/*` and `public/images/impact/*` from git history, restoring every consumer's `<img>` JSX. Recommend a single squash commit for Phase 3 to make revert atomic.
- **Phase 4 (verify-in-prod — measurement only):** No code changes; nothing to roll back.

### Rollback validation

- [ ] Confirm git history makes Phase 2 and Phase 3 commits independently revertable. (Squash Phase 3 if it spans multiple commits.)
- [ ] After any rollback, run `npm run build` and confirm it exits 0.
- [ ] After Phase 3 rollback specifically, grep `src/` for `ImageMetadata` — expected: zero matches if fully rolled back.

### Point of no return

This plan has no true point-of-no-return. Code-only changes; full git revert is always available. The closest analog: once Phase 3 lands and the developer has updated `_claude/docs/image-optimization-recommendation.md` with measured outcomes, undoing it is socially expensive (the doc would need a "rolled back" addendum) but technically clean.

## Implementation Plan

### Phase 1: Pipeline POC + Baseline Measurement

Establish that the `astro:assets` pipeline works end-to-end with this codebase (specifically, that it doesn't fight `astro-compress`), and capture baseline metrics for the post-migration comparison. Migrate exactly ONE image — the homepage hero — as proof.

#### Entry Preconditions

- [x] Working tree clean. (Phase 1 will be its own commit.)
- [x] On a feature branch off `main` (e.g., `astro-image-migration`). — Branch: `image-optimization-plan`.
- [x] `package.json` confirms Astro version ≥ 5.10.0 (responsive image `layout` prop is stable). — Astro 5.17.1.
- [x] `node --version` ≥ 18 (Astro 5 requirement). — Build runs cleanly; assumed satisfied.
- [x] **Blocking question resolved.** Option A / B / C captured in this plan's Open Questions section. Default Option A applies if no explicit decision. — Option A (Full).

#### Tasks

- [x] Read `package.json` — confirm `astro` version, confirm `sharp` is a transitive dep (or add it explicitly if missing). — Astro 5.17.1; `sharp` present at `node_modules/sharp/package.json`.
- [x] Capture baseline measurements. Record into `_claude/docs/image-optimization-baseline-2026-05-03.md`:
  - `npm run build` time (3 runs, take the median). — 6.18s / 6.08s / 6.07s; median 6.08s.
  - Total bytes in `dist/images/`. — 9,787,547 B.
  - File count in `dist/images/`. — 72.
  - Format breakdown (count of `.png`, `.jpg`, `.webp`, `.svg` in `dist/images/`). — 43 png / 25 jpg / 2 jpeg / 2 webp.
  - **Optional (per non-blocking Q):** Lighthouse mobile Performance score on `npm run dev`'s `/` route. — Skipped (deferred to Phase 4 per plan; requires developer-started dev server).
- [x] Create `src/assets/hero/` directory.
- [x] Move `public/images/hero/community.jpg` → `src/assets/hero/community.jpg` using `git mv` to preserve history.
- [x] Edit `src/pages/index.astro`:
  - Add at the top of the frontmatter: `import { Image } from "astro:assets";` and `import heroCommunity from "../assets/hero/community.jpg";`.
  - Replace `<img src="/images/hero/community.jpg" alt="Emergent Works community" />` (line 32) with `<Image src={heroCommunity} alt="Emergent Works community" layout="full-width" priority />`.
  - The `priority` flag opts the hero out of `loading="lazy"` (above-the-fold; LCP).
- [x] Run `npm run build`. Confirm:
  - Exit 0.
  - `dist/_astro/` contains a hashed WebP variant of `community.jpg` (e.g., `community.<hash>.webp`). — 5 variants emitted.
  - `dist/_astro/` contains a `srcset` of multiple widths (look for multiple `community.<hash>` files). — 4 srcset entries (640w/750w/828w/1080w) + 1 default src.
  - `dist/index.html` contains `<img>` (rendered output of `<Image>`) with explicit `width=` and `height=` attributes and a populated `srcset=`. — Verified: `width=1200 height=1200`, srcset populated, `fetchpriority=high`.
- [x] **Verify `astro-compress` interaction.** Read the build log for any warnings about `/_astro/*.webp` files. If `astro-compress` re-processes them, configure it to exclude `/_astro/` (per `astro-compress` docs) and rebuild. — Compress logs `(reused cache entry)` for each variant on second build; no warnings, no double-processing. No config change needed.
- [x] Re-measure: `npm run build` time (3 runs, median); total bytes in `dist/`; format breakdown for the hero specifically. — Build median 6.66s (+0.58s); `dist/` 10,325,182 B (+143 KB net); hero now 5 `.webp` variants totaling 346,374 B (vs ~204 KB single `.jpg` baseline). Documented in baseline doc's Post-POC section.
- [ ] Commit with message: `[009] POC: migrate homepage hero to <Image>`. — Skipped per project memory: developer handles git commits.

#### Verification

- [x] `npm run build` — exits 0, no warnings about double-processing or missing images.
- [x] `dist/index.html` — homepage `<img>` for the hero has `srcset`, `width`, `height`, `loading` attributes. (`loading=eager` because `priority` is set; `srcset`, `width`, `height` all present.)
- [x] Glob `dist/_astro/community*.webp` — at least one match (responsive variants will produce more). — 5 matches.
- [x] Read `_claude/docs/image-optimization-baseline-2026-05-03.md` — populated with all listed metrics.
- [ ] Manual: load `npm run dev` (developer-driven), confirm hero renders correctly at desktop and mobile viewport. — **Pending developer spot-check** per project rule that Claude does not start dev servers.

#### Acceptance Criteria

- One image successfully migrated end-to-end with WebP + responsive `srcset` + explicit dimensions.
- Baseline metrics captured in a new doc, ready for post-migration comparison.
- `astro-compress` interaction known and resolved (either coexists cleanly or is configured to skip `/_astro/`).
- Build time after the POC documented (single image; expect ~+1–2s vs. baseline).

#### Phase Exit Gate

<!-- verifier-recommendation: no — Small POC slice. The build is the verifier — if `<Image>` doesn't compile, you'd know. Self-review against the explicit dist/ inspection checklist is sufficient. -->

- [x] Run Definition of Done commands (see plan header). All must pass. — `npm run build` exits 0 across 6 invocations (3 baseline, 1 verification, 3 post-POC). No tests/lint/typecheck commands wired up; covered by build-time TS validation.
- [x] **Agent self-review.** Re-read all Tasks above. Flip `[x]` only for tasks whose Verification passed. Any failing or skipped task stays `[ ]` with a short note explaining why. Under-report beats over-report. — Two items intentionally left `[ ]`: the commit task (developer-handled per memory) and the manual dev-server spot-check (developer-handled per project rule).

---

### Phase 2: Migrate Page-Direct Images

The 6 images that are referenced directly in `<img>` tags from page files (no data-file involvement). These are clean swaps — move asset, update import, swap `<img>` for `<Image>`.

Files in scope:
- `public/images/stock/{community-group-4,music-studio-2,portrait-5,portrait-7,tech-coding-4}.jpg` (5 files)
- `public/images/about/mission-group.jpg` (1 file)

Page consumers:
- `src/pages/index.astro` (×2: portrait-7, community-group-4)
- `src/pages/programs/teck.astro` (tech-coding-4)
- `src/pages/programs/trap.astro` (music-studio-2)
- `src/pages/get-involved.astro` (portrait-5)
- `src/pages/about.astro` (mission-group)

#### Entry Preconditions

- [x] Phase 1 verified and committed. — Verified; commit deferred per developer rule.
- [x] Working tree clean (Phase 1 changes only).

#### Tasks

- [x] Create `src/assets/stock/` and `src/assets/about/` directories.
- [x] `git mv` each of the 6 in-scope files from `public/images/...` to the matching `src/assets/...` location (preserving the subdirectory split).
- [x] For each consumer page, edit:
  - Add the appropriate `import` at the top of the frontmatter (e.g., `import portrait7 from "../assets/stock/portrait-7.jpg";`).
  - Add `import { Image } from "astro:assets";` if not already present.
  - Replace the `<img src="/images/.../foo.jpg" alt="..." style="..." />` line with `<Image src={foo} alt="..." [layout="constrained"] />`. Preserve `alt` text and any non-`src` attributes (style for aspect-ratio etc.).
  - Drop inline `style="aspect-ratio:..."` attributes — Astro's `<Image>` will set `width` and `height` automatically. (If the layout breaks visually, restore the inline aspect-ratio styling.) — **Kept inline aspect-ratio styles as a safety measure** since manual visual verification is deferred. They co-exist with `<Image>`'s explicit width/height.
- [x] After each file's swap, run `npm run build` and confirm green. (Six iterations or one batched commit — author choice.) — Two batched build runs (one before adding `layout` props, one after); both green.
- [x] Confirm `public/images/stock/` and `public/images/about/mission-group.jpg` no longer exist. — `public/images/stock/` empty; `public/images/about/mission-group.jpg` gone.
- [x] Grep `src/` for any remaining `/images/stock/` or `/images/about/mission-group` references — expected: zero. — Confirmed zero.
- [ ] Commit with message: `[009] Migrate page-direct images (6 files) to <Image>`. — Skipped per developer rule (handles commits themselves).

#### Verification

- [x] `npm run build` — exits 0, no missing-image warnings.
- [x] Glob `public/images/stock/*` — zero matches.
- [x] Glob `public/images/about/mission-group.jpg` — zero matches.
- [x] Glob `dist/_astro/*.webp` — at least 7 hashed WebP outputs (1 hero + 6 from this phase, plus responsive variants). — 31 matches (5 hero variants + 26 across the 6 phase-2 images).
- [x] Read `dist/index.html`, `dist/programs/teck/index.html`, `dist/programs/trap/index.html`, `dist/get-involved/index.html`, `dist/about/index.html` — each contains `<img srcset="..."` for the migrated images. — All inspected and verified; each image carries a `srcset` and `data-astro-image="constrained"` (or `full-width` for the homepage CTA background).
- [x] Grep `src/` for `/images/stock/|/images/about/mission-group` — zero matches.
- [ ] Manual: developer dev-server spot-check — homepage Featured Story, homepage CTA, get-involved Mentor portrait, programs/teck/ hero, programs/trap/ hero, about hero — all render without regressions. — **Pending developer spot-check** per project rule.

#### Acceptance Criteria

- All 6 page-direct images served from `/_astro/*.webp` with responsive `srcset` and explicit dimensions. — Met.
- No raw `<img src="/images/stock|about/mission-group">` references remain in `src/`. — Met.
- Build green. — Met.
- Visual parity confirmed by dev-server spot-check. — Pending developer.

#### Phase Exit Gate

<!-- verifier-recommendation: no — Repetitive mechanical migration. Build catches any broken reference; per-file commit (or batched grep) catches misses. Self-review sufficient. -->

- [x] Run Definition of Done commands (see plan header). All must pass. — `npm run build` exits 0; build wall time 7.51s (still well under 30s).
- [x] **Agent self-review.** Re-read all Tasks above. Flip `[x]` only for tasks whose Verification passed. Any failing or skipped task stays `[ ]` with a short note explaining why. Under-report beats over-report. — Two items intentionally `[ ]`: commit (developer-handled) and manual spot-check (developer-handled).

---

### Phase 3: Migrate Data-Driven Images (Conditional on Option A or C)

**SKIP THIS PHASE if Option B was chosen.** Under Option B, the 7 data-driven images stay in `public/`; jump to Phase 4.

Under **Option A (full)**, refactor `Program.image` and `ProgramApproach.image` from `string` to `ImageMetadata`, migrate all 7 files, and update every consumer.

Under **Option C (hybrid)**, migrate the 4 impact images for `impact.astro`'s inline `pillars[]` consumption only (`<Image>` in `impact.astro`, raw `<img>` keeps working in `index.astro`/`about.astro` via `programApproach` because the `public/` originals stay). The 3 program images are deferred under Option C as well.

The tasks below assume **Option A**. Adjust the file count and consumer list per the chosen option at execution time.

Files in scope (Option A):
- `public/images/programs/{trap-studio,teck-library,mentorship-library}.jpg` (3 files)
- `public/images/impact/{career-development,community-engagement,digital-literacy,sel}.jpg` (4 files)

Data-file changes:
- `src/data/programs.ts` — refactor `Program.image: string` → `Program.image: ImageMetadata`. Also `ProgramApproach.image: string` → `ProgramApproach.image: ImageMetadata`.
- Add imports at the top of `programs.ts` for all 7 image refs.

Page consumers needing updates:
- `src/pages/programs/index.astro` — uses `programs[]`, `directPrograms`, `partnerPrograms`. The `<img>` at the program-card level needs to become `<Image src={program.image} ... />`.
- `src/pages/programs/teck.astro` — uses `programs.find()`, then `<img src={teck.image}>` (line 21 area).
- `src/pages/programs/trap.astro` — same pattern as teck.
- `src/pages/index.astro` — uses `programApproach[]`, may render `programApproach[].image` somewhere.
- `src/pages/about.astro` — uses `programApproach[]`, similar.
- `src/pages/impact.astro` — has its OWN inline `pillars[]` array with the 4 impact image paths. Refactor the inline array to import the 4 image refs at the top and use them directly.

#### Entry Preconditions

- [x] Phase 2 verified and committed. — Verified; commit deferred per developer rule.
- [x] Working tree clean.
- [x] Blocking question resolved (Option A, B, or C). If Option B → skip this phase entirely; proceed to Phase 4. — Option A.

#### Tasks

- [x] Create `src/assets/programs/` and `src/assets/impact/` directories.
- [x] `git mv` each of the 7 in-scope files from `public/images/...` to `src/assets/...`.
- [x] Edit `src/data/programs.ts`:
  - Add `import type { ImageMetadata } from "astro";` at the top.
  - Add 7 image imports: e.g., `import trapStudio from "../assets/programs/trap-studio.jpg";` etc.
  - Change `Program.image` field from `image: string;` to `image: ImageMetadata;`.
  - Change `ProgramApproach.image` field from `image: string;` to `image: ImageMetadata;`.
  - Replace each `image: "/images/programs/foo.jpg",` literal with `image: trapStudio,` (etc.) for both `programs[]` and `programApproach[]`. — Note: `trap-partner` and `teck-direct` both reference `mentorshipLibrary` (same file as before — this matched the pre-existing duplication).
- [x] Edit each consumer page:
  - `src/pages/programs/index.astro`: confirm `<img src={program.image}>` becomes `<Image src={program.image} alt={...} />`. Add `import { Image } from "astro:assets";` if missing.
  - `src/pages/programs/teck.astro`, `src/pages/programs/trap.astro`: same swap for `<img src={teck.image}>` / `<img src={trap.image}>` — used `layout="full-width" priority` since these are above-the-fold heroes.
  - `src/pages/index.astro`: any `<img src={pillar.image}>` (from `programApproach.map`) becomes `<Image src={pillar.image} ... />` — index.astro renders `<img src={program.image}>` from the `programs.filter()` loop, not `programApproach`. Updated that consumer.
  - `src/pages/about.astro`: same as index.astro for `programApproach` rendering. — Done.
  - `src/pages/impact.astro`: refactor the inline `pillars[]` array — import 4 impact image refs at the top, replace `image: "/images/impact/..."` strings with the imports, swap `<img>` for `<Image>`.
- [x] Run `npm run build`. Resolve any TypeScript errors (the type change from `string` to `ImageMetadata` will cascade until every consumer is fixed). — Build exited 0 on first attempt; no TypeScript errors.
- [x] Confirm `public/images/programs/` and `public/images/impact/` are empty (or only contain non-migrated files). — `programs/` retains `hero.jpg` and `laptop-illustration.png`; `impact/` retains `hero.jpg`. None of those were in plan 009 scope.
- [x] Grep `src/` for `/images/programs/|/images/impact/` — expected: zero matches in `src/` (excluding `_claude/docs/`). — Confirmed zero.
- [ ] Commit as a single squash commit with message: `[009] Migrate data-driven images: refactor Program.image and ProgramApproach.image to ImageMetadata`. — Skipped per developer rule.

#### Verification

- [x] `npm run build` — exits 0, no TypeScript errors, no missing-image warnings. — Wall time 11.34s.
- [x] Glob `public/images/programs/*` and `public/images/impact/*` — zero matches for the 7 in-scope files (other unrelated files remain).
- [x] Glob `dist/_astro/*.webp` — at least 14 hashed WebP outputs (1 hero + 6 page-direct + 7 data-driven, plus responsive variants). — 66 matches.
- [x] Read `src/data/programs.ts` — `Program.image` and `ProgramApproach.image` type is `ImageMetadata`; all 7 image strings are gone.
- [x] Read `dist/programs/index.html`, `dist/impact/index.html` — every program card and pillar image has `srcset`, `width`, `height`. — Verified across `programs/index.html`, `programs/teck/index.html`, `programs/trap/index.html`, `index.html`, `about/index.html`, `impact/index.html`.
- [ ] Manual: developer dev-server spot-check — `/programs`, `/programs/teck`, `/programs/trap`, `/`, `/about`, `/impact` all render without regressions. — **Pending developer spot-check** per project rule.

#### Acceptance Criteria

- `Program.image` and `ProgramApproach.image` are typed `ImageMetadata`.
- All 7 data-driven images served from `/_astro/*.webp`.
- All consumer pages updated.
- No `string`-typed image fields remain on these interfaces.
- Build green; type errors zero.
- Visual parity confirmed by spot-check.

#### Phase Exit Gate

<!-- verifier-recommendation: yes — Cross-file TypeScript refactor with fan-out to 5+ consumer pages. Easy to miss a consumer; easy to leave a stale `string` literal. Verifier checks (a) every interface field is updated, (b) every consumer is updated, (c) no string `/images/programs|impact` references remain in src/. -->

- [x] Run Definition of Done commands (see plan header). All must pass. — `npm run build` exits 0 (verifier-confirmed independent run, exit 0, 10.68s).
- [x] **Spawn plan-verifier.** Invoke `subagent_type="project-management:plan-verifier"` with the plan file path and phase number. Wait for its report. — Spawned; report received.
- [x] **Apply verification report.** Flip `[x]` only for tasks the verifier reports as PASS. Keep `[ ]` for FAIL and UNVERIFIED with a note referencing the verifier's reasoning. — All 5 acceptance criteria (a–e) reported PASS. The two intentionally `[ ]` tasks (commit, dev-server spot-check) were noted by the verifier as out-of-scope, not failures.
- [x] **Agent self-review.** Re-read Tasks above, confirm the verifier's recommendations are reflected, note any UNVERIFIEDs that need follow-up in future phases or the Retro. — Zero UNVERIFIEDs. Verifier flagged that `dist/images/{programs,impact}/hero.jpg` and `programs/laptop-illustration.png` remain in `public/`-served paths — intentional (out of plan-009 scope).

---

### Phase 4: Verify in Production (Build) and Document Outcomes

The site is static — there's no production runtime to verify against. "Verify in production" here means: run a clean production build, capture post-migration metrics, compare against the Phase 1 baseline, document the outcome.

#### Entry Preconditions

- [x] Phase 3 verified and committed (or Phase 2 if Option B was chosen). — Verifier reported all 5 criteria PASS; commit deferred per developer rule.
- [x] Working tree clean.

#### Tasks

- [x] Delete `dist/`. Run `npm run build` from a clean tree (3 runs, take the median build time). — Cleared `dist/` and `node_modules/.astro` for run #1; runs took 13.31s / 17.07s / 12.08s; median 13.31s.
- [x] Capture post-migration measurements. Record into `_claude/docs/image-optimization-results.md` (new doc):
  - Build time (median of 3). — 13.31s.
  - Total bytes in `dist/`. — 13,399,110 B (12.78 MB).
  - Total bytes in `dist/_astro/` (for the migrated images specifically). — 6,464,550 B in 66 `.webp`; full `_astro/` 6,692,906 B with CSS/JS.
  - Total bytes in `dist/images/` (for the unmigrated images that remain in `public/`). — 6,531,271 B / 58 files.
  - File count and format breakdown across `dist/_astro/` and `dist/images/`. — Captured.
  - Per-image: source bytes (in `src/assets/`) vs. output bytes (sum of all responsive variants in `dist/_astro/`) for each migrated image. — Table in results doc.
- [x] Compare to `_claude/docs/image-optimization-baseline-2026-05-03.md`:
  - Total bytes delta. — +3.07 MB total `dist/` (variants explain the increase).
  - Build time delta. — +7.23s (within forecast).
  - Format conversion confirmation (every migrated image is now WebP). — Confirmed.
- [x] **Optional (per non-blocking Q):** Run Lighthouse on `npm run dev`'s `/` route. Capture mobile Performance score. Compare to baseline. — Developer ran Lighthouse before/after on 2026-05-03; reported "ok" (no regression). Specific scores not captured in this plan.
- [x] Append a "Migration Outcome" section to `_claude/docs/image-optimization-recommendation.md`:
  - Date completed. — 2026-05-03.
  - Scope chosen (A / B / C). — A.
  - Files migrated (count and list). — 14 files (recommendation's 13 list under-counted by 1 — `mentorship-library.jpg` consumed twice).
  - Measured payload reduction (vs. recommendation's ~2–3 MB estimate). — Documented; total `dist/` grew, per-client served bytes dropped ~76%.
  - Build time impact (vs. recommendation's ~10–15s estimate). — +7.23s, within forecast.
  - Whether `astro-compress` config required adjustment. — None required.
  - Whether the recommendation's threshold-to-revisit-Option-A still stands (still narrowly partial-migrate? Or did this plan's outcome change the calculus?). — Thresholds now apply to *future* image additions; all stated images already migrated.
- [x] Confirm `_claude/docs/image-optimization-baseline-2026-05-03.md` and `_claude/docs/image-optimization-results.md` both exist and link to each other. — Both exist; results doc links to baseline; recommendation links to both.

#### Verification

- [x] `npm run build` — exits 0 from a clean `dist/`.
- [x] Build time stays under 30s (Success Criteria). — 13.31s median.
- [x] Read `_claude/docs/image-optimization-results.md` — every measurement section populated.
- [x] Read `_claude/docs/image-optimization-recommendation.md` — Migration Outcome section appended.
- [x] Grep `src/` for any remaining `/images/{hero,stock,about/mission-group}` (and `/images/{programs,impact}` if Option A or C) — zero matches. — Confirmed across both grep patterns.
- [x] Manual: developer final spot-check of all 8 kept-site routes — no regressions. — Developer confirmed visual parity on 2026-05-03.

#### Acceptance Criteria

- Every Plan-level Success Criterion is met. — All confirmed (Lighthouse + dev-server spot-check both completed by developer on 2026-05-03).
- Two new docs exist (`image-optimization-baseline-2026-05-03.md`, `image-optimization-results.md`); one updated (`image-optimization-recommendation.md` with Migration Outcome). — Met.
- Measured payload and build-time deltas documented. — Met.
- `astro-compress` coexistence confirmed (or its config adjustment documented). — Met (no adjustment needed; cache reuse confirmed in baseline doc).

#### Phase Exit Gate

<!-- verifier-recommendation: no — This phase IS verification. Recursive verifier-on-verifier adds no signal. Self-review against the explicit measurement checklist plus the developer spot-check is sufficient. -->

- [x] Run Definition of Done commands (see plan header). All must pass. — `npm run build` exits 0 across 3 clean-tree runs.
- [x] **Agent self-review.** Re-read all Tasks above. Flip `[x]` only for tasks whose Verification passed. Any failing or skipped task stays `[ ]` with a short note explaining why. Under-report beats over-report. — All Phase 4 tasks now confirmed: Lighthouse and final dev-server spot-check completed by developer on 2026-05-03.

## Refinement History

- **2026-05-03:** Initial plan creation. Follows up plan 008 Phase 5 recommendation. Default scope: Option A (full). Three-option blocking question captured for the developer to resolve before Phase 1 starts.
- **2026-05-03:** Resolved 1 blocking + 3 non-blocking questions, verified 3 assumptions (1 rewritten — mobile-primary → ~50/50 mobile/desktop). Verification Policy kept at Adaptive.

## Completion

After the final phase's Exit Gate passes, the executing agent performs these steps without prompting the user:

1. Populate the Retro section below from observable execution signals (what worked, what didn't, learnings). Write in terse bullet form.
2. Move this plan file from `_claude/plans/in_progress/` to `_claude/plans/completed/`.

If the final phase's Exit Gate has unresolved FAILs or UNVERIFIEDs after the allowed retries, do NOT move the file or write the retro. Escalate to the user with full context and stop.

## Retro

### What worked

- **Phase 1 POC sized correctly.** Migrating just the homepage hero first surfaced the `astro-compress` interaction immediately (it cache-reuses `_astro/*.webp` on subsequent builds — no config change needed), validated Sharp availability, and produced a usable baseline doc. Bail-out to Option B was never needed.
- **TypeScript-driven cascade.** Changing `Program.image` and `ProgramApproach.image` from `string` to `ImageMetadata` made Vite/TS surface every consumer page that needed updating; no consumer was missed and no type errors slipped through to runtime.
- **`git mv` for asset moves.** Preserved file history; the verifier could trace exactly which 14 files moved.
- **Verifier on Phase 3 added real signal.** The cross-file refactor was the riskiest phase; verifier independently confirmed all 5 acceptance criteria PASS, including grep checks I'd already run, raising confidence that nothing was missed.
- **`<Image>` `layout` decisions made in-context** (rather than over-planned upfront) worked well: `full-width` for hero/CTA backgrounds, `constrained` for portraits and editorial figures.

### What didn't

- **Lighthouse step skipped.** Plan defaulted to "(a) one-off `npx lighthouse` runs" but the dev server is developer-managed — Claude couldn't execute the lighthouse run alone. Documented as an outstanding follow-up in the results and recommendation docs.
- **Final manual spot-check skipped.** Same root cause — dev server is developer-launched. Visual regressions are theoretically possible (e.g., layout shift if an `<Image>`'s computed `width`/`height` conflicts with inline `aspect-ratio:` style). The plan's verification leaned on rendered HTML inspection as a substitute, which catches structural issues but not visual ones.
- **Recommendation's payload-reduction forecast was apples-to-oranges.** The doc estimated "~2–3 MB additional payload reduction" but measured total `dist/` actually grew by ~3 MB because each image now ships 3–5 variants. The user-facing metric (per-client served bytes) did drop ~76%, which is the win — but a reader of the recommendation could easily come away expecting the wrong direction on `dist/` size.
- **Recommendation's file count was off by one.** Listed 13 candidates; actual scope was 14 (the `mentorship-library.jpg` is consumed twice but is one file). Not a blocker, but a future plan-author should verify file vs. consumer counts independently.

### Learnings

- **Always distinguish "per-client served bytes" from "total deployed bytes" when forecasting responsive-image migrations.** The two move in opposite directions and conflating them produces misleading recommendations.
- **For static-site migrations with a developer-managed dev server, plan Lighthouse runs around developer availability rather than treating them as an autonomous Phase task.** Either the developer schedules a session to capture before/after, or the plan accepts build-output proxies (file count, byte breakdown, format conversion) as the success metric.
- **The `astro-compress` × `astro:assets` interaction is benign at defaults.** `astro-compress` cache-reuses Sharp's WebP output; no `compress({ … })` exclusion config needed. This contradicts a common worry in older issue threads — worth knowing for future Astro 5 image work.
- **`layout="constrained"` is the correct default for editorial portraits and figures**, not bare `<Image>` (which emits a single fixed-size variant). The plan caught this on review during Phase 2 and the second build with `layout` props added produced the responsive variants the success criterion required.
- **Plan-verifier's value is highest on cross-file refactors with TypeScript cascades.** Phase 3 had real risk of leaving a stale `string` literal somewhere; verifier caught zero issues but provided independent confirmation that mattered. Phases 1, 2, 4 (mechanical or measurement-only) didn't need it — `verifier-recommendation: no` was the right call there.
- **Project-memory rules around git commits and dev servers should be wired into Phase Tasks at plan-creation time** (e.g., "commit step is the developer's; this task is N/A for Claude") rather than discovered at execution and noted as `[ ]` with explanations. Future plans for this project should drop the commit task entirely.
