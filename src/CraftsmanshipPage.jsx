import Header from './components/Header.jsx'
import Button from './components/Button.jsx'
import Gallery from './components/Gallery.jsx'
import CallToAction from './components/CallToAction.jsx'
import Footer from './components/Footer.jsx'

export default function CraftsmanshipPage() {
  return (
    <div className="min-h-screen bg-ink">
      <div className="relative">
        <Header />
        {/* top padding clears the header, as on the home page hero */}
        <section className="px-6 pb-10 pt-[138px] text-center lg:px-12">
          <p className="text-[12px] font-semibold tracking-[0.3em] text-gold">CRAFTSMANSHIP</p>
          <h1 className="mt-4 font-display text-[44px] font-medium leading-[1.08] text-white md:text-[58px]">
            The Art <em className="font-normal">of</em> <em className="font-normal text-gold">Precision</em>
          </h1>
          <p className="mx-auto mt-5 max-w-[560px] text-[15px] leading-[1.6] text-white/90 md:text-[16px]">
            A selection of restorations from the bench, each shaped and characterized to meet
            the clinical requirements and look natural in the smile.
          </p>
          <p className="mt-3 text-[13px] tracking-[0.06em] text-gold">
            Layered Ceramics <span className="px-1.5">·</span> Crowns &amp; Bridges <span className="px-1.5">·</span> Implant Restorations
          </p>
        </section>
      </div>
      <Gallery>
        <Button href="/partnership.html#partner-form" className="h-10 px-6">Start a Case</Button>
      </Gallery>
      <CallToAction />
      <Footer />
    </div>
  )
}
