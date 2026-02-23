# Emergent Works Website Redesign — 6 Design Concepts

> Brainstorming document for creating 6 distinct website redesigns.
> Date: 2026-02-23

---

## Brand Constraints

All designs must use the existing Emergent Works brand palette and typography:

- **Primary Green:** `#20493C`
- **Dark Green:** `#052812`
- **Medium Green:** `#24582A`
- **Muted Green:** `#445E4D`
- **Sage:** `#B1D3BB`
- **Accent Gold:** `#FFCB70`
- **Background Cream:** `#FFF8ED`
- **Cream:** `#FFFAF0`
- **Peach:** `#F9C5B4`
- **Text:** `#242424`
- **Gray:** `#5f6360`
- **White:** `#FFFFFF`

- **Heading Font:** Outfit (400, 500, 600, 700)
- **Body Font:** Plus Jakarta Sans (400, 500, 600, 700)

---

## Inspiration Sources

- **BERG Collective** (`staging.blackergcollective.com`): Grid-based layouts, impact metrics front-and-center, social proof with member avatars, repeated CTAs, progressive content flow (value prop → proof → programs → action), warm neutral palette with burgundy accent.
- **dionridley.com**: 900ms cinematic Astro view transitions, scroll-triggered animations with stagger delays, morphing elements between pages, card-based content with hover elevation, editorial typography, Playfair Display + Source Sans 3 pairing, refined editorial aesthetic.

---

## Design Concepts

### 1. "Impact First" — Data-Driven & Tech-Forward

**Core Idea:** Lead with the numbers. The hero opens with animated impact statistics (0% recidivism vs 44% national average) as the primary hook before anything else.

**Layout:** Clean grid system with generous whitespace. Programs presented as visual pathways/journeys with step indicators. Structured card layouts for programs, stats, and testimonials.

**Animation:** Minimal and purposeful — animated counters on scroll, subtle hover elevations on cards. No flashy transitions; the data speaks for itself.

**Key Sections:**
- Hero with animated impact statistics as centerpiece
- "By the Numbers" comparison section (EW alumni vs national averages)
- Program pathways with step-by-step visual indicators
- Partner/sponsor logo grid
- Donor-focused CTA with clear funding impact breakdown

**Tone:** Institutional credibility, donor-facing, "show me the numbers." Appeals to funders, corporate partners, and people who need proof before they invest.

---

### 2. "Stories" — Editorial / Magazine Layout

**Core Idea:** Tell the human story. Alumni journeys are the narrative spine — the site reads like a feature article about transformation.

**Layout:** Full-bleed photography with overlaid typography. Asymmetric grid layouts with pull quotes and large imagery. Long-scroll storytelling that guides the visitor through a narrative arc.

