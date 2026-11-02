import Button from './Button.jsx'
import { Consulting, Education, Speaker } from './Icons.jsx'

// the ways a practice, lab or event can work with Step, as a bento grid of photo cards, two columns wide unless
// `narrow`. `where` is how each one can be delivered. Order fills a 4-column grid in three rows on desktop
// (wide, narrow, narrow / narrow, narrow, wide / wide, wide)
export const formats = [
  {
    group: 'Consulting',
    title: 'On-Site Consulting',
    text: 'Step visits your practice or lab to see your workflow in action and build a better one with your team.',
    where: ['On-site'],
    image: '/images/insights/dentisthappy.jpg',
    position: 'object-[50%_35%]',
  },
  {
    group: 'Consulting',
    title: 'Remote Consulting',
    text: 'Video sessions and screen sharing for workflow, design and communication reviews.',
    where: ['Online'],
    // Step's lab, where remote sessions are run from
    image: '/images/consult/remote-consulting-lab.jpg',
    position: 'object-[30%_40%]',
    narrow: true,
    // a bright, busy room, so it's shaded more for the words to read
    shade: 'from-ink via-ink/75 to-ink/30',
  },
  {
    group: 'Consulting',
    title: 'Case Review',
    text: 'One complex case, planned with the dentist and the technician before anything is prepped.',
    where: ['On-site', 'Online'],
    // a LiSi case from prep to try-in: the series of shots, without the slide's lettering or date labels
    image: '/images/consult/case-review-lisi.jpg',
    position: 'object-[35%_30%]',
    // a photo card one column wide, so the first row still fits
    narrow: true,
  },
  {
    group: 'Education',
    title: 'Webinar',
    text: 'A live online lecture for your members, customers or team, with time for questions.',
    where: ['Online'],
    // Step at the podium with a headset mic; framed on Step, above the words
    image: '/images/consult/webinar-podium.jpg',
    position: 'object-[40%_10%]',
    narrow: true,
  },
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
    // Step lecturing to a study group around a conference table; framed on the room and the speaker
    image: '/images/consult/lecture-roundtable.jpg',
    position: 'object-[60%_45%]',
  },
  {
    group: 'Events',
    title: 'Live Demo',
    text: 'Ceramic demonstrations on stage or at your booth, on behalf of manufacturers, sponsors and hosts.',
    where: ['On-site'],
    // Step laughing with the crowd at a live demo table; framed on the top of the picture, where the faces are
    image: '/images/consult/live-demo.jpg',
    position: 'object-[50%_30%]',
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
    <section id="formats" data-chat-topic="formats" className="relative overflow-hidden border-t border-gold/20 bg-ink px-6 py-16 lg:px-12">
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
            return (
              <article key={f.title} className={`${card} min-h-[300px] ${f.narrow ? '' : 'sm:col-span-2'}`}>
                <img src={f.image} alt="" loading="lazy" className={`absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-105 ${f.position ?? 'object-center'}`} />
                {/* lighter on a narrow card, whose photo sits mostly behind the words, so its subject still shows through */}
                <div className={`absolute inset-0 bg-gradient-to-t ${f.shade ?? (f.narrow ? 'from-ink/95 via-ink/45 to-transparent' : 'from-ink via-ink/75 to-ink/10')}`} />
                <div className="relative flex h-full flex-col justify-end p-7">
                  <p className="flex items-center gap-2 text-[11px] font-semibold tracking-[0.25em] text-gold">
                    <GroupIcon className="h-5 w-5" />
                    {f.group.toUpperCase()}
                  </p>
                  <h3 className={`mt-2 font-display font-medium leading-tight text-white ${f.narrow ? 'text-[27px]' : 'text-[32px]'}`}>{f.title}</h3>
                  <p className="mt-2 max-w-[440px] text-[15px] leading-[1.55] text-white/85">{f.text}</p>
                  <Tags where={f.where} />
                </div>
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
