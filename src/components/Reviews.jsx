import { reviewsFor } from './reviews.js'

// first and last initials of a named reviewer: "Dr. Jane A. Smith" → "JS"
const initials = (name) => {
  const words = name.replace(/^Dr\.?\s*/, '').split(/\s+/).filter(Boolean)
  return (words[0][0] + (words.length > 1 ? words[words.length - 1][0] : '')).toUpperCase()
}

// how the smaller cards share a row on large screens: three across, or for five, two over three
const span = (count, i) => (count === 5 ? (i < 2 ? 'lg:col-span-3' : 'lg:col-span-2') : '')

// one review: what it speaks to, the quote, and who said it (by name, or anonymously by role)
function Quote({ r, large = false }) {
  return (
    <figure
      className={`flex h-full flex-col rounded-[6px] border border-gold-dark/25 bg-white/70 shadow-[0_14px_34px_-24px_rgba(20,18,16,0.5)] ${
        large ? 'p-8 md:p-10' : 'p-6 md:p-7'
      }`}
    >
      <div className="flex items-center justify-between gap-4">
        {r.tag && <span className="rounded-full bg-gold/20 px-3 py-1 text-[10.5px] font-semibold tracking-[0.16em] text-gold-dark">{r.tag.toUpperCase()}</span>}
        <span aria-hidden="true" className={`font-display leading-[0.6] text-gold ${large ? 'text-[72px]' : 'text-[56px]'}`}>
          ”
        </span>
      </div>
      <blockquote className={`mt-4 flex-1 font-display italic leading-[1.5] text-ink ${large ? 'text-[22px] md:text-[26px]' : 'text-[18px]'}`}>
        {r.quote}
      </blockquote>
      <figcaption className="mt-6 flex items-center gap-3 border-t border-gold-dark/20 pt-4 text-[13.5px]">
        {/* a monogram, or a quiet mark when the client is anonymous */}
        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-ink text-[12px] font-semibold tracking-[0.06em] text-gold">
          {r.name ? initials(r.name) : '✦'}
        </span>
        <span>
          {r.name && <span className="block font-semibold text-ink">{r.name}</span>}
          <span className={r.name ? 'text-ink/60' : 'font-semibold text-ink/80'}>{r.role}</span>
        </span>
      </figcaption>
    </figure>
  )
}

// a page's client reviews: the first is featured wide, the rest in a grid on larger screens and a swipeable row on
// phones; shows nothing until a review for that page is approved
export default function Reviews({ page, eyebrow = 'FROM OUR CLIENTS', title = ['What Clients', 'Say'] }) {
  const shown = reviewsFor(page)
  if (!shown.length) return null
  const [first, ...rest] = shown
  return (
    <section className="overflow-hidden bg-cream px-6 py-16 text-ink lg:px-12">
      <div className="mx-auto max-w-[1150px]">
        <p className="text-center text-[12px] font-semibold tracking-[0.3em] text-gold-dark">{eyebrow}</p>
        <h2 className="mt-3 text-center font-display text-[36px] font-medium leading-tight md:text-[42px]">
          {title[0]} <em className="font-normal text-gold-dark">{title[1]}</em>
        </h2>

        <div className="mx-auto mt-10 max-w-[860px]">
          <Quote r={first} large />
        </div>

        {rest.length > 0 && (
          <div
            className={`-mx-6 mt-5 flex snap-x snap-mandatory gap-4 overflow-x-auto px-6 pb-3 [scrollbar-width:none] sm:mx-0 sm:grid sm:overflow-visible sm:px-0 sm:pb-0 ${
              rest.length === 1
                ? 'sm:mx-auto sm:max-w-[560px] sm:grid-cols-1'
                : rest.length === 5
                  ? 'sm:grid-cols-2 lg:grid-cols-6'
                  : rest.length % 3 === 0
                    ? 'sm:grid-cols-2 lg:grid-cols-3'
                    : 'sm:grid-cols-2'
            }`}
          >
            {rest.map((r, i) => (
              <div key={r.quote} className={`w-[82%] shrink-0 snap-center sm:w-auto ${span(rest.length, i)}`}>
                <Quote r={r} />
              </div>
            ))}
          </div>
        )}
        {rest.length > 1 && <p className="mt-2 text-center text-[12px] text-ink/50 sm:hidden">Swipe for more →</p>}

      </div>
    </section>
  )
}
