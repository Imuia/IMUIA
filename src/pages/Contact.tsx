import React, { useState } from 'react';
import { useAppState } from '../data/AppState';
import { translations } from '../data/translations';
import { Send, Globe, MessageSquare, Briefcase, TrendingUp, CheckCircle, AlertCircle, Info } from 'lucide-react';

export const Contact: React.FC = () => {
  const { language, addContact, playSound } = useAppState();
  const t = translations[language];

  // Specific contact mode state driven by buttons clicked
  const [contactMode, setContactMode] = useState<'general' | 'project' | 'partner' | 'invest'>('general');

  // Form Fields State
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [company, setCompany] = useState('');
  const [jobTitle, setJobTitle] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [country, setCountry] = useState('');
  const [proposal, setProposal] = useState('');
  const [consent, setConsent] = useState(false);

  // Status indicators
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const selectMode = (mode: 'general' | 'project' | 'partner' | 'invest') => {
    setContactMode(mode);
    playSound('space');
    setSuccess(false);
    setError(false);
  };

  const getModeTitle = () => {
    switch (contactMode) {
      case 'project':
        return language === 'fr' ? 'Présenter mon projet à l’équipage' : 'Present my project to the crew';
      case 'partner':
        return language === 'fr' ? 'Devenir partenaire opérationnel ou local' : 'Become an operational or local partner';
      case 'invest':
        return language === 'fr' ? 'Investir dans un univers IMUIA' : 'Invest in an IMUIA universe';
      default:
        return language === 'fr' ? 'Contacter l’équipage IMUIA' : 'Contact the IMUIA crew';
    }
  };

  const getPartnerTypeByMode = () => {
    switch (contactMode) {
      case 'project': return 'Other';
      case 'partner': return 'Operator';
      case 'invest': return 'Investor';
      default: return 'Other';
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(false);
    setSuccess(false);

    if (!firstName || !lastName || !email || !proposal || !consent) {
      setError(true);
      playSound('click');
      return;
    }

    setSubmitting(true);
    playSound('space');

    setTimeout(() => {
      addContact({
        firstName,
        lastName,
        company,
        function: jobTitle,
        email,
        phone,
        country,
        partnerType: getPartnerTypeByMode(),
        project: 'General',
        budget: contactMode === 'invest' ? '100000' : '0',
        proposal: `[MODE: ${contactMode.toUpperCase()}] ${proposal}`
      });

      setSubmitting(false);
      setSuccess(true);
      playSound('success');

      // Reset form
      setFirstName('');
      setLastName('');
      setCompany('');
      setJobTitle('');
      setEmail('');
      setPhone('');
      setCountry('');
      setProposal('');
      setConsent(false);
    }, 1500);
  };

  return (
    <div className="relative min-h-[calc(100vh-80px)] py-12 px-4 space-y-12 overflow-hidden">
      <div className="absolute inset-0 stars-bg opacity-30 pointer-events-none"></div>

      {/* Hero Visual Segment showing a planet view from space */}
      <div className="max-w-5xl mx-auto rounded-3xl overflow-hidden glass-panel border border-white/10 relative z-10 h-64 md:h-80 flex flex-col items-center justify-center p-6 text-center space-y-4">
        {/* Glow behind the earth sphere */}
        <div className="absolute -bottom-48 w-[600px] h-[300px] bg-gradient-to-t from-purple-600/30 via-indigo-900/10 to-transparent rounded-full blur-3xl pointer-events-none"></div>

        {/* Realistic subtle planet curve at the bottom */}
        <div className="absolute -bottom-64 w-[120px] h-[120px] md:w-[1200px] md:h-[600px] rounded-[50%] border-t border-purple-500/40 bg-[#060114]/90 shadow-[0_-20px_50px_rgba(168,85,247,0.15)] pointer-events-none"></div>

        {/* Orbiting Satellite animation */}
        <div className="absolute top-10 left-10 md:left-24 w-12 h-12 border border-cyan-400/20 rounded-full animate-orbit pointer-events-none"></div>

        <div className="relative z-10 space-y-3">
          <h1 className="text-3xl md:text-5xl font-black font-orbitron uppercase text-white tracking-tight leading-none">
            {language === 'fr' ? 'Vous avez une idée à mettre en orbite ?' : 'Have an idea to launch into orbit?'}
          </h1>
          <p className="text-sm md:text-base text-gray-300 max-w-2xl mx-auto font-light leading-relaxed">
            {language === 'fr'
              ? 'Projet innovant, partenariat, investissement ou proposition de collaboration : entrez en contact avec l’équipage IMUIA.'
              : 'Innovative project, partnership, investment or collaboration proposal: get in touch with the IMUIA crew.'}
          </p>
        </div>
      </div>

      {/* Main interaction layout */}
      <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8 relative z-10 items-start">
        {/* Quick select mode buttons (Col 1) */}
        <div className="space-y-3 lg:col-span-1">
          <h3 className="text-xs font-mono font-bold tracking-widest text-cyan-400 uppercase text-left mb-4">
            // Actions disponibles
          </h3>

          <button
            onClick={() => selectMode('project')}
            onMouseEnter={() => playSound('hover')}
            className={`w-full flex items-center space-x-3.5 p-4 rounded-2xl border transition-all cursor-none text-left ${
              contactMode === 'project'
                ? 'bg-purple-600 border-purple-500 text-white shadow-lg shadow-purple-500/10'
                : 'bg-white/5 border-white/5 text-gray-300 hover:border-white/10 hover:bg-white/10'
            }`}
          >
            <div className={`p-2 rounded-xl ${contactMode === 'project' ? 'bg-purple-500 text-white' : 'bg-white/5 text-gray-400'}`}>
              <MessageSquare className="w-5 h-5" />
            </div>
            <div>
              <span className="block text-sm font-bold font-orbitron">
                {language === 'fr' ? 'Présenter mon projet' : 'Present my project'}
              </span>
              <span className="block text-[10px] text-gray-400 font-light mt-0.5">
                {language === 'fr' ? 'Soumettre une idée' : 'Submit an idea'}
              </span>
            </div>
          </button>

          <button
            onClick={() => selectMode('partner')}
            onMouseEnter={() => playSound('hover')}
            className={`w-full flex items-center space-x-3.5 p-4 rounded-2xl border transition-all cursor-none text-left ${
              contactMode === 'partner'
                ? 'bg-purple-600 border-purple-500 text-white shadow-lg shadow-purple-500/10'
                : 'bg-white/5 border-white/5 text-gray-300 hover:border-white/10 hover:bg-white/10'
            }`}
          >
            <div className={`p-2 rounded-xl ${contactMode === 'partner' ? 'bg-purple-500 text-white' : 'bg-white/5 text-gray-400'}`}>
              <Briefcase className="w-5 h-5" />
            </div>
            <div>
              <span className="block text-sm font-bold font-orbitron">
                {language === 'fr' ? 'Devenir partenaire' : 'Become partner'}
              </span>
              <span className="block text-[10px] text-gray-400 font-light mt-0.5">
                {language === 'fr' ? 'Coopération locale ou technique' : 'Local or technical cooperation'}
              </span>
            </div>
          </button>

          <button
            onClick={() => selectMode('invest')}
            onMouseEnter={() => playSound('hover')}
            className={`w-full flex items-center space-x-3.5 p-4 rounded-2xl border transition-all cursor-none text-left ${
              contactMode === 'invest'
                ? 'bg-purple-600 border-purple-500 text-white shadow-lg shadow-purple-500/10'
                : 'bg-white/5 border-white/5 text-gray-300 hover:border-white/10 hover:bg-white/10'
            }`}
          >
            <div className={`p-2 rounded-xl ${contactMode === 'invest' ? 'bg-purple-500 text-white' : 'bg-white/5 text-gray-400'}`}>
              <TrendingUp className="w-5 h-5" />
            </div>
            <div>
              <span className="block text-sm font-bold font-orbitron">
                {language === 'fr' ? 'Investir dans un univers' : 'Invest in a universe'}
              </span>
              <span className="block text-[10px] text-gray-400 font-light mt-0.5">
                {language === 'fr' ? 'Financer le développement d’une galaxie' : 'Finance development of a galaxy'}
              </span>
            </div>
          </button>

          <button
            onClick={() => selectMode('general')}
            onMouseEnter={() => playSound('hover')}
            className={`w-full flex items-center space-x-3.5 p-4 rounded-2xl border transition-all cursor-none text-left ${
              contactMode === 'general'
                ? 'bg-purple-600 border-purple-500 text-white shadow-lg shadow-purple-500/10'
                : 'bg-white/5 border-white/5 text-gray-300 hover:border-white/10 hover:bg-white/10'
            }`}
          >
            <div className={`p-2 rounded-xl ${contactMode === 'general' ? 'bg-purple-500 text-white' : 'bg-white/5 text-gray-400'}`}>
              <Globe className="w-5 h-5" />
            </div>
            <div>
              <span className="block text-sm font-bold font-orbitron">
                {language === 'fr' ? 'Contacter IMUIA' : 'Contact IMUIA'}
              </span>
              <span className="block text-[10px] text-gray-400 font-light mt-0.5">
                {language === 'fr' ? 'Demande de renseignements généraux' : 'General information request'}
              </span>
            </div>
          </button>
        </div>

        {/* Dynamic form based on selected mode (Col 2 & 3) */}
        <div className="lg:col-span-2 glass-panel p-6 md:p-8 rounded-3xl border border-purple-500/30 text-left space-y-6">
          <div className="border-b border-white/5 pb-4">
            <h2 className="text-xl font-bold font-orbitron text-white">
              {getModeTitle()}
            </h2>
            <p className="text-xs text-gray-400 font-mono mt-1 uppercase">
              // Mode de transmission : {contactMode.toUpperCase()}
            </p>
          </div>

          {success && (
            <div className="p-4 rounded-xl bg-green-500/10 border border-green-500/30 text-green-400 flex items-start space-x-3">
              <CheckCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-bold text-sm">
                  {language === 'fr' ? 'Message envoyé !' : 'Message sent!'}
                </p>
                <p className="text-xs text-green-300">
                  {language === 'fr'
                    ? 'Votre transmission spatiale a bien été réceptionnée. Notre équipage reviendra vers vous sous 48h.'
                    : 'Your space transmission has been successfully received. Our crew will reply within 48h.'}
                </p>
              </div>
            </div>
          )}

          {error && (
            <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 flex items-start space-x-3">
              <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-bold text-sm">
                  {language === 'fr' ? 'Données incomplètes' : 'Incomplete data'}
                </p>
                <p className="text-xs text-red-300">
                  {language === 'fr'
                    ? 'Veuillez remplir tous les champs requis (*) et cocher la case RGPD.'
                    : 'Please fill in all required fields (*) and accept the RGPD consent.'}
                </p>
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-1.5">
                <label className="block text-xs font-mono uppercase text-gray-400">
                  {t.formFirstName} <span className="text-red-400">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  placeholder="Jean"
                  className="w-full bg-black/40 border border-white/10 focus:border-purple-500 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none"
                />
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-mono uppercase text-gray-400">
                  {t.formLastName} <span className="text-red-400">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  placeholder="Dupont"
                  className="w-full bg-black/40 border border-white/10 focus:border-purple-500 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-1.5">
                <label className="block text-xs font-mono uppercase text-gray-400">{t.formCompany}</label>
                <input
                  type="text"
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                  placeholder="Alliance Globale"
                  className="w-full bg-black/40 border border-white/10 focus:border-purple-500 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none"
                />
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-mono uppercase text-gray-400">{t.formFunction}</label>
                <input
                  type="text"
                  value={jobTitle}
                  onChange={(e) => setJobTitle(e.target.value)}
                  placeholder="Consultant"
                  className="w-full bg-black/40 border border-white/10 focus:border-purple-500 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="md:col-span-2 space-y-1.5">
                <label className="block text-xs font-mono uppercase text-gray-400">
                  {t.formEmail} <span className="text-red-400">*</span>
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="jean.dupont@alliance.com"
                  className="w-full bg-black/40 border border-white/10 focus:border-purple-500 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none"
                />
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-mono uppercase text-gray-400">{t.formPhone}</label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+33"
                  className="w-full bg-black/40 border border-white/10 focus:border-purple-500 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-mono uppercase text-gray-400">{t.formCountry}</label>
              <input
                type="text"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                placeholder="France"
                className="w-full bg-black/40 border border-white/10 focus:border-purple-500 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none"
              />
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-mono uppercase text-gray-400">
                {language === 'fr' ? 'Détail de votre message / proposition' : 'Details of your message / proposal'} <span className="text-red-400">*</span>
              </label>
              <textarea
                required
                rows={4}
                value={proposal}
                onChange={(e) => setProposal(e.target.value)}
                placeholder={language === 'fr' ? 'Expliquez-nous brièvement votre concept...' : 'Briefly describe your concept...'}
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
              className="w-full py-3.5 bg-purple-600 hover:bg-purple-500 disabled:bg-purple-800 text-white font-bold font-orbitron text-xs tracking-widest uppercase rounded-xl transition-all cursor-none flex items-center justify-center space-x-2"
            >
              <Send className="w-4 h-4" />
              <span>{submitting ? t.saving : t.submit}</span>
            </button>
          </form>

          <div className="pt-4 border-t border-white/5 flex items-center justify-center space-x-2 text-[10px] text-gray-500 font-mono">
            <Info className="w-3.5 h-3.5" />
            <span>Vos données sont protégées via cryptage SSL/TLS et stockées selon la charte RGPD d'IMUIA.</span>
          </div>
        </div>
      </div>
    </div>
  );
};
