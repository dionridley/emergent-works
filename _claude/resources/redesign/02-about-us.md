# About Us Page - Content Extraction

- **Page Title:** About Us
- **Source URL:** https://tine945.wixsite.com/emergent-works-1/about-us
- **Source File:** /tmp/ew-about-us.html
- **Extracted:** 2026-02-16

---

## Color Palette (from Wix CSS Variables)

| Variable       | RGB Value         | Hex Equivalent | Usage                                    |
|----------------|-------------------|----------------|------------------------------------------|
| `color_42`     | 255, 250, 240     | `#FFFAF0`      | Page background (cream/floral white)     |
| `color_44`     | 32, 73, 60        | `#20493C`      | Dark green (section backgrounds, buttons)|
| `color_11`     | 255, 255, 255     | `#FFFFFF`      | White                                    |
| `color_12`     | 255, 250, 240     | `#FFFAF0`      | Cream (same as color_42)                 |
| `color_14`     | 5, 40, 18         | `#052812`      | Dark forest green (text)                 |
| `color_15`     | 5, 40, 18         | `#052812`      | Dark forest green (borders)              |
| `color_17`     | 5, 40, 18         | `#052812`      | Dark forest green                        |
| `color_18`     | 68, 94, 77        | `#445E4D`      | Muted green                              |
| `color_36`     | 5, 40, 18         | `#052812`      | Dark forest green (text)                 |
| `color_41`     | 36, 88, 42        | `#24582A`      | Medium green                             |
| `color_50`     | 255, 255, 255     | `#FFFFFF`      | White (button text)                      |
| Custom         | 255, 203, 112     | `#FFCB70`      | Gold/amber (Donate Today button bg)      |

## Typography (from Wix Font Definitions)

| Font Variable | Definition                                                                |
|---------------|---------------------------------------------------------------------------|
| `font_0`      | bold 106px/1em fraunces_120pt-light, serif (Hero display)                 |
| `font_2`      | bold 79px/1em fraunces_120pt-light, serif (Large heading)                 |
| `font_3`      | bold 55px/1.2em fraunces_120pt-light, serif (Section heading)             |
| `font_4`      | bold 37px/1.2em fraunces_120pt-light, serif (Sub-heading)                 |
| `font_5`      | normal 25px/1.4em avenir-lt-w01_35-light1475496, sans-serif               |
| `font_6`      | normal 20px/1.4em avenir-lt-w01_35-light1475496, sans-serif               |
| `font_7`      | normal 19px/1.3em avenir-lt-w01_35-light1475496, sans-serif               |
| `font_8`      | normal 17px/1.5em avenir-lt-w01_35-light1475496, sans-serif (Body text)   |
| `font_9`      | normal 15px/1.3em avenir-lt-w01_35-light1475496, sans-serif (Small text)  |

**Primary Heading Font:** Fraunces 120pt Light (serif)
**Primary Body Font:** Avenir LT W01 35 Light (sans-serif)
**Button Font:** Avenir LT W01 35 Light, 16px/1.5em

---

## Page Structure (Top to Bottom)

---

### Section 1: Header / Navigation Bar

- **Component:** `SITE_HEADER` (sticky)
- **Background:** `color_42` = `#FFFAF0` (cream)
- **Layout:** Full-width strip with 3 columns (logo | nav | login/cart)

#### Brand Name (Left Column)

**Text:**
> Emergent Works

- Styled as brand/logo text

#### Navigation Menu (Center Column)

