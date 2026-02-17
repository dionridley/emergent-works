# Emergent Works - Branding Reference

> Source: `_claude/resources/branding/EW Brand Guidelines.pdf` (11 pages)
> Note: The PDF is primarily visual/graphical. Text extraction captured the key specs below.
> For full visual reference, see the original PDF.

---

## Logo

- **Primary form:** "emergent works" wordmark (lowercase)
- **Alternate form:** "EW" abbreviated mark / icon
- **Usage rules:**
  - Use clear space around the logo
  - Do NOT stretch, rotate, or change colors
- **Logo files:** See original PDF for logo artwork. Will need to be exported/recreated for web use.

## Brand Colors

| Color | Hex | Usage |
|-------|-----|-------|
| Deep Green | `#20493C` | Primary brand color |
| Golden Yellow | `#FFCB70` | Accent / highlight |
| Warm Cream | `#FFF8ED` | Background / light areas |
| Near Black | `#242424` | Text / dark elements |

### Color Notes from Wix Site
The live Wix site also uses these colors in various contexts:
- `#FFFFFF` (white) - text on dark backgrounds
- `#080808` - near-black text
- `#5f6360` - gray accent (used in some backgrounds)

## Typography

### Brand Guidelines Spec
| Role | Font | Weight |
|------|------|--------|
| Headings | Garet | Bold |
| Sub-headings | Garet | Regular |
| Body | Garet | Regular |

### Wix Site Fonts (Current Implementation)
The Wix site uses different fonts than the brand guide specifies (likely due to Wix font availability):
- `avenir-lt-w01_35-light1475496` (Avenir Light) - used for large headings
- `din-next-w01-light` (DIN Next Light)
- `fraunces_120pt-light` (Fraunces Light)

**Recommendation:** For the Astro rebuild, use **Garet** as specified in the brand guidelines. If Garet is unavailable as a web font, consider alternatives that match its geometric sans-serif character (e.g., Outfit, Plus Jakarta Sans, or similar).

## Tone of Voice

- **Warm** - approachable and genuine
- **Lively** - energetic and positive
- **Community-centered** - focused on people and collective impact
- **Inclusive** - welcoming to all backgrounds
- **Supportive** - encouraging and empowering

## Imagery Style

- **Active pictures** from programs, events, and graduations
- Real photos of real participants and community members
- Emphasis on engagement, learning, and celebration moments
- Should feel authentic, not stock-photo-like

## Graphics Style

- **"Wonky" icons** - hand-drawn/imperfect style icons
- Related to: program offerings, education, technology, music
- Should feel playful and approachable, not corporate
- Organic/hand-made aesthetic vs. polished/geometric

## Key Brand Elements Summary

```
Brand Personality: Warm, empowering, community-driven
Visual Mood: Energetic yet grounded, professional yet approachable
Color Palette: Deep green + golden yellow on cream, with near-black text
Typography: Geometric sans-serif (Garet family)
Iconography: Hand-drawn, "wonky", education/tech/music themed
Photography: Real community moments, active/engaged participants
```

---

## Implementation Notes for Astro Rebuild

1. **Font Loading:** Self-host Garet or chosen alternative via `@fontsource` or local files
2. **Color System:** Define brand colors as CSS custom properties / Tailwind theme values
3. **Image Treatment:** Maintain authentic photography style; avoid heavy filters
4. **Icon System:** Source or create hand-drawn style icons matching the "wonky" aesthetic
5. **Responsive:** Ensure brand colors and typography scale properly across breakpoints
6. **Accessibility:** Verify color contrast ratios meet WCAG 2.1 AA standards:
   - `#20493C` on `#FFF8ED` = good contrast for text
   - `#FFCB70` on `#20493C` = check contrast, may need darker text
   - `#242424` on `#FFF8ED` = excellent contrast
