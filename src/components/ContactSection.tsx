import React from 'react';
import { useAppState } from '../data/useAppState';
import { translations } from '../data/translations';
import { Globe, Rocket, UserCheck, TrendingUp, Mail } from 'lucide-react';

export const ContactSection: React.FC = () => {
  const { language, setActiveSection, playSound } = useAppState();
  const t = translations[language];

  const handleIntent = (partnerType: string) => {
    try {
      sessionStorage.setItem('imuia_partner_intent', partnerType);
    } catch {
      // ignore quota / private mode errors
    }
    playSound('space');
    setActiveSection('partners');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <section className="relative py-16 px-4 max-w-6xl mx-auto my-12 glass-panel rounded-3xl border border-purple-500/30 overflow-hidden text-center z-10">
      {/* Deep space nebula backgrounds */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-purple-600/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-0 right-10 w-[400px] h-[200px] bg-cyan-500/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="relative z-10 space-y-8">

        {/* 3D-styled Earth Planet Vista Sphere */}
        <div className="relative flex justify-center items-center py-4">
          <div className="relative w-48 h-48 sm:w-56 sm:h-56 rounded-full bg-gradient-to-tr from-blue-950 via-indigo-900 to-cyan-700 p-1 shadow-[0_0_60px_rgba(34,211,238,0.3)] hover:scale-105 transition-transform duration-700 flex items-center justify-center border border-cyan-400/40">

            {/* Atmospheric Glow Halo */}
            <div className="absolute -inset-2 rounded-full border border-cyan-400/20 bg-cyan-400/5 blur-md animate-pulse"></div>

            {/* Orbital Rings */}
            <div className="absolute w-64 h-20 border-t-2 border-b-2 border-purple-400/40 rounded-[50%] rotate-12 animate-orbit"></div>
            <div className="absolute w-64 h-20 border-l border-r border-cyan-300/30 rounded-[50%] -rotate-45 animate-orbit-reverse"></div>

            {/* SVG Globe Continents Simulation Overlay */}
            <svg viewBox="0 0 100 100" className="w-full h-full rounded-full opacity-80 mix-blend-screen pointer-events-none animate-pulse">
              {/* Latitude Lines */}
              <ellipse cx="50" cy="50" rx="45" ry="15" fill="none" stroke="rgba(56, 189, 248, 0.3)" strokeWidth="0.5" />
              <ellipse cx="50" cy="50" rx="45" ry="30" fill="none" stroke="rgba(56, 189, 248, 0.3)" strokeWidth="0.5" />
              <line x1="50" y1="5" x2="50" y2="95" stroke="rgba(56, 189, 248, 0.3)" strokeWidth="0.5" />

              {/* Stylized Continent Outlines */}
              <path d="M 25,35 Q 35,25 45,30 T 55,40 T 40,55 Z" fill="rgba(168, 85, 247, 0.3)" stroke="rgba(192, 132, 252, 0.6)" strokeWidth="0.5" />
              <path d="M 60,20 Q 75,15 80,30 T 70,45 Z" fill="rgba(56, 189, 248, 0.3)" stroke="rgba(125, 211, 252, 0.6)" strokeWidth="0.5" />
              <path d="M 45,60 Q 60,65 55,80 T 35,75 Z" fill="rgba(168, 85, 247, 0.3)" stroke="rgba(192, 132, 252, 0.6)" strokeWidth="0.5" />
            </svg>

            {/* Core Label */}
            <div className="absolute z-10 text-center select-none">
              <span className="block font-orbitron font-black text-xl tracking-widest text-white glow-text-cyan">
                EARTH / IMUIA
              </span>
              <span className="block text-[8px] font-mono tracking-wider uppercase text-cyan-300">
                ORBITAL TRANSMISSION NODE
              </span>
            </div>

            {/* Glowing satellite indicators */}
            <div className="absolute top-2 right-4 w-3 h-3 bg-cyan-400 rounded-full animate-ping"></div>
            <div className="absolute bottom-3 left-6 w-2.5 h-2.5 bg-purple-400 rounded-full"></div>
          </div>
        </div>

        {/* Header & Description */}
        <div className="space-y-3 max-w-2xl mx-auto">
          <h2 className="text-xs font-orbitron font-bold text-cyan-400 tracking-widest uppercase flex items-center justify-center space-x-2">
            <Globe className="w-4 h-4 animate-spin-slow" />
            <span>Station de Contact Global</span>
          </h2>
          <h2 className="text-2xl md:text-4xl font-black font-orbitron uppercase text-white leading-tight">
            Vous avez une idée à mettre en orbite ?
          </h2>
          <p className="text-sm md:text-base text-gray-300 font-light leading-relaxed">
            « Projet innovant, partenariat, investissement ou proposition de collaboration : entrez en contact avec l'équipage IMUIA. »
          </p>
        </div>

        {/* 4 Interactive Call-To-Action Buttons */}
        <div className="flex flex-wrap justify-center gap-4 pt-4 max-w-4xl mx-auto">

          {/* Présenter mon projet */}
          <button
            onClick={() => handleIntent('Developer')}
            onMouseEnter={() => playSound('hover')}
            className="flex items-center space-x-2.5 px-6 py-3.5 bg-purple-600 hover:bg-purple-500 text-white font-orbitron font-bold text-xs tracking-widest uppercase rounded-full transition-all duration-300 shadow-[0_0_20px_rgba(168,85,247,0.4)] hover:shadow-[0_0_30px_rgba(168,85,247,0.6)] cursor-none hover:-translate-y-0.5"
          >
            <Rocket className="w-4 h-4" />
            <span>{t.presentProject}</span>
          </button>

          {/* Devenir partenaire */}
          <button
            onClick={() => handleIntent('Operator')}
            onMouseEnter={() => playSound('hover')}
            className="flex items-center space-x-2.5 px-6 py-3.5 bg-white/5 hover:bg-purple-500/10 text-white hover:text-purple-300 font-orbitron font-bold text-xs tracking-widest uppercase rounded-full border border-white/10 hover:border-purple-500/50 transition-all duration-300 cursor-none hover:-translate-y-0.5"
          >
            <UserCheck className="w-4 h-4" />
            <span>{t.becomePartner}</span>
          </button>

          {/* Investir dans un univers */}
          <button
            onClick={() => handleIntent('Investor')}
            onMouseEnter={() => playSound('hover')}
            className="flex items-center space-x-2.5 px-6 py-3.5 bg-white/5 hover:bg-purple-500/10 text-white hover:text-purple-300 font-orbitron font-bold text-xs tracking-widest uppercase rounded-full border border-white/10 hover:border-purple-500/50 transition-all duration-300 cursor-none hover:-translate-y-0.5"
          >
            <TrendingUp className="w-4 h-4" />
            <span>{t.investUniverse}</span>
          </button>

          {/* Contacter IMUIA */}
          <button
            onClick={() => handleIntent('Other')}
            onMouseEnter={() => playSound('hover')}
            className="flex items-center space-x-2.5 px-6 py-3.5 bg-cyan-600/20 hover:bg-cyan-600 text-cyan-300 hover:text-white font-orbitron font-bold text-xs tracking-widest uppercase rounded-full border border-cyan-500/40 transition-all duration-300 cursor-none hover:-translate-y-0.5"
          >
            <Mail className="w-4 h-4" />
            <span>{t.contactUs}</span>
          </button>

        </div>

      </div>
    </section>
  );
};
