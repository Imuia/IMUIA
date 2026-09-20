import React, { useState } from 'react';
import { useAppState } from '../data/useAppState';
import type { Platform } from '../data/AppStateContext';
import { translations } from '../data/translations';
import { Orbit, Info } from 'lucide-react';

export const UniverseMap: React.FC = () => {
  const {
    language,
    platforms,
    playSound,
    setActivePlatformForDetail,
    setActiveSection
  } = useAppState();

  const t = translations[language];
  const [selectedSector, setSelectedSector] = useState<string | null>(null);
  const [hoveredPlanet, setHoveredPlanet] = useState<Platform | null>(null);

  const sectors = [
    { id: 'immo', label: t.galaxyImmo, color: 'text-purple-400 border-purple-500/30', glow: 'shadow-purple-500/20', desc: 'Programmes, investissements et transactions certifiés en Corse et à Madagascar.' },
    { id: 'tourism', label: t.galaxyTour, color: 'text-pink-400 border-pink-500/30', glow: 'shadow-pink-500/20', desc: 'Voyages haut de gamme, conciergerie privée et éco-séjours romantiques.' },
    { id: 'events', label: t.galaxyEven, color: 'text-blue-400 border-blue-500/30', glow: 'shadow-blue-500/20', desc: 'Sonorisation, matériel professionnel et connectivité événementielle.' },
    { id: 'economy', label: t.galaxyEco, color: 'text-cyan-400 border-cyan-500/30', glow: 'shadow-cyan-500/20', desc: 'Mobilité douce et partages d\'emplacements nautiques collaboratifs.' },
    { id: 'services', label: t.galaxyServ, color: 'text-green-400 border-green-500/30', glow: 'shadow-green-500/20', desc: 'Mises en relation intelligentes, devis instantanés et actions solidaires.' },
    { id: 'tech', label: t.galaxyTech, color: 'text-amber-400 border-amber-500/30', glow: 'shadow-amber-500/20', desc: 'Architectures lumineuses, solutions LED créatives et automatisées.' },
  ];

  const handlePlanetClick = (p: Platform) => {
    setActivePlatformForDetail(p.id);
    setActiveSection('platforms'); // redirect to platforms layout to open sheet
    playSound('space');
  };

  return (
    <div className="relative min-h-[calc(100vh-80px)] py-12 px-4 space-y-12 overflow-hidden">
      {/* Stars Background layer */}
      <div className="absolute inset-0 stars-bg opacity-30 pointer-events-none"></div>

      {/* Header Info */}
      <div className="text-center max-w-3xl mx-auto space-y-4 relative z-10">
        <h2 className="text-xs font-orbitron font-bold text-purple-400 tracking-widest uppercase flex items-center justify-center space-x-2">
          <Orbit className="w-4 h-4 animate-spin-slow" />
          <span>Cartographie de la Galaxie IMUIA</span>
        </h2>
        <h1 className="text-3xl md:text-5xl font-black font-orbitron uppercase text-white leading-tight">
          Explorez nos Mondes de Services
        </h1>
        <p className="text-sm md:text-base text-gray-400 leading-relaxed font-light">
          Chaque secteur d'activité représente une galaxie de concepts en orbite. Survolez ou cliquez sur les planètes indépendantes pour découvrir les plateformes gérées par IMUIA.
        </p>
      </div>

      {/* Quick Sector Selector Buttons */}
      <div className="flex flex-wrap justify-center gap-2 relative z-10 max-w-4xl mx-auto">
        <button
          onClick={() => { setSelectedSector(null); playSound('click'); }}
          className={`px-4 py-2 rounded-full text-xs font-bold font-orbitron tracking-widest uppercase transition-all duration-200 cursor-none ${
            selectedSector === null
              ? 'bg-purple-600 text-white shadow-lg'
              : 'bg-white/5 text-gray-400 hover:text-white hover:bg-white/10'
          }`}
        >
          {language === 'fr' ? 'Toutes les Galaxies' : 'All Galaxies'}
        </button>

        {sectors.map((sec) => (
          <button
            key={sec.id}
            onClick={() => { setSelectedSector(sec.id); playSound('click'); }}
            className={`px-4 py-2 rounded-full text-xs font-bold font-orbitron tracking-widest uppercase transition-all duration-200 cursor-none ${
              selectedSector === sec.id
                ? 'bg-purple-600 text-white shadow-lg'
                : 'bg-white/5 text-gray-400 hover:text-white hover:bg-white/10'
            }`}
          >
            {sec.label}
          </button>
        ))}
      </div>

      {/* Spectacular Canvas Interactive Galaxy Layout (Desktop) */}
      <div className="hidden md:block relative max-w-6xl mx-auto h-[550px] glass-panel rounded-3xl overflow-hidden border border-white/5">
        {/* Subtle grid lines background */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.01)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none"></div>

        {/* Central Core: IMUIA STATION */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
          <div className="relative w-28 h-28 rounded-full bg-gradient-to-br from-purple-800 to-black border border-purple-500/50 flex flex-col items-center justify-center shadow-[0_0_35px_rgba(168,85,247,0.4)]">
            <div className="absolute inset-0 rounded-full border border-purple-400/20 animate-ping"></div>
            <div className="absolute -inset-4 rounded-full border border-dashed border-cyan-400/20 animate-orbit-reverse"></div>
            <span className="font-orbitron font-black text-white tracking-widest text-lg">IMUIA</span>
            <span className="text-[7px] text-cyan-400 font-mono tracking-widest uppercase">LAB BASE</span>
          </div>
        </div>

        {/* The 6 Galaxy Sector Nodes - Orbiting or located in 6 distinct angles */}
        {sectors.map((sec, idx) => {
          // Angle in radians
          const angle = (idx * 2 * Math.PI) / 6;
          const radiusX = 350; // Elliptical orbit x
          const radiusY = 190; // Elliptical orbit y
          const left = 50 + (radiusX * Math.cos(angle)) / 8; // % position
          const top = 50 + (radiusY * Math.sin(angle)) / 5; // % position

          const sectorPlats = platforms.filter(p => p.sector === sec.id);
          const isFaded = selectedSector !== null && selectedSector !== sec.id;

          return (
            <div
              key={sec.id}
              className={`absolute -translate-x-1/2 -translate-y-1/2 transition-opacity duration-500 z-10 ${
                isFaded ? 'opacity-20 pointer-events-none' : 'opacity-100'
              }`}
              style={{ left: `${left}%`, top: `${top}%` }}
            >
              {/* Elliptical dashed orbit path for sector */}
              <div className="absolute -inset-16 rounded-full border border-dashed border-white/5 animate-pulse"></div>

              {/* Sector Title Plate */}
              <div className="relative glass-panel px-4 py-2.5 rounded-xl border border-white/10 text-center min-w-[170px]">
                <span className={`block text-[9px] font-mono tracking-widest uppercase font-bold ${sec.color}`}>
                  {sec.label}
                </span>

                {/* Orbiting Planets (Platforms of this sector) */}
                <div className="flex justify-center space-x-1.5 mt-2">
                  {sectorPlats.map((plat) => {
                    const isHovered = hoveredPlanet?.id === plat.id;
                    return (
                      <button
                        key={plat.id}
                        onClick={() => handlePlanetClick(plat)}
                        onMouseEnter={() => { setHoveredPlanet(plat); playSound('hover'); }}
                        className={`relative w-8 h-8 rounded-full flex items-center justify-center text-sm border cursor-none transition-all duration-300 clickable-planet ${
                          isHovered
                            ? 'bg-purple-600 border-purple-400 scale-125 shadow-[0_0_15px_rgba(168,85,247,0.6)]'
                            : 'bg-black/40 border-white/15 hover:border-white/40'
                        }`}
                        title={plat.name}
                      >
                        <span>{plat.logo}</span>
                        {/* Interactive dynamic status beacon */}
                        <span className={`absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full border border-black ${
                          plat.status === 'active' ? 'bg-green-500 animate-pulse' :
                          plat.status === 'development' ? 'bg-amber-500' : 'bg-blue-400'
                        }`} />
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          );
        })}

        {/* Dynamic HUD Overlay Details Card */}
        {hoveredPlanet && (
          <div className="absolute bottom-4 left-4 z-30 max-w-sm glass-panel p-5 rounded-2xl border border-purple-500/30 shadow-2xl animate-fade-in text-left">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-widest">
                // PLATFORM telemetry
              </span>
              <button
                onClick={() => setHoveredPlanet(null)}
                className="text-gray-400 hover:text-white text-xs font-mono cursor-none"
              >
                [X]
              </button>
            </div>

            <div className="flex items-center space-x-3 mb-3">
              <span className="text-2xl p-2 rounded-xl bg-purple-500/10 border border-purple-500/20">
                {hoveredPlanet.logo}
              </span>
              <div>
                <h3 className="font-orbitron font-bold text-white text-lg leading-tight">
                  {hoveredPlanet.name}
                </h3>
                <span className="text-xs text-gray-400 font-mono">
                  {hoveredPlanet.zone}
                </span>
              </div>
            </div>

            <p className="text-xs text-gray-300 leading-relaxed mb-4">
              {language === 'fr'
                ? (translations.fr as any)[hoveredPlanet.shortDescKey] || t.platRSSDesc
                : (translations.en as any)[hoveredPlanet.shortDescKey] || t.platRSSDesc
              }
            </p>

            <div className="flex items-center justify-between text-xs font-mono border-t border-white/5 pt-3">
              <span className="text-gray-400">
                {t.crmStatusLabel}:{' '}
                <span className={`font-semibold ${
                  hoveredPlanet.status === 'active' ? 'text-green-400' :
                  hoveredPlanet.status === 'development' ? 'text-amber-400' : 'text-blue-300'
                }`}>
                  {hoveredPlanet.status === 'active' ? t.statusActive : hoveredPlanet.status === 'development' ? t.statusDev : t.statusSoon}
                </span>
              </span>
              <button
                onClick={() => handlePlanetClick(hoveredPlanet)}
                className="flex items-center space-x-1 text-purple-400 hover:text-purple-300 font-bold uppercase tracking-wider cursor-none"
              >
                <span>{t.exploreProject}</span>
                <span>&rarr;</span>
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Elegant Mobile Cards View Fallback */}
      <div className="block md:hidden space-y-4 max-w-md mx-auto relative z-10">
        <div className="flex items-center space-x-2 text-xs text-purple-400 font-mono justify-center mb-2">
          <Info className="w-3.5 h-3.5" />
          <span>Tap on any card to view detailed specifications</span>
        </div>

        {sectors.map((sec) => {
          const sectorPlats = platforms.filter(p => p.sector === sec.id);
          const isFaded = selectedSector !== null && selectedSector !== sec.id;
          if (isFaded) return null;

          return (
            <div key={sec.id} className="glass-panel p-5 rounded-2xl border border-white/10 space-y-4">
              <div className="border-b border-white/5 pb-2">
                <h3 className={`font-orbitron font-bold text-sm uppercase tracking-wider ${sec.color}`}>
                  {sec.label}
                </h3>
                <p className="text-xs text-gray-400 mt-1">
                  {sec.desc}
                </p>
              </div>

              <div className="space-y-2.5">
                {sectorPlats.map((plat) => (
                  <button
                    key={plat.id}
                    onClick={() => handlePlanetClick(plat)}
                    className="w-full flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/5 hover:border-purple-500/30 text-left transition-all"
                  >
                    <div className="flex items-center space-x-3">
                      <span className="text-xl">{plat.logo}</span>
                      <div>
                        <span className="block text-sm font-bold text-white">{plat.name}</span>
                        <span className="block text-[10px] text-gray-400">{plat.zone}</span>
                      </div>
                    </div>
                    <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full border ${
                      plat.status === 'active' ? 'text-green-400 border-green-500/20 bg-green-500/5' :
                      plat.status === 'development' ? 'text-amber-400 border-amber-500/20 bg-amber-500/5' :
                      'text-blue-400 border-blue-500/20 bg-blue-500/5'
                    }`}>
                      {plat.status === 'active' ? t.statusActive : plat.status === 'development' ? t.statusDev : t.statusSoon}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
