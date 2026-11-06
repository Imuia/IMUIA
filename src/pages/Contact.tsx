import React from 'react';
import { useAppState } from '../data/useAppState';
import { translations } from '../data/translations';
import { Rocket, Shield, Users, Mail, Globe } from 'lucide-react';

export const Contact: React.FC = () => {
  const { language, playSound, setActiveSection, setPartnerIntent } = useAppState();
  const t = translations[language];

  const handleIntent = (intent: string) => {
    setPartnerIntent(intent);
    setActiveSection('partners');
    playSound('space');
  };

  return (
    <div className="relative py-16 px-4 space-y-12 overflow-hidden text-center">
      {/* Stars Background layer */}
      <div className="absolute inset-0 stars-bg opacity-30 pointer-events-none"></div>

      {/* Background atmospheric glows */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-cyan-600/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-blue-600/15 rounded-full blur-2xl pointer-events-none"></div>

      <div className="max-w-4xl mx-auto space-y-8 relative z-10">

        {/* 3D-Styled Planet Earth seen from space */}
        <div className="relative flex justify-center py-4">
          {/* External Atmosphere Glow */}
          <div className="absolute inset-0 m-auto w-56 h-56 rounded-full bg-cyan-400/20 blur-2xl animate-pulse"></div>

          {/* Earth Planet Sphere */}
          <div className="relative w-48 h-48 md:w-56 md:h-56 rounded-full overflow-hidden border border-cyan-400/30 shadow-[0_0_60px_rgba(6,182,212,0.4)] bg-gradient-to-tr from-[#021027] via-[#0b2545] to-[#134074] group hover:scale-105 transition-transform duration-700">
            {/* Continent shapes SVG simulation */}
            <svg viewBox="0 0 200 200" className="w-full h-full opacity-70 animate-orbit-reverse scale-125">
              {/* Continents */}
              <path
                d="M 40,80 Q 55,60 80,70 Q 110,80 120,60 Q 140,50 160,80 Q 150,110 130,120 Q 90,140 60,110 Z"
                fill="#10b981"
                opacity="0.5"
              />
              <path
                d="M 60,130 Q 80,120 100,135 Q 110,160 85,175 Q 65,160 60,130 Z"
                fill="#059669"
                opacity="0.6"
              />
              <path
                d="M 120,70 Q 150,60 170,80 Q 175,100 150,110 Q 130,95 120,70 Z"
                fill="#34d399"
                opacity="0.4"
              />
            </svg>

            {/* Cloud layers drifting */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_30%,rgba(255,255,255,0.4)_0%,transparent_60%)] pointer-events-none"></div>
            <div className="absolute -inset-4 bg-[linear-gradient(45deg,transparent_40%,rgba(255,255,255,0.15)_50%,transparent_60%)] animate-pulse pointer-events-none"></div>

            {/* Planet Shadow / Day-Night Terminator Line */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-black/80 pointer-events-none"></div>

            {/* Orbiting Station / Satellite Beacon */}
            <div className="absolute top-8 right-10 w-2 h-2 rounded-full bg-cyan-300 animate-ping"></div>
          </div>
        </div>

        {/* Section Headings */}
        <div className="space-y-4">
          <h2 className="text-xs font-orbitron font-bold text-cyan-400 tracking-widest uppercase flex items-center justify-center space-x-2">
            <Globe className="w-4 h-4 animate-spin-slow" />
            <span>Station d'Amarrage &amp; Contact Terre</span>
          </h2>
          <h1 className="text-3xl md:text-5xl font-black font-orbitron uppercase text-white leading-tight">
            {t.contactSectionTitle}
          </h1>
          <p className="text-sm md:text-base text-gray-300 max-w-2xl mx-auto leading-relaxed font-light">
            {t.contactSectionText}
          </p>
        </div>

        {/* The 4 Action Buttons with smart prefill routing */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-4xl mx-auto pt-4">
          <button
            onClick={() => handleIntent('project')}
            onMouseEnter={() => playSound('hover')}
            className="flex flex-col items-center justify-center p-5 rounded-2xl glass-panel border border-purple-500/30 hover:border-purple-400 hover:bg-purple-600/10 hover:shadow-[0_0_25px_rgba(168,85,247,0.3)] transition-all duration-300 cursor-none hover:translate-y-[-2px] group"
          >
            <div className="w-12 h-12 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
              <Rocket className="w-6 h-6 text-purple-400" />
            </div>
            <span className="font-orbitron font-bold text-sm text-white group-hover:text-purple-300 transition-colors">
              {t.contactBtnPresent}
            </span>
            <span className="text-[10px] text-gray-400 font-mono mt-1">
              Incubation de concept
            </span>
          </button>

          <button
            onClick={() => handleIntent('partner')}
            onMouseEnter={() => playSound('hover')}
            className="flex flex-col items-center justify-center p-5 rounded-2xl glass-panel border border-cyan-500/30 hover:border-cyan-400 hover:bg-cyan-600/10 hover:shadow-[0_0_25px_rgba(6,182,212,0.3)] transition-all duration-300 cursor-none hover:translate-y-[-2px] group"
          >
            <div className="w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
              <Shield className="w-6 h-6 text-cyan-400" />
            </div>
            <span className="font-orbitron font-bold text-sm text-white group-hover:text-cyan-300 transition-colors">
              {t.contactBtnPartner}
            </span>
            <span className="text-[10px] text-gray-400 font-mono mt-1">
              Opérateur &amp; Prestataire
            </span>
          </button>

          <button
            onClick={() => handleIntent('invest')}
            onMouseEnter={() => playSound('hover')}
            className="flex flex-col items-center justify-center p-5 rounded-2xl glass-panel border border-pink-500/30 hover:border-pink-400 hover:bg-pink-600/10 hover:shadow-[0_0_25px_rgba(236,72,153,0.3)] transition-all duration-300 cursor-none hover:translate-y-[-2px] group"
          >
            <div className="w-12 h-12 rounded-xl bg-pink-500/10 border border-pink-500/20 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
              <Users className="w-6 h-6 text-pink-400" />
            </div>
            <span className="font-orbitron font-bold text-sm text-white group-hover:text-pink-300 transition-colors">
              {t.contactBtnInvest}
            </span>
            <span className="text-[10px] text-gray-400 font-mono mt-1">
              Capital &amp; Synergies
            </span>
          </button>

          <button
            onClick={() => handleIntent('general')}
            onMouseEnter={() => playSound('hover')}
            className="flex flex-col items-center justify-center p-5 rounded-2xl glass-panel border border-emerald-500/30 hover:border-emerald-400 hover:bg-emerald-600/10 hover:shadow-[0_0_25px_rgba(16,185,129,0.3)] transition-all duration-300 cursor-none hover:translate-y-[-2px] group"
          >
            <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
              <Mail className="w-6 h-6 text-emerald-400" />
            </div>
            <span className="font-orbitron font-bold text-sm text-white group-hover:text-emerald-300 transition-colors">
              {t.contactBtnContact}
            </span>
            <span className="text-[10px] text-gray-400 font-mono mt-1">
              Liaison directe
            </span>
          </button>
        </div>

      </div>
    </div>
  );
};
