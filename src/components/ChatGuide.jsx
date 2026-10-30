import { useEffect, useRef, useState } from 'react'
import { ArrowRight } from './Icons.jsx'
import MiniStep from './MiniStep.jsx'
import { portals } from './PortalGuide.jsx'
import { EMAIL } from './sendForm.js'

// A guided site assistant: a scripted conversation (no AI, no server) that helps visitors find their way
// and walks dentists through sending a case. Each step says something and offers choices; a choice either
// goes to another step (`next`) or opens a page (`href`). Typed questions are matched to a step by keywords.

const caseChecklist = [
  'Both full arches and a bite scan, even for a single crown',
  'Clear margins on every prep',
  'Tooth numbers, restoration type and material (or ask us to recommend one)',
  'Shade map with stump shade, plus a photo with shade tabs in frame',
  'The date you need the case back',
]

// one step per scanner portal, built from the same steps the Dentist Partnership page shows
const portalSteps = Object.fromEntries(
  portals.map((p) => [
    `portal-${p.name}`,
    {
      say: [`Here’s how to connect STEPBAE in ${p.where}:`],
      list: p.steps,
      options: [
        { label: 'Done, what’s next?', next: 'after-connect' },
        { label: 'See all portal steps', href: '/partnership.html#portals' },
        { label: 'A different scanner', next: 'scanner' },
      ],
    },
  ]),
)

