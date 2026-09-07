import React from 'react';
import { useAppState } from '../data/useAppState';
import { translations } from '../data/translations';
import { Shield, Lock, Eye, CheckCircle2 } from 'lucide-react';

interface LegalsProps {
  mode: 'legal' | 'privacy' | 'cookies';
}

export const Legals: React.FC<LegalsProps> = ({ mode }) => {
  const { language, cookieConsent, setCookieConsent, playSound } = useAppState();
  const t = translations[language];

  return (
    <div className="relative min-h-[calc(100vh-80px)] py-12 px-4 space-y-12">
      <div className="absolute inset-0 stars-bg opacity-30 pointer-events-none"></div>

      <div className="max-w-4xl mx-auto glass-panel p-8 md:p-12 rounded-3xl border border-white/10 relative z-10 text-left space-y-8">

        {mode === 'legal' && (
          <div className="space-y-6">
            <div className="flex items-center space-x-3 text-purple-400">
              <Shield className="w-8 h-8" />
              <h1 className="text-3xl font-orbitron font-black text-white uppercase">{t.legalNotice}</h1>
            </div>

            <div className="space-y-4 text-sm text-gray-300 leading-relaxed font-light">
              <h3 className="font-orbitron font-bold text-white text-base">1. Éditeur du Site</h3>
              <p>
                Le site officiel <strong>IMUIA.com</strong> est édité par la société IMUIA GROUP, éditeur indépendant de services et de plateformes numériques.
                <br />
                Siège Social : Cannes / Antananarivo / Agadir
                <br />
                Directeur de la Publication : Équipage Fondateur IMUIA
                <br />
                E-mail de contact : contact@imuia.com
              </p>

              <h3 className="font-orbitron font-bold text-white text-base">2. Hébergement</h3>
              <p>
                Le site est hébergé sur des serveurs hautement sécurisés et redondés à l'échelle internationale.
              </p>

              <h3 className="font-orbitron font-bold text-white text-base">3. Propriété Intellectuelle</h3>
              <p>
                L'ensemble des concepts, logos, marques, textes et architectures de plateformes créés par IMUIA sont protégés par le droit d'auteur international et les lois relatives à la propriété industrielle.
              </p>
            </div>
          </div>
        )}

        {mode === 'privacy' && (
          <div className="space-y-6">
            <div className="flex items-center space-x-3 text-purple-400">
              <Lock className="w-8 h-8" />
              <h1 className="text-3xl font-orbitron font-black text-white uppercase">{t.privacyPolicy}</h1>
            </div>

            <div className="space-y-4 text-sm text-gray-300 leading-relaxed font-light">
              <h3 className="font-orbitron font-bold text-white text-base">Conformité RGPD</h3>
              <p>
                IMUIA accorde une importance primordiale à la protection et à la confidentialité de vos données personnelles. Conformément au Règlement Général sur la Protection des Données (RGPD), toutes les informations transmises via nos formulaires sont strictement chiffrées et réservées à l'usage interne de l'équipage IMUIA.
              </p>

              <h3 className="font-orbitron font-bold text-white text-base">Vos Droits</h3>
              <p>
                Vous disposez d'un droit d'accès, de rectification, de suppression et de portabilité de vos données personnelles sur simple demande adressée à privacy@imuia.com.
              </p>
            </div>
          </div>
        )}

        {mode === 'cookies' && (
          <div className="space-y-6">
            <div className="flex items-center space-x-3 text-purple-400">
              <Eye className="w-8 h-8" />
              <h1 className="text-3xl font-orbitron font-black text-white uppercase">{t.cookiesManage}</h1>
            </div>

            <div className="space-y-4 text-sm text-gray-300 leading-relaxed font-light">
              <p>
                Nous utilisons des balises de navigation pour analyser le trafic orbital, mesurer les performances de nos plateformes et vous offrir une expérience personnalisée.
              </p>

              <div className="p-6 rounded-2xl bg-black/40 border border-purple-500/30 space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-orbitron font-bold text-white">Statut actuel du consentement</h4>
                    <p className="text-xs text-gray-400 font-mono mt-0.5">
                      Statut enregistré: <span className="text-purple-400 font-bold uppercase">{cookieConsent}</span>
                    </p>
                  </div>
                  {cookieConsent === 'accepted' && (
                    <CheckCircle2 className="w-6 h-6 text-green-400" />
                  )}
                </div>

                <div className="flex items-center space-x-3 pt-2">
                  <button
                    onClick={() => { setCookieConsent('accepted'); playSound('success'); }}
                    className="px-4 py-2 bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs rounded-xl cursor-none"
                  >
                    Accepter les Cookies
                  </button>
                  <button
                    onClick={() => { setCookieConsent('declined'); playSound('click'); }}
                    className="px-4 py-2 bg-white/5 border border-white/10 text-gray-300 hover:text-white text-xs rounded-xl cursor-none"
                  >
                    Refuser
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
