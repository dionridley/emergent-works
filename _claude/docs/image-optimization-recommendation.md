# Astro Image Optimization — Recommendation

**Author:** Single-design cleanup, Phase 5
**Date:** 2026-05-03
**Status:** Decision document — actionable
**Recommendation:** **Partial migrate** (above-the-fold images only)

This document covers whether to migrate Emergent Works from raw `<img src="/images/...">` references in `public/` to Astro's `<Image>` component with `astro:assets`. It is research-only — no code changes were made in writing it. If the recommendation is accepted, the migration itself is scoped as a separate follow-up plan (`009-astro-image-optimization-migration`).

---

## Current state

Measured against the post-cleanup tree (after plan 008 Phase 4):

| Metric | Value |
| --- | --- |
| Total image files in `public/images/` | **72** |
| Total raw bytes in `public/images/` | **21.0 MB** |
| Compressed bytes in `dist/images/` (after `astro-compress`) | **9.5 MB** (~57% reduction) |
| `<img>` tags in kept-site pages | **19** across 10 files (`index.astro`, `about.astro`, `team.astro`, `get-involved.astro`, `impact.astro`, `programs/{index,teck,trap}.astro`, `Header.astro`, `Footer.astro`) |
| Image references via string paths in data files | `partners.ts` (13 logos), `testimonials.ts` (8 portraits), `team.ts` (12 portrait references → 4 unique placeholders), `programs.ts` (8 image refs → 7 unique), `organization.ts` (2 logos: `headerLogo`, `footerLogo` — defined but currently unread) |
| Referenced files (rough) | ~47 of 72 — the rest are orphans flagged for a possible follow-up plan |
| Image-heaviest pages | Homepage (`index.astro`, 5 `<img>` tags + carousel of 10 portraits via testimonial data), Programs index (carousel of partner logos + 3 program cards), TECK / T.RAP detail pages (hero + portraits + 13 partner logos on TECK) |
| Pipeline today | `public/images/foo.jpg` → copied as-is → `astro-compress` minifies in-place in `dist/` |

The current pipeline ships untouched filenames at stable `/images/...` URLs. `astro-compress` (a third-party integration) cuts ~12 MB at build time using Sharp under the hood, but it does **not** add format conversion, `srcset`, explicit `width`/`height`, or content-hashed cache-busting filenames.

---

## What's forfeited today

By staying in `public/`, we forfeit every benefit of `astro:assets`. From the Astro 5 docs (`https://docs.astro.build/en/guides/images/`):

| Capability | Available via `<Image>` from `src/assets/` | Status today |
| --- | --- | --- |
| Format conversion (WebP / AVIF) | Yes — defaults to WebP | No |
| Responsive `srcset` | Yes — automatic with `layout`, `widths`, `densities`, or `image.layout` config (since `astro@5.10.0`) | No |
| Build-time `width`/`height` inference (CLS prevention) | Yes — inferred from local imports | No |
| `loading="lazy"` and `decoding="async"` defaults | Yes — applied automatically | Manual on every `<img>` |
| Content-hashed filenames (long-cache headers) | Yes — `/_astro/foo.<hash>.webp` | No — `/images/foo.jpg` is stable but not cache-busted |

**Concrete payload estimate.** WebP typically beats JPEG by ~25–35% at visually equivalent quality and beats PNG by ~20–30%. Applied to the post-`astro-compress` 9.5 MB baseline, a full migration would plausibly drop another 2–3 MB off the wire. Responsive `srcset` adds further savings on mobile (delivering 640w instead of 1668w on a phone) — for the hero photograph on `index.astro` that's potentially a 5–10× reduction for that one request.

**Concrete UX gain.** CLS (Cumulative Layout Shift) is currently relying on inline `style="aspect-ratio:..."` attributes on several `<img>` tags (e.g. `index.astro:53`, `programs/teck.astro:82`). Build-time `<Image>` would set `width`/`height` automatically.

---

## Migration options

### Option A — Full migrate

Move all 47 referenced images to `src/assets/`, swap every `<img>` for `<Image>`, and refactor data files (`testimonials.ts`, `team.ts`, `partners.ts`, `programs.ts`, `organization.ts`) to import image refs instead of holding string paths.

**Effort:** Substantial.
- 19 `<img>` tags across 10 kept-site pages need conversion.
- 5 data files need the most invasive change: each `image: string` field becomes `image: ImageMetadata`, and every consumer site needs to pass the imported ref into `<Image>`. This ripples through every `.find()`, `.map()`, and `.filter()` that currently passes the string straight to `<img src={...}>`.
- Data-file refactoring also forces files like `partners.ts` to import 13 logos at the top, slightly increasing the source-of-truth coupling between data and assets.