const steps = {
  start: {
    say: ['Hi, welcome to STEPBAE! I can help you find your way around or walk you through sending us a case.', 'What brings you here today?'],
    options: [
      { label: 'I’m a dentist: send a case', next: 'case-start' },
      { label: 'I’m a dentist: other questions', next: 'dentist' },
      { label: 'I’m a patient', next: 'patient' },
      { label: 'Consulting & courses', next: 'consulting' },
      { label: 'Read our insights', next: 'insights' },
      { label: 'Just looking around', next: 'browse' },
    ],
  },

  'case-start': {
    say: ['Wonderful, we’d love to work with you. Have you sent a case to STEPBAE before?'],
    options: [
      { label: 'This is my first case', next: 'case-new' },
      { label: 'Yes, I’ve sent cases before', next: 'case-returning' },
    ],
  },
  'case-new': {
    say: ['Welcome! How will you be sending the case?'],
    options: [
      { label: 'Digital scan', next: 'scanner' },
      { label: 'Physical impression or models', next: 'case-physical' },
    ],
  },
  scanner: {
    say: ['Which scanner do you use? I’ll show you how to connect us in its portal. It only takes a few minutes, and you only do it once.'],
    options: [
      ...portals.map((p) => ({ label: p.name, next: `portal-${p.name}` })),
      { label: 'Another scanner', next: 'scanner-other' },
    ],
  },
  ...portalSteps,
  'scanner-other': {
    say: [
      'No problem. Most scanners can export STL or PLY files.',
      `You can email the files to ${EMAIL}, or fill out the partnership form and we’ll help you set up the best way to send cases.`,
    ],
    options: [
      { label: 'Fill out the partnership form', href: '/partnership.html#partner-form' },
      { label: 'What should I include?', next: 'checklist' },
    ],
  },
  'after-connect': {
    say: [
      'Next, please fill out the short partnership form: your practice details and your portal account. That way we can find and accept your connection right away.',
    ],
    options: [
      { label: 'Go to the partnership form', href: '/partnership.html#partner-form' },
      { label: 'What should I include with a case?', next: 'checklist' },
    ],
  },
  'case-physical': {
    say: [
      'Of course. Please fill out the partnership form and mention that you’ll send physical impressions or models. We’ll reply with shipping details and our Rx form.',
    ],
    options: [
      { label: 'Go to the partnership form', href: '/partnership.html#partner-form' },
      { label: 'What should I include?', next: 'checklist' },
    ],
  },
  'case-returning': {
    say: ['Welcome back! Just choose STEPBAE as the lab in your portal’s order form. A quick checklist so the case comes out right the first time:'],
    list: caseChecklist,
    options: [
      { label: 'Read the full guide', href: '/article.html?p=how-to-submit-a-digital-case' },
      { label: 'Discuss a case with Step first', href: '/partnership.html#partner-form' },
      { label: 'Something else', next: 'start' },
    ],
  },
  checklist: {
    say: ['Here’s what helps us get a case right the first time:'],
    list: caseChecklist,
    options: [
      { label: 'Read the full guide', href: '/article.html?p=how-to-submit-a-digital-case' },
      { label: 'Go to the partnership form', href: '/partnership.html#partner-form' },
      { label: 'Start over', next: 'start' },
    ],
  },

  consulting: {
    say: [
      'Step works with practices and labs on digital workflow, esthetic and implant case planning, and hands-on training for your team, and lectures for study clubs and corporate events.',
      'What would you like to do?',
    ],
    options: [
      { label: 'See consulting services', href: '/consultation.html#services' },
      { label: 'Upcoming courses & events', href: '/consultation.html#events' },
      { label: 'Book a consultation', href: '/consultation.html#inquiry' },
    ],
  },
  insights: {
    say: [
      'Our Insights page has articles from the bench, color coded so you can spot yours: gold for dentists, teal for patients.',
      'Who are you reading for?',
    ],
    options: [
      { label: 'Articles for dentists', next: 'insights-dentists' },
      { label: 'Articles for patients', next: 'insights-patients' },
      { label: 'See all articles', href: '/insights.html#latest' },
    ],
  },
  'insights-dentists': {
    say: ['Here are a few good places to start:'],
    options: [
      { label: 'How to submit a digital case', href: '/article.html?p=how-to-submit-a-digital-case' },
      { label: 'Zirconia vs. layered zirconia crowns', href: '/article.html?p=zirconia-vs-layered-ceramic' },
      { label: 'All articles', href: '/insights.html#latest' },
    ],
  },
  'insights-patients': {
    say: ['Here are a few good places to start:'],
    options: [
      { label: 'Crown or veneer?', href: '/article.html?p=crown-vs-veneer' },
      { label: 'Veneers vs. braces or aligners', href: '/article.html?p=veneers-vs-braces-or-clear-aligners' },
      { label: 'All articles', href: '/insights.html#latest' },
    ],
  },
  dentist: {
    say: ['Happy to help. What would you like to know about?'],
    options: [
      { label: 'Send a case', next: 'case-start' },
      { label: 'See Step’s work', href: '/craftsmanship.html' },
      { label: 'Consulting & courses', next: 'consulting' },
      { label: 'Articles for dentists', next: 'insights-dentists' },
    ],
  },
  patient: {
    say: [
      'Welcome! STEPBAE makes crowns, veneers and implant teeth for dentists, so we work with you through your dentist.',
      'If you’d like Step to make your restoration, just ask your dentist to send your case to STEPBAE. You can also read our articles for patients or ask us a question.',
    ],
    options: [
      { label: 'Articles for patients', next: 'insights-patients' },
      { label: 'See Step’s work', href: '/craftsmanship.html' },
      { label: 'Ask a question', href: '/consultation.html#inquiry' },
    ],
  },
  browse: {
    say: ['Enjoy your visit! Here’s where you can go:'],
    options: [
      { label: 'Craftsmanship gallery', href: '/craftsmanship.html' },
      { label: 'About Step', href: '/about.html' },
      { label: 'Consulting & courses', href: '/consultation.html' },
      { label: 'Insights articles', href: '/insights.html' },
      { label: 'Send a case', next: 'case-start' },
    ],
  },
  contact: {
    say: [`You can reach us at ${EMAIL}, or send a message with the question form and we’ll get back to you.`],
    options: [
      { label: 'Ask a question', href: '/consultation.html#inquiry' },
      { label: 'Start over', next: 'start' },
    ],
  },
  unknown: {
    say: ['I’m a simple guide, so I may not understand everything. Here’s what I can help with:'],
    options: [
      { label: 'Send a case', next: 'case-start' },
      { label: 'Find my way around', next: 'browse' },
      { label: 'I’m a patient', next: 'patient' },
      { label: 'Contact STEPBAE', next: 'contact' },
    ],
  },
}

