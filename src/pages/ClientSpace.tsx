import React, { useState, useRef } from 'react';
import { useAppState } from '../data/useAppState';
import { translations } from '../data/translations';
import {
  CheckCircle, Bell, BarChart2, UploadCloud, FileSignature, ShieldCheck,
  FileText, MessageSquare, Download, Send, Clock
} from 'lucide-react';

export const ClientSpace: React.FC = () => {
  const {
    language,
    userSession,
    login,
    register,
    logout,
    contracts,
    signContractInState,
    invoices,
    clientMessages,
    sendClientMessage,
    playSound
  } = useAppState();

  const t = translations[language];

  // Active tab state inside client portal
  const [activeTab, setActiveTab] = useState<'overview' | 'contracts' | 'documents' | 'invoices' | 'messages'>('overview');

  // Auth local state
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [isRegistering, setIsRegistering] = useState(false);
  const [authError, setAuthError] = useState(false);

  // New message input
  const [msgInput, setMsgInput] = useState('');

  // File Upload local list simulator
  const [uploadedFiles, setUploadedFiles] = useState<{ name: string; size: string; date: string }[]>([
    { name: 'KBIS-Stella-Venture.pdf', size: '340 Ko', date: '2026-03-01' },
    { name: 'Mandat-Co-Developpement.pdf', size: '1.2 Mo', date: '2026-03-04' }
  ]);

  // Signature modal states
  const [signingContractId, setSigningContractId] = useState<string | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError(false);
    const success = login(email || 'partner@imuia.com', password || 'password');
    if (!success) {
      setAuthError(true);
    }
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    register(email, name);
  };

  const handleFileLocalUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const f = e.target.files[0];
      setUploadedFiles(prev => [
        {
          name: f.name,
          size: `${Math.round(f.size / 1024)} Ko`,
          date: new Date().toISOString().slice(0, 10)
        },
        ...prev
      ]);
      playSound('success');
    }
  };

  // Signature Pad canvas mouse actions
  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    setIsDrawing(true);
    const rect = canvas.getBoundingClientRect();
    ctx.beginPath();
    ctx.moveTo(e.clientX - rect.left, e.clientY - rect.top);
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    ctx.lineWidth = 2;
    ctx.lineCap = 'round';
    ctx.strokeStyle = '#a855f7'; // Purple signature path
    ctx.lineTo(e.clientX - rect.left, e.clientY - rect.top);
    ctx.stroke();
  };

  const stopDrawing = () => {
    setIsDrawing(false);
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    playSound('click');
  };

  const saveSignature = () => {
    const canvas = canvasRef.current;
    if (!canvas || !signingContractId) return;

    // Simulate converting canvas to base64 SVG or PNG representation
    const dataUrl = canvas.toDataURL();
    signContractInState(signingContractId, dataUrl);
    setSigningContractId(null);
    playSound('success');
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!msgInput.trim()) return;
    sendClientMessage(msgInput);
    setMsgInput('');
  };

  const handleDownloadInvoice = (ref: string) => {
    playSound('success');
    alert(`Téléchargement sécurisé de la facture ${ref} en cours...`);
  };

  if (!userSession) {
    return (
      <div className="relative min-h-[calc(100vh-80px)] py-12 px-4 flex items-center justify-center">
        <div className="absolute inset-0 stars-bg opacity-30 pointer-events-none"></div>

        <div className="max-w-md w-full glass-panel p-6 md:p-8 rounded-3xl border border-purple-500/30 text-left space-y-6 relative z-10">
          <div className="text-center space-y-2">
            <h1 className="text-2xl font-black font-orbitron text-white uppercase">
              {isRegistering ? t.clientRegister : t.clientLogin}
            </h1>
            <p className="text-xs text-gray-400">
              {t.clientSubtitle}
            </p>
          </div>

          {authError && (
            <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-xs text-red-400">
              Identifiants invalides. Utilisez: partner@imuia.com / password
            </div>
          )}

          {!isRegistering ? (
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-1.5">
                <label className="block text-xs font-mono uppercase text-gray-400">{t.clientEmail}</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="partner@imuia.com"
                  className="w-full bg-black/40 border border-white/10 focus:border-purple-500 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none"
                />
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-mono uppercase text-gray-400">{t.clientPass}</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-black/40 border border-white/10 focus:border-purple-500 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-purple-600 hover:bg-purple-500 text-white font-bold font-orbitron text-xs tracking-widest uppercase rounded-xl transition-all cursor-none"
              >
                {t.clientBtnLogin}
              </button>

              <div className="text-center pt-2">
                <button
                  type="button"
                  onClick={() => { setIsRegistering(true); playSound('click'); }}
                  className="text-xs text-purple-400 hover:text-purple-300 underline cursor-none"
                >
                  {t.clientNoAccount}
                </button>
              </div>
            </form>
          ) : (
            <form onSubmit={handleRegister} className="space-y-4">
              <div className="space-y-1.5">
                <label className="block text-xs font-mono uppercase text-gray-400">Nom &amp; Prénom</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Stella Nova"
                  className="w-full bg-black/40 border border-white/10 focus:border-purple-500 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none"
                />
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-mono uppercase text-gray-400">Adresse E-mail</label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="stella@nova.com"
                  className="w-full bg-black/40 border border-white/10 focus:border-purple-500 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-purple-600 hover:bg-purple-500 text-white font-bold font-orbitron text-xs tracking-widest uppercase rounded-xl transition-all cursor-none"
              >
                {t.clientBtnRegister}
              </button>

              <div className="text-center pt-2">
                <button
                  type="button"
                  onClick={() => { setIsRegistering(false); playSound('click'); }}
                  className="text-xs text-purple-400 hover:text-purple-300 underline cursor-none"
                >
                  {t.clientHasAccount}
                </button>
              </div>
            </form>
          )}

          <div className="pt-4 border-t border-white/5 text-[10px] text-gray-500 text-center leading-relaxed">
            Pour tester de manière rapide, cliquez directement sur "S'amarrer à la station" avec les champs pré-saisis.
          </div>
        </div>
      </div>
    );
  }

  // Logged-in complete partner interface
  return (
    <div className="relative min-h-[calc(100vh-80px)] py-12 px-4 space-y-8">
      <div className="absolute inset-0 stars-bg opacity-35 pointer-events-none"></div>

      <div className="max-w-6xl mx-auto space-y-6 relative z-10 text-left">

        {/* Greeting & Session Bar */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 glass-panel p-6 rounded-3xl border border-purple-500/30">
          <div className="space-y-1.5">
            <div className="flex items-center space-x-2">
              <span className="w-2.5 h-2.5 rounded-full bg-green-400 animate-pulse"></span>
              <span className="text-[10px] text-green-400 font-mono tracking-widest uppercase">// SECURE LINK ESTABLISHED</span>
            </div>
            <h1 className="text-xl md:text-2xl font-black font-orbitron text-white">
              {t.clientWelcome} <span className="text-purple-400">{userSession.name}</span>
            </h1>
            <p className="text-xs text-gray-400 leading-relaxed font-light">
              {t.clientPartnerType}: <span className="text-cyan-400 font-bold">{userSession.role}</span>
            </p>
          </div>

          <button
            onClick={logout}
            className="px-4 py-2.5 text-xs font-mono bg-white/5 hover:bg-red-500/10 text-red-400 hover:text-white rounded-xl border border-red-500/20 transition-all cursor-none uppercase"
          >
            {t.clientLogout}
          </button>
        </div>

        {/* Portal Navigation Tabs */}
        <div className="flex flex-wrap gap-2 border-b border-white/10 pb-4">
          {[
            { id: 'overview', label: t.tabOverview, icon: BarChart2 },
            { id: 'contracts', label: t.tabContracts, icon: FileSignature },
            { id: 'documents', label: t.tabDocuments, icon: UploadCloud },
            { id: 'invoices', label: t.tabInvoices, icon: FileText },
            { id: 'messages', label: t.tabMessages, icon: MessageSquare }
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => { setActiveTab(tab.id as any); playSound('click'); }}
                className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl text-xs font-orbitron font-bold uppercase tracking-wider transition-all cursor-none ${
                  isActive
                    ? 'bg-purple-600 text-white shadow-lg shadow-purple-600/30'
                    : 'bg-white/5 text-gray-400 hover:text-white hover:bg-white/10'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Tab 1: Overview & KPIs */}
        {activeTab === 'overview' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 animate-fade-in">
            <div className="lg:col-span-2 space-y-6">
              {/* Partner Analytics report */}
              <div className="glass-panel p-6 rounded-3xl border border-white/5 space-y-4">
                <h3 className="font-orbitron font-bold text-sm uppercase text-cyan-400 flex items-center space-x-2">
                  <BarChart2 className="w-4.5 h-4.5" />
                  <span>{t.clientStatsTitle}</span>
                </h3>

                <div className="grid grid-cols-3 gap-4 text-center">
                  <div className="bg-black/40 p-4 rounded-xl border border-white/5">
                    <div className="text-2xl font-bold font-orbitron text-purple-400">1,240</div>
                    <div className="text-[10px] text-gray-500 font-mono uppercase mt-1">Visiteurs Routés</div>
                  </div>
                  <div className="bg-black/40 p-4 rounded-xl border border-white/5">
                    <div className="text-2xl font-bold font-orbitron text-cyan-400">42</div>
                    <div className="text-[10px] text-gray-500 font-mono uppercase mt-1">Prospects Qualifiés</div>
                  </div>
                  <div className="bg-black/40 p-4 rounded-xl border border-white/5">
                    <div className="text-2xl font-bold font-orbitron text-green-400">99.8%</div>
                    <div className="text-[10px] text-gray-500 font-mono uppercase mt-1">Disponibilité API</div>
                  </div>
                </div>
              </div>

              {/* Active ecosystem milestones */}
              <div className="glass-panel p-6 rounded-3xl border border-white/5 space-y-4">
                <h3 className="font-orbitron font-bold text-sm uppercase text-purple-400 flex items-center space-x-2">
                  <Clock className="w-4.5 h-4.5" />
                  <span>Suivi de vos Projets en Partenariat</span>
                </h3>

                <div className="space-y-3">
                  <div className="p-4 rounded-xl bg-black/40 border border-white/5 flex items-center justify-between">
                    <div>
                      <span className="block font-bold text-sm text-white">Déploiement Flotte EbikeMaroc Essaouira</span>
                      <span className="text-xs text-gray-400 font-mono">Statut : Validation technique des capteurs GPS</span>
                    </div>
                    <span className="text-xs font-mono px-2.5 py-1 rounded bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">En cours (75%)</span>
                  </div>

                  <div className="p-4 rounded-xl bg-black/40 border border-white/5 flex items-center justify-between">
                    <div>
                      <span className="block font-bold text-sm text-white">Certification Juridique MadaImmo</span>
                      <span className="text-xs text-gray-400 font-mono">Statut : Signature du mandat de co-investissement</span>
                    </div>
                    <span className="text-xs font-mono px-2.5 py-1 rounded bg-amber-500/10 text-amber-400 border border-amber-500/20">En attente signature</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Notifications sidebar */}
            <div className="glass-panel p-6 rounded-3xl border border-white/5 space-y-4 h-fit">
              <h3 className="font-orbitron font-bold text-sm uppercase text-pink-400 flex items-center space-x-2">
                <Bell className="w-4.5 h-4.5" />
                <span>{t.clientNotification}</span>
              </h3>

              <div className="space-y-3.5">
                <div className="border-l-2 border-purple-500 pl-3 space-y-1">
                  <span className="block text-xs font-bold text-white leading-tight">Mise à jour d'EbikeMaroc 2.0 active</span>
                  <span className="block text-[10px] text-gray-500 font-mono">Il y a 2 heures</span>
                </div>
                <div className="border-l-2 border-cyan-500 pl-3 space-y-1">
                  <span className="block text-xs font-bold text-white leading-tight">Clé R&amp;D IMUIALAB active</span>
                  <span className="block text-[10px] text-gray-500 font-mono">Il y a 1 jour</span>
                </div>
                <div className="border-l-2 border-pink-500 pl-3 space-y-1">
                  <span className="block text-xs font-bold text-white leading-tight">Nouvelle opportunité Taghazout Prestige</span>
                  <span className="block text-[10px] text-gray-500 font-mono">Il y a 3 jours</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Contracts & E-Signatures */}
        {activeTab === 'contracts' && (
          <div className="glass-panel p-6 md:p-8 rounded-3xl border border-white/5 space-y-6 animate-fade-in">
            <div>
              <h3 className="font-orbitron font-bold text-base uppercase text-purple-400 flex items-center space-x-2">
                <FileSignature className="w-5 h-5" />
                <span>{t.clientSignedDocs}</span>
              </h3>
              <p className="text-xs text-gray-400 mt-1">
                Consultez et signez vos accords légaux en direct grâce au module e-Signature certifié.
              </p>
            </div>

            <div className="space-y-4">
              {contracts.map((con) => (
                <div key={con.id} className="p-4 rounded-2xl bg-black/40 border border-white/5 flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="space-y-1">
                    <span className="block text-sm text-white font-bold">{con.title}</span>
                    <span className="block text-xs text-gray-500 font-mono">Date d'émission : {con.date}</span>
                    {con.signed && con.signatureData && (
                      <div className="pt-2">
                        <span className="text-[10px] text-gray-400 font-mono block">Signature enregistrée :</span>
                        <img src={con.signatureData} alt="Signature" className="h-10 bg-black/60 rounded border border-white/10 mt-1" />
                      </div>
                    )}
                  </div>

                  {con.signed ? (
                    <span className="flex items-center space-x-1.5 text-xs text-green-400 bg-green-500/10 border border-green-500/20 px-3 py-1.5 rounded-xl font-mono">
                      <CheckCircle className="w-4 h-4" />
                      <span>{t.contractSigned}</span>
                    </span>
                  ) : (
                    <button
                      onClick={() => { setSigningContractId(con.id); playSound('space'); }}
                      className="px-4 py-2 text-xs font-orbitron font-bold uppercase tracking-wider bg-purple-600 hover:bg-purple-500 text-white rounded-xl transition-all cursor-none shadow-md shadow-purple-600/30"
                    >
                      {t.clientSignNow}
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 3: Documents Repository */}
        {activeTab === 'documents' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-fade-in">
            <div className="glass-panel p-6 rounded-3xl border border-white/5 space-y-4">
              <h3 className="font-orbitron font-bold text-sm uppercase text-gray-300 flex items-center space-x-2">
                <UploadCloud className="w-4.5 h-4.5 text-purple-400" />
                <span>{t.clientDocUpload}</span>
              </h3>

              <div className="border-2 border-dashed border-white/15 rounded-2xl p-8 text-center hover:border-purple-500/40 transition-colors">
                <input
                  type="file"
                  id="client-doc-portal"
                  onChange={handleFileLocalUpload}
                  className="hidden"
                />
                <label htmlFor="client-doc-portal" className="cursor-none flex flex-col items-center space-y-2">
                  <UploadCloud className="w-10 h-10 text-purple-400 animate-pulse" />
                  <span className="text-xs font-bold text-gray-200">Uploader KBIS, statuts ou accréditations</span>
                  <span className="text-[10px] text-gray-500">Formats acceptés : PDF, ZIP, PNG, JPG (Max 25 Mo)</span>
                </label>
              </div>
            </div>

            <div className="glass-panel p-6 rounded-3xl border border-white/5 space-y-4">
              <h3 className="font-orbitron font-bold text-sm uppercase text-white">
                Fichiers Déposés &amp; Traités
              </h3>

              <div className="space-y-2.5">
                {uploadedFiles.map((f, i) => (
                  <div key={i} className="flex items-center justify-between p-3 rounded-xl bg-black/40 text-xs border border-white/5">
                    <div className="flex items-center space-x-2.5">
                      <FileText className="w-4 h-4 text-cyan-400" />
                      <div>
                        <span className="text-gray-200 font-bold block">{f.name}</span>
                        <span className="text-[10px] text-gray-500 font-mono">Déposé le {f.date}</span>
                      </div>
                    </div>
                    <span className="text-purple-400 font-mono font-bold">{f.size}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Tab 4: Invoices & Factures */}
        {activeTab === 'invoices' && (
          <div className="glass-panel p-6 md:p-8 rounded-3xl border border-white/5 space-y-6 animate-fade-in">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-orbitron font-bold text-base uppercase text-emerald-400 flex items-center space-x-2">
                  <FileText className="w-5 h-5" />
                  <span>{t.tabInvoices}</span>
                </h3>
                <p className="text-xs text-gray-400 mt-1">
                  Accédez à l'historique comptable et téléchargez vos justificatifs de versement.
                </p>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs font-mono">
                <thead>
                  <tr className="border-b border-white/10 text-gray-400 text-[10px] uppercase">
                    <th className="py-3 px-4">{t.invoiceRef}</th>
                    <th className="py-3 px-4">{t.invoicePlatform}</th>
                    <th className="py-3 px-4">{t.invoiceAmount}</th>
                    <th className="py-3 px-4">{t.invoiceDate}</th>
                    <th className="py-3 px-4">{t.invoiceStatus}</th>
                    <th className="py-3 px-4 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {invoices.map((inv) => (
                    <tr key={inv.id} className="hover:bg-white/5 transition-colors">
                      <td className="py-3 px-4 font-bold text-white">{inv.reference}</td>
                      <td className="py-3 px-4 text-gray-300">{inv.platform}</td>
                      <td className="py-3 px-4 font-bold text-purple-300">{inv.amount}</td>
                      <td className="py-3 px-4 text-gray-400">{inv.date}</td>
                      <td className="py-3 px-4">
                        <span className={`px-2 py-0.5 rounded text-[10px] ${
                          inv.status === 'Paid'
                            ? 'bg-green-500/10 text-green-400 border border-green-500/20'
                            : 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                        }`}>
                          {inv.status === 'Paid' ? t.invoicePaid : t.invoicePending}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-right">
                        <button
                          onClick={() => handleDownloadInvoice(inv.reference)}
                          className="inline-flex items-center space-x-1 px-3 py-1 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-gray-300 hover:text-white transition-all cursor-none"
                        >
                          <Download className="w-3.5 h-3.5" />
                          <span>PDF</span>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Tab 5: Direct Crew Messaging */}
        {activeTab === 'messages' && (
          <div className="glass-panel p-6 md:p-8 rounded-3xl border border-white/5 space-y-6 animate-fade-in max-w-4xl mx-auto">
            <div>
              <h3 className="font-orbitron font-bold text-base uppercase text-cyan-400 flex items-center space-x-2">
                <MessageSquare className="w-5 h-5" />
                <span>{t.tabMessages}</span>
              </h3>
              <p className="text-xs text-gray-400 mt-1">
                Liaison cryptée de bout en bout avec le commandement IMUIA.
              </p>
            </div>

            {/* Messages Stream */}
            <div className="space-y-3 max-h-80 overflow-y-auto p-4 bg-black/40 rounded-2xl border border-white/5">
              {clientMessages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
                >
                  <div className={`max-w-md p-3.5 rounded-2xl text-xs leading-relaxed ${
                    msg.sender === 'user'
                      ? 'bg-purple-600 text-white rounded-br-none'
                      : 'bg-white/10 text-gray-200 border border-white/10 rounded-bl-none'
                  }`}>
                    {msg.text}
                  </div>
                  <span className="text-[9px] font-mono text-gray-500 mt-1 px-1">
                    {msg.sender === 'user' ? 'Vous' : 'Équipage IMUIA'} • {msg.time}
                  </span>
                </div>
              ))}
            </div>

            {/* Send input */}
            <form onSubmit={handleSendMessage} className="flex gap-2">
              <input
                type="text"
                value={msgInput}
                onChange={(e) => setMsgInput(e.target.value)}
                placeholder={t.messagePlaceholder}
                className="flex-1 bg-black border border-white/10 focus:border-cyan-500 rounded-xl px-4 py-3 text-xs text-white focus:outline-none"
              />
              <button
                type="submit"
                className="px-5 py-3 bg-cyan-600 hover:bg-cyan-500 text-white font-orbitron font-bold text-xs uppercase tracking-wider rounded-xl transition-all flex items-center space-x-1.5 cursor-none"
              >
                <Send className="w-4 h-4" />
                <span>Envoyer</span>
              </button>
            </form>
          </div>
        )}

      </div>

      {/* Signature Pad Modal Drawer */}
      {signingContractId && (
        <div className="fixed inset-0 bg-black/85 backdrop-blur-md z-50 flex items-center justify-center p-4 overflow-y-auto animate-fade-in">
          <div className="glass-panel max-w-md w-full rounded-3xl border border-purple-500/40 p-6 space-y-6 relative text-left my-8">
            <button
              onClick={() => { setSigningContractId(null); playSound('click'); }}
              className="absolute top-6 right-6 p-1.5 rounded-lg text-gray-400 hover:text-white cursor-none"
            >
              [X]
            </button>

            <div className="space-y-2 text-center">
              <h3 className="font-orbitron font-bold text-lg text-white uppercase flex items-center justify-center space-x-2">
                <FileSignature className="w-5 h-5 text-purple-400" />
                <span>{t.signTitle}</span>
              </h3>
              <p className="text-xs text-gray-400 max-w-xs mx-auto">
                {t.signDesc}
              </p>
            </div>

            {/* Signature Draw Pad Canvas */}
            <div className="bg-black border border-white/10 rounded-xl overflow-hidden shadow-inner relative">
              <canvas
                ref={canvasRef}
                width={380}
                height={150}
                onMouseDown={startDrawing}
                onMouseMove={draw}
                onMouseUp={stopDrawing}
                onMouseLeave={stopDrawing}
                className="w-full h-[150px] bg-black block cursor-none"
              />
              {/* Overlay guides */}
              <div className="absolute bottom-2 left-1/2 -translate-x-1/2 text-[9px] font-mono text-gray-600 pointer-events-none select-none uppercase tracking-wider">
                Dessinez votre signature ici
              </div>
            </div>

            <div className="flex items-center justify-between gap-4">
              <button
                onClick={clearCanvas}
                className="px-4 py-2 text-xs font-mono border border-white/10 hover:border-red-500 text-gray-400 hover:text-red-400 rounded-xl transition-all cursor-none"
              >
                {t.clear}
              </button>

              <button
                onClick={saveSignature}
                className="flex-1 py-2 bg-purple-600 hover:bg-purple-500 text-white font-bold font-orbitron text-xs tracking-widest uppercase rounded-xl transition-all cursor-none"
              >
                {t.signButton}
              </button>
            </div>

            <div className="p-3 rounded-lg bg-purple-500/5 border border-purple-500/10 text-[10px] text-purple-300 leading-normal flex items-start space-x-2">
              <ShieldCheck className="w-3.5 h-3.5 text-purple-400 mt-0.5 flex-shrink-0" />
              <span>Certifié conforme aux règlements européens d'identités électroniques eIDAS.</span>
            </div>

          </div>
        </div>
      )}
    </div>
  );
};
