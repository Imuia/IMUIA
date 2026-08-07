import React, { useState } from 'react';
import { useAppState } from '../data/AppState';
import { translations } from '../data/translations';
import { Globe, Award } from 'lucide-react';

export const Territories: React.FC = () => {
  const { language, playSound } = useAppState();
  const t = translations[language];

  const [selectedHub, setSelectedHub] = useState<string>('maroc');

  const hubs = [
    {
      id: 'maroc',
      name: 'Maroc / Morocco',
      cities: 'Taghazout, Agadir, Marrakech, Essaouira',
      activePlats: 'Taghazout Prestige, EbikeMaroc.bike',
      stats: '15,000+ actifs annuels, 2 flottes de vélos',
      focus: 'Tourisme de luxe, surf premium, mobilité verte & conciergerie VIP.',
      desc: 'Le Maroc constitue un pôle majeur d\'incubation pour nos concepts de mobilité collaborative et de conciergerie VIP.'
    },
    {
      id: 'mada',
      name: 'Madagascar',
      cities: 'Nosy Be, Sainte-Marie, Antananarivo, Tamatave',
      activePlats: 'Mariage-Madagascar.com, MadaImmo.com',
      stats: 'Réseau hôtelier d\'élite certifié, 1er portail immo de la Grande Île',
      focus: 'Organisation de mariages d\'exception, lunes de miel, immobilier certifié et de prestige.',
      desc: 'Madagascar représente notre pôle de prédilection pour le voyage d\'exception sur-mesure et la fiabilisation des transactions foncières.'
    },
    {
      id: 'corse',
      name: 'Corse / Corsica',
      cities: 'Bastia, Ajaccio, Calvi, Porto-Vecchio',
      activePlats: 'Immo Neuf Corse, Investir Immobilier Corse',
      stats: '30+ promoteurs d\'élite partenaires, 3D immersive views',
      focus: 'Programmes de construction neuve, conseils en fiscalité de standing et gestion de patrimoine.',
      desc: 'L\'Île de Beauté accueille nos infrastructures de haute technologie d\'annonces et de conseils d\'investissements premium.'
    },
    {
      id: 'cannes',
      name: 'Cannes & Côte d\'Azur',
      cities: 'Cannes, La Croisette, Nice, Saint-Tropez',
      activePlats: 'Parking-Cannes.com, RentSoundSystem.com (Sud)',
      stats: 'Box sécurisés de luxe, voituriers connectés, logistique audio d\'élite',
      focus: 'Logistique événementielle, sonorisation de prestige, réservations de places de parking privatives.',
      desc: 'La Côte d\'Azur est le cœur battant de notre logistique événementielle et de nos solutions de stationnement de prestige.'
    }
  ];

  const activeHub = hubs.find(h => h.id === selectedHub) || hubs[0];

  return (
    <div className="relative min-h-[calc(100vh-80px)] py-12 px-4 space-y-12">
      <div className="absolute inset-0 stars-bg opacity-30 pointer-events-none"></div>

      <div className="text-center max-w-3xl mx-auto space-y-4 relative z-10">
        <h2 className="text-xs font-orbitron font-bold text-cyan-400 tracking-widest uppercase flex items-center justify-center space-x-2">
          <Globe className="w-4 h-4 animate-spin-slow" />
          <span>{t.navTerritories}</span>
        </h2>
        <h1 className="text-3xl md:text-5xl font-black font-orbitron uppercase text-white leading-tight">
          {t.territoriesTitle}
        </h1>
        <p className="text-sm md:text-base text-gray-400 leading-relaxed font-light">
          {t.territoriesDesc} Nos services et plateformes de réservation s'adaptent localement pour connecter utilisateurs et prestataires de confiance.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 max-w-6xl mx-auto relative z-10 items-stretch">

        {/* Hub selector & SVG Map Simulation (Left 3 cols) */}
        <div className="lg:col-span-3 glass-panel p-6 rounded-3xl border border-white/5 flex flex-col justify-between space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="font-orbitron font-bold text-white text-sm uppercase tracking-wider">
              Cartographie des Hubs Orbitaux
            </h3>
            <span className="text-[10px] font-mono text-cyan-400 animate-pulse">// RADAR TRACKING ACTIVE</span>
          </div>

          {/* Simple Vector Styled Visual Representation of the Earth Globe */}
          <div className="relative h-64 border border-dashed border-white/5 rounded-2xl bg-black/40 flex items-center justify-center overflow-hidden">
            {/* Spinning background circles */}
            <div className="absolute w-56 h-56 rounded-full border border-dashed border-purple-500/10 animate-orbit"></div>
            <div className="absolute w-72 h-72 rounded-full border border-dashed border-cyan-400/5 animate-orbit-reverse"></div>

            {/* Simulated world continent shapes with styled text */}
            <div className="text-center font-mono text-[10px] text-gray-600 uppercase select-none relative space-y-4">
              <div>[ EUROPE HUB — FRANCE &amp; CANNES ]</div>
              <div className="translate-x-4">[ MEDITERRANEAN — CORSE ]</div>
              <div className="translate-y-2 -translate-x-6">[ NORTH AFRICA — MAROC ]</div>
              <div className="translate-y-4 translate-x-8">[ INDIAN OCEAN — MADAGASCAR ]</div>
            </div>

            {/* Glowing Map Point Beacons */}
            <button
              onClick={() => { setSelectedHub('maroc'); playSound('click'); }}
              className={`absolute top-2/3 left-1/3 -translate-x-1/2 -translate-y-1/2 cursor-none p-1 z-20`}
            >
              <div className="relative">
                <div className={`absolute -inset-2 rounded-full animate-ping ${selectedHub === 'maroc' ? 'bg-cyan-400' : 'bg-gray-400'}`}></div>
                <div className={`w-3.5 h-3.5 rounded-full border-2 border-black ${selectedHub === 'maroc' ? 'bg-cyan-400 shadow-[0_0_10px_#22d3ee]' : 'bg-gray-400'}`}></div>
              </div>
            </button>

            <button
              onClick={() => { setSelectedHub('corse'); playSound('click'); }}
              className={`absolute top-1/2 left-2/5 -translate-x-1/2 -translate-y-1/2 cursor-none p-1 z-20`}
            >
              <div className="relative">
                <div className={`absolute -inset-2 rounded-full animate-ping ${selectedHub === 'corse' ? 'bg-purple-400' : 'bg-gray-400'}`}></div>
                <div className={`w-3.5 h-3.5 rounded-full border-2 border-black ${selectedHub === 'corse' ? 'bg-purple-500 shadow-[0_0_10px_#a855f7]' : 'bg-gray-400'}`}></div>
              </div>
            </button>

            <button
              onClick={() => { setSelectedHub('cannes'); playSound('click'); }}
              className={`absolute top-2/5 left-[45%] -translate-x-1/2 -translate-y-1/2 cursor-none p-1 z-20`}
            >
              <div className="relative">
                <div className={`absolute -inset-2 rounded-full animate-ping ${selectedHub === 'cannes' ? 'bg-pink-400' : 'bg-gray-400'}`}></div>
                <div className={`w-3.5 h-3.5 rounded-full border-2 border-black ${selectedHub === 'cannes' ? 'bg-pink-500 shadow-[0_0_10px_#ec4899]' : 'bg-gray-400'}`}></div>
              </div>
            </button>

            <button
              onClick={() => { setSelectedHub('mada'); playSound('click'); }}
              className={`absolute bottom-1/5 right-1/4 -translate-x-1/2 -translate-y-1/2 cursor-none p-1 z-20`}
            >
              <div className="relative">
                <div className={`absolute -inset-2 rounded-full animate-ping ${selectedHub === 'mada' ? 'bg-amber-400' : 'bg-gray-400'}`}></div>
                <div className={`w-3.5 h-3.5 rounded-full border-2 border-black ${selectedHub === 'mada' ? 'bg-amber-400 shadow-[0_0_10px_#fbbf24]' : 'bg-gray-400'}`}></div>
              </div>
            </button>
          </div>

          {/* Selector Grid Buttons */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {hubs.map((h) => (
              <button
                key={h.id}
                onClick={() => { setSelectedHub(h.id); playSound('click'); }}
                className={`px-3 py-2 rounded-xl text-xs font-bold font-orbitron transition-all cursor-none border ${
                  selectedHub === h.id
                    ? 'bg-purple-600 border-purple-500 text-white'
                    : 'bg-white/5 border-white/5 text-gray-400 hover:text-white hover:bg-white/10'
                }`}
              >
                {h.name.split(' / ')[0]}
              </button>
            ))}
          </div>
        </div>

        {/* Detailed Hub spec report panel (Right 2 cols) */}
        <div className="lg:col-span-2 glass-panel p-6 rounded-3xl border border-purple-500/30 shadow-2xl flex flex-col justify-between text-left">
          <div className="space-y-4">
            <span className="text-[10px] font-mono text-purple-400 font-bold uppercase tracking-wider block">
              // TELEMETRY FILE: {activeHub.id.toUpperCase()}
            </span>

            <div className="space-y-1">
              <h3 className="text-xl font-black font-orbitron text-white">
                {activeHub.name}
              </h3>
              <p className="text-xs text-gray-400">
                <span className="font-bold text-cyan-400">Villes clés :</span> {activeHub.cities}
              </p>
            </div>

            <p className="text-xs text-gray-300 leading-relaxed font-light">
              {activeHub.desc}
            </p>

            <div className="border-t border-white/5 pt-4 space-y-3">
              <div>
                <span className="block text-[10px] font-mono text-gray-500 uppercase">Projets en Orbite</span>
                <span className="text-xs font-bold text-white block">{activeHub.activePlats}</span>
              </div>

              <div>
                <span className="block text-[10px] font-mono text-gray-500 uppercase">Métriques de Performance</span>
                <span className="text-xs text-cyan-300 block leading-tight">{activeHub.stats}</span>
              </div>

              <div>
                <span className="block text-[10px] font-mono text-gray-500 uppercase">Secteur focalisé</span>
                <span className="text-xs text-purple-300 block leading-tight">{activeHub.focus}</span>
              </div>
            </div>
          </div>

          <div className="border-t border-white/5 pt-4 mt-6 flex items-center justify-between text-[11px] font-mono text-gray-500">
            <span>HUBS IN ORBIT</span>
            <span className="text-purple-400 font-bold font-orbitron flex items-center space-x-1">
              <Award className="w-3.5 h-3.5 text-purple-400" />
              <span>CERTIFIÉ IMUIA</span>
            </span>
          </div>
        </div>

      </div>
    </div>
  );
};
