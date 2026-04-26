import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Server, Star, Zap, Check, AlertCircle } from 'lucide-react';
import { Reveal } from '../components/Animations';

export const Pricing = () => {
  return (
    <div className="p-8 max-w-7xl mx-auto">
      <Reveal direction="down">
        <div className="text-center mb-16">
          <h1 className="text-6xl font-display italic uppercase mb-4 tracking-tighter">Nos Formules</h1>
          <p className="text-white/40 max-w-2xl mx-auto">Des solutions d'hébergement performantes adaptées à chaque projet, du serveur privé à l'infrastructure communautaire.</p>
        </div>
      </Reveal>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <PricingCard 
          label="Starter" 
          price="1" 
          coins="100" 
          features={["1GB RAM DDR4", "10GB SSD NVMe", "1 vCore CPU", "Support Standard"]}
        />
        <PricingCard 
          label="Pro" 
          price="5" 
          coins="500" 
          popular 
          features={["4GB RAM DDR4", "40GB SSD NVMe", "2 vCore CPU", "Backup Hebdomadaire", "Support Prioritaire"]}
        />
        <PricingCard 
          label="Business" 
          price="15" 
          coins="1500" 
          features={["8GB RAM DDR4", "100GB SSD NVMe", "4 vCore CPU", "Backup Quotidien", "Node Dédié", "Support VIP"]}
        />
      </div>

      <Reveal delay={0.4}>
        <div className="mt-20 glass p-12 rounded-3xl flex flex-col md:flex-row items-center justify-between gap-8 border-primary/20">
           <div>
             <h2 className="text-3xl font-display italic uppercase mb-2">Besoin d'illimité ?</h2>
             <p className="text-white/40">Nos solutions Enterprise sur-mesure vous attendent.</p>
           </div>
           <button className="btn-gold px-12 py-5 italic text-lg">CONTACTER LE SALES</button>
        </div>
      </Reveal>
    </div>
  );
};

const PricingCard = ({ label, price, coins, features, popular }: any) => (
  <Reveal direction="up">
    <div className={`glass p-10 rounded-3xl flex flex-col h-full transition-all border-white/5 relative ${popular ? 'border-primary/50 bg-primary/5 scale-105 z-10' : 'hover:border-white/20'}`}>
      {popular && <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-primary text-black font-bold text-xs px-4 py-1 rounded-full italic">PLUS POPULAIRE</div>}
      <div className="text-white/40 uppercase text-[10px] tracking-widest mb-2">{label}</div>
      <div className="flex items-baseline gap-2 mb-8">
         <span className="text-5xl font-display uppercase">{price}$</span>
         <span className="text-white/20 text-sm">/ mois</span>
      </div>
      <div className="space-y-4 mb-10 flex-1">
        {features.map((f: any, i: number) => (
          <div key={i} className="flex items-center gap-3 text-sm text-white/60">
            <Check size={16} className="text-primary flex-shrink-0" />
            <span>{f}</span>
          </div>
        ))}
      </div>
      <div className="p-4 bg-black/40 rounded-xl mb-6 border border-white/5 text-center">
         <div className="text-[10px] text-white/20 uppercase mb-1">Inclus</div>
         <div className="text-xl font-display text-primary">{coins} Coins</div>
      </div>
      <button className={popular ? 'btn-gold py-4' : 'glass-gold py-4 rounded-xl font-bold border-primary/20'}>COMMANDER</button>
    </div>
  </Reveal>
);
