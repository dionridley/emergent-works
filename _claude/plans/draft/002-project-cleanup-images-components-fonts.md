# Project Cleanup: Image Organization, Component Refactoring & Font Replacement

**Created:** 2026-02-16
**Status:** Draft
**Related PRD:** N/A
**Refinements:** 1

## Executive Summary

This plan addresses three areas of technical debt in the Emergent Works website: (1) reorganizing the flat `public/images/` directory into a logical folder structure grouped by section, (2) extracting reusable components from repetitive layout patterns across 7 pages to reduce duplication and improve maintainability, and (3) replacing the Inter font with a Google Fonts font pairing (Outfit for headings + Plus Jakarta Sans for body) that better matches the brand's specified Garet typeface (a commercial geometric sans-serif that cannot be freely self-hosted).

## Current State

- **Images:** 35 image files sit at the root of `public/images/` with section-prefix naming (e.g., `about-mission-group.jpg`, `impact-hero.jpg`, `programs-trap-studio.jpg`). Two subdirectories already exist (`team/`, `partners/`). Every page references images by flat paths like `/images/about-mission-group.jpg`.
- **Components:** 12 Astro/React components exist. `TwoColumnSection.astro` was created but is **never used** — all pages use inline grid layouts instead. Multiple pages repeat the same patterns:
  - **Two-column image + text + CTA** appears ~12 times across about-us, impact, programs, partner-with-us
  - **Centered text block + CTA** appears ~8 times across about-us, programs, impact, partner-with-us
  - **Quote/testimonial section** (heading + blockquote + cite, centered on green) appears 3 times on impact.astro alone, written inline each time
  - **Page hero** (green, two-column, heading + text + optional image) appears on programs, impact, and partner-with-us with nearly identical markup
- **Fonts:** Brand guidelines specify **Garet** (geometric sans-serif by Very Cool Studio) for all text. Garet is a commercial font not available on Google Fonts or fontsource. The current build uses **Inter** as a substitute. The original Wix site used Fraunces (display) + Avenir (body), neither of which match the brand spec either.

## Assumptions Made

These assumptions were made during plan creation. Challenge any that seem incorrect.

- [x] Only files at the root level of `public/images/` should be reorganized (confirmed by user)
- [x] The `team/` and `partners/` subdirectories should remain unchanged (already properly organized)
- [x] Garet font is commercial and cannot be self-hosted for free (confirmed — not on Google Fonts or fontsource)
- [x] `footer-logo.png` and `header-logo.png` remain at the root level — they are site-wide assets, not section-specific
- [x] Single-file prefix sections (`approach-`, `hero-`) each get their own folder, keeping the pattern consistent across all prefixes
- [x] Component refactoring should preserve the exact visual output — no design changes, only code structure improvements
- [x] All image references in `.astro` and `.tsx` files need updating after reorganization
- [x] A font pairing is preferred: Outfit (headings) + Plus Jakarta Sans (body) — provides more visual interest while staying close to Garet's geometric character

> All assumptions have been verified.

## Open Questions & Decisions

### Blocking (must resolve before implementation)

No blocking questions identified — ready to proceed.

### Non-Blocking (can resolve during implementation)

- [x] **Logo file placement** [DECIDED: 2026-02-16]
  Should `header-logo.png` and `footer-logo.png` stay at root or move to a `brand/` folder? They don't follow the `<section>-name` convention — they're site-wide assets.
  > **Decision:** Keep at root level
  > **Rationale:** Only 2 files, used site-wide across Header and Footer components. Not worth creating a folder for site-wide assets.

- [x] **Single-file sections** [DECIDED: 2026-02-16]
  `approach-decorative.png` and `hero-community.jpg` are the only files with their prefix. Create 1-file folders, or group them differently? (e.g., `homepage/` folder for both)
  > **Decision:** Own folders each (`approach/` and `hero/`)
  > **Rationale:** Keeps the pattern consistent — every section-prefixed file gets a folder named after its section, regardless of count.

- [x] **Font pairing vs single font** [DECIDED: 2026-02-16]
  Should we use one font for everything (matching Garet spec) or consider a display + body pairing for more visual interest?
  > **Decision:** Font pairing — Outfit (headings) + Plus Jakarta Sans (body)
  > **Rationale:** Outfit is the closest Google Fonts match to Garet's geometric character, ideal for bold headings. Plus Jakarta Sans adds warmth and readability for body text, creating visual hierarchy while staying in the geometric sans-serif family.

