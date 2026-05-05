# public/images/ Cleanup & Portrait Wire-Up Manifest

**Plan:** `_claude/plans/in_progress/010-public-images-orphan-cleanup.md`
**Created:** 2026-05-03
**Audit pass:** Phase 1
**Audit basis:** plan 008 manifest section "Other `public/images/` subdirectories — informational audit" + post-merge re-verification with the random-improvements branch.

## Re-verification summary

| Bucket | Files | All STILL-ORPHAN? | Notes |
| --- | --- | --- | --- |
| Cats 1–8 (deletion candidates) | 17 | YES (verified Grep) | Pure scaffolding from PR #4 / plan 002. |
| Cat 9a/9b (logo PNGs) | 2 | YES | Random-improvements branch removed both `<img>` tags. Only remaining src/ refs are the dead `organization.branding` literals. |
| Cat 10 (graduate portraits) | 16 total | N/A — wire-up | 8 already wired (nashid/sheisty/makeda/maria/wayne/crystal/rahiem/kindel); 8 unwired to be wired this plan. |
| Cat 11 (mentor portraits) | 6 total | N/A — wire-up | 0 wired today; 6 unwired to be wired this plan. |

**Total deletion targets: 19 files + 4 emptied subdirectories.**
**Total wire-up targets: 14 portrait files (8 graduates + 6 mentors).**

### dontay / zeek discrepancy — RESOLVED

Plan 008's manifest noted 10 names in `people/graduates/` including `dontay` and `zeek`. Confirmed via Glob: those two `.png` files are NOT in `people/graduates/` (and were not part of this folder after plan 008 — the `dontay.png` / `zeek.png` files in `public/images/testimonial/` were deleted by plan 008 Phase 3).

The names `Dontay` and `Zeek` DO still exist as text-only entries in `src/data/testimonials.ts` (lines 11–21) and are referenced in `src/pages/index.astro:17,25,27` as part of `carouselTestimonials`. The carousel rendering at `src/pages/index.astro:135` uses a `t.image &&` conditional, so missing portraits render text-only without warnings. **No action needed for Dontay / Zeek** — they're working as designed.

## Per-category tables

### Category 1 — About widgets

| File | Plan-008 status | Current Grep result | Decision |
| --- | --- | --- | --- |
| `public/images/about/whatwedo-circle1.png` | ORPHAN | STILL-ORPHAN (0 matches) | DELETE |
| `public/images/about/whatwedo-circle2.png` | ORPHAN | STILL-ORPHAN (0 matches) | DELETE |
| `public/images/about/whatwedo-circle3.png` | ORPHAN | STILL-ORPHAN (0 matches) | DELETE |
| `public/images/about/whywedoit-bottom.png` | ORPHAN | STILL-ORPHAN (0 matches) | DELETE |
| `public/images/about/whywedoit-left.png` | ORPHAN | STILL-ORPHAN (0 matches) | DELETE |

### Category 2 — About portrait

| File | Plan-008 status | Current Grep result | Decision |
| --- | --- | --- | --- |
| `public/images/about/ourstory-portrait.jpg` | ORPHAN | STILL-ORPHAN (0 matches) | DELETE |

### Category 3 — Approach decorative

| File | Plan-008 status | Current Grep result | Decision |
| --- | --- | --- | --- |
| `public/images/approach/decorative.png` | ORPHAN | STILL-ORPHAN (0 matches) | DELETE — remove parent `approach/` dir |

### Category 4 — Build With Us (whole folder)

| File | Plan-008 status | Current Grep result | Decision |
| --- | --- | --- | --- |
| `public/images/buildwithus/group.jpg` | ORPHAN | STILL-ORPHAN (0 matches) | DELETE — remove parent `buildwithus/` dir |
| `public/images/buildwithus/portrait.png` | ORPHAN | STILL-ORPHAN (0 matches) | DELETE |

### Category 5 — Community (whole folder)

