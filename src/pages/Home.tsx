import React from 'react';
import { useAppState } from '../data/useAppState';
import { translations } from '../data/translations';
import { ArrowRight, Compass, Shield, Rocket, Activity, Mail, Sparkles, Handshake, DollarSign, Send } from 'lucide-react';

export const Home: React.FC = () => {
  const { language, playSound, setActiveSection } = useAppState();
  const t = translations[language];

  const handleCTA = (section: string) => {
    setActiveSection(section);
    playSound('space');
  };

  const handleContactIntent = (partnerType: string, intentTopic: string) => {
    try {
      sessionStorage.setItem('imuia_intent_type', partnerType);
      sessionStorage.setItem('imuia_intent_topic', intentTopic);
    } catch {
      // ignore storage access issues
    }
    setActiveSection('partners');
    playSound('space');
  };

  return (
    <div className="relative min-h-[calc(100vh-80px)] flex flex-col items-center justify-center py-12 px-4 overflow-hidden">
      {/* Background atmosphere elements */}
      <div className="absolute inset-0 stars-bg opacity-40 pointer-events-none"></div>

      {/* Pulsing and drifting Nebulae */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full nebula-purple blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full nebula-cyan blur-3xl pointer-events-none"></div>

      <div className="max-w-4xl mx-auto text-center z-10 space-y-12">
        {/* Central Planetary Station "IMUIA" sphere */}
        <div className="relative flex justify-center mb-6">
          <div className="absolute inset-0 m-auto w-48 h-48 bg-purple-600/20 rounded-full blur-3xl animate-pulse"></div>

          {/* Main Station Spherical Object */}
          <div className="relative w-40 h-40 rounded-full border border-purple-500/30 flex items-center justify-center bg-gradient-to-tr from-purple-900/60 to-black p-1 shadow-[0_0_50px_rgba(168,85,247,0.3)] hover:scale-105 transition-transform duration-500">
            {/* Holographic orbital ring */}
            <div className="absolute w-52 h-16 border-t border-b border-cyan-400/30 rounded-[50%] rotate-12 animate-pulse"></div>
            <div className="absolute w-52 h-16 border-l border-r border-purple-500/20 rounded-[50%] -rotate-45 animate-pulse"></div>

            {/* Spinning network nodes */}
            <div className="absolute w-full h-full rounded-full border border-dashed border-cyan-400/40 animate-orbit"></div>

            <div className="text-center">
              <span className="block font-orbitron font-black text-4xl tracking-widest text-white glow-text-purple">
                {t.brand}
              </span>
              <span className="block text-[8px] tracking-wider uppercase text-cyan-400 font-mono mt-1">
                Core Command v1.0
              </span>
            </div>

            {/* Miniature satellite nodes */}
            <div className="absolute -top-1 -left-1 w-3 h-3 bg-cyan-400 rounded-full animate-ping"></div>
            <div className="absolute -bottom-1 -right-1 w-2.5 h-2.5 bg-purple-500 rounded-full"></div>
          </div>
        </div>

        {/* Headings */}
        <div className="space-y-4">
          <h2 className="text-sm font-orbitron font-bold text-cyan-400 tracking-widest uppercase flex items-center justify-center space-x-2">
            <Activity className="w-4 h-4 animate-pulse" />
            <span>{t.tagline}</span>
          </h2>
          <h1 className="text-4xl md:text-6xl font-black font-orbitron text-white tracking-tight leading-tight uppercase">
            {t.introTitle}
          </h1>
          <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed font-light">
            {t.introText}
          </p>
        </div>

        {/* High-end Glowing Rounded Action Buttons */}
        <div className="flex flex-wrap justify-center gap-4 pt-4 max-w-3xl mx-auto">
          <button
            onClick={() => handleCTA('universe')}
            onMouseEnter={() => playSound('hover')}
            className="flex items-center space-x-2.5 px-7 py-4 bg-purple-600 hover:bg-purple-500 text-white font-orbitron font-bold text-sm tracking-widest rounded-full transition-all duration-300 shadow-[0_0_20px_rgba(168,85,247,0.4)] hover:shadow-[0_0_30px_rgba(168,85,247,0.6)] cursor-none hover:translate-y-[-2px]"
          >
            <Compass className="w-4 h-4" />
            <span>{t.exploreUniverse}</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <button
            onClick={() => handleCTA('platforms')}
            onMouseEnter={() => playSound('hover')}
            className="flex items-center space-x-2.5 px-7 py-4 bg-white/5 hover:bg-purple-500/10 text-white hover:text-purple-300 font-orbitron font-bold text-sm tracking-widest rounded-full border border-white/10 hover:border-purple-500/50 transition-all duration-300 cursor-none hover:translate-y-[-2px]"
          >
            <Shield className="w-4 h-4" />
            <span>{t.discoverPlatforms}</span>
          </button>

          <button
            onClick={() => handleCTA('partners')}
            onMouseEnter={() => playSound('hover')}
            className="flex items-center space-x-2.5 px-7 py-4 bg-white/5 hover:bg-purple-500/10 text-white hover:text-purple-300 font-orbitron font-bold text-sm tracking-widest rounded-full border border-white/10 hover:border-purple-500/50 transition-all duration-300 cursor-none hover:translate-y-[-2px]"
          >
            <Rocket className="w-4 h-4" />
            <span>{t.proposePartnership}</span>
          </button>

          <button
            onClick={() => {
              const el = document.getElementById('contact-section');
              if (el) {
                el.scrollIntoView({ behavior: 'smooth' });
                playSound('space');
              } else {
                handleCTA('contact');
              }
            }}
            onMouseEnter={() => playSound('hover')}
            className="flex items-center space-x-2.5 px-7 py-4 bg-white/5 hover:bg-cyan-500/10 text-white hover:text-cyan-300 font-orbitron font-bold text-sm tracking-widest rounded-full border border-white/10 hover:border-cyan-500/50 transition-all duration-300 cursor-none hover:translate-y-[-2px]"
          >
            <Mail className="w-4 h-4" />
            <span>{t.contactUs}</span>
          </button>
        </div>

        {/* Digital Hud Footer Stat indicators */}
        <div className="pt-8 border-t border-white/5 grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          <div className="glass-panel p-4 rounded-xl">
            <div className="text-2xl font-black font-orbitron text-purple-400">12</div>
            <div className="text-[10px] text-gray-400 font-mono tracking-widest uppercase">PLATEFORMES ACTIVES</div>
          </div>
          <div className="glass-panel p-4 rounded-xl">
            <div className="text-2xl font-black font-orbitron text-cyan-400">6</div>
            <div className="text-[10px] text-gray-400 font-mono tracking-widest uppercase">GALAXIES MÉTIERS</div>
          </div>
          <div className="glass-panel p-4 rounded-xl">
            <div className="text-2xl font-black font-orbitron text-pink-400">3+</div>
            <div className="text-[10px] text-gray-400 font-mono tracking-widest uppercase">PAYS DE DÉPLOIEMENT</div>
          </div>
          <div className="glass-panel p-4 rounded-xl">
            <div className="text-2xl font-black font-orbitron text-green-400">100%</div>
            <div className="text-[10px] text-gray-400 font-mono tracking-widest uppercase">INNOVATION LABS</div>
          </div>
        </div>
      </div>

      {/* FINAL CONTACT SECTION: EARTH VIEW FROM SPACE */}
      <section
        id="contact-section"
        className="w-full max-w-5xl mx-auto mt-28 mb-8 z-10 glass-panel p-8 md:p-14 rounded-3xl border border-cyan-500/30 relative overflow-hidden text-center space-y-10 shadow-[0_0_60px_rgba(34,211,238,0.15)]"
      >
        {/* Ambient atmospheric glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-cyan-600/10 rounded-full blur-3xl pointer-events-none"></div>

        {/* 3D-styled Earth / Planet View from Space */}
        <div className="relative flex justify-center items-center">
          {/* External Atmosphere Halo */}
          <div className="w-48 h-48 md:w-56 md:h-56 rounded-full relative p-1 flex items-center justify-center">
            {/* Pulsing deep space aurora */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-blue-600/40 via-cyan-400/20 to-purple-600/40 blur-xl animate-pulse"></div>

            {/* Earth Sphere representation */}
            <div className="relative w-full h-full rounded-full overflow-hidden border border-cyan-400/50 shadow-[inset_0_0_40px_rgba(0,0,0,0.8),0_0_30px_rgba(34,211,238,0.4)] bg-gradient-to-br from-[#0c2e59] via-[#091b36] to-[#020617]">
              {/* Rotating Continental Silhouette Layer SVG */}
              <svg
                viewBox="0 0 200 200"
                className="w-full h-full opacity-70 animate-spin-slow"
                style={{ animationDuration: '45s' }}
              >
                {/* Simulated continents / islands */}
                <path
                  d="M40,70 Q60,40 90,50 Q110,60 130,45 Q150,70 140,100 Q120,120 90,110 Q60,115 45,95 Z"
                  fill="#10b981"
                  opacity="0.35"
                />
                <path
                  d="M110,120 Q130,100 160,115 Q170,140 150,165 Q125,175 110,150 Z"
                  fill="#065f46"
                  opacity="0.4"
                />
                <path
                  d="M60,130 Q80,125 85,150 Q75,170 50,160 Z"
                  fill="#047857"
                  opacity="0.35"
                />
                {/* Cloud bands */}
                <ellipse cx="100" cy="80" rx="75" ry="12" fill="#ffffff" opacity="0.15" />
                <ellipse cx="90" cy="130" rx="65" ry="10" fill="#ffffff" opacity="0.12" />
              </svg>

              {/* Day / Night Atmospheric Shadow terminator */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-black/40 to-black/85 pointer-events-none"></div>

              {/* Specular curved reflection */}
              <div className="absolute top-2 left-6 w-20 h-10 bg-white/20 rounded-full blur-md -rotate-30 pointer-events-none"></div>
            </div>

            {/* Orbiting Station / Satellite Beacon */}
            <div className="absolute inset-0 flex items-center justify-center animate-orbit">
              <div className="w-2.5 h-2.5 bg-cyan-400 rounded-full shadow-[0_0_12px_#22d3ee] animate-ping"></div>
            </div>
            <div className="absolute inset-[-12px] rounded-full border border-dashed border-cyan-400/30 animate-orbit-reverse pointer-events-none"></div>
          </div>
        </div>

        {/* Section Heading & Texts */}
        <div className="space-y-4 max-w-2xl mx-auto">
          <span className="inline-flex items-center space-x-2 text-xs font-mono font-bold tracking-widest text-cyan-400 uppercase bg-cyan-400/10 px-3 py-1 rounded-full border border-cyan-400/20">
            <Sparkles className="w-3.5 h-3.5 animate-pulse" />
            <span>TRANSMISSION ORBITALE ACTIVE</span>
          </span>

          <h2 className="text-3xl md:text-5xl font-black font-orbitron text-white uppercase tracking-tight leading-tight">
            {t.contactTitle}
          </h2>

          <p className="text-base md:text-lg text-gray-300 leading-relaxed font-light">
            {t.contactIntro}
          </p>
        </div>

        {/* 4 Interactive Buttons required by specification */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-4xl mx-auto pt-2">
          {/* Button 1: Présenter mon projet */}
          <button
            onClick={() => handleContactIntent('Creator', 'Présentation de projet')}
            onMouseEnter={() => playSound('hover')}
            className="flex items-center justify-center space-x-2 px-5 py-4 rounded-2xl bg-purple-600 hover:bg-purple-500 text-white font-orbitron font-bold text-xs tracking-wider uppercase transition-all duration-300 shadow-[0_0_20px_rgba(168,85,247,0.35)] cursor-none hover:translate-y-[-2px]"
          >
            <Rocket className="w-4 h-4 flex-shrink-0" />
            <span>{t.presentProject}</span>
          </button>

          {/* Button 2: Devenir partenaire */}
          <button
            onClick={() => handleContactIntent('Operator', 'Partenariat opérationnel')}
            onMouseEnter={() => playSound('hover')}
            className="flex items-center justify-center space-x-2 px-5 py-4 rounded-2xl bg-white/5 hover:bg-purple-500/20 text-white hover:text-purple-300 border border-white/10 hover:border-purple-500/50 font-orbitron font-bold text-xs tracking-wider uppercase transition-all duration-300 cursor-none hover:translate-y-[-2px]"
          >
            <Handshake className="w-4 h-4 flex-shrink-0" />
            <span>{t.becomePartner}</span>
          </button>

          {/* Button 3: Investir dans un univers */}
          <button
            onClick={() => handleContactIntent('Investor', 'Investissement dans un univers')}
            onMouseEnter={() => playSound('hover')}
            className="flex items-center justify-center space-x-2 px-5 py-4 rounded-2xl bg-white/5 hover:bg-cyan-500/20 text-white hover:text-cyan-300 border border-white/10 hover:border-cyan-500/50 font-orbitron font-bold text-xs tracking-wider uppercase transition-all duration-300 cursor-none hover:translate-y-[-2px]"
          >
            <DollarSign className="w-4 h-4 flex-shrink-0" />
            <span>{t.investUniverse}</span>
          </button>

          {/* Button 4: Contacter IMUIA / Nous contacter */}
          <button
            onClick={() => handleContactIntent('Other', 'Prise de contact directe')}
            onMouseEnter={() => playSound('hover')}
            className="flex items-center justify-center space-x-2 px-5 py-4 rounded-2xl bg-cyan-600 hover:bg-cyan-500 text-white font-orbitron font-bold text-xs tracking-wider uppercase transition-all duration-300 shadow-[0_0_20px_rgba(34,211,238,0.35)] cursor-none hover:translate-y-[-2px]"
          >
            <Send className="w-4 h-4 flex-shrink-0" />
            <span>{t.contactCrew}</span>
          </button>
        </div>

        {/* Transmission metadata indicator */}
        <div className="pt-6 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between text-xs font-mono text-gray-500 gap-2">
          <span>// EARTH RELAY NODE: ACTIVE</span>
          <span className="text-cyan-400">RÉPONSE ASSURÉE SOUS 48H PAR L’ÉQUIPAGE</span>
        </div>
      </section>
    </div>
  );
};
