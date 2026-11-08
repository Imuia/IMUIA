import React, { useState } from 'react';
import { useAppState } from '../data/useAppState';
import { translations } from '../data/translations';
import {
  Cpu, Lock, Unlock, AlertTriangle, Sparkles,
  Bot, RefreshCw, MapPin, Calendar, CreditCard,
  Users, Eye, Share2, Briefcase, Network, TrendingUp, HeartHandshake
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

  // Complete 12 Research Areas from the user specification
  const researchAreas = [
    { id: 'ai', title: t.domainAI, desc: t.domainAIDesc, icon: Bot, color: 'text-purple-400' },
    { id: 'autom', title: t.domainAutom, desc: t.domainAutomDesc, icon: RefreshCw, color: 'text-cyan-400' },
    { id: 'geo', title: t.domainGeo, desc: t.domainGeoDesc, icon: MapPin, color: 'text-blue-400' },
    { id: 'booking', title: t.domainBooking, desc: t.domainBookingDesc, icon: Calendar, color: 'text-pink-400' },
    { id: 'payment', title: t.domainPayment, desc: t.domainPaymentDesc, icon: CreditCard, color: 'text-amber-400' },
    { id: 'crm', title: t.domainCRM, desc: t.domainCRMDesc, icon: Users, color: 'text-emerald-400' },
    { id: 'immersive', title: t.domainImmersive, desc: t.domainImmersiveDesc, icon: Eye, color: 'text-indigo-400' },
    { id: 'affiliation', title: t.domainAffiliation, desc: t.domainAffiliationDesc, icon: Share2, color: 'text-teal-400' },
    { id: 'pro_tools', title: t.domainProTools, desc: t.domainProToolsDesc, icon: Briefcase, color: 'text-rose-400' },
    { id: 'collab', title: t.domainCollab, desc: t.domainCollabDesc, icon: Network, color: 'text-cyan-300' },
    { id: 'models', title: t.domainNewModels, desc: t.domainNewModelsDesc, icon: TrendingUp, color: 'text-purple-300' },
    { id: 'impact', title: t.domainImpact, desc: t.domainImpactDesc, icon: HeartHandshake, color: 'text-green-400' }
  ];

  const incubatedProjects = [
    {
      codename: 'PROJECT NEBULA',
      aim: 'AI-driven Real Estate Dispatcher',
      tech: 'Neural Nets & Geo Clustering',
      desc: 'Distribution instantanée de prospects immobiliers qualifiés aux agents locaux selon la performance historique et la réactivité en millisecondes.'
    },
    {
      codename: 'PROJECT POSEIDON',
      aim: 'Smart Yacht-Berth Sharing',
      tech: 'IoT Sensors & Solidity Blocks',
      desc: 'Capteurs d\'amarrage connectés d\'un yacht pour relouer automatiquement l\'emplacement à un bateau en détresse.'
    },
    {
      codename: 'PROJECT ANUBIS',
      aim: 'Solidarity Companion Courier',
      tech: 'Routing Node Optima',
      desc: 'Optimisation de trajets touristiques pour minimiser l\'empreinte carbone lors du covoiturage solidaire d\'animaux sauvés de refuges.'
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
          {t.labsDesc} Nous explorons en continu les dernières frontières de la technologie pour maximiser les performances de nos plateformes éditées.
        </p>
      </div>

      {/* Research Areas Matrix Grid: All 12 Fields */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 relative z-10 text-left">
        {researchAreas.map((area, idx) => {
          const Icon = area.icon;
          return (
            <div
              key={area.id}
              onMouseEnter={() => playSound('hover')}
              className="glass-panel p-6 rounded-2xl border border-white/5 hover:border-cyan-500/30 transition-all duration-300 flex flex-col justify-between space-y-3 group"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className={`p-2.5 rounded-xl bg-white/5 border border-white/10 group-hover:scale-110 transition-transform ${area.color}`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className="text-xs font-mono text-gray-500 font-bold bg-white/5 px-2 py-0.5 rounded border border-white/5">
                    #{idx + 1 < 10 ? `0${idx + 1}` : idx + 1}
                  </span>
                </div>

                <h3 className="font-orbitron font-bold text-white text-base group-hover:text-cyan-300 transition-colors">
                  {area.title}
                </h3>

                <p className="text-xs text-gray-400 leading-relaxed font-light">
                  {area.desc}
                </p>
              </div>

              <div className="pt-2 border-t border-white/5 text-[10px] font-mono text-gray-500 flex items-center justify-between">
                <span>R&amp;D STATUS</span>
                <span className="text-cyan-400 font-bold">EXPÉRIMENTAL</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Incubation locked/unlocked center */}
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
