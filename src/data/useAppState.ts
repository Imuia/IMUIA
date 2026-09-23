import { useContext } from 'react';
import { AppStateContext } from './AppStateContext';
export type { Platform, Contact, EmailCampaign, Task, AppStateContextType } from './AppStateContext';

export const useAppState = () => {
  const context = useContext(AppStateContext);
  if (context === undefined) {
    throw new Error('useAppState must be used within an AppStateProvider');
  }
  return context;
};
