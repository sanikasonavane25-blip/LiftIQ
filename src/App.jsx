import { useEffect, useState } from 'react'
import './App.css'

const documents = {
  brochure: {
    label: 'LiftIQ Brochure',
    description:
      'Discover the LiftIQ concept, the problem it addresses, how the proposed system works, its benefits, and its illustrative pricing model.',
    path: `${import.meta.env.BASE_URL}documents/LiftIQ_Brochure_new.pdf`,
  },
  profile: {
    label: 'LiftIQ Startup Profile',
    description:
      'Explore the LiftIQ startup concept, vision, mission, team, business model, and development roadmap.',
    path: `${import.meta.env.BASE_URL}documents/LiftIQ_Startup_Profile_new%20(2).pdf`,
  },
}

const promotionalVideo = {
  fileUrl: 'https://drive.google.com/file/d/1NN4u3e5BNRE-dkUWwHcurmrhEF8fqp3k/view?usp=drive_link',
  previewUrl: 'https://drive.google.com/file/d/1NN4u3e5BNRE-dkUWwHcurmrhEF8fqp3k/preview',
}

const navItems = [
  ['home', 'Home'],
  ['about', 'About Us'],
  ['how-it-works', 'How It Works'],
  ['promotional-video', 'Promo'],
  ['documents', 'Brochure'],
  ['documents', 'Startup Profile'],
  ['contact', 'Contact Us'],
]

const stages = [
  ['01', 'Sense', 'LiftIQ uses existing lobby CCTV to estimate the number of people waiting on different floors.'],
  ['02', 'Predict', 'An edge-AI controller combines current occupancy information with historical traffic patterns to forecast near-future floor-wise demand.'],
  ['03', 'Dispatch', 'The system generates dispatch assistance intended to improve elevator allocation in response to predicted demand.'],
  ['04', 'Learn', 'Aggregate building-level operational data can help refine demand predictions over time.'],
]

const team = [
  ['KO', 'Komolika', 'Technology & Platform Lead', 'Edge-AI system integration; committee dashboard and user interface.'],
  ['ZF', 'Zainab Farooqui', 'AI & Data Lead', 'Crowd detection model; demand prediction engine.'],
  ['SJ', 'Samrudhi Jadhav', 'Operations & Hardware Lead', 'Installation and vendors; safety and compliance.'],
  ['SS', 'Sanika Sonavane', 'Business & Finance Lead', 'RWA outreach and pricing; financial model and funding.'],
]

function Icon({ name }) {
  const paths = {
    arrow: <path d="M5 12h14M13 6l6 6-6 6" />,
    building: <><path d="M4 21V4a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v17" /><path d="M8 6h4M8 10h4M8 14h4M8 18h4M2 21h20" /></>,
    shield: <><path d="M12 3 20 6v5c0 5-3.4 8.5-8 10-4.6-1.5-8-5-8-10V6l8-3Z" /><path d="m8 12 2.5 2.5L16 9" /></>,
    eye: <><path d="M2 12s3.5-6 10-6 10 6 10 6-3.5 6-10 6S2 12 2 12Z" /><circle cx="12" cy="12" r="2.5" /></>,
    wallet: <><path d="M4 6h15a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h13" /><path d="M17 13h4" /></>,
    chart: <><path d="M4 19V5M4 19h17" /><path d="m7 15 4-4 3 2 6-7" /></>,
    menu: <><path d="M4 6h16M4 12h16M4 18h16" /></>,
    close: <><path d="m6 6 12 12M18 6 6 18" /></>,
    mail: <><rect x="3" y="5" width="18" height="14" rx="2" /><path d="m3 7 9 6 9-6" /></>,
    phone: <path d="M7 3h3l1.5 4-2 1.5a15 15 0 0 0 5 5L16 11l4 1.5v3c0 1.4-1.2 2.5-2.6 2.4C10.8 18.2 5.8 13.2 5.1 6.6 5 5.2 5.6 4 7 3Z" />,
  }
  return <svg className="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{paths[name]}</svg>
}

