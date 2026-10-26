// Shared by the partnership and consultation forms.
// Formspree form ID (the part after formspree.io/f/). Until it's set, sending opens a pre-filled email instead.
export const FORMSPREE_ID = ''
export const EMAIL = 'info@stepbae.com'

// resolves true once Formspree has the submission, false when it fell back to opening an email
export async function sendForm(form, subject) {
  const data = new FormData(form)
  data.append('_subject', subject)

  if (!FORMSPREE_ID) {
    const body = [...data.entries()]
      .filter(([k]) => k !== '_subject')
      .map(([k, v]) => `${k}: ${v}`)
      .join('\n')
    window.location.href = `mailto:${EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
    return false
  }

  const res = await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
    method: 'POST',
    body: data,
    headers: { Accept: 'application/json' },
  })
  if (!res.ok) throw new Error(res.statusText)
  return true
}
