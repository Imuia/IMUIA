import { createContext, useContext } from 'react';
import type { Platform, Contact, EmailCampaign, Task, Invoice, ClientMessage } from './AppState';

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
  togglePlatformVisibility: (id: string) => void;
  movePlatformOrder: (id: string, direction: 'up' | 'down') => void;
  invoices: Invoice[];
  clientMessages: ClientMessage[];
  sendClientMessage: (text: string) => void;
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

export const useAppState = () => {
  const context = useContext(AppStateContext);
  if (context === undefined) {
    throw new Error('useAppState must be used within an AppStateProvider');
  }
  return context;
};
