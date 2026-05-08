import { useState, useEffect, useRef } from 'react';
import { BrowserRouter, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { Toaster } from 'sonner';
import SplashScreen from './components/SplashScreen';
import Home from './pages/Home';
import About from './pages/About';
import Solutions from './pages/Solutions';
import Careers from './pages/Careers';
import Navbar from './components/Navbar';
import Contact from './pages/Contact';
import Services from './pages/Services';
import LoginPage from './pages/login/Login';
import Dashboard from './pages/dashboard/Dashboard';
import Footer from './components/Footer';
import PrivacyPolicy from './pages/legal/PrivacyPolicy';
import CookiePolicy from './pages/legal/CookiePolicy';
import TermsAndConditions from './pages/legal/TermsAndConditions';
import CookieBanner from './components/CookieBanner';
import ProtectedRoute from './components/ProtectedRoute';
import NotFound from './pages/NotFound';

const ADMIN_LOGIN_PATH = import.meta.env.VITE_ADMIN_LOGIN_PATH;
const SECRET_KEY = import.meta.env.VITE_ADMIN_SECRET_KEY;

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return null;
}

// Component that checks URL for security key
function AdminRoute({ children }: { children: React.ReactNode }) {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const key = searchParams.get('key');
  
  // Check if key is valid
  const isValid = key === SECRET_KEY;
  
  // Store in session for dashboard access
  if (isValid && !sessionStorage.getItem('admin_access')) {
    sessionStorage.setItem('admin_access', 'true');
  }
  
  // Redirect to home if no valid key
  if (!isValid && !sessionStorage.getItem('admin_access')) {
    return <Navigate to="/" replace />;
  }
  
  return <>{children}</>;
}

function SiteLayout({ children, hasEntered, onShowCookieBanner }: any) {
  const location = useLocation();
  const isAdminLogin = location.pathname === ADMIN_LOGIN_PATH;
  const isDashboard = location.pathname === '/dashboard';
  const isNotFound = ![
    '/', '/about', '/solutions', '/careers', '/contact', '/services',
    '/privacy-policy', '/cookie-policy', '/terms-and-conditions', ADMIN_LOGIN_PATH, '/dashboard'
  ].includes(location.pathname);
  const showNavFooter = !isAdminLogin && !isDashboard && !isNotFound;

  if (!hasEntered && !showNavFooter) return null;

  return (
    <div className="relative z-30 animate-in fade-in duration-700">
      <ScrollToTop />
      {showNavFooter && <Navbar />}
      <main>{children}</main>
      {showNavFooter && <Footer onShowCookieBanner={onShowCookieBanner} />}
    </div>
  );
}

export default function App() {
  const [progress, setProgress] = useState(0);
  const [hasEntered, setHasEntered] = useState(() => !!sessionStorage.getItem('splashDone'));
  const [cookieVisible, setCookieVisible] = useState(false);
  const playVideoRef = useRef<(() => void) | null>(null);

  const SCROLL_LENGTH = 800;

  useEffect(() => {
    if (!hasEntered && window.location.pathname !== '/') {
      window.history.replaceState(null, '', '/');
    }
  }, []);

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
        sessionStorage.setItem('splashDone', '1');
        setHasEntered(true);
        window.scrollTo(0, 0);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [hasEntered]);

  return (
    <BrowserRouter>
      <CookieBanner visible={cookieVisible} onClose={() => setCookieVisible(false)} />
      <Toaster position="bottom-right" expand={false} visibleToasts={3} richColors />
      
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

      <SiteLayout hasEntered={hasEntered} onShowCookieBanner={() => setCookieVisible(true)}>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home playVideoRef={playVideoRef} />} />
          <Route path="/about" element={<About />} />
          <Route path="/solutions" element={<Solutions />} />
          <Route path="/careers" element={<Careers />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/services" element={<Services />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/cookie-policy" element={<CookiePolicy />} />
          <Route path="/terms-and-conditions" element={<TermsAndConditions />} />
          
          {/* Secret Admin Route - Key in URL */}
          <Route 
            path={ADMIN_LOGIN_PATH} 
            element={
              <AdminRoute>
                <LoginPage />
              </AdminRoute>
            } 
          />
          
          <Route 
            path="/dashboard" 
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            } 
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </SiteLayout>
    </BrowserRouter>
  );
}