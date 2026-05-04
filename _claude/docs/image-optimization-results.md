# Image Optimization Results — Plan 009 Outcome

Captured at the conclusion of plan `009-astro-image-optimization-migration.md`. Pre-migration baseline lives in [`image-optimization-baseline-2026-05-03.md`](./image-optimization-baseline-2026-05-03.md).

## Scope executed

**Option A (Full).** All 14 in-scope images migrated from `public/images/` to `src/assets/` and rendered via Astro's `<Image>` component:

| Group | Count | Files |
| --- | --- | --- |
| Hero | 1 | `hero/community.jpg` |
| Stock | 5 | `stock/{community-group-4,music-studio-2,portrait-5,portrait-7,tech-coding-4}.jpg` |
| About | 1 | `about/mission-group.jpg` |
| Programs (data-driven) | 3 | `programs/{trap-studio,teck-library,mentorship-library}.jpg` |
| Impact (data-driven + inline) | 4 | `impact/{career-development,community-engagement,digital-literacy,sel}.jpg` |

`Program.image` and `ProgramApproach.image` interfaces in `src/data/programs.ts` were refactored from `string` to `ImageMetadata`. The inline `pillars[]` array in `src/pages/impact.astro` was refactored to import images directly.

## Build time

Three sequential `npm run build` runs from a clean tree (`rm -rf dist node_modules/.astro` before run #1).

| Run | Wall time |
| --- | --- |
| 1 (clean) | 13.31s |
| 2 | 17.07s |
| 3 | 12.08s |
| **Median** | **13.31s** |

| | Baseline | Post-migration | Delta |
| --- | --- | --- | --- |
| Build wall time (median) | 6.08s | 13.31s | **+7.23s (+119%)** |
| Astro report ("page(s) built in") | ~5s | ~12s | +7s |

Plan recommendation forecast: 10–15s. Actual: 13.31s. **Within forecast**, well under the 30s success-criterion ceiling.

## dist/ size

| | Baseline | Post-migration | Delta |
| --- | --- | --- | --- |
| `dist/` total | 10,182,201 B (9.71 MB) | 13,399,110 B (12.78 MB) | **+3.07 MB** |
| `dist/images/` | 9,787,547 B / 72 files | 6,531,271 B / 58 files | −3.10 MB / −14 files |
| `dist/_astro/` (image-related) | 0 B | 6,464,550 B in 66 `.webp` | +6.16 MB / +66 files |
| `src/assets/` (source) | 0 B | 3,256,276 B / 14 files | +3.10 MB |

### Why total `dist/` grew

This is the most counter-intuitive result and worth being explicit about. The recommendation forecast "~2–3 MB additional payload reduction"; the **measured outcome is the opposite at the `dist/` level — total `dist/` grew by ~3 MB**. Reason: each migrated image is now emitted as 3–5 hashed responsive variants (640w / 750w / 828w / 1080w / 1200w), so the disk footprint multiplies even though the per-served-byte count drops.

**The metric that matters is per-client served bytes, not total `dist/` bytes.** A user's browser downloads exactly one variant per image, sized for their viewport. See "Per-client payload" below.

## Format breakdown

| | Baseline | Post-migration |
| --- | --- | --- |
| `dist/images/` `.png` | 43 | 43 |
| `dist/images/` `.jpg` | 25 | 11 |
| `dist/images/` `.jpeg` | 2 | 2 |
| `dist/images/` `.webp` | 2 | 2 |
| `dist/_astro/` `.webp` | 0 | **66** |
| `dist/_astro/` `.css` / `.js` | 6 / 1 | 6 / 1 |

All 14 in-scope images are now `.webp`. No format conversion was applied to the unmigrated `dist/images/` files (out of scope).

## Per-client payload (the metric that matters)

Smallest WebP variant per migrated image vs. the original `.jpg` baseline. Mobile users get the smallest variant; desktops get up to the largest.

| Image | Source `.jpg` | Smallest WebP variant | Reduction |
| --- | --- | --- | --- |
| `hero/community.jpg` | 204 KB | 40 KB (640w) | **80%** |
| `stock/community-group-4.jpg` | 144 KB | 30 KB (640w) | 79% |
| `stock/music-studio-2.jpg` | 234 KB | 49 KB (640w) | 79% |
| `stock/portrait-5.jpg` | 75 KB | 22 KB (640w) | 71% |
| `stock/portrait-7.jpg` | 61 KB | 23 KB (640w) | 62% |
| `stock/tech-coding-4.jpg` | 116 KB | 23 KB (640w) | 80% |
| `about/mission-group.jpg` | 199 KB | 41 KB (640w) | 79% |
| `programs/trap-studio.jpg` | 261 KB | 60 KB (640w) | 77% |
| `programs/teck-library.jpg` | 310 KB | 75 KB (640w) | 76% |
| `programs/mentorship-library.jpg` | 416 KB | 107 KB (640w) | 74% |
| `impact/career-development.jpg` | 369 KB | 89 KB (640w) | 76% |
| `impact/community-engagement.jpg` | 389 KB | 95 KB (640w) | 76% |
| `impact/digital-literacy.jpg` | 251 KB | 59 KB (640w) | 76% |
| `impact/sel.jpg` | 228 KB | 50 KB (640w) | 78% |

**Average per-image reduction at the smallest viewport: ~76%.** This is the bytes-saved-per-mobile-user figure.

## Per-image source vs. all-variants total

For reference — total bytes Sharp emitted across all variants per image (sum across `dist/_astro/<name>.*.webp`).

| Image | Source | Variants | All-variants total |
| --- | --- | --- | --- |
| `community.jpg` | 204 KB | 5 | 339 KB |
| `mission-group.jpg` | 199 KB | 5 | 360 KB |
| `community-group-4.jpg` | 144 KB | 5 | 234 KB |
| `music-studio-2.jpg` | 234 KB | 5 | 462 KB |
| `portrait-5.jpg` | 75 KB | 3 | 65 KB |
| `portrait-7.jpg` | 61 KB | 3 | 73 KB |
| `tech-coding-4.jpg` | 116 KB | 5 | 160 KB |
| `mentorship-library.jpg` | 416 KB | 5 | 948 KB |
| `teck-library.jpg` | 310 KB | 5 | 651 KB |
| `trap-studio.jpg` | 261 KB | 5 | 491 KB |
| `career-development.jpg` | 369 KB | 5 | 784 KB |
| `community-engagement.jpg` | 389 KB | 5 | 836 KB |
| `digital-literacy.jpg` | 251 KB | 5 | 484 KB |
| `sel.jpg` | 228 KB | 5 | 426 KB |

## `astro-compress` interaction

Confirmed coexistence at the integration's defaults. On second/subsequent builds, `astro-compress` logs `(reused cache entry)` for each `/_astro/*.webp`. No build warnings, no double-processing, no errors. **No `astro.config.mjs` changes required.**

## Lighthouse

Developer ran Lighthouse before/after on 2026-05-03 and reported "ok" (no regression). Specific scores were not captured in this doc.

## Success criteria check

| Criterion | Status |
| --- | --- |
| All in-scope images served from `/_astro/<name>.<hash>.webp` | ✓ 14 / 14 |
| Every migrated `<img>` replaced with `<Image>` and ships explicit `width`/`height` | ✓ verified across all 6 consumer pages |
| Homepage hero serves responsive `srcset` (640w / 750w / 828w / 1080w default breakpoints) | ✓ 640/750/828/1080 + main src |
| `npm run build` exits 0; build time stays under 30s | ✓ exit 0; median 13.31s |
| Dev server renders all kept-site pages | ✓ Developer confirmed (2026-05-03) — visual parity across migrated routes |
| `image-optimization-recommendation.md` updated with measured outcomes | ✓ "Migration Outcome" appended |
| Lighthouse before/after captured | ✓ Developer ran before/after (2026-05-03) — reported "ok" (no regression) |
| `astro-compress` and `astro:assets` coexist cleanly | ✓ confirmed (cache reuse, no warnings) |

## Notes for the developer (manual verification queue)

When you have the site open in `npm run dev`, please spot-check:

1. **`/`** — hero, Featured Story portrait (Terrence), program cards (T.RAP), CTA background.
2. **`/about/`** — origin-image (mission-group), four pillar cards.
3. **`/impact/`** — four pillar features (alternating background).
4. **`/programs/`** — direct-program cards (T.RAP and TECK).
5. **`/programs/teck/`** — hero + Kat-feature portrait.
6. **`/programs/trap/`** — hero + Nas-feature portrait.
7. **`/get-involved/`** — Mentor portrait.

Look for: missing images, broken aspect ratios, blurry rendering, layout shift, or oversized hero loads. If anything looks wrong, the inline `aspect-ratio:` styles can be tuned per-component or the `<Image>` `layout` prop swapped between `constrained` and `full-width`.
