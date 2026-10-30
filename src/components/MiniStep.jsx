// "Mini Step": a K-pop style chibi (SD) version of Step for the site assistant: short wavy hair, V-line jaw,
// dark jacket, holding a tooth.
// It gently bobs, blinks and waves (see the mini-step keyframes in index.css); `still` turns the motion off.
export default function MiniStep({ className = '', still = false }) {
  const anim = (name) => (still ? undefined : name)
  return (
    <svg viewBox="0 0 120 130" className={className} aria-hidden="true">
      <g className={anim('mini-step-bob')}>
        {/* hair, back: short, fluffy and wavy, ending at the nape */}
        <path d="M28 50 C27 30 42 15 60 15 C78 15 93 28 92 50 C94 58 93 64 89 68 C87 70 84.5 69 85 66 L35 66 C35.5 69 33 70 31 68 C27 64 26 58 28 50 Z" fill="#2a1f1b" />

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

        {/* neck, then the head: a soft V-line jaw with a sharper chin */}
        <rect x="55" y="78" width="10" height="9" rx="3" fill="#e9c19d" />
        <path d="M33 52 C33 37 45 28 60 28 C75 28 87 37 87 52 C87 63 83 72 75 79 C70 83 65 86 60 88 C55 86 50 83 45 79 C37 72 33 63 33 52 Z" fill="#f2cfae" />
        {/* hair, front: wavy curtain bangs parted near the middle, with curls at the temples */}
        <path
          d="M57 12 C63 8 73 9 79 14 C88 17 94 27 93 37 C94 41 94 44 93 47 C94 55 92 61 89 66 C88 60 87 56 84 53 C83 57 81 60 78 61 C80 55 77 48 73 44 C74 48 73 51 70 53 C68 45 64 38 58 33 C55 39 51 45 47 52 C45 49 45 46 46 43 C42 47 40 52 41 58 C38 57 36 55 35 52 C34 57 33 61 31 65 C27 59 26 53 27 47 C24 37 29 26 37 20 C42 14 50 11 57 12 Z"
          fill="#2a1f1b"
        />
        {/* ears tucked over the side curls, with a small gold stud */}
        <ellipse cx="32.5" cy="59" rx="3" ry="4.2" fill="#ebc29e" />
        <ellipse cx="87.5" cy="59" rx="3" ry="4.2" fill="#ebc29e" />
        <circle cx="32.2" cy="62.6" r="1.2" fill="#d4a868" />
        <circle cx="87.8" cy="62.6" r="1.2" fill="#d4a868" />

        {/* soft waves of light in the hair */}
        <path d="M40 27 C45 21 52 18 58 18" stroke="#6b5246" strokeWidth="2" strokeLinecap="round" fill="none" />
        <path d="M66 18 C73 19 80 23 85 30" stroke="#6b5246" strokeWidth="1.6" strokeLinecap="round" fill="none" />
        <path d="M58 33 C62 30 66 31 69 35" stroke="#4a3830" strokeWidth="1.2" strokeLinecap="round" fill="none" />
        <path d="M84 36 C87 40 88 44 87 49" stroke="#4a3830" strokeWidth="1.2" strokeLinecap="round" fill="none" />
        <path d="M35 37 C33 41 32 45 33 49" stroke="#4a3830" strokeWidth="1.2" strokeLinecap="round" fill="none" />

        {/* eyes: bright, slightly almond, with a lash line and sparkles; they blink */}
        <g className={anim('mini-step-blink')} style={{ transformOrigin: '60px 61px' }}>
          <ellipse cx="49" cy="61" rx="4.3" ry="5" fill="#231d1a" />
          <ellipse cx="71" cy="61" rx="4.3" ry="5" fill="#231d1a" />
          <ellipse cx="49" cy="62.5" rx="2.6" ry="2.8" fill="#4a3428" />
          <ellipse cx="71" cy="62.5" rx="2.6" ry="2.8" fill="#4a3428" />
          <circle cx="50.6" cy="59" r="1.6" fill="#fff" />
          <circle cx="72.6" cy="59" r="1.6" fill="#fff" />
          <circle cx="47.7" cy="63.6" r="0.75" fill="#fff" opacity="0.85" />
          <circle cx="69.7" cy="63.6" r="0.75" fill="#fff" opacity="0.85" />
          <path d="M43.8 58.6 C46 55.6 51.5 55.4 54.4 58.2" stroke="#1a1412" strokeWidth="1.5" strokeLinecap="round" fill="none" />
          <path d="M65.6 58.2 C68.5 55.4 74 55.6 76.2 58.6" stroke="#1a1412" strokeWidth="1.5" strokeLinecap="round" fill="none" />
        </g>
        {/* straight, defined brows peeking under the bangs */}
        <path d="M44 52.5 C46.5 51.5 50 51.3 53 52" stroke="#2a1f1b" strokeWidth="1.7" strokeLinecap="round" fill="none" />
        <path d="M67 52 C70 51.3 73.5 51.5 76 52.5" stroke="#2a1f1b" strokeWidth="1.7" strokeLinecap="round" fill="none" />
        {/* a hint of a nose, blush and a small smile */}
        <path d="M60.5 66 C60.8 67.4 60.4 68.4 59.4 68.6" stroke="#d9a383" strokeWidth="1" strokeLinecap="round" fill="none" />
        <ellipse cx="42.5" cy="68.5" rx="4" ry="2.2" fill="#f29c94" opacity="0.5" />
        <ellipse cx="77.5" cy="68.5" rx="4" ry="2.2" fill="#f29c94" opacity="0.5" />
        <path d="M56 73 C58.3 75.2 61.7 75.2 64 73" stroke="#8a4a3c" strokeWidth="1.5" strokeLinecap="round" fill="none" />
      </g>
    </svg>
  )
}
