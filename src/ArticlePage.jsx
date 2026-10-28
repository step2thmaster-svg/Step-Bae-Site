import { useEffect } from 'react'
import Header from './components/Header.jsx'
import Button from './components/Button.jsx'
import Footer from './components/Footer.jsx'
import { topics, getPost, formatDate } from './components/insights.js'
import AudienceTag, { audienceColor } from './components/AudienceTag.jsx'
import { events, articles } from './components/cv.js'

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

// who wrote the post: Step by default, or the STEPBAE team for general, less technical posts (`author: 'team'`);
// shown in the byline and in a box at the end, and sent to search engines as Article structured data below
const authors = {
  step: {
    type: 'Person',
    name: 'Step Toothmaster Bae',
    byline: 'Step Toothmaster Bae, CDT, DTG',
    credentials: 'CDT, DTG',
    photo: '/images/headshot2.jpg',
    url: 'https://stepbae.com/about.html',
    sameAs: [
      'https://www.threads.com/@step2thmaster',
      'https://www.facebook.com/step2thmaster/',
      'https://www.tiktok.com/@boynamedbae',
      'https://www.youtube.com/@boynamedbae',
    ],
  },
  team: {
    type: 'Organization',
    name: 'STEPBAE Team',
    byline: 'STEPBAE Team',
    url: 'https://stepbae.com',
  },
}

function AuthorBox({ author }) {
  if (author === authors.team)
    return (
      <aside className="mt-12 border-t border-gold-dark/30 pt-8 text-center sm:text-left">
        <p className="text-[11px] font-semibold tracking-[0.2em] text-gold-dark">ABOUT THE AUTHOR</p>
        <p className="mt-1 font-display text-[22px] font-medium leading-tight text-ink">{author.name}</p>
        <p className="mt-2 text-[15px] leading-[1.6] text-ink/80">
          This article was written by the team at STEPBAE, the dental laboratory of Step Toothmaster Bae, CDT, DTG. We
          make crowns, veneers and implant restorations by hand for dentists, and write these guides to help patients
          understand the work in their smile.
        </p>
        <a href="/about.html" className="mt-2 inline-block text-[14px] font-medium text-gold-dark underline underline-offset-4 hover:text-ink">
          More about STEPBAE
        </a>
      </aside>
    )
  return (
    <aside className="mt-12 flex flex-col items-center gap-5 border-t border-gold-dark/30 pt-8 text-center sm:flex-row sm:items-start sm:text-left">
      <img src={author.photo} alt={`Headshot of ${author.name}`} loading="lazy" className="h-20 w-20 shrink-0 rounded-full object-cover object-[50%_40%]" />
      <div>
        <p className="text-[11px] font-semibold tracking-[0.2em] text-gold-dark">ABOUT THE AUTHOR</p>
        <p className="mt-1 font-display text-[22px] font-medium leading-tight text-ink">{author.byline}</p>
        <p className="mt-2 text-[15px] leading-[1.6] text-ink/80">
          Step is a dental technician who handcrafts esthetic and implant restorations. Since {events[0][0].split('/')[1]}, Step
          has given more than 70 lectures and hands-on courses internationally and published {articles.length} articles in
          dental trade journals.
        </p>
        <a href="/about.html" className="mt-2 inline-block text-[14px] font-medium text-gold-dark underline underline-offset-4 hover:text-ink">
          More about Step
        </a>
      </div>
    </aside>
  )
}

const author = authors[post?.author] ?? authors.step

// M/YYYY, as posts store it, to an ISO date (the 1st of the month) for structured data
const isoDate = (date) => {
  const [m, y] = date.split('/')
  return `${y}-${m.padStart(2, '0')}-01`
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
  // labelled comparison panels; photos in a panel share one height (each grows by its width ÷ height) so none is cropped
  if (block.compare)
    return (
      <div className="mt-8 space-y-4">
        {block.compare.map((panel) => (
          <figure
            key={panel.label}
            className={`rounded-[3px] border p-4 ${panel.good ? 'border-gold-dark/50 bg-white/70' : 'border-ink/15 bg-white/40'}`}
          >
            <p className={`mb-3 text-[11px] font-semibold tracking-[0.2em] ${panel.good ? 'text-gold-dark' : 'text-ink/55'}`}>
              {panel.label.toUpperCase()}
            </p>
            <div className="flex gap-3">
              {panel.photos.map((photo) => (
                <img
                  key={photo.src}
                  src={photo.src}
                  alt={photo.alt}
                  loading="lazy"
                  style={{ flex: `${photo.ratio} 1 0%` }}
                  className="min-w-0 rounded-[3px]"
                />
              ))}
            </div>
            <figcaption className="mt-3 text-[14px] italic leading-[1.5] text-ink/70">{panel.caption}</figcaption>
          </figure>
        ))}
      </div>
    )
  // two small photos side by side with one shared caption
  if (block.pair)
    return (
      <figure className="mx-auto mt-8 max-w-[560px]">
        <div className="grid grid-cols-2 items-end gap-3">
          {block.pair.map((photo) => (
            <img key={photo.src} src={photo.src} alt={photo.alt} loading="lazy" className="w-full rounded-[3px]" />
          ))}
        </div>
        {block.caption && <figcaption className="mt-2.5 text-[14px] italic leading-[1.5] text-ink/65">{block.caption}</figcaption>}
      </figure>
    )
  // a numbered sequence of photos, two to a row from sm up, in the order given
  if (block.gallery)
    return (
      <ol className="mt-8 grid gap-x-5 gap-y-6 sm:grid-cols-2">
        {block.gallery.map((photo, i) => (
          <li key={photo.src}>
            <figure>
              <img src={photo.src} alt={photo.alt} loading="lazy" className="w-full rounded-[3px]" />
              <figcaption className="mt-2 text-[14px] leading-[1.5] text-ink/70">
                <span className="mr-1.5 font-semibold text-gold-dark">{i + 1}.</span>
                {photo.caption}
              </figcaption>
            </figure>
          </li>
        ))}
      </ol>
    )
  if (block.figure)
    return (
      // small photos are shown near their own size rather than stretched to the column
      <figure className={`mt-8 ${block.small ? 'mx-auto max-w-[420px]' : ''}`}>
        <img src={block.figure} alt={block.alt} loading="lazy" className="w-full rounded-[3px]" />
        {block.caption && <figcaption className="mt-2.5 text-[14px] italic leading-[1.5] text-ink/65">{block.caption}</figcaption>}
        <Credit block={block} className="mt-1 text-ink/50" />
      </figure>
    )
  return null
}

