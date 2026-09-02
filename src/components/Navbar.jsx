import { Link, NavLink } from 'react-router-dom'

export default function Navbar() {
  return (
    <header className="sticky top-0 z-40 border-b border-dusk/10 bg-sand/90 backdrop-blur">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4 sm:px-8" aria-label="Primary">
        <Link to="/" className="font-display text-xl font-semibold tracking-tight text-ink">
          Wayfarer
        </Link>
        <div className="flex items-center gap-6 text-sm font-medium text-harbor">
          <NavLink
            to="/explore"
            className={({ isActive }) => (isActive ? 'text-ink' : 'transition hover:text-ink')}
          >
            Explore
          </NavLink>
        </div>
      </nav>
    </header>
  )
}
