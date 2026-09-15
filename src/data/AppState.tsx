import React, { useState, useEffect } from 'react';
import { AppStateContext } from './AppStateContext';
import type {
  Platform,
  Contact,
  Task,
  EmailCampaign,
  AppStateContextType
} from './AppStateContext';

export type { Platform, Contact, Task, EmailCampaign, AppStateContextType };

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
  const [platforms, setPlatforms] = useState<Platform[]>([
    {
      id: 'rent-sound',
      name: 'RentSoundSystem.com',
      logo: '🔊',
      sector: 'events',
      zone: 'France / Belgique / Suisse',
      status: 'active',
      url: 'https://rentsoundsystem.com',
      shortDescKey: 'platRSSDesc',
      fullDescKey: 'platRSSFull'
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
      fullDescKey: 'platMMFull'
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
      fullDescKey: 'platTPFull'
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
      fullDescKey: 'platMPFull'
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
      fullDescKey: 'platEMFull'
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
      fullDescKey: 'platALFull'
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
      fullDescKey: 'platDPGFull'
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
      fullDescKey: 'platMMOWFull'
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
      fullDescKey: 'platINCFull'
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
      fullDescKey: 'platIICFull'
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
      fullDescKey: 'platMIFull'
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
      fullDescKey: 'platPCFull'
    }
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
