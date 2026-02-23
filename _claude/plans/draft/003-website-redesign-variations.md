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
- [ ] Create shared data layer by extracting hardcoded content from existing pages:
  - [ ] `src/data/organization.ts` — name, address, email, tax ID, social links, founding year, staff composition stats
  - [ ] `src/data/programs.ts` — TECK, T.RAP, Technical Mentorship details (descriptions, durations, eligibility, enrollment info)
  - [ ] `src/data/team.ts` — staff (5), board (5), advisory (3) with names, titles, placeholder image paths
  - [ ] `src/data/testimonials.ts` — all 8 testimonials with names, quotes, image paths, program associations
  - [ ] `src/data/stats.ts` — impact metrics (261 graduates, 73% employed, 98%+ no re-offense, $2+ above minimum wage, 8 contracted)
  - [ ] `src/data/partners.ts` — 13 partner organizations with names and logo paths
  - [ ] `src/data/donation.ts` — donation tiers, impact statements, frequency options
- [ ] Create fabricated content extensions for richer designs:
  - [ ] Extended team bios (2-3 sentences per person, fabricated but plausible)
  - [ ] Additional fabricated testimonials (4-6 more) to give designs enough variety
  - [ ] Fabricated alumni success stories with names, journeys, outcomes (for "Stories" and "Mentorship" designs)
  - [ ] Fabricated mentor profiles (tech professionals who volunteer) with names, companies, specialties
  - [ ] Expanded program details (weekly schedules, curriculum outlines, tools covered)
  - [ ] Fabricated event listings (upcoming workshops, graduation ceremonies, community events)
  - [ ] Mark ALL fabricated content with a `fabricated: true` flag in the data types
- [ ] Source and download stock photography to `public/images/designs/stock/`:
  - [ ] Community/group photos (diverse groups in educational settings) — 8-10 images
  - [ ] Individual portraits (diverse individuals, professional and candid) — 10-12 images
  - [ ] Technology/coding scenes (laptops, pair programming, workshops) — 6-8 images
  - [ ] Music/studio scenes (recording, production, performance) — 4-6 images for T.RAP
  - [ ] NYC urban/community scenes — 4-6 images
  - [ ] Abstract/texture images for backgrounds — 4-6 images
  - [ ] Professional headshots for fabricated team/mentor profiles — 8-10 images
- [ ] Set up routing skeleton:
  - [ ] Create `src/pages/designs/index.astro` (placeholder gallery page)
  - [ ] Create directory structure for all 6 designs under `src/pages/designs/`
  - [ ] Create `src/components/designs/` directory structure for all 6 designs
  - [ ] Create `src/layouts/designs/` directory for design-specific layouts
- [ ] Create shared design utilities:
  - [ ] `src/components/designs/shared/ContentSummaryTable.astro` — reusable table for content audit pages
  - [ ] `src/components/designs/shared/FabricatedBadge.astro` — visual indicator for fabricated content (dev only)

#### Test Verification
- [ ] `npm run build` succeeds with new data layer and routing skeleton
- [ ] All data files export typed data with no TS errors
- [ ] `/designs` route resolves (even if placeholder)
- [ ] Existing site pages unaffected — all 7 original routes still work

---

### Phase 2: Design 1 — "Impact First" (Data-Driven & Tech-Forward)

**Estimated Time:** 25 hours

This is built first as it has the most conventional layout, establishing reusable patterns for subsequent designs.

> **Process:** Use `/frontend-design` skill for all pages and components. Adhere to Outfit (headings) + Plus Jakarta Sans (body) typography. Document any deviations in the content summary page.

