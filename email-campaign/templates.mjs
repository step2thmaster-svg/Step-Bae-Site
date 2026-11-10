// STEPBAE brand email templates. One set of brand parts (header, button, quote, signature, footer) and four layouts:
//   special  – a themed offer (the November campaign)
//   letter   – a personal note from Step: warm outreach, welcome, follow-ups, check-ins
//   insights – a lead article plus two more from stepbae.com/insights
//   event    – a course, lecture or trade-show announcement
// Content lives in build.mjs; this file is the design. Change a color or the signature here and every email follows.
// Built for email clients: tables, inline styles, web-safe fonts, a 600px column that shrinks on phones.

export const SITE = 'https://stepbae.com'
export const SENDER = { name: 'Step Bae, CDT, DTG', title: 'Master Ceramist', email: 'info@stepbae.com' }

// who an email is for decides the name: dentists and patients know us as "STEPBAE Dental Lab"; consulting clients and
// speaking or event organizers look for "STEPBAE". Set `audience: 'consulting'` on an email for the second.
const brand = (e = {}) => (e.audience === 'consulting' ? 'STEPBAE' : 'STEPBAE Dental Lab')
const labTag = (e = {}) => (e.audience === 'consulting' ? '' : '&nbsp; DENTAL LAB')

const C = { ink: '#141414', text: '#1d1d1d', muted: '#6b6b6b', gold: '#c4a46a', goldDark: '#a8874b', cream: '#faf7f0', page: '#f4f1ea', line: '#ece6da' }
const serif = "Georgia, 'Times New Roman', serif"
const sans = 'Arial, Helvetica, sans-serif'
const url = (path) => (path.startsWith('http') ? path : SITE + path)

// [[...]] marks anything still to be filled in; it shows highlighted so it can't go out unnoticed
const fill = (s) => s.replace(/\[\[(.+?)\]\]/g, `<span style="background-color:#fff3a8; color:${C.text};">$1</span>`)

// ---- brand parts --------------------------------------------------------------------------------------------------

const row = (inner, pad = '0 36px') => `
    <tr><td class="px" style="padding:${pad};">${inner}</td></tr>`

const header = (light = false, e = {}) =>
  light
    ? row(`<span style="font-family:${serif}; color:${C.goldDark}; font-size:17px; letter-spacing:3px;">STEPBAE</span><span style="font-family:${serif}; color:${C.muted}; font-size:10px; letter-spacing:2px;">${labTag(e)}</span>`, '26px 36px 0')
    : `
    <tr><td class="px" style="background-color:${C.ink}; padding:18px 36px; font-family:${serif};">
      <span style="color:${C.gold}; font-size:20px; letter-spacing:3px;">STEPBAE</span><span style="color:#ffffff; font-size:11px; letter-spacing:2px;">${labTag(e)}</span>
    </td></tr>`

const eyebrow = (text, color = C.goldDark) =>
  `<p style="margin:0 0 10px; font-family:${sans}; font-size:12px; font-weight:bold; letter-spacing:2.5px; color:${color};">${text.toUpperCase()}</p>`

const headline = (text, size = 27) => `<p class="h1" style="margin:0; font-family:${serif}; font-size:${size}px; line-height:1.25; color:${C.text};">${text}</p>`

const para = (text) => `<p style="margin:0 0 16px;">${fill(text)}</p>`

const body = (paras) => `<div style="font-family:${serif}; color:${C.text}; font-size:16px; line-height:1.6;">${paras.map(para).join('')}</div>`

export const button = (label, href) => `
      <table role="presentation" cellpadding="0" cellspacing="0" border="0"><tr>
        <td align="center" bgcolor="${C.gold}" style="border-radius:4px;">
          <a href="${url(href)}" target="_blank" style="display:inline-block; padding:14px 30px; font-family:${sans}; font-size:16px; font-weight:bold; color:${C.ink}; text-decoration:none; border-radius:4px;">${label} &rarr;</a>
        </td>
      </tr></table>`

const image = (src, alt, caption, bg = '#eee7da') => `
      <img src="${url(src)}" width="528" alt="${alt}" style="display:block; width:100%; max-width:528px; height:auto; border:0; background-color:${bg}; font-family:${serif}; font-size:14px; color:${C.muted};">${
        caption ? `\n      <p style="margin:8px 0 0; font-family:${serif}; font-size:13px; color:${C.muted};">${caption}</p>` : ''
      }`

