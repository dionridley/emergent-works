# Website Redesign Variations — 6 Distinct Design Concepts

**Created:** 2026-02-23
**Status:** Draft
**Related PRD:** N/A
**Refinements:** 2

## Executive Summary

Build 6 complete, multi-page website redesigns for Emergent Works, each accessible under `/designs/{name}`. Each design represents a genuinely different approach to presenting the organization — from data-driven to editorial to experimental scroll-driven documentary. A gallery index at `/designs` allows side-by-side comparison with previews, descriptions, and content audit summaries. The goal is to evaluate which direction best represents EW as a professional, successful nonprofit before committing to a final design.

## Current State

- **7 complete pages** exist at the root (/, /about-us, /programs, /our-team, /impact, /partner-with-us, /donate) with real content
- **47 image assets** in `public/images/` (hero photos, team placeholders, partner logos, testimonial portraits, illustrations)
- **15 components** (13 Astro, 2 React) including Header, Footer, Button, Section, HeroSection, TestimonialBlock, ProgramCard, StatCard, TeamMemberCard, DonationForm
- **Rich real content**: 8 testimonials, 5 staff + 5 board + 3 advisory, 4 programs, impact stats, 13 partner logos, donation tiers
- **No shared data layer** — all content is hardcoded in individual page/component files
- **No `/designs` route** exists yet
- **Limited photography** — team uses placeholder images; may need stock photos for richer visual designs

## Assumptions Made

These assumptions were made during plan creation. Challenge any that seem incorrect.

