export function norm(s: string): string {
  return s.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '')
}

export function esc(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
}

/** Entoure la portion correspondant à la recherche d'une balise <mark> */
export function hi(text: string, q: string): string {
  if (!q) return esc(text)
  const i = norm(text).indexOf(norm(q))
  if (i < 0) return esc(text)
  return (
    esc(text.slice(0, i)) +
    '<mark>' + esc(text.slice(i, i + q.length)) + '</mark>' +
    esc(text.slice(i + q.length))
  )
}

export function chunk<T>(arr: T[], n: number): T[][] {
  const out: T[][] = []
  for (let i = 0; i < arr.length; i += n) out.push(arr.slice(i, i + n))
  return out
}
