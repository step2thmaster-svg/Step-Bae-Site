// "Mini Step": a K-pop style chibi (SD) version of Step for the site assistant: short wavy hair, V-line jaw,
// a small body in a white suit and sky-blue shirt, holding a big paint brush.
// It gently bobs, blinks and waves (see the mini-step keyframes in index.css); `still` turns the motion off.
export default function MiniStep({ className = '', still = false }) {
  const anim = (name) => (still ? undefined : name)
  return (
    <svg viewBox="0 4 120 120" className={className} aria-hidden="true">
      <g className={anim('mini-step-bob')}>
        {/* hair, back: short, fluffy and wavy, flicking out at the ends */}
        <path d="M28 50 C27 30 42 15 60 15 C78 15 93 28 92 50 C93 59 93 66 91 71 C93 72 95.5 71 97 68.5 C96.8 73.5 93 77 88 76 L32 76 C27 77 23.2 73.5 23 68.5 C24.5 71 27 72 29 71 C27 66 27 59 28 50 Z" fill="#2a1f1b" />

        {/* legs: white trousers and dark shoes */}
        <rect x="49" y="110" width="8.5" height="9" rx="2" fill="#fbf8f2" stroke="#cfc6b8" strokeWidth="0.8" />
        <rect x="62.5" y="110" width="8.5" height="9" rx="2" fill="#fbf8f2" stroke="#cfc6b8" strokeWidth="0.8" />
        <ellipse cx="53" cy="120" rx="5" ry="2.4" fill="#2a1f1b" />
        <ellipse cx="67" cy="120" rx="5" ry="2.4" fill="#2a1f1b" />

        {/* body: small and chibi, a white suit over a sky-blue shirt */}
        <path d="M44 93 C44 87 51 84 60 84 C69 84 76 87 76 93 L77.5 111 C77.5 114 75.5 115 72.5 115 L47.5 115 C44.5 115 42.5 114 42.5 111 Z" fill="#fbf8f2" stroke="#cfc6b8" strokeWidth="0.8" />
        <path d="M55 85 L60 96 L65 85 Z" fill="#8fcdee" />
        {/* lapels */}
        <path d="M54.5 85 L60 96 L56.5 92 L52 88.5 Z M65.5 85 L60 96 L63.5 92 L68 88.5 Z" fill="#f1ece3" stroke="#cfc6b8" strokeWidth="0.7" strokeLinejoin="round" />
        <circle cx="60" cy="102" r="1.1" fill="#c9b48a" />
        <circle cx="60" cy="107.5" r="1.1" fill="#c9b48a" />

        {/* left arm resting */}
        <path d="M45 91 C41 95 40 100 41.5 104" stroke="#cfc6b8" strokeWidth="7.6" strokeLinecap="round" fill="none" />
        <path d="M45 91 C41 95 40 100 41.5 104" stroke="#fbf8f2" strokeWidth="6" strokeLinecap="round" fill="none" />
        <circle cx="41.8" cy="105" r="3.4" fill="#f2cfae" />

        {/* right arm raised, holding a big ceramist's paint brush; it waves */}
        <g className={anim('mini-step-wave')} style={{ transformOrigin: '75px 90px' }}>
          <path d="M75 91 C80 89 83 85 84.5 80" stroke="#cfc6b8" strokeWidth="7.6" strokeLinecap="round" fill="none" />
          <path d="M75 91 C80 89 83 85 84.5 80" stroke="#fbf8f2" strokeWidth="6" strokeLinecap="round" fill="none" />
          <g transform="rotate(22 85 78)">
            {/* handle, ferrule, then bristles with a dab of porcelain on the tip */}
            <rect x="82.4" y="58" width="5.2" height="44" rx="2.6" fill="#a46c43" />
            <rect x="82.4" y="93" width="5.2" height="9" rx="2.6" fill="#6e4429" />
            <rect x="81.6" y="47" width="6.8" height="12" rx="1.4" fill="#d4a868" />
            <path d="M82.2 50 H87.8 M82.2 55 H87.8" stroke="#b98a4c" strokeWidth="0.8" />
            <path d="M81.8 47.5 C79.6 39 81.8 30 85 22 C88.2 30 90.4 39 88.2 47.5 Z" fill="#3a2a22" />
            <path d="M83.4 30 C84 26.5 84.5 24 85 22 C85.5 24 86 26.5 86.6 30 C85.6 31.2 84.4 31.2 83.4 30 Z" fill="#f7f2ea" />
            <path d="M83.2 44 C82.8 38 83.6 33 84.4 29" stroke="#5a463c" strokeWidth="0.8" strokeLinecap="round" fill="none" />
          </g>
          <circle cx="85" cy="78" r="3.6" fill="#f2cfae" />
        </g>

        {/* neck, then the head: a soft V-line jaw with a sharper chin */}
        <rect x="55" y="78" width="10" height="9" rx="3" fill="#e9c19d" />
        <path d="M33 52 C33 37 45 28 60 28 C75 28 87 37 87 52 C87 63 83 72 75 79 C70 83 65 86 60 88 C55 86 50 83 45 79 C37 72 33 63 33 52 Z" fill="#f2cfae" />
        {/* hair, front: wavy curtain bangs parted near the middle, with curls at the temples */}
        <path
          d="M57 12 C63 8 73 9 79 14 C88 17 94 27 93 37 C94 41 94 44 93 47 C94 57 93.5 63 91 69 C88.5 63 87 57 84 53 C83 57 81 60 78 61 C80 55 77 48 73 44 C74 48 73 51 70 53 C68 45 64 38 58 33 C55 39 51 45 47 52 C45 49 45 46 46 43 C42 47 40 52 41 58 C38 57 36 55 35 52 C34 59 32.5 64 29 69 C26.5 62 26 54 27 47 C24 37 29 26 37 20 C42 14 50 11 57 12 Z"
          fill="#2a1f1b"
        />
        {/* ears tucked over the side curls, with a small gold stud */}
        <ellipse cx="32.5" cy="59" rx="3" ry="4.2" fill="#ebc29e" />
        <ellipse cx="87.5" cy="59" rx="3" ry="4.2" fill="#ebc29e" />
        <circle cx="32.2" cy="62.6" r="1.2" fill="#d4a868" />
        <circle cx="87.8" cy="62.6" r="1.2" fill="#d4a868" />

        {/* a faint rim of light along the hair's outline, so it lifts off the backdrop */}
        <path d="M27 47 C24 37 29 26 37 20 C42 14 50 11 57 12 C63 8 73 9 79 14 C88 17 94 27 93 37" stroke="#7a6052" strokeWidth="1" strokeLinecap="round" fill="none" opacity="0.8" />
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
        {/* a hint of a nose and blush */}
        <path d="M60.5 66 C60.8 67.4 60.4 68.4 59.4 68.6" stroke="#d9a383" strokeWidth="1" strokeLinecap="round" fill="none" />
        <ellipse cx="42.5" cy="68" rx="4.3" ry="2.4" fill="#f29c94" opacity="0.5" />
        <ellipse cx="77.5" cy="68" rx="4.3" ry="2.4" fill="#f29c94" opacity="0.5" />
        {/* a big open smile */}
        <path d="M53.5 71.5 C55.5 78.5 64.5 78.5 66.5 71.5 C62.5 72.6 57.5 72.6 53.5 71.5 Z" fill="#7a3329" stroke="#7a3329" strokeWidth="0.8" strokeLinejoin="round" />
        <path d="M55 72.1 C58.3 72.9 61.7 72.9 65 72.1 L64.5 73.6 C61.5 74.3 58.5 74.3 55.5 73.6 Z" fill="#fff" />
        <path d="M57.2 76.4 C59 75.2 61 75.2 62.8 76.4 C61 77.3 59 77.3 57.2 76.4 Z" fill="#e0776b" />
      </g>
    </svg>
  )
}