#### Layout & Components
- [ ] Create `src/layouts/designs/ImpactFirstLayout.astro` — clean, professional layout with sticky header, generous whitespace
- [ ] Create `src/components/designs/impact-first/Header.astro` — minimal nav with EW logo, transparent-to-solid on scroll
- [ ] Create `src/components/designs/impact-first/Footer.astro` — structured footer with nav columns, contact, social links
- [ ] Create `src/components/designs/impact-first/AnimatedCounter.tsx` — React component for counting up statistics on scroll (Intersection Observer)
- [ ] Create `src/components/designs/impact-first/StatComparison.astro` — side-by-side EW vs national average stat display
- [ ] Create `src/components/designs/impact-first/ProgramPathway.astro` — step-by-step visual program journey with numbered stages
- [ ] Create `src/components/designs/impact-first/MetricCard.astro` — individual metric with large number, label, and context
- [ ] Create `src/components/designs/impact-first/PartnerGrid.astro` — logo grid for partner organizations
- [ ] Create `src/components/designs/impact-first/ImpactHero.astro` — hero section with animated statistics as centerpiece
- [ ] Create `src/components/designs/impact-first/DonationImpact.astro` — visual breakdown of how donations translate to outcomes

#### Pages
- [ ] **Home** (`designs/impact-first/index.astro`):
  - Hero with animated impact counters (0% recidivism, 73% employed, 261 graduates)
  - "By the Numbers" comparison section (EW alumni vs national averages)
  - Programs overview as pathways with step indicators
  - Featured testimonial with metric context
  - Partner logo grid
  - Donation impact breakdown CTA
- [ ] **About** (`designs/impact-first/about.astro`):
  - Organization origin story with Army Armstead's journey
  - Mission/vision with supporting data points
  - Staff composition stats (100% alumni, 80% system-impacted, 80% BIPOC, 40% female-identifying)
  - Timeline of organizational milestones
  - Values/approach pillars with icons
- [ ] **Programs Overview** (`designs/impact-first/programs/index.astro`):
  - Programs presented as pathways with clear outcomes data
  - Each program card shows: duration, format, eligibility, and measurable outcomes
  - Visual distinction between direct programs and partner programs
- [ ] **Programs/TECK** (`designs/impact-first/programs/teck.astro`):
  - Detailed curriculum breakdown with skill areas
  - Outcomes data specific to TECK graduates
  - Testimonials from TECK participants
  - Enrollment CTA with clear next steps
- [ ] **Programs/T.RAP** (`designs/impact-first/programs/trap.astro`):
  - Program structure with milestone-based progression
  - Music production + digital literacy dual focus
  - Youth-specific impact metrics
  - Stipend information and enrollment details
- [ ] **Team** (`designs/impact-first/team.astro`):
  - Staff grid with photos, names, titles, brief bios
  - Board of Directors section
  - Advisory Board section
  - Staff composition infographic
- [ ] **Get Involved** (`designs/impact-first/get-involved.astro`):
  - Four pathways: Donate, Mentor, Partner, Volunteer
  - Each pathway shows impact metrics ("Your $100 provides...")
  - Donation form (reuse existing DonationForm.tsx or build design-specific variant)
  - Contact information and social links
- [ ] **Content Summary** (`designs/impact-first/summary.astro`):
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
- [ ] All 7 pages + summary page render without errors
- [ ] Animated counters trigger correctly on scroll
- [ ] Navigation between all Impact First pages works
- [ ] Responsive layout works on mobile/tablet/desktop
- [ ] No styles leak to other designs or main site
- [ ] `npm run build` succeeds

---

### Phase 3: Design 2 — "Stories" (Editorial / Magazine Layout)

**Estimated Time:** 28 hours

> **Process:** Use `/frontend-design` skill for all pages and components. Adhere to Outfit (headings) + Plus Jakarta Sans (body) typography. This design's editorial nature may warrant serif accents — if so, document deviations in the content summary page.

#### Layout & Components
- [ ] Create `src/layouts/designs/StoriesLayout.astro` — editorial layout with cinematic view transitions, asymmetric grid system
- [ ] Create `src/components/designs/stories/Header.astro` — elegant nav with serif-accent touches, scroll-responsive
- [ ] Create `src/components/designs/stories/Footer.astro` — editorial footer with featured story link, newsletter CTA
- [ ] Create `src/components/designs/stories/StoryCard.astro` — full-bleed or half-bleed story card with overlaid text
- [ ] Create `src/components/designs/stories/PullQuote.astro` — large pull quote with decorative typography
- [ ] Create `src/components/designs/stories/AsymmetricGrid.astro` — configurable asymmetric image + text grid
- [ ] Create `src/components/designs/stories/ParallaxImage.tsx` — React component for parallax scroll effect on images
- [ ] Create `src/components/designs/stories/StoryHero.astro` — full-bleed hero with text overlay and gradient
- [ ] Create `src/components/designs/stories/ChapterMarker.astro` — section divider styled as editorial chapter markers
- [ ] Create `src/components/designs/stories/ScrollReveal.tsx` — React component for staggered text/element reveals on scroll

