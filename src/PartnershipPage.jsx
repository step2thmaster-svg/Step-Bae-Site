import Header from './components/Header.jsx'
import Button from './components/Button.jsx'
import PortalGuide from './components/PortalGuide.jsx'
import PartnerForm from './components/PartnerForm.jsx'
import { Promises, Reasons, Restorations, CaseFlow, Approach, PartnerFAQ } from './components/PartnerSections.jsx'
import Reviews from './components/Reviews.jsx'
import Footer from './components/Footer.jsx'

export default function PartnershipPage() {
  return (
    <div className="min-h-screen bg-ink">
      <div className="relative">
        <Header />

        <section className="px-6 pb-12 pt-[138px] text-center lg:px-12">
          <p className="text-[12px] font-semibold tracking-[0.3em] text-gold">DENTIST PARTNERSHIP</p>
          <h1 className="mt-4 font-display text-[44px] font-medium leading-[1.08] text-white md:text-[58px]">
            Send Us Your <em className="font-normal text-gold">Cases</em>
          </h1>
          <p className="mx-auto mt-5 max-w-[580px] text-[15px] leading-[1.6] text-white/90 md:text-[16px]">
            Handcrafted esthetic restorations, a direct line to your technician, and a 5-year warranty. Connect with us
            in your scanner’s portal, then tell us a little about your practice so we can set up your account.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Button href="#partner-form" className="h-10 px-6">Become a Partner</Button>
            <Button href="#portals" variant="ghost" className="h-10 px-6">Connect My Scanner</Button>
          </div>
        </section>
      </div>
      <Promises />
      <Reasons />
      <Restorations />
      <CaseFlow />
      <Reviews page={['partnership', 'patients']} eyebrow="FROM OUR DENTISTS & PATIENTS" title={['What Dentists & Patients', 'Say']} />
      <Approach />
      <PortalGuide />
      <PartnerFAQ />
      <PartnerForm />
      <Footer />
    </div>
  )
}
