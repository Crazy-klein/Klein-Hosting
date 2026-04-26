import { useState, useEffect } from 'react';
import { Activity, ShieldCheck, Globe, Database, Server, Zap, Clock } from 'lucide-react';
import { Reveal } from '../components/Animations';

export const Status = () => {
  const [services, setServices] = useState<any>(null);

  useEffect(() => {
    fetch('/api/status').then(res => res.json()).then(setServices);
  }, []);

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <Reveal direction="down">
        <h1 className="text-4xl font-display italic uppercase mb-12 flex items-center gap-4">
          <Activity className="text-primary" /> État des Services
        </h1>
      </Reveal>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <StatusCard label="Plateforme Web" status={services?.web} icon={<Globe />} />
        <StatusCard label="Base de données" status={services?.database} icon={<Database />} />
        <StatusCard label="Node Europe 01" status={services?.node_01} icon={<Server />} />
        <StatusCard label="Node Europe 02" status={services?.node_02} icon={<Server />} />
        <StatusCard label="Panel Pterodactyl" status="online" icon={<Zap />} />
        <StatusCard label="SFTP Gateway" status={services?.sftp} icon={<Database />} />
      </div>

      <Reveal delay={0.4}>
        <div className="mt-12 glass p-8 rounded-3xl border-dashed border-white/10 text-center">
          <div className="text-[10px] text-white/20 uppercase tracking-widest mb-2">Dernière mise à jour</div>
          <div className="flex items-center justify-center gap-2 text-white/60">
             <Clock size={14} />
             {services?.last_check ? new Date(services.last_check).toLocaleTimeString() : 'En attente...'}
          </div>
        </div>
      </Reveal>
    </div>
  );
};

const StatusCard = ({ label, status, icon }: any) => (
  <div className="glass p-6 rounded-2xl flex items-center justify-between border-white/5">
    <div className="flex items-center gap-4">
       <div className="p-3 bg-white/5 rounded-xl text-primary">{icon}</div>
       <div className="font-bold uppercase italic text-sm">{label}</div>
    </div>
    <div className="flex items-center gap-2">
       <div className={`w-2 h-2 rounded-full ${status === 'online' ? 'bg-green-500 shadow-[0_0_8px_green]' : 'bg-red-500'} animate-pulse`}></div>
       <span className={`text-[10px] font-bold uppercase ${status === 'online' ? 'text-green-500' : 'text-red-500'}`}>
         {status === 'online' ? 'Opérationnel' : 'Maintenance'}
       </span>
    </div>
  </div>
);
