import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="border-t border-gray-200 bg-white">
      <div className="mx-auto max-w-6xl px-4 py-10">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <div className="text-base font-extrabold text-gray-900">
              Panchayat Worker Connector
            </div>
            <p className="mt-2 text-sm text-gray-600">
              Trust-inspired local hiring UI with Panchayat-style verification badges.
            </p>
            <p className="mt-4 text-xs text-gray-600">
              Verification confirms identity, not work guarantee.
            </p>
          </div>

          <div>
            <div className="text-sm font-bold text-gray-900">Explore</div>
            <div className="mt-3 flex flex-col gap-2 text-sm">
              <Link className="text-gray-700 hover:text-gray-900" to="/workers">
                Find Workers
              </Link>
              <Link className="text-gray-700 hover:text-gray-900" to="/register-worker">
                Register as Worker
              </Link>
              <Link className="text-gray-700 hover:text-gray-900" to="/pricing">
                Pricing
              </Link>
              <Link
                className="text-gray-700 hover:text-gray-900"
                to="/verification-process"
              >
                Verification Process
              </Link>
            </div>
          </div>

          <div>
            <div className="text-sm font-bold text-gray-900">Support</div>
            <div className="mt-3 flex flex-col gap-2 text-sm">
              <Link className="text-gray-700 hover:text-gray-900" to="/support">
                Help & Support
              </Link>
              <Link className="text-gray-700 hover:text-gray-900" to="/about">
                About
              </Link>
              <Link
                className="text-gray-700 hover:text-gray-900"
                to="/user-dashboard"
              >
                User Dashboard
              </Link>
              <Link
                className="text-gray-700 hover:text-gray-900"
                to="/panchayat-dashboard"
              >
                Panchayat Dashboard
              </Link>
            </div>
          </div>

          <div>
            <div className="text-sm font-bold text-gray-900">Legal & Trust</div>
            <div className="mt-3 flex flex-col gap-2 text-sm">
              <Link
                className="text-gray-700 hover:text-gray-900"
                to="/legal/privacy-policy"
              >
                Privacy Policy
              </Link>
              <Link
                className="text-gray-700 hover:text-gray-900"
                to="/legal/terms-and-conditions"
              >
                Terms & Conditions
              </Link>
              <Link
                className="text-gray-700 hover:text-gray-900"
                to="/legal/worker-responsibility-disclaimer"
              >
                Worker Disclaimer
              </Link>
              <Link
                className="text-gray-700 hover:text-gray-900"
                to="/legal/panchayat-role-clarification"
              >
                Panchayat Role
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-10 border-t border-gray-200 pt-6 text-xs text-gray-600">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <div>© {new Date().getFullYear()} Panchayat Worker Connector (Frontend Demo)</div>
            <div className="text-gray-600">
              Low-data friendly • Mobile-first • Accessibility-focused
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
