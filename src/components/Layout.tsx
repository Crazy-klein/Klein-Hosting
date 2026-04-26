import React, { useState } from 'react';
import { NavLink, useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { LayoutDashboard, ShoppingCart, MessageSquare, Users, Shield, LogOut, Coins, Home, Server, User, Settings, ExternalLink, Activity, Info } from 'lucide-react';

export const Layout = ({ children }: { children: React.ReactNode }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [profileOpen, setProfileOpen] = useState(false);

  const menuItems = [
    { to: '/dashboard', icon: <LayoutDashboard size={24} />, label: 'Dashboard' },
    { to: '/payment', icon: <Coins size={24} />, label: 'Boutique' },
    { to: '/marketplace', icon: <ShoppingCart size={24} />, label: 'Marketplace' },
    { to: '/chat', icon: <MessageSquare size={24} />, label: 'Chat Global' },
    { to: '/forum', icon: <Users size={24} />, label: 'Communauté' },
    { to: '/status', icon: <Activity size={24} />, label: 'État Services' },
  ];

  if (user?.role === 'admin' || user?.role === 'superadmin') {
    menuItems.push({ to: '/panel-admin', icon: <Shield size={24} />, label: 'Administration' });
  }
  if (user?.role === 'superadmin') {
    menuItems.push({ to: '/superadmin', icon: <Settings size={24} />, label: 'SuperAdmin' });
  }

  return (
    <div className="flex min-h-screen bg-[#121417]">
      {/* Sidebar with CSS effects */}
      <aside className="sidebar lg:block hidden">
        <div className="p-6">
           <Link to="/" className="text-gold font-display text-2xl tracking-tighter">K.</Link>
        </div>
        <ul className="sidebar-list">
          {menuItems.map((item, idx) => (
            <li key={idx}>
              <NavLink 
                to={item.to} 
                className={({ isActive }) => `sidebar-item ${isActive ? 'active' : ''}`}
              >
                {item.icon}
                <span className="label font-display text-lg uppercase italic tracking-wider">{item.label}</span>
              </NavLink>
            </li>
          ))}
          
          <div className="absolute bottom-10 left-0 right-0 p-4">
             <button 
               onClick={() => { logout(); navigate('/'); }}
               className="sidebar-item w-full"
             >
               <LogOut size={24} />
               <span className="label font-display text-lg uppercase italic text-red-500">Quitter</span>
             </button>
          </div>
        </ul>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 lg:ml-20 flex flex-col">
        {/* Header Bar */}
        <header className="p-6 flex justify-between items-center sticky top-0 z-40 bg-transparent">
           <div className="flex items-center gap-4">
              <Link to="/" className="lg:hidden font-display text-2xl text-gold">KURONA</Link>
              <div className="hidden lg:flex items-center gap-2 px-4 py-2 glass rounded-full text-[10px] text-white/40 uppercase tracking-widest font-bold">
                 <Info size={12} className="text-gold" />
                 Kurona Network : Stable 2.4.0
              </div>
           </div>

           <div className="relative">
              <button 
                onClick={() => setProfileOpen(!profileOpen)}
                className="profile-trigger"
              >
                 <div className="w-8 h-8 rounded-full bg-gold/20 flex items-center justify-center text-gold font-bold text-xs ring-1 ring-gold/40">
                    {user?.username[0].toUpperCase()}
                 </div>
                 <div className="text-xs font-bold text-white/80 hidden md:block">{user?.username}</div>
                 <Server size={14} className={`profile-chevron text-white/20 ${profileOpen ? 'open' : ''}`} />
              </button>

              <div className={`profile-menu glass ${profileOpen ? 'open' : ''}`}>
                 <Link to="/profile" className="profile-item"><User size={16} /> Mon Profil</Link>
                 <Link to="/subscription" className="profile-item"><Shield size={16} /> Abonnement</Link>
                 <Link to="/referral" className="profile-item"><ExternalLink size={16} /> Parrainage</Link>
                 <div className="border-t border-white/5 my-2"></div>
                 <button onClick={logout} className="profile-item w-full text-left text-red-400"><LogOut size={16} /> Déconnexion</button>
              </div>
           </div>
        </header>

        {/* View Port */}
        <main className="flex-1 p-4 md:p-8 pb-20">
          {children}
        </main>

        <footer className="footer">
           <div className="flex justify-between items-center max-w-7xl mx-auto">
              <span className="text-[10px] uppercase tracking-widest opacity-40">© 2025 Kurona Hosting - Made with Passion</span>
              <div className="flex gap-4">
                 <Link to="/status" className="hover:text-white transition-colors">Système</Link>
                 <Link to="/pricing" className="hover:text-white transition-colors">Tarifs</Link>
                 <Link to="/reseller-contract" className="hover:text-white transition-colors">Legal</Link>
              </div>
           </div>
        </footer>
      </div>
    </div>
  );
};

