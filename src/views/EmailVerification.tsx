import { Reveal } from '../components/Animations';
import { Mail, CheckCircle, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export const EmailVerification = () => {
  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-background">
      <Reveal direction="down">
        <div className="w-full max-w-md glass p-10 rounded-3xl border-primary/20 text-center">
          <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-8 border border-primary/20">
             <Mail size={32} className="text-primary" />
          </div>
          <h1 className="text-4xl font-display italic uppercase mb-4 tracking-tighter">Vérifiez vos emails</h1>
          <p className="text-white/40 mb-10">Nous avons envoyé un code de confirmation à votre adresse. Cliquez sur le lien pour activer votre compte.</p>
          
          <div className="space-y-4">
             <Link to="/dashboard" className="btn-gold block w-full py-4 text-center italic">J'AI DÉJÀ VÉRIFIÉ</Link>
             <button className="text-xs text-white/40 hover:text-white transition-colors underline">Renvoyer l'email</button>
          </div>
        </div>
      </Reveal>
    </div>
  );
};
