import Header from './components/Header.jsx'
import PortalGuide from './components/PortalGuide.jsx'
import PartnerForm from './components/PartnerForm.jsx'
import Footer from './components/Footer.jsx'

export default function PartnershipPage() {
  return (
    <div className="min-h-screen bg-ink">
      <div className="relative">
        <Header />
        {/* top padding clears the header, as on the home page hero */}
        <section className="px-6 pb-12 pt-[138px] text-center lg:px-12">
          <p className="text-[12px] font-semibold tracking-[0.3em] text-gold">DENTIST PARTNERSHIP</p>
          <h1 className="mt-4 font-display text-[44px] font-medium leading-[1.08] text-white md:text-[58px]">
            Send Us Your <em className="font-normal text-gold">Cases</em>
          </h1>
          <p className="mx-auto mt-5 max-w-[580px] text-[15px] leading-[1.6] text-white/90 md:text-[16px]">
            STEPBAE is listed in the portals most practices already use. Connect
            with us in your scanner's portal, then tell us a little about your
            practice so we can set up your account.
          </p>
        </section>
      </div>
      <PortalGuide />
      <PartnerForm />
      <Footer />
    </div>
  )
}
