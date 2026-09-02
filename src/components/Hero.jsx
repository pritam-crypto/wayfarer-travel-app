import { Link } from 'react-router-dom'

// Background video source. Swap VIDEO_SRC for a clip from Coverr or Mixkit
// (see README) — a royalty-free aerial/travel loop works best. Falls back
// to a still gradient if the video fails to load or is left unset.
const VIDEO_SRC = ''
const POSTER = 'https://images.pexels.com/photos/1051073/pexels-photo-1051073.jpeg?auto=compress&cs=tinysrgb&w=1600'

export default function Hero() {
  return (
    <section className="relative flex min-h-[86vh] items-end overflow-hidden bg-ink text-sand">
      <div className="absolute inset-0">
        {VIDEO_SRC ? (
          <video
            className="h-full w-full object-cover opacity-70"
            src={VIDEO_SRC}
            poster={POSTER}
            autoPlay
            muted
            loop
            playsInline
          />
        ) : (
          <img src={POSTER} alt="" className="h-full w-full object-cover opacity-60" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/40 to-ink/10" />
      </div>

      <div className="relative mx-auto w-full max-w-6xl px-5 pb-16 pt-40 sm:px-8 sm:pb-24">
        <p className="text-sm font-medium uppercase tracking-wide text-brass">Wayfarer</p>
        <h1 className="mt-4 max-w-2xl font-display text-5xl font-medium leading-[1.05] sm:text-6xl">
          Go somewhere you haven't been yet.
        </h1>
        <p className="mt-5 max-w-md text-base text-mist sm:text-lg">
          Browse real destinations, check what the weather's doing right now, and build a day-by-day
          plan with an AI assistant that knows the place.
        </p>
        <div className="mt-8 flex flex-wrap gap-4">
          <Link
            to="/explore"
            className="rounded-full bg-brass px-6 py-3 text-sm font-semibold text-ink transition hover:bg-brass/90"
          >
            Explore destinations
          </Link>
        </div>
      </div>
    </section>
  )
}
