import React from 'react';
import { AppStateProvider, useAppState } from './data/AppState';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { Cursor } from './components/Cursor';
import { CookieBanner } from './components/CookieBanner';
import { EarthContact } from './components/EarthContact';

// Pages
import { Home } from './pages/Home';
import { UniverseMap } from './pages/UniverseMap';
import { Platforms } from './pages/Platforms';
import { Labs } from './pages/Labs';
import { VisionMethod } from './pages/VisionMethod';
import { Territories } from './pages/Territories';
import { Partners } from './pages/Partners';
import { Journal } from './pages/Journal';
import { ClientSpace } from './pages/ClientSpace';
import { AdminCockpit } from './pages/AdminCockpit';
import { Legals } from './pages/Legals';

import './App.css';

const MainLayout: React.FC = () => {
  const { activeSection } = useAppState();

  const renderSection = () => {
    switch (activeSection) {
      case 'home':
        return <Home />;
      case 'universe':
        return <UniverseMap />;
      case 'platforms':
        return <Platforms />;
      case 'labs':
        return <Labs />;
      case 'vision':
        return <VisionMethod />;
      case 'territories':
        return <Territories />;
      case 'partners':
        return <Partners />;
      case 'news':
        return <Journal />;
      case 'client':
        return <ClientSpace />;
      case 'admin':
        return <AdminCockpit />;
      case 'privacy':
        return <Legals mode="privacy" />;
      case 'legal':
        return <Legals mode="legal" />;
      case 'cookies':
        return <Legals mode="cookies" />;
      default:
        return <Home />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-between relative overflow-hidden transition-colors duration-500 bg-slate-950 text-gray-100 dark:bg-[#03000a] light:bg-[#f8fafc] light:text-slate-900 cursor-none">
      {/* Background aesthetic blobs */}
      <div className="absolute top-10 right-10 w-[450px] h-[450px] bg-purple-900/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-20 left-10 w-[400px] h-[400px] bg-indigo-900/10 rounded-full blur-3xl pointer-events-none"></div>

      <Cursor />

      <div>
        <Header />
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          {renderSection()}
        </main>
      </div>

      <EarthContact />
      <CookieBanner />
      <Footer />
    </div>
  );
};

export default function App() {
  return (
    <AppStateProvider>
      <MainLayout />
    </AppStateProvider>
  );
}
