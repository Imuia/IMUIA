import React from 'react';
import { useAppState } from '../data/useAppState';
import { translations } from '../data/translations';
import { Globe, MapPin } from 'lucide-react';

export const Territories: React.FC = () => {
  const { language, playSound } = useAppState();
  const t = translations[language];

  const territoryNodes = [
    { name: 'France (Corse / Cannes / Paris)', type: 'Activité Majeure', desc: 'Immo Neuf Corse, Investir Immobilier Corse, Parking Cannes, DevisProGratuit' },
    { name: 'Madagascar (Nosy Be / Antananarivo / Sainte-Marie)', type: 'Écosystème Dédié', desc: 'Mariage Madagascar, MadaImmo' },
    { name: 'Maroc (Taghazout / Agadir / Marrakech)', type: 'Axe Expansion Nord-Afrique', desc: 'Taghazout Prestige, EbikeMaroc.bike' },
    { name: 'Europe (Belgique / Suisse / Allemagne)', type: 'Déploiement Transfrontalier', desc: 'RentSoundSystem, Architect-du-LED' },
    { name: 'Global / Digital Nomad Space', type: 'Réseau Virtuel', desc: 'MonPonton, MiaouMiaou-OuafOuaf' }
  ];

  return (
    <div className="relative min-h-[calc(100vh-80px)] py-12 px-4 space-y-12">
      <div className="absolute inset-0 stars-bg opacity-30 pointer-events-none"></div>

      <div className="text-center max-w-3xl mx-auto space-y-4 relative z-10">
        <h2 className="text-xs font-orbitron font-bold text-cyan-400 tracking-widest uppercase flex items-center justify-center space-x-2">
          <Globe className="w-4 h-4 animate-spin-slow" />
          <span>Global Deployment Grid</span>
        </h2>
        <h1 className="text-3xl md:text-5xl font-black font-orbitron uppercase text-white leading-tight">
          {t.territoriesTitle}
        </h1>
        <p className="text-sm md:text-base text-gray-400 leading-relaxed font-light">
          {t.territoriesDesc}
        </p>
      </div>

      {/* Holographic Earth World Map Visualizer */}
      <div className="max-w-5xl mx-auto glass-panel p-8 rounded-3xl border border-purple-500/30 relative z-10 text-center overflow-hidden">
        <div className="relative h-64 md:h-80 w-full flex items-center justify-center border border-white/10 rounded-2xl bg-gradient-to-b from-indigo-950/40 to-black">
          {/* Cyber grid overlay */}
          <div className="absolute inset-0 bg-[radial-gradient(#a855f7_1px,transparent_1px)] [background-size:16px_16px] opacity-20"></div>

          {/* Central Holographic Globe Sphere */}
          <div className="relative w-48 h-48 md:w-60 md:h-60 rounded-full border border-cyan-400/40 shadow-[0_0_60px_rgba(34,211,238,0.2)] flex items-center justify-center">
            <div className="absolute w-full h-[1px] bg-cyan-400/30"></div>
            <div className="absolute h-full w-[1px] bg-cyan-400/30"></div>
            <div className="absolute w-[120%] h-[50%] border border-dashed border-cyan-400/30 rounded-[50%] rotate-12 animate-orbit"></div>

            <div className="text-center space-y-1">
              <span className="font-orbitron font-black text-white text-lg tracking-widest">IMUIA</span>
              <span className="block text-[9px] font-mono text-cyan-400 uppercase">EARTH ORBIT NODE</span>
            </div>
          </div>
        </div>

        {/* Territory Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8 text-left">
          {territoryNodes.map((node, i) => (
            <div
              key={i}
              onMouseEnter={() => playSound('hover')}
              className="glass-panel p-5 rounded-2xl border border-white/5 hover:border-purple-500/40 transition-all"
            >
              <div className="flex items-center space-x-2 text-purple-400 mb-2">
                <MapPin className="w-4 h-4 flex-shrink-0" />
                <span className="text-[10px] font-mono uppercase bg-purple-500/10 px-2 py-0.5 rounded font-bold">
                  {node.type}
                </span>
              </div>
              <h4 className="font-orbitron font-bold text-white text-sm mb-1.5">
                {node.name}
              </h4>
              <p className="text-xs text-gray-400 leading-relaxed font-light">
                {node.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
