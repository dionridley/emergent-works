# Emergent Works Astro Website Rebuild

**Created:** 2026-02-16
**Status:** Draft
**Related PRD:** N/A
**Refinements:** None
**Design Files:** `_claude/resources/redesign/designs/` (`.pen` files for each page)

## Executive Summary

Rebuild the Emergent Works website (emergentworks.org) from its current Wix-hosted site into a modern Astro 5 static site with Tailwind CSS v4, React 19 (islands architecture for interactive components only), and full responsive design. The rebuild uses comprehensive page documentation, screenshots, and brand guidelines already captured in `_claude/resources/redesign/` to faithfully reproduce all 7 pages while making targeted improvements: true mobile responsiveness, semantic HTML/accessibility, image optimization, SEO meta tags, and fixing known content issues (Wix placeholder text, broken links, missing alt text).

## Current State

- **Scaffolded Astro 5 project** with React 19, Tailwind CSS v4 (Vite plugin), MDX, sitemap, astro-compress, astro-seo, and @fontsource/inter already installed
- **Only a placeholder `index.astro`** exists -- no real content, layouts, or components
- **`global.css`** contains only `@import "tailwindcss"` -- no theme tokens or custom styles
- **No layouts, components, or pages** beyond the placeholder
- **54 images downloaded** to `_claude/resources/redesign/images/` with Wix CDN filenames
- **Complete documentation** of all 7 pages, branding, image catalog, and visual verification notes in `_claude/resources/redesign/`
- **17 Playwright screenshots** in `_claude/resources/redesign/screenshots/` for visual reference

## Assumptions Made

These assumptions were made during plan creation. Challenge any that seem incorrect.

- [x] Astro 5 SSG (static site generation) is the correct output mode -- no SSR needed
- [x] React 19 is only needed for interactive components (navigation toggle, donation form)
- [x] Tailwind CSS v4 uses CSS-first configuration via `@theme` directives in `global.css` -- no `tailwind.config` file
- [x] Inter font (@fontsource/inter) serves as the body font until Garet (brand font) is sourced
- [x] All page content is documented in `_claude/resources/redesign/` and is sufficient for implementation
- [x] Images in `_claude/resources/redesign/images/` will be renamed and moved to `public/images/`
- [ ] Garet font (brand guidelines font) is not available as a web font and Inter will be used as a substitute [?]
- [ ] Team headshots need to be re-downloaded from the live Wix site since the original downloaded images were placeholders (now updated on live site) [?]
- [ ] The donation page will use a simple form UI without actual payment processing integration for now [?]
- [ ] Social media URLs (Instagram, Facebook, LinkedIn, YouTube) for Emergent Works are not yet confirmed beyond Instagram and LinkedIn [?]
- [ ] The "Grow Your Vision" placeholder section on the Impact page should be replaced with a real CTA (e.g., "Support Our Impact" with a donate link) [?]

> Items marked `[?]` are uncertain - please confirm or correct these before implementation.
>
> To resolve: `/dr-plan @_claude/plans/draft/001-emergent-works-astro-website-rebuild.md answer questions`

## Open Questions & Decisions

### Blocking (must resolve before implementation)

- [ ] **Donation Integration** [AWAITING]
  What should the Donate page do when someone clicks "Donate"? The Wix site used a built-in Wix payment widget. Options for the Astro rebuild:
  - Option A: Static form UI only (no payment processing) -- shows amount/frequency selection but the "Donate" button links to an external payment page (e.g., existing PayPal/Stripe link)
  - Option B: Integrate Stripe Checkout -- embed Stripe's hosted checkout flow (requires Stripe account setup)
  - Option C: Embed a third-party donation widget (e.g., Donorbox, GoFundMe widget)

- [ ] **Team Headshot Images** [AWAITING]
  The original downloaded team photos are all placeholders (4 images shared across 13 members). The live Wix site now has unique headshots for all 13 members. How should we handle this?
  - Option A: Re-download the 13 unique headshots from the live Wix site using Playwright
  - Option B: Use placeholder images for now and replace later when high-res originals are provided
  - Option C: Client provides high-resolution headshot files directly

### Non-Blocking (can resolve during implementation)

- [ ] **Garet Font Availability** [OPEN]
  The brand guidelines specify Garet font but it may not be freely available as a web font. Inter is installed as fallback. Need to determine if Garet can be licensed/self-hosted or if Inter/another geometric sans-serif should be used permanently.

