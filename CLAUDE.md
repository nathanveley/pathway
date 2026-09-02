# Pathway Distribution — Project Context for Claude

## What this is
Marketing site for **Pathway Distribution**, a proudly Canadian distributor of commercial building products. Pathway connects **manufacturers** (who make the product) to **distributors, contractors, and builders** (who put it to work) — "one dependable partner for the whole route to market."

Tagline: **Building Connections. Delivering Solutions.** (problem-solving is the core expertise)

Direction chosen: **"Partnership Story"** — a narrative single-page scroll built on a pathway/road metaphor, warm but professional.

## Owner
Nathan Veley — The Moulton Group, Ontario (also owns BuildGen CRM at ~/Desktop/tmg-crm)

## Stack
- **Frontend:** React + Vite → Render Static Site
- **Fonts:** Libre Franklin (headings — professional, Franklin-Gothic lineage), Spectral (body serif), IBM Plex Mono (labels/coordinates) via Google Fonts
- **Contact form:** POSTs JSON to `VITE_CONTACT_ENDPOINT`; delivery via Resend (TBD)
- **No database / auth** — it's a brochure site

## Brand
- Palette: navy ink `#14243A`, warm stone paper `#EAE8E1`, slate `#76879A`, gold accent `#C29A4E` (deco) / `#A97F28` (text). Full light + dark themes via CSS tokens in `src/index.css`.
- Logo: the **"Straight Path" P** (concept #1) — a P with a road receding into it. Currently a hand-built SVG in `App.jsx` (`<Mark/>`) and `public/favicon.svg`; replace with the final vector when available.
- Easter egg: hero corner coordinates `40.3° N · 3.3° W` quietly nod to **Isaiah 40:3** ("prepare the way… make straight the highway" — John the Baptist), which underpins the Pathway / "the way, prepared" / wilderness brand story. Keep subtle.

## File structure
```
pathway/
  index.html          — Vite entry, Google Fonts link, meta/OG tags, favicon
  render.yaml         — Render static-site blueprint (SPA rewrite + security headers)
  .env.example        — VITE_CONTACT_ENDPOINT
  public/favicon.svg  — P mark favicon
  src/
    main.jsx          — React entry
    index.css         — all styles + theme tokens (light/dark)
    App.jsx           — the whole page: nav, hero, story, journey, audiences, coverage, why, contact, footer
```

## Page sections (in order)
1. **Hero** — Proudly Canadian badge, tagline (gold underline on "Delivering solutions"), lede, dual CTA, road/mountain SVG scene, coordinate easter egg
2. **Story** — "the way, prepared"
3. **The Journey** — spine with 3 waypoints: Source (manufacturer connections solve the problem) → Connect (relationships) → Deliver
4. **Two audiences** — For Manufacturers / For Distributors & Contractors
5. **Coverage** — dark section, stylized network map + stats (PLACEHOLDER)
6. **Why Pathway** — Reach / Reliability / Relationships
7. **Contact** — form (name, email, role, message)
8. **Footer**

## Known placeholders (must resolve before launch)
- Coverage stats (`1 / 2 / ∞`) and the map are invented — replace with real data or cut the section
- `hello@pathwaydistribution.ca`, no phone/address yet
- Logo is a stand-in SVG
- Contact form not wired to email (needs endpoint + Resend key)
- Domain not registered/pointed
- No real product/manufacturer content yet

## Contact-form delivery plan (Resend)
Options, simplest first:
1. **Tiny Render Web Service** (Node/Express) with one `POST /api/contact` route that calls Resend `emails.send` to Nathan's inbox; set its URL as `VITE_CONTACT_ENDPOINT`. Mirrors BuildGen's `email.js` pattern.
2. Reuse BuildGen's existing backend by adding a `/pathway/contact` route (couples the two apps — avoid unless convenient).
3. Third-party (Formspree/Basin) — no code, but another vendor.
Resend needs the Pathway sending domain verified (or reuse a verified BuildGen sender temporarily).

## Deploy
GitHub repo `nathanveley/pathway` → Render Blueprint (`render.yaml`) → Static Site. Custom domain + DNS in Render dashboard.
