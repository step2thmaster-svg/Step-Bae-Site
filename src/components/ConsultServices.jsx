import { Palette, Education, Speaker, Consulting } from './Icons.jsx'

const services = [
  {
    Icon: Consulting,
    title: 'Digital Lab Consulting',
    text: 'Setting up or refining a digital workflow: scanners, design software, milling and pressing, and how cases move between practice and lab.',
  },
  {
    Icon: Education,
    title: 'Esthetic Case Planning',
    text: 'A second pair of eyes on complex anterior and implant cases, from material choice and shade to communication between dentist and technician.',
  },
  {
    Icon: Palette,
    title: 'Hands-On Courses',
    text: 'Small-group courses for technicians and clinicians on ceramic layering, cutback, foil veneers and stain & glaze characterization.',
  },
  {
    Icon: Speaker,
    title: 'Lectures & Events',
    text: 'Lectures for study clubs, lab days, conferences and manufacturers, in person or online.',
  },
]

export default function ConsultServices() {
  return (
    <section id="services" className="bg-cream px-6 py-14 text-ink lg:px-12">
      <div className="mx-auto max-w-[1200px]">
        <div className="flex items-center gap-6">
          <h2 className="font-display text-[36px] font-medium leading-none sm:whitespace-nowrap md:text-[40px]">
            How I Can Help
          </h2>
          <span className="hidden h-px flex-1 bg-gold-dark/40 sm:block" />
        </div>

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {services.map(({ Icon, title, text }) => (
            <article key={title} className="rounded-[3px] border border-gold-dark/30 bg-white/60 p-6">
              <Icon className="h-11 w-11 text-gold-dark" />
              <h3 className="mt-4 font-display text-[24px] font-medium leading-tight">{title}</h3>
              <p className="mt-3 text-[14px] leading-[1.55] text-ink/80">{text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