#### Pages
- [ ] **Home** (`designs/stories/index.astro`):
  - Full-bleed hero with community photo and mission statement overlay
  - Featured alumni story teaser with large editorial photo and pull quote
  - "Transformation" narrative section — before/during/after framing
  - Program teasers woven into story context (not just cards)
  - Community voices section with asymmetric testimonial grid
  - "Write the Next Chapter" CTA with full-bleed image
- [ ] **About** (`designs/stories/about.astro`):
  - Army Armstead's origin story told as a narrative feature
  - Organization history as a timeline narrative (not just dates)
  - "The People Behind the Mission" — staff profiles as mini-stories
  - Photo-heavy with editorial captions
- [ ] **Programs Overview** (`designs/stories/programs/index.astro`):
  - Each program introduced through a participant's story
  - Programs feel like magazine sections, not product cards
  - Cross-links to individual program pages for details
- [ ] **Programs/TECK** (`designs/stories/programs/teck.astro`):
  - "A Day in TECK" narrative structure
  - Participant journey from enrollment to graduation
  - Skills learned presented as story beats, not bullet lists
  - Testimonials integrated into the narrative flow
- [ ] **Programs/T.RAP** (`designs/stories/programs/trap.astro`):
  - Music-forward storytelling — a participant's creative journey
  - Studio imagery with editorial layout
  - Milestone progression told as personal growth narrative
- [ ] **Team** (`designs/stories/team.astro`):
  - Staff presented as short profile features (photo + narrative bio)
  - Board members with brief context on why they serve
  - "From Graduate to Leader" — Army's journey highlighted
- [ ] **Get Involved** (`designs/stories/get-involved.astro`):
  - "The Next Story Starts With You" framing
  - Mentor testimonials about their experience
  - Donation framed as "helping write someone's story"
  - Contact as invitation to connect
- [ ] **Content Summary** (`designs/stories/summary.astro`):
  - Same structure as Design 1 (content audit table, stock image sources)
  - Typography deviation log (this design may use serif accents — document any non-standard font usage)

#### Design-Specific Details
- Astro view transitions between pages (cinematic 700-900ms transitions)
- Scroll-triggered staggered text reveals (fade-up with delay cascade)
- Parallax effect on hero and feature images
- Asymmetric grid: 60/40 and 70/30 splits for editorial feel
- Typography: Outfit pushed larger for headlines, generous line-height for readability
- Color: Muted, warm — heavy use of cream and white with green as accent, gold sparingly
- Photography is the dominant visual element

#### Test Verification
- [ ] All 7 pages + summary render without errors
- [ ] View transitions work smoothly between pages
- [ ] Parallax and scroll reveals perform well (no jank)
- [ ] Editorial layouts maintain readability on all screen sizes
- [ ] `npm run build` succeeds

---

### Phase 4: Design 3 — "Community Mosaic" (Card-Based & Modular)

**Estimated Time:** 28 hours

> **Process:** Use `/frontend-design` skill for all pages and components. Adhere to Outfit (headings) + Plus Jakarta Sans (body) typography. Document any deviations in the content summary page.

