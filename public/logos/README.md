# Brand partner logos

Drop official manufacturer logo files here, then tell Claude to wire up the brand bar.

## Conventions
- **Format:** SVG preferred (crisp at any size); transparent PNG is fine.
- **Filename:** lowercase brand name, e.g. `tremco.svg`, `sika.svg`, `dryvit.png`.
- **Only confirmed partners** — brands Pathway Distribution actually represents/carries.

## What happens next
Once files are here, the brand bar in `src/App.jsx` (the `.brand-bar` in the
Advantage/Brand-Partners section) swaps its "announced soon" placeholder for
`<img>` logos — shown greyscale, full color on hover.

Reference them from the page as `/logos/<file>` (Vite serves `public/` at the site root).
