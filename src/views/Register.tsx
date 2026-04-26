import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Reveal } from '../components/Animations';
import { Mail, Lock, UserPlus, AlertCircle, User } from 'lucide-react';

export const Register = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    const res = await fetch('/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, email, password })
    });
    if (res.ok) {
      navigate('/login');
    } else {
      const data = await res.json();
      setError(data.error || 'Erreur lors de l\'inscription');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-[url('https://images.unsplash.com/photo-1635332305380-00fe85489f64?auto=format&fit=crop&q=80')] bg-cover bg-center">
      <div className="absolute inset-0 bg-background/90"></div>
      
      <Reveal direction="down">
        <div className="relative w-full max-w-md glass p-10 rounded-3xl border-primary/20">
          <div className="text-center mb-10">
            <h1 className="text-4xl font-display tracking-wider mb-2">REJOINDRE</h1>
            <p className="text-white/40 text-sm italic">Commencez à héberger avec style.</p>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 text-sm flex items-center gap-3">
              <AlertCircle size={18} />
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="text-xs font-bold text-primary uppercase tracking-widest pl-1">Nom d'utilisateur</label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20" size={20} />
                <input 
                  type="text" 
                  value={username}
                  onChange={e => setUsername(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-xl py-4 pl-12 pr-4 focus:outline-none focus:border-primary/50 transition-all font-light"
                  placeholder="KuronaBoss"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-primary uppercase tracking-widest pl-1">Email</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20" size={20} />
                <input 
                  type="email" 
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-xl py-4 pl-12 pr-4 focus:outline-none focus:border-primary/50 transition-all font-light"
                  placeholder="contact@kurona.com"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-primary uppercase tracking-widest pl-1">Mot de passe</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20" size={20} />
                <input 
                  type="password" 
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-xl py-4 pl-12 pr-4 focus:outline-none focus:border-primary/50 transition-all font-light"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <button type="submit" className="btn-gold w-full py-4 text-lg mt-4 flex items-center justify-center gap-2">
              <UserPlus size={20} />
              CRÉER MON COMPTE
            </button>
          </form>

          <p className="text-center mt-10 text-white/40 text-sm">
            Déjà client ? <Link to="/login" className="text-primary hover:underline font-bold">Connectez-vous</Link>
          </p>
        </div>
      </Reveal>
    </div>
  );
};
