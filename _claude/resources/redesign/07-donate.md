# Donate Page - Content Extraction

**Source URL:** https://tine945.wixsite.com/emergent-works-1/donate
**Extracted from:** `/tmp/ew-donate.html`
**Date extracted:** 2026-02-16

---

## Page Structure Overview

The Donate page is relatively simple compared to other pages, consisting of a single main content section with an embedded Wix Donations widget, plus the standard header and footer:

1. **Header** - Standard site navigation with logo
2. **Donation Section** - Hero heading + donation form widget (frequency selector, amount selector, donate button)
3. **Footer** - Navigation links, contact info, social bar, copyright

---

## Navigation (Header)

**Site logo (top-left):** Emergent Works logo image (circular green/nature logo)
- **Logo image URL:** `https://static.wixstatic.com/media/1926b3_c4e60c1d365747ffb205d6a43b92fd66~mv2.png`
- **Logo dimensions:** 285x285 (displayed as smaller), original 570x570
- **Alt text:** (empty)

**Navigation items:**
- Home
- About Us
- Programs
- Impact
- Our Team
- Partner With Us
- **Donate** (current/selected)
- More (overflow menu)

**Header also includes:** Log In button (with member avatar icon)

---

## Main Content: Donation Section

### Layout
- **Two-column layout** with the page split roughly 50/50:
  - **Left column:** Full-height photo of a young person performing at a "T.RAP Community Concert" event. The photo spans roughly half the viewport width and the full section height.
  - **Right column:** Donation form with heading, description, frequency/amount selectors, donate button, and share icons.
- Background: Cream/beige (`#FFFAF0` or similar), consistent with the rest of the site palette — no separate page-specific background color.
- The donation content appears within a Wix Donations widget (Wix ecom-platform-checkout integration)
- The donation form uses radio-button style selectable containers for frequency and amount options

### Left Column Photo
- **Image file:** `Copy of 288A9727 (1)_edited.jpg`
- **Alt text:** "Copy of 288A9727 (1)_edited.jpg"
- **URL (small/blurred thumbnail):** `https://static.wixstatic.com/media/1926b3_bf149becd1b846d48ea7319f8cf02b4a~mv2.jpg/v1/fill/w_123,h_116,al_c,q_80,usm_0.66_1.00_0.01,blur_2,enc_avif,quality_auto/1926b3_bf149becd1b846d48ea7319f8cf02b4a~mv2.jpg`
- **Base URL:** `https://static.wixstatic.com/media/1926b3_bf149becd1b846d48ea7319f8cf02b4a~mv2.jpg`
- Displayed as the full-height left column of the two-column layout. Shows a young person performing at a "T.RAP Community Concert" event.

### Heading

**Heading (h2):**
> Make a difference

- The heading uses a serif/italic font (likely Fraunces), consistent with the site's heading typography.

### Subheading / Description Text

> Change starts with people like you. Your donation helps make a real impact, one action at a time. Together, we can do more.

---

## Donation Form Widget (Wix Donations)

The donation form is powered by Wix's built-in Donations widget, integrated with their ecom-platform-checkout system. The form contains the following interactive elements:

### Frequency Selector

**Label:** "Frequency"

Radio button options (selectable containers):
| Option | Input ID Suffix | Default |
|--------|----------------|---------|
| **One time** | `frequency-ONE-TIME` | Yes (checked) |
| **Monthly** | `frequency-MONTH` | No |
| **Yearly** | `frequency-YEAR` | No |

### Amount Selector

**Label:** "Amount"

Radio button options (selectable containers):
| Amount | Input ID Suffix | Default |
|--------|----------------|---------|
| **$50** | `amount-50` | Yes (checked) |
| **$100** | `amount-100` | No |
| **$200** | `amount-200` | No |
| **$1,000** | `amount-1000` | No |

### Donate Button

**Button text:** "Donate $50 " (reflects the currently selected amount, default $50)
- **aria-label:** "Donate $50 "
- **Button color:** Dark green (`#20493C`), matching the site palette
- The button text dynamically updates based on the selected amount
- Clicking initiates the Wix ecom checkout flow