// typed questions: the first rule whose word appears in the message picks the step
const keywordRules = [
  [/itero/, 'portal-iTero'],
  [/trios|3shape/, 'portal-3Shape TRIOS'],
  [/medit/, 'portal-Medit'],
  [/primescan|cerec|dentsply|sirona/, 'portal-Primescan / CEREC'],
  [/scanner|portal|connect/, 'scanner'],
  [/impression|model|ship|mail in|physical/, 'case-physical'],
  [/checklist|include|shade|photo|prescription|\brx\b/, 'checklist'],
  [/case|send|submit|start|partner|account/, 'case-start'],
  [/patient|my teeth|my dentist|my crown|my veneer/, 'patient'],
  [/course|lecture|consult|training|event|class/, 'consulting'],
  [/article|blog|insight|read/, 'insights'],
  [/work|gallery|photos|cases you/, 'browse'],
  [/contact|email|phone|call|reach|question/, 'contact'],
  [/hi\b|hello|hey|help|menu|start over/, 'start'],
]
const matchStep = (text) => keywordRules.find(([re]) => re.test(text.toLowerCase()))?.[1] ?? 'unknown'

// the conversation is kept for the visit, so it carries over as the visitor moves between pages
const STORE = 'stepbae-chat'
const load = () => {
  try {
    return JSON.parse(sessionStorage.getItem(STORE))
  } catch {
    return null
  }
}
const save = (state) => {
  try {
    sessionStorage.setItem(STORE, JSON.stringify(state))
  } catch {
    /* private browsing: the chat still works, it just starts fresh on each page */
  }
}

const botMessage = (id) => ({ from: 'bot', step: id })

// Mini Step in a round frame: the chat button, the chat header and beside each answer
function Avatar({ size, still, className = '' }) {
  return (
    <span className={`relative block shrink-0 overflow-hidden rounded-full bg-cream ring-2 ring-gold ${size} ${className}`}>
      <MiniStep still={still} className="absolute left-1/2 top-[7%] w-[114%] -translate-x-1/2" />
    </span>
  )
}

export default function ChatGuide() {
  const saved = load()
  const [open, setOpen] = useState(saved?.open ?? false)
  const [messages, setMessages] = useState(saved?.messages ?? [botMessage('start')])
  const [text, setText] = useState('')
  // a friendly hello pops up beside the button a few seconds into the visit, once, until it's opened or closed
  const [greeted, setGreeted] = useState(saved?.greeted ?? false)
  const [teaser, setTeaser] = useState(false)
  const listRef = useRef(null)

  useEffect(() => save({ open, messages, greeted }), [open, messages, greeted])
  useEffect(() => {
    if (greeted || open) return
    const t = setTimeout(() => setTeaser(true), 4000)
    return () => clearTimeout(t)
  }, [greeted, open])
  const toggle = () => {
    setOpen((o) => !o)
    setTeaser(false)
    setGreeted(true)
  }
  const dismissTeaser = () => {
    setTeaser(false)
    setGreeted(true)
  }
  useEffect(() => {
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight, behavior: 'smooth' })
  }, [messages, open])
  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  const go = (label, next) => setMessages((m) => [...m, { from: 'user', text: label }, botMessage(next)])
  const send = (e) => {
    e.preventDefault()
    const t = text.trim()
    if (!t) return
    setText('')
    go(t, matchStep(t))
  }
  const restart = () => setMessages([botMessage('start')])

  const last = messages.length - 1

  return (
    <>
      {open && (
        <div
          role="dialog"
          aria-label="Mini Step, the STEPBAE assistant"
          className="fixed inset-x-3 bottom-24 z-50 flex max-h-[min(560px,calc(100dvh-110px))] flex-col overflow-hidden rounded-[6px] border border-gold/40 bg-ink-2 shadow-[0_24px_60px_-20px_rgba(0,0,0,0.8)] sm:inset-x-auto sm:right-6 sm:w-[370px]"
        >
          <div className="flex items-center justify-between border-b border-gold/25 px-4 py-3">
            <div className="flex items-center gap-3">
              <Avatar size="h-11 w-11" />
              <div>
                <p className="font-display text-[20px] font-medium leading-tight text-white">Mini Step</p>
                <p className="text-[12px] text-white/55">Your guide to STEPBAE</p>
              </div>
            </div>
            <div className="flex items-center gap-1">
              <button onClick={restart} className="rounded px-2 py-1 text-[12px] text-white/60 hover:text-gold">
                Start over
              </button>
              <button onClick={() => setOpen(false)} aria-label="Close assistant" className="rounded px-2 py-1 text-[20px] leading-none text-white/60 hover:text-gold">
                ×
              </button>
            </div>
          </div>

          <div ref={listRef} className="flex-1 space-y-3 overflow-y-auto px-4 py-4" aria-live="polite">
            {messages.map((m, i) =>
              m.from === 'user' ? (
                <p key={i} className="ml-auto w-fit max-w-[80%] rounded-[12px] rounded-br-[3px] bg-gold px-3 py-2 text-[14px] leading-snug text-ink">
                  {m.text}
                </p>
              ) : (
                <BotTurn key={i} step={steps[m.step] ?? steps.unknown} active={i === last} onChoose={go} />
              ),
            )}
          </div>

          <form onSubmit={send} className="flex gap-2 border-t border-gold/25 p-3">
            <input
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Type a question…"
              aria-label="Type a question"
              className="min-w-0 flex-1 rounded-[3px] border border-white/15 bg-ink px-3 py-2 text-[14px] text-white placeholder:text-white/40 focus:border-gold focus:outline-none"
            />
            <button type="submit" aria-label="Send" className="rounded-[3px] bg-gold px-3 text-ink hover:bg-gold-light">
              <ArrowRight className="h-4 w-4" />
            </button>
          </form>
        </div>
      )}

      {teaser && !open && (
        <div className="fixed bottom-24 right-5 z-50 w-[260px] rounded-[12px] rounded-br-[3px] border border-gold/40 bg-cream py-3 pl-4 pr-8 text-ink shadow-[0_18px_40px_-14px_rgba(0,0,0,0.7)] sm:right-6">
          <button onClick={toggle} className="text-left">
            <span className="block font-display text-[18px] font-medium leading-tight">Hi, I’m Mini Step!</span>
            <span className="mt-1 block text-[14px] leading-snug text-ink/80">
              Sending a case or just curious? Tap me and I’ll show you around.
            </span>
          </button>
          <button onClick={dismissTeaser} aria-label="Dismiss" className="absolute right-2 top-1.5 px-1 text-[18px] leading-none text-ink/50 hover:text-ink">
            ×
          </button>
        </div>
      )}

      <button
        onClick={toggle}
        aria-label={open ? 'Close Mini Step' : 'Chat with Mini Step'}
        aria-expanded={open}
        className="fixed bottom-4 right-4 z-50 rounded-full shadow-[0_10px_30px_-8px_rgba(0,0,0,0.7)] transition-transform hover:scale-105 sm:right-6"
      >
        <Avatar size="h-16 w-16" />
        {/* a small live dot, so Mini Step reads as ready to talk */}
        <span className="absolute right-0.5 top-0.5 flex h-3.5 w-3.5">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-teal opacity-75 motion-reduce:animate-none" />
          <span className="relative inline-flex h-3.5 w-3.5 rounded-full border-2 border-ink bg-teal" />
        </span>
      </button>
    </>
  )
}