- [ ] **Social Media URLs** [OPEN]
  Current Wix site links to Wix's own social accounts. Known EW accounts: Instagram (@emergentworks_), LinkedIn (/company/emergentworks), Medium (@emergentworks). Facebook, YouTube, and GitHub URLs need confirmation.

- [ ] **Programs Page Application Links** [OPEN]
  All "Apply" and "Book" buttons on the Programs page currently link to placeholder URLs. Need actual Google Form links or application portal URLs for each program.

- [ ] **Partner Inquiry Form** [OPEN]
  The Partner With Us page has no inquiry form -- "Connect With Us" links to About Us. Should a contact/inquiry form be added?

- [ ] **Blog/News Section** [OPEN]
  EW has a Medium account. Should a blog section be added to the site, or continue linking to Medium externally?

## Success Criteria

- [ ] All 7 pages implemented and visually matching the documented Wix site layouts (with improvements)
- [ ] Fully responsive design working at mobile (320px), tablet (768px), and desktop (1280px+) breakpoints
- [ ] All pages pass WCAG 2.1 AA accessibility checks (proper heading hierarchy, alt text, color contrast, keyboard navigation)
- [ ] Lighthouse performance score >= 90 on all pages
- [ ] All SEO meta tags and Open Graph data configured per page
- [ ] Sitemap generated at `/sitemap-index.xml`
- [ ] `npm run build` succeeds with zero errors
- [ ] All images optimized (WebP format, responsive sizes via Astro Image)
- [ ] Navigation works correctly on mobile (hamburger menu) and desktop
- [ ] No Wix placeholder text remains (Impact page "Grow Your Vision" section replaced)

## Implementation Plan

---

> **CRITICAL REQUIREMENT: `/frontend-design` Skill Usage**
>
> Every page implementation phase (Phases 3-9) **MUST** begin by using the `/frontend-design` skill (Pencil MCP) to design the page layout in a `.pen` file **BEFORE** writing any Astro/HTML/CSS code. This ensures:
> 1. Visual design is reviewed and approved before coding begins
> 2. Layout decisions are made visually, not abstractly
> 3. The resulting code accurately matches the intended design
>
> **Design files location:** `_claude/resources/redesign/designs/`
> **Naming convention:** `homepage.pen`, `about-us.pen`, `programs.pen`, `impact.pen`, `our-team.pen`, `partner-with-us.pen`, `donate.pen`
>
> The `/frontend-design` step is **mandatory and non-negotiable** for each page phase. Do not skip it.
>
> **IMPORTANT -- VSCode Instance Requirement:**
> The Pencil MCP extension binds to the most recently active VSCode instance, not necessarily the one running this project. Before starting any `/frontend-design` step, you **MUST**:
> 1. Ask the user to close all other VSCode instances (or ensure only the `emergent-works` project instance is active)
> 2. **Wait for the user to explicitly acknowledge** they are ready before invoking any Pencil MCP tools
> 3. Only then proceed with the `.pen` file design work
>
> Do NOT call any Pencil MCP tools until the user confirms.

---

### Phase 1: Foundation -- Design Tokens, Global Styles, Base Layout

**Estimated Time:** 3 hours

#### Tasks
- [ ] Configure Tailwind CSS v4 theme in `src/styles/global.css` with `@theme` directive:
  - Brand colors: `--color-primary: #20493C`, `--color-accent: #FFCB70`, `--color-background: #FFF8ED`, `--color-text: #242424`, `--color-white: #FFFFFF`, `--color-cream: #FFFAF0`
  - Extended palette: `--color-dark-green: #052812`, `--color-medium-green: #24582A`, `--color-muted-green: #445E4D`, `--color-sage: #B1D3BB`, `--color-peach: #F9C5B4`
  - Typography scale: heading sizes (72px, 55px, 44px, 37px), body sizes (25px, 19px, 17px, 15px)
  - Spacing tokens for consistent section padding and gaps
- [ ] Import and configure Inter font via `@fontsource/inter` in global.css
- [ ] Create base layout `src/layouts/BaseLayout.astro` with:
  - HTML boilerplate (lang="en", charset, viewport)
  - SEO component slot (using `astro-seo`)
  - Global CSS import
  - Font loading
  - Slot for header, main content, and footer