export default function ArticlePage() {
  useEffect(() => {
    if (!post) return
    document.title = `${post.title} · STEPBAE Insights`
    // Article structured data, so search engines can tell who wrote the post and when
    const script = document.createElement('script')
    script.type = 'application/ld+json'
    script.textContent = JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: post.title,
      description: post.excerpt,
      ...(post.image && { image: `https://stepbae.com${post.image}` }),
      datePublished: isoDate(post.date),
      author:
        author.type === 'Person'
          ? {
              '@type': 'Person',
              name: author.name,
              honorificSuffix: author.credentials,
              jobTitle: 'Dental Technician',
              image: `https://stepbae.com${author.photo}`,
              url: author.url,
              sameAs: author.sameAs,
            }
          : { '@type': 'Organization', name: author.name, url: author.url },
      publisher: { '@type': 'Organization', name: 'STEPBAE', url: 'https://stepbae.com' },
      mainEntityOfPage: `https://stepbae.com${post.href}`,
    })
    document.head.appendChild(script)
    return () => script.remove()
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
  const cta = post.cta ?? defaultCtas[post.audience] ?? defaultCtas.dentists
  const insightsHref = '/insights.html'

  return (
    <div className="min-h-screen bg-ink">
      <div className="relative">
        <Header />
        {/* top padding clears the header, as on the other pages */}
        <section className="px-6 pb-10 pt-[138px] lg:px-12">
          <div className="mx-auto max-w-[760px] text-center">
            {/* who the article is for, color coded as on the Insights page */}
            <a href={insightsHref} className="inline-flex flex-wrap items-center justify-center gap-x-3 gap-y-2 hover:opacity-85">
              <AudienceTag audience={post.audience} />
              {topic && <span className="text-[12px] font-semibold tracking-[0.3em] text-gold">{topic.label.toUpperCase()}</span>}
            </a>
            <h1 className="mt-4 font-display text-[38px] font-medium leading-[1.1] text-white md:text-[52px]">{post.title}</h1>
            <p className="mt-5 text-[14px] text-white/70">
              {author.byline} <span className="px-1.5">·</span> {formatDate(post.date)}
            </p>
          </div>
          {post.image && (
            <img
              src={post.image}
              alt={heroFigure?.alt ?? post.imageAlt ?? ''}
              className={`mx-auto mt-10 w-full rounded-[3px] ${post.imageSmall ? 'max-w-[560px]' : 'max-w-[1000px]'}`}
            />
          )}
          <Credit block={heroFigure ?? post.imageCredit} className="mx-auto mt-2 max-w-[1000px] text-center text-white/50" />
          {/* posts with Step's own photos (nameNote) may show the name Bay, the spelling Step used from about 2012 to 2023 */}
          {post.nameNote && (
            <p className="mx-auto mt-3 max-w-[1000px] text-center text-[13px] italic leading-relaxed text-white/55">
              Some photos credit “Step Bay,” the spelling of Step’s surname from 2012 to 2023.
            </p>
          )}
        </section>
      </div>

      <article className="relative bg-cream px-6 py-12 text-ink lg:px-12">
        <span className={`absolute inset-x-0 top-0 h-1 ${audienceColor[post.audience]}`} />
        <div className="mx-auto max-w-[700px] text-[17px] leading-[1.7] text-ink/90">
          <p className="font-display text-[22px] italic leading-[1.45] text-ink">{post.excerpt}</p>
          {/* the post's main photo is already shown above the article, so it isn't repeated in the text unless marked `repeat` */}
          {post.body
            .filter((block) => block.figure !== post.image || block.repeat)
            .map((block, i) => (
              <Block key={i} block={block} />
            ))}
          <AuthorBox author={author} />
        </div>
      </article>

      <section className="border-t border-gold/30 px-6 py-14 text-center lg:px-12">
        <div className="mx-auto max-w-[640px]">
          <h2 className="font-display text-[32px] italic leading-tight text-white md:text-[38px]">{cta.title}</h2>
          <p className="mt-3 text-[15px] leading-[1.6] text-white/85">{cta.text}</p>
          <div className="mt-7 flex flex-wrap justify-center gap-3">
            <Button href={cta.href} className="h-10 px-6">{cta.label}</Button>
            {cta.secondary && (
              <Button href={cta.secondary.href} variant="ghost" className="h-10 px-6">{cta.secondary.label}</Button>
            )}
          </div>
          <p className="mt-8">
            <a href={insightsHref} className="text-[14px] text-white/70 underline underline-offset-4 hover:text-gold">
              More insights
            </a>
          </p>
        </div>
      </section>

      <Footer />
    </div>
  )
}
