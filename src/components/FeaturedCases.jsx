import { ArrowRight } from './Icons.jsx'

// src: null renders a placeholder until a photo is added
// position sets which part of the photo stays in view when it's trimmed to the card
const cases = [
  { title: 'Anterior Veneers', src: '/images/case-anterior-veneers.jpg', alt: 'Anterior veneers on the upper central incisors, close-up' },
  { title: 'Posterior Crown & Bridge', src: '/images/case-posterior-bridge.jpg', alt: 'Four-unit posterior ceramic bridge on stone model', position: 'object-right' },
  { title: 'All-on-X Bridge', src: '/images/case-all-on-x.jpg', alt: 'All-on-X implant bridge with pink ceramic gingiva, close-up' },
]

export default function FeaturedCases() {
  return (
    <section id="work" className="bg-cream text-ink">
      <div className="mx-auto max-w-[1024px] px-6 pb-[33px] pt-[22px] lg:px-12">
        <div className="flex items-center gap-5">
          <h2 className="font-display text-[33px] font-medium leading-none whitespace-nowrap">
            Featured Cases
          </h2>
          <span className="hidden h-px flex-1 bg-gold-dark/50 sm:block" />
          <a
            href="#work"
            className="ml-auto inline-flex items-center gap-2 pl-10 text-[14px] font-medium text-gold-dark hover:text-ink sm:ml-0"
          >
            View Our Work <ArrowRight />
          </a>
        </div>

        <div className="mt-[14px] grid grid-cols-1 gap-[14px] sm:grid-cols-3">
          {cases.map((c) => (
            <a key={c.title} href="#work" className="group block">
              <div className="aspect-[225/144] overflow-hidden rounded-[2px] bg-ink">
                {c.src ? (
                  <img
                    src={c.src}
                    alt={c.alt}
                    className={`h-full w-full object-cover ${c.position ?? 'object-center'} transition duration-500 group-hover:scale-105`}
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center text-[12px] tracking-[0.2em] text-gold/70">
                    PHOTO COMING SOON
                  </div>
                )}
              </div>
              <h3 className="mt-2.5 font-display text-[20px] font-medium leading-tight group-hover:text-gold-dark">
                {c.title}
              </h3>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