## Success Criteria

- [ ] All images at root of `public/images/` are organized into section folders with clean names
- [ ] All image references across all 7 pages and components are updated to new paths
- [ ] Site builds successfully with zero broken image references
- [ ] Repetitive two-column image+text patterns use a shared component instead of inline markup
- [ ] Repetitive centered text block patterns use a shared component
- [ ] Repetitive testimonial/quote sections on impact.astro use a shared component
- [ ] Page hero sections (programs, impact, partner-with-us) use a shared component
- [ ] Unused `TwoColumnSection.astro` is either repurposed or removed
- [ ] Font is updated from Inter to Outfit (headings) + Plus Jakarta Sans (body)
- [ ] Typography looks visually consistent with the geometric character of Garet
- [ ] `npm run build` succeeds with no errors

## Implementation Plan

### Phase 1: Font Replacement

**Estimated Time:** 1 hour

#### Tasks
- [ ] Install both font packages: `@fontsource/outfit` and `@fontsource/plus-jakarta-sans`
- [ ] Update `src/styles/global.css`:
  - Replace `@import "@fontsource/inter/..."` imports with Outfit and Plus Jakarta Sans imports (400, 500, 600, 700 weights for both)
  - Add `--font-heading` variable for Outfit in `@theme` block
  - Update `--font-sans` to reference Plus Jakarta Sans for body text
- [ ] Add CSS rule to apply Outfit to all heading elements (h1-h6)
- [ ] Remove `@fontsource/inter` package from dependencies
- [ ] Verify typography across all 7 pages — headings in Outfit, body in Plus Jakarta Sans

#### Test Verification
- [ ] `npm run build` succeeds
- [ ] All font weights (400, 500, 600, 700) load correctly for both fonts
- [ ] Heading text renders in Outfit, body text renders in Plus Jakarta Sans

#### Code Changes Needed
```css
/* src/styles/global.css — before */
@import "@fontsource/inter/400.css";
@import "@fontsource/inter/500.css";
@import "@fontsource/inter/600.css";
@import "@fontsource/inter/700.css";

/* src/styles/global.css — after */
@import "@fontsource/outfit/400.css";
@import "@fontsource/outfit/500.css";
@import "@fontsource/outfit/600.css";
@import "@fontsource/outfit/700.css";
@import "@fontsource/plus-jakarta-sans/400.css";
@import "@fontsource/plus-jakarta-sans/500.css";
@import "@fontsource/plus-jakarta-sans/600.css";
@import "@fontsource/plus-jakarta-sans/700.css";

/* @theme block */
--font-heading: "Outfit", ui-sans-serif, system-ui, sans-serif;
--font-sans: "Plus Jakarta Sans", ui-sans-serif, system-ui, sans-serif;

/* Heading defaults */
h1, h2, h3, h4, h5, h6 {
  font-family: var(--font-heading);
  font-weight: 700;
  line-height: 1.15;
}
```

---

### Phase 2: Image Folder Reorganization

**Estimated Time:** 2 hours

#### Tasks
- [ ] Create the following folder structure under `public/images/`:

| New Folder | Files (renamed) | Original Files |
|---|---|---|
| `about/` | mission-group.jpg, ourstory-portrait.jpg, whatwedo-circle1.png, whatwedo-circle2.png, whatwedo-circle3.png, whywedoit-bottom.png, whywedoit-left.png | about-*.{jpg,png} (7 files) |
| `approach/` | decorative.png | approach-decorative.png (1 file) |
| `buildwithus/` | group.jpg, portrait.png | buildwithus-*.{jpg,png} (2 files) |
| `community/` | circle.png, fullwidth.jpg | community-*.{jpg,png} (2 files) |
| `hero/` | community.jpg | hero-community.jpg (1 file) |
| `impact/` | career-development.jpg, community-engagement.jpg, digital-literacy.jpg, hero.jpg, sel.jpg | impact-*.jpg (5 files) |
| `partner/` | cca-spotlight.png, hero.jpg, ways-illustration.png | partner-*.{jpg,png} (3 files) |
| `programs/` | hero.jpg, laptop-illustration.png, mentorship-library.jpg, teck-library.jpg, trap-studio.jpg | programs-*.{jpg,png} (5 files) |
| `testimonial/` | dontay.png, nashid.png, sheisty.png, zeek.png, decorative.png | testimonial-*.png + testimonials-decorative.png (5 files) |

