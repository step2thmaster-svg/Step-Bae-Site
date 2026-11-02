import { useState } from 'react'
import Header from './components/Header.jsx'
import Button from './components/Button.jsx'
import Footer from './components/Footer.jsx'
import AudienceTag, { audienceColor } from './components/AudienceTag.jsx'
import { topics, insights, formatDate } from './components/insights.js'

const topicLabel = (id) => topics.find((t) => t.id === id)?.label

// the filters above the list, which double as its color key: who an article is for, or the journal articles
const filters = [
  { id: 'all', label: 'All', test: () => true },
  { id: 'dentists', label: 'For Dentists', test: (p) => p.audience !== 'patients' },
  { id: 'patients', label: 'For Patients', test: (p) => p.audience !== 'dentists' },
  { id: 'journal', label: 'Published in Journals', test: (p) => p.source },
]
const filterDot = { dentists: 'bg-gold', patients: 'bg-teal', journal: 'bg-ink' }

export default function InsightsPage() {
  const [filter, setFilter] = useState('all')
  const [query, setQuery] = useState('')
  // a search matches the title, summary, topic and publication
  const words = query.toLowerCase().split(/\s+/).filter(Boolean)
  const matches = (p) => {
    const text = [p.title, p.excerpt, p.topic && topicLabel(p.topic), p.source].filter(Boolean).join(' ').toLowerCase()
    return words.every((w) => text.includes(w))
  }
  const filtered = insights.filter((p) => filters.find((f) => f.id === filter).test(p) && matches(p))
  // the newest article leads, larger, until the list is filtered or searched
  const browsing = filter === 'all' && !words.length
  const featured = browsing ? insights[0] : null
  const shown = featured ? filtered.slice(1) : filtered
  return (
    <div className="min-h-screen bg-ink">
      <div className="relative">
        <Header />

        {/* 1. editorial hero; top padding clears the header, as on the other pages */}
        <section className="px-6 pb-9 pt-[124px] text-center lg:px-12">
          <p className="text-[12px] font-semibold tracking-[0.3em] text-gold">INSIGHTS</p>
          <h1 className="mt-3 font-display text-[40px] font-medium leading-[1.08] text-white md:text-[52px]">
            Notes <em className="font-normal">from the</em> <em className="font-normal text-gold">Bench</em>
          </h1>
          <p className="mx-auto mt-4 max-w-[600px] text-[15px] leading-[1.6] text-white/90 md:text-[16px]">
            Articles from Step Toothmaster Bae, CDT, DTG, and STEPBAE.COM: practical lab insight for dentists, and clear
            answers for patients about the restorations in their smile.
          </p>
          {/* some article photos carry the name Bay, the spelling Step used from about 2012 to 2023 */}
          <p className="mx-auto mt-3 max-w-[560px] text-[14px] italic leading-relaxed text-white/60">
            Some photos credit “Step Bay,” the spelling of Step’s surname from 2012 to 2023.
          </p>
        </section>
      </div>

      {/* 2. every article, newest first, color coded by audience */}
      <section id="latest" className="bg-cream px-6 py-10 text-ink lg:px-12">
        <div className="mx-auto max-w-[1200px]">
          <div className="flex items-center gap-6">
            <h2 className="whitespace-nowrap font-display text-[28px] font-medium leading-none md:text-[32px]">All Articles</h2>
            <span className="hidden h-px flex-1 bg-gold-dark/40 sm:block" />
          </div>
          {/* filter by who it's for, or show only the journal articles; search on the right */}
          <div className="mt-5 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div className="flex flex-wrap gap-2" role="group" aria-label="Filter articles">
            {filters.map((f) => {
              const count = insights.filter(f.test).length
              const on = filter === f.id
              return (
                <button
                  key={f.id}
                  onClick={() => setFilter(f.id)}
                  aria-pressed={on}
                  className={`flex items-center gap-2 rounded-full border px-4 py-1.5 text-[13px] font-medium transition-colors ${
                    on ? 'border-ink bg-ink text-cream' : 'border-ink/20 text-ink/80 hover:border-ink/50'
                  }`}
                >
                  {filterDot[f.id] && <span className={`h-2 w-2 rounded-full ${on && f.id === 'journal' ? 'bg-cream' : filterDot[f.id]}`} />}
                  {f.label}
                  <span className={on ? 'text-cream/60' : 'text-ink/45'}>{count}</span>
                </button>
              )
            })}
          </div>
            <label className="relative block md:w-[260px]">
              <span className="sr-only">Search articles</span>
              <svg viewBox="0 0 24 24" aria-hidden="true" className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-ink/45" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <circle cx="11" cy="11" r="7" />
                <path d="m20 20-3.5-3.5" />
              </svg>
              <input
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search: veneers, shade, zirconia…"
                className="h-10 w-full rounded-full border border-ink/20 bg-white/70 pl-10 pr-4 text-[14px] text-ink placeholder:text-ink/40 focus:border-ink/60 focus:outline-none"
              />
            </label>
          </div>

          {/* the newest article, featured wide above the rest */}
          {featured && (
            <a
              href={featured.href}
              {...(featured.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
              className="group relative mt-6 grid overflow-hidden rounded-[3px] border border-ink/15 bg-white/70 transition-colors hover:border-ink/40 md:grid-cols-[1.25fr_1fr]"
            >
              <span className={`absolute inset-x-0 top-0 z-10 h-1 ${audienceColor[featured.audience]}`} />
              <div className="aspect-[16/9] overflow-hidden bg-ink md:aspect-auto md:min-h-[300px]">
                {featured.image && (
                  <img
                    src={featured.image}
                    alt=""
                    style={{ objectPosition: featured.imagePosition }}
                    className={`h-full w-full transition-transform duration-700 ${featured.source ? 'object-contain' : 'object-cover group-hover:scale-105'}`}
                  />
                )}
              </div>
              <div className="flex flex-col justify-center px-6 py-6 md:px-9">
                <p className="text-[11px] font-semibold tracking-[0.3em] text-gold-dark">LATEST</p>
                <div className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-1.5">
                  <AudienceTag audience={featured.audience} />
                  {featured.topic && <p className="text-[11px] font-semibold tracking-[0.2em] text-gold-dark">{topicLabel(featured.topic).toUpperCase()}</p>}
                </div>
                <h3 className="mt-3 font-display text-[28px] font-medium leading-tight md:text-[32px]">{featured.title}</h3>
                {featured.excerpt && <p className="mt-3 text-[15px] leading-[1.6] text-ink/80">{featured.excerpt}</p>}
                <p className="mt-4 flex items-center justify-between gap-4 text-[12px] text-ink/60">
                  {formatDate(featured.date)}
                  <span className="text-[13px] font-semibold text-gold-dark group-hover:text-ink">Read article →</span>
                </p>
              </div>
            </a>
          )}

          {!filtered.length && (
            <p className="mt-10 text-center text-[15px] text-ink/70">
              No articles match “{query}”.{' '}
              <button onClick={() => { setQuery(''); setFilter('all') }} className="font-semibold text-gold-dark underline underline-offset-4">
                Show all
              </button>
            </p>
          )}

          {insights.length > 0 ? (
            // every article as an even, compact card, so the whole library fits in a few rows
            <div className="mt-4 grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-4 lg:grid-cols-4">
              {shown.map((p) => {
                const Card = p.href ? 'a' : 'article'
                return (
                  <Card
                    key={`${p.date}${p.title}`}
                    {...(p.href ? { href: p.href } : {})}
                    {...(p.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                    title={p.excerpt}
                    // the band across the top shows who the article is for
                    className={`group relative flex flex-col overflow-hidden rounded-[3px] border border-ink/15 bg-white/60 transition-colors ${p.href ? 'hover:border-ink/40' : ''}`}
                  >
                    <span className={`absolute inset-x-0 top-0 z-10 h-1 ${audienceColor[p.audience]}`} />
                    {/* a journal article's photo is shown whole, on black; an article without one shows its topic */}
                    <div className="aspect-[16/10] overflow-hidden bg-ink">
                      {p.image ? (
                        <img
                          src={p.image}
                          alt=""
                          loading="lazy"
                          style={{ objectPosition: p.imagePosition }}
                          className={`h-full w-full transition-transform duration-500 ${p.source ? 'object-contain' : 'object-cover group-hover:scale-105'}`}
                        />
                      ) : (
                        <span className="flex h-full items-center justify-center px-4 text-center font-display text-[18px] italic text-gold/80">
                          {p.topic ? topicLabel(p.topic) : 'Published Article'}
                        </span>
                      )}
                    </div>
                    <div className="flex flex-1 flex-col px-3.5 pb-3.5 pt-3 md:px-4">
                      <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
                        <AudienceTag audience={p.audience} />
                        <p className="hidden text-[10px] font-semibold tracking-[0.18em] text-gold-dark sm:block">
                          {(p.topic ? topicLabel(p.topic) : p.source ? 'Published Article' : 'Article').toUpperCase()}
                        </p>
                      </div>
                      <h3 className="mt-2 line-clamp-3 font-display text-[16px] font-medium leading-snug md:text-[18px]">{p.title}</h3>
                      <p className="mt-auto pt-2 text-[11.5px] leading-snug text-ink/60">
                        {p.source && <>{p.source} · </>}
                        {formatDate(p.date)}
                        {p.external && <span className="text-gold-dark"> · Read online ↗</span>}
                        {!p.href && p.readIn && (
                          <span className="italic text-gold-dark"> · {/members/.test(p.readIn) ? 'Members only' : p.readIn.replace(`${p.source}, `, '')}</span>
                        )}
                      </p>
                    </div>
                  </Card>
                )
              })}
            </div>
          ) : (
            <div className="mt-8 rounded-[3px] border border-dashed border-gold-dark/40 bg-white/40 px-6 py-12 text-center">
              <p className="font-display text-[26px] italic leading-tight">The first articles are on the way.</p>
              <p className="mx-auto mt-3 max-w-[460px] text-[14px] leading-[1.55] text-ink/75">
                In the meantime, Step is happy to answer a question or talk through a case.
              </p>
              <Button href="/consultation.html#inquiry" className="mt-6 h-10 px-6">
                Ask a Question
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* 3. conversion: one next step for each audience, in its color */}
      <section className="border-t border-gold/30 px-6 py-14 lg:px-12">
        <div className="mx-auto grid max-w-[1000px] gap-4 md:grid-cols-2">
          <div className="relative overflow-hidden rounded-[3px] border border-gold/30 bg-ink-2 p-8 text-center">
            <span className={`absolute inset-x-0 top-0 h-1 ${audienceColor.dentists}`} />
            <p className="text-[12px] font-semibold tracking-[0.3em] text-gold">FOR DENTISTS</p>
            <h2 className="mt-3 font-display text-[30px] italic leading-tight text-white">Ready to send a case?</h2>
            <p className="mt-3 text-[14px] leading-[1.55] text-white/80">Work directly with Step on your next esthetic or implant case.</p>
            <Button href="/partnership.html#partner-form" className="mt-6 h-10 px-6">Start a Case</Button>
          </div>
          <div className="relative overflow-hidden rounded-[3px] border border-teal/30 bg-ink-2 p-8 text-center">
            <span className={`absolute inset-x-0 top-0 h-1 ${audienceColor.patients}`} />
            <p className="text-[12px] font-semibold tracking-[0.3em] text-teal">FOR PATIENTS</p>
            <h2 className="mt-3 font-display text-[30px] italic leading-tight text-white">Questions about your smile?</h2>
            <p className="mt-3 text-[14px] leading-[1.55] text-white/80">Ask about crowns, veneers or implant teeth, and how they’re made.</p>
            <Button href="/consultation.html#inquiry" variant="ghost" className="mt-6 h-10 px-6">Ask a Question</Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
