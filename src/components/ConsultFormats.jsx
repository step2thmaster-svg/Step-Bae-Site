import Button from './Button.jsx'
import { Consulting, Education, Speaker } from './Icons.jsx'

// small line icons for the formats without a photo, drawn to match Icons.jsx
const line = { fill: 'none', stroke: 'currentColor', strokeWidth: 1.6, strokeLinecap: 'round', strokeLinejoin: 'round' }
const Screen = ({ className }) => (
  <svg viewBox="0 0 48 48" className={className} {...line}>
    <rect x="5" y="9" width="38" height="24" rx="2" />
    <path d="M17 41h14M24 33v8M19 21l4 4 7-8" />
  </svg>
)
const Play = ({ className }) => (
  <svg viewBox="0 0 48 48" className={className} {...line}>
    <circle cx="24" cy="24" r="18" />
    <path d="m20 16 12 8-12 8z" />
  </svg>
)

// the ways a practice, lab or event can work with Step, as a bento grid: the headline formats are photo cards (two
// columns wide unless `narrow`), the rest compact icon cards. `where` is how each one can be delivered. Order fills a 4-column grid in three
// rows on desktop (wide, small, small / small, small, wide / wide, wide)
const formats = [
  {
    group: 'Consulting',
    title: 'On-Site Consulting',
    text: 'Step visits your practice or lab to see your workflow in action and build a better one with your team.',
    where: ['On-site'],
    image: '/images/insights/dentisthappy.jpg',
    position: 'object-[50%_35%]',
  },
  { group: 'Consulting', title: 'Remote Consulting', text: 'Video sessions and screen sharing for workflow, design and communication reviews.', where: ['Online'], Icon: Screen },
  {
    group: 'Consulting',
    title: 'Case Review',
    text: 'One complex case, planned with the dentist and the technician before anything is prepped.',
    where: ['On-site', 'Online'],
    // a LiSi case from prep to try-in: the series of shots, cropped from the full slide without its title and
    // bottom lettering
    image: '/images/consult/case-review-lisi.jpg',
    position: 'object-[30%_30%]',
    // a photo card one column wide, so the first row still fits
    narrow: true,
  },
  { group: 'Education', title: 'Webinar', text: 'A live online lecture for your members, customers or team, with time for questions.', where: ['Online'], Icon: Play },
  {
    group: 'Consulting',
    title: 'Ongoing Support',
    text: 'Regular check-ins as your team settles into a new workflow, technique or material.',
    where: ['On-site', 'Online'],
    image: '/images/consult/ongoing-support.jpg',
    // the two smiles centred in the card, and darker shading so the words over them read clearly
    position: 'object-[45%_50%]',
    narrow: true,
    shade: 'from-ink via-ink/60 to-ink/25',
  },
  {
    group: 'Education',
    title: 'Hands-On Course',
    text: 'One-day or multi-day small-group courses at your lab, practice or training center, for 6 or more participants.',
    where: ['On-site'],
    image: '/images/home/hands-on-class.jpg',
    position: 'object-[50%_60%]',
  },
  {
    group: 'Events',
    title: 'Lecture & Keynote',
    text: 'For conferences, study clubs and corporate events, built around your event’s theme and goals.',
    where: ['On-site', 'Online'],
    image: '/images/about/stage-digital-days.jpg',
    position: 'object-[60%_40%]',
  },
  {
    group: 'Events',
    title: 'Live Demo',
    text: 'Ceramic demonstrations on stage or at your booth, on behalf of manufacturers, sponsors and hosts.',
    where: ['On-site'],
    image: '/images/precision.jpg',
  },
]

const groupIcon = { Consulting, Education, Events: Speaker }

function Tags({ where }) {
  return (
    <p className="mt-4 flex flex-wrap gap-2">
      {where.map((w) => (
        <span key={w} className="rounded-full bg-gold/15 px-3 py-1 text-[11px] font-semibold tracking-[0.1em] text-gold-light ring-1 ring-gold/30">
          {w.toUpperCase()}
        </span>
      ))}
    </p>
  )
}

const card =
  'group relative overflow-hidden rounded-[10px] ring-1 ring-gold/20 transition duration-300 hover:-translate-y-1 hover:ring-gold/60 hover:shadow-[0_24px_50px_-20px_rgba(212,168,104,0.45)]'

export default function ConsultFormats() {
  return (
    <section id="formats" className="relative overflow-hidden border-t border-gold/20 bg-ink px-6 py-16 lg:px-12">
      {/* a soft gold glow behind the grid */}
      <div aria-hidden="true" className="pointer-events-none absolute left-1/2 top-24 h-[420px] w-[820px] -translate-x-1/2 rounded-full bg-gold/10 blur-[120px]" />

      <div className="relative mx-auto max-w-[1200px]">
        <p className="text-center text-[12px] font-semibold tracking-[0.3em] text-gold">CHOOSE WHAT FITS</p>
        <h2 className="mt-3 text-center font-display text-[36px] font-medium leading-tight text-white md:text-[42px]">
          Ways to Work <em className="font-normal text-gold">Together</em>
        </h2>
        <p className="mx-auto mt-4 max-w-[600px] text-center text-[15px] leading-[1.6] text-white/80">
          Every team and every event is different, so Step works the way that suits you best: in person, online, or a
          mix of both. Pick one, combine a few, or tell us what you have in mind.
        </p>

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {formats.map((f) => {
            const GroupIcon = groupIcon[f.group]
            return f.image ? (
              <article key={f.title} className={`${card} min-h-[300px] ${f.narrow ? '' : 'sm:col-span-2'}`}>
                <img src={f.image} alt="" loading="lazy" className={`absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-105 ${f.position ?? 'object-center'}`} />
                {/* lighter on a narrow card, whose photo sits mostly behind the words, so its subject still shows through */}
                <div className={`absolute inset-0 bg-gradient-to-t ${f.shade ?? (f.narrow ? 'from-ink/95 via-ink/45 to-transparent' : 'from-ink via-ink/75 to-ink/10')}`} />
                <div className="relative flex h-full flex-col justify-end p-7">
                  <p className="flex items-center gap-2 text-[11px] font-semibold tracking-[0.25em] text-gold">
                    <GroupIcon className="h-5 w-5" />
                    {f.group.toUpperCase()}
                  </p>
                  <h3 className="mt-2 font-display text-[32px] font-medium leading-tight text-white">{f.title}</h3>
                  <p className="mt-2 max-w-[440px] text-[15px] leading-[1.55] text-white/85">{f.text}</p>
                  <Tags where={f.where} />
                </div>
              </article>
            ) : (
              <article key={f.title} className={`${card} bg-gradient-to-br from-ink-3 to-ink-2 p-7`}>
                <span className="flex h-12 w-12 items-center justify-center rounded-full bg-gold/10 text-gold ring-1 ring-gold/40 transition group-hover:bg-gold group-hover:text-ink">
                  <f.Icon className="h-6 w-6" />
                </span>
                <p className="mt-5 text-[11px] font-semibold tracking-[0.25em] text-gold">{f.group.toUpperCase()}</p>
                <h3 className="mt-1.5 font-display text-[25px] font-medium leading-tight text-white">{f.title}</h3>
                <p className="mt-2 text-[14px] leading-[1.55] text-white/75">{f.text}</p>
                <Tags where={f.where} />
              </article>
            )
          })}
        </div>

        <div className="mt-10 text-center">
          <Button href="#inquiry" className="h-11 px-7">Build My Plan</Button>
        </div>
      </div>
    </section>
  )
}
