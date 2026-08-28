import { useMemo, useState } from 'react'

const PASSWORD = 'Cursor'
const BASE = import.meta.env.BASE_URL
const asset = (file) => `${BASE}assets/${file}`

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
        <div className="gate-photo" style={{ backgroundImage: `url(${asset('bali.jpg')})` }} />
        <div className="gate-veil" />
        <div className="gate-card">
          <div className="gate-logos">
            <img src={asset('aip-logo.png')} alt="AI Powered" />
            <span className="sep" />
            <img src={asset('cursor-mark.svg')} alt="Cursor" />
          </div>
          <p className="mono">Private proposal</p>
          <h1>Cursor × AI Powered</h1>
          <p>Prepared for Nick and Cursor GTM. August 2026. Enter the password to continue.</p>
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

      {tab === 'welcome' && (
        <main className="page">
          <div className="hero">
            <div className="hero-photo" style={{ backgroundImage: `url(${asset('bali.jpg')})` }} />
            <div className="hero-veil" />
            <div className="hero-copy">
              <p className="mono">Welcome</p>
              <h1>The year Cursor owns the room that keeps building</h1>
              <p className="caption">Twelve months. One operating layer. A deposit to start.</p>
            </div>
          </div>

          <div className="person">
            <div className="avatar">RP</div>
            <div>
              <strong>Ross Power</strong>
              <span>Founder, AI Powered. I teach operators to ship real work, and I want Cursor to be the layer they ship on.</span>
            </div>
          </div>

          <div className="prose">
            <p>Nick,</p>
            <p className="lead">This is a private proposal for how Cursor belongs beside AI Powered for the next twelve months. It is not a media kit, and it is not a logo on a slide.</p>
            <p>I am building AI Powered to be the most serious AI education company for operators I know how to build. Upgrade is the working name for the event series. Productize Yourself is the twelve-thousand-dollar programme behind it. The flagship in Bali, October 2027, is designed as a thousand founders and operators in the room, ten thousand unique viewers on a professional stream, five thousand concurrent at peak — so the product theatre is not trapped inside the hall.</p>
            <p>When that room designs, builds, reviews or ships, Cursor is the named operating layer. Complementary tools can sit around it. They do not compete with it.</p>
            <p>The average person in that thousand-person room is not a weekend hackathon visitor collecting a credit. They are an operator who will need a <strong>Cursor Pro+ plan for at least twelve months</strong>, with usage that compounds as they productise. That is the commercial outcome this season is built to create.</p>
            <p>You already fund this motion on weekends: RAISE in Paris, Malaysia, Heilbronn, Vancouver, Ambassadors. Those rooms work. They do not compound for a year, they do not teach operators as a curriculum, and they do not give your APJ team a public proof environment while you are still hiring the people who would otherwise have to stand one up.</p>
            <p>These pages exist so you can say yes to a deposit this month. Forty thousand dollars funds the 2 October proof in Canggu, the pre-work architecture, and a lock-in reserve so venue and speaker holds are not waiting on later releases. The rest of the hundred thousand follows when the work has named it.</p>
            <p>Sashen can open the door. Ben and I will walk you through it. I would rather find out what you actually need than sell you what we guessed in August.</p>
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
          <p className="note">These are three separate jobs. They are not a blended audience of 11,000.</p>

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
              <strong>Adoption tail</strong>
            </div>
            <div className="plan-node">
              <div className="mono when">After</div>
              <strong>Alumni network</strong>
            </div>
          </div>

          <Pull onClick={next}>First, where Cursor already is →</Pull>
        </main>
      )}

      {tab === 'where' && (
        <main className="page">
          <div className="hero">
            <div className="hero-photo" style={{ backgroundImage: `url(${asset('louvre.jpg')})` }} />
            <div className="hero-veil" />
            <div className="hero-copy">
              <p className="mono">Where You Are</p>
              <h1>You already buy the build environment. You do not yet own the year.</h1>
              <p className="caption">Title position, mandatory product use, credits, workshops, feedback. The pattern is yours. The step-change is time, audience, and a stream.</p>
            </div>
          </div>

          <div className="prose">
            <p>Cursor’s public sponsorship pattern is consistent, and it is the right pattern. You take title or “powered by Cursor” position. The product is the build environment, not a booth. Credits remove the first-use tax. Workshops sit next to judging. Ambassadors extend it into meetups and product feedback.</p>
            <p>That is the first company. It works. The second company is the one your careers page is already describing.</p>
          </div>

          <div className="section">
            <h2>What Cursor already funds</h2>
            <div className="cards">
              <article className="card">
                <img src={asset('louvre.jpg')} alt="Paris, Carrousel du Louvre setting" />
                <div className="card-body">
                  <p className="mono">Jul 2026 · Paris</p>
                  <h3>RAISE Hackathon</h3>
                  <p>Main sponsor. Product as the build environment at Carrousel du Louvre. Organiser prize pool €250k+ — not attributed to Cursor.</p>
                  <p className="miss">Missing: a year, an operator curriculum, an owned stream.</p>
                  <p><a href="https://www.raisesummit.com/hackathon" target="_blank" rel="noreferrer">raisesummit.com/hackathon</a></p>
                </div>
              </article>
              <article className="card">
                <img src={asset('workshop.jpg')} alt="Builders at work" />
                <div className="card-body">
                  <p className="mono">2025 · Malaysia</p>
                  <h3>Cursor × Anthropic</h3>
                  <p>681 participants. US$50 Cursor credit each. Branded product track, workshops, demos.</p>
                  <p className="miss">Missing: twelve-month retained Pro+ usage, not a one-week credit.</p>
                  <p><a href="https://cursor-hack-my.devpost.com/" target="_blank" rel="noreferrer">cursor-hack-my.devpost.com</a></p>
                </div>
              </article>
              <article className="card">
                <img src={asset('build.jpg')} alt="Laptop build session" />
                <div className="card-body">
                  <p className="mono">2026 · Heilbronn</p>
                  <h3>Build with AI</h3>
                  <p>Title sponsor. Credits for every participant. 30-hour build. Food and drink with ecosystem partners.</p>
                  <p className="miss">Missing: APAC operator LTV and a broadcast.</p>
                  <p><a href="https://gdg.community.dev/events/details/google-gdg-heilbronn-presents-build-with-ai-2026-cursor-hackathon-heilbronn/" target="_blank" rel="noreferrer">GDG Heilbronn</a></p>
                </div>
              </article>
              <article className="card">
                <img src={asset('stage.jpg')} alt="Stage and audience" />
                <div className="card-body">
                  <p className="mono">2026 · Vancouver</p>
                  <h3>Cursor Hackathon</h3>
                  <p>150+ builders advertised. US$50 credit. Lightning talks, live builds, judging.</p>
                  <p className="miss">Missing: 1,000 in a room who still need Pro+ a year later.</p>
                  <p><a href="https://cursor-hackathon-vancouver.devpost.com/" target="_blank" rel="noreferrer">Devpost</a></p>
                </div>
              </article>
            </div>
            <p className="note">Ambassadors already prove you want year-round community. World’s Fair 2026: Cursor spoke; Anthropic, OpenAI and Microsoft bought the wall. <a href="https://cursor.com/ambassadors" target="_blank" rel="noreferrer">cursor.com/ambassadors</a></p>
          </div>

          <blockquote className="quote">Cursor already funds the build environment. This is the year you own the room that keeps building.</blockquote>

          <div className="section">
            <h2>The people in the room</h2>
            <ul className="roster">
              <li><strong>Nick.</strong> Cursor GTM. The reader these pages are for.</li>
              <li><strong>Sashen.</strong> The warm route. Opens the call. Does not replace a Cursor-side owner.</li>
              <li><strong>Ross Power.</strong> Authority, stage, and the close. I do not work around your marketing hire.</li>
              <li><strong>Ben.</strong> Commercial owner, pipeline, attribution, sponsor reporting.</li>
              <li><strong>Your named owner, once you name them.</strong> Partnerships, APJ field marketing, or startup events. Every recommendation leaves with their name beside mine.</li>
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
                  <li>Owned stream as presenting inventory</li>
                  <li>Scored talent shortlist</li>
                  <li>Proof pack your hires inherit</li>
                </ul>
              </div>
            </div>
          </div>

          <Pull onClick={next}>Here is the approach →</Pull>
        </main>
      )}

      {tab === 'approach' && (
        <main className="page">
          <div className="hero">
            <div className="hero-photo" style={{ backgroundImage: `url(${asset('nusa-dua.jpg')})` }} />
            <div className="hero-veil" />
            <div className="hero-copy">
              <p className="mono">Approach</p>
              <h1>Prove it in Canggu. Compound for a year. Launch in Bali.</h1>
              <p className="caption">Cash is gated. The idea is not. The deposit is what lets us lock the date.</p>
            </div>
          </div>
          <div className="prose">
            <p>This is an AI partnership, but it is really about how Cursor shows up in an operator’s week: before they fly, while they build, and for sixty days after they leave. The public teaching is at <a href="https://www.aipowered.xyz/programmes/claude" target="_blank" rel="noreferrer">aipowered.xyz/programmes/claude</a> — proof of method, not the offer.</p>
          </div>
          <div className="phases">
            <article className="phase">
              <p className="mono">Phase 1 · Prove · deposit · now → 2 Oct 2026</p>
              <h3>Canggu Launch Lab</h3>
              <p>A small public test so neither of us is guessing at Bali. We ask for a named Cursor owner, an activation definition (account-created is not enough), a credit pool, and a yes to the deposit.</p>
              <ul>
                <li>Pre-work, live build, install stations, interviews, proof pack</li>
                <li>Category architecture drafted — exclusive only on countersignature and first payment</li>
                <li>If the intro lands after mid-September, this is a format proof: Cursor-ready, not necessarily Cursor-logoed</li>
              </ul>
            </article>
            <article className="phase">
              <p className="mono">Phase 2 · Compound · Milestone A · Nov 2026 → Aug 2027</p>
              <h3>Cursor becomes the build layer inside the year</h3>
              <p>Pre-work in every ticket. One sponsor-defined challenge. Workshops, office hours, enterprise clinics. We watch activation, retained use, and who is already on a path to Pro+ for twelve months.</p>
              <ul>
                <li>Trigger: proof pack delivered and flagship brief approved</li>
                <li>Jobited / HackQuest / NounsDAO can be stood up — proposed until written</li>
              </ul>
            </article>
            <article className="phase">
              <p className="mono">Phase 3 · Launch · Milestone B · Sep–Dec 2027</p>
              <h3>The public APAC theatre</h3>
              <p>One thousand in the room. Cursor as presenting partner of the stream. Then sixty days of clips, office hours and a case study. Production is not paid for before the proof pack and the venue are real.</p>
              <ul>
                <li>Trigger: T–60, venue held, attribution live, ticket pace inside the band</li>
                <li>No guaranteed counts</li>
              </ul>
            </article>
            <article className="phase future">
              <p className="mono">Later · unpriced · Scale</p>
              <h3>Year two, other cities, SDK inside alumni products</h3>
              <p>Named after the first season. Not in this proposal on purpose.</p>
            </article>
          </div>
          <Pull onClick={next}>The methodology →</Pull>
        </main>
      )}

      {tab === 'method' && (
        <main className="page">
          <div className="hero">
            <div className="hero-photo" style={{ backgroundImage: `url(${asset('build.jpg')})` }} />
            <div className="hero-veil" />
            <div className="hero-copy">
              <p className="mono">Methodology</p>
              <h1>Four of six levels are in scope now</h1>
              <p className="caption">Same method. Cursor nouns. No new framework brand.</p>
            </div>
          </div>
          <p className="note">Levels 1–4 in scope. Levels 5–6 future.</p>
          <div className="levels">
            {[
              ['01', 'Context', 'Cursor in the operator’s actual week', 'Not a tool tour. Offers, funnels, internal tools, client work. Shared picture of who ships what; claims you can live with; an activation event you define.', false],
              ['02', 'Customise', 'Launch Lab pre-work', 'Account, credits, first repo or no-repo task, agent brief — before Canggu and before Bali. People arrive having already touched Cursor. The first-use tax is gone the way it was in Malaysia.', false],
              ['03', 'Create', 'Live builds, command centre, install concierge', 'Mainstage and lab time end in something shipped. Cloud agents work on audience problems in view of the room and the stream. First meaningful build action, not a scan.', false],
              ['04', 'Connect', 'Talent, remote gallery, enterprise clinics', 'Scored submissions on a real Cursor brief. A ranked shortlist your field team can use. Team conversations counted separately from sign-ups.', false],
              ['05', 'Code', 'SDK and agent factory inside alumni products', 'Whether alumni should be launching and managing what they started on Cursor, not just demoing it. Named after the first season. Not priced here.', true],
              ['06', 'Command', 'Upgrade as the annual Cursor APAC theatre', 'If the first year holds, the event becomes the place your APAC story is told in public, once a year, with a stream. Not priced here.', true],
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
                ['Stream overlays', 'View → click → account, on a separate rail'],
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
          <Pull onClick={next}>What comes after that →</Pull>
        </main>
      )}

      {tab === 'scale' && (
        <main className="page">
          <div className="hero">
            <div className="hero-photo" style={{ backgroundImage: `url(${asset('nusa-dua.jpg')})` }} />
            <div className="hero-veil" />
            <div className="hero-copy">
              <p className="mono">Scale</p>
              <h1>The second year is a different conversation</h1>
              <p className="caption">Named. Not numbered. Venue still an RFQ shortlist in the Nusa Dua corridor.</p>
            </div>
          </div>
          <div className="prose">
            <p>Launch in Bali is how this becomes a public operating model for Cursor in APAC. What comes after that — other cities, corporate offsites, a house people stay in to keep building, a second year of exclusivity — is not in this proposal on purpose.</p>
            <p><strong>Level 5 · Code</strong> — Cursor SDK and agent workflows inside products alumni actually run. Unpriced.</p>
            <p><strong>Level 6 · Command</strong> — Upgrade as an annual Cursor APAC command theatre, with a stream and a talent layer that is already warm. Unpriced.</p>
            <p>I would rather find out what you actually need than sell you what we guessed in August.</p>
          </div>
          <blockquote className="quote">Education and relationship first. Then scale once the work has named what to build.</blockquote>
          <p className="note">In person: Canggu on 2 October 2026. Bali in October 2027. BNDCC / Westin Nusa Dua / Hilton — working venue route, not a confirmed booking.</p>
          <Pull onClick={next}>The investment →</Pull>
        </main>
      )}

      {tab === 'invest' && (
        <main className="page">
          <p className="mono" style={{ paddingTop: 28 }}>Investment</p>
          <h1 style={{ fontFamily: 'var(--serif)', fontWeight: 500, fontSize: 'clamp(32px,5vw,48px)', letterSpacing: '-0.035em', lineHeight: 1.12, margin: '8px 0 20px' }}>The partnership</h1>
          <p className="prose">This covers Prove, Compound and Launch: twelve months, one exclusive build-and-agent category, the Canggu proof, the year-round layer, and the October 2027 flagship.</p>

          <div className="invest">
            <div className="mono label">Suggested cash sponsorship</div>
            <div className="fig">US$100,000</div>
            <ul>
              <li>Category architecture and 12-month exclusivity</li>
              <li>Launch Lab pre-work and 2 October Canggu proof</li>
              <li>Buildathon season operating layer</li>
              <li>Flagship integration, command centre, presenting partner on the stream</li>
              <li>60-day clip tail, attribution, co-authored case study</li>
            </ul>
          </div>
          <p className="note">Product credits, prizes, Cursor technical staff and travel sit outside this figure, as cash or in kind. Cursor seats are at cost to Cursor. No AIP margin.</p>

          <div className="section">
            <h2>The cohort is a Pro+ year, not a weekend of credits</h2>
            <p>Assumption for this model: the average customer in the 1,000-person flagship needs a <strong>Cursor Pro+ plan for at least 12 months</strong>, and their usage compounds month on month as they productise — more agents, more cloud, more reviews.<Tag>P</Tag></p>
            <p className="note">Pro+ is US$60 / month on Cursor’s public pricing. Cursor’s own usage bands: daily agent users typically US$60–100 / month total usage; power users often US$200+.<Tag>V</Tag> <a href="https://cursor.com/docs/account/pricing" target="_blank" rel="noreferrer">cursor.com/docs/account/pricing</a></p>
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
                <div className="l">Floor LTV versus US$100,000 cash sponsorship, before compounding.</div>
              </div>
            </div>
            <CompoundChart />
            <p className="note">This is modelled, not a guarantee. If 50% of the room retains Pro+ for a year, the floor is still {money(floorYear / 2)} — more than the sponsorship. Cursor defines activation. Account created does not count.</p>
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
                  <td>Flagship production, stream, 60-day tail, case study</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="section">
            <h2>Budget waterfall</h2>
            <div className="bars">
              {[
                ['Category rights & architecture', 20, 'dep'],
                ['Roadmap lab & pre-work', 15, ''],
                ['2 Oct proof', 15, ''],
                ['2027 flagship integration', 30, ''],
                ['Content & 60-day adoption', 10, ''],
                ['Measurement & case study', 10, ''],
                ['Of which lock-in reserve (inside deposit)', 10, 'lock'],
              ].map(([label, k, kind]) => (
                <div className="bar-row" key={label}>
                  <div>
                    <div>{label}</div>
                    <div className="bar-track"><div className={`bar-fill ${kind}`} style={{ width: `${k * 3.2}%` }} /></div>
                  </div>
                  <div>US${k}k</div>
                </div>
              ))}
            </div>
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
              <li>30-minute fit call: owner, APAC priority, category appetite, what can be launched in public.</li>
              <li>Evidence exchange: your activation definition; our verified audience.</li>
              <li>Term sheet: US$100,000, in-kind, category, lock-in reserve.</li>
              <li>Deposit. 2 October as the small test.</li>
              <li>Category held on written mutual intent. Exclusive on countersignature and first payment.</li>
            </ol>
            <div className="ctas">
              <a className="btn" href="mailto:ross@aipowered.xyz?subject=Cursor%20%C3%97%20AI%20Powered&body=Nick%20%E2%80%94%20I%20have%20read%20the%20private%20proposal.%20I%20would%20like%20to%20talk%20through%20the%20deposit%2C%20the%202%20October%20proof%2C%20and%20the%20October%202027%20flagship.">Email Ross</a>
              <a className="btn btn-ghost" href="https://wa.me/447790598385" target="_blank" rel="noreferrer">WhatsApp</a>
            </div>
          </div>
        </main>
      )}

      <footer className="footer">
        Prepared exclusively for Nick and Cursor GTM · Prepared by Ross Power, AI Powered · August 2026 · Draft · Working name Upgrade · Numbers labelled [V] verified, [U] internal, [M] modelled, [P] proposed.
      </footer>
    </div>
  )
}
