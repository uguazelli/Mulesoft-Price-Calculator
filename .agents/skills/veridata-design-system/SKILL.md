---
name: veridata-design-system
description: Use when creating, editing, or reviewing any visual or written content for the Veridata Pro website, landing pages, pricing pages, Odoo pages, integrations pages, marketing materials, blog posts, proposals, pitch decks, or client-facing documents. Enforces the current Veridata Pro positioning, information architecture, typography, color palette, light technical UI patterns, section structures, copy voice, and anti-patterns so everything feels consistent, editorial, and trustworthy rather than like a generic automation shop. Trigger whenever the user mentions the Veridata Pro website, landing page, hero section, pricing section, Odoo page, integrations page, marketing copy, visual design, HTML/CSS work on the site, or copy that prospective clients will read.
---

# Veridata Pro Design System

## Active Visual Direction: Sturdy & Kind

The current Veridata Pro website direction is **Sturdy & Kind**. This supersedes older references in this file that describe a Fraunces/Inter editorial identity.

Use this direction for all current website UI, marketing pages, cards, diagrams, pricing blocks, lists, and forms:

- **Principle:** institutional stability with human approachability. The site should feel reliable, plainspoken, and built to last.
- **Typography:** Public Sans only. Headlines use `700`, body uses `400`, labels use `600` with modest uppercase tracking. Do not use serif display typography for new website work.
- **Palette:** warm stone/parchment surfaces, forest green structure, terracotta CTAs, grounded blue focus states. Avoid neon, purple, cyan, decorative blobs, heavy glow, and cold SaaS white/blue treatments.
- **Layout:** 8px rhythm, 24px gutters, 1280px max-width, generous but contained spacing. Desktop should feel fixed-grid and secure; mobile should be single-column with 16px margins.
- **Service pages:** Integrations, Odoo, Pricing, and Leadership should use the full `.container` width for sections. Reserve `.container-narrow` for legal/privacy or deliberately long-form reading pages.
- **Cards:** white or soft-stone surfaces, 1px neutral border, square 2px radius, no box shadow for standard cards or nested elements inside cards. Avoid outer wrapper boxes around card grids.
- **Pricing cards:** flat white bordered cards. The recommended card uses terracotta border, subtle elevation, and a top-right terracotta ribbon. No offset forest shadows.
- **Buttons:** terracotta primary buttons and outlined forest secondary buttons use square 2px geometry, no shadow, and strong Public Sans weight.
- **Lists:** individual white cards with labels such as `L01`; keep the grid plain, without background frames, dashed rails, or decorative container boxes.
- **Diagrams:** use approved image assets and simple line-art diagrams. Keep diagrams visible and uncropped; prefer `object-fit: contain` for diagram hero assets.
- **Forms:** white fields with 1px neutral border. Focus uses grounded blue border and very light blue background.

Core CSS tokens currently map to:

```css
:root {
  --ink: #061B0E;
  --paper: #FCF9F4;
  --surface: #FFFFFF;
  --surface-2: #F6F3EE;
  --surface-3: #F0EDE9;
  --rule: #DCDAD5;
  --rule-strong: #C3C8C1;
  --grid-line: rgba(67, 72, 67, 0);
  --text: #1C1C19;
  --text-muted: #434843;
  --text-dim: #737973;
  --accent: #061B0E;
  --accent-live: #4D6453;
  --terracotta: #9F4125;
  --terracotta-strong: #732107;
  --blue: #00182F;
  --button-radius: 2px;
}
```

This skill encodes the visual and editorial identity of Veridata Pro. Apply it to any client-facing artifact — website pages, emails, proposals, social posts, slide decks.

## Core aesthetic direction

Veridata Pro is a **serious, editorial, technical professional-services** brand — closer to a private advisory firm with real engineering depth than a startup SaaS. Buyers are founders, operators, CTOs, and business decision makers who need to trust the person touching their systems. They want competence, clarity, and enough technical texture to believe the work is real.

The design is:

- **Light-forward** — body sections and heroes stay warm paper/cream unless a contained dark band is specifically justified
- **Technically structured** — small green status accents, active dots, thin rules, row labels, and structured panels
- **Restrained** — generous whitespace, minimal ornamentation, no spectacle
- **Corporate-humanist** — Public Sans clarity, calm hierarchy, and businesslike structure
- **Operational** — diagrams, layer tables, and cards should feel like integration architecture, not generic marketing blocks
- **Honest** — no stock photos of people in headsets, no abstract cyber imagery, no fake badges

