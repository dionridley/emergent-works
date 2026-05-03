# Single-Design Cleanup Manifest

**Plan:** [008-single-design-consolidation-cleanup](../plans/in_progress/008-single-design-consolidation-cleanup.md)
**Phase:** 1 — Audit (no deletions performed)
**Generated:** 2026-05-03
**Manifest method:** `Grep` against `src/` for every component, layout, data export, and asset path. Each classification cites at least one re-runnable Grep query.

---

## Pre-flight: Kept-site pages enumeration

The "kept-site" universe is every `.astro` / `.mdx` page directly under `src/pages/` excluding the `designs/` subtree:

| Path | Notes |
| --- | --- |
| `src/pages/index.astro` | Homepage |
| `src/pages/about.astro` | About page |
| `src/pages/team.astro` | Team page |
| `src/pages/get-involved.astro` | Get Involved / donation flow |
| `src/pages/impact.astro` | **Not listed in plan's "Routes kept"** — see Discrepancies below |
| `src/pages/programs/index.astro` | Programs index |
| `src/pages/programs/teck.astro` | TECK program detail |
| `src/pages/programs/trap.astro` | T.RAP program detail |

> **Discrepancy with plan:** the plan's Current State lists kept routes as `/`, `/about`, `/programs`, `/programs/teck`, `/programs/trap`, `/team`, `/get-involved`. The page `src/pages/impact.astro` exists and produces an `/impact` route that is also referenced in `Header.astro` nav and `Footer.astro` links. Treating it as a kept-site page in this manifest. **Confirm with developer before Phase 3** in case `/impact` was meant for removal.

---

## Pages to delete

All pages under `src/pages/designs/` (recursive). Source: `Glob src/pages/designs/**/*.{astro,mdx,md}`.

Total: **49 pages** (`designs/index.astro` + 6 variant folders × 8 pages each = 5 top-level + 3 nested under `programs/`).

- `src/pages/designs/index.astro` (gallery landing)
- `src/pages/designs/bold-movement/{about,get-involved,index,summary,team}.astro`
- `src/pages/designs/bold-movement/programs/{index,teck,trap}.astro`
- `src/pages/designs/community-mosaic/{about,get-involved,index,summary,team}.astro`
- `src/pages/designs/community-mosaic/programs/{index,teck,trap}.astro`
- `src/pages/designs/impact-first/{about,get-involved,index,summary,team}.astro`
- `src/pages/designs/impact-first/programs/{index,teck,trap}.astro`
- `src/pages/designs/mentorship/{about,get-involved,index,summary,team}.astro`
- `src/pages/designs/mentorship/programs/{index,teck,trap}.astro`
- `src/pages/designs/stories/{about,get-involved,index,summary,team}.astro`
- `src/pages/designs/stories/programs/{index,teck,trap}.astro`
- `src/pages/designs/the-journey/{about,get-involved,index,summary,team}.astro`
- `src/pages/designs/the-journey/programs/{index,teck,trap}.astro`

**Action in Phase 3:** delete the entire `src/pages/designs/` directory.

---

## Components — keep / delete / orphan

Source query (per component): `Grep "<ComponentName>" path=src` — both as import path and as JSX usage.

### KEEP

| File | Importers (kept-site) |
| --- | --- |
| `src/components/Header.astro` | `index.astro`, `about.astro`, `team.astro`, `get-involved.astro`, `impact.astro`, `programs/index.astro`, `programs/teck.astro`, `programs/trap.astro` |
| `src/components/Footer.astro` | Same as Header — all 8 kept-site pages |

### DELETE — exclusively imported by `/designs/*` pages

Re-run query: `Grep "components/designs/" path=src/pages` — all hits are under `src/pages/designs/`.

