---
name: veridata-design-system
description: Use when creating, editing, or reviewing any visual or written content for the Veridata Pro website, landing pages, pricing pages, Odoo pages, integrations pages, marketing materials, blog posts, proposals, pitch decks, or client-facing documents. Apply when the user mentions Veridata Pro, veridatapro.com, the website, landing page, hero section, pricing section, Odoo page, integrations page, marketing copy, visual design, HTML/CSS work on the site, or copy that prospective clients will read.
---

# Veridata Pro Design System

Use this skill to keep Veridata Pro website pages, marketing copy, diagrams, proposals, pricing blocks, slide decks, client-facing documents, and visual assets consistent.

## Active direction: Sturdy & Clear

The current Veridata Pro direction is **Sturdy & Clear**. This supersedes the older "Sturdy & Kind" editorial cream/forest/terracotta direction.

Use this direction for all current website UI, marketing pages, cards, diagrams, pricing blocks, lists, and forms.

### Principle

Veridata Pro should feel like a trustworthy technical practice optimized for selling. Clean, modern, confident, and quick to read.

The brand is a serious integration and automation practice for SMBs and implementation partners. Buyers are founders, operators, CTOs, and business decision makers. The site has to convert them, not impress them with editorial taste.

We step out of generic SaaS blue without overcorrecting into boutique-editorial styling. The result should read as: clean white surfaces, a distinctive deep teal accent, terracotta for action, and zero decorative noise.

## Brand position

Veridata Pro helps companies connect Odoo and other business systems so teams stop copying data manually.

Main buyer-facing service paths:

- **Odoo:** customization, Odoo API integrations, data migration, ecommerce, CRM, finance workflows, WhatsApp/email/forms, AI document extraction, reporting, and Odoo partner support.
- **Integrations:** CRMs, ERPs, databases, forms, ecommerce, finance tools, AI services, APIs, AWS, MuleSoft, Python/Java services, n8n, Zapier/Make audit or migration.

The homepage is a routing page, not a full service catalog. Keep it short: Hero, Credibility band, Main Problems, Services Summary, How We Work, Free Tools, Case Studies, Pricing teaser, Final CTA.

## Navigation

Use this focused IA.

EN: Home, Odoo, Integrations, Pricing, Leadership, Book a Call
PT-BR: Início, Odoo, Integrações, Preços, Liderança, Agendar Chamada
ES-LATAM: Inicio, Odoo, Integraciones, Precios, Liderazgo, Agendar Llamada

Do not create top-level menu items for n8n, AWS, AI, MuleSoft, Python, Java, APIs, databases, Zapier, or Make. These are capabilities inside Odoo or Integrations, not separate service categories.

Free Tools may live in the footer or as a homepage section, not in top navigation.

## Typography

Use Public Sans only.

```css
--sans: "Public Sans", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
```

Rules:

- Headlines: Public Sans 700.
- Body: Public Sans 400 with generous line-height (1.6 for body, 1.3 for headings).
- Labels, eyebrows, metadata, layer IDs, and chips: Public Sans 600 with restrained uppercase tracking (0.08em).
- Use only 400, 600, and 700 weights.
- Do not introduce serif display typography. The brand is technical and commercial, not editorial.
- Hero type can be large, but use responsive breakpoints rather than viewport-scaled font formulas.

## Color palette

Use only these tokens unless the design system is intentionally updated.

```css
:root {
  /* Surfaces — clean, modern, fast-feeling */
  --paper: #F8FAFA;
  --surface: #FFFFFF;
  --surface-2: #F0F3F4;
  --surface-3: #E6EAEC;

  /* Ink and text */
  --ink: #0A1F2C;
  --ink-2: #143042;
  --text: #1A2730;
  --text-muted: #4A5560;
  --text-dim: #7A8590;

  /* Rules and borders */
  --rule: #E0E4E8;
  --rule-strong: #C5CCD2;

  /* Accent — deep teal, distinctive, technical */
  --accent: #0E5C5C;
  --accent-live: #2A8C8C;
  --accent-soft: rgba(14, 92, 92, 0.08);
  --accent-line: rgba(14, 92, 92, 0.25);

  /* Functional blue — for links and focus only, not as a brand color */
  --blue: #1A56B5;
  --blue-soft: rgba(26, 86, 181, 0.08);

  /* CTA — warm, action-oriented, distinctive */
  --cta: #C45A35;
  --cta-strong: #A04826;

  /* Status */
  --success: #2A8C8C;
  --warn: #C45A35;

  /* Shadows */
  --shadow-ambient: 0 4px 14px rgba(10, 31, 44, 0.06);
  --shadow-card: 0 1px 3px rgba(10, 31, 44, 0.04), 0 1px 2px rgba(10, 31, 44, 0.06);
  --shadow-elevated: 0 8px 24px rgba(10, 31, 44, 0.08);
}
```

