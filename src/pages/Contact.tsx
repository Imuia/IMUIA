import React, { useState, useEffect } from 'react';
import { useAppState } from '../data/useAppState';
import { translations } from '../data/translations';
import { Mail, Globe, Send, CheckCircle, AlertCircle, Sparkles, Rocket, DollarSign, MessageSquare } from 'lucide-react';

export const Contact: React.FC = () => {
  const { language, playSound, addContact } = useAppState();
  const t = translations[language];

  // Intent selector based on the 4 prompt buttons
  const [selectedIntent, setSelectedIntent] = useState<'project' | 'partner' | 'invest' | 'contact'>('contact');

  // Contact form fields
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [company, setCompany] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [consent, setConsent] = useState(false);

  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);

  // Check if session storage has an intent passed from Home
  useEffect(() => {
    const saved = sessionStorage.getItem('imuia_intent');
    if (saved && ['project', 'partner', 'invest', 'contact'].includes(saved)) {
      setSelectedIntent(saved as any);
      sessionStorage.removeItem('imuia_intent');
    }
  }, []);

  const handleIntentChange = (intent: 'project' | 'partner' | 'invest' | 'contact') => {
    setSelectedIntent(intent);
    playSound('click');
    if (intent === 'project') {
      setSubject(language === 'fr' ? 'Présentation de projet innovant' : 'New innovative project presentation');
    } else if (intent === 'partner') {
      setSubject(language === 'fr' ? 'Proposition de partenariat stratégique' : 'Strategic partnership proposal');
    } else if (intent === 'invest') {
      setSubject(language === 'fr' ? 'Intention d\'investissement dans un univers IMUIA' : 'Investment interest in IMUIA universe');
    } else {
      setSubject(language === 'fr' ? 'Prise de contact générale' : 'General inquiry');
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(false);
    setSuccess(false);

    if (!name || !email || !message || !consent) {
      setError(true);
      playSound('click');
      return;
    }

    setSubmitting(true);
    playSound('space');

    setTimeout(() => {
      const names = name.trim().split(' ');
      const firstName = names[0] || 'Visiteur';
      const lastName = names.slice(1).join(' ') || '';

      addContact({
        firstName,
        lastName,
        company: company || 'N/A',
        function: selectedIntent.toUpperCase(),
        email,
        phone,
        country: 'Global',
        partnerType: selectedIntent === 'invest' ? 'Investor' : selectedIntent === 'partner' ? 'Operator' : 'Other',
        project: 'Contact Direct',
        budget: selectedIntent === 'invest' ? '100000+' : '0',
        proposal: `[${subject}] ${message}`
      });

      setSubmitting(false);
      setSuccess(true);
      playSound('success');

      setName('');
      setEmail('');
      setPhone('');
      setCompany('');
      setSubject('');
      setMessage('');
      setConsent(false);
    }, 1200);
  };

  return (
    <div className="relative min-h-[calc(100vh-80px)] py-12 px-4 space-y-12">
      <div className="absolute inset-0 stars-bg opacity-35 pointer-events-none"></div>

      {/* Earth seen from space visual header */}
      <div className="text-center max-w-4xl mx-auto space-y-6 relative z-10">
        <div className="relative flex justify-center mb-4">
          <div className="relative w-40 h-40 rounded-full bg-gradient-to-tr from-blue-950 via-teal-900 to-indigo-900 border-2 border-cyan-400/50 shadow-[0_0_50px_rgba(34,211,238,0.35)] flex items-center justify-center overflow-hidden">
            <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle_at_30%_30%,rgba(34,211,238,0.4),transparent_65%)]"></div>
            <div className="absolute inset-0 border border-dashed border-cyan-400/30 rounded-full animate-orbit"></div>
            <Globe className="w-24 h-24 text-cyan-300/40 animate-pulse" />
            <div className="absolute bottom-2 text-[8px] font-mono tracking-widest uppercase text-cyan-200">
              TERRE // ORBITAL STATION
            </div>
          </div>
        </div>

        <div className="space-y-3">
          <h2 className="text-xs font-orbitron font-bold text-cyan-400 tracking-widest uppercase flex items-center justify-center space-x-2">
            <Mail className="w-4 h-4 text-pink-400" />
            <span>Station de Transmission Directe</span>
          </h2>
          <h1 className="text-3xl md:text-5xl font-black font-orbitron uppercase text-white leading-tight">
            {t.contactTitle}
          </h1>
          <p className="text-sm md:text-base text-gray-300 leading-relaxed font-light italic max-w-2xl mx-auto">
            {t.contactText}
          </p>
        </div>

        {/* 4 Interactive Intent Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
          <button
            onClick={() => handleIntentChange('project')}
            className={`flex items-center space-x-2 px-5 py-2.5 rounded-full text-xs font-orbitron font-bold uppercase tracking-wider transition-all cursor-none ${
              selectedIntent === 'project'
                ? 'bg-purple-600 text-white shadow-[0_0_15px_rgba(168,85,247,0.5)]'
                : 'bg-white/5 text-gray-300 border border-white/10 hover:border-purple-500'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-purple-400" />
            <span>{t.btnPresentProject}</span>
          </button>

          <button
            onClick={() => handleIntentChange('partner')}
            className={`flex items-center space-x-2 px-5 py-2.5 rounded-full text-xs font-orbitron font-bold uppercase tracking-wider transition-all cursor-none ${
              selectedIntent === 'partner'
                ? 'bg-purple-600 text-white shadow-[0_0_15px_rgba(168,85,247,0.5)]'
                : 'bg-white/5 text-gray-300 border border-white/10 hover:border-purple-500'
            }`}
          >
            <Rocket className="w-3.5 h-3.5 text-cyan-400" />
            <span>{t.btnBecomePartner}</span>
          </button>

          <button
            onClick={() => handleIntentChange('invest')}
            className={`flex items-center space-x-2 px-5 py-2.5 rounded-full text-xs font-orbitron font-bold uppercase tracking-wider transition-all cursor-none ${
              selectedIntent === 'invest'
                ? 'bg-purple-600 text-white shadow-[0_0_15px_rgba(168,85,247,0.5)]'
                : 'bg-white/5 text-gray-300 border border-white/10 hover:border-purple-500'
            }`}
          >
            <DollarSign className="w-3.5 h-3.5 text-green-400" />
            <span>{t.btnInvestUniverse}</span>
          </button>

          <button
            onClick={() => handleIntentChange('contact')}
            className={`flex items-center space-x-2 px-5 py-2.5 rounded-full text-xs font-orbitron font-bold uppercase tracking-wider transition-all cursor-none ${
              selectedIntent === 'contact'
                ? 'bg-purple-600 text-white shadow-[0_0_15px_rgba(168,85,247,0.5)]'
                : 'bg-white/5 text-gray-300 border border-white/10 hover:border-purple-500'
            }`}
          >
            <MessageSquare className="w-3.5 h-3.5 text-pink-400" />
            <span>{t.btnContactIMUIA}</span>
          </button>
        </div>
      </div>

      {/* Transmission Form */}
      <div className="max-w-3xl mx-auto glass-panel p-6 md:p-8 rounded-3xl border border-purple-500/30 relative z-10 text-left">
        {success && (
          <div className="mb-6 p-4 rounded-xl bg-green-500/10 border border-green-500/30 text-green-400 flex items-start space-x-3">
            <CheckCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-bold text-sm">Transmission orbitale réussie</p>
              <p className="text-xs text-green-300">{t.formSuccess}</p>
            </div>
          </div>
        )}

        {error && (
          <div className="mb-6 p-4 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 flex items-start space-x-3">
            <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-bold text-sm">Champs obligatoires manquants</p>
              <p className="text-xs text-red-300">{t.formError}</p>
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="space-y-1.5">
              <label className="block text-xs font-mono uppercase text-gray-400">
                Nom complet <span className="text-red-400">*</span>
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Ex: Gabriel Moreau"
                className="w-full bg-black/40 border border-white/10 focus:border-purple-500 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none"
              />
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-mono uppercase text-gray-400">
                Adresse e-mail <span className="text-red-400">*</span>
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Ex: contact@entreprise.com"
                className="w-full bg-black/40 border border-white/10 focus:border-purple-500 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="space-y-1.5">
              <label className="block text-xs font-mono uppercase text-gray-400">
                Société / Organisation
              </label>
              <input
                type="text"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                placeholder="Ex: Nexus Tech"
                className="w-full bg-black/40 border border-white/10 focus:border-purple-500 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none"
              />
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-mono uppercase text-gray-400">
                Téléphone
              </label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="Ex: +33 6 00 00 00 00"
                className="w-full bg-black/40 border border-white/10 focus:border-purple-500 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="block text-xs font-mono uppercase text-gray-400">
              Objet de votre message
            </label>
            <input
              type="text"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              placeholder="Ex: Demande d'information ou proposition de projet"
              className="w-full bg-black/40 border border-white/10 focus:border-purple-500 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none"
            />
          </div>

          <div className="space-y-1.5">
            <label className="block text-xs font-mono uppercase text-gray-400">
              Votre message <span className="text-red-400">*</span>
            </label>
            <textarea
              required
              rows={4}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Détaillez votre projet, vos objectifs ou votre demande d'échange..."
              className="w-full bg-black/40 border border-white/10 focus:border-purple-500 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none"
            />
          </div>

          <div className="flex items-start space-x-3 pt-2">
            <input
              type="checkbox"
              id="contact-consent"
              checked={consent}
              onChange={(e) => setConsent(e.target.checked)}
              className="mt-1 accent-purple-600 rounded cursor-none"
            />
            <label htmlFor="contact-consent" className="text-xs text-gray-400 leading-relaxed select-none">
              {t.formConsent}
            </label>
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="w-full flex items-center justify-center space-x-2 py-3.5 bg-purple-600 hover:bg-purple-500 disabled:bg-purple-800 text-white font-bold font-orbitron text-xs tracking-widest uppercase rounded-xl transition-all shadow-lg shadow-purple-900/30 cursor-none"
          >
            <Send className="w-4 h-4" />
            <span>{submitting ? t.saving : t.submit}</span>
          </button>
        </form>

        <div className="mt-8 border-t border-white/5 pt-6 text-center text-xs font-mono text-gray-500 space-y-1">
          <p>// IMUIA CORE TRANSMISSION NODE // LAT: 43.5528° N, LON: 7.0174° E</p>
          <p>Réponse garantie sous 48 heures par l'équipage.</p>
        </div>
      </div>
    </div>
  );
};
