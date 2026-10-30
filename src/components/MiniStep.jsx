// "Mini Step": a K-pop style chibi (SD) version of Step for the site assistant: short wavy hair, V-line jaw,
// dressed like a fashion model in an open white blazer and sky-blue shirt.
// He dances like a K-pop idol, throws in a somersault every few seconds, and blinks (see the mini-step keyframes in index.css); `still` turns the motion off.
// With `crew`, two backup dancers in matching black-and-gold stage outfits dance behind him, Mini Step at centre.

// hair colours and outfit for each member
const looks = {
  step: { hair: '#2a1f1b', rim: '#7a6052', shine: '#6b5246', wave: '#4a3830', brow: '#2a1f1b', outfit: 'blazer' },
  pink: { hair: '#f0a6c2', rim: '#ffd3e3', shine: '#ffd9e7', wave: '#d888a7', brow: '#6a4a4a', outfit: 'stage' },
  silver: { hair: '#c5d0dd', rim: '#eef3f8', shine: '#f6f9fc', wave: '#a3b1c3', brow: '#5a5560', outfit: 'stage' },
}

// the lead's white blazer, and the backup dancers' black stage jackets with gold piping
const outfits = {
  blazer: {
    fill: '#fbf8f2', line: '#cfc6b8', shade: '#e4dccf', shirt: '#8fcdee', shirtLine: '#6fb4d8', lapel: '#f1ece3',
    pants: '#fbf8f2', pantsLine: '#cfc6b8', crease: '#e2dbcf', shoes: '#5a3b28', button: '#c9b48a', chain: '#d4a868',
  },
  stage: {
    fill: '#24222c', line: '#d4a868', shade: '#1a1820', shirt: '#f4f1ea', shirtLine: '#d9d3c8', lapel: '#2f2c38',
    pants: '#24222c', pantsLine: '#3a3744', crease: '#d4a868', shoes: '#f4f1ea', button: '#d4a868', chain: '#c5d0dd',
  },
}

