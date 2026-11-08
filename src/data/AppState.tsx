import React, { useState, useEffect } from 'react';
import { AppStateContext, type AppStateContextType } from './useAppState';

// Types for our platforms
export interface Platform {
  id: string;
  name: string;
  logo: string; // Emoji or simple icon
  sector: 'immo' | 'tourism' | 'events' | 'economy' | 'services' | 'tech';
  zone: string; // e.g., "France", "Madagascar", "Maroc"
  status: 'active' | 'development' | 'soon';
  url: string;
  shortDescKey: string; // references inside translations
  fullDescKey: string;
  hidden?: boolean;
  order?: number;
}

export interface Invoice {
  id: string;
  reference: string;
  platform: string;
  amount: string;
  date: string;
  status: 'Paid' | 'Pending';
}

export interface ClientMessage {
  id: string;
  sender: 'user' | 'crew';
  text: string;
  time: string;
}

// Contacts/leads
export interface Contact {
  id: string;
  firstName: string;
  lastName: string;
  company: string;
  function: string;
  email: string;
  phone: string;
  country: string;
  partnerType: string;
  project: string;
  budget: string;
  proposal: string;
  date: string;
  source: string;
  status: 'New' | 'In Discussion' | 'Partnered' | 'Closed';
}

export interface EmailCampaign {
  id: string;
  time: string;
  subject: string;
  body: string;
  status: 'Sent';
}

export interface Task {
  id: string;
  text: string;
  completed: boolean;
}

