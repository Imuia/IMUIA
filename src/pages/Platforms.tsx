import React, { useState } from 'react';
import { useAppState } from '../data/useAppState';
import type { Platform } from '../data/AppState';
import { translations } from '../data/translations';
import { MapPin, ExternalLink, ArrowLeft, ShieldCheck, Heart, Cpu, Globe, Rocket, HelpCircle } from 'lucide-react';

export const Platforms: React.FC = () => {
  const {
    language,
    platforms,
    playSound,
    activePlatformForDetail,
    setActivePlatformForDetail,
    setActiveSection
  } = useAppState();

  const t = translations[language];
  const [filter, setFilter] = useState<'all' | 'immo' | 'tourism' | 'events' | 'economy' | 'services' | 'tech'>('all');
  const [favorites, setFavorites] = useState<string[]>([]);

  const detailPlatform = platforms.find(p => p.id === activePlatformForDetail);

  const toggleFavorite = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    playSound('click');
    setFavorites(prev =>
      prev.includes(id) ? prev.filter(f => f !== id) : [...prev, id]
    );
  };

  const handleCTA = (section: string) => {
    setActiveSection(section);
    setActivePlatformForDetail(null);
    playSound('space');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const filteredPlatforms = filter === 'all'
    ? platforms
    : platforms.filter(p => p.sector === filter);

  const getSectorColor = (sect: Platform['sector']) => {
    switch (sect) {
      case 'immo': return 'text-purple-400 border-purple-500/20 bg-purple-500/5';
      case 'tourism': return 'text-pink-400 border-pink-500/20 bg-pink-500/5';
      case 'events': return 'text-blue-400 border-blue-500/20 bg-blue-500/5';
      case 'economy': return 'text-cyan-400 border-cyan-500/20 bg-cyan-500/5';
      case 'services': return 'text-green-400 border-green-500/20 bg-green-500/5';
      case 'tech': return 'text-amber-400 border-amber-500/20 bg-amber-500/5';
      default: return 'text-gray-400 border-gray-500/20 bg-gray-500/5';
    }
  };

  const getStatusBadge = (stat: Platform['status']) => {
    switch (stat) {
      case 'active':
        return 'bg-green-500/10 border-green-500/30 text-green-400';
      case 'development':
        return 'bg-amber-500/10 border-amber-500/30 text-amber-400';
      case 'soon':
        return 'bg-blue-500/10 border-blue-500/30 text-blue-400';
      default:
        return 'bg-gray-500/10 border-gray-500/30 text-gray-400';
    }
  };

  return (
    <div className="relative min-h-[calc(100vh-80px)] py-12 px-4 space-y-12">
      <div className="absolute inset-0 stars-bg opacity-30 pointer-events-none"></div>

      <div className="text-center max-w-3xl mx-auto space-y-4 relative z-10">
        <h2 className="text-xs font-orbitron font-bold text-cyan-400 tracking-widest uppercase flex items-center justify-center space-x-2">
          <Cpu className="w-4 h-4" />
          <span>Éditeur de Services Autonomes</span>
        </h2>
        <h1 className="text-3xl md:text-5xl font-black font-orbitron uppercase text-white leading-tight">
          Notre Flotte de 12 Plateformes
        </h1>
        <p className="text-sm md:text-base text-gray-400 leading-relaxed font-light">
          IMUIA n'est pas une agence web classique. Nous imaginons, concevons, finançons et exploitons en propre nos marques, plateformes numériques et concepts innovants.
        </p>
      </div>

      {/* Filter Toolbar controls */}
      <div className="flex flex-wrap items-center justify-center gap-2 relative z-10 max-w-5xl mx-auto">
        {(['all', 'immo', 'tourism', 'events', 'economy', 'services', 'tech'] as const).map((s) => (
          <button
            key={s}
            onClick={() => { setFilter(s); playSound('click'); }}
            className={`px-4 py-2 rounded-full text-xs font-bold font-orbitron tracking-widest uppercase transition-all duration-200 cursor-none ${
              filter === s
                ? 'bg-purple-600 text-white shadow-lg'
                : 'bg-white/5 text-gray-400 hover:text-white hover:bg-white/10'
            }`}
          >
            {s === 'all' ? (language === 'fr' ? 'Toutes les flottes' : 'All fleets') : s.toUpperCase()}
          </button>
        ))}
      </div>

      {/* Plateformes Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto relative z-10">
        {filteredPlatforms.map((p) => {
          const isFav = favorites.includes(p.id);
          const localizedShort = language === 'fr'
            ? (translations.fr as any)[p.shortDescKey] || t.platRSSDesc
            : (translations.en as any)[p.shortDescKey] || t.platRSSDesc;

          return (
            <div
              key={p.id}
              onClick={() => { setActivePlatformForDetail(p.id); playSound('space'); }}
              onMouseEnter={() => playSound('hover')}
              className="group relative rounded-2xl glass-panel p-6 border border-white/5 hover:border-purple-500/40 hover:shadow-[0_0_25px_rgba(168,85,247,0.15)] transition-all duration-300 cursor-none hover:translate-y-[-2px] flex flex-col h-full text-left"
            >
              <div className="flex items-start justify-between mb-4">
                <span className="text-3xl p-3 rounded-xl bg-purple-500/10 border border-purple-500/20 group-hover:scale-110 transition-transform">
                  {p.logo}
                </span>

                <div className="flex items-center space-x-1.5">
                  <button
                    onClick={(e) => toggleFavorite(p.id, e)}
                    className="p-2 rounded-lg bg-white/5 border border-white/10 text-gray-400 hover:text-red-400 transition-colors cursor-none"
                    title="Ajouter aux favoris"
                  >
                    <Heart className={`w-3.5 h-3.5 ${isFav ? 'fill-red-500 text-red-500' : ''}`} />
                  </button>
                  <span className={`text-[10px] font-mono px-2.5 py-1 rounded-full border uppercase ${getStatusBadge(p.status)}`}>
                    {p.status === 'active' ? t.statusActive : p.status === 'development' ? t.statusDev : t.statusSoon}
                  </span>
                </div>
              </div>

              <div className="space-y-2 flex-1 mb-6">
                <span className={`inline-block text-[10px] font-mono font-bold tracking-widest uppercase px-2 py-0.5 rounded border ${getSectorColor(p.sector)}`}>
                  {p.sector}
                </span>
                <h3 className="text-xl font-bold font-orbitron text-white group-hover:glow-text-purple transition-all leading-tight">
                  {p.name}
                </h3>
                <p className="text-xs text-gray-400 leading-relaxed font-light">
                  {localizedShort}
                </p>
              </div>

              <div className="border-t border-white/5 pt-4 flex items-center justify-between text-xs font-mono text-purple-400 font-bold">
                <span className="text-gray-500 flex items-center space-x-1 font-normal">
                  <MapPin className="w-3.5 h-3.5" />
                  <span>{p.zone}</span>
                </span>
                <span className="group-hover:translate-x-1 transition-transform flex items-center space-x-1">
                  <span>Explorer</span>
                  <span>&rarr;</span>
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Detailed Specification Sheet Modal */}
      {detailPlatform && (
        <div className="fixed inset-0 bg-black/85 backdrop-blur-md z-50 flex items-center justify-center p-4 overflow-y-auto animate-fade-in">
          <div className="glass-panel max-w-3xl w-full rounded-3xl border border-purple-500/40 p-6 md:p-8 space-y-6 relative text-left my-8">

            {/* Modal Close Button */}
            <button
              onClick={() => { setActivePlatformForDetail(null); playSound('click'); }}
              className="absolute top-6 right-6 p-2 rounded-lg bg-white/5 border border-white/10 text-gray-400 hover:text-white transition-all cursor-none"
              title={t.close}
            >
              <ArrowLeft className="w-4 h-4" />
            </button>

            {/* Platform Title specifications */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/5 pb-6">
              <div className="flex items-center space-x-4">
                <span className="text-4xl p-4 rounded-2xl bg-purple-500/15 border border-purple-500/30">
                  {detailPlatform.logo}
                </span>
                <div>
                  <h2 className="text-2xl md:text-3xl font-black font-orbitron text-white">
                    {detailPlatform.name}
                  </h2>
                  <div className="flex flex-wrap items-center gap-2 mt-1.5">
                    <span className={`text-xs font-mono font-bold uppercase tracking-widest px-2.5 py-0.5 rounded border ${getSectorColor(detailPlatform.sector)}`}>
                      {detailPlatform.sector}
                    </span>
                    <span className="text-xs text-gray-400 font-mono flex items-center space-x-1">
                      <Globe className="w-3.5 h-3.5 text-cyan-400" />
                      <span>{detailPlatform.zone}</span>
                    </span>
                  </div>
                </div>
              </div>

              <span className={`self-start md:self-center text-xs font-mono px-3 py-1 rounded-full border uppercase ${getStatusBadge(detailPlatform.status)}`}>
                {detailPlatform.status === 'active' ? t.statusActive : detailPlatform.status === 'development' ? t.statusDev : t.statusSoon}
              </span>
            </div>

            {/* Description and Telemetries */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

              {/* Main story description */}
              <div className="md:col-span-2 space-y-4">
                <h4 className="font-orbitron font-bold text-sm text-cyan-400 tracking-wider uppercase">
                  // Descriptif Spécificationnel &amp; Architecture
                </h4>
                <p className="text-sm text-gray-300 leading-relaxed font-light">
                  {language === 'fr'
                    ? (translations.fr as any)[detailPlatform.fullDescKey] || t.platRSSFull
                    : (translations.en as any)[detailPlatform.fullDescKey] || t.platRSSFull
                  }
                </p>
                <div className="p-4 rounded-xl bg-purple-500/5 border border-purple-500/10 flex items-start space-x-2.5">
                  <ShieldCheck className="w-4 h-4 text-purple-400 mt-0.5 flex-shrink-0" />
                  <p className="text-xs text-purple-300/90 leading-relaxed">
                    Ce projet est opéré de manière 100% indépendante. L'infrastructure logicielle, la passerelle de réservation et le CRM de gestion de clientèle sont développés en interne par le pôle d'ingénierie IMUIA.
                  </p>
                </div>
              </div>

              {/* Telemetries / Performance */}
              <div className="glass-panel p-5 rounded-2xl border border-white/5 space-y-4 text-xs font-mono">
                <h4 className="font-orbitron font-bold text-xs text-white uppercase tracking-wider mb-2">
                  Télémétries Système
                </h4>

                <div className="border-b border-white/5 pb-2">
                  <div className="text-gray-500 uppercase text-[10px]">Temps de Chargement</div>
                  <div className="text-sm font-bold text-green-400">0.28s (Optimisé)</div>
                </div>

                <div className="border-b border-white/5 pb-2">
                  <div className="text-gray-500 uppercase text-[10px]">Active Nodes (Global)</div>
                  <div className="text-sm font-bold text-white">12 Clusters Edge</div>
                </div>

                <div className="border-b border-white/5 pb-2">
                  <div className="text-gray-500 uppercase text-[10px]">Modèle de Monétisation</div>
                  <div className="text-sm font-bold text-white">SaaS / Commission directe</div>
                </div>

                <div>
                  <div className="text-gray-500 uppercase text-[10px]">Sécurité Cloud</div>
                  <div className="text-sm font-bold text-cyan-400">SSL 256 bits / WAF Edge</div>
                </div>
              </div>
            </div>

            {/* Quick action triggers */}
            <div className="flex flex-wrap items-center justify-between gap-4 border-t border-white/5 pt-6">
              <a
                href={detailPlatform.url}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => playSound('click')}
                className="flex items-center space-x-2 px-4 py-2 bg-white/5 hover:bg-white/10 text-white rounded-xl text-sm border border-white/10 transition-colors cursor-none"
              >
                <span>Accéder à {detailPlatform.name}</span>
                <ExternalLink className="w-4 h-4" />
              </a>

              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => handleCTA('partners')}
                  className="flex items-center space-x-1.5 px-4 py-2 text-xs bg-purple-600 hover:bg-purple-500 text-white font-bold font-orbitron uppercase tracking-widest rounded-xl transition-all cursor-none"
                >
                  <Rocket className="w-3.5 h-3.5" />
                  <span>{t.becomePartner}</span>
                </button>
                <button
                  onClick={() => handleCTA('contact')}
                  className="flex items-center space-x-1.5 px-4 py-2 text-xs bg-cyan-600/20 hover:bg-cyan-600 text-cyan-300 hover:text-white border border-cyan-500/30 rounded-xl transition-all cursor-none"
                >
                  <HelpCircle className="w-3.5 h-3.5" />
                  <span>Nous contacter</span>
                </button>
              </div>
            </div>

          </div>
        </div>
      )}
    </div>
  );
};
