import React, { useState } from 'react';
import { useAppState } from '../data/useAppState';
import { translations } from '../data/translations';
import {
  Cpu,
  Lock,
  Unlock,
  AlertTriangle,
  Sparkles,
  Bot,
  Zap,
  MapPin,
  Clock,
  CreditCard,
  Users,
  Eye,
  TrendingUp,
  Briefcase,
  Share2,
  Coins,
  Leaf
} from 'lucide-react';

export const Labs: React.FC = () => {
  const { language, playSound } = useAppState();
  const t = translations[language];

  const [inputKey, setInputKey] = useState('');
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleUnlock = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputKey.trim().toUpperCase() === 'IMUIALAB') {
      setIsUnlocked(true);
      setErrorMsg('');
      playSound('success');
    } else {
      setErrorMsg(t.accreditationError);
      playSound('click');
    }
  };

  // The 12 Domains mandated by the prompt
  const researchAreas = [
    { id: 'ai', title: t.domain1Title, desc: t.domain1Desc, icon: Bot, color: 'text-purple-400' },
    { id: 'autom', title: t.domain2Title, desc: t.domain2Desc, icon: Zap, color: 'text-cyan-400' },
    { id: 'geo', title: t.domain3Title, desc: t.domain3Desc, icon: MapPin, color: 'text-pink-400' },
    { id: 'booking', title: t.domain4Title, desc: t.domain4Desc, icon: Clock, color: 'text-green-400' },
    { id: 'payment', title: t.domain5Title, desc: t.domain5Desc, icon: CreditCard, color: 'text-blue-400' },
    { id: 'crm', title: t.domain6Title, desc: t.domain6Desc, icon: Users, color: 'text-amber-400' },
    { id: 'immersive', title: t.domain7Title, desc: t.domain7Desc, icon: Eye, color: 'text-indigo-400' },
    { id: 'affiliation', title: t.domain8Title, desc: t.domain8Desc, icon: TrendingUp, color: 'text-rose-400' },
    { id: 'pro', title: t.domain9Title, desc: t.domain9Desc, icon: Briefcase, color: 'text-teal-400' },
    { id: 'collab', title: t.domain10Title, desc: t.domain10Desc, icon: Share2, color: 'text-violet-400' },
    { id: 'models', title: t.domain11Title, desc: t.domain11Desc, icon: Coins, color: 'text-yellow-400' },
    { id: 'impact', title: t.domain12Title, desc: t.domain12Desc, icon: Leaf, color: 'text-emerald-400' }
  ];

  const incubatedProjects = [
    {
      codename: 'PROJECT NEBULA',
      aim: 'AI-driven Real Estate & Lead Dispatcher',
      tech: 'Neural Nets, NLP & Geo-Clustering',
      desc: 'Distribution instantanée de prospects immobiliers qualifiés aux agents locaux selon la performance historique et la réactivité en millisecondes.'
    },
    {
      codename: 'PROJECT POSEIDON',
      aim: 'Smart Yacht-Berth Dynamic Sharing',
      tech: 'IoT Sensors & Automated Smart Pontoons',
      desc: 'Capteurs d\'amarrage connectés permettant aux marinas et particuliers de relouer automatiquement leur anneau d\'amarrage en temps réel.'
    },
    {
      codename: 'PROJECT ANUBIS',
      aim: 'Solidarity Companion Courier & Rescue Node',
      tech: 'Routing Node Optima & Carbon Compensation',
      desc: 'Optimisation des trajets touristiques pour minimiser l\'empreinte carbone lors du transport solidaire de fournitures au profit des refuges animaliers.'
    }
  ];

  return (
    <div className="relative min-h-[calc(100vh-80px)] py-12 px-4 space-y-12">
      <div className="absolute inset-0 stars-bg opacity-35 pointer-events-none"></div>

      <div className="text-center max-w-3xl mx-auto space-y-4 relative z-10">
        <h2 className="text-xs font-orbitron font-bold text-cyan-400 tracking-widest uppercase flex items-center justify-center space-x-2">
          <Cpu className="w-4 h-4 animate-spin-slow" />
          <span>{t.labsSubtitle}</span>
        </h2>
        <h1 className="text-3xl md:text-5xl font-black font-orbitron uppercase text-white leading-tight">
          {t.labsTitle}
        </h1>
        <p className="text-sm md:text-base text-gray-400 leading-relaxed font-light">
          {t.labsDesc}
        </p>
      </div>

      {/* Research Areas Matrix Grid: 12 Domains */}
      <div className="max-w-6xl mx-auto space-y-4 relative z-10 text-left">
        <div className="flex items-center justify-between border-b border-white/10 pb-3">
          <h3 className="font-orbitron font-bold text-sm text-white uppercase tracking-wider flex items-center space-x-2">
            <Sparkles className="w-4 h-4 text-cyan-400" />
            <span>{t.areasTitle}</span>
          </h3>
          <span className="text-[10px] font-mono text-cyan-400 font-bold">12 DOMAINES EN EXPLORATION</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {researchAreas.map((area, idx) => {
            const Icon = area.icon;
            return (
              <div
                key={area.id}
                onMouseEnter={() => playSound('hover')}
                className="glass-panel p-6 rounded-2xl border border-white/5 hover:border-cyan-500/40 hover:shadow-[0_0_20px_rgba(6,182,212,0.15)] transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-2.5">
                      <div className={`p-2 rounded-xl bg-white/5 border border-white/10 ${area.color}`}>
                        <Icon className="w-4 h-4" />
                      </div>
                      <span className="text-xs font-mono text-gray-400 font-bold">
                        DOMAIN {idx + 1 < 10 ? `0${idx + 1}` : idx + 1}
                      </span>
                    </div>
                  </div>
                  <h4 className="font-orbitron font-bold text-white text-base mb-2">
                    {area.title}
                  </h4>
                  <p className="text-xs text-gray-400 leading-relaxed font-light">
                    {area.desc}
                  </p>
                </div>

                <div className="border-t border-white/5 pt-3 mt-4 flex items-center justify-between text-[10px] font-mono text-gray-500">
                  <span>STATUS: R&amp;D ACTIVE</span>
                  <span className="text-cyan-400">DEPLOYABLE</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Incubation locked/unlocked chamber */}
      <div className="max-w-4xl mx-auto glass-panel p-6 md:p-8 rounded-3xl border border-purple-500/30 relative z-10 text-center space-y-8">
        <div className="space-y-3">
          <div className="flex items-center justify-center space-x-2.5">
            <Sparkles className="w-5 h-5 text-purple-400 animate-pulse" />
            <h2 className="text-xl md:text-2xl font-black font-orbitron text-white uppercase tracking-wider">
              {t.incubationTitle}
            </h2>
          </div>
          <p className="text-xs text-gray-400 max-w-xl mx-auto">
            {t.incubationDesc} Saisissez la clé d'accréditation du groupe pour déverrouiller la chambre cryogénique de recherche d'IMUIA.
          </p>
        </div>

        {/* Access panel controls */}
        {!isUnlocked ? (
          <form onSubmit={handleUnlock} className="max-w-md mx-auto p-6 rounded-2xl bg-black/40 border border-white/10 space-y-4">
            <div className="flex items-center justify-center space-x-2 text-amber-400 font-mono text-xs">
              <Lock className="w-3.5 h-3.5" />
              <span>STATION INCUBATEUR SÉCURISÉE</span>
            </div>

            <div className="space-y-1.5 text-left">
              <label className="block text-[10px] font-mono uppercase text-gray-400">
                {t.accreditationKey}
              </label>
              <input
                type="text"
                value={inputKey}
                onChange={(e) => setInputKey(e.target.value)}
                placeholder="Ex: IMUIALAB"
                className="w-full bg-black/80 border border-white/15 focus:border-purple-500 rounded-xl px-4 py-2.5 text-sm font-mono text-purple-300 tracking-widest placeholder:text-gray-600 focus:outline-none text-center uppercase"
              />
            </div>

            {errorMsg && (
              <p className="text-xs font-mono text-red-400 flex items-center justify-center space-x-1">
                <AlertTriangle className="w-3.5 h-3.5" />
                <span>{errorMsg}</span>
              </p>
            )}

            <button
              type="submit"
              className="w-full py-2.5 bg-purple-600 hover:bg-purple-500 text-white font-bold font-orbitron text-xs tracking-widest uppercase rounded-xl transition-all cursor-none"
            >
              Déverrouiller les Concepts
            </button>
          </form>
        ) : (
          <div className="space-y-6 animate-fade-in">
            <div className="flex items-center justify-center space-x-2 text-green-400 font-mono text-xs">
              <Unlock className="w-3.5 h-3.5" />
              <span>{t.accreditationSuccess}</span>
            </div>

            {/* Revealing Projects */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
              {incubatedProjects.map((proj) => (
                <div
                  key={proj.codename}
                  className="glass-panel p-5 rounded-2xl border border-green-500/20 bg-green-950/5 relative overflow-hidden"
                >
                  <div className="absolute top-0 right-0 w-16 h-16 bg-green-500/5 rounded-full blur-xl"></div>

                  <div className="space-y-3">
                    <span className="inline-block text-[9px] font-mono bg-green-500/10 text-green-400 px-2.5 py-0.5 rounded font-bold tracking-wider">
                      {proj.codename}
                    </span>
                    <h4 className="font-orbitron font-bold text-white text-base">
                      {proj.aim}
                    </h4>
                    <p className="text-[11px] text-gray-400 leading-relaxed font-light">
                      {proj.desc}
                    </p>
                    <div className="border-t border-green-500/10 pt-2 text-[10px] font-mono text-green-300">
                      Tech: {proj.tech}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <button
              onClick={() => { setIsUnlocked(false); setInputKey(''); playSound('click'); }}
              className="px-4 py-2 text-xs font-mono bg-white/5 border border-white/10 text-gray-400 hover:text-white rounded-lg transition-all cursor-none"
            >
              Re-cryogéniser les dossiers
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
