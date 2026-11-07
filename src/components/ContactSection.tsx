import React from 'react';
import { useAppState } from '../data/useAppState';
import { translations } from '../data/translations';
import { Globe, Send, Handshake, TrendingUp, Mail } from 'lucide-react';

export const ContactSection: React.FC = () => {
  const { language, playSound, setActiveSection } = useAppState();
  const t = translations[language];

  const handleAction = (target: string, partnerTypePreset?: string) => {
    playSound('space');
    if (partnerTypePreset) {
      sessionStorage.setItem('imuia_partner_preset', partnerTypePreset);
    }
    setActiveSection(target);
  };

  return (
    <section id="contact-section" className="relative py-20 px-4 overflow-hidden border-t border-white/10 mt-16">
      {/* Dynamic Earth & Orbit glow in background */}
      <div className="absolute inset-0 stars-bg opacity-30 pointer-events-none"></div>

      <div className="max-w-5xl mx-auto relative z-10 text-center space-y-10">

        {/* 3D-styled Earth / IMUIA planet representation seen from orbit */}
        <div className="relative flex justify-center items-center">
          {/* Deep atmospheric glow */}
          <div className="absolute w-72 h-72 rounded-full bg-cyan-500/20 blur-3xl animate-pulse"></div>
          <div className="absolute w-60 h-60 rounded-full bg-blue-600/20 blur-2xl"></div>

          {/* Earth / Orbital Planet Sphere */}
          <div className="relative w-48 h-48 md:w-56 md:h-56 rounded-full bg-gradient-to-tr from-[#0b1c3d] via-[#10335e] to-[#2563eb] shadow-[0_0_60px_rgba(59,130,246,0.45)] border border-cyan-400/30 flex items-center justify-center overflow-hidden transition-transform duration-700 hover:scale-105">
            {/* Swirling atmosphere clouds / continent silhouettes (SVG) */}
            <svg
              className="absolute inset-0 w-full h-full opacity-60 mix-blend-screen animate-spin-slow"
              viewBox="0 0 200 200"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                <radialGradient id="earthLight" cx="30%" cy="30%" r="70%">
                  <stop offset="0%" stopColor="#67e8f9" stopOpacity="0.8" />
                  <stop offset="60%" stopColor="#1e3a8a" stopOpacity="0.4" />
                  <stop offset="100%" stopColor="#020617" stopOpacity="0.9" />
                </radialGradient>
              </defs>
              <circle cx="100" cy="100" r="99" fill="url(#earthLight)" />
              {/* Abstract continents */}
              <path
                d="M40 70 Q60 50 90 60 T140 80 T160 120 T110 150 T60 130 Z"
                fill="#10b981"
                opacity="0.35"
              />
              <path
                d="M100 40 Q130 30 160 50 T180 90 T140 110 T110 80 Z"
                fill="#059669"
                opacity="0.25"
              />
              <path
                d="M30 110 Q50 90 70 120 T100 160 T50 170 Z"
                fill="#34d399"
                opacity="0.3"
              />
            </svg>

            {/* Orbital Rings */}
            <div className="absolute w-[140%] h-14 border border-cyan-400/40 rounded-[50%] rotate-[-25deg] shadow-[0_0_15px_rgba(34,211,238,0.3)] pointer-events-none"></div>
            <div className="absolute w-[160%] h-20 border-t border-purple-500/30 rounded-[50%] rotate-[15deg] pointer-events-none"></div>

            {/* Satellite Beacon */}
            <div className="relative z-10 flex flex-col items-center">
              <Globe className="w-10 h-10 text-cyan-300 animate-pulse drop-shadow-[0_0_12px_rgba(34,211,238,0.8)]" />
              <span className="font-orbitron font-black text-xs tracking-widest text-white mt-1 uppercase">
                PLANÈTE TERRE
              </span>
              <span className="text-[8px] font-mono text-cyan-300">
                // ORBITAL VIEW
              </span>
            </div>
          </div>
        </div>

        {/* Content Section Header matching exact prompt prompt */}
        <div className="space-y-4 max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-black font-orbitron uppercase text-white leading-tight">
            {t.partnerSubtitle}
          </h2>
          <p className="text-base md:text-lg text-gray-300 max-w-2xl mx-auto font-light leading-relaxed">
            « {t.partnerIntro} »
          </p>
        </div>

        {/* 4 Main Action Buttons */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-4xl mx-auto pt-4">
          <button
            onClick={() => handleAction('partners', 'Project')}
            onMouseEnter={() => playSound('hover')}
            className="flex items-center justify-center space-x-2 px-5 py-4 bg-purple-600 hover:bg-purple-500 text-white font-orbitron font-bold text-xs uppercase tracking-wider rounded-2xl transition-all duration-300 shadow-[0_0_20px_rgba(168,85,247,0.35)] hover:shadow-[0_0_30px_rgba(168,85,247,0.6)] cursor-none hover:translate-y-[-2px]"
          >
            <Send className="w-4 h-4" />
            <span>{t.presentProject}</span>
          </button>

          <button
            onClick={() => handleAction('partners', 'Partner')}
            onMouseEnter={() => playSound('hover')}
            className="flex items-center justify-center space-x-2 px-5 py-4 bg-white/5 hover:bg-cyan-500/20 text-white hover:text-cyan-300 font-orbitron font-bold text-xs uppercase tracking-wider rounded-2xl border border-white/10 hover:border-cyan-400/50 transition-all duration-300 cursor-none hover:translate-y-[-2px]"
          >
            <Handshake className="w-4 h-4" />
            <span>{t.becomePartner}</span>
          </button>

          <button
            onClick={() => handleAction('partners', 'Investor')}
            onMouseEnter={() => playSound('hover')}
            className="flex items-center justify-center space-x-2 px-5 py-4 bg-white/5 hover:bg-purple-500/20 text-white hover:text-purple-300 font-orbitron font-bold text-xs uppercase tracking-wider rounded-2xl border border-white/10 hover:border-purple-400/50 transition-all duration-300 cursor-none hover:translate-y-[-2px]"
          >
            <TrendingUp className="w-4 h-4" />
            <span>{t.investUniverse}</span>
          </button>

          <button
            onClick={() => handleAction('partners', 'General')}
            onMouseEnter={() => playSound('hover')}
            className="flex items-center justify-center space-x-2 px-5 py-4 bg-white/5 hover:bg-pink-500/20 text-white hover:text-pink-300 font-orbitron font-bold text-xs uppercase tracking-wider rounded-2xl border border-white/10 hover:border-pink-400/50 transition-all duration-300 cursor-none hover:translate-y-[-2px]"
          >
            <Mail className="w-4 h-4" />
            <span>{t.contactUs}</span>
          </button>
        </div>

        {/* Orbital telemetry coordinates */}
        <div className="pt-6 text-[10px] font-mono text-gray-500 flex items-center justify-center space-x-4">
          <span>COORDINATES: 43.5528° N, 7.0174° E</span>
          <span>•</span>
          <span className="text-cyan-400 font-bold">TRANSMISSION FREQUENCY 1420.4 MHz</span>
        </div>

      </div>
    </section>
  );
};
