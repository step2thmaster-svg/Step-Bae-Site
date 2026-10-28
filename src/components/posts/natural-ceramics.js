// body blocks: { h2 }, { p }, { list: [...] }, { gallery: [{ src, alt, caption }] }, { figure, alt, caption, small?, repeat?, credit?, creditHref?, license?, licenseHref? }
// optional: imageAlt (when the main photo isn't also a figure), nameNote (shows the Bay/Bae note), cta: { title, text, label, href }
export default {
  slug: 'natural-looking-ceramic-restorations',
  title: 'How to Get More Natural-Looking Ceramic Restorations',
  audience: 'dentists',
  topic: 'shade',
  date: '10/2026',
  excerpt:
    'Shade is only the start. Translucency, texture, form, good photographs and clear communication are what make a restoration disappear in the smile.',
  image: '/images/insights/natural-ceramics-texture.jpg',
  nameNote: true, // photos carry Step's old “bay” watermark
  body: [
    {
      p: 'When an anterior restoration looks “fake”, the shade is rarely the only problem. More often the value is a little high, the translucency is in the wrong place, the surface is too smooth, or the form doesn’t belong to that patient. The good news is that every one of these can be controlled, and most of them start in the operatory, before the case ever reaches the lab.',
    },
    {
      p: 'Here is what I look for at the bench, and what you can send that makes the biggest difference.',
    },
    { h2: '1. Shade: start with value, not hue' },
    {
      p: 'The eye notices brightness long before it notices color. A crown that is one step too bright stands out across the room; one that is slightly off in hue often goes unnoticed. So when you take a shade, think value first.',
    },
    {
      list: [
        'Take the shade at the start of the appointment. Teeth dehydrate within minutes under retraction and look lighter and more opaque than they really are.',
        'Read the tooth in three zones (cervical, body and incisal) rather than giving one shade for the whole tooth.',
        'For all-ceramic work, always send the stump shade. Lithium disilicate and multilayer zirconia are translucent, so a dark or discolored prep will show through and change the final result.',
        'If you have the choice, a slightly lower value almost always looks more natural than a slightly higher one.',
      ],
    },
    { h2: '2. Translucency: put it where nature puts it' },
    {
      p: 'Natural teeth are not evenly translucent. They are more opaque near the gumline, carry the dentin color through the body, and become translucent toward the incisal edge, often with a halo, mamelon structure and areas of blue or grey. A restoration that is equally translucent everywhere reads as glass; one that is equally opaque reads as a tooth-colored block.',
    },
    {
      p: 'Thickness controls how much of this we can build. Adequate, even reduction lets the lab layer dentin and enamel ceramics properly. Where space is tight, or the stump is dark, we have to use more opaque material to mask it, and some life is lost. If a case is borderline, a quick conversation before preparation can save a remake.',
    },
    {
      figure: '/images/insights/natural-ceramics-texture.jpg',
      alt: 'Two anterior ceramic sets side by side on stone models, the right set with visible surface texture and luster',
      caption:
        'Two anterior sets photographed side by side. Notice how surface texture and luster change the way light breaks across each tooth.',
    },
    { h2: '3. Texture and luster: how light leaves the surface' },
    {
      p: 'Surface texture is what makes a restoration reflect light the way its neighbors do. Natural enamel has macro-texture (the vertical developmental lobes and horizontal growth lines) and micro-texture (fine perikymata). A perfectly smooth, high-glaze surface reflects light like a mirror and looks artificial next to natural teeth.',
    },
    {
      list: [
        'Match the adjacent teeth, not an ideal. Younger patients usually have more pronounced texture; older patients have smoother, more worn and often glossier surfaces.',
        'Send a photo taken with light raking across the teeth from the side. It shows texture far better than a straight-on shot.',
        'Tell the lab if you prefer a mechanically polished finish over a high glaze. Luster is as much a part of the shade as color.',
      ],
    },
    { h2: '4. Form: the outline the eye reads first' },
    {
      p: 'Form is often more important than color. The position of the line angles decides how wide a tooth looks; incisal embrasures, edge thickness and emergence profile decide whether it looks like it grew there. Two crowns of identical shade can look completely different simply because their facial outlines reflect light differently.',
    },
    {
      p: 'Form should also suit the person. In the Morphopsychology approach I teach, tooth form is chosen to fit the patient’s face and character, not taken from a single template. Exploring form on models or with a diagnostic wax-up and mock-up before the final ceramic lets you and the patient agree on it while changes are still easy.',
    },
    {
      figure: '/images/insights/natural-ceramics-form.jpg',
      alt: 'Finished anterior ceramic arch on a stone model, with a row of models below showing different anterior tooth forms',
      caption:
        'Form first: a finished anterior arch, with a row of models below showing different tooth forms explored for the smile.',
    },
    { h2: '5. Photographs: the most valuable thing you can send' },
    {
      p: 'A good set of photos tells the lab more than any prescription. You don’t need a studio, just consistency. The set I find most useful:',
    },
    {
      list: [
        'Full face, smiling, so the restoration can be designed for the face and lip line.',
        'Retracted view of the full smile.',
        'A close-up of the anterior teeth with two or three shade tabs held edge to edge with the incisal edge, in the same plane as the teeth and with the tab labels visible.',
        'The same close-up against a black contrastor, to show incisal translucency and halo.',
        'A cross-polarized photo if you have a filter. It removes reflections and shows true color and internal structure.',
        'The prepared teeth with a shade tab, for the stump shade.',
      ],
    },
    {
      p: 'Keep the camera settings and white balance the same across the set, and please don’t edit the color. Unedited photos with a known shade tab in frame are what let the lab calibrate.',
    },
    { h2: '6. Communication with the laboratory' },
    {
      p: 'The most natural results come from cases where the dentist and the technician are working toward the same picture. Beyond the impression or scan and the bite, the things that help most are:',
    },
    {
      list: [
        'The stump shade and a shade map (cervical, body, incisal) rather than a single shade.',
        'The photo set above.',
        'Approved provisionals: a scan or model of them, or photos, if the patient is happy with their length and form.',
        'What the patient wants, in their words: “natural”, “bright”, “like my old teeth”. These mean very different things.',
      ],
    },
    {
      p: 'And when in doubt, call. Five minutes on the phone before the preparation or the final shade is often worth more than any amount of adjusting afterward.',
    },
    { h2: 'Bringing it together' },
    {
      p: 'Natural-looking ceramics aren’t the result of one perfect shade match. They come from getting value, translucency, texture and form right together, and that depends on the information that travels with the case. The more of the patient the lab can see, the less the restoration looks like it was made in one.',
    },
  ],
}
