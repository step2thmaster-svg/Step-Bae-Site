// the ways a practice, lab or event can work with Step; `where` is how each one can be delivered
const formats = [
  {
    title: 'On-Site Consulting',
    text: 'Step visits your practice or lab to see your workflow in action and build a better one with your team.',
    where: ['On-site'],
  },
  {
    title: 'Remote Consulting',
    text: 'Video sessions and screen sharing for workflow, design and communication reviews, wherever you are.',
    where: ['Online'],
  },
  {
    title: 'Case Review',
    text: 'One complex case, planned together with the dentist and the technician before anything is prepped.',
    where: ['On-site', 'Online'],
  },
  {
    title: 'Hands-On Course',
    text: 'One-day or multi-day small-group courses at your lab, practice or training center, for 6 or more participants.',
    where: ['On-site'],
  },
  {
    title: 'Lecture & Keynote',
    text: 'For conferences, study clubs and corporate events, with a topic built around your event’s theme and goals.',
    where: ['On-site', 'Online'],
  },
  {
    title: 'Live Demo',
    text: 'Ceramic demonstrations on stage or at your booth, on behalf of manufacturers, sponsors and event hosts.',
    where: ['On-site'],
  },
  {
    title: 'Webinar',
    text: 'A live online lecture for your members, customers or team, with time for questions at the end.',
    where: ['Online'],
  },
  {
    title: 'Ongoing Support',
    text: 'Regular check-ins as your team settles into a new workflow, technique or material.',
    where: ['On-site', 'Online'],
  },
]

export default function ConsultFormats() {
  return (
    <section id="formats" className="bg-cream px-6 py-16 text-ink lg:px-12">
      <div className="mx-auto max-w-[1200px]">
        <p className="text-center text-[12px] font-semibold tracking-[0.3em] text-gold-dark">CHOOSE WHAT FITS</p>
        <h2 className="mt-3 text-center font-display text-[36px] font-medium leading-tight md:text-[42px]">
          Ways to Work <em className="font-normal text-gold-dark">Together</em>
        </h2>
        <p className="mx-auto mt-4 max-w-[600px] text-center text-[15px] leading-[1.6] text-ink/80">
          Every team and every event is different, so Step works the way that suits you best: in person, online, or a
          mix of both. Pick one, combine a few, or tell us what you have in mind.
        </p>

        <div className="mt-10 grid gap-x-10 gap-y-7 sm:grid-cols-2 lg:grid-cols-4">
          {formats.map((f) => (
            <div key={f.title} className="border-t border-gold-dark/40 pt-4">
              <h3 className="font-display text-[23px] font-medium leading-tight">{f.title}</h3>
              <p className="mt-2 text-[14px] leading-[1.55] text-ink/80">{f.text}</p>
              <p className="mt-3 flex gap-2">
                {f.where.map((w) => (
                  <span key={w} className="rounded-full border border-gold-dark/50 px-2.5 py-0.5 text-[11px] font-semibold tracking-[0.08em] text-gold-dark">
                    {w.toUpperCase()}
                  </span>
                ))}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