| File | Plan-008 status | Current Grep result | Decision |
| --- | --- | --- | --- |
| `public/images/community/circle.png` | ORPHAN | STILL-ORPHAN (0 matches) | DELETE — remove parent `community/` dir |
| `public/images/community/fullwidth.jpg` | ORPHAN | STILL-ORPHAN (0 matches) | DELETE |

### Category 6 — Impact hero

| File | Plan-008 status | Current Grep result | Decision |
| --- | --- | --- | --- |
| `public/images/impact/hero.jpg` | ORPHAN | STILL-ORPHAN (0 matches) | DELETE (impact/ dir keeps other files — do NOT remove dir) |

### Category 7 — Partner singular (whole folder)

| File | Plan-008 status | Current Grep result | Decision |
| --- | --- | --- | --- |
| `public/images/partner/cca-spotlight.png` | ORPHAN | STILL-ORPHAN (0 matches) | DELETE — remove parent `partner/` dir (distinct from `partners/`) |
| `public/images/partner/hero.jpg` | ORPHAN | STILL-ORPHAN (0 matches) | DELETE |
| `public/images/partner/ways-illustration.png` | ORPHAN | STILL-ORPHAN (0 matches) | DELETE |

### Category 8 — Programs scaffolding

| File | Plan-008 status | Current Grep result | Decision |
| --- | --- | --- | --- |
| `public/images/programs/hero.jpg` | ORPHAN | STILL-ORPHAN (0 matches) | DELETE (programs/ dir keeps other files — do NOT remove dir) |
| `public/images/programs/laptop-illustration.png` | ORPHAN | STILL-ORPHAN (0 matches) | DELETE |

### Category 9 — Logo PNGs + branding block

| File | Plan-008 status | Current Grep result | Decision |
| --- | --- | --- | --- |
| `public/images/header-logo.png` (9b) | KEEP (was wired in Header) | STILL-ORPHAN since random-improvements merge (only ref is `organization.ts.branding.headerLogo` literal — dead) | DELETE |
| `public/images/footer-logo.png` (9a) | KEEP (was wired in Footer) | STILL-ORPHAN since random-improvements merge (only ref is `organization.ts.branding.footerLogo` literal — dead) | DELETE |
| `src/data/organization.ts` `branding` block (9c) | N/A | Block at lines 31–34, no consumers | REMOVE FROM CODE |

## Wire-up plan — easy (Phase 3)

These are mechanical data-add edits. No UI changes required (rendering already handles `image?` field via conditional except where noted).

### Testimonials (`src/data/testimonials.ts`)

| Person | Existing entry | Add `image:` value | Already-wired graduate? |
| --- | --- | --- | --- |
| Blueberry | line 37 | `/images/people/graduates/blueberry.png` | No |
| Julius | line 48 | `/images/people/graduates/julius.png` | No |
| Kat | line 68 | `/images/people/graduates/kat.png` | No |
| Terrence | line 61 | `/images/people/graduates/terrence.png` | No |

Already wired (no change): Sheisty (24), Nashid (30), Makeda (85), Maria (93), Wayne (101), Crystal (109), Rahiem (117), Kindel (125).

### Mentor testimonials (`src/data/testimonials.ts` — `mentorTestimonials`)

| Person | Existing entry | Add `image:` value |
| --- | --- | --- |
| Meagan | line 135 | `/images/people/mentors/meagan.png` |
| Dawn | line 141 | `/images/people/mentors/dawn.png` |
| Melissa | line 147 | `/images/people/mentors/melissa.png` |

### Team (`src/data/team.ts`)

| Person | Existing entry | Action |
| --- | --- | --- |
| Nasiar Denobrega | line 35–37 | Change `image: "/images/team/placeholder-4.jpg"` → `image: "/images/people/graduates/nasiar.png"` |

### Rendering check (Phase 3 reads, may need fix)

