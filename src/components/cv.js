// Step's lectures, courses and publications, newest year last. Each entry is [month/year, what, where, tag];
// tag is 'intl' (international meeting), 'cancelled' (cancelled for COVID-19) or 'upcoming', or left off.
export const events = [
  ['3/2014', 'CEREC study group hands-on training', 'Shelby, NC'],
  ['4/2014', 'AACD, Ivoclar lecture & Demo', 'Orlando, FL'],
  ['8/2014', 'DTG Symposium, Lecture', 'Provo, UT'],
  ['11/2014', 'Renfert lecture & Demo, ECDL', 'Charlotte, NC'],

  ['2/2015', 'GC lecture & Demo', 'Chicago, IL'],
  ['3/2015', 'Ivoclar lecture & Demo', 'Cologne, Germany', 'intl'],
  ['5/2015', 'GC hands-on course', 'Alsip, IL'],
  ['6/2015', 'Morphopsychology 1', 'Charlotte, NC'],
  ['7/2015', 'Korean National Technician Expo, Keynote speaker', 'Seoul, South Korea', 'intl'],
  ['8/2015', 'GC hands-on course, Dawson Center', 'Chesapeake, VA'],
  ['8/2015', 'DTG Symposium, lecture & WMDA commentator', 'Provo, UT'],
  ['9/2015', 'Creodent, GC hands-on course', 'New York, NY'],
  ['10/2015', 'Morphopsychology 2', 'Charlotte, NC'],
  ['11/2015', 'GC lecture, ECDL', 'Charlotte, NC'],
  ['11/2015', 'Master Speakers Symposium, Keynote Speaker', 'Las Vegas, NV'],

  ['1/2016', 'GC hands-on course', 'Virginia'],
  ['2/2016', 'GC lecture, Lab Day', 'Chicago, IL'],
  ['4/2016', 'KADTA, GC hands-on course', 'Fort Lee, NJ'],
  ['4/2016', 'Morphopsychology 1', 'Charlotte, NC'],
  ['5/2016', 'Morphopsychology 1', 'Charlotte, NC'],
  ['5/2016', 'GC hands-on course', 'Alsip, IL'],
  ['6/2016', 'Morphopsychology 2', 'Charlotte, NC'],
  ['7/2016', 'GC hands-on course', 'Juniper, FL'],
  ['7/2016', 'Morphopsychology 1', 'Charlotte, NC'],
  ['8/2016', 'DTG Symposium, lecture & WMDA commentator', 'Provo, UT'],
  ['9/2016', 'GC lecture, Lab Day East', 'Atlantic City, NJ'],
  ['9/2016', 'Morphopsychology 3', 'Charlotte, NC'],
  ['10/2016', 'Morphopsychology 3', 'Charlotte, NC'],
  ['10/2016', 'Oral Arts, GC hands-on training', 'Alabama'],
  ['11/2016', 'Morphopsychology 1', 'Charlotte, NC'],
  ['12/2016', 'Morphopsychology 1', 'Charlotte, NC'],

  ['1/2017', 'GC PFM hands-on course at NDL', 'Lansdale, PA'],
  ['2/2017', 'GC lecture & demo, Lab Day', 'Chicago, IL'],
  ['3/2017', 'DTG lecture & demo, IDS', 'Cologne, Germany', 'intl'],
  ['5/2017', 'Morphopsychology 1', 'Charlotte, NC'],
  ['7/2017', 'GC hands-on course', 'Alsip, IL'],
  ['8/2017', 'DTG Symposium, lecture & WMDA commentator', 'Provo, UT'],
  ['9/2017', 'Siroworld lecture', 'Las Vegas, NV'],
  ['10/2017', 'Morphopsychology ZR', 'Charlotte, NC'],
  ['12/2017', 'Morphopsychology ZR', 'Charlotte, NC'],

  ['2/2018', 'GC lecture, Lab Day', 'Chicago, IL'],
  ['2/2018', 'Sirona lecture, Lab Day', 'Chicago, IL'],
  ['4/2018', 'DLAT lecture & hands-on course', 'Dallas, TX'],
  ['4/2018', 'Digital Dentistry Forum lecture', 'New York, NY'],
  ['5/2018', 'Morphopsychology 1', 'Charlotte, NC'],
  ['8/2018', 'DTG Symposium, lecture & WMDA commentator', 'Provo, UT'],
  ['9/2018', 'Composite veneer hands-on course for dentists', 'Charlotte, NC'],
  ['10/2018', 'Dentsply Sirona World lecture', 'Orlando, FL'],

  ['1/2019', 'By Design Dental Lab, hands-on course', 'Atlanta, GA'],
  ['1/2019', 'Dentsply Sirona lecture with Dr. Bylis', 'Miami, FL'],
  ['2/2019', 'GC lecture, Lab Day', 'Chicago, IL'],
  ['2/2019', 'Sirona lecture, Lab Day', 'Chicago, IL'],
  ['9/2019', 'GC hands-on course', 'Alsip, IL'],
  ['9/2019', 'GC keynote lecture, ODLA', ''],

  ['2/2020', 'Wagner demo, Lab Day', 'Chicago, IL'],
  ['3/2020', 'Lecture, Hinman Dental Meeting', 'Atlanta, GA', 'cancelled'],
  ['4/2020', 'Lecture, ODC', 'Portland, OR', 'cancelled'],

  ['2/2022', 'Wagner demo, Lab Day', 'Chicago, IL'],
  ['5/2022', 'Morphopsychology 1', 'Charlotte, NC'],
  ['9/2022', 'Nowax International demo', 'Charlotte, NC'],
  ['10/2022', 'Whip Mix Forum demo', 'Kentucky'],

  ['2/2023', 'Asiga lecture, Lab Day', 'Chicago, IL'],
  ['6/2023', 'FDLA Wagner table demo', ''],
  ['9/2023', 'Digital Days lecture', 'Puebla, Mexico', 'intl'],
  ['12/2023', 'Morphopsychology', 'Dayton, TN'],

  ['1/2024', 'Aidite stain & glaze hands-on', 'Charlotte, NC'],
  ['2/2024', 'Lecture & demo, Lab Day', 'Chicago, IL'],
  ['3/2024', 'GC hands-on course', 'Alsip, IL'],
  ['8/2024', 'Zirconia hands-on course', 'Lafayette, LA'],

  ['2/2027', 'GC lecture, LMT Lab Day', 'Chicago, IL', 'upcoming'],
  ['2/2027', 'American Equilibration Society Annual Scientific Meeting', 'Chicago, IL', 'upcoming'],
]

