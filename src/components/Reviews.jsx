import { reviewsFor } from './reviews.js'

// a page's client reviews; shows nothing until at least one review for that page is approved with a name
export default function Reviews({ page, eyebrow = 'FROM OUR CLIENTS', title = ['What Clients', 'Say'] }) {
  const shown = reviewsFor(page)
  if (!shown.length) return null
  const fromToothLab = shown.some((r) => r.source === 'toothlab')
  return (
    <section className="bg-cream px-6 py-16 text-ink lg:px-12">
      <div className="mx-auto max-w-[1100px]">
        <p className="text-center text-[12px] font-semibold tracking-[0.3em] text-gold-dark">{eyebrow}</p>
        <h2 className="mt-3 text-center font-display text-[36px] font-medium leading-tight md:text-[42px]">
          {title[0]} <em className="font-normal text-gold-dark">{title[1]}</em>
        </h2>
        <div className={`mt-10 grid gap-5 ${shown.length > 2 ? 'md:grid-cols-2 lg:grid-cols-3' : 'md:grid-cols-2'}`}>
          {shown.map((r) => (
            <figure key={r.name} className="flex flex-col rounded-[3px] border border-gold-dark/30 bg-white/60 p-7">
              <span aria-hidden="true" className="font-display text-[56px] leading-[0.6] text-gold-dark">“</span>
              <blockquote className="mt-2 flex-1 font-display text-[19px] italic leading-[1.5]">{r.quote}</blockquote>
              <figcaption className="mt-5 text-[14px]">
                <span className="font-semibold">{r.name}</span>
                {r.role && <span className="block text-ink/65">{r.role}</span>}
              </figcaption>
            </figure>
          ))}
        </div>
        {fromToothLab && (
          <p className="mt-5 text-center text-[13px] italic text-ink/60">
            Some reviews first shared on{' '}
            <a href="https://toothlab.ai" target="_blank" rel="noopener noreferrer" className="underline underline-offset-2 hover:text-gold-dark">
              ToothLab.ai
            </a>
            .
          </p>
        )}
      </div>
    </section>
  )
}
