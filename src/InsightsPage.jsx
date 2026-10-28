import Header from './components/Header.jsx'
import Button from './components/Button.jsx'
import Footer from './components/Footer.jsx'
import AudienceTag, { audienceColor } from './components/AudienceTag.jsx'
import { topics, insights, formatDate } from './components/insights.js'

const topicLabel = (id) => topics.find((t) => t.id === id)?.label

// the color key shown above the list; every article is listed, color coded by who it is for
const key = [
  ['dentists', 'For Dentists'],
  ['patients', 'For Patients'],
  ['both', 'For Dentists & Patients'],
]

export default function InsightsPage() {
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
      </div>

      {/* 2. every article, newest first, color coded by audience */}
      <section id="latest" className="bg-cream px-6 py-10 text-ink lg:px-12">
        <div className="mx-auto max-w-[1200px]">
          <div className="flex items-center gap-6">
            <h2 className="whitespace-nowrap font-display text-[28px] font-medium leading-none md:text-[32px]">All Articles</h2>
            <span className="hidden h-px flex-1 bg-gold-dark/40 sm:block" />
          </div>
          <ul className="mt-4 flex flex-wrap items-center gap-x-6 gap-y-2 text-[13px] text-ink/75" aria-label="Color key">
            {key.map(([id, label]) => (
              <li key={id} className="flex items-center gap-2">
                <span className={`h-2.5 w-6 rounded-full ${audienceColor[id]}`} />
                {label}
              </li>
            ))}
          </ul>

          {insights.length > 0 ? (
            <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {insights.map((p) => {
                const Card = p.href ? 'a' : 'article'
                return (
                  <Card
                    key={`${p.date}${p.title}`}
                    {...(p.href ? { href: p.href } : {})}
                    // posts with a photo are featured wider than the rest (two to a row on large screens), photo beside the text from sm up;
                    // the band across the top shows who the article is for
                    className={`relative flex flex-col overflow-hidden rounded-[3px] border border-ink/15 bg-white/60 pt-1 transition-colors ${p.href ? 'hover:border-ink/40' : ''} ${
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
                      {/* published articles without a page here yet; they get one (and a link) once uploaded */}
                      {!p.href && <p className="pt-1 text-[12px] italic text-gold-dark">Coming soon to the site</p>}
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
