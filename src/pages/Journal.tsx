import React, { useState } from 'react';
import { useAppState } from '../data/AppState';
import { translations } from '../data/translations';
import { BookOpen, User, Calendar, Tag } from 'lucide-react';

export const Journal: React.FC = () => {
  const { language, playSound } = useAppState();
  const t = translations[language];

  const [activeCat, setActiveCat] = useState<'all' | 'launch' | 'tech' | 'impact' | 'immo'>('all');

  const articles = [
    {
      id: 'art-1',
      title: 'Lancement d\'EbikeMaroc.bike 2.0 : La Révolution Verte',
      cat: 'launch',
      catLabel: 'Lancement / Mobilité',
      date: '2026-02-15',
      author: 'Capitaine Gabriel',
      excerpt: 'Notre service pionnier de location de vélos électriques au Maroc déploie sa nouvelle flotte connectée équipée de puces GPS intelligentes et de balises solaires.',
      content: 'EbikeMaroc.bike franchit un cap historique en introduisant des vélos à assistance électrique de dernière génération. Les flottes sont désormais équipées de capteurs GPS de haute précision connectés en temps réel au cloud d\'IMUIA. Les hôteliers partenaires peuvent ainsi suivre l\'usage de leur parc de manière instantanée, offrant des expériences de parcours touristiques immersifs et éco-responsables à Marrakech, Agadir et Essaouira.'
    },
    {
      id: 'art-2',
      title: 'L\'Intelligence Artificielle au Service du Dispatching Immobilier',
      cat: 'tech',
      catLabel: 'Innovation Tech / IA',
      date: '2026-03-01',
      author: 'Ingénieur Clara',
      excerpt: 'Comment notre lab d\'ingénierie R&amp;D IMUIA LABS a conçu un algorithme neuronal de qualification et dispatching instantané de prospects pour DevisProGratuit et MadaImmo.',
      content: 'Au cœur de la station R&D IMUIA LABS, nos ingénieurs ont déployé un modèle d\'IA capable d\'analyser et de distribuer les demandes de devis d\'artisans et d\'annonces immobilières en moins de 150 millisecondes. Ce module neural calcule la disponibilité locale des prestataires partenaires, leur taux de réponse historique, et qualifie sémantiquement la demande de l\'utilisateur pour garantir un taux de conversion multiplié par deux.'
    },
    {
      id: 'art-3',
      title: 'Mariage-Madagascar : Expansion Verte &amp; Protection Solidaire',
      cat: 'impact',
      catLabel: 'Tourisme / Impact',
      date: '2026-01-20',
      author: 'Stella commandante',
      excerpt: 'Une partie des bénéfices de nos unions romantiques à Nosy Be est désormais allouée à la réhabilitation des refuges animaliers locaux via MiaouMiaou-OuafOuaf.',
      content: 'Le tourisme de luxe doit être durable et porteur de sens. Fidèle à cette conviction, IMUIA interconnecte ses plateformes : pour chaque mariage d\'exception planifié sur Mariage-Madagascar.com, nous reversons des fonds d\'acheminement médical et de nourriture au profit des dispensaires animaliers isolés de la Grande Île, en collaboration étroite avec le pôle MiaouMiaou-OuafOuaf.com.'
    },
    {
      id: 'art-4',
      title: 'L\'Île de Beauté sous un Nouvel Angle : Immersion 3D Corsica',
      cat: 'immo',
      catLabel: 'Immobilier Corse',
      date: '2026-02-28',
      author: 'Conseiller Jean',
      excerpt: 'Immo Neuf Corse et Investir Immobilier Corse s\'associent pour proposer des visites virtuelles orbitales de résidences de standing à Bastia et Ajaccio.',
      content: 'Les investisseurs internationaux peuvent désormais visiter leurs futurs appartements de standing sans quitter leur terminal. Grâce au moteur de modélisation WebGL d\'IMUIA, nos plateformes Corses intègrent des visites immersives en trois dimensions permettant d\'analyser l\'exposition solaire, l\'agencement intérieur, et d\'estimer la rentabilité locative Pinel/LMNP à distance de manière totalement fiable.'
    }
  ];

  const filteredArticles = activeCat === 'all'
    ? articles
    : articles.filter(a => a.cat === activeCat);

  return (
    <div className="relative min-h-[calc(100vh-80px)] py-12 px-4 space-y-12">
      <div className="absolute inset-0 stars-bg opacity-30 pointer-events-none"></div>

      <div className="text-center max-w-3xl mx-auto space-y-4 relative z-10">
        <h2 className="text-xs font-orbitron font-bold text-cyan-400 tracking-widest uppercase flex items-center justify-center space-x-2">
          <BookOpen className="w-4 h-4" />
          <span>Magazine d'innovation &amp; Actus</span>
        </h2>
        <h1 className="text-3xl md:text-5xl font-black font-orbitron uppercase text-white leading-tight">
          {t.navNews}
        </h1>
        <p className="text-sm md:text-base text-gray-400 leading-relaxed font-light">
          {t.blogSubtitle}
        </p>
      </div>

      {/* Category selector */}
      <div className="flex flex-wrap justify-center gap-2 relative z-10 max-w-4xl mx-auto">
        {(['all', 'launch', 'tech', 'impact', 'immo'] as const).map((cat) => (
          <button
            key={cat}
            onClick={() => { setActiveCat(cat); playSound('click'); }}
            className={`px-4 py-1.5 rounded-full text-xs font-bold font-orbitron tracking-widest uppercase transition-all duration-200 cursor-none ${
              activeCat === cat
                ? 'bg-purple-600 text-white'
                : 'bg-white/5 text-gray-400 hover:text-white hover:bg-white/10'
            }`}
          >
            {cat === 'all' ? (language === 'fr' ? 'Tous les articles' : 'All articles') : cat.toUpperCase()}
          </button>
        ))}
      </div>

      {/* Grid articles layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto relative z-10 text-left">
        {filteredArticles.map((art) => (
          <article
            key={art.id}
            onMouseEnter={() => playSound('hover')}
            className="glass-panel p-6 rounded-3xl border border-white/5 hover:border-purple-500/30 transition-all duration-300 flex flex-col justify-between space-y-4"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between text-[11px] font-mono text-cyan-400">
                <span className="flex items-center space-x-1">
                  <Tag className="w-3 h-3" />
                  <span>{art.catLabel}</span>
                </span>
                <span className="flex items-center space-x-1">
                  <Calendar className="w-3 h-3" />
                  <span>{art.date}</span>
                </span>
              </div>

              <h3 className="text-xl font-bold font-orbitron text-white leading-tight">
                {art.title}
              </h3>

              <p className="text-xs text-gray-400 leading-relaxed font-light">
                {art.excerpt}
              </p>

              {/* Collapsed Complete Text details */}
              <div className="p-4 rounded-xl bg-purple-500/5 border border-purple-500/10 text-xs text-gray-300 leading-relaxed font-light">
                {art.content}
              </div>
            </div>

            <div className="border-t border-white/5 pt-4 flex items-center justify-between text-[10px] font-mono text-gray-500">
              <span className="flex items-center space-x-1">
                <User className="w-3.5 h-3.5" />
                <span>{art.author}</span>
              </span>
              <span className="text-purple-400 font-bold uppercase tracking-wider">
                IMUIA Flight Crew
              </span>
            </div>

          </article>
        ))}
      </div>
    </div>
  );
};
