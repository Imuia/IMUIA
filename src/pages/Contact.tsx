import React from 'react';
import { useAppState } from '../data/AppState';
import { Globe, ArrowRight, Sparkles, MessageSquare, Briefcase, Handshake, Compass } from 'lucide-react';

export const Contact: React.FC = () => {
  const { language, playSound, setActiveSection } = useAppState();

  const handleAction = (type: 'project' | 'partner' | 'invest' | 'general') => {
    playSound('space');
    // We navigate to the Partnership Center
    setActiveSection('partners');

    // Smooth scroll to top of partners section if already there
    window.scrollTo({ top: 0, behavior: 'smooth' });

    // Since partners uses local state, it will render fresh, but we can also use localStorage or query-like parameters
    // if needed to pass information or let state handlers prefill it dynamically.
    // Let's store a hint in sessionStorage so the Partners page can read and prefill if desired!
    sessionStorage.setItem('imuia_partner_intent', type);
  };

  return (
    <div className="relative min-h-[calc(100vh-80px)] py-12 px-4 flex flex-col items-center justify-center overflow-hidden">
      {/* Space elements */}
      <div className="absolute inset-0 stars-bg opacity-30 pointer-events-none"></div>
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full nebula-purple blur-3xl pointer-events-none opacity-40"></div>
      <div className="absolute bottom-1/4 left-1/3 w-[400px] h-[400px] rounded-full nebula-cyan blur-3xl pointer-events-none opacity-30"></div>

      <div className="max-w-4xl mx-auto text-center z-10 space-y-12">
        {/* Spectacular Earth/IMUIA Planet viewed from Space */}
        <div className="relative flex justify-center">
          <div className="absolute inset-0 m-auto w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl animate-pulse"></div>

          {/* Earth/Planet Orb sphere */}
          <div className="relative w-56 h-56 rounded-full border border-cyan-400/30 flex items-center justify-center bg-gradient-to-tr from-[#020617] via-[#0f172a] to-[#1e1b4b] overflow-hidden shadow-[0_0_60px_rgba(34,211,238,0.25)] hover:shadow-[0_0_80px_rgba(168,85,247,0.35)] transition-shadow duration-500 hover:scale-105 transition-transform duration-500">
            {/* Dynamic atmosphere glow */}
            <div className="absolute inset-0 bg-radial-gradient(at_top_left,_var(--tw-gradient-stops)) from-cyan-400/20 via-transparent to-purple-900/40 rounded-full"></div>

            {/* Curved continent shapes overlaying the sphere */}
            <div className="absolute w-full h-full opacity-40 animate-orbit flex items-center justify-center">
              <svg className="w-48 h-48 text-cyan-400/40 fill-none stroke-current" strokeWidth="1" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                {/* Abstract continent vectors */}
                <path d="M15 45 Q 25 35 35 50 T 55 40 T 75 55 T 90 40" />
                <path d="M10 25 Q 30 15 40 30 T 70 20 T 85 30" />
                <path d="M20 70 Q 35 60 50 75 T 80 65 T 95 80" />
              </svg>
            </div>

            {/* Glowing orbital ring */}
            <div className="absolute w-72 h-20 border-t border-b border-cyan-400/40 rounded-[50%] rotate-[-25deg] animate-pulse pointer-events-none"></div>
            <div className="absolute w-72 h-20 border-l border-r border-purple-500/25 rounded-[50%] rotate-[40deg] animate-pulse pointer-events-none"></div>

            {/* Center telemetry hub indicator */}
            <div className="text-center z-10 space-y-1">
              <Globe className="w-12 h-12 text-cyan-400 mx-auto animate-spin-slow opacity-90" />
              <span className="block font-orbitron font-bold text-[9px] tracking-widest text-cyan-400 uppercase">
                EARTH NODE-01
              </span>
            </div>

            {/* Live blinking communication signals */}
            <div className="absolute top-1/4 right-1/4 w-2 h-2 bg-pink-500 rounded-full animate-ping"></div>
            <div className="absolute bottom-1/3 left-1/5 w-1.5 h-1.5 bg-green-400 rounded-full"></div>
          </div>
        </div>

        {/* Headings aligned exactly with prompt requirements */}
        <div className="space-y-4">
          <h2 className="text-xs font-orbitron font-bold text-cyan-400 tracking-widest uppercase flex items-center justify-center space-x-2">
            <Sparkles className="w-4 h-4 animate-pulse" />
            <span>{language === 'fr' ? 'ENTRER EN ORBITE' : 'ENTER ORBIT'}</span>
          </h2>
          <h1 className="text-3xl md:text-5xl font-black font-orbitron text-white tracking-tight uppercase">
            {language === 'fr' ? 'Vous avez une idée à mettre en orbite ?' : 'Have an idea to launch into orbit?'}
          </h1>
          <p className="text-sm md:text-base text-gray-300 max-w-2xl mx-auto leading-relaxed font-light">
            {language === 'fr'
              ? 'Projet innovant, partenariat, investissement ou proposition de collaboration : entrez en contact avec l’équipage IMUIA.'
              : 'Innovative project, partnership, investment, or collaboration proposal: get in touch with the IMUIA flight crew.'}
          </p>
        </div>

        {/* Dynamic Buttons Matrix Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl mx-auto pt-4">
          <button
            onClick={() => handleAction('project')}
            onMouseEnter={() => playSound('hover')}
            className="flex items-center justify-between p-5 bg-purple-600 hover:bg-purple-500 text-white font-orbitron font-bold text-xs tracking-widest uppercase rounded-2xl transition-all duration-300 shadow-[0_0_20px_rgba(168,85,247,0.3)] hover:shadow-[0_0_30px_rgba(168,85,247,0.5)] cursor-none hover:translate-y-[-2px] text-left group"
          >
            <div className="flex items-center space-x-3">
              <Compass className="w-5 h-5 text-cyan-300" />
              <span>{language === 'fr' ? 'Présenter mon projet' : 'Present My Project'}</span>
            </div>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
          </button>

          <button
            onClick={() => handleAction('partner')}
            onMouseEnter={() => playSound('hover')}
            className="flex items-center justify-between p-5 bg-white/5 hover:bg-purple-500/10 text-white hover:text-purple-300 font-orbitron font-bold text-xs tracking-widest uppercase rounded-2xl border border-white/10 hover:border-purple-500/50 transition-all duration-300 cursor-none hover:translate-y-[-2px] text-left group"
          >
            <div className="flex items-center space-x-3">
              <Handshake className="w-5 h-5 text-purple-400" />
              <span>{language === 'fr' ? 'Devenir partenaire' : 'Become a Partner'}</span>
            </div>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
          </button>

          <button
            onClick={() => handleAction('invest')}
            onMouseEnter={() => playSound('hover')}
            className="flex items-center justify-between p-5 bg-white/5 hover:bg-purple-500/10 text-white hover:text-purple-300 font-orbitron font-bold text-xs tracking-widest uppercase rounded-2xl border border-white/10 hover:border-purple-500/50 transition-all duration-300 cursor-none hover:translate-y-[-2px] text-left group"
          >
            <div className="flex items-center space-x-3">
              <Briefcase className="w-5 h-5 text-pink-400" />
              <span>{language === 'fr' ? 'Investir dans un univers' : 'Invest in a Universe'}</span>
            </div>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
          </button>

          <button
            onClick={() => handleAction('general')}
            onMouseEnter={() => playSound('hover')}
            className="flex items-center justify-between p-5 bg-white/5 hover:bg-purple-500/10 text-white hover:text-purple-300 font-orbitron font-bold text-xs tracking-widest uppercase rounded-2xl border border-white/10 hover:border-purple-500/50 transition-all duration-300 cursor-none hover:translate-y-[-2px] text-left group"
          >
            <div className="flex items-center space-x-3">
              <MessageSquare className="w-5 h-5 text-green-400" />
              <span>{language === 'fr' ? 'Contacter IMUIA' : 'Contact IMUIA'}</span>
            </div>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
          </button>
        </div>

        {/* Digital Telemetries info panel */}
        <div className="pt-8 border-t border-white/5 text-[10px] font-mono text-gray-500 flex flex-wrap justify-center gap-6">
          <span>// CREW STATUS: ON STANDBY</span>
          <span>// LATENCY: 24MS</span>
          <span>// FREQUENCY: 8.4 GHZ</span>
        </div>
      </div>
    </div>
  );
};
