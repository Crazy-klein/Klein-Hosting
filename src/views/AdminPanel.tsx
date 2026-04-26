import { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Users, Server, Wallet, ShieldAlert, BarChart, Settings, CheckCircle, XCircle } from 'lucide-react';
import { Reveal } from '../components/Animations';
import { Bar, Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export const AdminPanel = () => {
  const { token } = useAuth();
  const [stats, setStats] = useState<any>(null);

  useEffect(() => {
    fetch('/api/admin/stats', { headers: { 'Authorization': `Bearer ${token}` } })
      .then(res => res.json())
      .then(setStats);
  }, [token]);

  const chartData = {
    labels: ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche'],
    datasets: [
      {
        label: 'Revenus ($)',
        data: [120, 190, 300, 500, 200, 300, 450],
        borderColor: '#f5a623',
        backgroundColor: '#f5a62355',
        fill: true,
        tension: 0.4
      }
    ]
  };

  return (
    <div className="p-8">
      <Reveal direction="down">
        <h1 className="text-4xl font-display mb-12 flex items-center gap-4">
          <ShieldAlert className="text-primary" size={40} />
          ADMINISTRATION SUPREME
        </h1>
      </Reveal>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
        <KMICard label="UTILISATEURS" value={stats?.users || 0} icon={<Users className="text-blue-400" />} />
        <KMICard label="SERVEURS" value={stats?.servers || 0} icon={<Server className="text-purple-400" />} />
        <KMICard label="REVENUS TOTAUX" value={`${stats?.revenue || 0}$`} icon={<Wallet className="text-green-400" />} />
        <KMICard label="ABONNEMENTS" value={stats?.subscriptions || 0} icon={<CheckCircle className="text-primary" />} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <Reveal direction="left" delay={0.1}>
          <div className="glass p-8 rounded-3xl overflow-hidden">
            <h3 className="text-xl font-bold mb-8 flex items-center gap-2">
              <BarChart className="text-primary" /> ACTIVITÉ FINANCIÈRE
            </h3>
            <Line data={chartData} options={{ 
              responsive: true,
              plugins: { legend: { display: false } },
              scales: {
                y: { grid: { color: '#ffffff05' }, ticks: { color: '#ffffff40' } },
                x: { grid: { display: false }, ticks: { color: '#ffffff40' } }
              }
            }} />
          </div>
        </Reveal>

        <Reveal direction="right" delay={0.2}>
          <div className="glass p-8 rounded-3xl">
            <h3 className="text-xl font-bold mb-8 flex items-center gap-2">
              <Settings className="text-primary" /> ACTIONS RAPIDES
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <AdminAction label="Maintenance Globale" color="bg-red-500/20 text-red-400 border-red-500/20" />
              <AdminAction label="Bonus Communautaire" color="bg-green-500/20 text-green-400 border-green-500/20" />
              <AdminAction label="Export Rapports CSV" color="bg-primary/20 text-primary border-primary/20" />
              <AdminAction label="Modération Chat" color="bg-blue-500/20 text-blue-400 border-blue-500/20" />
            </div>
          </div>
        </Reveal>
      </div>

      <Reveal delay={0.3}>
        <div className="mt-12 glass rounded-3xl overflow-hidden">
          <div className="p-6 border-b border-white/5 flex justify-between items-center">
            <h3 className="font-bold">DERNIÈRES TRANSACTIONS</h3>
            <button className="text-primary text-xs hover:underline uppercase font-bold tracking-widest">Tout voir</button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="bg-white/5 text-white/40 uppercase text-[10px] tracking-widest">
                  <th className="p-4">Utilisateur</th>
                  <th className="p-4">Montant</th>
                  <th className="p-4">Méthode</th>
                  <th className="p-4">Statut</th>
                  <th className="p-4">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 italic">
                {[1, 2, 3, 4, 5].map(i => (
                  <tr key={i} className="hover:bg-white/5 transition-colors">
                    <td className="p-4 font-bold">User_{i*123}</td>
                    <td className="p-4">{i * 10}.00$</td>
                    <td className="p-4 uppercase">Wave</td>
                    <td className="p-4"><span className="px-2 py-0.5 bg-green-500/10 text-green-500 rounded-full text-[10px] font-bold">SUCCESS</span></td>
                    <td className="p-4 text-white/20">Aujourd'hui, 14:32</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </Reveal>
    </div>
  );
};

const KMICard = ({ label, value, icon }: any) => (
  <div className="glass-gold p-6 rounded-2xl flex items-center gap-5">
    <div className="p-4 bg-white/5 rounded-xl">{icon}</div>
    <div>
      <div className="text-white/40 text-[10px] tracking-tighter mb-1 uppercase italic">{label}</div>
      <div className="text-2xl font-display">{value}</div>
    </div>
  </div>
);

const AdminAction = ({ label, color }: any) => (
  <button className={`p-4 rounded-xl border text-sm font-bold transition-all hover:scale-[1.02] active:scale-95 ${color}`}>
    {label}
  </button>
);
