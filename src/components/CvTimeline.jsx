import { events } from './cv.js'

const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

// group entries by year, newest year first and newest month first within each year (cv.js lists them oldest first)
const years = Object.entries(
  events.reduce((acc, e) => {
    const year = e[0].split('/')[1]
    ;(acc[year] ??= []).unshift(e)
    return acc
  }, {}),
).sort(([a], [b]) => b - a)

const tagStyles = {
  intl: { label: 'International', className: 'border-gold/70 text-gold' },
  cancelled: { label: 'Cancelled · COVID-19', className: 'border-white/30 text-white/60' },
  upcoming: { label: 'Upcoming', className: 'border-teal bg-teal text-ink-2' },
}

// text colors for tagged lines: international in gold, upcoming in teal, cancelled dimmed
const textClass = { intl: 'font-semibold text-gold-light', upcoming: 'font-semibold text-teal', cancelled: 'text-white/50' }
const placeClass = { intl: 'text-gold', upcoming: 'text-teal/80' }

export default function CvTimeline() {
  return (
    <section id="cv" className="bg-ink px-6 py-16 lg:px-12">
      <div className="mx-auto max-w-[1100px]">
        <div className="flex items-center gap-6">
          <h2 className="font-display text-[36px] font-medium leading-none whitespace-nowrap text-white md:text-[40px]">
            Lectures &amp; Hands-On Courses
          </h2>
          <span className="hidden h-px flex-1 bg-gold/40 sm:block" />
        </div>

        {/* each year is a compact block of one-line entries; blocks flow into columns on wider screens */}
        <div className="mt-8 columns-1 gap-10 md:columns-2 lg:columns-3">
          {years.map(([year, list]) => (
            <div key={year} className="mb-7 break-inside-avoid">
              <h3 className="border-b border-gold/30 pb-1.5 font-display text-[24px] font-medium leading-none text-gold">{year}</h3>
              <ul className="mt-2.5 space-y-1">
                {list.map(([date, what, where, tag], i) => (
                  <li key={i} className="flex gap-2.5 text-[13.5px] leading-[1.4]">
                    <span className="w-[28px] shrink-0 pt-[2px] text-[11px] font-semibold uppercase tracking-[0.06em] text-white/45">
                      {months[Number(date.split('/')[0]) - 1]}
                    </span>
                    <span className={textClass[tag] ?? 'text-white/90'}>
                      <span className={tag === 'cancelled' ? 'line-through decoration-white/40' : ''}>{what}</span>
                      {where && <span className={placeClass[tag] ?? 'text-white/50'}> · {where}</span>}
                      {tag && (
                        <span className={`ml-1.5 inline-block rounded-full border px-1.5 align-[1px] text-[10px] font-semibold leading-[1.5] tracking-[0.04em] ${tagStyles[tag].className}`}>
                          {tagStyles[tag].label}
                        </span>
                      )}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
