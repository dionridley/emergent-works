# Emergent Works - Site Overview & Redesign Reference

**Source:** https://tine945.wixsite.com/emergent-works-1
**Extraction date:** 2026-02-16
**Purpose:** Master reference document for rebuilding the website in Astro

---

## Document Index

| File | Description |
|------|-------------|
| `site-overview.md` | This file -- master reference and shared elements |
| `branding.md` | Brand guidelines (colors, typography, tone, imagery) |
| `01-homepage.md` | Homepage content, layout, images |
| `02-about-us.md` | About Us page content, layout, images |
| `03-programs.md` | Programs page content (reconstructed from web search + HTML) |
| `04-impact.md` | Impact page content, statistics, testimonials |
| `05-our-team.md` | Team page -- staff, board, advisory board |
| `06-partner-with-us.md` | Partnership page, partner logos, CCA testimonial |
| `07-donate.md` | Donate page with Wix donation widget details |
| `image-catalog.md` | Complete catalog of all 54 downloaded images |
| `branding-raw.txt` | Raw text extraction from brand guidelines PDF |
| `images/` | Directory containing 54 downloaded image files |

---

## Site Architecture

### Navigation Structure

| # | Page | URL Path | Description |
|---|------|----------|-------------|
| 1 | Home | `/` | Hero, mission, programs overview, testimonials, CTA |
| 2 | About Us | `/about-us` | Mission, what/why, org story, donate CTA |
| 3 | Programs | `/programs` | Program descriptions and application links |
| 4 | Impact | `/impact` | Statistics, program areas, testimonials |
| 5 | Our Team | `/our-team` | Staff, Board of Directors, Advisory Board |
| 6 | Partner With Us | `/partner-with-us` | Partnership types, partner logos, CCA spotlight |
| 7 | Donate | `/donate` | Donation form (frequency + amount selection) |

### Astro Route Mapping

```
src/pages/
  index.astro          -> Home
  about-us.astro       -> About Us
  programs.astro       -> Programs
  impact.astro         -> Impact
  our-team.astro       -> Our Team
  partner-with-us.astro -> Partner With Us
  donate.astro         -> Donate
```

---

## Shared Components

### Header (All Pages)

- **Position:** Sticky/fixed at top
- **Background:** Cream (`#FFFAF0`)
- **Layout:** Three columns -- Logo (left) | Navigation (center) | Account (right)
- **Logo:** "Emergent Works" text wordmark (17px Avenir Light) linking to homepage
  - Our Team page uses a different circular logo image instead
- **Navigation:** 7 items, horizontal, center-aligned
- **Account area:** Login button (can be removed in redesign -- Wix member feature)
- **Width:** 980px content, 80px padding each side

### Footer (All Pages)

- **Background:** Cream (`#FFFAF0`)
- **Layout:** Two columns

**Left Column:**
- Social media icon bar (4 platforms)
- Navigation links: Home, About Us, Programs, Impact, Donate (bold, 25px)
- Email: info@emergentworks.org
- Address: 424 W 54th St., New York, NY 10019

**Right Column:**
- Logo/seal image (285x285): `1926b3_c4e60c1d365747ffb205d6a43b92fd66~mv2.png`
- Copyright: (c) 2025 by Emergent Works. All rights reserved.

### Social Media Links

> **WARNING:** All social media links on the Wix site point to Wix's own accounts (placeholder URLs). These need to be replaced with Emergent Works' actual social profiles.

| Platform | Current (Wix Default) | Actual EW Account |
|----------|-----------------------|-------------------|
| Instagram | instagram.com/wix | instagram.com/emergentworks_ (from research) |
| Facebook | facebook.com/wix | *Needs to be provided* |
| LinkedIn | linkedin.com/company/wix-com | linkedin.com/company/emergentworks (from research) |
| YouTube | youtube.com/user/Wix | *Needs to be provided* |

**Additional known links (from research):**
- Medium: https://medium.com/@emergentworks
- GitHub: https://github.com/emergentworks/website

---

## Contact Information

- **Organization:** Emergent Works
- **Email:** info@emergentworks.org
- **Address:** 424 W 54th St., New York, NY 10019
- **Website:** https://emergentworks.org
- **EIN:** 85-1197743
- **Founded:** 2020 (originally as Code Cooperative)

---

## Brand Color System

### Brand Guidelines (Preferred for Rebuild)

| Color | Hex | CSS Variable | Usage |
|-------|-----|-------------|-------|
| Deep Green | `#20493C` | `--color-primary` | Primary brand, section backgrounds, buttons |
| Golden Yellow | `#FFCB70` | `--color-accent` | Accent, highlight, special CTAs |
| Warm Cream | `#FFF8ED` | `--color-background` | Page backgrounds, light sections |
| Near Black | `#242424` | `--color-text` | Body text, dark elements |
| White | `#FFFFFF` | `--color-white` | Text on dark backgrounds |

