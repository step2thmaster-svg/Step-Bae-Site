// the ways a practice, lab or event can work with Step, set out like a menu in three courses; `where` is how each
// one can be delivered
const menu = [
  {
    course: 'Consulting',
    items: [
      { title: 'On-Site Consulting', text: 'Step visits your practice or lab to see your workflow in action and build a better one with your team.', where: ['On-site', 'Online'] },
      { title: 'Remote Consulting', text: 'Video sessions and screen sharing for workflow, design and communication reviews.', where: ['Online'] },
      { title: 'Case Review', text: 'One complex case, planned with the dentist and the technician before anything is prepped.', where: ['On-site', 'Online'] },
      { title: 'Ongoing Support', text: 'Regular check-ins as your team settles into a new workflow, technique or material.', where: ['On-site', 'Online'] },
    ],
  },
  {
    course: 'Education',
    items: [
      { title: 'Hands-On Course', text: 'One-day or multi-day small-group courses at your lab, practice or training center, for 6 or more participants.', where: ['On-site'] },
      { title: 'Webinar', text: 'A live online lecture for your members, customers or team, with time for questions at the end.', where: ['Online'] },
    ],
  },
  {
    course: 'Events',
    items: [
      { title: 'Lecture & Keynote', text: 'For conferences, study clubs and corporate events, built around your event’s theme and goals.', where: ['On-site', 'Online'] },
      { title: 'Live Demo', text: 'Ceramic demonstrations on stage or at your booth, on behalf of manufacturers, sponsors and hosts.', where: ['On-site'] },
    ],
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

        {/* a framed menu card: a thin double gold rule, three courses side by side on desktop, stacked on phones */}
        <div className="mx-auto mt-10 max-w-[1100px] border border-gold-dark/50 bg-white/50 p-1.5">
          <div className="grid gap-10 border border-gold-dark/30 px-6 py-10 md:grid-cols-3 md:gap-0 md:px-0">
            {menu.map(({ course, items }, i) => (
              <div key={course} className={`md:px-9 ${i ? 'md:border-l md:border-gold-dark/25' : ''}`}>
                <h3 className="text-center text-[13px] font-semibold tracking-[0.35em] text-gold-dark">{course.toUpperCase()}</h3>
                <span aria-hidden="true" className="mx-auto mt-3 block h-px w-10 bg-gold-dark/60" />
                <ul className="mt-7 space-y-6">
                  {items.map((f) => (
                    <li key={f.title}>
                      {/* the name, a dotted leader, and how it's offered, like a dish and its price */}
                      <div className="flex items-baseline gap-2">
                        <span className="whitespace-nowrap font-display text-[19px] font-medium leading-tight sm:text-[21px]">{f.title}</span>
                        <span aria-hidden="true" className="min-w-4 flex-1 border-b border-dotted border-gold-dark/60" />
                        <span className="shrink-0 text-[9.5px] font-semibold tracking-[0.08em] text-gold-dark sm:text-[10.5px] sm:tracking-[0.12em]">
                          {f.where.join(' · ').toUpperCase()}
                        </span>
                      </div>
                      <p className="mt-1.5 text-[14px] italic leading-[1.55] text-ink/75">{f.text}</p>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