#### Layout & Components
- [ ] Create `src/layouts/designs/CommunityMosaicLayout.astro` — grid-forward layout with bento/masonry system
- [ ] Create `src/components/designs/community-mosaic/Header.astro` — compact nav with grid-inspired styling
- [ ] Create `src/components/designs/community-mosaic/Footer.astro` — card-style footer with mosaic grid
- [ ] Create `src/components/designs/community-mosaic/MasonryGrid.tsx` — React masonry/bento layout component with responsive columns
- [ ] Create `src/components/designs/community-mosaic/PhotoCard.astro` — image card with hover overlay
- [ ] Create `src/components/designs/community-mosaic/StatCard.astro` — metric card with large number and accent color
- [ ] Create `src/components/designs/community-mosaic/TestimonialCard.astro` — quote card with portrait
- [ ] Create `src/components/designs/community-mosaic/ProgramCard.astro` — program summary card with icon and CTA
- [ ] Create `src/components/designs/community-mosaic/EventCard.astro` — upcoming event card with date badge
- [ ] Create `src/components/designs/community-mosaic/CTACard.astro` — call-to-action card (donate, mentor, etc.)
- [ ] Create `src/components/designs/community-mosaic/CardReveal.tsx` — React component for staggered card entrance animations

#### Pages
- [ ] **Home** (`designs/community-mosaic/index.astro`):
  - Hero with mission statement and preview mosaic of card types
  - Main bento/masonry grid mixing photo cards, stat cards, testimonial cards, program cards, event cards
  - Grid is curated but feels organic — varied card sizes (1x1, 2x1, 1x2)
  - CTA cards interspersed throughout ("Become a Mentor", "Donate", etc.)
  - Footer mosaic with social and contact cards
- [ ] **About** (`designs/community-mosaic/about.astro`):
  - Mission and values as a card grid
  - History presented as timeline cards
  - Team preview cards linking to full team page
  - Organization stats as highlight cards
- [ ] **Programs Overview** (`designs/community-mosaic/programs/index.astro`):
  - Programs as large feature cards with imagery
  - Participant testimonial cards alongside each program
  - Enrollment info cards with CTAs
- [ ] **Programs/TECK** (`designs/community-mosaic/programs/teck.astro`):
  - Curriculum modules as cards in a grid
  - Outcomes data as stat cards
  - Testimonial cards from TECK participants
  - Schedule and logistics in info cards
- [ ] **Programs/T.RAP** (`designs/community-mosaic/programs/trap.astro`):
  - Similar card-based layout customized for T.RAP
  - Music/creative focus reflected in card imagery
  - Milestone cards showing progression
- [ ] **Team** (`designs/community-mosaic/team.astro`):
  - Team as a mosaic of portrait cards with flip/hover to show bio
  - Board and advisory as smaller cards
  - "Join the Team" CTA card
- [ ] **Get Involved** (`designs/community-mosaic/get-involved.astro`):
  - Four pathway cards: Donate, Mentor, Partner, Volunteer
  - Impact cards showing what contributions achieve
  - Testimonial cards from mentors/partners
  - "Add Your Card to the Mosaic" CTA
- [ ] **Content Summary** (`designs/community-mosaic/summary.astro`):
  - Same structure as Design 1 (content audit table, stock image sources, typography deviation log)

#### Design-Specific Details
- Masonry/bento grid with responsive columns (4 cols desktop, 2 tablet, 1 mobile)
- Cards have consistent border-radius, subtle shadows, hover elevation (translateY + shadow increase)
- Staggered entrance animations — cards fade/scale in with cascading delays
- Card types use color coding: green for programs, gold for stats, cream for testimonials, white for photos
- Hover states reveal additional info or subtle zoom on photos
- Dense but organized — visual rhythm through card size variation

#### Test Verification
- [ ] Masonry grid renders correctly at all breakpoints
- [ ] Card hover interactions are smooth
- [ ] Staggered animations don't cause layout shift
- [ ] All 7 pages + summary render without errors
- [ ] `npm run build` succeeds

---

### Phase 5: Design 4 — "Bold Movement" (Activist & Typography-Driven)

**Estimated Time:** 25 hours

> **Process:** Use `/frontend-design` skill for all pages and components. Adhere to Outfit (headings) + Plus Jakarta Sans (body) typography. This typography-driven design may push fonts to extreme sizes or weights — document any deviations in the content summary page.

