export default function Logo({ className = '' }) {
  return (
    <a href="/" className={`inline-flex flex-col leading-none ${className}`}>
      {/* negative margin cancels the trailing letter-spacing so the width ends at the last letter */}
      <span className="mr-[-0.18em] font-display text-[34px] font-medium tracking-[0.18em] text-white">
        STEPBAE
      </span>
      {/* letters are spread to span exactly the width of STEPBAE */}
      <span className="mt-1.5 flex justify-between text-[11.5px] font-semibold text-gold" aria-label="TOOTHMASTER">
        {'TOOTHMASTER'.split('').map((ch, i) => (
          <span key={i} aria-hidden="true">{ch}</span>
        ))}
      </span>
    </a>
  )
}