## Current positioning and IA

Veridata Pro helps companies connect Odoo and other business systems so teams stop copying data manually. The main buyer-facing service paths are:

- **Odoo** — customization, Odoo API integrations, data migration, ecommerce, CRM, finance workflows, WhatsApp/email/forms, AI document extraction, reporting, and Odoo partner support.
- **Integrations** — systems that do not talk to each other: CRMs, ERPs, databases, forms, ecommerce, finance tools, AI services, APIs, AWS, MuleSoft, Python/Java services, n8n, Zapier/Make audit or migration.

Navigation should stay focused:

- EN: Home, Odoo, Integrations, Pricing, Leadership, Book a Call
- PT-BR: Início, Odoo, Integrações, Preços, Liderança, Agendar Chamada
- ES-LATAM: Inicio, Odoo, Integraciones, Precios, Liderazgo, Agendar Llamada

Do not create top-level menu items for n8n, AWS, AI, MuleSoft, Python, Java, APIs, databases, Zapier, or Make. They are capabilities inside Odoo or Integrations, not separate service categories.

The homepage is a routing page, not a full service catalog. Keep it short: Hero, Start Here / Choose Your Problem, Main Problems, Services Summary, n8n vs AWS architecture choice, Pricing teaser, short credibility block, Final CTA.

## Typography

--sans: "Public Sans", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;

**Rules:**

- Use Public Sans across headings, body, labels, and UI.
- Headlines use 700 for clear hierarchy.
- Body text uses 400 with generous line-height.
- Labels, eyebrows, metadata, layer IDs, and chips use 600 with limited uppercase and modest tracking.
- Do not use serif display typography for new website work.
- Font weights: 400, 600, 700.
- Hero type can be substantially larger than previous versions. Use responsive breakpoints, not viewport-scaled font formulas.

## Color palette

```css
:root {
	--ink: #061b0e; /* Forest green — primary structure */
	--ink-2: #1b3022; /* Deep green surface */
	--ink-3: #364c3c; /* Green hover / supporting state */
	--cream: #fcf9f4; /* Warm parchment */
	--cream-2: #f6f3ee; /* Muted stone */
	--paper: #fcf9f4; /* Body section background */
	--surface: #ffffff; /* Flat cards and panels */
	--surface-2: #f6f3ee; /* Soft card wash */
	--surface-3: #f0ede9; /* Neutral inset/control fill */
	--rule: #dcdad5; /* Border / divider in light sections */
	--rule-strong: #c3c8c1; /* Stronger dividers for technical UI */
	--rule-dark: rgba(252, 249, 244, 0.16); /* Borders in dark sections */
	--grid-line: rgba(67, 72, 67, 0); /* Grid backgrounds intentionally disabled */
	--text: #1c1c19; /* Primary body text on light */
	--text-muted: #434843; /* Secondary text on light */
	--text-dim: #737973; /* Tertiary labels */
	--accent: #061b0e; /* Primary accent — forest green */
	--accent-live: #4d6453; /* Status dots, meters, and active states */
	--accent-2: #819986; /* Supporting green */
	--accent-soft: rgba(77, 100, 83, 0.10); /* Soft green background */
	--accent-line: rgba(77, 100, 83, 0.30); /* Green borders/rules */
	--warn: #9f4125; /* Warning / problem numbering */
	--terracotta: #9f4125; /* High-priority CTA */
	--terracotta-strong: #732107; /* CTA hover */
	--blue: #00182f; /* Focus states and secondary interaction */
	--button-radius: 2px; /* Current button and control geometry */
	--shadow-ambient: 0 4px 20px rgba(27, 48, 34, 0.08); /* Use sparingly */
}
```

**Usage rules:**

- Never introduce a new color without updating this file first
- The accent stays green. Do not adopt yellow/ember from references.
- Use green as a stability signal: small dots, meter fills, top rules, active card borders, and structural navigation.
- Use terracotta for high-priority CTAs.
- Use grounded blue for focus states and secondary interaction, not broad page color.
- No purple, no cyan, no bright SaaS blues — this is the opposite of generic SaaS palette.
- Most sections use `--paper` or `--cream` as background, `--text` as text.
- Gradients are allowed only as subtle surface washes or thin light rules. Do not add page-wide cross-line/grid backgrounds.
- Shadows are rare. Standard cards, buttons, and nested panels should be flat.
- Avoid glow except where a tiny status light genuinely helps the interface.

## Layout

