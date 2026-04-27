import { useState, useRef } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Philanthropy from './pages/Philantrophy';
import SplashScreen from './components/SplashScreen';

function App() {
  const [entered, setEntered] = useState(false);
  const playVideoRef = useRef<(() => void) | null>(null);

  const handleEnter = () => {
    if (playVideoRef.current) playVideoRef.current();
    setEntered(true);
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
  };

  return (
    <BrowserRouter>
      {/* Splash sits on top while home loads underneath */}
      {!entered && <SplashScreen onEnter={handleEnter} />}

      <div style={{ opacity: entered ? 1 : 0, transition: 'opacity 0.8s ease' }}>
        {entered && <Navbar />}

        {/* Pre-mount Home so video loads during splash, hide other pages until entered */}
        {!entered ? (
          <Home playVideoRef={playVideoRef} />
        ) : (
          <Routes>
            <Route path="/" element={<Home playVideoRef={playVideoRef} />} />
            <Route path="/about" element={<About />} />
            <Route path="/philanthropy" element={<Philanthropy />} />
          </Routes>
        )}

        {entered && <Footer />}
      </div>
    </BrowserRouter>
  );
}

export default App;
