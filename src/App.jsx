import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Landing from './pages/Landing'
import Explorer from './pages/Explorer'
import DestinationDetail from './pages/DestinationDetail'

export default function App() {
  return (
    <div className="min-h-screen bg-sand">
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/explore" element={<Explorer />} />
          <Route path="/destination/:slug" element={<DestinationDetail />} />
          <Route
            path="*"
            element={
              <div className="mx-auto max-w-2xl px-5 py-24 text-center sm:px-8">
                <h1 className="font-display text-3xl text-ink">Page not found</h1>
                <p className="mt-2 text-harbor">That page doesn't exist — try exploring destinations instead.</p>
              </div>
            }
          />
        </Routes>
      </main>
      <footer className="border-t border-dusk/10 py-8 text-center text-sm text-harbor">
        Built for the Designesthetics front-end assignment.
      </footer>
    </div>
  )
}
