import React from 'react';
import { useAppState } from '../data/useAppState';
import { translations } from '../data/translations';
import { Rocket, Handshake, TrendingUp, Mail, Globe, Sparkles } from 'lucide-react';

export const ContactSection: React.FC = () => {
  const { language, playSound, setActiveSection } = useAppState();
  const t = translations[language];

  const handleAction = (intent: string) => {
    playSound('space');
    sessionStorage.setItem('imuia_partner_intent', intent);
    setActiveSection('partners');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <section className="relative py-20 px-4 overflow-hidden my-12">
      {/* Background starlight & nebula glows */}
      <div className="absolute inset-0 stars-bg opacity-40 pointer-events-none"></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-10 right-1/4 w-[400px] h-[400px] bg-purple-600/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-5xl mx-auto relative z-10 text-center space-y-12">

        {/* 3D-Styled Planetary View: Earth Seen From Space */}
        <div className="relative flex justify-center items-center py-6">
          {/* Deep blue atmospheric aura glow */}
          <div className="absolute w-64 h-64 md:w-80 md:h-80 rounded-full bg-cyan-500/20 blur-3xl animate-pulse pointer-events-none"></div>
          <div className="absolute w-72 h-72 md:w-96 md:h-96 rounded-full bg-blue-700/15 blur-2xl pointer-events-none"></div>

          {/* Central Planet Sphere (Earth / Planet IMUIA) */}
          <div className="relative w-48 h-48 md:w-64 md:h-64 rounded-full border border-cyan-400/40 p-1 shadow-[0_0_80px_rgba(34,211,238,0.35)] overflow-hidden bg-gradient-to-tr from-slate-950 via-[#0a192f] to-[#1e3a8a] group transition-all duration-700 hover:scale-105">
            {/* SVG Continents & Cloud Layers texture */}
            <svg
              className="absolute inset-0 w-full h-full opacity-80"
              viewBox="0 0 200 200"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                <radialGradient id="earthGlow" cx="50%" cy="50%" r="50%">
                  <stop offset="60%" stopColor="#0284c7" stopOpacity="0.4" />
                  <stop offset="95%" stopColor="#0369a1" stopOpacity="0.9" />
                  <stop offset="100%" stopColor="#38bdf8" stopOpacity="1" />
                </radialGradient>
                <linearGradient id="continentGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#10b981" stopOpacity="0.8" />
                  <stop offset="100%" stopColor="#047857" stopOpacity="0.9" />
                </linearGradient>
              </defs>

              {/* Water base */}
              <circle cx="100" cy="100" r="98" fill="url(#earthGlow)" />

              {/* Stylized Landmasses (Europe, Africa, Americas, Madagascar) */}
              {/* North & West Africa */}
              <path
                d="M 95 60 Q 115 65 120 85 Q 125 110 110 135 Q 95 150 90 130 Q 80 110 82 85 Z"
                fill="url(#continentGrad)"
                opacity="0.85"
              />
              {/* Europe & Mediterranean */}
              <path
                d="M 92 45 Q 110 40 120 52 Q 115 60 98 62 Q 88 55 92 45 Z"
                fill="url(#continentGrad)"
                opacity="0.9"
              />
              {/* Madagascar Island */}
              <ellipse cx="128" cy="130" rx="4" ry="10" transform="rotate(-15 128 130)" fill="#34d399" />
              {/* Corsica beacon island */}
              <circle cx="100" cy="56" r="2.5" fill="#facc15" className="animate-ping" />

              {/* Atmosphere cloud swirls */}
              <path
                d="M 20 80 Q 70 60 120 75 T 190 60"
                stroke="white"
                strokeWidth="6"
                strokeLinecap="round"
                fill="none"
                opacity="0.3"
                className="animate-pulse"
              />
              <path
                d="M 30 130 Q 80 120 140 135 T 180 120"
                stroke="white"
                strokeWidth="5"
                strokeLinecap="round"
                fill="none"
                opacity="0.25"
              />
            </svg>

            {/* Inner shadow for 3D sphere curvature */}
            <div className="absolute inset-0 rounded-full shadow-[inset_-25px_-25px_50px_rgba(0,0,0,0.85),inset_10px_10px_30px_rgba(56,189,248,0.4)] pointer-events-none"></div>

            {/* Orbiting Satellite / Node indicator */}
            <div className="absolute top-4 right-8 w-2 h-2 bg-white rounded-full shadow-[0_0_8px_#ffffff] animate-ping"></div>
          </div>

          {/* Exterior orbital telemetry rings */}
          <div className="absolute w-[240px] md:w-[320px] h-[100px] border border-cyan-400/25 rounded-[50%] -rotate-12 pointer-events-none animate-pulse"></div>
          <div className="absolute w-[280px] md:w-[380px] h-[120px] border border-dashed border-purple-500/20 rounded-[50%] rotate-20 pointer-events-none"></div>
        </div>

        {/* Section Headings */}
        <div className="space-y-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-mono uppercase tracking-widest">
            <Globe className="w-3.5 h-3.5" />
            <span>TERRE &amp; UNIVERS IMUIA — ORBITE GÉOSTATIONNAIRE</span>
          </div>

          <h2 className="text-3xl md:text-5xl font-black font-orbitron uppercase text-white tracking-tight leading-tight">
            {t.partnerSubtitle}
          </h2>

          <p className="text-base md:text-lg text-gray-300 font-light leading-relaxed max-w-2xl mx-auto">
            {t.partnerIntro}
          </p>
        </div>

        {/* The 4 Action Buttons as requested in prompt */}
        <div className="flex flex-wrap justify-center items-center gap-4 max-w-4xl mx-auto pt-4">
          {/* Button 1: Présenter mon projet */}
          <button
            onClick={() => handleAction('project')}
            onMouseEnter={() => playSound('hover')}
            className="flex items-center space-x-2.5 px-6 py-4 bg-purple-600 hover:bg-purple-500 text-white font-orbitron font-bold text-xs md:text-sm tracking-wider uppercase rounded-full transition-all duration-300 shadow-[0_0_20px_rgba(168,85,247,0.4)] hover:shadow-[0_0_30px_rgba(168,85,247,0.7)] cursor-none hover:translate-y-[-2px]"
          >
            <Rocket className="w-4 h-4" />
            <span>{t.presentProject}</span>
          </button>

          {/* Button 2: Devenir partenaire */}
          <button
            onClick={() => handleAction('partner')}
            onMouseEnter={() => playSound('hover')}
            className="flex items-center space-x-2.5 px-6 py-4 bg-cyan-600 hover:bg-cyan-500 text-white font-orbitron font-bold text-xs md:text-sm tracking-wider uppercase rounded-full transition-all duration-300 shadow-[0_0_20px_rgba(6,182,212,0.4)] hover:shadow-[0_0_30px_rgba(6,182,212,0.7)] cursor-none hover:translate-y-[-2px]"
          >
            <Handshake className="w-4 h-4" />
            <span>{t.becomePartner}</span>
          </button>

          {/* Button 3: Investir dans un univers */}
          <button
            onClick={() => handleAction('invest')}
            onMouseEnter={() => playSound('hover')}
            className="flex items-center space-x-2.5 px-6 py-4 bg-white/10 hover:bg-white/20 text-white border border-white/20 hover:border-purple-400 font-orbitron font-bold text-xs md:text-sm tracking-wider uppercase rounded-full transition-all duration-300 shadow-lg cursor-none hover:translate-y-[-2px]"
          >
            <TrendingUp className="w-4 h-4 text-purple-400" />
            <span>{t.investUniverse}</span>
          </button>

          {/* Button 4: Contacter IMUIA */}
          <button
            onClick={() => handleAction('contact')}
            onMouseEnter={() => playSound('hover')}
            className="flex items-center space-x-2.5 px-6 py-4 bg-white/5 hover:bg-purple-600/20 text-gray-200 hover:text-white border border-white/10 hover:border-purple-500 font-orbitron font-bold text-xs md:text-sm tracking-wider uppercase rounded-full transition-all duration-300 cursor-none hover:translate-y-[-2px]"
          >
            <Mail className="w-4 h-4 text-cyan-400" />
            <span>{t.contactUs}</span>
          </button>
        </div>

        {/* Transmission reassurance telemetry */}
        <div className="pt-8 border-t border-white/5 flex flex-wrap items-center justify-center gap-6 text-xs font-mono text-gray-500">
          <span className="flex items-center space-x-2">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            <span>Réponse garantie sous 48h par l'état-major IMUIA</span>
          </span>
          <span className="hidden sm:inline text-gray-700">•</span>
          <span>Protocole de confidentialité NDA sécurisé</span>
          <span className="hidden sm:inline text-gray-700">•</span>
          <span>Bureaux à Paris, Cannes, Casablanca &amp; Antananarivo</span>
        </div>

      </div>
    </section>
  );
};
