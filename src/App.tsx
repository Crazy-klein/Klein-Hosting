import { useEffect } from 'react';
import { Routes, Route, Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from './contexts/AuthContext';
import { Layout } from './components/Layout';
import { Home } from './views/Home';
import { Login } from './views/Login';
import { Register } from './views/Register';
import { Dashboard } from './views/Dashboard';
import { Payment } from './views/Payment';
import { Marketplace } from './views/Marketplace';
import { Chat } from './views/Chat';
import { Forum } from './views/Forum';
import { ServerPanel } from './views/ServerPanel';
import { Shop } from './views/Shop';
import { PanelAdmin } from './views/PanelAdmin';
import { Profile } from './views/Profile';
import { Referral } from './views/Referral';
import { Subscription } from './views/Subscription';
import { Status } from './views/Status';
import { Leaderboard } from './views/Leaderboard';
import { ForgotPassword } from './views/ForgotPassword';
import { EmailVerification } from './views/EmailVerification';
import { ResellerContract } from './views/ResellerContract';
import { Pricing } from './views/Pricing';
import { NotFound } from './views/NotFound';

import { Deploy } from './views/Deploy';
import { SuperAdmin } from './views/SuperAdmin';
import { initScrollAnimations } from './js/scroll-elementor';
import './css/main.css';

export default function App() {
  const location = useLocation();

  useEffect(() => {
    initScrollAnimations();
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-background selection:bg-primary/30">
      <Routes>
        <Route path="/" element={<Layout><Home /></Layout>} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Layout><Dashboard /></Layout>} />
        <Route path="/payment" element={<Layout><Payment /></Layout>} />
        <Route path="/deploy" element={<Layout><Deploy /></Layout>} />
        <Route path="/marketplace" element={<Layout><Marketplace /></Layout>} />
        <Route path="/chat" element={<Layout><Chat /></Layout>} />
        <Route path="/forum" element={<Layout><Forum /></Layout>} />
        <Route path="/panel-admin" element={<Layout><PanelAdmin /></Layout>} />
        <Route path="/superadmin" element={<Layout><SuperAdmin /></Layout>} />
        <Route path="/server/:id" element={<Layout><ServerPanel /></Layout>} />
        <Route path="/shop/:username" element={<Layout><Shop /></Layout>} />
        <Route path="/profile" element={<Layout><Profile /></Layout>} />
        <Route path="/referral" element={<Layout><Referral /></Layout>} />
        <Route path="/subscription" element={<Layout><Subscription /></Layout>} />
        <Route path="/status" element={<Layout><Status /></Layout>} />
        <Route path="/leaderboard" element={<Layout><Leaderboard /></Layout>} />
        <Route path="/pricing" element={<Layout><Pricing /></Layout>} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/email-verification" element={<EmailVerification />} />
        <Route path="/reseller-contract" element={<Layout><ResellerContract /></Layout>} />
        <Route path="*" element={<Layout><NotFound /></Layout>} />
      </Routes>
    </div>
  );
}