// one turn from the assistant: its lines, an optional list, and (on the latest turn only) the choices
function BotTurn({ step, active, onChoose }) {
  return (
    <div className="flex max-w-[96%] gap-2">
      <Avatar size="h-7 w-7" still className="mt-0.5 ring-1" />
      <div className="min-w-0 space-y-2">
        {step.say.map((line) => (
          <p key={line} className="w-fit rounded-[12px] rounded-bl-[3px] bg-cream px-3 py-2 text-[14px] leading-snug text-ink">
            {line}
          </p>
        ))}
        {step.list && (
          <ol className="space-y-1.5 rounded-[12px] bg-cream px-3 py-2.5 text-[13px] leading-snug text-ink/90">
            {step.list.map((item, i) => (
              <li key={item} className="flex gap-2">
                <span className="font-semibold text-gold-dark">{i + 1}.</span>
                {item}
              </li>
            ))}
          </ol>
        )}
        {active && (
          <div className="flex flex-wrap gap-2 pt-1">
            {step.options.map((o) =>
              o.href ? (
                <a
                  key={o.label}
                  href={o.href}
                  className="inline-flex items-center gap-1.5 rounded-full bg-gold px-3 py-1.5 text-[13px] font-medium text-ink hover:bg-gold-light"
                >
                  {o.label} <ArrowRight className="h-3 w-3" />
                </a>
              ) : (
                <button
                  key={o.label}
                  onClick={() => onChoose(o.label, o.next)}
                  className="rounded-full border border-gold/60 px-3 py-1.5 text-[13px] text-white/90 hover:border-gold hover:bg-gold/10 hover:text-gold"
                >
                  {o.label}
                </button>
              ),
            )}
          </div>
        )}
      </div>
    </div>
  )
}
