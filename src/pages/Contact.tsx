import React from 'react';
import { useAppState } from '../data/useAppState';
import { translations } from '../data/translations';
import { Rocket, Users, TrendingUp, Mail, MapPin, Globe, Radio } from 'lucide-react';

export const Contact: React.FC = () => {
  const { language, playSound, setActiveSection } = useAppState();
  const t = translations[language];

  const handleAction = (intent: string) => {
    playSound('space');
    sessionStorage.setItem('imuia_partner_intent', intent);
    setActiveSection('partners');
  };

  return (
    <div className="relative min-h-[calc(100vh-80px)] py-12 px-4 space-y-12 overflow-hidden flex flex-col items-center justify-center">
      {/* Stars Background layer */}
      <div className="absolute inset-0 stars-bg opacity-35 pointer-events-none"></div>

      {/* Atmospheric lighting blobs */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-cyan-500/10 rounded-full blur-2xl pointer-events-none"></div>

      {/* Realistic 3D-styled Earth Planet seen from Space */}
      <div className="relative z-10 flex flex-col items-center">
        <div className="relative group cursor-pointer mb-6" onClick={() => playSound('space')}>
          {/* Earth's atmospheric blue aura */}
          <div className="absolute -inset-6 rounded-full bg-cyan-400/20 blur-2xl animate-pulse"></div>
          <div className="absolute -inset-2 rounded-full border border-cyan-400/30"></div>

          {/* Earth Sphere */}
          <div className="relative w-56 h-56 md:w-64 md:h-64 rounded-full overflow-hidden shadow-[inset_-25px_-25px_50px_rgba(0,0,0,0.9),0_0_60px_rgba(56,189,248,0.4)] border border-cyan-300/40 bg-gradient-to-tr from-slate-950 via-blue-950 to-indigo-900">
            {/* Continent SVG textures overlay */}
            <svg
              className="absolute inset-0 w-full h-full opacity-80 animate-spin-slow"
              viewBox="0 0 200 200"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                <linearGradient id="oceanGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#082f49" />
                  <stop offset="50%" stopColor="#0369a1" />
                  <stop offset="100%" stopColor="#0c4a6e" />
                </linearGradient>
                <linearGradient id="landGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#15803d" />
                  <stop offset="100%" stopColor="#047857" />
                </linearGradient>
              </defs>

              {/* Ocean base */}
              <circle cx="100" cy="100" r="100" fill="url(#oceanGrad)" />

              {/* Stylized Africa, Europe, Americas, Asia shapes */}
              <path
                d="M85 35 Q100 25 115 35 Q125 50 115 65 Q110 80 120 100 Q125 125 110 145 Q95 160 85 145 Q80 120 85 95 Q75 70 85 50 Z"
                fill="url(#landGrad)"
                opacity="0.9"
              />
              <path
                d="M40 50 Q60 45 65 65 Q70 85 55 105 Q45 120 40 100 Q35 75 40 50 Z"
                fill="url(#landGrad)"
                opacity="0.85"
              />
              <path
                d="M130 45 Q160 40 170 65 Q175 90 155 110 Q140 125 135 100 Q130 75 130 45 Z"
                fill="url(#landGrad)"
                opacity="0.85"
              />

              {/* Swirling Cloud layer */}
              <path
                d="M20 70 Q50 60 90 75 T160 70 Q190 75 180 85 T110 90 T40 85 Z"
                fill="#ffffff"
                opacity="0.25"
              />
              <path
                d="M50 120 Q90 110 130 125 T170 120 Q180 130 160 135 T90 140 T50 130 Z"
                fill="#ffffff"
                opacity="0.3"
              />
            </svg>

            {/* Day / Night Terminus Shadow */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-black/40 to-black/90 pointer-events-none"></div>

            {/* City Lights on the night side */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_75%_50%,rgba(251,191,36,0.35)_1px,transparent_1px)] bg-[size:16px_16px] pointer-events-none"></div>

            {/* Atmospheric Specular Glint */}
            <div className="absolute top-2 left-8 w-20 h-10 rounded-full bg-white/20 blur-md rotate-[-25deg] pointer-events-none"></div>
          </div>

          {/* Orbital Satellite Node */}
          <div className="absolute -top-3 right-6 flex items-center space-x-1.5 px-2.5 py-1 rounded-full bg-black/80 border border-cyan-400/40 text-[10px] font-mono text-cyan-300 shadow-lg">
            <Radio className="w-3 h-3 text-cyan-400 animate-pulse" />
            <span>ORBITAL STATION IMUIA-01</span>
          </div>
        </div>

        {/* Content Headings matching prompt requirements */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-300 text-xs font-orbitron font-bold tracking-widest uppercase">
            <Globe className="w-3.5 h-3.5" />
            <span>{t.contactSectionTitle}</span>
          </div>

          <h1 className="text-3xl md:text-5xl font-black font-orbitron text-white uppercase tracking-tight leading-tight">
            {t.contactHeading}
          </h1>

          <p className="text-base md:text-lg text-gray-300 leading-relaxed font-light max-w-2xl mx-auto">
            {t.contactText}
          </p>
        </div>

        {/* 4 Required Action Buttons */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-8 w-full max-w-4xl">
          <button
            onClick={() => handleAction('project')}
            onMouseEnter={() => playSound('hover')}
            className="group flex flex-col items-center justify-center p-5 rounded-2xl glass-panel border border-purple-500/30 hover:border-purple-400 hover:bg-purple-600/15 transition-all duration-300 cursor-none hover:scale-105 shadow-[0_0_20px_rgba(168,85,247,0.2)]"
          >
            <div className="w-12 h-12 rounded-xl bg-purple-500/20 border border-purple-500/40 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
              <Rocket className="w-6 h-6 text-purple-400" />
            </div>
            <span className="font-orbitron font-bold text-sm text-white text-center">
              {t.contactBtnPresent}
            </span>
            <span className="text-[11px] text-gray-400 font-mono mt-1 text-center">
              {t.contactBtnPresentSub}
            </span>
          </button>

          <button
            onClick={() => handleAction('partner')}
            onMouseEnter={() => playSound('hover')}
            className="group flex flex-col items-center justify-center p-5 rounded-2xl glass-panel border border-cyan-500/30 hover:border-cyan-400 hover:bg-cyan-600/15 transition-all duration-300 cursor-none hover:scale-105 shadow-[0_0_20px_rgba(34,211,238,0.2)]"
          >
            <div className="w-12 h-12 rounded-xl bg-cyan-500/20 border border-cyan-500/40 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
              <Users className="w-6 h-6 text-cyan-400" />
            </div>
            <span className="font-orbitron font-bold text-sm text-white text-center">
              {t.contactBtnPartner}
            </span>
            <span className="text-[11px] text-gray-400 font-mono mt-1 text-center">
              {t.contactBtnPartnerSub}
            </span>
          </button>

          <button
            onClick={() => handleAction('invest')}
            onMouseEnter={() => playSound('hover')}
            className="group flex flex-col items-center justify-center p-5 rounded-2xl glass-panel border border-pink-500/30 hover:border-pink-400 hover:bg-pink-600/15 transition-all duration-300 cursor-none hover:scale-105 shadow-[0_0_20px_rgba(236,72,153,0.2)]"
          >
            <div className="w-12 h-12 rounded-xl bg-pink-500/20 border border-pink-500/40 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
              <TrendingUp className="w-6 h-6 text-pink-400" />
            </div>
            <span className="font-orbitron font-bold text-sm text-white text-center">
              {t.contactBtnInvest}
            </span>
            <span className="text-[11px] text-gray-400 font-mono mt-1 text-center">
              {t.contactBtnInvestSub}
            </span>
          </button>

          <button
            onClick={() => handleAction('contact')}
            onMouseEnter={() => playSound('hover')}
            className="group flex flex-col items-center justify-center p-5 rounded-2xl glass-panel border border-green-500/30 hover:border-green-400 hover:bg-green-600/15 transition-all duration-300 cursor-none hover:scale-105 shadow-[0_0_20px_rgba(34,197,94,0.2)]"
          >
            <div className="w-12 h-12 rounded-xl bg-green-500/20 border border-green-500/40 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
              <Mail className="w-6 h-6 text-green-400" />
            </div>
            <span className="font-orbitron font-bold text-sm text-white text-center">
              {t.contactBtnContact}
            </span>
            <span className="text-[11px] text-gray-400 font-mono mt-1 text-center">
              {t.contactBtnContactSub}
            </span>
          </button>
        </div>

        {/* Global Coordinates Hub Footer */}
        <div className="mt-12 glass-panel p-6 rounded-2xl border border-white/10 max-w-4xl w-full grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
          <div className="space-y-1">
            <span className="text-[10px] font-mono text-purple-400 uppercase tracking-widest block">
              // CANNES &amp; FRANCE
            </span>
            <div className="text-sm font-bold text-white flex items-center space-x-1.5">
              <MapPin className="w-4 h-4 text-purple-400" />
              <span>Boulevard de la Croisette, Cannes</span>
            </div>
            <span className="text-xs text-gray-400 font-mono block">
              43.5528° N, 7.0174° E
            </span>
          </div>

          <div className="space-y-1">
            <span className="text-[10px] font-mono text-cyan-400 uppercase tracking-widest block">
              // OCÉAN INDIEN
            </span>
            <div className="text-sm font-bold text-white flex items-center space-x-1.5">
              <MapPin className="w-4 h-4 text-cyan-400" />
              <span>Antananarivo &amp; Nosy Be, Madagascar</span>
            </div>
            <span className="text-xs text-gray-400 font-mono block">
              18.8792° S, 47.5079° E
            </span>
          </div>

          <div className="space-y-1">
            <span className="text-[10px] font-mono text-green-400 uppercase tracking-widest block">
              // LIAISON CRYPTÉE
            </span>
            <div className="text-sm font-bold text-white flex items-center space-x-1.5">
              <Mail className="w-4 h-4 text-green-400" />
              <span>crew@imuia.com</span>
            </div>
            <span className="text-xs text-gray-400 font-mono block">
              PGP Key: 0x9B4E28A1C5F0
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
