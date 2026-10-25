import Button from './Button.jsx'

export default function CallToAction() {
  return (
    <section id="partnership" className="relative overflow-hidden border-t border-gold/30 bg-black text-center">
      {/* the case grid as the background */}
      <img
        src="/images/hero3.jpg"
        alt=""
        aria-hidden="true"
        className="absolute inset-0 h-full w-full object-cover object-center"
      />
      {/* the warm dark-to-gold gradient laid over the grid as a translucent tint, so the text stays readable */}
      <div
        className="absolute inset-0 opacity-[0.88]"
        style={{
          background:
            'radial-gradient(ellipse 45% 120% at 90% 40%, rgba(150,110,60,0.55), transparent 70%),' +
            'radial-gradient(ellipse 40% 90% at 8% 100%, rgba(120,90,50,0.35), transparent 70%),' +
            'linear-gradient(100deg, #1a1714 0%, #2a231b 45%, #4a3a26 80%, #6a5133 100%)',
        }}
      />
      {/* soft diagonal light sweep */}
      <div className="pointer-events-none absolute -right-20 top-0 h-full w-1/2 -skew-x-12 bg-gradient-to-r from-transparent via-gold/10 to-transparent" />

      <div className="relative px-6 py-12 lg:px-12">
        <h2 className="font-display text-[32px] italic leading-tight text-white md:text-[40px]">
          Let’s Create Exceptional Smiles Together
        </h2>
        <p className="mt-3 text-[15px] text-white/90">
          Personalized service,
          uncompromising esthetics, and a partner you can trust.
        </p>
        <Button href="/partnership.html#partner-form" className="mt-7 h-10 px-6">Partner With Us</Button>
      </div>
    </section>
  )
}
