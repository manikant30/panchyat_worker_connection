import { Link } from 'react-router-dom'
import { useApp } from '../../state/AppContext'

export default function WorkerResponsibilityDisclaimer() {
  const { lowDataMode } = useApp()

  return (
    <div className="mx-auto max-w-4xl px-4 py-8">
      <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
        <div className="text-2xl font-extrabold text-gray-900">
          Worker Responsibility Disclaimer
        </div>
        <div className="mt-2 text-sm text-gray-700">Last updated: 06/01/2026</div>

        <div className="mt-6 space-y-5 text-sm text-gray-700">
          <section>
            <div className="text-sm font-extrabold text-gray-900">Worker obligations</div>
            <div className="mt-2">
              Workers are expected to provide accurate identity details, honest skill
              information, and clear pricing and timelines to customers.
            </div>
          </section>

          <section>
            <div className="text-sm font-extrabold text-gray-900">Work guarantee</div>
            <div className="mt-2">
              Verification confirms identity, not work guarantee. Customers should inspect
              work quality and confirm terms in advance.
            </div>
          </section>

          <section>
            <div className="text-sm font-extrabold text-gray-900">Disputes</div>
            <div className="mt-2">
              Disputes may be recorded through the complaint UI. This project is frontend
              only and does not provide legal enforcement.
            </div>
          </section>

          <section className="rounded-xl border border-gray-200 bg-gray-50 p-4">
            <div className="text-sm font-extrabold text-gray-900">Safety</div>
            <div className="mt-2">
              Always follow safety guidelines at the worksite and comply with local laws.
            </div>
          </section>
        </div>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Link
            to="/support"
            className={`inline-flex items-center justify-center rounded-lg border border-gray-200 bg-white px-5 py-3 text-sm font-semibold text-gray-900 focus:outline-none focus:ring-2 focus:ring-panchayatGreen-600 focus:ring-offset-2 ${
              lowDataMode ? '' : 'transition hover:bg-gray-50'
            }`}
          >
            Support
          </Link>
          <Link
            to="/verification-process"
            className={`inline-flex items-center justify-center rounded-lg bg-panchayatGreen-700 px-5 py-3 text-sm font-semibold text-white focus:outline-none focus:ring-2 focus:ring-panchayatGreen-600 focus:ring-offset-2 ${
              lowDataMode ? '' : 'transition hover:bg-panchayatGreen-600'
            }`}
          >
            Verification process
          </Link>
        </div>
      </div>
    </div>
  )
}
