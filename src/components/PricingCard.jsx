import { useApp } from '../state/AppContext'

export default function PricingCard({ plan, onSelect }) {
  const { lowDataMode } = useApp()

  return (
    <div
      className={`relative rounded-xl border bg-white p-6 shadow-sm ${
        plan.popular ? 'border-panchayatGreen-700' : 'border-gray-200'
      }`}
    >
      {plan.popular ? (
        <div className="absolute right-4 top-4 rounded-full bg-panchayatGreen-50 px-3 py-1 text-xs font-bold text-panchayatGreen-700">
          Most popular
        </div>
      ) : null}

      <div className="text-sm font-extrabold text-gray-900">{plan.title}</div>
      <div className="mt-2 text-2xl font-extrabold text-gray-900">
        {plan.price}
      </div>
      <div className="mt-2 text-sm text-gray-700">{plan.highlight}</div>

      <ul className="mt-5 space-y-2 text-sm text-gray-700">
        {plan.features.map((f) => (
          <li key={f} className="flex items-start gap-2">
            <span aria-hidden className="text-panchayatGreen-700">
              ✔
            </span>
            <span>{f}</span>
          </li>
        ))}
      </ul>

      <button
        type="button"
        onClick={() => onSelect?.(plan)}
        className={`mt-6 inline-flex w-full items-center justify-center rounded-lg bg-gray-900 px-4 py-3 text-sm font-semibold text-white focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2 ${
          lowDataMode ? '' : 'transition hover:bg-gray-800'
        }`}
      >
        {plan.cta}
      </button>

      <div className="mt-4 text-xs text-gray-600">
        No hidden charges. Plans are shown clearly before payment.
      </div>
    </div>
  )
}
