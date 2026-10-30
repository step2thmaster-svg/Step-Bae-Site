import Button from './Button.jsx'

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-ink">
      {/* Photo, anchored right, fading into the dark background */}
      <div className="absolute inset-y-0 right-0 w-full md:w-[56%]">
        <img
          src="/images/hero6.jpg"
          alt="Dental technician detailing a restoration by hand"
          className="h-full w-full object-cover object-[50%_60%]"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/40 to-transparent md:via-transparent md:from-ink md:[background:linear-gradient(90deg,#141210_0%,rgba(20,18,16,0.55)_10%,rgba(20,18,16,0)_30%)]" />
        <div className="absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-ink/80 to-transparent" />
      </div>

      {/* md+: as tall as the photo column is wide (56vw), so the square photo shows whole; capped for large screens.
          Not centred like the other sections: the text sits near the left edge so there's no wide empty margin. */}
      <div className="relative z-10 flex min-h-[440px] md:min-h-[min(56vw,600px)] items-center px-6 pb-9 pt-[118px] lg:px-12">
        {/* md+: text scales with the screen to fill the dark column left of the photo (photo is 56% wide) */}
        <div className="max-w-[370px] md:max-w-[min(42vw,640px)]">
          <h1 className="font-display text-[46px] font-medium leading-[1.08] text-white sm:text-[50px] md:text-[clamp(50px,4.8vw,78px)]">
            Where Ceramic <em className="font-normal text-gold">Artistry</em> Meets
            Esthetic Dentistry
          </h1>
          <p className="mt-6 max-w-[325px] text-[15px] leading-[1.35] text-white/90 md:max-w-[min(34vw,500px)] md:text-[clamp(15px,1.35vw,20px)] md:leading-[1.45]">
            STEPBAE is a private dental laboratory dedicated to esthetic
            restorations, thoughtful craftsmanship, and personalized service
            for dental professionals.
          </p>
          <Button href="/partnership.html#partner-form" className="mt-7 h-10 px-[25px] lg:mt-9 lg:h-12 lg:px-8 lg:text-[15px]">Submit a Case</Button>
        </div>
      </div>
    </section>
  )
}
