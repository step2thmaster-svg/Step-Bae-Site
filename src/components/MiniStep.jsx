// "Mini Step": a chibi (SD) version of Step for the site assistant: long dark hair, dark jacket, holding a tooth.
// It gently bobs, blinks and waves (see the mini-step keyframes in index.css); `still` turns the motion off.
export default function MiniStep({ className = '', still = false }) {
  const anim = (name) => (still ? undefined : name)
  return (
    <svg viewBox="0 0 120 130" className={className} aria-hidden="true">
      <g className={anim('mini-step-bob')}>
        {/* hair, back: long and straight, past the shoulders */}
        <path d="M26 52 C24 26 44 12 60 12 C78 12 97 25 94 54 C96 74 98 92 92 104 L28 104 C21 92 24 72 26 52 Z" fill="#1d1916" />

        {/* body: dark jacket over a white shirt */}
        <path d="M38 96 C38 86 48 82 60 82 C72 82 82 86 82 96 L84 118 C84 122 81 124 77 124 L43 124 C39 124 36 122 36 118 Z" fill="#2b2622" />
        <path d="M53 83 L60 98 L67 83 Z" fill="#f7f2ea" />
        <path d="M60 98 L57 86 M60 98 L63 86" stroke="#d4a868" strokeWidth="1.2" fill="none" />
        <circle cx="60" cy="106" r="1.4" fill="#d4a868" />
        <circle cx="60" cy="113" r="1.4" fill="#d4a868" />
        {/* legs */}
        <rect x="47" y="121" width="10" height="7" rx="3" fill="#1d1916" />
        <rect x="63" y="121" width="10" height="7" rx="3" fill="#1d1916" />

        {/* left arm resting */}
        <path d="M39 92 C33 98 32 106 35 112" stroke="#2b2622" strokeWidth="8" strokeLinecap="round" fill="none" />
        <circle cx="35.5" cy="113" r="4.2" fill="#f2cfae" />

        {/* right arm waving, holding up a little tooth */}
        <g className={anim('mini-step-wave')} style={{ transformOrigin: '81px 92px' }}>
          <path d="M81 92 C89 88 93 80 94 72" stroke="#2b2622" strokeWidth="8" strokeLinecap="round" fill="none" />
          <circle cx="94.5" cy="69" r="4.4" fill="#f2cfae" />
          <path
            d="M88 58 C88 52 92 50 95 52 C97 51 99 51 101 52 C104 50 108 52 108 58 C108 63 106 66 105 70 C104 74 101 74 100.5 70 L99.5 66 C99 64 98 64 97.5 66 L96.5 70 C96 74 93 74 92 70 C91 66 88 63 88 58 Z"
            fill="#ffffff"
            stroke="#c9b9a3"
            strokeWidth="1"
          />
          <path d="M91.5 55.5 C92.5 54 94 53.6 95 54" stroke="#e7ddd0" strokeWidth="1.4" strokeLinecap="round" fill="none" />
        </g>

        {/* head */}
        <ellipse cx="60" cy="56" rx="29" ry="28" fill="#f2cfae" />
        {/* ears peeking through the hair */}
        <ellipse cx="31.5" cy="60" rx="3.5" ry="5" fill="#ebc29e" />
        <ellipse cx="88.5" cy="60" rx="3.5" ry="5" fill="#ebc29e" />

        {/* hair, front: centre part with long strands framing the face */}
        <path
          d="M60 16 C42 16 30 28 30 46 C30 58 29 70 27 84 C33 78 35 66 36 54 C38 44 44 36 52 31 C55 29 58 25 60 20 Z"
          fill="#1d1916"
        />
        <path
          d="M60 16 C78 16 90 28 90 46 C90 58 91 70 93 84 C87 78 85 66 84 54 C82 44 76 36 68 31 C65 29 62 25 60 20 Z"
          fill="#1d1916"
        />
        {/* a soft shine on the hair */}
        <path d="M42 26 C47 21 53 19 57 19" stroke="#4a403a" strokeWidth="2" strokeLinecap="round" fill="none" />
        <path d="M70 21 C75 22 80 25 83 29" stroke="#4a403a" strokeWidth="1.6" strokeLinecap="round" fill="none" />

        {/* eyes: big and dark with a sparkle; they blink */}
        <g className={anim('mini-step-blink')} style={{ transformOrigin: '60px 60px' }}>
          <ellipse cx="49" cy="60" rx="4.6" ry="5.6" fill="#231d1a" />
          <ellipse cx="71" cy="60" rx="4.6" ry="5.6" fill="#231d1a" />
          <circle cx="50.6" cy="57.8" r="1.7" fill="#fff" />
          <circle cx="72.6" cy="57.8" r="1.7" fill="#fff" />
          <circle cx="47.8" cy="62.2" r="0.8" fill="#fff" opacity="0.8" />
          <circle cx="69.8" cy="62.2" r="0.8" fill="#fff" opacity="0.8" />
        </g>
        {/* brows */}
        <path d="M44 51.5 C46.5 50 49.5 50 52 51" stroke="#2a2320" strokeWidth="1.5" strokeLinecap="round" fill="none" />
        <path d="M68 51 C70.5 50 73.5 50 76 51.5" stroke="#2a2320" strokeWidth="1.5" strokeLinecap="round" fill="none" />
        {/* blush and a small smile */}
        <ellipse cx="42.5" cy="68" rx="4.5" ry="2.6" fill="#f29c94" opacity="0.55" />
        <ellipse cx="77.5" cy="68" rx="4.5" ry="2.6" fill="#f29c94" opacity="0.55" />
        <path d="M55.5 69 C58 72 62 72 64.5 69" stroke="#8a4a3c" strokeWidth="1.6" strokeLinecap="round" fill="none" />
      </g>
    </svg>
  )
}