```css
.container {
	max-width: 1280px;
	padding: 0 32px;
} /* Main content width */
.container-narrow {
	max-width: 860px;
	padding: 0 32px;
} /* Long-form copy */
section {
	padding: 96px 0;
} /* Default vertical rhythm */
```

- Heroes use `.hero-section.bg-ink` visually as a light paper hero. Current home/service heroes are balanced image heroes, not dark panels.
- Body sections use `.container` with 96px vertical padding (72px on mobile)
- Mobile breakpoint: 768px

## Current UI Patterns

These are the current live-site patterns and should override older references:

- **Home hero:** `.home-hero` is a balanced 50/50 grid. Left side is eyebrow, compact h1, lede, and CTAs; right side is `assets/images/team_collaboration.png` in `.home-hero-media`.
- **Service image heroes:** `.service-image-hero` is a balanced 50/50 grid for Integrations and Odoo. Use `assets/images/integrations.png` for integrations pages and `assets/images/odoo_integrations.jpg` for Odoo pages. Use `object-fit: contain` so square diagrams are never cropped.
- **Buttons:** use the shared 2px square button geometry. Home/service hero buttons can be tighter than global CTA buttons to keep layout balanced.
- **Tags and chips:** `.pill`, `.pill-tag`, `.architecture-tag`, `.gap-status`, `.assistant-channel-icon`, and `.assistant-feature-icon` are square forest-green blocks with cream text. Do not use rounded pills.
- **Signal card grids:** `.signal-list` should be transparent with no border/background wrapper. Only the individual `.problem-card` elements get white surfaces and borders.
- **Final CTAs:** end-of-page CTA sections use `.final-cta`: a contained dark forest-green panel on paper, cream text, and terracotta primary button.
- **Leadership terminal:** the architect terminal is a dark colorized terminal with green/blue/terracotta accents.

## Section patterns

The site uses a small set of section types. Reuse them; don't invent new ones without reason.

1. **Hero** (light stone) — eyebrow + strong Public Sans h1 + lede + CTA(s) on the left, approved image/diagram on the right. Use `.home-hero` for homepage and `.service-image-hero` for Odoo/Integrations.
2. **Signal problem list** (paper) — section-label + title + plain `.signal-list` grid with individual `.problem-card` cards using `L01`, `L02`, etc.; no outer wrapper background, box, or dashed rails.
3. **Timeline** (cream) — label + title + sub + two-column timeline (WHEN | WHAT) with tag metadata
4. **Services grid** (paper/cream) — label + title + sub + equal `.tool-card` cards with title + description + outcome tag; keep cards flat and square with restrained borders.
5. **Operating layers / technical rows** (paper) — row cards with `L01` style labels, short Public Sans titles, one concrete operational outcome, and optional small green meter bars
6. **Fit section** (dark or paper depending on surrounding rhythm) — label + title + sub + two-column Right-fit / Wrong-fit list
7. **Credentials split** (paper) — label + two-column: copy with pull-quote or dark terminal | `.stat-card` facts table.
8. **Pricing featured + entry + footnote** (cream/paper) — flat white price cards; featured card uses terracotta border/ribbon and filled terracotta button, while standard cards use outlined buttons.
9. **FAQ** (paper) — narrow container, simple Q/A rhythm, clear Public Sans questions
10. **Final CTA** (paper section with contained dark panel) — big cream headline + muted cream sub + terracotta button inside `.final-cta`.
11. **Footer** (paper or ink depending on page) — brand + meta, no fake trust links
12. **Legal list** (paper) — privacy/legal sections use `.legal-list` and `.legal-card` with `L01` style labels; avoid visible `1.`, `2.`, `3.` legal headings

## Technical UI Components

Use these to make the site feel more technical without becoming hostile to non-technical buyers:

- **Standard cards**: 2px radius, thin border, white/surface background, no box shadow, no nested card containers
- **Hero media panels**: approved image assets in square/rectangular bordered frames; use photo `cover`, diagram `contain`
- **Signal cards**: individual `L01` cards with short Public Sans title and concise description; no outer `.signal-list` frame
- **Accent dots**: small green dots with restrained glow; never large blobs
- **Technical grid backgrounds**: do not add visible cross-line page backgrounds. `--grid-line` is currently transparent.
- **Square tags**: use forest-green square tags for pills, architecture tags, assistant channel icons, and feature icons
- **Meters**: visual explanation only; avoid implying false measured results unless the metric is real

## Copy voice