| File | Importer pattern |
| --- | --- |
| `src/components/designs/bold-movement/Footer.astro` | `src/pages/designs/bold-movement/**` |
| `src/components/designs/bold-movement/Header.astro` | `src/pages/designs/bold-movement/**` |
| `src/components/designs/community-mosaic/Footer.astro` | `src/pages/designs/community-mosaic/**` |
| `src/components/designs/community-mosaic/Header.astro` | `src/pages/designs/community-mosaic/**` |
| `src/components/designs/impact-first/AnimatedCounter.tsx` | (transitive — used inside impact-first components) |
| `src/components/designs/impact-first/DonationImpact.astro` | `src/pages/designs/impact-first/{get-involved,index}.astro` |
| `src/components/designs/impact-first/Footer.astro` | `src/pages/designs/impact-first/**` |
| `src/components/designs/impact-first/Header.astro` | `src/pages/designs/impact-first/**` |
| `src/components/designs/impact-first/ImpactHero.astro` | `src/pages/designs/impact-first/index.astro` |
| `src/components/designs/impact-first/MetricCard.astro` | (transitive only) |
| `src/components/designs/impact-first/PartnerGrid.astro` | `src/pages/designs/impact-first/index.astro` |
| `src/components/designs/impact-first/ProgramPathway.astro` | `src/pages/designs/impact-first/programs/{index,teck}.astro` |
| `src/components/designs/impact-first/StatComparison.astro` | `src/pages/designs/impact-first/index.astro` |
| `src/components/designs/mentorship/Footer.astro` | `src/pages/designs/mentorship/**` |
| `src/components/designs/mentorship/Header.astro` | `src/pages/designs/mentorship/**` |
| `src/components/designs/shared/ContentSummaryTable.astro` | `src/pages/designs/*/summary.astro` |
| `src/components/designs/shared/FabricatedBadge.astro` | (transitive only — likely used by ContentSummaryTable) |
| `src/components/designs/stories/Footer.astro` | `src/pages/designs/stories/**` |
| `src/components/designs/stories/Header.astro` | `src/pages/designs/stories/**` |
| `src/components/designs/the-journey/Footer.astro` | `src/pages/designs/the-journey/**` |
| `src/components/designs/the-journey/Header.astro` | `src/pages/designs/the-journey/**` |

**Phase 3 action:** delete the entire `src/components/designs/` directory.

### ORPHAN — imported nowhere (no consumers in `src/`)

Re-run query (per component): `Grep "<ComponentName>" path=src/pages` — zero hits in pages or kept components.

| File | Status |
| --- | --- |
| `src/components/Button.astro` | Imported only by `ProgramCard.astro` (also orphan); transitive orphan |
| `src/components/CenteredBlock.astro` | No importers |
| `src/components/ContentSection.astro` | No importers |
| `src/components/DonationForm.tsx` | No importers |
| `src/components/HeroSection.astro` | No importers |
| `src/components/MobileNav.tsx` | No importers |
| `src/components/PageHero.astro` | No importers |
| `src/components/ProgramCard.astro` | No importers (only imports Button.astro) |
| `src/components/QuoteSection.astro` | No importers |
| `src/components/Section.astro` | No importers |
| `src/components/StatCard.astro` | No importers |
| `src/components/TeamMemberCard.astro` | No importers |
| `src/components/TestimonialBlock.astro` | No importers |

**Recommendation:** delete in Phase 3 alongside `/designs` deletions. These are the original scaffolding components from the multi-design experimentation phase that are no longer wired into any page.

---

## Layouts — keep / delete / orphan

Source query: `Grep "designs/(BoldMovementLayout|...|TheJourneyLayout)" path=src` — all hits are under `src/pages/designs/`.

### KEEP

| File | Importers |
| --- | --- |
| `src/layouts/Layout.astro` | All 8 kept-site pages |

### DELETE

| File | Importer pattern |
| --- | --- |
| `src/layouts/designs/BoldMovementLayout.astro` | `src/pages/designs/bold-movement/**` |
| `src/layouts/designs/CommunityMosaicLayout.astro` | `src/pages/designs/community-mosaic/**` |
| `src/layouts/designs/ImpactFirstLayout.astro` | `src/pages/designs/impact-first/**` |
| `src/layouts/designs/MentorshipLayout.astro` | `src/pages/designs/mentorship/**` |
| `src/layouts/designs/StoriesLayout.astro` | `src/pages/designs/stories/**` |
| `src/layouts/designs/TheJourneyLayout.astro` | `src/pages/designs/the-journey/**` |

**Phase 3 action:** delete the entire `src/layouts/designs/` directory.

