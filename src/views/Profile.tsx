import { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { User, Mail, Shield, Bell, Key, History, Smartphone, Check } from 'lucide-react';
import { Reveal } from '../components/Animations';

export const Profile = () => {
  const { user, token } = useAuth();
  const [profile, setProfile] = useState<any>(null);

  useEffect(() => {
    fetch('/api/user/profile', { headers: { 'Authorization': `Bearer ${token}` } })
      .then(res => res.json())
      .then(setProfile);
  }, [token]);

  return (
    <div className="p-8 max-w-5xl mx-auto">
      <Reveal direction="down">
        <h1 className="text-4xl font-display mb-12 uppercase italic">Profil Utilisateur</h1>
      </Reveal>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="glass p-8 rounded-3xl text-center border-primary/20">
          <div className="w-24 h-24 rounded-full bg-primary/20 mx-auto mb-6 flex items-center justify-center text-4xl font-display text-primary border-2 border-primary/40">
            {profile?.username?.[0]}
          </div>
          <h2 className="text-2xl font-bold mb-1">{profile?.username}</h2>
          <p className="text-white/40 text-sm mb-6 uppercase tracking-widest">{profile?.role}</p>
          <div className="flex justify-center gap-2">
            {profile?.verified && <div className="p-2 glass text-green-500 rounded-lg"><Check size={16} /></div>}
            <div className="p-2 glass text-primary rounded-lg"><Shield size={16} /></div>
          </div>
        </div>

        <div className="md:col-span-2 space-y-6">
          <div className="glass p-8 rounded-3xl space-y-6">
            <h3 className="font-bold flex items-center gap-2 italic uppercase">
              <User size={18} className="text-primary" /> Informations Personnelles
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <ProfileInput label="Nom d'utilisateur" value={profile?.username} />
              <ProfileInput label="Email" value={profile?.email} />
            </div>
            <button className="btn-gold px-8">Enregistrer</button>
          </div>

          <div className="glass p-8 rounded-3xl space-y-6">
            <h3 className="font-bold flex items-center gap-2 italic uppercase">
              <Key size={18} className="text-primary" /> Sécurité
            </h3>
            <div className="space-y-4">
               <div className="flex justify-between items-center p-4 glass rounded-xl border-white/5">
                  <div className="flex items-center gap-3">
                    <Smartphone className="text-white/20" />
                    <div>
                      <div className="text-sm font-bold">Double Authentification (2FA)</div>
                      <div className="text-[10px] text-white/40 uppercase">Non activé</div>
                    </div>
                  </div>
                  <button className="text-xs text-primary font-bold hover:underline">ACTIVER</button>
               </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const ProfileInput = ({ label, value }: any) => (
  <div>
    <label className="text-[10px] text-white/40 uppercase tracking-widest mb-2 block">{label}</label>
    <div className="p-3 bg-white/5 border border-white/10 rounded-xl text-sm font-mono">{value}</div>
  </div>
);
