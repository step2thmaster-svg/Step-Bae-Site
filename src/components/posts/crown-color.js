// for patients; lifestyle photos from Wikimedia Commons, credited with author, source and license
const commons = (file) => `https://commons.wikimedia.org/wiki/File:${file}`

export default {
  slug: 'why-is-my-crown-a-different-color',
  title: 'Why Is My Dental Crown a Different Color From My Other Teeth?',
  audience: 'patients',
  topic: 'care',
  date: '10/2026',
  excerpt:
    'A crown that doesn’t quite match can be frustrating. There are several possible reasons, and your dentist is the best person to tell you which one applies to yours.',
  image: '/images/insights/color-dinner.jpg',
  imageAlt: 'Three friends laughing and raising a toast over dinner',
  imageCredit: {
    credit: 'PattayaPatrol / Wikimedia Commons',
    creditHref: commons('DSC_7089_Three_friends_laugh_and_toast_over_drinks_during_a_lively_evening_dinner_at_a_cozy_plant-filled_restaurant.jpg'),
    license: 'CC BY-SA 4.0',
    licenseHref: 'https://creativecommons.org/licenses/by-sa/4.0',
  },
  body: [
    {
      p: 'You smile in a photo and notice it: one tooth looks a little whiter, darker or greyer than the rest. If that tooth has a crown, you’re not alone in wondering why. A crown can look different from your natural teeth for several reasons, and some of them have nothing to do with how the crown was made.',
    },
    { h2: 'Your natural teeth change; a crown doesn’t' },
    {
      figure: '/images/insights/color-grandmother.jpg',
      alt: 'A smiling grandmother carrying her granddaughter on her back',
      caption: 'Natural teeth slowly change color over the years. Porcelain stays the same.',
      credit: 'Linda Bartlett / Wikimedia Commons',
      creditHref: commons('Grandmother_and_granddaughter.jpg'),
      small: true,
    },
    {
      p: 'Natural teeth slowly darken and yellow with age, and they pick up stains from coffee, tea, red wine and tobacco. Porcelain and zirconia don’t stain the same way. A crown that matched perfectly years ago can stand out today simply because the teeth around it have changed.',
    },
    { h2: 'Whitening doesn’t change crowns' },
    {
      p: 'Whitening gel lightens natural enamel, but it has no effect on a crown. If you whiten your teeth after a crown is placed, the crown can suddenly look darker than its neighbors. That is why dentists usually recommend whitening first and matching the crown afterwards.',
    },
    {
      figure: '/images/insights/color-woman-phone.jpg',
      alt: 'A smiling woman outdoors looking at her phone',
      caption: 'Phone cameras and filters change colors. Check your smile in natural daylight too.',
      credit: 'rawpixel / Wikimedia Commons',
      creditHref: commons('Smiling_woman_with_a_phone_(Unsplash).jpg'),
      license: 'CC0',
      licenseHref: 'https://creativecommons.org/publicdomain/zero/1.0/',
    },
    { h2: 'What’s underneath can show through' },
    {
      p: 'Many modern crowns are slightly translucent, like real teeth. That helps them look natural, but it also means the tooth underneath affects the final color. A darkened tooth, a root-canal-treated tooth or a metal post can make a crown look greyer. Older crowns with a metal base can also show a dark line near the gum as gums recede over time.',
    },
    { h2: 'Lighting plays tricks' },
    {
      figure: '/images/insights/color-friends-lake.jpg',
      alt: 'Two friends relaxing on a dock by a lake in the sun',
      caption: 'Sunlight, indoor lamps and camera flash all show teeth differently.',
      credit: 'Alex Bellink / Wikimedia Commons',
      creditHref: commons('87-103-_Sit_back,_get_my_palette_wet_(6054454315).jpg'),
      license: 'CC BY 2.0',
      licenseHref: 'https://creativecommons.org/licenses/by/2.0',
    },
    {
      p: 'Ceramic and natural enamel reflect light differently. A crown can match beautifully in daylight and look slightly off under warm restaurant lighting, a camera flash or the blue light of a screen. Some differences you notice may only appear in certain light.',
    },
    { h2: 'The material and how it was made' },
    {
      p: 'Different crown materials have different strengths and appearances. Some very strong crowns are more opaque, and a crown made in a single shade can look flatter than a natural tooth, which changes in color from the gum to the edge. How the shade was taken, how much room there was for the material, and the skill of the lab all play a part too.',
    },
    {
      figure: '/images/insights/color-mother-daughter.jpg',
      alt: 'A smiling mother hugging her young daughter outdoors',
      caption: 'Everyone’s teeth are different, which is why each crown is matched to one smile.',
      credit: 'Basile Morin / Wikimedia Commons',
      creditHref: commons('Smiling_mother_and_daughter_in_her_arms.jpg'),
      license: 'CC BY-SA 4.0',
      licenseHref: 'https://creativecommons.org/licenses/by-sa/4.0',
    },
    { h2: 'Talk to your dentist' },
    {
      p: 'Only your dentist can tell you why your crown looks the way it does. They can check the crown, the tooth beneath it and your gums, and explain whether anything needs attention. Sometimes the answer is simple, like professional cleaning or whitening the natural teeth. Sometimes a crown can be replaced to match better. And sometimes the color change is a sign worth checking, such as a change in the tooth underneath.',
    },
    {
      figure: '/images/insights/color-child-outdoors.jpg',
      alt: 'A laughing boy playing outdoors',
      caption: 'Feeling confident in your smile matters. If something bothers you, ask.',
      credit: 'Virginia State Parks / Wikimedia Commons',
      creditHref: commons('Fun_at_Hungry_Mother_(18677774948).jpg'),
      license: 'CC BY 2.0',
      licenseHref: 'https://creativecommons.org/licenses/by/2.0',
    },
    {
      p: 'If your crown doesn’t look right to you, mention it at your next visit. It’s a common question, and your dentist will be glad you asked.',
    },
  ],
}