### Extended Palette (From Wix Site CSS)

| Color | Hex | Usage |
|-------|-----|-------|
| Very Dark Green | `#052812` | Deep accent, alternate text |
| Medium Green | `#24582A` | Button borders, hover states |
| Muted Green | `#445E4D` | Secondary buttons, SVG fills |
| Sage Green | `#B1D3BB` | Light accent |
| Peach | `#F9C5B4` | Warm accent |
| Light Purple | `#D2ACF7` | Accent |
| Floral White | `#FFFAF0` | Alternate cream (used heavily on Wix site) |

### Color Usage Pattern

The site follows a consistent two-tone alternating pattern:
- **Light sections:** Cream/white background with dark green text
- **Dark sections:** Dark green (`#20493C`) background with cream/white text
- **CTA buttons:** Dark green background with white text (standard) or gold `#FFCB70` background with dark text (special/donate)

---

## Typography

### Brand Guidelines (Use for Rebuild)

| Role | Font | Weight | Fallback |
|------|------|--------|----------|
| Headings | Garet | Bold | Outfit, Plus Jakarta Sans, or similar geometric sans-serif |
| Sub-headings | Garet | Regular | Same fallback |
| Body | Garet | Regular | Same fallback |

### Wix Site Implementation (Reference Only)

| Role | Font | Sizes |
|------|------|-------|
| Display/Hero | Fraunces 120pt Light (serif) | 106px, 79px, 72px |
| Section Headings | Fraunces 120pt Light (serif) | 55px, 44px, 42px |
| Body Text | Avenir LT W01 35 Light (sans-serif) | 25px, 20px, 19px, 17px, 16px |
| Small Text | DIN Next W01 Light (sans-serif) | 15px, 12px |

### Type Scale for Astro Rebuild

Suggested scale based on Wix site patterns:

| Element | Suggested Size | Weight |
|---------|---------------|--------|
| Hero heading | 72-83px | Bold |
| Section heading | 55-65px | Bold |
| Sub-section heading | 37-44px | Bold |
| Large body | 25px | Regular |
| Body | 17-19px | Regular |
| Small/footer | 15px | Regular |
| Button text | 16px | Regular |

---

## Content Summary By Page

### Homepage
- **Hero:** "Rewriting Futures. One Skill At The Time." over full-bleed photo
- **Mission:** "Emergent Works empowers system-impacted Black and Brown youth and adults..."
- **Our Approach:** 4 program areas (Digital Literacy, Social Emotional Learning, Career Development, Community Engagement) with brief descriptions
- **Community Voices:** 3 testimonials (Dontay, Zeek, Sheisty)
- **Featured Testimonial:** Nashid (longer quote on dark background)
- **Build With Us CTA:** Donate, Volunteer, Partner buttons

### About Us
- **Our Mission:** Breaking cycles of incarceration and poverty through digital skills
- **What We Do:** Free technical/creative education, SEL, workforce pathways
- **Why We Do It:** Systemic barriers facing justice-impacted individuals
- **Our Story:** Founded 2020 as Code Cooperative, led by Army Armstead
- **Key stats:** 100% staff are alumni, 80% system-impacted, 80% BIPOC, 40% female-identifying
- **CTA:** "Support Our Community To Rewrite The Future" with gold Donate button

### Programs
- **T.RAP:** Free creative workforce program for NYC youth ages 16-24; blends music production, songwriting, recording, civic engagement, digital literacy with SEL and career readiness
- **Technical Mentorship:** Free 12-week virtual 1-on-1 mentorship with industry professionals in digital literacy, coding, UI/UX, tech career exploration (18+, system-impacted)
- **Programs For Partners:** Section dividing partner-specific offerings
- **TECK (Partner):** Flexible 4/8/12-week digital literacy training for partner organizations (Google Suite, AI, Canva, website building)
- **T.RAP (Partner):** 8-12+ week immersive SEL and creative skills program for partner organizations
- **Testimonial:** Quote from Blueberry about life-changing experience
- **Note:** Previous programs (1:1 Technical Mentorship 20-week, Digital Literacy, Digital Design, LEAP Fellowship) no longer appear on the page

### Impact
- **Stats:** 261 graduates, 73% employed, $2+ above NYC min wage, 98%+ never re-offended, 8 graduates contracted with EW
- **4 program areas** with descriptions and photos
- **3 testimonials:** Lakresha (Digital Literacy), Julius (SEL), Zeek (Career Development)
- **Note:** Section 8 has unedited Wix placeholder text ("Welcome visitors...")

