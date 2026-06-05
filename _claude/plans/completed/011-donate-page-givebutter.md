# Plan: Donate Page with Givebutter Widget

## Metadata

- **Number:** 011
- **Status:** draft
- **Created:** 2026-06-04
- **Last refreshed:** 2026-06-04
- **Refinement count:** 1
- **Plan type:** standard-feature
- **Verification Policy:** Adaptive (default)
- **Related PRD:** N/A

## Executive Summary

Create a dedicated donation page at `/donate/` that embeds Givebutter's donation widget pointing at the same campaign currently used on the live `https://emergentworks.org/donate/` page (the `emergentworks` Givebutter campaign). The page follows the site's established page pattern — `PageHero` at top, `st-section` content blocks below — and mirrors the Givebutter campaign-page layout the user referenced: **story content on the left, donation widget on the right** (two-column on desktop, stacked on mobile, widget first on mobile so the donate action is immediately reachable).

The story copy is written fresh from the site's **current, verified** facts and data files — not copied from the outdated live donate page (which cites old tier amounts like $15/$50/$150/$500 and a "$500 supports a mentee" framing). Below the two-column section, the page showcases the donor levels from `src/data/donation.ts` ($50/$100/$250/$1,000) as impact cards, reusing the visual pattern already proven on `get-involved.astro`, so donors understand exactly what each level buys.

Finally, the site's existing donate entry points (header "Donate" button, get-involved "Make a Donation" mailto link) are repointed to the new `/donate/` page so the page is actually reachable.

## Current State

- **No `/donate` route exists** in this codebase. The live `emergentworks.org/donate/` page is from the *old* site (single-column, outdated tiers, no visible widget embed in fetched markup).
- **Donation data exists** at `src/data/donation.ts`: `donationTiers` (4 tiers with `amount`, `label`, `impact`) and `donationTrust` (501(c)(3) / EIN disclosure). Both are currently consumed only by `src/pages/get-involved.astro` (donation card grid at `get-involved.astro:144-166`).
- **Donate CTAs today:**
  - `Header.astro:33` and `:43` — "Donate" buttons link to `/get-involved/#donate`.
  - `get-involved.astro:162` — "Make a Donation" is a `mailto:` link (no online giving path at all).
- **Page pattern to follow:** every page (`about`, `impact`, `get-involved`, etc.) uses `Layout` → `Header` → `PageHero` (background image + kicker + title + subtitle) → `st-section` blocks → `Footer`, with scoped `<style>` blocks and `st-*` utility classes from `global.css` (e.g., `st-grid-60-40`, `st-kicker`, `st-divider`, `data-reveal`).
- **Hero images available for reuse** in `src/assets/`: `hero/community.jpg` (homepage), `heroes/get-involved.jpg`, `heroes/impact.jpg`, `impact/community-engagement.jpg`, etc.
- **Verified content sources** for the new story copy:
  - `src/data/stats.ts` — 284 graduates, 73% employed, $2+ above NYC minimum wage.
  - `src/data/organization.ts` — mission, extendedMission, founded 2020, EIN 85-1197743, staff stats (88% alumni, 75% system-impacted, 38% female-identifying).
  - `src/data/programs.ts` — real T.RAP / TECK program descriptions (`programs` array and `programApproach` only).
  - `src/data/donation.ts` — current tier impacts and trust statement.
  - `src/data/testimonials.ts` — real participant/mentor quotes.
- **⚠ Excluded source:** `expandedProgramDetails` in `programs.ts` is flagged `fabricated: true`. The donate page copy must NOT draw facts from it.
- **Givebutter campaign:** `https://givebutter.com/emergentworks` ("Donate to Emergent Works", verified 501(c)(3), heading "Become a sustainable donor!"). The page is JS-rendered, so the exact widget/account IDs could not be extracted — see Blocking question.

## Assumptions

