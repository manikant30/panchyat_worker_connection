import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import ConfirmationModal from '../components/ConfirmationModal'
import PricingCard from '../components/PricingCard'
import { listingPlans } from '../data/siteData'
import { panchayatOptions, workerCategories } from '../data/workers'
import { useApp } from '../state/AppContext'

const steps = [
  { title: 'Personal Details' },
  { title: 'Skill Details' },
  { title: 'Experience' },
  { title: 'Document Upload' },
  { title: 'Panchayat Approval Status' },
  { title: 'Payment (Listing Fee)' },
]

function Field({ label, children, hint }) {
  return (
    <label className="block">
      <span className="block text-xs font-bold text-gray-700">{label}</span>
      <div className="mt-1">{children}</div>
      {hint ? <div className="mt-1 text-xs text-gray-600">{hint}</div> : null}
    </label>
  )
}

function Input(props) {
  return (
    <input
      {...props}
      className={
        'w-full rounded-lg border border-gray-200 bg-white px-3 py-2.5 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-panchayatGreen-600 ' +
        (props.className || '')
      }
    />
  )
}

function Select({ value, onChange, options }) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2.5 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-panchayatGreen-600"
    >
      {options.map((o) => (
        <option key={o.id} value={o.id}>
          {o.label || o.name}
        </option>
      ))}
    </select>
  )
}

