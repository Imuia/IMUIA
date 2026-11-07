import React, { useState } from 'react';
import { useAppState } from '../data/useAppState';
import { translations } from '../data/translations';
import {
  Cpu, Lock, Unlock, AlertTriangle, Sparkles,
  Bot, Cog, Compass, CalendarCheck, CreditCard,
  Briefcase, Layers, Share2, Wrench, Users,
  TrendingUp, HeartHandshake
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

  // Full 12 research domains explicitly required by prompt
  const researchAreas = [
    { id: 'ai', title: language === 'fr' ? 'Intelligence Artificielle' : 'Artificial Intelligence', icon: Bot, desc: language === 'fr' ? 'Dispatching algorithmique, qualification sémantique de prospects et modèles prédictifs.' : 'Algorithmic routing, semantic prospect qualification, and predictive machine learning models.' },
    { id: 'autom', title: language === 'fr' ? 'Automatisation' : 'Automation', icon: Cog, desc: language === 'fr' ? 'Génération automatisée de mandats, relances et synchronisation multi-plateformes.' : 'Automated contract authoring, notification dispatching, and multi-platform sync.' },
    { id: 'geo', title: language === 'fr' ? 'Géolocalisation' : 'Geolocation', icon: Compass, desc: language === 'fr' ? 'Cartographie spatiale vectorielle, télémétrie nautique et localisation de flottes de vélos.' : 'Vector geospatial maps, nautical telemetry tracking, and smart bike fleet positioning.' },
    { id: 'booking', title: language === 'fr' ? 'Réservation en temps réel' : 'Real-time Booking', icon: CalendarCheck, desc: language === 'fr' ? 'Moteurs de synchronisation instantanée de calendriers haute disponibilité sans collision.' : 'Zero-latency calendar sync engines engineered for heavy multi-tenant booking peaks.' },
    { id: 'payment', title: language === 'fr' ? 'Paiement en ligne' : 'Online Payment', icon: CreditCard, desc: language === 'fr' ? 'Passerelles sécurisées multidevises, séquestre numérique et fractionnement d\'acomptes.' : 'Multi-currency secured gateways, digital escrow escrow holding, and automated splits.' },
    { id: 'crm', title: language === 'fr' ? 'CRM & Gestion commerciale' : 'CRM & Commercial Ops', icon: Briefcase, desc: language === 'fr' ? 'Pipeline d\'affaires centralisé, signature électronique eIDAS et fiches partenaires 360°.' : 'Centralized business pipeline, legal e-signature certified under eIDAS, 360° CRM records.' },
    { id: 'immersive', title: language === 'fr' ? 'Expériences immersives' : 'Immersive Experiences', icon: Layers, desc: language === 'fr' ? 'Modélisation 3D WebGL de biens immobiliers, visites spatiales et interfaces holographiques.' : '3D WebGL architectural visualization, virtual property tours, and holographic design systems.' },
    { id: 'affiliation', title: language === 'fr' ? 'Affiliation & Leads' : 'Affiliation & Lead Gen', icon: Share2, desc: language === 'fr' ? 'Génération de prospects ultra-qualifiés et programmes d\'apporteurs d\'affaires distribués.' : 'High-intent lead generation networks and transparent multi-tier commission structures.' },
    { id: 'pro_tools', title: language === 'fr' ? 'Outils pour professionnels' : 'Pro Tools & Portals', icon: Wrench, desc: language === 'fr' ? 'Tableaux de bord d\'artisans, conciergeries connectées et gestionnaires de parcs.' : 'Dedicated craftsman cockpits, connected concierge tools, and operational management portals.' },
    { id: 'collab', title: language === 'fr' ? 'Plateformes collaboratives' : 'Collaborative Platforms', icon: Users, desc: language === 'fr' ? 'Partage communautaire de pontons, entraide touristique et économie de partage équitable.' : 'Community boat slip sharing, cooperative traveler assistance, and peer-to-peer marketplaces.' },
    { id: 'models', title: language === 'fr' ? 'Nouveaux modèles économiques' : 'New Economic Models', icon: TrendingUp, desc: language === 'fr' ? 'Micro-abonnements SaaS flexibles, monétisation à la performance et royalties de marques.' : 'Micro-SaaS models, performance-based commission payouts, and digital brand royalties.' },
    { id: 'impact', title: language === 'fr' ? 'Impact social & environnement' : 'Social & Eco Impact', icon: HeartHandshake, desc: language === 'fr' ? 'Mobilité douce décarbonée et acheminement solidaire au profit de refuges animaliers.' : 'Low-carbon green micromobility and solidarity couriering for isolated animal rescue sanctuaries.' },
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

      {/* Research Areas Matrix Grid - All 12 domains */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 relative z-10 text-left">
        {researchAreas.map((area, idx) => {
          const Icon = area.icon;
          return (
            <div
              key={area.id}
              onMouseEnter={() => playSound('hover')}
              className="glass-panel p-6 rounded-2xl border border-white/5 hover:border-cyan-500/30 transition-all duration-300 group hover:translate-y-[-2px]"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-2.5">
                  <span className="text-xs font-mono text-cyan-400 font-bold bg-cyan-400/10 px-2 py-0.5 rounded">
                    {idx < 9 ? `0${idx + 1}` : idx + 1}
                  </span>
                  <h3 className="font-orbitron font-bold text-white text-sm md:text-base group-hover:text-cyan-300 transition-colors">
                    {area.title}
                  </h3>
                </div>
                <div className="p-2 rounded-xl bg-cyan-500/10 text-cyan-400">
                  <Icon className="w-4 h-4" />
                </div>
              </div>
              <p className="text-xs text-gray-400 leading-relaxed font-light">
                {area.desc}
              </p>
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
