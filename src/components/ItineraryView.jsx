import { useState } from 'react'

export default function ItineraryView({ days }) {
  const [activeDay, setActiveDay] = useState(days[0]?.day ?? 1)
  const current = days.find((d) => d.day === activeDay) ?? days[0]

  return (
    <div className="rounded-xl border border-dusk/10 bg-white/70 p-5">
      <div className="flex flex-wrap gap-2" role="tablist" aria-label="Itinerary days">
        {days.map((d) => (
          <button
            key={d.day}
            role="tab"
            aria-selected={activeDay === d.day}
            onClick={() => setActiveDay(d.day)}
            className={`rounded-full px-4 py-1.5 text-sm font-medium transition ${
              activeDay === d.day ? 'bg-ink text-sand' : 'bg-sand text-harbor hover:bg-dusk/10'
            }`}
          >
            Day {d.day}
          </button>
        ))}
      </div>

      {current && (
        <div role="tabpanel" className="mt-5">
          <h3 className="font-display text-lg text-ink">{current.title}</h3>
          <ol className="mt-4 space-y-4 border-l border-dusk/15 pl-5">
            {current.activities.map((a, i) => (
              <li key={i} className="relative">
                <span
                  className="absolute -left-[26px] top-1.5 h-2.5 w-2.5 rounded-full bg-brass"
                  aria-hidden="true"
                />
                <p className="text-xs font-medium uppercase tracking-wide text-brass">{a.time}</p>
                <p className="mt-0.5 text-sm font-medium text-ink">{a.activity}</p>
                {a.note && <p className="mt-0.5 text-sm text-harbor">{a.note}</p>}
              </li>
            ))}
          </ol>
        </div>
      )}
    </div>
  )
}
