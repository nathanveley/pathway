# Pathway Distribution — Project Tracker

Living checklist for the marketing site. Newest priorities near the top of each section.

## 🚀 Launch (in progress)
- [x] Build site + push to GitHub (`nathanveley/pathway`)
- [x] Deploy to Render — static site + contact API (Blueprint)
- [x] Wire contact form: `VITE_CONTACT_ENDPOINT` + `RESEND_API_KEY`
- [x] Contact API health check passing (`resend: true`)
- [~] Custom domain `pathwaydistribution.ca` — DNS set at GoDaddy (A `@` → 216.24.57.1, CNAME `www` → pathway-distribution.onrender.com); verifying + SSL in Render
- [ ] Final form test from `https://pathwaydistribution.ca` once HTTPS is live

## 🔐 Security / housekeeping (do soon)
- [ ] **Rotate the Resend API key** — it was pasted in chat once. Make a new key in Resend, delete the old one, and update it in BOTH `pathway-contact` and BuildGen's `tmg-crm-backend` (shared key).
- [ ] Verify `pathwaydistribution.ca` in Resend, then switch `FROM_EMAIL` back to `Pathway Distribution <notifications@pathwaydistribution.ca>` (currently sending from `@buildgencrm.ca`).

## ✉️ Email
- [ ] Decide branded email for the domain — start with free forwarding (Cloudflare Email Routing) `hello@pathwaydistribution.ca` → Moulton inbox; upgrade to Google Workspace / M365 later if you want to reply as the domain.

## 🎨 Content & polish
- [ ] **Founder / Leadership block** — About section has the story + mission, but no people yet. Send name, short bio, (photo?) and I'll add a leadership block — important for a new distributor (people buy your relationships first).
- [ ] **Brand Partners** — bar shows an "announced soon" placeholder. Collect official logo files → `public/logos/` (see its README), confirm which lines Pathway actually represents, and I'll build the real logo bar.
- [ ] **Proof** — once available: accounts opened, projects influenced, locations carrying product, manufacturer/dealer testimonials. Use only substantiable numbers.
- [ ] **Real logo vector** — replace the hand-built SVG mark (`App.jsx` `<Mark/>`) and `public/favicon.svg` with the designer's final file (and regenerate `og.png` to match).
- [ ] Confirm **coverage** claim (Ontario now, "toward Canada") matches your actual plan.

## ✅ Done (overnight, 2026-09-02)
- Repositioned to "The Clear Path to Market" + full section rework (Who We Serve, How We Work zig-zag road, Advantage, Brand Partners, Coverage, About+Contact two-column)
- Fixed Coverage band unreadable in dark mode (fixed dark navy)
- **Social share image** (`og:png`, 1200×630) + og/twitter meta
- **Organization JSON-LD** structured data for SEO
- **Theme-aware toggle icon** (moon in light, sun in dark)
- Custom domain live w/ HTTPS; contact form → Resend → inbox

## ⚙️ Infra (later)
- [ ] Contact API is on Render free tier → ~30–50s cold start on first submit after idle. Upgrade if traffic warrants.
- [ ] Consider basic analytics (privacy-friendly, e.g. Plausible) if you want traffic data.

## ✅ Done
- Direction chosen: Partnership Story; logo: Straight Path "P".
- Type: Libre Franklin / Spectral / IBM Plex Mono. Navy/stone/gold, light+dark themes.
- Copy: commercial/contractor framing, problem-solving thesis, honest coverage, Proudly Canadian badge, ISA 40:3 hidden in hero coordinates.
- Mobile nav menu; privacy line on form; robots.txt + sitemap.xml; SEO/OG meta; Node engines pinned.
