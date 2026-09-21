import React from 'react';
import { useAppState } from '../data/useAppState';
import { translations } from '../data/translations';
import { Shield, Lock, Eye } from 'lucide-react';

export const Legals: React.FC<{ mode: 'privacy' | 'legal' | 'cookies' }> = ({ mode }) => {
  const { language, cookieConsent, setCookieConsent, playSound } = useAppState();
  const t = translations[language];

  return (
    <div className="relative min-h-[calc(100vh-80px)] py-12 px-4 max-w-4xl mx-auto text-left space-y-8">
      <div className="absolute inset-0 stars-bg opacity-30 pointer-events-none"></div>

      {mode === 'privacy' && (
        <div className="glass-panel p-6 md:p-8 rounded-3xl border border-white/10 space-y-6 relative z-10">
          <h1 className="text-2xl md:text-3xl font-black font-orbitron text-white uppercase flex items-center space-x-2.5">
            <Lock className="w-6 h-6 text-purple-400" />
            <span>{t.privacyPolicy}</span>
          </h1>
          <div className="space-y-4 text-xs md:text-sm text-gray-300 leading-relaxed font-light">
            <p><strong>1. Collecte des données</strong></p>
            <p>IMUIA s'engage à ce que la collecte et le traitement de vos données, effectués à partir du site imuia.com, soient conformes au règlement général sur la protection des données (RGPD) et à la loi Informatique et Libertés.</p>
            <p><strong>2. Utilisation des formulaires</strong></p>
            <p>Les données saisies dans le formulaire de partenariat sont destinées exclusivement au traitement de votre demande de collaboration par nos équipes internes. Aucune coordonnée ou information de proposition commerciale n'est revendue à des tiers.</p>
            <p><strong>3. Droits d'accès et de rectification</strong></p>
            <p>Vous disposez d'un droit d'accès, de rectification et de suppression des données vous concernant. Vous pouvez exercer ce droit en nous envoyant un message via l'espace partenaires ou d'administration.</p>
          </div>
        </div>
      )}

      {mode === 'legal' && (
        <div className="glass-panel p-6 md:p-8 rounded-3xl border border-white/10 space-y-6 relative z-10">
          <h1 className="text-2xl md:text-3xl font-black font-orbitron text-white uppercase flex items-center space-x-2.5">
            <Shield className="w-6 h-6 text-purple-400" />
            <span>{t.legalNotice}</span>
          </h1>
          <div className="space-y-4 text-xs md:text-sm text-gray-300 leading-relaxed font-light">
            <p><strong>Éditeur du site :</strong> IMUIA.com</p>
            <p><strong>Directeur de la publication :</strong> Équipage IMUIA LABS</p>
            <p><strong>Hébergement :</strong> Serveurs Cloud de haute sécurité de la station orbitale IMUIA.</p>
            <p><strong>Propriété Intellectuelle :</strong> L'ensemble de ce site relève de la législation française et internationale sur le droit d'auteur et la propriété intellectuelle. Tous les droits de reproduction sont réservés, y compris pour les documents téléchargeables et les représentations iconographiques.</p>
          </div>
        </div>
      )}

      {mode === 'cookies' && (
        <div className="glass-panel p-6 md:p-8 rounded-3xl border border-purple-500/30 space-y-6 relative z-10">
          <h1 className="text-2xl md:text-3xl font-black font-orbitron text-white uppercase flex items-center space-x-2.5">
            <Eye className="w-6 h-6 text-purple-400" />
            <span>{t.cookiesManage}</span>
          </h1>

          <div className="space-y-4 text-xs md:text-sm text-gray-300 leading-relaxed font-light">
            <p>Nous utilisons des cookies techniques nécessaires à l'analyse de navigation et à la mémorisation de vos préférences linguistiques (Français/Anglais) et de thèmes visuels.</p>

            <div className="p-4 rounded-xl bg-purple-500/5 border border-purple-500/10 flex items-center justify-between">
              <div>
                <span className="block font-bold text-white text-sm">Statut actuel du consentement :</span>
                <span className="text-xs text-purple-400 font-mono">
                  {cookieConsent === 'accepted' ? 'Balises Autorisées (Docked)' : cookieConsent === 'declined' ? 'Balises Refusées (Muted)' : 'En attente de décision (Scanning)'}
                </span>
              </div>

              <div className="flex space-x-2">
                <button
                  onClick={() => { setCookieConsent('declined'); playSound('click'); }}
                  className="px-3 py-1.5 rounded-lg text-xs bg-white/5 text-gray-400 hover:text-white cursor-none"
                >
                  Tout refuser
                </button>
                <button
                  onClick={() => { setCookieConsent('accepted'); playSound('success'); }}
                  className="px-3 py-1.5 rounded-lg text-xs bg-purple-600 hover:bg-purple-500 text-white font-bold cursor-none"
                >
                  Tout accepter
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
