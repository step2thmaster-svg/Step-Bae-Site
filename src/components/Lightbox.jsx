import { useEffect } from 'react'
import { ArrowRight } from './Icons.jsx'

// full-screen photo viewer shared by the gallery and past courses.
// `photos` is [{ src, alt }], `index` the open one (null when closed); onChange(i) moves, onClose() closes.
export default function Lightbox({ photos, index, onChange, onClose }) {
  const step = (d) => onChange((index + d + photos.length) % photos.length)

  // Esc closes, arrows step; the page behind doesn't scroll while it's open
  useEffect(() => {
    if (index === null) return
    const onKey = (e) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowRight') step(1)
      if (e.key === 'ArrowLeft') step(-1)
    }
    window.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [index])

  if (index === null) return null

  const arrowClass =
    'flex h-11 w-11 items-center justify-center rounded-full border border-gold/60 text-gold transition-colors hover:bg-gold hover:text-ink'

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={photos[index].alt}
      onClick={onClose}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black/90 px-4 py-6 backdrop-blur-sm"
    >
      <button
        type="button"
        onClick={onClose}
        aria-label="Close"
        className="absolute right-4 top-4 flex h-11 w-11 items-center justify-center text-[30px] leading-none text-white/80 hover:text-gold"
      >
        ×
      </button>
      <img
        src={photos[index].src}
        alt={photos[index].alt}
        onClick={(e) => e.stopPropagation()}
        className="max-h-[80vh] max-w-full rounded-[3px] object-contain shadow-[0_24px_60px_-20px_rgba(0,0,0,0.8)]"
      />
      <div className="mt-5 flex items-center gap-6" onClick={(e) => e.stopPropagation()}>
        <button type="button" onClick={() => step(-1)} aria-label="Previous photo" className={arrowClass}>
          <ArrowRight className="h-4 w-4 rotate-180" />
        </button>
        <p className="min-w-[80px] text-center text-[13px] text-white/70">
          {index + 1} / {photos.length}
        </p>
        <button type="button" onClick={() => step(1)} aria-label="Next photo" className={arrowClass}>
          <ArrowRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  )
}
