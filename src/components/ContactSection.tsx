import React from 'react';
import { useAppState } from '../data/useAppState';
import { translations } from '../data/translations';
import { Globe, Send, UserCheck, TrendingUp, Mail } from 'lucide-react';

export const ContactSection: React.FC = () => {
  const { language, setActiveSection, playSound } = useAppState();
  const t = translations[language];

  const handleCTA = (partnerTypeIntent?: string) => {
    if (partnerTypeIntent) {
      sessionStorage.setItem('imuia_intent', partnerTypeIntent);
    }
    setActiveSection('partners');
    playSound('space');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <section className="relative py-20 px-4 overflow-hidden my-12 border-t border-b border-white/10 glass-panel rounded-3xl">
      {/* Background space atmosphere glows */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-cyan-600/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-0 right-10 w-[400px] h-[400px] bg-purple-600/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-5xl mx-auto text-center relative z-10 space-y-10">

        {/* 3D-styled Planet Earth / IMUIA Orb seen from Space */}
        <div className="relative flex justify-center">
          <div className="relative w-52 h-52 md:w-64 md:h-64 rounded-full bg-gradient-to-tr from-blue-950 via-indigo-900 to-cyan-500 p-1 shadow-[0_0_80px_rgba(34,211,238,0.35)] flex items-center justify-center transition-transform duration-700 hover:scale-105">
            {/* Earth Blue Atmospheric Glow Ring */}
            <div className="absolute -inset-2 rounded-full border border-cyan-400/30 animate-pulse"></div>

            {/* Simulated Continents Grid Overlay */}
            <div className="absolute inset-0 rounded-full overflow-hidden opacity-40 mix-blend-screen bg-[radial-gradient(#22d3ee_1px,transparent_1px)] [background-size:16px_16px]"></div>

            {/* Orbiting Satellites / Nodes Ring */}
            <div className="absolute w-[120%] h-[35%] border-t-2 border-b-2 border-cyan-300/40 rounded-[50%] -rotate-12 animate-orbit pointer-events-none"></div>
            <div className="absolute w-[120%] h-[35%] border-l-2 border-r-2 border-purple-400/30 rounded-[50%] rotate-45 animate-orbit-reverse pointer-events-none"></div>

            {/* Planet Core Center Badge */}
            <div className="relative z-10 text-center space-y-1">
              <Globe className="w-12 h-12 text-cyan-300 mx-auto animate-spin-slow" />
              <span className="block font-orbitron font-black text-white tracking-widest text-lg uppercase glow-text-cyan">
                EARTH HUB
              </span>
              <span className="block text-[8px] font-mono text-cyan-200 uppercase tracking-widest">
                IMUIA ORBITAL RELAY
              </span>
            </div>
          </div>
        </div>

        {/* Heading & Intro Text exact to prompt */}
        <div className="space-y-4 max-w-2xl mx-auto">
          <h2 className="text-2xl md:text-4xl font-black font-orbitron text-white uppercase tracking-tight leading-snug">
            {language === 'fr' ? 'Vous avez une idée à mettre en orbite ?' : 'Have an idea to put into orbit?'}
          </h2>
          <p className="text-sm md:text-base text-gray-300 leading-relaxed font-light">
            {language === 'fr'
              ? 'Projet innovant, partenariat, investissement ou proposition de collaboration : entrez en contact avec l’équipage IMUIA.'
              : 'Innovative project, partnership, investment, or collaboration proposal: get in touch with the IMUIA flight crew.'}
          </p>
        </div>

        {/* 4 Action Buttons as requested by prompt */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-4xl mx-auto">
          <button
            onClick={() => handleCTA('Creator')}
            onMouseEnter={() => playSound('hover')}
            className="flex items-center justify-center space-x-2 px-5 py-3.5 bg-purple-600 hover:bg-purple-500 text-white font-orbitron font-bold text-xs uppercase tracking-wider rounded-2xl transition-all duration-300 shadow-[0_0_20px_rgba(168,85,247,0.3)] hover:shadow-[0_0_30px_rgba(168,85,247,0.5)] cursor-none"
          >
            <Send className="w-4 h-4" />
            <span>{t.presentProject}</span>
          </button>

          <button
            onClick={() => handleCTA('Operator')}
            onMouseEnter={() => playSound('hover')}
            className="flex items-center justify-center space-x-2 px-5 py-3.5 bg-white/5 hover:bg-purple-500/10 text-white hover:text-purple-300 font-orbitron font-bold text-xs uppercase tracking-wider rounded-2xl border border-white/10 hover:border-purple-500/50 transition-all duration-300 cursor-none"
          >
            <UserCheck className="w-4 h-4" />
            <span>{t.becomePartner}</span>
          </button>

          <button
            onClick={() => handleCTA('Investor')}
            onMouseEnter={() => playSound('hover')}
            className="flex items-center justify-center space-x-2 px-5 py-3.5 bg-white/5 hover:bg-purple-500/10 text-white hover:text-purple-300 font-orbitron font-bold text-xs uppercase tracking-wider rounded-2xl border border-white/10 hover:border-purple-500/50 transition-all duration-300 cursor-none"
          >
            <TrendingUp className="w-4 h-4" />
            <span>{t.investUniverse}</span>
          </button>

          <button
            onClick={() => handleCTA()}
            onMouseEnter={() => playSound('hover')}
            className="flex items-center justify-center space-x-2 px-5 py-3.5 bg-white/5 hover:bg-purple-500/10 text-white hover:text-purple-300 font-orbitron font-bold text-xs uppercase tracking-wider rounded-2xl border border-white/10 hover:border-purple-500/50 transition-all duration-300 cursor-none"
          >
            <Mail className="w-4 h-4" />
            <span>{t.contactUs}</span>
          </button>
        </div>

      </div>
    </section>
  );
};
