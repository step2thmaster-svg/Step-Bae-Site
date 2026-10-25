import Button from './Button.jsx'

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

export default function Events() {
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
      </div>
    </section>
  )
}
