import { useEffect, useState } from 'react'
import { useLocation } from '../context/LocationContext'
import { searchPlace, GeocodeError } from '../services/geocode'
import { fetchCurrentWeather, iconUrl, WeatherError } from '../services/weather'
import { LoadingState, ErrorState } from './StateViews'

export default function LocationPrompt() {
  const { location, permissionState, requestBrowserLocation, setManualLocation } = useLocation()
  const [query, setQuery] = useState('')
  const [results, setResults] = useState([])
  const [searching, setSearching] = useState(false)
  const [searchError, setSearchError] = useState(null)
  const [weather, setWeather] = useState(null)
  const [weatherError, setWeatherError] = useState(null)
  const [weatherLoading, setWeatherLoading] = useState(false)

  useEffect(() => {
    if (!location) return
    setWeatherLoading(true)
    setWeatherError(null)
    fetchCurrentWeather(location.lat, location.lon)
      .then(setWeather)
      .catch((err) => setWeatherError(err instanceof WeatherError ? err.message : 'Could not load weather.'))
      .finally(() => setWeatherLoading(false))
  }, [location])

  async function handleSearch(e) {
    e.preventDefault()
    if (!query.trim()) return
    setSearching(true)
    setSearchError(null)
    try {
      const places = await searchPlace(query)
      setResults(places)
      if (places.length === 0) setSearchError('No matching places found — try a different spelling.')
    } catch (err) {
      setSearchError(err instanceof GeocodeError ? err.message : 'Search failed. Try again.')
    } finally {
      setSearching(false)
    }
  }

  return (
    <div className="rounded-2xl border border-dusk/10 bg-white/60 p-6 sm:p-8">
      <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
        <div className="max-w-sm">
          <h2 className="font-display text-xl text-ink">What's it like where you are?</h2>
          <p className="mt-1.5 text-sm text-harbor">
            Share your location for live weather, or search for a place instead — Wayfarer works either way.
          </p>

          {permissionState === 'idle' && (
            <button
              onClick={requestBrowserLocation}
              className="mt-4 rounded-full bg-ink px-5 py-2.5 text-sm font-semibold text-sand transition hover:bg-ink/90"
            >
              Use my location
            </button>
          )}
          {permissionState === 'pending' && <LoadingState label="Requesting location…" />}
          {permissionState === 'denied' && (
            <p className="mt-3 text-sm text-signal">
              Location access was denied. Search for a place below instead — nothing is broken.
            </p>
          )}
          {permissionState === 'unsupported' && (
            <p className="mt-3 text-sm text-signal">Your browser doesn't support geolocation. Search below.</p>
          )}

          <form onSubmit={handleSearch} className="mt-4 flex gap-2">
            <label htmlFor="place-search" className="sr-only">
              Search for a place
            </label>
            <input
              id="place-search"
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Try 'Naples' or 'Cusco'"
              className="w-full rounded-full border border-dusk/15 bg-white px-4 py-2 text-sm placeholder:text-harbor/50 focus:border-brass"
            />
            <button
              type="submit"
              className="shrink-0 rounded-full border border-dusk/15 px-4 py-2 text-sm font-medium text-harbor transition hover:border-dusk/30 hover:text-ink"
            >
              Search
            </button>
          </form>

          {searching && <LoadingState label="Searching…" />}
          {searchError && <p className="mt-2 text-sm text-signal">{searchError}</p>}
          {results.length > 0 && (
            <ul className="mt-3 divide-y divide-dusk/10 overflow-hidden rounded-lg border border-dusk/10 bg-white">
              {results.map((place, i) => (
                <li key={i}>
                  <button
                    onClick={() => {
                      setManualLocation(place)
                      setResults([])
                      setQuery('')
                    }}
                    className="w-full px-4 py-2.5 text-left text-sm text-harbor transition hover:bg-sand"
                  >
                    {place.label}
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="w-full max-w-xs shrink-0 rounded-xl bg-harbor/5 p-5">
          {!location && <p className="text-sm text-harbor">No location set yet.</p>}
          {location && weatherLoading && <LoadingState label="Fetching weather…" />}
          {location && weatherError && (
            <ErrorState
              message={weatherError}
              onRetry={() => {
                setWeatherLoading(true)
                fetchCurrentWeather(location.lat, location.lon)
                  .then(setWeather)
                  .catch((err) => setWeatherError(err.message))
                  .finally(() => setWeatherLoading(false))
              }}
            />
          )}
          {location && weather && !weatherLoading && (
            <div>
              <p className="text-xs font-medium uppercase tracking-wide text-brass">{location.label}</p>
              <div className="mt-2 flex items-center gap-3">
                {iconUrl(weather.icon) && (
                  <img src={iconUrl(weather.icon)} alt="" className="h-12 w-12" aria-hidden="true" />
                )}
                <div>
                  <p className="font-display text-3xl text-ink">{weather.tempC}°C</p>
                  <p className="text-sm capitalize text-harbor">{weather.description}</p>
                </div>
              </div>
              <p className="mt-2 text-xs text-harbor">
                Feels like {weather.feelsLikeC}°C · {weather.humidity}% humidity · {weather.windKph} km/h wind
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
