import { articles } from './cv.js'
import naturalCeramics from './posts/natural-ceramics.js'
import shadeMatching from './posts/shade-matching.js'
import refractoryLayering from './posts/refractory-layering.js'
import zirconiaVsLayered from './posts/zirconia-vs-layered.js'
import submitDigitalCase from './posts/submit-digital-case.js'

// the two audiences the Insights library is split by; every post and topic belongs to one
export const audiences = {
  dentists: {
    label: 'For Dentists',
    text: 'Material choices, case planning, shade and characterization, and getting the most from your lab.',
  },
  patients: {
    label: 'For Patients',
    text: 'What your crown, veneer or implant is, how it is made, and how to look after it.',
  },
}

export const topics = [
  { id: 'veneers', audience: 'dentists', label: 'Veneers & Esthetics', text: 'Preparation, layering and smile design for anterior cases.' },
  { id: 'zirconia', audience: 'dentists', label: 'Zirconia & Crowns', text: 'Choosing between monolithic, multilayer and layered restorations.' },
  { id: 'ceramics', audience: 'dentists', label: 'Pressed & Layered Ceramics', text: 'Lithium disilicate, press ceramics and cutback technique.' },
  { id: 'implants', audience: 'dentists', label: 'Implants & All-on-X', text: 'Full-arch planning, frameworks and pink esthetics.' },
  { id: 'shade', audience: 'dentists', label: 'Shade & Characterization', text: 'Stains, glazes and communicating shade with the lab.' },
  { id: 'digital', audience: 'dentists', label: 'Digital Workflow', text: 'Scanning, design and milling from the lab’s side of the case.' },
  { id: 'choosing', audience: 'patients', label: 'Veneers or Crowns?', text: 'The differences, and questions to ask your dentist.' },
  { id: 'expect', audience: 'patients', label: 'What to Expect', text: 'From the first appointment to the final fitting.' },
  { id: 'care', audience: 'patients', label: 'Caring for Your Restorations', text: 'Everyday habits that help your new teeth last.' },
  { id: 'full-arch', audience: 'patients', label: 'Implants & Full-Arch Smiles', text: 'How implant teeth are made, explained simply.' },
]

// blog posts, each in its own file in ./posts (see natural-ceramics.js for the shape), newest first;
// to add one, create the file and import it here. Each post is read at /article.html?p=<slug>
export const posts = [submitDigitalCase, zirconiaVsLayered, refractoryLayering, shadeMatching, naturalCeramics].map((post) => ({ ...post, href: `/article.html?p=${post.slug}` }))

export const getPost = (slug) => posts.find((post) => post.slug === slug)

// Step's published trade-journal articles, filed for dentists; the topic is set where the subject makes it clear
const articleTopics = {
  'GC stains': 'shade',
  'GC Initial ZR-FS': 'zirconia',
  'Two veneers': 'veneers',
  'GC smile makeover': 'veneers',
  'Dentsply Sirona Celtra Press': 'ceramics',
  'GC LiSi Press on a hybrid arch': 'implants',
  'Ceramic veneer for GC': 'veneers',
}

const publications = articles
  .filter(([, , subject]) => subject)
  .map(([date, source, subject]) => ({
    title: subject,
    source,
    audience: 'dentists',
    topic: articleTopics[subject],
    date,
  }))

// newest first, by the M/YYYY date
const sortKey = (date) => {
  const [m, y] = date.split('/').map(Number)
  return y * 12 + m
}
export const insights = [...posts, ...publications].sort((a, b) => sortKey(b.date) - sortKey(a.date))

const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
export const formatDate = (date) => {
  const [m, y] = date.split('/')
  return `${months[Number(m) - 1]} ${y}`
}
