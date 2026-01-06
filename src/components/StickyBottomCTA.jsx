import { Link, useLocation } from 'react-router-dom'
import { useApp } from '../state/AppContext'
import { t } from '../utils/text'

export default function StickyBottomCTA() {
  const { language, lowDataMode } = useApp()
  const location = useLocation()

  const onRegister = location.pathname.startsWith('/register-worker')

  return (
    <div
      className={`sm:hidden fixed inset-x-0 bottom-0 z-40 border-t border-gray-200 ${
        lowDataMode ? 'bg-white' : 'bg-white/95 backdrop-blur'
      }`}
    >
      <div className="mx-auto flex max-w-6xl items-center gap-3 px-4 py-3">
        <Link
          to="/workers"
          className={`inline-flex flex-1 items-center justify-center rounded-lg bg-panchayatGreen-700 px-4 py-3 text-sm font-semibold text-white focus:outline-none focus:ring-2 focus:ring-panchayatGreen-600 focus:ring-offset-2 ${
            lowDataMode ? '' : 'transition hover:bg-panchayatGreen-600'
          }`}
        >
          {t(language, 'findWorkers')}
        </Link>
        <Link
          to="/register-worker"
          className={`inline-flex items-center justify-center rounded-lg border border-gray-200 bg-white px-4 py-3 text-sm font-semibold text-gray-900 focus:outline-none focus:ring-2 focus:ring-panchayatGreen-600 focus:ring-offset-2 ${
            onRegister
              ? 'border-panchayatGreen-600'
              : lowDataMode
              ? ''
              : 'transition hover:bg-gray-50'
          }`}
        >
          {t(language, 'registerWorker')}
        </Link>
      </div>
    </div>
  )
}
