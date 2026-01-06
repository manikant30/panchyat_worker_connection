import { useMemo, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import ConfirmationModal from '../components/ConfirmationModal'
import RatingStars from '../components/RatingStars'
import VerificationBadge from '../components/VerificationBadge'
import { workers } from '../data/workers'
import { useApp } from '../state/AppContext'

function initials(name) {
  const parts = String(name || '').trim().split(/\s+/)
  const first = parts[0]?.[0] || ''
  const second = parts[1]?.[0] || ''
  return (first + second).toUpperCase()
}

function formatDateTime(iso) {
  try {
    return new Date(iso).toLocaleString()
  } catch {
    return iso
  }
}

export default function WorkerProfile() {
  const { workerId } = useParams()
  const worker = useMemo(
    () => workers.find((w) => w.id === workerId) || null,
    [workerId]
  )

  const {
    lowDataMode,
    isWorkerSaved,
    toggleSavedWorker,
    addContactEntry,
  } = useApp()

  const [paidOpen, setPaidOpen] = useState(false)
  const [callOpen, setCallOpen] = useState(false)
  const [success, setSuccess] = useState(null)

  const saved = worker ? isWorkerSaved(worker.id) : false

  const confirmPaid = () => {
    if (!worker) return
    const entry = addContactEntry({ workerId: worker.id, type: 'paid_lead' })
    setSuccess({
      type: 'paid_lead',
      phone: worker.phone,
      at: entry.createdAt,
    })
    setPaidOpen(false)
  }

  const confirmCall = () => {
    if (!worker) return
    const entry = addContactEntry({ workerId: worker.id, type: 'call_request' })
    setSuccess({ type: 'call_request', at: entry.createdAt })
    setCallOpen(false)
  }

  if (!worker) {
    return (
      <div className="mx-auto max-w-6xl px-4 py-10">
        <div className="rounded-2xl border border-gray-200 bg-white p-8 text-center shadow-sm">
          <div className="text-2xl font-extrabold text-gray-900">
            Worker not found
          </div>
          <div className="mt-2 text-sm text-gray-700">
            The profile you requested is not available.
          </div>
          <div className="mt-6">
            <Link
              to="/workers"
              className={`inline-flex items-center justify-center rounded-lg bg-panchayatGreen-700 px-5 py-3 text-sm font-semibold text-white focus:outline-none focus:ring-2 focus:ring-panchayatGreen-600 focus:ring-offset-2 ${
                lowDataMode ? '' : 'transition hover:bg-panchayatGreen-600'
              }`}
            >
              Back to worker listing
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <Link
            to="/workers"
            className={`inline-flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm font-semibold text-gray-900 focus:outline-none focus:ring-2 focus:ring-panchayatGreen-600 focus:ring-offset-2 ${
              lowDataMode ? '' : 'transition hover:bg-gray-50'
            }`}
          >
            <span aria-hidden>←</span>
            Back
          </Link>
          <div className="mt-3 text-2xl font-extrabold text-gray-900">
            Worker profile
          </div>
          <div className="mt-1 text-sm text-gray-700">
            Verified profile details and contact actions.
          </div>
        </div>

        <button
          type="button"
          onClick={() => toggleSavedWorker(worker.id)}
          className={`inline-flex items-center justify-center rounded-lg border px-4 py-3 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-panchayatGreen-600 focus:ring-offset-2 ${
            saved
              ? 'border-panchayatGreen-700 bg-panchayatGreen-50 text-panchayatGreen-700'
              : 'border-gray-200 bg-white text-gray-900'
          } ${lowDataMode ? '' : 'transition hover:bg-gray-50'}`}
          aria-pressed={saved}
        >
          <span aria-hidden className="mr-2">
            {saved ? '♥' : '♡'}
          </span>
          {saved ? 'Saved' : 'Save worker'}
        </button>
      </div>

      {success ? (
        <div
          className="mt-5 rounded-xl border border-panchayatGreen-100 bg-panchayatGreen-50 p-4 text-sm text-panchayatGreen-700"
          role="status"
        >
          <div className="font-extrabold text-panchayatGreen-700">
            Action completed
          </div>
          {success.type === 'paid_lead' ? (
            <div className="mt-1">
              Contact unlocked: <span className="font-bold">{success.phone}</span>
            </div>
          ) : (
            <div className="mt-1">Call request recorded (UI only).</div>
          )}
          <div className="mt-1 text-xs text-panchayatGreen-700">
            Recorded at: {formatDateTime(success.at)}
          </div>
        </div>
      ) : null}

      <div className="mt-6 grid gap-6 lg:grid-cols-3">
        <div className="space-y-4 lg:col-span-2">
          <section className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
            <div className="flex items-start gap-4">
              <div
                className={`flex h-16 w-16 items-center justify-center rounded-2xl text-base font-extrabold text-gray-800 ${
                  lowDataMode
                    ? 'bg-gray-100'
                    : 'bg-gradient-to-br from-gray-100 to-gray-200'
                }`}
                aria-hidden
              >
                {initials(worker.name)}
              </div>

              <div className="min-w-0 flex-1">
                <div className="text-xl font-extrabold text-gray-900">
                  {worker.name}
                </div>
                <div className="mt-1 text-sm text-gray-700">
                  {worker.skill} • {worker.experienceYears} years experience
                </div>
                <div className="mt-2 flex flex-wrap items-center gap-2">
                  <VerificationBadge
                    panchayatName={worker.panchayatName}
                    verifiedOn={worker.verifiedOn}
                  />
                  <RatingStars rating={worker.rating} reviewsCount={worker.reviewsCount} />
                </div>
                <div className="mt-2 text-xs text-gray-600">
                  {worker.village} • {worker.panchayatName}
                </div>
              </div>
            </div>
          </section>

          <section className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
            <div className="text-sm font-extrabold text-gray-900">Skills</div>
            <div className="mt-3 text-sm text-gray-700">
              <span className="font-bold text-gray-900">Primary:</span> {worker.primarySkill}
            </div>
            <div className="mt-3 flex flex-wrap gap-2">
              {worker.subSkills.map((s) => (
                <span
                  key={s}
                  className="rounded-full border border-gray-200 bg-gray-50 px-3 py-1 text-xs font-semibold text-gray-700"
                >
                  {s}
                </span>
              ))}
            </div>
          </section>

          <section className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
            <div className="text-sm font-extrabold text-gray-900">Work history</div>
            <div className="mt-1 text-xs text-gray-600">
              Years active: {worker.experienceYears}
            </div>
            <div className="mt-4 space-y-3">
              {worker.workHistory.map((p) => (
                <div key={p.project + p.year} className="rounded-lg bg-gray-50 p-3">
                  <div className="text-sm font-bold text-gray-900">{p.project}</div>
                  <div className="mt-1 text-xs text-gray-600">Year: {p.year}</div>
                </div>
              ))}
            </div>
          </section>

          <section className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
            <div className="text-sm font-extrabold text-gray-900">Availability</div>
            <div className="mt-3 grid gap-3 sm:grid-cols-2">
              <div className="rounded-lg border border-gray-200 bg-gray-50 p-3">
                <div className="text-xs font-bold text-gray-700">Work type</div>
                <div className="mt-1 text-sm font-semibold text-gray-900">
                  {worker.availability}
                </div>
              </div>
              <div className="rounded-lg border border-gray-200 bg-gray-50 p-3">
                <div className="text-xs font-bold text-gray-700">Service area</div>
                <div className="mt-1 text-sm font-semibold text-gray-900">
                  {worker.serviceArea.slice(0, 2).join(', ')}
                </div>
                {worker.serviceArea.length > 2 ? (
                  <div className="mt-1 text-xs text-gray-600">
                    +{worker.serviceArea.length - 2} more areas
                  </div>
                ) : null}
              </div>
            </div>
          </section>

          <section className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <div className="text-sm font-extrabold text-gray-900">
                  Reviews & ratings
                </div>
                <div className="mt-1 text-xs text-gray-600">
                  Static demo reviews to show trust signals.
                </div>
              </div>
              <RatingStars rating={worker.rating} reviewsCount={worker.reviewsCount} />
            </div>

            <div className="mt-4 space-y-3">
              {worker.reviews.map((r) => (
                <div key={r.id} className="rounded-lg border border-gray-200 bg-gray-50 p-4">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <div className="text-sm font-bold text-gray-900">{r.name}</div>
                      <div className="mt-1 text-xs text-gray-600">{r.date}</div>
                    </div>
                    <RatingStars rating={r.rating} />
                  </div>
                  <div className="mt-3 text-sm text-gray-700">“{r.text}”</div>
                </div>
              ))}
            </div>
          </section>
        </div>

        <aside className="space-y-4">
          <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
            <div className="text-sm font-extrabold text-gray-900">Contact CTA</div>
            <div className="mt-2 text-sm text-gray-700">
              Choose a contact option. Confirmation is required before action.
            </div>

            <div className="mt-5 space-y-2">
              <button
                type="button"
                onClick={() => setPaidOpen(true)}
                className={`inline-flex w-full items-center justify-center rounded-lg bg-gray-900 px-4 py-3 text-sm font-semibold text-white focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2 ${
                  lowDataMode ? '' : 'transition hover:bg-gray-800'
                }`}
              >
                Get Contact (Paid Lead)
              </button>

              <button
                type="button"
                onClick={() => setCallOpen(true)}
                className={`inline-flex w-full items-center justify-center rounded-lg border border-gray-200 bg-white px-4 py-3 text-sm font-semibold text-gray-900 focus:outline-none focus:ring-2 focus:ring-panchayatGreen-600 focus:ring-offset-2 ${
                  lowDataMode ? '' : 'transition hover:bg-gray-50'
                }`}
              >
                Request Call
              </button>
            </div>

            <div className="mt-4 rounded-lg border border-gray-200 bg-gray-50 px-4 py-3 text-xs text-gray-700">
              Paid lead pricing: ₹10–₹30 per contact. (UI only)
            </div>
          </div>

          <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
            <div className="text-sm font-extrabold text-gray-900">Trust note</div>
            <div className="mt-2 text-sm text-gray-700">
              Verification confirms identity, not work guarantee.
            </div>
            <div className="mt-4">
              <Link
                to="/verification-process"
                className={`inline-flex w-full items-center justify-center rounded-lg border border-gray-200 bg-white px-4 py-3 text-sm font-semibold text-gray-900 focus:outline-none focus:ring-2 focus:ring-panchayatGreen-600 focus:ring-offset-2 ${
                  lowDataMode ? '' : 'transition hover:bg-gray-50'
                }`}
              >
                See verification process
              </Link>
            </div>
          </div>
        </aside>
      </div>

      <ConfirmationModal
        open={paidOpen}
        title="Confirm paid lead"
        description="This simulates a paid lead (₹10–₹30) to unlock contact details. It will be recorded in your contact history."
        confirmText="Unlock contact"
        cancelText="Cancel"
        tone="neutral"
        onConfirm={confirmPaid}
        onClose={() => setPaidOpen(false)}
      />

      <ConfirmationModal
        open={callOpen}
        title="Confirm call request"
        description="This will record a call request (UI only) and add it to your contact history."
        confirmText="Request call"
        cancelText="Cancel"
        onConfirm={confirmCall}
        onClose={() => setCallOpen(false)}
      />
    </div>
  )
}