### Our Team
- **Staff (5):** Army Armstead (Founder & ED), Tine Reinert (Program Director), LaiQuan DuBose (Program Manager), Nasiar Denobrega (Program Associate), Angie Agosta (Program Intern)
- **Board of Directors (5):** Rosalind Zavros (Chair), Dion Ridley, Ashley Chen, Jerone Hsu, Monti Hill
- **Advisory Board (3):** Nikki Nikkhoui, Jonathan Hinds, Meagan Cook
- **Note:** All team photos are placeholders (only 4 unique images for 13 people)

### Partner With Us
- **4 Partnership Types:** Community & Nonprofit, Program Partners, Funders & Philanthropy, Corporate Sponsors
- **14 Partner logos** displayed (no names/alt text except CCA)
- **CCA Testimonial:** Center For Community Alternatives spotlight quote
- **Note:** No partnership inquiry form -- "Connect With Us" links to About Us

### Donate
- **Heading:** "Make a difference"
- **Description:** "Change starts with people like you..."
- **Options:** One time / Monthly / Yearly at $50 / $100 / $200 / $1,000
- **Note:** Purple background (`#ece9ff`) doesn't match site palette; no impact statements; no custom amount option

---

## Key Issues to Address in Redesign

### Content Issues

1. **Placeholder content on Impact page** -- Section 8 ("Grow Your Vision") contains unedited Wix template text
2. **Social media links** -- All point to Wix defaults, not EW's actual accounts
3. **Team photos** -- ~~Only 4 placeholder images for 13 team members~~ **RESOLVED: All 13 team members now have unique individual headshots (verified 2026-02-16)**
4. **Partner logos** -- No alt text or partner names (except CCA)
5. **Button links** -- Many CTAs on About Us link back to the same page (placeholders)
6. **Donate page color** -- ~~Uses purple `#ece9ff`~~ **RESOLVED: Now uses cream/beige background matching site palette (verified 2026-02-16)**
7. **No custom donation amount** -- Only preset $50/$100/$200/$1,000

### Design Improvements

1. **Mobile responsiveness** -- Wix site has min-width 980px, not truly responsive
2. **Image optimization** -- Convert to modern formats (WebP/AVIF), generate responsive sizes
3. **Accessibility** -- Add proper alt text to all images, ensure WCAG 2.1 AA contrast
4. **Font loading** -- Self-host Garet (brand font) instead of Wix's Avenir/Fraunces
5. **SVG icons** -- Replace Wix social icons with proper SVG icons
6. **Donation integration** -- Replace Wix widget with a proper payment integration (Stripe, etc.)
7. **Partnership form** -- Add a dedicated inquiry form instead of linking to About Us

### Structural Improvements

1. **Programs page** -- Consider making individual program pages for better SEO
2. **Impact page** -- Add animated counters or data visualization for statistics
3. **Donate page** -- Add impact statements, custom amounts, trust signals (EIN, 501(c)(3))
4. **Team page** -- Add brief bios for each team member
5. **Partner page** -- Add partner names and descriptions alongside logos
6. **Blog/News** -- Consider adding for ongoing content (EW has a Medium account)

---

## Design Patterns (From Wix Site)

### Section Layout Pattern

The site consistently uses these section types:

1. **Two-column content sections** (~490px each) -- image on one side, text on other, alternating left/right
2. **Full-width dark sections** -- Dark green background with cream/white text for testimonials and headers
3. **Full-bleed photo sections** -- Atmospheric photos with no text (breathing room)
4. **Statistics sections** -- Large numbers with labels and decorative SVG leaf elements
5. **CTA sections** -- Heading + subtext + action buttons

### Button Styles

| Style | Background | Text | Border | Radius | Usage |
|-------|-----------|------|--------|--------|-------|
| Primary | `#20493C` (dark green) | White | `#20493C` | 50-100px (pill) | Most CTAs |
| Secondary | `#445E4D` (muted green) | White | None | Standard | Impact page |
| Accent | `#FFCB70` (gold) | `#052812` (dark) | None | 100px (pill) | Donate CTA |

### Spacing & Layout

- **Page content width:** 980px
- **Column widths:** ~490px each in two-column layouts
- **Section padding:** ~80px horizontal
- **Content line-height:** 1.5-1.8em for body text

---

## External Dependencies

### Current Wix Features to Replace

