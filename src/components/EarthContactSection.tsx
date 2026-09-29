import React from 'react';
import { useAppState } from '../data/useAppState';
import { Globe, Rocket, Handshake, TrendingUp, Mail } from 'lucide-react';

export const EarthContactSection: React.FC = () => {
  const { playSound, setActiveSection } = useAppState();

  const handleAction = (intent?: string) => {
    playSound('space');
    if (intent) {
      sessionStorage.setItem('imuia_partner_intent', intent);
    }
    setActiveSection('partners');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <section className="relative my-16 py-16 px-4 overflow-hidden rounded-3xl border border-cyan-500/20 glass-panel bg-gradient-to-b from-slate-950/80 via-[#030712]/90 to-purple-950/40">
      {/* Background space atmosphere */}
      <div className="absolute inset-0 stars-bg opacity-30 pointer-events-none"></div>
      <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-cyan-600/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute -bottom-32 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-purple-600/15 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-5xl mx-auto text-center relative z-10 space-y-10">

        {/* Photorealistic / Stylized 3D Earth Planet viewed from deep space */}
        <div className="relative flex justify-center items-center">
          {/* Planet Glow Field */}
          <div className="absolute w-64 h-64 bg-cyan-400/20 rounded-full blur-2xl animate-pulse"></div>

          {/* Earth Body Container */}
          <div className="relative w-48 h-48 sm:w-56 sm:h-56 rounded-full bg-gradient-to-tr from-blue-950 via-cyan-900 to-indigo-900 border border-cyan-400/40 shadow-[0_0_60px_rgba(6,182,212,0.4)] flex items-center justify-center p-2 group hover:scale-105 transition-all duration-700">

            {/* Atmosphere Halo Ring */}
            <div className="absolute inset-0 rounded-full border-2 border-cyan-300/30 shadow-[inset_0_0_30px_rgba(34,211,238,0.5)]"></div>

            {/* Orbital Rings */}
            <div className="absolute w-[140%] h-[40%] border-t border-b border-cyan-400/40 rounded-[50%] -rotate-12 animate-pulse pointer-events-none"></div>
            <div className="absolute w-[130%] h-[35%] border-l border-r border-purple-400/30 rounded-[50%] rotate-45 pointer-events-none"></div>

            {/* Continental SVG Landmass Overlay Effect */}
            <div className="absolute inset-2 rounded-full overflow-hidden opacity-80 mix-blend-screen pointer-events-none">
              <svg className="w-full h-full text-cyan-300/40 animate-spin-slow" viewBox="0 0 100 100" fill="currentColor">
                <path d="M20,30 Q30,10 50,25 T80,30 Q90,50 70,70 T30,80 Q10,60 20,30 Z" />
                <circle cx="35" cy="40" r="12" />
                <circle cx="65" cy="60" r="18" />
                <circle cx="50" cy="75" r="8" />
              </svg>
            </div>

            {/* Planet Core Icon */}
            <div className="relative z-10 text-center space-y-1">
              <Globe className="w-12 h-12 mx-auto text-cyan-300 animate-pulse" />
              <span className="block font-orbitron font-black text-xs text-white tracking-widest uppercase">
                EARTH // IMUIA ORBIT
              </span>
              <span className="block text-[9px] font-mono text-cyan-400 uppercase tracking-wider">
                100% ONLINE NETWORK
              </span>
            </div>

            {/* Satellite Ping Nodes */}
            <div className="absolute top-2 right-6 w-3 h-3 bg-cyan-400 rounded-full animate-ping"></div>
            <div className="absolute bottom-4 left-6 w-2.5 h-2.5 bg-purple-400 rounded-full"></div>
          </div>
        </div>

        {/* Section Heading & Copy */}
        <div className="space-y-4 max-w-3xl mx-auto">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black font-orbitron uppercase text-white tracking-tight leading-tight">
            Vous avez une idée à mettre en orbite ?
          </h2>
          <p className="text-base sm:text-lg text-gray-300 leading-relaxed font-light">
            Projet innovant, partenariat, investissement ou proposition de collaboration : entrez en contact avec l’équipage IMUIA.
          </p>
        </div>

        {/* The 4 Call To Action Buttons */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-2 max-w-4xl mx-auto">
          {/* Button 1: Présenter mon projet */}
          <button
            onClick={() => handleAction('Creator')}
            onMouseEnter={() => playSound('hover')}
            className="flex items-center justify-center space-x-2 px-5 py-4 bg-purple-600/90 hover:bg-purple-500 text-white font-orbitron font-bold text-xs tracking-wider uppercase rounded-2xl transition-all duration-300 shadow-[0_0_20px_rgba(168,85,247,0.3)] hover:shadow-[0_0_30px_rgba(168,85,247,0.6)] cursor-none hover:-translate-y-1 border border-purple-400/30"
          >
            <Rocket className="w-4 h-4 text-purple-200" />
            <span>Présenter mon projet</span>
          </button>

          {/* Button 2: Devenir partenaire */}
          <button
            onClick={() => handleAction('Operator')}
            onMouseEnter={() => playSound('hover')}
            className="flex items-center justify-center space-x-2 px-5 py-4 bg-cyan-600/90 hover:bg-cyan-500 text-white font-orbitron font-bold text-xs tracking-wider uppercase rounded-2xl transition-all duration-300 shadow-[0_0_20px_rgba(6,182,212,0.3)] hover:shadow-[0_0_30px_rgba(6,182,212,0.6)] cursor-none hover:-translate-y-1 border border-cyan-400/30"
          >
            <Handshake className="w-4 h-4 text-cyan-200" />
            <span>Devenir partenaire</span>
          </button>

          {/* Button 3: Investir dans un univers */}
          <button
            onClick={() => handleAction('Investor')}
            onMouseEnter={() => playSound('hover')}
            className="flex items-center justify-center space-x-2 px-5 py-4 bg-emerald-600/90 hover:bg-emerald-500 text-white font-orbitron font-bold text-xs tracking-wider uppercase rounded-2xl transition-all duration-300 shadow-[0_0_20px_rgba(16,185,129,0.3)] hover:shadow-[0_0_30px_rgba(16,185,129,0.6)] cursor-none hover:-translate-y-1 border border-emerald-400/30"
          >
            <TrendingUp className="w-4 h-4 text-emerald-200" />
            <span>Investir dans un univers</span>
          </button>

          {/* Button 4: Contacter IMUIA */}
          <button
            onClick={() => handleAction()}
            onMouseEnter={() => playSound('hover')}
            className="flex items-center justify-center space-x-2 px-5 py-4 bg-white/10 hover:bg-white/20 text-white font-orbitron font-bold text-xs tracking-wider uppercase rounded-2xl transition-all duration-300 border border-white/20 hover:border-purple-400 cursor-none hover:-translate-y-1"
          >
            <Mail className="w-4 h-4 text-gray-300" />
            <span>Contacter IMUIA</span>
          </button>
        </div>

      </div>
    </section>
  );
};
