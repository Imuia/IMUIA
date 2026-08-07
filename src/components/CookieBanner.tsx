import React from 'react';
import { useAppState } from '../data/AppState';
import { translations } from '../data/translations';
import { ShieldAlert, Check } from 'lucide-react';

export const CookieBanner: React.FC = () => {
  const { language, cookieConsent, setCookieConsent, playSound } = useAppState();
  const t = translations[language];

  if (cookieConsent !== 'pending') return null;

  const handleAction = (status: 'accepted' | 'declined') => {
    setCookieConsent(status);
    playSound('success');
  };

  return (
    <div className="fixed bottom-6 left-6 right-6 md:left-auto md:max-w-md z-50 animate-bounce-short">
      <div className="glass-panel p-5 rounded-2xl border border-purple-500/30 shadow-2xl shadow-purple-900/15">
        <div className="flex items-start space-x-3.5">
          <div className="p-2 rounded-xl bg-purple-500/10 text-purple-400">
            <ShieldAlert className="w-5 h-5" />
          </div>
          <div className="flex-1 space-y-1">
            <h4 className="font-orbitron font-bold text-sm text-white">
              {t.cookiesTitle}
            </h4>
            <p className="text-xs text-gray-400 leading-relaxed">
              {t.cookiesText}
            </p>
          </div>
        </div>
        <div className="mt-4 flex items-center justify-end space-x-2">
          <button
            onClick={() => handleAction('declined')}
            className="px-3 py-1.5 rounded-lg text-xs text-gray-400 hover:text-white hover:bg-white/5 transition-colors cursor-none"
          >
            {t.cookiesDecline}
          </button>
          <button
            onClick={() => handleAction('accepted')}
            className="flex items-center space-x-1.5 px-3 py-1.5 bg-purple-600 hover:bg-purple-500 text-white rounded-lg text-xs font-bold transition-colors cursor-none"
          >
            <Check className="w-3.5 h-3.5" />
            <span>{t.cookiesAccept}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
