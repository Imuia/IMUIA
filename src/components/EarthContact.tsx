import React from 'react';
import { useAppState } from '../data/AppState';
import { translations } from '../data/translations';
import { Globe, Send, UserCheck, DollarSign, MessageSquare } from 'lucide-react';

export const EarthContact: React.FC = () => {
  const { language, setActiveSection, playSound } = useAppState();
  const t = translations[language];

  const handleIntent = (intent: string, partnerType?: string) => {
    playSound('space');
    if (partnerType) {
      sessionStorage.setItem('imuia_intent_type', partnerType);
    }
    sessionStorage.setItem('imuia_intent_title', intent);
    setActiveSection('partners');

    // Smooth scroll to form element if on page
    setTimeout(() => {
      const el = document.getElementById('partnership-form-anchor');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }, 100);
  };

  return (
    <section className="relative py-16 px-4 my-12 border-t border-b border-purple-500/20 bg-gradient-to-b from-black/60 via-purple-950/20 to-black/80 overflow-hidden">
      {/* Background space stars & glowing atmosphere */}
      <div className="absolute inset-0 stars-bg opacity-30 pointer-events-none"></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-600/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10 text-left">

        {/* Earth / IMUIA Planet 3D Sphere Graphic (Left 5 Cols) */}
        <div className="lg:col-span-5 flex justify-center">
          <div className="relative w-64 h-64 md:w-72 md:h-72 rounded-full flex items-center justify-center bg-gradient-to-tr from-blue-950 via-indigo-900 to-cyan-900 border border-cyan-400/40 p-1 shadow-[0_0_60px_rgba(34,211,238,0.3)] group hover:scale-105 transition-transform duration-700">

            {/* Atmosphere outer glow ring */}
            <div className="absolute -inset-2 rounded-full border border-cyan-400/20 animate-pulse"></div>

            {/* Orbital Rings */}
            <div className="absolute w-80 h-20 border-t border-b border-purple-500/40 rounded-[50%] rotate-12 animate-orbit"></div>
            <div className="absolute w-80 h-20 border-l border-r border-cyan-400/30 rounded-[50%] -rotate-45 animate-orbit-reverse"></div>

            {/* Continent Nodes overlay simulation */}
            <div className="relative w-full h-full rounded-full overflow-hidden bg-[radial-gradient(circle_at_30%_30%,#1e1b4b_0%,#030712_100%)] flex items-center justify-center">

              {/* Grid lines */}
              <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(34,211,238,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(34,211,238,0.05)_1px,transparent_1px)] bg-[size:16px_16px] pointer-events-none"></div>

              {/* Vector Globe Text Markings */}
              <div className="text-center space-y-1 font-mono text-[9px] text-cyan-300/80 z-10 select-none">
                <Globe className="w-12 h-12 text-cyan-400 mx-auto animate-spin-slow opacity-80 mb-2" />
                <div className="font-bold tracking-widest text-white uppercase font-orbitron text-xs">
                  EARTH HUB // ORBIT
                </div>
                <div className="text-purple-300">43.5528° N, 7.0174° E</div>
                <div className="text-cyan-400 font-bold">NODE: CANNES &bull; CORSE &bull; MAROC &bull; MADA</div>
              </div>

              {/* Night-side city lights beacon dots */}
              <span className="absolute top-1/4 left-1/3 w-2 h-2 bg-cyan-400 rounded-full animate-ping"></span>
              <span className="absolute top-1/2 left-2/5 w-1.5 h-1.5 bg-purple-400 rounded-full"></span>
              <span className="absolute bottom-1/3 right-1/3 w-2 h-2 bg-green-400 rounded-full animate-ping"></span>
              <span className="absolute bottom-1/4 right-2/5 w-1.5 h-1.5 bg-pink-400 rounded-full"></span>
            </div>

            {/* Satellite Station Node */}
            <div className="absolute -top-3 -right-3 p-2 bg-black/80 border border-purple-500/50 rounded-xl text-[9px] font-mono text-purple-300 flex items-center space-x-1 shadow-lg">
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></span>
              <span>STATION IMUIA</span>
            </div>
          </div>
        </div>

        {/* Content & 4 Action Buttons (Right 7 Cols) */}
        <div className="lg:col-span-7 space-y-6">
          <div className="space-y-3">
            <span className="inline-block text-[10px] font-mono font-bold tracking-widest text-cyan-400 uppercase bg-cyan-400/10 border border-cyan-500/20 px-3 py-1 rounded-full">
              // SECTION FINALE &bull; CONTACT ORBITAL
            </span>
            <h2 className="text-2xl md:text-4xl font-black font-orbitron text-white uppercase tracking-tight leading-tight">
              Vous avez une idée à mettre en orbite ?
            </h2>
            <p className="text-sm md:text-base text-gray-300 leading-relaxed font-light">
              Projet innovant, partenariat, investissement ou proposition de collaboration : entrez en contact avec l'équipage IMUIA.
            </p>
          </div>

          {/* 4 Primary Intent Action Buttons */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-2">
            <button
              onClick={() => handleIntent('Présenter mon projet', 'Other')}
              onMouseEnter={() => playSound('hover')}
              className="flex items-center space-x-3 p-3.5 bg-purple-600 hover:bg-purple-500 text-white rounded-2xl font-orbitron font-bold text-xs tracking-wider uppercase transition-all duration-300 shadow-[0_0_20px_rgba(168,85,247,0.3)] hover:shadow-[0_0_30px_rgba(168,85,247,0.5)] cursor-none"
            >
              <Send className="w-4 h-4 text-purple-200" />
              <span>{t.presentProject}</span>
            </button>

            <button
              onClick={() => handleIntent('Devenir partenaire', 'Operator')}
              onMouseEnter={() => playSound('hover')}
              className="flex items-center space-x-3 p-3.5 bg-white/5 hover:bg-purple-500/20 text-white hover:text-purple-300 border border-white/10 hover:border-purple-500/50 rounded-2xl font-orbitron font-bold text-xs tracking-wider uppercase transition-all duration-300 cursor-none"
            >
              <UserCheck className="w-4 h-4 text-cyan-400" />
              <span>{t.becomePartner}</span>
            </button>

            <button
              onClick={() => handleIntent('Investir dans un univers', 'Investor')}
              onMouseEnter={() => playSound('hover')}
              className="flex items-center space-x-3 p-3.5 bg-white/5 hover:bg-purple-500/20 text-white hover:text-purple-300 border border-white/10 hover:border-purple-500/50 rounded-2xl font-orbitron font-bold text-xs tracking-wider uppercase transition-all duration-300 cursor-none"
            >
              <DollarSign className="w-4 h-4 text-green-400" />
              <span>{t.investUniverse}</span>
            </button>

            <button
              onClick={() => handleIntent('Contacter IMUIA', 'Other')}
              onMouseEnter={() => playSound('hover')}
              className="flex items-center space-x-3 p-3.5 bg-white/5 hover:bg-purple-500/20 text-white hover:text-purple-300 border border-white/10 hover:border-purple-500/50 rounded-2xl font-orbitron font-bold text-xs tracking-wider uppercase transition-all duration-300 cursor-none"
            >
              <MessageSquare className="w-4 h-4 text-pink-400" />
              <span>{t.contactUs}</span>
            </button>
          </div>

        </div>

      </div>
    </section>
  );
};