### Widget Status Indicators (Hidden/Conditional)
The following status messages exist in the widget markup (likely shown conditionally):
- **"Goal reached!"** - Displayed when a fundraising goal has been met
- **"Deadline passed"** - Displayed when a campaign deadline has expired

### Payment Integration
- The checkout is powered by **Wix ecom-platform-checkout** (EcomCheckout)
- Payment methods include **PayPal** (referenced in the codebase)
- Standard Wix checkout flow with credit card support
- Cart icon component is loaded (`ecom-platform-cart-icon`)

### Share Buttons
The page includes a social sharing section with:
- **Facebook** - shares `https://tine945.wixsite.com/emergent-works-1/donate`
- **X (Twitter)** - shares via `https://twitter.com/intent/tweet?url=...`
- **WhatsApp** - shares via `https://api.whatsapp.com/send/?phone&text=...`
- **Copy link** - copies the page URL to clipboard

---

## All Image URLs

### Site Logo
| Description | URL |
|-------------|-----|
| Logo (285x285) | `https://static.wixstatic.com/media/1926b3_c4e60c1d365747ffb205d6a43b92fd66~mv2.png/v1/fill/w_285,h_285,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/1926b3_c4e60c1d365747ffb205d6a43b92fd66~mv2.png` |
| Logo (570x570, hi-res) | `https://static.wixstatic.com/media/1926b3_c4e60c1d365747ffb205d6a43b92fd66~mv2.png/v1/fill/w_570,h_570,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/1926b3_c4e60c1d365747ffb205d6a43b92fd66~mv2.png` |

### Left Column Photo (Donation Section)
| Description | URL |
|-------------|-----|
| Left column photo (thumbnail, 123x116) | `https://static.wixstatic.com/media/1926b3_bf149becd1b846d48ea7319f8cf02b4a~mv2.jpg/v1/fill/w_123,h_116,al_c,q_80,usm_0.66_1.00_0.01,blur_2,enc_avif,quality_auto/1926b3_bf149becd1b846d48ea7319f8cf02b4a~mv2.jpg` |
| Base (unprocessed) | `https://static.wixstatic.com/media/1926b3_bf149becd1b846d48ea7319f8cf02b4a~mv2.jpg` |

### Footer Social Bar Icons
| Platform | Icon URL (39x39) | Icon URL (78x78, hi-res) |
|----------|-------------------|--------------------------|
| Facebook | `https://static.wixstatic.com/media/4057345bcf57474b96976284050c00df.png/v1/fill/w_39,h_39,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/4057345bcf57474b96976284050c00df.png` | `https://static.wixstatic.com/media/4057345bcf57474b96976284050c00df.png/v1/fill/w_78,h_78,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/4057345bcf57474b96976284050c00df.png` |
| Instagram | `https://static.wixstatic.com/media/e1aa082f7c0747168d9cf43e77046142.png/v1/fill/w_39,h_39,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/e1aa082f7c0747168d9cf43e77046142.png` | `https://static.wixstatic.com/media/e1aa082f7c0747168d9cf43e77046142.png/v1/fill/w_78,h_78,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/e1aa082f7c0747168d9cf43e77046142.png` |
| LinkedIn | `https://static.wixstatic.com/media/45bce1d726f64f1999c49feae57f6298.png/v1/fill/w_39,h_39,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/45bce1d726f64f1999c49feae57f6298.png` | `https://static.wixstatic.com/media/45bce1d726f64f1999c49feae57f6298.png/v1/fill/w_78,h_78,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/45bce1d726f64f1999c49feae57f6298.png` |
| YouTube | `https://static.wixstatic.com/media/aa0402eb9ba2430d9d0620b59556efca.png/v1/fill/w_39,h_39,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/aa0402eb9ba2430d9d0620b59556efca.png` | `https://static.wixstatic.com/media/aa0402eb9ba2430d9d0620b59556efca.png/v1/fill/w_78,h_78,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/aa0402eb9ba2430d9d0620b59556efca.png` |

**Note:** The footer social bar links currently point to Wix's own social profiles (facebook.com/wix, instagram.com/wix, youtube.com/user/Wix, linkedin.com/company/wix-com), NOT to Emergent Works' actual social media accounts. These are placeholder links from the Wix template.