const checks = (points) =>
  `<div style="font-family:${serif}; color:${C.text}; font-size:16px; line-height:1.55;">${points
    .map(([b, t]) => `<p style="margin:0 0 6px;"><span style="color:${C.goldDark};">&#10003;</span>&nbsp; <strong>${b}:</strong> ${t}</p>`)
    .join('')}</div>`

const quote = (q) =>
  q
    ? row(
        `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0"><tr>
        <td style="border-left:3px solid ${C.gold}; background-color:${C.cream}; padding:16px 20px; font-family:${serif}; color:${C.text};">
          <p style="margin:0 0 10px; font-size:16px; line-height:1.55; font-style:italic;">&ldquo;${q[0]}&rdquo;</p>
          <p style="margin:0; font-size:13px; color:${C.muted};">${q[1]}</p>
        </td></tr></table>`,
        '6px 36px 4px',
      )
    : ''

const signature = (ps, e = {}) =>
  row(
    `<table role="presentation" cellpadding="0" cellspacing="0" border="0"><tr>
        <td valign="top" style="padding-right:14px;"><img src="${SITE}/images/headshot2.jpg" width="56" height="56" alt="Step Bae" style="display:block; width:56px; height:56px; border-radius:28px; object-fit:cover; border:0;"></td>
        <td valign="top" style="font-family:${serif}; color:${C.text}; font-size:15px; line-height:1.5;">
          <strong>${SENDER.name}</strong><br>
          <span style="color:${C.muted}; font-size:14px;">${SENDER.title}, ${brand(e)}</span><br>
          <span style="color:${C.muted}; font-size:14px;"><a href="mailto:${SENDER.email}" style="color:${C.goldDark};">${SENDER.email}</a> &middot; <a href="${SITE}" style="color:${C.goldDark};">stepbae.com</a></span>
        </td>
      </tr></table>${ps ? `\n      <p style="margin:18px 0 0; font-family:${serif}; color:${C.text}; font-size:15px; line-height:1.55;"><strong>P.S.</strong> ${ps}</p>` : ''}`,
    '26px 36px 28px',
  )

// CAN-SPAM: every email carries the mailing address and an unsubscribe link
const footer = (why = 'you’re a dental professional we think may be a good fit', e = {}) => `
    <tr><td class="px" style="border-top:1px solid ${C.line}; padding:16px 36px 22px; font-family:${sans}; font-size:11px; line-height:1.6; color:#8a8a8a;">
      ${brand(e)} &middot; 14315 Country Lake Dr, Pineville, NC 28134<br>
      You&rsquo;re receiving this because ${why}. <a href="{{UnsubscribeURL}}" style="color:#8a8a8a;">Unsubscribe</a>
    </td></tr>`

function shell({ title, preheader, notes, rows }) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="x-apple-disable-message-reformatting">
<meta name="color-scheme" content="light">
<title>${title}</title>
<!-- Generated by email-campaign/build.mjs: edit there, not here.
${notes.map((n) => `  ${n}`).join('\n')} -->
<style>
  @media only screen and (max-width: 620px) {
    .container { width: 100% !important; }
    .px { padding-left: 22px !important; padding-right: 22px !important; }
    .h1 { font-size: 23px !important; }
    .thumb { width: 96px !important; }
  }
</style>
</head>
<body style="margin:0; padding:0; background-color:${C.page};">
<div style="display:none; max-height:0; overflow:hidden; mso-hide:all; font-size:1px; line-height:1px; color:${C.page};">${preheader}${'&#8199;&#847;'.repeat(40)}</div>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:${C.page};">
<tr><td align="center" style="padding:24px 12px;">
  <table role="presentation" class="container" width="600" cellpadding="0" cellspacing="0" border="0" style="width:600px; max-width:600px; background-color:#ffffff;">
${rows.join('\n')}
  </table>
</td></tr>
</table>
</body>
</html>
`
}

const meta = (e) => [`From: ${SENDER.name.split(',')[0]} <${SENDER.email}>`, ...(e.send ? [`Send: ${e.send}`] : []), ...e.subjects.map((s, i) => `Subject ${'AB'[i]}: ${s}`), `Preview text: ${e.preheader}`]

// ---- layouts ------------------------------------------------------------------------------------------------------

// a themed offer: headline, photo, intro, checkmarks, the offer box, a quote
export function special(e) {
  return shell({
    title: `${e.eyebrow} · ${brand(e)}`,
    preheader: e.preheader,
    notes: meta(e),
    rows: [
      header(false, e),
      row(eyebrow(`November · ${e.eyebrow}`) + headline(e.headline), '30px 36px 18px'),
      row(image(...e.image, e.caption)),
      row(body([`Hi Dr. {{LastName}},`, ...e.intro]), '24px 36px 4px'),
      row(checks(e.points), '0 36px 10px'),
      row(
        `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0"><tr>
        <td align="center" style="background-color:${C.ink}; padding:24px 22px 26px; font-family:${serif};">
          ${eyebrow('This month only · for new practices', C.gold)}
          <p style="margin:0 0 6px; font-size:22px; line-height:1.35; color:#ffffff;">${fill(e.offer)}</p>
          <p style="margin:0 0 20px; font-size:14px; color:#bdbdbd;">${e.terms ?? '10 business days &middot; 5-year warranty &middot; through Nov 30'}</p>
          ${button(e.cta, e.href ?? '/partnership.html')}
          <p style="margin:14px 0 0; font-size:14px; color:#bdbdbd;">Or just reply &ldquo;yes&rdquo; and we&rsquo;ll set up your account.</p>
        </td></tr></table>`,
        '14px 36px 8px',
      ),
      quote(e.quote),
      signature(e.ps ?? 'We accept scans from every intraoral scanner, including iTero, 3Shape TRIOS, Medit and Primescan. Connecting takes about 5 minutes, and we&rsquo;ll walk you through it.', e),
      footer(undefined, e),
    ],
  })
}

