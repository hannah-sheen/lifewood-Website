// import { useState, useEffect, useRef } from 'react';
// import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
// import SplashScreen from './components/SplashScreen';
// import Home from './pages/Home';
// import About from './pages/About';
// import Solutions from './pages/Solutions';
// import Careers from './pages/Careers';
// import Navbar from './components/Navbar';
// import Contact from './pages/Contact';
// import LoginPage from './pages/Login';
// import Dashboard from './pages/Dashboard';
// import Footer from './components/Footer';

// function ScrollToTop() {
//   const { pathname } = useLocation();
//   useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
//   return null;
// }


// // NEW: Layout Wrapper to handle conditional Navbar/Footer
// function SiteLayout({ children, hasEntered }: any) {
//   const location = useLocation();
//   const isLoginPage = location.pathname === '/login';

//   if (!hasEntered) return null;

//   return (
//     <div className="relative z-30 animate-in fade-in duration-700">
//       <ScrollToTop />
      
//       {/* Conditionally render Navbar and BackButton */}
//       {!isLoginPage ? <Navbar />: null}

//       <main>
//         {children}
//       </main>

//       {/* Conditionally render Footer */}
//       {!isLoginPage && <Footer />}
//     </div>
//   );
// }

// export default function App() {
//   const [progress, setProgress] = useState(0);
//   const [hasEntered, setHasEntered] = useState(false);
//   const playVideoRef = useRef<(() => void) | null>(null);

//   const SCROLL_LENGTH = 800; 

//   useEffect(() => {
//     const handleScroll = () => {
//       if (hasEntered) return;
//       const scrollY = window.scrollY;
//       const raw = Math.min(scrollY / SCROLL_LENGTH, 1);
      
//       let mappedProgress = 0;
//       if (raw <= 0.2) {
//         mappedProgress = 0;
//       } else if (raw > 0.2 && raw <= 0.35) {
//         const stageProgress = (raw - 0.2) / 0.15;
//         mappedProgress = stageProgress * 0.12; 
//       } else {
//         const stageProgress = Math.min((raw - 0.35) / 0.55, 1);
//         mappedProgress = 0.12 + (stageProgress * 0.88);
//       }
      
//       setProgress(mappedProgress);

//       if (raw >= 1) {
//         setHasEntered(true);
//         window.scrollTo(0, 0);
//       }
//     };

//     window.addEventListener('scroll', handleScroll);
//     return () => window.removeEventListener('scroll', handleScroll);
//   }, [hasEntered]);

//   return (
//     <BrowserRouter>
//       {/* 1. THE GATE */}
//       {!hasEntered && (
//         <>
//           <div style={{ height: `calc(100vh + ${SCROLL_LENGTH}px)` }} className="absolute inset-0 z-0" />
//           <div className="fixed inset-0 z-10 bg-black flex items-center justify-center">
//             <SplashScreen progress={progress} />
//           </div>
//           <div 
//             className="fixed inset-0 z-20 pointer-events-none"
//             style={{
//               clipPath: `circle(${progress * 150}vmax at 50% 50%)`,
//               backgroundColor: '#000',
//               transition: 'clip-path 0.1s ease-out'
//             }}
//           >
//             <Home playVideoRef={playVideoRef} />
//           </div>
//         </>
//       )}

//       {/* 2. THE ACTUAL WEBSITE (Wrapped in SiteLayout) */}
//       <SiteLayout hasEntered={hasEntered} playVideoRef={playVideoRef}>
//         <Routes>
//           <Route path="/" element={<Home playVideoRef={playVideoRef} />} />
//           <Route path="/about" element={<About />} />
//           <Route path="/solutions" element={<Solutions />} />
//           <Route path="/careers" element={<Careers />} />
//           <Route path="/contact" element={<Contact />} />
//           <Route path="/login" element={<LoginPage />} />
//           <Route path="/dashboard" element={<Dashboard />} />
//         </Routes>
//       </SiteLayout>
//     </BrowserRouter>
//   );
// }

import { useState, useEffect, useRef } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import SplashScreen from './components/SplashScreen';
import Home from './pages/Home';
import About from './pages/About';
import Solutions from './pages/Solutions';
import Careers from './pages/Careers';
import Navbar from './components/Navbar';
import Contact from './pages/Contact';
import LoginPage from './pages/Login';
import Dashboard from './pages/Dashboard';
import Footer from './components/Footer';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return null;
}

function SiteLayout({ children, hasEntered }: any) {
  const location = useLocation();
  const showNavFooter = !['/login', '/dashboard'].includes(location.pathname);

  if (!hasEntered) return null;

  return (
    <div className="relative z-30 animate-in fade-in duration-700">
      <ScrollToTop />
      {showNavFooter && <Navbar />}
      <main>{children}</main>
      {showNavFooter && <Footer />}
    </div>
  );
}

export default function App() {
  const [progress, setProgress] = useState(0);
  const [hasEntered, setHasEntered] = useState(false);
  const playVideoRef = useRef<(() => void) | null>(null);

  const SCROLL_LENGTH = 800; 

  useEffect(() => {
    const handleScroll = () => {
      if (hasEntered) return;
      const scrollY = window.scrollY;
      const raw = Math.min(scrollY / SCROLL_LENGTH, 1);
      
      let mappedProgress = 0;
      if (raw <= 0.2) {
        mappedProgress = 0;
      } else if (raw > 0.2 && raw <= 0.35) {
        const stageProgress = (raw - 0.2) / 0.15;
        mappedProgress = stageProgress * 0.12; 
      } else {
        const stageProgress = Math.min((raw - 0.35) / 0.55, 1);
        mappedProgress = 0.12 + (stageProgress * 0.88);
      }
      
      setProgress(mappedProgress);

      if (raw >= 1) {
        setHasEntered(true);
        window.scrollTo(0, 0);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [hasEntered]);

  return (
    <BrowserRouter>
      {!hasEntered && (
        <>
          <div style={{ height: `calc(100vh + ${SCROLL_LENGTH}px)` }} className="absolute inset-0 z-0" />
          <div className="fixed inset-0 z-10 bg-black flex items-center justify-center">
            <SplashScreen progress={progress} />
          </div>
          <div 
            className="fixed inset-0 z-20 pointer-events-none"
            style={{
              clipPath: `circle(${progress * 150}vmax at 50% 50%)`,
              backgroundColor: '#000',
              transition: 'clip-path 0.1s ease-out'
            }}
          >
            <Home playVideoRef={playVideoRef} />
          </div>
        </>
      )}

      <SiteLayout hasEntered={hasEntered}>
        <Routes>
          <Route path="/" element={<Home playVideoRef={playVideoRef} />} />
          <Route path="/about" element={<About />} />
          <Route path="/solutions" element={<Solutions />} />
          <Route path="/careers" element={<Careers />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </SiteLayout>
    </BrowserRouter>
  );
}