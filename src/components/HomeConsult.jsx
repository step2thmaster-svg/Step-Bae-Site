import Button from './Button.jsx'
import { ArrowRight } from './Icons.jsx'
import { upcoming } from './Events.jsx'

const services = ['Digital lab consulting', 'Esthetic & implant case planning', 'Hands-on courses for your team', 'Lectures for study clubs & events']

// home page teaser for the Consultation page; the events come from the same list the Consultation page shows
export default function HomeConsult() {
  return (
    <section id="consultation" className="relative overflow-hidden bg-ink px-6 py-10 text-white lg:px-12">
      {/* a hands-on class fills the background; darkened most behind the text on the left, with every edge fading into the page */}
      <img
        src="/images/home/hands-on-class.jpg"
        alt=""
        aria-hidden="true"
        className="absolute inset-0 h-full w-full object-cover object-[50%_64%]"
      />
      <div className="absolute inset-0 [background:linear-gradient(90deg,rgba(20,18,16,0.92)_0%,rgba(20,18,16,0.82)_45%,rgba(20,18,16,0.55)_100%),linear-gradient(180deg,rgba(20,18,16,0.5)_0%,rgba(20,18,16,0)_25%,rgba(20,18,16,0)_75%,rgba(20,18,16,0.6)_100%)]" />

      {/* heading sits in the left column beside the Upcoming card, keeping the section about as tall as About Toothmaster */}
      <div className="relative grid gap-8 md:grid-cols-[1.15fr_1fr] md:items-center md:gap-10">
        <div>
          <h2 className="font-display text-[36px] font-medium leading-none md:text-[40px]">
            Consultation &amp; Education
          </h2>
          <p className="mt-4 max-w-[560px] text-[15px] leading-[1.6] text-white/90">
            Bring Step's experience to your practice, lab or event. From digital workflows to
            complex esthetic cases, Step works alongside your team so the results show up in
            every restoration.
          </p>
          <ul className="mt-4 grid gap-x-6 gap-y-1.5 text-[14px] text-white/90 sm:grid-cols-2">
            {services.map((s) => (
              <li key={s} className="flex items-center gap-2.5">
                <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-gold" />
                {s}
              </li>
            ))}
          </ul>
          <div className="mt-6 flex flex-wrap items-center gap-5">
            <Button href="/consultation.html#inquiry" className="h-10 px-6">Book a Consultation</Button>
            <a href="/consultation.html" className="inline-flex items-center gap-2 text-[14px] font-medium text-gold hover:text-gold-light">
              Explore Services <ArrowRight />
            </a>
          </div>
        </div>

        {upcoming.length > 0 && (
          <div className="rounded-[3px] border border-gold/40 bg-cream px-6 py-5 text-ink shadow-[0_18px_40px_-18px_rgba(0,0,0,0.6)]">
            <p className="text-[12px] font-semibold tracking-[0.2em] text-gold-dark">UPCOMING</p>
            <ul className="mt-3 divide-y divide-gold-dark/20">
              {upcoming.map((ev) => (
                <li key={ev.title} className="py-2.5 first:pt-0 last:pb-0">
                  <p className="text-[12px] font-semibold tracking-[0.12em] text-gold-dark">{ev.date.toUpperCase()}</p>
                  <p className="mt-0.5 font-display text-[19px] font-medium leading-tight">
                    {ev.title}
                    {ev.place && <span className="font-serif text-[13px] font-normal text-ink/60"> · {ev.place}</span>}
                  </p>
                </li>
              ))}
            </ul>
            <a href="/consultation.html#events" className="mt-4 inline-flex items-center gap-2 text-[14px] font-medium text-gold-dark hover:text-ink">
              All Courses &amp; Events <ArrowRight />
            </a>
          </div>
        )}
      </div>
    </section>
  )
}
