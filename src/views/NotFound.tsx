import { Link } from 'react-router-dom';
import { Reveal } from '../components/Animations';

export const NotFound = () => {
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <Reveal direction="up">
        <div className="text-center p-12 glass rounded-3xl border-white/5">
          <h1 className="text-9xl font-display text-primary mb-4 italic">404</h1>
          <h2 className="text-3xl font-display mb-8 uppercase tracking-widest">Section Introuvable</h2>
          <p className="text-white/40 mb-12 max-w-sm mx-auto">La ressource Kurona que vous cherchez a été déplacée ou n'existe plus dans ce secteur.</p>
          <Link to="/" className="btn-gold px-12 py-4 italic">RETOURNER À L'ACCUEIL</Link>
        </div>
      </Reveal>
    </div>
  );
};
