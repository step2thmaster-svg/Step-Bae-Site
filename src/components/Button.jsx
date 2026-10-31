import { ArrowRight } from './Icons.jsx'

const variants = {
  solid:
    'bg-gold text-ink-2 hover:bg-gold-light shadow-[0_6px_20px_-8px_rgba(212,168,104,0.6)]',
  outline:
    'border border-gold-dark/80 text-ink-2 hover:bg-gold hover:border-gold',
  ghost:
    'border border-gold/80 text-white hover:bg-gold hover:text-ink-2',
}

export default function Button({
  href = '#',
  children,
  variant = 'solid',
  arrow = true,
  className = '',
  onClick,
}) {
  return (
    <a
      href={href}
      onClick={onClick}
      className={`inline-flex items-center justify-center gap-2 text-[13px] font-semibold transition-colors duration-200 ${variants[variant]} ${className}`}
    >
      {children}
      {arrow && <ArrowRight />}
    </a>
  )
}