- [x] The site builds with `npm run build` and has no test/lint/typecheck scripts — verified in `package.json` (only `dev`, `build`, `preview`, `astro` scripts exist). DoD lines for test/lint/typecheck are struck accordingly.
- [x] `donationTiers` in `src/data/donation.ts` represents the *current* donor levels the user wants showcased ($50/$100/$250/$1,000) — these are the levels in the "donor component" the user referenced on `get-involved.astro`.
- [x] The Givebutter campaign slug for the current campaign is `emergentworks` — the user supplied `https://givebutter.com/emergentworks` as the campaign to point at.
- [ ] The existing donation card grid on `get-involved.astro` stays as-is; the donate page reuses the same data (and a similar card treatment) rather than moving it.
- [x] Embed will use the official Givebutter dashboard widget snippet (decided 2026-06-04) — the iframe-equivalence question is moot; the dashboard snippet is authoritative for campaign targeting.
- [x] The donate page is statically rendered with zero client JS apart from the Givebutter embed itself (no React island needed) — confirmed by user 2026-06-04.

## Open Questions & Decisions

### Execution Policy

These settings control how phases verify completion. They can be changed at any time via `/dr-plan @[this-plan] answer questions` — they are not terminal decisions.

- [ ] **Verification Policy** [OPEN] Current: Adaptive (default)
  Last changed: never

  How should Phase Exit Gates verify completion?
  - Option A (Always): Every phase spawns `project-management:plan-verifier`. Highest rigor, highest token cost.
  - Option B (Adaptive): Each phase is annotated at create-time with `<!-- verifier-recommendation: yes|no -->`. The verifier runs only on phases the model judged worth the cost.
  - Option C (Never): No verifier subagent. Agent self-review only. Lowest cost, lowest rigor.

### Blocking

Must resolve before implementation starts.

- [x] [DECIDED: 2026-06-04] **Which Givebutter embed method, and with what exact code?** Donations route by account/campaign ID — this must NOT be guessed or reconstructed.
  > **Decision:** Option A — official widget embed snippet from the Givebutter dashboard.
  > **Rationale:** Most polished look, matches "Givebutter's widget" in the request, and guarantees the embed targets the exact same campaign as the current live donate page (IDs come from the dashboard, never guessed).

- [x] [DECIDED: 2026-06-04] **Paste the verbatim widget embed snippet.** Both parts provided by the user from the Givebutter dashboard. The implementer must use this code byte-for-byte (IDs are user-supplied, not reconstructed):
  > **Loader script** (place once, ideally in `<head>` via the page or Layout head slot):
  > ```html
  > <script
  >   async
  >   src="https://widgets.givebutter.com/latest.umd.cjs?acct=Dmyv83PBiHwhPXgd&p=other"
  > ></script>
  > ```
  > **Widget element** (place in the right-hand column where the donation form renders):
  > ```html
  > <givebutter-widget id="jNOdoL"></givebutter-widget>
  > ```

### Non-Blocking

Can resolve during implementation.

- [x] [DECIDED: 2026-06-04] **Hero image choice.**
  > **Decision:** `src/assets/hero/community.jpg`.
  > **Rationale:** Community group shot — "your support powers this community" framing; currently the homepage hero, so reuse is not side-by-side with /donate.

- [x] [DECIDED: 2026-06-04] **Header Donate button target.**
  > **Decision:** Repoint `/get-involved/#donate` → `/donate/` in both desktop (`Header.astro:33`) and mobile (`Header.astro:43`) navs.
  > **Rationale:** The header Donate button becomes the primary entry to the new donation page with the live widget.

- [x] [DECIDED: 2026-06-04] **Get-involved "Make a Donation" CTA.**
  > **Decision:** Replace the `mailto:` link at `get-involved.astro:162` with a link to `/donate/`.
  > **Rationale:** Replaces the email-only path with the actual online giving page. The on-page `#donate` anchor for the way-card stays working.

- [x] [DECIDED: 2026-06-04] **Add "Donate" to `navLinks`?**
  > **Decision:** No — keep it as the styled button only (current pattern), just repointed.
  > **Rationale:** Keeps text nav links + distinct gold Donate button; avoids duplicate "Donate" items in the header.

## Success Criteria

Plan-level outcomes. Flipping all of these is how we know the plan succeeded.

