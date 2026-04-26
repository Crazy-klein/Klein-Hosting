import { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Reveal } from '../components/Animations';
import { Rocket, Github, FileArchive, Layers, Plus, Terminal, RefreshCcw } from 'lucide-react';

export const Deploy = () => {
  const { user, token } = useAuth();
  const [method, setMethod] = useState<'github' | 'zip' | 'template'>('github');
  const [servers, setServers] = useState<any[]>([]);
  const [selectedServer, setSelectedServer] = useState<string>('');
  const [formData, setFormData] = useState({
    repo_url: '',
    branch: 'main',
    start_command: 'npm start'
  });
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<string | null>(null);

  useEffect(() => {
    if (token) {
      fetch('/api/servers', { headers: { 'Authorization': `Bearer ${token}` } })
        .then(res => res.json())
        .then(data => {
            setServers(data);
            if (data.length > 0) setSelectedServer(data[0].id);
        });
    }
  }, [token]);

  const handleDeploy = async () => {
    if (!selectedServer) return alert("Choisissez un serveur !");
    setLoading(true);
    setStatus("Initialisation...");

    try {
        const res = await fetch(`/api/deploy/${method}`, {
            method: 'POST',
            headers: { 
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                server_id: selectedServer,
                ...formData
            })
        });
        const data = await res.json();
        if (res.ok) {
            setStatus("Déploiement lancé avec succès !");
        } else {
            setStatus("Erreur: " + (data.error || "Échec"));
        }
    } catch (e) {
        setStatus("Erreur de connexion");
    } finally {
        setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto py-12 px-4 h-full">
      <Reveal direction="down">
        <div className="text-center mb-12">
            <h1 className="text-5xl font-display mb-4 text-gold drop-shadow-gold">DÉPLOIEMENT <span className="text-white">RAPIDE</span></h1>
            <p className="text-white/40 max-w-lg mx-auto">Propulsez votre code sur nos infrastructures hautes performances en quelques secondes.</p>
        </div>
      </Reveal>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <MethodCard 
            active={method === 'github'} 
            onClick={() => setMethod('github')}
            icon={<Github size={32} />} 
            title="GitHub" 
            desc="Déployez via un repo public ou privé."
        />
        <MethodCard 
            active={method === 'zip'} 
            onClick={() => setMethod('zip')}
            icon={<FileArchive size={32} />} 
            title="Fichier ZIP" 
            desc="Téléversez votre projet compressé."
        />
        <MethodCard 
            active={method === 'template'} 
            onClick={() => setMethod('template')}
            icon={<Layers size={32} />} 
            title="Templates" 
            desc="Utilisez nos bases pré-configurées."
        />
      </div>

      <Reveal delay={0.2}>
        <div className="glass p-8 rounded-3xl border-white/5 space-y-8">
            <div className="space-y-4">
                <label className="text-xs uppercase tracking-widest text-gold font-bold">1. Serveur de destination</label>
                <select 
                    className="input h-14"
                    value={selectedServer}
                    onChange={(e) => setSelectedServer(e.target.value)}
                >
                    <option value="">Sélectionnez un serveur...</option>
                    {servers.map(s => (
                        <option key={s.id} value={s.id}>{s.name} ({s.type})</option>
                    ))}
                </select>
            </div>

            {method === 'github' && (
                <div className="space-y-6 animate-in slide-in-from-left duration-500">
                    <div className="space-y-4">
                        <label className="text-xs uppercase tracking-widest text-gold font-bold">2. Configuration Repository</label>
                        <input 
                            type="text" 
                            className="input" 
                            placeholder="URL du Repository (ex: https://github.com/...)"
                            value={formData.repo_url}
                            onChange={(e) => setFormData({...formData, repo_url: e.target.value})}
                        />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="text-xs text-white/40">Branche</label>
                            <input 
                                type="text" 
                                className="input" 
                                value={formData.branch}
                                onChange={(e) => setFormData({...formData, branch: e.target.value})}
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-xs text-white/40">Commande start</label>
                            <input 
                                type="text" 
                                className="input" 
                                value={formData.start_command}
                                onChange={(e) => setFormData({...formData, start_command: e.target.value})}
                            />
                        </div>
                    </div>
                </div>
            )}

            {method === 'template' && (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 animate-in zoom-in duration-500">
                    <TemplateItem title="Minecraft" icon="🟩" />
                    <TemplateItem title="Node.js" icon="🐢" />
                    <TemplateItem title="Python" icon="🐍" />
                    <TemplateItem title="Discord" icon="🤖" />
                </div>
            )}
            
            {method === 'zip' && (
                <div className="dropzone animate-in slide-in-from-right duration-500">
                    <FileArchive size={48} className="mx-auto mb-4 text-white/20" />
                    <p className="font-bold mb-1">Glissez votre archive ZIP ici</p>
                    <p className="text-xs text-white/30">Taille max: 50MB</p>
                </div>
            )}

            <button 
                onClick={handleDeploy}
                disabled={loading}
                className="btn-gold w-full h-16 text-lg flex items-center justify-center gap-3 active:scale-95 transition-transform"
            >
                {loading ? <RefreshCcw size={24} className="animate-spin" /> : <Rocket size={24} />}
                <span>LANCER LE DÉPLOIEMENT</span>
            </button>

            {status && (
                <div className="p-4 bg-white/5 rounded-xl border border-white/10 flex items-center gap-3">
                    <Terminal size={16} className="text-primary" />
                    <span className="text-sm font-mono text-white/60">{status}</span>
                </div>
            )}
        </div>
      </Reveal>
    </div>
  );
};

const MethodCard = ({ active, onClick, icon, title, desc }: any) => (
    <button 
        onClick={onClick}
        className={`glass p-6 rounded-2xl border flex flex-col items-center text-center gap-3 transition-all ${
            active ? 'border-primary bg-primary/10 shadow-[0_0_20px_rgba(212,163,115,0.2)]' : 'border-white/5 hover:border-white/20'
        }`}
    >
        <div className={active ? 'text-primary' : 'text-white/40'}>{icon}</div>
        <h3 className="font-bold uppercase tracking-tighter text-lg">{title}</h3>
        <p className="text-xs text-white/30 leading-relaxed">{desc}</p>
    </button>
);

const TemplateItem = ({ title, icon }: any) => (
    <div className="glass p-4 rounded-xl border border-white/5 text-center cursor-pointer hover:border-primary transition-colors group">
        <div className="text-3xl mb-2 group-hover:scale-125 transition-transform">{icon}</div>
        <div className="text-[10px] font-bold uppercase tracking-widest">{title}</div>
    </div>
);