| Wix Feature | Replacement for Astro |
|-------------|----------------------|
| Wix Donations widget | Stripe / PayPal integration |
| Wix Members (Login) | Remove (not needed) or add auth if needed |
| Wix ecom-platform | Stripe Checkout for donations |
| Wix social share buttons | Custom share links or share API |
| Wix Thunderbolt renderer | Astro SSG (static pages) |

### External Links

| Type | URL | Notes |
|------|-----|-------|
| Mentee Application | https://docs.google.com/forms/d/e/1FAIpQLSe5Mx7zA-Qm3v5DCZZm0kedKkOM4Cb_zNHyGvssMR99azW8qg/viewform | Google Form |
| Mentor Application | https://docs.google.com/forms/u/1/d/e/1FAIpQLSc9GW3E8zeOW-fXvdjgNlrnPsXo-19lZhc26_ShW91oY9FNIg/viewform | Google Form |
| Hawaii Digital Literacy | https://www.getlithawaii.emergentworks.org/ | Separate initiative |
| Passion Projects | https://emergentworks.org/passion-projects | Linked from Programs |

---

## Quick Reference

### Organization Facts

| Fact | Value |
|------|-------|
| Full name | Emergent Works |
| Previous name | Code Cooperative |
| Founded | 2020 |
| Location | 424 W 54th St., New York, NY 10019 |
| Email | info@emergentworks.org |
| EIN | 85-1197743 |
| Founder & ED | Army Armstead |
| Staff count | 5 |
| Board size | 5 directors + 3 advisory |
| Total graduates | 261 |
| Employment rate | 73% |
| Recidivism rate | 98%+ never re-offended |
| Team composition | 100% alumni, 80% system-impacted, 80% BIPOC, 40% female-identifying |

### Brand Quick Reference

| Element | Value |
|---------|-------|
| Primary color | `#20493C` (deep green) |
| Accent color | `#FFCB70` (golden yellow) |
| Background | `#FFF8ED` (warm cream) |
| Text color | `#242424` (near black) |
| Heading font | Garet Bold |
| Body font | Garet Regular |
| Tone | Warm, lively, community-centered, inclusive, supportive |
| Tagline | "Rewriting Futures. One Skill At The Time." |

---

## Visual Verification Summary (Playwright, 2026-02-16)

All 7 pages were visually verified using Playwright at 1400px viewport width. Key findings:

### Cross-Cutting Design Elements

**Decorative Brand Illustrations:** The site uses a set of recurring cartoon-style illustrations in gold-yellow (#FFCB70) with dark green (#20493C) accents. These appear across multiple pages:
- Laptop/computer icon (homepage, programs, footer area)
- Smartphone with heart icon (homepage)
- Microphone icon (homepage, community voices)
- Heart shape (about us, our team, partner with us)
- Tablet/book with "E"/"W" letters (about us, programs)

These are significant brand elements that should be reproduced in the redesign.

**Button Styles (Updated):**
| Style | Background | Text | Border | Usage |
|-------|-----------|------|--------|-------|
| Primary | Dark green | White | None | Most CTAs (Donate, Volunteer, Partner, Apply, Book) |
| Learn More | Dark green | White + down-arrow icon | None | Section navigation buttons |
| Accent/Gold | Transparent | Gold text | Gold border | "Explore Our Impact" on dark backgrounds, "Donate Today" CTA |

**Navigation:** Header shows 5 items before "More" overflow: Home, About Us, Programs, Impact, More. Our Team, Partner With Us, and Donate are in the overflow dropdown.

### Page-Specific Corrections

| Page | Finding |
|------|---------|
| Homepage | Hero text is CENTER-aligned (not right-aligned). Nashid photo has gold ring border. Build With Us uses polaroid-style photo collage with gold frames. |
| About Us | "Why We Do It" uses asymmetric split layout (dark green left panel with heading + heart illustrations, cream right with body text). New descriptive paragraphs throughout. |
| Programs | **COMPLETELY RESTRUCTURED** - Now shows T.RAP + Technical Mentorship (direct) and TECK + T.RAP (partner). No more Digital Literacy, Digital Design, or LEAP Fellowship. |
| Impact | Structure matches documentation. "Grow Your Vision" Wix placeholder text still present. Descriptions have been updated/expanded. |
| Our Team | **All 13 team members now have unique individual headshots** (previously 4 placeholder images). New team/board description paragraphs added. |
| Partner With Us | Partner logos now identifiable: Camelback Ventures, CCA, WestRock, Pinkerton Foundation, CAF America, Nike Foundation, WSCF, Workforce1, arbor RISING, CZ, Centre for Justice Innovation, prime produce limited. Heart illustration in "Ways To Work Together" section. |
| Donate | **No longer uses purple background** - now cream/beige matching site palette. Layout is two-column (left: full-height event photo, right: donation form). |