- Text-aligned: center
- **Links:**
  - [Home](https://tine945.wixsite.com/emergent-works-1)
  - [About Us](https://tine945.wixsite.com/emergent-works-1/about-us) *(current page)*
  - [Programs](https://tine945.wixsite.com/emergent-works-1/programs)
  - [Impact](https://tine945.wixsite.com/emergent-works-1/impact)
  - [Our Team](https://tine945.wixsite.com/emergent-works-1/our-team)
  - [Partner With Us](https://tine945.wixsite.com/emergent-works-1/partner-with-us)
  - [Donate](https://tine945.wixsite.com/emergent-works-1/donate)

#### Right Column

- Login/member avatar area
- Cart icon (e-commerce widget)

---

### Section 2: Mission / Hero Section

- **Component:** `comp-m7yr4r07` (ClassicSection)
- **Background:** `color_42` = `#FFFAF0` (cream)
- **Layout:** Two strips stacked:
  - **Strip 1** (`comp-m7yr4r0a`): Single column, full-width, transparent background
  - **Strip 2** (`comp-m7yr4r0d6`): Two-column layout, transparent background

#### Strip 1: Mission Title and Text

**Rich Text Block (`comp-m7yr4r0c1`):**

> **Our Mission**

**Rich Text Block (continued):**

> At Emergent Works, we break cycles of incarceration and poverty by equipping BIPOC individuals impacted by the criminal justice system with the tools to thrive in today's digital world. Through education, employment, economic mobility, and creativity, we empower our participants to build financial independence, grow personally, and lead within their communities.

#### Strip 2: Image + Content (Two Columns)

**Left Column (`comp-m7yr4r0f`):**

- **Image:** Group photo
  - Alt: "DSC05099 (2).JPG"
  - Dimensions: 588x405
  - URL: `https://static.wixstatic.com/media/1926b3_88d0c633435c44d795abb1bf2a255a79~mv2.jpg/v1/fill/w_588,h_405,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/DSC05099%20(2)_JPG.jpg`
  - 2x URL: `https://static.wixstatic.com/media/1926b3_88d0c633435c44d795abb1bf2a255a79~mv2.jpg/v1/fill/w_1176,h_810,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/DSC05099%20(2)_JPG.jpg`

**Right Column (`comp-m7yr4r0j9`):**

**Rich Text Block (`comp-m7yr4r0k5`):**

> Emergent Works provides free technical and creative education, Social Emotional Learning development, and workforce pathways that support system-impacted youth and adults in building brighter futures. Using music, digital literacy, mentorship, and civic engagement, we help our community develop real social and practical skills, emotional resilience, and community connection - guided by alumni and mentors who've walked the same path.

**Button:** "Learn More"
- Style: Rounded pill (border-radius: 50px), background `#20493C` (dark green), border `#20493C`
- Hover: border-radius 20px, border `#20493C`
- Text color: white (`#FFFFFF`)

---

### Section 3: What We Do / Explore Programs (Transition Section)

- **Component:** `comp-miz28xbk` (ClassicSection)
- **Background:** `rgba(color_12, 0.8)` = `rgba(255, 250, 240, 0.8)` (semi-transparent cream)
- **Layout:** Single section with stacked elements

#### Heading

**Rich Text Block (`comp-miz28xbx`):**

> **What We Do**

*(Note: This heading appears overlaid on or near the section with decorative images.)*

#### Decorative Images

1. **Image (`comp-miz25mfy`):** Circle/rounded image
   - Dimensions: 339x339
   - URL: `https://static.wixstatic.com/media/1926b3_8fb60a8f5c9747d8bf0cbe37264f6493~mv2.png/v1/fill/w_339,h_339,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/1926b3_8fb60a8f5c9747d8bf0cbe37264f6493~mv2.png`

2. **Image (`comp-miz31q5u`):** Circle/rounded image
   - Dimensions: 301x301
   - URL: `https://static.wixstatic.com/media/1926b3_7d9ee858f86d45f1b13dd0e35692cbb3~mv2.png/v1/fill/w_301,h_301,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/1926b3_7d9ee858f86d45f1b13dd0e35692cbb3~mv2.png`

3. **Image (`comp-miz3436w`):** Circle/rounded image
   - Dimensions: 223x223
   - URL: `https://static.wixstatic.com/media/1926b3_ba218c9af31d49afa29243af46de6731~mv2.png/v1/fill/w_223,h_223,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/1926b3_ba218c9af31d49afa29243af46de6731~mv2.png`

#### Body Text

**Rich Text Block (`comp-miz28xby`):**

> Emergent Works provides free technical and creative education, Social Emotional Learning development, and workforce pathways that support system-impacted youth and adults in building brighter futures. Using music, digital literacy, mentorship, and civic engagement, we help our community develop real social and practical skills, emotional resilience, and community connection - guided by alumni and mentors who've walked the same path.

**Button:** "Explore Programs"
- Link: `/about-us` (placeholder, links to current page)
- Style: Rounded pill (border-radius: 100px), background `color_44` = `#20493C` (dark green)
- Border: 1px solid, `color_49` = `#24582A`
- Font: Avenir LT, 16px/1.5em
- Text color: `color_50` = `#FFFFFF` (white)

---

### Section 4: Why We Do It

- **Component:** `comp-miz4x090` (ClassicSection)
- **Background:** `color_42` = `#FFFAF0` (cream)
- **Layout:** Two-column strip (`comp-miz4x09g`)

#### Left Column (`comp-miz4x09i`)

- **Background:** `color_44` = `#20493C` (dark green)
- **Column width:** 488px

**Rich Text Block (`comp-miz4x09l`):**

> **Why We Do It**

*(Heading displayed over dark green background, likely white text)*

**Image (`comp-miz5iia2`):**
- Dimensions: 600x600
- URL: `https://static.wixstatic.com/media/1926b3_05b01d5aee344cad8a1db84790649941~mv2.png/v1/fill/w_600,h_600,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/1926b3_05b01d5aee344cad8a1db84790649941~mv2.png`

#### Right Column (`comp-miz4x09p8`)

- **Background:** `color_42` = `#FFFAF0` (cream)
- **Column width:** 489px

**Rich Text Block (`comp-miz4x09q10`):**

> Justice-impacted Black and Brown youth and adults face systemic barriers that limit access to education, economic mobility, and meaningful career pathways. A single interaction with the criminal legal system can derail a lifetime of opportunity, while employers in tech and other growing fields continue to overlook resilient, capable talent.
>
> At Emergent Works, we address these inequities by centering the voices and potential of system-impacted individuals. Our work tackles the root causes -- structural racism, limited access to digital skills and mentorship, and hiring practices that prioritize credentials over capability. We create pathways where participants can rebuild confidence, grow economically, and lead in their communities. Through this, we aim to shape a more equitable future where those most impacted by injustice can thrive and drive change.

**Button:** "See Our Impact"
- Link: `/about-us` (placeholder, links to current page)
- Style: Same pill style as Explore Programs (dark green background, white text, rounded)

**Image (`comp-miz6qks2`):**
- Dimensions: 600x600
- URL: `https://static.wixstatic.com/media/1926b3_8ee31ad792b64c8daade148184819516~mv2.png/v1/fill/w_600,h_600,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/1926b3_8ee31ad792b64c8daade148184819516~mv2.png`

---

### Section 5: Our Story & Who We Are

- **Component:** `comp-miz5pbcw` (ClassicSection)
- **Background:** `color_42` = `#FFFAF0` (cream)
- **Layout:** Two-column strip (`comp-miz5pbd1`)

#### Left Column (`comp-miz5pbd31`)

- **Background:** transparent
- **Column width:** 489px

**Rich Text Block (`comp-miz5pbd45`):**

> **Our Story & Who We Are**

- Style: font_7, font-size: 72px, text-align: center, line-height: 1.1em, bold

**Rich Text Block (`comp-miz5rryo`):**

> Founded in 2020, Emergent Works was born from a bold question: what if technology could be a path to freedom? Originally launched as Code Cooperative, we began as a mentorship circle for justice-impacted individuals learning to code.
>
> Today, under the leadership of Army Armstead -- a graduate of our first cohort who rose from mentee to mentor to Co-Founder and Executive Director -- EW has grown into a movement that blends technology, creativity, and community to open doors for those most excluded from opportunity.
>
> Our team is built from the communities we serve: 100% of staff are program alumni, 80% are system-impacted, 80% are BIPOC, and 40% are female-identifying. We prioritize representation and equity across our programs, leadership, and board, ensuring the voices of youth and system-impacted individuals shape our work every step of the way.

- Style: font_8, font-size: 17px

**Button:** "Meet Our Team"
- Link: `/about-us` (placeholder, links to current page)
- Style: Same pill style (dark green background, white text, rounded)

#### Right Column (`comp-miz5pbd69`)

- **Background:** `color_12` = `#FFFAF0` (cream), with fill-layer-image
- **Column width:** 491px
- **Background Image:** Person portrait (blurred low-quality placeholder visible)
  - Alt: "Copy of 288A0162.jpg"
  - Dimensions: 491x784 (column fill)
  - URL: `https://static.wixstatic.com/media/1926b3_9f5897b670a64721833b03f59adc3b90~mv2.jpg/v1/fill/w_123,h_184,al_c,q_80,usm_0.66_1.00_0.01,blur_2,enc_avif,quality_auto/1926b3_9f5897b670a64721833b03f59adc3b90~mv2.jpg`
  - Full-res URI: `1926b3_9f5897b670a64721833b03f59adc3b90~mv2.jpg` (original: 1600x2400)

**Image overlay (`comp-miz6rh89`):**
- Dimensions: 446x442
- URL: `https://static.wixstatic.com/media/1926b3_71cc1067ca7441cf8e61a27626a74171~mv2.png/v1/fill/w_446,h_442,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/1926b3_71cc1067ca7441cf8e61a27626a74171~mv2.png`

---

### Section 6: Call to Action / Donate

- **Component:** `comp-miz6fllu` (ClassicSection)
- **Background:** `color_44` = `#20493C` (dark green)
- **Layout:** Two-column strip (`comp-miz6flm9`)

#### Left Column (`comp-miz6flmf`)

- **Background:** `color_44` = `#20493C` (dark green)
- **Column width:** 392px
- **Content:** Likely an image or decorative element (min-height: 442px)

#### Right Column (`comp-miz6flmj`)

- **Background:** `color_44` = `#20493C` (dark green)
- **Column width:** 588px

**Rich Text Block (`comp-miz6flmg`):**

> **Support Our Community To Rewrite The Future**

- Style: Large heading (width: 871px, spills across columns visually)

**Rich Text Block (`comp-miz6ks27`):**

> Every gift makes a difference. Join us and be part of the change.

**Button:** "Donate Today"
- Link: `/about-us` (placeholder, links to current page)
- Style: Rounded pill (border-radius: 100px), background `rgb(255, 203, 112)` = `#FFCB70` (gold/amber)
- Text color: `color_36` = `#052812` (dark forest green)
- Font: Avenir LT, 16px/1.5em
- Dimensions: 154x45px
- Animation: fadeIn 1200ms

---

### Section 7: Footer

- **Component:** `SITE_FOOTER`
- **Background:** `color_42` = `#FFFAF0` (cream)
- **Layout:** Column strip with two columns

#### Left Column (`comp-m7yr4mmr11`)

**Navigation Links:**
- Home
- About Us
- Programs
- Impact
- Donate

**Contact:**
- Email: [info@emergentworks.org](mailto:info@emergentworks.org)

**Address:**
- 424 W 54th St.
- New York, NY 10019

**Copyright:**
> (c) 2025 by Emergent Works. All rights reserved.

#### Right Column (`comp-m7yr4mmu10`)

**Image (`comp-miz12lzf`):**
- Dimensions: 285x285
- URL: `https://static.wixstatic.com/media/1926b3_c4e60c1d365747ffb205d6a43b92fd66~mv2.png/v1/fill/w_285,h_285,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/1926b3_c4e60c1d365747ffb205d6a43b92fd66~mv2.png`

#### Social Bar

- [Instagram](https://www.instagram.com/wix) - Icon: `e1aa082f7c0747168d9cf43e77046142.png`
- [Facebook](https://www.facebook.com/wix) - Icon: `4057345bcf57474b96976284050c00df.png`
- [LinkedIn](https://il.linkedin.com/company/wix-com) - Icon: `aa0402eb9ba2430d9d0620b59556efca.png`
- [YouTube](https://www.youtube.com/user/Wix) - Icon: `45bce1d726f64f1999c49feae57f6298.png`

*(Note: Social links currently point to Wix's own social accounts -- these are placeholder links from the Wix template and need to be updated to Emergent Works' actual social media profiles.)*

---

## All Image Assets (Deduplicated by Base URI)

| # | Description                     | Base Media URI                                               | Dimensions  |
|---|---------------------------------|--------------------------------------------------------------|-------------|
| 1 | Group photo (DSC05099)          | `1926b3_88d0c633435c44d795abb1bf2a255a79~mv2.jpg`            | 588x405 (2x: 1176x810) |
| 2 | Circle image 1                  | `1926b3_8fb60a8f5c9747d8bf0cbe37264f6493~mv2.png`            | 339x339 (2x: 678x678) |
| 3 | Circle image 2                  | `1926b3_7d9ee858f86d45f1b13dd0e35692cbb3~mv2.png`            | 301x301 (2x: 602x602) |
| 4 | Circle image 3                  | `1926b3_ba218c9af31d49afa29243af46de6731~mv2.png`            | 223x223 (2x: 446x446) |
| 5 | Why We Do It - left image       | `1926b3_05b01d5aee344cad8a1db84790649941~mv2.png`            | 600x600 (2x: 1080x1080) |
| 6 | Why We Do It - bottom image     | `1926b3_8ee31ad792b64c8daade148184819516~mv2.png`            | 600x600 (2x: 1080x1080) |
| 7 | Portrait (bg, "288A0162")       | `1926b3_9f5897b670a64721833b03f59adc3b90~mv2.jpg`            | 491x784 (original: 1600x2400) |
| 8 | Our Story overlay image         | `1926b3_71cc1067ca7441cf8e61a27626a74171~mv2.png`            | 446x442 (2x: 892x884) |
| 9 | Footer image                    | `1926b3_c4e60c1d365747ffb205d6a43b92fd66~mv2.png`            | 285x285 (2x: 570x570) |
| 10| Instagram icon                  | `e1aa082f7c0747168d9cf43e77046142.png`                        | 39x39 (2x: 78x78) |
| 11| Facebook icon                   | `4057345bcf57474b96976284050c00df.png`                        | 39x39 (2x: 78x78) |
| 12| LinkedIn icon                   | `aa0402eb9ba2430d9d0620b59556efca.png`                        | 39x39 (2x: 78x78) |
| 13| YouTube icon                    | `45bce1d726f64f1999c49feae57f6298.png`                        | 39x39 (2x: 78x78) |

**Base URL for all images:** `https://static.wixstatic.com/media/`

---

## All Buttons Summary

| Button Text       | Section                 | Background Color      | Text Color  | Border Radius | Link Target (placeholder)    |
|--------------------|-------------------------|-----------------------|-------------|---------------|------------------------------|
| Learn More         | Mission (Strip 2)       | `#20493C` (dark green)| `#FFFFFF`   | 50px (pill)   | N/A (button, no link)        |
| Explore Programs   | What We Do              | `#20493C` (dark green)| `#FFFFFF`   | 100px (pill)  | `/about-us` (placeholder)    |
| See Our Impact     | Why We Do It            | `#20493C` (dark green)| `#FFFFFF`   | 100px (pill)  | `/about-us` (placeholder)    |
| Meet Our Team      | Our Story               | `#20493C` (dark green)| `#FFFFFF`   | 100px (pill)  | `/about-us` (placeholder)    |
| Donate Today       | CTA Section             | `#FFCB70` (gold)      | `#052812`   | 100px (pill)  | `/about-us` (placeholder)    |

*(Note: All CTA buttons currently link back to `/about-us` as placeholders. In the redesign, these should link to their actual target pages: `/programs`, `/impact`, `/our-team`, and `/donate` respectively.)*

---

## Full Text Content (Clean, In Order)

### Header
- **Brand:** Emergent Works
- **Nav:** Home | About Us | Programs | Impact | Our Team | Partner With Us | Donate

### Our Mission
At Emergent Works, we break cycles of incarceration and poverty by equipping BIPOC individuals impacted by the criminal justice system with the tools to thrive in today's digital world. Through education, employment, economic mobility, and creativity, we empower our participants to build financial independence, grow personally, and lead within their communities.

### What We Do
Emergent Works provides free technical and creative education, Social Emotional Learning development, and workforce pathways that support system-impacted youth and adults in building brighter futures. Using music, digital literacy, mentorship, and civic engagement, we help our community develop real social and practical skills, emotional resilience, and community connection - guided by alumni and mentors who've walked the same path.

### Why We Do It
Justice-impacted Black and Brown youth and adults face systemic barriers that limit access to education, economic mobility, and meaningful career pathways. A single interaction with the criminal legal system can derail a lifetime of opportunity, while employers in tech and other growing fields continue to overlook resilient, capable talent.

At Emergent Works, we address these inequities by centering the voices and potential of system-impacted individuals. Our work tackles the root causes -- structural racism, limited access to digital skills and mentorship, and hiring practices that prioritize credentials over capability. We create pathways where participants can rebuild confidence, grow economically, and lead in their communities. Through this, we aim to shape a more equitable future where those most impacted by injustice can thrive and drive change.

### Our Story & Who We Are
Founded in 2020, Emergent Works was born from a bold question: what if technology could be a path to freedom? Originally launched as Code Cooperative, we began as a mentorship circle for justice-impacted individuals learning to code.

Today, under the leadership of Army Armstead -- a graduate of our first cohort who rose from mentee to mentor to Co-Founder and Executive Director -- EW has grown into a movement that blends technology, creativity, and community to open doors for those most excluded from opportunity.

Our team is built from the communities we serve: 100% of staff are program alumni, 80% are system-impacted, 80% are BIPOC, and 40% are female-identifying. We prioritize representation and equity across our programs, leadership, and board, ensuring the voices of youth and system-impacted individuals shape our work every step of the way.

### Call to Action
**Support Our Community To Rewrite The Future**

Every gift makes a difference. Join us and be part of the change.

### Footer
- **Links:** Home | About Us | Programs | Impact | Donate
- **Email:** info@emergentworks.org
- **Address:** 424 W 54th St., New York, NY 10019
- **Copyright:** (c) 2025 by Emergent Works. All rights reserved.
- **Social:** Instagram, Facebook, LinkedIn, YouTube (currently linking to Wix default accounts)

---

## Layout Notes

1. **Header** is sticky (position: sticky), cream background (`#FFFAF0`), three-column layout with brand left, nav center, account right.

2. **Mission section** uses a two-strip layout: first strip is full-width text, second strip is a two-column layout with image left and text right. Cream background throughout.

3. **What We Do section** has a semi-transparent cream overlay (`rgba(255,250,240,0.8)`). Contains a heading, three decorative circular images at various sizes (339px, 301px, 223px), body text, and an "Explore Programs" CTA button.

4. **Why We Do It section** uses a dramatic two-column split: left column has dark green background (`#20493C`) with heading and a 600x600 image; right column has cream background with the detailed body text, a "See Our Impact" button, and another 600x600 image below.

5. **Our Story section** is a two-column layout: left column has the heading (72px bold serif), three paragraphs of story text, and a "Meet Our Team" button; right column has a full-height portrait background image (491x784) with a decorative overlay image (446x442).

6. **CTA/Donate section** has a dark green background (`#20493C`) with two columns. The left column appears decorative, while the right column contains the heading, subtext, and a distinctive gold/amber "Donate Today" button (`#FFCB70`) with dark green text -- the only button that breaks from the dark-green-on-white pattern.

7. **Footer** has cream background, two columns: left with navigation links, contact info, and address; right with a 285x285 image. Social bar with four platform icons sits above or within the footer.

8. **General page width:** min-width 980px, with 80px padding on each side for header strip.

9. **Animation:** The "Donate Today" button has a fadeIn animation (1200ms, 1ms delay, ease-in-out).

## Visual Verification (Playwright, 2026-02-16)

Page verified at 1400px viewport width. These observations supersede conflicting descriptions above.

### Layout Corrections

1. **"Our Mission" section**: Two-column layout. LEFT: Large photo of group celebrating (participants standing in line with arms raised). RIGHT: Body text + "Learn More" button (dark green pill with DOWN-ARROW icon, not a simple text button). A decorative tablet/book illustration with "E" letter appears to the right of the button area. A circular badge illustration appears above/right.

2. **"What We Do" section**: CENTER-ALIGNED layout. "What We Do" heading centered, body text centered below, "Explore Programs" button centered. A small decorative tablet/book illustration with "W" letter appears to the right of the heading.

3. **"Why We Do It" section - ASYMMETRIC SPLIT LAYOUT**: This is the most distinctive layout on the page:
   - LEFT SIDE: Dark green (#20493C) background panel containing "Why We Do It" heading in white text + TWO gold/yellow heart illustrations (one large, one smaller, overlapping)
   - RIGHT SIDE: Cream background with body text paragraphs + "See Our Impact" button
   - This creates a dramatic asymmetric split that is visually distinctive and should be reproduced in the redesign.

4. **"Our Story & Who We Are" section**: Two-column layout. LEFT: Heading + long body text paragraphs + "Meet Our Team" button. RIGHT: Large photo (appears to be a program/graduation scene, alt: "Copy of 288A0162.jpg").

5. **CTA/Donate section**: Dark green full-width background. Large white centered heading: "Support Our Community To Rewrite The Future". Subtext: "Every gift makes a difference. Join us and be part of the change." "Donate Today" button in gold/accent style.

### Decorative Brand Illustrations

The page features multiple gold-yellow + dark green cartoon-style brand illustrations:
- **Tablet/book with "E"**: Near the "Learn More" button in the Mission section
- **Circular badge**: Above/right of the Mission photo area
- **Tablet/book with "W"**: Next to the "What We Do" heading
- **Two overlapping hearts**: In the "Why We Do It" dark green panel (one large, one smaller)

These are consistent brand elements used across all pages.

### Button Styles on This Page

| Button | Style | Notes |
|--------|-------|-------|
| Learn More | Dark green pill + down-arrow icon | Scrolls down on page |
| Explore Programs | Dark green pill | Links to Programs page (currently links to /about-us - placeholder) |
| See Our Impact | Dark green pill | Links to Impact page (currently links to /about-us - placeholder) |
| Meet Our Team | Dark green pill | Links to Our Team page (currently links to /about-us - placeholder) |
| Donate Today | Gold/accent style on dark background | Links to Donate page (currently links to /about-us - placeholder) |

### Content Verified
All text content matches the documentation above. The page descriptions and headings are confirmed accurate.