// [month/year, publication, subject, link to read it online (where there is one), a one-line summary, a photo from it,
// where to read it when it isn't open online]
export const articles = [
  // readable on this site as a post (posts/diagnostic-wax-up.js), so the Insights page lists it once, from there
  [
    '9/2006',
    'Contemporary Dental Assisting',
    'Diagnostic Wax-up: Key to Treatment Acceptance',
    '/article.html?p=diagnostic-wax-up-key-to-treatment-acceptance',
  ],
  [
    '1/2015',
    'Inside Dental Technology',
    'A Modular Approach to Complex Cases',
    'https://insidedentaltech.com/2015/01/a-modular-approach-to-complex-cases/',
    'A six-unit lower anterior bridge with four pontics and rebuilt pink tissue, planned in steps on a zirconia substructure layered with GC Initial Zr-FS and Gradia gum.',
    '/images/insights/modular-approach-complex-cases.jpg',
  ],
  [
    '1/2015',
    'LMT',
    'How to Shade Match Anterior Zirconia Restorations Using the GC Initial System',
    'https://lmtmag.com/articles/how-to-shade-match-anterior-zirconia-restorations-using-the-gc-initial-system',
    'Six discolored anterior teeth restored with zirconia crowns matched to the patient’s natural A1 shade, rather than bleached veneers, using the GC Initial system.',
    '/images/insights/shade-match-zirconia-gc-initial.jpg',
  ],
  ['3/2015', 'DTG Magazine', 'Two veneers', '', '', '/images/insights/two-veneers.jpg', 'DTG Magazine, issue #3'],
  ['10/2017', 'Spectrum Dialogue', 'Smile Makeover with GC Initial LiSi™ Press', '', '', '/images/insights/smile-makeover-gc-lisi-press.jpg', 'Spectrum Dialogue’s Digital Edition Repository, for members only'],
  [
    '6/2018',
    'Spectrum Dialogue',
    'The Making of a Sample Model',
    'https://online.fliphtml5.com/dksbb/ywjl/#p=3',
    'How Step built a full-arch implant sample model, from the hybrid framework to GC LiSi Press teeth and natural-looking pink gingiva.',
    '/images/insights/making-of-a-sample-model.jpg',
  ],
  [
    '11/2018',
    'LMT',
    'How to Use an Esthetic Blending Process with Celtra Press',
    'https://lmtmag.com/articles/how-to-use-an-esthetic-blending-process-with-celtra-press',
    'An implant crown on #7 and a crown on #8 replaced in Dentsply Sirona’s Celtra Press, chosen for how naturally it blends with the surrounding teeth.',
    '/images/insights/esthetic-blending-celtra-press.jpg',
  ],
  [
    '6/2022',
    'focus (Florida Dental Laboratory Association)',
    'Nine Lab Hacks',
    'https://www.fdla.net/assets/Focus_2ndQtr_2022_final.pdf',
    'Nine tools from Step’s own bench that make lab work faster and easier, from a 3D mouse for CAD design to a homemade “magic stick” for staining and glazing.',
    '/images/insights/nine-lab-hacks.jpg',
  ],
  [
    '3/2024',
    'Inside Dental Technology',
    'New Case, Old Patient',
    'https://insidedentaltech.com/2024/03/new-case-old-patient/',
    'Veneers placed seven years earlier are remade after two cracked, with shorter incisal edges for the wear on other teeth, in GC pressable lithium disilicate layered with GC ceramics.',
    '/images/insights/new-case-old-patient.jpg',
  ],
]

// who Step has taught for and where, grouped; drawn from the events above (cancelled events left out, upcoming ones included).
// Manufacturers are ordered by how often they appear in the CV.
export const hosts = [
  {
    group: 'Manufacturers',
    names: ['Aidite', 'Asiga', 'Dentsply Sirona', 'GC America', 'Ivoclar', 'Renfert', 'Wagner', 'White Peaks'],
  },
  {
    group: 'International meetings',
    names: ['IDS Cologne, Koln, Germany', 'Korean National Technician Expo, Seoul, South Korea', 'Digital Days, Puebla, Mexico'],
  },
  {
    group: 'U.S. meetings & symposia',
    names: [
      'LMT Lab Day Chicago', 'Lab Day East', 'AACD', 'American Equilibration Society', 'DTG Symposium',
      'Dentsply Sirona World', 'Master Speakers Symposium', 'Digital Dentistry Forum',
    ],
  },
  {
    group: 'Dental lab associations',
    names: ['KADTA', 'DLAT', 'ODLA', 'FDLA', 'ECDL'],
  },
  {
    group: 'Labs & training centers',
    names: ['Dawson Center', 'Creodent', 'By Design Dental Lab', 'Nudent Dental Lab', 'Oral Arts Dental Lab', 'Beauty & Beast Dental Lab', 'Nash Institute for Dental Learning'],
  },
]