### ORPHAN

_None._

---

## Data exports — keep / delete

Source queries:
- `Grep "^export" path=src/data` — full export inventory
- For each export: `Grep "<exportName>" path=src` — finds consumers

### `src/data/organization.ts`

| Export | Status | Importers |
| --- | --- | --- |
| `organization` | KEEP | `index.astro`, `about.astro`, `get-involved.astro`, `Footer.astro` |

`organization.branding.headerLogo` and `organization.branding.footerLogo` keys are defined but never read; `Header.astro` and `Footer.astro` use the literal string `/images/header-logo.png` directly. Phase 4 candidate: drop `branding` from the object, or wire Header/Footer to use it.

### `src/data/stats.ts`

| Export | Status | Importers |
| --- | --- | --- |
| `Stat` (interface) | KEEP | (re-exported via `primaryStats: Stat[]`) |
| `primaryStats` | KEEP | `index.astro` |
| `secondaryStats` | DELETE | Only `src/pages/designs/the-journey/index.astro` |
| `allStats` | DELETE | No importers (depends on `secondaryStats`) |
| `nationalComparisons` | DELETE | Only `src/pages/designs/impact-first/index.astro` |

### `src/data/testimonials.ts`

| Export | Status | Importers |
| --- | --- | --- |
| `Testimonial` (interface) | KEEP | Used as type by `testimonials`, `mentorTestimonials` |
| `testimonials` | KEEP | `index.astro`, `programs/index.astro`, `programs/teck.astro`, `programs/trap.astro` |
| `mentorTestimonials` | KEEP | `get-involved.astro` |
| `fabricatedTestimonials` | DELETE | Only `src/pages/designs/community-mosaic/get-involved.astro`, `src/pages/designs/stories/get-involved.astro` |
| `allTestimonials` | DELETE | No importers (depends on `fabricatedTestimonials`) |

### `src/data/fabricated.ts`

| Export | Status | Importers |
| --- | --- | --- |
| `AlumniStory` (interface) | DELETE | Only used as type for `alumniStories` |
| `alumniStories` | DELETE | Only `src/pages/designs/{stories,the-journey,mentorship,community-mosaic}/**` |
| `MentorProfile` (interface) | DELETE | Only used as type for `mentorProfiles` |
| `mentorProfiles` | DELETE | Only `src/pages/designs/{the-journey,mentorship}/**` |
| `FabricatedEvent` (interface) | DELETE | Only used as type for `fabricatedEvents` |
| `fabricatedEvents` | DELETE | Only `src/pages/designs/{the-journey,mentorship,community-mosaic}/**` |
| `ExpandedProgramDetail` (interface) | KEEP | Used as type for `expandedProgramDetails` |
| `expandedProgramDetails` | KEEP | `programs/teck.astro`, `programs/trap.astro` |

> **File-naming concern:** with only `expandedProgramDetails` (and its type) surviving, the file name `fabricated.ts` becomes misleading. Phase 4 candidate: move `expandedProgramDetails` + `ExpandedProgramDetail` into `programs.ts` and delete `fabricated.ts`, OR rename `fabricated.ts` → `programs-extended.ts`.

### `src/data/team.ts`

| Export | Status | Importers |
| --- | --- | --- |
| `TeamMember` (interface) | KEEP | Type for `staff`, `boardOfDirectors`, `advisoryBoard` |
| `staff` | KEEP | `team.astro` |
| `boardOfDirectors` | KEEP | `team.astro` |
| `advisoryBoard` | KEEP | `team.astro` |
| `allTeam` | DELETE | No importers |

### `src/data/partners.ts`

| Export | Status | Importers |
| --- | --- | --- |
| `Partner` (interface) | KEEP | Type for `partners` |
| `partners` | KEEP | `index.astro`, `programs/teck.astro` |
| `PartnershipType` (interface) | KEEP | Type for `partnershipTypes` |
| `partnershipTypes` | KEEP | `get-involved.astro` |
| `PartnerTestimonial` (interface) | KEEP | Type for `partnerTestimonials` |
| `partnerTestimonials` | KEEP | `get-involved.astro`, `programs/index.astro` |