**Build-time impact:** Astro docs warn responsive image generation "may increase the build time of your project, especially if you have a large number of images." At 47 images × ~8 breakpoints × 1–2 formats, this is ~400–750 image transforms per build. Sharp is fast; expect maybe +10–20s on the current ~5s build, so 15–25s total.

**Dev-server impact:** Images transformed on-demand via the `/_image` endpoint — slower first-request per image; cached after.

**Third-party CDN:** No CDN configured today. Both options work without one. With a CDN, hashed filenames would be a net win.

### Option B — Partial migrate (recommended)

Move only **above-the-fold and hero-style images** to `src/assets/` + `<Image>`. Leave **data-driven catalog images** (logos, portraits, team placeholders) in `public/` with raw `<img>`.

Concretely:
- **Migrate to `src/assets/`:** `public/images/hero/community.jpg`, all 5 files in `public/images/stock/`, `public/images/about/mission-group.jpg`, `public/images/programs/{trap-studio,teck-library,mentorship-library}.jpg`, all 4 files in `public/images/impact/*.jpg`. **Total: ~13 files**, all hero / featured / above-the-fold.
- **Leave in `public/`:** `public/images/partners/*` (13 logos rendered tiny), `public/images/people/graduates/*` (8 portrait references in testimonial carousel), `public/images/team/placeholder-*.jpg` (4 placeholders awaiting real photos), `public/images/header-logo.png` & `footer-logo.png`.

**Why this split:** the wins concentrate on the few large above-the-fold photographs. The small catalog images are already 5–50 KB each; WebP conversion saves bytes but not enough to justify the data-file refactor pain. Once real team / mentor portraits arrive (replacing `placeholder-*.jpg`), revisit.

**Effort:** Modest. ~13 file moves, ~13 `<img>` → `<Image>` swaps in pages directly (no data-file refactor required because none of these 13 are data-driven). Estimated 2–4 hours of focused work.

### Option C — Don't migrate

Stay on `public/` + `astro-compress`. Status quo.

**Effort:** Zero.
**Impact:** Forfeit ~2–3 MB of additional payload reduction and the CLS / `srcset` benefits described above. Acceptable for a small site with ~47 referenced images, but the gap widens as the site grows.

---

## Recommendation

**Option B — Partial migrate.**

Reasoning:
1. **Concentrated wins.** ~80% of the perceived performance benefit (above-the-fold WebP + `srcset` on the hero / featured photos) comes from migrating ~20% of the files. The remaining files are small, data-driven, and infrequently above-the-fold.
2. **Avoids the data-file refactor cliff.** Migrating `testimonials.ts`, `team.ts`, `partners.ts`, `programs.ts` to hold `ImageMetadata` instead of string paths is the largest cost item in Option A. Option B side-steps it entirely.
3. **Preserves the `placeholder-*.jpg` swap workflow.** Team and board portraits are still placeholders awaiting real photos. Keeping them as raw `<img src="/images/...">` means swapping a real photo in is just a file replacement at the same path — no source-code change. Migrating them to `src/assets/` would require an import change every time a real photo arrives.
4. **Build-time stays reasonable.** ~13 images × 8 breakpoints × ~1–2 formats = ~150–300 transforms per build, vs ~400–750 in Option A. Build time impact: marginal.
5. **`astro-compress` keeps doing its job for everything else.** The `public/`-side images still benefit from compression in `dist/`.

---

## When to revisit

Re-evaluate Option A (full migrate) when **any** of the following becomes true:

- Total referenced image count exceeds **~100** (currently ~47). Beyond that, the per-file wins compound and the data-refactor cost amortizes.
- Mobile Lighthouse Performance score drops below **85** (currently unmeasured — establish a baseline before/after Option B to track).
- A real CDN is added in front of the site. Content-hashed filenames become a clear win at that point.
- The `public/images/team/placeholder-*.jpg` files are replaced with real team photos AND the team list grows beyond ~10 members. At that point, the team portraits become substantive payload worth optimizing.
- Build time exceeds 30 seconds. (Currently ~5s; Option B should add 5–10s; Option A would push toward 15–25s.)

If accepted, the migration itself is scoped as a separate plan: **`009-astro-image-optimization-migration`** (per resolved question in plan 008).

---

## Sources

- Astro 5 image guide: `https://docs.astro.build/en/guides/images/`
- `astro:assets` API reference: `https://docs.astro.build/en/reference/modules/astro-assets/`
- Image config options: `https://docs.astro.build/en/reference/configuration-reference/#image-options`
