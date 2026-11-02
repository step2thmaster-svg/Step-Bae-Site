import { useEffect, useRef, useState } from 'react'
import { reviewsFor } from './reviews.js'

// first and last initials of a named reviewer: "Dr. Jane A. Smith, DDS" → "JS"
const initials = (name) => {
  const words = name.replace(/^Dr\.?\s*/, '').split(',')[0].split(/\s+/).filter(Boolean)
  return (words[0][0] + (words.length > 1 ? words[words.length - 1][0] : '')).toUpperCase()
}

// one review: what it speaks to, the quote, and who said it (by name, or anonymously by role)
function Quote({ r }) {
  return (
    <figure
      className="flex h-full flex-col rounded-[6px] border border-gold-dark/25 bg-white/70 p-5 shadow-[0_14px_34px_-24px_rgba(20,18,16,0.5)]"
    >
      <div className="flex items-center justify-between gap-4">
        {r.tag && <span className="rounded-full bg-gold/20 px-2.5 py-0.5 text-[9.5px] font-semibold tracking-[0.16em] text-gold-dark">{r.tag.toUpperCase()}</span>}
        <span aria-hidden="true" className="font-display text-[42px] leading-[0.6] text-gold">
          ”
        </span>
      </div>
      <blockquote className="mt-3 flex-1 font-display text-[15.5px] italic leading-[1.5] text-ink">
        {r.quote}
      </blockquote>
      <figcaption className="mt-4 flex items-center gap-2.5 border-t border-gold-dark/20 pt-3 text-[12.5px]">
        {/* a monogram, or a quiet mark when the client is anonymous */}
        <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-ink text-[10.5px] font-semibold tracking-[0.06em] text-gold">
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

// a page's client reviews in one side-scrolling row: one card at a time on phones (swipe), two or three across on
// larger screens with arrows; shows nothing until a review for that page is approved
export default function Reviews({ page, eyebrow = 'FROM OUR CLIENTS', title = ['What Clients', 'Say'] }) {
  const shown = reviewsFor(page)
  const row = useRef(null)
  const [ends, setEnds] = useState({ start: true, end: true })

  // which arrows can move the row, updated as it scrolls or the window resizes
  const measure = () => {
    const el = row.current
    if (!el) return
    setEnds({ start: el.scrollLeft < 4, end: el.scrollLeft + el.clientWidth > el.scrollWidth - 4 })
  }
  useEffect(() => {
    measure()
    window.addEventListener('resize', measure)
    return () => window.removeEventListener('resize', measure)
  }, [])

  // move the row by one card
  const step = (dir) => {
    const el = row.current
    const card = el.firstElementChild
    el.scrollBy({ left: dir * (card.offsetWidth + 12), behavior: 'smooth' })
  }

  if (!shown.length) return null
  const arrow = 'flex h-10 w-10 items-center justify-center rounded-full border border-gold-dark/40 text-gold-dark transition hover:bg-gold-dark hover:text-white disabled:pointer-events-none disabled:opacity-30'
  return (
    <section className="overflow-hidden bg-cream px-6 py-12 text-ink lg:px-12">
      <div className="mx-auto max-w-[1100px]">
        <p className="text-center text-[12px] font-semibold tracking-[0.3em] text-gold-dark">{eyebrow}</p>
        <h2 className="mt-2 text-center font-display text-[30px] font-medium leading-tight md:text-[34px]">
          {title[0]} <em className="font-normal text-gold-dark">{title[1]}</em>
        </h2>

        <div
          ref={row}
          onScroll={measure}
          className="-mx-6 mt-7 flex snap-x snap-mandatory gap-3 overflow-x-auto px-6 pb-3 [scrollbar-width:none] sm:mx-0 sm:px-0 [&::-webkit-scrollbar]:hidden"
        >
          {shown.map((r) => (
            <div key={r.quote} className="w-[82%] shrink-0 snap-start sm:w-[calc(50%-6px)] lg:w-[calc((100%-24px)/3)]">
              <Quote r={r} />
            </div>
          ))}
        </div>

        {shown.length > 1 && <p className="mt-2 text-center text-[12px] text-ink/50 sm:hidden">Swipe for more →</p>}
        {!(ends.start && ends.end) && (
          <div className="mt-4 hidden justify-center gap-3 sm:flex">
            <button type="button" aria-label="Previous reviews" onClick={() => step(-1)} disabled={ends.start} className={arrow}>
              ←
            </button>
            <button type="button" aria-label="More reviews" onClick={() => step(1)} disabled={ends.end} className={arrow}>
              →
            </button>
          </div>
        )}
      </div>
    </section>
  )
}
