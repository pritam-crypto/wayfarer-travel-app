import Hero from '../components/Hero'
import DestinationCard from '../components/DestinationCard'
import destinations from '../data/destinations'
import { Link } from 'react-router-dom'
import LocationPrompt from '../components/LocationPrompt'

const featured = destinations.slice(0, 3)

export default function Landing() {
  return (
    <div>
      <Hero />

      <section className="mx-auto max-w-6xl px-5 py-16 sm:px-8">
        <LocationPrompt />
      </section>

      <section className="mx-auto max-w-6xl px-5 pb-20 sm:px-8">
        <div className="flex items-end justify-between gap-4">
          <div>
            <h2 className="font-display text-2xl text-ink sm:text-3xl">Where to start</h2>
            <p className="mt-1 text-harbor">A few places worth building a trip around.</p>
          </div>
          <Link to="/explore" className="hidden shrink-0 text-sm font-medium text-brass hover:underline sm:block">
            See all destinations
          </Link>
        </div>
        <div className="mt-7 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((d) => (
            <DestinationCard key={d.slug} destination={d} />
          ))}
        </div>
        <Link to="/explore" className="mt-6 inline-block text-sm font-medium text-brass hover:underline sm:hidden">
          See all destinations
        </Link>
      </section>
    </div>
  )
}
