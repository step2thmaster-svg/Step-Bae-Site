import { useState } from 'react'
import Logo from './Logo.jsx'
import Button from './Button.jsx'

const links = [
  { label: 'Home', href: '#', active: true },
  { label: 'Our Work', href: '#work' },
  { label: 'Craftsmanship', href: '#craftsmanship' },
  { label: 'About', href: '#about' },
  { label: 'Dentist Partnership', href: '#partnership' },
  { label: 'Contact', href: '#contact' },
]

export default function Header() {
  const [open, setOpen] = useState(false)

  return (
    <header className="absolute inset-x-0 top-0 z-30">
      {/* full width with the same side padding as the hero text */}
      <div className="flex items-center justify-between px-6 pt-4 lg:px-12">
        <Logo />

        <nav className="hidden items-center gap-[27px] lg:ml-14 lg:flex">
          {links.map((l) => (
            <a
              key={l.label}
              href={l.href}
              className={`relative pb-2 pt-2 text-[14px] transition-colors ${
                l.active ? 'text-gold' : 'text-white/90 hover:text-gold'
              }`}
            >
              {l.label}
              {l.active && (
                <span className="absolute inset-x-0 bottom-0 mx-auto h-[2px] w-full bg-gold" />
              )}
            </a>
          ))}
        </nav>

        <Button
          variant="ghost"
          arrow={false}
          className="hidden h-[31px] px-5 !text-[12px] lg:ml-auto lg:inline-flex"
        >
          Partner With Us
        </Button>

        <button
          onClick={() => setOpen(!open)}
          className="flex h-10 w-10 flex-col items-center justify-center gap-1.5 lg:hidden"
          aria-label="Toggle menu"
        >
          <span className={`h-px w-6 bg-white transition ${open ? 'translate-y-[7px] rotate-45' : ''}`} />
          <span className={`h-px w-6 bg-white transition ${open ? 'opacity-0' : ''}`} />
          <span className={`h-px w-6 bg-white transition ${open ? '-translate-y-[7px] -rotate-45' : ''}`} />
        </button>
      </div>

      {open && (
        <nav className="mx-4 mt-3 flex flex-col border border-white/10 bg-ink/95 p-4 backdrop-blur lg:hidden">
          {links.map((l) => (
            <a
              key={l.label}
              href={l.href}
              onClick={() => setOpen(false)}
              className={`py-2.5 text-sm ${l.active ? 'text-gold' : 'text-white/90'}`}
            >
              {l.label}
            </a>
          ))}
          <Button className="mt-3 h-10 px-5">Partner With Us</Button>
        </nav>
      )}
    </header>
  )
}
