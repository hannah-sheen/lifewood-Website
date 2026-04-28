import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import lifewoodLogo from '../assets/lifewood-logo.avif';

const NAV_ITEMS = [
  { label: 'Home', path: '/' },
  { label: 'AI Solutions', path: '/solutions' },  
  { label: 'Careers', path: '/careers' },
  { label: 'Contact Us', path: '/contact' },
  { label: 'About Us', path: '/about' },
  { label: 'Services', path: '/services' },
];

const gradientBar = 'linear-gradient(90deg, #133020, #FFB347)';

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  const isActive = (path: string) => location.pathname === path;

  const handleNav = (path: string) => {
    navigate(path);
    setMenuOpen(false);
  };

  return (
    <nav className="bg-seaSalt sticky top-0 z-50 shadow-lg">
      <div className="w-full px-6 lg:px-10 flex items-center justify-between h-16">

        {/* Logo */}
        <img
          src={lifewoodLogo}
          alt="Lifewood"
          className="shrink-0 cursor-pointer opacity-95 hover:opacity-100 transition-opacity h-10 w-auto"
          onClick={() => handleNav('/')}
        />

        {/* Desktop Nav */}
        <div className="hidden lg:flex items-center gap-5">
          {NAV_ITEMS.map(({ label, path }) => {
            const active = isActive(path);
            return (
              <div
                key={path}
                onClick={() => handleNav(path)}
                className="group relative inline-flex flex-col items-center cursor-pointer gap-1"
              >
                <span className={`text-sm font-medium whitespace-nowrap transition-colors duration-200 ${active ? 'text-darkSerpent' : 'text-darkSerpent/50 group-hover:text-darkSerpent'}`}>
                  {label}
                </span>
                <span className="h-[3px] rounded-full transition-all duration-300" style={{ background: gradientBar, width: active ? '100%' : '0%' }} />
              </div>
            );
          })}
        </div>

        {/* Hamburger */}
        <button className="lg:hidden p-2 text-darkSerpent transition-transform duration-300" onClick={() => setMenuOpen(!menuOpen)}>
          <div className={`transition-transform duration-300 ${menuOpen ? 'rotate-90' : 'rotate-0'}`}>
            {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </div>
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`lg:hidden bg-seaSalt border-t border-gray-100 px-6 overflow-hidden transition-all duration-300 ease-in-out ${
          menuOpen ? 'max-h-[600px] py-4 opacity-100' : 'max-h-0 py-0 opacity-0'
        }`}
      >
        {NAV_ITEMS.map(({ label, path }) => (
          <div
            key={path}
            onClick={() => handleNav(path)}
            className={`py-2.5 text-sm font-medium cursor-pointer border-b border-gray-100 ${isActive(path) ? 'text-darkSerpent' : 'text-darkSerpent/60'}`}
          >
            {label}
          </div>
        ))}
      </div>
    </nav>
  );
}