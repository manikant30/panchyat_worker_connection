import { Link } from 'react-router-dom'
import { useApp } from '../../state/AppContext'

export default function PanchayatRoleClarification() {
  const { lowDataMode } = useApp()

  return (
    <div className="mx-auto max-w-4xl px-4 py-8">
      <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
        <div className="text-2xl font-extrabold text-gray-900">
          Panchayat Role Clarification
        </div>
        <div className="mt-2 text-sm text-gray-700">Last updated: 06/01/2026</div>

        <div className="mt-6 space-y-5 text-sm text-gray-700">
          <section>
            <div className="text-sm font-extrabold text-gray-900">Role in verification</div>
            <div className="mt-2">
              The Panchayat badge indicates identity verification by a local Panchayat.
              It is a trust signal that the person exists locally and provided documents.
            </div>
          </section>

          <section>
            <div className="text-sm font-extrabold text-gray-900">Not a work guarantee</div>
            <div className="mt-2">
              Verification confirms identity, not work guarantee. Work quality, pricing and
              timelines must be agreed between customer and worker.
            </div>
          </section>

          <section>
            <div className="text-sm font-extrabold text-gray-900">Complaint monitoring</div>
            <div className="mt-2">
              Panchayat dashboards can record complaints and update their status in a
              transparent timeline (UI only).
            </div>
          </section>

          <section className="rounded-xl border border-gray-200 bg-gray-50 p-4">
            <div className="text-sm font-extrabold text-gray-900">Transparency note</div>
            <div className="mt-2">
              This project is frontend-only. No real Panchayat integration exists.
            </div>
          </section>
        </div>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Link
            to="/panchayat-dashboard"
            className={`inline-flex items-center justify-center rounded-lg bg-gray-900 px-5 py-3 text-sm font-semibold text-white focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2 ${
              lowDataMode ? '' : 'transition hover:bg-gray-800'
            }`}
          >
            Open Panchayat dashboard
          </Link>
          <Link
            to="/"
            className={`inline-flex items-center justify-center rounded-lg border border-gray-200 bg-white px-5 py-3 text-sm font-semibold text-gray-900 focus:outline-none focus:ring-2 focus:ring-panchayatGreen-600 focus:ring-offset-2 ${
              lowDataMode ? '' : 'transition hover:bg-gray-50'
            }`}
          >
            Home
          </Link>
        </div>
      </div>
    </div>
  )
}
