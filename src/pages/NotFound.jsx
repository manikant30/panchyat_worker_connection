import { Link } from 'react-router-dom'
import { useApp } from '../state/AppContext'
import { t } from '../utils/text'

export default function NotFound() {
  const { language, lowDataMode } = useApp()

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <div className="rounded-2xl border border-gray-200 bg-white p-8 text-center shadow-sm">
        <div className="text-2xl font-extrabold text-gray-900">Page not found</div>
        <div className="mt-2 text-sm text-gray-700">
          The page you’re looking for doesn’t exist.
        </div>

        <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
          <Link
            to="/"
            className={`inline-flex items-center justify-center rounded-lg border border-gray-200 bg-white px-5 py-3 text-sm font-semibold text-gray-900 focus:outline-none focus:ring-2 focus:ring-panchayatGreen-600 focus:ring-offset-2 ${
              lowDataMode ? '' : 'transition hover:bg-gray-50'
            }`}
          >
            Go to Home
          </Link>
          <Link
            to="/workers"
            className={`inline-flex items-center justify-center rounded-lg bg-panchayatGreen-700 px-5 py-3 text-sm font-semibold text-white focus:outline-none focus:ring-2 focus:ring-panchayatGreen-600 focus:ring-offset-2 ${
              lowDataMode ? '' : 'transition hover:bg-panchayatGreen-600'
            }`}
          >
            {t(language, 'findWorkers')}
          </Link>
        </div>
      </div>
    </div>
  )
}
