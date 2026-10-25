import Header from './components/Header.jsx'
import Hero from './components/Hero.jsx'
import Features from './components/Features.jsx'
import FeaturedCases from './components/FeaturedCases.jsx'
import Precision from './components/Precision.jsx'
import MeetStep from './components/MeetStep.jsx'
import HomeConsult from './components/HomeConsult.jsx'
import CallToAction from './components/CallToAction.jsx'
import Footer from './components/Footer.jsx'

export default function App() {
  return (
    <div className="min-h-screen bg-ink">
      <div className="relative">
        <Header />
        <Hero />
      </div>
      <Features />
      <FeaturedCases />
      <Precision />
      <MeetStep />
      <HomeConsult />
      <CallToAction />
      <Footer />
    </div>
  )
}
