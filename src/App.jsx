import { useEffect, useRef, useState } from 'react'

const CONTACT_ENDPOINT = import.meta.env.VITE_CONTACT_ENDPOINT || ''

/* Straight-Path "P" logo mark */
function Mark() {
  return (
    <svg className="mark" viewBox="0 0 64 72" aria-hidden="true">
      <rect x="10" y="4" width="15" height="62" rx="4" fill="var(--logo-ink)" />
      <path
        fill="var(--logo-ink)"
        fillRule="evenodd"
        d="M36 4a24 24 0 1 1 0 48 24 24 0 0 1 0-48Zm0 15a9 9 0 1 0 0 18 9 9 0 0 0 0-18Z"
      />
      <path fill="var(--road)" d="M6 66 L29 66 L21.5 26 L18 26 Z" />
      <line x1="18" y1="63" x2="19.6" y2="30" stroke="var(--paper-3)" strokeWidth="2" strokeDasharray="4 5" />
    </svg>
  )
}

function SunIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
    </svg>
  )
}

export default function App() {
  const [navSolid, setNavSolid] = useState(false)
  const [toast, setToast] = useState('')
  const [sending, setSending] = useState(false)
  const formRef = useRef(null)

  /* theme: read stored preference on mount */
  useEffect(() => {
    try {
      const saved = localStorage.getItem('pw-theme')
      if (saved) document.documentElement.setAttribute('data-theme', saved)
    } catch { /* storage unavailable */ }
  }, [])

  /* solidify nav on scroll */
  useEffect(() => {
    const onScroll = () => setNavSolid(window.scrollY > 40)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  /* scroll-reveal */
  useEffect(() => {
    const els = document.querySelectorAll('.reveal')
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('in')
            io.unobserve(e.target)
          }
        })
      },
      { threshold: 0.12 }
    )
    els.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [])

  function toggleTheme() {
    const root = document.documentElement
    const cur = root.getAttribute('data-theme')
    const isDark = cur ? cur === 'dark' : window.matchMedia('(prefers-color-scheme:dark)').matches
    const next = isDark ? 'light' : 'dark'
    root.setAttribute('data-theme', next)
    try { localStorage.setItem('pw-theme', next) } catch { /* storage unavailable */ }
  }

  async function handleSubmit(e) {
    e.preventDefault()
    const data = Object.fromEntries(new FormData(formRef.current).entries())

    if (!CONTACT_ENDPOINT) {
      setToast('✓ Thanks — message captured. (Email delivery not configured yet.)')
      formRef.current.reset()
      return
    }
    try {
      setSending(true)
      setToast('')
      const res = await fetch(CONTACT_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      if (!res.ok) throw new Error('Request failed')
      setToast('✓ Thanks — we got it and will be in touch shortly.')
      formRef.current.reset()
    } catch {
      setToast('Something went wrong. Please email hello@pathwaydistribution.ca directly.')
    } finally {
      setSending(false)
    }
  }

  return (
    <>
      <header className={`nav${navSolid ? ' solid' : ''}`} id="nav">
        <div className="wrap nav-inner">
          <a className="brand" href="#top" aria-label="Pathway Distribution home">
            <Mark />
            <span className="wm">
              <b>PATHWAY</b>
              <span>DISTRIBUTION</span>
            </span>
          </a>
          <nav className="links">
            <a href="#journey">The Journey</a>
            <a href="#partners">Partner</a>
            <a href="#coverage">Coverage</a>
            <a href="#why">Why Pathway</a>
            <a href="#contact">Contact</a>
          </nav>
          <button className="toggle" onClick={toggleTheme} aria-label="Toggle light and dark theme">
            <SunIcon />
          </button>
        </div>
      </header>

      <main id="top">
        {/* HERO */}
        <section className="hero" id="hero">
          <div className="hero-scene" aria-hidden="true">
            <svg viewBox="0 0 1440 520" preserveAspectRatio="xMidYMax slice">
              <path fill="var(--ridge-far)" d="M0 330 L180 250 L360 300 L560 210 L760 285 L980 215 L1200 290 L1440 235 L1440 520 L0 520 Z" opacity=".55" />
              <path fill="var(--ridge-mid)" d="M0 380 L240 300 L470 360 L700 275 L930 355 L1180 295 L1440 360 L1440 520 L0 520 Z" opacity=".7" />
              <path fill="var(--ridge-near)" d="M0 450 L300 395 L620 445 L900 385 L1200 445 L1440 405 L1440 520 L0 520 Z" opacity=".9" />
              <path fill="var(--road)" d="M690 250 L750 250 L900 520 L560 520 Z" opacity=".95" />
              <line className="roadline" x1="720" y1="256" x2="730" y2="520" stroke="var(--gold-deco)" strokeWidth="4" />
            </svg>
          </div>
          <div className="wrap hero-inner">
            <span className="ca-badge">
              <span className="leaf" aria-hidden="true">🍁</span> Proudly Canadian
            </span>
            <p className="eyebrow mono">Commercial Distribution · Building Products</p>
            <h1 style={{ marginTop: 18 }}>
              Building connections.
              <br />
              <span className="l2">Delivering solutions.</span>
            </h1>
            <p className="lede">
              Pathway Distribution moves proven product from the manufacturers who make it to the distributors,
              contractors and builders who put it to work — one dependable partner for the whole route to market.
            </p>
            <div className="cta-row">
              <a className="btn btn-primary" href="#contact">Partner with us →</a>
              <a className="btn btn-ghost" href="#journey">See how it works</a>
            </div>
          </div>
          <div className="wrap hero-meta mono">
            <span>40.3° N · 3.3° W</span>
            <span>Building connections · Delivering solutions</span>
          </div>
        </section>

        {/* STORY */}
        <section id="story">
          <div className="wrap reveal">
            <p className="eyebrow mono kicker">The way, prepared</p>
            <p className="lead-serif">
              Every good product faces the same gap — the distance between the plant that makes it and the project
              where it belongs. We exist to close that distance.
            </p>
            <p style={{ maxWidth: '56ch', color: 'var(--ink-soft)', marginTop: 26, fontSize: 19 }}>
              Distribution isn't just freight. It's knowing the distributors and contractors by name, understanding
              what each market is building, and standing behind every line we carry. We prepare the way, so a
              manufacturer can reach further and the trade can build with confidence.
            </p>
          </div>
        </section>

        {/* JOURNEY */}
        <section className="journey" id="journey">
          <div className="wrap reveal">
            <p className="eyebrow mono kicker">The Journey</p>
            <h2 className="section-h">From the plant floor to the jobsite.</h2>
            <p className="intro">Three stages, one continuous route. This is how product travels with Pathway.</p>
            <div className="spine">
              <div className="wp">
                <div className="node">01</div>
                <p className="wp-tag mono">Source</p>
                <h3>We know who makes what</h3>
                <p>
                  Supply problems rarely have one answer. Because we've built relationships across the manufacturers
                  behind these lines, we can source the right solution for the job in front of you — not just the one
                  product we happen to hold. Solving that is the expertise.
                </p>
              </div>
              <div className="wp">
                <div className="node">02</div>
                <p className="wp-tag mono">Connect</p>
                <h3>Relationships, built to last</h3>
                <p>
                  Distribution runs on trust. We know the distributors, contractors and specifiers by name, and we show
                  up the same way on the tenth order as the first. The relationship is the real product.
                </p>
              </div>
              <div className="wp">
                <div className="node">03</div>
                <p className="wp-tag mono">Deliver</p>
                <h3>On time, in full, every order</h3>
                <p>
                  The promise that keeps a distributor reordering and a manufacturer growing. On a commercial project, a
                  late delivery stalls the whole schedule — so we treat dependability like the product it is.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* TWO AUDIENCES */}
        <section id="partners">
          <div className="wrap reveal">
            <p className="eyebrow mono kicker">Two sides, one partner</p>
            <h2 className="section-h">Whichever side you're on, we're the connection.</h2>
            <div className="aud-grid">
              <div className="aud">
                <p className="cap mono">For Manufacturers</p>
                <h3>Your route to market</h3>
                <ul>
                  <li>Reach the distributors and contractors you'd never crack alone</li>
                  <li>Skip the cost of building a sales &amp; logistics team</li>
                  <li>Warehousing, order handling and jobsite delivery, covered</li>
                  <li>A partner who represents your line like it's ours</li>
                </ul>
                <a className="btn btn-ghost" style={{ marginTop: 26 }} href="#contact">List your line →</a>
              </div>
              <div className="aud">
                <p className="cap mono">For Distributors &amp; Contractors</p>
                <h3>Product you can stand behind</h3>
                <ul>
                  <li>A curated lineup, not an overwhelming catalog</li>
                  <li>One reliable source instead of many loose ends</li>
                  <li>Fast, predictable supply you can build a schedule around</li>
                  <li>Reps who know the product and your market</li>
                </ul>
                <a className="btn btn-ghost" style={{ marginTop: 26 }} href="#contact">Stock with us →</a>
              </div>
            </div>
          </div>
        </section>

        {/* COVERAGE */}
        <section className="cover" id="coverage">
          <div className="wrap reveal">
            <div>
              <p className="eyebrow mono">Coverage</p>
              <h2 className="section-h" style={{ marginTop: 16 }}>A network built to reach.</h2>
              <p style={{ marginTop: 20 }}>
                Our routes connect manufacturers to the commercial trade across the region — and the map keeps growing
                as new lines and new accounts come aboard.
              </p>
              <div className="stat-row">
                <div className="stat"><b>1</b><span className="mono">PARTNER, END TO END</span></div>
                <div className="stat"><b>2</b><span className="mono">SIDES CONNECTED</span></div>
                <div className="stat"><b>∞</b><span className="mono">ROOM TO GROW</span></div>
              </div>
            </div>
            <div className="map">
              <svg viewBox="0 0 560 340" aria-label="Stylized distribution network">
                <g stroke="rgba(194,154,78,.5)" strokeWidth="1.4" strokeDasharray="4 6" fill="none">
                  <path d="M90 250 C200 180 260 210 430 90" />
                  <path d="M90 250 C160 260 300 300 470 240" />
                  <path d="M430 90 C360 160 420 210 470 240" />
                  <path d="M90 250 C180 130 280 120 430 90" />
                  <path d="M250 300 C300 220 340 200 430 90" />
                </g>
                <g fill="var(--gold-deco)">
                  <circle cx="90" cy="250" r="7" />
                  <circle cx="430" cy="90" r="7" />
                  <circle cx="470" cy="240" r="7" />
                  <circle cx="250" cy="300" r="7" />
                  <circle cx="300" cy="150" r="4.5" />
                  <circle cx="360" cy="255" r="4.5" />
                </g>
                <g fill="rgba(246,245,240,.62)" fontFamily="'IBM Plex Mono',monospace" fontSize="11" letterSpacing="1">
                  <text x="72" y="278">HUB</text>
                  <text x="412" y="78">NORTH</text>
                  <text x="452" y="266">EAST</text>
                  <text x="232" y="322">SOUTH</text>
                </g>
              </svg>
            </div>
          </div>
        </section>

        {/* WHY */}
        <section id="why">
          <div className="wrap reveal">
            <p className="eyebrow mono kicker">Why Pathway</p>
            <h2 className="section-h">The tagline, in practice.</h2>
            <div className="pillars">
              <div className="pillar">
                <div className="n">01 · REACH</div>
                <h3>We go where you can't</h3>
                <p>
                  Established relationships across the distribution landscape mean your product gets specified and
                  stocked by the accounts that matter.
                </p>
              </div>
              <div className="pillar">
                <div className="n">02 · RELIABILITY</div>
                <h3>The order shows up</h3>
                <p>On time, in full, exactly as promised. It's the least glamorous part of the business and the one we obsess over.</p>
              </div>
              <div className="pillar">
                <div className="n">03 · RELATIONSHIPS</div>
                <h3>Names, not accounts</h3>
                <p>We build connections that outlast any single order — the through-line that makes the whole route work.</p>
              </div>
            </div>
          </div>
        </section>

        {/* CONTACT */}
        <section className="contact" id="contact">
          <div className="wrap reveal">
            <div>
              <p className="eyebrow mono kicker">Let's talk</p>
              <h2>Let's build the connection.</h2>
              <p className="sub">
                Whether you've got a product line that needs a route or a project you need supplied — tell us where
                you're headed and we'll map the way.
              </p>
              <p className="mono" style={{ marginTop: 30, fontSize: 13, color: 'var(--slate)' }}>
                hello@pathwaydistribution.ca
              </p>
            </div>
            <form ref={formRef} onSubmit={handleSubmit}>
              <div className="field">
                <label htmlFor="name">Name</label>
                <input id="name" name="name" type="text" placeholder="Your name" required />
              </div>
              <div className="field">
                <label htmlFor="email">Email</label>
                <input id="email" name="email" type="email" placeholder="you@company.com" required />
              </div>
              <div className="field">
                <label htmlFor="role">I'm a…</label>
                <select id="role" name="role" defaultValue="Manufacturer looking for distribution">
                  <option>Manufacturer looking for distribution</option>
                  <option>Distributor / dealer</option>
                  <option>Contractor / builder</option>
                  <option>Something else</option>
                </select>
              </div>
              <div className="field">
                <label htmlFor="msg">Message</label>
                <textarea id="msg" name="msg" placeholder="Tell us what you're carrying or looking for…" />
              </div>
              {/* honeypot — hidden from humans, catches bots */}
              <input
                type="text"
                name="company_website"
                tabIndex={-1}
                autoComplete="off"
                aria-hidden="true"
                style={{ position: 'absolute', left: '-9999px', width: 1, height: 1, opacity: 0 }}
              />
              <button className="btn btn-primary" type="submit" style={{ justifyContent: 'center' }} disabled={sending}>
                {sending ? 'Sending…' : 'Send it →'}
              </button>
              <div className="toast mono" role="status">{toast}</div>
              {!CONTACT_ENDPOINT && (
                <p className="form-note">
                  Email delivery isn't wired up yet — set <code>VITE_CONTACT_ENDPOINT</code> to route submissions to your inbox via Resend.
                </p>
              )}
            </form>
          </div>
        </section>
      </main>

      <footer>
        <div className="wrap">
          <div className="foot-top">
            <div>
              <a className="brand" href="#top" style={{ marginBottom: 18 }}>
                <Mark />
                <span className="wm">
                  <b>PATHWAY</b>
                  <span>DISTRIBUTION</span>
                </span>
              </a>
              <p className="foot-tag">
                Building connections. <em>Delivering solutions.</em>
              </p>
            </div>
            <div className="foot-nav">
              <div className="col">
                <b>Explore</b>
                <a href="#journey">The Journey</a>
                <a href="#partners">Partner With Us</a>
                <a href="#coverage">Coverage</a>
                <a href="#why">Why Pathway</a>
              </div>
              <div className="col">
                <b>Connect</b>
                <a href="#contact">Contact</a>
                <a href="#contact">List a Product</a>
                <a href="#contact">Stock With Us</a>
              </div>
            </div>
          </div>
          <div className="foot-base mono">
            <span>© 2026 Pathway Distribution — Proudly Canadian</span>
            <span>Building connections · Delivering solutions</span>
          </div>
        </div>
      </footer>
    </>
  )
}