#### Layout & Components
- [ ] Create `src/layouts/designs/BoldMovementLayout.astro` — high-contrast layout with full-width color blocks
- [ ] Create `src/components/designs/bold-movement/Header.astro` — bold nav with oversized logo treatment
- [ ] Create `src/components/designs/bold-movement/Footer.astro` — typographic footer with repeated CTA
- [ ] Create `src/components/designs/bold-movement/TypeHero.astro` — massive typography hero (headline as art)
- [ ] Create `src/components/designs/bold-movement/ColorBlock.astro` — full-width section with configurable background color
- [ ] Create `src/components/designs/bold-movement/HorizontalScroll.tsx` — React horizontal scroll carousel for programs
- [ ] Create `src/components/designs/bold-movement/BigStat.astro` — full-width typographic stat (number fills the viewport width)
- [ ] Create `src/components/designs/bold-movement/ManifestoBlock.astro` — large-text manifesto/mission statement section
- [ ] Create `src/components/designs/bold-movement/BoldCTA.astro` — oversized CTA with movement-style urgency

#### Pages
- [ ] **Home** (`designs/bold-movement/index.astro`):
  - Massive typographic hero — "0% Recidivism" or mission statement filling viewport
  - Alternating full-width color blocks (green → cream → gold → green)
  - Programs in horizontal scroll carousel with bold titles and minimal descriptions
  - Key statistics as full-width typographic moments (each stat gets its own viewport-height section)
  - "Join the Movement" CTA repeated with increasing urgency
- [ ] **About** (`designs/bold-movement/about.astro`):
  - Manifesto-style mission statement in large type
  - History as bold declarative statements ("In 2020, we started with one belief...")
  - Team presented minimally — names and titles in strong typography
  - Values as single powerful words with supporting text
- [ ] **Programs Overview** (`designs/bold-movement/programs/index.astro`):
  - Each program as a full-width color block with bold title
  - Minimal imagery — typography and color carry the design
  - Strong directional CTAs to individual program pages
- [ ] **Programs/TECK** (`designs/bold-movement/programs/teck.astro`):
  - Program details in bold, declarative sections
  - Curriculum as typographic list with strong visual hierarchy
  - Outcomes as full-width stat moments
  - Enrollment CTA with urgency
- [ ] **Programs/T.RAP** (`designs/bold-movement/programs/trap.astro`):
  - Creative program demands bold presentation
  - Music meets activism visual language
  - Youth empowerment messaging in oversized type
- [ ] **Team** (`designs/bold-movement/team.astro`):
  - Minimal portrait treatment — small circular photos, large names
  - Emphasis on titles and roles, not photos
  - Board as a simple typographic list with hover reveals
- [ ] **Get Involved** (`designs/bold-movement/get-involved.astro`):
  - "This is Your Moment" framing
  - Four bold CTAs: Donate, Mentor, Partner, Volunteer
  - Each action framed as taking a stand
  - Donation as "funding the movement"
- [ ] **Content Summary** (`designs/bold-movement/summary.astro`):
  - Same structure as Design 1 (content audit table, stock image sources, typography deviation log)

#### Design-Specific Details
- Typography is the star — headlines 6-12rem, viewport-width sizing with clamp()
- Full-width alternating color blocks create strong visual rhythm
- Horizontal scroll uses CSS scroll-snap with momentum
- Minimal photography — text and color do the heavy lifting
- Animations: Bold section transitions, text weight/size animations on scroll
- High contrast: dark green text on cream, white text on green, dark text on gold
- Movement/activist energy without being aggressive — empowering, not confrontational

#### Test Verification
- [ ] Horizontal scroll works on touch and mouse/trackpad
- [ ] Typography scales correctly across all breakpoints
- [ ] Color blocks maintain proper contrast ratios (WCAG AA)
- [ ] All 7 pages + summary render without errors
- [ ] `npm run build` succeeds

---

### Phase 6: Design 5 — "Mentorship" (Warm, Personal & Relationship-Focused)

**Estimated Time:** 26 hours

> **Process:** Use `/frontend-design` skill for all pages and components. Adhere to Outfit (headings) + Plus Jakarta Sans (body) typography. Document any deviations in the content summary page.

