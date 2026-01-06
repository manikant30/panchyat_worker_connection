import { Link } from 'react-router-dom'
import { useMemo, useState } from 'react'
import ConfirmationModal from '../components/ConfirmationModal'
import PricingCard from '../components/PricingCard'
import { leadPricing, listingPlans, premiumBenefits } from '../data/siteData'
import { useApp } from '../state/AppContext'

export default function Pricing() {
  const { lowDataMode } = useApp()

  const [selectedPlan, setSelectedPlan] = useState(null)
  const [confirmOpen, setConfirmOpen] = useState(false)
  const [success, setSuccess] = useState(null)

  const confirmText = useMemo(() => {
    if (!selectedPlan) return 'Confirm'
    return `Choose ${selectedPlan.title}`
  }, [selectedPlan])

  const onSelectPlan = (plan) => {
    setSelectedPlan(plan)
    setConfirmOpen(true)
  }

  const confirm = () => {
    if (!selectedPlan) return
    setSuccess({
      title: selectedPlan.title,
      price: selectedPlan.price,
      at: new Date().toISOString(),
    })
    setConfirmOpen(false)
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-6">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <div className="text-2xl font-extrabold text-gray-900">Pricing</div>
          <div className="mt-1 text-sm text-gray-700">
            Transparent pricing for worker listings and contact unlocks.
          </div>
        </div>

        <Link
          to="/register-worker"
          className={`inline-flex items-center justify-center rounded-lg bg-panchayatGreen-700 px-5 py-3 text-sm font-semibold text-white focus:outline-none focus:ring-2 focus:ring-panchayatGreen-600 focus:ring-offset-2 ${
            lowDataMode ? '' : 'transition hover:bg-panchayatGreen-600'
          }`}
        >
          Register as worker
        </Link>
      </div>

      <div className="mt-4 rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
        <div className="text-sm font-extrabold text-gray-900">No hidden charges</div>
        <div className="mt-1 text-sm text-gray-700">
          Every paid action is clearly shown before confirmation. This is a frontend demo.
        </div>
      </div>

      {success ? (
        <div
          className="mt-5 rounded-xl border border-panchayatGreen-100 bg-panchayatGreen-50 p-4 text-sm text-panchayatGreen-700"
          role="status"
        >
          <div className="font-extrabold">Plan selected (UI only)</div>
          <div className="mt-1">
            {success.title} — <span className="font-bold">{success.price}</span>
          </div>
        </div>
      ) : null}

      <section className="mt-6">
        <div className="text-lg font-extrabold text-gray-900">Worker listing fee plans</div>
        <div className="mt-1 text-sm text-gray-700">
          Plans help maintain verification, monitoring and platform operations.
        </div>
        <div className="mt-5 grid gap-4 lg:grid-cols-3">
          {listingPlans.map((plan) => (
            <PricingCard key={plan.id} plan={plan} onSelect={onSelectPlan} />
          ))}
        </div>
      </section>

      <section className="mt-10 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
        <div className="text-lg font-extrabold text-gray-900">Pay-per-lead pricing</div>
        <div className="mt-2 text-sm text-gray-700">
          Contacts are unlocked only after confirmation.
        </div>
        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          {leadPricing.map((row) => (
            <div key={row.label} className="rounded-xl border border-gray-200 bg-gray-50 p-4">
              <div className="text-sm font-bold text-gray-900">{row.label}</div>
              <div className="mt-1 text-sm text-gray-700">{row.value}</div>
            </div>
          ))}
        </div>

        <div className="mt-6 rounded-lg border border-gray-200 bg-gray-50 px-4 py-3 text-xs text-gray-700">
          Pricing ranges are indicative and shown before action.
        </div>
      </section>

      <section className="mt-10 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
        <div className="text-lg font-extrabold text-gray-900">Premium badge benefits</div>
        <div className="mt-2 text-sm text-gray-700">
          Premium improves visibility and trust signals.
        </div>

        <ul className="mt-4 space-y-2 text-sm text-gray-700">
          {premiumBenefits.map((b) => (
            <li key={b} className="flex items-start gap-2">
              <span aria-hidden className="text-panchayatGreen-700">
                ✔
              </span>
              <span>{b}</span>
            </li>
          ))}
        </ul>

        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          <Link
            to="/workers"
            className={`inline-flex items-center justify-center rounded-lg border border-gray-200 bg-white px-5 py-3 text-sm font-semibold text-gray-900 focus:outline-none focus:ring-2 focus:ring-panchayatGreen-600 focus:ring-offset-2 ${
              lowDataMode ? '' : 'transition hover:bg-gray-50'
            }`}
          >
            Browse workers
          </Link>
          <Link
            to="/verification-process"
            className={`inline-flex items-center justify-center rounded-lg bg-gray-900 px-5 py-3 text-sm font-semibold text-white focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2 ${
              lowDataMode ? '' : 'transition hover:bg-gray-800'
            }`}
          >
            See verification process
          </Link>
        </div>
      </section>

      <ConfirmationModal
        open={confirmOpen}
        title="Confirm plan selection"
        description={
          selectedPlan
            ? `This simulates selecting the ${selectedPlan.title} plan (${selectedPlan.price}). No payment is processed.`
            : 'Select a plan.'
        }
        confirmText={confirmText}
        cancelText="Cancel"
        tone="primary"
        onConfirm={confirm}
        onClose={() => setConfirmOpen(false)}
      />
    </div>
  )
}
