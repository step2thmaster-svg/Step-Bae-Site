import Header from './components/Header.jsx'
import Button from './components/Button.jsx'
import CvTimeline from './components/CvTimeline.jsx'
import Footer from './components/Footer.jsx'
import { events, articles, hosts } from './components/cv.js'

const countries = new Set(['United States', ...events.filter(([, , , tag]) => tag === 'intl').map(([, , place]) => place.split(', ').pop())])
const firstYear = events[0][0].split('/')[1]
// cities taught in: places given as "City, State/Country" (state-only places like "Virginia" aren't counted), skipping cancelled and upcoming
const cities = new Set(events.filter(([, , place, tag]) => place.includes(', ') && tag !== 'cancelled' && tag !== 'upcoming').map(([, , place]) => place))

// headline count of lectures and hands-on courses, set by hand (the CV list in cv.js has 67 delivered entries)
const lectureCount = 70

// fades the stage photo's own top, bottom and right edges to transparent, so it melts into the page with no border line
const photoFade =
  'linear-gradient(to bottom, transparent 0, transparent 4%, rgba(0,0,0,0.45) 20%, #000 38%, #000 68%, transparent 95%),' +
  'linear-gradient(to left, transparent 0, transparent 2%, #000 14%),' +
  'linear-gradient(to right, transparent 0, #000 12%)'

