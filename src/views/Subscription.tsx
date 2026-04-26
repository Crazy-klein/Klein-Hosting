import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Server, Star, Zap, Check, Info } from 'lucide-react';
import { Reveal } from '../components/Animations';

export const Subscription = () => {
  return (
    <div className="p-8 max-w-6xl mx-auto">
      <Reveal direction="down">
        <h1 className="text-5xl font-display italic uppercase mb-12">Abonnements Élite</h1>
      </Reveal>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
         <div className="glass p-10 rounded-3xl border-primary/20 bg-primary/5">
            <div className="w-12 h-12 bg-primary/20 rounded-xl flex items-center justify-center mb-6 text-primary">
               <Star size={24} />
            </div>
            <h2 className="text-3xl font-display italic uppercase mb-2">Kurona VIP</h2>
            <p className="text-white/40 text-sm mb-8">Accès exclusif aux nodes VIP et bonus de coins mensuels.</p>
            <div className="text-4xl font-display text-white mb-8">9.99$ <span className="text-xs opacity-20">/ mois</span></div>
            <button className="btn-gold w-full py-4 uppercase italic">S'ABONNER MAINTENANT</button>
         </div>

         <div className="glass p-10 rounded-3xl border-white/5 flex flex-col justify-between">
            <div className="space-y-4">
               <Benefit label="Badge profil exclusif" />
               <Benefit label="+200 Coins chaque mois" />
               <Benefit label="Priorité support Tier 1" />
               <Benefit label="Accès Beta Marketplace" />
            </div>
            <div className="mt-8 p-4 bg-white/5 rounded-xl flex items-start gap-3">
               <Info size={16} className="text-primary mt-1" />
               <p className="text-[10px] text-white/40 leading-relaxed uppercase font-light tracking-wider">L'abonnement est sans engagement et peut être résilié à tout moment depuis votre panel.</p>
            </div>
         </div>
      </div>
    </div>
  );
};

const Benefit = ({ label }: any) => (
  <div className="flex items-center gap-3 text-sm">
    <Check size={18} className="text-primary" />
    <span className="text-white/60">{label}</span>
  </div>
);
