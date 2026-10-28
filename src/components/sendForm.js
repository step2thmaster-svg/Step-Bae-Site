// Shared by the partnership and consultation forms.
// Formspree form IDs (the part after formspree.io/f/), one per form. Until a form's ID is set, sending it opens a pre-filled email instead.
export const FORMSPREE_IDS = {
  consultation: 'xbggybbd',
  partnership: 'maeejkkb',
}
// temporary until info@stepbae.com is set up
export const EMAIL = 'step2thmaster@gmail.com'

// resolves true once Formspree has the submission, false when it fell back to opening an email
export async function sendForm(form, subject, formName) {
  const data = new FormData(form)
  data.append('_subject', subject)
  const id = FORMSPREE_IDS[formName]

  if (!id) {
    const body = [...data.entries()]
      .filter(([k]) => k !== '_subject')
      .map(([k, v]) => `${k}: ${v}`)
      .join('\n')
    window.location.href = `mailto:${EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
    return false
  }

  const res = await fetch(`https://formspree.io/f/${id}`, {
    method: 'POST',
    body: data,
    headers: { Accept: 'application/json' },
  })
  if (!res.ok) throw new Error(res.statusText)
  return true
}