// `flipDelay` staggers the somersault, so in a group the members flip one after another;
// `mirrored` reverses the spin for a mirrored dancer, so everyone spins left to right
function Dancer({ look, anim, flipDelay = 0, mirrored = false }) {
  const h = looks[look]
  const o = outfits[h.outfit]
  return (
    <g className={anim('mini-step-flip')} style={{ transformOrigin: '60px 80px', animationDelay: `${flipDelay}s`, '--spin': mirrored ? -1 : 1 }}>
      <g className={anim('mini-step-dance')} style={{ transformOrigin: '60px 131px' }}>
        <g className={anim('mini-step-head')} style={{ transformOrigin: '60px 86px' }}>
          {/* hair, back: short, fluffy and wavy, flicking out at the ends */}
          <path d="M28 50 C27 30 42 15 60 15 C78 15 93 28 92 50 C93 59 93 66 91 71 C93 72 95.5 71 97 68.5 C96.8 73.5 93 77 88 76 L32 76 C27 77 23.2 73.5 23 68.5 C24.5 71 27 72 29 71 C27 66 27 59 28 50 Z" fill={h.hair} />
        </g>

        {/* legs: slim trousers with a crease (a gold side stripe on stage), and shoes; each steps in turn */}
        <g className={anim('mini-step-leg-l')}>
          <path d="M49.5 109 H58.6 L58 129 H50.4 Z" fill={o.pants} stroke={o.pantsLine} strokeWidth="0.8" strokeLinejoin="round" />
          <path d="M54.2 118 V128" stroke={o.crease} strokeWidth="0.6" />
          <path d="M48.5 131.5 C48.5 129 51 128.4 54.2 128.6 C57 128.8 58.6 129.6 58.6 131.5 Z" fill={o.shoes} />
        </g>
        <g className={anim('mini-step-leg-r')}>
          <path d="M61.4 109 H70.5 L69.6 129 H62 Z" fill={o.pants} stroke={o.pantsLine} strokeWidth="0.8" strokeLinejoin="round" />
          <path d="M65.8 118 V128" stroke={o.crease} strokeWidth="0.6" />
          <path d="M61.4 131.5 C61.4 129.6 63 128.8 65.8 128.6 C69 128.4 71.5 129 71.5 131.5 Z" fill={o.shoes} />
        </g>

        {/* body: a tailored, cutaway jacket worn open over a shirt, collar open, with a thin chain */}
        <path d="M43.5 92 C43.5 86.5 51 84 60 84 C69 84 76.5 86.5 76.5 92 C77 97 76 101.5 74.6 105 C76 108.5 77 111.5 76.6 114 L63.6 115.5 L60 111.5 L56.4 115.5 L43.4 114 C43 111.5 44 108.5 45.4 105 C44 101.5 43 97 43.5 92 Z" fill={o.fill} stroke={o.line} strokeWidth="0.8" strokeLinejoin="round" />
        {/* tailoring: a little shadow where the waist is nipped in */}
        <path d="M46.5 99 C47.5 102 47.2 104 46.4 106 M73.5 99 C72.5 102 72.8 104 73.6 106" stroke={o.shade} strokeWidth="1.2" strokeLinecap="round" fill="none" />
        <path d="M55.5 85 H64.5 L63.6 112 L60 111.5 L56.4 112 Z" fill={o.shirt} />
        <path d="M57.4 85 L60 89.5 L62.6 85 Z" fill="#f2cfae" />
        <path d="M56.6 86 C58 89.6 62 89.6 63.4 86" stroke={o.chain} strokeWidth="0.7" fill="none" />
        <path d="M55.5 85 L57.6 90.5 L60 87.5 M64.5 85 L62.4 90.5 L60 87.5" stroke={o.shirtLine} strokeWidth="0.7" strokeLinejoin="round" fill="none" />
        {/* long notch lapels down to the waist, and the open front edges */}
        <path d="M55.5 85 L50.8 89.2 L53 91 L51.8 93.6 L56.4 107 Z M64.5 85 L69.2 89.2 L67 91 L68.2 93.6 L63.6 107 Z" fill={o.lapel} stroke={o.line} strokeWidth="0.7" strokeLinejoin="round" />
        <path d="M56.4 107 L56.4 115.5 M63.6 107 L63.6 115.5" stroke={o.line} strokeWidth="0.7" />
        <circle cx="57.6" cy="108.5" r="0.9" fill={o.button} />
        {h.outfit === 'blazer' ? (
          <>
            {/* a sky-blue pocket square */}
            <path d="M66.5 99 H72" stroke={o.line} strokeWidth="0.7" />
            <path d="M67.2 99 L68.6 96.2 L69.6 97.8 L70.8 96 L71.4 99 Z" fill="#8fcdee" />
          </>
        ) : (
          /* gold epaulettes on the stage jacket */
          <path d="M44.4 88.6 L50 86.2 L50.6 88.4 L45.2 90.8 Z M75.6 88.6 L70 86.2 L69.4 88.4 L74.8 90.8 Z" fill="#d4a868" />
        )}

        {/* left arm: hand on the hip, swinging out on the second half of each move */}
        <g className={anim('mini-step-arm-l')} style={{ transformOrigin: '45px 90.5px' }}>
          <path d="M45 90.5 C39.5 95 38.5 101 44.5 106" stroke={o.line} strokeWidth="7.6" strokeLinecap="round" fill="none" />
          <path d="M45 90.5 C39.5 95 38.5 101 44.5 106" stroke={o.fill} strokeWidth="6" strokeLinecap="round" fill="none" />
          <circle cx="45.5" cy="106.5" r="3.1" fill="#f2cfae" />
        </g>

        {/* right arm up, finger pointing to the sky; it pumps to the beat */}
        <g className={anim('mini-step-arm-r')} style={{ transformOrigin: '75px 90.5px' }}>
          <path d="M75 91 C81 89.5 86 86 88.6 81" stroke={o.line} strokeWidth="7.6" strokeLinecap="round" fill="none" />
          <path d="M75 91 C81 89.5 86 86 88.6 81" stroke={o.fill} strokeWidth="6" strokeLinecap="round" fill="none" />
          <circle cx="89.4" cy="79" r="3.3" fill="#f2cfae" />
          <path d="M90.6 76.6 L92.4 72.6" stroke="#f2cfae" strokeWidth="2" strokeLinecap="round" />
        </g>

        <g className={anim('mini-step-head')} style={{ transformOrigin: '60px 86px' }}>
          {/* neck, then the head: a soft V-line jaw with a sharper chin */}
          <rect x="55" y="78" width="10" height="9" rx="3" fill="#e9c19d" />
          <path d="M33 52 C33 37 45 28 60 28 C75 28 87 37 87 52 C87 63 83 72 75 79 C70 83 65 86 60 88 C55 86 50 83 45 79 C37 72 33 63 33 52 Z" fill="#f2cfae" />
          {/* hair, front: wavy curtain bangs parted near the middle, with curls at the temples */}
          <path
            d="M57 12 C63 8 73 9 79 14 C88 17 94 27 93 37 C94 41 94 44 93 47 C94 57 93.5 63 91 69 C88.5 63 87 57 84 53 C83 57 81 60 78 61 C80 55 77 48 73 44 C74 48 73 51 70 53 C68 45 64 38 58 33 C55 39 51 45 47 52 C45 49 45 46 46 43 C42 47 40 52 41 58 C38 57 36 55 35 52 C34 59 32.5 64 29 69 C26.5 62 26 54 27 47 C24 37 29 26 37 20 C42 14 50 11 57 12 Z"
            fill={h.hair}
          />
          {/* ears tucked over the side curls, with a small gold stud */}
          <ellipse cx="32.5" cy="59" rx="3" ry="4.2" fill="#ebc29e" />
          <ellipse cx="87.5" cy="59" rx="3" ry="4.2" fill="#ebc29e" />
          <circle cx="32.2" cy="62.6" r="1.2" fill="#d4a868" />
          <circle cx="87.8" cy="62.6" r="1.2" fill="#d4a868" />

          {/* a faint rim of light along the hair's outline, so it lifts off the backdrop */}
          <path d="M27 47 C24 37 29 26 37 20 C42 14 50 11 57 12 C63 8 73 9 79 14 C88 17 94 27 93 37" stroke={h.rim} strokeWidth="1" strokeLinecap="round" fill="none" opacity="0.8" />
          {/* soft waves of light in the hair */}
          <path d="M40 27 C45 21 52 18 58 18" stroke={h.shine} strokeWidth="2" strokeLinecap="round" fill="none" />
          <path d="M66 18 C73 19 80 23 85 30" stroke={h.shine} strokeWidth="1.6" strokeLinecap="round" fill="none" />
          <path d="M58 33 C62 30 66 31 69 35" stroke={h.wave} strokeWidth="1.2" strokeLinecap="round" fill="none" />
          <path d="M84 36 C87 40 88 44 87 49" stroke={h.wave} strokeWidth="1.2" strokeLinecap="round" fill="none" />
          <path d="M35 37 C33 41 32 45 33 49" stroke={h.wave} strokeWidth="1.2" strokeLinecap="round" fill="none" />

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
          <path d="M44 52.5 C46.5 51.5 50 51.3 53 52" stroke={h.brow} strokeWidth="1.7" strokeLinecap="round" fill="none" />
          <path d="M67 52 C70 51.3 73.5 51.5 76 52.5" stroke={h.brow} strokeWidth="1.7" strokeLinecap="round" fill="none" />
          {/* a hint of a nose and blush */}
          <path d="M60.5 66 C60.8 67.4 60.4 68.4 59.4 68.6" stroke="#d9a383" strokeWidth="1" strokeLinecap="round" fill="none" />
          <ellipse cx="42.5" cy="68" rx="4.3" ry="2.4" fill="#f29c94" opacity="0.5" />
          <ellipse cx="77.5" cy="68" rx="4.3" ry="2.4" fill="#f29c94" opacity="0.5" />
          {/* a big open smile */}
          <path d="M53.5 71.5 C55.5 78.5 64.5 78.5 66.5 71.5 C62.5 72.6 57.5 72.6 53.5 71.5 Z" fill="#7a3329" stroke="#7a3329" strokeWidth="0.8" strokeLinejoin="round" />
          <path d="M55 72.1 C58.3 72.9 61.7 72.9 65 72.1 L64.5 73.6 C61.5 74.3 58.5 74.3 55.5 73.6 Z" fill="#fff" />
          <path d="M57.2 76.4 C59 75.2 61 75.2 62.8 76.4 C61 77.3 59 77.3 57.2 76.4 Z" fill="#e0776b" />
        </g>
      </g>
    </g>
  )
}

