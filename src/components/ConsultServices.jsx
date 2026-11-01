import Button from './Button.jsx'

// one banner per service, in the style of the home page's Art of Precision: a photo on one half fading into the text
// on the other, alternating sides down the page. `inquiry` is what each button picks in the form below (one of
// ConsultForm's inquiryOptions)
const services = [
  {
    eyebrow: 'FOR PRACTICES & LABS',
    title: ['Digital Workflow', 'Consulting'],
    text: 'Every practice and lab runs on its own mix of scanners, design software and equipment. Let’s work together on a digital workflow that fits your ecosystem: we’ll start with how your team works today and build from there, not the other way around.',
    points: [
      'A review of your scanners, design software, milling and pressing',
      'A clear path for how cases move between practice and lab',
      'Scan, photo and prescription standards your team can follow',
      'Guidance as you add new equipment or materials',
    ],
    cta: 'Plan My Workflow',
    inquiry: 'Consulting',
    image: '/images/gallery/work-16.jpg',
    alt: 'A digital design on the design grid, above the finished ceramic restorations it became',
    position: 'object-[22%_50%]',
  },
  {
    eyebrow: 'FOR PRACTICES & LABS',
    title: ['Hands-On', 'Team Training'],
    text: 'Let’s work together on the skill your team needs most, right at their own benches. Small groups, real techniques, and results they can use on the very next case.',
    points: [
      'Ceramic layering and cutback',
      'All-on-X implant workflow',
      'Stain & glaze characterization',
      'A custom course built around your team’s needs',
    ],
    cta: 'Train My Team',
    inquiry: 'Course or workshop',
    image: '/images/home/hands-on-class.jpg',
    alt: 'Technicians celebrating with their work at the end of a hands-on course',
    position: 'object-[50%_64%]',
  },
  {
    eyebrow: 'FOR DENTISTS & LABS',
    title: ['Esthetic', 'Case Planning'],
    text: 'A complicated case deserves a second set of expert eyes before anything is prepped. Let’s work together, dentist, technician and Step, to plan the result from the start, so the final restoration is predictable.',
    points: [
      'Complex anterior and implant cases',
      'Material choice and shade strategy',
      'Clear communication between dentist and technician',
      'A plan agreed before prep, not after',
    ],
    cta: 'Plan a Case',
    inquiry: 'Consulting',
    image: '/images/insights/dentisthappy.jpg',
    alt: 'Dentists and Step reviewing smiles together',
  },
  {
    eyebrow: 'FOR CONFERENCES & EVENTS',
    title: ['Speaking &', 'Live Demos'],
    text: 'Let’s work together on your next event. With more than 70 lectures and hands-on courses given internationally, Step can speak or perform a live demo on your behalf, for your audience, your products and your stage.',
    points: [
      'Keynotes and lectures for conferences, study clubs and lab days',
      'Live ceramic demos for manufacturers and sponsors',
      'In person or online',
    ],
    cta: 'Book Step to Speak',
    inquiry: 'Lecture or speaking',
    image: '/images/consult/gc-art-of-cutback.jpg',
    alt: 'Step presenting The Art of Cutback, a GC America lecture on lithium disilicate',
  },
]

// picks the matching topic in the inquiry form, then the link scrolls down to it
const chooseInquiry = (inquiry) => {
  const select = document.querySelector('#inquiry select[name="Inquiry"]')
  if (select) select.value = inquiry
}

export default function ConsultServices() {
  return (
    <section id="services">
      {services.map((s, i) => {
        const flip = i % 2 === 1
        return (
          <div key={s.cta} className={`grid border-t border-gold/20 md:grid-cols-2 ${i % 2 ? 'bg-ink' : 'bg-ink-2'}`}>
            {/* md+: the photo reaches 96px past the middle, under the text column, so its fade sits further in */}
            <div className={`relative min-h-[260px] md:min-h-[460px] ${flip ? 'md:order-2 md:ml-[-96px]' : 'md:mr-[-96px]'}`}>
              <img src={s.image} alt={s.alt} loading="lazy" className={`absolute inset-0 h-full w-full object-cover ${s.position ?? 'object-center'}`} />
              {/* fades into the section's dark along the bottom, and on md+ also toward the text side */}
              <div
                className="absolute inset-0"
                style={{
                  background: `linear-gradient(0deg, var(--bg) 0%, rgba(0,0,0,0) 30%), linear-gradient(${flip ? 270 : 90}deg, rgba(0,0,0,0) calc(100% - 160px), var(--bg) 100%)`,
                  '--bg': i % 2 ? '#141210' : '#1c1916',
                }}
              />
            </div>

            <div
              className={`relative z-10 flex items-center px-6 py-12 ${
                flip ? 'md:order-1 md:pl-12 md:pr-[calc(3rem+96px)] lg:pl-16 lg:pr-[calc(4rem+96px)]' : 'md:pl-[calc(3rem+96px)] md:pr-12 lg:pl-[calc(4rem+96px)] lg:pr-16'
              }`}
            >
              <div className="max-w-[500px]">
                <p className="text-[12px] font-semibold tracking-[0.3em] text-gold">{s.eyebrow}</p>
                <h2 className="mt-3 font-display text-[36px] font-medium leading-[1.08] text-white md:text-[42px]">
                  {s.title[0]} <em className="font-normal text-gold">{s.title[1]}</em>
                </h2>
                <p className="mt-4 text-[15px] leading-[1.6] text-white/90">{s.text}</p>
                <ul className="mt-5 space-y-2 text-[14px] text-white/90">
                  {s.points.map((p) => (
                    <li key={p} className="flex items-start gap-2.5">
                      <span className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-gold" />
                      {p}
                    </li>
                  ))}
                </ul>
                <Button href="#inquiry" onClick={() => chooseInquiry(s.inquiry)} className="mt-7 h-10 px-6">
                  {s.cta}
                </Button>
              </div>
            </div>
          </div>
        )
      })}
    </section>
  )
}
