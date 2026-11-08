import React from 'react';
import { useAppState } from '../data/useAppState';
import { translations } from '../data/translations';
import { ArrowRight, Compass, Shield, Rocket, Activity, Mail, Sparkles, Globe, ChevronRight } from 'lucide-react';

export const Home: React.FC = () => {
  const { language, playSound, setActiveSection } = useAppState();
  const t = translations[language];

  const handleCTA = (section: string) => {
    setActiveSection(section);
    playSound('space');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleContactIntent = (intent: string) => {
    // Store intent in session storage or state for the partners/contact form
    sessionStorage.setItem('imuia_intent', intent);
    setActiveSection('contact');
    playSound('space');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="relative min-h-[calc(100vh-80px)] flex flex-col items-center justify-center py-12 px-4 overflow-hidden space-y-20">
      {/* Background atmosphere elements */}
      <div className="absolute inset-0 stars-bg opacity-40 pointer-events-none"></div>

      {/* Pulsing and drifting Nebulae */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full nebula-purple blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full nebula-cyan blur-3xl pointer-events-none"></div>

      {/* Hero Section */}
      <div className="max-w-4xl mx-auto text-center z-10 space-y-10">
        {/* Central Planetary Station "IMUIA" sphere */}
        <div className="relative flex justify-center mb-6">
          <div className="absolute inset-0 m-auto w-48 h-48 bg-purple-600/20 rounded-full blur-3xl animate-pulse"></div>

          {/* Main Station Spherical Object */}
          <div className="relative w-44 h-44 rounded-full border border-purple-500/30 flex items-center justify-center bg-gradient-to-tr from-purple-900/60 to-black p-1 shadow-[0_0_50px_rgba(168,85,247,0.3)] hover:scale-105 transition-transform duration-500">
            {/* Holographic orbital ring */}
            <div className="absolute w-56 h-16 border-t border-b border-cyan-400/30 rounded-[50%] rotate-12 animate-pulse"></div>
            <div className="absolute w-56 h-16 border-l border-r border-purple-500/20 rounded-[50%] -rotate-45 animate-pulse"></div>

            {/* Spinning network nodes */}
            <div className="absolute w-full h-full rounded-full border border-dashed border-cyan-400/40 animate-orbit"></div>

            <div className="text-center">
              <span className="block font-orbitron font-black text-4xl tracking-widest text-white glow-text-purple">
                {t.brand}
              </span>
              <span className="block text-[8px] tracking-wider uppercase text-cyan-400 font-mono mt-1">
                Galactic Core Command
              </span>
            </div>

            {/* Miniature satellite nodes */}
            <div className="absolute -top-1 -left-1 w-3 h-3 bg-cyan-400 rounded-full animate-ping"></div>
            <div className="absolute -bottom-1 -right-1 w-2.5 h-2.5 bg-purple-500 rounded-full"></div>
          </div>
        </div>

        {/* Signature & Slogans */}
        <div className="space-y-4">
          <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/20 text-cyan-400 text-xs font-orbitron font-bold tracking-widest uppercase">
            <Activity className="w-3.5 h-3.5 animate-pulse text-cyan-400" />
            <span>{t.tagline}</span>
          </div>

          <h1 className="text-3xl md:text-5xl lg:text-6xl font-black font-orbitron text-white tracking-tight leading-tight uppercase">
            {t.introTitle}
          </h1>

          <p className="text-base md:text-lg text-gray-300 max-w-3xl mx-auto leading-relaxed font-light italic">
            {t.introText}
          </p>

          {/* Slogans ticker badges */}
          <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
            {t.slogans.map((slogan: string, idx: number) => (
              <span
                key={idx}
                className="text-[11px] font-mono px-3 py-1 rounded-full bg-white/5 border border-white/10 text-gray-400"
              >
                ✦ {slogan}
              </span>
            ))}
          </div>
        </div>

        {/* 4 Main Action Buttons mandated by the prompt */}
        <div className="flex flex-wrap justify-center gap-4 pt-4 max-w-4xl mx-auto">
          {/* 1. Explorer notre univers */}
          <button
            onClick={() => handleCTA('universe')}
            onMouseEnter={() => playSound('hover')}
            className="flex items-center space-x-2 px-6 py-3.5 bg-purple-600 hover:bg-purple-500 text-white font-orbitron font-bold text-xs tracking-widest uppercase rounded-full transition-all duration-300 shadow-[0_0_20px_rgba(168,85,247,0.4)] hover:shadow-[0_0_30px_rgba(168,85,247,0.6)] cursor-none hover:translate-y-[-2px]"
          >
            <Compass className="w-4 h-4" />
            <span>{t.exploreUniverse}</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          {/* 2. Découvrir nos plateformes */}
          <button
            onClick={() => handleCTA('platforms')}
            onMouseEnter={() => playSound('hover')}
            className="flex items-center space-x-2 px-6 py-3.5 bg-white/5 hover:bg-purple-500/15 text-white hover:text-purple-300 font-orbitron font-bold text-xs tracking-widest uppercase rounded-full border border-white/10 hover:border-purple-500/50 transition-all duration-300 cursor-none hover:translate-y-[-2px]"
          >
            <Shield className="w-4 h-4 text-purple-400" />
            <span>{t.discoverPlatforms}</span>
          </button>

          {/* 3. Proposer un partenariat */}
          <button
            onClick={() => handleCTA('partners')}
            onMouseEnter={() => playSound('hover')}
            className="flex items-center space-x-2 px-6 py-3.5 bg-white/5 hover:bg-purple-500/15 text-white hover:text-purple-300 font-orbitron font-bold text-xs tracking-widest uppercase rounded-full border border-white/10 hover:border-purple-500/50 transition-all duration-300 cursor-none hover:translate-y-[-2px]"
          >
            <Rocket className="w-4 h-4 text-cyan-400" />
            <span>{t.proposePartnership}</span>
          </button>

          {/* 4. Nous contacter */}
          <button
            onClick={() => handleCTA('contact')}
            onMouseEnter={() => playSound('hover')}
            className="flex items-center space-x-2 px-6 py-3.5 bg-white/5 hover:bg-cyan-500/15 text-white hover:text-cyan-300 font-orbitron font-bold text-xs tracking-widest uppercase rounded-full border border-white/10 hover:border-cyan-500/50 transition-all duration-300 cursor-none hover:translate-y-[-2px]"
          >
            <Mail className="w-4 h-4 text-pink-400" />
            <span>{t.contactUs}</span>
          </button>
        </div>

        {/* Digital Hud Stat indicators */}
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
            <div className="text-2xl font-black font-orbitron text-pink-400">4+</div>
            <div className="text-[10px] text-gray-400 font-mono tracking-widest uppercase">HUBS INTERNATIONAUX</div>
          </div>
          <div className="glass-panel p-4 rounded-xl">
            <div className="text-2xl font-black font-orbitron text-green-400">12</div>
            <div className="text-[10px] text-gray-400 font-mono tracking-widest uppercase">AXES R&amp;D LABS</div>
          </div>
        </div>
      </div>

      {/* Earth Contact Section at bottom of page as required by prompt */}
      <section className="w-full max-w-5xl mx-auto glass-panel p-8 md:p-12 rounded-3xl border border-purple-500/30 relative z-10 text-center space-y-8 overflow-hidden">
        {/* Subtle background glow */}
        <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-96 h-96 bg-cyan-600/10 rounded-full blur-3xl pointer-events-none"></div>

        {/* Visual Earth Sphere seen from space */}
        <div className="relative flex justify-center mb-4">
          <div className="relative w-36 h-36 rounded-full bg-gradient-to-tr from-blue-900 via-teal-800 to-indigo-950 border-2 border-cyan-400/40 shadow-[0_0_40px_rgba(34,211,238,0.4)] flex items-center justify-center overflow-hidden">
            {/* Atmosphere layer */}
            <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle_at_30%_30%,rgba(34,211,238,0.4),transparent_60%)]"></div>
            {/* Spinning cloud bands */}
            <div className="absolute inset-0 border border-dashed border-cyan-300/30 rounded-full animate-orbit"></div>
            <Globe className="w-20 h-20 text-cyan-300/40 animate-pulse" />
            <div className="absolute bottom-2 text-[8px] font-mono tracking-widest uppercase text-cyan-200">
              EARTH ORBIT
            </div>
          </div>
        </div>

        <div className="space-y-3 max-w-2xl mx-auto">
          <h2 className="text-2xl md:text-4xl font-black font-orbitron text-white uppercase tracking-tight">
            {t.contactTitle}
          </h2>
          <p className="text-sm md:text-base text-gray-300 leading-relaxed font-light italic">
            {t.contactText}
          </p>
        </div>

        {/* The 4 specific prompt buttons */}
        <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
          <button
            onClick={() => handleContactIntent('project')}
            onMouseEnter={() => playSound('hover')}
            className="flex items-center space-x-2 px-5 py-3 rounded-full bg-purple-600 hover:bg-purple-500 text-white font-orbitron font-bold text-xs tracking-wider uppercase transition-all shadow-[0_0_15px_rgba(168,85,247,0.3)] cursor-none"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>{t.btnPresentProject}</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>

          <button
            onClick={() => handleContactIntent('partner')}
            onMouseEnter={() => playSound('hover')}
            className="flex items-center space-x-2 px-5 py-3 rounded-full bg-white/5 hover:bg-white/10 text-white font-orbitron font-bold text-xs tracking-wider uppercase border border-white/10 hover:border-purple-500 transition-all cursor-none"
          >
            <span>{t.btnBecomePartner}</span>
          </button>

          <button
            onClick={() => handleContactIntent('invest')}
            onMouseEnter={() => playSound('hover')}
            className="flex items-center space-x-2 px-5 py-3 rounded-full bg-white/5 hover:bg-white/10 text-white font-orbitron font-bold text-xs tracking-wider uppercase border border-white/10 hover:border-cyan-500 transition-all cursor-none"
          >
            <span>{t.btnInvestUniverse}</span>
          </button>

          <button
            onClick={() => handleContactIntent('contact')}
            onMouseEnter={() => playSound('hover')}
            className="flex items-center space-x-2 px-5 py-3 rounded-full bg-white/5 hover:bg-white/10 text-white font-orbitron font-bold text-xs tracking-wider uppercase border border-white/10 hover:border-pink-500 transition-all cursor-none"
          >
            <Mail className="w-3.5 h-3.5 text-pink-400" />
            <span>{t.btnContactIMUIA}</span>
          </button>
        </div>
      </section>
    </div>
  );
};
