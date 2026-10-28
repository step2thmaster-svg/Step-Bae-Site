import { audienceLabel } from './insights.js'

// color code for who an article is for: gold for dentists, teal for patients, the two blended for both
export const audienceColor = {
  dentists: 'bg-gold',
  patients: 'bg-teal',
  both: 'bg-linear-to-r from-gold to-teal',
}

export default function AudienceTag({ audience, className = '' }) {
  return (
    <span
      className={`inline-block rounded-full px-2.5 py-0.5 text-[10px] font-semibold leading-[1.6] tracking-[0.16em] text-ink ${audienceColor[audience]} ${className}`}
    >
      {audienceLabel(audience).toUpperCase()}
    </span>
  )
}
