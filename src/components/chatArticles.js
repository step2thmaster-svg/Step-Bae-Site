import { posts, insights } from './insights.js'

// What the Mini Steps have learned from each Insights article, in their own words (they speak for STEPBAE, never as
// Step): the gist, a few takeaways, the words a visitor might type to ask about it, and the next step each one leads
// to. `next` options are chat steps; `href` options open a page. A new article needs an entry here to be known.
const forDentists = [
  { label: 'Send a case', next: 'case-start' },
  { label: 'Discuss a case first', next: 'lead-talk' },
]
const forPatients = [
  { label: 'Ask my dentist for STEPBAE', next: 'patient-ask' },
]

export const articleKnowledge = [
  {
    slug: 'dental-terms-explained',
    short: 'Dental terms explained',
    words: /what (does|is) .*mean|dental (terms|words|vocabulary|glossary)|glossary|terminology|jargon/,
    say: 'Dental visits come with a lot of new words. Our simple guide explains the common ones, like crown, veneer, implant, abutment and shade, so you can follow along and ask good questions. Ask us about any word, like “what is an abutment?”',
    tips: [
      'Parts of a tooth: enamel, dentin, pulp, root and gums',
      'Restorations: fillings, crowns, veneers, bridges, implants and All-on-X',
      'Materials: ceramic, zirconia and lithium disilicate',
      'There are no silly questions: ask your dentist what a word means for your teeth',
    ],
    next: forPatients,
  },
  {
    slug: 'dental-terms-a-closer-look',
    short: 'Dental terms, part 2',
    words: /(part 2|advanced|more) (dental )?(terms|words)|tooth (numbers?|numbering|surfaces?)|teeth numbers?|mesial|distal|buccal|lingual|overbite|overjet|crossbite|inlay|onlay|hue|chroma|translucen|buccal corridor/,
    say: 'Our second guide to dental words goes a step further, with simple illustrations: the sides of a tooth, tooth numbers, inlays and onlays, overbite and overjet, and the color words dentists and labs use.',
    tips: [
      'Every tooth has five sides: facial, lingual, mesial, distal and occlusal (an “MOD” filling covers three)',
      'Adult teeth are numbered 1 to 32 in the US, starting with the upper right wisdom tooth',
      'Inlays and onlays cover only part of a tooth, so more of your natural tooth is kept',
      'Shade has three parts: hue, value and chroma, plus translucency at the edge',
    ],
    next: forPatients,
  },
  {
    slug: 'implant-crowns-and-all-on-x',
    short: 'Implants & All-on-X',
    words: /^(?!.*(course|train|class|workshop|hands.?on)).*(implant|all.?on.?(x|4|four|6|six)|full.?arch|hybrid|screw.?retained|pink (ceramic|porcelain|gingiva)|ti.?base|scan bod)/,
    say: 'An implant restoration is only as good as the plan behind it. STEPBAE makes single implant crowns through full-arch bridges, with natural-looking pink ceramic gingiva.',
    tips: [
      'Single crowns depend on a natural emergence profile; screw retention is favored when the access allows',
      'Full-arch cases are planned from the smile back to the implants, with enough restorative space',
      'Send the implant system, scan bodies, a scan of the approved provisional and photos',
    ],
    next: [{ label: 'Plan an implant case', next: 'lead-talk' }, { label: 'Send a case', next: 'case-start' }],
  },
  {
    slug: 'posterior-crowns-and-bridges',
    short: 'Posterior crowns & bridges',
    words: /posterior|molar|premolar|bicuspid|bridge|pontic|connector|occlusion|high bite|bite (is )?high|contacts? (open|tight)/,
    say: 'Posterior work is judged by the bite before the smile. STEPBAE chooses the material for the tooth and the patient, and builds natural anatomy for function.',
    tips: [
      'Monolithic zirconia for molars and grinders; layered zirconia or lithium disilicate where the tooth shows',
      'Cusps and grooves are built in, not ground in afterwards',
      'Send a clear bite scan and notes on grinding or past fractures',
    ],
    next: [{ label: 'Ask which fits my case', next: 'lead-talk' }, { label: 'Send a case', next: 'case-start' }],
  },
  {
    slug: 'morphopsychology-teeth-that-fit-the-person',
    short: 'Morphopsychology',
    words: /morpho|tooth form|tooth shape|face shape|fit (the|my) (face|person|patient)|personality|remake/,
    say: 'A smile can be perfectly proportioned and still look borrowed. Morphopsychology is how STEPBAE chooses tooth form for the person: the face, the smile, age and character all guide the design.',
    tips: [
      'Strong, straight features suit straighter line angles; soft features suit rounder forms',
      'Proportion sets the size of the teeth; the person sets their shape',
      'A five-step protocol (plan, communicate, set expectations, check every step, follow up) keeps remakes rare',
    ],
    next: [{ label: 'Plan an esthetic case', next: 'lead-talk' }, { label: 'Send a case', next: 'case-start' }],
  },
  {
    slug: 'natural-looking-ceramic-restorations',
    short: 'Natural-looking ceramics',
    words: /natural.?looking|translucen|texture|luster|lustre|lifelike|life.?like|look(s)? (fake|artificial)/,
    say: 'Shade is only the start. What makes ceramics disappear in the smile is value, translucency, texture and form, and the information that travels with the case.',
    tips: [
      'Take the shade early, value first, before the teeth dry out',
      'Send the stump shade for any all-ceramic work',
      'Photos with raking light and against black show texture and translucency',
    ],
    next: [{ label: 'What to send with a case', next: 'checklist' }, ...forDentists],
  },
  {
    slug: 'shade-matching-for-dental-crowns',
    short: 'Shade matching',
    words: /shade (match|tab|guide|taking|selection)|stump shade|take (a|the) shade|match(ing)? (the )?shade/,
    say: 'Most shade problems start before the ceramic: how the shade was taken, the light it was taken in, and what reached the lab.',
    tips: [
      'Hold shade tabs edge to edge with the tooth, in the same plane, labels visible',
      'Use daylight-corrected light, not the operatory light',
      'Always include the stump shade and an unedited photo with tabs in frame',
    ],
    next: [{ label: 'What to send with a case', next: 'checklist' }, { label: 'Ask about a shade', next: 'lead-talk' }],
  },
  {
    slug: 'zirconia-vs-layered-ceramic',
    short: 'Zirconia or layered?',
    words: /zirconia|monolithic|layered (crown|ceramic|zirconia)|strong(er|est)? crown|bruxi/,
    say: 'Layered ceramic looks more natural; monolithic zirconia is far stronger. The right choice depends on the case in front of you, not on which material is “best”.',
    tips: [
      'High-esthetic anterior cases usually favor layered ceramic',
      'A heavy bite, grinding or posterior load favors zirconia',
      'Zirconia with a layered facial is a middle ground',
    ],
    next: [{ label: 'Ask which fits my case', next: 'lead-talk' }, { label: 'Get our price list', next: 'lead-price' }],
  },
  {
    slug: 'ceramic-layering-on-a-refractory-model',
    short: 'Refractory veneers',
    words: /refractory|feldspathic|platinum foil|foil veneer|no.?prep|minimal(ly)? prep|thin veneer/,
    say: 'When pressed ceramics and platinum foil can’t deliver what a case needs, STEPBAE layers feldspathic ceramic directly on a refractory model, for very thin, lifelike veneers.',
    tips: [
      'Suited to thin, minimally prepared veneers',
      'Every layer is built by hand, so translucency goes exactly where it belongs',
      'It works best with an accurate impression or scan and clear notes on the case',
    ],
    next: forDentists,
  },
  {
    slug: 'diagnostic-wax-up-key-to-treatment-acceptance',
    short: 'Diagnostic wax-ups',
    words: /wax.?up|mock.?up|treatment acceptance|case acceptance|golden proportion|preview (the|my) smile/,
    say: 'A diagnostic wax-up lets the patient see the result before treatment, and it’s often what helps them say yes.',
    tips: [
      'Send accurate models or scans, a face-bow or stick bite, bite registrations and photos',
      'Proportion and the shape of the face guide the design',
      'The wax-up then becomes the prep guide and the provisionals',
    ],
    next: [{ label: 'Request a wax-up', next: 'lead-talk' }, { label: 'Send a case', next: 'case-start' }],
  },
  {
    slug: 'how-to-submit-a-digital-case',
    short: 'Sending a digital case',
    words: /how (do i|to) (submit|send) a (digital )?case|scan files|\bstl\b|\bply\b/,
    say: 'Sending a digital case is simple: connect your scanner once, then send the scans, prescription, shade and photos.',
    tips: [
      'Connect STEPBAE in your scanner’s portal once',
      'Both full arches and a bite scan, even for a single crown',
      'Prescription, shade map with stump shade, and photos with shade tabs',
    ],
    next: [{ label: 'Connect my scanner', next: 'scanner' }, { label: 'Send a case', next: 'case-start' }],
  },
  {
    slug: 'why-some-crowns-look-more-natural',
    short: 'Why some crowns look natural',
    words: /crowns? look (more )?natural|natural crown|why (do )?some crowns|crown.*(fake|natural)/,
    say: 'Two crowns can share the same shade on paper and look nothing alike. The difference is depth of color, shape, surface detail, and the care the dentist and lab take together.',
    tips: [
      'Natural teeth have depth: more color near the gum, translucency at the edge',
      'Every tooth has its own shape and surface texture',
      'The dentist’s photos and notes are what let the lab match them',
    ],
    next: [{ label: 'I’m a dentist: send a case', next: 'case-start' }, { label: 'I’m a patient: ask my dentist', next: 'patient-ask' }],
  },
  {
    slug: 'why-is-my-crown-a-different-color',
    short: 'Why my crown doesn’t match',
    words: /different colou?r|doesn.?t match|don.?t match|match my (other )?teeth|whiten|bleach|crown.*(dark|yellow|grey|gray|white)/,
    say: 'A crown that doesn’t match can have several causes: your natural teeth change while a crown doesn’t, whitening doesn’t change crowns, what’s underneath can show through, and lighting plays tricks.',
    tips: ['Your dentist is the best person to tell you which one applies to yours'],
    next: forPatients,
  },
  {
    slug: 'crown-vs-veneer',
    short: 'Crown or veneer?',
    words: /crown or (a )?veneer|veneer or (a )?crown|crowns? vs|difference between (a )?(crown|veneer)/,
    say: 'Crowns and veneers can both give you a beautiful smile, but they do different jobs: a crown covers the whole tooth, while a veneer covers the front surface. Your dentist decides which your tooth needs.',
    tips: [],
    next: forPatients,
  },
  {
    slug: 'veneers-vs-braces-or-clear-aligners',
    short: 'Veneers or braces?',
    words: /braces|aligner|invisalign|orthodont|straighten/,
    say: 'Veneers change how your teeth look; braces and clear aligners change where your teeth are. Sometimes the answer is both, and your dentist can tell you which fits.',
    tips: [],
    next: forPatients,
  },
]
  // each article's own page, audience and title, from the Insights library
  .map((a) => ({ ...a, post: posts.find((p) => p.slug === a.slug) }))
  .filter((a) => a.post)

