import Button from './Button.jsx'
import { articles } from './cv.js'

// the Dentist Partnership page's sections, between the opening and the scanner guide. The promises and FAQ answers
// are STEPBAE's stated policies (10 business days, 5-year warranty, prepaid labels available but not free, price list on
// request); the
// Mini Steps chat answers from the same `partnerFaqs`

// the four promises a practice can count on, shown right under the opening
export const promises = [
  ['10', 'Business days', 'Standard turnaround from the day we receive your case'],
  ['5-Year', 'Warranty', 'On every restoration we make'],
  ['4', 'Scanner portals', 'iTero, 3Shape TRIOS, Medit and Primescan'],
  ['1:1', 'With your technician', 'You talk directly with the person making your case'],
]

export function Promises() {
  return (
    <section className="border-y border-gold/25 bg-ink-2 px-4 py-7 sm:px-6 lg:px-12">
      <dl className="mx-auto grid max-w-[1100px] grid-cols-2 gap-y-6 md:grid-cols-4">
        {promises.map(([value, label, note]) => (
          <div key={label} className="flex flex-col-reverse justify-end px-2 text-center">
            <dt className="mt-1.5 text-[12px] font-semibold tracking-[0.12em] text-white/85 sm:text-[13px]">
              {label.toUpperCase()}
              <span className="mt-1 block text-[11.5px] font-normal tracking-normal text-white/55">{note}</span>
            </dt>
            <dd className="font-display text-[38px] font-medium leading-none text-gold md:text-[46px]">{value}</dd>
          </div>
        ))}
      </dl>
    </section>
  )
}

// why dentists send their esthetic cases here
const reasons = [
  ['Handcrafted by skilled technicians', 'Highly trained technicians give every case the attention of a boutique lab: precise fit, natural esthetics and consistent quality, case after case.'],
  ['A direct line to your technician', 'Questions about a prep, a shade or a plan go straight to the person making the case, so nothing is lost in translation.'],
  ['Matched to your patient', 'Shade, texture and form are matched to the patient’s own teeth and face, not just to a shade tab.'],
  ['Planned before it’s made', 'Complex and esthetic cases are planned with you first, so the result is predictable and remakes are rare.'],
  ['An educator dentists learn from', `More than 70 lectures and hands-on courses internationally, and ${articles.length} articles published in dental journals.`],
  ['Fits your workflow', 'iTero, 3Shape TRIOS, Medit and Primescan, or physical impressions with prepaid shipping labels.'],
]