- [x] `/donate/` builds and renders with the site's standard chrome (Header, PageHero, Footer) and is included in the generated sitemap.
- [x] The Givebutter embed loads on the page and targets the same campaign as `givebutter.com/emergentworks`, using embed code sourced from the resolved Blocking question (never reconstructed). *(Live form verified in-browser: "Become a sustainable donor" campaign tiers render.)*
- [x] Desktop layout: story content left, donation widget right (sticky), mirroring the Givebutter campaign-page format. Mobile: stacked, widget reachable near the top.
- [x] Story copy is built only from verified sources (`stats.ts`, `organization.ts`, `programs.ts` non-fabricated sections, `donation.ts`, `testimonials.ts`) — no outdated figures from the old donate page ($15/$150/$500 tiers, "$500 supports a mentee") and nothing from `expandedProgramDetails`. *(Plan-verifier cross-checked every claim.)*
- [x] Donor levels from `donationTiers` are showcased with their impact descriptions, plus the `donationTrust` disclosure.
- [x] Header "Donate" buttons and the get-involved donation CTA route to `/donate/` (per resolved OPEN defaults).

## Definition of Done

Every Phase Exit Gate must confirm these before flipping any `[x]` in the phase:

- Build passes: `npm run build`
- ~~Tests pass~~ — struck: no test runner configured in this repo (see Assumptions).
- ~~Lint clean~~ — struck: no lint script/config in this repo.
- ~~Typecheck clean~~ — struck: no `@astrojs/check` installed and no typecheck script; `astro build` surfaces template/TS errors.

**Reminder (CLAUDE.md):** do NOT start `npm run dev` / `npm run preview` from Claude Code. Visual verification requires the developer to start the server.

## Implementation Plan

### Phase 1: Build the /donate page

#### Tasks

