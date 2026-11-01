import Button from './Button.jsx'
import { ArrowRight } from './Icons.jsx'

// add upcoming courses and events here; the list shows them in this order. `image` is optional (in public/images/courses);
// it's trimmed to the card's shape unless `fit: 'contain'`, which shows it whole (for badges and flyers). `link` is a registration page;
// `soon: true` says registration is coming soon until a link is ready. `talk`, `session` and `room` say what Step presents,
// and when and where, within a longer event.
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
    link: 'https://aes-tmj.glueup.com/event/aes-2027-annual-scientific-meeting-169267/',
    talk: 'Problem Solvers: Make Big Problems Small',
    session: '1:30–1:45 PM',
  },
  {
    date: 'February 25–27, 2027',
    title: 'GC America Lecture at LMT LAB DAY',
    place: 'Chicago, IL',
    text: 'A lecture for GC America at LMT LAB DAY Chicago 2027, the largest dental laboratory show in the world.',
    image: '/images/courses/lab-day-chicago-2027.jpg',
    alt: 'LMT LAB DAY Chicago 2027, February 25–27, 2027, Chicago, IL',
    fit: 'contain',
    soon: true,
    session: 'Thursday, February 25 · 9:00–10:30 AM',
    room: 'Plaza Ballroom A/B, main floor behind the restaurant',
  },
]

export default function Events() {
  return (
    <section id="events" className="bg-ink px-6 py-16 lg:px-12">
      <div className="mx-auto max-w-[1200px]">
        <div className="flex items-center gap-6">
          <h2 className="font-display text-[36px] font-medium leading-none sm:whitespace-nowrap text-white md:text-[40px]">
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
                  {(ev.talk || ev.session || ev.room) && (
                    <dl className="mt-4 space-y-1 border-l-2 border-gold/50 pl-3 text-[14px] leading-[1.5]">
                      {ev.talk && (
                        <div className="flex gap-2">
                          <dt className="font-semibold text-gold">Talk</dt>
                          <dd className="italic text-white/85">{ev.talk}</dd>
                        </div>
                      )}
                      {ev.session && (
                        <div className="flex gap-2">
                          <dt className="font-semibold text-gold">When</dt>
                          <dd className="text-white/85">{ev.session}</dd>
                        </div>
                      )}
                      {ev.room && (
                        <div className="flex gap-2">
                          <dt className="font-semibold text-gold">Where</dt>
                          <dd className="text-white/85">{ev.room}</dd>
                        </div>
                      )}
                    </dl>
                  )}
                  {ev.link ? (
                    // registration is on the organizer's site, so it opens in a new tab
                    <a
                      href={ev.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-5 inline-flex h-10 items-center justify-center gap-2 bg-gold px-6 text-[13px] font-semibold text-ink-2 shadow-[0_6px_20px_-8px_rgba(212,168,104,0.6)] transition-colors duration-200 hover:bg-gold-light"
                    >
                      Details &amp; Registration <ArrowRight />
                    </a>
                  ) : ev.soon ? (
                    <p className="mt-5 inline-flex h-10 items-center border border-gold/40 px-6 text-[13px] font-semibold tracking-[0.04em] text-gold/80">
                      Registration Coming Soon
                    </p>
                  ) : (
                    <Button href="#inquiry" className="mt-5 h-10 px-6">Ask About This Event</Button>
                  )}
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