// every word the two Dental Terms guides explain ("Term (other name): meaning"), so the Mini Steps can answer
// "what is an abutment?" with the guide's own plain-language definition, and link to the guide it comes from
const termsGuides = ['dental-terms-explained', 'dental-terms-a-closer-look'].map((slug) => posts.find((p) => p.slug === slug)).filter(Boolean)
const pattern = (name) =>
  name
    .toLowerCase()
    .replace(/ teeth$/, '')
    .replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
    .replace(/[- ]/g, '.?')
export const glossary = termsGuides
  .flatMap((guide) => guide.body.flatMap((block) => block.list ?? []).map((item) => [item, guide.href]))
  .map(([item, href]) => {
    const [, term, other, meaning] = item.match(/^([^:(]+?)(?: \(([^)]+)\))?: (.+)$/)
    const names = [term, other].filter(Boolean).map(pattern).join('|')
    return {
      id: term.toLowerCase().replace(/[^a-z]+/g, '-'),
      term: other ? `${term} (${other})` : term,
      meaning: meaning.charAt(0).toUpperCase() + meaning.slice(1),
      // asked as a definition: "what is…", "what does … mean", "define…", "meaning of…"
      words: new RegExp(`(what('?s| is| are| does)|define|meaning of|explain)\\W+(an? |the |my )?(${names})s?\\b|\\b(${names})s?\\W+(mean|definition)`),
      href,
    }
  })

// Step's journal articles that can be read online
export const journalArticles = insights.filter((p) => p.external)

// the topic menus: who each article is for
export const dentistArticles = articleKnowledge.filter((a) => a.post.audience !== 'patients')
export const patientArticles = articleKnowledge.filter((a) => a.post.audience !== 'dentists')
