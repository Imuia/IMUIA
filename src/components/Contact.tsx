import React from 'react';
import { useAppState } from '../data/useAppState';
import { translations } from '../data/translations';
import { Globe2, Rocket, Users, Landmark, Mail, ArrowRight } from 'lucide-react';

export const Contact: React.FC = () => {
  const { language, playSound, setActiveSection } = useAppState();
  const t = translations[language];

  const handleAction = (intentType: 'project' | 'partner' | 'invest' | 'direct') => {
    playSound('space');
    // Store intent in session to auto-fill or customize if needed
    try {
      sessionStorage.setItem('imuia_intent', intentType);
    } catch {
      // Ignore if sessionStorage not supported
    }
    setActiveSection('partners');
  };

  return (
    <section id="contact-section" className="relative py-20 px-4 overflow-hidden border-t border-white/5 my-12">
      {/* Background space elements */}
      <div className="absolute inset-0 stars-bg opacity-30 pointer-events-none"></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-cyan-600/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-5xl mx-auto text-center space-y-12 relative z-10">

        {/* 3D-styled Earth / IMUIA planet view from space */}
        <div className="relative flex justify-center">
          <div className="relative w-56 h-56 md:w-64 md:h-64 rounded-full flex items-center justify-center p-2 shadow-[0_0_80px_rgba(56,189,248,0.35)] transition-transform duration-700 hover:scale-105 group">
            {/* Atmospheric ozone ring */}
            <div className="absolute inset-0 rounded-full border border-cyan-400/40 animate-pulse pointer-events-none"></div>
            <div className="absolute -inset-3 rounded-full border border-dashed border-cyan-400/20 animate-orbit pointer-events-none"></div>

            {/* Earth sphere base */}
            <div className="w-full h-full rounded-full bg-gradient-to-tr from-slate-950 via-blue-950 to-cyan-900 relative overflow-hidden flex items-center justify-center border border-cyan-500/40">
              {/* Continents glow & cloud textures */}
              <div className="absolute inset-0 opacity-40 bg-[radial-gradient(circle_at_30%_30%,rgba(34,197,94,0.4),transparent_60%)]"></div>
              <div className="absolute inset-0 opacity-30 bg-[radial-gradient(circle_at_70%_60%,rgba(6,182,212,0.5),transparent_50%)]"></div>
              <div className="absolute -top-12 -left-12 w-48 h-48 bg-white/10 rounded-full blur-xl pointer-events-none"></div>

              {/* Orbital satellite dot */}
              <div className="absolute top-4 right-8 w-2 h-2 rounded-full bg-cyan-300 animate-ping"></div>

              <div className="text-center z-10 px-4">
                <Globe2 className="w-10 h-10 text-cyan-300 mx-auto mb-2 opacity-90 group-hover:rotate-12 transition-transform duration-500" />
                <span className="block font-orbitron font-black text-xs md:text-sm tracking-widest text-white uppercase">
                  ORBITE TERRESTRE
                </span>
                <span className="block font-mono text-[9px] text-cyan-400 tracking-wider">
                  COORD: 43.55° N, 7.01° E
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Heading & Intro */}
        <div className="space-y-4 max-w-3xl mx-auto">
          <span className="inline-block text-xs font-mono font-bold tracking-widest uppercase px-3 py-1 rounded-full bg-cyan-400/10 text-cyan-300 border border-cyan-400/20">
            // TERMINAL DE LIAISON SPATIALE
          </span>
          <h2 className="text-3xl md:text-5xl font-black font-orbitron text-white uppercase tracking-tight">
            {t.contactSectionTitle}
          </h2>
          <p className="text-base md:text-lg text-gray-300 leading-relaxed font-light">
            {t.contactSectionText}
          </p>
        </div>

        {/* 4 Call-to-action buttons */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-4 text-left">
          {/* Action 1: Presenter mon projet */}
          <button
            onClick={() => handleAction('project')}
            onMouseEnter={() => playSound('hover')}
            className="group glass-panel p-5 rounded-2xl border border-white/10 hover:border-purple-500/50 hover:bg-purple-950/20 transition-all duration-300 flex flex-col justify-between space-y-4 cursor-none"
          >
            <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/30 flex items-center justify-center text-purple-400 group-hover:scale-110 transition-transform">
              <Rocket className="w-5 h-5" />
            </div>
            <div>
              <span className="block font-orbitron font-bold text-sm text-white group-hover:text-purple-300 transition-colors">
                {t.contactBtnPresent}
              </span>
              <span className="text-[11px] text-gray-400 leading-tight block mt-1">
                Soumettez un concept à notre laboratoire créatif.
              </span>
            </div>
            <div className="flex items-center space-x-1 text-xs font-mono text-purple-400 font-bold pt-2">
              <span>Initier</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </button>

          {/* Action 2: Devenir partenaire */}
          <button
            onClick={() => handleAction('partner')}
            onMouseEnter={() => playSound('hover')}
            className="group glass-panel p-5 rounded-2xl border border-white/10 hover:border-cyan-500/50 hover:bg-cyan-950/20 transition-all duration-300 flex flex-col justify-between space-y-4 cursor-none"
          >
            <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 group-hover:scale-110 transition-transform">
              <Users className="w-5 h-5" />
            </div>
            <div>
              <span className="block font-orbitron font-bold text-sm text-white group-hover:text-cyan-300 transition-colors">
                {t.contactBtnPartner}
              </span>
              <span className="text-[11px] text-gray-400 leading-tight block mt-1">
                Rejoignez nos écosystèmes en tant qu'opérateur local.
              </span>
            </div>
            <div className="flex items-center space-x-1 text-xs font-mono text-cyan-400 font-bold pt-2">
              <span>S'allier</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </button>

          {/* Action 3: Investir dans un univers */}
          <button
            onClick={() => handleAction('invest')}
            onMouseEnter={() => playSound('hover')}
            className="group glass-panel p-5 rounded-2xl border border-white/10 hover:border-pink-500/50 hover:bg-pink-950/20 transition-all duration-300 flex flex-col justify-between space-y-4 cursor-none"
          >
            <div className="w-10 h-10 rounded-xl bg-pink-500/10 border border-pink-500/30 flex items-center justify-center text-pink-400 group-hover:scale-110 transition-transform">
              <Landmark className="w-5 h-5" />
            </div>
            <div>
              <span className="block font-orbitron font-bold text-sm text-white group-hover:text-pink-300 transition-colors">
                {t.contactBtnInvest}
              </span>
              <span className="text-[11px] text-gray-400 leading-tight block mt-1">
                Participez au financement de nos plateformes à fort potentiel.
              </span>
            </div>
            <div className="flex items-center space-x-1 text-xs font-mono text-pink-400 font-bold pt-2">
              <span>Participer</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </button>

          {/* Action 4: Contacter IMUIA */}
          <button
            onClick={() => handleAction('direct')}
            onMouseEnter={() => playSound('hover')}
            className="group glass-panel p-5 rounded-2xl border border-white/10 hover:border-green-500/50 hover:bg-green-950/20 transition-all duration-300 flex flex-col justify-between space-y-4 cursor-none"
          >
            <div className="w-10 h-10 rounded-xl bg-green-500/10 border border-green-500/30 flex items-center justify-center text-green-400 group-hover:scale-110 transition-transform">
              <Mail className="w-5 h-5" />
            </div>
            <div>
              <span className="block font-orbitron font-bold text-sm text-white group-hover:text-green-300 transition-colors">
                {t.contactBtnDirect}
              </span>
              <span className="text-[11px] text-gray-400 leading-tight block mt-1">
                Posez vos questions directement à notre passerelle.
              </span>
            </div>
            <div className="flex items-center space-x-1 text-xs font-mono text-green-400 font-bold pt-2">
              <span>Échanger</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </button>
        </div>

      </div>
    </section>
  );
};
