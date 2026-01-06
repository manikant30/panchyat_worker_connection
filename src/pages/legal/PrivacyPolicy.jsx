import { Link } from 'react-router-dom'
import { useApp } from '../../state/AppContext'

export default function PrivacyPolicy() {
  const { lowDataMode } = useApp()

  return (
    <div className="mx-auto max-w-4xl px-4 py-8">
      <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
        <div className="text-2xl font-extrabold text-gray-900">Privacy Policy</div>
        <div className="mt-2 text-sm text-gray-700">Last updated: 06/01/2026</div>

        <div className="mt-6 space-y-5 text-sm text-gray-700">
          <section>
            <div className="text-sm font-extrabold text-gray-900">Overview</div>
            <div className="mt-2">
              This is a frontend-only demo. There is no backend, no authentication, and no
              database. Data shown on this UI is static/dummy.
            </div>
          </section>

          <section>
            <div className="text-sm font-extrabold text-gray-900">Local storage</div>
            <div className="mt-2">
              To simulate a real experience, this app may store simple UI state in your
              browser (language, low data mode, saved workers, contact history, and
              complaints). This data stays on your device.
            </div>
          </section>

          <section>
            <div className="text-sm font-extrabold text-gray-900">No third-party sharing</div>
            <div className="mt-2">
              Since this is frontend-only, there is no server and no sharing of your data
              to third parties.
            </div>
          </section>

          <section>
            <div className="text-sm font-extrabold text-gray-900">Contact information</div>
            <div className="mt-2">
              Worker phone numbers shown are placeholders. Do not treat them as real.
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
            to="/support"
            className={`inline-flex items-center justify-center rounded-lg bg-panchayatGreen-700 px-5 py-3 text-sm font-semibold text-white focus:outline-none focus:ring-2 focus:ring-panchayatGreen-600 focus:ring-offset-2 ${
              lowDataMode ? '' : 'transition hover:bg-panchayatGreen-600'
            }`}
          >
            Support
          </Link>
        </div>
      </div>
    </div>
  )
}