This is as important as the visual design. The voice is what differentiates Veridata Pro from generic automation shops, cheap no-code freelancers, Odoo-only developers, AWS-only consultancies, and AI chatbot agencies.

**DO:**

- Write like a senior operator talking to another senior operator
- Use italic emphasis for voice moments ("_deliberately_", "_Real timelines, honestly stated._")
- Use specific numbers when real: "$300 audit", "$600 sprint", "$200/month", "15+ years", "66% cost reduction"
- Name the buyer's real pain in their words ("Your team is copying data between Odoo, spreadsheets, and the CRM")
- Acknowledge tradeoffs and constraints openly ("n8n is right for fast operational automation; AWS is better when reliability and retries matter")
- Use short, declarative sentences. Periods over commas.

**DO NOT:**

- Promise outcomes that depend on messy client systems ("fully automated in 48 hours", "zero manual work guaranteed")
- Offer fake guarantees or no-risk theatrics ("free work until it works", "automation guaranteed")
- Use invented proprietary framework names (VeriGate, VeriFlow, etc.) without substance behind them
- Claim capabilities the solo practice doesn't have (24/7 monitoring, single-tenant infrastructure)
- Use testimonials unless they're real, attributed, and signed off by the client
- Use generic consulting filler: "architecting the future", "innovative solutions", "synergies"
- Write anything that would make the reader roll their eyes at a conference

**Tone benchmarks:**

- Right: "If your team is moving data between Odoo, spreadsheets, and a CRM every week, the integration layer is missing."
- Wrong: "Leverage our innovative workflow platform to transform business productivity."

- Right: "Start with one workflow. If it becomes critical, move it into AWS-native architecture."
- Wrong: "We automate everything with AI agents and no-code workflows."

## Anti-patterns — reject these if requested

Several visual/copy patterns are **off-limits** for Veridata Pro and should be refused or redirected if a user asks for them:

- Hero images of stock operators, headsets, abstract AI brains, generic cloud diagrams, or disconnected SaaS icon piles. Use only approved assets in `assets/images/` or brand-specific generated assets.
- Big "Trusted by" logo bars with fake or unlicensed client logos
- Fake testimonials with "Senior Manager at SaaS Company" generic attribution
- "Free trial" language — this is not a SaaS product, it's an advisory engagement
- Urgency tactics: countdown timers, "only 2 spots left!", "price goes up Friday"
- Chatbot widgets on pages where a solo operator can't actually respond in real time
- Emoji as UI decoration
- Gradient text effects, neon glowing borders, particle backgrounds, decorative blobs/orbs
- Rounded pill chips for technical tags; current tags are square green blocks
- Outer background boxes around card grids; current card grids should stay plain
- Purple/pink/cyan/yellow accents anywhere
- Full dark-theme pages aimed at non-technical buyers; keep the current site light-forward unless a specific page has a strong reason for a contained dark band
- Bold claims with no evidence ("Industry-leading", "#1 in LatAm", "Award-winning")
- Top-level service sprawl: separate menu items for n8n, AWS, AI, MuleSoft, APIs, Python, Java, databases, Zapier, or Make
- Copy that makes Veridata Pro sound like only an n8n freelancer, only an Odoo developer, only an AWS consultancy, or an AI chatbot agency

If the user explicitly requests any of these, push back with a brief explanation of why it hurts their positioning, and offer the honest alternative.

## When generating new content

1. Start with which section type applies (from the list above)
2. Use the defined CSS variables only — no new colors
3. Match the Public Sans hierarchy (700 headings, 400 body, 600 labels)
4. Write copy that passes the "would a senior CTO roll their eyes?" test
5. If creating something new that doesn't fit an existing pattern, first ask whether the pattern should be generalized and added to this skill

## Reference files

When working on the live site, treat these files as source of truth for decisions not captured here:

- Homepage routing pattern: `en/index.html`, mirrored in `pt/index.html` and `es/index.html`
- Odoo page pattern: `en/odoo.html`, mirrored in `pt/odoo.html` and `es/odoo.html`
- Integrations depth page: `en/integrations.html`, mirrored in `pt/integrations.html` and `es/integrations.html`
- Pricing page/cards: `en/pricing.html`, mirrored in `pt/pricing.html` and `es/pricing.html`
- Shared visual rules: `assets/css/styles.css`
- Shared navigation/footer: `components/header.html`, `components/footer.html`, plus translations in `assets/js/main.js`
- Approved hero assets: `assets/images/team_collaboration.png`, `assets/images/integrations.png`, `assets/images/odoo_integrations.jpg`
