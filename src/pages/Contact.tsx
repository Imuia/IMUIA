import React, { useState } from 'react';
import { useAppState } from '../data/useAppState';
import { translations } from '../data/translations';
import { Globe, Rocket, UserPlus, Coins, MessageSquare, MapPin } from 'lucide-react';

export const Contact: React.FC = () => {
  const { language, playSound, setActiveSection } = useAppState();
  const t = translations[language];

  // Hover state to enrich planet visualization
  const [hoveredFeature, setHoveredFeature] = useState<string | null>(null);

  const handleCTA = (partnerType: string, customMessage: string) => {
    playSound('space');
    // Store intent in sessionStorage
    sessionStorage.setItem('imuia_intent_partner_type', partnerType);
    sessionStorage.setItem('imuia_intent_proposal', customMessage);

    // Redirect to partners page
    setActiveSection('partners');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const contactPoints = [
    {
      id: 'maroc',
      name: 'Hub Maroc (Taghazout / Marrakech)',
      coords: '30.5442° N, 9.7112° W',
      desc: 'Mobilité verte & Conciergerie de luxe'
    },
    {
      id: 'corse',
      name: 'Hub Corse (Ajaccio / Bastia)',
      coords: '42.0396° N, 9.0129° E',
      desc: 'Immobilier haut de gamme & Investissement'
    },
    {
      id: 'cannes',
      name: 'Hub Côte d\'Azur (Cannes)',
      coords: '43.5528° N, 7.0174° E',
      desc: 'Événementiel & Stationnements VIP'
    },
    {
      id: 'mada',
      name: 'Hub Madagascar (Nosy Be / Antananarivo)',
      coords: '18.8792° S, 47.5079° E',
      desc: 'Honeymoons d\'exception & Foncier certifié'
    }
  ];

  return (
    <div className="relative min-h-[calc(100vh-80px)] py-12 px-4 space-y-12 overflow-hidden">
      {/* Space stars background layer */}
      <div className="absolute inset-0 stars-bg opacity-30 pointer-events-none"></div>

      {/* Atmospheric Glowing Background */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-900/10 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute top-1/3 left-1/3 w-[400px] h-[400px] bg-cyan-900/10 rounded-full blur-[100px] pointer-events-none"></div>

      <div className="text-center max-w-3xl mx-auto space-y-4 relative z-10">
        <h2 className="text-xs font-orbitron font-bold text-cyan-400 tracking-widest uppercase flex items-center justify-center space-x-2">
          <Globe className="w-4 h-4" />
          <span>{language === 'fr' ? 'ÉQUIPAGE AU RAPPORT' : 'FLIGHT CREW INCOMING'}</span>
        </h2>
        <h1 className="text-3xl md:text-5xl font-black font-orbitron uppercase text-white leading-tight">
          {language === 'fr' ? 'Vous avez une idée à mettre en orbite ?' : 'Have an innovative concept to launch into orbit?'}
        </h1>
        <p className="text-sm md:text-base text-gray-400 leading-relaxed font-light">
          {language === 'fr'
            ? 'Projet innovant, partenariat, investissement ou proposition de collaboration : entrez en contact avec l’équipage IMUIA.'
            : 'Whether you are looking to invest, propose technical cooperation, introduce opportunities, or become a local operator: reach out to our IMUIA crew.'
          }
        </p>
      </div>

      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10 text-left">
        {/* Interactive 3D-styled Earth Planet Column */}
        <div className="flex flex-col items-center justify-center space-y-6">
          <div className="relative w-80 h-80 sm:w-96 sm:h-96 flex items-center justify-center">
            {/* Ambient planetary halo */}
            <div className="absolute inset-0 m-auto w-72 h-72 sm:w-80 sm:h-80 rounded-full bg-gradient-to-tr from-cyan-500/20 via-purple-600/10 to-transparent blur-2xl animate-pulse"></div>

            {/* Earth Planet Sphere representation with beautiful SVG */}
            <div className="relative w-64 h-64 sm:w-72 sm:h-72 rounded-full border border-purple-500/30 flex items-center justify-center bg-gradient-to-br from-slate-950 via-purple-950/40 to-cyan-950 p-2 shadow-[0_0_60px_rgba(168,85,247,0.25),inset_0_0_40px_rgba(6,182,212,0.15)] transition-all duration-700 hover:scale-105 group">

              {/* Spinning Atmosphere Rings */}
              <div className="absolute -inset-4 sm:-inset-6 rounded-full border border-dashed border-cyan-400/20 animate-orbit"></div>
              <div className="absolute -inset-8 sm:-inset-10 rounded-full border border-dotted border-purple-500/15 animate-orbit-reverse"></div>

              {/* Glowing SVG Earth Map Elements */}
              <svg className="w-full h-full text-cyan-400/25 absolute inset-0 select-none pointer-events-none" viewBox="0 0 100 100">
                {/* Simulated continents */}
                <path d="M15,45 Q22,35 30,42 T45,35 T60,45 T75,38 T85,48 T90,60 L85,75 Q70,70 65,80 T40,78 T20,68 Z" fill="currentColor" className="opacity-15" />
                <path d="M40,15 Q45,22 55,18 T65,22 T70,12 Z" fill="currentColor" className="opacity-10" />
                <path d="M12,20 Q18,25 22,18 T30,28 Z" fill="currentColor" className="opacity-10" />

                {/* Meridians & Parallels grid */}
                <circle cx="50" cy="50" r="45" stroke="currentColor" strokeWidth="0.15" fill="none" className="opacity-30" />
                <circle cx="50" cy="50" r="35" stroke="currentColor" strokeWidth="0.1" fill="none" className="opacity-20" />
                <circle cx="50" cy="50" r="22" stroke="currentColor" strokeWidth="0.1" fill="none" className="opacity-15" />
                <line x1="5" y1="50" x2="95" y2="50" stroke="currentColor" strokeWidth="0.15" className="opacity-30" />
                <line x1="50" y1="5" x2="50" y2="95" stroke="currentColor" strokeWidth="0.15" className="opacity-30" />

                {/* Curved grids representing spherical geometry */}
                <path d="M10,50 Q50,20 90,50" stroke="currentColor" strokeWidth="0.1" fill="none" className="opacity-20" />
                <path d="M10,50 Q50,80 90,50" stroke="currentColor" strokeWidth="0.1" fill="none" className="opacity-20" />
                <path d="M50,10 Q30,50 50,90" stroke="currentColor" strokeWidth="0.1" fill="none" className="opacity-20" />
                <path d="M50,10 Q70,50 50,90" stroke="currentColor" strokeWidth="0.1" fill="none" className="opacity-20" />
              </svg>

              {/* Hub Indicators on Planet Surface */}
              {contactPoints.map((point, idx) => {
                // Approximate mapping to position relative to sphere (offset angles)
                const angle = (idx * 2 * Math.PI) / 4 + 0.4;
                const r = 24; // Radius of indicators
                const cx = 50 + r * Math.cos(angle);
                const cy = 50 + r * Math.sin(angle);

                const isHovered = hoveredFeature === point.id;

                return (
                  <button
                    key={point.id}
                    onMouseEnter={() => { setHoveredFeature(point.id); playSound('hover'); }}
                    onMouseLeave={() => setHoveredFeature(null)}
                    onClick={() => handleCTA('Operator', `Bonjour l'équipage IMUIA, je m'intéresse au hub de déploiement en ${point.name}...`)}
                    className="absolute cursor-none z-20 group/beacon p-1"
                    style={{ left: `${cx}%`, top: `${cy}%`, transform: 'translate(-50%, -50%)' }}
                  >
                    <div className="relative">
                      <div className={`absolute -inset-1.5 rounded-full animate-ping ${isHovered ? 'bg-cyan-400' : 'bg-purple-500/40'}`}></div>
                      <div className={`w-3.5 h-3.5 rounded-full border border-black flex items-center justify-center transition-all ${
                        isHovered ? 'bg-cyan-400 scale-125' : 'bg-purple-600'
                      }`}>
                        <MapPin className="w-2 h-2 text-white" />
                      </div>
                    </div>
                  </button>
                );
              })}

              <div className="text-center z-10 space-y-1 select-none">
                <span className="block font-orbitron font-black text-2xl tracking-widest text-white glow-text-cyan animate-pulse">
                  EARTH
                </span>
                <span className="block text-[8px] font-mono text-cyan-400 tracking-wider">
                  ORBIT STATION 01
                </span>
              </div>
            </div>
          </div>

          {/* Interactive telemetry dynamic panel */}
          <div className="w-full max-w-sm glass-panel p-4 rounded-xl border border-white/5 h-20 flex flex-col justify-center">
            {hoveredFeature ? (
              <div className="text-center animate-fade-in space-y-0.5">
                <span className="text-[10px] font-mono text-cyan-400 font-bold tracking-widest uppercase">
                  // POSITION TARGETED
                </span>
                <p className="text-sm font-orbitron font-bold text-white">
                  {contactPoints.find(p => p.id === hoveredFeature)?.name}
                </p>
                <p className="text-[10px] text-gray-400 font-mono">
                  {contactPoints.find(p => p.id === hoveredFeature)?.coords} — {contactPoints.find(p => p.id === hoveredFeature)?.desc}
                </p>
              </div>
            ) : (
              <div className="text-center text-gray-500 font-mono text-xs uppercase animate-pulse">
                [ Survolez les balises orbitales de la Terre ]
              </div>
            )}
          </div>
        </div>

        {/* Action Call-to-Action Buttons Column */}
        <div className="space-y-6">
          <div className="border-b border-white/10 pb-4">
            <h3 className="font-orbitron font-bold text-white text-lg uppercase tracking-wider">
              {language === 'fr' ? 'Choisissez votre trajectoire' : 'Choose your trajectory'}
            </h3>
            <p className="text-xs text-gray-400 mt-1">
              {language === 'fr'
                ? 'Sélectionnez un objectif pour préremplir automatiquement le formulaire de contact.'
                : 'Select an objective to automatically prefill the partnership form.'
              }
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* CTA 1: Présenter mon projet */}
            <button
              onClick={() => handleCTA(
                'Developer',
                language === 'fr'
                  ? "Bonjour l'équipage IMUIA, je souhaite vous présenter un projet innovant et explorer de nouvelles synergies..."
                  : "Hello IMUIA crew, I would like to submit an innovative project and explore new synergies..."
              )}
              onMouseEnter={() => playSound('hover')}
              className="glass-panel p-5 rounded-2xl border border-white/5 hover:border-purple-500/30 hover:bg-purple-500/5 text-left transition-all duration-300 group cursor-none hover:translate-y-[-2px] flex flex-col justify-between space-y-4"
            >
              <div className="flex items-center justify-between">
                <span className="p-2 rounded-lg bg-purple-500/10 text-purple-400 border border-purple-500/20 group-hover:bg-purple-600 group-hover:text-white transition-all">
                  <Rocket className="w-5 h-5" />
                </span>
                <span className="text-[10px] font-mono text-gray-500">[01]</span>
              </div>
              <div className="space-y-1">
                <h4 className="font-orbitron font-bold text-white text-sm">
                  {t.presentProject}
                </h4>
                <p className="text-[11px] text-gray-400 leading-normal font-light">
                  {language === 'fr'
                    ? 'Proposez vos idées innovantes pour les éditer sous notre galaxie.'
                    : 'Submit your innovative concepts for publication under our galaxy.'
                  }
                </p>
              </div>
            </button>

            {/* CTA 2: Devenir partenaire */}
            <button
              onClick={() => handleCTA(
                'Operator',
                language === 'fr'
                  ? "Bonjour l'équipage IMUIA, je souhaite vous proposer de devenir partenaire de votre galaxie de services..."
                  : "Hello IMUIA crew, I would like to offer my local services as an operator/partner of your service galaxy..."
              )}
              onMouseEnter={() => playSound('hover')}
              className="glass-panel p-5 rounded-2xl border border-white/5 hover:border-pink-500/30 hover:bg-pink-500/5 text-left transition-all duration-300 group cursor-none hover:translate-y-[-2px] flex flex-col justify-between space-y-4"
            >
              <div className="flex items-center justify-between">
                <span className="p-2 rounded-lg bg-pink-500/10 text-pink-400 border border-pink-500/20 group-hover:bg-pink-600 group-hover:text-white transition-all">
                  <UserPlus className="w-5 h-5" />
                </span>
                <span className="text-[10px] font-mono text-gray-500">[02]</span>
              </div>
              <div className="space-y-1">
                <h4 className="font-orbitron font-bold text-white text-sm">
                  {t.becomePartner}
                </h4>
                <p className="text-[11px] text-gray-400 leading-normal font-light">
                  {language === 'fr'
                    ? 'Devenez opérateur local, prestataire ou apporteur d\'affaires d\'un concept.'
                    : 'Become a local operator, trusted provider, or business finder.'
                  }
                </p>
              </div>
            </button>

            {/* CTA 3: Investir dans un univers */}
            <button
              onClick={() => handleCTA(
                'Investor',
                language === 'fr'
                  ? "Bonjour l'équipage IMUIA, je souhaite obtenir des informations concernant les opportunités d'investissement et de co-financement de vos univers numériques..."
                  : "Hello IMUIA crew, I would like to receive details regarding premium co-investment or funding opportunities..."
              )}
              onMouseEnter={() => playSound('hover')}
              className="glass-panel p-5 rounded-2xl border border-white/5 hover:border-cyan-500/30 hover:bg-cyan-500/5 text-left transition-all duration-300 group cursor-none hover:translate-y-[-2px] flex flex-col justify-between space-y-4"
            >
              <div className="flex items-center justify-between">
                <span className="p-2 rounded-lg bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 group-hover:bg-cyan-600 group-hover:text-white transition-all">
                  <Coins className="w-5 h-5" />
                </span>
                <span className="text-[10px] font-mono text-gray-500">[03]</span>
              </div>
              <div className="space-y-1">
                <h4 className="font-orbitron font-bold text-white text-sm">
                  {t.investUniverse}
                </h4>
                <p className="text-[11px] text-gray-400 leading-normal font-light">
                  {language === 'fr'
                    ? 'Co-financez l\'un de nos mondes indépendants et accompagnez sa croissance.'
                    : 'Co-fund one of our independent digital worlds to fuel its scaling.'
                  }
                </p>
              </div>
            </button>

            {/* CTA 4: Contacter IMUIA */}
            <button
              onClick={() => handleCTA(
                'Other',
                language === 'fr'
                  ? "Bonjour l'équipage IMUIA, je souhaite entrer en contact pour obtenir des informations générales ou collaborer..."
                  : "Hello IMUIA crew, I am seeking general information or exploring custom co-operation pathways..."
              )}
              onMouseEnter={() => playSound('hover')}
              className="glass-panel p-5 rounded-2xl border border-white/5 hover:border-amber-500/30 hover:bg-amber-500/5 text-left transition-all duration-300 group cursor-none hover:translate-y-[-2px] flex flex-col justify-between space-y-4"
            >
              <div className="flex items-center justify-between">
                <span className="p-2 rounded-lg bg-amber-500/10 text-amber-400 border border-amber-500/20 group-hover:bg-amber-600 group-hover:text-white transition-all">
                  <MessageSquare className="w-5 h-5" />
                </span>
                <span className="text-[10px] font-mono text-gray-500">[04]</span>
              </div>
              <div className="space-y-1">
                <h4 className="font-orbitron font-bold text-white text-sm">
                  {t.contactUs}
                </h4>
                <p className="text-[11px] text-gray-400 leading-normal font-light">
                  {language === 'fr'
                    ? 'Posez vos questions générales et établissez un contact direct.'
                    : 'Ask any general inquiries and establish direct contact with the cockpit.'
                  }
                </p>
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
