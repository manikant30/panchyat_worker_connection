import { Link } from 'react-router-dom'
import { useApp } from '../state/AppContext'
import { t } from '../utils/text'
import RatingStars from './RatingStars'
import VerificationBadge from './VerificationBadge'

function initials(name) {
  const parts = String(name || '').trim().split(/\s+/)
  const first = parts[0]?.[0] || ''
  const second = parts[1]?.[0] || ''
  return (first + second).toUpperCase()
}

export default function WorkerCard({ worker }) {
  const { language, lowDataMode, isWorkerSaved, toggleSavedWorker } = useApp()

  const saved = isWorkerSaved(worker.id)

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
      <div className="flex items-start gap-4">
        <div
          className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-xl text-sm font-extrabold text-gray-800 ${
            lowDataMode
              ? 'bg-gray-100'
              : 'bg-gradient-to-br from-gray-100 to-gray-200'
          }`}
          aria-hidden
        >
          {initials(worker.name)}
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              <div className="truncate text-base font-extrabold text-gray-900">
                {worker.name}
              </div>
              <div className="mt-1 text-sm text-gray-700">
                {worker.skill} • {worker.experienceYears} yrs
              </div>
              <div className="mt-1 text-xs text-gray-600">
                {worker.village} • {worker.panchayatName}
              </div>
            </div>

            <button
              type="button"
              onClick={() => toggleSavedWorker(worker.id)}
              className={`inline-flex h-10 w-10 items-center justify-center rounded-lg border px-2 text-lg font-bold focus:outline-none focus:ring-2 focus:ring-panchayatGreen-600 focus:ring-offset-2 ${
                saved
                  ? 'border-panchayatGreen-700 bg-panchayatGreen-50 text-panchayatGreen-700'
                  : 'border-gray-200 bg-white text-gray-700'
              } ${lowDataMode ? '' : 'transition hover:bg-gray-50'}`}
              aria-label={saved ? t(language, 'unsaveWorker') : t(language, 'saveWorker')}
              aria-pressed={saved}
            >
              <span aria-hidden>{saved ? '♥' : '♡'}</span>
            </button>
          </div>

          <div className="mt-2 flex flex-wrap items-center gap-2">
            <VerificationBadge
              panchayatName={worker.panchayatName}
              verifiedOn={worker.verifiedOn}
            />
            <RatingStars rating={worker.rating} reviewsCount={worker.reviewsCount} />
          </div>

          <div className="mt-4 flex flex-wrap gap-2">
            <Link
              to={`/workers/${worker.id}`}
              className={`inline-flex items-center justify-center rounded-lg bg-panchayatGreen-700 px-4 py-2.5 text-sm font-semibold text-white focus:outline-none focus:ring-2 focus:ring-panchayatGreen-600 focus:ring-offset-2 ${
                lowDataMode ? '' : 'transition hover:bg-panchayatGreen-600'
              }`}
            >
              {t(language, 'viewProfile')}
            </Link>
            <Link
              to="/register-worker"
              className={`inline-flex items-center justify-center rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-sm font-semibold text-gray-900 focus:outline-none focus:ring-2 focus:ring-panchayatGreen-600 focus:ring-offset-2 ${
                lowDataMode ? '' : 'transition hover:bg-gray-50'
              }`}
            >
              {t(language, 'registerWorker')}
            </Link>
          </div>
        </div>
      </div>

      <div className="mt-4 border-t border-gray-200 pt-3 text-xs text-gray-600">
        <span className="font-semibold text-gray-700">Service area:</span>{' '}
        {Array.isArray(worker.serviceArea) && worker.serviceArea.length
          ? worker.serviceArea.slice(0, 3).join(', ') +
            (worker.serviceArea.length > 3
              ? ` +${worker.serviceArea.length - 3} more`
              : '')
          : 'Local area'}
      </div>
    </div>
  )
}
