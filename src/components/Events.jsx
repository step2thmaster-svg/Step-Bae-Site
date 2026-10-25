import { useState } from 'react'
import Button from './Button.jsx'
import Lightbox from './Lightbox.jsx'

// add upcoming courses and events here; the list shows them in this order. `image` is optional (in public/images/courses);
// it's trimmed to the card's shape unless `fit: 'contain'`, which shows it whole (for badges and flyers). `link` is a registration page.
// e.g. { date: 'March 14–15, 2027', title: 'Foil Veneer Hands-On', place: 'Charlotte, NC', text: 'Two-day course…', link: 'https://…' }
export const upcoming = [
  {
    date: 'February 24–25, 2027',
    title: 'American Equilibration Society 72nd Annual Scientific Meeting',
    place: 'Chicago, IL',
    text: 'Step joins the program at "The Cranio-Mandibular Complex: TMJ to Smile Design," the 2027 AES Annual Scientific Meeting.',
    image: '/images/courses/aes-2027.jpg',
    alt: 'The Cranio-Mandibular Complex: TMJ to Smile Design. AES 72nd Annual Scientific Meeting, February 24–25, 2027, Chicago, IL',
    fit: 'contain',
  },
  {
    date: 'February 25–27, 2027',
    title: 'GC America Lecture at LMT LAB DAY',
    place: 'Chicago, IL',
    text: 'A lecture for GC America at LMT LAB DAY Chicago 2027, the largest dental laboratory show in the world.',
    image: '/images/courses/lab-day-chicago-2027.jpg',
    alt: 'LMT LAB DAY Chicago 2027, February 25–27, 2027, Chicago, IL',
    fit: 'contain',
  },
]

// past courses and events, shown as flyers; images live in public/images/courses.
// `ratio` is the image's width ÷ height: the first two stack in the left column, the rest sit beside them at the same height.
const past = [
  { src: '/images/courses/foil-veneer-implant-course.jpg', ratio: 2000 / 767, alt: 'Foil veneer and implant hands-on course flyer, Charlotte, NC, 2016' },
  { src: '/images/courses/tour-de-korea-foil-mask.jpg', ratio: 2000 / 767, alt: 'Tour de Korea foil mask course flyer' },
  { src: '/images/courses/gc-hybrid-implant-arch-2024.jpg', ratio: 960 / 960, alt: 'GC America live CE seminar, Mastering the Hybrid Implant Arch Finishing with GC Initial IQ ONE SQIN, March 15–16, 2024' },
  { src: '/images/courses/ldd-programa.jpg', ratio: 552 / 960, alt: 'Digital Days program listing for TPD. Stepbay Toothmaster: dental 3D printing, modern techniques and new materials' },
]

export default function Events() {
  const [open, setOpen] = useState(null) // index into `past` shown in the lightbox, or null

  const stack = past.slice(0, 2)
  const rest = past.slice(2)
  const stackHeight = stack.reduce((h, p) => h + 1 / p.ratio, 0) // left column's height per unit of its width

  const thumb = (p, i, style) => (
    <button
      key={p.src}
      type="button"
      onClick={() => setOpen(i)}
      aria-label={`View larger: ${p.alt}`}
      style={style}
      className={`group block shrink-0 overflow-hidden rounded-[3px] bg-ink-2 ${style ? 'md:w-[var(--w)]' : ''}`}
    >
      <img
        src={p.src}
        alt={p.alt}
        loading="lazy"
        className="block w-full transition-transform duration-700 ease-out group-hover:scale-[1.03]"
      />
    </button>
  )

  return (
    <section id="events" className="bg-ink px-6 py-16 lg:px-12">
      <div className="mx-auto max-w-[1200px]">
        <div className="flex items-center gap-6">
          <h2 className="font-display text-[36px] font-medium leading-none whitespace-nowrap text-white md:text-[40px]">
            Upcoming Courses &amp; Events
          </h2>
          <span className="hidden h-px flex-1 bg-gold/40 sm:block" />
        </div>

        {upcoming.length > 0 ? (
          <div className="mt-10 grid gap-5 md:grid-cols-2">
            {upcoming.map((ev) => (
              <article key={ev.title} className="overflow-hidden rounded-[3px] border border-gold/30 bg-ink-2">
                {ev.image && (
                  <div className="aspect-[16/9] bg-black">
                    <img
                      src={ev.image}
                      alt={ev.alt ?? `${ev.title} flyer`}
                      className={`h-full w-full ${ev.fit === 'contain' ? 'object-contain' : 'object-cover'}`}
                    />
                  </div>
                )}
                <div className="p-6">
                  <p className="text-[12px] font-semibold tracking-[0.15em] text-gold">{ev.date.toUpperCase()}</p>
                  <h3 className="mt-2 font-display text-[26px] font-medium leading-tight text-white">{ev.title}</h3>
                  {ev.place && <p className="mt-1 text-[14px] text-white/70">{ev.place}</p>}
                  {ev.text && <p className="mt-3 text-[15px] leading-[1.6] text-white/85">{ev.text}</p>}
                  <Button href={ev.link ?? '#inquiry'} className="mt-5 h-10 px-6">
                    {ev.link ? 'Details & Registration' : 'Ask About This Event'}
                  </Button>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="mt-10 rounded-[3px] border border-gold/30 bg-ink-2 px-6 py-10 text-center">
            <p className="font-display text-[26px] font-medium text-white">New dates are on the way</p>
            <p className="mx-auto mt-3 max-w-[520px] text-[15px] leading-[1.6] text-white/80">
              Upcoming courses and lectures will be announced here. To hear first, or to
              bring a course to your study club, lab or event, get in touch below.
            </p>
            <Button href="#inquiry" variant="ghost" className="mt-6 h-10 px-6">Get in Touch</Button>
          </div>
        )}

        <h3 className="mt-16 font-display text-[28px] font-medium text-white">Past Courses &amp; Lectures</h3>
        {/* md+: the first two flyers stack in a left column a third of the width; each other flyer gets the width that
            makes it exactly as tall as that column (column height = sum of the stacked heights + the 1rem gap). Phones stack all. */}
        <div className="mt-6 flex flex-col gap-4 md:flex-row">
          <div className="flex flex-col gap-4 md:w-[calc((100%-2rem)/3)] md:shrink-0">
            {stack.map((p, i) => thumb(p, i))}
          </div>
          {rest.map((p, i) => thumb(p, i + stack.length, {
            '--w': `calc(${p.ratio} * (${stackHeight} * (100% - 2rem) / 3 + 1rem))`,
          }))}
        </div>
        <Lightbox photos={past} index={open} onChange={setOpen} onClose={() => setOpen(null)} />
      </div>
    </section>
  )
}
