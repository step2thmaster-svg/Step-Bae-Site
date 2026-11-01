// how working with Step goes, in four plain steps, from first message to the work itself
const steps = [
  {
    title: 'Tell Us What You Need',
    text: 'Send a short note with the form below, or ask the Mini Steps in the chat. Your goals, your team and your timeline are all we need to start.',
  },
  {
    title: 'Talk It Through',
    text: 'We set up a conversation with Step to understand your team, your cases and what success looks like for you.',
  },
  {
    title: 'Get Your Plan',
    text: 'You receive a plan made for you: the format, the dates, the topics, and what your team will need.',
  },
  {
    title: 'Let’s Work Together',
    text: 'At your practice or lab, online, or on your stage. Once a course date is confirmed, your team gets a simple list to prepare.',
  },
]

export default function ConsultProcess() {
  return (
    <section id="process" data-chat-topic="process" className="border-t border-gold/20 bg-ink-2 px-6 py-16 lg:px-12">
      <div className="mx-auto max-w-[1200px]">
        <p className="text-center text-[12px] font-semibold tracking-[0.3em] text-gold">SIMPLE FROM THE START</p>
        <h2 className="mt-3 text-center font-display text-[36px] font-medium leading-tight text-white md:text-[42px]">
          How It <em className="font-normal text-gold">Works</em>
        </h2>

        {/* four steps in a row on desktop, joined by a thin gold line; stacked with the line running down on phones */}
        <ol className="relative mt-12 grid gap-10 md:grid-cols-4 md:gap-8">
          <span aria-hidden="true" className="absolute left-[23px] top-6 bottom-6 w-px bg-gold/30 md:left-[12.5%] md:right-[12.5%] md:top-[23px] md:bottom-auto md:h-px md:w-auto" />
          {steps.map((s, i) => (
            <li key={s.title} className="relative flex gap-5 md:flex-col md:items-center md:text-center">
              <span className="relative flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-gold bg-ink-2 font-display text-[22px] text-gold">
                {i + 1}
              </span>
              <div>
                <h3 className="font-display text-[24px] font-medium leading-tight text-white md:mt-5">{s.title}</h3>
                <p className="mt-2 text-[14px] leading-[1.6] text-white/80">{s.text}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
