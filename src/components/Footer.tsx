import React from 'react';
import { useAppState } from '../data/AppState';
import { translations } from '../data/translations';
import { Shield, Lock, Eye, ArrowUp } from 'lucide-react';

export const Footer: React.FC = () => {
  const { language, setActiveSection, playSound } = useAppState();
  const t = translations[language];

  const handleNav = (sec: string) => {
    setActiveSection(sec);
    playSound('click');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="glass-panel border-t border-white/10 mt-auto py-12 relative overflow-hidden">
      {/* Subtle bottom glows */}
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-900/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8 text-left">
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center space-x-2">
              <span className="font-orbitron font-black text-2xl tracking-widest text-white dark:text-white light:text-slate-900">
                {t.brand}
              </span>
            </div>
            <p className="text-sm text-gray-400 max-w-sm">
              {t.tagline}
            </p>
            <div className="text-xs text-purple-400 font-mono">
              // ORBITAL COORDINATES: 43.5528° N, 7.0174° E &amp; 18.8792° S, 47.5079° E
            </div>
          </div>

          <div>
            <h4 className="font-orbitron font-bold text-sm text-white dark:text-white light:text-slate-900 tracking-wider uppercase mb-4">
              Universes
            </h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>
                <button onClick={() => handleNav('universe')} className="hover:text-purple-400 transition-colors cursor-none text-left">
                  {t.navUniverse}
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('platforms')} className="hover:text-purple-400 transition-colors cursor-none text-left">
                  {t.navPlatforms}
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('labs')} className="hover:text-purple-400 transition-colors cursor-none text-left">
                  {t.navLabs}
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('vision')} className="hover:text-purple-400 transition-colors cursor-none text-left">
                  {t.navVision}
                </button>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-orbitron font-bold text-sm text-white dark:text-white light:text-slate-900 tracking-wider uppercase mb-4">
              Légal
            </h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>
                <button onClick={() => handleNav('legal')} className="hover:text-purple-400 transition-colors cursor-none text-left flex items-center space-x-1.5">
                  <Shield className="w-3.5 h-3.5" />
                  <span>{t.legalNotice}</span>
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('privacy')} className="hover:text-purple-400 transition-colors cursor-none text-left flex items-center space-x-1.5">
                  <Lock className="w-3.5 h-3.5" />
                  <span>{t.privacyPolicy}</span>
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('cookies')} className="hover:text-purple-400 transition-colors cursor-none text-left flex items-center space-x-1.5">
                  <Eye className="w-3.5 h-3.5" />
                  <span>{t.cookiesManage}</span>
                </button>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/5 pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-gray-500">
          <p className="text-center sm:text-left mb-4 sm:mb-0 max-w-lg">
            {t.copyright}
          </p>
          <button
            onClick={() => {
              playSound('space');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 hover:border-purple-500 hover:text-white transition-all cursor-none"
          >
            <ArrowUp className="w-3 h-3" />
            <span>Top</span>
          </button>
        </div>
      </div>
    </footer>
  );
};
