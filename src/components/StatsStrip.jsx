import { events, articles } from './cv.js'

const countries = new Set(['United States', ...events.filter(([, , , tag]) => tag === 'intl').map(([, , place]) => place.split(', ').pop())])
const firstYear = events[0][0].split('/')[1]
// cities taught in: places given as "City, State/Country" (state-only places like "Virginia" aren't counted), skipping cancelled and upcoming
const cities = new Set(events.filter(([, , place, tag]) => place.includes(', ') && tag !== 'cancelled' && tag !== 'upcoming').map(([, , place]) => place))

// headline count of lectures and hands-on courses, set by hand (the CV list in cv.js has 67 delivered entries)
const lectureCount = 70

const stats = [
  { value: `${lectureCount}+`, label: 'Lectures & hands-on courses' },
  { value: articles.length, label: 'Published articles' },
  { value: cities.size, label: 'Cities taught in' },
  { value: countries.size, label: 'Countries taught in' },
  { value: firstYear, label: 'Teaching since' },
]

// Step's teaching at a glance, on the About and Consultation pages
export default function StatsStrip() {
  return (
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
  )
}
