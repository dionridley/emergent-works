# Image Optimization Baseline — 2026-05-03

Captured during Phase 1 of plan `009-astro-image-optimization-migration.md`. This is the **pre-migration** snapshot. Post-migration measurements live in `image-optimization-results.md` (created in Phase 4).

## Build environment

- **Branch:** `image-optimization-plan`
- **Working tree:** clean apart from the in-progress plan move
- **Astro:** 5.17.1
- **astro-compress:** 2.3.9
- **Sharp:** transitive via Astro 5 (confirmed at `node_modules/sharp/package.json`)
- **Platform:** Windows 11, npm

## Build time

Three sequential `npm run build` runs from a clean tree (`rm -rf dist` before run #1; runs #2 and #3 reuse the previous dist).

| Run | Wall time |
| --- | --- |
| 1 (clean) | 6.18s |
| 2 | 6.08s |
| 3 | 6.07s |
| **Median** | **6.08s** |

Astro itself reports `8 page(s) built in 4.90s`; the wall-clock delta is process startup and `astro-compress` post-processing.

## dist/ size

- **`dist/`** (total): 10,182,201 bytes (~9.71 MB)
- **`dist/images/`**: 9,787,547 bytes (~9.33 MB) — 72 files

## File count

- **Files in `dist/images/`:** 72
- **Files in `dist/_astro/`:** none related to images at baseline (no `astro:assets` usage yet)

## Format breakdown (`dist/images/`)

| Format | Count |
| --- | --- |
| `.png` | 43 |
| `.jpg` | 25 |
| `.jpeg` | 2 |
| `.webp` | 2 |

> Note: Plan 009's executive summary referenced "9.5 MB" and "43 image files" from plan 008. The actual dist now contains 72 image files / 9.33 MB; the gap is plan 008's portrait/mentor PNGs landing in `public/images/people/`. The migration scope (hero, stock, about, programs, impact — 13 files) is unchanged.

## Lighthouse

Skipped at baseline. Per the non-blocking decision in the plan, an optional one-off `npx lighthouse` run on `/` is recommended at Phase 4 for before/after comparison. Re-running now (against an unstarted dev server) is not possible without the developer launching `npm run dev` first.

## Post-POC measurements (Phase 1 — hero only)

After migrating `public/images/hero/community.jpg` → `src/assets/hero/community.jpg` and swapping `<img>` for `<Image src={heroCommunity} layout="full-width" priority />` in `src/pages/index.astro`. Cache cleared (`rm -rf dist node_modules/.astro`) before run #1.

| Metric | Baseline | Post-POC | Delta |
| --- | --- | --- | --- |
| Build time (median of 3) | 6.08s | 6.66s | **+0.58s** |
| `dist/` total | 10,182,201 B (~9.71 MB) | 10,325,182 B (~9.85 MB) | +143 KB |
| `dist/images/` | 9,787,547 B (72 files) | 9,583,807 B (71 files) | −204 KB (−1 file) |
| `dist/_astro/` | (no images) | 574,730 B | +575 KB (5 hero `.webp` variants + CSS/JS) |
| Hero output bytes | ~204 KB (single `.jpg`) | 346,374 B across 5 `.webp` variants | sum is +143 KB, but per-client served bytes drops to one variant (≈40–105 KB) |

### Hero responsive variants

`dist/_astro/community.dit3TTVA_*.webp` — 5 hashed files: 40,942 / 52,356 / 59,582 / 88,366 / 105,128 bytes. The largest is the source-resolution image; the other four match `srcset` widths 640w / 750w / 828w / 1080w.

### Rendered HTML (homepage hero)

```html
<img alt="Emergent Works community"
     src="/_astro/community.dit3TTVA_vOck.webp"
     srcset="/_astro/community.dit3TTVA_Z20Tdh6.webp 640w,
             /_astro/community.dit3TTVA_Z2lE4dh.webp 750w,
             /_astro/community.dit3TTVA_ZjnNHL.webp 828w,
             /_astro/community.dit3TTVA_29KM2G.webp 1080w"
     sizes="100vw"
     width=1200 height=1200
     loading=eager fetchpriority=high decoding=sync
     data-astro-image=full-width style="--fit:cover;--pos:center">
```

`width`/`height` set automatically (CLS prevention), `fetchpriority=high` from `priority` attribute (LCP optimization), `srcset` covers 640–1080 widths.

### `astro-compress` interaction

Confirmed coexistence. On second/subsequent builds, compress logs `(reused cache entry)` for each `/_astro/community*.webp`. No build warnings, no double-processing, no errors. Sharp-output WebPs are passed through compress's cache and do not need further intervention.

**Decision:** No changes to `astro.config.mjs` required. `astro-compress` and `astro:assets` coexist cleanly at the integration's defaults.

### Note on total dist size

Total `dist/` grew by 143 KB because we now ship 5 responsive variants instead of 1 file. This is expected and not a regression — any individual user only downloads one variant (40–105 KB) instead of the full 204 KB original. Once Phases 2–3 migrate more images, the same pattern will hold: per-client payload drops, total `dist/` may grow modestly because of multi-variant generation, but cumulative payload-per-page will fall.

## Notes for Phase 4 comparison

When `image-optimization-results.md` is written, compare against:

1. **Total `dist/` bytes** delta (target: payload reduction).
2. **`dist/images/` count** delta (should drop by 13 under Option A; remaining files are unmigrated portraits/mentors).
3. **`dist/_astro/` WebP count** (new — should appear with hashed responsive variants per migrated image).
4. **Build time median** (recommendation estimated +5–10s; new median target < 30s).
5. **Format breakdown** — every migrated image should emit `.webp` (and possibly `.avif`) hashed variants, with the original format dropped.
