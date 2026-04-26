import { Link } from 'react-router-dom';
import { Server, Database, MessageSquare, ShoppingCart, LayoutDashboard, User, ShieldCheck, Mail, Zap } from 'lucide-react';
import { Reveal } from '../components/Animations';

export const Home = () => {
  return (
    <div>
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1614850523296-d8c1af93d400?auto=format&fit=crop&q=80')] bg-cover bg-center opacity-20 scale-110"></div>
        <div className="absolute inset-0 bg-linear-to-b from-transparent via-background/80 to-background"></div>
        
        <div className="relative z-10 text-center px-4 max-w-4xl">
          <Reveal direction="down">
            <h1 className="text-6xl md:text-8xl font-display text-white mb-6 tracking-tighter">
              KURONA <span className="text-primary italic">HOSTING</span>
            </h1>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="text-xl md:text-2xl text-white/60 mb-10 font-light max-w-2xl mx-auto">
              L'excellence de l'hébergement gaming. Puissance brute, sécurité impénétrable, et support 24/7.
            </p>
          </Reveal>
          <Reveal direction="up" delay={0.4}>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/register" className="btn-gold text-lg py-4">
                Démarrer l'aventure
              </Link>
              <Link to="/pricing" className="glass hover:bg-white/10 text-white font-bold py-4 px-8 rounded-lg transition-all">
                Voir nos offres
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-24 px-4 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <Reveal>
            <h2 className="text-4xl font-display text-white mb-4">NOS SERVICES</h2>
            <div className="h-1 w-20 bg-primary mx-auto"></div>
          </Reveal>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { icon: <Server className="w-10 h-10" />, title: 'Game Servers', desc: 'Minecraft, Ark, Rust, et plus. Hardware haut de gamme.' },
            { icon: <Zap className="w-10 h-10" />, title: 'Bots & Apps', desc: 'Discord bots, Node.js, Python. Déploiement instantané.' },
            { icon: <ShieldCheck className="w-10 h-10" />, title: 'Sécurité AAA', desc: 'Protection Anti-DDoS de niveau professionnel.' }
          ].map((item, i) => (
            <Reveal key={i} delay={i * 0.1} direction="up">
              <div className="glass-gold p-8 rounded-2xl hover:bg-primary/10 transition-all group">
                <div className="text-primary mb-6 transform group-hover:scale-110 transition-transform">{item.icon}</div>
                <h3 className="text-2xl font-bold mb-4">{item.title}</h3>
                <p className="text-white/60 leading-relaxed">{item.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-24 bg-primary/5 border-y border-white/5">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {[
            { label: 'Utilisateurs', value: '15,000+' },
            { label: 'Serveurs Actifs', value: '3,200+' },
            { label: 'Uptime', value: '99.99%' },
            { label: 'Support', value: '24h/7' }
          ].map((stat, i) => (
            <Reveal key={i} delay={i * 0.1}>
              <div className="text-primary font-display text-4xl md:text-5xl mb-2">{stat.value}</div>
              <div className="text-white/40 uppercase tracking-widest text-sm">{stat.label}</div>
            </Reveal>
          ))}
        </div>
      </section>
    </div>
  );
};
