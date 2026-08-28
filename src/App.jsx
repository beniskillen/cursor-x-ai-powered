import { useMemo, useState } from 'react'

const PASSWORD = 'Cursor'
const BASE = import.meta.env.BASE_URL
const asset = (file) => `${BASE}assets/${file}`

const CHAT_MAIL =
  'mailto:ross@aipowered.xyz?subject=Cursor%20%C3%97%20AI%20Powered%20%E2%80%94%20let%27s%20talk&body=Nick%20%E2%80%94%20I%20have%20read%20the%20private%20proposal.%20This%20is%20not%20a%20take-it-or-leave-it%20price.%20We%20want%20to%20partner%20with%20you.%20Let%27s%20have%20a%20conversation%20about%20where%20Cursor%20sits%20now%2C%20and%20where%20this%20year%20should%20go.'
const WHATSAPP = 'https://wa.me/447790598385'

const TABS = [
  { id: 'welcome', nav: 'Welcome' },
  { id: 'where', nav: 'Where You Are' },
  { id: 'approach', nav: 'Approach' },
  { id: 'method', nav: 'Methodology' },
  { id: 'scale', nav: 'Scale' },
  { id: 'invest', nav: 'Investment' },
]

const PRO_PLUS = 60
const COHORT = 1000
const MONTHS = 12
const COMPOUND = 0.08

const LINE_ITEMS = [
  {
    label: 'Category rights and partnership architecture',
    amount: 20000,
    value: 'The named layer, not a logo',
    items: [
      '12-month exclusive AI-assisted building and agent platform category',
      'Naming, executive planning, conflict management',
      'Held on written mutual intent; exclusive on countersignature and first payment',
    ],
  },
  {
    label: 'Roadmap lab and pre-event adoption',
    amount: 15000,
    value: 'People arrive already on Cursor',
    items: [
      'Audience research for the operator room',
      'Pre-work in every ticket: account, first repo or no-repo task, agent brief',
      'Early activation design and feedback loops',
    ],
  },
  {
    label: '2 October Canggu Launch Lab',
    amount: 15000,
    value: 'A dated proof pack, not a slide',
    items: [
      'Live build, install stations, user interviews',
      'Measurement and a proof pack your named owner co-signs',
      'Format-proof if the intro lands late — Cursor-ready, not necessarily Cursor-logoed',
    ],
  },
  {
    label: 'October 2027 flagship integration',
    amount: 30000,
    value: 'The public APAC theatre',
    items: [
      'Mainstage / command-centre integration',
      'Workshops, build tracks, enterprise clinics',
      'Presenting partner on the professional stream',
    ],
  },
  {
    label: 'Content, clipping and 60-day adoption',
    amount: 10000,
    value: 'The year after the weekend',
    items: [
      'Livestream and clip desk for reuse',
      'Tutorials, build diaries, 60-day follow-up sequence',
      'Assets your field team can keep using after the hall empties',
    ],
  },
  {
    label: 'Measurement and co-authored case study',
    amount: 10000,
    value: 'A story you can stand behind',
    items: [
      'Attribution and reconciliation against your activation definition',
      'Insight reports for GTM and product',
      'One co-authored case study — no guaranteed counts',
    ],
  },
]

function compoundingSeries() {
  const flat = []
  const compound = []
  let runningFlat = 0
  let runningComp = 0
  for (let m = 1; m <= MONTHS; m++) {
    const flatMrr = COHORT * PRO_PLUS
    const arpu = PRO_PLUS * Math.pow(1 + COMPOUND, m - 1)
    const compMrr = COHORT * arpu
    runningFlat += flatMrr
    runningComp += compMrr
    flat.push({ m, mrr: flatMrr, cum: runningFlat, arpu: PRO_PLUS })
    compound.push({ m, mrr: compMrr, cum: runningComp, arpu })
  }
  return { flat, compound }
}

function money(n) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(n)
}

function Tag({ children }) {
  return <span className="ev"> [{children}]</span>
}

function Pull({ onClick, children }) {
  return (
    <div className="pull">
      <button type="button" onClick={onClick}>{children}</button>
    </div>
  )
}

function ChatButtons({ ghost }) {
  return (
    <div className="ctas">
      <a className={`btn${ghost ? '' : ' btn-accent'}`} href={CHAT_MAIL}>
        We want to partner with you
      </a>
      <a className="btn btn-ghost" href={WHATSAPP} target="_blank" rel="noreferrer">
        Let’s chat on WhatsApp
      </a>
    </div>
  )
}

function PageEnd({ onNext, nextLabel }) {
  return (
    <div className="page-end">
      <div>
        <p className="mono">Next</p>
        {onNext && nextLabel ? (
          <Pull onClick={onNext}>{nextLabel}</Pull>
        ) : (
          <p className="end-note">The number is a starting point. The conversation is the point.</p>
        )}
      </div>
      <ChatButtons />
    </div>
  )
}

