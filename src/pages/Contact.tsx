import React, { useState } from 'react';
import { useAppState } from '../data/AppState';
import { translations } from '../data/translations';
import { Globe, Mail, Send, CheckCircle, AlertCircle, Sparkles, MessageSquare, Briefcase, Landmark } from 'lucide-react';

export const Contact: React.FC = () => {
  const { language, addContact, playSound, setActiveSection } = useAppState();
  const t = translations[language];

  // Message Form States
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [showDirectForm, setShowDirectForm] = useState(false);

  // Status indicators
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const [sending, setSending] = useState(false);

  const handleRouteToPartners = () => {
    playSound('space');
    setActiveSection('partners');
  };

  const handleSendDirect = (e: React.FormEvent) => {
    e.preventDefault();
    setError(false);
    setSuccess(false);

    if (!name || !email || !message) {
      setError(true);
      playSound('click');
      return;
    }

    setSending(true);
    playSound('space');

    setTimeout(() => {
      // Log directly into the unified CRM leads state
      addContact({
        firstName: name.split(' ')[0] || 'Aventurier',
        lastName: name.split(' ').slice(1).join(' ') || 'Spatial',
        company: 'Message Direct',
        function: 'Visiteur de l\'Espace',
        email,
        phone: '',
        country: 'Global',
        partnerType: 'Other',
        project: 'General Inquiry',
        budget: '0',
        proposal: `[CONTACT DIRECT - OBJET: ${subject || 'Inconnu'}] ${message}`
      });

      setSending(false);
      setSuccess(true);
      playSound('success');

      // Clear fields
      setName('');
      setEmail('');
      setSubject('');
      setMessage('');
    }, 1200);
  };

  return (
    <div className="relative min-h-[calc(100vh-80px)] py-12 px-4 flex flex-col items-center justify-center space-y-12 overflow-hidden">
      {/* Slow orbit space elements */}
      <div className="absolute inset-0 stars-bg opacity-40 pointer-events-none"></div>

      {/* High-end Nebulae */}
      <div className="absolute -top-1/4 left-1/3 w-[500px] h-[500px] bg-purple-900/15 rounded-full blur-3xl pointer-events-none animate-pulse-slow"></div>
      <div className="absolute -bottom-1/4 right-1/4 w-[450px] h-[450px] bg-cyan-900/10 rounded-full blur-3xl pointer-events-none animate-pulse-slow"></div>

      <div className="max-w-4xl mx-auto text-center z-10 space-y-8">

        {/* Stellar Earth / Planet representation */}
        <div className="relative flex justify-center mb-4">
          <div className="absolute inset-0 m-auto w-44 h-44 bg-cyan-500/10 rounded-full blur-3xl animate-pulse"></div>

          {/* Planet Sphere Object */}
          <div className="relative w-36 h-36 rounded-full bg-gradient-to-tr from-indigo-950 via-slate-900 to-cyan-900 p-0.5 border border-cyan-500/20 shadow-[0_0_60px_rgba(34,211,238,0.25)] hover:scale-105 transition-transform duration-1000">
            {/* Spinning orbital ring */}
            <div className="absolute w-48 h-12 border-t-2 border-b-2 border-purple-500/20 rounded-[50%] rotate-45 animate-orbit"></div>
            <div className="absolute w-44 h-14 border-l border-r border-cyan-400/30 rounded-[50%] -rotate-12 animate-orbit-reverse"></div>

            {/* Simulated Continent textures */}
            <div className="absolute inset-2 rounded-full bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-cyan-400/10 via-purple-500/5 to-black/80 animate-pulse"></div>

            <div className="w-full h-full rounded-full flex flex-col items-center justify-center text-center">
              <Globe className="w-10 h-10 text-cyan-400/80 animate-spin-slow" />
              <span className="block text-[8px] tracking-widest font-mono text-purple-400 uppercase mt-1">IMUIA HOME</span>
            </div>

            {/* Glowing satellite beacon */}
            <div className="absolute top-2 right-2 w-2 h-2 bg-purple-500 rounded-full animate-ping"></div>
          </div>
        </div>

        {/* Dynamic Headings specified in prompt */}
        <div className="space-y-4">
          <h1 className="text-3xl md:text-5xl font-black font-orbitron text-white tracking-tight uppercase leading-tight">
            {(t as any).contactTitle}
          </h1>
          <p className="text-base md:text-lg text-gray-300 max-w-2xl mx-auto leading-relaxed font-light">
            {(t as any).contactText}
          </p>
        </div>

        {/* The 4 Action Triggers */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto pt-4">
          <button
            onClick={() => handleRouteToPartners()}
            onMouseEnter={() => playSound('hover')}
            className="flex flex-col items-center justify-between p-5 rounded-2xl glass-panel border border-white/5 hover:border-purple-500/50 hover:bg-purple-900/10 transition-all duration-300 cursor-none hover:translate-y-[-2px] text-center space-y-3"
          >
            <Sparkles className="w-6 h-6 text-purple-400 animate-pulse" />
            <span className="font-orbitron font-bold text-xs text-white uppercase tracking-wider">
              {(t as any).btnPresentProject}
            </span>
          </button>

          <button
            onClick={() => handleRouteToPartners()}
            onMouseEnter={() => playSound('hover')}
            className="flex flex-col items-center justify-between p-5 rounded-2xl glass-panel border border-white/5 hover:border-cyan-500/50 hover:bg-cyan-950/10 transition-all duration-300 cursor-none hover:translate-y-[-2px] text-center space-y-3"
          >
            <Briefcase className="w-6 h-6 text-cyan-400" />
            <span className="font-orbitron font-bold text-xs text-white uppercase tracking-wider">
              {(t as any).btnBecomePartner}
            </span>
          </button>

          <button
            onClick={() => handleRouteToPartners()}
            onMouseEnter={() => playSound('hover')}
            className="flex flex-col items-center justify-between p-5 rounded-2xl glass-panel border border-white/5 hover:border-pink-500/50 hover:bg-pink-950/10 transition-all duration-300 cursor-none hover:translate-y-[-2px] text-center space-y-3"
          >
            <Landmark className="w-6 h-6 text-pink-400" />
            <span className="font-orbitron font-bold text-xs text-white uppercase tracking-wider">
              {(t as any).btnInvestUniverse}
            </span>
          </button>

          <button
            onClick={() => { setShowDirectForm(!showDirectForm); playSound('space'); }}
            onMouseEnter={() => playSound('hover')}
            className={`flex flex-col items-center justify-between p-5 rounded-2xl glass-panel border transition-all duration-300 cursor-none hover:translate-y-[-2px] text-center space-y-3 ${
              showDirectForm
                ? 'border-purple-500 bg-purple-500/10'
                : 'border-white/5 hover:border-purple-500/50 hover:bg-purple-900/10'
            }`}
          >
            <Mail className="w-6 h-6 text-indigo-400" />
            <span className="font-orbitron font-bold text-xs text-white uppercase tracking-wider">
              {(t as any).btnContactCrew}
            </span>
          </button>
        </div>

        {/* Embedded Direct Transmission Message Form */}
        {showDirectForm && (
          <div className="max-w-lg mx-auto glass-panel p-6 rounded-3xl border border-purple-500/30 text-left space-y-4 animate-fade-in pt-6 mt-8 relative">
            <div className="flex items-center justify-between border-b border-white/5 pb-2">
              <span className="text-xs font-mono text-cyan-400 font-bold uppercase tracking-widest flex items-center space-x-1.5">
                <MessageSquare className="w-3.5 h-3.5" />
                <span>{(t as any).contactFormTitle}</span>
              </span>
              <button
                onClick={() => { setShowDirectForm(false); playSound('click'); }}
                className="text-gray-500 hover:text-white font-mono text-xs cursor-none"
              >
                [X]
              </button>
            </div>

            {success && (
              <div className="p-3 bg-green-500/10 border border-green-500/30 text-green-400 text-xs rounded-xl flex items-start space-x-2">
                <CheckCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
                <span>{(t as any).contactFormSuccess}</span>
              </div>
            )}

            {error && (
              <div className="p-3 bg-red-500/10 border border-red-500/30 text-red-400 text-xs rounded-xl flex items-start space-x-2">
                <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
                <span>Veuillez remplir tous les champs requis.</span>
              </div>
            )}

            <form onSubmit={handleSendDirect} className="space-y-4">
              <div className="space-y-1">
                <label className="block text-[10px] font-mono text-gray-400 uppercase">{(t as any).contactFormName} *</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Stella Explorer"
                  className="w-full bg-black/40 border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-purple-500"
                />
              </div>

              <div className="space-y-1">
                <label className="block text-[10px] font-mono text-gray-400 uppercase">Adresse E-mail *</label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="stella@imuia.com"
                  className="w-full bg-black/40 border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-purple-500"
                />
              </div>

              <div className="space-y-1">
                <label className="block text-[10px] font-mono text-gray-400 uppercase">{(t as any).contactFormSubject}</label>
                <input
                  type="text"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  placeholder="Sujet d'amarrage"
                  className="w-full bg-black/40 border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-purple-500"
                />
              </div>

              <div className="space-y-1">
                <label className="block text-[10px] font-mono text-gray-400 uppercase">{(t as any).contactFormMessage} *</label>
                <textarea
                  required
                  rows={3}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Exprimez vos besoins d'innovation..."
                  className="w-full bg-black/40 border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-purple-500"
                />
              </div>

              <button
                type="submit"
                disabled={sending}
                className="w-full py-2.5 bg-purple-600 hover:bg-purple-500 disabled:bg-purple-800 text-white font-bold font-orbitron text-xs tracking-widest uppercase rounded-xl transition-all cursor-none flex items-center justify-center space-x-1.5"
              >
                <Send className="w-3.5 h-3.5" />
                <span>{sending ? t.saving : 'Envoyer la transmission'}</span>
              </button>
            </form>
          </div>
        )}

      </div>
    </div>
  );
};
