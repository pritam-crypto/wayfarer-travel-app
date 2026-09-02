# Wayfarer — Travel Application

A front-end travel app built with React + Vite + Tailwind CSS. Visitors can browse
curated destinations, see notable places for each one, check live weather (their own
location or a searched one), and plan a trip with an AI assistant that renders a real
day-by-day itinerary.

## Features

- **Landing page** — full-bleed hero, with a spot to drop in a looping background video.
- **Destination explorer** — search and filter by region; each destination opens its own page.
- **Famous places** — each destination page lists notable places with photos and context, not a bare list.
- **Location awareness** — visitors can share their browser location or search for a place by name.
- **Real-time weather** — live conditions via OpenWeather, for the visitor's location and for each destination.
- **Images fetched live** — destination and place photos come from the Pexels API, not hardcoded files.
- **AI chatbot** — ask questions about a destination (Google Gemini).
- **Itinerary planning** — generate a day-by-day plan and page through it by day, not as a chat wall of text.
- Loading, empty, and error states throughout; keyboard-accessible controls; responsive from phone to desktop.

## Stack

React 18, React Router, Vite, Tailwind CSS — no backend, everything calls the third-party
APIs directly from the browser using your own free API keys.

## 1. Get your API keys (all free)

| Service | What it's for | Get a key |
|---|---|---|
| OpenWeather | live weather + location search | https://home.openweathermap.org/api_keys |
| Pexels | destination & place photos | https://www.pexels.com/api/ |
| Google Gemini | the AI chatbot & itinerary planner | https://aistudio.google.com/app/apikey |

OpenWeather keys can take up to ~10 minutes to activate after signup — if weather
requests fail with a 401 right after creating a key, wait a few minutes and retry.

## 2. Run it locally

```bash
npm install
cp .env.example .env
# open .env and paste your three keys in
npm run dev
```

Visit the URL Vite prints (usually `http://localhost:5173`).

## 3. Add a hero video (optional but recommended)

The brief asks for a looping background video on the landing page. Grab a short,
royalty-free aerial/travel clip from [Coverr](https://coverr.co) or
[Mixkit](https://mixkit.co/free-stock-video/), drop the `.mp4` into `src/assets/`, and
set `VIDEO_SRC` at the top of `src/components/Hero.jsx` to point at it (e.g.
`import heroVideo from '../assets/hero.mp4'` then `const VIDEO_SRC = heroVideo`).
Without a video it falls back to a still image, so the app works either way.

## 4. Deploy it

Any static host works since this is a pure front-end build. Vercel is the fastest path:

```bash
npm install -g vercel
vercel
```

When prompted, add the same three environment variables (`VITE_OPENWEATHER_KEY`,
`VITE_PEXELS_KEY`, `VITE_GEMINI_KEY`) in the Vercel project settings — `.env` is
gitignored and never gets deployed with your code, so the keys have to be added there
directly. Netlify and GitHub Pages work the same way: set the three `VITE_*` variables
in that platform's environment/site settings before or after the first deploy.

Open the deployed link yourself in a private/incognito window before submitting, to
confirm it works without your local `.env`.

## 5. Push to GitHub

```bash
git init
git add .
git commit -m "Wayfarer travel app"
git branch -M main
git remote add origin <your-empty-github-repo-url>
git push -u origin main
```

Make sure the repository is **public**, and that `.env` never gets committed (it's
already in `.gitignore` — double check with `git status` before your first commit).

## Project structure

```
src/
  data/destinations.js       curated destination + famous-places dataset
  services/                  weather.js, geocode.js, images.js, ai.js — all API calls
  context/LocationContext.jsx  shared visitor-location state
  components/                 Navbar, Hero, DestinationCard, WeatherWidget,
                               PlaceCard, ChatAssistant, ItineraryView,
                               LocationPrompt, SearchFilter, StateViews
  pages/                      Landing, Explorer, DestinationDetail
```

## Notes for the submission form

- **Live link**: the URL from step 4.
- **APIs used**: OpenWeather (weather + geocoding), Pexels (images), Google Gemini (AI chat + itinerary).
- Screenshots: take a few of the landing page, explorer, a destination page, and the itinerary view once your keys are in and the app is running.