#### Layout & Components
- [ ] Create `src/layouts/designs/MentorshipLayout.astro` — warm, inviting layout with split-screen capability and view transitions
- [ ] Create `src/components/designs/mentorship/Header.astro` — welcoming nav with warm styling
- [ ] Create `src/components/designs/mentorship/Footer.astro` — personal footer with "letter" sign-off feel
- [ ] Create `src/components/designs/mentorship/SplitScreen.astro` — configurable 50/50 split layout (mentor side / mentee side)
- [ ] Create `src/components/designs/mentorship/ProfileCircle.astro` — circular portrait with gold accent ring
- [ ] Create `src/components/designs/mentorship/PairTestimonial.astro` — side-by-side mentor and mentee quotes
- [ ] Create `src/components/designs/mentorship/JourneySteps.astro` — mentorship journey visualization (matching → learning → growing → graduating)
- [ ] Create `src/components/designs/mentorship/MentorCard.astro` — mentor profile card with photo, name, company, specialty
- [ ] Create `src/components/designs/mentorship/DualCTA.astro` — split CTA ("Become a Mentor" | "Become a Mentee")
- [ ] Create `src/components/designs/mentorship/WarmSection.astro` — section with rounded corners, soft shadows, inviting feel

#### Pages
- [ ] **Home** (`designs/mentorship/index.astro`):
  - Hero with paired mentor/mentee portrait and joint quote
  - "How It Works" journey visualization (matching → learning → growing → graduating)
  - Featured mentor/mentee pair story
  - Impact stats framed through relationships ("261 mentorship pairs formed")
  - Community warmth section with group photos
  - Dual CTA: "Become a Mentor" | "Become a Mentee"
- [ ] **About** (`designs/mentorship/about.astro`):
  - Army's story told through the mentorship lens — being mentored, then becoming a leader
  - Mission framed as "connection changes lives"
  - Organization values through relationship language
  - Staff bios emphasizing their mentorship roles
- [ ] **Programs Overview** (`designs/mentorship/programs/index.astro`):
  - Programs presented as mentorship experiences
  - Each program shows the mentor-mentee dynamic
  - Testimonial pairs for each program
- [ ] **Programs/TECK** (`designs/mentorship/programs/teck.astro`):
  - TECK through the lens of the mentor-mentee relationship
  - "What mentors teach" and "what mentees gain" split-screen sections
  - Skills presented as shared learning outcomes
- [ ] **Programs/T.RAP** (`designs/mentorship/programs/trap.astro`):
  - T.RAP as creative mentorship
  - Youth-mentor dynamic with music as the bridge
  - Milestone progression as mentorship growth markers
- [ ] **Team** (`designs/mentorship/team.astro`):
  - Staff as "the team that makes connections happen"
  - Circular portrait grid with gold accent rings
  - Board and advisory members as supporters of the mentorship mission
- [ ] **Get Involved** (`designs/mentorship/get-involved.astro`):
  - Split-screen design: left side for mentors, right for mentees
  - Mentor pathway: apply, match, mentor, impact
  - Mentee pathway: apply, match, learn, grow
  - Donate framed as "support a mentorship pair"
  - Partner framed as "bring mentorship to your community"
- [ ] **Content Summary** (`designs/mentorship/summary.astro`):
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
- [ ] Split-screen layouts render correctly on all breakpoints (stack on mobile)
- [ ] View transitions work smoothly between pages
- [ ] Circular portraits render consistently
- [ ] Dual CTAs are clear and accessible
- [ ] All 7 pages + summary render without errors
- [ ] `npm run build` succeeds

---

### Phase 7: Design 6 — "The Journey" (Scroll-Driven Interactive Documentary)

**Estimated Time:** 35 hours

This is the most technically ambitious design. The home page alone is a scroll-driven experience with chapter-based layout morphing.

> **Process:** Use `/frontend-design` skill for all pages and components. Adhere to Outfit (headings) + Plus Jakarta Sans (body) typography. Document any deviations in the content summary page.

