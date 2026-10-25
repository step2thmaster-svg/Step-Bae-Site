import Header from './components/Header.jsx'
import Button from './components/Button.jsx'
import ConsultServices from './components/ConsultServices.jsx'
import Events from './components/Events.jsx'
import ConsultForm from './components/ConsultForm.jsx'
import Footer from './components/Footer.jsx'

export default function ConsultationPage() {
  return (
    <div className="min-h-screen bg-ink">
      <div className="relative">
        <Header />
        {/* top padding clears the header, as on the home page hero */}
        <section className="px-6 pb-14 pt-[138px] text-center lg:px-12">
          <p className="text-[12px] font-semibold tracking-[0.3em] text-gold">CONSULTATION &amp; EDUCATION</p>
          <h1 className="mt-4 font-display text-[44px] font-medium leading-[1.08] text-white md:text-[58px]">
            Expertise <em className="font-normal">for the</em> <em className="font-normal text-gold">Whole Team</em>
          </h1>
          <p className="mx-auto mt-5 max-w-[600px] text-[15px] leading-[1.6] text-white/90 md:text-[16px]">
            Step Toothmaster Bae, CDT, DTG, works with dental practices, laboratories
            and industry partners as a consultant, educator and speaker, bringing
            years at the bench to your workflow, your team and your events.
          </p>
          <Button href="#inquiry" className="mt-8 h-10 px-6">Start a Conversation</Button>
        </section>
      </div>
      <ConsultServices />
      <Events />
      <ConsultForm />
      <Footer />
    </div>
  )
}