// a personal note: light header, no banner or photo, reads like a letter from Step
export function letter(e) {
  return shell({
    title: `${e.subjects[0]} · ${brand(e)}`,
    preheader: e.preheader,
    notes: meta(e),
    rows: [
      header(true, e),
      row(body([e.greeting ?? 'Hi Dr. {{LastName}},', ...e.paras]), '26px 36px 4px'),
      e.cta ? row(button(...e.cta), '8px 36px 6px') : '',
      signature(e.ps, e),
      footer(e.why, e),
    ],
  })
}

// an Insights digest: one lead article with a photo, then smaller rows
export function insights(e) {
  const [lead, ...more] = e.articles
  const href = (a) => `/article.html?p=${a.slug}`
  const small = (a) =>
    row(
      `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0"><tr>
        <td class="thumb" width="140" valign="top" style="width:140px; padding-right:16px;"><a href="${url(href(a))}"><img src="${url(a.image)}" width="140" alt="${a.alt}" style="display:block; width:100%; height:auto; border:0; background-color:#eee7da;"></a></td>
        <td valign="top" style="font-family:${serif}; color:${C.text};">
          <a href="${url(href(a))}" style="color:${C.text}; text-decoration:none; font-size:17px; line-height:1.3;">${a.title}</a>
          <p style="margin:6px 0 0; font-size:14px; line-height:1.5; color:${C.muted};">${a.excerpt}</p>
        </td></tr></table>`,
      '0 36px 20px',
    )
  return shell({
    title: `${e.eyebrow} · ${brand(e)}`,
    preheader: e.preheader,
    notes: meta(e),
    rows: [
      header(false, e),
      row(eyebrow(e.eyebrow) + headline(e.headline, 25), '30px 36px 14px'),
      row(body([e.intro]), '0 36px 4px'),
      row(`<a href="${url(href(lead))}">${image(lead.image, lead.alt)}</a>`),
      row(
        `<p style="margin:0 0 8px; font-family:${serif}; font-size:21px; line-height:1.3; color:${C.text};">${lead.title}</p>
      <p style="margin:0 0 18px; font-family:${serif}; font-size:16px; line-height:1.6; color:${C.text};">${lead.excerpt}</p>${button('Read the Article', href(lead))}`,
        '18px 36px 28px',
      ),
      row(`<p style="margin:0; border-top:1px solid ${C.line}; padding-top:20px; font-family:${sans}; font-size:12px; font-weight:bold; letter-spacing:2.5px; color:${C.goldDark};">ALSO ON INSIGHTS</p>`, '0 36px 16px'),
      ...more.map(small),
      signature(e.ps, e),
      footer(e.why, e),
    ],
  })
}

// an event: the flyer, the essentials in a details box, a register button
export function event(e) {
  const details = e.details
    .map(([k, v]) => `<tr><td valign="top" style="padding:4px 14px 4px 0; font-family:${sans}; font-size:11px; font-weight:bold; letter-spacing:2px; color:${C.goldDark}; white-space:nowrap;">${k.toUpperCase()}</td><td style="padding:4px 0; font-family:${serif}; font-size:16px; color:${C.text};">${v}</td></tr>`)
    .join('')
  return shell({
    title: `${e.eyebrow} · ${brand(e)}`,
    preheader: e.preheader,
    notes: meta(e),
    rows: [
      header(false, e),
      row(eyebrow(e.eyebrow) + headline(e.headline, 25), '30px 36px 18px'),
      row(image(e.image[0], e.image[1], null, C.ink)),
      row(body([e.greeting ?? 'Hi Dr. {{LastName}},', ...e.paras]), '24px 36px 4px'),
      row(`<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:${C.cream}; border-top:2px solid ${C.gold};"><tr><td style="padding:16px 20px;"><table role="presentation" cellpadding="0" cellspacing="0" border="0">${details}</table></td></tr></table>`, '0 36px 22px'),
      row(button(...e.cta), '0 36px 6px'),
      signature(e.ps, e),
      footer(e.why, e),
    ],
  })
}
