const KEY = import.meta.env.VITE_OPENWEATHER_KEY

export class WeatherError extends Error {}

// Fetches current weather for a lat/lon pair from OpenWeather's free
// "current weather" endpoint. Throws WeatherError with a message safe
// to show a visitor.
export async function fetchCurrentWeather(lat, lon) {
  if (!KEY) {
    throw new WeatherError('Weather isn\'t configured yet — add VITE_OPENWEATHER_KEY to your .env file.')
  }
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${KEY}`
  let res
  try {
    res = await fetch(url)
  } catch {
    throw new WeatherError('Could not reach the weather service. Check your connection and try again.')
  }
  if (!res.ok) {
    if (res.status === 401) throw new WeatherError('Weather API key was rejected. Double-check VITE_OPENWEATHER_KEY.')
    throw new WeatherError('Weather data is unavailable for this location right now.')
  }
  const data = await res.json()
  return {
    tempC: Math.round(data.main.temp),
    feelsLikeC: Math.round(data.main.feels_like),
    condition: data.weather?.[0]?.main ?? 'Unknown',
    description: data.weather?.[0]?.description ?? '',
    icon: data.weather?.[0]?.icon,
    humidity: data.main.humidity,
    windKph: Math.round((data.wind?.speed ?? 0) * 3.6),
    locationName: data.name,
  }
}

export function iconUrl(icon) {
  return icon ? `https://openweathermap.org/img/wn/${icon}@2x.png` : null
}