export default function WorkerRegistration() {
  const { lowDataMode } = useApp()

  const [step, setStep] = useState(0)
  const [confirmOpen, setConfirmOpen] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const [form, setForm] = useState({
    fullName: '',
    phone: '',
    village: '',
    panchayatId: 'rampur',
    skillId: 'mason',
    primarySkill: '',
    experienceYears: '3',
    availability: 'Full-time',
    aadhaarFileName: '',
    photoFileName: '',
    approvalStatus: 'Pending',
    planId: 'standard',
    paymentStatus: 'Unpaid',
  })

  const selectedPlan = useMemo(
    () => listingPlans.find((p) => p.id === form.planId) || listingPlans[0],
    [form.planId]
  )

  const progress = Math.round(((step + 1) / steps.length) * 100)

  const canNext = useMemo(() => {
    if (step === 0) return form.fullName.trim() && form.phone.trim()
    if (step === 1) return form.skillId && form.primarySkill.trim()
    if (step === 2) return Number(form.experienceYears) >= 0
    return true
  }, [form, step])

  const update = (key, value) => setForm((prev) => ({ ...prev, [key]: value }))

  const confirmSubmit = () => {
    setSubmitted(true)
    setConfirmOpen(false)
  }

  const stepTitle = steps[step]?.title

  return (
    <div className="mx-auto max-w-6xl px-4 py-6">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <div className="text-2xl font-extrabold text-gray-900">
            Worker registration
          </div>
          <div className="mt-1 text-sm text-gray-700">
            Step-by-step onboarding UI (no backend).
          </div>
        </div>

        <Link
          to="/workers"
          className={`inline-flex items-center justify-center rounded-lg border border-gray-200 bg-white px-4 py-3 text-sm font-semibold text-gray-900 focus:outline-none focus:ring-2 focus:ring-panchayatGreen-600 focus:ring-offset-2 ${
            lowDataMode ? '' : 'transition hover:bg-gray-50'
          }`}
        >
          View workers
        </Link>
      </div>

      {submitted ? (
        <div
          className="mt-5 rounded-xl border border-panchayatGreen-100 bg-panchayatGreen-50 p-4 text-sm text-panchayatGreen-700"
          role="status"
        >
          <div className="font-extrabold">Registration submitted (UI only)</div>
          <div className="mt-1">
            Status shown below can be updated in the Panchayat dashboard UI.
          </div>
        </div>
      ) : null}

      <div className="mt-6 rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <div className="text-sm font-extrabold text-gray-900">{stepTitle}</div>
            <div className="mt-1 text-xs text-gray-600">
              Step {step + 1} of {steps.length}
            </div>
          </div>
          <div className="text-xs font-semibold text-gray-700">{progress}%</div>
        </div>

        <div className="mt-4 h-2 w-full rounded-full bg-gray-200">
          <div
            className="h-2 rounded-full bg-panchayatGreen-700"
            style={{ width: `${progress}%` }}
            aria-hidden
          />
        </div>

        <ol className="mt-5 grid gap-2 sm:grid-cols-3 lg:grid-cols-6" aria-label="Registration steps">
          {steps.map((s, idx) => {
            const active = idx === step
            const done = idx < step
            return (
              <li
                key={s.title}
                className={`rounded-lg border px-3 py-2 text-xs font-semibold ${
                  active
                    ? 'border-panchayatGreen-700 bg-panchayatGreen-50 text-panchayatGreen-700'
                    : done
                    ? 'border-gray-200 bg-gray-50 text-gray-700'
                    : 'border-gray-200 bg-white text-gray-500'
                }`}
              >
                {idx + 1}. {s.title}
              </li>
            )
          })}
        </ol>
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-3">
        <div className="space-y-4 lg:col-span-2">
          {step === 0 ? (
            <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
              <div className="grid gap-4 sm:grid-cols-2">
                <Field label="Full name" hint="As per Aadhaar (UI only)">
                  <Input
                    value={form.fullName}
                    onChange={(e) => update('fullName', e.target.value)}
                    placeholder="Enter full name"
                  />
                </Field>
                <Field label="Mobile number" hint="No OTP. No verification.">
                  <Input
                    value={form.phone}
                    onChange={(e) => update('phone', e.target.value)}
                    placeholder="+91 XXXXX XXXXX"
                  />
                </Field>
                <Field label="Village">
                  <Input
                    value={form.village}
                    onChange={(e) => update('village', e.target.value)}
                    placeholder="Enter village"
                  />
                </Field>
                <Field label="Panchayat">
                  <Select
                    value={form.panchayatId}
                    onChange={(v) => update('panchayatId', v)}
                    options={panchayatOptions.filter((p) => p.id !== 'any')}
                  />
                </Field>
              </div>
            </div>
          ) : null}

          {step === 1 ? (
            <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
              <div className="grid gap-4 sm:grid-cols-2">
                <Field label="Skill category">
                  <Select
                    value={form.skillId}
                    onChange={(v) => update('skillId', v)}
                    options={workerCategories.map((c) => ({ id: c.id, label: c.name }))}
                  />
                </Field>
                <Field label="Primary skill">
                  <Input
                    value={form.primarySkill}
                    onChange={(e) => update('primarySkill', e.target.value)}
                    placeholder="e.g., Masonry, Painting"
                  />
                </Field>
              </div>

              <div className="mt-4 rounded-lg border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-700">
                Add sub-skills in the next steps via work history and notes (UI only).
              </div>
            </div>
          ) : null}

          {step === 2 ? (
            <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
              <div className="grid gap-4 sm:grid-cols-2">
                <Field label="Experience (years)">
                  <Input
                    type="number"
                    min="0"
                    value={form.experienceYears}
                    onChange={(e) => update('experienceYears', e.target.value)}
                  />
                </Field>
                <Field label="Availability">
                  <Select
                    value={form.availability}
                    onChange={(v) => update('availability', v)}
                    options={[
                      { id: 'Full-time', label: 'Full-time' },
                      { id: 'Part-time', label: 'Part-time' },
                    ]}
                  />
                </Field>
              </div>

              <Field label="Short work note" hint="Shown on profile (UI only)">
                <Input placeholder="e.g., Brick work, plaster, tile fixing" />
              </Field>
            </div>
          ) : null}

          {step === 3 ? (
            <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
              <div className="text-sm font-extrabold text-gray-900">Document upload</div>
              <div className="mt-1 text-xs text-gray-600">
                UI only. Files are not uploaded anywhere.
              </div>

              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                <Field label="Aadhaar document (placeholder)">
                  <input
                    type="file"
                    className="block w-full text-sm text-gray-700 file:mr-3 file:rounded-lg file:border-0 file:bg-gray-900 file:px-4 file:py-2.5 file:text-sm file:font-semibold file:text-white"
                    onChange={(e) =>
                      update(
                        'aadhaarFileName',
                        e.target.files?.[0]?.name || ''
                      )
                    }
                  />
                  {form.aadhaarFileName ? (
                    <div className="mt-2 text-xs font-semibold text-gray-700">
                      Selected: {form.aadhaarFileName}
                    </div>
                  ) : null}
                </Field>

                <Field label="Profile photo (placeholder)">
                  <input
                    type="file"
                    className="block w-full text-sm text-gray-700 file:mr-3 file:rounded-lg file:border-0 file:bg-gray-900 file:px-4 file:py-2.5 file:text-sm file:font-semibold file:text-white"
                    onChange={(e) =>
                      update('photoFileName', e.target.files?.[0]?.name || '')
                    }
                  />
                  {form.photoFileName ? (
                    <div className="mt-2 text-xs font-semibold text-gray-700">
                      Selected: {form.photoFileName}
                    </div>
                  ) : null}
                </Field>
              </div>

              <div className="mt-4 rounded-lg border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-700">
                Tip: Low Data Mode keeps the UI light by avoiding image previews.
              </div>
            </div>
          ) : null}

          {step === 4 ? (
            <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
              <div className="text-sm font-extrabold text-gray-900">
                Panchayat approval status
              </div>
              <div className="mt-1 text-xs text-gray-600">
                This is UI-only. Status can be changed in the Panchayat dashboard.
              </div>

              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                {['Pending', 'Approved'].map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => update('approvalStatus', s)}
                    className={`rounded-xl border p-4 text-left focus:outline-none focus:ring-2 focus:ring-panchayatGreen-600 focus:ring-offset-2 ${
                      form.approvalStatus === s
                        ? 'border-panchayatGreen-700 bg-panchayatGreen-50'
                        : 'border-gray-200 bg-white'
                    } ${lowDataMode ? '' : 'transition hover:bg-gray-50'}`}
                  >
                    <div className="text-sm font-extrabold text-gray-900">{s}</div>
                    <div className="mt-1 text-sm text-gray-700">
                      {s === 'Pending'
                        ? 'Awaiting Panchayat verification.'
                        : 'Approved badge is active on profile.'}
                    </div>
                  </button>
                ))}
              </div>

              <div className="mt-4 rounded-lg border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-700">
                Verification confirms identity, not work guarantee.
              </div>
            </div>
          ) : null}

          {step === 5 ? (
            <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <div className="text-sm font-extrabold text-gray-900">
                    Listing fee plans
                  </div>
                  <div className="mt-1 text-xs text-gray-600">
                    Choose a plan. Payment is UI-only.
                  </div>
                </div>
                <div className="rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-xs font-semibold text-gray-700">
                  Payment: <span className="font-extrabold">{form.paymentStatus}</span>
                </div>
              </div>

              <div className="mt-5 grid gap-4 lg:grid-cols-3">
                {listingPlans.map((plan) => (
                  <div
                    key={plan.id}
                    className={
                      form.planId === plan.id
                        ? 'rounded-2xl ring-2 ring-panchayatGreen-700'
                        : ''
                    }
                  >
                    <PricingCard
                      plan={plan}
                      onSelect={() => update('planId', plan.id)}
                    />
                  </div>
                ))}
              </div>

              <div className="mt-5 flex flex-col gap-2 sm:flex-row">
                <button
                  type="button"
                  onClick={() => update('paymentStatus', 'Paid')}
                  className={`inline-flex items-center justify-center rounded-lg bg-gray-900 px-5 py-3 text-sm font-semibold text-white focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2 ${
                    lowDataMode ? '' : 'transition hover:bg-gray-800'
                  }`}
                >
                  Pay listing fee (UI only)
                </button>
                <button
                  type="button"
                  onClick={() => setConfirmOpen(true)}
                  className={`inline-flex items-center justify-center rounded-lg bg-panchayatGreen-700 px-5 py-3 text-sm font-semibold text-white focus:outline-none focus:ring-2 focus:ring-panchayatGreen-600 focus:ring-offset-2 ${
                    lowDataMode ? '' : 'transition hover:bg-panchayatGreen-600'
                  }`}
                >
                  Submit registration
                </button>
              </div>
            </div>
          ) : null}

          <div className="flex items-center justify-between gap-3">
            <button
              type="button"
              onClick={() => setStep((s) => Math.max(0, s - 1))}
              className={`inline-flex items-center justify-center rounded-lg border border-gray-200 bg-white px-4 py-3 text-sm font-semibold text-gray-900 focus:outline-none focus:ring-2 focus:ring-panchayatGreen-600 focus:ring-offset-2 ${
                step === 0 ? 'opacity-50' : ''
              } ${lowDataMode ? '' : 'transition hover:bg-gray-50'}`}
              disabled={step === 0}
            >
              Back
            </button>

            <button
              type="button"
              onClick={() => setStep((s) => Math.min(steps.length - 1, s + 1))}
              className={`inline-flex items-center justify-center rounded-lg bg-panchayatGreen-700 px-4 py-3 text-sm font-semibold text-white focus:outline-none focus:ring-2 focus:ring-panchayatGreen-600 focus:ring-offset-2 ${
                canNext ? '' : 'opacity-50'
              } ${lowDataMode ? '' : 'transition hover:bg-panchayatGreen-600'}`}
              disabled={!canNext || step === steps.length - 1}
            >
              Next
            </button>
          </div>
        </div>

        <aside className="space-y-4">
          <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
            <div className="text-sm font-extrabold text-gray-900">Preview</div>
            <div className="mt-3 text-sm text-gray-700">
              <div className="font-bold text-gray-900">
                {form.fullName || 'Your name'}
              </div>
              <div className="mt-1">
                Category:{' '}
                <span className="font-semibold text-gray-900">
                  {workerCategories.find((c) => c.id === form.skillId)?.name}
                </span>
              </div>
              <div className="mt-1">
                Experience:{' '}
                <span className="font-semibold text-gray-900">
                  {form.experienceYears} years
                </span>
              </div>
              <div className="mt-1">
                Approval: <span className="font-semibold">{form.approvalStatus}</span>
              </div>
              <div className="mt-1">
                Plan: <span className="font-semibold">{selectedPlan.title}</span>
              </div>
            </div>

            <div className="mt-4 rounded-lg border border-gray-200 bg-gray-50 px-4 py-3 text-xs text-gray-700">
              Contact and payment details are UI-only.
            </div>
          </div>

          <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
            <div className="text-sm font-extrabold text-gray-900">Trust note</div>
            <div className="mt-2 text-sm text-gray-700">
              The Panchayat badge indicates identity verification.
            </div>
            <div className="mt-2 text-xs text-gray-600">
              Verification confirms identity, not work guarantee.
            </div>
          </div>
        </aside>
      </div>

      <ConfirmationModal
        open={confirmOpen}
        title="Confirm registration submission"
        description="This will submit your onboarding details (UI only). You can view approval actions in the Panchayat dashboard."
        confirmText="Submit"
        cancelText="Cancel"
        tone="primary"
        onConfirm={confirmSubmit}
        onClose={() => setConfirmOpen(false)}
      />
    </div>
  )
}
