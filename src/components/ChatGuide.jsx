import { useEffect, useRef, useState } from 'react'
import { ArrowRight } from './Icons.jsx'
import MiniStep from './MiniStep.jsx'
import { portals } from './PortalGuide.jsx'
import { EMAIL, sendForm, prefill } from './sendForm.js'
import { articles } from './cv.js'
import { unitOptions } from './PartnerForm.jsx'
import { inquiryOptions, orgOptions } from './ConsultForm.jsx'

// The Mini Steps, the site's guide and sales rep: a scripted conversation (no AI, no server) that helps visitors
// find their way, makes the case for STEPBAE, answers the usual questions (price, turnaround, "I already have a lab")
// and walks dentists through sending a case or leaving their details. Each step says something and offers choices;
// a choice either goes to another step (`next`) or opens a page (`href`), and a step with `lead` starts collecting
// a lead right in the chat, one question at a time, with a review before anything is sent. Typed questions are matched to a step by keywords. Only facts the site already states are used:
// no prices, turnaround times or offers are promised here; those go to STEPBAE.

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
      portal: p.name,
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

// patients can't send us a case themselves, so the Mini Steps help them ask their dentist to
const patientAsk = [
  'That you’d like your crowns or veneers made by STEPBAE Dental Lab',
  'STEPBAE works with iTero, 3Shape TRIOS, Medit and Primescan, or physical impressions, so your dentist can send the case the way they usually do',
  'Connecting takes just a few minutes, and STEPBAE will talk with them about your case',
]
// ready-to-send emails the patient fills in with their dentist's address
const mailNote = (subject, lines) => `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(lines.join('\n'))}`
const dentistNote = mailNote('Could my case go to STEPBAE?', [
  'Hi Doctor,',
  '',
  'For my upcoming crowns or veneers, I’d love for them to be made by STEPBAE Dental Lab.',
  '',
  'STEPBAE works with iTero, 3Shape TRIOS, Medit and Primescan, as well as physical impressions, and connecting only takes a few minutes: https://stepbae.com/partnership.html',
  '',
  'You can see STEPBAE’s work at https://stepbae.com/craftsmanship.html',
  '',
  'Could you send my case to STEPBAE? Thank you!',
])
const workNote = mailNote('Have you seen STEPBAE’s work?', [
  'Hi Doctor,',
  '',
  'I came across STEPBAE Dental Lab and love their work. Here’s their gallery: https://stepbae.com/craftsmanship.html',
  '',
  'Would you consider sending my crowns or veneers to them? STEPBAE works with iTero, 3Shape TRIOS, Medit and Primescan, as well as physical impressions: https://stepbae.com/partnership.html',
  '',
  'Thank you!',
])

// why dentists choose STEPBAE: the strengths the rest of the site already shows
const strengths = [
  'Every case is handcrafted and layered in house at STEPBAE by a CDT, DTG master ceramist',
  'You talk directly with the technician making your case',
  'Shade matched to your patient’s natural teeth, not just a shade tab',
  `An educator dentists learn from: more than 70 lectures and hands-on courses internationally, and ${articles.length} published articles`,
  'Works with iTero, 3Shape TRIOS, Medit and Primescan, or physical impressions',
]

