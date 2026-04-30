import { useState, useEffect, useRef } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import SplashScreen from './components/SplashScreen';
import Home from './pages/Home';
import About from './pages/About';
import Solutions from './pages/Solutions';
import Careers from './pages/Careers';
import Navbar from './components/Navbar';
import Contact from './pages/Contact';
import Footer from './components/Footer';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return null;
}

export default function App() {
  const [progress, setProgress] = useState(0);
  const [hasEntered, setHasEntered] = useState(false);
  const playVideoRef = useRef<(() => void) | null>(null);

  const SCROLL_LENGTH = 800; 

  useEffect(() => {
    // If the user hasn't entered yet, we handle the circle expansion
    const handleScroll = () => {
      if (hasEntered) return;

      const scrollY = window.scrollY;
      const raw = Math.min(scrollY / SCROLL_LENGTH, 1);
      
      let mappedProgress = 0;
      if (raw <= 0.2) {
        mappedProgress = 0;
      } else if (raw > 0.2 && raw <= 0.35) {
        // The "Sneak Peak" glimpse
        const stageProgress = (raw - 0.2) / 0.15;
        mappedProgress = stageProgress * 0.12; 
      } else {
        // The Expand
        const stageProgress = Math.min((raw - 0.35) / 0.55, 1);
        mappedProgress = 0.12 + (stageProgress * 0.88);
      }
      
      setProgress(mappedProgress);

      // Once raw scroll hits the end, we trigger the "Permanent Entry"
      if (raw >= 1) {
        setHasEntered(true);
        // We reset the scroll so the Home page starts at the top
        window.scrollTo(0, 0);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [hasEntered]);

  return (
    <BrowserRouter>
      {/* 1. THE GATE: This only renders until the circle is finished */}
      {!hasEntered && (
        <>
          {/* Invisible depth to allow scrolling the splash */}
          <div style={{ height: `calc(100vh + ${SCROLL_LENGTH}px)` }} className="absolute inset-0 z-0" />
          
          {/* The Black Background with Logo */}
          <div className="fixed inset-0 z-10 bg-black flex items-center justify-center">
            <SplashScreen progress={progress} />
          </div>

          {/* The Expanding Lens (fixed on top) */}
          <div 
            className="fixed inset-0 z-20 pointer-events-none"
            style={{
              clipPath: `circle(${progress * 150}vmax at 50% 50%)`,
              backgroundColor: '#000',
              transition: 'clip-path 0.1s ease-out'
            }}
          >
            {/* We show a "preview" of Home inside the circle */}
            <Home playVideoRef={playVideoRef} />
          </div>
        </>
      )}

      {/* 2. THE ACTUAL WEBSITE: Renders normally once entered */}
      {hasEntered && (
        <div className="relative z-30 animate-in fade-in duration-700">
          <ScrollToTop />
          <Navbar />
          <main>
            <Routes>
              <Route path="/" element={<Home playVideoRef={playVideoRef} />} />
              <Route path="/about" element={<About />} />
              <Route path="/solutions" element={<Solutions />} />
              <Route path="/careers" element={<Careers />} />
              <Route path="/contact" element={<Contact />} />
            </Routes>
          </main>
          <Footer />
        </div>
      )}
    </BrowserRouter>
  );
}