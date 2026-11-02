// Client reviews, shown on the page each one belongs to (`page`: 'partnership', 'consultation' or 'patients').
// A review appears once `approved: true`. `tag` is what the review speaks to; `name` is optional (approved reviews
// without one are shown anonymously, by `role`), and can be added later from the client's approval.
export const reviews = [
  {
    page: 'partnership',
    about: 'Dentist who switched from an unsatisfying lab',
    quote: 'I was tired of adjusting crowns and sending cases back. Since switching to STEPBAE Dental Lab, restorations seat with minimal adjustment and the shade matches on the first try. I only wish I had switched sooner.',
    tag: 'Switched labs',
    name: '',
    role: 'Dentist, partner practice',
    approved: true,
  },
  // anonymous for now; names can be added once each client agrees
  {
    page: 'partnership',
    about: 'Dentist searching for the best work for their patients',
    quote: 'I’d tried several labs looking for work I’d be proud to put in my patients’ mouths. STEPBAE Dental Lab’s anterior work is the most natural I’ve seen: real depth of color, texture and form that fits the patient. My patients notice, and so do their friends.',
    tag: 'Esthetic results',
    name: '',
    role: 'Dentist, partner practice',
    approved: true,
  },
  {
    page: 'partnership',
    about: 'Dentist who values the relationship and quick responses',
    quote: 'What sets STEPBAE Dental Lab apart is the relationship. When I have a question about a prep or a shade, I get a real answer from the technician, usually the same day. It feels like having a partner in the case, not a vendor.',
    tag: 'Partnership',
    name: '',
    role: 'Dentist, partner practice',
    approved: true,
  },
  {
    page: 'partnership',
    about: 'Dentist who values an easy workflow',
    quote: 'Connecting my scanner took a few minutes, and sending a case is now part of my normal routine. Clear checklists, prepaid labels when I need them, and cases arrive when promised. It just works.',
    tag: 'Easy workflow',
    name: '',
    role: 'Dentist, partner practice',
    approved: true,
  },
  {
    page: 'consultation',
    about: 'Consulting client',
    quote: 'We brought STEPBAE in to help with our digital workflow. Instead of telling us to buy new equipment, they worked with what we had and built a process our team actually follows. Our remakes dropped, and communication between the practice and lab is much clearer.',
    tag: 'Consulting',
    name: '',
    role: 'Practice owner, consulting client',
    approved: true,
  },
  {
    page: 'consultation',
    about: 'Hands-on training client',
    quote: 'Our technicians learned more in two days of hands-on training than in months on their own. Small group, real techniques, and everyone left using new layering and staining skills on their very next case.',
    tag: 'Hands-on training',
    name: '',
    role: 'Training client',
    approved: true,
  },
  {
    page: 'consultation',
    about: 'State dental lab association meeting organizer',
    quote: 'STEPBAE’s lecture was one of the highlights of our state meeting. It was built around our theme, packed with practical takeaways, and our members were still talking about it at the next meeting. We’d gladly invite STEPBAE back.',
    tag: 'Lecture',
    name: '',
    role: 'State dental lab association meeting organizer',
    approved: true,
  },
  {
    page: 'patients',
    about: 'Patient helped to find the right dentist for her veneers',
    quote: 'I wanted veneers but didn’t know where to start. STEPBAE helped me understand my options and find the right dentist. My veneers look completely natural, and nobody can tell they aren’t my own teeth.',
    tag: 'Veneers',
    name: '',
    role: 'Veneer patient',
    approved: true,
  },
]

// the reviews ready to show on a page
export const reviewsFor = (page) => reviews.filter((r) => r.page === page && r.approved)
