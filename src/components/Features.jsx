import { Palette, Education, Speaker, Consulting } from './Icons.jsx'

const items = [
  {
    Icon: Palette,
    title: 'Ceramic Artistry',
    text: 'Thoughtful layering and lifelike detail.',
  },
  {
    Icon: Education,
    title: 'Education',
    text: 'Hands-on training and continuous education for dental professionals.',
  },
  {
    Icon: Speaker,
    title: 'International Speaker',
    text: 'Keynote speaker at international dental conferences and author of numerous publications.',
  },
  {
    Icon: Consulting,
    title: 'Consulting',
    text: 'Case planning and digital workflow guidance for dental practices and laboratories.',
  },
]

export default function Features() {
  return (
    <section className="border-y border-gold/25 bg-ink-3">
      {/* full width like the header and hero; 2 columns on tablets, 4 in a row on desktop; dividers only between items in the same row */}
      <div className="grid gap-6 px-6 py-[18px] md:grid-cols-2 md:gap-y-5 lg:grid-cols-4 lg:gap-0 lg:px-12">
        {items.map(({ Icon, title, text }, i) => (
          <div
            key={title}
            className={`flex items-center gap-4 md:justify-center md:px-4 ${
              i % 2 ? 'md:border-l md:border-gold/45' : ''
            } ${i > 0 ? 'lg:border-l lg:border-gold/45' : ''} md:py-1`}
          >
            <Icon className="h-[46px] w-[50px] shrink-0 text-gold" />
            <div>
              <h3 className="font-display text-[18px] font-medium text-white">{title}</h3>
              <p className="mt-0.5 text-[11.5px] text-white/85">{text}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