| File | Surface | Renders `image` conditionally? | Action |
| --- | --- | --- | --- |
| `src/pages/index.astro` line 135 | testimonials carousel | YES — `{t.image && (...)}` + `--text-only` modifier class | None |
| `src/pages/team.astro` lines 33, 59, 79 | staff/board/advisory | YES — direct `<img src={member.image}>` (every entry has `image`) | None |
| `src/pages/get-involved.astro` lines 84–87 | mentor testimonial | NO — uses static `portrait5` import, ignores `mentorQuote.image` | **FIX in Phase 3:** use `mentorQuote.image` if present, fall back to `portrait5` |

## Wire-up plan — hard / mentorshipPairings (Phase 4)

### Current data shape (`src/pages/get-involved.astro` lines 17–66)

```ts
const mentorshipPairings = [
  {
    mentee: { name: "Baraka", role: "TECK Mentee" },
    mentor: { name: "Voice", role: "TECK Mentor" },
    menteeQuote: "...",
    mentorQuote: "...",
  },
  // ... 7 more
];
```

### Proposed extended shape

```ts
const mentorshipPairings = [
  {
    mentee: { name: "Baraka", role: "TECK Mentee", image: "/images/people/mentors/baraka.png" },
    mentor: { name: "Voice", role: "TECK Mentor", image: "/images/people/graduates/voice.png" },
    menteeQuote: "...",
    mentorQuote: "...",
  },
  // ... 7 more (image optional)
];
```

### Pairing-by-pairing image refs

| # | Mentee | Mentee image | Mentor | Mentor image |
| --- | --- | --- | --- | --- |
| 1 | Baraka | `/images/people/mentors/baraka.png` (misfiled — see note) | Voice | `/images/people/graduates/voice.png` (misfiled — see note) |
| 2 | Lori | `/images/people/graduates/lori.png` | Meagan | `/images/people/mentors/meagan.png` |
| 3 | Alberto | `/images/people/graduates/alberto.png` | Dylan | `/images/people/mentors/dylan.png` |
| 4 | Kat | `/images/people/graduates/kat.png` | Sneha | `/images/people/mentors/sneha.png` |
| 5 | Blueberry | `/images/people/graduates/blueberry.png` | Octavia | (no portrait — fallback) |
| 6 | Nashid | `/images/people/graduates/nashid.png` | Army | (no portrait — fallback) |
| 7 | Crystal | `/images/people/graduates/crystal.png` | Melissa | `/images/people/mentors/melissa.png` |
| 8 | Blueberry | `/images/people/graduates/blueberry.png` | Octavia | (no portrait — fallback) |

**Total image refs populated: 14** (out of 16 possible mentee+mentor slots; 2 fallbacks for Octavia / Army).

### Misfiling note

- `baraka.png` lives in `public/images/people/mentors/` but Baraka appears as a **mentee** in the carousel.
- `voice.png` lives in `public/images/people/graduates/` but Voice appears as a **mentor** in the carousel.

Decision: **don't rename either file.** The folder is incidental — the data points at the correct path either way. A future cleanup PR can reorganize the folders if desired.

### Current rendering markup (lines 113–132)

```astro
<div class="pairing-carousel__card" data-pairing-card={i}>
  <div class="pairing-card">
    <div class="pairing-card__header">
      <span class="pairing-card__names">{pair.mentee.name} & {pair.mentor.name}</span>
      <span class="pairing-card__label">Mentee & Mentor</span>
    </div>
    <div class="pairing-card__quotes">
      <blockquote class="pairing-card__quote">
        "{pair.menteeQuote}"
        <cite>— {pair.mentee.name}, {pair.mentee.role}</cite>
      </blockquote>
      <blockquote class="pairing-card__quote">
        "{pair.mentorQuote}"
        <cite>— {pair.mentor.name}, {pair.mentor.role}</cite>
      </blockquote>
    </div>
  </div>
</div>
```

### Proposed rendering update

Add a `pairing-card__portraits` row above the existing `pairing-card__header`. Two circular thumbnails side-by-side (mentee on left, mentor on right) with name labels under each. Diameter ~72px (within the 60-80px design target).