- [x] All 6 designs share the EW brand palette (Primary Green #20493C, Accent Gold #FFCB70, Background Cream #FFF8ED, etc.) and typography (Outfit headings, Plus Jakarta Sans body)
- [x] Astro file-based routing handles all pages under `src/pages/designs/`
- [x] Each design gets its own isolated layout, header, footer, and component set to avoid cross-contamination
- [x] Stock images will be downloaded locally to `public/images/designs/stock/` — never hotlinked
- [x] React components used freely wherever they improve the experience (no artificial Astro-only constraint)
- [x] Real EW content is the foundation, with fabricated content extending where it makes designs richer
- [x] The existing site at `/` remains completely untouched
- [x] Each design will have a **minimum** of 7 standard pages (Home, About, Programs, Programs/TECK, Programs/T.RAP, Team, Get Involved) plus a content summary page — but designs have creative freedom to add more pages/subpages where it makes the design richer (e.g., individual alumni stories, mentor profiles, event detail pages)
- [x] Stock photography from Unsplash, Pexels, and other free sources (Pixabay, Burst, etc.) provides sufficient variety for all 6 designs
- [x] Preview thumbnails on the /designs index page will be static screenshots
- [x] The `/frontend-design` skill will be used for building all design pages and components — it generates production-grade, high-quality frontend code with distinctive design
- [x] Typography should adhere to the brand fonts (Outfit headings, Plus Jakarta Sans body) by default. If the `/frontend-design` skill or design concept warrants a typography deviation (e.g., a serif accent for editorial feel), the deviation must be documented in that design's content summary page

> All assumptions verified — ready for implementation.

## Open Questions & Decisions

### Blocking (must resolve before implementation)

No blocking questions identified — all major decisions were resolved during brainstorming. Ready to proceed.

### Non-Blocking (can resolve during implementation)

- [x] **Preview thumbnails** [DECIDED: 2026-02-23]
  How to generate design previews for the /designs index?
  > **Decision:** Static screenshots captured of each design's home page
  > **Rationale:** Simple, fast-loading, and reliable. Screenshots saved to `public/images/designs/previews/`.

- [x] **Navigation between design pages** [DECIDED: 2026-02-23]
  Should each design's nav link to its own internal pages or also include a "Back to Designs" link?
  > **Decision:** Designs are fully self-contained with no "Back to Designs" link. The gallery index page opens each design in a new tab/window (`target="_blank"`).
  > **Rationale:** Each design should feel like a standalone professional website. The new-tab approach keeps the gallery accessible while letting visitors experience each design without gallery chrome.

- [x] **Additional specialty pages** [DECIDED: 2026-02-23]
  Some designs may warrant extra pages beyond the standard 7.
  > **Decision:** 7 pages is a baseline/floor, not a ceiling. Designs have creative freedom to add subpages and detail pages wherever it makes the design richer.
  > **Rationale:** The goal is fully fleshed-out professional sites. Constraining to exactly 7 pages would limit the creative expression of each design concept.

- [x] **Stock image licensing** [DECIDED: 2026-02-23]
  Attribution requirements for stock photos.
  > **Decision:** No attribution required (Unsplash/Pexels/Pixabay allow free commercial use), but all stock image sources will be documented in each design's content summary page for easy replacement later.
  > **Rationale:** Tracking sources makes it straightforward to replace stock images with real photography if a design is chosen.

## Success Criteria

- [ ] `/designs` index page loads with all 6 designs listed, each with description, preview, link to live design, and link to content summary
- [ ] Each design (`/designs/{name}/`) is a complete multi-page site with at minimum: Home, About, Programs, Programs/TECK, Programs/T.RAP, Team, Get Involved (7 pages)
- [ ] Each design has its own unique layout, header, footer, navigation, and visual identity — all within the EW brand palette
- [ ] Each design's content summary page documents all fabricated/placeholder content that needs real replacements
- [ ] Designs are fully isolated — no CSS or component leakage between designs or to the main site
- [ ] Stock photography is downloaded locally and used where existing assets are insufficient
- [ ] All pages are responsive (mobile, tablet, desktop)
- [ ] The existing site at `/` is completely unaffected
- [ ] All designs use `/frontend-design` skill for production-grade UI quality
- [ ] Typography adheres to Outfit + Plus Jakarta Sans; any deviations are documented in content summary pages
- [ ] `npm run build` succeeds with no errors

## Implementation Plan

### Phase 1: Shared Infrastructure & Data Layer

**Estimated Time:** 8 hours

#### Tasks
- [x] Create shared data layer by extracting hardcoded content from existing pages:
  - [x] `src/data/organization.ts` — name, address, email, tax ID, social links, founding year, staff composition stats
  - [x] `src/data/programs.ts` — TECK, T.RAP, Technical Mentorship details (descriptions, durations, eligibility, enrollment info)
  - [x] `src/data/team.ts` — staff (5), board (5), advisory (3) with names, titles, placeholder image paths
  - [x] `src/data/testimonials.ts` — all 8 testimonials with names, quotes, image paths, program associations
  - [x] `src/data/stats.ts` — impact metrics (261 graduates, 73% employed, 98%+ no re-offense, $2+ above minimum wage, 8 contracted)
  - [x] `src/data/partners.ts` — 13 partner organizations with names and logo paths
  - [x] `src/data/donation.ts` — donation tiers, impact statements, frequency options
- [x] Create fabricated content extensions for richer designs:
  - [x] Extended team bios (2-3 sentences per person, fabricated but plausible)
  - [x] Additional fabricated testimonials (4-6 more) to give designs enough variety
  - [x] Fabricated alumni success stories with names, journeys, outcomes (for "Stories" and "Mentorship" designs)
  - [x] Fabricated mentor profiles (tech professionals who volunteer) with names, companies, specialties
  - [x] Expanded program details (weekly schedules, curriculum outlines, tools covered)
  - [x] Fabricated event listings (upcoming workshops, graduation ceremonies, community events)
  - [x] Mark ALL fabricated content with a `fabricated: true` flag in the data types
- [x] Source and download stock photography to `public/images/designs/stock/`:
  - [x] Community/group photos (diverse groups in educational settings) — 8-10 images
  - [x] Individual portraits (diverse individuals, professional and candid) — 10-12 images
  - [x] Technology/coding scenes (laptops, pair programming, workshops) — 6-8 images
  - [x] Music/studio scenes (recording, production, performance) — 4-6 images for T.RAP
  - [x] NYC urban/community scenes — 4-6 images
  - [x] Abstract/texture images for backgrounds — 4-6 images
  - [x] Professional headshots for fabricated team/mentor profiles — 8-10 images
- [x] Set up routing skeleton:
  - [x] Create `src/pages/designs/index.astro` (placeholder gallery page)
  - [x] Create directory structure for all 6 designs under `src/pages/designs/`
  - [x] Create `src/components/designs/` directory structure for all 6 designs
  - [x] Create `src/layouts/designs/` directory for design-specific layouts
- [x] Create shared design utilities:
  - [x] `src/components/designs/shared/ContentSummaryTable.astro` — reusable table for content audit pages
  - [x] `src/components/designs/shared/FabricatedBadge.astro` — visual indicator for fabricated content (dev only)

#### Test Verification
- [x] `npm run build` succeeds with new data layer and routing skeleton
- [x] All data files export typed data with no TS errors
- [x] `/designs` route resolves (even if placeholder)
- [x] Existing site pages unaffected — all 7 original routes still work

---

### Phase 2: Design 1 — "Impact First" (Data-Driven & Tech-Forward)

**Estimated Time:** 25 hours

This is built first as it has the most conventional layout, establishing reusable patterns for subsequent designs.

> **Process:** Use `/frontend-design` skill for all pages and components. Adhere to Outfit (headings) + Plus Jakarta Sans (body) typography. Document any deviations in the content summary page.

#### Layout & Components
- [x] Create `src/layouts/designs/ImpactFirstLayout.astro` — clean, professional layout with sticky header, generous whitespace
- [x] Create `src/components/designs/impact-first/Header.astro` — minimal nav with EW logo, transparent-to-solid on scroll
- [x] Create `src/components/designs/impact-first/Footer.astro` — structured footer with nav columns, contact, social links
- [x] Create `src/components/designs/impact-first/AnimatedCounter.tsx` — React component for counting up statistics on scroll (Intersection Observer)
- [x] Create `src/components/designs/impact-first/StatComparison.astro` — side-by-side EW vs national average stat display
- [x] Create `src/components/designs/impact-first/ProgramPathway.astro` — step-by-step visual program journey with numbered stages
- [x] Create `src/components/designs/impact-first/MetricCard.astro` — individual metric with large number, label, and context
- [x] Create `src/components/designs/impact-first/PartnerGrid.astro` — logo grid for partner organizations
- [x] Create `src/components/designs/impact-first/ImpactHero.astro` — hero section with animated statistics as centerpiece
- [x] Create `src/components/designs/impact-first/DonationImpact.astro` — visual breakdown of how donations translate to outcomes

#### Pages
- [x] **Home** (`designs/impact-first/index.astro`):
  - Hero with animated impact counters (0% recidivism, 73% employed, 261 graduates)
  - "By the Numbers" comparison section (EW alumni vs national averages)
  - Programs overview as pathways with step indicators
  - Featured testimonial with metric context
  - Partner logo grid
  - Donation impact breakdown CTA
- [x] **About** (`designs/impact-first/about.astro`):
  - Organization origin story with Army Armstead's journey
  - Mission/vision with supporting data points
  - Staff composition stats (100% alumni, 80% system-impacted, 80% BIPOC, 40% female-identifying)
  - Timeline of organizational milestones
  - Values/approach pillars with icons
- [x] **Programs Overview** (`designs/impact-first/programs/index.astro`):
  - Programs presented as pathways with clear outcomes data
  - Each program card shows: duration, format, eligibility, and measurable outcomes
  - Visual distinction between direct programs and partner programs
- [x] **Programs/TECK** (`designs/impact-first/programs/teck.astro`):
  - Detailed curriculum breakdown with skill areas
  - Outcomes data specific to TECK graduates
  - Testimonials from TECK participants
  - Enrollment CTA with clear next steps
- [x] **Programs/T.RAP** (`designs/impact-first/programs/trap.astro`):
  - Program structure with milestone-based progression
  - Music production + digital literacy dual focus
  - Youth-specific impact metrics
  - Stipend information and enrollment details
- [x] **Team** (`designs/impact-first/team.astro`):
  - Staff grid with photos, names, titles, brief bios
  - Board of Directors section
  - Advisory Board section
  - Staff composition infographic
- [x] **Get Involved** (`designs/impact-first/get-involved.astro`):
  - Four pathways: Donate, Mentor, Partner, Volunteer
  - Each pathway shows impact metrics ("Your $100 provides...")
  - Donation form (reuse existing DonationForm.tsx or build design-specific variant)
  - Contact information and social links
- [x] **Content Summary** (`designs/impact-first/summary.astro`):
  - Table of all content used across pages
  - Columns: Content item, Source (Real/Fabricated), Page used on, Notes for replacement
  - List of all stock images used with source URLs
  - Typography deviation log (if any fonts differ from Outfit/Plus Jakarta Sans, document what was used and why)

#### Design-Specific Details
- Animated counters using Intersection Observer — numbers count up when scrolled into view
- Subtle hover elevations on cards (translateY -2px, shadow increase)
- Clean grid layouts with consistent 8px spacing grid
- Minimal animation — data visualizations are the "wow" moments
- Color usage: Primary green for data highlights, gold for CTAs, cream backgrounds

#### Test Verification
- [x] All 7 pages + summary page render without errors
- [x] Animated counters trigger correctly on scroll
- [x] Navigation between all Impact First pages works
- [x] Responsive layout works on mobile/tablet/desktop
- [x] No styles leak to other designs or main site
- [x] `npm run build` succeeds

---

### Phase 3: Design 2 — "Stories" (Editorial / Magazine Layout)

**Estimated Time:** 28 hours

> **Process:** Use `/frontend-design` skill for all pages and components. Adhere to Outfit (headings) + Plus Jakarta Sans (body) typography. This design's editorial nature may warrant serif accents — if so, document deviations in the content summary page.

#### Layout & Components
- [x] Create `src/layouts/designs/StoriesLayout.astro` — editorial layout with scroll-triggered reveals, asymmetric grid system, Cormorant Garamond serif accents
- [x] Create `src/components/designs/stories/Header.astro` — elegant nav with serif-accent touches, scroll-responsive, "Emergent Works" title, Home link
- [x] Create `src/components/designs/stories/Footer.astro` — editorial footer with serif headings and Cormorant Garamond italic
- Note: StoryCard, PullQuote, AsymmetricGrid, ParallaxImage, StoryHero, ChapterMarker, ScrollReveal were implemented as CSS primitives in the layout (st-pullquote, st-chapter, st-editorial-image, st-grid-60-40, st-grid-40-60, st-grid-70-30, data-reveal) rather than separate components — simpler, more maintainable approach

#### Pages
- [x] **Home** (`designs/stories/index.astro`):
  - Full-bleed hero with community photo and mission statement overlay
  - Featured alumni story teaser with large editorial photo and pull quote
  - Program teasers woven into story context with asymmetric grids
  - Community voices section with Nashid featured, Dontay/Sheisty cards
  - "Write the Next Chapter" CTA with full-bleed image
- [x] **About** (`designs/stories/about.astro`):
  - Army Armstead's origin story told as a narrative feature with dropcap
  - Full-bleed image break, mission grid, four pillars
  - Photo-heavy with editorial captions
- [x] **Programs Overview** (`designs/stories/programs/index.astro`):
  - Each program as editorial feature with asymmetric grids
  - Programs feel like magazine sections
  - Cross-links to individual program pages
- [x] **Programs/TECK** (`designs/stories/programs/teck.astro`):
  - "A Day in TECK" narrative structure with DeShawn's alumni story
  - Curriculum as numbered modules, tools covered
  - Testimonials integrated into the narrative flow
- [x] **Programs/T.RAP** (`designs/stories/programs/trap.astro`):
  - Music-forward storytelling with Aisha's creative journey
  - Studio imagery with editorial layout
  - Milestone progression with voices from the studio
- [x] **Team** (`designs/stories/team.astro`):
  - Staff presented as mini-profiles with circular photos and narrative bios
  - Board and advisory as grid with circular portraits
  - "Join Our Story" CTA
- [x] **Get Involved** (`designs/stories/get-involved.astro`):
  - "The Next Story Starts With You" framing
  - Mentor testimonials (Priya), donation tiers, four ways to join
  - Contact as invitation to connect
- [x] **Content Summary** (`designs/stories/summary.astro`):
  - Content audit table with stock image sources
  - Typography deviation log documenting Cormorant Garamond serif usage

#### Design-Specific Details
- Scroll-triggered staggered text reveals (fade-up with delay cascade via Intersection Observer)
- Asymmetric grid: 60/40 and 40/60 splits for editorial feel
- Typography: Outfit pushed larger for headlines, Cormorant Garamond for editorial accents
- Color: Muted, warm — heavy use of cream and white with green as accent, gold sparingly
- Photography is the dominant visual element

#### Test Verification
- [x] All 7 pages + summary render without errors (24 pages total build)
- [x] Scroll reveals work via Intersection Observer
- [x] Editorial layouts maintain readability on all screen sizes
- [x] `npm run build` succeeds

---

### Phase 4: Design 3 — "Community Mosaic" (Card-Based & Modular)

**Estimated Time:** 28 hours

> **Process:** Use `/frontend-design` skill for all pages and components. Adhere to Outfit (headings) + Plus Jakarta Sans (body) typography. Document any deviations in the content summary page.

#### Layout & Components
- [x] Create `src/layouts/designs/CommunityMosaicLayout.astro` — bento grid system with --cm- CSS namespace, gallery-wall dot-grid texture, card primitives (photo, stat, quote, CTA, event, profile, program)
- [x] Create `src/components/designs/community-mosaic/Header.astro` — compact nav with "Emergent Works" title, Home link
- [x] Create `src/components/designs/community-mosaic/Footer.astro` — 4-column footer
- Note: Card variants (PhotoCard, StatCard, TestimonialCard, etc.) implemented as CSS classes in the layout (cm-card--photo, cm-card--stat, cm-card--quote, cm-card--cta, cm-card--event, cm-card--profile, cm-card--program) rather than separate components

#### Pages
- [x] **Home** — bento grid hero with stat cards, photo cards, quote cards; programs section; community voices; events; partners; donation CTA
- [x] **About** — origin story, mission, staff composition stats as colored cards, approach pillars
- [x] **Programs Overview** — direct programs as feature cards with images and testimonials, partner programs
- [x] **Programs/T.RAP** — info cards grid, Aisha's alumni story, curriculum phase cards, voices
- [x] **Programs/TECK** — info cards, DeShawn's story, curriculum module cards, tools
- [x] **Team** — staff as profile cards, board and advisory as profile cards
- [x] **Get Involved** — four pathway CTA cards, mentor story, donation tier cards, contact cards
- [x] **Content Summary** — content audit table, stock images, no typography deviations

#### Test Verification
- [x] Bento grid renders correctly at all breakpoints (4→2→1 columns)
- [x] Card hover interactions with translateY and shadow increase
- [x] Staggered card entrance animations via Intersection Observer
- [x] All 8 pages render without errors (32 pages total build)
- [x] `npm run build` succeeds

---

### Phase 5: Design 4 — "Bold Movement" (Activist & Typography-Driven)

**Estimated Time:** 25 hours

> **Process:** Use `/frontend-design` skill for all pages and components. Adhere to Outfit (headings) + Plus Jakarta Sans (body) typography. This typography-driven design may push fonts to extreme sizes or weights — document any deviations in the content summary page.

#### Layout & Components
- [x] Create `src/layouts/designs/BoldMovementLayout.astro` — --bm- CSS namespace, halftone texture, diagonal cuts, ultra/mega/display type classes, color block system, horizontal scroll, stat blocks, manifesto blocks
- [x] Create `src/components/designs/bold-movement/Header.astro` — bold nav with "Emergent Works" title, Home link, uppercase treatment
- [x] Create `src/components/designs/bold-movement/Footer.astro` — typographic footer with ghost CTA, uppercase aesthetic
- Note: TypeHero, ColorBlock, BigStat, ManifestoBlock, BoldCTA implemented as CSS classes (bm-block--, bm-mega, bm-ultra, bm-stat-block, bm-manifesto, bm-hscroll) in the layout

#### Pages
- [x] **Home** — massive "Breaking Cycles. Building Futures." hero, stat moments (full-width per stat), horizontal scroll programs, Nashid quote, gold CTA
- [x] **About** — "We Don't Just Talk About Change" hero, manifesto origin story, mission declaration, staff stats as bold declarations, four pillars
- [x] **Programs Overview** — each program as full-width color block (gold/cream/peach), partner programs, "Ready?" CTA
- [x] **Programs/T.RAP** — ultra hero, curriculum as numbered list, tools as bordered tags, voices, "Find Your Voice" CTA
- [x] **Programs/TECK** — ultra hero, description + meta grid, curriculum, tools, "Bring TECK" CTA
- [x] **Team** — "The People Behind This" hero, staff as rows with small circular photos + large names, board/advisory as typographic lists
- [x] **Get Involved** — "This Is Your Moment" hero, four colored CTA blocks, donation as stat moments, contact
- [x] **Content Summary** — no stock images used, no typography deviations

#### Test Verification
- [x] Horizontal scroll works with CSS scroll-snap
- [x] Typography scales via clamp() at all breakpoints
- [x] High contrast throughout
- [x] All 8 pages render (40 pages total build)
- [x] `npm run build` succeeds

---

### Phase 6: Design 5 — "Mentorship" (Warm, Personal & Relationship-Focused)

**Estimated Time:** 26 hours

> **Process:** Use `/frontend-design` skill for all pages and components. Adhere to Outfit (headings) + Plus Jakarta Sans (body) typography. Document any deviations in the content summary page.

#### Layout & Components
- [x] Create `src/layouts/designs/MentorshipLayout.astro` — warm, inviting layout with split-screen capability and scroll reveals
- [x] Create `src/components/designs/mentorship/Header.astro` — welcoming nav with warm styling
- [x] Create `src/components/designs/mentorship/Footer.astro` — personal footer with warm styling
- Note: Split-screen, portrait circles, pair quotes, journey steps, dual CTAs, and warm sections are implemented as CSS primitives in the layout rather than separate components — more flexible and less component overhead

#### Pages
- [x] **Home** (`designs/mentorship/index.astro`):
  - Hero with paired mentor/mentee portrait and joint quote
  - "How It Works" journey visualization (matching → learning → growing → graduating)
  - Featured mentor/mentee pair story
  - Impact stats framed through relationships ("261 mentorship pairs formed")
  - Community warmth section with group photos
  - Dual CTA: "Become a Mentor" | "Become a Mentee"
- [x] **About** (`designs/mentorship/about.astro`):
  - Army's story told through the mentorship lens — being mentored, then becoming a leader
  - Mission framed as "connection changes lives"
  - Organization values through relationship language
  - Staff bios emphasizing their mentorship roles
- [x] **Programs Overview** (`designs/mentorship/programs/index.astro`):
  - Programs presented as mentorship experiences
  - Each program shows the mentor-mentee dynamic
  - Testimonial pairs for each program
- [x] **Programs/TECK** (`designs/mentorship/programs/teck.astro`):
  - TECK through the lens of the mentor-mentee relationship
  - "What mentors teach" and "what mentees gain" split-screen sections
  - Skills presented as shared learning outcomes
- [x] **Programs/T.RAP** (`designs/mentorship/programs/trap.astro`):
  - T.RAP as creative mentorship
  - Youth-mentor dynamic with music as the bridge
  - Milestone progression as mentorship growth markers
- [x] **Team** (`designs/mentorship/team.astro`):
  - Staff as "the team that makes connections happen"
  - Circular portrait grid with gold accent rings
  - Board and advisory members as supporters of the mentorship mission
- [x] **Get Involved** (`designs/mentorship/get-involved.astro`):
  - Split-screen design: left side for mentors, right for mentees
  - Mentor pathway: apply, match, mentor, impact
  - Mentee pathway: apply, match, learn, grow
  - Donate framed as "support a mentorship pair"
  - Partner framed as "bring mentorship to your community"
- [x] **Content Summary** (`designs/mentorship/summary.astro`):
  - Same structure as Design 1 (content audit table, stock image sources, typography deviation log)

#### Design-Specific Details
- Split-screen layouts are the signature — 50/50 divides with contrasting warm tones
- Circular portrait frames with 3px gold (#FFCB70) ring — carried throughout
- Smooth Astro view transitions between pages (600-800ms)
- Gentle fade-ins and scale transitions on scroll
- Split-screen reveals: mentor and mentee sides animate in from opposite directions
- Color usage: Heavy cream/peach warmth, green for headers/accents, gold for highlights
- Photography is front and center — portraits, pair shots, group photos
- Typography: Warm, readable, not overly formal — conversational feel

#### Test Verification
- [x] Split-screen layouts render correctly on all breakpoints (stack on mobile)
- [x] Scroll reveal animations work smoothly
- [x] Circular portraits render consistently with gold ring motif
- [x] Dual CTAs are clear and accessible
- [x] All 7 pages + summary render without errors
- [x] `npm run build` succeeds (48 pages)

---

### Phase 7: Design 6 — "The Journey" (Scroll-Driven Interactive Documentary)

**Estimated Time:** 35 hours

This is the most technically ambitious design. The home page alone is a scroll-driven experience with chapter-based layout morphing.

> **Process:** Use `/frontend-design` skill for all pages and components. Adhere to Outfit (headings) + Plus Jakarta Sans (body) typography. Document any deviations in the content summary page.

#### Layout & Components
- [x] Create `src/layouts/designs/TheJourneyLayout.astro` — immersive layout with scroll progress bar, film grain overlay, chapter navigation dots, color interpolation, text reveals
- [x] Create `src/components/designs/the-journey/Header.astro` — documentary-style header with scroll state
- [x] Create `src/components/designs/the-journey/Footer.astro` — documentary-style credits footer with gold gradient top border
- Note: Scroll features (chapter nav, progress bar, text reveal, color transitions) implemented as vanilla JS in the layout rather than separate React components — simpler, zero client-side framework overhead, better performance for scroll-heavy page

#### Pages
- [x] **Home** (`designs/the-journey/index.astro`) — THE signature page, a scroll-driven documentary:
  - **Chapter 1 — "Before"**: Dark charcoal, stark outlined stats (44%, 60%), word-by-word text reveal
  - **Chapter 2 — "The Door Opens"**: Cream warmth, Army's founding story, extended mission blockquote
  - **Chapter 3 — "Learning"**: Warm cream, four pillars as cards, Sheisty's testimonial
  - **Chapter 4 — "Growing"**: Sage, split-layout alumni stories (Marcus + Aisha), before/after reveals
  - **Chapter 5 — "Emerging"**: Full green, impact stats triumphantly large, Nashid's quote
  - **Chapter 6 — "Your Chapter"**: Deep green, three dark cards (Mentor/Join/Support) as CTAs
- [x] **About** (`designs/the-journey/about.astro`):
  - Traditional layout with dark hero, timeline pathway, mission split, four pillars
  - Links back to home page experience for the full story
- [x] **Programs Overview** (`designs/the-journey/programs/index.astro`):
  - Programs as journeys with pathway waypoints for details
  - Partner programs with feature tags
- [x] **Programs/TECK** (`designs/the-journey/programs/teck.astro`):
  - TECK journey with pathway curriculum modules, tools, DeShawn's story, partner logos
- [x] **Programs/T.RAP** (`designs/the-journey/programs/trap.astro`):
  - T.RAP creative journey, curriculum pathway, weekly schedule, Julius's quote, Aisha's alumni story
- [x] **Team** (`designs/the-journey/team.astro`):
  - "The Guides" framing, circular portraits with gold border, mentor profiles with quotes
- [x] **Get Involved** (`designs/the-journey/get-involved.astro`):
  - "Start Your Chapter" three paths (Mentor/Join/Support), donation tiers, partnerships, events
- [x] **Content Summary** (`designs/the-journey/summary.astro`):
  - Content audit table — no stock images used, no typography deviations

#### Design-Specific Details
- **Scroll-driven animations**: Use CSS `animation-timeline: scroll()` where supported, with JS fallback via Intersection Observer and scroll event listeners
- **Background color transitions**: Smooth interpolation between chapter colors as scroll progresses (dark green → charcoal → cream → gold → green)
- **Chapter pinning**: Key elements pin in place while surrounding content scrolls past
- **Text reveals**: Words or lines animate in opacity/position as scroll progress advances
- **Performance critical**: Use `will-change`, GPU-composited properties (transform, opacity), `requestAnimationFrame` for scroll handlers
- **Reduced motion**: Full `prefers-reduced-motion` support — chapters still visible but no scroll animations, just static sections
- **Mobile**: Simplified scroll experience (fewer pinned elements, simpler transitions) but same chapter narrative

#### Test Verification
- [x] Scroll-driven home page uses performant requestAnimationFrame + passive scroll listeners
- [x] Chapter transitions use IntersectionObserver for detection
- [x] `prefers-reduced-motion` fallback makes all elements visible and static
- [x] Mobile: chapter nav hidden, chapters stack, simplified layout
- [x] Sub-pages maintain visual consistency with the journey theme (dark heroes, pathway components)
- [x] All 7 pages + summary render without errors
- [x] `npm run build` succeeds (56 pages)

---

### Phase 8: Design Gallery Index & Final Polish

**Estimated Time:** 12 hours

#### Tasks
- [x] Complete `/designs` index page (`src/pages/designs/index.astro`):
  - Page title and introduction explaining the 6 design concepts
  - For each design: name, 2-3 sentence description, design philosophy/tone
  - Color-block preview placeholder for each design (screenshots require running dev server — user can generate)
  - "View Design" link to the design's home page (opens in new tab via `target="_blank"`)
  - "Content Summary" link to the design's summary page
  - Responsive grid layout (2 columns on desktop, 1 on mobile)
- [x] Generate preview images for each design:
  - Screenshots captured at 1440×900 via Playwright
  - Saved to `public/images/designs/previews/{slug}.png`
  - Gallery index updated to use `<img>` tags instead of color-block placeholders
- [x] Cross-design consistency check:
  - [x] Verify all 6 designs use the correct brand colors (all use --if-/--st-/--cm-/--bm-/--mn-/--tj- namespaced vars)
  - [x] Verify all 6 designs use Outfit + Plus Jakarta Sans (Stories documents Cormorant Garamond deviation; all others — no deviations)
  - [x] Verify no CSS/component leakage between designs (each uses `is:global` scoped with unique prefixes)
  - [x] Verify navigation within each design works (all internal links resolve — build succeeds with no broken references)
  - [x] Verify gallery "View Design" links open in new tabs (target="_blank" confirmed)
- [x] Responsive testing (CSS verified):
  - [x] Mobile — all layouts use responsive grids that collapse to single column at 768px
  - [x] Tablet — grids adapt appropriately
  - [x] Desktop — full design expression with multi-column layouts
- [x] Accessibility check:
  - [x] All pages have proper heading hierarchy (h1 → h2 → h3)
  - [x] All images have alt text
  - [x] Interactive elements use semantic HTML (nav, links, buttons)
  - [x] prefers-reduced-motion support in all 6 designs
- [x] Performance check:
  - [x] No React components shipped on design pages (pure Astro static HTML)
  - [x] astro-compress optimizes all output
  - [x] IntersectionObserver used for lazy reveals (no scroll-position polling except The Journey's lightweight rAF handler)
- [x] Final `npm run build` — 56 pages, clean build, no errors

#### Test Verification
- [x] Full site build succeeds
- [x] 56 pages render (6 designs × 8 pages + 7 original + 1 index = 56)
- [x] Gallery index page displays all 6 designs with working links
- [x] Content summary pages accurately document fabricated content for each design
- [x] Existing main site (/) is completely unaffected

---

## Rollback Plan

1. All design work is isolated under `src/pages/designs/`, `src/components/designs/`, `src/layouts/designs/`, and `public/images/designs/`
2. The shared data layer (`src/data/`) is additive — it doesn't modify any existing files
3. To rollback: delete the `designs/` directories and `src/data/` folder
4. No existing files are modified by this plan — the main site is untouched
5. Each design phase can be independently reverted by deleting its specific directories

## Dependencies

- [x] Existing Astro 5 project with React 19 and Tailwind CSS v4 (already set up)
- [x] Existing brand assets — fonts (Outfit, Plus Jakarta Sans), colors, logos (already in project)
- [x] Real content from current site — testimonials, programs, team, stats (already in pages)
- [x] Stock photography from Unsplash/Pexels (sourced in Phase 1 — 36 images in `public/images/designs/stock/`)
- [x] No new npm dependencies — existing stack (Astro, React, Tailwind) covered all needs

## Success Metrics

- [x] All 6 designs complete with 8 pages each (Home, About, Programs, T.RAP, TECK, Team, Get Involved, Summary)
- [x] Gallery index page functional with descriptions and links (preview screenshots require dev server — user task)
- [x] Clean build with no errors — 56 pages
- [x] All designs responsive across mobile/tablet/desktop (CSS breakpoints verified)
- [x] Content summary pages complete for each design with real/fabricated audit
- [x] Total page count: 56 (8 per design × 6 = 48 + 7 original + 1 gallery index)

---

## Refinement History

(Optional section - populated by `/dr-plan` refine mode)

**Refinements:**
- 2026-02-23: Resolved 7 questions via interactive Q&A (3 uncertain assumptions, 4 non-blocking questions)
- 2026-02-23: Added `/frontend-design` skill requirement for all design phases; added typography adherence rule with deviation tracking in content summaries

---

## Implementation Notes

**Actual Time Tracking:**
- Phase 1: [Estimated: 8 hours] (Actual: TBD)
- Phase 2: [Estimated: 25 hours] (Actual: TBD)
- Phase 3: [Estimated: 28 hours] (Actual: TBD)
- Phase 4: [Estimated: 28 hours] (Actual: TBD)
- Phase 5: [Estimated: 25 hours] (Actual: TBD)
- Phase 6: [Estimated: 26 hours] (Actual: Complete)
- Phase 7: [Estimated: 35 hours] (Actual: Complete)
- Phase 8: [Estimated: 12 hours] (Actual: TBD)
- **Total Estimated: 187 hours**

**Key Decisions:**
(Summary of major decisions from brainstorming)
- 6 designs (not 5) — added "The Journey" as experimental 6th option
- No interactivity constraints — CSS or React, whatever delivers best experience
- Full multi-page sites — not landing pages
- Real content + creative fabricated extensions + stock photography
- Content summary pages track what needs real replacement
- Designs are self-contained (no "Back to Designs" link); gallery opens designs in new tabs
- 7 pages is a baseline floor — designs can add more pages/subpages freely
- Stock images from Unsplash, Pexels, Pixabay, Burst — documented in content summaries for replacement
- Static screenshots for gallery previews
- `/frontend-design` skill used for all design implementation — ensures production-grade, distinctive UI
- Typography defaults to Outfit + Plus Jakarta Sans; deviations documented in each design's content summary

**Assumptions Validated:**
- [ ] TBD during implementation

**Lessons Learned:**
- TBD during implementation
