import { Link } from 'react-router-dom'
import { useMemo, useState } from 'react'
import ComplaintForm from '../components/ComplaintForm'
import ConfirmationModal from '../components/ConfirmationModal'
import RatingStars from '../components/RatingStars'
import Tooltip from '../components/Tooltip'
import { workers } from '../data/workers'
import { useApp } from '../state/AppContext'

function formatDateTime(iso) {
  try {
    return new Date(iso).toLocaleString()
  } catch {
    return iso
  }
}

function contactTypeLabel(type) {
  if (type === 'paid_lead') return 'Paid lead (contact unlocked)'
  if (type === 'call_request') return 'Call request'
  return type
}

export default function UserDashboard() {
  const {
    lowDataMode,
    savedWorkerIds,
    contactHistory,
    complaints,
  } = useApp()

  const workerById = useMemo(() => {
    const map = new Map()
    workers.forEach((w) => map.set(w.id, w))
    return map
  }, [])

  const savedWorkers = useMemo(
    () => savedWorkerIds.map((id) => workerById.get(id)).filter(Boolean),
    [savedWorkerIds, workerById]
  )

  const [reviewsGiven, setReviewsGiven] = useState(() => [
    {
      id: 'ur_1',
      workerId: 'w_103',
      rating: 5,
      date: 'Dec 2025',
      text: 'Strong fitting work and polite communication.',
    },
    {
      id: 'ur_2',
      workerId: 'w_102',
      rating: 4,
      date: 'Nov 2025',
      text: 'Neat painting finish. Completed on time.',
    },
  ])

  const [reviewDraft, setReviewDraft] = useState({
    workerId: '',
    rating: '5',
    text: '',
  })
  const [reviewConfirmOpen, setReviewConfirmOpen] = useState(false)

  const canSubmitReview =
    reviewDraft.workerId && reviewDraft.text.trim().length >= 10

  const submitReview = () => {
    const review = {
      id: `ur_${Date.now()}`,
      workerId: reviewDraft.workerId,
      rating: Number(reviewDraft.rating),
      date: new Date().toLocaleDateString('en-GB', {
        month: 'short',
        year: 'numeric',
      }),
      text: reviewDraft.text.trim(),
    }

    setReviewsGiven((prev) => [review, ...prev])
    setReviewDraft({ workerId: '', rating: '5', text: '' })
    setReviewConfirmOpen(false)
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-6">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <div className="text-2xl font-extrabold text-gray-900">User Dashboard</div>
          <div className="mt-1 text-sm text-gray-700">
            Saved workers, contact history, reviews and complaint tracking.
          </div>
        </div>

        <Link
          to="/workers"
          className={`inline-flex items-center justify-center rounded-lg bg-panchayatGreen-700 px-5 py-3 text-sm font-semibold text-white focus:outline-none focus:ring-2 focus:ring-panchayatGreen-600 focus:ring-offset-2 ${
            lowDataMode ? '' : 'transition hover:bg-panchayatGreen-600'
          }`}
        >
          Find workers
        </Link>
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-2">
          <section className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <div className="text-base font-extrabold text-gray-900">Saved workers</div>
                <div className="mt-1 text-sm text-gray-700">
                  Keep a shortlist for quick comparison and hiring.
                </div>
              </div>
              <div className="rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-xs font-semibold text-gray-700">
                Saved: <span className="font-extrabold">{savedWorkers.length}</span>
              </div>
            </div>

            <div className="mt-5">
              {savedWorkers.length ? (
                <div className="grid gap-4 sm:grid-cols-2">
                  {savedWorkers.map((w) => (
                    <Link
                      key={w.id}
                      to={`/workers/${w.id}`}
                      className={`rounded-xl border border-gray-200 bg-gray-50 p-4 focus:outline-none focus:ring-2 focus:ring-panchayatGreen-600 ${
                        lowDataMode ? '' : 'transition hover:bg-white'
                      }`}
                    >
                      <div className="text-sm font-extrabold text-gray-900">{w.name}</div>
                      <div className="mt-1 text-sm text-gray-700">
                        {w.skill} • {w.experienceYears} yrs
                      </div>
                      <div className="mt-2">
                        <RatingStars rating={w.rating} reviewsCount={w.reviewsCount} />
                      </div>
                      <div className="mt-2 text-xs text-gray-600">
                        {w.panchayatName}
                      </div>
                    </Link>
                  ))}
                </div>
              ) : (
                <div className="rounded-xl border border-gray-200 bg-gray-50 p-6 text-center">
                  <div className="text-base font-extrabold text-gray-900">No saved workers</div>
                  <div className="mt-2 text-sm text-gray-700">
                    Save a worker from the listing to see them here.
                  </div>
                </div>
              )}
            </div>
          </section>

          <section className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
            <div className="text-base font-extrabold text-gray-900">Contact history</div>
            <div className="mt-1 text-sm text-gray-700">
              Records of paid leads and call requests (UI only).
            </div>

            <div className="mt-5 space-y-3">
              {contactHistory.length ? (
                contactHistory.slice(0, 12).map((c) => {
                  const w = workerById.get(c.workerId)

                  return (
                    <div
                      key={c.id}
                      className="rounded-xl border border-gray-200 bg-gray-50 p-4"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <div className="text-sm font-extrabold text-gray-900">
                            {w ? w.name : 'Worker'}
                          </div>
                          <div className="mt-1 text-xs text-gray-600">
                            {w ? `${w.skill} • ${w.panchayatName}` : ''}
                          </div>
                        </div>
                        <Tooltip content={`Entry ID: ${c.id}`}>
                          <span className="inline-flex items-center rounded-full border border-gray-200 bg-white px-3 py-1 text-xs font-semibold text-gray-700">
                            {contactTypeLabel(c.type)}
                          </span>
                        </Tooltip>
                      </div>
                      <div className="mt-2 text-xs text-gray-600">
                        {formatDateTime(c.createdAt)}
                      </div>
                      <div className="mt-3">
                        <Link
                          to={`/workers/${c.workerId}`}
                          className={`inline-flex items-center justify-center rounded-lg border border-gray-200 bg-white px-3 py-2 text-xs font-semibold text-gray-900 focus:outline-none focus:ring-2 focus:ring-panchayatGreen-600 focus:ring-offset-2 ${
                            lowDataMode ? '' : 'transition hover:bg-gray-50'
                          }`}
                        >
                          View profile
                        </Link>
                      </div>
                    </div>
                  )
                })
              ) : (
                <div className="rounded-xl border border-gray-200 bg-gray-50 p-6 text-center">
                  <div className="text-base font-extrabold text-gray-900">No history yet</div>
                  <div className="mt-2 text-sm text-gray-700">
                    Unlock a contact or request a call to see it here.
                  </div>
                </div>
              )}
            </div>
          </section>

          <section className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <div className="text-base font-extrabold text-gray-900">Reviews given</div>
                <div className="mt-1 text-sm text-gray-700">
                  UI-only reviews list to demonstrate trust feedback.
                </div>
              </div>
              <div className="rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-xs font-semibold text-gray-700">
                Total: <span className="font-extrabold">{reviewsGiven.length}</span>
              </div>
            </div>

            <div className="mt-5 space-y-3">
              {reviewsGiven.map((r) => {
                const w = workerById.get(r.workerId)
                return (
                  <div
                    key={r.id}
                    className="rounded-xl border border-gray-200 bg-gray-50 p-4"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <div className="text-sm font-extrabold text-gray-900">
                          {w ? w.name : 'Worker'}
                        </div>
                        <div className="mt-1 text-xs text-gray-600">{r.date}</div>
                      </div>
                      <RatingStars rating={r.rating} />
                    </div>
                    <div className="mt-3 text-sm text-gray-700">“{r.text}”</div>
                  </div>
                )
              })}
            </div>

            <div className="mt-6 rounded-xl border border-gray-200 bg-white p-4">
              <div className="text-sm font-extrabold text-gray-900">Write a review</div>
              <div className="mt-1 text-xs text-gray-600">
                This adds a review locally (UI only).
              </div>

              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                <label className="block">
                  <span className="block text-xs font-bold text-gray-700">Worker</span>
                  <select
                    value={reviewDraft.workerId}
                    onChange={(e) =>
                      setReviewDraft((p) => ({ ...p, workerId: e.target.value }))
                    }
                    className="mt-1 w-full rounded-lg border border-gray-200 bg-white px-3 py-2.5 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-panchayatGreen-600"
                  >
                    <option value="">Select worker</option>
                    {workers.map((w) => (
                      <option key={w.id} value={w.id}>
                        {w.name} — {w.skill}
                      </option>
                    ))}
                  </select>
                </label>

                <label className="block">
                  <span className="block text-xs font-bold text-gray-700">Rating</span>
                  <select
                    value={reviewDraft.rating}
                    onChange={(e) =>
                      setReviewDraft((p) => ({ ...p, rating: e.target.value }))
                    }
                    className="mt-1 w-full rounded-lg border border-gray-200 bg-white px-3 py-2.5 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-panchayatGreen-600"
                  >
                    {[5, 4, 3, 2, 1].map((v) => (
                      <option key={v} value={String(v)}>
                        {v}
                      </option>
                    ))}
                  </select>
                </label>
              </div>

              <label className="mt-3 block">
                <span className="block text-xs font-bold text-gray-700">Review text</span>
                <textarea
                  value={reviewDraft.text}
                  onChange={(e) =>
                    setReviewDraft((p) => ({ ...p, text: e.target.value }))
                  }
                  rows={3}
                  placeholder="Write your review (min 10 characters)"
                  className="mt-1 w-full rounded-lg border border-gray-200 bg-white px-3 py-2.5 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-panchayatGreen-600"
                />
              </label>

              <div className="mt-3 flex items-center justify-end">
                <button
                  type="button"
                  disabled={!canSubmitReview}
                  onClick={() => setReviewConfirmOpen(true)}
                  className={`inline-flex items-center justify-center rounded-lg bg-gray-900 px-4 py-3 text-sm font-semibold text-white focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2 ${
                    canSubmitReview ? '' : 'opacity-50'
                  } ${lowDataMode ? '' : 'transition hover:bg-gray-800'}`}
                >
                  Submit review
                </button>
              </div>
            </div>
          </section>
        </div>

        <aside className="space-y-6">
          <section className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
            <div className="text-base font-extrabold text-gray-900">Submit complaint</div>
            <div className="mt-1 text-sm text-gray-700">
              Raise an issue and track it in your complaint timeline.
            </div>
            <div className="mt-4">
              <ComplaintForm />
            </div>
          </section>

          <section className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
            <div className="text-base font-extrabold text-gray-900">
              Complaint status timeline
            </div>
            <div className="mt-1 text-sm text-gray-700">
              See updates added by the Panchayat dashboard (UI only).
            </div>

            <div className="mt-4 space-y-3">
              {complaints.length ? (
                complaints.slice(0, 6).map((c) => {
                  const w = c.workerId ? workerById.get(c.workerId) : null

                  return (
                    <div key={c.id} className="rounded-xl border border-gray-200 bg-gray-50 p-4">
                      <div className="text-sm font-extrabold text-gray-900">
                        {c.category}
                      </div>
                      <div className="mt-1 text-xs text-gray-600">
                        {w ? `${w.name} • ${w.skill}` : 'General complaint'}
                      </div>
                      <div className="mt-2 text-sm text-gray-700">{c.description}</div>

                      <div className="mt-3 rounded-lg border border-gray-200 bg-white px-3 py-2">
                        <div className="text-xs font-bold text-gray-700">Current status</div>
                        <div className="mt-1 text-sm font-semibold text-gray-900">
                          {c.status}
                        </div>
                      </div>

                      <div className="mt-3">
                        <div className="text-xs font-bold text-gray-700">Timeline</div>
                        <div className="mt-2 space-y-2">
                          {(c.timeline || []).map((t, idx) => (
                            <div key={t.label + idx} className="flex items-start gap-3">
                              <div
                                aria-hidden
                                className="mt-0.5 h-2.5 w-2.5 rounded-full bg-panchayatGreen-700"
                              />
                              <div>
                                <div className="text-xs font-extrabold text-gray-900">
                                  {t.label}
                                </div>
                                <div className="text-xs text-gray-600">
                                  {formatDateTime(t.at)}
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )
                })
              ) : (
                <div className="rounded-xl border border-gray-200 bg-gray-50 p-6 text-center">
                  <div className="text-base font-extrabold text-gray-900">No complaints</div>
                  <div className="mt-2 text-sm text-gray-700">
                    Submit a complaint to see its status timeline here.
                  </div>
                </div>
              )}
            </div>

            <div className="mt-4 rounded-lg border border-gray-200 bg-gray-50 px-4 py-3 text-xs text-gray-700">
              Verification confirms identity, not work guarantee.
            </div>
          </section>
        </aside>
      </div>

      <ConfirmationModal
        open={reviewConfirmOpen}
        title="Confirm review submission"
        description="This will add your review to the dashboard list (UI only)."
        confirmText="Submit"
        cancelText="Cancel"
        tone="neutral"
        onConfirm={submitReview}
        onClose={() => setReviewConfirmOpen(false)}
      />
    </div>
  )
}
