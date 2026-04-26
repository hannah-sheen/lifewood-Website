import { useNavigate, useLocation } from 'react-router-dom';
import { ChevronDown } from 'lucide-react';
import lifewoodLogo from '../assets/lifewood-logo.avif';

const NAV_ITEMS = [
  { label: 'Home', path: '/' },
  { label: 'Philanthropy & Impact', path: '/philanthropy' },
  { label: 'Careers', path: '/careers' },
  { label: 'Contact Us', path: '/contact' },
];

const DROPDOWNS = [
  {
    label: 'AI Initiatives',
    items: [
      { label: 'Initiative One', path: '/ai/initiative-one' },
      { label: 'Initiative Two', path: '/ai/initiative-two' },
    ],
  },
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

  const isActive = (path: string) => location.pathname === path;
  const isDropdownActive = (items: { path: string }[]) =>
    items.some((item) => location.pathname === item.path);

  return (
    <nav className="bg-seaSalt sticky top-0 z-50 shadow-lg">
      <div className="w-full px-10 flex items-center justify-between h-16">

        {/* Logo */}
        <img
          src={lifewoodLogo}
          alt="Lifewood"
          className="shrink-0 cursor-pointer opacity-95 hover:opacity-100 transition-opacity h-10 w-auto"
          onClick={() => navigate('/')}
        />

        {/* Nav Links */}
        <div className="flex items-center gap-5">

          {NAV_ITEMS.map(({ label, path }) => {
            const active = isActive(path);
            return (
              <div
                key={path}
                onClick={() => navigate(path)}
                className="group relative inline-flex flex-col items-center cursor-pointer gap-1"
              >
                <span className={`text-sm font-medium whitespace-nowrap transition-colors duration-200 ${active ? 'text-darkSerpent' : 'text-darkSerpent/50 group-hover:text-darkSerpent'}`}>
                  {label}
                </span>
                <span
                  className="h-[3px] rounded-full transition-all duration-300"
                  style={{ background: gradientBar, width: active ? '100%' : '0%' }}
                />
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
                <span
                  className="h-[3px] rounded-full transition-all duration-300"
                  style={{ background: gradientBar, width: active ? '100%' : '0%' }}
                />
                {!active && (
                  <span className="absolute bottom-0 left-1/2 -translate-x-1/2 h-[3px] w-0 rounded-full"
                    style={{ background: gradientBar }}
                  />
                )}

                {/* Dropdown panel */}
                <div className="absolute left-0 top-full mt-2 w-48 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 translate-y-1 group-hover:translate-y-0 z-50">
                  <div className="bg-seaSalt border border-gray-100 rounded-lg shadow-xl overflow-hidden">
                    {items.map((item) => (
                      <div
                        key={item.path}
                        onClick={() => navigate(item.path)}
                        className={`block px-4 py-2.5 text-sm font-medium transition-colors duration-150 cursor-pointer ${
                          isActive(item.path)
                            ? 'text-darkSerpent bg-saffaron border-l-2 border-saffaron'
                            : 'text-darkSerpent/70 hover:text-darkSerpent hover:bg-gray-100'
                        }`}
                      >
                        {item.label}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}

          {/* FAQ CTA */}
          <div
            onClick={() => navigate('/faq')}
            className={`text-sm px-5 py-2 rounded-full cursor-pointer transition-all duration-200 whitespace-nowrap ${
              isActive('/faq')
                ? 'bg-saffaron text-darkSerpent font-bold'
                : 'bg-saffaron/20 text-saffaron hover:bg-saffaron hover:text-darkSerpent font-bold'
            }`}
          >
            FAQ
          </div>
        </div>
      </div>
    </nav>
  );
}
