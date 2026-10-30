import { useState } from 'react'
import { ArrowRight } from './Icons.jsx'
import { EMAIL, sendForm, useUnfinished } from './sendForm.js'

// also offered by the Mini Steps chat, which can take the same inquiry one question at a time
export const inquiryOptions = ['Consulting', 'Course or workshop', 'Lecture or speaking', 'Sponsorship or collaboration', 'Something else']
export const orgOptions = ['Dental practice', 'Dental laboratory', 'Manufacturer or supplier', 'Study club or school', 'Event organizer', 'Other']

const labelClass = 'block text-[13px] font-semibold text-white/90'
const inputClass =
  'mt-2 h-11 w-full rounded-[3px] border border-gold/30 bg-ink-3 px-3 text-[15px] text-white placeholder:text-white/35 focus:border-gold focus:outline-none'

export default function ConsultForm() {
  const [status, setStatus] = useState('idle') // idle | sending | sent | error
  const unfinished = useUnfinished('New consultation inquiry', 'consultation')

  async function onSubmit(e) {
    e.preventDefault()
    const form = e.currentTarget
    setStatus('sending')
    unfinished.sent()
    try {
      if (await sendForm(form, 'New consultation inquiry', 'consultation')) {
        form.reset()
        setStatus('sent')
      } else {
        setStatus('idle')
      }
    } catch {
      // not sent after all, so it counts as unfinished again
      unfinished.onChange()
      setStatus('error')
    }
  }

  return (
    <section id="inquiry" className="bg-ink-2 px-6 py-16 lg:px-12">
      <div className="mx-auto max-w-[760px]">
        <h2 className="text-center font-display text-[36px] font-medium leading-tight text-white md:text-[40px]">
          Let's <em className="font-normal text-gold">Talk</em>
        </h2>
        <p className="mx-auto mt-4 max-w-[520px] text-center text-[15px] leading-[1.6] text-white/80">
          Tell us about your organization and what you have in mind, and we'll reply
          to set up a conversation.
        </p>

        {status === 'sent' ? (
          <p role="status" className="mt-10 rounded-[3px] border border-gold/40 bg-ink-3 px-6 py-8 text-center text-[16px] text-white">
            Thank you. We've received your inquiry and will be in touch shortly.
          </p>
        ) : (
          <form ref={unfinished.ref} onChange={unfinished.onChange} onSubmit={onSubmit} className="mt-10 grid gap-5 sm:grid-cols-2">
            <label className={labelClass}>
              Your name *
              <input name="Name" required autoComplete="name" className={inputClass} />
            </label>
            <label className={labelClass}>
              Title / role
              <input name="Role" autoComplete="organization-title" className={inputClass} />
            </label>
            <label className={labelClass}>
              Company or organization *
              <input name="Organization" required autoComplete="organization" className={inputClass} />
            </label>
            <label className={labelClass}>
              Type of organization *
              <select name="Organization type" required defaultValue="" className={inputClass}>
                <option value="" disabled>Choose one</option>
                {orgOptions.map((o) => (
                  <option key={o}>{o}</option>
                ))}
              </select>
            </label>
            <label className={labelClass}>
              Email *
              <input name="email" type="email" required autoComplete="email" className={inputClass} />
            </label>
            <label className={labelClass}>
              Website
              <input name="Website" type="url" placeholder="https://" autoComplete="url" className={inputClass} />
            </label>
            <label className={labelClass}>
              What are you reaching out about? *
              <select name="Inquiry" required defaultValue="" className={inputClass}>
                <option value="" disabled>Choose one</option>
                {inquiryOptions.map((o) => (
                  <option key={o}>{o}</option>
                ))}
              </select>
            </label>
            <label className={labelClass}>
              Preferred dates or timeline
              <input name="Timeline" placeholder="e.g. spring 2027, flexible" className={inputClass} />
            </label>
            <label className={`${labelClass} sm:col-span-2`}>
              Tell us more *
              <textarea
                name="Message"
                required
                rows={5}
                placeholder="Your goals, audience or team size, location, budget…"
                className={`${inputClass} h-auto py-2.5`}
              />
            </label>

            <div className="flex flex-col items-center gap-3 sm:col-span-2">
              <button
                type="submit"
                disabled={status === 'sending'}
                className="inline-flex h-11 items-center justify-center gap-2 bg-gold px-8 text-[14px] font-semibold text-ink-2 shadow-[0_6px_20px_-8px_rgba(212,168,104,0.6)] transition-colors hover:bg-gold-light disabled:opacity-60"
              >
                {status === 'sending' ? 'Sending…' : 'Send'} <ArrowRight />
              </button>
              {status === 'error' && (
                <p role="alert" className="text-[14px] text-white/85">
                  Something went wrong sending the form. Please try again, or email us at{' '}
                  <a href={`mailto:${EMAIL}`} className="text-gold hover:text-gold-light">{EMAIL}</a>.
                </p>
              )}
            </div>
          </form>
        )}
      </div>
    </section>
  )
}
