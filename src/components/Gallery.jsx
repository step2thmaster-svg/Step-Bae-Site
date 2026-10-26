import { useEffect, useState } from 'react'
import Lightbox from './Lightbox.jsx'

// photos live in public/images/gallery as work-01.jpg, work-02.jpg, … in display order;
// to add one, drop it in that folder and add its description here and its shape to `ratios` below
const alts = [
  'Upper anterior ceramic restorations on a stone model, with a row of lower arch wax-ups below',
  'Full-arch implant prosthesis with pink ceramic gingiva, upper and lower',
  'Collage of restoration cases',
  'Two upper anterior restorations on models, side by side',
  'Posterior crowns and bridges, from wax-up to finished ceramic',
  'Four upper anterior ceramic crowns on the model, close-up',
  'Smile with upper anterior ceramic restorations',
  'CERASMART restoration on a dark background',
  'LiSi anterior crowns on the model, beside a shell',
  'LiSi full arch on the model, with design stages below',
  'Upper anterior ceramic crowns in the mouth',
  'Upper anterior LiSi restorations in the mouth',
  'Foil veneer and implant hands-on course: case steps and finished smile',
  'Zirconium Revolution: upper anterior arch, Chicago Lab Day 2016',
  'Lower anterior incisors, close-up',
  'CEREC digital design above the finished LiSi crowns',
  'Upper and lower anterior arches finished with a brush, a bur and a disc',
  'Single LiSi anterior crowns, all in one bake',
  'Anterior implant crown in LiSi, with the abutment and build-up stages',
  'Foil mask: anterior crown from stump to finished ceramic',
  'Lower LiSi arch on the model, with the pencil-marked layering plan',
  'Two LiSi central incisor crowns with crack-line characterization',
  'The art of cutback: lower anterior crowns with gingival ceramic',
  'Milled full-arch implant prosthesis in its puck, with finishing stages',
  'Lower anterior implant crown, before and after',
  'Initial ZR-FS stained zirconia arch',
  'Initial ZR-FS anterior crowns in the mouth and on the model',
  'e.max anterior crowns, with the gold-powdered wax-up',
  'GRADIA gum full-arch restoration, stages to finished smile',
  'Pressed e.max central incisors in the mouth, close-up',
  'Upper central incisor crowns in the mouth, close-up',
  'Upper anterior crowns in the mouth, side view',
  'Upper anterior crowns on the model, with reflection',
  'Final preview design and diagnostic wax-up',
  'From final preview design to final e.max Ceram design with anaxGUM tissue',
]

// width ÷ height of each photo, in the same order, so columns can be balanced and levelled;
// a photo without an entry is treated as 2.6, the shape most of them share
const ratios = [
  2.611, 1.333, 3.101, 2.606, 2.608, 2.611, 2.611, 2.27, 2.608, 2.616, 2.608, 2.608, 2.608, 2.608, 1.0, 2.608, 2.608, 2.608,
  2.608, 2.608, 2.611, 2.608, 2.608, 2.608, 2.608, 3.03, 2.608, 3.03, 2.608, 1.504, 2.035, 2.608, 2.215, 2.608, 2.611,
]

const photos = alts.map((alt, i) => ({
  src: `/images/gallery/work-${String(i + 1).padStart(2, '0')}.jpg`,
  alt,
  ratio: ratios[i] ?? 2.6,
}))

// 1 column on phones, 2 from 640px, 3 from 1024px (Tailwind's sm and lg)
function useColumnCount() {
  const count = () => (window.matchMedia('(min-width: 1024px)').matches ? 3 : window.matchMedia('(min-width: 640px)').matches ? 2 : 1)
  const [n, setN] = useState(count)
  useEffect(() => {
    const update = () => setN(count())
    window.addEventListener('resize', update)
    return () => window.removeEventListener('resize', update)
  }, [])
  return n
}

// masonry: each photo goes into the currently shortest column
function toColumns(items, n) {
  const cols = Array.from({ length: n }, () => ({ items: [], height: 0 }))
  for (const item of items) {
    const col = cols.reduce((a, b) => (b.height < a.height ? b : a))
    col.items.push(item)
    col.height += 1 / item.ratio
  }
  return cols.map((c) => c.items)
}

// `children` (e.g. a call-to-action) get a row of their own halfway through the photos
export default function Gallery({ children }) {
  const [open, setOpen] = useState(null) // index into `photos`, or null when the lightbox is closed
  const n = useColumnCount()
  const indexed = photos.map((p, i) => ({ ...p, i }))
  const half = Math.ceil(photos.length / 2)

  // photos in the shorter columns stretch (trimming their edges a little) so every column ends flush
  const block = (items) => (
    <div className="mx-auto flex max-w-[1400px] gap-4">
      {toColumns(items, n).map((col, c) => (
        <div key={c} className="flex min-w-0 flex-1 flex-col gap-4">
          {col.map((p) => (
            <button
              key={p.src}
              type="button"
              onClick={() => setOpen(p.i)}
              aria-label={`View larger: ${p.alt}`}
              style={{ aspectRatio: p.ratio, flexGrow: 1 / p.ratio }}
              className="group relative block w-full overflow-hidden rounded-[3px] bg-ink-2"
            >
              <img
                src={p.src}
                alt={p.alt}
                loading="lazy"
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
              />
            </button>
          ))}
        </div>
      ))}
    </div>
  )

  return (
    <section id="gallery" className="bg-ink px-6 pb-16 lg:px-12">
      {children ? (
        <>
          {block(indexed.slice(0, half))}
          <div className="mx-auto my-4 flex max-w-[1400px] flex-col items-center justify-center gap-5 rounded-[3px] border border-gold/25 bg-ink-2 px-6 py-8 text-center sm:flex-row sm:gap-8">
            <p className="font-display text-[26px] italic leading-tight text-white">Have a case in mind?</p>
            {children}
          </div>
          {block(indexed.slice(half))}
        </>
      ) : (
        block(indexed)
      )}

      <Lightbox photos={photos} index={open} onChange={setOpen} onClose={() => setOpen(null)} />
    </section>
  )
}
