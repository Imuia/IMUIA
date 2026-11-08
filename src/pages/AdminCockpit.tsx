import React, { useState } from 'react';
import { useAppState } from '../data/useAppState';
import type { Contact, Platform } from '../data/AppState';
import { translations } from '../data/translations';
import {
  LayoutDashboard, Plus, Mail, CheckSquare, Trash2, Users, Send, Radio,
  Eye, EyeOff, ArrowUp, ArrowDown, Globe, PieChart, ShieldAlert, Edit3, X
} from 'lucide-react';

export const AdminCockpit: React.FC = () => {
  const {
    language,
    platforms,
    addPlatform,
    updatePlatform,
    deletePlatform,
    togglePlatformVisibility,
    movePlatformOrder,
    contacts,
    updateContactStatus,
    emailCampaigns,
    sendEmailCampaign,
    tasks,
    addTask,
    toggleTask,
    deleteTask,
    playSound
  } = useAppState();

  const t = translations[language];

  // Forms states
  const [newPlatName, setNewPlatName] = useState('');
  const [newPlatLogo, setNewPlatLogo] = useState('✨');
  const [newPlatSector, setNewPlatSector] = useState<'immo' | 'tourism' | 'events' | 'economy' | 'services' | 'tech'>('tech');
  const [newPlatZone, setNewPlatZone] = useState('');
  const [newPlatUrl, setNewPlatUrl] = useState('');
  const [newPlatStatus, setNewPlatStatus] = useState<'active' | 'development' | 'soon'>('active');

  const [mailSubject, setMailSubject] = useState('');
  const [mailBody, setMailBody] = useState('');
  const [mailSuccess, setMailSuccess] = useState(false);

  const [taskText, setTaskText] = useState('');

  const [isAddingPlat, setIsAddingPlat] = useState(false);
  const [editingPlat, setEditingPlat] = useState<Platform | null>(null);

  const handleAddPlatform = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPlatName || !newPlatZone) return;
    addPlatform({
      name: newPlatName,
      logo: newPlatLogo,
      sector: newPlatSector,
      zone: newPlatZone,
      status: newPlatStatus,
      url: newPlatUrl || 'https://imuia.com',
      shortDescKey: 'platRSSDesc', // references fallback
      fullDescKey: 'platRSSFull',
      hidden: false,
      order: platforms.length + 1
    });
    setNewPlatName('');
    setNewPlatZone('');
    setNewPlatUrl('');
    setIsAddingPlat(false);
    playSound('success');
  };

  const handleSaveEditPlatform = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingPlat) return;
    updatePlatform(editingPlat.id, {
      name: editingPlat.name,
      logo: editingPlat.logo,
      zone: editingPlat.zone,
      url: editingPlat.url,
      sector: editingPlat.sector,
      status: editingPlat.status
    });
    setEditingPlat(null);
    playSound('success');
  };

  const handleSendCampaign = (e: React.FormEvent) => {
    e.preventDefault();
    if (!mailSubject || !mailBody) return;
    sendEmailCampaign(mailSubject, mailBody);
    setMailSubject('');
    setMailBody('');
    setMailSuccess(true);
    playSound('space');
    setTimeout(() => setMailSuccess(false), 3000);
  };

  const handleAddTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!taskText.trim()) return;
    addTask(taskText);
    setTaskText('');
    playSound('success');
  };

  return (
    <div className="relative min-h-[calc(100vh-80px)] py-12 px-4 space-y-12">
      <div className="absolute inset-0 stars-bg opacity-25 pointer-events-none"></div>

      {/* Main command layout header */}
      <div className="text-center max-w-3xl mx-auto space-y-4 relative z-10">
        <h2 className="text-xs font-orbitron font-bold text-red-400 tracking-widest uppercase flex items-center justify-center space-x-2">
          <Radio className="w-4 h-4 animate-pulse" />
          <span>Accréditation Niveau 5 : Commandement de Bord</span>
        </h2>
        <h1 className="text-3xl md:text-5xl font-black font-orbitron uppercase text-white leading-tight">
          IMUIA Administration Cockpit
        </h1>
        <p className="text-sm text-gray-400 font-mono leading-relaxed">
          Centralisez la visibilité de l'univers, examinez les candidatures d'investissement et pilotez le dispatching e-mail des lancements.
        </p>
      </div>

      {/* Key Stats metrics display (Revenues, Platforms, Leads, Invoices) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto relative z-10 text-left">
        <div className="glass-panel p-5 rounded-2xl border border-white/5 space-y-2">
          <div className="text-xs font-mono text-gray-500 uppercase">{t.statActivePlats}</div>
          <div className="text-3xl font-black font-orbitron text-white">
            {platforms.filter(p => p.status === 'active' && !p.hidden).length}
          </div>
          <span className="text-[10px] text-green-400 font-mono">100% opérationnels en orbite</span>
        </div>

        <div className="glass-panel p-5 rounded-2xl border border-white/5 space-y-2">
          <div className="text-xs font-mono text-gray-500 uppercase">{t.statDevPlats}</div>
          <div className="text-3xl font-black font-orbitron text-cyan-400">
            {platforms.filter(p => p.status === 'development' || p.status === 'soon').length}
          </div>
          <span className="text-[10px] text-gray-400 font-mono">En R&amp;D et incubation</span>
        </div>

        <div className="glass-panel p-5 rounded-2xl border border-white/5 space-y-2">
          <div className="text-xs font-mono text-gray-500 uppercase">{t.statNewLeads}</div>
          <div className="text-3xl font-black font-orbitron text-pink-400">
            {contacts.length}
          </div>
          <span className="text-[10px] text-pink-300 font-mono">{contacts.filter(c => c.status === 'New').length} dossiers non traités</span>
        </div>

        <div className="glass-panel p-5 rounded-2xl border border-purple-500/20 bg-purple-950/5 space-y-2">
          <div className="text-xs font-mono text-gray-500 uppercase">{t.statRevenue}</div>
          <div className="text-3xl font-black font-orbitron text-purple-400">
            1 420 000 €
          </div>
          <span className="text-[10px] text-purple-300 font-mono">+12.4% ce trimestre</span>
        </div>
      </div>

      {/* Visual Analytics: Geographic & Sector Revenues */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-6xl mx-auto relative z-10 text-left">
        {/* Sector Revenues Breakdown */}
        <div className="glass-panel p-6 rounded-3xl border border-white/5 space-y-4">
          <h3 className="font-orbitron font-bold text-sm text-cyan-400 uppercase flex items-center space-x-2">
            <PieChart className="w-4.5 h-4.5" />
            <span>{t.crmAnalyticsSector}</span>
          </h3>

          <div className="space-y-3 font-mono text-xs">
            <div>
              <div className="flex justify-between text-gray-300 mb-1">
                <span>Immobilier (Corse &amp; Madagascar)</span>
                <span className="text-purple-400 font-bold">42% (596k€)</span>
              </div>
              <div className="w-full h-2 bg-black/60 rounded-full overflow-hidden">
                <div className="h-full bg-purple-500 rounded-full" style={{ width: '42%' }}></div>
              </div>
            </div>

            <div>
              <div className="flex justify-between text-gray-300 mb-1">
                <span>Tourisme &amp; Conciergerie (Maroc &amp; Nosy Be)</span>
                <span className="text-pink-400 font-bold">28% (398k€)</span>
              </div>
              <div className="w-full h-2 bg-black/60 rounded-full overflow-hidden">
                <div className="h-full bg-pink-500 rounded-full" style={{ width: '28%' }}></div>
              </div>
            </div>

            <div>
              <div className="flex justify-between text-gray-300 mb-1">
                <span>Événementiel &amp; Sonorisation (Europe)</span>
                <span className="text-blue-400 font-bold">16% (227k€)</span>
              </div>
              <div className="w-full h-2 bg-black/60 rounded-full overflow-hidden">
                <div className="h-full bg-blue-500 rounded-full" style={{ width: '16%' }}></div>
              </div>
            </div>

            <div>
              <div className="flex justify-between text-gray-300 mb-1">
                <span>Collaboratif &amp; Mobilité Verte</span>
                <span className="text-cyan-400 font-bold">14% (199k€)</span>
              </div>
              <div className="w-full h-2 bg-black/60 rounded-full overflow-hidden">
                <div className="h-full bg-cyan-400 rounded-full" style={{ width: '14%' }}></div>
              </div>
            </div>
          </div>
        </div>

        {/* Geographic Distribution & Alerts */}
        <div className="glass-panel p-6 rounded-3xl border border-white/5 space-y-4">
          <h3 className="font-orbitron font-bold text-sm text-purple-400 uppercase flex items-center space-x-2">
            <Globe className="w-4.5 h-4.5" />
            <span>Répartition Géographique &amp; Alertes de Vol</span>
          </h3>

          <div className="grid grid-cols-2 gap-3 text-xs font-mono mb-4">
            <div className="p-3 bg-black/40 rounded-xl border border-white/5">
              <span className="text-gray-500 block text-[10px]">FRANCE &amp; CORSE</span>
              <span className="text-white font-bold text-sm">6 Plateformes</span>
              <span className="text-green-400 text-[10px] block">Opérationnel</span>
            </div>
            <div className="p-3 bg-black/40 rounded-xl border border-white/5">
              <span className="text-gray-500 block text-[10px]">MAROC</span>
              <span className="text-white font-bold text-sm">2 Plateformes</span>
              <span className="text-green-400 text-[10px] block">Forte croissance</span>
            </div>
            <div className="p-3 bg-black/40 rounded-xl border border-white/5">
              <span className="text-gray-500 block text-[10px]">MADAGASCAR</span>
              <span className="text-white font-bold text-sm">2 Plateformes</span>
              <span className="text-cyan-400 text-[10px] block">Expansion</span>
            </div>
            <div className="p-3 bg-black/40 rounded-xl border border-white/5">
              <span className="text-gray-500 block text-[10px]">EUROPE / GLOBAL</span>
              <span className="text-white font-bold text-sm">2 Plateformes</span>
              <span className="text-amber-400 text-[10px] block">Tests bêta</span>
            </div>
          </div>

          <div className="p-3 bg-amber-500/10 border border-amber-500/20 rounded-xl flex items-start space-x-2.5 text-xs text-amber-300">
            <ShieldAlert className="w-4 h-4 flex-shrink-0 mt-0.5 text-amber-400" />
            <span>Alerte Système : Clôture fiscale du 1er trimestre et renouvellement des certificats SSL d'amarrage MonPonton.</span>
          </div>
        </div>
      </div>

      {/* Grid containing contacts lists and Platform registry */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl mx-auto relative z-10 text-left items-start">

        {/* Contacts database section (Col 1 & 2) */}
        <div className="lg:col-span-2 space-y-8">

          {/* Incoming Partner Proposals leads table */}
          <div className="glass-panel p-6 rounded-3xl border border-white/5 space-y-4">
            <div className="flex items-center justify-between border-b border-white/5 pb-3">
              <h3 className="font-orbitron font-bold text-sm text-pink-400 uppercase flex items-center space-x-2">
                <Users className="w-4.5 h-4.5" />
                <span>{t.crmContactsList}</span>
              </h3>
              <span className="text-[10px] font-mono text-gray-500">{contacts.length} Leads</span>
            </div>

            <div className="space-y-4 max-h-[450px] overflow-y-auto pr-1">
              {contacts.map((c) => (
                <div key={c.id} className="p-4 rounded-xl bg-black/40 border border-white/5 space-y-3">
                  <div className="flex flex-wrap items-start justify-between gap-2">
                    <div>
                      <span className="block text-sm font-bold text-white">
                        {c.firstName} {c.lastName}
                      </span>
                      <span className="text-[10px] text-cyan-400 font-mono block">
                        {c.company} ({c.function})
                      </span>
                    </div>

                    {/* Status badge toggler */}
                    <div className="flex items-center space-x-1">
                      <select
                        value={c.status}
                        onChange={(e) => {
                          updateContactStatus(c.id, e.target.value as Contact['status']);
                          playSound('click');
                        }}
                        className="bg-black text-[10px] font-mono border border-white/10 text-gray-300 rounded px-2 py-1 focus:outline-none focus:border-purple-500"
                      >
                        <option value="New">NEW</option>
                        <option value="In Discussion">IN DISCUSSION</option>
                        <option value="Partnered">PARTNERED</option>
                        <option value="Closed">CLOSED</option>
                      </select>
                    </div>
                  </div>

                  <p className="text-xs text-gray-400 italic bg-black/50 p-3 rounded-lg border border-white/5 leading-relaxed">
                    "{c.proposal}"
                  </p>

                  <div className="flex flex-wrap gap-x-4 gap-y-1 text-[9px] font-mono text-gray-500">
                    <span>E-mail: <strong className="text-gray-300">{c.email}</strong></span>
                    {c.phone && <span>Tel: <strong className="text-gray-300">{c.phone}</strong></span>}
                    <span>Pays: <strong className="text-gray-300">{c.country || 'Global'}</strong></span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Platforms lists & Hide/Show controls */}
          <div className="glass-panel p-6 rounded-3xl border border-white/5 space-y-4">
            <div className="flex items-center justify-between border-b border-white/5 pb-3">
              <h3 className="font-orbitron font-bold text-sm text-cyan-400 uppercase flex items-center space-x-2">
                <LayoutDashboard className="w-4.5 h-4.5" />
                <span>{t.crmPlatManager}</span>
              </h3>

              <button
                onClick={() => { setIsAddingPlat(!isAddingPlat); playSound('click'); }}
                className="flex items-center space-x-1 px-3 py-1.5 bg-cyan-600 hover:bg-cyan-500 text-white rounded-lg text-xs font-bold font-orbitron uppercase cursor-none"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>{t.addPlatform}</span>
              </button>
            </div>

            {/* Platform Incubator Form Panel */}
            {isAddingPlat && (
              <form onSubmit={handleAddPlatform} className="p-4 rounded-xl bg-black/60 border border-cyan-500/30 space-y-4">
                <h4 className="text-xs font-mono text-cyan-400 uppercase">Configuration du nouveau monde</h4>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="block text-[10px] font-mono uppercase text-gray-500">Nom de la marque</label>
                    <input
                      type="text"
                      required
                      value={newPlatName}
                      onChange={(e) => setNewPlatName(e.target.value)}
                      placeholder="Ex: MonPonton.com"
                      className="w-full bg-black border border-white/10 rounded-lg px-3 py-1.5 text-xs text-white"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="block text-[10px] font-mono uppercase text-gray-500">Logo Emoji / Icone</label>
                    <input
                      type="text"
                      required
                      value={newPlatLogo}
                      onChange={(e) => setNewPlatLogo(e.target.value)}
                      placeholder="Ex: ⚓"
                      className="w-full bg-black border border-white/10 rounded-lg px-3 py-1.5 text-xs text-white"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-1">
                    <label className="block text-[10px] font-mono uppercase text-gray-500">Secteur</label>
                    <select
                      value={newPlatSector}
                      onChange={(e) => setNewPlatSector(e.target.value as any)}
                      className="w-full bg-black border border-white/10 rounded-lg px-3 py-1.5 text-xs text-white"
                    >
                      <option value="immo">IMMOBILIER</option>
                      <option value="tourism">TOURISME</option>
                      <option value="events">ÉVÉNEMENTIEL</option>
                      <option value="economy">COLLABORATIF</option>
                      <option value="services">SERVICES PRO</option>
                      <option value="tech">TECH / INNOVATION</option>
                    </select>
                  </div>

                  <div className="space-y-1">
                    <label className="block text-[10px] font-mono uppercase text-gray-500">Zone d'activité</label>
                    <input
                      type="text"
                      required
                      value={newPlatZone}
                      onChange={(e) => setNewPlatZone(e.target.value)}
                      placeholder="Ex: Corse, France, Maroc"
                      className="w-full bg-black border border-white/10 rounded-lg px-3 py-1.5 text-xs text-white"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="block text-[10px] font-mono uppercase text-gray-500">Statut de vol</label>
                    <select
                      value={newPlatStatus}
                      onChange={(e) => setNewPlatStatus(e.target.value as any)}
                      className="w-full bg-black border border-white/10 rounded-lg px-3 py-1.5 text-xs text-white"
                    >
                      <option value="active">ACTIF</option>
                      <option value="development">EN DEV</option>
                      <option value="soon">SOON</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="block text-[10px] font-mono uppercase text-gray-500">URL</label>
                  <input
                    type="url"
                    value={newPlatUrl}
                    onChange={(e) => setNewPlatUrl(e.target.value)}
                    placeholder="https://monponton.com"
                    className="w-full bg-black border border-white/10 rounded-lg px-3 py-1.5 text-xs text-white"
                  />
                </div>

                <div className="flex justify-end space-x-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setIsAddingPlat(false)}
                    className="px-3 py-1.5 text-xs text-gray-400 bg-white/5 rounded-lg"
                  >
                    Annuler
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-1.5 text-xs bg-cyan-600 text-white font-bold rounded-lg"
                  >
                    Lancer l'incubation
                  </button>
                </div>
              </form>
            )}

            {/* List registry grid table with Reorder, Hide/Show and Edit */}
            <div className="space-y-2">
              {platforms.map((p, idx) => (
                <div key={p.id} className={`p-3 rounded-xl bg-black/40 border border-white/5 flex flex-wrap items-center justify-between text-xs gap-2 ${p.hidden ? 'opacity-40' : ''}`}>
                  <div className="flex items-center space-x-3">
                    {/* Order adjustment buttons */}
                    <div className="flex flex-col space-y-0.5">
                      <button
                        disabled={idx === 0}
                        onClick={() => movePlatformOrder(p.id, 'up')}
                        className="text-gray-500 hover:text-white disabled:opacity-20 cursor-none p-0.5"
                        title="Monter"
                      >
                        <ArrowUp className="w-3 h-3" />
                      </button>
                      <button
                        disabled={idx === platforms.length - 1}
                        onClick={() => movePlatformOrder(p.id, 'down')}
                        className="text-gray-500 hover:text-white disabled:opacity-20 cursor-none p-0.5"
                        title="Descendre"
                      >
                        <ArrowDown className="w-3 h-3" />
                      </button>
                    </div>

                    <span className="text-xl">{p.logo}</span>
                    <div>
                      <span className="block font-bold text-white flex items-center space-x-1.5">
                        <span>{p.name}</span>
                        {p.hidden && <span className="text-[9px] font-mono text-red-400">[MASQUÉE]</span>}
                      </span>
                      <span className="block text-[10px] text-gray-500 font-mono">{p.zone} • {p.sector.toUpperCase()}</span>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    <span className={`text-[10px] font-mono px-2 py-0.5 border rounded-full uppercase ${
                      p.status === 'active' ? 'text-green-400 border-green-500/20 bg-green-500/5' :
                      p.status === 'development' ? 'text-amber-400 border-amber-500/20 bg-amber-500/5' :
                      'text-blue-400 border-blue-500/20 bg-blue-500/5'
                    }`}>
                      {p.status}
                    </span>

                    {/* Hide / Show Toggle */}
                    <button
                      onClick={() => togglePlatformVisibility(p.id)}
                      className={`p-1.5 rounded text-xs cursor-none ${p.hidden ? 'bg-red-500/20 text-red-400 hover:bg-red-500/30' : 'bg-white/5 text-gray-400 hover:text-white hover:bg-white/10'}`}
                      title={p.hidden ? "Afficher sur le site" : "Masquer du site"}
                    >
                      {p.hidden ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                    </button>

                    {/* Edit Platform Modal Trigger */}
                    <button
                      onClick={() => { setEditingPlat(p); playSound('click'); }}
                      className="p-1.5 rounded bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white cursor-none"
                      title="Modifier les informations"
                    >
                      <Edit3 className="w-3.5 h-3.5" />
                    </button>

                    {/* Quick status switch */}
                    <button
                      onClick={() => {
                        const nextStatus = p.status === 'active' ? 'development' : p.status === 'development' ? 'soon' : 'active';
                        updatePlatform(p.id, { status: nextStatus });
                        playSound('click');
                      }}
                      className="p-1.5 rounded bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white cursor-none"
                      title="Basculer le statut"
                    >
                      <Radio className="w-3.5 h-3.5" />
                    </button>

                    {/* Delete Platform */}
                    <button
                      onClick={() => {
                        if (confirm(`Confirmer la destruction orbitale de ${p.name} ?`)) {
                          deletePlatform(p.id);
                        }
                      }}
                      className="p-1.5 rounded bg-red-950/20 hover:bg-red-600 text-red-400 hover:text-white transition-colors cursor-none"
                      title="Détruire la plateforme"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* E-mail broadcaster & crew log tasks (Col 3) */}
        <div className="space-y-8">

          {/* E-mail Campaign Sender */}
          <div className="glass-panel p-6 rounded-3xl border border-white/5 space-y-4">
            <h3 className="font-orbitron font-bold text-sm text-purple-400 uppercase flex items-center space-x-2">
              <Mail className="w-4.5 h-4.5" />
              <span>{t.crmCampaignTitle}</span>
            </h3>

            {mailSuccess && (
              <div className="p-3 bg-green-500/10 border border-green-500/30 text-green-400 rounded-xl text-xs flex items-center space-x-2">
                <CheckSquare className="w-4 h-4 text-green-400" />
                <span>E-mail propagé avec succès !</span>
              </div>
            )}

            <form onSubmit={handleSendCampaign} className="space-y-3">
              <div className="space-y-1">
                <label className="block text-[10px] font-mono uppercase text-gray-400">{t.crmSubject}</label>
                <input
                  type="text"
                  required
                  value={mailSubject}
                  onChange={(e) => setMailSubject(e.target.value)}
                  placeholder="Ex: Grand ralliement des investisseurs IMUIA"
                  className="w-full bg-black border border-white/10 focus:border-purple-500 rounded-lg px-3 py-2 text-xs text-white"
                />
              </div>

              <div className="space-y-1">
                <label className="block text-[10px] font-mono uppercase text-gray-400">{t.crmBody}</label>
                <textarea
                  required
                  rows={4}
                  value={mailBody}
                  onChange={(e) => setMailBody(e.target.value)}
                  placeholder="Tapez votre communication..."
                  className="w-full bg-black border border-white/10 focus:border-purple-500 rounded-lg px-3 py-2 text-xs text-white"
                />
              </div>

              <button
                type="submit"
                className="w-full py-2 bg-purple-600 hover:bg-purple-500 text-white font-bold font-orbitron text-xs tracking-widest uppercase rounded-lg transition-colors cursor-none flex items-center justify-center space-x-2"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Diffuser</span>
              </button>
            </form>

            {/* Campaign History logs */}
            <div className="pt-2 border-t border-white/5 space-y-2">
              <span className="block text-[9px] font-mono text-gray-500 uppercase">{t.crmEmailLog}</span>
              <div className="space-y-1 max-h-32 overflow-y-auto pr-1">
                {emailCampaigns.map((log) => (
                  <div key={log.id} className="p-2 rounded bg-black/40 text-[9px] font-mono border border-white/5 flex items-center justify-between text-gray-400">
                    <span className="truncate max-w-[150px]">{log.subject}</span>
                    <span className="text-green-400">SENT</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Checklist team Tasks system */}
          <div className="glass-panel p-6 rounded-3xl border border-white/5 space-y-4">
            <h3 className="font-orbitron font-bold text-sm text-gray-300 flex items-center space-x-2">
              <CheckSquare className="w-4.5 h-4.5" />
              <span>{t.crmTaskTitle}</span>
            </h3>

            <form onSubmit={handleAddTask} className="flex gap-2">
              <input
                type="text"
                required
                value={taskText}
                onChange={(e) => setTaskText(e.target.value)}
                placeholder={t.crmTaskPlaceholder}
                className="flex-1 bg-black border border-white/10 focus:border-purple-500 rounded-lg px-3 py-1.5 text-xs text-white"
              />
              <button
                type="submit"
                className="px-3 py-1.5 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-xs font-bold text-white cursor-none"
              >
                {t.crmTaskAdd}
              </button>
            </form>

            <div className="space-y-1.5 max-h-48 overflow-y-auto">
              {tasks.map((task) => (
                <div key={task.id} className="flex items-center justify-between p-2 rounded bg-black/40 text-xs border border-white/5">
                  <div className="flex items-center space-x-2 flex-1">
                    <input
                      type="checkbox"
                      checked={task.completed}
                      onChange={() => toggleTask(task.id)}
                      className="accent-purple-600 rounded cursor-none"
                    />
                    <span className={`truncate max-w-[160px] text-gray-300 ${task.completed ? 'line-through text-gray-500' : ''}`}>
                      {task.text}
                    </span>
                  </div>

                  <button
                    onClick={() => deleteTask(task.id)}
                    className="text-gray-500 hover:text-red-400 p-1 cursor-none"
                    title="Supprimer tâche"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>

      {/* Edit Platform Modal */}
      {editingPlat && (
        <div className="fixed inset-0 bg-black/85 backdrop-blur-md z-50 flex items-center justify-center p-4 overflow-y-auto animate-fade-in">
          <div className="glass-panel max-w-md w-full rounded-3xl border border-cyan-500/40 p-6 space-y-4 relative text-left">
            <button
              onClick={() => setEditingPlat(null)}
              className="absolute top-6 right-6 p-1 text-gray-400 hover:text-white cursor-none"
            >
              <X className="w-4 h-4" />
            </button>

            <h3 className="font-orbitron font-bold text-white text-base uppercase">
              Modifier {editingPlat.name}
            </h3>

            <form onSubmit={handleSaveEditPlatform} className="space-y-3">
              <div className="space-y-1">
                <label className="block text-[10px] font-mono uppercase text-gray-400">Nom</label>
                <input
                  type="text"
                  required
                  value={editingPlat.name}
                  onChange={(e) => setEditingPlat({ ...editingPlat, name: e.target.value })}
                  className="w-full bg-black border border-white/10 rounded-lg px-3 py-1.5 text-xs text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="block text-[10px] font-mono uppercase text-gray-400">Logo Icon</label>
                  <input
                    type="text"
                    required
                    value={editingPlat.logo}
                    onChange={(e) => setEditingPlat({ ...editingPlat, logo: e.target.value })}
                    className="w-full bg-black border border-white/10 rounded-lg px-3 py-1.5 text-xs text-white"
                  />
                </div>
                <div className="space-y-1">
                  <label className="block text-[10px] font-mono uppercase text-gray-400">Zone</label>
                  <input
                    type="text"
                    required
                    value={editingPlat.zone}
                    onChange={(e) => setEditingPlat({ ...editingPlat, zone: e.target.value })}
                    className="w-full bg-black border border-white/10 rounded-lg px-3 py-1.5 text-xs text-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="block text-[10px] font-mono uppercase text-gray-400">Secteur</label>
                  <select
                    value={editingPlat.sector}
                    onChange={(e) => setEditingPlat({ ...editingPlat, sector: e.target.value as any })}
                    className="w-full bg-black border border-white/10 rounded-lg px-3 py-1.5 text-xs text-white"
                  >
                    <option value="immo">IMMOBILIER</option>
                    <option value="tourism">TOURISME</option>
                    <option value="events">ÉVÉNEMENTIEL</option>
                    <option value="economy">COLLABORATIF</option>
                    <option value="services">SERVICES PRO</option>
                    <option value="tech">TECH / INNOVATION</option>
                  </select>
                </div>
                <div className="space-y-1">
                  <label className="block text-[10px] font-mono uppercase text-gray-400">Statut</label>
                  <select
                    value={editingPlat.status}
                    onChange={(e) => setEditingPlat({ ...editingPlat, status: e.target.value as any })}
                    className="w-full bg-black border border-white/10 rounded-lg px-3 py-1.5 text-xs text-white"
                  >
                    <option value="active">ACTIF</option>
                    <option value="development">EN DEV</option>
                    <option value="soon">SOON</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1">
                <label className="block text-[10px] font-mono uppercase text-gray-400">URL</label>
                <input
                  type="url"
                  value={editingPlat.url}
                  onChange={(e) => setEditingPlat({ ...editingPlat, url: e.target.value })}
                  className="w-full bg-black border border-white/10 rounded-lg px-3 py-1.5 text-xs text-white"
                />
              </div>

              <div className="flex justify-end space-x-2 pt-2">
                <button
                  type="button"
                  onClick={() => setEditingPlat(null)}
                  className="px-3 py-1.5 text-xs text-gray-400 bg-white/5 rounded-lg"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 text-xs bg-cyan-600 hover:bg-cyan-500 text-white font-bold rounded-lg"
                >
                  Sauvegarder
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
