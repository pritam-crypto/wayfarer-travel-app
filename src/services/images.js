const KEY = import.meta.env.VITE_PEXELS_KEY

export class ImageError extends Error {}

const cache = new Map()

// Fetches a photo for a search term from Pexels. Results are cached in
// memory for the session so browsing back and forth doesn't re-fetch.
export async function fetchPhoto(query) {
  if (!KEY) return null // fail soft — UI falls back to a placeholder
  if (cache.has(query)) return cache.get(query)

  const url = `https://api.pexels.com/v1/search?query=${encodeURIComponent(query)}&per_page=1&orientation=landscape`
  let res
  try {
    res = await fetch(url, { headers: { Authorization: KEY } })
  } catch {
    return null
  }
  if (!res.ok) return null
  const data = await res.json()
  const photo = data.photos?.[0]
  const result = photo
    ? {
        src: photo.src.large,
        alt: photo.alt || query,
        photographer: photo.photographer,
        photographerUrl: photo.photographer_url,
      }
    : null
  cache.set(query, result)
  return result
}
