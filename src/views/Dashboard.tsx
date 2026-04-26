import { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Reveal } from '../components/Animations';
import { Plus, Play, Square, RefreshCcw, Terminal, Gift, TrendingUp, Clock } from 'lucide-react';

export const Dashboard = () => {
  const { user, token } = useAuth();
  const [servers, setServers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [dailyRewardStatus, setDailyRewardStatus] = useState<string>('');

  useEffect(() => {
    if (token) {
      fetch('/api/servers', { headers: { 'Authorization': `Bearer ${token}` } })
        .then(res => res.json())
        .then(data => { setServers(data); setLoading(false); });
    }
  }, [token]);

  const claimReward = async () => {
    try {
      const res = await fetch('/api/user/daily-reward', { 
        method: 'POST',
        headers: { 'Authorization': `Bearer ${token}` } 
      });
      const data = await res.json();
      if (res.ok) {
        setDailyRewardStatus(`Félicitations ! +${data.reward} Coins !`);
        // Refresh profile via context would be better, but we'll keep it simple
      } else {
        setDailyRewardStatus(data.error || 'Erreur');
      }
    } catch (e) {
      setDailyRewardStatus('Déjà réclamé');
    }
  };

  return (
    <div className="p-8">
      <Reveal direction="down">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
          <div>
            <h1 className="text-4xl font-display mb-2">TABLEAU DE BORD</h1>
            <p className="text-white/40">Bienvenue, <span className="text-white">{user?.username}</span>. Prêt à dominer le jeu ?</p>
          </div>
          <div className="flex gap-4">
            <button onClick={claimReward} className="glass-gold py-3 px-6 rounded-xl flex items-center gap-2 hover:bg-primary/20 transition-all">
              <Gift className="text-primary" />
              <span>Récompense Quotidienne</span>
            </button>
            <button className="btn-gold flex items-center gap-2">
              <Plus size={20} />
              <span>Nouveau Serveur</span>
            </button>
          </div>
        </div>
      </Reveal>

      {dailyRewardStatus && (
        <div className="mb-8 p-4 bg-primary/10 border border-primary/20 rounded-xl text-primary text-center font-bold animate-pulse">
          {dailyRewardStatus}
        </div>
      )}

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <KMICard icon={<Server className="text-primary" />} label="Serveurs Actifs" value={servers.length.toString()} />
        <KMICard icon={<TrendingUp className="text-green-400" />} label="Solde Actuel" value={`${user?.coins.toFixed(0)} Coins`} />
        <KMICard icon={<Clock className="text-blue-400" />} label="Série Connexion" value={`${user?.daily_streak || 0} Jours`} />
      </div>

      <Reveal delay={0.2}>
        <div className="mb-8 flex justify-between items-center">
          <h2 className="text-2xl font-display">VOS SERVEURS</h2>
        </div>

        {loading ? (
          <div className="text-white/20 text-center py-24">Chargement...</div>
        ) : servers.length === 0 ? (
          <div className="glass p-12 text-center rounded-2xl border-dashed border-white/10">
            <Server className="mx-auto mb-4 text-white/20" size={48} />
            <p className="text-white/40 mb-6">Vous n'avez pas encore de serveur actif.</p>
            <button className="btn-gold">Lancer mon premier serveur</button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {servers.map((server) => (
              <div key={server.id} className="glass p-6 rounded-2xl border-white/5 hover:border-primary/20 transition-all group">
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <h3 className="text-xl font-bold mb-1">{server.name}</h3>
                    <div className="flex items-center gap-2">
                      <span className={`w-2 h-2 rounded-full ${server.status === 'running' ? 'bg-green-500 shadow-[0_0_10px_green]' : 'bg-red-500'}`}></span>
                      <span className="text-sm text-white/40 uppercase tracking-tighter">{server.type} • {server.plan}</span>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button className="p-2 glass hover:text-green-500 rounded-lg transition-colors"><Play size={18} /></button>
                    <button className="p-2 glass hover:text-red-500 rounded-lg transition-colors"><Square size={18} /></button>
                    <button className="p-2 glass hover:text-primary rounded-lg transition-colors"><RefreshCcw size={18} /></button>
                  </div>
                </div>
                
                <div className="space-y-4 mb-6">
                  <ResourceBar label="RAM" used={server.memory / 2} total={server.memory} unit="MB" color="bg-primary" />
                  <ResourceBar label="CPU" used={30} total={100} unit="%" color="bg-blue-500" />
                </div>

                <div className="flex justify-between items-center pt-4 border-t border-white/5 text-xs text-white/40">
                  <div className="flex items-center gap-1"><Clock size={12}/> Expire: {new Date(server.expires_at).toLocaleDateString()}</div>
                  <button className="text-primary hover:underline">Gérer le serveur →</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </Reveal>
    </div>
  );
};

const KMICard = ({ icon, label, value }: any) => (
  <div className="glass-gold p-6 rounded-2xl flex items-center gap-5">
    <div className="p-4 bg-white/5 rounded-xl">{icon}</div>
    <div>
      <div className="text-white/40 text-sm uppercase tracking-wider">{label}</div>
      <div className="text-2xl font-bold">{value}</div>
    </div>
  </div>
);

const ResourceBar = ({ label, used, total, unit, color }: any) => {
  const percentage = (used / total) * 100;
  return (
    <div>
      <div className="flex justify-between text-xs mb-1">
        <span className="text-white/40">{label}</span>
        <span>{used}{unit} / {total}{unit}</span>
      </div>
      <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
        <div className={`h-full ${color} transition-all duration-1000`} style={{ width: `${percentage}%` }}></div>
      </div>
    </div>
  );
};

import { Server } from 'lucide-react';
