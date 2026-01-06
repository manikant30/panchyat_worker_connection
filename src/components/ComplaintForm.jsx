import { useMemo, useState } from 'react'
import { workers } from '../data/workers'
import { useApp } from '../state/AppContext'
import ConfirmationModal from './ConfirmationModal'

const categories = [
  'Fake profile / identity issue',
  'Payment dispute',
  'Work quality complaint',
  'Behavior / safety concern',
  'Other',
]

export default function ComplaintForm({ defaultWorkerId = '' }) {
  const { submitComplaint, lowDataMode } = useApp()

  const [workerId, setWorkerId] = useState(defaultWorkerId)
  const [category, setCategory] = useState(categories[0])
  const [description, setDescription] = useState('')
  const [confirmOpen, setConfirmOpen] = useState(false)
  const [success, setSuccess] = useState(null)

  const workerName = useMemo(() => {
    if (!workerId) return null
    return workers.find((w) => w.id === workerId)?.name || null
  }, [workerId])

  const canSubmit = description.trim().length >= 10

  const submit = () => {
    const created = submitComplaint({
      workerId: workerId || null,
      category,
      description: description.trim(),
    })

    setSuccess({
      id: created.id,
      workerName,
    })
    setDescription('')
    setCategory(categories[0])
    setWorkerId('')
    setConfirmOpen(false)
  }

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
      <div className="text-sm font-extrabold text-gray-900">
        Submit a complaint
      </div>
      <div className="mt-1 text-xs text-gray-600">
        This is UI-only. Status updates appear in your dashboard timeline.
      </div>

      {success ? (
        <div
          className="mt-4 rounded-lg border border-panchayatGreen-100 bg-panchayatGreen-50 px-3 py-2 text-sm text-panchayatGreen-700"
          role="status"
        >
          Complaint submitted. ID: <span className="font-bold">{success.id}</span>
          {success.workerName ? (
            <span className="ml-1">for {success.workerName}</span>
          ) : null}
        </div>
      ) : null}

      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        <label className="block">
          <span className="block text-xs font-bold text-gray-700">
            Worker (optional)
          </span>
          <select
            value={workerId}
            onChange={(e) => setWorkerId(e.target.value)}
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
          <span className="block text-xs font-bold text-gray-700">Category</span>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="mt-1 w-full rounded-lg border border-gray-200 bg-white px-3 py-2.5 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-panchayatGreen-600"
          >
            {categories.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </label>
      </div>

      <label className="mt-3 block">
        <span className="block text-xs font-bold text-gray-700">Description</span>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={4}
          placeholder="Explain the issue (min 10 characters)"
          className="mt-1 w-full rounded-lg border border-gray-200 bg-white px-3 py-2.5 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-panchayatGreen-600"
        />
      </label>

      <div className="mt-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div className="text-xs text-gray-600">
          Verification confirms identity, not work guarantee.
        </div>
        <button
          type="button"
          onClick={() => setConfirmOpen(true)}
          disabled={!canSubmit}
          className={`inline-flex items-center justify-center rounded-lg bg-gray-900 px-4 py-3 text-sm font-semibold text-white focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2 ${
            canSubmit ? '' : 'opacity-50'
          } ${lowDataMode ? '' : 'transition hover:bg-gray-800'}`}
        >
          Submit complaint
        </button>
      </div>

      <ConfirmationModal
        open={confirmOpen}
        title="Confirm complaint submission"
        description="Your complaint will be recorded for monitoring and shown in your dashboard timeline."
        confirmText="Submit"
        cancelText="Cancel"
        tone="neutral"
        onConfirm={submit}
        onClose={() => setConfirmOpen(false)}
      />
    </div>
  )
}
