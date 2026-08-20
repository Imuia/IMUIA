import { useContext } from 'react';
import { AppStateContext } from './AppStateContext';
import type { Platform, Contact, Task, EmailCampaign, AppStateContextType } from './AppStateContext';

export type { Platform, Contact, Task, EmailCampaign, AppStateContextType };

export const useAppState = () => {
  const context = useContext(AppStateContext);
  if (context === undefined) {
    throw new Error('useAppState must be used within an AppStateProvider');
  }
  return context;
};
