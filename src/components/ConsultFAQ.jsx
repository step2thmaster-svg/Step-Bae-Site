// the questions practices, labs and event hosts ask before booking; answers as Step gave them. The Mini Steps chat
// answers from this same list: `id` names the answer, `words` are what a visitor might type to ask it, and `chat`
// is the chat's wording where the page's would read oddly there (the chat speaks as STEPBAE, never as Step)
export const faqs = [
  {
    id: 'travel',
    q: 'Do you travel?',
    a: 'Yes, Step travels everywhere, across the country and internationally, to your practice, lab, training center or event.',
    words: /travel|fly|come to (us|our)|visit (us|our)|on.?site|in person|where.*(go|teach)/,
  },
  {
    id: 'group',
    q: 'What is the minimum group size for a hands-on course?',
    a: 'Hands-on courses run for a minimum of 6 participants, so everyone gets real time at the bench with Step.',
    words: /minimum|group size|how many (people|participants|students|attendees)|participants|small group/,
  },
  {
    id: 'prep',
    q: 'How does my team prepare for a course?',
    a: 'Once the course date is confirmed, your team receives a list of everything to prepare, so the day can start right away.',
    words: /prepare|preparation|what (to|do we|should we) bring|get ready|materials (list|needed)|supplies/,
  },
  {
    id: 'ce',
    q: 'Is CE credit available?',
    a: 'Yes, CE credit is available.',
    words: /\bce\b|\bceu|credit|continuing education/,
  },
  {
    id: 'languages',
    q: 'What languages are available?',
    a: 'Step speaks fluent English and Korean, and courses, lectures and consulting can be arranged in any language.',
    chat: 'Sessions are given in fluent English and Korean, and courses, lectures and consulting can be arranged in any language.',
    words: /language|korean|spanish|english|chinese|japanese|portuguese|translat|interpret/,
  },
  {
    id: 'topics',
    q: 'How are lecture topics chosen?',
    a: 'Each lecture is customized to your event: the topic is built around its theme and goals, and the audience you’re bringing together.',
    words: /topic|subject|what (do you|can you) (speak|talk|lecture) (on|about)|customi[sz]/,
  },
  {
    id: 'online',
    q: 'Can we work together online?',
    a: 'Yes. Remote consulting, case reviews, webinars and lectures can all be done online.',
    // about working together online, not sending cases online
    words: /(consult|course|lecture|session|train|class|meet|work).*(online|remote|virtual)|remote consult|zoom|video call/,
  },
  {
    id: 'cost',
    q: 'How much does it cost?',
    a: 'Every engagement is tailored, so tell us what you have in mind with the form below and we’ll reply with a plan made for you.',
    chat: 'Every engagement is tailored, so there’s no one price. Tell us what you have in mind and STEPBAE will reply with a plan made for you.',
    // only about consulting, courses and events; the lab's own prices go to the price list
    words: /(consult|course|training|lecture|speak|demo|webinar|keynote|workshop|class).*(cost|price|fee|how much|budget)|(cost|price|fee|how much|budget).*(consult|course|training|lecture|speak|demo|webinar|keynote|workshop|class)/,
  },
]

export default function ConsultFAQ() {
  return (
    <section id="faq" data-chat-topic="faq" className="border-t border-gold/20 bg-ink px-6 py-16 lg:px-12">
      <div className="mx-auto max-w-[820px]">
        <h2 className="text-center font-display text-[36px] font-medium leading-tight text-white md:text-[42px]">
          Frequently Asked <em className="font-normal text-gold">Questions</em>
        </h2>
        <div className="mt-10 divide-y divide-gold/20 border-y border-gold/20">
          {faqs.map(({ q, a }) => (
            <details key={q} className="group">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-5 font-display text-[21px] font-medium text-white hover:text-gold [&::-webkit-details-marker]:hidden">
                {q}
                <span aria-hidden="true" className="text-[26px] leading-none text-gold transition-transform group-open:rotate-45">
                  +
                </span>
              </summary>
              <p className="pb-5 pr-10 text-[15px] leading-[1.6] text-white/80">{a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  )
}
