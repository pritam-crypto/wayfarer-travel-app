export default function SearchFilter({ query, setQuery, region, setRegion, regions }) {
  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
      <label className="sr-only" htmlFor="destination-search">
        Search destinations
      </label>
      <input
        id="destination-search"
        type="search"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search destinations or countries…"
        className="w-full rounded-full border border-dusk/15 bg-white px-4 py-2.5 text-sm text-ink placeholder:text-harbor/50 focus:border-brass sm:max-w-xs"
      />
      <div className="flex flex-wrap gap-2" role="group" aria-label="Filter by region">
        <button
          onClick={() => setRegion('')}
          aria-pressed={region === ''}
          className={`rounded-full px-3.5 py-1.5 text-sm transition ${
            region === '' ? 'bg-ink text-sand' : 'bg-white text-harbor hover:bg-dusk/5'
          }`}
        >
          All
        </button>
        {regions.map((r) => (
          <button
            key={r}
            onClick={() => setRegion(r)}
            aria-pressed={region === r}
            className={`rounded-full px-3.5 py-1.5 text-sm transition ${
              region === r ? 'bg-ink text-sand' : 'bg-white text-harbor hover:bg-dusk/5'
            }`}
          >
            {r}
          </button>
        ))}
      </div>
    </div>
  )
}