Usage rules:

- White (`--surface`) is the default card and content background.
- Off-white (`--paper`) is the default section background.
- Light gray (`--surface-2`) is used for alternating sections to create rhythm.
- Deep teal (`--accent`) is the primary brand color. Use it for headlines accents, active states, dividers under section titles, and small structural details.
- Lighter teal (`--accent-live`) signals "live" or "active" — meter fills, status dots, active card borders.
- Terracotta (`--cta`) is reserved for primary CTAs and the single most important action on a page.
- Functional blue (`--blue`) is for hyperlinks, focus rings, and secondary interaction states only. It is not a brand color and should never carry large surface areas.
- Avoid purple, pink, cyan, yellow, neon, generic SaaS blue, lime green, decorative blobs, glow, particles, bokeh, or gradient text.
- Avoid cream, sand, beige, or warm editorial backgrounds.
- Do not introduce new colors unless the design system is intentionally updated.

## Layout

```css
.container {
  max-width: 1240px;
  padding: 0 32px;
}

.container-narrow {
  max-width: 820px;
  padding: 0 32px;
}

section {
  padding: 80px 0;
}
```

Rules:

- Use 8px rhythm.
- Use 24px gutters where appropriate.
- Desktop should feel grid-aligned and confident.
- Mobile should be single-column with 20px margins.
- Mobile breakpoint: 768px.
- Body sections use `.container` with 80px vertical padding; mobile reduces to 56px.
- Service pages such as Integrations, Odoo, Pricing, and Leadership should use full `.container` width.
- Reserve `.container-narrow` for legal/privacy or deliberately long-form reading pages.
- Hero sections may use 96px top padding for visual weight.

## Cards

- Use `--surface` (white) background.
- Use 1px `--rule` border.
- Use 10px radius.
- Subtle `--shadow-card` is allowed by default and signals "modern web app." Use sparingly — not every card needs a shadow.
- `--shadow-elevated` is reserved for pricing cards, featured tool cards, and hero technical panels.
- Use clear card headers, thin dividers, and status rows.
- A small `--accent-live` dot in the top-right of a card is the preferred "active" indicator.

## Buttons

- Primary buttons: `--cta` terracotta, 8px radius, Public Sans 600, no shadow, hover shifts to `--cta-strong`.
- Secondary buttons: outlined with `--rule-strong`, white surface, Public Sans 600.
- Tertiary buttons: text-only with `--accent` color and an underline on hover.
- Avoid glossy, floating, oversized, gradient, or SaaS-bouncy buttons.
- Button height: 44px standard, 52px for primary hero CTAs.

## Lists

Use structured rows with labels such as `L01`, left rails, dividers, and calm status markers.

Do not use loud badges, bare `01`, `02`, or decorative numbering.

For commercial bullet lists (benefits, features), use a small `--accent` checkmark or dot, never emoji.

## Diagrams

Use simple line-art and architectural workflow panels.

Preferred diagram style:

- Clear data-flow from A to B.
- 1px to 2px rules in `--ink-2` or `--rule-strong`.
- Subdued grid texture using `--rule`.
- Deep teal `--accent` for emphasis nodes and connectors.
- Terracotta `--cta` only for the single priority action in the flow.
- No generic SaaS icon piles.
- No abstract cyber imagery.
- No 3D rendered objects.

## Forms

- White fields with 1px `--rule` border.
- Focus uses `--blue` border and `--blue-soft` background.
- 8px radius.
- Avoid heavy shadows, neon focus rings, or playful UI decoration.
- Required-field markers use `--cta` color.

## Section patterns

Reuse these patterns rather than inventing new ones.

### Hero

White or `--paper` hero with eyebrow, strong Public Sans h1, lede (max 2 lines), two CTAs (primary terracotta, secondary outlined), and optional technical workflow panel on the right or below.

