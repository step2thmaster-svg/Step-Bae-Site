// scanner photos: 3Shape, iTero and Medit images are the makers' own product and press photos
// (the main photo is iTero's);
// the Primescan photo is from Wikimedia Commons under CC BY 4.0
export default {
  slug: 'how-to-submit-a-digital-case',
  title: 'How to Submit a Digital Dental Case to STEPBAE',
  audience: 'dentists',
  topic: 'digital',
  date: '1/2026',
  excerpt:
    'A practical checklist for sending a digital case: the scan files, the prescription, shade information, photographs and the notes that help us get it right the first time.',
  image: '/images/insights/submit-dentist-patient.jpg',
  imageAlt: 'A smiling dentist talking with a relaxed patient beside an iTero scanner',
  imageCredit: { credit: 'Align Technology / itero.com', creditHref: 'https://itero.com/our-solutions/itero-lumina-for-general-dentists' },
  imageSmall: true, // only available at about 550px wide
  cta: {
    title: 'Ready to send your first digital case?',
    text: 'Connect your scanner to STEPBAE in a few minutes. Our step-by-step instructions cover iTero, 3Shape TRIOS, Medit and Primescan.',
    label: 'Connect Your Scanner',
    href: '/partnership.html#portals',
  },
  body: [
    {
      p: 'Most of the cases I receive now arrive as scans rather than impressions. Digital cases are faster and more accurate, but only when the right information travels with them. Here is what to send, and how to send it.',
    },
    { h2: '1. Connect your scanner once' },
    {
      p: 'Every major intraoral scanner can send cases straight to a lab through its own portal. You add STEPBAE as a lab or partner one time, and from then on you simply choose us when you send an order.',
    },
    {
      list: [
        'iTero: add STEPBAE in MyiTero under Settings and the Labs list.',
        '3Shape TRIOS: send a connection request to STEPBAE in 3Shape Unite or Communicate.',
        'Medit: add STEPBAE as a partner in Medit Link.',
        'Primescan and CEREC: add STEPBAE in the Dentsply Sirona Connect Case Center.',
      ],
    },
    {
      p: 'The full steps for each portal are on our Dentist Partnership page.',
    },
    {
      figure: '/images/insights/submit-3shape-trios.jpg',
      alt: 'A 3Shape TRIOS intraoral scanner wand',
      caption: '3Shape TRIOS. Cases go to STEPBAE through 3Shape Unite or Communicate.',
      credit: '3Shape / 3shape.com',
      creditHref: 'https://www.3shape.com/en/scanners/trios-6',
    },
    {
      figure: '/images/insights/submit-primescan.jpg',
      alt: 'A Dentsply Sirona Primescan intraoral scanner resting in its holder',
      caption: 'Dentsply Sirona Primescan. Cases go to STEPBAE through the Connect Case Center.',
      credit: 'Викидим / Wikimedia Commons',
      creditHref: 'https://commons.wikimedia.org/wiki/File:Dentsply_Sirona_Primescan_intraoral_scanner_01.jpg',
      license: 'CC BY 4.0',
      licenseHref: 'https://creativecommons.org/licenses/by/4.0/',
    },
    { h2: '2. The scan files' },
    {
      list: [
        'Scan both full arches and a bite scan on both sides, even for a single crown.',
        'Make sure every margin is clearly captured: retract and control bleeding first, and rescan any area where the margin is unclear.',
        'For anterior and esthetic work, include a scan of the provisionals or the pre-op teeth if they show the length and form the patient approved.',
        'For implants, scan with the scan body fully seated and tell us the implant system and platform size.',
        'If your scanner isn’t connected yet, export STL or PLY files and email them to step2thmaster@gmail.com.',
      ],
    },
    {
      figure: '/images/insights/submit-itero-lumina.jpg',
      alt: 'An iTero Lumina intraoral scanner cart with a full-arch scan on its screen',
      caption: 'iTero Lumina. A complete full-arch scan with a clear bite gives the lab the whole picture.',
      credit: 'Align Technology / itero.com',
      creditHref: 'https://itero.com/our-solutions/itero-lumina-for-general-dentists',
      small: true,
    },
    { h2: '3. The prescription' },
    {
      p: 'The order form in your portal is your prescription. A complete one includes:',
    },
    {
      list: [
        'Patient name or ID, and the date you need the case back.',
        'Tooth numbers, the type of restoration and the material you want, or a note asking us to recommend one.',
        'Any preferences for contacts, occlusion or margins.',
        'Anything unusual about the case: a dark stump, a metal core, bruxism or a patient with high expectations.',
      ],
    },
    { h2: '4. Shade information' },
    {
      list: [
        'The shade guide you used (VITA classical, VITA 3D-Master or another) and the shade itself.',
        'A shade map, cervical, body and incisal, rather than a single shade for the whole tooth.',
        'The stump shade for every all-ceramic crown or veneer.',
        'Characterization you’d like copied: white spots, translucency, craze lines.',
      ],
    },
    { h2: '5. Photographs' },
    {
      p: 'Photos show what a scan can’t: color, translucency and how the teeth sit in the smile. Attach them directly to the order in your portal.',
    },
    {
      list: [
        'A retracted frontal view.',
        'A close-up with two or three shade tabs in frame, labels visible.',
        'The prepared teeth with a stump shade tab.',
        'For anterior cases, a full-face smile.',
      ],
    },
    {
      figure: '/images/insights/submit-medit-i900.jpg',
      alt: 'A Medit i900 Mobility intraoral scanner held with a tablet',
      caption: 'Medit i900 Mobility. Photos and notes can be attached to the case in Medit Link.',
      credit: 'Medit / PR Newswire',
      creditHref: 'https://www.prnewswire.com/news-releases/medit-to-reveal-new-medit-i900-mobility-powered-by-true-mobility-302518610.html',
    },
    { h2: '6. Communication' },
    {
      p: 'Use the notes field for anything that doesn’t fit the form, and tell us what the patient is hoping for in their own words. For complex or esthetic cases, a short call before preparation often saves time later. If something in the scan or the prescription is unclear, I will contact you before starting, not after.',
    },
    {
      p: 'Send the scans, a complete prescription, the shade and a few good photos, and we have everything we need to make the case right the first time.',
    },
  ],
}
