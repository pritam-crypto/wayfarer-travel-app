const KEY = import.meta.env.VITE_OPENWEATHER_KEY

export class GeocodeError extends Error {}

// Turns a free-text place search ("Naples", "Cusco Peru") into coordinates
// using OpenWeather's geocoding endpoint, so the same key covers both
// location search and the weather lookup.
export async function searchPlace(query) {
  if (!KEY) {
    throw new GeocodeError('Location search isn\'t configured yet — add VITE_OPENWEATHER_KEY to your .env file.')
  }
  const url = `https://api.openweathermap.org/geo/1.0/direct?q=${encodeURIComponent(query)}&limit=5&appid=${KEY}`
  let res
  try {
    res = await fetch(url)
  } catch {
    throw new GeocodeError('Could not reach the location service. Check your connection and try again.')
  }
  if (!res.ok) throw new GeocodeError('Location search failed. Try a different spelling.')
  const data = await res.json()
  return data.map((place) => ({
    name: place.name,
    state: place.state,
    country: place.country,
    lat: place.lat,
    lon: place.lon,
    label: [place.name, place.state, place.country].filter(Boolean).join(', '),
  }))
}