---

## Footer

### Footer Navigation Links
- Home (`/emergent-works-1/`)
- About Us (`/emergent-works-1/about-us`)
- Programs (`/emergent-works-1/programs`)
- Impact (`/emergent-works-1/impact`)
- Donate (`/emergent-works-1/donate`)

### Contact Information
- **Email:** info@emergentworks.org (mailto link)
- **Address:** 424 W 54th St., New York, NY 10019

### Copyright
> (c) 2025 by Emergent Works. All rights reserved.

### Social Bar
See "Footer Social Bar Icons" table above. Platforms: Facebook, Instagram, LinkedIn, YouTube.

---

## Color Palette (from CSS Variables)

### Primary Site Colors (from :root CSS variables)
| Variable | RGB Value | Hex Equivalent | Usage |
|----------|-----------|----------------|-------|
| `color_11` | 255,255,255 | `#FFFFFF` | Background primary (white) |
| `color_12` | 255,250,240 | `#FFFAF0` | Background secondary (cream/floral white) |
| `color_14` | 5,40,18 | `#052812` | Text secondary (very dark green) |
| `color_15` | 5,40,18 | `#052812` | Text primary (very dark green) |
| `color_17` | 5,40,18 | `#052812` | Custom color 3 (very dark green) |
| `color_18` | 68,94,77 | `#445E4D` | Action color (medium green) |
| `color_36` | 5,40,18 | `#052812` | Fill base 1 (very dark green) |
| `color_37` | 255,255,255 | `#FFFFFF` | Fill base 2 (white) |
| `color_38` | 68,94,77 | `#445E4D` | Fill base shade 1 (medium green) |
| `color_39` | 130,148,137 | `#829489` | Disabled color / base shade 2 |
| `color_40` | 193,201,196 | `#C1C9C4` | Fill base shade 3 (light gray-green) |
| `color_41` | 36,88,42 | `#24582A` | Accent 1 (forest green) |
| `color_42` | 255,250,240 | `#FFFAF0` | Accent 2 / background (cream) |
| `color_43` | 23,55,26 | `#17371A` | Accent 3 (dark green) |
| `color_44` | 32,73,60 | `#20493C` | Accent 4 (teal-green) |

### Donate Page-Specific Colors
| Color | Hex | Usage |
|-------|-----|-------|
| Cream/floral white | `#FFFAF0` | Page background (matches site-wide palette) |
| Dark green | `#20493C` | Donate CTA button background |
| White | `#fff` | Card/form background, button text |

---

## Typography

### Font Families
| Variable | Font Stack | Usage |
|----------|-----------|-------|
| `font_0` | `fraunces_120pt-light, serif` | Display/Hero (bold, 106px) |
| `font_2` | `fraunces_120pt-light, serif` | H2 heading (bold, 79px) |
| `font_3` | `fraunces_120pt-light, serif` | H3 heading (bold, 55px) |
| `font_4` | `fraunces_120pt-light, serif` | H4 heading (bold, 37px) |
| `font_5` | `avenir-lt-w01_35-light1475496, sans-serif` | H5 (normal, 25px) |
| `font_6` | `avenir-lt-w01_35-light1475496, sans-serif` | H6 (normal, 20px) |
| `font_7` | `avenir-lt-w01_35-light1475496, sans-serif` | Body large (normal, 19px) |
| `font_8` | `avenir-lt-w01_35-light1475496, sans-serif` | Body medium (normal, 17px) |
| `font_9` | `avenir-lt-w01_35-light1475496, sans-serif` | Body small (normal, 15px) |
| `font_10` | `din-next-w01-light, sans-serif` | Body x-small (normal, 12px) |

**Summary:**
- **Headings:** Fraunces 120pt Light (serif) -- used for h1-h4 in bold weight
- **Body text:** Avenir LT W01 35 Light (sans-serif) -- used for h5, h6, and body text
- **Small text:** DIN Next W01 Light (sans-serif)

---

## Internal Page Links (Site Navigation)

