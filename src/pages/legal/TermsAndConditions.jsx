import { Link } from 'react-router-dom'
import { useApp } from '../../state/AppContext'

export default function TermsAndConditions() {
  const { lowDataMode } = useApp()

  return (
    <div className="mx-auto max-w-4xl px-4 py-8">
      <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
        <div className="text-2xl font-extrabold text-gray-900">Terms & Conditions</div>
        <div className="mt-2 text-sm text-gray-700">Last updated: 06/01/2026</div>

        <div className="mt-6 space-y-5 text-sm text-gray-700">
          <section>
            <div className="text-sm font-extrabold text-gray-900">Frontend-only demo</div>
            <div className="mt-2">
              This project is a UI demonstration only. No backend services are provided.
              Worker profiles, payments, contacts, and statistics are static/dummy.
            </div>
          </section>

          <section>
            <div className="text-sm font-extrabold text-gray-900">User responsibilities</div>
            <div className="mt-2">
              You should verify the scope of work, timeline and pricing directly with the
              worker. Use the complaint flow responsibly.
            </div>
          </section>

          <section>
            <div className="text-sm font-extrabold text-gray-900">Payments</div>
            <div className="mt-2">
              Any “listing fee” or “paid lead” actions are simulated. No real payment is
              collected.
            </div>
          </section>

          <section>
            <div className="text-sm font-extrabold text-gray-900">Availability</div>
            <div className="mt-2">
              The UI may change without notice. The platform does not guarantee job
              availability or worker availability.
            </div>
          </section>

          <section className="rounded-xl border border-gray-200 bg-gray-50 p-4">
            <div className="text-sm font-extrabold text-gray-900">Disclaimer</div>
            <div className="mt-2">
              Verification confirms identity, not work guarantee.
            </div>
          </section>
        </div>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Link
            to="/"
            className={`inline-flex items-center justify-center rounded-lg border border-gray-200 bg-white px-5 py-3 text-sm font-semibold text-gray-900 focus:outline-none focus:ring-2 focus:ring-panchayatGreen-600 focus:ring-offset-2 ${
              lowDataMode ? '' : 'transition hover:bg-gray-50'
            }`}
          >
            Back to Home
          </Link>
          <Link
            to="/pricing"
            className={`inline-flex items-center justify-center rounded-lg bg-panchayatGreen-700 px-5 py-3 text-sm font-semibold text-white focus:outline-none focus:ring-2 focus:ring-panchayatGreen-600 focus:ring-offset-2 ${
              lowDataMode ? '' : 'transition hover:bg-panchayatGreen-600'
            }`}
          >
            Pricing
          </Link>
        </div>
      </div>
    </div>
  )
}
