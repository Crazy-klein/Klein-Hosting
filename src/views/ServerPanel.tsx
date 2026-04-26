import { useParams } from 'react-router-dom';
import { useState } from 'react';
import { Play, Square, RefreshCcw, Terminal, Settings, Database, Activity, ShieldCheck } from 'lucide-react';
import { Reveal } from '../components/Animations';

export const ServerPanel = () => {
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState('console');

  return (
    <div className="p-8">
      <Reveal direction="down">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 mb-12">
          <div className="flex items-center gap-6">
            <div className="w-20 h-20 glass rounded-3xl flex items-center justify-center text-primary border-primary/30 rotate-3 group hover:rotate-0 transition-all duration-500">
               <Database size={40} />
            </div>
            <div>
              <div className="flex items-center gap-3 mb-2">
                <h1 className="text-4xl font-display">MINECRAFT SURVIVAL #{id}</h1>
                <span className="px-3 py-1 bg-green-500/10 text-green-500 border border-green-500/20 rounded-full text-[10px] font-bold animate-pulse uppercase">En Ligne</span>
              </div>
              <div className="flex items-center gap-4 text-white/40 text-sm">
                <span className="flex items-center gap-1"><ShieldCheck size={14} className="text-primary"/> node02.kurona.hosting</span>
                <span>•</span>
                <span>Type: Minecraft Paper 1.20.1</span>
              </div>
            </div>
          </div>
          
          <div className="flex gap-4">
             <button className="flex items-center gap-2 p-3 bg-green-500/10 text-green-500 border border-green-500/20 rounded-xl hover:bg-green-500/20 transition-all">
                <Play size={20} fill="currentColor" />
             </button>
             <button className="flex items-center gap-2 p-3 bg-white/5 text-white border border-white/10 rounded-xl hover:bg-white/10 transition-all">
                <RefreshCcw size={20} />
             </button>
             <button className="flex items-center gap-2 p-3 bg-red-500/10 text-red-500 border border-red-500/20 rounded-xl hover:bg-red-500/20 transition-all">
                <Square size={20} fill="currentColor" />
             </button>
          </div>
        </div>
      </Reveal>

      {/* Tabs */}
      <div className="flex gap-8 mb-12 border-b border-white/5 p-2">
        <TabButton icon={<Terminal size={18}/>} label="Console" active={activeTab === 'console'} onClick={setActiveTab} id="console" />
        <TabButton icon={<Settings size={18}/>} label="Configuration" active={activeTab === 'settings'} onClick={setActiveTab} id="settings" />
        <TabButton icon={<Database size={18}/>} label="Fichiers" active={activeTab === 'files'} onClick={setActiveTab} id="files" />
        <TabButton icon={<Activity size={18}/>} label="Statistiques" active={activeTab === 'stats'} onClick={setActiveTab} id="stats" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Console / Main area */}
        <div className="lg:col-span-2">
          <Reveal>
             <div className="glass bg-black/40 rounded-3xl border-white/5 relative overflow-hidden group">
                <div className="bg-white/5 p-4 border-b border-white/5 flex justify-between items-center">
                  <span className="text-[10px] font-bold text-white/40 uppercase tracking-widest pl-2 flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-green-500 shadow-[0_0_8px_green]"></div> Connecté à la console
                  </span>
                  <div className="flex gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-500/20"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500/20"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500/20"></div>
                  </div>
                </div>
                <div className="p-6 font-mono text-sm space-y-2 h-[450px] overflow-y-auto">
                  <p className="text-blue-400">[12:45:01] [Server thread/INFO]: Starting minecraft server version 1.20.1</p>
                  <p className="text-white/60">[12:45:05] [Server thread/INFO]: Loading properties</p>
                  <p className="text-white/60">[12:45:05] [Server thread/INFO]: Default game type: SURVIVAL</p>
                  <p className="text-green-400">[12:45:10] [Server thread/INFO]: Done (9.24s)! For help, type "help"</p>
                  <p className="text-primary italic animate-pulse tracking-widest mt-4">_ Prêt pour les commandes...</p>
                </div>
                <div className="p-4 border-t border-white/5 bg-black/20">
                  <input 
                    type="text" 
                    placeholder="Tapez une commande (ex: /op player)..." 
                    className="w-full bg-transparent border-none focus:ring-0 text-primary font-mono placeholder:text-white/20"
                  />
                </div>
             </div>
          </Reveal>
        </div>

        {/* Info / Metric Sidebar */}
        <div className="space-y-8">
           <Reveal direction="right" delay={0.2}>
              <div className="glass p-8 rounded-3xl">
                <h3 className="font-bold mb-6 italic uppercase tracking-widest flex items-center gap-2">
                  <Activity size={18} className="text-primary" /> Ressources Actuelles
                </h3>
                <div className="space-y-8">
                  <CircularMetric label="RAM Usage" value="45%" color="#f5a623" />
                  <CircularMetric label="CPU usage" value="12%" color="#3b82f6" />
                  <CircularMetric label="Disk space" value="8%" color="#10b981" />
                </div>
              </div>
           </Reveal>

           <Reveal direction="right" delay={0.3}>
              <div className="glass p-8 rounded-3xl">
                <h3 className="font-bold mb-6 italic uppercase tracking-widest">SFTP INFORMATION</h3>
                <div className="space-y-4 text-sm font-mono">
                   <div>
                     <div className="text-white/20 text-[10px]">HÔTE</div>
                     <div className="text-white/80">sftp.kurona.hosting</div>
                   </div>
                   <div>
                     <div className="text-white/20 text-[10px]">USERNAME</div>
                     <div className="text-white/80">u123_abc_server</div>
                   </div>
                   <button className="w-full py-2 bg-white/5 hover:bg-white/10 rounded-lg text-primary text-xs font-bold transition-all mt-4 border border-white/5">COPIER LE MOT DE PASSE</button>
                </div>
              </div>
           </Reveal>
        </div>
      </div>
    </div>
  );
};

const TabButton = ({ icon, label, active, onClick, id }: any) => (
  <button 
    onClick={() => onClick(id)}
    className={`flex items-center gap-2 pb-4 px-2 transition-all relative ${active ? 'text-primary' : 'text-white/40 hover:text-white'}`}
  >
    {icon}
    <span className="font-bold uppercase text-xs tracking-widest">{label}</span>
    {active && (
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-primary rounded-full shadow-[0_0_10px_#f5a623]"></div>
    )}
  </button>
);

const CircularMetric = ({ label, value, color }: any) => (
  <div className="flex justify-between items-center">
    <span className="text-white/40 uppercase text-[10px] tracking-widest">{label}</span>
    <div className="flex items-center gap-3">
      <div className="w-20 h-1.5 bg-white/5 rounded-full overflow-hidden">
        <div className="h-full rounded-full" style={{ width: value, backgroundColor: color }}></div>
      </div>
      <span className="font-bold text-sm" style={{ color }}>{value}</span>
    </div>
  </div>
);
