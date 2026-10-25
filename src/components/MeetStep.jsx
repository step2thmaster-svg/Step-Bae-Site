import Button from './Button.jsx'

// two gradients intersected: fades the panel's left/right and top/bottom edges
const panelFade =
  'linear-gradient(to right, transparent 0, #000 40px, #000 calc(100% - 40px), transparent 100%),' +
  'linear-gradient(to bottom, transparent 0, #000 28px, #000 calc(100% - 28px), transparent 100%)'

// fades the case grid into the background: strongly on the left (toward the panel), softly top and bottom
const gridFade =
  'linear-gradient(to right, transparent 0, #000 35%, #000 100%),' +
  'linear-gradient(to bottom, transparent 0, #000 15%, #000 85%, transparent 100%)'

export default function MeetStep() {
  return (
    <section id="about" className="relative overflow-hidden border-t border-gold/30 bg-ink-2 text-white">
      {/* the case grid, shown whole across the right two-thirds and centred vertically; the panel overlaps its faded left edge */}
      <img
        src="/images/hero3.jpg"
        alt="A grid of ceramic restoration and smile cases"
        className="absolute right-0 top-1/2 h-auto w-full -translate-y-1/2 md:w-2/3"
        style={{ maskImage: gridFade, WebkitMaskImage: gridFade, maskComposite: 'intersect', WebkitMaskComposite: 'source-in' }}
      />

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
