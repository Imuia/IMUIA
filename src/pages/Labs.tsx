import React, { useState } from 'react';
import { useAppState } from '../data/useAppState';
import { translations } from '../data/translations';
import { Cpu, Lock, Unlock, AlertTriangle, Sparkles } from 'lucide-react';

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

  const researchAreas = language === 'fr' ? [
    { id: 'ai', title: 'Intelligence Artificielle', desc: 'Dispatching algorithmique, qualification automatique de leads et prédictions comportementales sur nos plateformes.' },
    { id: 'autom', title: 'Automatisation', desc: 'Workflows automatisés, génération instantanée d’accords contractuels et relance intelligente de réservations.' },
    { id: 'geo', title: 'Géolocalisation', desc: 'Cartographie vectorielle dynamique en temps réel, calcul d’itinéraires optimaux et balises connectées.' },
    { id: 'booking', title: 'Réservation en temps réel', desc: 'Moteurs transactionnels haute performance, gestion de disponibilités croisées et verrous de concurrence.' },
    { id: 'payment', title: 'Paiement en ligne', desc: 'Passerelles de paiement internationales multi-devises, séquestres sécurisés et fractionnement de commissions.' },
    { id: 'crm', title: 'CRM et gestion commerciale', desc: 'Centralisation des prospects, historique des échanges, signature électronique et automatisation des pipelines.' },
    { id: 'immersive', title: 'Expériences immersives', desc: 'Modélisation 3D WebGL, visites spatiales immersives de programmes immobiliers et simulateurs visuels.' },
    { id: 'affiliation', title: 'Affiliation & génération de prospects', desc: 'Tracking haute précision, moteurs de commissionnement multi-niveaux et scoring algorithmique de conversion.' },
    { id: 'pro_tools', title: 'Outils pour les professionnels', desc: 'Tableaux de bord d’exploitation dédiés aux prestataires, conciergeries, agences et artisans partenaires.' },
    { id: 'collab', title: 'Plateformes collaboratives', desc: 'Économie de partage, mise en relation peer-to-peer certifiée et systèmes d’avis authentifiés infalsifiables.' },
    { id: 'biz_models', title: 'Nouveaux modèles économiques', desc: 'Hybridation freemium, micro-transactions de service et monétisation d’écosystèmes à forte valeur ajoutée.' },
    { id: 'impact', title: 'Impact social et environnemental', desc: 'Écomobilité décarbonée, mécénat croisé et logistique solidaire au bénéfice des refuges animaliers.' }
  ] : [
    { id: 'ai', title: 'Artificial Intelligence', desc: 'Algorithmic dispatching, automated lead qualification, and behavioral forecasting across platform ecosystems.' },
    { id: 'autom', title: 'Automation', desc: 'Automated workflows, real-time contractual document generation, and intelligent booking reactivation.' },
    { id: 'geo', title: 'Geolocation & Telemetry', desc: 'Dynamic real-time vector mapping, optimized routing paths, and connected hardware beacons.' },
    { id: 'booking', title: 'Real-time Reservation', desc: 'High-throughput transactional engines, cross-calendar synchronization, and strict concurrency lock mechanisms.' },
    { id: 'payment', title: 'Online Payment Infrastructure', desc: 'Multi-currency global checkout gateways, secure escrow vaults, and automated split commissions.' },
    { id: 'crm', title: 'CRM & Business Management', desc: 'Unified partner pipeline, engagement tracking, eIDAS electronic signing, and automated CRM funnels.' },
    { id: 'immersive', title: 'Immersive Experiences', desc: 'WebGL 3D architecture modeling, spatial virtual walkthroughs of real estate projects, and interactive tools.' },
    { id: 'affiliation', title: 'Affiliation & Lead Generation', desc: 'High-precision event tracking, multi-tier commission engines, and algorithmic conversion score models.' },
    { id: 'pro_tools', title: 'Enterprise & Pro Tools', desc: 'Dedicated operational command cockpits for contractors, luxury concierges, brokers, and local operators.' },
    { id: 'collab', title: 'Collaborative Platforms', desc: 'Peer-to-peer shared economy models, certified identity matching, and tamper-proof review networks.' },
    { id: 'biz_models', title: 'Novel Economic Models', desc: 'Freemium hybrids, micro-service subscriptions, and high-margin recurring ecosystem monetization.' },
    { id: 'impact', title: 'Social & Environmental Impact', desc: 'Zero-emission green mobility, solidarity freight networks, and direct charitable funding for animal shelters.' }
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

      {/* Research Areas Matrix Grid */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 relative z-10 text-left">
        {researchAreas.map((area, idx) => (
          <div
            key={area.id}
            onMouseEnter={() => playSound('hover')}
            className="glass-panel p-6 rounded-2xl border border-white/5 hover:border-cyan-500/30 transition-all duration-300"
          >
            <div className="flex items-center space-x-2.5 mb-3">
              <span className="text-xs font-mono text-cyan-400 font-bold bg-cyan-400/10 px-2 py-0.5 rounded">
                0{idx + 1}
              </span>
              <h3 className="font-orbitron font-bold text-white text-base">
                {area.title}
              </h3>
            </div>
            <p className="text-xs text-gray-400 leading-relaxed">
              {area.desc}
            </p>
          </div>
        ))}
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
