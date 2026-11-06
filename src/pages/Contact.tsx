import React from 'react';
import { useAppState } from '../data/useAppState';
import { translations } from '../data/translations';
import { Globe, Rocket, Handshake, TrendingUp, Mail, ArrowRight } from 'lucide-react';

export const Contact: React.FC = () => {
  const { language, playSound, setActiveSection } = useAppState();
  const t = translations[language];

  const handleAction = (intent: string) => {
    playSound('space');
    sessionStorage.setItem('imuia_partner_intent', intent);
    setActiveSection('partners');
  };

  return (
    <div className="relative min-h-[calc(100vh-80px)] py-12 px-4 flex flex-col items-center justify-center space-y-12 text-center overflow-hidden">
      {/* Background stars layer */}
      <div className="absolute inset-0 stars-bg opacity-30 pointer-events-none"></div>

      {/* Earth seen from space visual representation */}
      <div className="relative flex justify-center items-center my-6">
        {/* Atmospheric Blue & Turquoise Glows */}
        <div className="absolute w-72 h-72 md:w-96 md:h-96 rounded-full bg-cyan-500/20 blur-3xl pointer-events-none animate-pulse"></div>
        <div className="absolute w-80 h-80 md:w-[420px] md:h-[420px] rounded-full bg-blue-600/15 blur-3xl pointer-events-none"></div>

        {/* 3D Stylized Planet Earth Sphere */}
        <div className="relative w-48 h-48 md:w-64 md:h-64 rounded-full bg-gradient-to-tr from-slate-950 via-blue-950 to-cyan-900 border border-cyan-400/30 shadow-[0_0_60px_rgba(34,211,238,0.25)] flex items-center justify-center overflow-hidden">
          {/* Rotating cloud / continental silhouette layers */}
          <div className="absolute inset-0 rounded-full border border-cyan-400/20 animate-spin-slow"></div>
          <div className="absolute inset-2 rounded-full border border-dashed border-blue-400/20 animate-orbit"></div>

          {/* Continents custom SVG overlay */}
          <svg viewBox="0 0 100 100" className="absolute inset-0 w-full h-full opacity-40 mix-blend-screen animate-pulse pointer-events-none">
            <path d="M 20,35 Q 35,25 45,35 T 60,50 T 40,75 Z" fill="#22d3ee" opacity="0.3" />
            <path d="M 65,20 Q 80,30 75,45 T 70,60 Z" fill="#3b82f6" opacity="0.3" />
            <circle cx="50" cy="50" r="48" fill="none" stroke="#22d3ee" strokeWidth="0.5" strokeDasharray="2,2" />
          </svg>

          {/* Planet center coordinate label */}
          <div className="relative z-10 text-center">
            <Globe className="w-12 h-12 md:w-16 md:h-16 text-cyan-300 mx-auto drop-shadow-[0_0_15px_rgba(34,211,238,0.8)] animate-pulse" />
            <span className="block font-orbitron font-bold text-[10px] md:text-xs text-cyan-200 tracking-widest uppercase mt-2">
              TERRE &middot; ORBITE IMUIA
            </span>
          </div>

          {/* Orbital Satellite Node */}
          <div className="absolute -top-1 left-1/4 w-2.5 h-2.5 bg-cyan-300 rounded-full shadow-[0_0_10px_#22d3ee] animate-ping"></div>
        </div>
      </div>

      {/* Headings & Text */}
      <div className="max-w-3xl mx-auto space-y-4 relative z-10">
        <h2 className="text-xs font-orbitron font-bold text-cyan-400 tracking-widest uppercase flex items-center justify-center space-x-2">
          <span>// TRANSMISSION VERS LA TERRE</span>
        </h2>
        <h1 className="text-3xl md:text-5xl font-black font-orbitron uppercase text-white leading-tight">
          {language === 'fr' ? 'Vous avez une idée à mettre en orbite ?' : 'Have an idea to launch into orbit?'}
        </h1>
        <p className="text-base md:text-lg text-gray-300 max-w-2xl mx-auto leading-relaxed font-light">
          {language === 'fr'
            ? 'Projet innovant, partenariat, investissement ou proposition de collaboration : entrez en contact avec l’équipage IMUIA.'
            : 'Innovative project, partnership, investment, or collaboration proposal: get in touch with the IMUIA flight crew.'}
        </p>
      </div>

      {/* The 4 Main Action Buttons */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-5xl mx-auto w-full relative z-10 pt-4">
        <button
          onClick={() => handleAction('present-project')}
          onMouseEnter={() => playSound('hover')}
          className="flex flex-col items-center p-6 rounded-2xl glass-panel border border-white/10 hover:border-purple-500/50 hover:bg-purple-950/20 text-white transition-all duration-300 cursor-none group hover:translate-y-[-2px] shadow-lg shadow-purple-950/30"
        >
          <div className="p-3 rounded-xl bg-purple-500/10 text-purple-400 group-hover:scale-110 transition-transform mb-3">
            <Rocket className="w-6 h-6" />
          </div>
          <span className="font-orbitron font-bold text-sm uppercase tracking-wide group-hover:text-purple-300">
            {t.presentProject}
          </span>
          <span className="text-[11px] text-gray-400 mt-2 flex items-center space-x-1">
            <span>Soumettre un concept</span>
            <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
          </span>
        </button>

        <button
          onClick={() => handleAction('become-partner')}
          onMouseEnter={() => playSound('hover')}
          className="flex flex-col items-center p-6 rounded-2xl glass-panel border border-white/10 hover:border-cyan-500/50 hover:bg-cyan-950/20 text-white transition-all duration-300 cursor-none group hover:translate-y-[-2px] shadow-lg shadow-cyan-950/30"
        >
          <div className="p-3 rounded-xl bg-cyan-500/10 text-cyan-400 group-hover:scale-110 transition-transform mb-3">
            <Handshake className="w-6 h-6" />
          </div>
          <span className="font-orbitron font-bold text-sm uppercase tracking-wide group-hover:text-cyan-300">
            {t.becomePartner}
          </span>
          <span className="text-[11px] text-gray-400 mt-2 flex items-center space-x-1">
            <span>Opérateur & Prestataire</span>
            <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
          </span>
        </button>

        <button
          onClick={() => handleAction('invest')}
          onMouseEnter={() => playSound('hover')}
          className="flex flex-col items-center p-6 rounded-2xl glass-panel border border-white/10 hover:border-pink-500/50 hover:bg-pink-950/20 text-white transition-all duration-300 cursor-none group hover:translate-y-[-2px] shadow-lg shadow-pink-950/30"
        >
          <div className="p-3 rounded-xl bg-pink-500/10 text-pink-400 group-hover:scale-110 transition-transform mb-3">
            <TrendingUp className="w-6 h-6" />
          </div>
          <span className="font-orbitron font-bold text-sm uppercase tracking-wide group-hover:text-pink-300">
            {t.investUniverse}
          </span>
          <span className="text-[11px] text-gray-400 mt-2 flex items-center space-x-1">
            <span>Venture & Co-financement</span>
            <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
          </span>
        </button>

        <button
          onClick={() => handleAction('contact-general')}
          onMouseEnter={() => playSound('hover')}
          className="flex flex-col items-center p-6 rounded-2xl glass-panel border border-white/10 hover:border-green-500/50 hover:bg-green-950/20 text-white transition-all duration-300 cursor-none group hover:translate-y-[-2px] shadow-lg shadow-green-950/30"
        >
          <div className="p-3 rounded-xl bg-green-500/10 text-green-400 group-hover:scale-110 transition-transform mb-3">
            <Mail className="w-6 h-6" />
          </div>
          <span className="font-orbitron font-bold text-sm uppercase tracking-wide group-hover:text-green-300">
            {t.contactUs}
          </span>
          <span className="text-[11px] text-gray-400 mt-2 flex items-center space-x-1">
            <span>Équipage IMUIA</span>
            <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
          </span>
        </button>
      </div>

      {/* Direct Contact Coordinates Bar */}
      <div className="pt-8 border-t border-white/5 max-w-4xl mx-auto w-full grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs font-mono text-gray-400 relative z-10">
        <div className="glass-panel p-3 rounded-xl">
          <span className="text-gray-500 uppercase block text-[10px]">E-mail équipage</span>
          <span className="text-white font-bold">contact@imuia.com</span>
        </div>
        <div className="glass-panel p-3 rounded-xl">
          <span className="text-gray-500 uppercase block text-[10px]">Coordination Centrale</span>
          <span className="text-cyan-400 font-bold">Paris &middot; Cannes &middot; Nosy Be</span>
        </div>
        <div className="glass-panel p-3 rounded-xl">
          <span className="text-gray-500 uppercase block text-[10px]">Temps de réponse moyen</span>
          <span className="text-green-400 font-bold">&lt; 48 heures ouvrées</span>
        </div>
      </div>
    </div>
  );
};
