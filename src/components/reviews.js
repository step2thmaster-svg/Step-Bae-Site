// Client reviews, shown on the page each one belongs to (`page`: 'partnership', 'consultation' or 'patients').
// A review only appears on the site once it has the client's `name` and `approved: true`: the drafts below were
// written for real clients to edit and sign off, and stay hidden until then. Fill in name (and role, such as
// "General Dentist, City, ST") from the client's approval, and set approved to true.
export const reviews = [
  // first shared on toothlab.ai, about the restorations themselves
  {
    page: 'partnership',
    quote: 'I was skeptical at first, but the quality speaks for itself. The crowns and bridges we receive are consistently excellent. My chair time has decreased significantly, and patient satisfaction is at an all-time high.',
    name: 'Dr. Jeff Blank',
    role: 'General Dentist, Beaufort, SC',
    source: 'toothlab',
    approved: true,
  },
  {
    page: 'partnership',
    quote: 'The level of precision in their work is remarkable. Every case comes back exactly as planned. The communication is clear, and the support team is always responsive. Highly recommend.',
    name: 'Dr. Jong S. Lim',
    role: 'General Dentist, Elmhurst, NY',
    source: 'toothlab',
    approved: true,
  },

  // drafts for client approval
  {
    page: 'partnership',
    about: 'Dentist who switched from an unsatisfying lab',
    quote: 'I was tired of adjusting crowns and sending cases back. Since switching to STEPBAE, restorations seat with minimal adjustment and the shade matches on the first try. I only wish I had switched sooner.',
    name: '',
    role: '',
    approved: false,
  },
  {
    page: 'partnership',
    about: 'Dentist searching for the best work for their patients',
    quote: 'I’d tried several labs looking for work I’d be proud to put in my patients’ mouths. STEPBAE’s anterior work is the most natural I’ve seen: real depth of color, texture and form that fits the patient. My patients notice, and so do their friends.',
    name: '',
    role: '',
    approved: false,
  },
  {
    page: 'partnership',
    about: 'Dentist who values the relationship and quick responses',
    quote: 'What sets STEPBAE apart is the relationship. When I have a question about a prep or a shade, I get a real answer from the technician, usually the same day. It feels like having a partner in the case, not a vendor.',
    name: '',
    role: '',
    approved: false,
  },
  {
    page: 'partnership',
    about: 'Dentist who values an easy workflow',
    quote: 'Connecting my scanner took a few minutes, and sending a case is now part of my normal routine. Clear checklists, prepaid labels when I need them, and cases arrive when promised. It just works.',
    name: '',
    role: '',
    approved: false,
  },
  {
    page: 'consultation',
    about: 'Consulting client',
    quote: 'We brought STEPBAE in to help with our digital workflow. Instead of telling us to buy new equipment, they worked with what we had and built a process our team actually follows. Our remakes dropped, and communication between the practice and lab is much clearer.',
    name: '',
    role: '',
    approved: false,
  },
  {
    page: 'consultation',
    about: 'Hands-on training client',
    quote: 'Our technicians learned more in two days of hands-on training than in months on their own. Small group, real techniques, and everyone left using new layering and staining skills on their very next case.',
    name: '',
    role: '',
    approved: false,
  },
  {
    page: 'consultation',
    about: 'State dental lab association meeting organizer',
    quote: 'STEPBAE’s lecture was one of the highlights of our state meeting. It was built around our theme, packed with practical takeaways, and our members were still talking about it at the next meeting. We’d gladly invite STEPBAE back.',
    name: '',
    role: '',
    approved: false,
  },
  {
    page: 'patients',
    about: 'Patient helped to find the right dentist for her veneers',
    quote: 'I wanted veneers but didn’t know where to start. STEPBAE helped me understand my options and find the right dentist. My veneers look completely natural, and nobody can tell they aren’t my own teeth.',
    name: '',
    role: '',
    approved: false,
  },
]

// the reviews ready to show on a page
export const reviewsFor = (page) => reviews.filter((r) => r.page === page && r.approved && r.name)
