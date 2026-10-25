import Button from './Button.jsx'

export default function Precision() {
  return (
    <section id="craftsmanship" className="bg-ink-2 pb-12">
      {/* photo on the left half, text on the right half; stacks on phones. Bottom padding leaves dark space before Meet the Toothmaster */}
      <div className="grid md:grid-cols-2">
        {/* md+: the photo reaches 96px (~1 inch) past the middle, under the text column, so its side fade sits further right */}
        <div className="relative min-h-[260px] md:mr-[-96px] md:min-h-[380px]">
          <img
            src="/images/precision-preci.jpg"
            alt="Close-up of ceramic restorations on the upper front teeth, side view"
            className="absolute inset-0 h-full w-full object-cover object-center"
          />
          {/* soft fade from the photo into the section's dark: along the bottom, and on md+ also into the text side over the last 160px */}
          <div className="absolute inset-0 [background:linear-gradient(0deg,#1c1916_0%,rgba(28,25,22,0.6)_10%,rgba(28,25,22,0)_30%)] md:[background:linear-gradient(0deg,#1c1916_0%,rgba(28,25,22,0.6)_10%,rgba(28,25,22,0)_30%),linear-gradient(90deg,rgba(28,25,22,0)_calc(100%-160px),#1c1916_100%)]" />
        </div>

        {/* md+: extra left padding (the photo's 96px overlap) keeps the text clear of the fade */}
        <div className="relative z-10 flex items-center justify-center px-6 py-12 md:pl-[calc(3rem+96px)] md:pr-12 lg:pl-[calc(4rem+96px)] lg:pr-16">
          <div className="max-w-[480px] text-center">
            <h2 className="font-display text-[36px] font-medium leading-tight text-white md:text-[40px]">
              The Art <em className="font-normal">of</em>{' '}
              <em className="font-normal text-gold">Precision</em>
            </h2>
            <p className="mt-4 text-[15px] leading-[1.6] text-white/90">
              From ceramic layering to shade characterization, every detail
              matters. Our focus is on translating clinical requirements into
              natural-looking restorations through exceptional materials and
              meticulous technique.
            </p>
            <Button className="mt-7 h-10 px-6">Our Craftsmanship</Button>
          </div>
        </div>
      </div>
    </section>
  )
}