- [ ] Rename and move images from `_claude/resources/redesign/images/` to `public/images/` with descriptive filenames (e.g., `hero-community.jpg`, `testimonial-dontay.png`, `footer-logo.png`)
- [ ] Create an image filename mapping reference in `_claude/docs/image-mapping.md`

#### Test Verification
- [ ] `npm run dev` starts successfully with theme tokens applied
- [ ] `npm run build` succeeds with no errors
- [ ] Tailwind utility classes using custom colors work (e.g., `bg-primary`, `text-accent`)

---

### Phase 2: Shared Components -- Navigation, Footer, Reusable UI

**Estimated Time:** 5 hours

#### Tasks

**Navigation Component:**
- [ ] Create `src/components/Header.astro` -- desktop navigation layout:
  - Logo/wordmark ("Emergent Works") linking to homepage
  - 7 navigation links (Home, About Us, Programs, Impact, Our Team, Partner With Us, Donate)
  - Sticky positioning, cream background (`#FFFAF0`)
  - Active page highlighting via `Astro.url.pathname`
- [ ] Create `src/components/MobileNav.tsx` (React component -- **requires React for client-side toggle**):
  - Hamburger menu icon button
  - Slide-out or overlay menu panel with all 7 nav links
  - Open/close state management with `useState`
  - Keyboard accessible (Escape to close, focus trap)
  - Uses `client:load` directive in Astro

**Footer Component:**
- [ ] Create `src/components/Footer.astro`:
  - Two-column layout (links + contact on left, logo on right)
  - Social media icons (SVG icons for Instagram, Facebook, LinkedIn, YouTube)
  - Footer navigation links (Home, About Us, Programs, Impact, Donate)
  - Contact info (email, address)
  - Copyright notice
  - EW seal/logo image

**Reusable UI Components:**
- [ ] `src/components/Section.astro` -- section container with `variant` prop ("cream" | "green" | "white") for alternating backgrounds
- [ ] `src/components/Button.astro` -- CTA button with variants:
  - `primary`: dark green background, white text, pill shape
  - `accent`: gold border/text on dark background (outlined)
  - `gold`: gold background, dark text (donate CTA)
  - Props: `href`, `variant`, `icon` (optional down-arrow)
- [ ] `src/components/HeroSection.astro` -- full-bleed hero with background image, overlay text, optional CTA
- [ ] `src/components/TwoColumnSection.astro` -- reusable two-column layout with `imagePosition` prop ("left" | "right")
- [ ] `src/components/TestimonialBlock.astro` -- circular portrait photo + quote + attribution on dark green background
- [ ] `src/components/StatCard.astro` -- large number + label for impact statistics
- [ ] `src/components/TeamMemberCard.astro` -- photo + name + title card
- [ ] `src/components/ProgramCard.astro` -- two-column card with photo, heading, description, details (eligibility/duration), and CTA button

#### Test Verification
- [ ] All components render without errors in dev server
- [ ] Navigation correctly highlights active page
- [ ] Mobile navigation opens/closes correctly
- [ ] Components are responsive at mobile/tablet/desktop breakpoints

---

### Phase 3: Homepage (`/`)

**Estimated Time:** 5 hours

> **MANDATORY: Use `/frontend-design` skill first to design the homepage layout in a .pen file before writing any code.**

#### Tasks
- [ ] **`/frontend-design`**: Design full homepage layout in Pencil MCP `.pen` file, referencing `_claude/resources/redesign/01-homepage.md` and `_claude/resources/redesign/screenshots/homepage-*.png` for visual fidelity
- [ ] Create `src/pages/index.astro` with all sections:
  1. **Hero**: Full-bleed background photo with center-aligned heading "Rewriting Futures. One Skill At The Time." in white
  2. **Mission + Our Approach**: Mission statement text, decorative brand illustrations (laptop, phone), "Discover More" button, "Our Approach" heading with 2x2 program grid (Digital Literacy, SEL, Career Development, Community Engagement)
  3. **Full-width atmospheric photo**: Dark green bordered photo section
  4. **Community Voices**: Three-column testimonials (Dontay, Zeek, Sheisty) with circular portraits, microphone illustration
  5. **Nashid Featured Testimonial**: Two-column dark green section with gold-ringed portrait, extended quote, "Explore Our Impact" button (gold outlined)
  6. **Build With Us CTA**: Heading + subtext + three buttons (Donate, Volunteer, Partner) with polaroid-style photo collage (gold frames)
