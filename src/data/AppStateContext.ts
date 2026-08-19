import { createContext } from 'react';

export interface Platform {
  id: string;
  name: string;
  logo: string;
  sector: 'immo' | 'tourism' | 'events' | 'economy' | 'services' | 'tech';
  zone: string;
  status: 'active' | 'development' | 'soon';
  url: string;
  shortDescKey: string;
  fullDescKey: string;
}

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

export interface AppStateContextType {
  language: 'fr' | 'en';
  setLanguage: (l: 'fr' | 'en') => void;
  theme: 'dark' | 'light';
  setTheme: (t: 'dark' | 'light') => void;
  soundEnabled: boolean;
  setSoundEnabled: (b: boolean) => void;
  playSound: (type: 'click' | 'hover' | 'success' | 'space') => void;
  activeSection: string;
  setActiveSection: (s: string) => void;
  platforms: Platform[];
  addPlatform: (p: Omit<Platform, 'id'>) => void;
  updatePlatform: (id: string, updated: Partial<Platform>) => void;
  deletePlatform: (id: string) => void;
  contacts: Contact[];
  addContact: (c: Omit<Contact, 'id' | 'date' | 'status' | 'source'>) => void;
  updateContactStatus: (id: string, status: Contact['status']) => void;
  userSession: null | { email: string; name: string; role: string; accredited: boolean };
  login: (email: string, pass: string) => boolean;
  register: (email: string, name: string) => void;
  logout: () => void;
  contracts: { id: string; title: string; date: string; signed: boolean; signatureData?: string }[];
  signContractInState: (id: string, signature: string) => void;
  emailCampaigns: EmailCampaign[];
  sendEmailCampaign: (subject: string, body: string) => void;
  tasks: Task[];
  addTask: (text: string) => void;
  toggleTask: (id: string) => void;
  deleteTask: (id: string) => void;
  cookieConsent: 'accepted' | 'declined' | 'pending';
  setCookieConsent: (v: 'accepted' | 'declined' | 'pending') => void;
  activePlatformForDetail: string | null;
  setActivePlatformForDetail: (id: string | null) => void;
}

export const AppStateContext = createContext<AppStateContextType | undefined>(undefined);
