import { useEffect, useState } from 'react'
import Header from './components/Header.jsx'
import Button from './components/Button.jsx'
import Footer from './components/Footer.jsx'
import { ArrowRight } from './components/Icons.jsx'
import { audiences, topics, insights, formatDate } from './components/insights.js'

const cases = [
  {
    title: 'Anterior Veneers',
    src: '/images/case-anterior-veneers.jpg',
    text: 'Veneers on the upper central incisors, characterized to blend with the natural teeth beside them.',
  },
  {
    title: 'Posterior Crown & Bridge',
    src: '/images/case-posterior-bridge.jpg',
    text: 'A four-unit posterior ceramic bridge, shaped for function and finished by hand.',
  },
  {
    title: 'All-on-X Bridge',
    src: '/images/case-all-on-x.jpg',
    text: 'An implant bridge with pink ceramic gingiva, built to look natural from the gumline down.',
  },
]

const topicLabel = (id) => topics.find((t) => t.id === id)?.label

// the audience comes from the address (#dentists or #patients) so each half of the library can be linked to directly
const audienceFromHash = () => (window.location.hash === '#patients' ? 'patients' : 'dentists')

export default function InsightsPage() {
  const [audience, setAudience] = useState(audienceFromHash)
  const [topic, setTopic] = useState(null)

  useEffect(() => {
    const onHash = () => {
      setAudience(audienceFromHash())
      setTopic(null)
    }
    window.addEventListener('hashchange', onHash)
    return () => window.removeEventListener('hashchange', onHash)
  }, [])

  const choose = (a) => {
    setAudience(a)
    setTopic(null)
    history.replaceState(null, '', `#${a}`)
  }

  const pickTopic = (id) => {
    setTopic(id)
    document.getElementById('latest')?.scrollIntoView({ behavior: 'smooth' })
  }

  const shown = insights.filter((p) => p.audience === audience && (!topic || p.topic === topic))
  const audienceTopics = topics.filter((t) => t.audience === audience)
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
        </section>

        {/* 2. audience navigation: the two ways into the library */}
        <section id="audience" className="px-6 pb-14 lg:px-12">
          <div className="mx-auto grid max-w-[1000px] gap-4 sm:grid-cols-2" role="tablist" aria-label="Choose who the articles are for">
            {Object.entries(audiences).map(([id, a]) => {
              const active = audience === id
              return (
                <button
                  key={id}
                  type="button"
                  role="tab"
                  aria-selected={active}
                  aria-controls="latest"
                  onClick={() => choose(id)}
                  className={`group rounded-[3px] border p-6 text-left transition-colors md:p-7 ${
                    active ? 'border-gold bg-ink-3' : 'border-gold/25 bg-ink-2 hover:border-gold/60'
                  }`}
                >
                  <span className="flex items-center justify-between">
                    <span className={`font-display text-[28px] font-medium leading-none md:text-[32px] ${active ? 'text-gold' : 'text-white'}`}>
                      {a.label}
                    </span>
                    <ArrowRight className={`h-4 w-4 transition-transform group-hover:translate-x-1 ${active ? 'text-gold' : 'text-white/60'}`} />
                  </span>
                  <span className="mt-3 block text-[14px] leading-[1.55] text-white/75">{a.text}</span>
                </button>
              )
            })}
          </div>
        </section>
      </div>

      {/* 3. latest insights for the chosen audience */}
      <section id="latest" className="scroll-mt-6 bg-cream px-6 py-14 text-ink lg:px-12">
        <div className="mx-auto max-w-[1200px]">
          <div className="flex items-center gap-6">
            <h2 className="whitespace-nowrap font-display text-[36px] font-medium leading-none md:text-[40px]">Latest Insights</h2>
            <span className="hidden h-px flex-1 bg-gold-dark/40 sm:block" />
          </div>
          <p className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-1 text-[14px] text-ink/70">
            <span>{audiences[audience].label}</span>
            {topic && (
              <>
                <span aria-hidden="true">·</span>
                <span className="text-gold-dark">{topicLabel(topic)}</span>
                <button type="button" onClick={() => setTopic(null)} className="underline underline-offset-2 hover:text-gold-dark">
                  Show all
                </button>
              </>
            )}
          </p>

          {shown.length > 0 ? (
            <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {shown.map((p) => {
                const Card = p.href ? 'a' : 'article'
                return (
                  <Card
                    key={`${p.date}${p.title}`}
                    {...(p.href ? { href: p.href } : {})}
                    className="flex flex-col overflow-hidden rounded-[3px] border border-gold-dark/30 bg-white/60 transition-colors hover:border-gold-dark/70"
                  >
                    {p.image && <img src={p.image} alt="" loading="lazy" className="aspect-[16/9] w-full object-cover" />}
                    <div className="flex flex-1 flex-col p-6">
                      <p className="text-[11px] font-semibold tracking-[0.2em] text-gold-dark">
                        {(p.topic ? topicLabel(p.topic) : p.source ? 'Published Article' : 'Article').toUpperCase()}
                      </p>
                      <h3 className="mt-3 font-display text-[24px] font-medium leading-tight">{p.title}</h3>
                      {p.excerpt && <p className="mt-3 text-[14px] leading-[1.55] text-ink/80">{p.excerpt}</p>}
                      <p className="mt-auto pt-5 text-[13px] text-ink/60">
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
              <p className="font-display text-[26px] italic leading-tight">
                {topic ? 'Articles on this topic are on the way.' : 'The first articles here are on the way.'}
              </p>
              <p className="mx-auto mt-3 max-w-[460px] text-[14px] leading-[1.55] text-ink/75">
                {audience === 'patients'
                  ? 'In the meantime, if you have a question about a crown, veneer or implant, Step is happy to help.'
                  : 'In the meantime, Step is happy to talk through a case or a material choice with you.'}
              </p>
              <Button
                href={audience === 'patients' ? '/consultation.html#inquiry' : '/partnership.html#partner-form'}
                className="mt-6 h-10 px-6"
              >
                {audience === 'patients' ? 'Ask a Question' : 'Start a Conversation'}
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* 4. topic categories for the chosen audience; picking one filters the list above */}
      <section className="px-6 py-14 lg:px-12">
        <div className="mx-auto max-w-[1200px]">
          <div className="flex items-center gap-6">
            <h2 className="whitespace-nowrap font-display text-[36px] font-medium leading-none text-white md:text-[40px]">Browse by Topic</h2>
            <span className="hidden h-px flex-1 bg-gold/30 sm:block" />
          </div>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {audienceTopics.map((t) => {
              const n = count(t.id)
              return (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => pickTopic(t.id)}
                  className={`group rounded-[3px] border p-6 text-left transition-colors ${
                    topic === t.id ? 'border-gold bg-ink-3' : 'border-gold/25 bg-ink-2 hover:border-gold/60'
                  }`}
                >
                  <span className="flex items-baseline justify-between gap-4">
                    <span className="font-display text-[23px] font-medium leading-tight text-white">{t.label}</span>
                    <span className="shrink-0 text-[12px] tracking-[0.06em] text-gold">
                      {n ? `${n} article${n > 1 ? 's' : ''}` : 'Coming soon'}
                    </span>
                  </span>
                  <span className="mt-2 block text-[14px] leading-[1.55] text-white/70">{t.text}</span>
                </button>
              )
            })}
          </div>
        </div>
      </section>

      {/* 5. signature case studies */}
      <section className="bg-cream px-6 py-14 text-ink lg:px-12">
        <div className="mx-auto max-w-[1200px]">
          <div className="flex items-center gap-6">
            <h2 className="whitespace-nowrap font-display text-[36px] font-medium leading-none md:text-[40px]">Signature Case Studies</h2>
            <span className="hidden h-px flex-1 bg-gold-dark/40 sm:block" />
          </div>
          <div className="mt-8 grid gap-5 md:grid-cols-3">
            {cases.map((c) => (
              <a
                key={c.title}
                href="/craftsmanship.html"
                className="group overflow-hidden rounded-[3px] border border-gold-dark/30 bg-white/60 transition-colors hover:border-gold-dark/70"
              >
                <div className="overflow-hidden">
                  <img
                    src={c.src}
                    alt={c.title}
                    loading="lazy"
                    className="aspect-[4/3] w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                  />
                </div>
                <div className="p-6">
                  <h3 className="font-display text-[24px] font-medium leading-tight">{c.title}</h3>
                  <p className="mt-2 text-[14px] leading-[1.55] text-ink/80">{c.text}</p>
                  <span className="mt-4 inline-flex items-center gap-2 text-[13px] font-semibold text-gold-dark">
                    See more work <ArrowRight />
                  </span>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* 6. conversion: one next step for each audience */}
      <section className="border-t border-gold/30 px-6 py-14 lg:px-12">
        <div className="mx-auto grid max-w-[1000px] gap-4 md:grid-cols-2">
          <div className="rounded-[3px] border border-gold/30 bg-ink-2 p-8 text-center">
            <p className="text-[12px] font-semibold tracking-[0.3em] text-gold">FOR DENTISTS</p>
            <h2 className="mt-3 font-display text-[30px] italic leading-tight text-white">Ready to send a case?</h2>
            <p className="mt-3 text-[14px] leading-[1.55] text-white/80">Work directly with Step on your next esthetic or implant case.</p>
            <Button href="/partnership.html#partner-form" className="mt-6 h-10 px-6">Start a Case</Button>
          </div>
          <div className="rounded-[3px] border border-gold/30 bg-ink-2 p-8 text-center">
            <p className="text-[12px] font-semibold tracking-[0.3em] text-gold">FOR PATIENTS</p>
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
