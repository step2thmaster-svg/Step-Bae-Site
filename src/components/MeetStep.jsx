import Button from './Button.jsx'

// two gradients intersected: fades the panel's left/right and top/bottom edges
const panelFade =
  'linear-gradient(to right, transparent 0, #000 40px, #000 calc(100% - 40px), transparent 100%),' +
  'linear-gradient(to bottom, transparent 0, #000 28px, #000 calc(100% - 28px), transparent 100%)'

export default function MeetStep() {
  return (
    <section id="about" className="relative overflow-hidden border-t border-gold/30 bg-black text-white">
      {/* the case grid fills the whole section behind the text */}
      <img
        src="/images/hero3.jpg"
        alt="A grid of ceramic restoration and smile cases"
        className="absolute inset-0 h-full w-full object-cover object-center"
      />
      {/* strong fade into Precision above; lighter fade toward the call to action below */}
      <div className="absolute inset-0 [background:linear-gradient(180deg,#1c1916_0%,rgba(28,25,22,0.85)_12%,rgba(28,25,22,0)_38%),linear-gradient(0deg,rgba(26,23,20,0.7)_0%,rgba(26,23,20,0.35)_8%,rgba(26,23,20,0)_22%)]" />

      <div className="relative flex min-h-[480px] items-center px-6 py-16 lg:px-12">
        {/* translucent black panel on the left: blurs and darkens the grid behind it so the white text stays clean;
            its edges fade out (mask) over 40px at the sides and 28px top/bottom, inside the padding so the text isn't faded */}
        <div
          className="w-full max-w-[608px] md:ml-12 bg-black/50 px-12 py-9 text-center backdrop-blur-lg sm:px-14 sm:py-8"
          style={{ maskImage: panelFade, WebkitMaskImage: panelFade, maskComposite: 'intersect', WebkitMaskComposite: 'source-in' }}
        >
          <h2 className="font-display text-[36px] font-medium leading-tight md:text-[42px]">Meet the Toothmaster</h2>
          <p className="mt-4 text-[15px] leading-[1.65] text-white/90 md:text-[16px]">
            Step Toothmaster Bae is a dental laboratory professional
            with a passion for ceramic artistry, esthetic restorations, and the
            details that make a difference in clinical outcomes. 
            
            Away from the bench, Step teaches and lectures for fellow technicians and
            clinicians, and works with practices and laboratories as a
            consultant.
          </p>
          <Button variant="ghost" className="mt-7 h-10 px-6">
            About Step
          </Button>
        </div>
      </div>
    </section>
  )
}
