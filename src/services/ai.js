const KEY = import.meta.env.VITE_GEMINI_KEY
const MODEL =  'gemini-flash-latest'
const ENDPOINT = `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent`

export class AIError extends Error {}

async function callGemini(contents, { json = false } = {}) {
  if (!KEY) {
    throw new AIError('The AI assistant isn\'t configured yet — add VITE_GEMINI_KEY to your .env file.')
  }
  const body = {
    contents,
    generationConfig: json ? { responseMimeType: 'application/json' } : undefined,
  }
  let res
  try {
    res = await fetch(`${ENDPOINT}?key=${KEY}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    })
  } catch {
    throw new AIError('Could not reach the AI assistant. Check your connection and try again.')
  }
  if (!res.ok) {
    if (res.status === 400) throw new AIError('The AI assistant rejected that request. Check VITE_GEMINI_KEY.')
    throw new AIError('The AI assistant is unavailable right now. Try again shortly.')
  }
  const data = await res.json()
  const text = data.candidates?.[0]?.content?.parts?.[0]?.text
  if (!text) throw new AIError('The AI assistant returned an empty response.')
  return text
}

// Free-form Q&A about a destination, given the chat history so far.
export async function askAboutDestination(destination, history) {
  const systemContext = {
    role: 'user',
    parts: [
      {
        text: `You are a knowledgeable, concise travel assistant embedded in a page about ${destination.name}, ${destination.country}. Answer questions about how long to spend there, what to see, and when to go. Keep answers under 120 words unless the visitor asks for more detail. Known highlights: ${destination.famousPlaces.map((p) => p.name).join(', ')}.`,
      },
    ],
  }
  const modelAck = { role: 'model', parts: [{ text: `Happy to help with ${destination.name}.` }] }
  const conversation = history.map((m) => ({
    role: m.role === 'user' ? 'user' : 'model',
    parts: [{ text: m.text }],
  }))
  return callGemini([systemContext, modelAck, ...conversation])
}

// Generates a structured day-by-day itinerary as JSON, so the UI can
// render it as a real plan rather than a block of chat text.
export async function generateItinerary(destination, { days, interests, pace }) {
  const prompt = `Create a ${days}-day travel itinerary for a visitor to ${destination.name}, ${destination.country}.
Pace preference: ${pace}. Interests: ${interests || 'general sightseeing'}.
Consider these known highlights where relevant: ${destination.famousPlaces.map((p) => p.name).join(', ')}.
Respond ONLY with JSON matching this exact shape, no markdown fences, no commentary:
{
  "days": [
    {
      "day": 1,
      "title": "short theme for the day",
      "activities": [
        { "time": "Morning", "activity": "what to do", "note": "one short practical tip" }
      ]
    }
  ]
}
Each day should have 3-4 activities across Morning, Afternoon, and Evening.`

  const raw = await callGemini([{ role: 'user', parts: [{ text: prompt }] }], { json: true })
  try {
    const cleaned = raw.trim().replace(/^```json\s*/i, '').replace(/```\s*$/, '')
    const parsed = JSON.parse(cleaned)
    if (!Array.isArray(parsed.days)) throw new Error('bad shape')
    return parsed.days
  } catch {
    throw new AIError('The itinerary came back in a format we couldn\'t read. Try generating it again.')
  }
}