- [x] Create `src/pages/donate.astro` following the established page pattern (`Layout` → `Header currentPath="/donate/"` → `PageHero` → sections → `Footer`).
- [x] **Hero:** `PageHero` with the resolved hero image (default `hero/community.jpg`), donation-focused kicker/title/subtitle (e.g., kicker "Support", title in the site's two-line `<br/>` style, subtitle grounded in the mission from `organization.ts`).
- [x] **Two-column section** (story left ~60%, widget right ~40% — model on `st-grid-60-40` or a custom grid like get-involved's patterns):
  - Left: fresh story copy drafted ONLY from verified sources — mission/extendedMission (`organization.ts`), what programs do (T.RAP/TECK descriptions from `programs.ts` `programs`/`programApproach` arrays), current impact stats woven in (284 graduates, 73% employed, $2+ above NYC minimum wage from `stats.ts`), and optionally one real testimonial quote from `testimonials.ts`. Tone/structure modeled on the Givebutter campaign-page format (short headline, narrative paragraphs, stat highlights), NOT the outdated live page's facts. Explicitly exclude `expandedProgramDetails` (flagged `fabricated: true`).
  - Right: the Givebutter embed (verbatim code from the resolved Blocking question — loader script `acct=Dmyv83PBiHwhPXgd` + `<givebutter-widget id="jNOdoL">`) in a card-style container; `position: sticky` within the column on desktop so the form stays in view while reading. Note: in Astro, mark the loader as `<script is:inline async src="...">` so Astro doesn't process/bundle the third-party script; keep the URL and IDs byte-identical.
- [x] **Donor levels section:** render `donationTiers` from `src/data/donation.ts` as impact cards (reuse/adapt the `donation-card` pattern from `get-involved.astro:152-160`) under a heading that frames "what your gift buys"; include `donationTrust` disclosure text beneath.
- [x] **Responsive behavior:** below ~900px the two columns stack with the widget above or immediately after the story intro (donate action must not be buried); donor-level grid collapses 4→2→1 like get-involved's.
- [x] SEO: set a descriptive `title` (and description if `Layout` supports it — check `Layout.astro` props) for the page.

#### Verification

- [x] Run `npm run build` — expected: success, `dist/donate/index.html` emitted.
- [x] Read `dist/donate/index.html` (or the source) — expected: Givebutter embed markup present and byte-identical to the user-provided/resolved embed code; no occurrence of outdated figures (`$15`, `$150`, `$500` tier framing) or fabricated-source content. *(Note: astro-compress strips attribute quotes in dist — `id=jNOdoL` — but the ID value and acct query string are intact; source is byte-identical.)*
- [x] Read `dist/sitemap-*.xml` after build — expected: `/donate/` URL present (verified in `dist/sitemap-0.xml`).
- [x] Grep `src/pages/donate.astro` for `expandedProgramDetails` — expected: no matches.

#### Acceptance Criteria

- `/donate/` page exists with hero, left-story/right-widget layout, and donor-level cards sourced from `donationTiers`.
- All factual claims in the copy trace to a verified data file (`stats.ts`, `organization.ts`, `programs.ts` non-fabricated, `donation.ts`, `testimonials.ts`).
- Embed code matches the Blocking-question resolution exactly.
- Build is green.

#### Phase Exit Gate

<!-- verifier-recommendation: yes — this phase produces the user-visible contract (page copy + donation embed); embed correctness routes real money and copy accuracy requires semantic evaluation against the verified-sources rule, which build commands cannot check. -->

- [x] Run Definition of Done commands (see plan header). All must pass. *(npm run build — green, 9 pages built.)*
- [x] **Spawn plan-verifier.** Invoke `subagent_type="project-management:plan-verifier"` with the plan file path and phase number. Wait for its report. *(2026-06-04: verifier reported PASS on every task and acceptance criterion; runtime widget rendering deliberately deferred to Phase 3 Playwright check.)*
- [x] **Apply verification report.** Flip `[x]` only for tasks the verifier reports as PASS. Keep `[ ]` for FAIL and UNVERIFIED with a note referencing the verifier's reasoning. *(All PASS — all flipped.)*
- [x] **Agent self-review.** Re-read Tasks above, confirm the verifier's recommendations are reflected, note any UNVERIFIEDs that need follow-up in future phases or the Retro. *(No UNVERIFIEDs. Verifier observation: loader script lives in body next to the widget rather than `<head>` — within spec.)*

### Phase 2: Wire site entry points to /donate

#### Tasks

- [x] Repoint header "Donate" buttons (`Header.astro:33` desktop, `Header.astro:43` mobile) from `/get-involved/#donate` to `/donate/` (per OPEN default; skip if resolved otherwise).
- [x] Update `get-involved.astro:162`: replace the `mailto:` "Make a Donation" CTA with a link to `/donate/` (per OPEN default).
- [x] Sweep for any other donate-intent links (`Grep` for `#donate`, `Donation%20Inquiry`, `mailto:.*donat` across `src/`) and repoint where it makes sense; leave the get-involved `#donate` way-card anchor working. *(Only remaining match: the way-card's own `#donate` anchor — intentionally kept; Footer has no donate links.)*

#### Verification

- [x] Run `npm run build` — expected: success.
- [x] Grep `src/` for `/get-involved/#donate` — expected: no remaining header-button matches (the way-card's internal `#donate` anchor on get-involved itself is fine).
- [x] Read `dist/index.html` header markup — expected: Donate button href is `/donate/`. *(Both desktop and mobile buttons emit `href=/donate/`.)*

#### Acceptance Criteria

- Every primary donate CTA on the site routes to `/donate/`.
- No dead anchors introduced; `#donate` section on get-involved still exists for the way-card link.
- Build is green.

#### Phase Exit Gate

<!-- verifier-recommendation: no — small, mechanical href edits fully covered by the grep/build Verification steps above. -->

- [x] Run Definition of Done commands (see plan header). All must pass. *(npm run build — green.)*
- [x] **Agent self-review.** Re-read all Tasks above. Flip `[x]` only for tasks whose Verification passed. Any failing or skipped task stays `[ ]` with a short note explaining why. Under-report beats over-report. *(All three tasks verified via grep + built-output inspection; `#donate` section on get-involved preserved for the way-card.)*

### Phase 3: Visual verification

#### Tasks

- [x] Ask the developer to start the dev or preview server (per CLAUDE.md, Claude Code must not start it). Confirm it is running before proceeding. *(Developer started dev server at localhost:4321.)*
- [x] With Playwright MCP against the running server, load `/donate/`: confirm the hero renders, the Givebutter widget/iframe actually loads its form (not a broken frame), the two-column layout holds on desktop viewport, and the stacked layout works at a mobile viewport (~390px). *(Widget loaded the live campaign form — frequency tabs, suggested amounts $20.20–$1,000, "Step 1 of 2: Choose amount". Desktop 1440px two-column holds; mobile 390px stacks with widget first at y≈517px, story at y≈1445px.)*
- [x] Click the header "Donate" button from the homepage — confirm navigation to `/donate/`. *(Navigated to /donate/, title "Donate — Emergent Works".)*
- [x] Capture a screenshot of the page for the user's review. *(Saved to `.playwright-mcp/donate-desktop-full.png`, `donate-desktop-twocol.png`, `donate-mobile-widget.png` — gitignored.)*

#### Verification

- [x] Playwright snapshot of `/donate/` — expected: story copy left, widget right, donor-level cards present, no console errors from the embed beyond third-party noise. *(Accessibility snapshot confirms all sections; 0 console errors, 6 benign warnings across the session.)*
- [x] Mobile-viewport snapshot — expected: stacked layout, donate form reachable without excessive scrolling. *(Form is the first content block after the hero on mobile.)*

#### Acceptance Criteria

- Widget visibly loads the Emergent Works campaign form in a real browser.
- Layout verified at desktop and mobile widths.
- Screenshot shared with the user.

#### Phase Exit Gate

<!-- verifier-recommendation: no — this phase IS the verification (live-browser checks); a fresh-context verifier could not improve on direct Playwright evidence and cannot start the server either. -->

- [x] Run Definition of Done commands (see plan header). All must pass. *(npm run build green after Phase 2; Phase 3 made no code changes.)*
- [x] **Agent self-review.** Re-read all Tasks above. Flip `[x]` only for tasks whose Verification passed. Any failing or skipped task stays `[ ]` with a short note explaining why (e.g., developer unavailable to start the server — note and escalate rather than skipping silently). Under-report beats over-report. *(All tasks verified live in-browser. One observation: full-page screenshots require forcing `st-revealed` on `[data-reveal]` elements because the IntersectionObserver reveal animation leaves below-fold sections at opacity 0 — site-wide behavior, not specific to this page.)*

## Refinement History

- **2026-06-04:** Initial plan creation.
- **2026-06-04:** Resolved 1 blocking + 4 non-blocking questions, verified 2 assumptions. Verification Policy reviewed and kept at Adaptive. Remaining blocker: verbatim Givebutter widget embed snippet must be pasted before implementation.
- **2026-06-04:** User supplied the verbatim Givebutter embed (loader script `acct=Dmyv83PBiHwhPXgd` + widget id `jNOdoL`). All blocking questions now resolved — plan ready to move to in_progress.

## Completion

After the final phase's Exit Gate passes, the executing agent performs these steps without prompting the user:

1. Populate the Retro section below from observable execution signals (what worked, what didn't, learnings). Write in terse bullet form.
2. Move this plan file from `_claude/plans/in_progress/` to `_claude/plans/completed/`.

If the final phase's Exit Gate has unresolved FAILs or UNVERIFIEDs after the allowed retries, do NOT move the file or write the retro. Escalate to the user with full context and stop.

## Retro

### What worked

- Resolving the Givebutter embed as a hard `[AWAITING]` blocker (never reconstructing IDs) — the user's first paste was only the widget element; the explicit two-part requirement caught the missing loader script before any code was written.
- Sourcing all copy from the data files (`stats.ts`, `organization.ts`, `donation.ts`, `testimonials.ts`) made the verifier's fact-check fully mechanical — every claim traced, zero rework.
- Reusing get-involved's `donation-card` pattern and the site's `st-*` utilities — the page matched the design system on the first build.
- Phase 3 live-browser check confirmed the widget renders the real campaign form, which static builds cannot prove.

### What didn't

- First placement of the loader `<script>` was after `</Layout>`, which would have emitted it past `</html>`; caught immediately and moved inside the widget card.
- Full-page Playwright screenshots initially showed blank sections — the site-wide `[data-reveal]` IntersectionObserver leaves below-fold content at opacity 0; had to force `st-revealed` before capture.

### Learnings

- This repo's DoD is build-only (`npm run build`); no test/lint/typecheck scripts exist — future plans should strike those lines up front rather than discovering it mid-plan.
- astro-compress strips attribute quotes in dist HTML (`id=jNOdoL`), so "byte-identical embed" checks must be asserted against source, with dist verified semantically (ID values and query strings intact).
- For visual QA on this site, always add `st-revealed` to `[data-reveal]` elements before full-page screenshots; `window.scrollTo` also needs `behavior: 'instant'` because of global `scroll-behavior: smooth`.
