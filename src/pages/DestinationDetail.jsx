import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { getDestinationBySlug } from '../data/destinations'
import { fetchPhoto } from '../services/images'
import WeatherWidget from '../components/WeatherWidget'
import PlaceCard from '../components/PlaceCard'
import ChatAssistant from '../components/ChatAssistant'
import { EmptyState } from '../components/StateViews'

export default function DestinationDetail() {
  const { slug } = useParams()
  const destination = getDestinationBySlug(slug)
  const [heroPhoto, setHeroPhoto] = useState(null)

  useEffect(() => {
    if (!destination) return
    let cancelled = false
    fetchPhoto(`${destination.name} ${destination.country} landmark`).then((p) => {
      if (!cancelled) setHeroPhoto(p)
    })
    return () => {
      cancelled = true
    }
  }, [destination])

  if (!destination) {
    return (
      <div className="mx-auto max-w-2xl px-5 py-20 sm:px-8">
        <EmptyState
          title="We couldn't find that destination"
          description="It may have been renamed or removed."
          action={
            <Link to="/explore" className="text-sm font-medium text-brass hover:underline">
              Back to all destinations
            </Link>
          }
        />
      </div>
    )
  }

  return (
    <div>
      <div className="relative h-[46vh] min-h-[320px] overflow-hidden bg-ink">
        {heroPhoto && (
          <img src={heroPhoto.src} alt={heroPhoto.alt} className="h-full w-full object-cover opacity-70" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/30 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 mx-auto max-w-6xl px-5 pb-8 sm:px-8">
          <p className="text-sm font-medium uppercase tracking-wide text-brass">{destination.region}</p>
          <h1 className="mt-1 font-display text-4xl text-sand sm:text-5xl">
            {destination.name}, {destination.country}
          </h1>
          <p className="mt-2 max-w-lg text-mist">{destination.tagline}</p>
        </div>
      </div>

      <div className="mx-auto grid max-w-6xl gap-8 px-5 py-10 sm:px-8 lg:grid-cols-[1fr_320px]">
        <div className="space-y-10">
          <section>
            <h2 className="font-display text-2xl text-ink">About {destination.name}</h2>
            <p className="mt-3 max-w-prose text-harbor">{destination.blurb}</p>
            <p className="mt-3 text-sm text-harbor">
              <span className="font-medium text-ink">Best time to visit:</span> {destination.bestTime}
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl text-ink">Famous places</h2>
            <div className="mt-4 grid grid-cols-1 gap-5 sm:grid-cols-2">
              {destination.famousPlaces.map((place) => (
                <PlaceCard key={place.name} place={place} destinationName={destination.name} />
              ))}
            </div>
          </section>

          <section>
            <ChatAssistant destination={destination} />
          </section>
        </div>

        <aside className="space-y-6 lg:sticky lg:top-24 lg:self-start">
          <WeatherWidget lat={destination.lat} lon={destination.lon} name={destination.name} />
        </aside>
      </div>
    </div>
  )
}