#### Layout & Components
- [ ] Create `src/layouts/designs/TheJourneyLayout.astro` — immersive layout with minimal chrome (no persistent header during scroll chapters)
- [ ] Create `src/components/designs/the-journey/FloatingNav.tsx` — React floating navigation that appears contextually (chapter indicators, subtle progress bar)
- [ ] Create `src/components/designs/the-journey/Footer.astro` — documentary-style credits footer
- [ ] Create `src/components/designs/the-journey/ScrollChapter.tsx` — React component for a scroll-driven chapter with:
  - Background color transitions based on scroll position
  - Pinned elements that transform as you scroll
  - Progress tracking within each chapter
- [ ] Create `src/components/designs/the-journey/ChapterTitle.astro` — full-viewport chapter title with dramatic entrance
- [ ] Create `src/components/designs/the-journey/ScrollStat.tsx` — React component: stat animates/reveals as you scroll past
- [ ] Create `src/components/designs/the-journey/ParallaxLayer.tsx` — multi-depth parallax effect
- [ ] Create `src/components/designs/the-journey/ProgressBar.tsx` — subtle scroll progress indicator (thin bar at top or side dots)
- [ ] Create `src/components/designs/the-journey/TextReveal.tsx` — text that reveals word-by-word or line-by-line on scroll
- [ ] Create `src/components/designs/the-journey/ColorTransition.tsx` — smooth background color morph between chapters

#### Pages
- [ ] **Home** (`designs/the-journey/index.astro`) — THE signature page, a scroll-driven documentary:
  - **Chapter 1 — "Before"**: Dark, muted palette (dark green, charcoal). Mass incarceration statistics presented starkly. The problem. Text reveals as you scroll. Feels heavy and urgent.
  - **Chapter 2 — "The Door Opens"**: Color warms from dark to cream. Introduction to EW's founding. Army's story begins. Photography starts to appear. Hope enters.
  - **Chapter 3 — "Learning"**: Full cream/gold warmth. TECK and T.RAP programs visualized. Mentorship pairing animation. Skills and growth. Bright, warm, active.
  - **Chapter 4 — "Growing"**: Split layouts showing development. Projects built, confidence growing. Testimonials scroll in as quotes. Momentum builds.
  - **Chapter 5 — "Emerging"**: The payoff. Impact stats animate triumphantly. Alumni successes. Full brand green dominance. Pride and accomplishment.
  - **Chapter 6 — "Your Chapter"**: CTA section. "This story isn't finished." Three paths: Mentor, Join, Support. Personal invitation.
- [ ] **About** (`designs/the-journey/about.astro`):
  - More traditional layout (the home page is the experiential piece)
  - Organization story as a condensed timeline journey
  - Mission, values, team overview
  - Links back to home page experience for the full story
- [ ] **Programs Overview** (`designs/the-journey/programs/index.astro`):
  - Programs presented as journeys/pathways
  - Each program card uses the journey metaphor (start → milestones → destination)
  - Visual consistency with the scroll experience color palette
- [ ] **Programs/TECK** (`designs/the-journey/programs/teck.astro`):
  - TECK journey from enrollment to graduation
  - Curriculum presented as waypoints
  - Outcomes as destination reached
- [ ] **Programs/T.RAP** (`designs/the-journey/programs/trap.astro`):
  - T.RAP creative journey
  - Music production milestones as chapter markers
  - Youth empowerment as transformation arc
- [ ] **Team** (`designs/the-journey/team.astro`):
  - "The Guides" — team presented as guides on the journey
  - Warm photography with journey-themed bios
- [ ] **Get Involved** (`designs/the-journey/get-involved.astro`):
  - "Start Your Chapter" framing
  - Each involvement pathway as a journey beginning
  - Documentary-style testimonials from mentors/donors about their own journey with EW
- [ ] **Content Summary** (`designs/the-journey/summary.astro`):
  - Same structure as Design 1 (content audit table, stock image sources, typography deviation log)

