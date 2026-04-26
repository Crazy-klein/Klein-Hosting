import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ShoppingBag, Star, User, ExternalLink } from 'lucide-react';
import { Reveal } from '../components/Animations';

export const Shop = () => {
  const { username } = useParams();
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    fetch(`/api/marketplace/shop/${username}`).then(res => res.json()).then(setData);
  }, [username]);

  if (!data) return <div className="p-20 text-center font-display text-2xl animate-pulse">CHARGEMENT DE LA BOUTIQUE...</div>;

  return (
    <div className="p-8">
      <Reveal direction="down">
        <div className="glass p-12 rounded-3xl mb-12 flex flex-col md:flex-row items-center gap-8 border-primary/20">
          <div className="w-32 h-32 rounded-full bg-primary/20 flex items-center justify-center text-5xl font-display text-primary border-4 border-primary/40">
            {data.user.username[0]}
          </div>
          <div className="text-center md:text-left">
            <h1 className="text-5xl font-display mb-2 uppercase italic">{data.user.username}</h1>
            <div className="flex items-center gap-4 text-white/40 mb-4 justify-center md:justify-start">
              <span className="flex items-center gap-1"><ShoppingBag size={14}/> {data.listings.length} Articles</span>
              <span className="flex items-center gap-1"><Star size={14} className="text-primary"/> 4.8 Rating</span>
            </div>
            <div className="flex gap-4">
              <button className="btn-gold px-8 italic">S'ABONNER</button>
              <button className="glass px-8 rounded-lg font-bold">CONTACTER</button>
            </div>
          </div>
        </div>
      </Reveal>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
        {data.listings.map((item: any) => (
          <Reveal key={item.id} direction="up">
            <div className="glass rounded-2xl overflow-hidden group border-white/5 hover:border-primary/40 transition-all">
              <div className="p-6">
                <div className="text-xs text-primary font-bold mb-2 tracking-widest">{item.category}</div>
                <h3 className="text-xl font-bold mb-4">{item.title}</h3>
                <p className="text-white/40 text-sm mb-6 line-clamp-2">{item.description}</p>
                <div className="flex justify-between items-center pt-4 border-t border-white/5">
                   <div className="text-2xl font-display text-primary">{item.price} <span className="text-xs opacity-50 uppercase">Coins</span></div>
                   <button className="p-2 glass text-white hover:text-primary rounded-lg transition-colors">
                     <ExternalLink size={20} />
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
