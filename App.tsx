import React, { useState } from 'react';
import Layout from './components/Layout';
import Home from './pages/Home';
import Services from './pages/Services';
import Process from './pages/Process';
import Blog from './pages/Blog';

import About from './pages/About';
import Contact from './pages/Contact';
import Privacy from './pages/Privacy';
import Terms from './pages/Terms';
import BootSequence from './components/BootSequence';
import { PageView } from './types';
import { AnimatePresence } from 'framer-motion';

function App() {
  const [currentPage, setCurrentPage] = useState<PageView>('home');
  const [bootComplete, setBootComplete] = useState(false);

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <Home onNavigate={setCurrentPage} />;
      case 'services':
        return <Services />;
      case 'process':
        return <Process />;
      case 'blog':
        return <Blog />;

      case 'about':
        return <About />;
      case 'contact':
        return <Contact />;
      case 'privacy':
        return <Privacy onNavigate={setCurrentPage} />;
      case 'terms':
        return <Terms onNavigate={setCurrentPage} />;
      default:
        return <Home onNavigate={setCurrentPage} />;
    }
  };

  return (
    <>
      <AnimatePresence mode="wait">
        {!bootComplete && (
           <BootSequence onComplete={() => setBootComplete(true)} />
        )}
      </AnimatePresence>
      
      {bootComplete && (
        <Layout currentPage={currentPage} onNavigate={setCurrentPage}>
          {renderPage()}
        </Layout>
      )}
    </>
  );
}

export default App;