import { useEffect, useState } from 'react'
import { fetchCurrentWeather, iconUrl, WeatherError } from '../services/weather'
import { LoadingState, ErrorState } from './StateViews'

export default function WeatherWidget({ lat, lon, name }) {
  const [weather, setWeather] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  function load() {
    setLoading(true)
    setError(null)
    fetchCurrentWeather(lat, lon)
      .then(setWeather)
      .catch((err) => setError(err instanceof WeatherError ? err.message : 'Could not load weather.'))
      .finally(() => setLoading(false))
  }

  useEffect(load, [lat, lon])

  return (
    <div className="rounded-xl border border-dusk/10 bg-white/60 p-5">
      <p className="text-xs font-medium uppercase tracking-wide text-brass">Right now in {name}</p>
      {loading && <LoadingState label="Checking the weather…" />}
      {error && <ErrorState message={error} onRetry={load} />}
      {weather && !loading && !error && (
        <div className="mt-2 flex items-center gap-3">
          {iconUrl(weather.icon) && <img src={iconUrl(weather.icon)} alt="" className="h-14 w-14" aria-hidden="true" />}
          <div>
            <p className="font-display text-3xl text-ink">{weather.tempC}°C</p>
            <p className="text-sm capitalize text-harbor">
              {weather.description} · feels like {weather.feelsLikeC}°C
            </p>
          </div>
        </div>
      )}
    </div>
  )
}
