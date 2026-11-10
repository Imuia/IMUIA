import React, { useState, useEffect } from 'react';
import { useAppState } from '../data/useAppState';
import { translations } from '../data/translations';
import { Send, UploadCloud, CheckCircle, AlertCircle, HelpCircle, Lock } from 'lucide-react';

export const Partners: React.FC = () => {
  const { language, addContact, playSound } = useAppState();
  const t = translations[language];

  // Form Fields State
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [company, setCompany] = useState('');
  const [jobTitle, setJobTitle] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [country, setCountry] = useState('');
  const [partnerType, setPartnerType] = useState('');
  const [project, setProject] = useState('');
  const [budget, setBudget] = useState('');
  const [proposal, setProposal] = useState('');
  const [consent, setConsent] = useState(false);

  // Check prefill intent from sessionStorage on mount
  useEffect(() => {
    try {
      const intentType = sessionStorage.getItem('imuia_intent_type');
      const intentTopic = sessionStorage.getItem('imuia_intent_topic');
      if (intentType) {
        setPartnerType(intentType);
      }
      if (intentTopic) {
        setProposal((prev) => prev || `[Intention: ${intentTopic}] `);
      }
      // clear consumed intent
      sessionStorage.removeItem('imuia_intent_type');
      sessionStorage.removeItem('imuia_intent_topic');
    } catch {
      // ignore
    }
  }, []);

  // Attachment Simulation
  const [fileName, setFileName] = useState<string | null>(null);
  const [isDragOver, setIsDragOver] = useState(false);

  // Status indicators
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFileName(e.target.files[0].name);
      playSound('success');
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      setFileName(e.dataTransfer.files[0].name);
      playSound('success');
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(false);
    setSuccess(false);

    // Validation
    if (!firstName || !lastName || !email || !proposal || !consent) {
      setError(true);
      playSound('click');
      return;
    }

    setSubmitting(true);
    playSound('space');

    setTimeout(() => {
      // Create contact object in local state
      addContact({
        firstName,
        lastName,
        company,
        function: jobTitle,
        email,
        phone,
        country,
        partnerType: partnerType || 'Other',
        project: project || 'General',
        budget: budget || '0',
        proposal
      });

      setSubmitting(false);
      setSuccess(true);
      playSound('success');

      // Reset form fields
      setFirstName('');
      setLastName('');
      setCompany('');
      setJobTitle('');
      setEmail('');
      setPhone('');
      setCountry('');
      setPartnerType('');
      setProject('');
      setBudget('');
      setProposal('');
      setFileName(null);
      setConsent(false);
    }, 1500);
  };

  return (
    <div className="relative min-h-[calc(100vh-80px)] py-12 px-4 space-y-12">
      <div className="absolute inset-0 stars-bg opacity-30 pointer-events-none"></div>

      <div className="text-center max-w-3xl mx-auto space-y-4 relative z-10">
        <h2 className="text-xs font-orbitron font-bold text-purple-400 tracking-widest uppercase flex items-center justify-center space-x-2">
          <HelpCircle className="w-4 h-4" />
          <span>{t.partnerTitle}</span>
        </h2>
        <h1 className="text-3xl md:text-5xl font-black font-orbitron uppercase text-white leading-tight">
          {t.partnerSubtitle}
        </h1>
        <p className="text-sm md:text-base text-gray-400 leading-relaxed font-light">
          {t.partnerIntro}
        </p>
      </div>

      <div className="max-w-4xl mx-auto glass-panel p-6 md:p-8 rounded-3xl border border-purple-500/30 relative z-10">

        {success && (
          <div className="mb-6 p-4 rounded-xl bg-green-500/10 border border-green-500/30 text-green-400 flex items-start space-x-3 text-left">
            <CheckCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-bold text-sm">Transmission réussie !</p>
              <p className="text-xs text-green-300">{t.formSuccess}</p>
            </div>
          </div>
        )}

        {error && (
          <div className="mb-6 p-4 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 flex items-start space-x-3 text-left">
            <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-bold text-sm">Champs obligatoires manquants</p>
              <p className="text-xs text-red-300">{t.formError}</p>
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6 text-left">

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Prénom */}
            <div className="space-y-1.5">
              <label className="block text-xs font-mono uppercase text-gray-400">
                {t.formFirstName} <span className="text-red-400">*</span>
              </label>
              <input
                type="text"
                required
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                placeholder="Ex: Clara"
                className="w-full bg-black/40 border border-white/10 focus:border-purple-500 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:ring-1 focus:ring-purple-500"
              />
            </div>

            {/* Nom */}
            <div className="space-y-1.5">
              <label className="block text-xs font-mono uppercase text-gray-400">
                {t.formLastName} <span className="text-red-400">*</span>
              </label>
              <input
                type="text"
                required
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                placeholder="Ex: Vanhoutte"
                className="w-full bg-black/40 border border-white/10 focus:border-purple-500 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:ring-1 focus:ring-purple-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Société */}
            <div className="space-y-1.5">
              <label className="block text-xs font-mono uppercase text-gray-400">
                {t.formCompany}
              </label>
              <input
                type="text"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                placeholder="Ex: Capital Stellaire SAS"
                className="w-full bg-black/40 border border-white/10 focus:border-purple-500 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:ring-1 focus:ring-purple-500"
              />
            </div>

            {/* Fonction */}
            <div className="space-y-1.5">
              <label className="block text-xs font-mono uppercase text-gray-400">
                {t.formFunction}
              </label>
              <input
                type="text"
                value={jobTitle}
                onChange={(e) => setJobTitle(e.target.value)}
                placeholder="Ex: Directeur R&amp;D"
                className="w-full bg-black/40 border border-white/10 focus:border-purple-500 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:ring-1 focus:ring-purple-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* E-mail */}
            <div className="space-y-1.5">
              <label className="block text-xs font-mono uppercase text-gray-400">
                {t.formEmail} <span className="text-red-400">*</span>
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Ex: clara@capitalstellaire.com"
                className="w-full bg-black/40 border border-white/10 focus:border-purple-500 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:ring-1 focus:ring-purple-500"
              />
            </div>

            {/* Téléphone */}
            <div className="space-y-1.5">
              <label className="block text-xs font-mono uppercase text-gray-400">
                {t.formPhone}
              </label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="Ex: +33 6 12 34 56 78"
                className="w-full bg-black/40 border border-white/10 focus:border-purple-500 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:ring-1 focus:ring-purple-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Pays */}
            <div className="space-y-1.5">
              <label className="block text-xs font-mono uppercase text-gray-400">
                {t.formCountry}
              </label>
              <input
                type="text"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                placeholder="Ex: France, Maroc, Madagascar"
                className="w-full bg-black/40 border border-white/10 focus:border-purple-500 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:ring-1 focus:ring-purple-500"
              />
            </div>

            {/* Catégorie Partenariat */}
            <div className="space-y-1.5">
              <label className="block text-xs font-mono uppercase text-gray-400">
                {t.formPartnerType}
              </label>
              <select
                value={partnerType}
                onChange={(e) => setPartnerType(e.target.value)}
                className="w-full bg-black border border-white/10 focus:border-purple-500 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:ring-1 focus:ring-purple-500"
              >
                <option value="">{t.formPartnerTypePlaceholder}</option>
                <option value="Investor">{t.partnerInvestor}</option>
                <option value="Operator">{t.partnerProvider}</option>
                <option value="Developer">{t.partnerDeveloper}</option>
                <option value="Broker">{t.partnerBroker}</option>
                <option value="Creator">{t.partnerCreator}</option>
                <option value="Other">{t.partnerOther}</option>
              </select>
            </div>

            {/* Budget */}
            <div className="space-y-1.5">
              <label className="block text-xs font-mono uppercase text-gray-400">
                {t.formBudget}
              </label>
              <input
                type="number"
                value={budget}
                onChange={(e) => setBudget(e.target.value)}
                placeholder="Ex: 50000"
                className="w-full bg-black/40 border border-white/10 focus:border-purple-500 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:ring-1 focus:ring-purple-500"
              />
            </div>
          </div>

          {/* Proposition détaillée */}
          <div className="space-y-1.5">
            <label className="block text-xs font-mono uppercase text-gray-400">
              {t.formProposal} <span className="text-red-400">*</span>
            </label>
            <textarea
              required
              rows={4}
              value={proposal}
              onChange={(e) => setProposal(e.target.value)}
              placeholder="Décrivez votre projet, vos attentes, ou vos capacités d'investissement..."
              className="w-full bg-black/40 border border-white/10 focus:border-purple-500 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:ring-1 focus:ring-purple-500"
            />
          </div>

          {/* Pièce jointe simulateur */}
          <div className="space-y-1.5">
            <label className="block text-xs font-mono uppercase text-gray-400">
              {t.formFile}
            </label>
            <div
              onDragOver={(e) => { e.preventDefault(); setIsDragOver(true); }}
              onDragLeave={() => setIsDragOver(false)}
              onDrop={handleDrop}
              className={`border-2 border-dashed rounded-2xl p-6 text-center transition-all ${
                isDragOver ? 'border-purple-500 bg-purple-500/10' : 'border-white/10 hover:border-white/20'
              }`}
            >
              <input
                type="file"
                id="file-attachment"
                onChange={handleFileChange}
                className="hidden"
              />
              <label htmlFor="file-attachment" className="cursor-none flex flex-col items-center justify-center space-y-2">
                <UploadCloud className="w-8 h-8 text-purple-400" />
                <span className="text-xs text-gray-300 font-bold">
                  {fileName ? `Fichier sélectionné : ${fileName}` : "Glissez-déposez vos fichiers ici, ou cliquez pour parcourir"}
                </span>
                <span className="text-[10px] text-gray-500">
                  Fichiers acceptés: PDF, DOCX, ZIP, PNG, JPG (Max 15 Mo)
                </span>
              </label>
            </div>
          </div>

          {/* Consentement RGPD */}
          <div className="flex items-start space-x-3.5 pt-2">
            <input
              type="checkbox"
              id="consent-checkbox"
              checked={consent}
              onChange={(e) => setConsent(e.target.checked)}
              className="mt-1 accent-purple-600 rounded cursor-none"
            />
            <label htmlFor="consent-checkbox" className="text-xs text-gray-400 leading-relaxed select-none">
              {t.formConsent}
            </label>
          </div>

          {/* Submit Trigger */}
          <div className="pt-4">
            <button
              type="submit"
              disabled={submitting}
              className="w-full flex items-center justify-center space-x-2 py-3.5 bg-purple-600 hover:bg-purple-500 disabled:bg-purple-800 text-white font-bold font-orbitron text-sm tracking-widest uppercase rounded-xl transition-all shadow-lg shadow-purple-900/20 cursor-none"
            >
              <Send className="w-4 h-4" />
              <span>{submitting ? t.saving : t.submit}</span>
            </button>
          </div>

        </form>

        <div className="mt-8 border-t border-white/5 pt-6 flex items-center justify-center space-x-2 text-[11px] font-mono text-gray-500">
          <Lock className="w-3.5 h-3.5" />
          <span>Données cryptées via SSL 256 bits et stockées conformément au RGPD de l'Union Européenne.</span>
        </div>

      </div>
    </div>
  );
};