function TeamRail() {
  return (
    <aside className="rail" aria-label="About the team">
      <p className="mono">About the team</p>
      <h2>Who walks this with you</h2>
      <p className="rail-lede">
        Not a vendor slide. The people who would run the year.
      </p>

      <article className="who">
        <img src={asset('ross.png')} alt="Ross Power" />
        <div>
          <strong>Ross Power</strong>
          <span>Founder, AI Powered · authority, stage, curriculum, close</span>
        </div>
      </article>
      <p className="who-bio">
        Accenture design-thinking and workshops, then product leadership through startups and as Head of Product at NYSE-listed Genius Group. Built AI Powered to teach operators to ship — Bali, London, Dubai. Philosophy: confidence comes from doing. ~120 people through the method in 2026.
      </p>

      <article className="who">
        <img src={asset('ben.jpg')} alt="Ben Killen presenting" />
        <div>
          <strong>Ben Killen</strong>
          <span>Commercial owner · pipeline, attribution, sponsor reporting</span>
        </div>
      </article>
      <p className="who-bio">
        Growth Labs: revenue systems from first principles. Named career proof includes 2× at Introvert, $80k+ productised revenue at Ethos, 30% YOY at MTP Health, and $1.5M+ attributed sales at Fortem. Installs the follow-up until revenue happens.{' '}
        <a href="https://beniskillen.github.io/Growth-Labs/" target="_blank" rel="noreferrer">Growth Labs</a>
      </p>

      <ul className="who-list">
        <li>
          <strong>Andy</strong>
          Creative direction, brand, capture on the ground
        </li>
        <li>
          <strong>Michael Halomoan Sihombing</strong>
          Product and web — sites, scorecards, dashboards
        </li>
        <li>
          <strong>Carmelita Santania Fahik</strong>
          Operations — CRM, programme admin, coordination
        </li>
        <li>
          <strong>Event layer</strong>
          Streaming and clipping with a professional desk (Pukecast is the candidate, not yet contracted). Speaker support via Tekla where the relationship is live.
        </li>
      </ul>

      <div className="rail-cta">
        <p className="mono">The ask</p>
        <p>We’ve done the work of sitting where you sit. This is an invitation to talk — not a firm price.</p>
        <a className="btn btn-accent" href={CHAT_MAIL}>Let’s have a conversation</a>
      </div>
    </aside>
  )
}

function CompoundChart() {
  const { flat, compound } = useMemo(compoundingSeries, [])
  const max = compound[compound.length - 1].mrr
  const w = 640
  const h = 220
  const pad = { l: 44, r: 12, t: 12, b: 28 }
  const innerW = w - pad.l - pad.r
  const innerH = h - pad.t - pad.b
  const x = (i) => pad.l + (i / 11) * innerW
  const y = (v) => pad.t + innerH - (v / max) * innerH
  const path = (series) =>
    series.map((d, i) => `${i === 0 ? 'M' : 'L'} ${x(i).toFixed(1)} ${y(d.mrr).toFixed(1)}`).join(' ')

  return (
    <div className="chart">
      <p className="mono">Modelled monthly Cursor revenue from the 1,000-person room</p>
      <svg viewBox={`0 0 ${w} ${h}`} role="img" aria-label="Pro Plus floor versus compounding usage">
        {[0.25, 0.5, 0.75, 1].map((t) => (
          <line
            key={t}
            x1={pad.l}
            x2={w - pad.r}
            y1={y(max * t)}
            y2={y(max * t)}
            stroke="#d9d8d2"
            strokeWidth="1"
          />
        ))}
        <path d={path(flat)} fill="none" stroke="#26251e" strokeWidth="2" />
        <path d={path(compound)} fill="none" stroke="#f54e00" strokeWidth="2.5" />
        {flat.map((d, i) => (
          <text key={d.m} x={x(i)} y={h - 8} textAnchor="middle" fontSize="10" fill="#7a7974" fontFamily="IBM Plex Mono, monospace">
            {d.m}
          </text>
        ))}
        <text x={4} y={y(max) + 4} fontSize="10" fill="#7a7974" fontFamily="IBM Plex Mono, monospace">
          {money(max).replace('.00', '')}
        </text>
      </svg>
      <div className="legend">
        <span><i style={{ background: '#26251e' }} /> Flat Pro+ · $60 × 1,000</span>
        <span><i style={{ background: '#f54e00' }} /> Usage compounding 8% month on month</span>
      </div>
    </div>
  )
}

function Hero({ photo, eyebrow, title, caption }) {
  return (
    <div className="hero">
      <div className="hero-photo" style={{ backgroundImage: `url(${asset(photo)})` }} />
      <div className="hero-veil" />
      <div className="hero-copy">
        <p className="mono">{eyebrow}</p>
        <h1>{title}</h1>
        {caption && <p className="caption">{caption}</p>}
      </div>
    </div>
  )
}

