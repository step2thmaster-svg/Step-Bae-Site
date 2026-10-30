import { useState } from 'react'
import { ArrowRight } from './Icons.jsx'
import { EMAIL, sendForm } from './sendForm.js'

const portalOptions = ['iTero', '3Shape TRIOS', 'Medit', 'Primescan / CEREC', 'Other scanner', 'No scanner (physical impressions)']
// also asked by the Mini Steps chat when a dentist requests the price list
export const unitOptions = ['1–10', '11–25', '26–50', '51–100', 'More than 100']

const labelClass = 'block text-[13px] font-semibold text-white/90'
const inputClass =
  'mt-2 h-11 w-full rounded-[3px] border border-gold/30 bg-ink-3 px-3 text-[15px] text-white placeholder:text-white/35 focus:border-gold focus:outline-none'

export default function PartnerForm() {
  const [status, setStatus] = useState('idle') // idle | sending | sent | error

  async function onSubmit(e) {
    e.preventDefault()
    const form = e.currentTarget
    setStatus('sending')
    try {
      if (await sendForm(form, 'New dentist partnership', 'partnership')) {
        form.reset()
        setStatus('sent')
      } else {
        setStatus('idle')
      }
    } catch {
      setStatus('error')
    }
  }

  return (
    <section id="partner-form" className="bg-ink-2 px-6 py-16 lg:px-12">
      <div className="mx-auto max-w-[760px]">
        <h2 className="text-center font-display text-[36px] font-medium leading-tight text-white md:text-[40px]">
          Tell us more about <em className="font-normal text-gold">You</em>
        </h2>
        <p className="mx-auto mt-4 max-w-[520px] text-center text-[15px] leading-[1.6] text-white/80">
          Tell us about your practice and we'll reply promptly to set up your account
          and walk you through your first case.
        </p>

        {status === 'sent' ? (
          <p role="status" className="mt-10 rounded-[3px] border border-gold/40 bg-ink-3 px-6 py-8 text-center text-[16px] text-white">
            Thank you. We've received your details and will be in touch shortly.
          </p>
        ) : (
          <form onSubmit={onSubmit} className="mt-10 grid gap-5 sm:grid-cols-2">
            <label className={labelClass}>
              Dentist name *
              <input name="Dentist name" required autoComplete="name" className={inputClass} />
            </label>
            <label className={labelClass}>
              Practice name *
              <input name="Practice name" required autoComplete="organization" className={inputClass} />
            </label>
            <label className={labelClass}>
              Email *
              <input name="email" type="email" required autoComplete="email" className={inputClass} />
            </label>
            <label className={labelClass}>
              Practice address
              <input name="Practice address" autoComplete="street-address" className={inputClass} />
            </label>
            <label className={labelClass}>
              City and state
              <input name="City and state" className={inputClass} />
            </label>
            <label className={labelClass}>
              Scanner / portal you use *
              <select name="Portal" required defaultValue="" className={inputClass}>
                <option value="" disabled>Choose one</option>
                {portalOptions.map((o) => (
                  <option key={o}>{o}</option>
                ))}
              </select>
            </label>
            <label className={labelClass}>
              Portal account email or ID
              <input name="Portal account" placeholder="So we can find and accept your request" className={inputClass} />
            </label>
            <label className={labelClass}>
              Units per month for the lab *
              <select name="Units per month" required defaultValue="" className={inputClass}>
                <option value="" disabled>Choose a range</option>
                {unitOptions.map((o) => (
                  <option key={o}>{o}</option>
                ))}
              </select>
            </label>
            <label className={`${labelClass} sm:col-span-2`}>
              How can we help you?
              <textarea
                name="Message"
                rows={4}
                placeholder="Veneers, crowns and bridges, implant work…"
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
