import { useEffect } from 'react'
import Header from './components/Header.jsx'
import Button from './components/Button.jsx'
import Footer from './components/Footer.jsx'
import { audiences, topics, getPost, formatDate } from './components/insights.js'

// which post to show comes from the address, e.g. /article.html?p=natural-looking-ceramic-restorations
const post = getPost(new URLSearchParams(window.location.search).get('p'))

// the call to action at the end of a post: a post can set its own `cta`, otherwise one per audience
const defaultCtas = {
  dentists: {
    title: 'Discuss a case with STEPBAE',
    text: 'Planning an esthetic case? Send photos and a few notes, and Step will talk it through with you before you prepare.',
    label: 'Discuss a Case',
    href: '/partnership.html#partner-form',
  },
  patients: {
    title: 'Questions about your smile?',
    text: 'Ask about crowns, veneers or implant teeth, and how they’re made.',
    label: 'Ask a Question',
    href: '/consultation.html#inquiry',
  },
}

// photo credit for images from outside sources; the license link is what CC BY-SA asks for
function Credit({ block, className = '' }) {
  if (!block?.credit) return null
  return (
    <p className={`text-[12px] not-italic leading-[1.5] ${className}`}>
      Photo: <a href={block.creditHref} className="underline underline-offset-2 hover:text-gold-dark">{block.credit}</a>
      {block.license && (
        <>
          {', '}
          <a href={block.licenseHref} className="underline underline-offset-2 hover:text-gold-dark">{block.license}</a>
        </>
      )}
    </p>
  )
}

function Block({ block }) {
  if (block.h2) return <h2 className="mt-10 font-display text-[28px] font-medium leading-tight md:text-[32px]">{block.h2}</h2>
  if (block.p) return <p className="mt-4">{block.p}</p>
  if (block.list)
    return (
      <ul className="mt-4 space-y-2.5 pl-5 marker:text-gold-dark [list-style:disc]">
        {block.list.map((item) => (
          <li key={item} className="pl-1">{item}</li>
        ))}
      </ul>
    )
  if (block.figure)
    return (
      <figure className="mt-8">
        <img src={block.figure} alt={block.alt} loading="lazy" className="w-full rounded-[3px]" />
        {block.caption && <figcaption className="mt-2.5 text-[14px] italic leading-[1.5] text-ink/65">{block.caption}</figcaption>}
        <Credit block={block} className="mt-1 text-ink/50" />
      </figure>
    )
  return null
}

export default function ArticlePage() {
  useEffect(() => {
    if (post) document.title = `${post.title} · STEPBAE Insights`
  }, [])

  if (!post) {
    return (
      <div className="min-h-screen bg-ink">
        <div className="relative">
          <Header />
          <section className="px-6 pb-20 pt-[138px] text-center lg:px-12">
            <h1 className="font-display text-[40px] font-medium text-white">Article not found</h1>
            <Button href="/insights.html" className="mt-8 h-10 px-6">Back to Insights</Button>
          </section>
        </div>
        <Footer />
      </div>
    )
  }

  const topic = topics.find((t) => t.id === post.topic)
  const heroFigure = post.body.find((block) => block.figure === post.image)
  const cta = post.cta ?? defaultCtas[post.audience]

  return (
    <div className="min-h-screen bg-ink">
      <div className="relative">
        <Header />
        {/* top padding clears the header, as on the other pages */}
        <section className="px-6 pb-10 pt-[138px] lg:px-12">
          <div className="mx-auto max-w-[760px] text-center">
            <a href={`/insights.html#${post.audience}`} className="text-[12px] font-semibold tracking-[0.3em] text-gold hover:text-gold-light">
              {audiences[post.audience].label.toUpperCase()}
              {topic && ` · ${topic.label.toUpperCase()}`}
            </a>
            <h1 className="mt-4 font-display text-[38px] font-medium leading-[1.1] text-white md:text-[52px]">{post.title}</h1>
            <p className="mt-5 text-[14px] text-white/70">
              Step Toothmaster Bae, CDT, DTG <span className="px-1.5">·</span> {formatDate(post.date)}
            </p>
          </div>
          {post.image && (
            <img src={post.image} alt={heroFigure?.alt ?? ''} className="mx-auto mt-10 w-full max-w-[1000px] rounded-[3px]" />
          )}
          <Credit block={heroFigure} className="mx-auto mt-2 max-w-[1000px] text-center text-white/50" />
          {/* posts with Step's own photos (nameNote) may show the name Bay, the spelling Step used from about 2012 to 2023 */}
          {post.nameNote && (
            <p className="mx-auto mt-3 max-w-[1000px] text-center text-[13px] italic leading-relaxed text-white/55">
              Some photos credit “Step Bay,” the spelling of Step’s surname from 2012 to 2023.
            </p>
          )}
        </section>
      </div>

      <article className="bg-cream px-6 py-12 text-ink lg:px-12">
        <div className="mx-auto max-w-[700px] text-[17px] leading-[1.7] text-ink/90">
          <p className="font-display text-[22px] italic leading-[1.45] text-ink">{post.excerpt}</p>
          {/* the post's main photo is already shown above the article, so it isn't repeated in the text */}
          {post.body
            .filter((block) => block.figure !== post.image)
            .map((block, i) => (
              <Block key={i} block={block} />
            ))}
        </div>
      </article>

      <section className="border-t border-gold/30 px-6 py-14 text-center lg:px-12">
        <div className="mx-auto max-w-[640px]">
          <h2 className="font-display text-[32px] italic leading-tight text-white md:text-[38px]">{cta.title}</h2>
          <p className="mt-3 text-[15px] leading-[1.6] text-white/85">{cta.text}</p>
          <Button href={cta.href} className="mt-7 h-10 px-6">{cta.label}</Button>
          <p className="mt-8">
            <a href={`/insights.html#${post.audience}`} className="text-[14px] text-white/70 underline underline-offset-4 hover:text-gold">
              More insights {audiences[post.audience].label.toLowerCase()}
            </a>
          </p>
        </div>
      </section>

      <Footer />
    </div>
  )
}
