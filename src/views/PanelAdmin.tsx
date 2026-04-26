import { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Users, Coins, TrendingUp, Wallet, ShieldCheck, Download, ExternalLink } from 'lucide-react';
import { Reveal } from '../components/Animations';

export const PanelAdmin = () => {
  const { user, token } = useAuth();
  const [stats, setStats] = useState<any>(null);

  useEffect(() => {
    fetch('/api/reseller/stats', { headers: { 'Authorization': `Bearer ${token}` } })
      .then(res => res.json())
      .then(setStats);
  }, [token]);

  return (
    <div className="p-8">
      <Reveal direction="down">
        <div className="flex justify-between items-center mb-12">
          <div>
            <h1 className="text-4xl font-display flex items-center gap-4 italic uppercase">
              <ShieldCheck className="text-primary" size={32} />
              Panel Revendeur
            </h1>
            <p className="text-white/40">Gérez vos clients et vos revenus d'affiliation.</p>
          </div>
          <div className="glass px-6 py-3 rounded-xl border-primary/30 flex items-center gap-3">
             <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
             <span className="text-xs font-bold uppercase tracking-widest">Revendeur Vérifié</span>
          </div>
        </div>
      </Reveal>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
        <div className="glass p-6 rounded-2xl border-white/5 relative overflow-hidden">
           <div className="text-white/20 uppercase text-[10px] mb-2 tracking-widest">Commission Actuelle</div>
           <div className="text-4xl font-display text-primary">{(stats?.profile?.commission_rate * 100 || 5)}%</div>
           <TrendingUp className="absolute right-4 bottom-4 text-white/5 w-16 h-16" />
        </div>
        <div className="glass p-6 rounded-2xl border-white/5">
           <div className="text-white/20 uppercase text-[10px] mb-2 tracking-widest">Solde Retirable</div>
           <div className="text-4xl font-display text-green-400">{stats?.profile?.balance || 0} $</div>
        </div>
        <div className="glass p-6 rounded-2xl border-white/5">
           <div className="text-white/20 uppercase text-[10px] mb-2 tracking-widest">Clients Totaux</div>
           <div className="text-4xl font-display text-blue-400">{stats?.clients?.count || 0}</div>
        </div>
        <div className="glass p-6 rounded-2xl border-white/5">
           <div className="text-white/20 uppercase text-[10px] mb-2 tracking-widest">Total Gagné</div>
           <div className="text-4xl font-display text-white">{stats?.profile?.total_earned || 0} $</div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 glass-gold p-8 rounded-3xl">
          <h3 className="text-xl font-bold mb-8 italic uppercase flex items-center gap-2">
            <Coins size={20} className="text-primary" /> Achat en gros (Bulk)
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
             <BulkPacket label="PACK REV 10" desc="10x Serveurs 2GB" price="35$" discount="-10%" />
             <BulkPacket label="PACK REV 50" desc="50x Serveurs 2GB" price="150$" discount="-25%" />
          </div>
        </div>

        <div className="glass p-8 rounded-3xl">
          <h3 className="text-xl font-bold mb-8 italic uppercase">Actions</h3>
          <div className="space-y-4">
            <button className="btn-gold w-full flex items-center justify-center gap-2">
              <Download size={18} /> Retirer mes revenus
            </button>
            <button className="w-full py-4 glass hover:bg-white/10 rounded-xl font-bold transition-all border border-white/5">
              Créer code promo
            </button>
            <div className="p-4 bg-black/40 rounded-xl border border-white/5 mt-8">
              <div className="text-[10px] text-white/20 uppercase mb-2">Lien d'affiliation</div>
              <div className="text-xs font-mono text-primary flex justify-between items-center">
                <span>kurona.hosting/ref/{user?.id}</span>
                <ExternalLink size={14} className="cursor-pointer" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const BulkPacket = ({ label, desc, price, discount }: any) => (
  <div className="glass p-6 rounded-2xl border-white/5 hover:border-primary/20 transition-all cursor-pointer group">
    <div className="flex justify-between items-start mb-4">
      <div className="font-display text-2xl uppercase tracking-tighter italic">{label}</div>
      <div className="bg-green-500 text-black text-[10px] font-bold px-2 py-0.5 rounded">{discount}</div>
    </div>
    <p className="text-xs text-white/40 mb-6">{desc}</p>
    <div className="text-xl font-mono text-primary">{price}</div>
  </div>
);
