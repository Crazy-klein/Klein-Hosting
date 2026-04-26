import { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { MessageSquare, ThumbsUp, MessageCircle, ChevronRight, Pin } from 'lucide-react';
import { Reveal } from '../components/Animations';

export const Forum = () => {
  const [threads, setThreads] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/forum/threads').then(res => res.json()).then((data) => {
      setThreads(data);
      setLoading(false);
    });
  }, []);

  return (
    <div className="p-8">
      <Reveal direction="down">
        <div className="flex flex-col md:flex-row justify-between items-end gap-6 mb-12">
          <div>
            <h1 className="text-4xl font-display mb-2">COMMUNAUTÉ</h1>
            <p className="text-white/40">Échangez, apprenez et partagez avec d'autres administrateurs.</p>
          </div>
          <button className="btn-gold flex items-center gap-2">
            <MessageSquare size={20} />
            <span>Nouveau Sujet</span>
          </button>
        </div>
      </Reveal>

      <div className="space-y-4">
        {threads.map((thread, i) => (
          <Reveal key={thread.id} delay={i * 0.1} direction="up">
            <div className="glass p-6 rounded-2xl flex items-center gap-6 hover:border-primary/30 transition-all group cursor-pointer border-white/5">
              <div className="hidden md:flex flex-col items-center gap-1 w-16">
                <ThumbsUp size={20} className="text-white/20 group-hover:text-primary" />
                <span className="text-sm font-bold">12</span>
              </div>
              
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  {thread.is_pinned === 1 && <Pin size={14} className="text-primary" />}
                  <span className="bg-primary/10 text-primary text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-widest">{thread.category}</span>
                  <span className="text-xs text-white/20 italic">{new Date(thread.created_at).toLocaleDateString()}</span>
                </div>
                <h3 className="text-xl font-bold mb-1 group-hover:text-primary transition-colors">{thread.title}</h3>
                <p className="text-sm text-white/40">Dernière réponse par <span className="text-white/60">UserX</span> il y a 2h</p>
              </div>

              <div className="hidden lg:flex items-center gap-8 text-white/20">
                <div className="text-center">
                  <div className="text-lg font-bold text-white/60">{thread.post_count}</div>
                  <div className="text-[10px] uppercase tracking-widest">Réponses</div>
                </div>
                <ChevronRight className="group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </Reveal>
        ))}

        {!loading && threads.length === 0 && (
          <div className="text-center py-24 glass rounded-3xl border-dashed border-white/10">
            <MessageCircle className="mx-auto mb-4 text-white/20" size={48} />
            <p className="text-white/40">Aucun sujet n'a encore été posté.</p>
          </div>
        )}
      </div>
    </div>
  );
};
