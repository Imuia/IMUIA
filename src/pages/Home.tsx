import React from 'react';
import { useAppState } from '../data/AppState';
import { translations } from '../data/translations';
import { ArrowRight, Compass, Shield, Rocket, Activity, Globe, Send, UserCheck, TrendingUp, Mail } from 'lucide-react';

export const Home: React.FC = () => {
  const { language, playSound, setActiveSection } = useAppState();
  const t = translations[language];

  const handleCTA = (section: string, intent?: string) => {
    if (intent) {
      try {
        sessionStorage.setItem('imuia_intent', intent);
      } catch (e) {
        console.warn('sessionStorage not available', e);
      }
    }
    setActiveSection(section);
    playSound('space');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="relative min-h-[calc(100vh-80px)] flex flex-col items-center justify-center py-12 px-4 overflow-hidden space-y-24">
      {/* Background atmosphere elements */}
      <div className="absolute inset-0 stars-bg opacity-40 pointer-events-none"></div>

      {/* Pulsing and drifting Nebulae */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full nebula-purple blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full nebula-cyan blur-3xl pointer-events-none"></div>

      {/* --- HERO SECTION --- */}
      <div className="max-w-4xl mx-auto text-center z-10 space-y-12">
        {/* Central Planetary Station "IMUIA" sphere */}
        <div className="relative flex justify-center mb-6">
          <div className="absolute inset-0 m-auto w-48 h-48 bg-purple-600/20 rounded-full blur-3xl animate-pulse"></div>

          {/* Main Station Spherical Object */}
          <div className="relative w-40 h-40 rounded-full border border-purple-500/30 flex items-center justify-center bg-gradient-to-tr from-purple-900/60 to-black p-1 shadow-[0_0_50px_rgba(168,85,247,0.3)] hover:scale-105 transition-transform duration-500">
            {/* Holographic orbital ring */}
            <div className="absolute w-52 h-16 border-t border-b border-cyan-400/30 rounded-[50%] rotate-12 animate-pulse"></div>
            <div className="absolute w-52 h-16 border-l border-r border-purple-500/20 rounded-[50%] -rotate-45 animate-pulse"></div>

            {/* Spinning network nodes */}
            <div className="absolute w-full h-full rounded-full border border-dashed border-cyan-400/40 animate-orbit"></div>

            <div className="text-center">
              <span className="block font-orbitron font-black text-4xl tracking-widest text-white glow-text-purple">
                {t.brand}
              </span>
              <span className="block text-[8px] tracking-wider uppercase text-cyan-400 font-mono mt-1">
                Core Command v1.0
              </span>
            </div>

            {/* Miniature satellite nodes */}
            <div className="absolute -top-1 -left-1 w-3 h-3 bg-cyan-400 rounded-full animate-ping"></div>
            <div className="absolute -bottom-1 -right-1 w-2.5 h-2.5 bg-purple-500 rounded-full"></div>
          </div>
        </div>

        {/* Headings */}
        <div className="space-y-4">
          <h2 className="text-sm font-orbitron font-bold text-cyan-400 tracking-widest uppercase flex items-center justify-center space-x-2">
            <Activity className="w-4 h-4 animate-pulse" />
            <span>{t.tagline}</span>
          </h2>
          <h1 className="text-4xl md:text-6xl font-black font-orbitron text-white tracking-tight leading-tight uppercase">
            {t.introTitle}
          </h1>
          <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed font-light">
            {t.introText}
          </p>
        </div>

        {/* High-end Glowing Rounded Action Buttons (All 4 hero buttons) */}
        <div className="flex flex-wrap justify-center gap-4 pt-4 max-w-3xl mx-auto">
          <button
            onClick={() => handleCTA('universe')}
            onMouseEnter={() => playSound('hover')}
            className="flex items-center space-x-2.5 px-7 py-4 bg-purple-600 hover:bg-purple-500 text-white font-orbitron font-bold text-sm tracking-widest rounded-full transition-all duration-300 shadow-[0_0_20px_rgba(168,85,247,0.4)] hover:shadow-[0_0_30px_rgba(168,85,247,0.6)] cursor-none hover:translate-y-[-2px]"
          >
            <Compass className="w-4 h-4" />
            <span>{t.exploreUniverse}</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <button
            onClick={() => handleCTA('platforms')}
            onMouseEnter={() => playSound('hover')}
            className="flex items-center space-x-2.5 px-7 py-4 bg-white/5 hover:bg-purple-500/10 text-white hover:text-purple-300 font-orbitron font-bold text-sm tracking-widest rounded-full border border-white/10 hover:border-purple-500/50 transition-all duration-300 cursor-none hover:translate-y-[-2px]"
          >
            <Shield className="w-4 h-4" />
            <span>{t.discoverPlatforms}</span>
          </button>

          <button
            onClick={() => handleCTA('partners', 'partner')}
            onMouseEnter={() => playSound('hover')}
            className="flex items-center space-x-2.5 px-7 py-4 bg-white/5 hover:bg-purple-500/10 text-white hover:text-purple-300 font-orbitron font-bold text-sm tracking-widest rounded-full border border-white/10 hover:border-purple-500/50 transition-all duration-300 cursor-none hover:translate-y-[-2px]"
          >
            <Rocket className="w-4 h-4" />
            <span>{t.proposePartnership}</span>
          </button>

          <button
            onClick={() => handleCTA('partners', 'contact')}
            onMouseEnter={() => playSound('hover')}
            className="flex items-center space-x-2.5 px-7 py-4 bg-white/5 hover:bg-cyan-500/10 text-white hover:text-cyan-300 font-orbitron font-bold text-sm tracking-widest rounded-full border border-white/10 hover:border-cyan-500/50 transition-all duration-300 cursor-none hover:translate-y-[-2px]"
          >
            <Mail className="w-4 h-4" />
            <span>{t.contactUs}</span>
          </button>
        </div>

        {/* Digital Hud Footer Stat indicators */}
        <div className="pt-8 border-t border-white/5 grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          <div className="glass-panel p-4 rounded-xl">
            <div className="text-2xl font-black font-orbitron text-purple-400">12</div>
            <div className="text-[10px] text-gray-400 font-mono tracking-widest uppercase">PLATEFORMES ACTIVES</div>
          </div>
          <div className="glass-panel p-4 rounded-xl">
            <div className="text-2xl font-black font-orbitron text-cyan-400">6</div>
            <div className="text-[10px] text-gray-400 font-mono tracking-widest uppercase">GALAXIES MÉTIERS</div>
          </div>
          <div className="glass-panel p-4 rounded-xl">
            <div className="text-2xl font-black font-orbitron text-pink-400">3+</div>
            <div className="text-[10px] text-gray-400 font-mono tracking-widest uppercase">PAYS DE DÉPLOIEMENT</div>
          </div>
          <div className="glass-panel p-4 rounded-xl">
            <div className="text-2xl font-black font-orbitron text-green-400">100%</div>
            <div className="text-[10px] text-gray-400 font-mono tracking-widest uppercase">INNOVATION LABS</div>
          </div>
        </div>
      </div>

      {/* --- CONTACT SECTION (Planet Earth viewed from space) --- */}
      <section className="w-full max-w-5xl mx-auto z-10">
        <div className="glass-panel p-8 md:p-12 rounded-3xl border border-cyan-500/30 relative overflow-hidden text-center space-y-8 shadow-[0_0_60px_rgba(6,182,212,0.15)]">

          {/* Background Earth Planet Orbital Canvas graphic */}
          <div className="relative mx-auto w-56 h-56 md:w-64 md:h-64 flex items-center justify-center">
            {/* Outer atmosphere glow */}
            <div className="absolute inset-0 rounded-full bg-cyan-500/20 blur-2xl animate-pulse"></div>

            {/* Earth Sphere representation */}
            <div className="relative w-48 h-48 md:w-56 md:h-56 rounded-full bg-gradient-to-tr from-blue-950 via-cyan-900 to-indigo-900 border border-cyan-400/50 shadow-[inset_0_0_40px_rgba(6,182,212,0.6)] flex items-center justify-center overflow-hidden">
              {/* Continents & grid effect lines */}
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(16,185,129,0.3)_0%,transparent_60%)]"></div>
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_70%,rgba(59,130,246,0.3)_0%,transparent_60%)]"></div>
              <div className="absolute w-full h-full rounded-full border border-cyan-400/20 border-dashed animate-spin" style={{ animationDuration: '40s' }}></div>

              {/* Orbiting satellites */}
              <div className="absolute w-64 h-20 border-t border-cyan-300/40 rounded-[50%] rotate-45 animate-pulse"></div>

              <div className="z-10 text-center space-y-1">
                <Globe className="w-10 h-10 text-cyan-300 mx-auto animate-bounce" />
                <span className="block text-xs font-orbitron font-bold tracking-widest uppercase text-white glow-text-cyan">
                  TERRE / ORBITE
                </span>
                <span className="block text-[8px] font-mono text-cyan-400">
                  IMUIA LINK STATION
                </span>
              </div>
            </div>
          </div>

          <div className="max-w-2xl mx-auto space-y-4">
            <h2 className="text-2xl md:text-4xl font-black font-orbitron uppercase text-white tracking-wide">
              Vous avez une idée à mettre en orbite ?
            </h2>
            <p className="text-sm md:text-base text-gray-300 font-light leading-relaxed">
              « Projet innovant, partenariat, investissement ou proposition de collaboration : entrez en contact avec l'équipage IMUIA. »
            </p>
          </div>

          {/* 4 Action Buttons required by spec */}
          <div className="flex flex-wrap justify-center gap-4 pt-4">
            <button
              onClick={() => handleCTA('partners', 'project')}
              onMouseEnter={() => playSound('hover')}
              className="flex items-center space-x-2 px-6 py-3.5 bg-purple-600 hover:bg-purple-500 text-white font-orbitron font-bold text-xs tracking-wider uppercase rounded-full shadow-lg shadow-purple-600/30 transition-all cursor-none hover:scale-105"
            >
              <Send className="w-4 h-4" />
              <span>{t.presentProject}</span>
            </button>

            <button
              onClick={() => handleCTA('partners', 'partner')}
              onMouseEnter={() => playSound('hover')}
              className="flex items-center space-x-2 px-6 py-3.5 bg-white/10 hover:bg-white/20 text-white font-orbitron font-bold text-xs tracking-wider uppercase rounded-full border border-white/20 transition-all cursor-none hover:scale-105"
            >
              <UserCheck className="w-4 h-4" />
              <span>{t.becomePartner}</span>
            </button>

            <button
              onClick={() => handleCTA('partners', 'invest')}
              onMouseEnter={() => playSound('hover')}
              className="flex items-center space-x-2 px-6 py-3.5 bg-white/10 hover:bg-white/20 text-white font-orbitron font-bold text-xs tracking-wider uppercase rounded-full border border-white/20 transition-all cursor-none hover:scale-105"
            >
              <TrendingUp className="w-4 h-4 text-green-400" />
              <span>{t.investUniverse}</span>
            </button>

            <button
              onClick={() => handleCTA('partners', 'contact')}
              onMouseEnter={() => playSound('hover')}
              className="flex items-center space-x-2 px-6 py-3.5 bg-cyan-600/30 hover:bg-cyan-500/50 text-cyan-200 border border-cyan-400/40 font-orbitron font-bold text-xs tracking-wider uppercase rounded-full transition-all cursor-none hover:scale-105"
            >
              <Mail className="w-4 h-4 text-cyan-300" />
              <span>{t.contactUs}</span>
            </button>
          </div>

        </div>
      </section>
    </div>
  );
};