- [ ] Configure SEO meta tags: title "Emergent Works - Rewriting Futures", description, OG tags
- [ ] Ensure all images have descriptive alt text

#### Test Verification
- [ ] Page renders all 6 sections correctly
- [ ] Responsive layout works at all breakpoints
- [ ] All images load and display correctly
- [ ] All navigation links work

---

### Phase 4: About Us (`/about-us`)

**Estimated Time:** 4 hours

> **MANDATORY: Use `/frontend-design` skill first to design the About Us layout in a .pen file before writing any code.**

#### Tasks
- [ ] **`/frontend-design`**: Design About Us page layout in Pencil MCP `.pen` file, referencing `_claude/resources/redesign/02-about-us.md` and `_claude/resources/redesign/screenshots/aboutus-*.png`
- [ ] Create `src/pages/about-us.astro` with all sections:
  1. **Our Mission**: Two-column (photo left, text + "Learn More" button right) on cream background
  2. **What We Do**: Centered heading + body text + "Explore Programs" button, decorative tablet/book illustrations
  3. **Why We Do It**: **Asymmetric split layout** -- dark green left panel (heading + heart illustrations) / cream right panel (body text + "See Our Impact" button). This is the most distinctive layout element.
  4. **Our Story & Who We Are**: Two-column (text left with founder story + stats, portrait photo right), "Meet Our Team" button
  5. **Donate CTA**: Full-width dark green section with "Support Our Community To Rewrite The Future" + gold "Donate Today" button
- [ ] Wire buttons to correct destinations: "Explore Programs" -> /programs, "See Our Impact" -> /impact, "Meet Our Team" -> /our-team, "Donate Today" -> /donate
- [ ] Configure SEO meta tags for About Us page

#### Test Verification
- [ ] Asymmetric split layout renders correctly at all breakpoints
- [ ] All CTA buttons link to correct pages
- [ ] Images and decorative illustrations display properly

---

### Phase 5: Programs (`/programs`)

**Estimated Time:** 4 hours

> **MANDATORY: Use `/frontend-design` skill first to design the Programs layout in a .pen file before writing any code.**

#### Tasks
- [ ] **`/frontend-design`**: Design Programs page layout in Pencil MCP `.pen` file, referencing `_claude/resources/redesign/03-programs.md` and `_claude/resources/redesign/screenshots/programs-*.png`
- [ ] Create `src/pages/programs.astro` with all sections:
  1. **Hero**: Dark green background, two-column (heading + subtext left, photo right), decorative tablet illustration
  2. **How Our Programs Work**: Dark green section, two paragraphs describing philosophy, "Learn More" button with down-arrow, decorative magnifying glass illustration
  3. **T.RAP (Direct)**: Program card -- photo LEFT, text RIGHT (heading, description, eligibility, duration, "Apply" button)
  4. **Technical Mentorship**: Program card -- text LEFT, photo RIGHT (reversed layout)
  5. **Programs For Partners**: Dark green divider section with heading, description, "Learn More" button, decorative illustration
  6. **TECK (Partner)**: Program card -- photo LEFT, text RIGHT
  7. **T.RAP (Partner)**: Program card -- text LEFT, photo RIGHT
  8. **Testimonial/CTA**: Blueberry quote on dark green + "Explore Impact" button + laptop illustration
- [ ] Use `ProgramCard.astro` component for all 4 program cards with alternating `imagePosition`
- [ ] Configure SEO meta tags for Programs page

#### Test Verification
- [ ] All 4 program cards render with correct alternating layout
- [ ] Dark green divider sections correctly separate direct vs. partner programs
- [ ] Program metadata (eligibility, duration) displays in consistent format

---

### Phase 6: Impact (`/impact`)

**Estimated Time:** 4 hours

> **MANDATORY: Use `/frontend-design` skill first to design the Impact layout in a .pen file before writing any code.**