#### Design-Specific Details
- **Scroll-driven animations**: Use CSS `animation-timeline: scroll()` where supported, with JS fallback via Intersection Observer and scroll event listeners
- **Background color transitions**: Smooth interpolation between chapter colors as scroll progresses (dark green → charcoal → cream → gold → green)
- **Chapter pinning**: Key elements pin in place while surrounding content scrolls past
- **Text reveals**: Words or lines animate in opacity/position as scroll progress advances
- **Performance critical**: Use `will-change`, GPU-composited properties (transform, opacity), `requestAnimationFrame` for scroll handlers
- **Reduced motion**: Full `prefers-reduced-motion` support — chapters still visible but no scroll animations, just static sections
- **Mobile**: Simplified scroll experience (fewer pinned elements, simpler transitions) but same chapter narrative

#### Test Verification
- [ ] Scroll-driven home page performs smoothly (60fps target, test with DevTools)
- [ ] Chapter transitions are seamless — no jarring color jumps
- [ ] `prefers-reduced-motion` fallback works correctly
- [ ] Mobile scroll experience is smooth (no jank from complex animations)
- [ ] Sub-pages maintain visual consistency with the journey theme
- [ ] All 7 pages + summary render without errors
- [ ] `npm run build` succeeds

---

### Phase 8: Design Gallery Index & Final Polish

**Estimated Time:** 12 hours

#### Tasks
- [ ] Complete `/designs` index page (`src/pages/designs/index.astro`):
  - Page title and introduction explaining the 6 design concepts
  - For each design: name, 2-3 sentence description, design philosophy/tone
  - Visual preview for each design (screenshot or representative thumbnail)
  - "View Design" link to the design's home page (opens in new tab via `target="_blank"`)
  - "Content Summary" link to the design's summary page
  - Responsive grid layout (2 columns on desktop, 1 on mobile)
- [ ] Generate preview images for each design:
  - Capture representative screenshots of each design's home page
  - Save to `public/images/designs/previews/`
  - Optimize image sizes for the gallery page
- [ ] Cross-design consistency check:
  - [ ] Verify all 6 designs use the correct brand colors
  - [ ] Verify all 6 designs use Outfit + Plus Jakarta Sans (or have deviations documented in their content summary)
  - [ ] Verify no CSS/component leakage between designs
  - [ ] Verify navigation within each design works (all internal links resolve)
  - [ ] Verify gallery "View Design" links open in new tabs
- [ ] Responsive testing across all designs:
  - [ ] Mobile (375px) — all pages readable and functional
  - [ ] Tablet (768px) — layouts adapt appropriately
  - [ ] Desktop (1280px+) — full design expression
- [ ] Accessibility check:
  - [ ] All pages have proper heading hierarchy
  - [ ] All images have alt text
  - [ ] Interactive elements are keyboard accessible
  - [ ] Color contrast meets WCAG AA
- [ ] Performance check:
  - [ ] All pages load in reasonable time
  - [ ] Images are optimized (Astro's Picture component where possible)
  - [ ] No unnecessary JavaScript shipped on static pages
- [ ] Final `npm run build` — clean build with no errors or warnings

#### Test Verification
- [ ] Full site build succeeds
- [ ] All 48+ pages render (6 designs × 7 pages + 6 summaries + 1 index = 49 minimum)
- [ ] Gallery index page displays all 6 designs with working links
- [ ] Content summary pages accurately document fabricated content for each design
- [ ] Existing main site (/) is completely unaffected

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
- [ ] Stock photography from Unsplash/Pexels (to be sourced in Phase 1)
- [ ] No new npm dependencies expected — existing stack (Astro, React, Tailwind) should cover all needs

## Success Metrics

(To be filled in after implementation)

- [ ] All 6 designs complete with 7+ pages each
- [ ] Gallery index page functional with previews and summaries
- [ ] Clean build with no errors
- [ ] All designs responsive across mobile/tablet/desktop
- [ ] Content summary pages complete for each design
- [ ] Total page count: 49+ (7 per design × 6 + 6 summaries + 1 index)

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
- Phase 6: [Estimated: 26 hours] (Actual: TBD)
- Phase 7: [Estimated: 35 hours] (Actual: TBD)
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
