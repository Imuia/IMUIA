import React, { useState } from 'react';
import { useAppState } from '../data/useAppState';
import { translations } from '../data/translations';
import { BookOpen, Calendar, User, ArrowRight, Tag } from 'lucide-react';

export const Journal: React.FC = () => {
  const { language, playSound } = useAppState();
  const t = translations[language];

  const [selectedArticle, setSelectedArticle] = useState<string | null>(null);

  const articles = [
    {
      id: 'art-1',
      title: 'Lancement d’EbikeMaroc.bike 2.0 : La mobilité verte connectée à Marrakech',
      category: 'Innovation & Territoire',
      author: 'Équipage IMUIA',
      date: '02 Mars 2026',
      readTime: '4 min',
      excerpt: 'Découverte de la nouvelle flotte de vélos à assistance électrique équipés de guidage GPS pour explorer les routes culturelles du Maroc.',
      content: `IMUIA annonce l'activation officielle de la version 2.0 d'EbikeMaroc.bike. Ce projet pionnier associe mobilité douce et découverte patrimoniale en installant des stations connectées à Marrakech, Agadir et Essaouira.

      Les utilisateurs bénéficient de réservations en temps réel, de paiements mobiles sécurisés et d'itinéraires scénarisés guidés par des puces GPS intégrées aux cadres des vélos.`
    },
    {
      id: 'art-2',
      title: 'Comment l’IA révolutionne le dispatching de devis sur DevisProGratuit.com',
      category: 'Intelligence Artificielle',
      author: 'IMUIA Labs R&D',
      date: '20 Février 2026',
      readTime: '6 min',
      excerpt: 'Analyse du nouvel algorithme d’IA prédictive capable de qualifier un projet de travaux et d’identifier les 3 meilleurs artisans en 1,2 seconde.',
      content: `Au cœur d'IMUIA Labs, nos équipes ont développé un modèle d'IA capable d'analyser la description textuelle et le budget estimatif d'une demande de devis.

      Grâce à cette technologie, DevisProGratuit.com garantit un taux de réponse de 98% en moins de 24h, connectant directement les particuliers avec des professionnels vérifiés.`
    },
    {
      id: 'art-3',
      title: 'Déploiement de Mariage-Madagascar.com dans l’archipel de Nosy Be',
      category: 'Tourisme & Luxe',
      author: 'Commandant Stella',
      date: '10 Février 2026',
      readTime: '5 min',
      excerpt: 'Ouverture d’un réseau exclusif de prestataires événementiels haut de gamme pour organiser des cérémonies féeriques sur les plages malgaches.',
      content: `Mariage-Madagascar.com franchit un cap décisif en intégrant les plus grands hôtels, photographes de prestige et wedding planners de Nosy Be et Sainte-Marie.

      La plateforme offre une prise en charge à 360° pour les couples internationaux souhaitant vivre une lune de miel ou une cérémonie intime d'exception.`
    }
  ];

  const currentArticle = articles.find(a => a.id === selectedArticle);

  return (
    <div className="relative min-h-[calc(100vh-80px)] py-12 px-4 space-y-12">
      <div className="absolute inset-0 stars-bg opacity-30 pointer-events-none"></div>

      <div className="text-center max-w-3xl mx-auto space-y-4 relative z-10">
        <h2 className="text-xs font-orbitron font-bold text-purple-400 tracking-widest uppercase flex items-center justify-center space-x-2">
          <BookOpen className="w-4 h-4" />
          <span>IMUIA Flight Log</span>
        </h2>
        <h1 className="text-3xl md:text-5xl font-black font-orbitron uppercase text-white leading-tight">
          {t.blogTitle}
        </h1>
        <p className="text-sm md:text-base text-gray-400 leading-relaxed font-light">
          {t.blogSubtitle}
        </p>
      </div>

      {currentArticle ? (
        /* Detailed Article View */
        <div className="max-w-4xl mx-auto glass-panel p-8 rounded-3xl border border-purple-500/30 space-y-6 text-left relative z-10 animate-fade-in">
          <button
            onClick={() => { setSelectedArticle(null); playSound('click'); }}
            className="text-xs font-mono text-purple-400 hover:text-white flex items-center space-x-1 cursor-none mb-4"
          >
            ← Retour au Journal de Bord
          </button>

          <div className="flex flex-wrap items-center gap-3 text-xs text-gray-400">
            <span className="bg-purple-500/10 text-purple-300 font-bold px-2.5 py-0.5 rounded flex items-center space-x-1">
              <Tag className="w-3 h-3" />
              <span>{currentArticle.category}</span>
            </span>
            <span className="flex items-center space-x-1">
              <Calendar className="w-3 h-3" />
              <span>{currentArticle.date}</span>
            </span>
            <span className="flex items-center space-x-1">
              <User className="w-3 h-3" />
              <span>{currentArticle.author}</span>
            </span>
          </div>

          <h2 className="text-2xl md:text-3xl font-orbitron font-black text-white">
            {currentArticle.title}
          </h2>

          <div className="border-t border-white/10 pt-6 text-gray-300 text-sm md:text-base leading-relaxed space-y-4 whitespace-pre-line font-light">
            {currentArticle.content}
          </div>
        </div>
      ) : (
        /* Articles Grid list */
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10 text-left">
          {articles.map((art) => (
            <div
              key={art.id}
              onMouseEnter={() => playSound('hover')}
              className="glass-panel p-6 rounded-2xl border border-white/5 hover:border-purple-500/40 transition-all flex flex-col justify-between group"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between text-[10px] font-mono text-gray-400">
                  <span className="bg-purple-500/10 text-purple-300 font-bold px-2 py-0.5 rounded">
                    {art.category}
                  </span>
                  <span>{art.readTime}</span>
                </div>

                <h3 className="font-orbitron font-bold text-white text-base group-hover:text-purple-300 transition-colors">
                  {art.title}
                </h3>

                <p className="text-xs text-gray-400 leading-relaxed font-light line-clamp-3">
                  {art.excerpt}
                </p>
              </div>

              <div className="pt-6 border-t border-white/5 flex items-center justify-between text-xs text-gray-400">
                <span>{art.date}</span>
                <button
                  onClick={() => { setSelectedArticle(art.id); playSound('click'); }}
                  className="text-purple-400 font-bold flex items-center space-x-1 group-hover:translate-x-1 transition-transform cursor-none"
                >
                  <span>{t.blogReadMore}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