const stats = [
  { value: `${lectureCount}+`, label: 'Lectures & hands-on courses' },
  { value: articles.length, label: 'Published articles' },
  { value: cities.size, label: 'Cities taught in' },
  { value: countries.size, label: 'Countries taught in' },
  { value: firstYear, label: 'Teaching since' },
]

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-ink">
      <div className="relative">
        <Header />
        {/* the stage photo fills the whole section behind the text; top padding clears the header, as on the home page hero.
            md+: about an inch shorter than the original portrait layout */}
        <section className="relative overflow-hidden px-6 pb-6 pt-[118px] md:min-h-[484px] lg:px-12">
          {/* md+: the photo box is about 76% of the section's size, placed so Step sits in the open space right of the text
              (sized directly rather than with a CSS scale, which left faint lines along the faded edges) */}
          <div className="absolute inset-0 md:inset-auto md:left-[calc(28.8%+96px)] md:top-[12.2%] md:h-[75.6%] md:w-[75.6%]">
            <img
              src="/images/about/stage-digital-days.jpg"
              alt="Step Toothmaster Bae lecturing on stage at Digital Days, Hablemos de Futuro"
              className="absolute inset-0 h-full w-full object-cover object-[70%_50%]"
              style={{ maskImage: photoFade, WebkitMaskImage: photoFade, maskComposite: 'intersect', WebkitMaskComposite: 'source-in' }}
            />
          </div>
          {/* darkens behind the text: all of it on phones, the left side on md+ */}
          <div className="absolute inset-0 bg-ink/75 md:bg-transparent md:[background:linear-gradient(90deg,#141210_0%,rgba(20,18,16,0.7)_30%,rgba(20,18,16,0.5)_52%,rgba(20,18,16,0.4)_63%,rgba(20,18,16,0.15)_71%,rgba(20,18,16,0)_78%)]" />

          <div className="relative mx-auto max-w-[1100px]">
            <div className="relative isolate max-w-[820px] text-center [text-shadow:0_1px_14px_rgba(0,0,0,0.9),0_0_3px_rgba(0,0,0,0.6)] md:text-left">
              {/* md+: a soft blurred shade right behind the text, so the photo can show around it without crossing the words */}
              <div className="absolute -inset-x-16 -inset-y-8 -z-10 hidden rounded-[64px] bg-ink/75 blur-2xl md:block" />
              <p className="text-[12px] font-semibold tracking-[0.3em] text-gold">ABOUT</p>
              <h1 className="mt-3 font-display text-[44px] font-medium leading-[1.08] text-white md:text-[58px]">
                Step <em className="font-normal text-gold">Toothmaster</em> Bae
              </h1>
              <p className="mt-4 max-w-[680px] text-[15px] leading-[1.65] text-white/90 md:text-[16px]">
                Count on Step when the details matter: setting up or
                refining a digital workflow, planning complex esthetic and implant cases, and
                training teams to get more from their materials. Step works side by side with your
                dentist and the team, so the improvements become part of how you work.
              </p>
              <p className="mt-3 max-w-[680px] text-[15px] leading-[1.65] text-white/90 md:text-[16px]">
                That advice is built on experience: since {firstYear}, more than{' '}
                {lectureCount} lectures, demonstrations and hands-on courses across
                the United States, Germany, South Korea and Mexico, including the Morphopsychology course
                series, along with {articles.length} published articles.
              </p>
              <Button href="/consultation.html#inquiry" className="mt-6 h-10 px-6 [text-shadow:none]">Book a Consultation</Button>
            </div>
          </div>
        </section>
      </div>

      {/* highlights the strip */}
      <section className="border-y border-gold/25 bg-ink-2 px-4 py-7 sm:px-6 sm:py-10 lg:px-12">
        {/* label (dt) comes first for screen readers and copying, and flex-col-reverse shows the number above it; justify-end keeps numbers level when a label wraps */}
        <dl className="mx-auto flex max-w-[1100px] flex-wrap justify-center gap-y-6 sm:gap-y-8">
          {stats.map((s) => (
            <div key={s.label} className="flex basis-1/3 flex-col-reverse justify-end px-1 text-center md:basis-1/5">
              <dt className="mt-1.5 text-[11px] leading-snug tracking-[0.04em] text-white/80 sm:mt-2 sm:text-[13px] sm:tracking-[0.08em]">{s.label}</dt>
              <dd className="font-display text-[46px] font-medium leading-none text-gold max-sm:text-[32px] md:text-[54px]">{s.value}</dd>
            </div>
          ))}
        </dl>
      </section>

      <CvTimeline />

      {/* publications and the companies Step has taught for */}
      <section className="bg-cream px-6 py-14 text-ink lg:px-12">
        <div className="mx-auto grid max-w-[1100px] gap-12 md:grid-cols-2">
          <div>
            <h2 className="font-display text-[36px] font-medium leading-none md:text-[40px]">Published Articles</h2>
            <ul className="mt-5 border-t border-gold-dark/30 pt-2">
              {[...articles].reverse().map(([date, pub, subject]) => (
                <li key={`${date}${pub}`} className="flex gap-4 py-[3px] text-[14px] leading-[1.45]">
                  <span className="w-[64px] shrink-0 tabular-nums text-gold-dark">{date}</span>
                  <span>
                    <span className="font-semibold">{pub}</span>
                    {subject && <span className="text-ink/75">: {subject}</span>}
                  </span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="font-display text-[36px] font-medium leading-none md:text-[40px]">Taught For</h2>
            <div className="mt-5 space-y-5 border-t border-gold-dark/30 pt-4">
              {hosts.map(({ group, names }) => (
                <div key={group}>
                  <h3 className="text-[12px] font-semibold tracking-[0.16em] text-gold-dark">{group.toUpperCase()}</h3>
                  {/* a running list separated by gold dots, wrapping like a line of text */}
                  <ul className="mt-1.5 flex flex-wrap text-[14px] leading-[1.7] text-ink/85">
                    {names.map((n, i) => (
                      <li key={n} className="whitespace-nowrap">
                        {n}
                        {i < names.length - 1 && <span className="px-2 text-gold-dark" aria-hidden="true">·</span>}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-ink-2 px-6 py-16 text-center lg:px-12">
        <h2 className="font-display text-[36px] font-medium leading-tight text-white md:text-[40px]">
          Bring Step to Your <em className="font-normal text-gold">Team</em>
        </h2>
        <p className="mx-auto mt-4 max-w-[520px] text-[15px] leading-[1.6] text-white/80">
          For consulting, a course for your study club or lab, or a lecture at your event.
        </p>
        <Button href="/consultation.html#inquiry" className="mt-7 h-10 px-6">Get in Touch</Button>
      </section>

      <Footer />
    </div>
  )
}