### `src/data/programs.ts`

| Export | Status | Importers |
| --- | --- | --- |
| `Program` (interface) | KEEP | Type for `programs` |
| `programs` | KEEP | `index.astro`, `programs/index.astro`, `programs/teck.astro`, `programs/trap.astro` |
| `ProgramApproach` (interface) | KEEP | Type for `programApproach` |
| `programApproach` | KEEP | `index.astro`, `about.astro` |
| `directPrograms` | KEEP | `programs/index.astro` |
| `partnerPrograms` | KEEP | `programs/index.astro` |

### `src/data/donation.ts`

| Export | Status | Importers |
| --- | --- | --- |
| `DonationTier` (interface) | KEEP | Type for `donationTiers` |
| `donationTiers` | KEEP | `get-involved.astro` |
| `DonationFrequency` (type alias) | DELETE | No importers |
| `donationFrequencies` | DELETE | No importers |
| `donationTrust` | KEEP | `get-involved.astro` |

### Phase-3 data-export delete summary

- `src/data/testimonials.ts` — drop `fabricatedTestimonials`, `allTestimonials`. Keep file.
- `src/data/stats.ts` — drop `secondaryStats`, `allStats`, `nationalComparisons`. Keep file.
- `src/data/team.ts` — drop `allTeam`. Keep file.
- `src/data/donation.ts` — drop `DonationFrequency`, `donationFrequencies`. Keep file.
- `src/data/fabricated.ts` — drop `alumniStories`, `mentorProfiles`, `fabricatedEvents`, and their interfaces. Only `expandedProgramDetails` + `ExpandedProgramDetail` remain. **File becomes misnamed → flagged for Phase 4.**

---

## Assets — keep / migrate / delete

Source query: `Grep "/images/designs/" path=src` and `Grep "/images/testimonial/" path=src`.

### `public/images/designs/stock/` — KEEP-MIGRATE (5 files)

> **Plan called out 2; audit found 5.** The three additional files are flagged in Discrepancies below.

| File | Used by (kept-site) |
| --- | --- |
| `community-group-4.jpg` | `src/pages/index.astro:213` (CTA section) |
| `music-studio-2.jpg` | `src/pages/programs/trap.astro:77` |
| `portrait-5.jpg` | `src/pages/get-involved.astro:83` (Mentor portrait) |
| `portrait-7.jpg` | `src/pages/index.astro:53` (Featured Story) |
| `tech-coding-4.jpg` | `src/pages/programs/teck.astro:82` |

**Phase 2 action:** copy each of the above to `public/images/stock/`, update kept-site references via exact-string replace.

### `public/images/designs/` — DELETE (everything else)

The remaining ~30 files under `public/images/designs/stock/` plus all 7 files under `public/images/designs/previews/` are referenced only by `/designs/*` pages (or unreferenced entirely). After Phase 2 migration, the entire `public/images/designs/` directory is safe to remove in Phase 3.

Re-run query: `Grep "/images/designs/" path=src` — every hit not in the KEEP-MIGRATE table above is under `src/pages/designs/`.

### `public/images/testimonial/` — DELETE (all 5 files)

Re-run query: `Grep "/images/testimonial/" path=src` returns **zero matches**.

| File | Status | Note |
| --- | --- | --- |
| `decorative.png` | DELETE | Per resolved Q (delete-if-unreferenced) |
| `dontay.png` | DELETE | Confirmed unreferenced post PR-10 |
| `nashid.png` | DELETE | Confirmed unreferenced post PR-10 |
| `sheisty.png` | DELETE | Confirmed unreferenced post PR-10 (note: `public/images/people/graduates/sheisty.png` is the active reference) |
| `zeek.png` | DELETE | Confirmed unreferenced post PR-10 |

**Phase 3 action:** delete all 5 files, then `rmdir public/images/testimonial/`.

---

## Other `public/images/` subdirectories — informational audit

The plan asks for an audit of other subdirectories. Findings are **out of strict Phase 3 scope** but flagged here for the developer.

### Likely orphans (no `Grep` hits in `src/`)

