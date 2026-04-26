import { useState } from 'react';
import { Mail, ArrowLeft, Send } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Reveal } from '../components/Animations';

export const ForgotPassword = () => {
  const [sent, setSent] = useState(false);

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-background">
      <Reveal direction="up">
        <div className="w-full max-w-md glass p-10 rounded-3xl border-primary/20">
          <Link to="/login" className="flex items-center gap-2 text-white/40 hover:text-white mb-8 text-sm transition-colors">
            <ArrowLeft size={16} /> Retour
          </Link>

          {!sent ? (
            <>
              <h1 className="text-4xl font-display uppercase mb-4 italic">Mot de passe oublié ?</h1>
              <p className="text-white/40 text-sm mb-10">Entrez votre email pour recevoir les instructions de réinitialisation.</p>
              
              <div className="space-y-6">
                <div>
                  <label className="text-[10px] uppercase text-primary font-bold tracking-widest pl-1 mb-2 block">Votre Email</label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20" size={18} />
                    <input 
                      type="email" 
                      placeholder="admin@kurona.com"
                      className="w-full bg-white/5 border border-white/10 rounded-xl py-4 pl-12 pr-4 focus:outline-none focus:border-primary/50 transition-all"
                    />
                  </div>
                </div>
                <button onClick={() => setSent(true)} className="btn-gold w-full py-4 flex items-center justify-center gap-2">
                  <Send size={18} /> ENVOYER LE LIEN
                </button>
              </div>
            </>
          ) : (
            <div className="text-center py-8">
               <div className="w-20 h-20 bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Mail className="text-green-500" size={32} />
               </div>
               <h2 className="text-3xl font-display uppercase mb-4">Email Envoyé !</h2>
               <p className="text-white/40 mb-8">Vérifiez votre boîte de réception et vos spams.</p>
               <Link to="/login" className="btn-gold block w-full py-4 text-center">RETOURNER AU LOGIN</Link>
            </div>
          )}
        </div>
      </Reveal>
    </div>
  );
};
