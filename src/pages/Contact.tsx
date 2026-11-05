import React, { useState } from 'react';
import { useAppState } from '../data/useAppState';
import { translations } from '../data/translations';
import { Rocket, Users, TrendingUp, Mail, Send, CheckCircle, MapPin, Radio, Shield } from 'lucide-react';

export const Contact: React.FC = () => {
  const { language, playSound, setActiveSection, addContact } = useAppState();
  const t = translations[language];

  const [activeModal, setActiveModal] = useState<string | null>(null);
  const [quickName, setQuickName] = useState('');
  const [quickEmail, setQuickEmail] = useState('');
  const [quickMessage, setQuickMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleAction = (intent: 'present' | 'partner' | 'invest' | 'contact') => {
    playSound('space');
    if (intent === 'present') {
      sessionStorage.setItem('imuia_intent', 'Present Project');
      setActiveSection('partners');
    } else if (intent === 'partner') {
      sessionStorage.setItem('imuia_intent', 'Become Partner');
      setActiveSection('partners');
    } else if (intent === 'invest') {
      sessionStorage.setItem('imuia_intent', 'Invest');
      setActiveSection('partners');
    } else {
      setActiveModal('direct_contact');
    }
  };

  const handleQuickSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!quickName || !quickEmail || !quickMessage) return;

    addContact({
      firstName: quickName.split(' ')[0] || 'Voyageur',
      lastName: quickName.split(' ').slice(1).join(' ') || 'Spatial',
      company: 'Direct Transmission',
      function: 'Contact Orbital',
      email: quickEmail,
      phone: '',
      country: 'Global',
      partnerType: 'Direct Contact',
      project: 'IMUIA Core',
      budget: '0',
      proposal: quickMessage
    });

    setSubmitted(true);
    playSound('success');
    setTimeout(() => {
      setSubmitted(false);
      setActiveModal(null);
      setQuickName('');
      setQuickEmail('');
      setQuickMessage('');
    }, 2500);
  };

  return (
    <section className="relative min-h-[calc(100vh-80px)] py-16 px-4 flex flex-col items-center justify-center overflow-hidden">
      {/* Background Starscape */}
      <div className="absolute inset-0 stars-bg opacity-40 pointer-events-none"></div>

      {/* Dynamic Nebulae */}
      <div className="absolute top-1/3 left-1/4 w-[450px] h-[450px] rounded-full nebula-cyan blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] rounded-full nebula-purple blur-3xl pointer-events-none"></div>

      <div className="max-w-5xl mx-auto text-center z-10 space-y-12">
        {/* Spectacular 3D-styled Earth / Planet IMUIA seen from Space */}
        <div className="relative flex justify-center items-center">
          {/* Deep atmospheric glow aura */}
          <div className="absolute w-72 h-72 md:w-96 md:h-96 rounded-full bg-cyan-500/15 blur-3xl animate-pulse pointer-events-none"></div>
          <div className="absolute w-60 h-60 md:w-80 md:h-80 rounded-full bg-blue-600/20 blur-2xl pointer-events-none"></div>

          {/* Central Earth Globe */}
          <div className="relative w-48 h-48 md:w-64 md:h-64 rounded-full border border-cyan-400/40 p-1 bg-gradient-to-tr from-[#020b18] via-[#072448] to-[#0d5c75] shadow-[0_0_60px_rgba(34,211,238,0.35)] flex items-center justify-center hover:scale-105 transition-transform duration-700 group">
            {/* Atmosphere layer gradient */}
            <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle_at_30%_30%,rgba(165,243,252,0.4),transparent_60%)] pointer-events-none"></div>

            {/* Glowing continent silhouettes & flight paths (SVG) */}
            <svg
              className="absolute inset-0 w-full h-full rounded-full opacity-60 group-hover:opacity-85 transition-opacity duration-500"
              viewBox="0 0 200 200"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Stylized continent paths */}
              <path
                d="M45,70 Q60,50 85,60 T125,75 Q150,90 140,120 Q120,150 90,140 Q60,135 45,105 Z"
                fill="#065f46"
                fillOpacity="0.45"
              />
              <path
                d="M110,40 Q130,30 155,45 Q170,70 160,95 Q145,90 130,65 Z"
                fill="#047857"
                fillOpacity="0.4"
              />
              <path
                d="M75,135 Q100,125 120,145 Q125,170 100,175 Q75,165 75,135 Z"
                fill="#065f46"
                fillOpacity="0.4"
              />

              {/* Orbital communications trajectory */}
              <circle
                cx="100"
                cy="100"
                r="78"
                stroke="#22d3ee"
                strokeWidth="1"
                strokeDasharray="4 4"
                className="animate-spin-slow opacity-60"
              />
            </svg>

            {/* Orbital Satellite Beacon */}
            <div className="absolute -top-2 left-1/4 w-3.5 h-3.5 bg-cyan-300 rounded-full shadow-[0_0_12px_#22d3ee] animate-ping"></div>
            <div className="absolute bottom-4 right-2 w-2.5 h-2.5 bg-purple-400 rounded-full shadow-[0_0_10px_#a855f7]"></div>

            {/* Center Planet Label */}
            <div className="relative text-center z-10 select-none">
              <span className="block font-orbitron font-black text-2xl md:text-3xl tracking-widest text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">
                EARTH
              </span>
              <span className="block text-[8px] md:text-[9px] font-mono tracking-widest uppercase text-cyan-300">
                ORBITAL SECTOR // 001
              </span>
            </div>
          </div>
        </div>

        {/* Headings */}
        <div className="space-y-4 max-w-3xl mx-auto">
          <div className="flex items-center justify-center space-x-2 text-cyan-400 font-orbitron text-xs tracking-widest uppercase">
            <Radio className="w-4 h-4 animate-pulse" />
            <span>Transmissions Orbitales</span>
          </div>

          <h1 className="text-3xl md:text-5xl font-black font-orbitron text-white uppercase tracking-tight leading-tight">
            Vous avez une idée à mettre en orbite ?
          </h1>

          <p className="text-base md:text-xl text-gray-300 leading-relaxed font-light">
            Projet innovant, partenariat, investissement ou proposition de collaboration : entrez en contact avec l’équipage IMUIA.
          </p>
        </div>

        {/* The 4 Required Action Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-4 pt-4 max-w-4xl mx-auto">
          {/* Button 1: Présenter mon projet */}
          <button
            onClick={() => handleAction('present')}
            onMouseEnter={() => playSound('hover')}
            className="flex items-center space-x-2.5 px-6 py-4 bg-purple-600 hover:bg-purple-500 text-white font-orbitron font-bold text-xs md:text-sm tracking-widest uppercase rounded-full transition-all duration-300 shadow-[0_0_20px_rgba(168,85,247,0.4)] hover:shadow-[0_0_30px_rgba(168,85,247,0.6)] cursor-none hover:-translate-y-0.5"
          >
            <Rocket className="w-4 h-4" />
            <span>{t.presentProject}</span>
          </button>

          {/* Button 2: Devenir partenaire */}
          <button
            onClick={() => handleAction('partner')}
            onMouseEnter={() => playSound('hover')}
            className="flex items-center space-x-2.5 px-6 py-4 bg-white/5 hover:bg-purple-500/10 text-white hover:text-purple-300 font-orbitron font-bold text-xs md:text-sm tracking-widest uppercase rounded-full border border-white/10 hover:border-purple-500/50 transition-all duration-300 cursor-none hover:-translate-y-0.5"
          >
            <Users className="w-4 h-4" />
            <span>{t.becomePartner}</span>
          </button>

          {/* Button 3: Investir dans un univers */}
          <button
            onClick={() => handleAction('invest')}
            onMouseEnter={() => playSound('hover')}
            className="flex items-center space-x-2.5 px-6 py-4 bg-white/5 hover:bg-cyan-500/10 text-white hover:text-cyan-300 font-orbitron font-bold text-xs md:text-sm tracking-widest uppercase rounded-full border border-white/10 hover:border-cyan-500/50 transition-all duration-300 cursor-none hover:-translate-y-0.5"
          >
            <TrendingUp className="w-4 h-4" />
            <span>{t.investUniverse}</span>
          </button>

          {/* Button 4: Contacter IMUIA */}
          <button
            onClick={() => handleAction('contact')}
            onMouseEnter={() => playSound('hover')}
            className="flex items-center space-x-2.5 px-6 py-4 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-orbitron font-bold text-xs md:text-sm tracking-widest uppercase rounded-full transition-all duration-300 shadow-[0_0_20px_rgba(34,211,238,0.3)] hover:shadow-[0_0_30px_rgba(34,211,238,0.5)] cursor-none hover:-translate-y-0.5"
          >
            <Mail className="w-4 h-4" />
            <span>{t.contactImuia}</span>
          </button>
        </div>

        {/* Global Coordinates & Direct Channels Hud */}
        <div className="pt-8 border-t border-white/5 grid grid-cols-1 md:grid-cols-3 gap-4 max-w-4xl mx-auto text-left text-xs font-mono">
          <div className="glass-panel p-4 rounded-xl border border-white/5 flex items-start space-x-3">
            <MapPin className="w-4 h-4 text-cyan-400 mt-0.5 flex-shrink-0" />
            <div>
              <span className="block text-white font-bold font-orbitron uppercase text-[11px]">Commandement</span>
              <span className="text-gray-400">Cannes &bull; Bastia &bull; Antananarivo</span>
            </div>
          </div>

          <div className="glass-panel p-4 rounded-xl border border-white/5 flex items-start space-x-3">
            <Mail className="w-4 h-4 text-purple-400 mt-0.5 flex-shrink-0" />
            <div>
              <span className="block text-white font-bold font-orbitron uppercase text-[11px]">Transmission</span>
              <a href="mailto:contact@imuia.com" className="text-gray-400 hover:text-white transition-colors cursor-none">
                contact@imuia.com
              </a>
            </div>
          </div>

          <div className="glass-panel p-4 rounded-xl border border-white/5 flex items-start space-x-3">
            <Shield className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
            <div>
              <span className="block text-white font-bold font-orbitron uppercase text-[11px]">Temps de Réponse</span>
              <span className="text-gray-400">&lt; 48 heures ouvrées</span>
            </div>
          </div>
        </div>
      </div>

      {/* Direct Contact Modal */}
      {activeModal === 'direct_contact' && (
        <div className="fixed inset-0 bg-black/85 backdrop-blur-md z-50 flex items-center justify-center p-4 animate-fade-in">
          <div className="glass-panel max-w-lg w-full rounded-3xl border border-cyan-500/40 p-6 md:p-8 space-y-6 relative text-left">
            <button
              onClick={() => { setActiveModal(null); playSound('click'); }}
              className="absolute top-6 right-6 p-2 rounded-lg bg-white/5 border border-white/10 text-gray-400 hover:text-white cursor-none"
            >
              ✕
            </button>

            <div className="space-y-1">
              <span className="text-[10px] font-mono text-cyan-400 uppercase tracking-widest">// CANAL DIRECT SÉCURISÉ</span>
              <h3 className="text-2xl font-black font-orbitron text-white">Contacter l’équipage IMUIA</h3>
              <p className="text-xs text-gray-400">
                Envoyez un message direct à nos équipes d’ingénierie et de développement de plateformes.
              </p>
            </div>

            {submitted ? (
              <div className="p-4 rounded-xl bg-green-500/10 border border-green-500/30 text-green-400 flex items-center space-x-3">
                <CheckCircle className="w-5 h-5 flex-shrink-0" />
                <span className="text-xs font-mono">Transmission envoyée aux consoles de bord avec succès !</span>
              </div>
            ) : (
              <form onSubmit={handleQuickSubmit} className="space-y-4">
                <div className="space-y-1">
                  <label className="block text-[10px] font-mono uppercase text-gray-400">Nom &amp; Prénom</label>
                  <input
                    type="text"
                    required
                    value={quickName}
                    onChange={(e) => setQuickName(e.target.value)}
                    placeholder="Ex: Alexandre Martin"
                    className="w-full bg-black/50 border border-white/10 focus:border-cyan-400 rounded-xl px-4 py-2 text-xs text-white focus:outline-none"
                  />
                </div>

                <div className="space-y-1">
                  <label className="block text-[10px] font-mono uppercase text-gray-400">Adresse E-mail</label>
                  <input
                    type="email"
                    required
                    value={quickEmail}
                    onChange={(e) => setQuickEmail(e.target.value)}
                    placeholder="Ex: alexandre@entreprise.com"
                    className="w-full bg-black/50 border border-white/10 focus:border-cyan-400 rounded-xl px-4 py-2 text-xs text-white focus:outline-none"
                  />
                </div>

                <div className="space-y-1">
                  <label className="block text-[10px] font-mono uppercase text-gray-400">Message</label>
                  <textarea
                    required
                    rows={4}
                    value={quickMessage}
                    onChange={(e) => setQuickMessage(e.target.value)}
                    placeholder="Partagez-nous votre besoin, projet ou question..."
                    className="w-full bg-black/50 border border-white/10 focus:border-cyan-400 rounded-xl px-4 py-2 text-xs text-white focus:outline-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-orbitron font-bold text-xs tracking-widest uppercase rounded-xl transition-all cursor-none flex items-center justify-center space-x-2"
                >
                  <Send className="w-4 h-4" />
                  <span>Envoyer la transmission</span>
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </section>
  );
};