function Logo({ light = false }) {
  return <a className={`logo ${light ? 'logo-light' : ''}`} href="#home" aria-label="LiftIQ home">
    <img className="logo-image" src={`${import.meta.env.BASE_URL}liftiq-logo.png`} alt="LiftIQ" />
  </a>
}

function DocumentLink({ document, action = 'view', className = '' }) {
  const isDownload = action === 'download'
  return <a className={`text-link ${className}`} href={document.path} target={isDownload ? undefined : '_blank'} rel={isDownload ? undefined : 'noreferrer'} download={isDownload ? true : undefined}>
    {isDownload ? 'Download' : 'View'} <Icon name="arrow" />
  </a>
}

function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('home')
  const [detailsOpen, setDetailsOpen] = useState(false)
  const [form, setForm] = useState({ name: '', email: '', organization: '', subject: '', message: '' })
  const [formState, setFormState] = useState(null)
  const [documentsAvailable, setDocumentsAvailable] = useState({ brochure: true, profile: true })

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      const visible = entries.filter((entry) => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]
      if (visible) setActiveSection(visible.target.id)
    }, { rootMargin: '-30% 0px -55% 0px', threshold: [0.1, 0.3, 0.6] })
    document.querySelectorAll('main section[id]').forEach((section) => observer.observe(section))
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    Promise.all(Object.entries(documents).map(async ([key, document]) => {
      try {
        const response = await fetch(document.path)
        return [key, response.ok]
      } catch {
        return [key, false]
      }
    })).then((results) => setDocumentsAvailable(Object.fromEntries(results)))
  }, [])

  const closeMenu = () => setMenuOpen(false)
  const updateForm = (event) => setForm({ ...form, [event.target.name]: event.target.value })
  const submitForm = (event) => {
    event.preventDefault()
    setFormState({ type: 'success', text: 'Thank you. Your inquiry is ready to be connected to a mail or form service. No message was sent because this site has no backend yet.' })
  }

  return <>
    <div className="topbar"><div className="container topbar-inner"><span><span className="status-dot"></span> AI-powered predictive crowd management</span><a href="mailto:liftiq@spit.ac.in">liftiq@spit.ac.in</a><a href="#contact">Contact the team <Icon name="arrow" /></a></div></div>
    <header className="navbar">
      <div className="container nav-inner"><Logo />
        <button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)} aria-label={menuOpen ? 'Close menu' : 'Open menu'} aria-expanded={menuOpen}><Icon name={menuOpen ? 'close' : 'menu'} /></button>
        <nav className={menuOpen ? 'nav-links open' : 'nav-links'} aria-label="Primary navigation">
          {navItems.map(([id, label], index) => <a key={`${id}-${index}`} className={activeSection === id ? 'active' : ''} href={`#${id}`} onClick={closeMenu}>{label}</a>)}
          <a className="nav-cta" href="#contact" onClick={closeMenu}>Discuss a pilot <Icon name="arrow" /></a>
        </nav>
      </div>
    </header>

    <main>
      <section id="home" className="hero-section">
        <div className="container hero-grid">
          <div className="hero-copy"><p className="eyebrow">DEEPTECH / PROPTECH INNOVATION</p><h1>Waiting for a lift becomes <em>the thing of the past.</em></h1>
            <p className="hero-tagline">AI-powered predictive crowd management for the lifts you already have.</p>
            <p className="hero-description">LiftIQ is designed to transform existing elevators into smarter, more responsive systems. By reusing lobby CCTV and adding a compact edge-AI controller, LiftIQ estimates passenger demand and helps optimize elevator dispatch without replacing existing lifts.</p>
            <div className="button-row"><a className="button button-primary" href="#how-it-works">Explore how it works <Icon name="arrow" /></a><DocumentLink document={documents.brochure} action="download" className="button button-secondary" /></div>
            <div className="hero-values"><span>Retrofit installation</span><span>No lift downtime <small>intended design goal</small></span><span>Video stays on-device</span></div>
          </div>
          <div className="hero-visual" aria-label="Abstract illustration of a connected intelligent building">
            <div className="visual-glow"></div><div className="tower"><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i></div>
            <div className="visual-card card-cctv"><span className="signal"></span><strong>LIVE LOBBY VIEW</strong><small>aggregate occupancy</small></div>
            <div className="visual-card card-ai"><span className="ai-chip">AI</span><strong>EDGE CONTROLLER</strong><small>local processing</small></div>
            <div className="visual-line line-one"></div><div className="visual-line line-two"></div>
            <div className="hero-caption">Intelligence added to<br /><b>existing infrastructure.</b></div>
          </div>
        </div>
      </section>

      <section id="promotional-video" className="section video-section">
        <div className="container">
          <div className="section-intro two-col">
            <div><p className="eyebrow">SEE LIFTIQ IN ACTION</p><h2>Our <em>promo.</em></h2></div>
            <p>Discover how LiftIQ brings predictive intelligence to the lifts buildings already have. Watch the promotional video to learn more about the vision behind the concept.</p>
          </div>
          <div className="video-frame">
            <iframe
              src={promotionalVideo.previewUrl}
              title="LiftIQ promotional video"
              allow="autoplay; fullscreen"
              allowFullScreen
            ></iframe>
          </div>
          <a className="video-fallback" href={promotionalVideo.fileUrl} target="_blank" rel="noreferrer">Open the promotional video in Google Drive <Icon name="arrow" /></a>
        </div>
      </section>

      <section id="about" className="section about-section"><div className="container">
        <div className="section-intro two-col"><div><p className="eyebrow">ABOUT US</p><h2>Making existing lifts <em>smarter.</em></h2></div><p>LiftIQ is a proposed AI-powered predictive crowd management system that retrofits onto existing elevators. It reuses lobby CCTV feeds and adds an external edge-AI controller that estimates passenger demand by floor and supports optimized elevator dispatch.</p></div>
        <div className="vision-grid"><div className="vision-block"><span>Vision</span><h3>Waiting for a lift becomes a thing of the past, in every building and every Indian city.</h3></div><div className="vision-block"><span>Mission</span><p>To turn existing lifts into smart lifts with AI and a low-cost retrofit, so residents, especially elderly people and families, spend less time waiting and more time living.</p></div></div>
        <div className="value-grid">{[['building', 'Accessible', 'Designed to support a fairer elevator experience for elderly residents, children, families, and building staff.'], ['shield', 'Safety first', 'Designed to preserve normal elevator operation and keep LiftIQ separate from the elevator safety system.'], ['eye', 'Privacy first', 'Video is processed on the device; the intended data flow retains aggregate counts rather than CCTV footage.'], ['wallet', 'Affordable', 'A retrofit approach intended to cost substantially less than replacing or adding elevators.']].map(([icon, title, text]) => <article className="value-card" key={title}><Icon name={icon} /><h3>{title}</h3><p>{text}</p></article>)}</div>
      </div></section>

      <section className="section problem-section"><div className="container">
        <div className="section-intro two-col"><div><p className="eyebrow">THE OPPORTUNITY</p><h2>Elevator congestion is an <em>everyday problem.</em></h2></div><p>Morning and evening peaks create simultaneous demand across multiple floors. In high-rise societies, backup-power operation can reduce elevator availability while replacing or adding lifts brings high cost and significant disruption.</p></div>
        <div className="stat-band"><strong>5–15 <small>minutes</small></strong><div><h3>of daily waiting per resident at peak hours</h3><p>Estimate to be validated through the pilot.</p></div></div>
        <div className="comparison"><div><span className="comparison-label">Conventional approach</span><h3>Replace or add elevators.</h3><ul><li>Potentially high costs.</li><li>Significant installation disruption.</li><li>May depend on new equipment or control-board replacement.</li></ul></div><div className="comparison featured"><span className="comparison-label">Proposed LiftIQ approach</span><h3>Reuse suitable existing infrastructure.</h3><ul><li>Reuse existing lobby CCTV where suitable.</li><li>Add an external edge-AI controller.</li><li>Provide predictive demand and dispatch assistance.</li></ul><p className="fine-print">A proposed approach; compatibility varies by building and requires assessment.</p></div></div>
      </div></section>

      <section id="how-it-works" className="section process-section"><div className="container"><div className="center-intro"><p className="eyebrow">HOW IT WORKS</p><h2>Sense. Predict. Dispatch. <em>Learn.</em></h2><p>A continuous, edge-based feedback loop designed around the lifts a building already has.</p></div>
        <div className="stage-grid">{stages.map(([number, title, text], index) => <article className="stage-card" key={title}><span className="stage-number">{number}</span><div className="stage-icon"><span>{index === 0 ? '◌' : index === 1 ? '⌁' : index === 2 ? '→' : '↗'}</span></div><h3>{title}</h3><p>{text}</p>{index < 3 && <span className="stage-arrow"><Icon name="arrow" /></span>}</article>)}</div>
        <div className="details-panel"><button onClick={() => setDetailsOpen(!detailsOpen)} aria-expanded={detailsOpen}>View technical details <span>{detailsOpen ? '−' : '+'}</span></button>{detailsOpen && <div className="details-content"><p>The proposed technical flow includes CCTV-based person detection, lobby occupancy estimation, queue-state classification, historical demand profiles, and machine-learning-based demand forecasting. Dispatch recommendation logic is intended to pass through safety checks and call-rate limits, with aggregate operational logging.</p><p>LiftIQ does not control elevator motors or doors and does not replace the elevator's authoritative control system.</p></div>}</div>
      </div></section>

      <section className="section architecture-section"><div className="container"><div className="section-intro two-col"><div><p className="eyebrow">SYSTEM ARCHITECTURE</p><h2>Smart intelligence. <em>Existing infrastructure.</em></h2></div><p>A proposed information flow that keeps the existing elevator controller responsible for operation and safety functions.</p></div>
        <div className="architecture"><div className="architecture-flow">{[['building', 'Existing lobby CCTV', 'Waiting-area video'], ['chart', 'LiftIQ edge-AI controller', 'Local occupancy + forecasting'], ['chart', 'Prediction & dispatch logic', 'Current + historical demand'], ['shield', 'Safety checks', 'Configured limits + signals'], ['building', 'Isolated call-interface board', 'Proposed interface'], ['building', 'Existing elevator controller', 'Operation + safety']].map(([icon, title, sub], index) => <div className="arch-node" key={title}><Icon name={icon} /><strong>{title}</strong><small>{sub}</small>{index < 5 && <span className="flow-arrow">↓</span>}</div>)}</div><div className="dashboard-node"><Icon name="chart" /><strong>Committee dashboard</strong><small>Aggregate counts, trends, reports, and alerts</small><span className="dashboard-line"></span></div></div>
        <div className="principle-list">{['No elevator replacement is intended.', 'Video processing is performed locally.', 'Only aggregate operational information is intended to leave the device.', 'The existing elevator controller remains responsible for operation.', 'Compatibility assessment and qualified elevator professionals are required.'].map((item) => <span key={item}><b>+</b>{item}</span>)}</div>
      </div></section>

      <section className="section benefits-section"><div className="container"><div className="center-intro"><p className="eyebrow">WHY LIFTIQ</p><h2>Why societies <em>choose LiftIQ.</em></h2></div><div className="benefit-grid">{[['chart', 'Shorter waits at peak', 'Predictive demand management aims to improve elevator responsiveness during busy periods.'], ['building', 'Fairer access', 'Designed to support a more responsive experience for elderly residents, families, and building staff.'], ['chart', 'Better demand visibility', 'Understand floor-wise usage patterns and recurring periods of congestion.'], ['wallet', 'Less disruptive upgrade', 'A retrofit approach intended to reuse suitable existing infrastructure.'], ['eye', 'Privacy-conscious processing', 'Video processing takes place locally on the Edge Unit.'], ['mail', 'Remote monitoring', 'A committee dashboard is intended to provide aggregate usage reports and operational alerts.']].map(([icon, title, text]) => <article className="benefit-card" key={title}><Icon name={icon} /><h3>{title}</h3><p>{text}</p></article>)}</div></div></section>

      <section className="section safety-section"><div className="container"><div className="center-intro"><p className="eyebrow">DESIGNED WITH CARE</p><h2>Safety first. <em>Privacy first.</em></h2></div><div className="safety-grid"><article><div className="safety-heading"><Icon name="eye" /><h3>Privacy panel</h3></div><ul><li>Local video processing.</li><li>No intended storage of CCTV footage.</li><li>No face recognition in the proposed design.</li><li>No cross-day tracking of individual residents.</li><li>Aggregate counts and operational information for reporting.</li></ul></article><article><div className="safety-heading"><Icon name="shield" /><h3>Safety panel</h3></div><ul><li>Dispatch actions pass through configured safety checks.</li><li>Call-rate limits restrict excessive requests.</li><li>Maintenance, inspection, and override signals can block actions.</li><li>A watchdog is intended to stop actions when the required heartbeat is lost.</li><li>The existing elevator controller retains its own safety responsibilities.</li></ul></article></div><div className="concept-note">LiftIQ is a proposed system at the concept/pre-pilot stage. Its hardware compatibility, safety behavior, and operational performance must be validated before deployment.</div></div></section>

      <section id="pricing" className="section pricing-section"><div className="container"><div className="section-intro two-col"><div><p className="eyebrow">PRICING MODEL</p><h2>A retrofit model designed for <em>existing buildings.</em></h2></div><p>LiftIQ intends to serve Resident Welfare Associations, initially focusing on G+10 and taller residential societies in Mumbai.</p></div><div className="pricing-grid"><article><span>One-time installation</span><strong>₹1,20,000</strong><small>per building</small><p>Includes the proposed installation and initial setup.</p></article><article className="pricing-featured"><span>Monthly subscription</span><strong>₹3,000</strong><small>per building per month</small><p>Intended to cover predictive functionality, dashboard access, and support.</p></article></div><div className="price-callout"><strong>Approximately ₹30 per flat per month</strong><span>for a 100-flat society</span></div><p className="disclaimer">Illustrative planning prices. Actual pricing will be validated through RWA discussions, a costed bill of materials, installation estimates, and pilot results.</p></div></section>

      <section className="section roadmap-section"><div className="container"><div className="center-intro"><p className="eyebrow">THE ROAD AHEAD</p><h2>From concept to <em>real-world validation.</em></h2><p>Proposed Year-One milestones, not completed achievements.</p></div><div className="roadmap">{[['01', 'Months 1–3', 'Validate & protect', ['Interview at least 10 RWAs about demand and willingness to pay.', 'Conduct a costed bill-of-materials exercise.', 'Evaluate patent strategy and validate pricing assumptions.']], ['02', 'Months 4–6', 'Build prototype', ['Develop the Edge-AI prototype using recorded lobby footage.', 'Obtain an elevator-safety expert review.', 'Define privacy, consent, and installation procedures.']], ['03', 'Months 7–9', 'Pilot', ['Target two pilot societies.', 'Evaluate demand forecasting and waiting-time measurements.', 'Collect feedback from residents and committees.']], ['04', 'Months 10–12', 'Launch preparation', ['Seek conversion of successful pilots to paid subscriptions.', 'Target eight additional installations.', 'Pursue the proposed ₹35 lakh seed-funding requirement.']]].map(([number, time, title, items]) => <article key={number}><span className="roadmap-number">{number}</span><small>{time}</small><h3>{title}</h3><ul>{items.map((item) => <li key={item}>{item}</li>)}</ul></article>)}</div></div></section>

      <section className="section business-section"><div className="container"><div className="business-top"><div><p className="eyebrow">THE BUSINESS BEHIND LIFTIQ</p><h2>A focused path from <em>prototype to pilot.</em></h2></div><p>Planning assumptions from the business plan, subject to customer validation, installation costs, subscriptions, and pilot performance.</p></div><div className="business-grid"><div><strong>₹35 LAKH</strong><span>Proposed seed-funding requirement.</span></div><div><strong>YEAR 3</strong><span>Projected operating breakeven.</span></div><div><strong>MUMBAI FIRST</strong><span>Initial target: G+10 and taller residential societies, with possible future expansion.</span></div></div></div></section>

      <section id="documents" className="section documents-section"><div className="container"><div className="section-intro two-col"><div><p className="eyebrow">REFERENCE MATERIAL</p><h2>See the thinking <em>behind LiftIQ.</em></h2></div><p>Read the original documents that define the proposed concept, business model, vision, and development roadmap.</p></div><div className="document-grid">{Object.entries(documents).map(([key, document]) => <article className="document-card" key={key}><div className="document-icon">PDF</div><span>Official document</span><h3>{document.label}</h3><p>{document.description}</p>{documentsAvailable[key] ? <div className="document-actions"><DocumentLink document={document} /><DocumentLink document={document} action="download" /></div> : <p className="document-error">This document is unavailable. Place the supplied PDF in <code>public/documents/</code>.</p>}</article>)}</div></div></section>

      <section className="section team-section"><div className="container"><div className="center-intro"><p className="eyebrow">THE TEAM</p><h2>Meet Team <em>Ultron.</em></h2><p>Four project team members bringing together technology, AI, operations, and business planning.</p></div><div className="team-grid">{team.map(([initials, name, role, focus]) => <article className="team-card" key={name}><div className="portrait">{initials}</div><h3>{name}</h3><span>{role}</span><p>{focus}</p></article>)}</div><p className="team-note">Elevator-safety expertise and hardware installation support are planned through external advisors and qualified partners.</p></div></section>

      <section id="contact" className="section contact-section"><div className="container contact-grid"><div className="contact-copy"><p className="eyebrow">CONTACT THE TEAM</p><h2>Let's bring smarter lifts to <em>your building.</em></h2><p>Interested in hosting a LiftIQ pilot, exploring a collaboration, or learning more about the project? Contact the team to discuss the next steps.</p><div className="contact-details"><a href="mailto:liftiq@spit.ac.in"><Icon name="mail" />liftiq@spit.ac.in</a><a href="tel:7864709898"><Icon name="phone" />7864709898</a></div><div className="pilot-callout"><span>Interested in hosting a pilot?</span><a className="button button-primary" href="#contact">Contact LiftIQ <Icon name="arrow" /></a></div></div><form className="contact-form" onSubmit={submitForm}><div className="form-row"><label>Full name<input name="name" value={form.name} onChange={updateForm} required /></label><label>Email address<input name="email" type="email" value={form.email} onChange={updateForm} required /></label></div><label>Organization / housing society<input name="organization" value={form.organization} onChange={updateForm} required /></label><label>Subject<input name="subject" value={form.subject} onChange={updateForm} required /></label><label>Message<textarea name="message" rows="5" value={form.message} onChange={updateForm} required></textarea></label><button className="button button-primary" type="submit">Send inquiry <Icon name="arrow" /></button>{formState && <p className={`form-message ${formState.type}`} role="status">{formState.text}</p>}</form></div></section>
    </main>

    <footer className="footer"><div className="container"><div className="footer-grid"><div><Logo light /><p className="footer-tagline">AI-powered predictive crowd management for the lifts you already have.</p><p className="footer-description">A proposed DeepTech / PropTech concept designed to add intelligence to existing elevator infrastructure.</p></div><div><h4>Quick links</h4><a href="#home">Home</a><a href="#about">About Us</a><a href="#how-it-works">How It Works</a><a href="#pricing">Pricing</a><a href="#contact">Contact Us</a></div><div><h4>Resources</h4><DocumentLink document={documents.brochure} /><DocumentLink document={documents.profile} /><h4 className="footer-contact-title">Contact</h4><a href="mailto:liftiq@spit.ac.in">liftiq@spit.ac.in</a><a href="tel:7864709898">7864709898</a></div></div><div className="footer-bottom"><span>© 2026 LiftIQ project team. All rights reserved.</span><span>Concept-stage, pre-pilot project. Performance, compatibility, pricing, and benefits remain subject to validation.</span></div></div></footer>
  </>
}

export default App
