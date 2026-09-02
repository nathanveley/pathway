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

function MenuIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <path d="M4 7h16M4 12h16M4 17h16" />
    </svg>
  )
}

function CloseIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <path d="M6 6l12 12M18 6L6 18" />
    </svg>
  )
}

const NAV = [
  ['#serve', 'Who We Serve'],
  ['#build', 'How We Work'],
  ['#advantage', 'The Advantage'],
  ['#brands', 'Partners'],
  ['#contact', 'Contact'],
]

export default function App() {
  const [navSolid, setNavSolid] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [toast, setToast] = useState('')
  const [sending, setSending] = useState(false)
  const formRef = useRef(null)
  const closeMenu = () => setMenuOpen(false)

  useEffect(() => {
    try {
      const saved = localStorage.getItem('pw-theme')
      if (saved) document.documentElement.setAttribute('data-theme', saved)
    } catch { /* storage unavailable */ }
  }, [])

  useEffect(() => {
    const onScroll = () => setNavSolid(window.scrollY > 40)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

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
      setToast('Something went wrong — please try again in a moment.')
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
            {NAV.map(([href, label]) => (
              <a key={href} href={href}>{label}</a>
            ))}
          </nav>
          <div className="nav-ctl">
            <button className="toggle" onClick={toggleTheme} aria-label="Toggle light and dark theme">
              <SunIcon />
            </button>
            <button
              className="menu-btn"
              onClick={() => setMenuOpen((o) => !o)}
              aria-label="Menu"
              aria-expanded={menuOpen}
            >
              {menuOpen ? <CloseIcon /> : <MenuIcon />}
            </button>
          </div>
        </div>
        {menuOpen && (
          <nav className="mobile-menu">
            {NAV.map(([href, label]) => (
              <a key={href} href={href} onClick={closeMenu}>{label}</a>
            ))}
          </nav>
        )}
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
            <p className="eyebrow mono">Building-Product Representation &amp; Distribution · Canada</p>
            <h1 style={{ marginTop: 18 }}>
              The Clear Path <span className="l2">to Market.</span>
            </h1>
            <p className="lede">
              Pathway Distribution helps building-product manufacturers enter, develop and grow within the Canadian
              market — through representation, distribution, dealer relationships and hands-on market development.
            </p>
            <div className="cta-row">
              <a className="btn btn-primary" href="#contact">Partner with Pathway →</a>
              <a className="btn btn-ghost" href="#serve">Who we serve</a>
            </div>
          </div>
          <div className="wrap hero-meta mono">
            <span>40.3° N · 3.3° W</span>
            <span>Building connections · Delivering solutions</span>
          </div>
        </section>

        {/* WHO WE SERVE */}
        <section id="serve">
          <div className="wrap reveal">
            <p className="eyebrow mono kicker">Who we serve</p>
            <h2 className="section-h">Built for both sides of the market.</h2>
            <p className="section-intro">
              Pathway isn't a conventional wholesaler. We sit between the people who make building products and the
              people who sell or install them — dealers, suppliers and contractors alike — and we work every side of it.
            </p>
            <div className="aud-grid">
              <div className="aud">
                <p className="cap mono">For Manufacturers</p>
                <h3>You built the product. We build the market.</h3>
                <ul>
                  <li>Market entry and dealer adoption across Canada</li>
                  <li>Brand representation and specification support</li>
                  <li>Inventory, forecasting and logistics, handled</li>
                  <li>Contractor pull-through that turns interest into orders</li>
                </ul>
                <a className="btn btn-ghost" style={{ marginTop: 26 }} href="#contact">Grow your line →</a>
              </div>
              <div className="aud">
                <p className="cap mono">For Dealers, Suppliers &amp; Contractors</p>
                <h3>Got a product problem? We source the solution.</h3>
                <p className="aud-lead">A tricky spec, a hard-to-find material, a better option than what's on the shelf — we go find it and get it to you. Sourcing the right product for the job is the path we create.</p>
                <ul>
                  <li>Hard-to-find and better-fit products, sourced for the job</li>
                  <li>Reliable supply and competitive pricing</li>
                  <li>Training, quoting and real technical expertise</li>
                  <li>A partner who answers the phone — and supplies contractors direct when the job calls for it</li>
                </ul>
                <a className="btn btn-ghost" style={{ marginTop: 26 }} href="#contact">Bring us a challenge →</a>
              </div>
            </div>
          </div>
        </section>

        {/* HOW WE WORK */}
        <section className="journey" id="build">
          <div className="wrap reveal">
            <p className="eyebrow mono kicker">How we work</p>
            <h2 className="section-h">Discover. Position. Connect. Grow.</h2>
            <p className="intro">Four moves that take a manufacturer from market entry to lasting demand — each powered by one of our core capabilities.</p>
            <div className="road-flow">
              <svg className="road-map" viewBox="0 0 1200 200" preserveAspectRatio="xMidYMid meet" aria-hidden="true">
                <path className="rm-road" d="M20 145 C90 145 95 140 150 140 C320 140 290 60 450 60 C620 60 590 140 750 140 C920 140 890 60 1050 60 C1120 60 1150 62 1185 62" />
                <path className="rm-line" d="M20 145 C90 145 95 140 150 140 C320 140 290 60 450 60 C620 60 590 140 750 140 C920 140 890 60 1050 60 C1120 60 1150 62 1185 62" />
                <g className="rm-node">
                  <circle cx="150" cy="140" r="18" /><text x="150" y="145">1</text>
                  <circle cx="450" cy="60" r="18" /><text x="450" y="65">2</text>
                  <circle cx="750" cy="140" r="18" /><text x="750" y="145">3</text>
                  <circle cx="1050" cy="60" r="18" /><text x="1050" y="65">4</text>
                </g>
              </svg>
              <div className="stops">
                <div className="stop">
                  <p className="s-name">Discover</p>
                  <span className="s-cap">Market Development</span>
                  <p>We learn the product and the market and find where it can win — and source the right solution when a job needs one.</p>
                </div>
                <div className="stop">
                  <p className="s-name">Position</p>
                  <span className="s-cap">Product Representation</span>
                  <p>We place it with the right dealers, pricing and specification story so it lands with the accounts that matter.</p>
                </div>
                <div className="stop">
                  <p className="s-name">Connect</p>
                  <span className="s-cap">Distribution</span>
                  <p>Inventory and logistics put it in front of the contractors, specifiers and projects that pull it through.</p>
                </div>
                <div className="stop">
                  <p className="s-name">Grow</p>
                  <span className="s-cap">Technical &amp; Sales Support</span>
                  <p>Training, quoting and expertise turn first orders into lasting, repeatable demand.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ADVANTAGE + BRAND PARTNERS (two columns) + brand bar */}
        <section className="adv-partners" id="advantage">
          <div className="wrap reveal">
            <div className="ap-grid">
              <div className="ap-advantage">
                <p className="eyebrow mono kicker">The Pathway advantage</p>
                <h2 className="adv-lead">We don't simply move products. We build markets for them.</h2>
                <p className="adv-sub">
                  Pathway combines established relationships, market knowledge, sales representation and distribution to
                  build lasting demand — not just one-time orders. We go after the business; we don't wait for purchase
                  orders to appear.
                </p>
              </div>
              <div className="ap-partners" id="brands">
                <p className="eyebrow mono kicker">Our brand partners</p>
                <h2 className="ap-partners-h">A growing roster of building-product lines.</h2>
                <p className="ap-partners-copy">
                  We take on a focused set of manufacturers we believe in and build a real market for each — not a
                  catalog we blast to a list. Our roster is growing.
                </p>
                <a className="btn btn-primary" style={{ marginTop: 26 }} href="#contact">Become a Pathway line →</a>
              </div>
            </div>
            <div className="brand-bar" aria-label="Brand partners">
              <span className="brand-soon mono">Brand partners announced soon</span>
            </div>
          </div>
        </section>

        {/* COVERAGE */}
        <section className="cover" id="coverage">
          <div className="wrap reveal cover-inner">
            <p className="eyebrow mono">Coverage</p>
            <h2 className="section-h" style={{ marginTop: 16 }}>Rooted in Ontario. Building toward Canada.</h2>
            <p className="cover-lead">
              We're building the market from Ontario outward. Our footprint grows with every line we take on and every
              dealer we earn — with a clear path toward national coverage. We'll always tell you exactly where we are,
              never where we aren't yet.
            </p>
            <div className="road-rule" aria-hidden="true" />
          </div>
        </section>

        {/* ABOUT + CONTACT (two columns) */}
        <section className="about-contact" id="about">
          <div className="wrap reveal ac-grid">
            <div className="ac-about">
              <p className="eyebrow mono kicker">About Pathway</p>
              <p className="lead-serif">Great products still need a pathway to market.</p>
              <div className="about-body">
                <p>
                  Pathway Distribution was created around a simple idea: manufacturers need more than a distributor, and
                  dealers need more than another supplier.
                </p>
                <p>
                  Manufacturers need people who understand their product, represent their brand and actively build
                  demand. Dealers need responsive partners who bring them strong products, market knowledge and real
                  support.
                </p>
                <p>
                  Pathway connects the two. Through representation, distribution and market development, we help build
                  lasting relationships between manufacturers, dealers and the professionals who use their products
                  every day.
                </p>
              </div>
              <div className="mission">
                <p className="label mono">Our mission</p>
                <p className="mission-line">To create pathways that help our partners grow.</p>
              </div>
            </div>

            <div className="ac-contact" id="contact">
              <p className="eyebrow mono kicker">Let's talk</p>
              <h2>Find your pathway.</h2>
              <p className="sub">
                Tell us which side of the market you're on and we'll map the way — whether you've got a product to grow
                or a shelf to fill.
              </p>
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
                <select id="role" name="role" defaultValue="Manufacturer">
                  <option>Manufacturer</option>
                  <option>Dealer or contractor</option>
                  <option>General inquiry</option>
                </select>
              </div>
              <div className="field">
                <label htmlFor="msg">Message</label>
                <textarea id="msg" name="msg" placeholder="Tell us about your product, your market or what you're looking for…" />
              </div>
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
              <p className="form-note">We'll only use your details to reply — never shared.</p>
              <p className="form-note">We reply within one business day.</p>
            </form>
            </div>
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
              <p className="foot-tag">The Clear Path <em>to Market.</em></p>
            </div>
            <div className="foot-nav">
              <div className="col">
                <b>Explore</b>
                <a href="#serve">Who We Serve</a>
                <a href="#build">How We Work</a>
                <a href="#advantage">The Advantage</a>
                <a href="#coverage">Coverage</a>
              </div>
              <div className="col">
                <b>Connect</b>
                <a href="#brands">Brand Partners</a>
                <a href="#about">About</a>
                <a href="#contact">Contact</a>
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
