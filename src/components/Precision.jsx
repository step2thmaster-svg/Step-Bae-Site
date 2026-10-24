import Button from './Button.jsx'

export default function Precision() {
  return (
    <section id="craftsmanship" className="relative overflow-hidden bg-ink-2">
      <div className="absolute inset-y-0 left-0 w-full md:w-[60%]">
        <img
          src="/images/precision-preci.jpg"
          alt="Close-up of ceramic restorations on the upper front teeth, side view"
          className="h-full w-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-ink-2/60 md:bg-transparent md:[background:linear-gradient(90deg,rgba(28,25,22,0)_55%,rgba(28,25,22,0.85)_85%,#1c1916_100%)]" />
      </div>

      <div className="relative mx-auto flex min-h-[254px] max-w-[1024px] justify-end px-6 py-9 lg:px-12">
        <div className="max-w-[360px] md:ml-auto md:mr-[18px]">
          <h2 className="font-display text-[36px] font-medium leading-tight text-white">
            The Art <em className="font-normal">of</em>{' '}
            <em className="font-normal text-gold">Precision</em>
          </h2>
          <p className="mt-4 text-[14.5px] leading-[1.5] text-white/90">
            From ceramic layering to shade characterization, every detail
            matters. Our focus is on translating clinical requirements into
            natural-looking restorations through exceptional materials and
            meticulous technique.
          </p>
          <Button className="mt-5 h-10 px-[25px]">Our Craftsmanship</Button>
        </div>
      </div>
    </section>
  )
}