#### Tasks
- [ ] **`/frontend-design`**: Design Impact page layout in Pencil MCP `.pen` file, referencing `_claude/resources/redesign/04-impact.md` and `_claude/resources/redesign/screenshots/impact-full.png`
- [ ] Create `src/pages/impact.astro` with all sections:
  1. **Hero**: Two-column (text left, photo right) with "OUR IMPACT" heading + intro text + "Learn More" button
  2. **Key Statistics Row**: Three stats (261 graduates, 73% employed, $2+ above min wage) with decorative leaf SVGs
  3. **"How Our Programs Impact"**: Dark green header section
  4. **Digital Literacy Training**: Two-column (photo left, text right)
  5. **Lakresha Testimonial**: Full-width dark green ("Stepping Out Of My Comfort Zone")
  6. **Social-Emotional Learning**: Two-column (text left, photo right)
  7. **Julius Testimonial**: Full-width dark green ("Break Down Any Barriers")
  8. **IMPROVED: Replace "Grow Your Vision" Wix placeholder** with a real CTA section -- "Support Our Community" with a donate button and brief impact statement
  9. **Zeek Testimonial**: Full-width dark green ("The Skills To Move Forward")
  10. **Career Development**: Two-column (photo left, text right)
  11. **Community Engagement + Second Stats**: Two-column + stats row (98%+ never re-offended, 8 graduates contracted, Projects link)
- [ ] Create SVG leaf/plant decorative elements for statistics sections
- [ ] Configure SEO meta tags for Impact page

#### Test Verification
- [ ] Alternating program/testimonial pattern renders correctly
- [ ] Statistics display with proper decorative elements
- [ ] "Grow Your Vision" placeholder text is NOT present -- replaced with real content

---

### Phase 7: Our Team (`/our-team`)

**Estimated Time:** 3 hours

> **MANDATORY: Use `/frontend-design` skill first to design the Our Team layout in a .pen file before writing any code.**

#### Tasks
- [ ] **`/frontend-design`**: Design Our Team page layout in Pencil MCP `.pen` file, referencing `_claude/resources/redesign/05-our-team.md` and `_claude/resources/redesign/screenshots/ourteam-full.png`
- [ ] Create `src/pages/our-team.astro` with all sections:
  1. **Hero**: "Our Team" heading + description paragraph + decorative heart illustration
  2. **Staff Grid**: 5 team members in 3+2 grid layout using `TeamMemberCard.astro`
  3. **Our Boards**: Section heading + description paragraph about Board and Advisory Board
  4. **Board of Directors**: 5 members in 4+1 grid layout
  5. **Advisory Board**: 3 members in single row
- [ ] Populate all 13 team members with names, titles, and headshot images
- [ ] Configure SEO meta tags for Our Team page

#### Team Member Data
| # | Name | Title | Group |
|---|------|-------|-------|
| 1 | Army Armstead | Founder & Executive Director | Staff |
| 2 | Tine Reinert | Program Director | Staff |
| 3 | LaQuan DuBose | Program Manager | Staff |
| 4 | Nasiar Denobrega | Program Associate | Staff |
| 5 | Angie Agosta | Program Intern | Staff |
| 6 | Rosalind Zavros | Board Chair | Board |
| 7 | Dion Ridley | Board Member | Board |
| 8 | Ashley Chen | Board Member | Board |
| 9 | Jerone Hsu | Board Member | Board |
| 10 | Monti Hill | Board Member | Board |
| 11 | Nikki Nikkhoui | Board Member | Advisory |
| 12 | Jonathan Hinds | Board Member | Advisory |
| 13 | Meagan Cook | Board Member | Advisory |

#### Test Verification
- [ ] All 13 team members display correctly in their respective grid layouts
- [ ] Grid layouts are responsive (stacking on mobile)
- [ ] Headshot images load and display at correct aspect ratio

---

### Phase 8: Partner With Us (`/partner-with-us`)

**Estimated Time:** 3 hours

> **MANDATORY: Use `/frontend-design` skill first to design the Partner With Us layout in a .pen file before writing any code.**

#### Tasks
- [ ] **`/frontend-design`**: Design Partner With Us page layout in Pencil MCP `.pen` file, referencing `_claude/resources/redesign/06-partner-with-us.md` and `_claude/resources/redesign/screenshots/partnerwithus-full.png`
- [ ] Create `src/pages/partner-with-us.astro` with all sections:
  1. **Hero**: Two-column (text left, photo right), "Partner With Us" heading + description + "Learn More" button
  2. **Ways To Work Together**: Dark green section with heading, intro text, 4 partnership types (Community & Nonprofit, Program Partners, Funders & Philanthropy, Corporate Sponsors), heart illustration
  3. **Partners We Work With**: Cream section with heading, description, "Connect With Us" button, partner logo grid (13-14 logos with proper alt text)
  4. **CCA Testimonial**: Dark green spotlight with CCA image, heading, and testimonial quote