**Animation:** Cinematic view transitions (inspired by dionridley.com's 900ms transitions). Scroll-triggered fade-ins and parallax. Staggered text reveals for storytelling pacing.

**Key Sections:**
- Hero with full-bleed community photo and mission statement overlay
- Featured alumni story with editorial-style layout (large photo, pull quote, narrative)
- "Before & After" transformation narratives
- Program descriptions woven into personal stories
- Community voices mosaic
- "Write the Next Chapter" CTA

**Tone:** Intimate, human, journalism-inspired. Makes visitors feel something before asking them to act. Appeals to empathetic supporters, media, and potential mentees.

---

### 3. "Community Mosaic" — Card-Based & Modular

**Core Idea:** Show the breadth and vibrancy of the community. A dense, visually rich layout where programs, people, stats, and events all live side-by-side in a structured mosaic.

**Layout:** Masonry/bento-style grid of mixed content cards. Different card types (photo cards, stat cards, testimonial cards, event cards, program cards) create visual variety within a cohesive system.

**Animation:** Hover interactions with elevation changes and subtle scale transforms. Scroll-triggered staggered card entrances. Cards feel alive and interactive.

**Key Sections:**
- Hero with mission statement and a preview mosaic of card types
- Main mosaic grid mixing all content types
- Program deep-dive cards that expand or link to detail pages
- Testimonial cards scattered throughout the grid
- Stat cards as visual anchors in the mosaic
- "Add Your Card" / "Join the Mosaic" CTA

**Tone:** Vibrant, community-as-collective, "there's a lot happening here." Appeals to potential mentees, volunteers, and community members who want to see themselves in the work.

---

### 4. "Bold Movement" — Activist & Typography-Driven

**Core Idea:** This is a movement, not just a program. Oversized typography and bold color blocking create urgency and energy. The message is impossible to ignore.

**Layout:** Full-width alternating color blocks (green / cream / gold). Oversized headline typography as the primary visual element. Horizontal scroll sections for programs. Minimal photography — text and color do the heavy lifting.

**Animation:** Bold section transitions with color wipes. Text that animates in with weight or size. Horizontal scroll with momentum. Strong visual rhythm through repetition.

**Key Sections:**
- Hero with massive typographic statement ("0% Recidivism" or mission quote)
- Color-block sections alternating green, cream, and gold backgrounds
- Programs in horizontal scroll carousel with bold titles
- Key statistics as full-width typographic moments
- Team/leadership with minimal, bold portrait treatment
- "Join the Movement" repeated CTA with urgency

**Tone:** Urgent, empowering, movement-building. Appeals to activists, advocates, and people motivated by systemic change. Makes the case that supporting EW is taking a stand.

---

### 5. "Mentorship" — Warm, Personal & Relationship-Focused

**Core Idea:** The 1:1 mentorship relationship is what makes EW special. The design centers on the connection between mentors and mentees — pairing, collaboration, transformation.

**Layout:** Split-screen layouts pairing mentors with mentees. Warm, conversational feel — almost like a personal letter or invitation. Photo-forward with circular frames and gold accent rings.

**Animation:** Smooth page-level view transitions (inspired by dionridley.com). Gentle fade-ins and scale transitions. Split-screen reveals where mentor and mentee sides animate in from opposite directions.

**Key Sections:**
- Hero with paired mentor/mentee portrait and joint quote
- "How It Works" showing the mentorship journey (matching → learning → growing → graduating)
- Mentor spotlight / Mentee spotlight alternating sections
- Testimonial pairs (mentor and mentee speaking about each other)
- "Become a Mentor" / "Become a Mentee" dual CTA with split-screen design
- Community warmth section with group photos and relationship highlights

**Tone:** Welcoming, personal, "this could be you." Appeals to potential mentors (tech professionals), potential mentees (returning citizens), and anyone who believes in human connection as a vehicle for change.

---

### 6. "The Journey" — Scroll-Driven Interactive Documentary

**Core Idea:** The entire site is one continuous narrative scroll that takes the visitor through the experience of an EW participant — from before the program, through mentorship, to employment and beyond. The page itself transforms as you scroll: background colors shift, layouts morph, typography scales. The visitor doesn't just read about transformation — they *experience* it spatially.

**Layout:** Single continuous scroll divided into "chapters." Each chapter has its own distinct visual environment — different background colors, layout structures, and typography treatments. No traditional sections; the page flows like a documentary film. Chapter transitions are seamless color/layout morphs triggered by scroll position.

**Animation:** The most animation-heavy and technically ambitious design. Scroll-driven animations throughout — elements pin, parallax, scale, and transform based on scroll position. Background color transitions between chapters (e.g., dark green → cream → gold → green). Text and images animate in with scroll progress rather than simple intersection triggers. Potential use of CSS `animation-timeline: scroll()` for native scroll-driven animations.

**Key Sections (Chapters):**
- **Chapter 1 — "Before"**: Dark, muted palette. Statistics about mass incarceration. The problem, presented starkly.
- **Chapter 2 — "The Door Opens"**: Color begins to warm. Introduction to EW's mission and the moment of entry into the program.
- **Chapter 3 — "Learning"**: Full cream/gold warmth. The TECK and T.RAP programs visualized as an unfolding journey. Mentorship pairing animations.
- **Chapter 4 — "Growing"**: Split layouts showing skill development, projects built, confidence growing. Testimonials woven in as scroll-triggered quotes.
- **Chapter 5 — "Emerging"**: The payoff. Impact stats animate in triumphantly (0% recidivism). Alumni success stories. Full brand green as the dominant color.
- **Chapter 6 — "Your Chapter"**: CTA section. "This story isn't finished." Mentor, mentee, and donor pathways.

**Tone:** Immersive, cinematic, emotionally powerful. Inspired by NYT "Snowfall"-style interactive storytelling. The most experimental option — designed to make visitors *feel* the transformation journey. Appeals to everyone, but especially effective for media attention, awards, and viral sharing.

---

## Open Questions

- [x] Do these 6 directions feel distinct enough, or should any be swapped? **Yes — all 6 approved.**
- [x] Interactivity level — React-heavy with client-side interactions, or mostly static Astro components? **No constraints. Use whatever delivers the best user experience — CSS or React. Don't hold back for simplicity's sake. The goal is content understanding and delight.**
- [x] Content scope — full multi-page sites or single long-scroll homepages per design? **Full multi-page sites. Each design should feel like a complete, professional organization website — not a landing page. Time is not a constraint; quality and thoroughness are the priority.**
- [x] Fidelity — fully polished with real EW content, or high-fidelity prototypes with representative content? **Use real EW data where available, but take creative liberties to extend content where it makes the design richer (e.g., sub-program detail pages, deeper testimonials, expanded team bios). Don't be constrained by existing data if there's a more compelling approach. Use stock photography as placeholders for missing images. The /designs index page should include both a preview link and a "summary" page link for each design that documents what content is fabricated and needs real replacements.**

---

## Decisions Summary

| Decision | Answer |
|---|---|
| **Number of designs** | 6 |
| **Interactivity** | No constraints — CSS or React, whatever delivers the best experience |
| **Content scope** | Full multi-page sites per design (not landing pages) |
| **Fidelity** | Real EW content + creative extensions + stock photography |
| **Content tracking** | Each design gets a summary page documenting fabricated content |
| **Routing** | `/designs` index page → `/designs/{name}` for each design |

## Implementation Structure

- `/designs` — Index page with descriptions, previews, and links to each design + its content summary
- `/designs/impact-first/` — Design 1: "Impact First"
- `/designs/stories/` — Design 2: "Stories"
- `/designs/community-mosaic/` — Design 3: "Community Mosaic"
- `/designs/bold-movement/` — Design 4: "Bold Movement"
- `/designs/mentorship/` — Design 5: "Mentorship"
- `/designs/the-journey/` — Design 6: "The Journey"

Each design includes its own multi-page site with navigation (home, about, programs, team, donate, etc.) scoped under its route prefix.
