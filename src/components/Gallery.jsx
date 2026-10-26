import { useState } from 'react'
import Lightbox from './Lightbox.jsx'

// photos live in public/images/gallery as work-01.jpg, work-02.jpg, … in display order;
// to add one, drop it in that folder and add its description here
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

const photos = alts.map((alt, i) => ({ src: `/images/gallery/work-${String(i + 1).padStart(2, '0')}.jpg`, alt }))

export default function Gallery() {
  const [open, setOpen] = useState(null) // index into `photos`, or null when the lightbox is closed

  return (
    <section id="gallery" className="bg-ink px-6 pb-16 lg:px-12">
      {/* some photos carry the name Bay, the spelling Step used from about 2012 to 2024 */}
      <p className="mx-auto mb-10 max-w-[640px] text-center text-[15px] italic leading-relaxed text-white/60">
        A note on the name: some of these photos credit “Step Bay.” Step’s surname was spelled Bay from around 2012
        until 2024, when it changed back to Bae. Same hands, same work.
      </p>

      {/* masonry: photos keep their own shape and stack in columns */}
      <div className="mx-auto max-w-[1400px] columns-1 gap-4 sm:columns-2 lg:columns-3">
        {photos.map((p, i) => (
          <button
            key={p.src}
            type="button"
            onClick={() => setOpen(i)}
            aria-label={`View larger: ${p.alt}`}
            className="group relative mb-4 block w-full break-inside-avoid overflow-hidden rounded-[3px] bg-ink-2"
          >
            <img
              src={p.src}
              alt={p.alt}
              loading="lazy"
              className="block w-full transition-transform duration-700 ease-out group-hover:scale-[1.03]"
            />
          </button>
        ))}
      </div>

      <Lightbox photos={photos} index={open} onChange={setOpen} onClose={() => setOpen(null)} />
    </section>
  )
}
