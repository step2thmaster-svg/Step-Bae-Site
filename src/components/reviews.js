// Client reviews, shown on the page each one belongs to (`page`: 'partnership', 'consultation' or 'patients').
// A review appears once `approved: true`. `tag` is what the review speaks to; `name` is optional (approved reviews
// without one are shown anonymously, by `role`), and can be added later from the client's approval.
export const reviews = [
  {
    page: 'partnership',
    about: 'Dentist who switched from an unsatisfying lab',
    quote: 'I had to leave a long relationship with my previous lab because their full zirconia crowns were not seating and I had to make too many adjustments. I just couldn’t do it anymore. Now I don’t have that problem.',
    tag: 'Switched labs',
    name: 'Dr. J.S. Lim, DDS',
    role: 'Dentist, New York, NY',
    approved: true,
  },
  // anonymous for now; names can be added once each client agrees
  {
    page: 'partnership',
    about: 'Dentist searching for the best work for their patients',
    quote: 'I’d tried several world-renowned labs looking for the work I’d be proud to deliver to my patients. STEPBAE Dental Lab’s anterior work is the most natural I’ve seen, real depth of color, texture and form that fits my patients, and myself. I had STEPBAE make my own veneers as well.',
    tag: 'Esthetic results',
    name: 'Dr. Paul Bylis, DDS',
    role: 'Dentist, Glen Burnie, MD',
    approved: true,
  },
  {
    page: 'partnership',
    about: 'Dentist who values the relationship and quick responses',
    quote: 'What sets STEPBAE apart is the relationship that we built over the years. When I have a question about a complex case, I get a prompt answer from the technician, who is proficient. It’s like having a reliable partner.',
    tag: 'Partnership',
    name: 'Dr. Brandon O’Neal, DMD',
    role: 'Dentist, Alpharetta, GA',
    approved: true,
  },
  {
    page: 'partnership',
    about: 'Dentist who values an easy workflow',
    quote: 'Connecting to the iTero scanner was very easy and sending a case is now part of my normal routine. We just come in, send scans, and then case arrives! And we do it all again!',
    tag: 'Easy workflow',
    name: 'Heather W.',
    role: 'Dental assistant, Charlotte, NC',
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
    quote: 'I wanted a nice smile all my life but didn’t know which dentist I had to see. STEPBAE helped me understand my options and find the right dentist near me, someone that I can trust. I am a 50+ year old female and my world has changed. My smile looks completely natural, and nobody can tell they aren’t my own teeth.',
    tag: 'Veneers',
    name: '',
    role: 'Veneer patient, Charlotte, NC',
    approved: true,
  },
]

// the reviews ready to show on a page (or several pages' reviews together)
export const reviewsFor = (pages) => reviews.filter((r) => [pages].flat().includes(r.page) && r.approved)
