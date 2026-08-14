import React from 'react';
import { useAppState } from '../data/AppState';
import { translations } from '../data/translations';
import { ArrowRight, Sparkles, Award } from 'lucide-react';

export const Contact: React.FC = () => {
  const { language, playSound, setActiveSection } = useAppState();
  const t = translations[language];

  const handleContactAction = (intentType: 'project' | 'partner' | 'invest' | 'contact') => {
    playSound('space');
    // Store intent in sessionStorage
    sessionStorage.setItem('imuia_contact_intent', intentType);
    // Redirect to partners section which contains the pre-fillable form
    setActiveSection('partners');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="relative min-h-[calc(100vh-80px)] py-12 px-4 flex flex-col justify-center items-center overflow-hidden">
      {/* Space Environment Background */}
      <div className="absolute inset-0 stars-bg opacity-30 pointer-events-none"></div>

      {/* Pulsing deep-space glows representing the atmosphere */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-blue-900/10 blur-3xl pointer-events-none"></div>
      <div className="absolute top-1/3 left-1/3 w-[450px] h-[450px] rounded-full bg-indigo-900/10 blur-3xl pointer-events-none"></div>

      <div className="max-w-5xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10">

        {/* Visual interactive section representing the Earth/Planet viewed from space (Left column) */}
        <div className="flex flex-col items-center justify-center space-y-6">
          <div className="relative w-72 h-72 sm:w-96 sm:h-96 flex items-center justify-center">

            {/* Outer holographic telemetry lines */}
            <div className="absolute inset-0 rounded-full border border-dashed border-cyan-500/10 animate-orbit"></div>
            <div className="absolute -inset-8 rounded-full border border-white/5 animate-orbit-reverse"></div>
            <div className="absolute -inset-16 rounded-full border border-dashed border-purple-500/5 animate-pulse"></div>

            {/* Holographic orbital rings */}
            <div className="absolute w-[115%] h-[40%] border-t border-b border-cyan-400/20 rounded-[50%] rotate-12 pointer-events-none animate-pulse"></div>
            <div className="absolute w-[115%] h-[40%] border-l border-r border-purple-500/10 rounded-[50%] -rotate-45 pointer-events-none"></div>

            {/* Glowing Planet sphere with SVG details */}
            <div className="relative w-64 h-64 sm:w-80 sm:h-80 rounded-full bg-gradient-to-tr from-slate-950 via-blue-950 to-indigo-900 border border-blue-500/30 overflow-hidden shadow-[0_0_80px_rgba(59,130,246,0.35)] hover:shadow-[0_0_100px_rgba(168,85,247,0.45)] transition-shadow duration-700 flex items-center justify-center group">

              {/* Planetary atmosphere glow layers */}
              <div className="absolute inset-0 bg-radial-gradient-to-tr from-transparent via-cyan-900/20 to-purple-950/40 pointer-events-none"></div>

              {/* Detailed SVG representing glowing continents/networks */}
              <svg className="absolute w-full h-full opacity-60 group-hover:scale-105 transition-transform duration-700" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
                {/* Simulated continents layout */}
                <path d="M40,70 Q55,40 85,55 T130,80 T160,110 T120,150 T60,140 Z" fill="rgba(6, 182, 212, 0.15)" stroke="rgba(34, 211, 238, 0.4)" strokeWidth="1" strokeDasharray="3,3" />
                <path d="M110,30 Q140,25 150,45 T170,80 T140,90 Z" fill="rgba(168, 85, 247, 0.1)" stroke="rgba(168, 85, 247, 0.3)" strokeWidth="1" />
                <path d="M25,110 Q10,130 35,165 T65,150 T45,120 Z" fill="rgba(59, 130, 246, 0.15)" stroke="rgba(59, 130, 246, 0.4)" strokeWidth="1" />

                {/* Connection Nodes and lines representing digital ecosystem satellites */}
                <circle cx="65" cy="55" r="3" fill="#22d3ee" className="animate-ping" />
                <circle cx="65" cy="55" r="2" fill="#22d3ee" />

                <circle cx="140" cy="80" r="3" fill="#a855f7" />
                <circle cx="110" cy="130" r="3" fill="#3b82f6" />
                <circle cx="40" cy="120" r="2.5" fill="#10b981" />

                {/* Orbital lines linking nodes */}
                <line x1="65" y1="55" x2="140" y2="80" stroke="rgba(255, 255, 255, 0.15)" strokeWidth="1" strokeDasharray="4,4" />
                <line x1="140" y1="80" x2="110" y2="130" stroke="rgba(255, 255, 255, 0.15)" strokeWidth="1" />
                <line x1="110" y1="130" x2="40" y2="120" stroke="rgba(255, 255, 255, 0.15)" strokeWidth="1" strokeDasharray="2,2" />
                <line x1="40" y1="120" x2="65" y2="55" stroke="rgba(255, 255, 255, 0.15)" strokeWidth="1" />

                {/* Dotted equator line */}
                <path d="M 0,100 Q 100,120 200,100" stroke="rgba(6, 182, 212, 0.25)" strokeWidth="1" strokeDasharray="5,5" />
              </svg>

              {/* Dynamic Coordinate Radar overlay */}
              <div className="absolute bottom-6 left-6 font-mono text-[9px] text-cyan-400 select-none bg-slate-950/80 px-2 py-1 rounded border border-cyan-400/20">
                EARTH HUB TELEMETRY: ACTIVE
              </div>
            </div>

            {/* Glowing orbital satellite labels */}
            <div className="absolute top-2 left-6 bg-slate-950/80 border border-white/10 px-2.5 py-1 rounded-full text-[9px] font-mono text-gray-400 flex items-center space-x-1.5 animate-pulse">
              <span className="w-1.5 h-1.5 bg-green-500 rounded-full"></span>
              <span>ORBITAL SECTOR 12</span>
            </div>
          </div>

          <div className="text-center">
            <p className="text-[10px] font-mono tracking-widest text-gray-500 uppercase">
              // Coordonnées de contact planétaire
            </p>
            <p className="text-xs text-purple-400 font-mono mt-1">
              stella@imuia.com &bull; +33 (0)6 12 34 56 78
            </p>
          </div>
        </div>

        {/* Action controls & Content segment (Right column) */}
        <div className="space-y-8 text-left">
          <div className="space-y-4">
            <h2 className="text-xs font-orbitron font-bold text-cyan-400 tracking-widest uppercase flex items-center space-x-2">
              <Sparkles className="w-4 h-4 animate-pulse" />
              <span>{language === 'fr' ? 'Contact Équipage' : 'Flight Crew Contact'}</span>
            </h2>
            <h1 className="text-3xl md:text-5xl font-black font-orbitron uppercase text-white tracking-tight leading-tight">
              {t.partnerSubtitle}
            </h1>
            <p className="text-sm md:text-base text-gray-300 leading-relaxed font-light">
              {t.partnerIntro}
            </p>
          </div>

          {/* Glowing buttons with rounded corners representing space launch parameters */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

            {/* Button 1: Présenter mon projet */}
            <button
              onClick={() => handleContactAction('project')}
              className="flex items-center justify-between p-4 bg-white/5 hover:bg-purple-600/10 text-white hover:text-purple-300 border border-white/10 hover:border-purple-500/50 rounded-2xl transition-all duration-300 cursor-none group hover:translate-y-[-2px] text-left"
            >
              <div>
                <span className="block text-xs font-bold font-orbitron uppercase tracking-wider">
                  {language === 'fr' ? 'Présenter mon projet' : 'Present my project'}
                </span>
                <span className="block text-[10px] text-gray-400 font-mono mt-1">
                  {language === 'fr' ? 'Soumettre une idée innovante' : 'Submit an innovative idea'}
                </span>
              </div>
              <ArrowRight className="w-4 h-4 text-gray-500 group-hover:text-purple-400 group-hover:translate-x-1 transition-all" />
            </button>

            {/* Button 2: Devenir partenaire */}
            <button
              onClick={() => handleContactAction('partner')}
              className="flex items-center justify-between p-4 bg-white/5 hover:bg-purple-600/10 text-white hover:text-purple-300 border border-white/10 hover:border-purple-500/50 rounded-2xl transition-all duration-300 cursor-none group hover:translate-y-[-2px] text-left"
            >
              <div>
                <span className="block text-xs font-bold font-orbitron uppercase tracking-wider">
                  {language === 'fr' ? 'Devenir partenaire' : 'Become a partner'}
                </span>
                <span className="block text-[10px] text-gray-400 font-mono mt-1">
                  {language === 'fr' ? 'Rejoindre notre flotte' : 'Join our fleet'}
                </span>
              </div>
              <ArrowRight className="w-4 h-4 text-gray-500 group-hover:text-purple-400 group-hover:translate-x-1 transition-all" />
            </button>

            {/* Button 3: Investir dans un univers */}
            <button
              onClick={() => handleContactAction('invest')}
              className="flex items-center justify-between p-4 bg-white/5 hover:bg-purple-600/10 text-white hover:text-purple-300 border border-white/10 hover:border-purple-500/50 rounded-2xl transition-all duration-300 cursor-none group hover:translate-y-[-2px] text-left"
            >
              <div>
                <span className="block text-xs font-bold font-orbitron uppercase tracking-wider">
                  {language === 'fr' ? 'Investir dans un univers' : 'Invest in a universe'}
                </span>
                <span className="block text-[10px] text-gray-400 font-mono mt-1">
                  {language === 'fr' ? 'Opportunités d\'investissement' : 'Investment opportunities'}
                </span>
              </div>
              <ArrowRight className="w-4 h-4 text-gray-500 group-hover:text-purple-400 group-hover:translate-x-1 transition-all" />
            </button>

            {/* Button 4: Contacter IMUIA */}
            <button
              onClick={() => handleContactAction('contact')}
              className="flex items-center justify-between p-4 bg-white/5 hover:bg-purple-600/10 text-white hover:text-purple-300 border border-white/10 hover:border-purple-500/50 rounded-2xl transition-all duration-300 cursor-none group hover:translate-y-[-2px] text-left"
            >
              <div>
                <span className="block text-xs font-bold font-orbitron uppercase tracking-wider">
                  {language === 'fr' ? 'Contacter IMUIA' : 'Contact IMUIA'}
                </span>
                <span className="block text-[10px] text-gray-400 font-mono mt-1">
                  {language === 'fr' ? 'Demandes d\'informations générales' : 'General inquiries & support'}
                </span>
              </div>
              <ArrowRight className="w-4 h-4 text-gray-500 group-hover:text-purple-400 group-hover:translate-x-1 transition-all" />
            </button>

          </div>

          <div className="p-4 rounded-xl bg-purple-500/5 border border-purple-500/10 flex items-start space-x-3">
            <Award className="w-4 h-4 text-purple-400 mt-0.5 flex-shrink-0 animate-pulse" />
            <p className="text-xs text-gray-400 leading-relaxed">
              {language === 'fr'
                ? "Chaque transmission est cryptée de bout en bout et routée directement vers la console de pilotage du copilote concerné par votre domaine d'activité."
                : "Every transmission is encrypted end-to-end and routed directly to the co-pilot console responsible for your specific sector of activity."}
            </p>
          </div>
        </div>

      </div>
    </div>
  );
};
