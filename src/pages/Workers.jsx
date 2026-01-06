import { useEffect, useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import FilterBar from '../components/FilterBar'
import SkeletonLoader from '../components/SkeletonLoader'
import WorkerCard from '../components/WorkerCard'
import {
  experienceOptions,
  panchayatOptions,
  ratingOptions,
  workerCategories,
  workers,
} from '../data/workers'
import { useApp } from '../state/AppContext'

function buildSkillOptions() {
  return [
    { id: 'any', label: 'Any skill' },
    ...workerCategories.map((c) => ({ id: c.id, label: c.name })),
  ]
}

function matchesExperience(worker, experience) {
  if (experience === 'any') return true
  if (experience === '0-2') return worker.experienceYears >= 0 && worker.experienceYears <= 2
  if (experience === '3-5') return worker.experienceYears >= 3 && worker.experienceYears <= 5
  if (experience === '5+') return worker.experienceYears >= 5
  return true
}

export default function Workers() {
  const { lowDataMode } = useApp()
  const [searchParams] = useSearchParams()

  const initialSkill = searchParams.get('skill') || 'any'

  const [filters, setFilters] = useState({
    panchayat: 'any',
    skill: initialSkill,
    experience: 'any',
    rating: 'any',
  })

  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const t = window.setTimeout(() => setLoading(false), 450)
    return () => window.clearTimeout(t)
  }, [])

  const skillOptions = useMemo(() => buildSkillOptions(), [])

  const filteredWorkers = useMemo(() => {
    const minRating = filters.rating === 'any' ? null : Number(filters.rating)

    return workers
      .filter((w) => {
        const okPanchayat = filters.panchayat === 'any' || w.panchayatId === filters.panchayat
        const okSkill = filters.skill === 'any' || w.skillId === filters.skill
        const okExperience = matchesExperience(w, filters.experience)
        const okRating = minRating === null ? true : w.rating >= minRating
        return okPanchayat && okSkill && okExperience && okRating
      })
      .sort((a, b) => b.rating - a.rating)
  }, [filters])

  const emptyMessage =
    filters.panchayat !== 'any'
      ? 'No verified workers found in this Panchayat yet.'
      : 'No verified workers match your filters yet.'

  return (
    <div className="mx-auto max-w-6xl px-4 py-6">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <div className="text-2xl font-extrabold text-gray-900">
            Worker listing
          </div>
          <div className="mt-1 text-sm text-gray-700">
            Search Panchayat-verified workers by location, skill, experience and rating.
          </div>
        </div>

        <div className="rounded-lg border border-gray-200 bg-white px-3 py-2 text-xs font-semibold text-gray-700">
          Showing <span className="font-extrabold">{filteredWorkers.length}</span> workers
        </div>
      </div>

      <div className="mt-5">
        <FilterBar
          filters={filters}
          onChange={setFilters}
          panchayatOptions={panchayatOptions}
          skillOptions={skillOptions}
          experienceOptions={experienceOptions}
          ratingOptions={ratingOptions}
        />
      </div>

      {lowDataMode ? (
        <div className="mt-4 rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-xs font-semibold text-gray-700">
          Low Data Mode is ON — animations are reduced.
        </div>
      ) : null}

      <div className="mt-6">
        {loading ? (
          <SkeletonLoader count={6} />
        ) : filteredWorkers.length ? (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {filteredWorkers.map((w) => (
              <WorkerCard key={w.id} worker={w} />
            ))}
          </div>
        ) : (
          <div className="rounded-xl border border-gray-200 bg-white p-6 text-center shadow-sm">
            <div className="text-base font-extrabold text-gray-900">No results</div>
            <div className="mt-2 text-sm text-gray-700">{emptyMessage}</div>
            <div className="mt-4 text-xs text-gray-600">
              Try changing filters or choose “Any Panchayat”.
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
