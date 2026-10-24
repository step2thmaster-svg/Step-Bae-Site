import Logo from './Logo.jsx'
import { Mail, MapPin, Instagram } from './Icons.jsx'

export default function Footer() {
  return (
    <footer id="contact" className="border-t border-gold/20 bg-ink">
      {/* full width with the same side margins as the header; logo left, contact centre, social right */}
      <div className="px-6 lg:px-12">
        <div className="grid gap-8 py-8 md:grid-cols-3 md:items-center md:gap-0">
          <div>
            <Logo />
          </div>

          <div className="flex flex-col gap-4 text-[14px] text-white/90 sm:flex-row sm:items-center sm:justify-around md:border-x md:border-gold/45 md:py-3">
            <a href="mailto:info@stepbae.com" className="flex items-center gap-3 hover:text-gold">
              <Mail className="h-[18px] w-[22px] text-gold" /> info@stepbae.com
            </a>
            <span className="flex items-center gap-3">
              <MapPin className="h-[18px] w-[18px] text-gold" /> Pineville, NC
            </span>
          </div>

          <div className="flex flex-col items-start gap-2 md:items-end">
            <span className="text-[14px] text-white/90">Follow Our Work</span>
            <a href="#" aria-label="Instagram" className="text-white/90 hover:text-gold">
              <Instagram className="h-[22px] w-[22px]" />
            </a>
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-x-2 border-t border-white/20 py-5 text-[12px] text-white/80">
          <span>© {new Date().getFullYear()} STEPBAE. All rights reserved.</span>
          <span className="text-gold">|</span>
          <a href="#" className="text-gold hover:text-gold-light">Privacy Policy</a>
          <span className="text-gold">|</span>
          <a href="#" className="text-gold hover:text-gold-light">Terms of Service</a>
        </div>
      </div>
    </footer>
  )
}