export function Reasons() {
  return (
    <section data-chat-topic="partner-why" className="bg-cream px-6 py-16 text-ink lg:px-12">
      <div className="mx-auto max-w-[1200px]">
        <p className="text-center text-[12px] font-semibold tracking-[0.3em] text-gold-dark">WHY STEPBAE</p>
        <h2 className="mt-3 text-center font-display text-[36px] font-medium leading-tight md:text-[42px]">
          A Lab That Works <em className="font-normal text-gold-dark">With You</em>
        </h2>
        <div className="mt-10 grid gap-x-10 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
          {reasons.map(([title, text], i) => (
            <div key={title} className="border-t border-gold-dark/40 pt-4">
              <p className="font-display text-[15px] text-gold-dark">0{i + 1}</p>
              <h3 className="mt-1 font-display text-[23px] font-medium leading-tight">{title}</h3>
              <p className="mt-2 text-[14.5px] leading-[1.6] text-ink/80">{text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// what the lab makes, each with a photo of real work
const restorations = [
  {
    title: 'Veneers',
    text: 'Pressed lithium disilicate, or feldspathic ceramic layered on a refractory model for the thinnest, most lifelike results.',
    image: '/images/case-anterior-veneers.jpg',
    href: '/article.html?p=ceramic-layering-on-a-refractory-model',
  },
  {
    title: 'Anterior Crowns',
    text: 'Layered zirconia or pressed lithium disilicate, with depth of color and surface texture matched to the neighboring teeth.',
    image: '/images/insights/shade-match-zirconia-gc-initial.jpg',
    href: '/article.html?p=zirconia-vs-layered-ceramic',
  },
  {
    title: 'Posterior Crowns & Bridges',
    text: 'Monolithic or layered zirconia, chosen for the bite and the esthetic demands of each case.',
    image: '/images/case-posterior-bridge.jpg',
    position: 'object-right',
  },
  {
    title: 'Implant & All-on-X',
    text: 'Single implant crowns through full-arch bridges, with natural-looking pink ceramic gingiva.',
    image: '/images/case-all-on-x.jpg',
  },
  {
    title: 'Diagnostic Wax-ups',
    text: 'Let your patient see the result before treatment, then use the wax-up as your prep guide and provisionals.',
    image: '/images/insights/wax-up-final-preview.jpg',
    href: '/article.html?p=diagnostic-wax-up-key-to-treatment-acceptance',
  },
]

export function Restorations() {
  return (
    <section data-chat-topic="partner-restorations" className="bg-ink px-6 py-16 lg:px-12">
      <div className="mx-auto max-w-[1200px]">
        <p className="text-center text-[12px] font-semibold tracking-[0.3em] text-gold">WHAT WE MAKE</p>
        <h2 className="mt-3 text-center font-display text-[36px] font-medium leading-tight text-white md:text-[42px]">
          Restorations, <em className="font-normal text-gold">Handcrafted</em>
        </h2>
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {restorations.map((r) => {
            const Card = r.href ? 'a' : 'div'
            return (
              <Card
                key={r.title}
                {...(r.href && { href: r.href })}
                className="group overflow-hidden rounded-[6px] bg-ink-2 ring-1 ring-gold/20 transition hover:ring-gold/60"
              >
                <div className="aspect-[4/3] overflow-hidden bg-black">
                  <img
                    src={r.image}
                    alt=""
                    loading="lazy"
                    className={`h-full w-full object-cover transition duration-700 group-hover:scale-105 ${r.position ?? 'object-center'}`}
                  />
                </div>
                <div className="p-5">
                  <h3 className="font-display text-[22px] font-medium leading-tight text-white">{r.title}</h3>
                  <p className="mt-2 text-[13.5px] leading-[1.55] text-white/75">{r.text}</p>
                  {r.href && <p className="mt-3 text-[12.5px] font-semibold text-gold group-hover:text-gold-light">Learn more →</p>}
                </div>
              </Card>
            )
          })}
        </div>
        <div className="mt-10 text-center">
          <Button href="#partner-form" className="h-11 px-7">Request Our Price List</Button>
        </div>
      </div>
    </section>
  )
}

// how a case moves from your scanner to your patient
const flow = [
  ['Connect once', 'Add STEPBAE in your scanner’s portal, or request prepaid labels for physical impressions.'],
  ['Send the case', 'Scans, prescription, shade and photos. If anything is unclear, we call before we start.'],
  ['Handcrafted', 'Your case is designed, built, characterized and photographed for quality control in house.'],
  ['Delivered', 'Standard turnaround is 10 business days. Local practices can ask STEPBAE to join the delivery appointment.'],
]

export function CaseFlow() {
  return (
    <section data-chat-topic="partner-flow" className="border-t border-gold/20 bg-ink-2 px-6 py-16 lg:px-12">
      <div className="mx-auto max-w-[1200px]">
        <p className="text-center text-[12px] font-semibold tracking-[0.3em] text-gold">HOW A CASE WORKS</p>
        <h2 className="mt-3 text-center font-display text-[36px] font-medium leading-tight text-white md:text-[42px]">
          From Scan <em className="font-normal text-gold">to Smile</em>
        </h2>
        <ol className="relative mt-12 grid gap-10 md:grid-cols-4 md:gap-8">
          <span aria-hidden="true" className="absolute bottom-6 left-[23px] top-6 w-px bg-gold/30 md:bottom-auto md:left-[12.5%] md:right-[12.5%] md:top-[23px] md:h-px md:w-auto" />
          {flow.map(([title, text], i) => (
            <li key={title} className="relative flex gap-5 md:flex-col md:items-center md:text-center">
              <span className="relative flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-gold bg-ink-2 font-display text-[22px] text-gold">
                {i + 1}
              </span>
              <div>
                <h3 className="font-display text-[24px] font-medium leading-tight text-white md:mt-5">{title}</h3>
                <p className="mt-2 text-[14px] leading-[1.6] text-white/80">{text}</p>
              </div>
            </li>
          ))}
        </ol>
        <div className="mt-10 flex flex-wrap justify-center gap-3">
          <Button href="#portals" className="h-10 px-6">Connect My Scanner</Button>
          <Button href="/article.html?p=how-to-submit-a-digital-case" variant="ghost" className="h-10 px-6">What to Send</Button>
        </div>
      </div>
    </section>
  )
}

// the esthetic approach that sets the lab apart, with the case photo from the article
export function Approach() {
  return (
    <section className="grid bg-ink md:grid-cols-2">
      <div className="relative min-h-[260px] md:min-h-[400px]">
        <img
          src="/images/consult/digital-morphopsychology.jpg"
          alt="A smile design from finished restorations to the digital design"
          loading="lazy"
          className="absolute inset-0 h-full w-full object-cover object-[45%_50%]"
        />
        <div className="absolute inset-0 [background:linear-gradient(0deg,#141210_0%,rgba(20,18,16,0)_30%)] md:[background:linear-gradient(90deg,rgba(20,18,16,0)_calc(100%-140px),#141210_100%)]" />
      </div>
      <div className="flex items-center px-6 py-12 md:px-12 lg:px-16">
        <div className="max-w-[480px]">
          <p className="text-[12px] font-semibold tracking-[0.3em] text-gold">OUR APPROACH</p>
          <h2 className="mt-3 font-display text-[34px] font-medium leading-tight text-white md:text-[40px]">
            Teeth That Fit <em className="font-normal text-gold">the Person</em>
          </h2>
          <p className="mt-4 text-[15px] leading-[1.65] text-white/85">
            Perfect proportions aren’t enough if the smile looks borrowed. With morphopsychology, tooth form is chosen
            for your patient’s face, smile, age and character, then every step is checked before the case leaves the
            bench.
          </p>
          <Button href="/article.html?p=morphopsychology-teeth-that-fit-the-person" variant="ghost" className="mt-7 h-10 px-6">
            Read About Morphopsychology
          </Button>
        </div>
      </div>
    </section>
  )
}

// reviews from STEPBAE's dentist clients, first published on toothlab.ai (only those about the restorations themselves)
const reviews = [
  {
    quote: 'I was skeptical at first, but the quality speaks for itself. The crowns and bridges we receive are consistently excellent. My chair time has decreased significantly, and patient satisfaction is at an all-time high.',
    name: 'Dr. Jeff Blank',
    role: 'General Dentist, Beaufort, SC',
  },
  {
    quote: 'The level of precision in their work is remarkable. Every case comes back exactly as planned. The communication is clear, and the support team is always responsive. Highly recommend.',
    name: 'Dr. Jong S. Lim',
    role: 'General Dentist, Elmhurst, NY',
  },
]

export function Reviews() {
  return (
    <section className="bg-cream px-6 py-16 text-ink lg:px-12">
      <div className="mx-auto max-w-[1000px]">
        <p className="text-center text-[12px] font-semibold tracking-[0.3em] text-gold-dark">FROM OUR DENTISTS</p>
        <h2 className="mt-3 text-center font-display text-[36px] font-medium leading-tight md:text-[42px]">
          What Dentists <em className="font-normal text-gold-dark">Say</em>
        </h2>
        <div className="mt-10 grid gap-5 md:grid-cols-2">
          {reviews.map((r) => (
            <figure key={r.name} className="rounded-[3px] border border-gold-dark/30 bg-white/60 p-7">
              <span aria-hidden="true" className="font-display text-[56px] leading-[0.6] text-gold-dark">“</span>
              <blockquote className="mt-2 font-display text-[19px] italic leading-[1.5]">{r.quote}</blockquote>
              <figcaption className="mt-5 text-[14px]">
                <span className="font-semibold">{r.name}</span>
                <span className="block text-ink/65">{r.role}</span>
              </figcaption>
            </figure>
          ))}
        </div>
        <p className="mt-5 text-center text-[13px] italic text-ink/60">
          Reviews first shared on{' '}
          <a href="https://toothlab.ai" target="_blank" rel="noopener noreferrer" className="underline underline-offset-2 hover:text-gold-dark">
            ToothLab.ai
          </a>
          .
        </p>
      </div>
    </section>
  )
}

// the questions dentists ask before sending a first case; the Mini Steps chat answers from these too, `words` being
// what a visitor might type to ask each one
export const partnerFaqs = [
  {
    id: 'turnaround',
    q: 'What is your turnaround time?',
    a: 'Standard turnaround is 10 business days from the day we receive your case.',
    words: /turnaround|how long|how fast|how many days|business days|when will (i|we) get|lead time/,
  },
  {
    id: 'rush',
    q: 'Do you take rush cases?',
    a: 'Only by arrangement, and at a premium rush rate. Please ask before you prep, so we can tell you whether a rush is possible for your case.',
    words: /rush|urgent|faster|sooner|expedite|deadline|asap/,
  },
  {
    id: 'warranty',
    q: 'Is there a warranty?',
    a: 'Yes. Every restoration we make carries a 5-year warranty.',
    words: /warrant|guarantee|remake|broke|fracture|chip/,
  },
  {
    id: 'shipping',
    q: 'How do I send physical impressions or models?',
    a: 'We provide prepaid shipping labels. Fill out the partnership form, mention that you’ll send physical impressions or models, and we’ll send the labels with our Rx form.',
    words: /ship|label|fedex|ups|mail|courier|pick ?up|physical|impression|model/,
  },
  {
    id: 'scanners',
    q: 'Which scanners do you accept?',
    a: 'iTero, 3Shape TRIOS, Medit and Primescan through their portals, plus STL or PLY files from most other scanners.',
    words: /scanner|itero|trios|medit|primescan|stl|ply|portal/,
  },
  {
    id: 'price',
    q: 'How much do restorations cost?',
    a: 'Pricing depends on the restoration and your monthly volume, so we send our current price list on request. Ask for it with the form below, or in the chat.',
    words: /price|pricing|cost|fee|how much|quote/,
  },
  {
    id: 'chairside',
    q: 'Can you help at the delivery appointment?',
    a: 'For local practices, STEPBAE can join the delivery appointment to adjust or stain the restorations chairside. Just ask when you send the case.',
    words: /chairside|delivery appointment|seat|come to (our|my) office|in person/,
  },
]

export function PartnerFAQ() {
  return (
    <section data-chat-topic="partner-faq" className="border-t border-gold/20 bg-ink px-6 py-16 lg:px-12">
      <div className="mx-auto max-w-[820px]">
        <h2 className="text-center font-display text-[36px] font-medium leading-tight text-white md:text-[42px]">
          Questions From <em className="font-normal text-gold">Dentists</em>
        </h2>
        <div className="mt-10 divide-y divide-gold/20 border-y border-gold/20">
          {partnerFaqs.map(({ q, a }) => (
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
