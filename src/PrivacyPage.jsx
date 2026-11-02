import Header from './components/Header.jsx'
import Footer from './components/Footer.jsx'
import { EMAIL } from './components/sendForm.js'

// what the site collects and where it goes, in plain words: the two forms, the Mini Steps chat (its AI answers
// included), and the services the site runs on. Update the date whenever any of this changes.
const UPDATED = 'November 2, 2026'

const sections = [
  {
    title: 'What you send us',
    text: [
      'The partnership and consultation forms, and the questions the Mini Steps chat asks when you choose to leave your details, collect what you type: usually your name, practice or organization, email, phone number and message. These are delivered to STEPBAE by Formspree, a form service, and we use them only to reply to you and to work with you.',
      'If you start answering those questions in the chat and leave before sending, the answers you gave are still sent to STEPBAE, marked unfinished, so we can follow up. The chat lets you know your answers are shared with STEPBAE when it starts asking.',
    ],
  },
  {
    title: 'The Mini Steps chat',
    text: [
      'Most chat answers are written in advance and stay in your browser. When you type a question the chat has no ready answer for, the question, along with the last few questions you asked this way and their answers, is sent to Anthropic, the company that makes the Claude AI, so it can write an answer. Those answers are marked as AI answers.',
      'We don’t keep these questions, and we don’t attach your name or contact details to them. Anthropic processes them under its own privacy policy. Please don’t type health, insurance or personal details into the chat. For anything about your own teeth, talk with your dentist.',
      'The chat remembers your conversation while this browser tab is open, so it follows you from page to page. Closing the tab clears it.',
    ],
  },
  {
    title: 'The services this site runs on',
    text: [
      'The site is hosted by Cloudflare, which may record technical details such as your IP address to deliver pages and protect the site from abuse. Fonts load from Google Fonts. We don’t use advertising or tracking cookies, and we don’t sell or share your information for marketing.',
    ],
  },
  {
    title: 'Patients',
    text: [
      'STEPBAE is a dental laboratory. We make restorations for dentists, who send us cases. This website is not a place to share medical records, and nothing on it is medical advice.',
    ],
  },
  {
    title: 'Your choices',
    text: [
      `To see, correct or delete anything you’ve sent us, or with any question about privacy, email ${EMAIL}.`,
    ],
  },
]

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-ink">
      <div className="relative">
        <Header />
        <section className="px-6 pb-12 pt-[118px] text-center lg:px-12">
          <p className="text-[12px] font-semibold tracking-[0.3em] text-gold">PRIVACY</p>
          <h1 className="mt-3 font-display text-[44px] font-medium leading-[1.08] text-white md:text-[56px]">Privacy Policy</h1>
          <p className="mt-3 text-[14px] text-white/60">Last updated {UPDATED}</p>
        </section>
      </div>
      <section className="bg-cream px-6 py-14 text-ink lg:px-12">
        <div className="mx-auto max-w-[680px] space-y-10">
          {sections.map((s) => (
            <div key={s.title}>
              <h2 className="font-display text-[30px] font-medium leading-tight">{s.title}</h2>
              {s.text.map((t) => (
                <p key={t} className="mt-3 text-pretty text-[16px] leading-[1.7] text-ink/85">
                  {t}
                </p>
              ))}
            </div>
          ))}
        </div>
      </section>
      <Footer />
    </div>
  )
}
