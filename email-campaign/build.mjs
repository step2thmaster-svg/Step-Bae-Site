// The content of every STEPBAE email. The design lives in templates.mjs.
// Edit here, then run:  PATH=~/.nvm/versions/node/v24.22.1/bin:$PATH node email-campaign/build.mjs
// Each email is written to email-campaign/emails/<file>.html, ready to paste into the sending tool's HTML editor.
// Anything in [[double brackets]] still needs filling in; it shows highlighted until it's replaced.
import { mkdirSync, writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { special, letter, insights, event } from './templates.mjs'

// ---- the November campaign (layout: special) ------------------------------------------------------------------------
// Step's decisions: 15% off the first case of each theme; sends shifted one week; from info@stepbae.com.

const campaign = [
  {
    file: 'campaign-1-november',
    send: 'Wed Nov 11',
    subjects: ['Your cases deserve more than a production lab', 'Dr. {{LastName}}, 15% off your first case with STEPBAE Dental Lab'],
    preheader: '15% off your first case this November. Perfect contacts, the best veneers, predictable posterior work.',
    eyebrow: 'New Practice Special',
    headline: 'Your cases deserve more than a production lab.',
    image: ['/images/case-anterior-veneers.jpg', 'Two upper central incisors restored with natural layered ceramic'],
    caption: 'Layered ceramic on #8 and #9, made at STEPBAE Dental Lab.',
    intro: ['STEPBAE Dental Lab is a team of highly trained technicians, led by master ceramist Step Bae, CDT, DTG. We plan every case with you, and you always talk directly with the technician making it. That’s how we deliver the same quality case after case.'],
    points: [
      ['Contacts that are right every time', 'perfect, accurate mesial and distal contacts on every crown, so you’re not adjusting chairside'],
      ['The best veneers you’ll place', 'feldspathic layered on a refractory model or pressed lithium disilicate, thin and lifelike, matched to your patient'],
      ['Predictable posterior work', 'monolithic or layered zirconia chosen for the bite, backed by a 5-year warranty'],
    ],
    offer: '15% off your first case',
    cta: 'Send My First Case',
    quote: ['I’d tried several world-renowned labs looking for work I’d be proud to deliver. STEPBAE’s anterior work is the most natural I’ve seen. I had STEPBAE make my own veneers as well.', 'Dr. Paul Bylis, DDS · Glen Burnie, MD'],
  },
  {
    file: 'campaign-2-posterior',
    send: 'Mon Nov 16',
    subjects: ['Posterior crowns that seat the first time', 'Dr. {{LastName}}, how much chair time goes to adjusting crowns?'],
    preheader: '15% off your first posterior crown or bridge. Monolithic or layered zirconia, chosen for the bite.',
    eyebrow: 'Posterior Special',
    headline: 'Posterior work that seats the first time, every time.',
    image: ['/images/case-posterior-bridge.jpg', 'Four handmade posterior crowns on a stone model, with natural cusps and grooves'],
    caption: 'Cusps and grooves built in, not ground in afterward.',
    intro: [
      'A crown that’s a little high or a contact that’s a little open costs you chair time and your patient’s confidence. At STEPBAE Dental Lab, our team builds posterior work so that doesn’t happen.',
      'We choose the material for the bite and build the anatomy in from the start, so your crowns go in without adjusting.',
    ],
    points: [
      ['Perfect contacts, every time', 'accurate mesial and distal contacts on every crown, with no chairside adjusting'],
      ['A bite that works', 'occlusion built in, with no interferences in lateral and protrusive movements'],
      ['Strength you can rely on', 'monolithic zirconia for molars, heavy bites and grinders. Nothing to chip.'],
      ['Bridges built to last', 'strong connectors and cleansable, convex pontics, backed by a 5-year warranty'],
    ],
    offer: '15% off your first posterior crown or bridge',
    cta: 'Send My Posterior Case',
    quote: ['I had to leave a long relationship with my previous lab because their full zirconia crowns were not seating and I had to make too many adjustments. Now I don’t have that problem.', 'Dr. J.S. Lim, DDS · New York, NY'],
  },
  {
    file: 'campaign-3-all-on-x',
    send: 'Fri Nov 20',
    subjects: ['All-on-X that doesn’t look like plastic', 'Dr. {{LastName}}, your next full-arch case'],
    preheader: '15% off your first All-on-X case. Planned from the smile back, with hand-layered pink ceramic.',
    eyebrow: 'All-on-X Special',
    headline: 'Full-arch cases that look natural, not plastic.',
    image: ['/images/gallery/work-02.jpg', 'A full-arch implant restoration, upper and lower, with natural-looking teeth and pink gingiva'],
    caption: 'Upper and lower full-arch zirconia with hand-layered pink ceramic.',
    intro: [
      'Flat, uniform pink is what makes most full-arch cases look artificial. At STEPBAE Dental Lab, our team layers pink ceramic by hand, lighter over the roots and deeper in the vestibule, so the eye accepts the gums and goes straight to the smile.',
      'Every case is planned with you, from the smile back to the implants, before anything is designed.',
    ],
    points: [
      ['Planned before it’s made', 'incisal edge, smile line, lip support and vertical dimension set with you before design'],
      ['Your provisional is the blueprint', 'the approved look, speech and bite carry into the final'],
      ['Built for hygiene', 'a smooth, convex underside your patient can clean'],
      ['Implant crowns that fit perfectly', 'screw-retained zirconia on a titanium base, with a natural emergence profile'],
    ],
    offer: '15% off your first All-on-X case',
    terms: '5-year warranty &middot; through Nov 30',
    cta: 'Plan My All-on-X Case',
    quote: ['What sets STEPBAE apart is the relationship that we built over the years. When I have a question about a complex case, I get a prompt answer from the technician, who is proficient. It’s like having a reliable partner.', 'Dr. Brandon O’Neal, DMD · Alpharetta, GA'],
  },
  {
    file: 'campaign-4-wax-up',
    send: 'Tue Nov 24',
    subjects: ['Let your patient see the smile before they say yes', 'Dr. {{LastName}}, a tool for case acceptance'],
    preheader: '15% off your first diagnostic wax-up. It sells the case, then becomes your prep guide.',
    eyebrow: 'Diagnostic Wax-up Special',
    headline: 'Let your patient see the result before they commit.',
    image: ['/images/case-all-on-x.jpg', 'Restored upper front teeth with natural layered ceramic'],
    caption: 'Natural layered ceramic, made at STEPBAE Dental Lab.',
    intro: ['Patients say yes to what they can see. At STEPBAE Dental Lab, our team builds diagnostic wax-ups that show your patient their new smile before treatment begins, then keep working for you all the way to the final.'],
    points: [
      ['More patients say yes', 'they see the result, not just a description'],
      ['A precise prep guide', 'reduce only where the final restoration needs room'],
      ['No surprises at delivery', 'the same design becomes the provisionals, then the final'],
    ],
    offer: '15% off your first diagnostic wax-up',
    terms: 'Through Nov 30',
    cta: 'Request a Wax-up',
    quote: null,
  },
]

// ---- brand template samples (one per layout) ---------------------------------------------------------------------

const samples = [
  // letter: Concierge's welcome after a dentist says yes
  [letter, {
    file: 'template-letter-welcome',
    subjects: ['Welcome to STEPBAE Dental Lab, Dr. {{LastName}}', 'Next step: connecting your scanner'],
    preheader: 'Your 15% is set for your first case. Here’s how to send it.',
    paras: [
      'Thank you for giving STEPBAE Dental Lab a try. Our team is looking forward to your first case.',
      'Your <strong>15% discount</strong> is set for that first case. To get started, just tell us which intraoral scanner your office uses (we accept them all, including iTero, 3Shape TRIOS, Medit and Primescan) and we’ll send the connection steps. It takes about 5 minutes, and you only do it once.',
      'If you have a case coming up, send us a note about it first. We’re happy to talk through the shade, the prep or the plan before anything is made.',
    ],
    cta: ['Connect Your Scanner', '/partnership.html#portals'],
    ps: 'Standard turnaround is 10 business days from the day we receive your case, and every restoration has a 5-year warranty.',
    why: 'you asked to start working with STEPBAE Dental Lab',
  }],
  // letter: Mark's warm outreach to a dentist Step already knows
  [letter, {
    file: 'template-letter-warm',
    subjects: ['Good to reconnect, Dr. {{LastName}}', 'Since [[the course / event]]'],
    preheader: 'A quick note from Step at STEPBAE Dental Lab.',
    paras: [
      'It was great meeting you at [[the course / event]]. I’ve been thinking about [[something you discussed]].',
      'I wanted to let you know that STEPBAE Dental Lab is taking on a few new practices this November, with 15% off the first case. If you have an anterior, posterior or All-on-X case coming up where the details really matter, I’d love for our team to make it for you.',
      'Either way, it would be good to catch up. Just reply here.',
    ],
    cta: null,
    ps: null,
    why: 'we’ve met through STEPBAE’s courses and events',
  }],
  // insights: a digest of articles from stepbae.com/insights
  [insights, {
    file: 'template-insights',
    subjects: ['Three ways to more natural-looking restorations', 'From the bench: November Insights'],
    preheader: 'Translucency, tooth form that fits the person, and the wax-up that sells the case.',
    eyebrow: 'From the Bench · Insights',
    headline: 'What makes a restoration disappear in the smile.',
    intro: 'A few notes from the bench at STEPBAE Dental Lab this month, written for the dentists we work with.',
    articles: [
      { slug: 'natural-looking-ceramic-restorations', title: 'How to Get More Natural-Looking Ceramic Restorations', excerpt: 'Shade is only the start. Translucency, texture, form, good photographs and clear communication are what make a restoration disappear in the smile.', image: '/images/insights/natural-ceramics-texture.jpg', alt: 'Close-up of ceramic surface texture on anterior restorations' },
      { slug: 'morphopsychology-teeth-that-fit-the-person', title: 'Morphopsychology: Designing Teeth That Fit the Person', excerpt: 'A smile can be perfectly proportioned and still look like it belongs to someone else.', image: '/images/consult/digital-morphopsychology.jpg', alt: 'A smile design moving from finished restorations to the digital design' },
      { slug: 'diagnostic-wax-up-key-to-treatment-acceptance', title: 'Diagnostic Wax-up: Key to Treatment Acceptance', excerpt: 'Something the patient can see can be the deciding factor in whether they go ahead.', image: '/images/insights/wax-up-final-preview.jpg', alt: 'A diagnostic wax-up shown from the occlusal and front' },
    ],
    ps: 'Have a topic you’d like me to write about? Just reply.',
    why: 'you’re a dental professional who has worked with or heard from STEPBAE Dental Lab',
  }],
  // event: a lecture announcement (details from the site's Upcoming Courses & Events)
  [event, {
    file: 'template-event',
    audience: 'consulting', // speaking: the STEPBAE name, not the lab's
    subjects: ['See you in Chicago? AES 2027, Feb 24–25', 'Dr. {{LastName}}, I’m speaking at AES 2027'],
    preheader: 'I’m joining the program at the AES 72nd Annual Scientific Meeting in Chicago.',
    eyebrow: 'Upcoming Lecture',
    headline: 'The Cranio-Mandibular Complex: TMJ to Smile Design',
    image: ['/images/courses/aes-2027.jpg', 'AES 72nd Annual Scientific Meeting, February 24–25, 2027, Chicago, IL'],
    paras: ['I’m joining the program at the American Equilibration Society’s 72nd Annual Scientific Meeting in Chicago. If you’re attending, I’d love to meet you there.'],
    details: [
      ['Date', 'February 24–25, 2027'],
      ['Place', 'Chicago, IL'],
      ['My talk', 'Problem Solvers: Make Big Problems Small'],
      ['Session', '1:30–1:45 PM'],
    ],
    cta: ['Register for AES 2027', 'https://aes-tmj.glueup.com/event/aes-2027-annual-scientific-meeting-169267/'],
    ps: null,
    why: 'you’re a dental professional who has worked with or heard from STEPBAE',
  }],
]

// ---- write ---------------------------------------------------------------------------------------------------------

const out = join(dirname(fileURLToPath(import.meta.url)), 'emails')
mkdirSync(out, { recursive: true })
for (const [render, e] of [...campaign.map((e) => [special, e]), ...samples]) {
  writeFileSync(join(out, `${e.file}.html`), render(e))
  console.log(`${(e.send ?? '').padEnd(11)} ${e.file}.html  "${e.subjects[0]}"`)
}
