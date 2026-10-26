import { useEffect, useState } from 'react'
import { ArrowRight } from './Icons.jsx'

// src: null renders a placeholder until a photo is added
// position sets which part of the photo stays in view when it's trimmed to the card
const cases = [
  { title: 'Anterior Veneers', src: '/images/case-anterior-veneers.jpg', alt: 'Anterior veneers on the upper central incisors, close-up' },
  { title: 'Posterior Crown & Bridge', src: '/images/case-posterior-bridge.jpg', alt: 'Four-unit posterior ceramic bridge on stone model', position: 'object-right' },
  { title: 'All-on-X Bridge', src: '/images/case-all-on-x.jpg', alt: 'All-on-X implant bridge with pink ceramic gingiva, close-up' },
]

const INTERVAL = 4000

// card placement by distance from the active card: centre, either side (smaller, dimmed, behind), or hidden
function placement(offset) {
  if (offset === 0) return { transform: 'translateX(-50%) scale(1)', zIndex: 30, opacity: 1 }
  const side = Math.sign(offset)
  if (Math.abs(offset) === 1) {
    return { transform: `translateX(calc(-50% + ${side * 58}%)) scale(0.78)`, zIndex: 20, opacity: 0.55 }
  }
  return { transform: `translateX(calc(-50% + ${side * 100}%)) scale(0.6)`, zIndex: 10, opacity: 0 }
}

export default function FeaturedCases() {
  const n = cases.length
  const [active, setActive] = useState(0)
  const [paused, setPaused] = useState(false)

  const go = (i) => setActive((i + n) % n)

  // auto-rotate, paused on hover/focus and skipped entirely for reduced-motion users
  useEffect(() => {
    if (paused || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const id = setInterval(() => setActive((a) => (a + 1) % n), INTERVAL)
    return () => clearInterval(id)
  }, [paused, n])

  const arrowClass =
    'flex h-10 w-10 items-center justify-center rounded-full border border-gold-dark/60 text-gold-dark transition-colors hover:bg-gold hover:text-ink'

  return (
    <section id="work" className="bg-cream text-ink">
      <div className="px-6 py-12 lg:px-12">
        <div className="flex items-center gap-6">
          <h2 className="font-display text-[36px] font-medium leading-none whitespace-nowrap md:text-[40px]">
            Featured Cases
          </h2>
          <span className="hidden h-px flex-1 bg-gold-dark/40 sm:block" />
          <a
            href="/craftsmanship.html"
            className="ml-auto inline-flex items-center gap-2 text-[14px] font-medium text-gold-dark hover:text-ink sm:ml-0"
          >
            View Our Work <ArrowRight />
          </a>
        </div>

        <div
          className="relative mt-10 overflow-hidden pb-6"
          aria-roledescription="carousel"
          aria-label="Featured cases"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onFocus={() => setPaused(true)}
          onBlur={() => setPaused(false)}
        >
          {/* in-flow spacer gives the stage the centre card's height; the cards themselves are absolutely placed */}
          <div className="invisible mx-auto aspect-[225/144] w-[72%] max-w-[560px] sm:w-[50%] lg:w-[40%]" />

          {cases.map((c, i) => {
            let offset = i - active
            if (offset > n / 2) offset -= n
            if (offset < -n / 2) offset += n
            const isActive = offset === 0
            return (
              <button
                key={c.title}
                type="button"
                onClick={() => (isActive ? (window.location.hash = 'work') : go(i))}
                aria-label={isActive ? c.title : `Show ${c.title}`}
                aria-hidden={Math.abs(offset) > 1}
                tabIndex={Math.abs(offset) > 1 ? -1 : 0}
                style={placement(offset)}
                className="absolute left-1/2 top-0 aspect-[225/144] w-[72%] max-w-[560px] overflow-hidden rounded-[3px] bg-ink shadow-[0_18px_40px_-18px_rgba(20,18,16,0.55)] transition-all duration-700 ease-out sm:w-[50%] lg:w-[40%]"
              >
                {c.src ? (
                  <img
                    src={c.src}
                    alt={c.alt}
                    draggable="false"
                    className={`h-full w-full object-cover ${c.position ?? 'object-center'}`}
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center text-[12px] tracking-[0.2em] text-gold/70">
                    PHOTO COMING SOON
                  </div>
                )}
              </button>
            )
          })}
        </div>

        <div className="mt-2 flex items-center justify-center gap-5">
          <button type="button" onClick={() => go(active - 1)} aria-label="Previous case" className={arrowClass}>
            <ArrowRight className="h-4 w-4 rotate-180" />
          </button>
          <div className="min-w-[220px] text-center">
            <h3 className="font-display text-[22px] font-medium leading-tight" aria-live="polite">
              {cases[active].title}
            </h3>
            <div className="mt-2 flex justify-center gap-2">
              {cases.map((c, i) => (
                <button
                  key={c.title}
                  type="button"
                  onClick={() => go(i)}
                  aria-label={`Show ${c.title}`}
                  aria-current={i === active}
                  className={`h-2 rounded-full transition-all ${i === active ? 'w-6 bg-gold-dark' : 'w-2 bg-gold-dark/30 hover:bg-gold-dark/60'}`}
                />
              ))}
            </div>
          </div>
          <button type="button" onClick={() => go(active + 1)} aria-label="Next case" className={arrowClass}>
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </section>
  )
}
