import { useEffect, useState } from 'react'
import { fetchPhoto } from '../services/images'

export default function PlaceCard({ place, destinationName }) {
  const [photo, setPhoto] = useState(null)

  useEffect(() => {
    let cancelled = false
    fetchPhoto(`${place.name} ${destinationName}`).then((p) => {
      if (!cancelled) setPhoto(p)
    })
    return () => {
      cancelled = true
    }
  }, [place.name, destinationName])

  return (
    <article className="overflow-hidden rounded-xl border border-dusk/10 bg-white/50">
      <div className="aspect-[16/10] bg-mist/20">
        {photo && <img src={photo.src} alt={photo.alt} loading="lazy" className="h-full w-full object-cover" />}
      </div>
      <div className="p-4">
        <h3 className="font-display text-base text-ink">{place.name}</h3>
        <p className="mt-1 text-sm text-harbor">{place.note}</p>
      </div>
    </article>
  )
}
