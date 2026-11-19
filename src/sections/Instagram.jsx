import { useEffect, useState } from 'react'
import { CONTACT, img } from '../data/home.js'
import { Kicker, PillButton } from '../components/ui.jsx'

const TOTAL = 4 // uma fileira de 4 posts

/** Normaliza um post do feed JSON do Behold (aceita o formato novo `{ posts }` e o antigo, em lista). */
function normalize(post) {
  const isVideo = post.mediaType === 'VIDEO'
  const image =
    post.sizes?.medium?.mediaUrl ||
    post.sizes?.large?.mediaUrl ||
    (isVideo ? post.thumbnailUrl : post.mediaUrl) ||
    post.thumbnailUrl
  return {
    id: post.id,
    href: post.permalink || CONTACT.instagram.url,
    image,
    alt: (post.prunedCaption || post.caption || 'Post da Balzani no Instagram').slice(0, 120),
    isVideo,
  }
}

function useInstagramFeed(url) {
  const [posts, setPosts] = useState(null)

  useEffect(() => {
    if (!url) return
    const ctrl = new AbortController()
    fetch(url, { signal: ctrl.signal })
      .then((r) => (r.ok ? r.json() : Promise.reject(new Error(`HTTP ${r.status}`))))
      .then((data) => {
        const list = Array.isArray(data) ? data : data.posts || []
        setPosts(list.map(normalize).filter((p) => p.image).slice(0, TOTAL))
      })
      .catch((err) => {
        // se o feed falhar, a grade continua com os placeholders
        if (err.name !== 'AbortError') console.warn('Feed do Instagram indisponível:', err.message)
      })
    return () => ctrl.abort()
  }, [url])

  return posts
}

export default function Instagram() {
  const { instagram } = CONTACT
  const posts = useInstagramFeed(instagram.feedUrl)

  // completa com placeholders se o feed vier com menos posts que a fileira (ou ainda não estiver configurado)
  const items = Array.from({ length: TOTAL }, (_, i) => posts?.[i] ?? { id: `ph-${i}`, href: instagram.url })

  return (
    <section className="instagram">
      <div className="instagram__head container" data-reveal>
        <div className="instagram__heading">
          <Kicker>Acesse nosso instagram</Kicker>
          <a className="instagram__handle" href={instagram.url} target="_blank" rel="noreferrer">
            <img src={img('icon-instagram-box.svg')} alt="" width="64" height="64" />
            {instagram.handle}
          </a>
        </div>
        <PillButton href={instagram.url} target="_blank" rel="noreferrer">
          Acesse nosso instagram
        </PillButton>
      </div>

      <div className="instagram__grid container" data-reveal>
        {items.map((p) => (
          <a
            key={p.id}
            className={`instagram__post ${p.image ? 'has-image' : ''}`}
            href={p.href}
            target="_blank"
            rel="noreferrer"
            aria-label={p.image ? `Ver no Instagram: ${p.alt}` : 'Instagram da Balzani'}
          >
            {p.image && (
              <>
                <img src={p.image} alt={p.alt} loading="lazy" />
                {p.isVideo && <span className="instagram__badge" aria-hidden />}
                <span className="instagram__overlay" aria-hidden>
                  <img src={img('icon-instagram.svg')} alt="" />
                </span>
              </>
            )}
          </a>
        ))}
      </div>
    </section>
  )
}
