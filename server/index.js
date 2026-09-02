import express from 'express'
import cors from 'cors'
import { Resend } from 'resend'

const {
  RESEND_API_KEY,
  TO_EMAIL = 'nathan.veley@themoultongroup.ca',
  FROM_EMAIL = 'Pathway Distribution <notifications@pathwaydistribution.ca>',
  ALLOWED_ORIGIN = 'https://pathwaydistribution.ca,https://www.pathwaydistribution.ca,https://pathway-distribution.onrender.com',
  PORT = 3001,
} = process.env

const resend = RESEND_API_KEY ? new Resend(RESEND_API_KEY) : null

const app = express()
app.use(express.json({ limit: '16kb' }))

// Allow the site origin(s). Comma-separate ALLOWED_ORIGIN for multiple (apex + www + onrender preview).
const origins = ALLOWED_ORIGIN.split(',').map((o) => o.trim())
app.use(cors({ origin: origins, methods: ['POST', 'GET'] }))

app.get('/health', (_req, res) => res.json({ ok: true, resend: Boolean(resend) }))

const clean = (v, max) => String(v ?? '').trim().slice(0, max)
const isEmail = (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)

app.post('/api/contact', async (req, res) => {
  try {
    const body = req.body || {}

    // Honeypot: real users leave this empty; bots fill it.
    if (clean(body.company_website, 200)) return res.json({ ok: true })

    const name = clean(body.name, 120)
    const email = clean(body.email, 200)
    const role = clean(body.role, 120)
    const msg = clean(body.msg, 4000)

    if (!name || !isEmail(email)) {
      return res.status(400).json({ ok: false, error: 'Please include a name and a valid email.' })
    }
    if (!resend) {
      // No key configured yet — accept but log, so the site still behaves.
      console.warn('[contact] RESEND_API_KEY not set; submission not emailed:', { name, email, role })
      return res.json({ ok: true, delivered: false })
    }

    const html = `
      <h2>New Pathway Distribution enquiry</h2>
      <p><strong>Name:</strong> ${escapeHtml(name)}</p>
      <p><strong>Email:</strong> ${escapeHtml(email)}</p>
      <p><strong>They are a:</strong> ${escapeHtml(role) || '—'}</p>
      <p><strong>Message:</strong></p>
      <p style="white-space:pre-wrap">${escapeHtml(msg) || '—'}</p>
    `

    const { error } = await resend.emails.send({
      from: FROM_EMAIL,
      to: TO_EMAIL,
      replyTo: email,
      subject: `Pathway enquiry — ${name}`,
      html,
    })
    if (error) throw new Error(error.message || 'Resend error')

    return res.json({ ok: true, delivered: true })
  } catch (err) {
    console.error('[contact] error:', err)
    return res.status(500).json({ ok: false, error: 'Could not send. Please email us directly.' })
  }
})

function escapeHtml(s) {
  return String(s).replace(/[&<>"']/g, (c) => (
    { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]
  ))
}

app.listen(PORT, () => console.log(`Pathway contact API listening on :${PORT}`))
