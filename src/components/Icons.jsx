const base = {
  fill: 'none',
  stroke: 'currentColor',
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
}

export const ArrowRight = ({ className = 'h-3.5 w-3.5' }) => (
  <svg viewBox="0 0 24 24" className={className} {...base} strokeWidth="2">
    <path d="M4 12h15M13 6l6 6-6 6" />
  </svg>
)

export const Palette = ({ className }) => (
  <svg viewBox="0 0 48 48" className={className} {...base} strokeWidth="1.6">
    <path d="M24 5C13 5 5 13 5 23s8 19 18 19c3 0 4-2 4-4 0-1.2-.6-2-1.2-2.8-.6-.8-1-1.6-1-2.6 0-2.2 1.8-3.6 4-3.6h4.4C38.5 29 43 24.6 43 19 43 11 34.5 5 24 5Z" />
    <circle cx="14" cy="22" r="3" />
    <circle cx="19" cy="13" r="3" />
    <circle cx="29" cy="12" r="3" />
    <circle cx="16" cy="32" r="3" />
    <path d="m46 4-14 15M30 21l-2 4 4-2" />
  </svg>
)

// graduation cap
export const Education = ({ className }) => (
  <svg viewBox="0 0 48 48" className={className} {...base} strokeWidth="1.6">
    <path d="M24 9 45 18 24 27 3 18z" />
    <path d="M12 22v9c0 3 5.5 6 12 6s12-3 12-6v-9" />
    <path d="M45 18v10M43 32l2-4 2 4z" />
  </svg>
)

// speaker at a lectern with a globe on its front, sound waves either side
export const Speaker = ({ className }) => (
  <svg viewBox="0 0 48 48" className={className} {...base} strokeWidth="1.6">
    <circle cx="24" cy="9" r="4.5" />
    <path d="M14.5 23c.5-5 4.5-8 9.5-8s9 3 9.5 8" />
    <path d="M33 5.5c1.6 1.8 1.6 5.2 0 7M36.5 3c3 3.2 3 8.8 0 12M15 5.5c-1.6 1.8-1.6 5.2 0 7M11.5 3c-3 3.2-3 8.8 0 12" />
    <path d="M9 23h30l-2 4H11z" />
    <path d="M13 27l2 16h18l2-16M11 44h26" />
    <circle cx="24" cy="35" r="5.5" />
    <path d="M24 29.5c-2.2 1.6-2.2 9.4 0 11M24 29.5c2.2 1.6 2.2 9.4 0 11M18.5 35h11" />
  </svg>
)

// two people in conversation
export const Consulting = ({ className }) => (
  <svg viewBox="0 0 48 48" className={className} {...base} strokeWidth="1.6">
    <circle cx="13" cy="24" r="4.5" />
    <circle cx="35" cy="24" r="4.5" />
    <path d="M4 41c0-6 4-9.5 9-9.5s9 3.5 9 9.5M26 41c0-6 4-9.5 9-9.5s9 3.5 9 9.5" />
    <path d="M18 5h12a3 3 0 0 1 3 3v5a3 3 0 0 1-3 3h-4l-2 3-2-3h-4a3 3 0 0 1-3-3V8a3 3 0 0 1 3-3Z" />
    <path d="M21 10.5h6" />
  </svg>
)

export const Phone = ({ className }) => (
  <svg viewBox="0 0 24 24" className={className} fill="currentColor">
    <path d="M6.6 10.8a15.2 15.2 0 0 0 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1A17 17 0 0 1 3 4c0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.3 0 .7-.2 1z" />
  </svg>
)

export const Mail = ({ className }) => (
  <svg viewBox="0 0 24 24" className={className} {...base} strokeWidth="1.6">
    <rect x="2.5" y="5" width="19" height="14" rx="1" />
    <path d="m3 6 9 7 9-7M3 18l7-6M21 18l-7-6" />
  </svg>
)

export const MapPin = ({ className }) => (
  <svg viewBox="0 0 24 24" className={className} fill="currentColor">
    <path d="M12 2a7 7 0 0 0-7 7c0 5.2 7 13 7 13s7-7.8 7-13a7 7 0 0 0-7-7Zm0 9.5A2.5 2.5 0 1 1 12 6.5a2.5 2.5 0 0 1 0 5Z" />
  </svg>
)

export const Instagram = ({ className }) => (
  <svg viewBox="0 0 24 24" className={className} {...base} strokeWidth="1.8">
    <rect x="3" y="3" width="18" height="18" rx="5" />
    <circle cx="12" cy="12" r="4" />
    <circle cx="17.3" cy="6.7" r="0.6" fill="currentColor" />
  </svg>
)

export const Threads = ({ className }) => (
  <svg viewBox="0 0 24 24" className={className} {...base} strokeWidth="1.8">
    <circle cx="12" cy="12" r="9" />
    <path d="M8.5 9.5c1-1 2.1-1.5 3.4-1.5 2.6 0 4.1 1.6 4.1 4.2v2.1c0 2.2-1.7 3.7-3.9 3.7-2.3 0-4-1.5-4-3.5 0-2.1 1.9-3.5 4.4-3.5h3.2" />
  </svg>
)

export const Facebook = ({ className }) => (
  <svg viewBox="0 0 24 24" className={className} fill="currentColor">
    <path d="M13.4 21v-7.6H16l.4-3h-3V8.5c0-.9.2-1.5 1.5-1.5h1.6V4.3c-.3 0-1.2-.1-2.3-.1-2.3 0-3.8 1.4-3.8 4v2.2H8v3h2.4V21h3Z" />
  </svg>
)

export const TikTok = ({ className }) => (
  <svg viewBox="0 0 24 24" className={className} fill="currentColor">
    <path d="M14.8 4c.2 1.4 1.1 2.8 2.6 3.6.9.5 1.8.7 2.6.7v3.1a8.2 8.2 0 0 1-3.8-1V15a5.3 5.3 0 1 1-5.3-5.3h.3v3.1H11a2.2 2.2 0 1 0 2.2 2.2V4h1.6Z" />
  </svg>
)

export const YouTube = ({ className }) => (
  <svg viewBox="0 0 24 24" className={className} fill="currentColor">
    <path d="M21.6 8.3a2.8 2.8 0 0 0-2-2c-1.7-.5-7.6-.5-7.6-.5s-5.9 0-7.6.5a2.8 2.8 0 0 0-2 2A30 30 0 0 0 2 12a30 30 0 0 0 .4 3.7 2.8 2.8 0 0 0 2 2c1.7.5 7.6.5 7.6.5s5.9 0 7.6-.5a2.8 2.8 0 0 0 2-2A30.1 30.1 0 0 0 22 12a30.1 30.1 0 0 0-.4-3.7ZM10.2 15.2V8.8l5.6 3.2-5.6 3.2Z" />
  </svg>
)
