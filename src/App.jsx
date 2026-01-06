import { Route, Routes } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'
import Workers from './pages/Workers'
import WorkerProfile from './pages/WorkerProfile'
import WorkerRegistration from './pages/WorkerRegistration'
import PanchayatDashboard from './pages/PanchayatDashboard'
import UserDashboard from './pages/UserDashboard'
import About from './pages/About'
import Support from './pages/Support'
import Pricing from './pages/Pricing'
import VerificationProcess from './pages/VerificationProcess'
import PrivacyPolicy from './pages/legal/PrivacyPolicy'
import TermsAndConditions from './pages/legal/TermsAndConditions'
import WorkerResponsibilityDisclaimer from './pages/legal/WorkerResponsibilityDisclaimer'
import PanchayatRoleClarification from './pages/legal/PanchayatRoleClarification'
import NotFound from './pages/NotFound'

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/workers" element={<Workers />} />
        <Route path="/workers/:workerId" element={<WorkerProfile />} />
        <Route path="/register-worker" element={<WorkerRegistration />} />
        <Route path="/panchayat-dashboard" element={<PanchayatDashboard />} />
        <Route path="/user-dashboard" element={<UserDashboard />} />
        <Route path="/about" element={<About />} />
        <Route path="/support" element={<Support />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/verification-process" element={<VerificationProcess />} />
        <Route path="/legal/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/legal/terms-and-conditions" element={<TermsAndConditions />} />
        <Route
          path="/legal/worker-responsibility-disclaimer"
          element={<WorkerResponsibilityDisclaimer />}
        />
        <Route
          path="/legal/panchayat-role-clarification"
          element={<PanchayatRoleClarification />}
        />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  )
}
