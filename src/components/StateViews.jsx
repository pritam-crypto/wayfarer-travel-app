export function LoadingState({ label = 'Loading…' }) {
  return (
    <div role="status" className="flex items-center gap-3 py-6 text-mist">
      <span className="h-4 w-4 animate-spin rounded-full border-2 border-mist border-t-transparent" aria-hidden="true" />
      <span className="text-sm">{label}</span>
    </div>
  )
}

export function EmptyState({ title, description, action }) {
  return (
    <div className="rounded-lg border border-dusk/10 bg-white/40 px-6 py-10 text-center">
      <p className="font-display text-lg text-ink">{title}</p>
      {description && <p className="mx-auto mt-2 max-w-sm text-sm text-harbor">{description}</p>}
      {action && <div className="mt-4">{action}</div>}
    </div>
  )
}

export function ErrorState({ message, onRetry }) {
  return (
    <div role="alert" className="rounded-lg border border-signal/30 bg-signal/5 px-5 py-4">
      <p className="text-sm text-signal">{message}</p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="mt-3 rounded-md border border-signal/40 px-3 py-1.5 text-sm font-medium text-signal transition hover:bg-signal/10"
        >
          Try again
        </button>
      )}
    </div>
  )
}
