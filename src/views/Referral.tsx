import { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Users, Gift, Share2, Copy, TrendingUp, Smartphone } from 'lucide-react';
import { Reveal } from '../components/Animations';

export const Referral = () => {
  const { user, token } = useAuth();
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    fetch('/api/referral', { headers: { 'Authorization': `Bearer ${token}` } })
      .then(res => res.json())
      .then(setData);
  }, [token]);

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <Reveal direction="down">
        <div className="text-center mb-16">
          <Gift size={64} className="text-primary mx-auto mb-6" />
          <h1 className="text-6xl font-display italic uppercase mb-4">PARRAINAGE</h1>
          <p className="text-white/40 text-lg">Invitez vos amis et gagnez des bonus à vie.</p>
        </div>
      </Reveal>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
        <div className="glass-gold p-8 rounded-3xl border-primary/20 text-center">
           <div className="text-[10px] text-white/40 uppercase tracking-widest mb-4">Votre code personnel</div>
           <div className="text-4xl font-display text-primary mb-6">{data?.code || '---'}</div>
           <button className="flex items-center gap-2 mx-auto text-xs font-bold hover:text-primary transition-colors">
              <Copy size={16} /> COPIER LE CODE
           </button>
        </div>
        <div className="glass p-8 rounded-3xl border-white/5 space-y-6">
           <div className="flex justify-between items-center border-b border-white/5 pb-4">
              <span className="text-white/40 italic">Amis parrainés</span>
              <span className="text-2xl font-display">{data?.total_referrals}</span>
           </div>
           <div className="flex justify-between items-center pt-2">
              <span className="text-white/40 italic">Total gagné</span>
              <span className="text-2xl font-display text-primary">{data?.total_earned} Coins</span>
           </div>
        </div>
      </div>

      <Reveal delay={0.2}>
         <div className="glass p-12 rounded-3xl text-center space-y-8 manteau-effect bg-[linear-gradient(45deg,transparent_25%,rgba(245,166,35,0.02)_50%,transparent_75%)]">
            <h2 className="text-3xl font-display italic uppercase">Comment ça marche ?</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
               <Step num="1" label="Partagez" desc="Envoyez votre lien à vos amis." />
               <Step num="2" label="Hébergez" desc="Ils créent leur premier serveur." />
               <Step num="3" label="Récoltez" desc="Recevez 10% de leurs achats." />
            </div>
         </div>
      </Reveal>
    </div>
  );
};

const Step = ({ num, label, desc }: any) => (
  <div className="space-y-2">
    <div className="text-5xl font-display text-primary/20">{num}</div>
    <div className="font-bold text-lg italic uppercase">{label}</div>
    <p className="text-xs text-white/40">{desc}</p>
  </div>
);
