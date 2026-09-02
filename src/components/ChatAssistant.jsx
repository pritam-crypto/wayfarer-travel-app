import { useRef, useState, useEffect } from 'react'
import { askAboutDestination, generateItinerary, AIError } from '../services/ai'
import { LoadingState, ErrorState } from './StateViews'
import ItineraryView from './ItineraryView'

export default function ChatAssistant({ destination }) {
  const [messages, setMessages] = useState([])
  const [input, setInput] = useState('')
  const [sending, setSending] = useState(false)
  const [chatError, setChatError] = useState(null)
  const scrollRef = useRef(null)

  const [showPlanner, setShowPlanner] = useState(false)
  const [days, setDays] = useState(3)
  const [interests, setInterests] = useState('')
  const [pace, setPace] = useState('balanced')
  const [itinerary, setItinerary] = useState(null)
  const [itineraryLoading, setItineraryLoading] = useState(false)
  const [itineraryError, setItineraryError] = useState(null)

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' })
  }, [messages, sending])

  async function handleSend(e) {
    e.preventDefault()
    const text = input.trim()
    if (!text) return
    const next = [...messages, { role: 'user', text }]
    setMessages(next)
    setInput('')
    setSending(true)
    setChatError(null)
    try {
      const reply = await askAboutDestination(destination, next)
      setMessages([...next, { role: 'assistant', text: reply }])
    } catch (err) {
      setChatError(err instanceof AIError ? err.message : 'Something went wrong. Try again.')
    } finally {
      setSending(false)
    }
  }

  async function handlePlan(e) {
    e.preventDefault()
    setItineraryLoading(true)
    setItineraryError(null)
    setItinerary(null)
    try {
      const result = await generateItinerary(destination, { days, interests, pace })
      setItinerary(result)
    } catch (err) {
      setItineraryError(err instanceof AIError ? err.message : 'Could not build an itinerary. Try again.')
    } finally {
      setItineraryLoading(false)
    }
  }

  return (
    <div className="rounded-xl border border-dusk/10 bg-white/70">
      <div className="flex items-center justify-between border-b border-dusk/10 px-5 py-3.5">
        <h2 className="font-display text-lg text-ink">Ask about {destination.name}</h2>
        <button
          onClick={() => setShowPlanner((s) => !s)}
          aria-expanded={showPlanner}
          className="rounded-full border border-dusk/15 px-3.5 py-1.5 text-sm font-medium text-harbor transition hover:border-dusk/30 hover:text-ink"
        >
          {showPlanner ? 'Hide trip planner' : 'Plan my trip'}
        </button>
      </div>

      {showPlanner && (
        <div className="border-b border-dusk/10 bg-sand/60 px-5 py-4">
          <form onSubmit={handlePlan} className="flex flex-wrap items-end gap-3">
            <div>
              <label htmlFor="days" className="block text-xs font-medium text-harbor">
                Days
              </label>
              <input
                id="days"
                type="number"
                min={1}
                max={10}
                value={days}
                onChange={(e) => setDays(Number(e.target.value))}
                className="mt-1 w-20 rounded-md border border-dusk/15 bg-white px-2 py-1.5 text-sm"
              />
            </div>
            <div className="min-w-[10rem] flex-1">
              <label htmlFor="interests" className="block text-xs font-medium text-harbor">
                Interests (optional)
              </label>
              <input
                id="interests"
                type="text"
                value={interests}
                onChange={(e) => setInterests(e.target.value)}
                placeholder="food, hiking, museums…"
                className="mt-1 w-full rounded-md border border-dusk/15 bg-white px-2.5 py-1.5 text-sm placeholder:text-harbor/50"
              />
            </div>
            <div>
              <label htmlFor="pace" className="block text-xs font-medium text-harbor">
                Pace
              </label>
              <select
                id="pace"
                value={pace}
                onChange={(e) => setPace(e.target.value)}
                className="mt-1 rounded-md border border-dusk/15 bg-white px-2.5 py-1.5 text-sm"
              >
                <option value="relaxed">Relaxed</option>
                <option value="balanced">Balanced</option>
                <option value="packed">Packed</option>
              </select>
            </div>
            <button
              type="submit"
              disabled={itineraryLoading}
              className="rounded-full bg-brass px-5 py-2 text-sm font-semibold text-ink transition hover:bg-brass/90 disabled:opacity-60"
            >
              {itineraryLoading ? 'Building…' : 'Generate itinerary'}
            </button>
          </form>

          <div className="mt-4">
            {itineraryLoading && <LoadingState label="Building your itinerary…" />}
            {itineraryError && <ErrorState message={itineraryError} onRetry={handlePlan} />}
            {itinerary && !itineraryLoading && <ItineraryView days={itinerary} />}
          </div>
        </div>
      )}

      <div ref={scrollRef} className="max-h-80 space-y-3 overflow-y-auto px-5 py-4">
        {messages.length === 0 && (
          <p className="text-sm text-harbor">
            Ask something like "how long should I spend here?" or "what's the best neighbourhood to stay in?"
          </p>
        )}
        {messages.map((m, i) => (
          <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <p
              className={`max-w-[85%] rounded-2xl px-4 py-2 text-sm ${
                m.role === 'user' ? 'bg-ink text-sand' : 'bg-sand text-ink'
              }`}
            >
              {m.text}
            </p>
          </div>
        ))}
        {sending && <LoadingState label="Thinking…" />}
        {chatError && <ErrorState message={chatError} />}
      </div>

      <form onSubmit={handleSend} className="flex gap-2 border-t border-dusk/10 px-5 py-3.5">
        <label htmlFor="chat-input" className="sr-only">
          Ask a question about {destination.name}
        </label>
        <input
          id="chat-input"
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask a question…"
          className="w-full rounded-full border border-dusk/15 bg-white px-4 py-2 text-sm placeholder:text-harbor/50 focus:border-brass"
        />
        <button
          type="submit"
          disabled={sending}
          className="shrink-0 rounded-full bg-ink px-4 py-2 text-sm font-semibold text-sand transition hover:bg-ink/90 disabled:opacity-60"
        >
          Send
        </button>
      </form>
    </div>
  )
}
