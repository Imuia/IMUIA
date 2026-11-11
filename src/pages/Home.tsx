import React from 'react';
import { useAppState } from '../data/useAppState';
import { translations } from '../data/translations';
import { ArrowRight, Compass, Shield, Rocket, Activity, Mail } from 'lucide-react';
import { Contact } from './Contact';

export const Home: React.FC = () => {
  const { language, playSound, setActiveSection } = useAppState();
  const t = translations[language];

  const handleCTA = (section: string) => {
    setActiveSection(section);
    playSound('space');
  };

  return (
    <div className="relative min-h-[calc(100vh-80px)] flex flex-col items-center justify-center py-12 px-4 overflow-hidden">
      {/* Background atmosphere elements */}
      <div className="absolute inset-0 stars-bg opacity-40 pointer-events-none"></div>

      {/* Pulsing and drifting Nebulae */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full nebula-purple blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full nebula-cyan blur-3xl pointer-events-none"></div>

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

        {/* High-end Glowing Rounded Action Buttons */}
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
            onClick={() => handleCTA('partners')}
            onMouseEnter={() => playSound('hover')}
            className="flex items-center space-x-2.5 px-7 py-4 bg-white/5 hover:bg-purple-500/10 text-white hover:text-purple-300 font-orbitron font-bold text-sm tracking-widest rounded-full border border-white/10 hover:border-purple-500/50 transition-all duration-300 cursor-none hover:translate-y-[-2px]"
          >
            <Rocket className="w-4 h-4" />
            <span>{t.proposePartnership}</span>
          </button>

          <button
            onClick={() => handleCTA('contact')}
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

        {/* Integrated Contact form landing segment */}
        <div className="w-full mt-24 border-t border-white/10 pt-16">
          <Contact />
        </div>
      </div>
    </div>
  );
};