- [ ] Keep at root level: `header-logo.png`, `footer-logo.png` (site-wide assets)
- [ ] Move and rename each file using `git mv` to preserve git history
- [ ] Update all image references in the following files:

| File | Image refs to update |
|---|---|
| `src/pages/index.astro` | hero-community.jpg, approach-decorative.png, community-circle.png, community-fullwidth.jpg, testimonial-{dontay,zeek,sheisty,nashid}.png, buildwithus-{portrait,group}.png, testimonials-decorative.png |
| `src/pages/about-us.astro` | about-mission-group.jpg, about-whatwedo-circle{1,2,3}.png, about-whywedoit-{left,bottom}.png, about-ourstory-portrait.jpg |
| `src/pages/programs.astro` | programs-{hero,trap-studio,mentorship-library,teck-library,laptop-illustration}.{jpg,png} |
| `src/pages/impact.astro` | impact-{hero,digital-literacy,sel,career-development,community-engagement}.jpg |
| `src/pages/partner-with-us.astro` | partner-{hero,ways-illustration,cca-spotlight}.{jpg,png} |
| `src/pages/donate.astro` | community-fullwidth.jpg |

#### Test Verification
- [ ] `npm run build` succeeds with zero errors
- [ ] No broken image paths in built HTML (search `dist/` for old image paths)
- [ ] All pages render images correctly in browser

---

### Phase 3: Create ContentSection Component (Two-Column Image + Text)

**Estimated Time:** 2 hours

This is the highest-impact refactoring — the two-column "image on one side, text on the other" pattern appears ~12 times across the site.

#### Tasks
- [ ] Audit all two-column image+text instances across the site and catalog their variations:
  - Image position: left or right
  - Image shape: rounded-2xl, rounded-full, no rounding
  - Image sizing: h-64, h-80, h-96, h-[600px], etc.
  - Content: heading + paragraphs + optional CTA, or just text
  - Section variant: background, white, green
  - Some have ring/border decorations on images (Nashid testimonial)
- [ ] Design the `ContentSection` component API to handle all variations via props + slots:

```astro
---
interface Props {
  imagePosition?: "left" | "right";
  imageSrc: string;
  imageAlt: string;
  imageClass?: string;  // For custom sizing/rounding overrides
  variant?: "background" | "white" | "green";
  class?: string;
}
---
```

- [ ] Implement `ContentSection.astro` with sensible defaults and slot for text content
- [ ] Refactor the following pages to use `ContentSection`:
  - `about-us.astro` — Section 1 (mission image+text), Section 4 (our story)
  - `impact.astro` — Section 1 (hero), Section 4 (digital literacy), Section 6 (SEL), Section 10 (career dev), Section 11 (community engagement)
  - `partner-with-us.astro` — Section 1 (hero), Section 4 (CCA spotlight)
  - `programs.astro` — Section 1 (hero)
- [ ] Evaluate whether `ProgramCard.astro` should extend `ContentSection` or remain separate (it has extra details/dl content)
- [ ] Remove or repurpose the unused `TwoColumnSection.astro`

#### Test Verification
- [ ] Each refactored page renders identically to the original
- [ ] `npm run build` succeeds
- [ ] Image positions (left/right) are correct on each page

---

### Phase 4: Create CenteredBlock & QuoteSection Components

**Estimated Time:** 1.5 hours

#### Tasks

**CenteredBlock component:**
- [ ] Create `CenteredBlock.astro` for the repeating centered text pattern:

```astro
---
interface Props {
  maxWidth?: string;  // default "max-w-3xl"
  class?: string;
}
---
<div class:list={["mx-auto text-center", maxWidth, className]}>
  <slot />
</div>
```

- [ ] Refactor the following to use `CenteredBlock`:
  - `about-us.astro` — Section 2 (What We Do), Section 5 (Donate CTA)
  - `programs.astro` — Section 2 (How Our Programs Work), Section 5 (Programs For Partners)
  - `impact.astro` — Section 3 (How Programs Impact), Section 8 (Support Our Impact)
  - `partner-with-us.astro` — Section 3 (Partners We Work With header area)
  - `our-team.astro` — Hero section, Our Boards intro

**QuoteSection component:**
- [ ] Create `QuoteSection.astro` for the repeating testimonial pattern on impact.astro:

```astro
---
interface Props {
  heading: string;
  quote: string;
  name: string;
  variant?: "green" | "background";
  class?: string;
}
---
```

