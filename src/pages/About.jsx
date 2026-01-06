import { Link } from 'react-router-dom'
import { useApp } from '../state/AppContext'

function Section({ title, children }) {
  return (
    <section className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
      <div className="text-base font-extrabold text-gray-900">{title}</div>
      <div className="mt-3 text-sm text-gray-700">{children}</div>
    </section>
  )
}

export default function About() {
  const { lowDataMode } = useApp()

  return (
    <div className="mx-auto max-w-6xl px-4 py-6">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <div className="text-2xl font-extrabold text-gray-900">About</div>
          <div className="mt-1 text-sm text-gray-700">
            Why this platform exists and how Panchayat-based trust improves local hiring.
          </div>
        </div>
        <Link
          to="/workers"
          className={`inline-flex items-center justify-center rounded-lg bg-panchayatGreen-700 px-5 py-3 text-sm font-semibold text-white focus:outline-none focus:ring-2 focus:ring-panchayatGreen-600 focus:ring-offset-2 ${
            lowDataMode ? '' : 'transition hover:bg-panchayatGreen-600'
          }`}
        >
          Find verified workers
        </Link>
      </div>

      <div className="mt-6 grid gap-4 lg:grid-cols-2">
        <Section title="Why this platform exists">
          Local hiring is often urgent and informal. Families and small businesses may
          need a mason, carpenter, painter or electrician quickly—but it’s difficult
          to know who is genuine. This platform UI demonstrates a trust-first approach
          to local hiring.
        </Section>

        <Section title="Rural employment challenges">
          <div className="space-y-2">
            <div className="flex items-start gap-2">
              <span aria-hidden className="text-gray-700">
                •
              </span>
              <span>Workers struggle to reach customers beyond word-of-mouth.</span>
            </div>
            <div className="flex items-start gap-2">
              <span aria-hidden className="text-gray-700">
                •
              </span>
              <span>Customers struggle to verify skill and identity.</span>
            </div>
            <div className="flex items-start gap-2">
              <span aria-hidden className="text-gray-700">
                •
              </span>
              <span>Dispute resolution is unclear when there is no trust layer.</span>
            </div>
          </div>
        </Section>

        <Section title="Panchayat-based trust model">
          <div className="space-y-2">
            <div>
              <span className="font-bold text-gray-900">1) Identity check:</span> Panchayat
              verifies basic identity and local presence.
            </div>
            <div>
              <span className="font-bold text-gray-900">2) Visible badge:</span> A green
              verification badge is shown with tooltip.
            </div>
            <div>
              <span className="font-bold text-gray-900">3) Accountability:</span> Complaints
              and monitoring provide a feedback loop.
            </div>
            <div className="mt-3 rounded-lg border border-gray-200 bg-gray-50 px-4 py-3 text-xs text-gray-700">
              Verification confirms identity, not work guarantee.
            </div>
          </div>
        </Section>

        <Section title="Vision for India">
          A trusted, low-bandwidth friendly interface can connect verified workers to
          nearby opportunities while keeping the user journey simple: search → verify
          → contact → hire.
        </Section>
      </div>

      <div className="mt-6 rounded-2xl border border-gray-200 bg-gray-50 p-6">
        <div className="text-lg font-extrabold text-gray-900">Quick links</div>
        <div className="mt-4 flex flex-col gap-3 sm:flex-row">
          <Link
            to="/verification-process"
            className={`inline-flex items-center justify-center rounded-lg border border-gray-200 bg-white px-5 py-3 text-sm font-semibold text-gray-900 focus:outline-none focus:ring-2 focus:ring-panchayatGreen-600 focus:ring-offset-2 ${
              lowDataMode ? '' : 'transition hover:bg-gray-50'
            }`}
          >
            Verification process
          </Link>
          <Link
            to="/pricing"
            className={`inline-flex items-center justify-center rounded-lg border border-gray-200 bg-white px-5 py-3 text-sm font-semibold text-gray-900 focus:outline-none focus:ring-2 focus:ring-panchayatGreen-600 focus:ring-offset-2 ${
              lowDataMode ? '' : 'transition hover:bg-gray-50'
            }`}
          >
            Pricing
          </Link>
          <Link
            to="/support"
            className={`inline-flex items-center justify-center rounded-lg border border-gray-200 bg-white px-5 py-3 text-sm font-semibold text-gray-900 focus:outline-none focus:ring-2 focus:ring-panchayatGreen-600 focus:ring-offset-2 ${
              lowDataMode ? '' : 'transition hover:bg-gray-50'
            }`}
          >
            Help & support
          </Link>
        </div>
      </div>
    </div>
  )
}