```astro
<div class="pairing-card__portraits">
  <div class="pairing-card__person">
    {pair.mentee.image
      ? <img src={pair.mentee.image} alt={pair.mentee.name} class="pairing-card__avatar" />
      : <div class="pairing-card__avatar pairing-card__avatar--fallback">{pair.mentee.name.charAt(0)}</div>}
    <span class="pairing-card__person-name">{pair.mentee.name}</span>
  </div>
  <div class="pairing-card__person">
    {pair.mentor.image
      ? <img src={pair.mentor.image} alt={pair.mentor.name} class="pairing-card__avatar" />
      : <div class="pairing-card__avatar pairing-card__avatar--fallback">{pair.mentor.name.charAt(0)}</div>}
    <span class="pairing-card__person-name">{pair.mentor.name}</span>
  </div>
</div>
```

Existing `pairing-card__header` keeps the combined "Baraka & Voice" name + label below the portraits (acts as a caption tying the two together). After Phase 4 is built, consider whether the header is still needed or becomes redundant.

CSS additions: `.pairing-card__portraits`, `.pairing-card__person`, `.pairing-card__avatar`, `.pairing-card__avatar--fallback`, `.pairing-card__person-name`.

CSS impact on `sizePairingStage()`: the carousel measures via `scrollHeight`, so taller cards adjust automatically — no JS update required.

## Logo / branding cleanup (Phase 2 + Phase 3)

| Confirmed | Action |
| --- | --- |
| `Header.astro` line 23: `<a class="st-header__logo">` contains only `<span>Emergent Works</span>` (no `<img>`) | None — no change required |
| `Footer.astro` line 8: `<div class="st-footer__logo">` contains only `<span>Emergent Works</span>` (no `<img>`) | None — no change required |
| `Layout.astro`: previously had `.st-header__logo img` and `.st-footer__logo img` rules — both already removed by random-improvements branch | None — no change required |
| `organization.ts` lines 31–34: `branding: { headerLogo, footerLogo }` block | **REMOVE in Phase 3** (dead code, no consumer) |
| `public/images/header-logo.png` | **DELETE in Phase 2** |
| `public/images/footer-logo.png` | **DELETE in Phase 2** |

## Empty directories that will result from deletions

After Phase 2:

- `public/images/approach/` → 0 files → **REMOVE**
- `public/images/buildwithus/` → 0 files → **REMOVE**
- `public/images/community/` → 0 files → **REMOVE**
- `public/images/partner/` (singular) → 0 files → **REMOVE**

Will NOT go empty:

- `public/images/about/` (other files remain — but verify with Glob: actually after deleting all 6 cat-1+2 files, this dir IS empty too. Check Phase 2.)
- `public/images/impact/` (other files remain)
- `public/images/programs/` (other files remain)

**Audit observation:** `public/images/about/` currently contains exactly 6 files, all of which are in cats 1 and 2 (DELETE). So `about/` will also go to 0 files. **Add `about/` to the remove-emptied-subdir list in Phase 2.**

## Phase boundaries summary

| Phase | Inputs | Outputs |
| --- | --- | --- |
| 1 | Plan 008 manifest + random-improvements merge state | This document |
| 2 | This document, "Per-category tables" sections | 19 files deleted + 5 emptied subdirs removed (`approach`, `buildwithus`, `community`, `partner` + `about` per audit observation) |
| 3 | This document, "Wire-up plan — easy" + "Logo / branding cleanup" | testimonials.ts (4 + 3 image fields), team.ts (1 path swap), get-involved.astro mentor section (use `mentorQuote.image` w/ fallback), organization.ts (branding block removed) |
| 4 | This document, "Wire-up plan — hard" | get-involved.astro mentorshipPairings extended + portrait rendering + fallback initials |
| 5 | All prior phases | Clean build, all greps zero, dev-server spot-check |