- [ ] Add proper partner names as alt text for all logos (Camelback Ventures, CCA, WestRock, Pinkerton Foundation, CAF America, Nike Foundation, WSCF, Workforce1, arbor RISING, CZ, Centre for Justice Innovation, prime produce limited)
- [ ] Configure SEO meta tags for Partner With Us page

#### Test Verification
- [ ] Partner logo grid displays correctly and is responsive
- [ ] All partner logos have descriptive alt text
- [ ] CCA testimonial section renders with correct layout

---

### Phase 9: Donate (`/donate`)

**Estimated Time:** 4 hours

> **MANDATORY: Use `/frontend-design` skill first to design the Donate layout in a .pen file before writing any code.**

#### Tasks
- [ ] **`/frontend-design`**: Design Donate page layout in Pencil MCP `.pen` file, referencing `_claude/resources/redesign/07-donate.md` and `_claude/resources/redesign/screenshots/donate-full.png`
- [ ] Create `src/pages/donate.astro` with donation section:
  1. **Two-column layout**: Left column -- full-height event photo (T.RAP Community Concert). Right column -- donation form.
  2. **Heading**: "Make a difference"
  3. **Description**: "Change starts with people like you..."
- [ ] Create `src/components/DonationForm.tsx` (React component -- **requires React for interactive form state**):
  - Frequency selector (One time / Monthly / Yearly) with radio-button-style containers
  - Amount selector ($50 / $100 / $200 / $1,000) with radio-button-style containers
  - Dynamic "Donate $X" button that updates text based on selected amount
  - Uses `client:load` directive in Astro
  - **Improvement**: Add custom amount input option
  - **Improvement**: Add impact statements ("$50 provides one mentoring session...")
  - **Improvement**: Add trust signals (501(c)(3) status, EIN: 85-1197743)
- [ ] Add social sharing buttons (Facebook, X, WhatsApp, Copy link) -- can be Astro component with simple share URLs
- [ ] Configure SEO meta tags for Donate page

#### Test Verification
- [ ] Frequency and amount selection work correctly (React state)
- [ ] Button text dynamically updates with selected amount
- [ ] Custom amount input accepts valid values
- [ ] Share buttons generate correct URLs

---

### Phase 10: Image Optimization, SEO, and Accessibility Audit

**Estimated Time:** 4 hours

#### Tasks

**Image Optimization:**
- [ ] Convert all content images to Astro `<Image>` or `<Picture>` components for automatic WebP/AVIF generation and responsive sizes
- [ ] Verify all images have descriptive alt text
- [ ] Optimize partner logos (many are oversized PNGs)
- [ ] Create social media icons as inline SVGs (replace Wix PNG icons)

**SEO:**
- [ ] Configure `astro-seo` on every page with unique title, description, and OG tags
- [ ] Add structured data (JSON-LD) for Organization schema on homepage
- [ ] Verify sitemap generates correctly at `/sitemap-index.xml`
- [ ] Add canonical URLs to all pages
- [ ] Create `robots.txt` in `public/`
- [ ] Add favicon set (favicon.ico, apple-touch-icon, etc.)

**Accessibility:**
- [ ] Verify heading hierarchy (h1 -> h2 -> h3, no skips) on every page
- [ ] Check color contrast ratios meet WCAG 2.1 AA:
  - `#242424` on `#FFF8ED` (body text on cream) -- should pass
  - `#FFFFFF` on `#20493C` (white on green) -- should pass
  - `#FFCB70` on `#20493C` (gold on green) -- verify minimum 4.5:1 ratio
- [ ] Ensure all interactive elements are keyboard accessible
- [ ] Add skip-to-content link
- [ ] Verify focus styles are visible on all interactive elements
- [ ] Test with screen reader (VoiceOver/NVDA)

#### Test Verification
- [ ] Lighthouse accessibility score >= 90 on all pages
- [ ] Lighthouse performance score >= 90 on all pages
- [ ] Lighthouse SEO score >= 90 on all pages
- [ ] `npm run build` succeeds with all optimizations applied

---

### Phase 11: Final Polish, Testing, and Deployment Prep

