import { useEffect, useState } from 'react'
import Header from './components/Header.jsx'
import Button from './components/Button.jsx'
import Footer from './components/Footer.jsx'
import AudienceTag, { audienceColor } from './components/AudienceTag.jsx'
import { ArrowRight } from './components/Icons.jsx'
import { audiences, topics, insights, formatDate, forAudience } from './components/insights.js'

const topicLabel = (id) => topics.find((t) => t.id === id)?.label

// every article is listed on one page; #dentists or #patients in the address narrows it to one audience,
// so each half of the library can still be linked to directly
const filterFromHash = () => (['#dentists', '#patients'].includes(window.location.hash) ? window.location.hash.slice(1) : 'all')

// border color of an active audience card or filter chip
const activeBorder = { all: 'border-ink', dentists: 'border-gold', patients: 'border-teal' }

export default function InsightsPage() {
  const [filter, setFilter] = useState(filterFromHash)
  const [topic, setTopic] = useState(null)

  useEffect(() => {
    const onHash = () => {
      setFilter(filterFromHash())
      setTopic(null)
    }
    window.addEventListener('hashchange', onHash)
    return () => window.removeEventListener('hashchange', onHash)
  }, [])

  const choose = (f) => {
    setFilter(f)
    setTopic(null)
    history.replaceState(null, '', f === 'all' ? location.pathname : `#${f}`)
  }

  const scrollToList = () => document.getElementById('latest')?.scrollIntoView({ behavior: 'smooth' })

  const pickTopic = (id) => {
    setTopic(id)
    scrollToList()
  }

  const inFilter = (p) => filter === 'all' || forAudience(p, filter)
  const shown = insights.filter((p) => inFilter(p) && (!topic || p.topic === topic))
  const filters = [
    ['all', 'All', insights.length],
    ...Object.entries(audiences).map(([id, a]) => [id, a.label, insights.filter((p) => forAudience(p, id)).length]),
  ]
  const topicGroups = Object.keys(audiences).filter((id) => filter === 'all' || filter === id)
  const count = (id) => insights.filter((p) => p.topic === id).length

  return (
    <div className="min-h-screen bg-ink">
      <div className="relative">
        <Header />

        {/* 1. editorial hero; top padding clears the header, as on the other pages */}
        <section className="px-6 pb-12 pt-[138px] text-center lg:px-12">
          <p className="text-[12px] font-semibold tracking-[0.3em] text-gold">INSIGHTS</p>
          <h1 className="mt-4 font-display text-[44px] font-medium leading-[1.08] text-white md:text-[58px]">
            Notes <em className="font-normal">from the</em> <em className="font-normal text-gold">Bench</em>
          </h1>
          <p className="mx-auto mt-5 max-w-[600px] text-[15px] leading-[1.6] text-white/90 md:text-[16px]">
            Articles from Step Toothmaster Bae, CDT, DTG: practical lab insight for dentists, and clear
            answers for patients about the restorations in their smile.
          </p>
          {/* some article photos carry the name Bay, the spelling Step used from about 2012 to 2023 */}
          <p className="mx-auto mt-3 max-w-[560px] text-[14px] italic leading-relaxed text-white/60">
            Some photos credit “Step Bay,” the spelling of Step’s surname from 2012 to 2023.
          </p>
        </section>

        {/* 2. audience entry points, color coded like the article cards; choosing one again shows everything */}
        <section id="audience" className="px-6 pb-14 lg:px-12">
          <div className="mx-auto grid max-w-[1000px] gap-4 sm:grid-cols-2">
            {Object.entries(audiences).map(([id, a]) => {
              const active = filter === id
              return (
                <button
                  key={id}
                  type="button"
                  aria-pressed={active}
                  onClick={() => {
                    choose(active ? 'all' : id)
                    scrollToList()
                  }}
                  className={`group relative overflow-hidden rounded-[3px] border p-6 pt-7 text-left transition-colors md:p-7 md:pt-8 ${
                    active ? `${activeBorder[id]} bg-ink-3` : 'border-white/15 bg-ink-2 hover:border-white/40'
                  }`}
                >
                  <span className={`absolute inset-x-0 top-0 h-1 ${audienceColor[id]}`} />
                  <span className="flex items-center justify-between">
                    <span className={`font-display text-[28px] font-medium leading-none md:text-[32px] ${id === 'patients' ? 'text-teal' : 'text-gold'}`}>
                      {a.label}
                    </span>
                    <ArrowRight className="h-4 w-4 text-white/60 transition-transform group-hover:translate-x-1" />
                  </span>
                  <span className="mt-3 block text-[14px] leading-[1.55] text-white/75">{a.text}</span>
                </button>
              )
            })}
          </div>
        </section>
      </div>

      {/* 3. every article, newest first; the chips filter by audience and double as the color key */}
      <section id="latest" className="scroll-mt-6 bg-cream px-6 py-10 text-ink lg:px-12">
        <div className="mx-auto max-w-[1200px]">
          <div className="flex items-center gap-6">
            <h2 className="whitespace-nowrap font-display text-[28px] font-medium leading-none md:text-[32px]">Latest Insights</h2>
            <span className="hidden h-px flex-1 bg-gold-dark/40 sm:block" />
          </div>
          <div className="mt-4 flex flex-wrap items-center gap-2" role="group" aria-label="Show articles for">
            {filters.map(([id, label, n]) => (
              <button
                key={id}
                type="button"
                aria-pressed={filter === id}
                onClick={() => choose(id)}
                className={`flex items-center gap-2 rounded-full border px-3.5 py-1.5 text-[13px] transition-colors ${
                  filter === id ? `${activeBorder[id]} bg-white text-ink` : 'border-ink/15 text-ink/70 hover:border-ink/40'
                }`}
              >
                {id !== 'all' && <span className={`h-2.5 w-2.5 rounded-full ${audienceColor[id]}`} />}
                {label}
                <span className="text-ink/45">{n}</span>
              </button>
            ))}
            <span className="flex items-center gap-2 px-2 text-[13px] text-ink/60">
              <span className={`h-2.5 w-2.5 rounded-full ${audienceColor.both}`} />
              For both
            </span>
          </div>
          {topic && (
            <p className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-1 text-[14px] text-ink/70">
              <span className="text-gold-dark">{topicLabel(topic)}</span>
              <button type="button" onClick={() => setTopic(null)} className="underline underline-offset-2 hover:text-gold-dark">
                Show all
              </button>
            </p>
          )}

          {shown.length > 0 ? (
            <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {shown.map((p) => {
                const Card = p.href ? 'a' : 'article'
                return (
                  <Card
                    key={`${p.date}${p.title}`}
                    {...(p.href ? { href: p.href } : {})}
                    // posts with a photo are featured wider than the rest (two to a row on large screens), photo beside the text from sm up;
                    // the band across the top shows who the article is for
                    className={`relative flex flex-col overflow-hidden rounded-[3px] border border-ink/15 bg-white/60 pt-1 transition-colors hover:border-ink/40 ${
                      p.image ? 'sm:col-span-2 sm:flex-row' : ''
                    }`}
                  >
                    <span className={`absolute inset-x-0 top-0 h-1 ${audienceColor[p.audience]}`} />
                    {p.image && <img src={p.image} alt="" loading="lazy" style={{ objectPosition: p.imagePosition }} className="aspect-[16/9] w-full object-cover sm:aspect-auto sm:w-2/5 sm:self-stretch" />}
                    <div className={`flex flex-1 flex-col ${p.image ? 'px-5 py-4 sm:justify-center' : 'px-5 py-4'}`}>
                      <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5">
                        <AudienceTag audience={p.audience} />
                        <p className="text-[11px] font-semibold tracking-[0.2em] text-gold-dark">
                          {(p.topic ? topicLabel(p.topic) : p.source ? 'Published Article' : 'Article').toUpperCase()}
                        </p>
                      </div>
                      <h3 className={`mt-2 font-display font-medium leading-tight ${p.image ? 'text-[21px]' : 'text-[20px]'}`}>{p.title}</h3>
                      {p.excerpt && <p className="mt-2 text-[13px] leading-[1.55] text-ink/80">{p.excerpt}</p>}
                      <p className={`pt-3 text-[12px] text-ink/60 ${p.image ? '' : 'mt-auto'}`}>
                        {p.source && <>Published in <span className="text-ink/85">{p.source}</span> · </>}
                        {formatDate(p.date)}
                      </p>
                    </div>
                  </Card>
                )
              })}
            </div>
          ) : (
            <div className="mt-8 rounded-[3px] border border-dashed border-gold-dark/40 bg-white/40 px-6 py-12 text-center">
              <p className="font-display text-[26px] italic leading-tight">Articles on this topic are on the way.</p>
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

      {/* 4. topic categories, grouped by audience; picking one filters the list above */}
      <section className="px-6 py-10 lg:px-12">
        <div className="mx-auto max-w-[1200px]">
          <div className="flex items-center gap-6">
            <h2 className="whitespace-nowrap font-display text-[28px] font-medium leading-none text-white md:text-[32px]">Browse by Topic</h2>
            <span className="hidden h-px flex-1 bg-gold/30 sm:block" />
          </div>
          {topicGroups.map((a) => (
            <div key={a} className="mt-6">
              <p className="flex items-center gap-2 text-[12px] font-semibold tracking-[0.2em] text-white/70">
                <span className={`h-2.5 w-2.5 rounded-full ${audienceColor[a]}`} />
                {audiences[a].label.toUpperCase()}
              </p>
              <div className="mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {topics
                  .filter((t) => t.audience === a)
                  .map((t) => {
                    const n = count(t.id)
                    return (
                      <button
                        key={t.id}
                        type="button"
                        onClick={() => pickTopic(t.id)}
                        className={`group relative overflow-hidden rounded-[3px] border py-4 pl-6 pr-5 text-left transition-colors ${
                          topic === t.id ? `${activeBorder[a]} bg-ink-3` : 'border-white/15 bg-ink-2 hover:border-white/40'
                        }`}
                      >
                        <span className={`absolute inset-y-0 left-0 w-1 ${audienceColor[a]}`} />
                        <span className="flex items-baseline justify-between gap-4">
                          <span className="font-display text-[19px] font-medium leading-tight text-white">{t.label}</span>
                          <span className={`shrink-0 text-[12px] tracking-[0.06em] ${a === 'patients' ? 'text-teal' : 'text-gold'}`}>
                            {n ? `${n} article${n > 1 ? 's' : ''}` : 'Coming soon'}
                          </span>
                        </span>
                        <span className="mt-1.5 block text-[13px] leading-[1.55] text-white/70">{t.text}</span>
                      </button>
                    )
                  })}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 5. conversion: one next step for each audience, in its color */}
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
