import { useEffect, useRef } from 'react'

// Shared by the partnership and consultation forms.
// Formspree form IDs (the part after formspree.io/f/), one per form. Until a form's ID is set, sending it opens a pre-filled email instead.
export const FORMSPREE_IDS = {
  consultation: 'xbggybbd',
  partnership: 'maeejkkb',
}
export const EMAIL = 'info@stepbae.com'

// resolves true once Formspree has the submission, false when it fell back to opening an email;
// `form` is a form element, or FormData built some other way (the Mini Steps chat builds it from answers);
// `quiet` sends in the background, even as the page closes, and never falls back to email (for unfinished chat forms)
export async function sendForm(form, subject, formName, { quiet = false } = {}) {
  const data = form instanceof FormData ? form : new FormData(form)
  data.append('_subject', subject)
  const id = FORMSPREE_IDS[formName]

  if (!id) {
    if (quiet) return false
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
    keepalive: quiet,
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

// a form on the page that was filled in but never sent still reaches STEPBAE, marked unfinished, when the visitor
// leaves the page; only once they've typed or picked something (details the chat filled in alone don't count)
export function useUnfinished(subject, formName) {
  const ref = useRef(null)
  const touched = useRef(false)
  useEffect(() => {
    const onLeave = () => {
      const form = ref.current
      if (!form || !touched.current) return
      touched.current = false
      // only what was filled in
      const data = new FormData()
      for (const [k, v] of new FormData(form)) if (String(v).trim()) data.append(k, v)
      if (![...data.keys()].length) return
      data.append('Status', 'Unfinished: left the page before sending')
      data.append('Source', `Form on ${window.location.pathname}`)
      sendForm(data, `Unfinished: ${subject}`, formName, { quiet: true }).catch(() => {})
    }
    window.addEventListener('pagehide', onLeave)
    return () => window.removeEventListener('pagehide', onLeave)
  }, [subject, formName])
  return {
    ref,
    onChange: () => (touched.current = true),
    // once it's on its way, there's nothing left unfinished
    sent: () => (touched.current = false),
  }
}
