# Launch checklist — Pathway Distribution

Everything is built, committed, and pushed to **github.com/nathanveley/pathway**.
These are the steps only you can do (they need your Render / Resend / GoDaddy logins).
Work top to bottom; each takes a couple of minutes.

---

## 1. Deploy on Render (both services at once)
1. Render dashboard → **New → Blueprint**.
2. Connect the **`nathanveley/pathway`** repo. Render reads `render.yaml` and proposes two services:
   - **pathway-distribution** — the website (static)
   - **pathway-contact** — the contact-form email API (Node)
3. Click **Apply**. The static site builds and goes live at `https://pathway-distribution.onrender.com`.
   - The contact API deploys at `https://pathway-contact.onrender.com` (note: free tier sleeps when idle, so the *first* form submission after a quiet spell takes ~30s — fine for now, upgrade later if needed).

## 2. Resend — so the form can send email
The API sends from `notifications@pathwaydistribution.ca`, which requires the domain be verified in Resend.
**Fast path (send tonight):** in Render → `pathway-contact` → Environment, temporarily set
`FROM_EMAIL = Pathway Distribution <notifications@buildgencrm.ca>` (your already-verified BuildGen domain).
**Proper path:** in Resend → Domains → add `pathwaydistribution.ca` → add the DNS records it shows into GoDaddy (see step 4 location) → verify → then set `FROM_EMAIL` back to the pathway address.

Also in Render → `pathway-contact` → Environment, set:
- `RESEND_API_KEY` = your Resend key (reuse BuildGen's or make a new one)
- `TO_EMAIL` is already `nathan.veley@themoultongroup.ca` (change if you want)

Save → the service redeploys.

## 3. Point the site at the API
1. Copy the contact API URL: `https://pathway-contact.onrender.com`
2. Render → `pathway-distribution` → Environment → set
   `VITE_CONTACT_ENDPOINT = https://pathway-contact.onrender.com/api/contact`
3. Save → the site rebuilds. The contact form is now live end-to-end.

## 4. Custom domain: GoDaddy → Render
1. Render → `pathway-distribution` → **Settings → Custom Domains** → add both:
   - `pathwaydistribution.ca`
   - `www.pathwaydistribution.ca`
2. Render shows the exact DNS targets. Typically:
   - **Apex** `pathwaydistribution.ca` → an **A record** to Render's IP (Render displays it, e.g. `216.24.57.1`)
   - **www** → a **CNAME** to `pathway-distribution.onrender.com`
3. In **GoDaddy → your domain → DNS**:
   - Edit the existing **A record** for `@` → set it to the IP Render shows (remove GoDaddy's parking IP).
   - Add a **CNAME** for `www` → `pathway-distribution.onrender.com`.
   - Delete any GoDaddy default parking/forwarding on `@`/`www` that conflicts.
4. Back in Render, click **Verify**. DNS can take 15 min–a few hours. Render auto-issues HTTPS once verified.
5. Set `pathwaydistribution.ca` as the **primary** domain (Render redirects www → apex, or your choice).

## 5. Final checks
- [ ] Site loads at `https://pathwaydistribution.ca` with HTTPS
- [ ] Submit the contact form → email arrives at `nathan.veley@themoultongroup.ca`
- [ ] Update `ALLOWED_ORIGIN` on `pathway-contact` if you changed which domain is primary
- [ ] (Optional) tell me and I'll add the **brands section** (Tremco, Sika, Dryvit, Nichiha, Metalunic, Lux…) and a real logo

## Still worth doing after launch (not blockers)
- Real product / brands content (the brands section)
- Final logo vector (current mark is a hand-built SVG)
- A dedicated `hello@pathwaydistribution.ca` mailbox if you want a branded reply-to
- Replace the placeholder OG/social-share image
