import Button from './Button.jsx'

// fades the headshot's edges out evenly into the background
const headshotFade = 'radial-gradient(ellipse 70% 70% at 50% 50%, #000 55%, transparent 100%)'

export default function MeetStep() {
  return (
    <section id="about" className="border-t border-gold/30 bg-ink-2 text-white">
      {/* mirror of The Art of Precision: text on the left half, photo on the right half; stacks on phones (photo first, as in Precision) */}
      <div className="grid md:grid-cols-2">
        {/* md+: the photo reaches 96px (~1 inch) past the middle, under the text column, so its side fade sits further left */}
        <div className="relative min-h-[260px] md:order-2 md:ml-[-96px] md:min-h-[380px]">
          <img
            src="/images/meet-pic28.jpg"
            alt="Step Toothmaster Bae"
            className="absolute inset-0 h-full w-full object-cover object-center"
          />
          {/* soft fade from the photo into the section's dark: along the bottom, and on md+ also into the text side over the first 160px */}
          <div className="absolute inset-0 [background:linear-gradient(0deg,#1c1916_0%,rgba(28,25,22,0.6)_10%,rgba(28,25,22,0)_30%)] md:[background:linear-gradient(0deg,#1c1916_0%,rgba(28,25,22,0.6)_10%,rgba(28,25,22,0)_30%),linear-gradient(270deg,rgba(28,25,22,0)_calc(100%-160px),#1c1916_100%)]" />
        </div>

        {/* md+: extra right padding (the photo's 96px overlap) keeps the text clear of the fade */}
        <div className="relative z-10 flex items-center justify-center px-6 py-12 md:order-1 md:pl-12 md:pr-[calc(3rem+96px)] lg:pl-16 lg:pr-[calc(4rem+96px)]">
          <div className="max-w-[480px] text-center">
            <h2 className="font-display text-[36px] font-medium leading-tight md:text-[40px]">About Toothmaster</h2>
            <p className="mt-4 text-[15px] leading-[1.6] text-white/90">
              Step Toothmaster Bae is a dental laboratory professional
              with a passion for the
              details that make a difference in clinical outcomes. Away from the
              bench, Step shares and lectures for fellow technicians and
              clinicians, and works with practices and laboratories as a digital lab consultant.

            </p>
            {/* the button stays centred; the 1.5-inch (144px) headshot hangs off its right side, layered over the photo
                but behind the text (-z-10 within the text column's stacking context) so the paragraph stays readable */}
            <div className="relative mt-7 inline-block">
              <Button href="/about.html" variant="ghost" className="h-10 px-6">
                About Step
              </Button>
              <img
                src="/images/headshot2.jpg"
                alt="Headshot of Step Toothmaster Bae"
                className="absolute left-full top-1/2 -z-10 ml-4 h-36 w-36 -translate-y-1/2 object-cover object-[50%_40%]"
                style={{ maskImage: headshotFade, WebkitMaskImage: headshotFade }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
