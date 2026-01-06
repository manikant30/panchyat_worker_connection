import { NavLink, Link, useLocation } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { useApp } from '../state/AppContext'
import { t } from '../utils/text'

function NavItem({ to, children }) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `rounded-lg px-3 py-2 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-panchayatGreen-600 focus:ring-offset-2 ${
          isActive
            ? 'bg-panchayatGreen-50 text-panchayatGreen-700'
            : 'text-gray-700 hover:bg-gray-50'
        }`
      }
    >
      {children}
    </NavLink>
  )
}

export default function Header() {
  const location = useLocation()
  const { language, setLanguage, lowDataMode, setLowDataMode } = useApp()
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    setMenuOpen(false)
  }, [location.pathname])

  return (
    <header className="sticky top-0 z-40 border-b border-gray-200 bg-white">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-3">
        <div className="flex items-center gap-3">
          <Link
            to="/"
            className="flex items-center gap-2 rounded-lg px-2 py-1 focus:outline-none focus:ring-2 focus:ring-panchayatGreen-600 focus:ring-offset-2"
            aria-label={t(language, 'appName')}
          >
            <span
              aria-hidden
              className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-panchayatGreen-700 text-white"
            >
              ✔
            </span>
            <div className="leading-tight">
              <div className="text-sm font-extrabold text-gray-900">
                {t(language, 'appName')}
              </div>
              <div className="text-xs text-gray-600">
                Panchayat-verified hiring UI
              </div>
            </div>
          </Link>
        </div>

        <nav className="hidden items-center gap-1 md:flex" aria-label="Primary">
          <NavItem to="/">Home</NavItem>
          <NavItem to="/workers">{t(language, 'findWorkers')}</NavItem>
          <NavItem to="/pricing">{t(language, 'pricing')}</NavItem>
          <NavItem to="/verification-process">{t(language, 'verification')}</NavItem>
          <NavItem to="/support">{t(language, 'support')}</NavItem>
          <NavItem to="/about">{t(language, 'about')}</NavItem>
        </nav>

        <div className="hidden items-center gap-2 md:flex">
          <div
            className="inline-flex items-center rounded-lg border border-gray-200 bg-gray-50 p-1"
            role="group"
            aria-label={t(language, 'language')}
          >
            <button
              type="button"
              onClick={() => setLanguage('en')}
              className={`rounded-md px-3 py-1.5 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-panchayatGreen-600 focus:ring-offset-2 ${
                language === 'en'
                  ? 'bg-white text-gray-900 shadow'
                  : 'text-gray-700'
              }`}
              aria-pressed={language === 'en'}
            >
              EN
            </button>
            <button
              type="button"
              onClick={() => setLanguage('hi')}
              className={`rounded-md px-3 py-1.5 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-panchayatGreen-600 focus:ring-offset-2 ${
                language === 'hi'
                  ? 'bg-white text-gray-900 shadow'
                  : 'text-gray-700'
              }`}
              aria-pressed={language === 'hi'}
            >
              हिं
            </button>
          </div>

          <button
            type="button"
            onClick={() => setLowDataMode(!lowDataMode)}
            className={`inline-flex items-center gap-2 rounded-lg border px-3 py-2 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-panchayatGreen-600 focus:ring-offset-2 ${
              lowDataMode
                ? 'border-gray-900 bg-gray-900 text-white'
                : 'border-gray-200 bg-white text-gray-900 hover:bg-gray-50'
            }`}
            aria-pressed={lowDataMode}
          >
            <span
              aria-hidden
              className={`h-2.5 w-2.5 rounded-full ${
                lowDataMode ? 'bg-panchayatGreen-100' : 'bg-gray-300'
              }`}
            />
            {t(language, 'lowData')}
          </button>
        </div>

        <button
          type="button"
          className="md:hidden inline-flex h-10 w-10 items-center justify-center rounded-lg border border-gray-200 bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-panchayatGreen-600 focus:ring-offset-2"
          onClick={() => setMenuOpen((v) => !v)}
          aria-expanded={menuOpen}
          aria-label="Open menu"
        >
          <span aria-hidden className="text-lg">
            ☰
          </span>
        </button>
      </div>

      {menuOpen ? (
        <div className="border-t border-gray-200 bg-white md:hidden">
          <div className="mx-auto max-w-6xl px-4 py-4">
            <div className="flex flex-col gap-2" aria-label="Mobile navigation">
              <NavItem to="/">Home</NavItem>
              <NavItem to="/workers">{t(language, 'findWorkers')}</NavItem>
              <NavItem to="/pricing">{t(language, 'pricing')}</NavItem>
              <NavItem to="/verification-process">{t(language, 'verification')}</NavItem>
              <NavItem to="/support">{t(language, 'support')}</NavItem>
              <NavItem to="/about">{t(language, 'about')}</NavItem>
            </div>

            <div className="mt-4 grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setLanguage(language === 'en' ? 'hi' : 'en')}
                className="inline-flex items-center justify-center rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm font-semibold text-gray-900 focus:outline-none focus:ring-2 focus:ring-panchayatGreen-600 focus:ring-offset-2"
              >
                {t(language, 'language')}: {language === 'en' ? 'EN' : 'हिं'}
              </button>
              <button
                type="button"
                onClick={() => setLowDataMode(!lowDataMode)}
                className={`inline-flex items-center justify-center rounded-lg border px-3 py-2 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-panchayatGreen-600 focus:ring-offset-2 ${
                  lowDataMode
                    ? 'border-gray-900 bg-gray-900 text-white'
                    : 'border-gray-200 bg-white text-gray-900'
                }`}
                aria-pressed={lowDataMode}
              >
                {t(language, 'lowData')}: {lowDataMode ? 'On' : 'Off'}
              </button>
            </div>

            <div className="mt-4 grid grid-cols-2 gap-2">
              <Link
                to="/panchayat-dashboard"
                className="inline-flex items-center justify-center rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-sm font-semibold text-gray-900 focus:outline-none focus:ring-2 focus:ring-panchayatGreen-600 focus:ring-offset-2"
              >
                {t(language, 'adminDashboard')}
              </Link>
              <Link
                to="/user-dashboard"
                className="inline-flex items-center justify-center rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-sm font-semibold text-gray-900 focus:outline-none focus:ring-2 focus:ring-panchayatGreen-600 focus:ring-offset-2"
              >
                {t(language, 'userDashboard')}
              </Link>
            </div>
          </div>
        </div>
      ) : null}
    </header>
  )
}
