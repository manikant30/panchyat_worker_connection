import { Link } from 'react-router-dom'
import { workerCategories } from '../data/workers'
import { homeReviews, homeStats } from '../data/siteData'
import RatingStars from '../components/RatingStars'
import StepTimeline from '../components/StepTimeline'
import VerificationBadge from '../components/VerificationBadge'
import { useApp } from '../state/AppContext'
import { t } from '../utils/text'

function SectionHeader({ title, subtitle }) {
  return (
    <div className="mx-auto max-w-6xl px-4">
      <div className="text-xl font-extrabold text-gray-900 sm:text-2xl">
        {title}
      </div>
      {subtitle ? (
        <div className="mt-2 max-w-2xl text-sm text-gray-700">{subtitle}</div>
      ) : null}
    </div>
  )
}

export default function Home() {
  const { language, lowDataMode } = useApp()

  const steps = [
    {
      title: 'Search by location & skill',
      description: 'Filter by Panchayat and skill category in seconds.',
    },
    {
      title: 'View verified profile',
      description: 'Check experience, skills, and Panchayat verification badge.',
    },
    {
      title: 'Contact & hire',
      description: 'Unlock contact or request a call with clear confirmation.',
    },
  ]

  const hover = lowDataMode ? '' : 'transition hover:shadow-md'

  return (
    <div>
      <section
        className={`border-b border-gray-200 ${
          lowDataMode
            ? 'bg-white'
            : 'bg-gradient-to-b from-white to-panchayatGreen-50'
        }`}
      >
        <div className="mx-auto grid max-w-6xl gap-8 px-4 py-10 lg:grid-cols-2 lg:items-center">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-panchayatGreen-100 bg-white px-3 py-1 text-xs font-bold text-panchayatGreen-700">
              <span aria-hidden>✔</span>
              Panchayat-style verification badge
            </div>
            <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              Find Panchayat-Verified Skilled Workers Near You
            </h1>
            <p className="mt-4 max-w-xl text-base text-gray-700">
              Trusted masons, carpenters & painters approved by your local Panchayat
            </p>

            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <Link
                to="/workers"
                className={`inline-flex items-center justify-center rounded-lg bg-panchayatGreen-700 px-5 py-3 text-sm font-semibold text-white focus:outline-none focus:ring-2 focus:ring-panchayatGreen-600 focus:ring-offset-2 ${
                  lowDataMode ? '' : 'transition hover:bg-panchayatGreen-600'
                }`}
              >
                {t(language, 'findWorkers')}
              </Link>
              <Link
                to="/register-worker"
                className={`inline-flex items-center justify-center rounded-lg border border-gray-200 bg-white px-5 py-3 text-sm font-semibold text-gray-900 focus:outline-none focus:ring-2 focus:ring-panchayatGreen-600 focus:ring-offset-2 ${
                  lowDataMode ? '' : 'transition hover:bg-gray-50'
                }`}
              >
                {t(language, 'registerWorker')}
              </Link>
            </div>

            {lowDataMode ? (
              <div className="mt-4 text-xs font-semibold text-gray-700">
                Low Data Mode is ON — animations are reduced.
              </div>
            ) : null}
          </div>

          <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
            <div className="text-sm font-extrabold text-gray-900">
              Why people trust this model
            </div>
            <div className="mt-4 grid gap-3">
              <div className="rounded-xl border border-gray-200 bg-gray-50 p-4">
                <div className="text-sm font-bold text-gray-900">Local accountability</div>
                <div className="mt-1 text-sm text-gray-700">
                  Panchayat-based verification reduces fake profiles.
                </div>
              </div>
              <div className="rounded-xl border border-gray-200 bg-gray-50 p-4">
                <div className="text-sm font-bold text-gray-900">Clear skill details</div>
                <div className="mt-1 text-sm text-gray-700">
                  Experience, sub-skills and work history are visible before contact.
                </div>
              </div>
              <div className="rounded-xl border border-gray-200 bg-gray-50 p-4">
                <div className="text-sm font-bold text-gray-900">Transparent contact CTA</div>
                <div className="mt-1 text-sm text-gray-700">
                  Confirmation modals explain paid leads clearly.
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-10">
        <SectionHeader
          title="The problem today"
          subtitle="In local hiring, trust breaks when profiles are fake or unverified."
        />
        <div className="mx-auto mt-6 grid max-w-6xl gap-4 px-4 sm:grid-cols-3">
          {[
            { title: 'Fake profiles', desc: 'Wrong identity, wrong number, wrong skill.' },
            { title: 'No skill verification', desc: 'Hard to know experience level.' },
            { title: 'No local accountability', desc: 'No community trust signals.' },
          ].map((item) => (
            <div
              key={item.title}
              className={`rounded-xl border border-gray-200 bg-white p-4 shadow-sm ${hover}`}
            >
              <div className="flex items-start gap-3">
                <div
                  className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-red-50 text-lg"
                  aria-hidden
                >
                  ❌
                </div>
                <div>
                  <div className="text-sm font-extrabold text-gray-900">
                    {item.title}
                  </div>
                  <div className="mt-1 text-sm text-gray-700">{item.desc}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="border-y border-gray-200 bg-white py-10">
        <SectionHeader
          title="The solution"
          subtitle="A simple trust layer: verification by the local Panchayat and clear profile details."
        />
        <div className="mx-auto mt-6 grid max-w-6xl gap-4 px-4 sm:grid-cols-3">
          {[
            {
              title: 'Panchayat-approved workers',
              desc: 'A badge indicates identity verification at Panchayat level.',
            },
            {
              title: 'Skill level & experience shown',
              desc: 'Years of experience and sub-skills are visible.',
            },
            {
              title: 'Local & verified contacts',
              desc: 'Paid lead and call request CTAs are transparent.',
            },
          ].map((item) => (
            <div
              key={item.title}
              className={`rounded-xl border border-gray-200 bg-gray-50 p-4 ${hover}`}
            >
              <div className="flex items-start gap-3">
                <div
                  className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-panchayatGreen-50 text-lg"
                  aria-hidden
                >
                  ✔
                </div>
                <div>
                  <div className="text-sm font-extrabold text-gray-900">
                    {item.title}
                  </div>
                  <div className="mt-1 text-sm text-gray-700">{item.desc}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="py-10">
        <SectionHeader
          title="Worker categories"
          subtitle="Browse skilled workers by category. (Future-ready: plumbers included.)"
        />
        <div className="mx-auto mt-6 grid max-w-6xl gap-4 px-4 sm:grid-cols-2 lg:grid-cols-5">
          {workerCategories.map((cat) => (
            <Link
              key={cat.id}
              to={`/workers?skill=${cat.id}`}
              className={`group rounded-xl border border-gray-200 bg-white p-4 shadow-sm focus:outline-none focus:ring-2 focus:ring-panchayatGreen-600 focus:ring-offset-2 ${
                lowDataMode ? '' : 'transition hover:bg-gray-50'
              }`}
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <div className="text-sm font-extrabold text-gray-900">
                    {cat.name}
                  </div>
                  <div className="mt-1 text-xs text-gray-600">View verified profiles</div>
                </div>
                <div
                  aria-hidden
                  className="text-2xl group-hover:opacity-90"
                >
                  {cat.icon}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="border-y border-gray-200 bg-white py-10">
        <SectionHeader
          title="How it works"
          subtitle="A simple 3-step flow to find a verified worker quickly."
        />
        <div className="mx-auto mt-6 max-w-6xl px-4">
          <StepTimeline steps={steps} />
        </div>
      </section>

      <section className="py-10">
        <SectionHeader
          title="Trust & verification"
          subtitle="Badges and tooltips explain who verified the worker and when."
        />
        <div className="mx-auto mt-6 grid max-w-6xl gap-4 px-4 lg:grid-cols-2">
          <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
            <div className="text-sm font-extrabold text-gray-900">
              Panchayat approval badge
            </div>
            <div className="mt-3">
              <VerificationBadge
                panchayatName="XYZ Panchayat"
                verifiedOn="15/10/2025"
              />
            </div>
            <div className="mt-4 space-y-2 text-sm text-gray-700">
              <div className="flex items-start gap-2">
                <span aria-hidden className="text-panchayatGreen-700">
                  ✔
                </span>
                <span>ID verification (basic identity check)</span>
              </div>
              <div className="flex items-start gap-2">
                <span aria-hidden className="text-panchayatGreen-700">
                  ✔
                </span>
                <span>Skill & experience details displayed</span>
              </div>
              <div className="flex items-start gap-2">
                <span aria-hidden className="text-panchayatGreen-700">
                  ✔
                </span>
                <span>Local accountability & complaint monitoring</span>
              </div>
            </div>
          </div>

          <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
            <div className="text-sm font-extrabold text-gray-900">
              Important disclaimer
            </div>
            <div className="mt-2 text-sm text-gray-700">
              Verification confirms identity, not work guarantee. Always discuss scope,
              timeline and material costs before starting work.
            </div>
            <div className="mt-4 rounded-lg border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-700">
              Tip: Use the “Request Call” option if you prefer to speak before
              unlocking contact.
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-gray-200 bg-white py-10">
        <SectionHeader
          title="Social proof"
          subtitle="High-level adoption stats and user reviews (static demo)."
        />

        <div className="mx-auto mt-6 grid max-w-6xl gap-4 px-4 sm:grid-cols-3">
          {homeStats.map((s) => (
            <div
              key={s.label}
              className="rounded-xl border border-gray-200 bg-gray-50 p-4"
            >
              <div className="text-2xl font-extrabold text-gray-900">
                {s.value}
              </div>
              <div className="mt-1 text-sm font-semibold text-gray-700">
                {s.label}
              </div>
            </div>
          ))}
        </div>

        <div className="mx-auto mt-6 grid max-w-6xl gap-4 px-4 sm:grid-cols-3">
          {homeReviews.map((r) => (
            <div
              key={r.id}
              className={`rounded-xl border border-gray-200 bg-white p-4 shadow-sm ${hover}`}
            >
              <div className="flex items-start justify-between gap-3">
                <div className="text-sm font-extrabold text-gray-900">{r.name}</div>
                <RatingStars rating={r.rating} />
              </div>
              <div className="mt-3 text-sm text-gray-700">“{r.text}”</div>
            </div>
          ))}
        </div>
      </section>

      <section className="py-10">
        <SectionHeader
          title="Revenue model preview"
          subtitle="Clear pricing keeps the system sustainable and transparent."
        />

        <div className="mx-auto mt-6 grid max-w-6xl gap-4 px-4 sm:grid-cols-2">
          <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
            <div className="text-sm font-extrabold text-gray-900">Listing fee</div>
            <div className="mt-2 text-sm text-gray-700">
              Worker listing fee plans help maintain verification and monitoring.
            </div>
            <div className="mt-4 rounded-lg border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-700">
              Example: ₹199 – ₹699 per month
            </div>
          </div>

          <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
            <div className="text-sm font-extrabold text-gray-900">Pay-per-lead</div>
            <div className="mt-2 text-sm text-gray-700">
              Unlocking contact details is a small paid action.
            </div>
            <div className="mt-4 rounded-lg border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-700">
              Example: ₹10 – ₹30 per contact
            </div>
          </div>
        </div>

        <div className="mx-auto mt-6 max-w-6xl px-4">
          <Link
            to="/pricing"
            className={`inline-flex items-center justify-center rounded-lg border border-gray-200 bg-white px-5 py-3 text-sm font-semibold text-gray-900 focus:outline-none focus:ring-2 focus:ring-panchayatGreen-600 focus:ring-offset-2 ${
              lowDataMode ? '' : 'transition hover:bg-gray-50'
            }`}
          >
            See pricing details
          </Link>
        </div>
      </section>

      <section className="border-t border-gray-200 bg-white py-10">
        <div className="mx-auto max-w-6xl px-4">
          <div className="rounded-2xl border border-gray-200 bg-gray-50 p-6">
            <div className="text-xl font-extrabold text-gray-900">
              Bring trust to local hiring
            </div>
            <div className="mt-2 text-sm text-gray-700">
              Find verified workers with clear details and accountability.
            </div>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <Link
                to="/workers"
                className={`inline-flex items-center justify-center rounded-lg bg-panchayatGreen-700 px-5 py-3 text-sm font-semibold text-white focus:outline-none focus:ring-2 focus:ring-panchayatGreen-600 focus:ring-offset-2 ${
                  lowDataMode ? '' : 'transition hover:bg-panchayatGreen-600'
                }`}
              >
                {t(language, 'findWorkers')}
              </Link>
              <Link
                to="/register-worker"
                className={`inline-flex items-center justify-center rounded-lg border border-gray-200 bg-white px-5 py-3 text-sm font-semibold text-gray-900 focus:outline-none focus:ring-2 focus:ring-panchayatGreen-600 focus:ring-offset-2 ${
                  lowDataMode ? '' : 'transition hover:bg-gray-50'
                }`}
              >
                {t(language, 'registerWorker')}
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
