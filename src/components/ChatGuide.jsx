import { useEffect, useRef, useState } from 'react'
import { ArrowRight } from './Icons.jsx'
import MiniStep from './MiniStep.jsx'
import { portals } from './PortalGuide.jsx'
import { EMAIL, sendForm, prefill } from './sendForm.js'
import { articles } from './cv.js'
import { unitOptions } from './PartnerForm.jsx'
import { inquiryOptions, orgOptions } from './ConsultForm.jsx'
import { services } from './ConsultServices.jsx'
import { formats } from './ConsultFormats.jsx'
import { upcoming } from './Events.jsx'
import { faqs } from './ConsultFAQ.jsx'
import { partnerFaqs } from './PartnerSections.jsx'
import { articleKnowledge, journalArticles, dentistArticles, patientArticles, glossary } from './chatArticles.js'

// The Mini Steps, the site's guide and sales rep: a scripted conversation that helps visitors
// find their way, makes the case for STEPBAE, answers the usual questions (price, turnaround, "I already have a lab")
// and walks dentists through sending a case or leaving their details. Each step says something and offers choices;
// a choice either goes to another step (`next`) or opens a page (`href`), and a step with `lead` starts collecting
// a lead right in the chat, one question at a time, with a review before anything is sent. Typed questions are matched to a step by keywords. Only facts the site already states are used:
// no prices, turnaround times or offers are promised here; those go to STEPBAE. A typed question no keyword matches
// is answered by AI (api/chat.js, held to the same facts in chatKnowledge.js); when that isn't available
// (no server, as in local development, or an error), the scripted "unknown" answer is shown instead.

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
  'Every case is handcrafted by highly trained technicians, for precise fit, natural esthetics and consistent quality',
  'You talk directly with the technician making your case',
  'Shade matched to your patient’s natural teeth, not just a shade tab',
  `Always learning and sharing: more than 70 lectures and hands-on courses for fellow technicians and dentists, and ${articles.length} articles in dental journals`,
  'Works with iTero, 3Shape TRIOS, Medit and Primescan, or physical impressions',
]

// a light word, as a lead starts, that answers go to STEPBAE (unfinished ones too)
const shareNote = 'Answers you give here are shared with STEPBAE, to save you time filling out the boring form.'

// what STEPBAE's consulting does for each kind of visitor, in the chat's own words (it speaks for STEPBAE, never as
// Step); the list under each comes from the Consultation page's banners, so the two always match
const serviceOutcomes = {
  workflow: 'Smoother handoffs and fewer surprises: a digital workflow built around the scanners, software and equipment you already have, so cases move cleanly between practice and lab.',
  training: 'Your team learns the skill it needs most, right at its own benches, in small groups of 6 or more, and uses it on the very next case.',
  planning: 'Predictable results on your hardest cases: the dentist, the technician and STEPBAE plan the outcome together, before anything is prepped.',
  speaking: 'A talk or live demo made for your event: the topic is built around your theme and goals, backed by more than 70 lectures and hands-on courses given internationally, in person or online.',
}
const serviceName = (s) => s.title.join(' ')
const serviceSteps = Object.fromEntries(
  services.map((s) => [
    `svc-${s.id}`,
    {
      say: [serviceOutcomes[s.id], 'What’s included:'],
      list: s.points,
      options: [
        // starts the inquiry with its topic already chosen
        { label: s.cta.replace('Step', 'STEPBAE'), next: 'lead-consult', preset: { Inquiry: s.inquiry } },
        { label: 'Ways to work together', next: 'formats' },
        { label: 'Other services', next: 'consulting' },
      ],
    },
  ]),
)

// the Consultation page's FAQ, studied from the page itself so a new question there is one the chat can answer too;
// answers speak for STEPBAE, never as Step
const faqAnswer = (f) => f.chat ?? f.a.replace(/\bStep\b/g, 'STEPBAE')
const faqSteps = Object.fromEntries(
  faqs.map((f) => [
    `faq-${f.id}`,
    {
      say: [faqAnswer(f)],
      options: [
        { label: 'Plan it with us', next: 'lead-consult' },
        { label: 'Another question', next: 'faq' },
        { label: 'Our services', next: 'consulting' },
      ],
    },
  ]),
)

// upcoming courses and events, from the same list the Consultation page shows
const eventLines = upcoming.map((ev) =>
  [`${ev.short ?? ev.title}: ${ev.date}, ${ev.place}`, ev.talk && `“${ev.talk}”`, ev.session, ev.room, ev.soon && 'registration opens soon']
    .filter(Boolean)
    .join(' · '),
)