- [ ] Refactor `impact.astro` to use `QuoteSection` for:
  - Section 5 (Lakresha — "Stepping Out Of My Comfort Zone")
  - Section 7 (Julius — "Break Down Any Barriers")
  - Section 9 (Zeek — "The Skills To Move Forward")
- [ ] Evaluate if `programs.astro` Section 8 (Blueberry quote + CTA) fits this component or is different enough to stay inline

#### Test Verification
- [ ] All centered text blocks render identically
- [ ] All quote sections on impact.astro render identically
- [ ] `npm run build` succeeds

---

### Phase 5: Create PageHero Component

**Estimated Time:** 1 hour

Three pages (programs, impact, partner-with-us) share a nearly identical hero pattern: green background, two-column layout, left side has h1 + paragraph + optional CTA, right side has rounded image.

#### Tasks
- [ ] Create `PageHero.astro` component:

```astro
---
interface Props {
  title: string;
  description: string;
  imageSrc?: string;
  imageAlt?: string;
  variant?: "green" | "background";
  class?: string;
}
---
```

- [ ] Support optional CTA via a named slot (`<slot name="cta" />`)
- [ ] Refactor the following hero sections to use `PageHero`:
  - `programs.astro` Section 1 (currently: h1 + p, image right)
  - `impact.astro` Section 1 (currently: h1 + p + CTA, image right)
  - `partner-with-us.astro` Section 1 (currently: h1 + p + CTA, image right)
- [ ] Note: `index.astro` hero uses `HeroSection.astro` (full-bleed background image) — this is a different pattern and should stay as-is
- [ ] Note: `about-us.astro` hero is Section + inline content, not a two-column hero — leave as-is

#### Test Verification
- [ ] All three page heroes render identically to originals
- [ ] `npm run build` succeeds

---

### Phase 6: Final Cleanup & Build Verification

**Estimated Time:** 1 hour

#### Tasks
- [ ] Remove unused `TwoColumnSection.astro` if it was not repurposed
- [ ] Review all components and remove any that are now unused
- [ ] Verify no duplicate or dead code remains in page files
- [ ] Run `npm run build` — confirm clean build with zero warnings
- [ ] Spot-check all 7 pages in browser to verify visual consistency:
  - [ ] index.astro (homepage)
  - [ ] about-us.astro
  - [ ] programs.astro
  - [ ] impact.astro
  - [ ] our-team.astro
  - [ ] partner-with-us.astro
  - [ ] donate.astro
- [ ] Verify the new fonts render correctly on all pages (Outfit for headings, Plus Jakarta Sans for body)
- [ ] Verify all images load on all pages (no 404s)
- [ ] Check the final component count — should have fewer inline patterns and more reusable components

#### Test Verification
- [ ] `npm run build` passes
- [ ] `dist/` output contains no references to old image paths
- [ ] All 7 pages render correctly with new fonts and reorganized images

## Rollback Plan

1. All changes are tracked in git — `git revert` or `git reset` to before the cleanup branch
2. Image moves use `git mv` so history is preserved and reversible
3. Font change is isolated to `global.css` + `package.json` — easy to swap back to Inter
4. Component refactoring is additive (new components) then subtractive (update pages) — can be partially rolled back

## Dependencies

- [x] Plan 001 (Emergent Works website rebuild) is complete — all 7 pages exist
- [ ] Google Font packages must be available on npm: `@fontsource/outfit` and `@fontsource/plus-jakarta-sans`
- [ ] No other plans are currently in progress

## Success Metrics

(To be filled in after implementation)

- [ ] Number of image files reorganized into folders
- [ ] Number of inline patterns replaced with components
- [ ] Net reduction in lines of code across page files
- [ ] Final component count (before vs. after)
- [ ] Build output size comparison
- [ ] Font loading performance (no regressions)

---

## Refinement History

**Refinements:**
- 2026-02-16: Resolved 3 questions via interactive Q&A (logo placement, single-file sections, font pairing choice)

---

## Implementation Notes

**Actual Time Tracking:**
- Phase 1: [Estimated: 1 hour] (Actual: )
- Phase 2: [Estimated: 2 hours] (Actual: )
- Phase 3: [Estimated: 2 hours] (Actual: )
- Phase 4: [Estimated: 1.5 hours] (Actual: )
- Phase 5: [Estimated: 1 hour] (Actual: )
- Phase 6: [Estimated: 1 hour] (Actual: )

**Key Decisions:**

**Assumptions Validated:**

**Lessons Learned:**
