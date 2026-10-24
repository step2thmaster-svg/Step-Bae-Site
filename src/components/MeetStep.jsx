import Button from './Button.jsx'

export default function MeetStep() {
  return (
    <section id="about" className="bg-cream text-ink">
      {/* text on the left half, image on the right half (mirrors Precision); stacks on phones */}
      <div className="grid md:grid-cols-2">
        <div className="flex items-center justify-center px-6 py-12 lg:px-12">
          <div className="max-w-[480px] text-center">
            <h2 className="font-display text-[36px] font-medium leading-tight md:text-[40px]">Meet Step</h2>
            <p className="mt-4 text-[15px] leading-[1.6] text-ink/90">
              Step Toothmaster Bae is a dental laboratory professional
              with a passion for ceramic artistry, esthetic restorations, and the
              details that make a difference in clinical outcomes. Through our
              laboratory, we create restorations that combine precision,
              craftsmanship, and natural esthetics.
            </p>
            <Button variant="outline" className="mt-7 h-10 px-6">
              About Step
            </Button>
          </div>
        </div>

        <div className="relative min-h-[260px] bg-black md:min-h-[380px]">
          <img
            src="/images/hero3.jpg"
            alt="A grid of ceramic restoration and smile cases"
            className="absolute inset-0 h-full w-full object-cover object-center"
          />
          {/* soft fade into the cream: from the top on phones (image sits below the text), from the left on md+ */}
          <div className="absolute inset-0 [background:linear-gradient(180deg,#f4ede3_0%,rgba(244,237,227,0.6)_12%,rgba(244,237,227,0)_35%)] md:[background:linear-gradient(90deg,#f4ede3_0%,rgba(244,237,227,0.75)_12%,rgba(244,237,227,0.25)_28%,rgba(244,237,227,0)_42%)]" />
        </div>
      </div>
    </section>
  )
}
