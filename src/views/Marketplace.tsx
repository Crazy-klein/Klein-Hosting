import { useEffect, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { ShoppingBag, Star, Zap, Search, ChevronRight } from 'lucide-react';
import { Reveal } from '../components/Animations';

const CATEGORIES = ['Tous', 'Plugins', 'Scripts', 'Models', 'Configs', 'Bots'];

export const Marketplace = () => {
  const { token } = useAuth();
  const [items, setItems] = useState<any[]>([]);
  const [filter, setFilter] = useState('Tous');

  useEffect(() => {
    fetch('/api/marketplace').then(res => res.json()).then(setItems);
  }, []);

  return (
    <div className="p-8">
      <Reveal direction="down">
        <div className="flex flex-col md:flex-row justify-between items-end gap-6 mb-12">
          <div>
            <h1 className="text-4xl font-display mb-2">MARKETPLACE</h1>
            <p className="text-white/40">Équipez vos serveurs avec les meilleures ressources de la communauté.</p>
          </div>
          <button className="btn-gold flex items-center gap-2">
            <ShoppingBag size={20} />
            <span>Vendre une ressource</span>
          </button>
        </div>
      </Reveal>

      {/* Filters */}
      <div className="flex flex-wrap gap-3 mb-12">
        {CATEGORIES.map(cat => (
          <button 
            key={cat} 
            onClick={() => setFilter(cat)}
            className={`px-6 py-2 rounded-full transition-all border ${filter === cat ? 'bg-primary text-black border-primary' : 'glass border-white/5 text-white/40 hover:border-white/20'}`}
          >
            {cat}
          </button>
        ))}
        <div className="ml-auto relative hidden md:block">
           <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-white/20" size={18} />
           <input type="text" placeholder="Rechercher..." className="bg-white/5 border border-white/10 rounded-full py-2 pl-10 pr-4 focus:outline-none focus:border-primary/50 transition-all w-64" />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <Reveal key={i} delay={i * 0.05} direction="up">
            <div className="glass rounded-2xl overflow-hidden group border-white/5 hover:border-primary/30 transition-all">
              <div className="h-48 bg-white/5 relative overflow-hidden">
                <img 
                  src={`https://images.unsplash.com/photo-1614741118887-7a4ee193a5fa?auto=format&fit=crop&q=80&w=400&h=300`} 
                  className="w-full h-full object-cover opacity-60 group-hover:scale-110 group-hover:opacity-100 transition-all duration-700"
                  alt="Resource"
                />
                <div className="absolute top-4 right-4 glass px-3 py-1 rounded-full text-xs font-bold text-primary">PLUGINS</div>
              </div>
              <div className="p-6">
                <div className="flex justify-between items-start mb-3">
                  <h3 className="text-xl font-bold italic">Anticheat Ultra v3.4</h3>
                  <div className="flex items-center gap-1 text-primary text-sm">
                    <Star size={14} fill="currentColor" /> 4.9
                  </div>
                </div>
                <p className="text-sm text-white/40 mb-6 line-clamp-2">La protection ultime contre les cheaters sur votre serveur Minecraft Paper/Spigot.</p>
                <div className="flex justify-between items-center pt-4 border-t border-white/5">
                  <div className="text-2xl font-display text-primary">750 <span className="text-xs uppercase opacity-40">Coins</span></div>
                  <button className="flex items-center gap-1 text-white hover:text-primary transition-colors text-sm font-bold">
                    Détails <ChevronRight size={16} />
                  </button>
                </div>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  );
};
