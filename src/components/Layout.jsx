import { Outlet, useLocation } from 'react-router-dom'
import Footer from './Footer'
import Header from './Header'
import StickyBottomCTA from './StickyBottomCTA'

export default function Layout() {
  const location = useLocation()

  const hideSticky =
    location.pathname.startsWith('/panchayat-dashboard') ||
    location.pathname.startsWith('/user-dashboard') ||
    location.pathname.startsWith('/legal/')

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 rounded-lg bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow focus:outline-none focus:ring-2 focus:ring-panchayatGreen-600"
      >
        Skip to content
      </a>
      <Header />
      <main
        id="main"
        className={
          hideSticky
            ? 'min-h-[60vh]'
            : 'min-h-[60vh] pb-24 sm:pb-0'
        }
      >
        <Outlet />
      </main>
      <Footer />
      {hideSticky ? null : <StickyBottomCTA />}
    </div>
  )
}
