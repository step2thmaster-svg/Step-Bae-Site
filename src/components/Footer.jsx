import Logo from './Logo.jsx'
import { Mail, MapPin, Threads, Facebook, TikTok, YouTube } from './Icons.jsx'
import { EMAIL } from './sendForm.js'

const explore = [
  { label: 'About', href: '/about.html' },
  { label: 'Craftsmanship', href: '/craftsmanship.html' },
  { label: 'Insights', href: '/insights.html' },
]

const work = [
  { label: 'Dentist Partnership', href: '/partnership.html' },
  { label: 'Consultation', href: '/consultation.html' },
]

const social = [
  { label: 'Threads', href: 'https://www.threads.com/@step2thmaster', Icon: Threads },
  { label: 'Facebook', href: 'https://www.facebook.com/step2thmaster/', Icon: Facebook },
  { label: 'TikTok', href: 'https://www.tiktok.com/@boynamedbae', Icon: TikTok },
  { label: 'YouTube', href: 'https://www.youtube.com/@boynamedbae', Icon: YouTube },
]

function Column({ title, children }) {
  return (
    <div>
      <h3 className="text-[11px] font-semibold uppercase tracking-[0.2em] text-gold">{title}</h3>
      <ul className="mt-3 space-y-2 text-[14px] text-white/75">{children}</ul>
    </div>
  )
}

function LinkList({ links }) {
  return links.map((l) => (
    <li key={l.label}>
      <a href={l.href} className="transition-colors hover:text-gold">{l.label}</a>
    </li>
  ))
}

export default function Footer() {
  return (
    <footer id="contact" className="border-t border-gold/20 bg-ink">
      {/* same side margins as the header */}
      <div className="px-6 lg:px-12">
        <div className="grid gap-8 py-9 sm:grid-cols-2 lg:grid-cols-[1.6fr_1fr_1fr_1fr] lg:gap-12">
          <div className="max-w-[320px]">
            <Logo />
            <p className="mt-4 text-[14px] leading-relaxed text-white/65">
              A private dental laboratory dedicated to esthetic restorations,
              thoughtful craftsmanship, and personalized service for dental professionals.
            </p>
            <div className="mt-4 flex items-center gap-2.5">
              {social.map(({ label, href, Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 text-white/80 transition-colors hover:border-gold hover:text-gold"
                >
                  <Icon className="h-[17px] w-[17px]" />
                </a>
              ))}
            </div>
          </div>

          <Column title="Explore">
            <LinkList links={explore} />
          </Column>

          <Column title="Work With Us">
            <LinkList links={work} />
          </Column>

          <Column title="Contact">
            <li>
              <a href={`mailto:${EMAIL}`} className="flex items-center gap-3 transition-colors hover:text-gold">
                <Mail className="h-[15px] w-[18px] shrink-0 text-gold" /> {EMAIL}
              </a>
            </li>
            <li className="flex items-center gap-3">
              <MapPin className="h-[16px] w-[16px] shrink-0 text-gold" /> Pineville, NC
            </li>
          </Column>
        </div>

        <div className="flex flex-col gap-3 border-t border-white/10 py-4 text-[12px] text-white/50 sm:flex-row sm:items-center sm:justify-between">
          <span>© {new Date().getFullYear()} STEPBAE Dental Laboratory. All rights reserved.</span>
          <div className="flex gap-6">
            <a href="#" className="transition-colors hover:text-gold">Privacy Policy</a>
            <a href="#" className="transition-colors hover:text-gold">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