| Page | Path |
|------|------|
| Home | `/emergent-works-1/` |
| About Us | `/emergent-works-1/about-us` |
| Programs | `/emergent-works-1/programs` |
| Impact | `/emergent-works-1/impact` |
| Our Team | `/emergent-works-1/our-team` |
| Partner With Us | `/emergent-works-1/partner-with-us` |
| Donate | `/emergent-works-1/donate` |

---

## Complete Text Content (All Visible Text)

### Header Area
- "Emergent Works" (site title/logo text)
- Navigation: Home, About Us, Programs, Impact, Our Team, Partner With Us, Donate, More
- "Log In"

### Donation Section
- **Heading:** "Make a difference"
- **Description:** "Change starts with people like you. Your donation helps make a real impact, one action at a time. Together, we can do more."
- **Frequency label:** "Frequency"
- **Frequency options:** "One time", "Monthly", "Yearly"
- **Amount label:** "Amount"
- **Amount options:** "$50", "$100", "$200", "$1,000"
- **CTA button:** "Donate $50 " (dynamically reflects selected amount)
- **Hidden status messages:** "Goal reached!", "Deadline passed"

### Share Buttons
- "Facebook"
- "X (Twitter)"
- "WhatsApp"
- "Copy link"

### Footer
- Navigation: Home, About Us, Programs, Impact, Donate
- "info@emergentworks.org"
- "424 W 54th St."
- "New York, NY 10019"
- "(c) 2025 by Emergent Works. All rights reserved."

---

## Layout & Design Notes

1. **Page is very minimal** - Unlike other EW pages (About Us, Programs, Impact) which have multiple content sections, the Donate page is essentially a single-purpose page with just the donation widget.

2. **Donation widget is Wix's built-in donation component** - It uses Wix's ecom checkout infrastructure with selectable container inputs for frequency and amount. This is not a custom form but a pre-built Wix widget.

3. **Two-column layout with photo** - The page uses a two-column layout: a full-height event photo on the left and the donation form on the right. The background is cream/beige (`#FFFAF0`), matching the site-wide palette.

4. **Default $50 selection** - Both the frequency (One time) and amount ($50) have default selections, making one-click donation quick.

5. **No impact statements on the donate page** - Unlike many nonprofit donation pages, this page does not include donor impact descriptions (e.g., "$50 provides..."), testimonials, or program highlights. The only impact-related text is the generic tagline "Your donation helps make a real impact, one action at a time." The left-column event photo does help convey community impact visually.

6. **Social sharing is built in** - The Wix donation widget includes sharing buttons for Facebook, X/Twitter, WhatsApp, and copy-link functionality.

7. **No custom amount option visible** - The form only shows four preset amounts ($50, $100, $200, $1,000). There is no visible "Other" or custom amount input field in the rendered HTML.

8. **Footer social links are Wix defaults** - The social media links in the footer point to Wix's own profiles, not Emergent Works' actual social accounts. This suggests the site is still using template defaults for these links.

9. **Wix ads banner** - The page includes a Wix free site banner at the top ("This website was built on Wix. Create yours today. Get Started"), indicating this is on a free Wix plan.

---

## Recommendations for Redesign

1. **Add donation impact statements** - Include clear descriptions of what each donation amount provides (e.g., "$50 covers one mentoring session", "$1,000 sponsors a student for one semester").

2. **Add a custom amount option** - Allow donors to enter their own amount in addition to the preset options.

3. **Include trust signals** - Add nonprofit tax status (501(c)(3)) information, EIN number, and any relevant certifications.

4. **Add testimonials or success stories** - Brief quotes from program participants or mentors to motivate donations.

5. **Color scheme is already unified** - The donate page now uses the site-wide cream/beige background and dark green (`#20493C`) donate button, consistent with the rest of the site's green-and-cream palette. No color unification needed.

6. **Add recurring donation emphasis** - Monthly/recurring donations are typically more valuable for nonprofits. Consider making this more prominent or adding benefits for recurring donors.

7. **Remove Wix branding** - The free-tier Wix banner should be removed in the redesign.

8. **Fix social media links** - Replace Wix default social links with actual Emergent Works social media profiles.
