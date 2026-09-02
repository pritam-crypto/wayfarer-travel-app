import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { fetchPhoto } from '../services/images'

export default function DestinationCard({ destination }) {
  const [photo, setPhoto] = useState(null)
  const [imgLoaded, setImgLoaded] = useState(false)

  useEffect(() => {
    let cancelled = false
    fetchPhoto(`${destination.name} ${destination.country} skyline`).then((p) => {
      if (!cancelled) setPhoto(p)
    })
    return () => {
      cancelled = true
    }
  }, [destination.name, destination.country])

  return (
    <Link
      to={`/destination/${destination.slug}`}
      className="group block overflow-hidden rounded-xl border border-dusk/10 bg-white/50 transition hover:border-dusk/20 hover:shadow-md"
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-mist/20">
        {photo ? (
          <img
            src={photo.src}
            alt={photo.alt}
            loading="lazy"
            onLoad={() => setImgLoaded(true)}
            className={`h-full w-full object-cover transition duration-500 group-hover:scale-105 ${
              imgLoaded ? 'opacity-100' : 'opacity-0'
            }`}
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-xs text-harbor/60">
            {destination.name}
          </div>
        )}
      </div>
      <div className="p-4">
        <p className="text-xs font-medium uppercase tracking-wide text-brass">{destination.region}</p>
        <h3 className="mt-1 font-display text-lg text-ink">
          {destination.name}, <span className="text-harbor">{destination.country}</span>
        </h3>
        <p className="mt-1.5 text-sm text-harbor line-clamp-2">{destination.tagline}</p>
      </div>
    </Link>
  )
}
