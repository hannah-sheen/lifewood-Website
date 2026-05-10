import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import lifewoodLogo from '../assets/lifewood-logo.avif';

const NAV_ITEMS = [
  { label: 'Home', path: '/' },
  { label: 'AI Solutions', path: '/solutions' },
  { label: 'Services', path:'/services' },
  { label: 'Careers', path: '/careers' },
  { label: 'About Us', path: '/about' },
  { label: 'Contact Us', path: '/contact' },
];

const gradientBar = 'linear-gradient(90deg, #133020, #FFB347)';

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  const isActive = (path: string) => location.pathname === path;

  const handleNavigation = (path: string) => {
    navigate(path);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <nav className="bg-seaSalt sticky top-0 z-50 shadow-md border-b border-darkSerpent/5">

      {/* Desktop */}
      <div className="w-full px-8 lg:px-14 flex items-center justify-between h-15">

        {/* Logo */}
        <div className="flex-1">
          <img
            src={lifewoodLogo}
            alt="Lifewood"
            className="shrink-0 cursor-pointer opacity-95 hover:opacity-100 transition-opacity h-10 w-auto"
            onClick={() => handleNavigation('/')}
          />
        </div>

        {/* Nav Links - Centered */}
        <div className="hidden lg:flex items-center justify-center gap-8 flex-1">
          {NAV_ITEMS.map(({ label, path }) => {
            const active = isActive(path);
            return (
              <div
                key={path}
                onClick={() => handleNavigation(path)}
                className="group relative inline-flex flex-col items-center cursor-pointer gap-1.5 py-1"
              >
                <span className={`text-sm whitespace-nowrap transition-colors duration-200 ${
                  active ? 'text-darkSerpent font-semibold' : 'text-darkSerpent/50 font-medium group-hover:text-darkSerpent'
                }`}>
                  {label}
                </span>
                <span
                  className="h-[2.5px] rounded-full transition-all duration-300"
                  style={{ background: gradientBar, width: active ? '100%' : '0%' }}
                />
              </div>
            );
          })}
        </div>

        {/* Right side - empty div to balance the layout */}
        <div className="flex-1 flex justify-end">
          {/* Hamburger */}
          <button
            className="lg:hidden p-2 text-darkSerpent cursor-pointer"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <div className={`transition-transform duration-300 ${menuOpen ? 'rotate-90' : 'rotate-0'}`}>
              {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </div>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`lg:hidden bg-seaSalt border-t border-gray-100 px-8 overflow-hidden transition-all duration-300 ease-in-out ${
        menuOpen ? 'max-h-[600px] py-5 opacity-100' : 'max-h-0 py-0 opacity-0'
      }`}>
        {NAV_ITEMS.map(({ label, path }) => (
          <div
            key={path}
            onClick={() => { handleNavigation(path); setMenuOpen(false); }}
            className={`py-3 text-sm font-medium cursor-pointer border-b border-gray-100 last:border-0 ${
              isActive(path) ? 'text-darkSerpent' : 'text-darkSerpent/60'
            }`}
          >
            {label}
          </div>
        ))}
      </div>
    </nav>
  );
}