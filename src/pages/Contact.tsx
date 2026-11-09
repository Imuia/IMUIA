import React, { useState } from 'react';
import { useAppState } from '../data/useAppState';
import { translations } from '../data/translations';
import { Globe, Send, CheckCircle, Sparkles, Rocket, Shield, TrendingUp, Mail } from 'lucide-react';

interface ContactProps {
  embedded?: boolean;
}

export const Contact: React.FC<ContactProps> = ({ embedded = false }) => {
  const { language, addContact, playSound, setActiveSection } = useAppState();
  const t = translations[language];

  // Contact modal / direct form state
  const [selectedIntent, setSelectedIntent] = useState<string>('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [company, setCompany] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleIntentClick = (intentType: 'project' | 'partner' | 'invest' | 'contact') => {
    playSound('space');
    const intentMap: Record<string, { labelFr: string; labelEn: string; partnerType: string }> = {
      project: {
        labelFr: 'Présenter mon projet',
        labelEn: 'Submit My Project',
        partnerType: 'Creator'
      },
      partner: {
        labelFr: 'Devenir partenaire',
        labelEn: 'Become a Partner',
        partnerType: 'Operator'
      },
      invest: {
        labelFr: 'Investir dans un univers',
        labelEn: 'Invest in a Universe',
        partnerType: 'Investor'
      },
      contact: {
        labelFr: 'Contacter IMUIA',
        labelEn: 'Contact IMUIA',
        partnerType: 'Other'
      }
    };

    const target = intentMap[intentType];
    setSelectedIntent(language === 'fr' ? target.labelFr : target.labelEn);

    // If partner, can also navigate to full partnership form if needed, or fill inline
    if (intentType === 'partner') {
      setActiveSection('partners');
      return;
    }
  };

  const handleDirectSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) {
      playSound('click');
      return;
    }

    setLoading(true);
    playSound('space');

    setTimeout(() => {
      addContact({
        firstName: name.split(' ')[0] || name,
        lastName: name.split(' ').slice(1).join(' ') || 'Contact',
        company: company || 'Indépendant / Organisation',
        function: selectedIntent || 'Contact Direct',
        email,
        phone: '',
        country: 'Global',
        partnerType: selectedIntent || 'Direct Inquiry',
        project: 'Général',
        budget: '0',
        proposal: message
      });

      setLoading(false);
      setSubmitted(true);
      playSound('success');

      // Reset
      setName('');
      setEmail('');
      setCompany('');
      setMessage('');
      setSelectedIntent('');
    }, 1200);
  };

  return (
    <div className={`relative ${embedded ? 'py-16' : 'min-h-[calc(100vh-80px)] py-16'} px-4 overflow-hidden`}>
      {/* Background Starscape & subtle atmospheric halo */}
      <div className="absolute inset-0 stars-bg opacity-30 pointer-events-none"></div>
      <div className="absolute -bottom-32 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-cyan-600/10 rounded-t-full blur-3xl pointer-events-none"></div>

      <div className="max-w-5xl mx-auto space-y-12 relative z-10 text-center">

        {/* 3D-styled Planet Earth / Station viewed from space */}
        <div className="relative flex justify-center items-center py-4">
          {/* External Atmosphere Glow */}
          <div className="absolute w-64 h-64 md:w-80 md:h-80 rounded-full bg-cyan-500/15 blur-2xl animate-pulse pointer-events-none"></div>
          <div className="absolute w-72 h-72 md:w-96 md:h-96 rounded-full bg-indigo-600/10 blur-3xl pointer-events-none"></div>

          {/* Planetary Body: Planet Earth / IMUIA Home Base */}
          <div className="relative w-48 h-48 md:w-60 md:h-60 rounded-full overflow-hidden border border-cyan-400/40 shadow-[0_0_60px_rgba(34,211,238,0.35)] bg-gradient-to-tr from-slate-950 via-[#06182c] to-[#0c305c] flex items-center justify-center transition-transform hover:scale-105 duration-700">
            {/* Continental landmass silhouettes & glowing grid */}
            <div className="absolute inset-0 opacity-40 bg-[radial-gradient(#22d3ee_1px,transparent_1px)] [background-size:12px_12px] animate-pulse"></div>

            {/* Earth atmosphere limb & curvature light */}
            <div className="absolute inset-0 rounded-full shadow-[inset_-25px_-20px_50px_rgba(0,0,0,0.9),inset_15px_15px_30px_rgba(56,189,248,0.7)] pointer-events-none"></div>

            {/* Continental vector shapes simulated with styling */}
            <div className="absolute -top-4 -left-6 w-32 h-24 bg-emerald-600/25 rounded-full blur-md transform rotate-12"></div>
            <div className="absolute top-16 right-4 w-28 h-28 bg-emerald-500/20 rounded-full blur-lg"></div>
            <div className="absolute bottom-4 left-8 w-24 h-20 bg-teal-600/25 rounded-full blur-sm"></div>

            {/* Orbital Satellites & Stations */}
            <div className="absolute w-full h-full border border-dashed border-cyan-300/30 rounded-full animate-orbit"></div>
            <div className="absolute -top-2 left-1/2 w-2 h-2 rounded-full bg-cyan-300 shadow-[0_0_8px_#67e8f9] animate-ping"></div>

            {/* Center Label */}
            <div className="relative z-10 text-center select-none pointer-events-none">
              <span className="block font-orbitron font-black text-xs md:text-sm tracking-widest text-white/90 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
                ORBITAL LINK
              </span>
              <span className="block text-[8px] md:text-[9px] font-mono text-cyan-300 uppercase tracking-wider">
                EARTH // IMUIA STATION
              </span>
            </div>
          </div>
        </div>

        {/* Exact Prompt Headings */}
        <div className="space-y-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-mono tracking-widest uppercase">
            <Globe className="w-3.5 h-3.5" />
            <span>TRANSMISSION EN DIRECT</span>
          </div>

          <h2 className="text-3xl md:text-5xl font-black font-orbitron text-white uppercase tracking-tight leading-tight">
            {language === 'fr'
              ? 'Vous avez une idée à mettre en orbite ?'
              : 'Have an idea to launch into orbit?'}
          </h2>

          <p className="text-base md:text-lg text-gray-300 leading-relaxed font-light">
            {language === 'fr'
              ? '« Projet innovant, partenariat, investissement ou proposition de collaboration : entrez en contact avec l’équipage IMUIA. »'
              : '“Innovative project, partnership, investment or collaboration proposal: get in touch with the IMUIA crew.”'}
          </p>
        </div>

        {/* The 4 Specific Action Buttons */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-4xl mx-auto">
          {/* 1. Présenter mon projet */}
          <button
            onClick={() => handleIntentClick('project')}
            onMouseEnter={() => playSound('hover')}
            className={`p-5 rounded-2xl border transition-all duration-300 text-left cursor-none group ${
              selectedIntent === (language === 'fr' ? 'Présenter mon projet' : 'Submit My Project')
                ? 'bg-purple-600/30 border-purple-500 shadow-[0_0_20px_rgba(168,85,247,0.4)]'
                : 'glass-panel border-white/10 hover:border-purple-500/40 hover:bg-white/5'
            }`}
          >
            <div className="p-2.5 rounded-xl bg-purple-500/10 border border-purple-500/20 w-fit mb-3 group-hover:scale-110 transition-transform">
              <Rocket className="w-5 h-5 text-purple-400" />
            </div>
            <div className="font-orbitron font-bold text-sm text-white uppercase tracking-wider mb-1">
              {t.presentProject}
            </div>
            <div className="text-xs text-gray-400 font-light">
              {language === 'fr' ? 'Soumettre un concept innovant ou une idée de service' : 'Submit an innovative concept or digital platform'}
            </div>
          </button>

          {/* 2. Devenir partenaire */}
          <button
            onClick={() => handleIntentClick('partner')}
            onMouseEnter={() => playSound('hover')}
            className={`p-5 rounded-2xl border transition-all duration-300 text-left cursor-none group ${
              selectedIntent === (language === 'fr' ? 'Devenir partenaire' : 'Become a Partner')
                ? 'bg-cyan-600/30 border-cyan-500 shadow-[0_0_20px_rgba(34,211,238,0.4)]'
                : 'glass-panel border-white/10 hover:border-cyan-500/40 hover:bg-white/5'
            }`}
          >
            <div className="p-2.5 rounded-xl bg-cyan-500/10 border border-cyan-500/20 w-fit mb-3 group-hover:scale-110 transition-transform">
              <Shield className="w-5 h-5 text-cyan-400" />
            </div>
            <div className="font-orbitron font-bold text-sm text-white uppercase tracking-wider mb-1">
              {t.becomePartner}
            </div>
            <div className="text-xs text-gray-400 font-light">
              {language === 'fr' ? 'Rejoindre l\'écosystème comme opérateur ou prestataire' : 'Join our ecosystem as an operator or service provider'}
            </div>
          </button>

          {/* 3. Investir dans un univers */}
          <button
            onClick={() => handleIntentClick('invest')}
            onMouseEnter={() => playSound('hover')}
            className={`p-5 rounded-2xl border transition-all duration-300 text-left cursor-none group ${
              selectedIntent === (language === 'fr' ? 'Investir dans un univers' : 'Invest in a Universe')
                ? 'bg-pink-600/30 border-pink-500 shadow-[0_0_20px_rgba(236,72,153,0.4)]'
                : 'glass-panel border-white/10 hover:border-pink-500/40 hover:bg-white/5'
            }`}
          >
            <div className="p-2.5 rounded-xl bg-pink-500/10 border border-pink-500/20 w-fit mb-3 group-hover:scale-110 transition-transform">
              <TrendingUp className="w-5 h-5 text-pink-400" />
            </div>
            <div className="font-orbitron font-bold text-sm text-white uppercase tracking-wider mb-1">
              {t.investUniverse}
            </div>
            <div className="text-xs text-gray-400 font-light">
              {language === 'fr' ? 'Participer au financement et à l\'expansion de nos plateformes' : 'Participate in funding and scaling our digital ventures'}
            </div>
          </button>

          {/* 4. Contacter IMUIA */}
          <button
            onClick={() => handleIntentClick('contact')}
            onMouseEnter={() => playSound('hover')}
            className={`p-5 rounded-2xl border transition-all duration-300 text-left cursor-none group ${
              selectedIntent === (language === 'fr' ? 'Contacter IMUIA' : 'Contact IMUIA')
                ? 'bg-emerald-600/30 border-emerald-500 shadow-[0_0_20px_rgba(16,185,129,0.4)]'
                : 'glass-panel border-white/10 hover:border-emerald-500/40 hover:bg-white/5'
            }`}
          >
            <div className="p-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 w-fit mb-3 group-hover:scale-110 transition-transform">
              <Mail className="w-5 h-5 text-emerald-400" />
            </div>
            <div className="font-orbitron font-bold text-sm text-white uppercase tracking-wider mb-1">
              {language === 'fr' ? 'Contacter IMUIA' : 'Contact IMUIA'}
            </div>
            <div className="text-xs text-gray-400 font-light">
              {language === 'fr' ? 'Échange direct avec l\'équipage de direction' : 'Direct communication with our executive space crew'}
            </div>
          </button>
        </div>

        {/* Direct Transmission Form Card */}
        <div className="max-w-2xl mx-auto glass-panel p-6 md:p-8 rounded-3xl border border-white/10 text-left space-y-6">
          <div className="flex items-center justify-between border-b border-white/5 pb-4">
            <div>
              <h3 className="font-orbitron font-bold text-white text-base">
                {language === 'fr' ? 'Transmission Directe' : 'Direct Transmission'}
              </h3>
              <p className="text-xs text-gray-400">
                {selectedIntent
                  ? `${language === 'fr' ? 'Objet sélectionné : ' : 'Selected Object: '} ${selectedIntent}`
                  : (language === 'fr' ? 'Sélectionnez un canal ci-dessus ou écrivez-nous directement' : 'Select a channel above or write directly')}
              </p>
            </div>
            <Sparkles className="w-5 h-5 text-purple-400" />
          </div>

          {submitted ? (
            <div className="p-5 rounded-2xl bg-green-500/10 border border-green-500/30 text-green-300 flex items-start space-x-3">
              <CheckCircle className="w-6 h-6 text-green-400 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-bold text-sm font-orbitron uppercase text-white">
                  {language === 'fr' ? 'Signal reçu à bord !' : 'Signal Received On Board!'}
                </p>
                <p className="text-xs text-green-200 mt-1">
                  {language === 'fr'
                    ? 'Votre message a été enregistré dans notre cockpit. Un officier IMUIA vous répondra sous 24 à 48 heures.'
                    : 'Your message has been logged into our cockpit. An IMUIA officer will respond within 24 to 48 hours.'}
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="mt-3 text-xs underline font-mono text-cyan-400 cursor-none"
                >
                  {language === 'fr' ? 'Envoyer une autre transmission' : 'Send another transmission'}
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleDirectSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-mono text-gray-400 uppercase">
                    {t.formFirstName} &amp; {t.formLastName} *
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Ex: Alexandre Dubois"
                    className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-cyan-400"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-mono text-gray-400 uppercase">
                    {t.formEmail} *
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="alexandre@domaine.com"
                    className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-cyan-400"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-mono text-gray-400 uppercase">
                  {t.formCompany}
                </label>
                <input
                  type="text"
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                  placeholder="Ex: StartUp Alpha / Investisseur"
                  className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-cyan-400"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-mono text-gray-400 uppercase">
                  {language === 'fr' ? 'Votre Message / Proposition' : 'Your Message / Proposal'} *
                </label>
                <textarea
                  required
                  rows={3}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder={language === 'fr' ? 'Expliquez brièvement votre idée ou votre demande de contact...' : 'Briefly explain your idea or contact inquiry...'}
                  className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-cyan-400"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-500 hover:to-cyan-500 disabled:opacity-50 text-white font-orbitron font-bold text-xs uppercase tracking-widest rounded-xl transition-all shadow-lg shadow-purple-900/30 flex items-center justify-center space-x-2 cursor-none"
              >
                <Send className="w-4 h-4" />
                <span>{loading ? t.saving : (language === 'fr' ? 'Émettre la transmission' : 'Broadcast Message')}</span>
              </button>
            </form>
          )}

          <div className="flex flex-wrap items-center justify-between text-[11px] font-mono text-gray-500 pt-2 border-t border-white/5">
            <span>// FREQ: 1420.405 MHz</span>
            <span>BASE: IMUIA COMMAND // EUROPE &amp; AFRIQUE</span>
          </div>
        </div>

      </div>
    </div>
  );
};
