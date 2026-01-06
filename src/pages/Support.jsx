import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import ComplaintForm from '../components/ComplaintForm'
import StepTimeline from '../components/StepTimeline'
import { faqs, panchayatSupportContacts } from '../data/siteData'
import { useApp } from '../state/AppContext'

function AccordionItem({ item, open, onToggle }) {
  return (
    <div className="rounded-xl border border-gray-200 bg-white">
      <button
        type="button"
        onClick={onToggle}
        className="flex w-full items-start justify-between gap-3 px-4 py-4 text-left focus:outline-none focus:ring-2 focus:ring-panchayatGreen-600"
        aria-expanded={open}
      >
        <span className="text-sm font-extrabold text-gray-900">{item.q}</span>
        <span aria-hidden className="text-lg text-gray-700">
          {open ? '−' : '+'}
        </span>
      </button>
      {open ? (
        <div className="px-4 pb-4 text-sm text-gray-700">{item.a}</div>
      ) : null}
    </div>
  )
}

export default function Support() {
  const { lowDataMode } = useApp()
  const [openFaq, setOpenFaq] = useState(faqs[0]?.id || null)

  const disputeSteps = useMemo(
    () => [
      {
        title: 'Submit complaint',
        description: 'Share details with category and description.',
      },
      {
        title: 'Panchayat review',
        description: 'Admin dashboard updates status and monitors patterns.',
      },
      {
        title: 'Resolution',
        description: 'Complaint is resolved or escalated with clear timeline.',
      },
    ],
    []
  )

  return (
    <div className="mx-auto max-w-6xl px-4 py-6">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <div className="text-2xl font-extrabold text-gray-900">Help & support</div>
          <div className="mt-1 text-sm text-gray-700">
            Support info, complaint form, FAQs and dispute resolution steps.
          </div>
        </div>

        <Link
          to="/user-dashboard"
          className={`inline-flex items-center justify-center rounded-lg border border-gray-200 bg-white px-5 py-3 text-sm font-semibold text-gray-900 focus:outline-none focus:ring-2 focus:ring-panchayatGreen-600 focus:ring-offset-2 ${
            lowDataMode ? '' : 'transition hover:bg-gray-50'
          }`}
        >
          Open user dashboard
        </Link>
      </div>

      <div className="mt-6 grid gap-4 lg:grid-cols-2">
        <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
          <div className="text-base font-extrabold text-gray-900">Support info</div>
          <div className="mt-2 text-sm text-gray-700">
            This platform is designed for low bandwidth. For urgent issues, prefer call
            requests and local Panchayat help desks.
          </div>

          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            {panchayatSupportContacts.map((c) => (
              <div key={c.id} className="rounded-xl border border-gray-200 bg-gray-50 p-4">
                <div className="text-sm font-bold text-gray-900">{c.title}</div>
                <div className="mt-1 text-sm text-gray-700">{c.detail}</div>
              </div>
            ))}
          </div>

          <div className="mt-4 rounded-lg border border-gray-200 bg-gray-50 px-4 py-3 text-xs text-gray-700">
            Verification confirms identity, not work guarantee.
          </div>
        </div>

        <ComplaintForm />
      </div>

      <div className="mt-10 grid gap-6 lg:grid-cols-2">
        <div>
          <div className="text-lg font-extrabold text-gray-900">FAQ</div>
          <div className="mt-2 text-sm text-gray-700">
            Common questions about verification and paid leads.
          </div>

          <div className="mt-5 space-y-3">
            {faqs.map((f) => (
              <AccordionItem
                key={f.id}
                item={f}
                open={openFaq === f.id}
                onToggle={() => setOpenFaq((prev) => (prev === f.id ? null : f.id))}
              />
            ))}
          </div>
        </div>

        <div>
          <div className="text-lg font-extrabold text-gray-900">
            Dispute resolution steps
          </div>
          <div className="mt-2 text-sm text-gray-700">
            Visualized steps for transparency and clarity.
          </div>

          <div className="mt-5">
            <StepTimeline steps={disputeSteps} />
          </div>

          <div className="mt-6 rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
            <div className="text-sm font-extrabold text-gray-900">Tip</div>
            <div className="mt-2 text-sm text-gray-700">
              If you are unsure, start with “Request Call” before unlocking contact.
            </div>
            <div className="mt-4">
              <Link
                to="/workers"
                className={`inline-flex items-center justify-center rounded-lg bg-panchayatGreen-700 px-5 py-3 text-sm font-semibold text-white focus:outline-none focus:ring-2 focus:ring-panchayatGreen-600 focus:ring-offset-2 ${
                  lowDataMode ? '' : 'transition hover:bg-panchayatGreen-600'
                }`}
              >
                Browse workers
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