### Credibility band

A horizontal band placed immediately below the hero. Eyebrow label, single line of copy, and a row of wordmarks (text, not logo images) representing Ugo's prior professional experience. Light `--surface-2` background, 56px vertical padding.

### Signal problem list

`--paper` section with section-label, title, and row-based light panels using `L01`, `L02`, etc. Include a left rail, thin divider, and small `--accent-live` "system on" dot at the right.

Use `.signal-list` with `.problem-card`.

### Timeline

White section with label, title, subcopy, and two-column timeline: WHEN | WHAT. Include restrained tag metadata.

### Services grid

`--paper` or white section with label, title, subcopy, and equal `.tool-card` cards. Each card has title, description, outcome tag, and small `--accent-live` status dot.

### Operating layers / technical rows

White section with row cards, `L01` labels, short Public Sans titles, one concrete operational outcome, and optional small `--accent-live` meter bars.

### Fit section

`--surface-2` or `--paper` background. Include label, title, subcopy, and two-column Right-fit / Wrong-fit list with `--accent` checkmarks and `--rule-strong` strikethroughs.

### Credentials split

`--paper` section with two columns: copy with pull quote, and `.stat-card` facts table. Stat cards use `--shadow-card` and `--accent-live` status dot.

### Pricing

White or `--paper` section. Cards stay light with subtle grid background. Featured card uses `--accent` border and `--shadow-elevated`. Primary CTA on the featured card uses `--cta` terracotta.

### Free Tools section

`--paper` or white section with `.tool-card` grid (2x2 on desktop, single column on mobile). Each card includes a small `--accent-live` dot, a concise title, a one-line description, a small outcome tag, and a clear "Open tool →" link in `--accent` color.

### FAQ

Narrow container, simple Q/A rhythm, clear Public Sans questions. Q in 600, A in 400, separated by 1px `--rule`.

### Final CTA

`--paper` or `--ink` background. Big restrained headline, subcopy (1 line), and one prominent `--cta` button.

### Footer

`--ink` background with `--paper` text. Brand plus metadata, navigation links, and a Tools link. No fake trust links. No social icon clutter — list only platforms where Veridata is actually active.

### Legal list

`--paper` section using `.legal-list` and `.legal-card` with `L01` style labels. Avoid visible `1.`, `2.`, `3.` legal headings.

## Technical UI components

Use these to make the site feel technical but still friendly to non-technical buyers.

- Raised cards: 10px radius, 1px `--rule` border, white background, `--shadow-card` by default.
- Hero system panel: light architectural panel with dashed dividers, nodes, small meter bars, and `--accent-live` active states.
- Signal rows: row-based cards with `L01` labels, a left label rail, short title, concise description, and one small `--accent-live` status dot.
- Accent dots: small `--accent-live` dots, 8px diameter, no glow.
- Technical grid backgrounds: subtle `--rule` overlays, usually 36px or 44px grid spacing. Use sparingly.
- Meters: use for visual explanation only. Do not imply measured results unless the metric is real.

## Copy voice

Write like a senior operator talking to another senior operator who needs to make a buying decision today.

The voice should differentiate Veridata Pro from generic automation shops, cheap no-code freelancers, Odoo-only developers, AWS-only consultancies, and AI chatbot agencies — while still being clear and sales-friendly.

### Do

- Use short, declarative sentences.
- Name the buyer's real pain in their words.
- Lead with the outcome, then explain how.
- Acknowledge tradeoffs and constraints openly.
- Use specific numbers only when real.
- Make CTAs concrete: "Book a 30-minute review" not "Get in touch."
- Make the reader believe the work is real.

Good examples:

> If your team is moving data between Odoo, spreadsheets, and a CRM every week, the integration layer is missing.

> Start with one workflow. If it becomes critical, move it into AWS-native architecture.

> n8n is right for fast operational automation. AWS is better when reliability and retries matter.

### Do not

- Promise outcomes that depend on messy client systems.
- Use fake guarantees or no-risk theatrics.
- Invent proprietary framework names without substance.
- Claim capabilities the solo practice does not have, such as 24/7 monitoring or single-tenant infrastructure.
- Use testimonials unless real, attributed, and approved.
- Use generic consulting filler such as "architecting the future," "innovative solutions," or "synergies."
- Use editorial flourishes that slow the sale.
- Use italic emphasis for "voice moments" — this is a commercial site, not an essay.
- Make Veridata Pro sound like only an n8n freelancer, only an Odoo developer, only an AWS consultancy, or only an AI chatbot agency.

