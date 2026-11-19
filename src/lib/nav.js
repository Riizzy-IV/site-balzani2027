// Links entre páginas: na Home, "/#secao" vira "#secao" (rolagem suave do Lenis sem recarregar).
const isHome = () => {
  const p = window.location.pathname
  return p === '/' || p.endsWith('/index.html')
}

export function resolveHref(href) {
  if (href.startsWith('/#') && isHome()) return href.slice(1)
  return href
}

export function isCurrent(href) {
  const p = window.location.pathname.replace(/index\.html$/, '')
  return href !== '/' && !href.includes('#') && p.startsWith(href)
}
