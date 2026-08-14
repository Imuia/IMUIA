import React from 'react';
import { useAppState } from '../data/AppState';
import { translations } from '../data/translations';
import { Mail, Globe, Sparkles, Shield, Rocket, ArrowRight } from 'lucide-react';

export const Contact: React.FC = () => {
  const { language, playSound, setActiveSection } = useAppState();
  const t = translations[language];

  const handleAction = (intent: 'project' | 'partner' | 'invest' | 'contact') => {
    playSound('space');
    sessionStorage.setItem('partnershipIntent', intent);
    setActiveSection('partners');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div id="contact-section" className="relative py-16 px-4 space-y-12 overflow-hidden w-full">
      {/* Space stars overlay */}
      <div className="absolute inset-0 stars-bg opacity-30 pointer-events-none"></div>

      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">

        {/* Left: 3D-styled Earth Planet with Custom SVG and CSS Glow Effects */}
        <div className="lg:col-span-6 flex flex-col items-center justify-center relative select-none">
          <div className="absolute inset-0 m-auto w-80 h-80 bg-purple-600/10 rounded-full blur-3xl pointer-events-none"></div>
          <div className="absolute inset-0 m-auto w-64 h-64 bg-cyan-500/10 rounded-full blur-2xl pointer-events-none"></div>

          {/* Interactive SVG Earth Wrapper */}
          <div className="relative w-72 h-72 md:w-80 md:h-80 flex items-center justify-center transition-all duration-700 hover:scale-105">
            {/* Holographic atmospheric outer ring */}
            <div className="absolute inset-0 rounded-full border border-purple-500/20 animate-orbit"></div>
            <div className="absolute -inset-4 rounded-full border border-dashed border-cyan-400/10 animate-orbit-reverse"></div>

            {/* Orbiting Spacecraft / Satellite */}
            <div className="absolute w-full h-full animate-orbit">
              <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-purple-500 rounded-full flex items-center justify-center border-2 border-white shadow-[0_0_12px_#aa3bff] animate-pulse">
                <Rocket className="w-2 h-2 text-white" />
              </div>
            </div>

            {/* Glowing Neon Halo */}
            <div className="absolute inset-2 rounded-full shadow-[0_0_40px_rgba(34,211,238,0.25)] border-2 border-cyan-400/30"></div>
            <div className="absolute inset-2 rounded-full shadow-[inset_0_0_30px_rgba(168,85,247,0.3)] border-2 border-purple-500/10"></div>

            {/* The SVG Globe */}
            <svg
              viewBox="0 0 200 200"
              className="w-full h-full rounded-full bg-slate-950 shadow-[0_0_50px_rgba(168,85,247,0.2)]"
            >
              <defs>
                {/* Spherical shadow projection */}
                <radialGradient id="atmosphere" cx="50%" cy="50%" r="50%" fx="30%" fy="30%">
                  <stop offset="0%" stopColor="#22d3ee" stopOpacity="0.4" />
                  <stop offset="40%" stopColor="#0284c7" stopOpacity="0.2" />
                  <stop offset="85%" stopColor="#0f172a" stopOpacity="0.8" />
                  <stop offset="100%" stopColor="#03000a" stopOpacity="1" />
                </radialGradient>

                {/* 3D shading layer */}
                <radialGradient id="sphere-shade" cx="40%" cy="40%" r="60%">
                  <stop offset="0%" stopColor="#ffffff" stopOpacity="0.15" />
                  <stop offset="50%" stopColor="#000000" stopOpacity="0" />
                  <stop offset="100%" stopColor="#000000" stopOpacity="0.85" />
                </radialGradient>

                {/* Continent color */}
                <linearGradient id="continent-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#a855f7" />
                  <stop offset="50%" stopColor="#3b82f6" />
                  <stop offset="100%" stopColor="#06b6d4" />
                </linearGradient>

                {/* Mask to clip continents onto the spherical sphere */}
                <clipPath id="globe-clip">
                  <circle cx="100" cy="100" r="94" />
                </clipPath>
              </defs>

              {/* Base Planet Background */}
              <circle cx="100" cy="100" r="94" fill="#050515" />

              {/* Grid / Latitude-Longitude lines */}
              <g clipPath="url(#globe-clip)" opacity="0.15">
                <circle cx="100" cy="100" r="94" fill="none" stroke="#22d3ee" strokeWidth="1" />
                <line x1="100" y1="6" x2="100" y2="194" stroke="#22d3ee" strokeWidth="0.5" />
                <line x1="6" y1="100" x2="194" y2="100" stroke="#22d3ee" strokeWidth="0.5" />
                <ellipse cx="100" cy="100" rx="94" ry="40" fill="none" stroke="#22d3ee" strokeWidth="0.5" />
                <ellipse cx="100" cy="100" rx="94" ry="70" fill="none" stroke="#22d3ee" strokeWidth="0.5" />
                <ellipse cx="100" cy="100" rx="40" ry="94" fill="none" stroke="#22d3ee" strokeWidth="0.5" />
                <ellipse cx="100" cy="100" rx="70" ry="94" fill="none" stroke="#22d3ee" strokeWidth="0.5" />
              </g>

              {/* Moving Continents (Stylized geometric curves mimicking Earth landmasses) */}
              <g clipPath="url(#globe-clip)">
                {/* Wrapping in an animated element to rotate left-to-right simulating Earth rotation */}
                <g className="animate-pulse duration-1000">
                  {/* Continent Shape A (Europe / Africa lookalike) */}
                  <path
                    d="M70,30 C90,20 110,35 115,50 C120,65 105,80 110,105 C115,130 95,160 85,170 C75,180 65,165 70,140 C75,115 55,95 50,80 C45,65 50,40 70,30 Z"
                    fill="url(#continent-grad)"
                    opacity="0.75"
                  />
                  {/* Continent Shape B (Americas lookalike) */}
                  <path
                    d="M135,40 C145,35 155,50 160,70 C165,90 150,110 155,130 C160,150 145,175 135,160 C125,145 130,130 120,110 C110,90 125,45 135,40 Z"
                    fill="url(#continent-grad)"
                    opacity="0.65"
                  />
                  {/* Island clusters */}
                  <circle cx="125" cy="155" r="4" fill="#06b6d4" opacity="0.8" />
                  <circle cx="105" cy="150" r="3" fill="#a855f7" opacity="0.8" />
                  <circle cx="85" cy="65" r="5" fill="#3b82f6" opacity="0.8" />
                  <circle cx="140" cy="80" r="4.5" fill="#a855f7" opacity="0.8" />
                </g>
              </g>

              {/* Spherical Shadow overlay to give depth */}
              <circle cx="100" cy="100" r="94" fill="url(#sphere-shade)" />

              {/* Glowing atmosphere layer */}
              <circle cx="100" cy="100" r="94" fill="url(#atmosphere)" style={{ mixBlendMode: 'screen' }} />
            </svg>

            {/* Glowing Beacons representing IMUIA global hubs on the 3D-globe */}
            <div className="absolute top-[35%] left-[45%] w-3 h-3 bg-cyan-400 rounded-full border-2 border-white shadow-[0_0_12px_#22d3ee] animate-ping"></div>
            <div className="absolute top-[48%] left-[51%] w-2 h-2 bg-purple-500 rounded-full border-2 border-white shadow-[0_0_10px_#a855f7]"></div>
            <div className="absolute top-[68%] left-[48%] w-2.5 h-2.5 bg-amber-400 rounded-full border-2 border-white shadow-[0_0_10px_#fbbf24] animate-pulse"></div>
          </div>

          <div className="mt-4 flex items-center space-x-2 text-xs font-mono text-gray-500">
            <Globe className="w-3.5 h-3.5 text-cyan-400 animate-spin-slow" />
            <span>ORBITING LAB BASE "EARTH" PRE-COLLISION PREVENTED</span>
          </div>
        </div>

        {/* Right: Immersive Contact Card & Call-to-actions */}
        <div className="lg:col-span-6 text-left space-y-6">
          <div className="space-y-3">
            <h2 className="text-xs font-orbitron font-bold text-purple-400 tracking-widest uppercase flex items-center space-x-2">
              <Sparkles className="w-4 h-4 text-purple-400 animate-pulse" />
              <span>{language === 'fr' ? 'ENTRER EN ORBITE' : 'ENTER ORBIT'}</span>
            </h2>
            <h1 className="text-3xl md:text-4xl font-black font-orbitron uppercase text-white leading-tight">
              {t.partnerSubtitle}
            </h1>
            <p className="text-sm md:text-base text-gray-300 leading-relaxed font-light max-w-xl">
              {language === 'fr'
                ? "Projet innovant, partenariat, investissement ou proposition de collaboration : entrez en contact avec l’équipage IMUIA."
                : "Innovative project, partnership, investment, or collaboration proposal: contact the IMUIA crew."}
            </p>
          </div>

          {/* The Four High-End Call-to-Action Buttons */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">

            {/* Button 1: Présenter mon projet */}
            <button
              onClick={() => handleAction('project')}
              onMouseEnter={() => playSound('hover')}
              className="flex items-center justify-between p-4 bg-white/5 hover:bg-purple-600/10 text-white hover:text-purple-300 rounded-2xl border border-white/10 hover:border-purple-500/50 transition-all duration-300 cursor-none group text-left"
            >
              <div className="flex items-center space-x-3">
                <div className="p-2.5 bg-purple-500/10 rounded-xl group-hover:bg-purple-500/20 transition-colors">
                  <Rocket className="w-5 h-5 text-purple-400" />
                </div>
                <div>
                  <span className="block text-sm font-bold font-orbitron uppercase tracking-wider">{t.presentProject}</span>
                  <span className="block text-[10px] text-gray-400 font-mono">{language === 'fr' ? 'Pitcher un concept' : 'Pitch a concept'}</span>
                </div>
              </div>
              <ArrowRight className="w-4 h-4 text-gray-500 group-hover:text-purple-400 group-hover:translate-x-1 transition-all" />
            </button>

            {/* Button 2: Devenir partenaire */}
            <button
              onClick={() => handleAction('partner')}
              onMouseEnter={() => playSound('hover')}
              className="flex items-center justify-between p-4 bg-white/5 hover:bg-cyan-600/10 text-white hover:text-cyan-300 rounded-2xl border border-white/10 hover:border-cyan-500/50 transition-all duration-300 cursor-none group text-left"
            >
              <div className="flex items-center space-x-3">
                <div className="p-2.5 bg-cyan-500/10 rounded-xl group-hover:bg-cyan-500/20 transition-colors">
                  <Shield className="w-5 h-5 text-cyan-400" />
                </div>
                <div>
                  <span className="block text-sm font-bold font-orbitron uppercase tracking-wider">{t.becomePartner}</span>
                  <span className="block text-[10px] text-gray-400 font-mono">{language === 'fr' ? 'Synergie & opérations' : 'Synergy & operations'}</span>
                </div>
              </div>
              <ArrowRight className="w-4 h-4 text-gray-500 group-hover:text-cyan-400 group-hover:translate-x-1 transition-all" />
            </button>

            {/* Button 3: Investir dans un univers */}
            <button
              onClick={() => handleAction('invest')}
              onMouseEnter={() => playSound('hover')}
              className="flex items-center justify-between p-4 bg-white/5 hover:bg-pink-600/10 text-white hover:text-pink-300 rounded-2xl border border-white/10 hover:border-pink-500/50 transition-all duration-300 cursor-none group text-left"
            >
              <div className="flex items-center space-x-3">
                <div className="p-2.5 bg-pink-500/10 rounded-xl group-hover:bg-pink-500/20 transition-colors">
                  <Globe className="w-5 h-5 text-pink-400" />
                </div>
                <div>
                  <span className="block text-sm font-bold font-orbitron uppercase tracking-wider">{t.investUniverse}</span>
                  <span className="block text-[10px] text-gray-400 font-mono">{language === 'fr' ? 'Co-financement spatial' : 'Space co-financing'}</span>
                </div>
              </div>
              <ArrowRight className="w-4 h-4 text-gray-500 group-hover:text-pink-400 group-hover:translate-x-1 transition-all" />
            </button>

            {/* Button 4: Contacter IMUIA */}
            <button
              onClick={() => handleAction('contact')}
              onMouseEnter={() => playSound('hover')}
              className="flex items-center justify-between p-4 bg-white/5 hover:bg-amber-600/10 text-white hover:text-amber-300 rounded-2xl border border-white/10 hover:border-amber-500/50 transition-all duration-300 cursor-none group text-left"
            >
              <div className="flex items-center space-x-3">
                <div className="p-2.5 bg-amber-500/10 rounded-xl group-hover:bg-amber-500/20 transition-colors">
                  <Mail className="w-5 h-5 text-amber-400" />
                </div>
                <div>
                  <span className="block text-sm font-bold font-orbitron uppercase tracking-wider">{language === 'fr' ? 'Contacter IMUIA' : 'Contact IMUIA'}</span>
                  <span className="block text-[10px] text-gray-400 font-mono">{language === 'fr' ? 'Demande générale' : 'General request'}</span>
                </div>
              </div>
              <ArrowRight className="w-4 h-4 text-gray-500 group-hover:text-amber-400 group-hover:translate-x-1 transition-all" />
            </button>

          </div>

          <div className="pt-4 border-t border-white/5 flex flex-wrap gap-x-6 gap-y-2 text-xs font-mono text-gray-400">
            <div>
              <span className="text-purple-400">EMAIL:</span> crew@imuia.com
            </div>
            <div>
              <span className="text-cyan-400">ACCORD:</span> GDPR Compliant
            </div>
            <div>
              <span className="text-pink-400">ORBIT:</span> Earth-Station Core
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
