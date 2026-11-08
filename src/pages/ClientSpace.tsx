import React, { useState, useRef } from 'react';
import { useAppState } from '../data/useAppState';
import { translations } from '../data/translations';
import {
  CheckCircle,
  Bell,
  BarChart2,
  UploadCloud,
  FileSignature,
  ShieldCheck,
  Download,
  Send,
  MessageSquare,
  FileText
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
    playSound
  } = useAppState();

  const t = translations[language];

  // Auth local state
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [isRegistering, setIsRegistering] = useState(false);
  const [authError, setAuthError] = useState(false);

  // File Upload local list simulator
  const [uploadedFiles, setUploadedFiles] = useState<{ name: string; size: string; date: string }[]>([
    { name: 'KBIS-Stella-Venture.pdf', size: '340 Ko', date: '2026-03-01' },
    { name: 'Plan-Financement-Expansion-2026.pdf', size: '1.2 Mo', date: '2026-03-04' }
  ]);

  // Message chat simulation with IMUIA crew
  const [messages, setMessages] = useState<{ sender: 'crew' | 'user'; text: string; time: string }[]>([
    { sender: 'crew', text: 'Bienvenue sur la passerelle privée IMUIA. Votre dossier de partenariat est en cours d\'examen prioritaire.', time: '10:30' },
    { sender: 'user', text: 'Merci commandant ! J\'ai téléversé les pièces complémentaires.', time: '10:32' },
    { sender: 'crew', text: 'Documents bien reçus et validés par notre équipe juridique.', time: '10:35' }
  ]);
  const [chatInput, setChatInput] = useState('');

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

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim()) return;
    const now = new Date();
    const timeStr = `${now.getHours()}:${now.getMinutes() < 10 ? '0' : ''}${now.getMinutes()}`;
    const newMsg = { sender: 'user' as const, text: chatInput, time: timeStr };
    setMessages(prev => [...prev, newMsg]);
    setChatInput('');
    playSound('space');

    setTimeout(() => {
      setMessages(prev => [
        ...prev,
        {
          sender: 'crew' as const,
          text: 'Message reçu par l\'officier de garde IMUIA. Nous revenons vers vous dans les plus brefs délais.',
          time: timeStr
        }
      ]);
      playSound('success');
    }, 1000);
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
    ctx.strokeStyle = '#a855f7';
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

    const dataUrl = canvas.toDataURL();
    signContractInState(signingContractId, dataUrl);
    setSigningContractId(null);
    playSound('success');
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
            Pour tester immédiatement l'espace, cliquez sur "S'amarrer à la station" avec les identifiants pré-remplis.
          </div>
        </div>
      </div>
    );
  }

  // Logged-in complete partner interface
  return (
    <div className="relative min-h-[calc(100vh-80px)] py-12 px-4 space-y-12">
      <div className="absolute inset-0 stars-bg opacity-35 pointer-events-none"></div>

      {/* Greeting and user session telemetry */}
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4 glass-panel p-6 rounded-3xl border border-purple-500/30 relative z-10 text-left">
        <div className="space-y-1.5">
          <div className="flex items-center space-x-2">
            <span className="w-2.5 h-2.5 rounded-full bg-green-400 animate-pulse"></span>
            <span className="text-[10px] text-green-400 font-mono tracking-widest uppercase">// LIAISON SÉCURISÉE ÉTABLIE</span>
          </div>
          <h1 className="text-xl md:text-2xl font-black font-orbitron text-white">
            {t.clientWelcome} <span className="text-purple-400">{userSession.name}</span>
          </h1>
          <p className="text-xs text-gray-400 leading-relaxed font-light">
            {t.clientPartnerType} : <span className="text-cyan-400 font-bold">{userSession.role}</span> | Accréditation : <span className="text-green-400 font-bold">Niveau 4 Confidentiel</span>
          </p>
        </div>

        <button
          onClick={logout}
          className="px-4 py-2.5 text-xs font-mono bg-white/5 hover:bg-red-500/10 text-red-400 hover:text-white rounded-xl border border-red-500/20 transition-all cursor-none uppercase"
        >
          {t.clientLogout}
        </button>
      </div>

      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8 relative z-10 text-left">

        {/* Contracts & Exchange Messenger (Col 1 & 2) */}
        <div className="lg:col-span-2 space-y-8">

          {/* Contracts signing queue */}
          <div className="glass-panel p-6 rounded-3xl border border-white/5 space-y-4">
            <div className="flex items-center justify-between border-b border-white/5 pb-3">
              <h3 className="font-orbitron font-bold text-sm uppercase text-purple-400 flex items-center space-x-2">
                <FileSignature className="w-4.5 h-4.5" />
                <span>{t.clientSignedDocs}</span>
              </h3>
              <span className="text-[10px] font-mono text-gray-400">Signature eIDAS</span>
            </div>

            <div className="space-y-3">
              {contracts.map((con) => (
                <div key={con.id} className="p-4 rounded-xl bg-black/40 border border-white/5 flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="space-y-1">
                    <span className="block text-sm text-white font-bold leading-tight">{con.title}</span>
                    <span className="block text-[10px] text-gray-500 font-mono">Date d'édition : {con.date}</span>
                  </div>

                  {con.signed ? (
                    <div className="flex items-center space-x-2">
                      <span className="flex items-center space-x-1 text-xs text-green-400 bg-green-500/5 border border-green-500/20 px-2.5 py-1 rounded-lg">
                        <CheckCircle className="w-3.5 h-3.5" />
                        <span>{t.contractSigned}</span>
                      </span>
                      <button
                        onClick={() => playSound('click')}
                        className="p-1.5 rounded bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white cursor-none"
                        title="Télécharger l'accord signé"
                      >
                        <Download className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => { setSigningContractId(con.id); playSound('space'); }}
                      className="px-3.5 py-1.5 text-xs font-orbitron font-bold uppercase tracking-wider bg-purple-600 hover:bg-purple-500 text-white rounded-lg transition-colors cursor-none"
                    >
                      {t.clientSignNow}
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Direct messenger with IMUIA team */}
          <div className="glass-panel p-6 rounded-3xl border border-white/5 space-y-4">
            <div className="flex items-center justify-between border-b border-white/5 pb-3">
              <h3 className="font-orbitron font-bold text-sm uppercase text-cyan-400 flex items-center space-x-2">
                <MessageSquare className="w-4.5 h-4.5" />
                <span>Canal d'échange sécurisé avec l'équipage</span>
              </h3>
              <span className="text-[10px] font-mono text-green-400 flex items-center space-x-1">
                <span className="w-2 h-2 rounded-full bg-green-400"></span>
                <span>En direct</span>
              </span>
            </div>

            {/* Chat message history */}
            <div className="space-y-3 max-h-56 overflow-y-auto pr-1">
              {messages.map((m, idx) => (
                <div
                  key={idx}
                  className={`p-3 rounded-2xl max-w-md text-xs leading-relaxed ${
                    m.sender === 'user'
                      ? 'ml-auto bg-purple-600/30 border border-purple-500/40 text-purple-100 rounded-br-none'
                      : 'mr-auto bg-black/60 border border-white/10 text-gray-300 rounded-bl-none'
                  }`}
                >
                  <p>{m.text}</p>
                  <span className="block text-[9px] font-mono text-gray-500 mt-1 text-right">
                    {m.time}
                  </span>
                </div>
              ))}
            </div>

            {/* Message input */}
            <form onSubmit={handleSendMessage} className="flex gap-2 pt-2">
              <input
                type="text"
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                placeholder="Transmettre un message à l'équipage IMUIA..."
                className="flex-1 bg-black/60 border border-white/10 focus:border-cyan-500 rounded-xl px-4 py-2 text-xs text-white focus:outline-none"
              />
              <button
                type="submit"
                className="px-4 py-2 bg-cyan-600 hover:bg-cyan-500 text-white rounded-xl text-xs font-bold font-orbitron uppercase cursor-none flex items-center space-x-1"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Envoyer</span>
              </button>
            </form>
          </div>

          {/* Partner Analytics report simulation */}
          <div className="glass-panel p-6 rounded-3xl border border-white/5 space-y-4">
            <h3 className="font-orbitron font-bold text-sm uppercase text-gray-300 flex items-center space-x-2">
              <BarChart2 className="w-4.5 h-4.5 text-cyan-400" />
              <span>{t.clientStatsTitle}</span>
            </h3>

            <div className="grid grid-cols-3 gap-4 text-center">
              <div className="bg-black/40 p-3 rounded-xl border border-white/5">
                <div className="text-xl font-bold font-orbitron text-purple-400">1,240</div>
                <div className="text-[9px] text-gray-500 font-mono uppercase">CLICKS</div>
              </div>
              <div className="bg-black/40 p-3 rounded-xl border border-white/5">
                <div className="text-xl font-bold font-orbitron text-cyan-400">42</div>
                <div className="text-[9px] text-gray-500 font-mono uppercase">LEADS MATCHED</div>
              </div>
              <div className="bg-black/40 p-3 rounded-xl border border-white/5">
                <div className="text-xl font-bold font-orbitron text-green-400">99.8%</div>
                <div className="text-[9px] text-gray-500 font-mono uppercase">NODE UPTIME</div>
              </div>
            </div>
          </div>

        </div>

        {/* Upload documents and crew alert notifications (Col 3) */}
        <div className="space-y-8">

          {/* Notifications / bulletins */}
          <div className="glass-panel p-6 rounded-3xl border border-white/5 space-y-4">
            <h3 className="font-orbitron font-bold text-sm uppercase text-pink-400 flex items-center space-x-2">
              <Bell className="w-4.5 h-4.5" />
              <span>{t.clientNotification}</span>
            </h3>

            <div className="space-y-3.5 max-h-52 overflow-y-auto">
              <div className="border-l-2 border-purple-500 pl-3 space-y-1">
                <span className="block text-xs font-bold text-white leading-tight">Mise à jour d'EbikeMaroc 2.0 active</span>
                <span className="block text-[10px] text-gray-500 font-mono">Il y a 2 heures</span>
              </div>

              <div className="border-l-2 border-cyan-500 pl-3 space-y-1">
                <span className="block text-xs font-bold text-white leading-tight">Clé R&amp;D IMUIALAB active</span>
                <span className="block text-[10px] text-gray-500 font-mono">Il y a 1 jour</span>
              </div>

              <div className="border-l-2 border-green-500 pl-3 space-y-1">
                <span className="block text-xs font-bold text-white leading-tight">Facture d'apport d'affaires n°2026-03 disponible</span>
                <span className="block text-[10px] text-gray-500 font-mono">Il y a 3 jours</span>
              </div>
            </div>
          </div>

          {/* Secure File Upload dropzone */}
          <div className="glass-panel p-6 rounded-3xl border border-white/5 space-y-4">
            <h3 className="font-orbitron font-bold text-sm uppercase text-gray-300 flex items-center space-x-2">
              <UploadCloud className="w-4.5 h-4.5" />
              <span>{t.clientDocUpload}</span>
            </h3>

            <div className="space-y-4">
              <div className="border-2 border-dashed border-white/10 rounded-xl p-4 text-center hover:border-purple-500/40 transition-colors">
                <input
                  type="file"
                  id="client-doc"
                  onChange={handleFileLocalUpload}
                  className="hidden"
                />
                <label htmlFor="client-doc" className="cursor-none flex flex-col items-center space-y-1">
                  <UploadCloud className="w-6 h-6 text-purple-400" />
                  <span className="text-[10px] font-bold text-gray-300">Uploader KBIS / Facture / Contrat</span>
                </label>
              </div>

              {/* Uploaded local files queue */}
              <div className="space-y-2">
                {uploadedFiles.map((f, i) => (
                  <div key={i} className="flex items-center justify-between p-2 rounded-lg bg-black/40 text-[10px] border border-white/5">
                    <div className="flex items-center space-x-1.5 truncate max-w-[140px]">
                      <FileText className="w-3 h-3 text-cyan-400 shrink-0" />
                      <span className="text-gray-300 truncate">{f.name}</span>
                    </div>
                    <span className="text-gray-500 font-mono">{f.size}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Reserved Resources */}
          <div className="glass-panel p-6 rounded-3xl border border-white/5 space-y-3">
            <h3 className="font-orbitron font-bold text-xs uppercase text-white tracking-wider">
              {t.clientProp}
            </h3>
            <ul className="space-y-2 text-xs text-gray-400 font-light">
              <li className="flex items-center justify-between p-2 rounded bg-black/40 border border-white/5">
                <span>Kit Média &amp; Chartes Graphiques</span>
                <button onClick={() => playSound('click')} className="text-cyan-400 hover:underline cursor-none">
                  Télécharger
                </button>
              </li>
              <li className="flex items-center justify-between p-2 rounded bg-black/40 border border-white/5">
                <span>Spécifications API &amp; Webhooks</span>
                <button onClick={() => playSound('click')} className="text-cyan-400 hover:underline cursor-none">
                  Consulter
                </button>
              </li>
            </ul>
          </div>

        </div>

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
              <div className="absolute bottom-2 left-1/2 -translate-x-1/2 text-[9px] font-mono text-gray-600 pointer-events-none select-none uppercase tracking-wider">
                Dessinez votre signature manuscrite ici
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