// what the Mini Steps say when they notice what a visitor is reading: each `data-chat-topic` on the page has a
// pitch for the hello bubble and a suggestion offered when the chat opens
const topics = {
  workflow: { pitch: 'Thinking about your digital workflow? We can show you how STEPBAE would fit it to your setup.', say: 'Looking at digital workflow consulting? Here’s what it can do for you.', next: 'svc-workflow' },
  training: { pitch: 'Want your team trained on a new skill? Ask us about hands-on courses.', say: 'Looking at team training? Here’s what your team gets.', next: 'svc-training' },
  planning: { pitch: 'Have a tricky case coming up? Let’s plan it together.', say: 'Got a complex case? Here’s how case planning works.', next: 'svc-planning' },
  speaking: { pitch: 'Planning an event? We can help you book a talk or a live demo.', say: 'Planning an event? Here’s what STEPBAE can bring to your stage.', next: 'svc-speaking' },
  process: { pitch: 'Ready to start? It only takes one short message.', say: 'Ready to start? It only takes a few quick questions.', next: 'lead-consult' },
  formats: { pitch: 'Not sure which format fits? We’ll help you choose.', say: 'Not sure which format fits? Here they all are.', next: 'formats' },
  events: { pitch: 'Coming to an upcoming event? We have the times and rooms.', say: 'Coming to one of our events? Here are the details.', next: 'events' },
  faq: { pitch: 'Have a question that isn’t here? Just ask us.', say: 'Have a question? We know the answers to these.', next: 'faq' },
  inquiry: { pitch: 'Prefer to chat? We can take your inquiry one question at a time.', say: 'Prefer to chat instead of the form? We’ll ask one question at a time.', next: 'lead-consult' },
  portals: { pitch: 'Need help connecting your scanner? We’ll walk you through it.', say: 'Connecting your scanner? Pick yours and we’ll show you how.', next: 'scanner' },
  'partner-why': { pitch: 'Wondering if STEPBAE is the right lab? We can answer anything, or send our price list.', say: 'Getting to know STEPBAE? Here’s why dentists send their esthetic cases here.', next: 'why' },
  'partner-restorations': { pitch: 'Want our price list? We can send it in a minute.', say: 'Looking at what we make? We can send our current price list.', next: 'lead-price' },
  'partner-flow': { pitch: 'Ready to send your first case? We’ll walk you through it.', say: 'Ready to send your first case? We’ll walk you through it.', next: 'case-start' },
  'partner-faq': { pitch: 'Have a question that isn’t here? Just ask us.', say: 'Have a question? Ask us about turnaround, warranty, shipping or anything else.', next: 'dentist' },
  'partner-form': { pitch: 'Prefer to chat instead of the form? We can take your details here.', say: 'Prefer to chat instead of the form? Leave your details here.', next: 'lead-talk' },
  // each article: the reader's next step depends on who it's written for
  ...Object.fromEntries(
    articleKnowledge.map((a) => [
      `article:${a.slug}`,
      a.post.audience === 'patients'
        ? {
            pitch: 'Reading about your smile? We can help you ask your dentist for STEPBAE.',
            say: `Reading “${a.short}”? Here’s the short version, and how STEPBAE can help.`,
            next: `art-${a.slug}`,
          }
        : {
            pitch: 'Want results like these on your next case? We can help you send it in a minute.',
            say: `Reading “${a.short}”? Here are the key takeaways, and how STEPBAE can help with your case.`,
            next: `art-${a.slug}`,
          },
    ]),
  ),
}
const hintSteps = Object.fromEntries(
  Object.entries(topics).map(([id, t]) => [
    `hint-${id}`,
    { say: [t.say], options: [{ label: 'Yes, show me', next: t.next }, { label: 'Something else', next: 'start' }] },
  ]),
)

// what the Mini Steps learned from each Insights article: the gist and takeaways, then the step it leads to, with the
// article to read in full; patients are also offered a ready note for their dentist
const articleSteps = Object.fromEntries(
  articleKnowledge.map((a) => [
    `art-${a.slug}`,
    {
      say: [a.say],
      ...(a.tips.length && { list: a.tips }),
      options: [
        ...a.next,
        ...(a.post.audience === 'patients' ? [{ label: 'Write a note to my dentist', href: dentistNote }] : []),
        { label: 'Read the full article', href: a.post.href },
        { label: 'Another topic', next: a.post.audience === 'patients' ? 'insights-patients' : 'insights-dentists' },
      ],
    },
  ]),
)

