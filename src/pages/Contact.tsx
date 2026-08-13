import React, { useState } from 'react';
import { useAppState } from '../data/AppState';
import { CheckCircle, AlertCircle, Sparkles, Globe, Mail, Phone, MapPin } from 'lucide-react';

export const Contact: React.FC = () => {
  const { language, addContact, playSound, setActiveSection } = useAppState();

  // Form states
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [proposal, setProposal] = useState('');
  const [consent, setConsent] = useState(false);

  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const [showDirectForm, setShowDirectForm] = useState(false);

  // Intent Button Handlers
  const handleIntent = (type: 'present' | 'partner' | 'invest') => {
    playSound('space');
    if (type === 'present') {
      sessionStorage.setItem('prefill_partnerType', 'Developer');
      sessionStorage.setItem('prefill_proposal', language === 'fr'
        ? "Bonjour l'équipage IMUIA, je souhaite vous présenter mon concept innovant pour incubation..."
        : "Hello IMUIA flight crew, I would like to submit my innovative concept for incubation...");
    } else if (type === 'partner') {
      sessionStorage.setItem('prefill_partnerType', 'Operator');
      sessionStorage.setItem('prefill_proposal', language === 'fr'
        ? "Bonjour l'équipage IMUIA, je souhaite devenir partenaire opérateur local ou prestataire..."
        : "Hello IMUIA flight crew, I would like to explore becoming a local operator or strategic partner...");
    } else if (type === 'invest') {
      sessionStorage.setItem('prefill_partnerType', 'Investor');
      sessionStorage.setItem('prefill_proposal', language === 'fr'
        ? "Bonjour l'équipage IMUIA, je représente un fonds ou un capital d'investissement et souhaite en savoir plus sur les opportunités de co-investissement..."
        : "Hello IMUIA flight crew, I represent an investment fund and want to discuss co-investment opportunities...");
    }
    setActiveSection('partners');
  };

  const handleContactSubmit = (e: React.FormEvent) => {
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
        company: 'Direct Contact',
        function: 'Visitor',
        email,
        phone,
        country: 'Online',
        partnerType: 'Direct Contact',
        project: 'General Inquiry',
        budget: '0',
        proposal
      });

      setSubmitting(false);
      setSuccess(true);
      playSound('success');

      // Reset
      setFirstName('');
      setLastName('');
      setEmail('');
      setPhone('');
      setProposal('');
      setConsent(false);
    }, 1200);
  };

  return (
    <div className="relative min-h-[calc(100vh-80px)] py-12 px-4 space-y-16 overflow-hidden">
      <div className="absolute inset-0 stars-bg opacity-30 pointer-events-none"></div>

      {/* Hero Header with orbiting elements */}
      <section className="max-w-4xl mx-auto text-center space-y-8 relative z-10">
        <div className="relative flex justify-center mb-6">
          {/* Pulsing Atmosphere glow background */}
          <div className="absolute inset-0 m-auto w-64 h-64 bg-cyan-600/15 rounded-full blur-3xl animate-pulse"></div>

          {/* Interactive 3D-styled Earth Sphere */}
          <div className="relative w-48 h-48 rounded-full bg-gradient-to-tr from-cyan-950 via-slate-900 to-black border border-cyan-500/40 flex items-center justify-center shadow-[0_0_60px_rgba(6,182,212,0.3)] hover:scale-105 transition-transform duration-700 overflow-hidden">

            {/* Spinning vector grid lines representing earth coordinates */}
            <div className="absolute inset-0 opacity-20 border border-cyan-400/20 rounded-full animate-orbit"></div>
            <div className="absolute inset-2 opacity-10 border border-dashed border-purple-500/30 rounded-full animate-orbit-reverse"></div>

            {/* Elegant glowing SVG representations of continents & satellite rays */}
            <svg className="absolute w-full h-full text-cyan-400/30 p-2 animate-pulse" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="0.5">
              <circle cx="50" cy="50" r="45" strokeDasharray="3,3" />
              <path d="M20,50 Q35,30 50,50 T80,50" />
              <path d="M25,40 Q40,65 75,40" />
              <path d="M50,10 L50,90" />
              <path d="M10,50 L90,50" />
            </svg>

            {/* Pulsing signal beacon point over the Earth */}
            <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-4 h-4">
              <div className="absolute inset-0 bg-purple-500 rounded-full animate-ping"></div>
              <div className="w-2.5 h-2.5 bg-purple-400 rounded-full border border-black shadow-[0_0_10px_#a855f7]"></div>
            </div>

            <div className="z-10 text-center pointer-events-none select-none">
              <span className="block font-orbitron font-black text-xs tracking-widest text-cyan-400 uppercase">
                IMUIA ORBIT
              </span>
              <span className="block text-[8px] font-mono text-gray-500 tracking-wider uppercase mt-0.5">
                43.5528° N, 7.0174° E
              </span>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h2 className="text-xs font-orbitron font-bold text-cyan-400 tracking-widest uppercase flex items-center justify-center space-x-2">
            <Globe className="w-4 h-4 animate-spin-slow" />
            <span>{language === 'fr' ? 'Canal de Liaison Instantané' : 'Instant Link Channel'}</span>
          </h2>
          <h1 className="text-3xl md:text-5xl font-black font-orbitron text-white uppercase tracking-tight">
            {language === 'fr' ? 'Vous avez une idée à mettre en orbite ?' : 'Have an idea to launch into orbit?'}
          </h1>
          <p className="text-sm md:text-base text-gray-300 max-w-2xl mx-auto leading-relaxed font-light">
            {language === 'fr'
              ? "Projet innovant, partenariat stratégique, investissement ou proposition de collaboration : entrez directement en liaison avec l'équipage IMUIA."
              : "Innovative project, strategic partnership, investment, or collaboration proposal: get directly in touch with the IMUIA flight crew."}
          </p>
        </div>

        {/* Dynamic call-to-action actions */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto pt-4">
          <button
            onClick={() => handleIntent('present')}
            onMouseEnter={() => playSound('hover')}
            className="p-5 bg-gradient-to-b from-purple-950/40 to-black/60 hover:from-purple-900/40 hover:to-black/80 border border-purple-500/20 hover:border-purple-500/60 rounded-2xl text-center space-y-3 transition-all cursor-none group hover:translate-y-[-2px] shadow-lg shadow-purple-950/10"
          >
            <div className="mx-auto w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center group-hover:scale-110 transition-transform">
              <Sparkles className="w-5 h-5 text-purple-400" />
            </div>
            <span className="block font-orbitron font-bold text-xs tracking-wider text-white uppercase">
              {language === 'fr' ? 'Présenter mon projet' : 'Submit My Project'}
            </span>
          </button>

          <button
            onClick={() => handleIntent('partner')}
            onMouseEnter={() => playSound('hover')}
            className="p-5 bg-gradient-to-b from-cyan-950/40 to-black/60 hover:from-cyan-900/40 hover:to-black/80 border border-cyan-500/20 hover:border-cyan-500/60 rounded-2xl text-center space-y-3 transition-all cursor-none group hover:translate-y-[-2px] shadow-lg shadow-cyan-950/10"
          >
            <div className="mx-auto w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center group-hover:scale-110 transition-transform">
              <Globe className="w-5 h-5 text-cyan-400" />
            </div>
            <span className="block font-orbitron font-bold text-xs tracking-wider text-white uppercase">
              {language === 'fr' ? 'Devenir partenaire' : 'Become a Partner'}
            </span>
          </button>

          <button
            onClick={() => handleIntent('invest')}
            onMouseEnter={() => playSound('hover')}
            className="p-5 bg-gradient-to-b from-pink-950/40 to-black/60 hover:from-pink-900/40 hover:to-black/80 border border-pink-500/20 hover:border-pink-500/60 rounded-2xl text-center space-y-3 transition-all cursor-none group hover:translate-y-[-2px] shadow-lg shadow-pink-950/10"
          >
            <div className="mx-auto w-10 h-10 rounded-xl bg-pink-500/10 border border-pink-500/20 flex items-center justify-center group-hover:scale-110 transition-transform">
              <Sparkles className="w-5 h-5 text-pink-400" />
            </div>
            <span className="block font-orbitron font-bold text-xs tracking-wider text-white uppercase">
              {language === 'fr' ? "Investir dans l'univers" : 'Invest in a Universe'}
            </span>
          </button>

          <button
            onClick={() => { setShowDirectForm(true); playSound('click'); }}
            onMouseEnter={() => playSound('hover')}
            className="p-5 bg-gradient-to-b from-white/5 to-black/60 hover:from-white/10 hover:to-black/80 border border-white/10 hover:border-white/30 rounded-2xl text-center space-y-3 transition-all cursor-none group hover:translate-y-[-2px] shadow-lg"
          >
            <div className="mx-auto w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:scale-110 transition-transform">
              <Mail className="w-5 h-5 text-gray-300" />
            </div>
            <span className="block font-orbitron font-bold text-xs tracking-wider text-white uppercase">
              {language === 'fr' ? 'Contacter IMUIA' : 'Contact IMUIA'}
            </span>
          </button>
        </div>
      </section>

      {/* Direct Messaging Form Panel */}
      {showDirectForm && (
        <section className="max-w-xl mx-auto glass-panel p-6 md:p-8 rounded-3xl border border-cyan-500/30 relative z-10 animate-fade-in text-left space-y-6">
          <div className="flex items-center justify-between border-b border-white/5 pb-3">
            <h3 className="font-orbitron font-bold text-sm text-cyan-400 uppercase flex items-center space-x-2">
              <Mail className="w-4 h-4" />
              <span>{language === 'fr' ? "Liaison de messagerie directe" : "Direct Message Link"}</span>
            </h3>
            <button
              onClick={() => { setShowDirectForm(false); playSound('click'); }}
              className="text-xs text-gray-400 hover:text-white font-mono cursor-none"
            >
              [X] {language === 'fr' ? 'Fermer' : 'Close'}
            </button>
          </div>

          {success && (
            <div className="p-4 rounded-xl bg-green-500/10 border border-green-500/30 text-green-400 flex items-start space-x-3 text-left">
              <CheckCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-bold text-sm">{language === 'fr' ? 'Message envoyé !' : 'Message Transmitted!'}</p>
                <p className="text-xs text-green-300">
                  {language === 'fr'
                    ? "Votre message direct a été envoyé à l'équipe. Nous reviendrons vers vous sous 24h."
                    : "Your direct message has been received by our crew. We will get back to you within 24 hours."}
                </p>
              </div>
            </div>
          )}

          {error && (
            <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 flex items-start space-x-3 text-left">
              <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-bold text-sm">{language === 'fr' ? 'Erreur de transmission' : 'Transmission Error'}</p>
                <p className="text-xs text-red-300">
                  {language === 'fr' ? "Veuillez remplir les informations requises." : "Please fill out the required information."}
                </p>
              </div>
            </div>
          )}

          <form onSubmit={handleContactSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="block text-[10px] font-mono uppercase text-gray-400">{language === 'fr' ? 'Prénom' : 'First Name'}</label>
                <input
                  type="text"
                  required
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  placeholder="Ex: Clara"
                  className="w-full bg-black/40 border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div className="space-y-1.5">
                <label className="block text-[10px] font-mono uppercase text-gray-400">{language === 'fr' ? 'Nom' : 'Last Name'}</label>
                <input
                  type="text"
                  required
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  placeholder="Ex: Vanhoutte"
                  className="w-full bg-black/40 border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-500"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="block text-[10px] font-mono uppercase text-gray-400">E-mail</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="clara@imuia.com"
                className="w-full bg-black/40 border border-white/10 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-cyan-500"
              />
            </div>

            <div className="space-y-1.5">
              <label className="block text-[10px] font-mono uppercase text-gray-400">{language === 'fr' ? 'Téléphone' : 'Phone'}</label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+33 6 12..."
                className="w-full bg-black/40 border border-white/10 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-cyan-500"
              />
            </div>

            <div className="space-y-1.5">
              <label className="block text-[10px] font-mono uppercase text-gray-400">Message</label>
              <textarea
                required
                rows={4}
                value={proposal}
                onChange={(e) => setProposal(e.target.value)}
                placeholder={language === 'fr' ? "Détails de votre demande..." : "Details of your inquiry..."}
                className="w-full bg-black/40 border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-500"
              />
            </div>

            <div className="flex items-start space-x-2.5 pt-1">
              <input
                type="checkbox"
                id="contact-consent"
                checked={consent}
                onChange={(e) => setConsent(e.target.checked)}
                className="mt-0.5 accent-cyan-600 rounded cursor-none"
              />
              <label htmlFor="contact-consent" className="text-[10px] text-gray-400 leading-tight select-none">
                {language === 'fr'
                  ? "J'accepte que mes données soient traitées conformément à la charte RGPD d'IMUIA."
                  : "I consent to IMUIA processing my information in accordance with European RGPD directives."}
              </label>
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="w-full py-2.5 bg-cyan-600 hover:bg-cyan-500 disabled:bg-cyan-800 text-white font-bold font-orbitron text-xs tracking-widest uppercase rounded-xl transition-all cursor-none"
            >
              {submitting ? (language === 'fr' ? 'Transmission...' : 'Transmitting...') : (language === 'fr' ? 'Établir la liaison' : 'Establish Link')}
            </button>
          </form>
        </section>
      )}

      {/* Physical offices details */}
      <section className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 relative z-10 text-left">
        <div className="glass-panel p-5 rounded-2xl border border-white/5 space-y-2">
          <div className="p-2 rounded-xl bg-purple-500/10 text-purple-400 w-10 h-10 flex items-center justify-center">
            <MapPin className="w-5 h-5" />
          </div>
          <h4 className="font-orbitron font-bold text-sm text-white">{language === 'fr' ? 'Coordonnées terrestres' : 'Coordinates'}</h4>
          <p className="text-xs text-gray-400 leading-normal font-light">
            IMUIA HQ — Cannes / La Croisette &amp; Antananarivo, Madagascar
          </p>
        </div>

        <div className="glass-panel p-5 rounded-2xl border border-white/5 space-y-2">
          <div className="p-2 rounded-xl bg-cyan-500/10 text-cyan-400 w-10 h-10 flex items-center justify-center">
            <Mail className="w-5 h-5" />
          </div>
          <h4 className="font-orbitron font-bold text-sm text-white">E-mail</h4>
          <p className="text-xs text-gray-400 leading-normal font-mono">
            crew@imuia.com
          </p>
        </div>

        <div className="glass-panel p-5 rounded-2xl border border-white/5 space-y-2">
          <div className="p-2 rounded-xl bg-pink-500/10 text-pink-400 w-10 h-10 flex items-center justify-center">
            <Phone className="w-5 h-5" />
          </div>
          <h4 className="font-orbitron font-bold text-sm text-white">{language === 'fr' ? 'Téléphone' : 'Phone'}</h4>
          <p className="text-xs text-gray-400 leading-normal font-mono">
            +33 (0)4 93 00 00 00
          </p>
        </div>
      </section>
    </div>
  );
};