const steps = {
  start: {
    say: [
      'Hi, we’re the Mini Steps, welcome to STEPBAE! We help dentists deliver natural, beautiful restorations!',
      'What brings you here today?',
    ],
    options: [
      { label: 'I’m a dentist: send a case', next: 'case-start' },
      { label: 'Why choose STEPBAE?', next: 'why' },
      { label: 'Get our price list', next: 'lead-price' },
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
    say: ['Which scanner do you use? We’ll show you how to connect us in its portal. It only takes a few minutes, and you only do it once.'],
    options: [
      ...portals.map((p) => ({ label: p.name, next: `portal-${p.name}` })),
      { label: 'Another scanner', next: 'scanner-other' },
    ],
  },
  ...portalSteps,
  'scanner-other': {
    portal: 'Other scanner',
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
      { label: 'Get our price list', next: 'lead-price' },
    ],
  },
  'case-physical': {
    portal: 'No scanner (physical impressions)',
    say: [
      'Of course. Please fill out the partnership form and mention that you’ll send physical impressions or models. We’ll reply with shipping details and our Rx form.',
    ],
    options: [
      { label: 'Go to the partnership form', href: '/partnership.html#partner-form' },
      { label: 'What should I include?', next: 'checklist' },
      { label: 'Get our price list', next: 'lead-price' },
    ],
  },
  'case-returning': {
    say: ['Welcome back! Just choose STEPBAE as the lab in your portal’s order form. A quick checklist so the case comes out right the first time:'],
    list: caseChecklist,
    options: [
      { label: 'Read the full guide', href: '/article.html?p=how-to-submit-a-digital-case' },
      { label: 'Discuss a case with STEPBAE first', next: 'lead-talk' },
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

  why: {
    say: ['Great question! Here’s why dentists send their esthetic cases to STEPBAE:'],
    list: strengths,
    options: [
      { label: 'See STEPBAE’s work', href: '/craftsmanship.html' },
      { label: 'Send my first case', next: 'case-start' },
      { label: 'Get our price list', next: 'lead-price' },
      { label: 'I already have a lab', next: 'switching' },
    ],
  },
  switching: {
    say: [
      'That’s completely fine, most of the dentists we work with did too!',
      'Many start by sending us just one case where the details really show, like an anterior crown or a set of veneers. Connecting your scanner takes a few minutes, and you choose the lab case by case.',
    ],
    options: [
      { label: 'Try one case', next: 'case-start' },
      { label: 'See STEPBAE’s work', href: '/craftsmanship.html' },
      { label: 'Talk to STEPBAE', next: 'lead-talk' },
    ],
  },
  turnaround: {
    say: [
      'It depends on the restoration and how much characterization the case needs, and layered esthetic work takes a little longer than a monolithic crown.',
      'Tell us what you’re planning and STEPBAE will give you a timeline before you prep, so you can book your patient with confidence.',
    ],
    options: [
      { label: 'Ask about my case', next: 'lead-talk' },
      { label: 'Send a case', next: 'case-start' },
    ],
  },
  // these two start a lead: the questions come from leadFlows below (the options only show if the visitor
  // comes back to the chat mid-way, since unsent answers aren't kept)
  'lead-price': {
    say: ['We’d be happy to send you our current price list! We just need a few quick details.'],
    lead: 'price',
    options: [
      { label: 'Get the price list', next: 'lead-price' },
    ],
  },
  'lead-talk': {
    say: ['STEPBAE would love to hear from you! A few quick questions, and we’ll get back to you personally.'],
    lead: 'talk',
    options: [
      { label: 'Leave a message', next: 'lead-talk' },
    ],
  },
  'lead-consult': {
    say: ['Wonderful! Let’s get your inquiry to STEPBAE. Just a few quick questions.'],
    lead: 'consult',
    options: [
      { label: 'Start my inquiry', next: 'lead-consult' },
    ],
  },
  'consult-thanks': {
    say: ['Thank you! Your inquiry is on its way, and STEPBAE will be in touch shortly to set up a conversation.', 'In the meantime, take a look at what’s coming up:'],
    options: [
      { label: 'Upcoming courses & events', href: '/consultation.html#events' },
      { label: 'About STEPBAE', href: '/about.html' },
      { label: 'Start over', next: 'start' },
    ],
  },
  'lead-thanks': {
    say: ['Thank you! We’ve got your details, and STEPBAE will be in touch shortly.', 'While you wait, would you like to see some of STEPBAE’s work?'],
    options: [
      { label: 'See STEPBAE’s work', href: '/craftsmanship.html' },
      { label: 'Connect my scanner', next: 'scanner' },
      { label: 'Start over', next: 'start' },
    ],
  },

  consulting: {
    say: [
      'STEPBAE works with practices and labs on digital workflow, esthetic and implant case planning, and hands-on training for your team, and lectures for study clubs and corporate events.',
      'What would you like to do?',
    ],
    options: [
      { label: 'Plan it with us here', next: 'lead-consult' },
      { label: 'See consulting services', href: '/consultation.html#services' },
      { label: 'Upcoming courses & events', href: '/consultation.html#events' },
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
      { label: 'Send us a case', next: 'case-start' },
    ],
  },
  'insights-patients': {
    say: ['Here are a few good places to start:'],
    options: [
      { label: 'Crown or veneer?', href: '/article.html?p=crown-vs-veneer' },
      { label: 'Veneers vs. braces or aligners', href: '/article.html?p=veneers-vs-braces-or-clear-aligners' },
      { label: 'All articles', href: '/insights.html#latest' },
      { label: 'Ask my dentist for STEPBAE', next: 'patient-ask' },
    ],
  },
  dentist: {
    say: ['Happy to help. What would you like to know about?'],
    options: [
      { label: 'Send a case', next: 'case-start' },
      { label: 'Why choose STEPBAE?', next: 'why' },
      { label: 'Get our price list', next: 'lead-price' },
      { label: 'Consulting & courses', next: 'consulting' },
      { label: 'Articles for dentists', next: 'insights-dentists' },
    ],
  },
  patient: {
    say: [
      'Welcome! STEPBAE makes crowns, veneers and implant teeth for dentists, so we work with you through your dentist.',
      'Want STEPBAE Dental Lab to make yours? Just ask your dentist to send your case to STEPBAE. It’s easier than you might think, and we can show you how.',
    ],
    options: [
      { label: 'How do I ask my dentist?', next: 'patient-ask' },
      { label: 'Write a note to my dentist', href: dentistNote },
      { label: 'See STEPBAE’s work', href: '/craftsmanship.html' },
      { label: 'Articles for patients', next: 'insights-patients' },
    ],
  },
  'patient-ask': {
    say: [
      'It’s simple, and dentists hear requests like this all the time. Ideally before your teeth are prepared, tell your dentist:',
    ],
    list: patientAsk,
    options: [
      { label: 'Write a note to my dentist', href: dentistNote },
      { label: 'Show my dentist STEPBAE’s work', href: workNote },
      { label: 'What if my dentist has questions?', next: 'patient-questions' },
    ],
  },
  'patient-questions': {
    say: [
      `STEPBAE is happy to talk with your dentist directly. They can email us at ${EMAIL}, or chat with us here, and we’ll walk them through sending the case.`,
      'Our page for dentists has everything they need to get started:',
    ],
    options: [
      { label: 'Page for dentists', href: '/partnership.html' },
      { label: 'Write a note to my dentist', href: dentistNote },
      { label: 'Ask STEPBAE a question', href: '/consultation.html#inquiry' },
    ],
  },
  browse: {
    say: ['Enjoy your visit! Here’s where you can go:'],
    options: [
      { label: 'Craftsmanship gallery', href: '/craftsmanship.html' },
      { label: 'About STEPBAE', href: '/about.html' },
      { label: 'Consulting & courses', href: '/consultation.html' },
      { label: 'Insights articles', href: '/insights.html' },
      { label: 'Why dentists choose STEPBAE', next: 'why' },
      { label: 'Send a case', next: 'case-start' },
    ],
  },
  contact: {
    say: [`You can reach us at ${EMAIL}, or leave a message right here and STEPBAE will get back to you.`],
    options: [
      { label: 'Leave a message', next: 'lead-talk' },
      { label: 'Start over', next: 'start' },
    ],
  },
  unknown: {
    say: ['We’re simple guides, so we may not understand everything. Here’s what we can help with:'],
    options: [
      { label: 'Send a case', next: 'case-start' },
      { label: 'Find my way around', next: 'browse' },
      { label: 'I’m a patient', next: 'patient' },
      { label: 'Talk to STEPBAE', next: 'lead-talk' },
    ],
  },
}

// the questions the Mini Steps ask, one at a time, before sending a lead to Step; `key` is the field name in the email
const leadFields = {
  name: { key: 'Name', ask: () => 'Lovely! First, what’s your name?', autoComplete: 'name' },
  practice: {
    key: 'Practice',
    ask: (a) => `Nice to meet you, ${a.Name}! Which practice are you with?`,
    optional: true,
    autoComplete: 'organization',
  },
  email: { key: 'email', label: 'Email', ask: () => 'What’s the best email to reach you?', type: 'email', autoComplete: 'email' },
  phone: { key: 'Phone', ask: () => 'And a phone number, in case a quick call is easier?', type: 'tel', optional: true, autoComplete: 'tel' },
  units: {
    key: 'Units per month',
    ask: () => 'Roughly how many units does your practice send a month? It helps STEPBAE quote the right pricing.',
    choices: unitOptions,
  },
  message: { key: 'Message', ask: () => 'What would you like to ask STEPBAE? Tell us a little about your case or question.' },
  // the consultation inquiry, the same questions as the form on the Consultation page
  role: { key: 'Role', ask: (a) => `Nice to meet you, ${a.Name}! What’s your title or role?`, optional: true, autoComplete: 'organization-title' },
  organization: { key: 'Organization', ask: () => 'Which company or organization are you with?', autoComplete: 'organization' },
  orgType: { key: 'Organization type', ask: (a) => `And what kind of organization is ${a.Organization}?`, choices: orgOptions },
  website: { key: 'Website', ask: () => 'Do you have a website we can look at?', optional: true, autoComplete: 'url' },
  inquiry: { key: 'Inquiry', ask: () => 'What are you reaching out about?', choices: inquiryOptions },
  timeline: { key: 'Timeline', ask: () => 'Any preferred dates or timeline? (For example, spring 2027, or flexible.)', optional: true },
  details: {
    key: 'Message',
    label: 'Tell us more',
    ask: () => 'Last one! Tell us more: your goals, audience or team size, location and budget, whatever helps STEPBAE prepare.',
  },
}
const leadFlows = {
  price: {
    formName: 'partnership',
    thanks: 'lead-thanks',
    subject: 'Price list request (Mini Steps chat)',
    fields: ['name', 'practice', 'email', 'phone', 'units'],
    fixed: { Message: 'Please send me your price list.' },
  },
  talk: {
    formName: 'partnership',
    thanks: 'lead-thanks',
    subject: 'Question for Step (Mini Steps chat)',
    fields: ['name', 'practice', 'email', 'phone', 'message'],
    fixed: {},
  },
  consult: {
    formName: 'consultation',
    thanks: 'consult-thanks',
    subject: 'New consultation inquiry (Mini Steps chat)',
    fields: ['name', 'role', 'organization', 'orgType', 'email', 'website', 'inquiry', 'timeline', 'details'],
    fixed: {},
  },
}
const validEmail = (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)
// the summary is kept on the message, so it still reads correctly after the lead is sent
const reviewMessage = (flow, answers) => ({
  from: 'bot',
  lead: 'review',
  summary: leadFlows[flow].fields
    .map((id) => [leadFields[id].label ?? leadFields[id].key, answers[leadFields[id].key]])
    .filter(([, v]) => v),
})
const askMessage = (answers, field, note = '') => ({
  from: 'bot',
  lead: 'ask',
  field,
  text: `${note}${leadFields[field].ask(answers)}`,
})

// typed questions: the first rule whose word appears in the message picks the step
const keywordRules = [
  [/ask (my )?dentist|tell (my )?dentist|my dentist (to|send)/, 'patient-ask'],
  [/itero/, 'portal-iTero'],
  [/trios|3shape/, 'portal-3Shape TRIOS'],
  [/medit/, 'portal-Medit'],
  [/primescan|cerec|dentsply|sirona/, 'portal-Primescan / CEREC'],
  [/scanner|portal|connect/, 'scanner'],
  [/impression|model|ship|mail in|physical/, 'case-physical'],
  [/checklist|include|shade|photo|prescription|\brx\b/, 'checklist'],
  [/price|pricing|cost|fee|how much|quote|expensive|cheap/, 'lead-price'],
  [/turnaround|how long|how fast|days|weeks|deadline|rush/, 'turnaround'],
  [/already have|current lab|another lab|other lab|switch/, 'switching'],
  [/why|better|different|quality|choose|experience|reviews?/, 'why'],
  [/talk|speak|human|person|call me|step bae/, 'lead-talk'],
  [/case|send|submit|start|partner|account/, 'case-start'],
  [/patient|my teeth|my dentist|my crown|my veneer/, 'patient'],
  [/book|hire|invite|speaker|sponsor/, 'lead-consult'],
  [/course|lecture|consult|training|event|class/, 'consulting'],
  [/article|blog|insight|read/, 'insights'],
  [/work|gallery|photos|cases you/, 'browse'],
  [/contact|email|phone|call|reach|question/, 'contact'],
  [/hi\b|hello|hey|help|menu|start over/, 'start'],
]
const matchStep = (text) => keywordRules.find(([re]) => re.test(text.toLowerCase()))?.[1] ?? 'unknown'

// the conversation is kept for the visit, so it carries over as the visitor moves between pages; a lead's questions
// and answers are left out, so personal details aren't stored before they're sent
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

// the Mini Steps in a round frame: Mini Step with his backup dancers, on the chat button, in the header and (standing still) beside each answer
function Avatar({ size, still, crew, className = '' }) {
  return (
    // a deep sky-blue backdrop: dark enough for the white suit to pop, light enough that his dark hair stands out
    <span
      className={`relative block shrink-0 overflow-hidden rounded-full ring-2 ring-gold ${size} ${className}`}
      style={{ background: 'radial-gradient(circle at 50% 40%, #8fb0c4 0%, #5b7c91 45%, #2e4250 100%)' }}
    >
      {crew ? (
        <MiniStep crew still={still} className="absolute left-1/2 top-[17%] w-[102%] -translate-x-1/2" />
      ) : (
        <MiniStep still={still} className="absolute left-1/2 top-[6%] w-[76%] -translate-x-[47%]" />
      )}
    </span>
  )
}

// the hello bubble's pitch fits the page the visitor is on
const pitches = {
  '/craftsmanship.html': 'Like what you see? We can help you get results like these on your next case.',
  '/partnership.html': 'Ready to send your first case? We’ll walk you through connecting your scanner in a minute.',
  '/insights.html': 'Enjoying the read? Ask us anything, or send a case and see the difference for yourself.',
  '/article.html': 'Enjoying the read? Ask us anything, or send a case and see the difference for yourself.',
  '/consultation.html': 'Planning a course or consultation? We’ll point you to the right one.',
  '/about.html': 'Want STEPBAE on your next case? We can set that up in a minute.',
}
const defaultPitch = 'We do more than dancing. Sending a case or just curious? Tap us and we’ll show you around.'

export default function ChatGuide() {
  const saved = load()
  const [open, setOpen] = useState(saved?.open ?? false)
  const [messages, setMessages] = useState(saved?.messages ?? [botMessage('start')])
  const [text, setText] = useState('')
  // a friendly hello pops up beside the button a few seconds into the visit, once, until it's opened or closed
  const [greeted, setGreeted] = useState(saved?.greeted ?? false)
  const [teaser, setTeaser] = useState(false)
  // a lead in progress: which flow, the answers so far, the question number, a field being changed, sending
  const [lead, setLead] = useState(null)
  const listRef = useRef(null)
  // the lead as it stands, so whatever was answered can still be sent if the visitor leaves partway
  const leadRef = useRef(null)
  useEffect(() => {
    leadRef.current = lead
  }, [lead])

  useEffect(
    () => save({ open, messages: messages.filter((m) => !m.lead && !m.private), greeted }),
    [open, messages, greeted],
  )
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

  // a form left partway (Start over, another choice, or leaving the page) still sends what was answered, marked
  // unfinished, so STEPBAE can follow up; nothing is sent if no questions were answered yet
  const sendUnfinished = () => {
    const l = leadRef.current
    leadRef.current = null
    if (!l || l.sending || !Object.values(l.answers).some(Boolean)) return
    const flow = leadFlows[l.flow]
    const fields = flow.fields.map((id) => leadFields[id])
    const data = new FormData()
    for (const [k, v] of Object.entries(l.answers)) if (v) data.append(k, v)
    data.append('Status', 'Unfinished: left the chat before sending')
    const stoppedAt = fields[l.editing ? flow.fields.indexOf(l.editing) : l.i]
    data.append('Stopped at', stoppedAt ? stoppedAt.label ?? stoppedAt.key : 'Review, before sending')
    data.append('Source', `Mini Steps chat, ${window.location.pathname}`)
    sendForm(data, `Unfinished: ${flow.subject}`, flow.formName, { quiet: true }).catch(() => {})
  }
  useEffect(() => {
    window.addEventListener('pagehide', sendUnfinished)
    return () => window.removeEventListener('pagehide', sendUnfinished)
  }, [])

  const say = (...msgs) => setMessages((m) => [...m, ...msgs])
  const go = (label, next) => {
    sendUnfinished()
    const step = steps[next]
    const msgs = [{ from: 'user', text: label }, botMessage(next)]
    if (step?.portal) prefill.add({ Portal: step.portal })
    if (step?.lead) {
      const fresh = { flow: step.lead, answers: {}, i: 0, editing: null, sending: false }
      setLead(fresh)
      msgs.push(askMessage({}, leadFlows[step.lead].fields[0]))
    } else setLead(null)
    say(...msgs)
  }

  // the field the Mini Steps are waiting on, if any
  const lastMessage = messages[messages.length - 1]
  const waitingOn = lead && lastMessage?.lead === 'ask' ? lastMessage.field : null

  const answer = (raw) => {
    const field = leadFields[waitingOn]
    const value = raw.trim()
    const reply = { from: 'user', text: value || 'Skip', private: true }
    if (field.type === 'email' && !validEmail(value))
      return say(reply, askMessage(lead.answers, waitingOn, 'Hmm, that email doesn’t look quite right. '))
    if (field.choices && !field.choices.includes(value))
      return say(reply, askMessage(lead.answers, waitingOn, 'Please pick one of the ranges below. '))
    const fields = leadFlows[lead.flow].fields
    const next = { ...lead, answers: { ...lead.answers, [field.key]: value }, editing: null }
    next.i = lead.editing ? fields.length : lead.i + 1
    setLead(next)
    say(reply, next.i < fields.length ? askMessage(next.answers, fields[next.i]) : reviewMessage(lead.flow, next.answers))
  }
  const changeField = (id) => {
    setLead({ ...lead, editing: id })
    say({ from: 'user', text: leadFields[id].label ?? leadFields[id].key }, askMessage(lead.answers, id))
  }
  const sendLead = async () => {
    const flow = leadFlows[lead.flow]
    const data = new FormData()
    for (const [k, v] of Object.entries({ ...lead.answers, ...flow.fixed })) if (v) data.append(k, v)
    data.append('Source', `Mini Steps chat, ${window.location.pathname}`)
    setLead({ ...lead, sending: true })
    try {
      if (await sendForm(data, flow.subject, flow.formName)) {
        const a = lead.answers
        if (flow.formName === 'partnership') prefill.add(
          Object.fromEntries(
            Object.entries({ 'Dentist name': a.Name, 'Practice name': a.Practice, email: a.email, 'Units per month': a['Units per month'] }).filter(([, v]) => v),
          ),
        )
        setLead(null)
        say(botMessage(flow.thanks))
      } else setLead({ ...lead, sending: false })
    } catch {
      setLead({ ...lead, sending: false })
      say({ from: 'bot', lead: 'error' })
    }
  }

  const send = (e) => {
    e.preventDefault()
    const t = text.trim()
    if (!t) return
    setText('')
    if (waitingOn) answer(t)
    else go(t, matchStep(t))
  }
  const restart = () => {
    sendUnfinished()
    setLead(null)
    setMessages([botMessage('start')])
  }
  const pitch = pitches[window.location.pathname] ?? defaultPitch

  const last = messages.length - 1

  return (
    <>
      {open && (
        <div
          role="dialog"
          aria-label="The Mini Steps, the STEPBAE assistants"
          className="fixed inset-x-3 bottom-28 z-50 flex max-h-[min(560px,calc(100dvh-130px))] flex-col overflow-hidden rounded-[6px] border border-gold/40 bg-ink-2 shadow-[0_24px_60px_-20px_rgba(0,0,0,0.8)] sm:inset-x-auto sm:right-6 sm:w-[370px]"
        >
          <div className="flex items-center justify-between border-b border-gold/25 px-4 py-3">
            <div className="flex items-center gap-3">
              <Avatar crew size="h-11 w-11" />
              <div>
                <p className="font-display text-[20px] font-medium leading-tight text-white">Mini Steps</p>
                <p className="text-[12px] text-white/55">Your adorable dancing guides</p>
              </div>
            </div>
            <div className="flex items-center gap-1">
              <button onClick={restart} className="rounded-full border border-gold/50 px-3 py-1 text-[14px] font-medium text-white/85 hover:border-gold hover:text-gold">
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
              ) : m.lead ? (
                <LeadTurn
                  key={i}
                  message={m}
                  lead={lead}
                  active={i === last}
                  onAnswer={answer}
                  onChange={() => say({ from: 'bot', lead: 'change' })}
                  onChangeField={changeField}
                  onSend={sendLead}
                />
              ) : (
                <BotTurn key={i} step={steps[m.step] ?? steps.unknown} active={i === last} onChoose={go} />
              ),
            )}
          </div>

          <form onSubmit={send} noValidate className="flex gap-2 border-t border-gold/25 p-3">
            <input
              value={text}
              onChange={(e) => setText(e.target.value)}
              type={leadFields[waitingOn]?.type ?? 'text'}
              autoComplete={leadFields[waitingOn]?.autoComplete ?? 'off'}
              placeholder={waitingOn ? 'Type your answer…' : 'Type a question…'}
              aria-label={waitingOn ? 'Type your answer' : 'Type a question'}
              className="min-w-0 flex-1 rounded-[3px] border border-white/15 bg-ink px-3 py-2 text-[14px] text-white placeholder:text-white/40 focus:border-gold focus:outline-none"
            />
            <button type="submit" aria-label="Send" className="rounded-[3px] bg-gold px-3 text-ink hover:bg-gold-light">
              <ArrowRight className="h-4 w-4" />
            </button>
          </form>
        </div>
      )}

      {teaser && !open && (
        <div className="fixed bottom-28 right-5 z-50 w-[260px] rounded-[12px] rounded-br-[3px] border border-gold/40 bg-cream py-3 pl-4 pr-8 text-ink shadow-[0_18px_40px_-14px_rgba(0,0,0,0.7)] sm:right-6">
          <button onClick={toggle} className="text-left">
            <span className="block font-display text-[18px] font-medium leading-tight">Hi, we’re the Mini Steps!</span>
            <span className="mt-1 block text-[14px] leading-snug text-ink/80">
              {pitch}
            </span>
          </button>
          <button onClick={dismissTeaser} aria-label="Dismiss" className="absolute right-2 top-1.5 px-1 text-[18px] leading-none text-ink/50 hover:text-ink">
            ×
          </button>
        </div>
      )}

      <button
        onClick={toggle}
        aria-label={open ? 'Close the Mini Steps' : 'Chat with the Mini Steps'}
        aria-expanded={open}
        className="group fixed bottom-4 right-4 z-50 flex flex-col items-end gap-2 sm:right-6"
      >
        {/* an offer of help above the button, out of the way while the chat or the hello bubble is showing */}
        {!open && !teaser && (
          <span className="rounded-full border border-gold/50 bg-ink-2/95 px-2.5 py-1 text-[11px] font-medium text-white shadow-[0_10px_30px_-8px_rgba(0,0,0,0.7)] group-hover:border-gold group-hover:text-gold">
            We are here to assist
          </span>
        )}
        <span className="relative rounded-full shadow-[0_10px_30px_-8px_rgba(0,0,0,0.7)] transition-transform group-hover:scale-105">
          <Avatar crew size="h-20 w-20" />
          {/* a small live dot, so the Mini Steps read as ready to talk */}
          <span className="absolute left-1 top-1 flex h-3.5 w-3.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-teal opacity-75 motion-reduce:animate-none" />
            <span className="relative inline-flex h-3.5 w-3.5 rounded-full border-2 border-ink bg-teal" />
          </span>
        </span>
      </button>
    </>
  )
}

