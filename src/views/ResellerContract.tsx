import { Reveal } from '../components/Animations';
import { FileText, ShieldCheck, Check } from 'lucide-react';

export const ResellerContract = () => {
  return (
    <div className="p-8 max-w-4xl mx-auto">
      <Reveal direction="down">
        <h1 className="text-5xl font-display italic uppercase mb-12 flex items-center gap-4">
          <FileText className="text-primary" size={40} />
          Contrat Revendeur
        </h1>
      </Reveal>

      <div className="glass p-12 rounded-3xl space-y-10 border-white/5">
         <section className="space-y-4">
            <h2 className="text-xl font-bold text-primary italic uppercase tracking-widest">1. Engagement</h2>
            <p className="text-white/40 text-sm leading-relaxed font-light">Le présent contrat lie l'utilisateur ("le Revendeur") à Kurona Hosting dans le cadre d'un partenariat commercial de revente de services serveurs.</p>
         </section>

         <section className="space-y-4">
            <h2 className="text-xl font-bold text-primary italic uppercase tracking-widest">2. Commissions</h2>
            <p className="text-white/40 text-sm leading-relaxed font-light">Le Revendeur percevra une commission fixe de 10% sur chaque transaction effectuée par ses clients affiliés. Ce montant pourra évoluer selon le volume de ventes.</p>
         </section>

         <section className="space-y-6 pt-10 border-t border-white/5">
            <div className="flex items-center gap-3">
               <div className="w-6 h-6 rounded border border-primary flex items-center justify-center text-primary">
                  <Check size={14} />
               </div>
               <span className="text-xs font-bold">J'accepte les conditions générales du programme revendeur.</span>
            </div>
            <button className="btn-gold px-12 py-4 italic">SIGNER LE CONTRAT</button>
         </section>
      </div>
    </div>
  );
}
