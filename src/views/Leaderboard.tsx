import { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Trophy, Medal, Star, Hash, TrendingUp, Search } from 'lucide-react';
import { Reveal } from '../components/Animations';

export const Leaderboard = () => {
  const [leaders, setLeaders] = useState<any[]>([]);

  useEffect(() => {
    fetch('/api/leaderboard').then(res => res.json()).then(setLeaders);
  }, []);

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <Reveal direction="down">
        <div className="text-center mb-16">
          <Trophy size={64} className="text-primary mx-auto mb-6 drop-shadow-[0_0_20px_rgba(245,166,35,0.4)]" />
          <h1 className="text-6xl font-display uppercase italic mb-4">LEADERBOARD</h1>
          <p className="text-white/40">Les légendes du réseau Kurona Hosting.</p>
        </div>
      </Reveal>

      <div className="space-y-4">
        {leaders.map((user, i) => (
          <Reveal key={i} delay={i * 0.05} direction="up">
            <div className={`glass p-6 rounded-2xl flex items-center gap-6 border-white/5 transition-all hover:scale-[1.02] ${i === 0 ? 'border-primary/40 bg-primary/5' : ''}`}>
              <div className="w-12 text-center text-3xl font-display italic text-white/20">
                {i === 0 ? <Medal size={32} className="text-gold-400 mx-auto" /> : i + 1}
              </div>
              <div className="w-14 h-14 rounded-full bg-white/5 flex items-center justify-center font-display text-2xl text-primary border border-white/10">
                {user.username[0]}
              </div>
              <div className="flex-1">
                <div className="text-xl font-bold uppercase italic">{user.username}</div>
                <div className="text-xs text-white/20 tracking-widest uppercase">Client Elite</div>
              </div>
              <div className="text-right">
                <div className="text-2xl font-display text-primary">{user.coins.toLocaleString()} <span className="text-[10px] opacity-40 uppercase">Coins</span></div>
                <div className="text-[10px] text-green-500 font-bold uppercase">Actif</div>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  );
};