export const AppStateProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<'fr' | 'en'>('fr');
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  const [soundEnabled, setSoundEnabled] = useState<boolean>(false);
  const [activeSection, setActiveSection] = useState<string>('home');
  const [activePlatformForDetail, setActivePlatformForDetail] = useState<string | null>(null);

  // Custom theme-toggle update inside document element
  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
      root.classList.remove('light');
    } else {
      root.classList.add('light');
      root.classList.remove('dark');
    }
  }, [theme]);

  // Cookie Consent
  const [cookieConsent, setCookieConsent] = useState<'accepted' | 'declined' | 'pending'>('pending');

  // Synthetic Web Audio SFX Engine (Sci-Fi / Space Chimes)
  const playSound = (type: 'click' | 'hover' | 'success' | 'space') => {
    if (!soundEnabled) return;
    try {
      const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioContextClass) return;
      const ctx = new AudioContextClass();

      if (type === 'click') {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.type = 'sine';
        osc.frequency.setValueAtTime(1200, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(400, ctx.currentTime + 0.15);
        gain.gain.setValueAtTime(0.1, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.15);
        osc.start();
        osc.stop(ctx.currentTime + 0.15);
      } else if (type === 'hover') {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(800, ctx.currentTime);
        osc.frequency.setValueAtTime(1000, ctx.currentTime + 0.05);
        gain.gain.setValueAtTime(0.02, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.08);
        osc.start();
        osc.stop(ctx.currentTime + 0.08);
      } else if (type === 'success') {
        const osc1 = ctx.createOscillator();
        const osc2 = ctx.createOscillator();
        const gain1 = ctx.createGain();
        const gain2 = ctx.createGain();
        osc1.connect(gain1); gain1.connect(ctx.destination);
        osc2.connect(gain2); gain2.connect(ctx.destination);
        osc1.frequency.setValueAtTime(600, ctx.currentTime);
        osc1.frequency.setValueAtTime(900, ctx.currentTime + 0.1);
        osc2.frequency.setValueAtTime(1200, ctx.currentTime + 0.15);
        gain1.gain.setValueAtTime(0.08, ctx.currentTime);
        gain1.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.3);
        gain2.gain.setValueAtTime(0.05, ctx.currentTime + 0.1);
        gain2.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.4);
        osc1.start();
        osc2.start();
        osc1.stop(ctx.currentTime + 0.4);
        osc2.stop(ctx.currentTime + 0.4);
      } else if (type === 'space') {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(150, ctx.currentTime);
        osc.frequency.linearRampToValueAtTime(300, ctx.currentTime + 0.8);
        gain.gain.setValueAtTime(0.05, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.8);
        osc.start();
        osc.stop(ctx.currentTime + 0.8);
      }
    } catch (e) {
      console.warn('Audio context blocked or not supported', e);
    }
  };

  // Platforms State initialized with the 12 core projects
  const initialPlatforms: Platform[] = [
    {
      id: 'rent-sound',
      name: 'RentSoundSystem.com',
      logo: '🔊',
      sector: 'events',
      zone: 'France / Belgique / Suisse',
      status: 'active',
      url: 'https://rentsoundsystem.com',
      shortDescKey: 'platRSSDesc',
      fullDescKey: 'platRSSFull',
      hidden: false,
      order: 1
    },
    {
      id: 'mariage-mada',
      name: 'Mariage-Madagascar.com',
      logo: '💍',
      sector: 'tourism',
      zone: 'Madagascar (Nosy Be / Sainte-Marie)',
      status: 'active',
      url: 'https://mariage-madagascar.com',
      shortDescKey: 'platMMDesc',
      fullDescKey: 'platMMFull',
      hidden: false,
      order: 2
    },
    {
      id: 'taghazout-prestige',
      name: 'Taghazout Prestige',
      logo: '🏄',
      sector: 'tourism',
      zone: 'Maroc (Taghazout / Agadir)',
      status: 'active',
      url: 'https://taghazout-prestige.com',
      shortDescKey: 'platTPDesc',
      fullDescKey: 'platTPFull',
      hidden: false,
      order: 3
    },
    {
      id: 'mon-ponton',
      name: 'MonPonton.com',
      logo: '⚓',
      sector: 'economy',
      zone: 'Méditerranée / Global',
      status: 'development',
      url: 'https://monponton.com',
      shortDescKey: 'platMPDesc',
      fullDescKey: 'platMPFull',
      hidden: false,
      order: 4
    },
    {
      id: 'ebike-maroc',
      name: 'EbikeMaroc.bike',
      logo: '🚲',
      sector: 'economy',
      zone: 'Maroc (Marrakech / Essaouira)',
      status: 'active',
      url: 'https://ebikemaroc.bike',
      shortDescKey: 'platEMDesc',
      fullDescKey: 'platEMFull',
      hidden: false,
      order: 5
    },
    {
      id: 'architect-led',
      name: 'Architect-du-LED.com',
      logo: '💡',
      sector: 'tech',
      zone: 'Europe',
      status: 'active',
      url: 'https://architect-du-led.com',
      shortDescKey: 'platALDesc',
      fullDescKey: 'platALFull',
      hidden: false,
      order: 6
    },
    {
      id: 'devis-pro',
      name: 'DevisProGratuit.com',
      logo: '📋',
      sector: 'services',
      zone: 'France',
      status: 'active',
      url: 'https://devisprogratuit.com',
      shortDescKey: 'platDPGDesc',
      fullDescKey: 'platDPGFull',
      hidden: false,
      order: 7
    },
    {
      id: 'miaou-ouaf',
      name: 'MiaouMiaou-OuafOuaf.com',
      logo: '🐾',
      sector: 'services',
      zone: 'Europe / International',
      status: 'soon',
      url: 'https://miaoumiaou-ouafouaf.com',
      shortDescKey: 'platMMOWDesc',
      fullDescKey: 'platMMOWFull',
      hidden: false,
      order: 8
    },
    {
      id: 'immo-neuf-corse',
      name: 'Immo Neuf Corse',
      logo: '🏝️',
      sector: 'immo',
      zone: 'France (Corse)',
      status: 'active',
      url: 'https://immo-neuf-corse.com',
      shortDescKey: 'platINCDesc',
      fullDescKey: 'platINCFull',
      hidden: false,
      order: 9
    },
    {
      id: 'invest-immo-corse',
      name: 'Investir Immobilier Corse',
      logo: '📈',
      sector: 'immo',
      zone: 'Europe / Corse',
      status: 'active',
      url: 'https://investir-immobilier-corse.com',
      shortDescKey: 'platIICDesc',
      fullDescKey: 'platIICFull',
      hidden: false,
      order: 10
    },
    {
      id: 'mada-immo',
      name: 'MadaImmo.com',
      logo: '🏠',
      sector: 'immo',
      zone: 'Madagascar (Antananarivo / Tamatave)',
      status: 'active',
      url: 'https://madaimmo.com',
      shortDescKey: 'platMIDesc',
      fullDescKey: 'platMIFull',
      hidden: false,
      order: 11
    },
    {
      id: 'parking-cannes',
      name: 'Parking-Cannes.com',
      logo: '🚗',
      sector: 'services',
      zone: 'France (Cannes)',
      status: 'development',
      url: 'https://parking-cannes.com',
      shortDescKey: 'platPCDesc',
      fullDescKey: 'platPCFull',
      hidden: false,
      order: 12
    }
  ];

  const [platforms, setPlatforms] = useState<Platform[]>(initialPlatforms);

  // Mock Invoices
  const [invoices] = useState<Invoice[]>([
    { id: 'inv-1', reference: 'FAC-2026-089', platform: 'RentSoundSystem.com', amount: '2 400 €', date: '2026-02-28', status: 'Paid' },
    { id: 'inv-2', reference: 'FAC-2026-112', platform: 'Taghazout Prestige', amount: '4 850 €', date: '2026-03-02', status: 'Paid' },
    { id: 'inv-3', reference: 'FAC-2026-145', platform: 'MadaImmo.com', amount: '1 200 €', date: '2026-03-05', status: 'Pending' }
  ]);

  // Mock Client Messages
  const [clientMessages, setClientMessages] = useState<ClientMessage[]>([
    { id: 'msg-1', sender: 'crew', text: 'Bienvenue à bord de la station IMUIA ! Votre dossier de partenariat est en cours d\'orchestration.', time: '09:30' },
    { id: 'msg-2', sender: 'user', text: 'Merci Capitaine ! Nous préparons les documents légaux pour le prochain raccordement.', time: '10:15' }
  ]);

  // Lead Contacts State
  const [contacts, setContacts] = useState<Contact[]>([
    {
      id: 'contact-1',
      firstName: 'Jean',
      lastName: 'Dupont',
      company: 'Azur Ventures',
      function: 'Directeur d\'Investissement',
      email: 'j.dupont@azurventures.fr',
      phone: '+33 6 12 34 56 78',
      country: 'France',
      partnerType: 'Investor',
      project: 'immo-neuf-corse',
      budget: '500000',
      proposal: 'Intérêt marqué pour co-financer les futurs programmes résidentiels de prestige en Corse.',
      date: '2026-02-18 10:30',
      source: 'Formulaire Partenaires',
      status: 'In Discussion'
    },
    {
      id: 'contact-2',
      firstName: 'Sarah',
      lastName: 'Amrani',
      company: 'Maroc Luxury Travel',
      function: 'Responsable Conciergerie',
      email: 'sarah@marocluxury.ma',
      phone: '+212 6 61 22 33 44',
      country: 'Maroc',
      partnerType: 'Operator',
      project: 'taghazout-prestige',
      budget: '0',
      proposal: 'Proposition de partenariat exclusif pour approvisionner Taghazout Prestige en voitures sportives avec chauffeur.',
      date: '2026-03-01 14:15',
      source: 'Formulaire Partenaires',
      status: 'New'
    }
  ]);

  // Tasks Command State
  const [tasks, setTasks] = useState<Task[]>([
    { id: 't-1', text: 'Vérifier la certification des titres fonciers sur MadaImmo', completed: false },
    { id: 't-2', text: 'Optimiser le SEO de Architect-du-LED.com', completed: true },
    { id: 't-3', text: 'Négocier contrat d\'amarrage avec la Marina de Cannes pour MonPonton', completed: false },
    { id: 't-4', text: 'Mettre à jour l\'algorithme de dispatching IA sur DevisProGratuit', completed: false }
  ]);

  // Signed Contracts Simulator
  const [contracts, setContracts] = useState<{ id: string; title: string; date: string; signed: boolean; signatureData?: string }[]>([
    { id: 'c-1', title: 'Accord de Confidentialité Stratégique (NDA) — IMUIA LABS', date: '2026-03-05', signed: false },
    { id: 'c-2', title: 'Mandat de Co-Investissement Spatial — Galaxie Immobilier', date: '2026-03-06', signed: false }
  ]);

  // Broadcast campaign email logs
  const [emailCampaigns, setEmailCampaigns] = useState<EmailCampaign[]>([
    { id: 'cam-1', time: '2026-02-15 09:00', subject: 'Lancement de l\'orbite EbikeMaroc 2.0', body: 'Bonjour, notre flotte de vélos est désormais active...', status: 'Sent' }
  ]);

  // Simulated login/register states
  const [userSession, setUserSession] = useState<AppStateContextType['userSession']>(null);

  const login = (email: string, pass: string): boolean => {
    // Highly forgiving mock authentication for demonstration
    if (email === 'partner@imuia.com' && pass === 'password') {
      setUserSession({
        email: 'partner@imuia.com',
        name: 'Commandant Stella',
        role: 'Venture Partner & Local Operator',
        accredited: true
      });
      playSound('success');
      return true;
    } else if (email && pass) {
      // Dynamic test user
      const computedName = email.split('@')[0];
      const capitalized = computedName.charAt(0).toUpperCase() + computedName.slice(1);
      setUserSession({
        email: email,
        name: capitalized,
        role: 'Explorateur de services',
        accredited: email.toLowerCase().includes('lab') || email.toLowerCase().includes('imuia')
      });
      playSound('success');
      return true;
    }
    return false;
  };

  const register = (email: string, name: string) => {
    setUserSession({
      email: email,
      name: name || 'Aventurier Stellaire',
      role: 'Partenaire Cadet',
      accredited: false
    });
    playSound('success');
  };

  const logout = () => {
    setUserSession(null);
    playSound('click');
  };

  // State modification functions for Admin
  const addPlatform = (p: Omit<Platform, 'id'>) => {
    const newId = p.name.toLowerCase().replace(/[^a-z0-9]/g, '-');
    const newPlat: Platform = {
      ...p,
      id: newId
    };
    setPlatforms(prev => [...prev, newPlat]);
    playSound('success');
  };

  const updatePlatform = (id: string, updated: Partial<Platform>) => {
    setPlatforms(prev => prev.map(item => item.id === id ? { ...item, ...updated } : item));
    playSound('success');
  };

  const deletePlatform = (id: string) => {
    setPlatforms(prev => prev.filter(item => item.id !== id));
    playSound('click');
  };

  const togglePlatformVisibility = (id: string) => {
    setPlatforms(prev => prev.map(item => item.id === id ? { ...item, hidden: !item.hidden } : item));
    playSound('click');
  };

  const movePlatformOrder = (id: string, direction: 'up' | 'down') => {
    setPlatforms(prev => {
      const index = prev.findIndex(p => p.id === id);
      if (index === -1) return prev;
      const targetIndex = direction === 'up' ? index - 1 : index + 1;
      if (targetIndex < 0 || targetIndex >= prev.length) return prev;
      const updated = [...prev];
      const temp = updated[index];
      updated[index] = updated[targetIndex];
      updated[targetIndex] = temp;
      return updated;
    });
    playSound('click');
  };

  const sendClientMessage = (text: string) => {
    if (!text.trim()) return;
    const userMsg: ClientMessage = {
      id: `msg-${Date.now()}`,
      sender: 'user',
      text,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    setClientMessages(prev => [...prev, userMsg]);
    playSound('click');

    setTimeout(() => {
      const crewReply: ClientMessage = {
        id: `msg-reply-${Date.now()}`,
        sender: 'crew',
        text: 'Message reçu par la passerelle IMUIA. Un officier de liaison examine vos coordonnées.',
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setClientMessages(prev => [...prev, crewReply]);
      playSound('success');
    }, 1200);
  };

  const addContact = (c: Omit<Contact, 'id' | 'date' | 'status' | 'source'>) => {
    const newContact: Contact = {
      ...c,
      id: `contact-${Date.now()}`,
      date: new Date().toISOString().slice(0, 16).replace('T', ' '),
      status: 'New',
      source: 'Formulaire Partenaires'
    };
    setContacts(prev => [newContact, ...prev]);
    playSound('success');
  };

  const updateContactStatus = (id: string, status: Contact['status']) => {
    setContacts(prev => prev.map(item => item.id === id ? { ...item, status } : item));
    playSound('click');
  };

  const signContractInState = (id: string, signature: string) => {
    setContracts(prev => prev.map(item => item.id === id ? { ...item, signed: true, signatureData: signature } : item));
    playSound('success');
  };

  const sendEmailCampaign = (subject: string, body: string) => {
    const newCampaign: EmailCampaign = {
      id: `cam-${Date.now()}`,
      time: new Date().toISOString().slice(0, 16).replace('T', ' '),
      subject,
      body,
      status: 'Sent'
    };
    setEmailCampaigns(prev => [newCampaign, ...prev]);
    playSound('success');
  };

  // Interactive Task handlers
  const addTask = (text: string) => {
    if (!text.trim()) return;
    const newTask: Task = {
      id: `t-${Date.now()}`,
      text,
      completed: false
    };
    setTasks(prev => [...prev, newTask]);
    playSound('success');
  };

  const toggleTask = (id: string) => {
    setTasks(prev => prev.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
    playSound('click');
  };

  const deleteTask = (id: string) => {
    setTasks(prev => prev.filter(t => t.id !== id));
    playSound('click');
  };

  return (
    <AppStateContext.Provider
      value={{
        language,
        setLanguage,
        theme,
        setTheme,
        soundEnabled,
        setSoundEnabled,
        playSound,
        activeSection,
        setActiveSection,
        platforms,
        addPlatform,
        updatePlatform,
        deletePlatform,
        togglePlatformVisibility,
        movePlatformOrder,
        invoices,
        clientMessages,
        sendClientMessage,
        contacts,
        addContact,
        updateContactStatus,
        userSession,
        login,
        register,
        logout,
        contracts,
        signContractInState,
        emailCampaigns,
        sendEmailCampaign,
        tasks,
        addTask,
        toggleTask,
        deleteTask,
        cookieConsent,
        setCookieConsent,
        activePlatformForDetail,
        setActivePlatformForDetail,
      }}
    >
      {children}
    </AppStateContext.Provider>
  );
};

