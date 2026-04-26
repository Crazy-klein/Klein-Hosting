import { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Shield, Users, Server, Database, Activity, BarChart3, Settings, AlertTriangle, Terminal } from 'lucide-react';
import { Reveal } from '../components/Animations';

export const SuperAdmin = () => {
  const { token } = useAuth();
  const [stats, setStats] = useState<any>(null);

  useEffect(() => {
    // Fetch global admin stats
    fetch('/api/admin/global-stats', { headers: { 'Authorization': `Bearer ${token}` } })
      .then(res => res.json())
      .then(setStats);
  }, [token]);

  return (
    <div className="p-8">
      <Reveal direction="down">
        <div className="flex items-center justify-between mb-12">
           <div>
              <h1 className="text-5xl font-display italic uppercase flex items-center gap-4">
                 <Shield className="text-primary" size={40} />
                 SuperAdmin Hub
              </h1>
              <p className="text-white/40 uppercase text-[10px] tracking-[0.2em] mt-2">Accès Niveau : OMNIPOTENCE</p>
           </div>
           <div className="flex gap-4">
              <button className="glass px-6 py-2 rounded-lg text-xs font-bold hover:bg-white/10 transition-all">LOGS SYSTÈME</button>
              <button className="btn-gold px-6 py-2 text-xs">MAINTENANCE</button>
           </div>
        </div>
      </Reveal>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
         <AdminStat label="utilisateurs" value={stats?.totalUsers || "1,240"} icon={<Users />} />
         <AdminStat label="serveurs actifs" value={stats?.totalServers || "856"} icon={<Server />} color="text-blue-400" />
         <AdminStat label="revenus totaux" value={(stats?.revenue || "45,200") + "$"} icon={<BarChart3 />} color="text-green-500" />
         <AdminStat label="charge cpu" value="24%" icon={<Activity />} color="text-primary" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
         <div className="glass p-8 rounded-3xl">
            <h3 className="text-xl font-bold mb-6 italic uppercase flex items-center gap-2">
               <Terminal size={20} className="text-primary" /> Console d'Urgence
            </h3>
            <div className="bg-black/60 rounded-xl p-6 font-mono text-xs space-y-2 border border-white/5 h-64 overflow-y-auto">
               <div className="text-white/20">[10:42:01] Node_EU_01 initialized.</div>
               <div className="text-green-500">[10:45:12] Backup completed for user_id: 104</div>
               <div className="text-red-500">[10:48:00] DDoS Attack mitigated on Port 8080</div>
               <div className="text-primary">[11:02:45] New superadmin session started: {stats?.currentIp || "127.0.0.1"}</div>
               <div className="animate-pulse">_</div>
            </div>
         </div>

         <div className="glass p-8 rounded-3xl">
            <h3 className="text-xl font-bold mb-6 italic uppercase flex items-center gap-2">
               <Settings size={20} className="text-primary" /> Contrôle Global
            </h3>
            <div className="space-y-4">
               <AdminAction label="Mode Maintenance" desc="Coupe l'accès à tous les utilisateurs non-admin." />
               <AdminAction label="Vérification KYC" desc="Forcer la vérification d'identité pour tous." />
               <AdminAction label="Reset Cache" desc="Vider l'index du marketplace et du shop." />
            </div>
         </div>
      </div>
    </div>
  );
};

const AdminStat = ({ label, value, icon, color = "text-white" }: any) => (
  <div className="glass p-6 rounded-2xl border-white/5 relative overflow-hidden group hover:border-primary/20 transition-all">
    <div className="absolute -right-2 -bottom-2 opacity-5 scale-150 group-hover:scale-110 transition-transform">{icon}</div>
    <div className="text-[10px] text-white/20 uppercase tracking-widest mb-2">{label}</div>
    <div className={`text-3xl font-display ${color}`}>{value}</div>
  </div>
);

const AdminAction = ({ label, desc }: any) => (
  <div className="flex items-center justify-between p-4 bg-white/5 rounded-xl border border-white/5 hover:bg-white/10 transition-all cursor-pointer">
     <div>
        <div className="text-sm font-bold uppercase italic">{label}</div>
        <div className="text-[10px] text-white/20">{desc}</div>
     </div>
     <div className="w-10 h-5 bg-white/10 rounded-full relative">
        <div className="absolute right-1 top-1 w-3 h-3 bg-white/20 rounded-full"></div>
     </div>
  </div>
);
