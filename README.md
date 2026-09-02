# Pathway Distribution — Marketing Site

Building connections. Delivering solutions.

A single-page marketing site for Pathway Distribution — a proudly Canadian distributor connecting commercial building-product manufacturers to distributors, contractors, and builders.

## Stack
- **React + Vite** → deploys to **Render** as a Static Site
- Fonts: Libre Franklin (headings), Spectral (body), IBM Plex Mono (labels) — via Google Fonts
- No backend required for the site itself; the contact form POSTs to a configurable endpoint

## Develop
```bash
npm install
npm run dev      # http://localhost:5173
```

## Build
```bash
npm run build    # outputs to dist/
npm run preview  # serve the production build locally
```

## Deploy (Render)
1. Push this repo to GitHub (`nathanveley/pathway`).
2. In Render: **New → Blueprint**, point at the repo. `render.yaml` configures a Static Site:
   - Build: `npm ci && npm run build`
   - Publish dir: `dist`
3. Add a custom domain (e.g. `pathwaydistribution.ca`) in the Render dashboard and follow the DNS records it gives you.

## Contact form
The form in `src/App.jsx` reads `VITE_CONTACT_ENDPOINT`.
- **Empty** (default): the form captures input and shows a friendly confirmation, but sends nothing.
- **Set**: submissions are POSTed as JSON (`{ name, email, role, msg }`) to that URL.

To actually deliver emails, stand up a tiny endpoint that calls Resend (the same service BuildGen uses) and set `VITE_CONTACT_ENDPOINT` to its URL. See `CLAUDE.md` for the plan.

## Status / TODO before launch
- [ ] Replace placeholder **coverage stats + map** with real numbers/territory (or remove the section)
- [ ] Real **contact details** (email, phone) — `hello@pathwaydistribution.ca` is a placeholder
- [ ] Drop in the **final logo** asset (current mark is a hand-built SVG stand-in)
- [ ] Wire the **contact form** to Resend and set `VITE_CONTACT_ENDPOINT`
- [ ] Add real **product/manufacturer content** if desired
- [ ] Point the **domain** and go live
