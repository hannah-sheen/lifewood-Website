import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ChevronDown, Menu, X } from 'lucide-react';
import lifewoodLogo from '../assets/lifewood-logo.avif';

const NAV_ITEMS = [
  { label: 'Home', path: '/' },
  { label: 'Philanthropy & Impact', path: '/philanthropy' },
  { label: 'AI Initiatives', path: '/ai-initiatives' },
  { label: 'Careers', path: '/careers' },
  { label: 'Contact Us', path: '/contact' },
];

const DROPDOWNS = [
  {
    label: 'Our Company',
    items: [
      { label: 'About Us', path: '/about' },
      { label: 'Team', path: '/team' },
    ],
  },
  {
    label: 'What We Offer',
    items: [
      { label: 'Services', path: '/services' },
      { label: 'Products', path: '/products' },
    ],
  },
];

const gradientBar = 'linear-gradient(90deg, #133020, #FFB347)';

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  const isActive = (path: string) => location.pathname === path;
  const isDropdownActive = (items: { path: string }[]) =>
    items.some((item) => location.pathname === item.path);

  const handleNav = (path: string) => {
    navigate(path);
    setMenuOpen(false);
    setOpenDropdown(null);
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

          {DROPDOWNS.map(({ label, items }) => {
            const active = isDropdownActive(items);
            return (
              <div key={label} className="group relative inline-flex flex-col items-center cursor-pointer gap-1">
                <div className={`flex items-center gap-1 text-sm font-medium whitespace-nowrap transition-colors duration-200 ${active ? 'text-darkSerpent' : 'text-darkSerpent/50 group-hover:text-darkSerpent'}`}>
                  {label}
                  <ChevronDown className="w-3.5 h-3.5 transition-transform duration-200 group-hover:rotate-180" />
                </div>
                <span className="h-[3px] rounded-full transition-all duration-300" style={{ background: gradientBar, width: active ? '100%' : '0%' }} />
                <div className="absolute left-0 top-full mt-2 w-48 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 translate-y-1 group-hover:translate-y-0 z-50">
                  <div className="bg-seaSalt border border-gray-100 rounded-lg shadow-xl overflow-hidden">
                    {items.map((item) => (
                      <div
                        key={item.path}
                        onClick={() => handleNav(item.path)}
                        className={`block px-4 py-2.5 text-sm font-medium transition-colors duration-150 cursor-pointer ${isActive(item.path) ? 'text-darkSerpent bg-saffaron/20 border-l-2 border-saffaron' : 'text-darkSerpent/70 hover:text-darkSerpent hover:bg-gray-100'}`}
                      >
                        {item.label}
                      </div>
                    ))}
                  </div>
                </div>
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

          {DROPDOWNS.map(({ label, items }) => (
            <div key={label}>
              <div
                onClick={() => setOpenDropdown(openDropdown === label ? null : label)}
                className="py-2.5 text-sm font-medium cursor-pointer border-b border-gray-100 text-darkSerpent/60 flex items-center justify-between"
              >
                {label}
                <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${openDropdown === label ? 'rotate-180' : ''}`} />
              </div>
              {openDropdown === label && (
                <div className="pl-4 flex flex-col gap-1 mt-1">
                  {items.map((item) => (
                    <div
                      key={item.path}
                      onClick={() => handleNav(item.path)}
                      className={`py-2 text-sm cursor-pointer ${isActive(item.path) ? 'text-darkSerpent font-medium' : 'text-darkSerpent/50'}`}
                    >
                      {item.label}
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
    </nav>
  );
}