// one word from the Dental Terms guide, explained the way the guide explains it
const termSteps = Object.fromEntries(
  glossary.map((t) => [
    `term-${t.id}`,
    {
      say: [`${t.term}: ${t.meaning}`],
      options: [
        { label: 'Ask about another word', next: 'term-ask' },
        { label: 'Read the full guide', href: t.href },
        { label: 'Ask my dentist for STEPBAE', next: 'patient-ask' },
      ],
    },
  ]),
)

const steps = {
  start: {
    say: [
      'Hi, we’re the Mini Steps, welcome to STEPBAE.com! We are here to serve you!',
      'What brings you here today?',
    ],
    options: [
      { label: 'I’m a dentist: send a case', next: 'case-start' },
      { label: 'Why choose STEPBAE?', next: 'why' },
      { label: 'Get our price list', next: 'lead-price' },
      { label: 'I’m a patient', next: 'patient' },
      { label: 'Consulting & courses', next: 'consulting' },
      { label: 'Learn from our articles', next: 'insights' },
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
      'Of course. STEPBAE can provide prepaid shipping labels. Fill out the partnership form and mention that you’ll send physical impressions or models, and we’ll send the labels with our Rx form.',
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
      'Standard turnaround is 10 business days from the day STEPBAE receives your case.',
      'Rush cases are only taken by arrangement, at a premium rush rate, so please ask before you prep.',
    ],
    options: [
      { label: 'Ask about a rush', next: 'lead-talk' },
      { label: 'Send a case', next: 'case-start' },
      { label: 'Get our price list', next: 'lead-price' },
    ],
  },
  // the Dentist Partnership page's FAQ, answered from the page itself
  ...Object.fromEntries(
    partnerFaqs.map((f) => [
      `lab-${f.id}`,
      {
        say: [f.a],
        options: [
          { label: 'Send a case', next: 'case-start' },
          { label: 'Get our price list', next: 'lead-price' },
          { label: 'Talk to STEPBAE', next: 'lead-talk' },
        ],
      },
    ]),
  ),
  // these two start a lead: the questions come from leadFlows below (the options only show if the visitor
  // comes back to the chat mid-way, since unsent answers aren't kept)
  'lead-price': {
    note: shareNote,
    say: ['We’d be happy to send you our current price list! We just need a few quick details.'],
    lead: 'price',
    options: [
      { label: 'Get the price list', next: 'lead-price' },
    ],
  },
  'lead-talk': {
    note: shareNote,
    say: ['STEPBAE would love to hear from you! A few quick questions, and we’ll get back to you personally.'],
    lead: 'talk',
    options: [
      { label: 'Leave a message', next: 'lead-talk' },
    ],
  },
  'lead-consult': {
    note: shareNote,
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
      'STEPBAE helps practices, labs and event hosts in four ways. What are you hoping to achieve?',
    ],
    options: [
      ...services.map((s) => ({ label: serviceName(s), next: `svc-${s.id}` })),
      { label: 'Ways to work together', next: 'formats' },
      { label: 'How it works', next: 'process' },
      { label: 'Upcoming events', next: 'events' },
      { label: 'Common questions', next: 'faq' },
    ],
  },
  ...serviceSteps,
  formats: {
    say: ['Every team and every event is different, so pick one, combine a few, or tell us what you have in mind:'],
    list: formats.map((f) => `${f.title} (${f.where.join(' or ').toLowerCase()}): ${f.text.replace('Step visits', 'STEPBAE visits')}`),
    options: [
      { label: 'Plan it with us', next: 'lead-consult' },
      { label: 'How it works', next: 'process' },
      { label: 'Common questions', next: 'faq' },
    ],
  },
  process: {
    say: ['It’s simple from the start:'],
    list: [
      'Tell us what you need, here in the chat or with the form',
      'Talk it through with STEPBAE: your team, your cases, and what success looks like',
      'Get your plan: the format, the dates, the topics, and what your team will need',
      'Let’s work together: at your practice or lab, online, or on your stage',
    ],
    options: [
      { label: 'Start now', next: 'lead-consult' },
      { label: 'Ways to work together', next: 'formats' },
      { label: 'Common questions', next: 'faq' },
    ],
  },
  faq: {
    say: ['Happy to help! What would you like to know?'],
    options: [...faqs.map((f) => ({ label: f.q, next: `faq-${f.id}` })), { label: 'Ask STEPBAE directly', next: 'lead-consult' }],
  },
  ...faqSteps,
  events: {
    say: upcoming.length ? ['Here’s where you can catch STEPBAE next:'] : ['New dates are on the way! Want to bring a course or talk to your own event?'],
    list: eventLines,
    options: [
      // registration on the organizer's site, where there's a link
      ...upcoming.filter((ev) => ev.link).map((ev) => ({ label: `Register for ${ev.short ?? ev.title}`, href: ev.link })),
      { label: 'Book STEPBAE for your event', next: 'lead-consult', preset: { Inquiry: 'Lecture or speaking' } },
      { label: 'All courses & events', href: '/consultation.html#events' },
    ],
  },
  ...hintSteps,
  insights: {
    say: [
      'Our Insights library has articles from the bench, for dentists and for patients. We’ve read them all, so ask us anything, or pick a topic.',
      'Who are you reading for?',
    ],
    options: [
      { label: 'I’m a dentist', next: 'insights-dentists' },
      { label: 'I’m a patient', next: 'insights-patients' },
      { label: 'Published in journals', next: 'journal' },
      { label: 'See all articles', href: '/insights.html#latest' },
    ],
  },
  'insights-dentists': {
    say: ['What would you like to know more about?'],
    options: [
      ...dentistArticles.map((a) => ({ label: a.short, next: `art-${a.slug}` })),
      { label: 'Published in journals', next: 'journal' },
    ],
  },
  'insights-patients': {
    say: ['What would you like to know more about?'],
    options: [
      ...patientArticles.map((a) => ({ label: a.short, next: `art-${a.slug}` })),
      { label: 'Ask my dentist for STEPBAE', next: 'patient-ask' },
    ],
  },
  journal: {
    say: [
      'STEPBAE’s cases have been published in dental journals including Inside Dental Technology, LMT and Spectrum Dialogue. These you can read online:',
    ],
    options: [
      ...journalArticles.map((p) => ({ label: p.title, href: p.href })),
      { label: 'All articles', href: '/insights.html#latest' },
      { label: 'Send a case', next: 'case-start' },
    ],
  },
  ...articleSteps,
  ...termSteps,
  'term-ask': {
    say: ['Type any dental word and we’ll explain it simply, like “what is an abutment?” or “what does occlusion mean?”'],
    options: [{ label: 'Read the full guide', href: glossary[0]?.href }, { label: 'Something else', next: 'start' }],
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
      { label: 'Ask about a topic', next: 'insights' },
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
// the next question from `from` on that isn't answered yet (a preset answer skips its question)
const nextOpen = (fields, answers, from) => {
  let i = from
  while (i < fields.length && answers[leadFields[fields[i]].key] !== undefined) i++
  return i
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
  // a dental word asked as a definition ("what is an abutment?"), then the Insights articles, ahead of the broader
  // lab rules that share their words (shade, impression, crown)
  ...glossary.map((t) => [t.words, `term-${t.id}`]),
  ...articleKnowledge.map((a) => [a.words, `art-${a.slug}`]),
  [/scanner|portal|connect/, 'scanner'],
  [/impression|model|ship|mail in|physical/, 'case-physical'],
  [/checklist|include|shade|photo|prescription|\brx\b/, 'checklist'],
  // the FAQ's own words, then consulting, courses and events, ahead of the lab rules that share their words
  ...faqs.map((f) => [f.words, `faq-${f.id}`]),
  [/published|journal|magazine|publication/, 'journal'],
  [/\baes\b|lab ?day|upcoming|schedule|chicago|register|registration/, 'events'],
  [/how (does )?(consulting|coaching) work|consulting process|how do we start/, 'process'],
  [/format|ways to work|webinar/, 'formats'],
  [/workflow|exocad|\bcad\b|milling|digital lab/, 'svc-workflow'],
  [/train|hands-on|hands on|workshop|all-on-x|all on x|cutback|layering|stain|glaze/, 'svc-training'],
  [/case planning|complex case|complicated|difficult case|second opinion|case review|treatment plan/, 'svc-planning'],
  [/keynote|lecture|live demo|\bdemo\b|conference|speaker|sponsor|study club|event/, 'svc-speaking'],
  [/price|pricing|cost|fee|how much|quote|expensive|cheap/, 'lead-price'],
  [/rush|urgent|expedite|asap/, 'lab-rush'],
  [/turnaround|how long|how fast|days|weeks|deadline/, 'turnaround'],
  [/warrant|guarantee/, 'lab-warranty'],
  [/shipping|label|fedex|ups|courier/, 'case-physical'],
  [/already have|current lab|another lab|other lab|switch/, 'switching'],
  [/why|better|different|quality|choose|experience|reviews?/, 'why'],
  [/talk|speak|human|person|call me|step bae/, 'lead-talk'],
  [/case|send|submit|start|partner|account/, 'case-start'],
  [/patient|my teeth|my dentist|my crown|my veneer/, 'patient'],
  [/book|hire|invite/, 'lead-consult'],
  [/course|consult|class|educat/, 'consulting'],
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
  '/consultation.html': 'Planning a course, a consultation or an event? We’ll help you find the right fit.',
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
  // the Mini Steps follow along: the section the visitor is reading now (`data-chat-topic`), and the last one they
  // offered help with, so they suggest each topic once
  const [topic, setTopic] = useState(null)
  const [offered, setOffered] = useState(saved?.offered ?? [])
  useEffect(() => {
    const seen = new Map()
    const watch = new IntersectionObserver(
      (entries) => {
        for (const e of entries) seen.set(e.target, e.intersectionRatio)
        // the section filling most of the screen
        const [best] = [...seen].filter(([, r]) => r > 0.25).sort((a, b) => b[1] - a[1])
        if (best) setTopic(best[0].dataset.chatTopic)
      },
      { threshold: [0, 0.25, 0.5, 0.75] },
    )
    document.querySelectorAll('[data-chat-topic]').forEach((el) => watch.observe(el))
    return () => watch.disconnect()
  }, [])
  // the lead as it stands, so whatever was answered can still be sent if the visitor leaves partway
  const leadRef = useRef(null)
  useEffect(() => {
    leadRef.current = lead
  }, [lead])

  useEffect(
    () => save({ open, messages: messages.filter((m) => !m.lead && !m.private && !m.thinking), greeted, offered }),
    [open, messages, greeted, offered],
  )
  useEffect(() => {
    if (greeted || open) return
    const t = setTimeout(() => setTeaser(true), 4000)
    return () => clearTimeout(t)
  }, [greeted, open])
  const toggle = () => {
    // opening on a section they haven't been offered help with yet: the Mini Steps notice and offer it, unless a
    // lead is in the middle of being answered
    if (!open && topics[topic] && !offered.includes(topic) && !lead) {
      setOffered((o) => [...o, topic])
      say(botMessage(`hint-${topic}`))
    }
    setOpen((o) => !o)
    setTeaser(false)
    setGreeted(true)
  }
  // with the chat open, the Mini Steps keep following along: once the visitor settles on a new section (a moment's
  // pause, so scrolling past doesn't count), they offer its help; an earlier offer left unanswered is replaced rather
  // than stacked, and nothing interrupts a lead being answered
  useEffect(() => {
    if (!open || !topics[topic] || offered.includes(topic) || lead) return
    const t = setTimeout(() => {
      setOffered((o) => [...o, topic])
      setMessages((m) => {
        const last = m[m.length - 1]
        const rest = last?.step?.startsWith('hint-') ? m.slice(0, -1) : m
        return [...rest, botMessage(`hint-${topic}`)]
      })
    }, 1200)
    return () => clearTimeout(t)
  }, [open, topic, offered, lead])
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
    if (!l || l.sending || !Object.entries(l.answers).some(([k, v]) => v && !l.preset?.includes(k))) return
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
  // `preset` answers some of a lead's questions up front (a service's topic), so they aren't asked again
  const go = (label, next, preset = {}) => {
    sendUnfinished()
    const step = steps[next]
    const msgs = [{ from: 'user', text: label }, botMessage(next)]
    if (step?.portal) prefill.add({ Portal: step.portal })
    if (step?.lead) {
      const fields = leadFlows[step.lead].fields
      const i = nextOpen(fields, preset, 0)
      setLead({ flow: step.lead, answers: { ...preset }, preset: Object.keys(preset), i, editing: null, sending: false })
      msgs.push(askMessage(preset, fields[i]))
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
    next.i = lead.editing ? fields.length : nextOpen(fields, next.answers, lead.i + 1)
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

  // a typed question no keyword matches goes to the AI, with the last few AI questions and answers for context;
  // anything but an answer (no server, an error, a declined question) shows the scripted answer instead
  const [asking, setAsking] = useState(false)
  const askAi = async (question) => {
    sendUnfinished()
    setLead(null)
    const history = messages
      .filter((m) => m.ai)
      .slice(-3)
      .flatMap((m) => [{ role: 'user', text: m.q }, { role: 'assistant', text: m.text }])
    say({ from: 'user', text: question }, { from: 'bot', thinking: true })
    setAsking(true)
    let reply = botMessage('unknown')
    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question, history }),
        signal: AbortSignal.timeout(30_000),
      })
      const data = res.ok && (await res.json())
      if (data?.answer) reply = { from: 'bot', ai: true, q: question, text: data.answer }
    } catch {
      /* no server or no answer: the scripted reply stands */
    }
    setMessages((m) => [...m.filter((x) => !x.thinking), reply])
    setAsking(false)
  }

  const send = (e) => {
    e.preventDefault()
    const t = text.trim()
    if (!t || asking) return
    setText('')
    if (waitingOn) return answer(t)
    const step = matchStep(t)
    if (step === 'unknown') askAi(t.slice(0, 500))
    else go(t, step)
  }
  const restart = () => {
    sendUnfinished()
    setLead(null)
    setMessages([botMessage('start')])
  }
  const pitch = topics[topic]?.pitch ?? pitches[window.location.pathname] ?? defaultPitch

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
              ) : m.thinking ? (
                <ThinkingTurn key={i} />
              ) : m.ai ? (
                <AiTurn key={i} message={m} active={i === last} onChoose={go} />
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
            <button type="submit" disabled={asking} aria-label="Send" className="rounded-[3px] bg-gold px-3 text-ink hover:bg-gold-light disabled:opacity-60">
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
          // the same sky blue as the Mini Steps' backdrop, with the gold ring, so the two read as one
          <span
            className="rounded-full border border-gold px-2.5 py-1 text-[11px] font-medium text-white shadow-[0_10px_30px_-8px_rgba(0,0,0,0.7)] group-hover:brightness-110"
            style={{ background: 'linear-gradient(180deg, #8fb0c4 0%, #5b7c91 55%, #2e4250 100%)' }}
          >
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

// an AI answer to a typed question, marked as one, with a way to reach a person or go back to the menu
const aiOptions = [
  { label: 'Talk to STEPBAE', next: 'lead-talk' },
  { label: 'Show me the menu', next: 'start' },
]
function AiTurn({ message, active, onChoose }) {
  return (
    <div className="flex max-w-[96%] gap-2">
      <Avatar crew size="h-8 w-8" still className="mt-0.5 ring-1" />
      <div className="min-w-0 space-y-2">
        <p className="w-fit whitespace-pre-line rounded-[12px] rounded-bl-[3px] bg-cream px-3 py-2 text-[14px] leading-snug text-ink">{message.text}</p>
        <p className="px-1 text-[12px] italic leading-snug text-white/55">
          Answered by AI, so it may not be perfect. Please don’t share health or personal details here.{' '}
          <a href="/privacy.html" className="underline underline-offset-2 hover:text-gold">Privacy</a>
        </p>
        {active && (
          <div className="flex flex-wrap gap-2 pt-1">
            {aiOptions.map((o) => (
              <button key={o.label} onClick={() => onChoose(o.label, o.next)} className={chip}>
                {o.label}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

// while the AI answer is on its way
function ThinkingTurn() {
  return (
    <div className="flex max-w-[96%] gap-2" aria-label="The Mini Steps are thinking">
      <Avatar crew size="h-8 w-8" still className="mt-0.5 ring-1" />
      <p className="flex w-fit gap-1 rounded-[12px] rounded-bl-[3px] bg-cream px-3 py-3">
        {[0, 150, 300].map((delay) => (
          <span key={delay} className="h-1.5 w-1.5 animate-bounce rounded-full bg-ink/50 motion-reduce:animate-none" style={{ animationDelay: `${delay}ms` }} />
        ))}
      </p>
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
        {step.note && <p className="px-1 text-[12px] italic leading-snug text-white/55">{step.note}</p>}
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
                  {...(o.href.startsWith('http') && { target: '_blank', rel: 'noopener noreferrer' })}
                  className="inline-flex items-center gap-1.5 rounded-full bg-gold px-3 py-1.5 text-[13px] font-medium text-ink hover:bg-gold-light"
                >
                  {o.label} <ArrowRight className="h-3 w-3" />
                </a>
              ) : (
                <button key={o.label} onClick={() => onChoose(o.label, o.next, o.preset)} className={chip}>
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
