import { Link } from 'react-router-dom'
import StepTimeline from '../components/StepTimeline'
import VerificationBadge from '../components/VerificationBadge'
import { useApp } from '../state/AppContext'

export default function VerificationProcess() {
  const { lowDataMode } = useApp()

  const steps = [
    {
      title: 'Worker submits documents',
      description: 'Basic identity + photo documents are submitted (UI only).',
    },
    {
      title: 'Panchayat verification',
      description: 'Panchayat reviews identity and local presence details.',
    },
    {
      title: 'Approval badge issued',
      description: 'A green verification badge appears on the worker profile.',
    },
    {
      title: 'Continuous monitoring',
      description: 'Complaints and feedback help maintain accountability.',
    },
  ]

  return (
    <div className="mx-auto max-w-6xl px-4 py-6">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <div className="text-2xl font-extrabold text-gray-900">
            Verification process
          </div>
          <div className="mt-1 text-sm text-gray-700">
            Clear steps showing how Panchayat verification builds trust.
          </div>
        </div>

        <Link
          to="/workers"
          className={`inline-flex items-center justify-center rounded-lg bg-panchayatGreen-700 px-5 py-3 text-sm font-semibold text-white focus:outline-none focus:ring-2 focus:ring-panchayatGreen-600 focus:ring-offset-2 ${
            lowDataMode ? '' : 'transition hover:bg-panchayatGreen-600'
          }`}
        >
          Browse verified workers
        </Link>
      </div>

      <div className="mt-6 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
        <div className="text-lg font-extrabold text-gray-900">
          What “Panchayat Verified” means
        </div>
        <div className="mt-2 text-sm text-gray-700">
          The badge indicates identity verification by a local Panchayat.
        </div>

        <div className="mt-4">
          <VerificationBadge panchayatName="XYZ Panchayat" verifiedOn="15/10/2025" />
        </div>

        <div className="mt-4 rounded-lg border border-gray-200 bg-gray-50 px-4 py-3 text-xs text-gray-700">
          Disclaimer: Verification confirms identity, not work guarantee.
        </div>
      </div>

      <div className="mt-8">
        <div className="text-lg font-extrabold text-gray-900">Steps</div>
        <div className="mt-2 text-sm text-gray-700">
          Simple and transparent for both workers and users.
        </div>
        <div className="mt-5">
          <StepTimeline steps={steps} />
        </div>
      </div>

      <div className="mt-10 grid gap-4 lg:grid-cols-2">
        <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
          <div className="text-sm font-extrabold text-gray-900">Continuous monitoring</div>
          <div className="mt-2 text-sm text-gray-700">
            Complaints can be submitted and tracked. Panchayat dashboards can update
            status and take action (approve/reject/suspend UI).
          </div>
          <div className="mt-4 rounded-lg border border-gray-200 bg-gray-50 px-4 py-3 text-xs text-gray-700">
            This is a frontend demo: no real verification is performed.
          </div>
        </div>

        <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
          <div className="text-sm font-extrabold text-gray-900">Best practices</div>
          <div className="mt-3 space-y-2 text-sm text-gray-700">
            <div className="flex items-start gap-2">
              <span aria-hidden className="text-panchayatGreen-700">
                ✔
              </span>
              <span>Discuss scope, timeline and material costs in advance.</span>
            </div>
            <div className="flex items-start gap-2">
              <span aria-hidden className="text-panchayatGreen-700">
                ✔
              </span>
              <span>Prefer local workers for faster support and accountability.</span>
            </div>
            <div className="flex items-start gap-2">
              <span aria-hidden className="text-panchayatGreen-700">
                ✔
              </span>
              <span>Use review and complaint features responsibly.</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