**Estimated Time:** 3 hours

#### Tasks
- [ ] Cross-browser testing (Chrome, Firefox, Safari, Edge)
- [ ] Mobile testing at 320px, 375px, 414px, 768px, 1024px, 1280px, 1440px viewpoints
- [ ] Fix any responsive layout issues discovered
- [ ] Verify all internal links work (no broken links)
- [ ] Verify all external links work (Google Form URLs, mailto links)
- [ ] Run `npm run build` and `npm run preview` to test production build
- [ ] Review HTML output for clean, semantic markup
- [ ] Final visual comparison against Wix site screenshots
- [ ] Update copyright year if needed (currently "2025")
- [ ] Document deployment instructions

#### Test Verification
- [ ] Production build completes successfully
- [ ] Preview server shows correct output for all pages
- [ ] No console errors in browser
- [ ] All pages load in under 3 seconds on simulated 3G

---

## React Components Required

The following components **require React** due to client-side interactivity. All other components should be `.astro` files (zero JS shipped to client):

| Component | Why React is Needed |
|-----------|-------------------|
| `MobileNav.tsx` | State management for hamburger menu open/close toggle, focus trapping, keyboard event handling (Escape to close) |
| `DonationForm.tsx` | Interactive form with dynamic state: frequency selection, amount selection, button text updates, custom amount input, form validation |

**Everything else is static** and should use `.astro` components:
- Header (wraps MobileNav with `client:load`)
- Footer
- All section/layout components
- All page content
- Testimonial blocks
- Team member cards
- Program cards
- Partner logo grid
- Statistics displays

## Rollback Plan

1. All work is on branches -- `git checkout main` to revert to scaffold state
2. No database or external service dependencies to roll back
3. Original Wix site remains live and unaffected during development
4. Image originals remain in `_claude/resources/redesign/images/` as backup

## Dependencies

- [x] Astro 5, React 19, Tailwind CSS v4 -- already installed
- [x] astro-seo, @astrojs/sitemap, astro-compress -- already installed
- [x] @fontsource/inter -- already installed
- [x] Page content documentation -- complete in `_claude/resources/redesign/`
- [x] Downloaded images -- 54 files in `_claude/resources/redesign/images/`
- [ ] Garet font files (if available) -- or confirm Inter as permanent substitute
- [ ] Updated team headshot images (13 unique photos from live site)
- [ ] Confirmed social media URLs for Emergent Works
- [ ] Donation integration decision (Stripe, external link, etc.)
- [ ] Actual program application form URLs (Google Forms)

## Success Metrics

(To be filled in after implementation)

- [ ] All 7 pages implemented and rendering correctly
- [ ] Lighthouse Performance score: ___/100
- [ ] Lighthouse Accessibility score: ___/100
- [ ] Lighthouse SEO score: ___/100
- [ ] Total build time: ___ seconds
- [ ] Total page weight (homepage): ___ KB
- [ ] Mobile responsiveness verified at ___ breakpoints
- [ ] Number of React components (target: 2)
- [ ] Number of Astro components (target: ~15-20)

---

## Refinement History

(Optional section - populated by `/dr-plan` refine mode)

**Refinements:**

---

## Implementation Notes

**Actual Time Tracking:**
- Phase 1: [Estimated: 3 hours] (Actual: ___)
- Phase 2: [Estimated: 5 hours] (Actual: ___)
- Phase 3: [Estimated: 5 hours] (Actual: ___)
- Phase 4: [Estimated: 4 hours] (Actual: ___)
- Phase 5: [Estimated: 4 hours] (Actual: ___)
- Phase 6: [Estimated: 4 hours] (Actual: ___)
- Phase 7: [Estimated: 3 hours] (Actual: ___)
- Phase 8: [Estimated: 3 hours] (Actual: ___)
- Phase 9: [Estimated: 4 hours] (Actual: ___)
- Phase 10: [Estimated: 4 hours] (Actual: ___)
- Phase 11: [Estimated: 3 hours] (Actual: ___)
- **Total Estimated: 42 hours**

**Key Decisions:**
(Summary of major decisions from Open Questions & Decisions section)

**Assumptions Validated:**
- [ ] Font choice confirmed
- [ ] Donation approach confirmed
- [ ] Team photo source confirmed

**Lessons Learned:**
- [Document what worked well and what didn't]