| Path | Notes |
| --- | --- |
| `public/images/about/whatwedo-circle1.png` | Unreferenced |
| `public/images/about/whatwedo-circle2.png` | Unreferenced |
| `public/images/about/whatwedo-circle3.png` | Unreferenced |
| `public/images/about/whywedoit-bottom.png` | Unreferenced |
| `public/images/about/whywedoit-left.png` | Unreferenced |
| `public/images/about/ourstory-portrait.jpg` | Used only by `/designs/{impact-first,community-mosaic}/about.astro` — becomes orphan after Phase 3 |
| `public/images/approach/decorative.png` | Unreferenced (entire `approach/` folder is one orphan file) |
| `public/images/buildwithus/group.jpg` | Unreferenced (entire `buildwithus/` folder) |
| `public/images/buildwithus/portrait.png` | Unreferenced |
| `public/images/community/circle.png` | Unreferenced (entire `community/` folder) |
| `public/images/community/fullwidth.jpg` | Unreferenced |
| `public/images/impact/hero.jpg` | Unreferenced |
| `public/images/partner/cca-spotlight.png` | Unreferenced (entire singular `partner/` folder; not to be confused with `partners/`) |
| `public/images/partner/hero.jpg` | Unreferenced |
| `public/images/partner/ways-illustration.png` | Unreferenced |
| `public/images/programs/hero.jpg` | Unreferenced |
| `public/images/programs/laptop-illustration.png` | Unreferenced |
| `public/images/footer-logo.png` | Defined in `organization.branding.footerLogo` but the key is never read |
| `public/images/people/graduates/{alberto,blueberry,julius,kat,lori,nasiar,terrence,voice,dontay,zeek}.png` | Unreferenced (testimonials.ts only references 8 of the 16 graduate portraits) |
| `public/images/people/mentors/*.png` (all 6) | Unreferenced |

### Recommendation for these orphans

**Do NOT delete in Phase 3** — these were not specified in the plan's Success Criteria or Phase 3 task list. Two safer paths:

1. **Defer:** create a follow-up plan (e.g. `010-public-images-orphan-cleanup`) once the developer has verified each orphan really is orphan (some may be intended for upcoming pages).
2. **Expand Phase 3:** if the developer confirms now that all the above are safe to delete, re-refine the plan to add an explicit subtask.

The audit is captured here so neither path needs a re-grep.

---

## Discrepancies between plan and audit

1. **`/impact` route exists.** `src/pages/impact.astro` is a kept-site page in this manifest. The plan's "Routes kept" list omits it. Confirm with developer before Phase 3 — `Header.astro` already links to `/impact/` so removing it would create a broken nav link.

2. **5 KEEP-MIGRATE assets, not 2.** The plan named `portrait-7.jpg` and `community-group-4.jpg`. Audit added `music-studio-2.jpg`, `tech-coding-4.jpg`, and `portrait-5.jpg`. Phase 2 must migrate all five.

3. **Phase 3 deletes 14 unrelated component files.** The 13 root-level `src/components/*.astro|*.tsx` files (Button, DonationForm, HeroSection, MobileNav, ProgramCard, Section, StatCard, TeamMemberCard, TestimonialBlock, CenteredBlock, ContentSection, PageHero, QuoteSection) are unimported orphans. Plan's Phase 3 task says "Delete every file under `src/components/` classified as DELETE in the manifest." The plan didn't anticipate ORPHAN classification, but the same task plus Success Criterion #5 ("No component...remains in `src/` whose only consumer was a `/designs/*` page") covers them in spirit. **Recommended interpretation:** delete orphans alongside DELETE in Phase 3.

4. **`fabricated.ts` becomes misnamed after Phase 3.** Once `alumniStories`, `mentorProfiles`, `fabricatedEvents` are removed, only the genuinely-used `expandedProgramDetails` remains. Phase 4 should rename or relocate.

5. **Broader `public/images/` orphans exist.** See the "informational audit" section above. Out of scope for Phase 3 unless developer expands scope.

---

## Manifest is reproducible

Every classification above can be re-verified by re-running the cited `Grep` queries against `src/`. The manifest is the authoritative input to Phase 3 — any deletion in Phase 3 must trace to a row in the tables above.

**No code, files, or assets have been deleted in Phase 1.**
