import React, { useState, useEffect } from 'react';
import { useAppState } from '../data/useAppState';
import { translations } from '../data/translations';
import { Compass, Sparkles, Map, Network, ShieldCheck, Milestone, Orbit, Star } from 'lucide-react';

interface VisionMethodProps {
  initialTab?: 'vision' | 'method';
}

export const VisionMethod: React.FC<VisionMethodProps> = ({ initialTab = 'vision' }) => {
  const { language, playSound } = useAppState();
  const t = translations[language];

  const [currentTab, setCurrentTab] = useState<'vision' | 'method'>(initialTab);
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    setCurrentTab(initialTab);
  }, [initialTab]);

  const pillars = [
    { title: t.pillar1Title, desc: t.pillar1Desc, icon: Compass },
    { title: t.pillar2Title, desc: t.pillar2Desc, icon: ShieldCheck },
    { title: t.pillar3Title, desc: t.pillar3Desc, icon: Network },
    { title: t.pillar4Title, desc: t.pillar4Desc, icon: Star },
    { title: t.pillar5Title, desc: t.pillar5Desc, icon: Map },
    { title: t.pillar6Title, desc: t.pillar6Desc, icon: Sparkles },
    { title: t.pillar7Title, desc: t.pillar7Desc, icon: Orbit }
  ];

  const methodSteps = [
    { label: t.methodStep1, desc: t.methodStep1Desc, coord: "COORD: X-104 Y-88" },
    { label: t.methodStep2, desc: t.methodStep2Desc, coord: "COORD: X-230 Y-12" },
    { label: t.methodStep3, desc: t.methodStep3Desc, coord: "COORD: X-340 Y-19" },
    { label: t.methodStep4, desc: t.methodStep4Desc, coord: "COORD: X-412 Y-50" },
    { label: t.methodStep5, desc: t.methodStep5Desc, coord: "COORD: X-580 Y-10" },
    { label: t.methodStep6, desc: t.methodStep6Desc, coord: "COORD: X-694 Y-15" },
    { label: t.methodStep7, desc: t.methodStep7Desc, coord: "COORD: X-711 Y-35" },
    { label: t.methodStep8, desc: t.methodStep8Desc, coord: "COORD: X-820 Y-82" },
    { label: t.methodStep9, desc: t.methodStep9Desc, coord: "COORD: X-904 Y-99" }
  ];

  return (
    <div className="relative min-h-[calc(100vh-80px)] py-12 px-4 space-y-12">
      <div className="absolute inset-0 stars-bg opacity-30 pointer-events-none"></div>

      {/* Tab Switcher */}
      <div className="flex justify-center space-x-3 relative z-10">
        <button
          onClick={() => { setCurrentTab('vision'); playSound('click'); }}
          className={`flex items-center space-x-2 px-6 py-2.5 rounded-full text-xs font-orbitron font-bold uppercase tracking-wider transition-all cursor-none ${
            currentTab === 'vision'
              ? 'bg-purple-600 text-white shadow-[0_0_15px_rgba(168,85,247,0.4)]'
              : 'bg-white/5 text-gray-400 hover:text-white hover:bg-white/10'
          }`}
        >
          <Sparkles className="w-4 h-4 text-purple-400" />
          <span>{t.navVision}</span>
        </button>

        <button
          onClick={() => { setCurrentTab('method'); playSound('click'); }}
          className={`flex items-center space-x-2 px-6 py-2.5 rounded-full text-xs font-orbitron font-bold uppercase tracking-wider transition-all cursor-none ${
            currentTab === 'method'
              ? 'bg-cyan-600 text-white shadow-[0_0_15px_rgba(6,182,212,0.4)]'
              : 'bg-white/5 text-gray-400 hover:text-white hover:bg-white/10'
          }`}
        >
          <Milestone className="w-4 h-4 text-cyan-400" />
          <span>{t.navMethod}</span>
        </button>
      </div>

      {/* Vision & Mission segment */}
      {currentTab === 'vision' && (
        <section className="max-w-6xl mx-auto space-y-8 relative z-10 text-left animate-fade-in">
          <div className="text-center max-w-3xl mx-auto space-y-4 mb-10">
            <h2 className="text-xs font-orbitron font-bold text-purple-400 tracking-widest uppercase flex items-center justify-center space-x-2">
              <Sparkles className="w-4 h-4 animate-pulse" />
              <span>{t.navVision}</span>
            </h2>
            <h1 className="text-3xl md:text-5xl font-black font-orbitron text-white uppercase tracking-tight">
              {t.visionTitle}
            </h1>
            <p className="text-sm md:text-base text-gray-400 leading-relaxed font-light">
              {t.visionIntro}
            </p>
          </div>

          {/* Pillars grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {pillars.map((pil, idx) => {
              const Icon = pil.icon;
              return (
                <div
                  key={idx}
                  onMouseEnter={() => playSound('hover')}
                  className="glass-panel p-6 rounded-2xl border border-white/5 hover:border-purple-500/30 transition-all duration-300"
                >
                  <div className="flex items-center space-x-3.5 mb-3">
                    <div className="p-2 rounded-xl bg-purple-500/10 text-purple-400">
                      <Icon className="w-5 h-5" />
                    </div>
                    <h3 className="font-orbitron font-bold text-white text-base">
                      {pil.title}
                    </h3>
                  </div>
                  <p className="text-xs text-gray-400 leading-relaxed font-light">
                    {pil.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </section>
      )}

      {/* Method "Voyage Spatial" segment */}
      {currentTab === 'method' && (
        <section className="max-w-5xl mx-auto space-y-8 relative z-10 text-center animate-fade-in">
          <div className="space-y-3">
            <h2 className="text-xs font-orbitron font-bold text-cyan-400 tracking-widest uppercase flex items-center justify-center space-x-2">
              <Milestone className="w-4 h-4" />
              <span>Processus d'Incubation IMUIA</span>
            </h2>
            <h1 className="text-3xl md:text-4xl font-black font-orbitron text-white uppercase tracking-tight">
              {t.methodTitle}
            </h1>
            <p className="text-xs md:text-sm text-gray-400 max-w-xl mx-auto">
              {t.methodSubtitle} : de la détection de l'opportunité jusqu'au déploiement vers de nouveaux territoires.
            </p>
          </div>

          {/* Space Flight orbital route mapping */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 text-left pt-6">

            {/* Steps selector buttons list */}
            <div className="lg:col-span-1 space-y-2">
              {methodSteps.map((step, idx) => {
                const isActive = activeStep === idx;
                return (
                  <button
                    key={idx}
                    onClick={() => { setActiveStep(idx); playSound('click'); }}
                    className={`w-full flex items-center justify-between p-3 rounded-xl border transition-all text-left cursor-none ${
                      isActive
                        ? 'bg-cyan-600/10 text-cyan-400 border-cyan-500'
                        : 'bg-white/5 text-gray-400 border-white/5 hover:border-white/15'
                    }`}
                  >
                    <span className="text-xs font-orbitron font-bold truncate">
                      {step.label}
                    </span>
                    <span className="text-[9px] font-mono text-gray-500 ml-2">
                      STATION 0{idx + 1}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Interactive display node detail card */}
            <div className="lg:col-span-2 glass-panel p-6 md:p-8 rounded-3xl border border-cyan-500/30 flex flex-col justify-between min-h-[300px] relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/10 rounded-full blur-2xl"></div>

              <div className="space-y-4">
                <div className="flex items-center justify-between text-[10px] font-mono text-cyan-400">
                  <span>// ORBITAL STEP TELEMETRY ACTIVE</span>
                  <span>{methodSteps[activeStep].coord}</span>
                </div>

                <div className="space-y-2">
                  <h3 className="text-2xl font-black font-orbitron text-white uppercase">
                    {methodSteps[activeStep].label}
                  </h3>
                  <p className="text-sm text-gray-300 leading-relaxed font-light">
                    {methodSteps[activeStep].desc}
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-cyan-500/5 border border-cyan-500/15 text-xs text-cyan-300 leading-relaxed">
                  Chaque étape est validée par des revues de trajectoire (Sprints de dev, testings, SEO benchmarks) avant d'obtenir l'autorisation de poussée vers l'orbite suivante.
                </div>
              </div>

              <div className="flex items-center justify-between border-t border-white/5 pt-4 mt-6 text-xs text-gray-500 font-mono">
                <span>FLIGHT STEPS PROGRESSION</span>
                <span className="text-cyan-400 font-bold font-orbitron">
                  {Math.round(((activeStep + 1) / 9) * 100)}% COMPLETE
                </span>
              </div>
            </div>

          </div>
        </section>
      )}
    </div>
  );
};
