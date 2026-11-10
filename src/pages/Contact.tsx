import React, { useState } from 'react';
import { useAppState } from '../data/useAppState';
import { Send, Rocket, Globe, Radio, Sparkles, CheckCircle2 } from 'lucide-react';

export const Contact: React.FC = () => {
  const { language: _language, setActiveSection, playSound, addContact } = useAppState();

  const [directName, setDirectName] = useState('');
  const [directEmail, setDirectEmail] = useState('');
  const [directSubject, setDirectSubject] = useState('');
  const [directMessage, setDirectMessage] = useState('');
  const [sentSuccess, setSentSuccess] = useState(false);
  const [isTransmitting, setIsTransmitting] = useState(false);

  const handlePartnerCTA = (intent: 'project' | 'partner' | 'investor') => {
    if (typeof window !== 'undefined') {
      sessionStorage.setItem('imuia_partner_intent', intent);
    }
    setActiveSection('partners');
    playSound('space');
  };

  const handleDirectSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!directEmail || !directMessage) return;

    setIsTransmitting(true);
    playSound('space');

    setTimeout(() => {
      addContact({
        firstName: directName.split(' ')[0] || 'Voyageur',
        lastName: directName.split(' ').slice(1).join(' ') || 'Spatial',
        company: 'Contact Direct',
        function: 'Prise de contact',
        email: directEmail,
        phone: '',
        country: 'Global',
        partnerType: 'Direct Contact',
        project: 'imuia-general',
        budget: '0',
        proposal: `[${directSubject || 'Message direct'}] ${directMessage}`
      });

      setIsTransmitting(false);
      setSentSuccess(true);
      playSound('success');
      setDirectName('');
      setDirectEmail('');
      setDirectSubject('');
      setDirectMessage('');
    }, 1200);
  };

  return (
    <div className="relative min-h-[calc(100vh-80px)] py-12 px-4 space-y-16 overflow-hidden">
      {/* Background space environment */}
      <div className="absolute inset-0 stars-bg opacity-45 pointer-events-none"></div>
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-cyan-900/10 rounded-full blur-3xl pointer-events-none"></div>

      {/* Visual Centerpiece: The Earth / IMUIA Planet viewed from deep space */}
      <div className="relative max-w-4xl mx-auto flex flex-col items-center justify-center text-center z-10 pt-4">
        <div className="relative w-64 h-64 md:w-80 md:h-80 flex items-center justify-center mb-8">
          {/* Atmospheric outer glows */}
          <div className="absolute inset-0 rounded-full bg-cyan-500/20 blur-3xl animate-pulse"></div>
          <div className="absolute -inset-4 rounded-full bg-blue-600/15 blur-2xl"></div>

          {/* Earth planet sphere */}
          <div className="relative w-52 h-52 md:w-64 md:h-64 rounded-full overflow-hidden shadow-[0_0_60px_rgba(34,211,238,0.4)] border border-cyan-400/40 bg-gradient-to-b from-blue-900 via-slate-900 to-black">
            {/* SVG continent silhouettes & atmosphere clouds simulation */}
            <svg viewBox="0 0 200 200" className="w-full h-full opacity-80 animate-spin-very-slow">
              <defs>
                <radialGradient id="earthGlow" cx="50%" cy="30%" r="70%">
                  <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.8" />
                  <stop offset="50%" stopColor="#0284c7" stopOpacity="0.4" />
                  <stop offset="100%" stopColor="#030712" stopOpacity="0.95" />
                </radialGradient>
              </defs>
              <circle cx="100" cy="100" r="100" fill="url(#earthGlow)" />
              {/* Landmass paths */}
              <path d="M40 70 Q60 50 90 65 T140 70 T170 110 T130 150 T80 140 T50 110 Z" fill="#10b981" opacity="0.35" />
              <path d="M70 40 Q100 30 130 50 T150 90 T120 120 T70 90 Z" fill="#059669" opacity="0.4" />
              {/* Cloud swirls */}
              <circle cx="85" cy="85" r="45" stroke="#ffffff" strokeWidth="6" opacity="0.2" strokeDasharray="30 20" fill="none" />
              <circle cx="115" cy="115" r="65" stroke="#ffffff" strokeWidth="4" opacity="0.15" strokeDasharray="40 30" fill="none" />
            </svg>

            {/* Terminator shadow line */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-black/40 to-black/90 pointer-events-none"></div>
          </div>

          {/* IMUIA orbital satellite / station orbiting the Earth */}
          <div className="absolute w-72 h-72 md:w-96 md:h-96 rounded-full border border-dashed border-cyan-400/30 animate-orbit pointer-events-none">
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 flex items-center space-x-1.5 px-2 py-0.5 rounded-full bg-purple-950/90 border border-purple-400/60 shadow-[0_0_15px_#a855f7]">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping"></span>
              <span className="text-[8px] font-mono font-bold text-cyan-300 uppercase">IMUIA-ORBIT-1</span>
            </div>
          </div>
        </div>

        {/* Section Heading & Subtitle exactly matching the prompt */}
        <div className="space-y-4 max-w-2xl mx-auto">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-300 text-xs font-mono">
            <Radio className="w-3.5 h-3.5 text-purple-400 animate-pulse" />
            <span>TRANSMISSION SPATIALE OUVERTE</span>
          </div>

          <h1 className="text-3xl md:text-5xl font-black font-orbitron text-white uppercase tracking-tight leading-tight">
            Vous avez une idée à mettre en orbite ?
          </h1>

          <p className="text-base md:text-lg text-gray-300 leading-relaxed font-light">
            « Projet innovant, partenariat, investissement ou proposition de collaboration : entrez en contact avec l’équipage IMUIA. »
          </p>
        </div>

        {/* 4 Action Buttons required by prompt */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3.5 mt-8 w-full max-w-4xl">
          <button
            onClick={() => handlePartnerCTA('project')}
            onMouseEnter={() => playSound('hover')}
            className="flex items-center justify-center space-x-2 px-5 py-3.5 rounded-2xl bg-purple-600 hover:bg-purple-500 text-white font-orbitron font-bold text-xs uppercase tracking-wider transition-all duration-300 shadow-[0_0_20px_rgba(168,85,247,0.35)] cursor-none hover:translate-y-[-2px]"
          >
            <Rocket className="w-4 h-4" />
            <span>Présenter mon projet</span>
          </button>

          <button
            onClick={() => handlePartnerCTA('partner')}
            onMouseEnter={() => playSound('hover')}
            className="flex items-center justify-center space-x-2 px-5 py-3.5 rounded-2xl bg-white/5 hover:bg-white/10 text-white border border-white/10 hover:border-purple-500/50 font-orbitron font-bold text-xs uppercase tracking-wider transition-all duration-300 cursor-none hover:translate-y-[-2px]"
          >
            <Sparkles className="w-4 h-4 text-purple-400" />
            <span>Devenir partenaire</span>
          </button>

          <button
            onClick={() => handlePartnerCTA('investor')}
            onMouseEnter={() => playSound('hover')}
            className="flex items-center justify-center space-x-2 px-5 py-3.5 rounded-2xl bg-white/5 hover:bg-white/10 text-white border border-white/10 hover:border-cyan-500/50 font-orbitron font-bold text-xs uppercase tracking-wider transition-all duration-300 cursor-none hover:translate-y-[-2px]"
          >
            <Globe className="w-4 h-4 text-cyan-400" />
            <span>Investir dans un univers</span>
          </button>

          <a
            href="#direct-console"
            onClick={() => playSound('click')}
            className="flex items-center justify-center space-x-2 px-5 py-3.5 rounded-2xl bg-gradient-to-r from-cyan-600/30 to-blue-600/30 hover:from-cyan-600/50 hover:to-blue-600/50 text-cyan-300 border border-cyan-500/40 font-orbitron font-bold text-xs uppercase tracking-wider transition-all duration-300 cursor-none hover:translate-y-[-2px]"
          >
            <Send className="w-4 h-4" />
            <span>Contacter IMUIA</span>
          </a>
        </div>
      </div>

      {/* Direct Radio Frequency Message Console */}
      <div id="direct-console" className="max-w-3xl mx-auto glass-panel p-6 md:p-8 rounded-3xl border border-white/10 relative z-10 text-left space-y-6">
        <div className="flex items-center justify-between border-b border-white/5 pb-4">
          <div>
            <h2 className="text-lg font-bold font-orbitron text-white uppercase flex items-center space-x-2">
              <Radio className="w-4 h-4 text-cyan-400" />
              <span>Console de Transmission Directe</span>
            </h2>
            <p className="text-xs text-gray-400">Canal radio crypté à destination de la passerelle IMUIA</p>
          </div>
          <span className="text-[10px] font-mono text-cyan-400 bg-cyan-950/40 px-2.5 py-1 rounded-full border border-cyan-500/30">
            FREQ: 142.85 MHz
          </span>
        </div>

        {sentSuccess && (
          <div className="p-4 rounded-xl bg-green-500/10 border border-green-500/30 text-green-300 flex items-start space-x-3 text-xs">
            <CheckCircle2 className="w-5 h-5 flex-shrink-0 text-green-400" />
            <div>
              <p className="font-bold">Message reçu dans la station orbitale !</p>
              <p className="text-gray-300 mt-0.5">Votre signal a été capté par l'équipage IMUIA. Une réponse vous sera transmise sous 24 à 48 heures.</p>
            </div>
          </div>
        )}

        <form onSubmit={handleDirectSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="block text-[11px] font-mono uppercase text-gray-400">Votre Nom ou Indicatif</label>
              <input
                type="text"
                required
                value={directName}
                onChange={(e) => setDirectName(e.target.value)}
                placeholder="Ex: Gabriel Vance"
                className="w-full bg-black/50 border border-white/10 focus:border-cyan-400 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none"
              />
            </div>
            <div className="space-y-1">
              <label className="block text-[11px] font-mono uppercase text-gray-400">Canal de Réponse (E-mail)</label>
              <input
                type="email"
                required
                value={directEmail}
                onChange={(e) => setDirectEmail(e.target.value)}
                placeholder="contact@votre-domaine.com"
                className="w-full bg-black/50 border border-white/10 focus:border-cyan-400 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="block text-[11px] font-mono uppercase text-gray-400">Objet de la Transmission</label>
            <input
              type="text"
              required
              value={directSubject}
              onChange={(e) => setDirectSubject(e.target.value)}
              placeholder="Ex: Opportunité de synergie / Question sur une plateforme"
              className="w-full bg-black/50 border border-white/10 focus:border-cyan-400 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none"
            />
          </div>

          <div className="space-y-1">
            <label className="block text-[11px] font-mono uppercase text-gray-400">Message / Requête</label>
            <textarea
              required
              rows={4}
              value={directMessage}
              onChange={(e) => setDirectMessage(e.target.value)}
              placeholder="Transmettez vos coordonnées et les détails de votre demande..."
              className="w-full bg-black/50 border border-white/10 focus:border-cyan-400 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none"
            />
          </div>

          <button
            type="submit"
            disabled={isTransmitting}
            className="w-full flex items-center justify-center space-x-2 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-bold font-orbitron text-xs tracking-widest uppercase rounded-xl transition-all cursor-none disabled:opacity-50"
          >
            <Send className="w-4 h-4" />
            <span>{isTransmitting ? 'Transmission en cours...' : 'Émettre le signal'}</span>
          </button>
        </form>

        <div className="border-t border-white/5 pt-4 flex flex-col sm:flex-row items-center justify-between text-[11px] font-mono text-gray-500 gap-2">
          <span>// HQ: PARIS &amp; MARSEILLE &amp; CASABLANCA</span>
          <span className="text-cyan-400">contact@imuia.com</span>
        </div>
      </div>
    </div>
  );
};
