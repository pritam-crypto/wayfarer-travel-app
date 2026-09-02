import { useMemo, useState } from 'react'
import destinations, { regions } from '../data/destinations'
import DestinationCard from '../components/DestinationCard'
import SearchFilter from '../components/SearchFilter'
import { EmptyState } from '../components/StateViews'

export default function Explorer() {
  const [query, setQuery] = useState('')
  const [region, setRegion] = useState('')

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    return destinations.filter((d) => {
      const matchesQuery = !q || d.name.toLowerCase().includes(q) || d.country.toLowerCase().includes(q)
      const matchesRegion = !region || d.region === region
      return matchesQuery && matchesRegion
    })
  }, [query, region])

  return (
    <div className="mx-auto max-w-6xl px-5 py-12 sm:px-8">
      <div className="max-w-2xl">
        <h1 className="font-display text-3xl text-ink sm:text-4xl">Explore destinations</h1>
        <p className="mt-2 text-harbor">
          {destinations.length} places worth building a trip around. Search by name, or filter by region.
        </p>
      </div>

      <div className="mt-8">
        <SearchFilter query={query} setQuery={setQuery} region={region} setRegion={setRegion} regions={regions} />
      </div>

      {filtered.length === 0 ? (
        <div className="mt-10">
          <EmptyState
            title="No destinations match that search"
            description="Try a different city, country, or clear the region filter."
          />
        </div>
      ) : (
        <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((d) => (
            <DestinationCard key={d.slug} destination={d} />
          ))}
        </div>
      )}
    </div>
  )
}