export default function MiniStep({ className = '', still = false, crew = false }) {
  const anim = (name) => (still ? undefined : name)
  if (!crew)
    return (
      <svg viewBox="0 4 120 130" className={className} overflow="visible" aria-hidden="true">
        <Dancer look="step" anim={anim} />
      </svg>
    )
  // the backup dancers stand a step back (smaller and a little higher), the one on the left mirrored so the
  // group's moves are symmetrical; each sits in its own nested svg so its animations keep their own coordinates
  // (overflow visible, so a somersault isn't clipped); they flip in order: pink, Mini Step, then silver
  return (
    <svg viewBox="-46 0 212 136" className={className} overflow="visible" aria-hidden="true">
      <svg x="-44" y="8" width="96" height="104" viewBox="0 4 120 130" overflow="visible">
        <g transform="translate(120 0) scale(-1 1)">
          <Dancer look="pink" anim={anim} mirrored />
        </g>
      </svg>
      <svg x="68" y="8" width="96" height="104" viewBox="0 4 120 130" overflow="visible">
        <Dancer look="silver" anim={anim} flipDelay={0.5} />
      </svg>
      <svg x="0" y="4" width="120" height="130" viewBox="0 4 120 130" overflow="visible">
        <Dancer look="step" anim={anim} flipDelay={0.25} />
      </svg>
    </svg>
  )
}
