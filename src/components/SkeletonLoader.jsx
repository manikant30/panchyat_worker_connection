import { useApp } from '../state/AppContext'

export default function SkeletonLoader({ count = 6 }) {
  const { lowDataMode } = useApp()

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: count }).map((_, idx) => (
        <div
          key={idx}
          className={`rounded-xl border border-gray-200 bg-white p-4 shadow-sm ${
            lowDataMode ? '' : 'animate-pulse'
          }`}
        >
          <div className="flex items-start gap-4">
            <div className="h-14 w-14 rounded-xl bg-gray-200" />
            <div className="flex-1">
              <div className="h-4 w-2/3 rounded bg-gray-200" />
              <div className="mt-2 h-3 w-1/2 rounded bg-gray-200" />
              <div className="mt-3 h-6 w-full rounded bg-gray-100" />
            </div>
          </div>
          <div className="mt-4 h-3 w-3/4 rounded bg-gray-100" />
        </div>
      ))}
    </div>
  )
}