// a bubble from the Mini Steps, with their faces beside it
function Bubble({ children }) {
  return <p className="w-fit rounded-[12px] rounded-bl-[3px] bg-cream px-3 py-2 text-[14px] leading-snug text-ink">{children}</p>
}
const chip = 'rounded-full border border-gold/60 px-3 py-1.5 text-[13px] text-white/90 hover:border-gold hover:bg-gold/10 hover:text-gold'
const solidChip =
  'inline-flex items-center gap-1.5 rounded-full bg-gold px-3 py-1.5 text-[13px] font-medium text-ink hover:bg-gold-light disabled:opacity-60'

// a turn while collecting a lead: a question (with choices, Skip for optional ones), the review before sending,
// the list of answers to change, or a sending error; buttons only on the latest turn
function LeadTurn({ message, lead, active, onAnswer, onChange, onChangeField, onSend }) {
  const flow = lead && leadFlows[lead.flow]
  const field = leadFields[message.field]
  return (
    <div className="flex max-w-[96%] gap-2">
      <Avatar crew size="h-8 w-8" still className="mt-0.5 ring-1" />
      <div className="min-w-0 space-y-2">
        {message.lead === 'ask' && <Bubble>{message.text}</Bubble>}
        {message.lead === 'review' && (
          <>
            <Bubble>Here’s what we’ll send STEPBAE. Does everything look right?</Bubble>
            <dl className="space-y-1 rounded-[12px] bg-cream px-3 py-2.5 text-[13px] leading-snug text-ink/90">
              {message.summary.map(([label, value]) => (
                <div key={label} className="flex gap-2">
                  <dt className="shrink-0 font-semibold text-gold-dark">{label}:</dt>
                  <dd className="min-w-0 break-words">{value}</dd>
                </div>
              ))}
            </dl>
          </>
        )}
        {message.lead === 'change' && <Bubble>Sure! What would you like to change?</Bubble>}
        {message.lead === 'error' && <Bubble>Sorry, that didn’t go through. Please try again, or email us at {EMAIL}.</Bubble>}

        {active && lead && (
          <div className="flex flex-wrap gap-2 pt-1">
            {message.lead === 'ask' &&
              field.choices?.map((c) => (
                <button key={c} onClick={() => onAnswer(c)} className={chip}>
                  {c}
                </button>
              ))}
            {message.lead === 'ask' && field.optional && (
              <button onClick={() => onAnswer('')} className={chip}>
                Skip
              </button>
            )}
            {(message.lead === 'review' || message.lead === 'error') && (
              <>
                <button onClick={onSend} disabled={lead.sending} className={solidChip}>
                  {lead.sending ? 'Sending…' : 'Send to STEPBAE'} <ArrowRight className="h-3 w-3" />
                </button>
                <button onClick={onChange} className={chip}>
                  Change something
                </button>
              </>
            )}
            {message.lead === 'change' &&
              flow.fields.map((id) => (
                <button key={id} onClick={() => onChangeField(id)} className={chip}>
                  {leadFields[id].label ?? leadFields[id].key}
                </button>
              ))}
          </div>
        )}
      </div>
    </div>
  )
}

// one turn from the assistant: its lines, an optional list, and (on the latest turn only) the choices
function BotTurn({ step, active, onChoose }) {
  return (
    <div className="flex max-w-[96%] gap-2">
      <Avatar crew size="h-8 w-8" still className="mt-0.5 ring-1" />
      <div className="min-w-0 space-y-2">
        {step.say.map((line) => (
          <Bubble key={line}>{line}</Bubble>
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
                <button key={o.label} onClick={() => onChoose(o.label, o.next)} className={chip}>
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