export default function App() {
  const [ok, setOk] = useState(() => sessionStorage.getItem('aip-cursor') === '1')
  const [pw, setPw] = useState('')
  const [err, setErr] = useState('')
  const [tab, setTab] = useState('welcome')
  const idx = TABS.findIndex((t) => t.id === tab)
  const go = (id) => {
    setTab(id)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }
  const next = () => go(TABS[Math.min(idx + 1, TABS.length - 1)].id)

  const { flat, compound } = useMemo(compoundingSeries, [])
  const floorYear = flat[flat.length - 1].cum
  const compoundYear = compound[compound.length - 1].cum
  const month12Arpu = compound[compound.length - 1].arpu

  if (!ok) {
    return (
      <div className="gate">
        <div className="gate-photo" style={{ backgroundImage: `url(${asset('malaysia-12.jpg')})` }} />
        <div className="gate-veil" />
        <div className="gate-card">
          <div className="gate-logos">
            <img src={asset('aip-logo.png')} alt="AI Powered" />
            <span className="sep" />
            <img src={asset('cursor-mark.svg')} alt="Cursor" />
          </div>
          <p className="mono">Private proposal</p>
          <h1>Cursor × AI Powered</h1>
          <p>Prepared for Nick and Cursor GTM. August 2026. A conversation, not a media kit.</p>
          <form
            onSubmit={(e) => {
              e.preventDefault()
              if (pw === PASSWORD) {
                sessionStorage.setItem('aip-cursor', '1')
                setOk(true)
              } else setErr('That password is not right.')
            }}
          >
            <input
              type="password"
              autoComplete="current-password"
              placeholder="Password"
              value={pw}
              onChange={(e) => { setPw(e.target.value); setErr('') }}
            />
            {err && <div className="err">{err}</div>}
            <button type="submit">Open the proposal</button>
          </form>
          <p className="gate-credit">Photo: Cursor × Anthropic Hackathon Malaysia, Monash University. Tech-Critter, Dec 2025.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="shell">
      <header className="header">
        <div className="header-inner">
          <div className="brand">
            <img src={asset('aip-logo.png')} alt="AI Powered" />
            <span className="sep" />
            <img src={asset('cursor-mark.svg')} alt="Cursor" height="22" />
          </div>
          <div className="header-meta">
            <span className="mono">Private proposal</span>
            <span className="mono">{idx + 1} / 6</span>
            <a className="btn btn-header" href={CHAT_MAIL}>Let’s have a conversation</a>
          </div>
        </div>
        <nav className="tabs">
          {TABS.map((t) => (
            <button
              key={t.id}
              className={`tab${tab === t.id ? ' active' : ''}`}
              onClick={() => go(t.id)}
              type="button"
            >
              {t.nav}
            </button>
          ))}
        </nav>
      </header>

      <div className="body">
        {tab === 'welcome' && (
          <main className="page">
            <Hero
              photo="malaysia-12.jpg"
              eyebrow="Welcome"
              title="The year Cursor owns the room that keeps building"
              caption="Cursor × Anthropic, Malaysia — 684 in the building. The pattern is yours. The missing piece is twelve months."
            />

            <div className="results">
              <div className="result accent">
                <div className="n">{money(100000)}</div>
                <div className="l">Suggested partnership</div>
                <div className="tag">A starting number, not a locked invoice</div>
              </div>
              <div className="result">
                <div className="n">{money(floorYear)}</div>
                <div className="l">Modelled Pro+ floor</div>
                <div className="tag">1,000 × $60 × 12 months<Tag>M</Tag></div>
              </div>
              <div className="result">
                <div className="n">7.2×</div>
                <div className="l">Floor versus the cash</div>
                <div className="tag">Before compounding. Cursor defines activation.</div>
              </div>
            </div>

            <div className="person">
              <img className="avatar-img" src={asset('ross.png')} alt="" />
              <div>
                <strong>Ross Power</strong>
                <span>Founder, AI Powered. I teach operators to ship real work, and I want Cursor to be the layer they ship on.</span>
              </div>
            </div>

            <div className="prose tight">
              <p>Nick,</p>
              <p className="lead">This is a private proposal for how Cursor sits beside AI Powered for twelve months. It is not a media kit, and it is not a logo on a slide.</p>
              <p>You already fund this motion on weekends. Copilot, Claude Code and Windsurf can buy those same weekends. What they cannot buy — yet — is a year of operators who keep building on Cursor, with a clip desk and a proof pack your APJ hire walks into.</p>
              <p>This is not a hall of demos. The flagship sits on Productize Yourself and a room of people who already run businesses. Cursor is the layer they build on from the first brief, because the mandate is AI-first commercial work.</p>
              <p>Forty thousand dollars starts Canggu on 2 October. The rest follows when the work has named it. Sashen can open the door. Ben and I will walk you through it.</p>
            </div>

            <div className="dials">
              <div className="dial">
                <div className="n">1,000</div>
                <div className="l">In person, Bali</div>
                <div className="tag">Paid seats · campaign target<Tag>P</Tag></div>
              </div>
              <div className="dial">
                <div className="n">10,000</div>
                <div className="l">Unique stream viewers</div>
                <div className="tag">Distribution layer<Tag>M</Tag></div>
              </div>
              <div className="dial">
                <div className="n">5,000</div>
                <div className="l">Concurrent peak</div>
                <div className="tag">Not added to unique<Tag>M</Tag></div>
              </div>
            </div>
            <p className="note">Three separate jobs. Not a blended audience of 11,000.</p>

            <div className="plan">
              <div className="plan-node now">
                <div className="mono when">Now</div>
                <strong>Deposit + Canggu proof</strong>
              </div>
              <div className="plan-node">
                <div className="mono when">2026–27</div>
                <strong>Cursor season</strong>
              </div>
              <div className="plan-node">
                <div className="mono when">Oct 2027</div>
                <strong>Bali flagship</strong>
              </div>
              <div className="plan-node">
                <div className="mono when">+60 days</div>
                <strong>Clip tail</strong>
              </div>
              <div className="plan-node">
                <div className="mono when">After</div>
                <strong>Alumni network</strong>
              </div>
            </div>

            <PageEnd onNext={next} nextLabel="First, where Cursor already is →" />
          </main>
        )}

        {tab === 'where' && (
          <main className="page">
            <Hero
              photo="raise-dsc09291.jpg"
              eyebrow="Where You Are"
              title="You already buy the build environment. You do not yet own the year."
              caption="RAISE Week, powered by Cursor. Title position, credits, workshops. The pattern is yours."
            />

            <div className="prose tight">
              <p>Cursor’s public sponsorship pattern is consistent, and it is the right pattern. Product as the environment. Credits off the first-use tax. Workshops next to judging.</p>
              <p>That is the first company. It works. The second company is the one your careers page is already hiring for.</p>
            </div>

            <div className="section">
              <h2>The field you are in</h2>
              <p className="prose">GitHub Copilot is still the volume default in Microsoft shops. Claude Code is the agentic terminal people stay loyal to. Windsurf is the other IDE fork in the same conversation. At AI Engineer World’s Fair 2026, Anthropic, OpenAI and Microsoft bought the wall. You spoke.</p>
              <div className="field">
                <article>
                  <p className="mono">GitHub Copilot</p>
                  <h3>The default they can roll out without a new IDE</h3>
                  <p>Distribution through GitHub and Microsoft. Easy for enterprise IT. A weekend hackathon does not move that default.</p>
                </article>
                <article>
                  <p className="mono">Claude Code</p>
                  <h3>The agent people rave about in the terminal</h3>
                  <p>Anthropic already sat next to you in Malaysia. Credits in the same room. Loyalty follows the week after the weekend.</p>
                </article>
                <article>
                  <p className="mono">Windsurf</p>
                  <h3>The other fork in the IDE conversation</h3>
                  <p>Same shape of product. Same events they can title. The difference is who becomes the named layer for a year of operator work.</p>
                </article>
              </div>
              <blockquote className="quote">The point is not that they are behind. The point is those weekend rooms are still open — and this year is how Cursor keeps the people who leave them.</blockquote>
            </div>

            <div className="section">
              <h2>What Cursor already funds</h2>
              <div className="cards">
                <article className="card">
                  <img src={asset('raise-dsc09291.jpg')} alt="RAISE Week audience, Cursor on the badge" />
                  <div className="card-body">
                    <p className="mono">Jul 2026 · Paris</p>
                    <h3>RAISE Hackathon</h3>
                    <p>Main sponsor. Product as the build environment. Organiser prize pool €250k+ — not attributed to Cursor.</p>
                    <p className="miss">Missing: a year, an operator curriculum, an owned stream.</p>
                    <p className="credit">Photo: RAISE Summit, RAISE Week / Cursor. <a href="https://www.raisesummit.com/hackathon" target="_blank" rel="noreferrer">raisesummit.com/hackathon</a></p>
                  </div>
                </article>
                <article className="card">
                  <img src={asset('malaysia-12.jpg')} alt="Cursor x Anthropic Hackathon Malaysia group" />
                  <div className="card-body">
                    <p className="mono">Dec 2025 · Malaysia</p>
                    <h3>Cursor × Anthropic</h3>
                    <p>684 in the building at Monash. 140 projects in 24 hours. US$50 Cursor credit each. Anthropic in the same room.</p>
                    <p className="miss">Missing: twelve-month retained Pro+ usage, not a one-week credit.</p>
                    <p className="credit">Photo: Tech-Critter recap. Direct file: <a href="https://www.tech-critter.com/wp-content/uploads/2025/12/Cursor-x-Anthropic-AI-Hackathon-12.webp" target="_blank" rel="noreferrer">Hackathon-12.webp</a></p>
                  </div>
                </article>
                <article className="card">
                  <img src={asset('heilbronn.jpg')} alt="Cursor Hackathon Heilbronn recap — 166 developers, 65 teams, 30 hours" />
                  <div className="card-body">
                    <p className="mono">Mar 2026 · Heilbronn</p>
                    <h3>Cursor Hackathon</h3>
                    <p>Title sponsor. 166 developers, 65 teams, 30 hours at Openspace. Credits for every participant.</p>
                    <p className="miss">Missing: APAC operator LTV and a broadcast.</p>
                    <p className="credit">Organiser recap graphic: <a href="https://www.creators-ecosystem.de/en/blog/cursor-hackathon-heilbronn-2026" target="_blank" rel="noreferrer">CREATORS Ecosystem</a>. Floor photos live on the LinkedIn recap; CDN hotlinks expire.</p>
                  </div>
                </article>
                <article className="card">
                  <img src={asset('vancouver-li.jpg')} alt="Cursor Hackathon Vancouver group in the UBC room" />
                  <div className="card-body">
                    <p className="mono">2026 · Vancouver</p>
                    <h3>Cursor Hackathon</h3>
                    <p>114 at UBC; 136 advertised at BCIT. US$50 credit. Screens say Cursor. Pizza boxes on the tables.</p>
                    <p className="miss">Missing: 1,000 in a room who still need Pro+ a year later.</p>
                    <p className="credit">Photo: Shawn Esquivel recap of Vancouver’s first Cursor Hackathon. <a href="https://cursor-hackathon-vancouver.devpost.com/" target="_blank" rel="noreferrer">Devpost</a></p>
                  </div>
                </article>
              </div>
              <p className="note">Ambassadors already prove you want year-round community. World’s Fair 2026: you spoke; Anthropic, OpenAI and Microsoft bought the wall. <a href="https://cursor.com/ambassadors" target="_blank" rel="noreferrer">cursor.com/ambassadors</a></p>
            </div>

            <div className="section">
              <h2>The people in the room</h2>
              <ul className="roster">
                <li><strong>Nick.</strong> Cursor GTM. The reader these pages are for.</li>
                <li><strong>Sashen.</strong> The warm route. Opens the call. Does not replace a Cursor-side owner.</li>
                <li><strong>Ross Power.</strong> Authority, stage, and the close. I do not work around your marketing hire.</li>
                <li><strong>Ben Killen.</strong> Commercial owner — pipeline, attribution, sponsor reporting. Growth Labs.</li>
                <li><strong>Your named owner, once you name them.</strong> Every recommendation leaves with their name beside mine.</li>
              </ul>
            </div>

            <div className="section">
              <h2>Hire versus this season</h2>
              <p className="note">Not a substitute for these roles. The proof environment they walk into. Roles live on <a href="https://cursor.com/careers" target="_blank" rel="noreferrer">cursor.com/careers</a> as of 28 Aug 2026.</p>
              <div className="hire">
                <div>
                  <p className="mono">Open at Cursor</p>
                  <ul>
                    <li><a href="https://cursor.com/careers/head-of-apj-field-marketing" target="_blank" rel="noreferrer">Head of APJ Field Marketing · Singapore</a></li>
                    <li>Integrated Campaigns, APJ · Australia</li>
                    <li><a href="https://cursor.com/careers" target="_blank" rel="noreferrer">Marketing Manager, Startup Events &amp; Programs</a></li>
                    <li>Field Engineer — ASEAN / ANZ</li>
                    <li>Forward Deployed Engineer — Australia / Singapore</li>
                    <li>Product Education Engineer</li>
                  </ul>
                </div>
                <div>
                  <p className="mono">This US$100,000 season</p>
                  <ul>
                    <li>12-month APAC operator theatre</li>
                    <li>Startup-event craft + product education</li>
                    <li>1,000 in-person builders on Pro+</li>
                    <li>Owned stream + clip desk</li>
                    <li>Scored talent shortlist</li>
                    <li>Proof pack your hires inherit</li>
                  </ul>
                </div>
              </div>
            </div>

            <PageEnd onNext={next} nextLabel="Here is the approach →" />
          </main>
        )}

        {tab === 'approach' && (
          <main className="page">
            <Hero
              photo="malaysia-1.jpg"
              eyebrow="Approach"
              title="Prove it in Canggu. Compound for a year. Launch in Bali."
              caption="The event is the theatre. The cohort is the factory line. Cursor is station one."
            />
            <div className="prose tight">
              <p>This is how Cursor shows up in an operator’s week: before they fly, while they build, and for sixty days after they leave — clips, office hours, a case study. The public teaching is at <a href="https://www.aipowered.xyz/programmes/claude" target="_blank" rel="noreferrer">aipowered.xyz/programmes/claude</a>.</p>
            </div>

            <div className="section">
              <h2>Our process</h2>
              <p className="lead-plain">The twentieth-century factory line moved parts. This one moves offers, systems and revenue.</p>
              <div className="prose">
                <p>The weekend rooms you already buy produce a project. We produce a project with a commercial outcome attached. Upgrade is the public theatre. Productize Yourself — the twelve-thousand-dollar programme behind it — is the line those operators stay on. Marketing, sales, operations, people, product, finance. AI-first is the mandate. Cursor is the named build layer from the first brief, not a credit handed out at the door.</p>
              </div>

              <div className="factory">
                {[
                  ['01', 'Diagnose', 'The actual week: offer, pipeline, ops, not a tool tour'],
                  ['02', 'Encode', 'Context and standards live in Cursor before anyone flies'],
                  ['03', 'Ship', 'A commercial artefact — funnel, workflow, internal tool, product'],
                  ['04', 'Connect', 'It talks to the rest of the business. They stop being the glue'],
                  ['05', 'Run', 'Twelve months of retained Pro+. The playbook leaves with them'],
                ].map(([n, t, d]) => (
                  <div className="factory-step" key={n}>
                    <p className="mono">{n}</p>
                    <h3>{t}</h3>
                    <p>{d}</p>
                  </div>
                ))}
              </div>

              <p className="mono" style={{ margin: '28px 0 10px' }}>The attached cohort</p>
              <div className="functions">
                {['Marketing', 'Sales', 'Operations', 'People', 'Product', 'Finance'].map((f) => (
                  <span key={f}>{f}</span>
                ))}
              </div>
              <p className="note">People leave with a playbook for growing a business, not a weekend demo. Successful operators already in the book hold the standard: if you use Cursor here, you are building something that has to work.</p>

              <div className="proofs">
                <article>
                  <p className="mono">AI Powered · the book</p>
                  <h3>Operators who already sell</h3>
                  <p>Ross’s network is founders, consultants and teams across Bali, London and Dubai — not weekend hackers collecting a credit. ~120 people through the method in 2026.<Tag>U</Tag> Productize Yourself is the twelve-month line behind the hall.</p>
                  <ul>
                    <li><strong>Jamie Roy.</strong> From hesitant to building production-ready agents in weeks. Qualitative; we are documenting the commercial follow-through.</li>
                    <li><strong>Miri.</strong> Practical work that ships — real workflows, not a chat window.</li>
                    <li>The book is the filter. People in the room are already in business. Cursor sits inside that week.</li>
                  </ul>
                </article>
                <article>
                  <p className="mono">Growth Labs · commercial proof</p>
                  <h3>Revenue systems, not theatre</h3>
                  <p>Ben’s cases are career-named and public. Same rigor the cohort is taught: diagnose the constraint, productise the offer, install the line, measure cash.</p>
                  <ul>
                    <li><strong>Introvert / 27 Letters.</strong> 2× agency revenue in 12 months. LinkedIn relationship BD as the single mechanism.</li>
                    <li><strong>Ethos Performance.</strong> Productised a high-margin online line. $80k+ in the first 12 months.</li>
                    <li><strong>MTP Health.</strong> 30% YOY as first Head of Growth. Specialised offer, not another gym-adjacent menu.</li>
                    <li><strong>Fortem Media.</strong> $1.5M+ attributed sales from a category-led BD system. Creative delivery stayed with the studio.</li>
                  </ul>
                </article>
              </div>
              <blockquote className="quote wide">Cursor becomes part of businesses that make money — because the line they are on is a winning formula, not a hackathon weekend.</blockquote>
            </div>

            <div className="phases">
              <article className="phase">
                <p className="mono">Phase 1 · Prove · deposit · now → 2 Oct 2026</p>
                <h3>Canggu Launch Lab</h3>
                <p>A small public test so neither of us is guessing at Bali. Named Cursor owner, an activation definition, a credit pool, and a yes to the deposit.</p>
                <ul>
                  <li>Pre-work, live build, install stations, interviews, proof pack</li>
                  <li>Category architecture drafted — exclusive only on countersignature and first payment</li>
                </ul>
              </article>
              <article className="phase">
                <p className="mono">Phase 2 · Compound · Milestone A · Nov 2026 → Aug 2027</p>
                <h3>Cursor becomes the build layer inside the year</h3>
                <p>Pre-work in every ticket. One sponsor-defined challenge. We watch activation, retained use, and who is already on a path to Pro+ for twelve months.</p>
              </article>
              <article className="phase">
                <p className="mono">Phase 3 · Launch · Milestone B · Sep–Dec 2027</p>
                <h3>The public APAC theatre</h3>
                <p>One thousand in the room. Cursor as presenting partner of the stream. Then sixty days of clips. Production is not paid for before the proof pack and the venue are real.</p>
              </article>
              <article className="phase future">
                <p className="mono">Later · unpriced · Scale</p>
                <h3>Year two, other cities, SDK inside alumni products</h3>
                <p>Named after the first season. Not in this proposal on purpose.</p>
              </article>
            </div>
            <PageEnd onNext={next} nextLabel="The methodology →" />
          </main>
        )}

        {tab === 'method' && (
          <main className="page">
            <Hero
              photo="malaysia-5.jpg"
              eyebrow="Methodology"
              title="Four of six levels are in scope now"
              caption="Same method. Cursor nouns. No new framework brand."
            />
            <p className="note">Levels 1–4 in scope. Levels 5–6 future. The attached Productize Yourself cohort covers the whole operator week — not just code.</p>
            <div className="functions" style={{ marginBottom: 28 }}>
              {['Marketing', 'Sales', 'Operations', 'People', 'Product', 'Finance'].map((f) => (
                <span key={f}>{f}</span>
              ))}
            </div>
            <div className="levels">
              {[
                ['01', 'Context', 'Cursor in the operator’s actual week', 'Not a tool tour. Offers, funnels, internal tools, client work.', false],
                ['02', 'Customise', 'Launch Lab pre-work', 'Account, credits, first repo or no-repo task — before Canggu and before Bali. The first-use tax is gone the way it was in Malaysia.', false],
                ['03', 'Create', 'Live builds, command centre, install concierge', 'Mainstage and lab time end in something shipped. First meaningful build action, not a scan.', false],
                ['04', 'Connect', 'Talent, clip desk, enterprise clinics', 'Scored submissions. A ranked shortlist. Clips your field team can reuse. Team conversations counted separately from sign-ups.', false],
                ['05', 'Code', 'SDK and agent factory inside alumni products', 'Whether alumni should be launching and managing what they started on Cursor. Named after the first season. Not priced here.', true],
                ['06', 'Command', 'Upgrade as the annual Cursor APAC theatre', 'If the first year holds, the event becomes the place your APAC story is told in public. Not priced here.', true],
              ].map(([num, name, title, text, future]) => (
                <div className={`level${future ? ' future' : ''}`} key={num}>
                  <div className="num">{num}{future ? ' · future' : ''}</div>
                  <div>
                    <h3>{name} — {title}</h3>
                    <p>{text}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="section">
              <h2>Activation theatre</h2>
              <div className="tiles">
                {[
                  ['Launch Lab pre-work', 'Account + first meaningful action'],
                  ['Mainstage multi-agent build', 'Build copied, remixed, or launched'],
                  ['Agent command centre', 'Completed tasks and team qualifications'],
                  ['Install concierge', 'Verified activation event'],
                  ['Company Challenge', 'Scored submissions and ranked shortlist'],
                  ['Stream + clip desk', 'View → clip → account, on a separate rail'],
                  ['Enterprise clinics', 'Qualified team opportunity'],
                  ['60-day ladder', 'Repeat usage and retained Pro+'],
                ].map(([t, d]) => (
                  <div className="tile" key={t}>
                    <h3>{t}</h3>
                    <p>{d}</p>
                  </div>
                ))}
              </div>
            </div>
            <PageEnd onNext={next} nextLabel="What comes after that →" />
          </main>
        )}

        {tab === 'scale' && (
          <main className="page">
            <Hero
              photo="malaysia-floor.jpg"
              eyebrow="Scale"
              title="The second year is a different conversation"
              caption="Named. Not numbered. Same room energy — a different geography."
            />
            <div className="prose tight">
              <p>Launch in Bali is how this becomes a public operating model for Cursor in APAC. What comes after — other cities, corporate offsites, a house people stay in to keep building, a second year of exclusivity — is not in this proposal on purpose.</p>
              <p><strong>Level 5 · Code</strong> — Cursor SDK and agent workflows inside products alumni actually run. Unpriced.</p>
              <p><strong>Level 6 · Command</strong> — Upgrade as an annual Cursor APAC command theatre, with a stream and a talent layer that is already warm. Unpriced.</p>
            </div>
            <blockquote className="quote">Education and relationship first. Then scale once the work has named what to build.</blockquote>
            <p className="note">In person: Canggu on 2 October 2026. Bali in October 2027. BNDCC / Westin Nusa Dua / Hilton — working venue route, not a confirmed booking.</p>
            <PageEnd onNext={next} nextLabel="The investment →" />
          </main>
        )}

        {tab === 'invest' && (
          <main className="page">
            <p className="mono" style={{ paddingTop: 28 }}>Investment</p>
            <h1 className="invest-title">A suggested partnership. Then we talk.</h1>
            <p className="lead-plain">This is not “this is the price.” It is what we believe this year is worth, laid out so you can see every line, and a conversation about where you actually want to sit.</p>

            <div className="invest">
              <div className="mono label">Suggested cash sponsorship</div>
              <div className="fig">US$100,000</div>
              <p className="invest-sub">Twelve months. One exclusive build-and-agent category. Canggu proof, the year-round layer, the October 2027 flagship, the clip tail.</p>
            </div>
            <p className="note">Product credits, prizes, Cursor technical staff and travel sit outside this figure, as cash or in kind. Cursor seats are at cost to Cursor. No AIP margin.</p>

            <div className="section">
              <h2>Transparent breakdown</h2>
              <p className="note">The same US$100,000, by job. Relative value is the cash we associate with each deliverable — not a menu you pick from.</p>
              <div className="breakdown">
                {LINE_ITEMS.map((row) => (
                  <article key={row.label}>
                    <header>
                      <div>
                        <h3>{row.label}</h3>
                        <p>{row.value}</p>
                      </div>
                      <div className="amt">{money(row.amount)}</div>
                    </header>
                    <ul>
                      {row.items.map((item) => <li key={item}>{item}</li>)}
                    </ul>
                    <div className="bar-track"><div className="bar-fill" style={{ width: `${row.amount / 1000}%` }} /></div>
                  </article>
                ))}
                <div className="breakdown-total">
                  <span>In-scope total</span>
                  <strong>US$100,000</strong>
                </div>
              </div>
            </div>

            <div className="section">
              <h2>The cohort is a Pro+ year, not a weekend of credits</h2>
              <p>Assumption for this model: the average customer in the 1,000-person flagship needs a <strong>Cursor Pro+ plan for at least 12 months</strong>, and their usage compounds as they productise.<Tag>P</Tag></p>
              <p className="note">Pro+ is US$60 / month. Daily agent users typically US$60–100 / month total usage; power users often US$200+.<Tag>V</Tag> <a href="https://cursor.com/docs/account/pricing" target="_blank" rel="noreferrer">cursor.com/docs/account/pricing</a></p>
              <div className="kpi">
                <div>
                  <div className="n">{money(floorYear)}</div>
                  <div className="l">Floor · 1,000 × $60 × 12 months. Subscription only, no overage.</div>
                </div>
                <div>
                  <div className="n">{money(compoundYear)}</div>
                  <div className="l">Compounding · 8% month-on-month usage. Month-12 ARPU {money(month12Arpu)}.</div>
                </div>
                <div>
                  <div className="n">7.2×</div>
                  <div className="l">Floor LTV versus US$100,000 cash, before compounding.</div>
                </div>
              </div>
              <CompoundChart />
              <p className="note">Modelled, not a guarantee. If 50% of the room retains Pro+ for a year, the floor is still {money(floorYear / 2)} — more than the sponsorship. Cursor defines activation. Account created does not count.</p>
            </div>

            <div className="section">
              <h2>How the money moves</h2>
              <p>The first decision is a deposit, not the full cheque. The US$10,000 lock-in reserve inside the deposit is Cursor’s contribution to venue and speaker holds. Later tranches cannot claw it back.</p>
              <table className="table">
                <thead>
                  <tr><th>Tranche</th><th>Amount</th><th>Trigger</th><th>Funds</th></tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Deposit</td>
                    <td>US$40,000</td>
                    <td>Yes + first invoice</td>
                    <td>Canggu US$15k · architecture US$15k · lock-in reserve US$10k</td>
                  </tr>
                  <tr>
                    <td>Milestone A</td>
                    <td>US$30,000</td>
                    <td>Proof pack + flagship brief</td>
                    <td>Buildathon season and flagship design</td>
                  </tr>
                  <tr>
                    <td>Milestone B</td>
                    <td>US$30,000</td>
                    <td>T–60, venue held, attribution live</td>
                    <td>Flagship production, stream, clip tail, case study</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="section">
              <h2>Conversion ladder</h2>
              <p className="rail-label">Two rails. Room is denser. Stream is larger-volume. Never collapse them.</p>
              <div className="ladder">
                {['Qualified impression', 'Click or scan', 'Account created', 'First meaningful build action', 'Retained usage / Pro+', 'Team or enterprise opportunity'].map((s, i) => (
                  <div className="step" key={s}>
                    <span className="dot" />
                    <span>{s}</span>
                    <span className="ev">{i < 2 ? 'M' : i === 3 ? 'Cursor defines' : 'M'}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="section">
              <h2>Next steps</h2>
              <ol className="roster" style={{ listStyle: 'decimal', paddingLeft: 20 }}>
                <li>Sashen introduces Ross and Ben to Nick and the GTM room.</li>
                <li>30-minute conversation: owner, APAC priority, category appetite, what can be launched in public.</li>
                <li>Evidence exchange: your activation definition; our verified audience.</li>
                <li>Term sheet shaped around this breakdown — or a no.</li>
                <li>Deposit. 2 October as the small test.</li>
              </ol>
              <PageEnd />
            </div>
          </main>
        )}

        <TeamRail />
      </div>

      <footer className="footer">
        Prepared exclusively for Nick and Cursor GTM · Prepared by Ross Power, AI Powered · August 2026 · Draft · Working name Upgrade · Numbers labelled [V] verified, [U] internal, [M] modelled, [P] proposed.
      </footer>
    </div>
  )
}
