import React from 'react';
import { useAppState } from '../data/useAppState';
import { translations } from '../data/translations';
import { Compass, Lightbulb, CheckCircle2, Navigation, Layers } from 'lucide-react';

export const VisionMethod: React.FC = () => {
  const { language, playSound } = useAppState();
  const t = translations[language];

  const pillars = [
    { title: t.pillar1Title, desc: t.pillar1Desc },
    { title: t.pillar2Title, desc: t.pillar2Desc },
    { title: t.pillar3Title, desc: t.pillar3Desc },
    { title: t.pillar4Title, desc: t.pillar4Desc },
    { title: t.pillar5Title, desc: t.pillar5Desc },
    { title: t.pillar6Title, desc: t.pillar6Desc },
    { title: t.pillar7Title, desc: t.pillar7Desc },
  ];

  const methodSteps = [
    { name: t.methodStep1, desc: t.methodStep1Desc },
    { name: t.methodStep2, desc: t.methodStep2Desc },
    { name: t.methodStep3, desc: t.methodStep3Desc },
    { name: t.methodStep4, desc: t.methodStep4Desc },
    { name: t.methodStep5, desc: t.methodStep5Desc },
    { name: t.methodStep6, desc: t.methodStep6Desc },
    { name: t.methodStep7, desc: t.methodStep7Desc },
    { name: t.methodStep8, desc: t.methodStep8Desc },
    { name: t.methodStep9, desc: t.methodStep9Desc },
  ];

  return (
    <div className="relative min-h-[calc(100vh-80px)] py-12 px-4 space-y-16">
      <div className="absolute inset-0 stars-bg opacity-30 pointer-events-none"></div>

      {/* Vision Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4 relative z-10">
        <h2 className="text-xs font-orbitron font-bold text-purple-400 tracking-widest uppercase flex items-center justify-center space-x-2">
          <Compass className="w-4 h-4" />
          <span>IMUIA Core Philosophy</span>
        </h2>
        <h1 className="text-3xl md:text-5xl font-black font-orbitron uppercase text-white leading-tight">
          {t.visionTitle}
        </h1>
        <p className="text-base text-gray-300 leading-relaxed font-light max-w-2xl mx-auto">
          {t.visionIntro}
        </p>
      </div>

      {/* Pillars Section */}
      <div className="max-w-6xl mx-auto space-y-8 relative z-10">
        <div className="flex items-center space-x-3 border-b border-white/10 pb-4">
          <Lightbulb className="w-5 h-5 text-amber-400" />
          <h3 className="text-xl font-orbitron font-bold text-white uppercase tracking-wider">
            Les 7 Piliers Fondateurs
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 text-left">
          {pillars.map((pil, idx) => (
            <div
              key={idx}
              onMouseEnter={() => playSound('hover')}
              className="glass-panel p-6 rounded-2xl border border-white/5 hover:border-purple-500/40 transition-all duration-300"
            >
              <div className="flex items-start space-x-3">
                <CheckCircle2 className="w-5 h-5 text-purple-400 flex-shrink-0 mt-0.5" />
                <div className="space-y-1.5">
                  <h4 className="font-orbitron font-bold text-white text-sm">
                    {pil.title}
                  </h4>
                  <p className="text-xs text-gray-400 leading-relaxed">
                    {pil.desc}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Creation Method Space Voyage Timeline */}
      <div className="max-w-6xl mx-auto space-y-10 relative z-10">
        <div className="flex items-center space-x-3 border-b border-white/10 pb-4">
          <Navigation className="w-5 h-5 text-cyan-400" />
          <h3 className="text-xl font-orbitron font-bold text-white uppercase tracking-wider">
            {t.methodTitle}
          </h3>
        </div>

        <div className="relative border-l-2 border-purple-500/30 ml-4 md:ml-8 space-y-8 pl-6 md:pl-8 text-left">
          {methodSteps.map((step, idx) => (
            <div
              key={idx}
              onMouseEnter={() => playSound('hover')}
              className="relative group"
            >
              {/* Orbital Station Node Dot */}
              <div className="absolute -left-[31px] md:-left-[39px] top-1.5 w-4 h-4 rounded-full bg-purple-600 border-2 border-black group-hover:scale-125 group-hover:bg-cyan-400 transition-all shadow-[0_0_10px_rgba(168,85,247,0.5)]"></div>

              <div className="glass-panel p-5 rounded-2xl border border-white/5 group-hover:border-purple-500/30 transition-all">
                <div className="flex items-center space-x-3">
                  <span className="text-[10px] font-mono bg-purple-500/20 text-purple-300 px-2 py-0.5 rounded font-bold">
                    STEP 0{idx + 1}
                  </span>
                  <h4 className="font-orbitron font-bold text-white text-base">
                    {step.name}
                  </h4>
                </div>
                <p className="text-xs text-gray-400 mt-2 leading-relaxed">
                  {step.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Closing badge */}
      <div className="max-w-3xl mx-auto glass-panel p-6 rounded-2xl border border-cyan-500/20 text-center space-y-2 relative z-10">
        <Layers className="w-6 h-6 text-cyan-400 mx-auto" />
        <h4 className="font-orbitron font-bold text-white text-sm">
          Écosystème Évolutif &amp; Modulaire
        </h4>
        <p className="text-xs text-gray-400">
          Chaque planète-service IMUIA est interconnectée à notre Core Command central, garantissant un déploiement fluide de l'innovation.
        </p>
      </div>
    </div>
  );
};
