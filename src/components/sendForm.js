// Shared by the partnership and consultation forms.
// Formspree form IDs (the part after formspree.io/f/), one per form. Until a form's ID is set, sending it opens a pre-filled email instead.
export const FORMSPREE_IDS = {
  consultation: 'xbggybbd',
  partnership: 'maeejkkb',
}
export const EMAIL = 'info@stepbae.com'

// resolves true once Formspree has the submission, false when it fell back to opening an email;
// `form` is a form element, or FormData built some other way (the Mini Steps chat builds it from answers)
export async function sendForm(form, subject, formName) {
  const data = form instanceof FormData ? form : new FormData(form)
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

// details a dentist already gave the Mini Steps chat (name, practice, email, scanner, monthly units), so the
// partnership form can start filled in; kept for this visit only and cleared once that form is sent
const PREFILL = 'stepbae-prefill'
export const prefill = {
  get() {
    try {
      return JSON.parse(sessionStorage.getItem(PREFILL)) ?? {}
    } catch {
      return {}
    }
  },
  add(fields) {
    try {
      sessionStorage.setItem(PREFILL, JSON.stringify({ ...prefill.get(), ...fields }))
    } catch {
      /* private browsing: the form just starts empty */
    }
  },
  clear() {
    try {
      sessionStorage.removeItem(PREFILL)
    } catch {
      /* nothing stored */
    }
  },
}