Bad examples:

> Leverage our innovative workflow platform to transform business productivity.

> We automate everything with AI agents and no-code workflows.

> Fully automated in 48 hours.

## Anti-patterns

Reject or redirect these when requested.

### Critical: Logos and trust signals

- **Never use logos of Deloitte, Accenture, Ubisoft, MuleSoft, AWS, or any other company as if they were Veridata Pro clients.** These are Ugo's prior employers or technologies he uses, not Veridata Pro customers. Using their logos in a "Trusted by" / "Our Clients" band is misleading and creates legal risk.
- The honest framing is "Prior engagement experience" or "Where this experience comes from," rendered as Public Sans 600 text wordmarks, not as official logos.
- Never use unlicensed third-party logos in any capacity on the site.
- Fake testimonials with generic attribution are forbidden. Use only real, named, approved testimonials.

### Visual anti-patterns

- Stock operators, headsets, abstract AI brains, generic cloud diagrams, or disconnected SaaS icon piles.
- Generic SaaS blue as a brand color.
- Cream, sand, or beige backgrounds (deprecated from the previous direction).
- Serif display typography.
- Emoji as UI decoration.
- Gradient text effects, neon glowing borders, particle backgrounds, decorative blobs, or orbs.
- Purple, pink, cyan, yellow, or generic SaaS blue accents.
- Full dark-theme pages for non-technical buyers (dark sections within a light page are fine).
- 3D rendered illustrations.

### Copy and positioning anti-patterns

- "Free trial" language. Veridata Pro is a services practice, not a product.
- Countdown timers, scarcity tactics, or "only 2 spots left" language.
- Chatbot widgets where a solo operator cannot actually respond in real time.
- Bold claims without evidence, such as "industry-leading," "#1 in LatAm," or "award-winning."
- Top-level service sprawl for n8n, AWS, AI, MuleSoft, APIs, Python, Java, databases, Zapier, or Make.
- Copy that turns Veridata Pro into a generic automation agency.
- Editorial flourishes that slow conversion.

When the user asks for an anti-pattern, briefly explain why it hurts positioning and offer the honest alternative.

## When creating new content

Before producing new Veridata Pro content:

1. Identify the relevant section pattern.
2. Use only the defined CSS variables.
3. Match Public Sans hierarchy: 700 headings, 400 body, 600 labels.
4. Write copy that would not make a senior CTO roll their eyes and would not lose a non-technical CFO.
5. Make sure the page has one clear primary CTA.
6. Avoid adding a new pattern unless it clearly improves the system.

If creating a genuinely new recurring pattern, ask whether it should be generalized and added to this skill.

## Live site reference files

When working on the live site, treat these files as source of truth for decisions not captured here:

- Homepage routing pattern: `en/index.html`, mirrored in `pt/index.html` and `es/index.html`
- Odoo page pattern: `en/odoo.html`, mirrored in `pt/odoo.html` and `es/odoo.html`
- Integrations depth page: `en/integrations.html`, mirrored in `pt/integrations.html` and `es/integrations.html`
- Pricing page/cards: `en/pricing.html`, mirrored in `pt/pricing.html` and `es/pricing.html`
- Tools listing page: `en/tools.html`, mirrored in `pt/tools.html` and `es/tools.html`
- Shared visual rules: `assets/css/styles.css`
- Shared navigation/footer: `components/header.html`, `components/footer.html`, plus translations in `assets/js/main.js`

## Review checklist

When reviewing Veridata Pro work, check:

- Does it use Public Sans only?
- Does it use the approved color tokens only?
- Does it feel clean, modern, and sales-ready?
- Does it avoid generic SaaS blue without overcorrecting into editorial styling?
- Does it avoid cream, beige, or serif type from the old direction?
- Does it avoid unlicensed third-party logos and fake trust bars?
- Does it avoid unsupported claims?
- Does it keep Odoo and Integrations as the main service paths?
- Does the copy sound like a senior operator who also knows how to sell?
- Does the page have one clear primary CTA?
- Does it make the buyer trust the person touching their systems?