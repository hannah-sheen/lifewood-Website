import { useState, useRef } from 'react';
import Animate from '../components/Animate.tsx';
import OperationsMap from '../components/OperationsMap.tsx';
import partnershipImg from '../assets/partnership.jpeg';
import applicationImg from '../assets/application.jpeg';
import expandingImg from '../assets/expanding.jpeg';

const CARDS = [
  {
    label: 'Partnership', title: 'Building Together',
    desc: 'In partnership with our philanthropic partners, Lifewood has expanded operations across Africa and Bangladesh — bringing our methods and experience directly to communities that need it most.',
    bg: 'bg-castletonGreen', text: 'text-white', sub: 'text-white/60', img: partnershipImg,
  },
  {
    label: 'Application', title: 'Methods & Experience',
    desc: 'The development of people in under resourced economies requires the deliberate application of our methods and experience. We bring proven approaches to each community.',
    bg: 'bg-lightGreen', text: 'text-white', sub: 'text-white/60', img: applicationImg,
  },
  {
    label: 'Expanding', title: 'Sustainable Change',
    desc: 'We are expanding access to training, establishing equitable wage structures and career and leadership progression to create sustainable change.',
    bg: 'bg-saffaron', text: 'text-darkSerpent', sub: 'text-darkSerpent/60', img: expandingImg,
  },
];

// Country data with flags and coordinates
const COUNTRIES_WITH_COORDS = [
  { name: 'South Africa', flag: '🇿🇦', coords: [28.0473, -26.1958], city: 'Johannesburg' },
  { name: 'Nigeria', flag: '🇳🇬', coords: [3.3792, 6.5244], city: 'Lagos' },
  { name: 'Republic of the Congo', flag: '🇨🇬', coords: [15.2429, -4.2634], city: 'Brazzaville' },
  { name: 'Democratic Republic of the Congo', flag: '🇨🇩', coords: [15.4068, -4.4419], city: 'Kinshasa' },
  { name: 'Ghana', flag: '🇬🇭', coords: [-0.186964, 5.6037], city: 'Accra' },
  { name: 'Madagascar', flag: '🇲🇬', coords: [47.5079, -18.8792], city: 'Antananarivo' },
  { name: 'Benin', flag: '🇧🇯', coords: [2.6323, 6.4969], city: 'Porto-Novo' },
  { name: 'Uganda', flag: '🇺🇬', coords: [32.5825, 0.3136], city: 'Kampala' },
  { name: 'Kenya', flag: '🇰🇪', coords: [36.8219, -1.2921], city: 'Nairobi' },
  { name: 'Ivory Coast', flag: '🇨🇮', coords: [-4.0083, 5.3599], city: 'Abidjan' },
  { name: 'Egypt', flag: '🇪🇬', coords: [31.2357, 30.0444], city: 'Cairo' },
  { name: 'Ethiopia', flag: '🇪🇹', coords: [38.7578, 8.9806], city: 'Addis Ababa' },
  { name: 'Niger', flag: '🇳🇪', coords: [2.1254, 13.5127], city: 'Niamey' },
  { name: 'Tanzania', flag: '🇹🇿', coords: [39.2022, -6.7924], city: 'Dar es Salaam' },
  { name: 'Namibia', flag: '🇳🇦', coords: [17.0846, -22.5609], city: 'Windhoek' },
  { name: 'Zambia', flag: '🇿🇲', coords: [28.3217, -15.4167], city: 'Lusaka' },
  { name: 'Zimbabwe', flag: '🇿🇼', coords: [31.0335, -17.8252], city: 'Harare' },
  { name: 'Liberia', flag: '🇱🇷', coords: [-10.8005, 6.3106], city: 'Monrovia' },
  { name: 'Sierra Leone', flag: '🇸🇱', coords: [-13.2348, 8.4844], city: 'Freetown' },
  { name: 'Bangladesh', flag: '🇧🇩', coords: [90.4125, 23.8103], city: 'Dhaka' },
];

function ShowcaseSlider() {
  const [active, setActive] = useState(0);
  const [cursor, setCursor] = useState({ x: 0, y: 0, visible: false });
  const card = CARDS[active];
  
  return (
    <div className="w-full"
      onMouseMove={(e) => { const r = e.currentTarget.getBoundingClientRect(); setCursor({ x: e.clientX - r.left, y: e.clientY - r.top, visible: true }); }}
      onMouseLeave={() => setCursor(p => ({ ...p, visible: false }))}
      style={{ cursor: 'none' }}
    >
      <div className="grid md:grid-cols-2 gap-8 items-stretch relative">
        {cursor.visible && (
          <span className="absolute pointer-events-none z-50 rounded-full bg-saffaron" style={{
            left: cursor.x, top: cursor.y, width: 14, height: 14,
            transform: 'translate(-50%,-50%)', boxShadow: '0 0 10px 3px #FFB34788',
          }} />
        )}
        
        <div className="flex flex-col gap-4 h-[550px]">
          {CARDS.map((c, i) => {
            const isActive = i === active;
            return (
              <Animate key={i} delay={i * 100} className="flex-1">
                <div 
                  onClick={() => setActive(i)} 
                  style={{ cursor: 'none' }}
                  className={`rounded-2xl p-6 transition-all duration-300 h-full flex flex-col justify-center ${
                    isActive 
                      ? `${c.bg} shadow-xl scale-[1.02]` 
                      : 'bg-darkSerpent/20 hover:bg-darkSerpent/30 shadow-md'
                  }`}
                >
                  <span className={`text-xs font-semibold tracking-widest uppercase ${
                    isActive ? c.sub : 'text-darkSerpent/40'
                  }`}>
                    {c.label}
                  </span>
                  <h3 className={`text-xl font-semibold mt-2 mb-3 ${
                    isActive ? c.text : 'text-darkSerpent/50'
                  }`}>
                    {c.title}
                  </h3>
                  {isActive && (
                    <p className={`text-sm leading-relaxed ${c.sub} mt-2`}>
                      {c.desc}
                    </p>
                  )}
                </div>
              </Animate>
            );
          })}
        </div>
        
        <Animate delay={300} className="h-[550px]">
          <div className="relative rounded-2xl overflow-hidden h-full shadow-xl">
            <img 
              key={active} 
              src={card.img} 
              alt={card.label} 
              className="w-full h-full object-cover" 
              style={{ animation: 'fadeUp 0.4s ease' }} 
            />
            <div className={`absolute inset-0 ${card.bg} opacity-20`} />
            <div className="absolute bottom-5 left-5">
              <span className={`px-3 py-1 rounded-full text-xs font-semibold tracking-widest uppercase ${card.bg} ${card.text}`}>
                {card.label}
              </span>
            </div>
          </div>
        </Animate>
      </div>
    </div>
  );
}

export default function Philanthropy() {
  const mapRef = useRef<any>(null);
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState('vision');

  // Function to zoom to a specific country
  const zoomToCountry = (country: typeof COUNTRIES_WITH_COORDS[0]) => {
    setSelectedCountry(country.name);
    if (mapRef.current) {
      mapRef.current.zoomToCountry(country.name, country.coords[0], country.coords[1]);
    }
  };

  return (
    <div className="bg-darkSerpent min-h-screen">
      {/* Hero Section */}
      <div className="bg-darkSerpent">
        <div className="max-w-7xl mx-auto px-6 py-20">
          <div className="grid md:grid-cols-2 gap-10 items-center">
            <Animate>
              <div>
                <span className="inline-block px-4 py-1.5 bg-saffaron/20 text-saffaron text-xs font-semibold rounded-full mb-6 tracking-widest uppercase">Philanthropy & Impact</span>
                <h1 className="text-4xl font-semibold text-white leading-tight mb-6">Philanthropy and Impact</h1>
                <p className="text-white/60 text-base leading-relaxed mb-8">
                  We direct resources into education and developmental projects that create lasting change.
                  Our approach goes beyond giving: it builds sustainable growth and empowers communities for the future.
                </p>
                <a href="/contact" className="inline-block bg-saffaron text-white font-semibold px-7 py-3 rounded-2xl hover:bg-earthYellow transition-colors duration-200">
                  Contact Us
                </a>
              </div>
            </Animate>
            <Animate delay={150}>
              <div className="rounded-2xl overflow-hidden shadow-2xl aspect-video">
                <video autoPlay muted loop playsInline className="w-full h-full object-cover" src="/src/assets/Lifewood Services.mp4" />
              </div>
            </Animate>
          </div>
        </div>
      </div>

      {/* Pill Tabs */}
      <div className="bg-white border-b border-darkSerpent/10 sticky top-0 z-20 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex justify-center gap-3">
            {[
              { id: 'vision', label: 'Our Vision', icon: '👁️' },
              { id: 'how-we-work', label: 'How We Work', icon: '⚙️' },
              { id: 'where-we-operate', label: 'Where We Operate', icon: '🌍' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`
                  relative px-6 py-2.5 rounded-full transition-all duration-300 flex items-center gap-2 text-sm font-medium
                  ${activeTab === tab.id 
                    ? 'bg-darkSerpent text-white shadow-lg' 
                    : 'bg-darkSerpent/5 text-darkSerpent/60 hover:bg-darkSerpent/10 hover:text-darkSerpent'
                  }
                `}
              >
                <span className="text-base">{tab.icon}</span>
                <span>{tab.label}</span>
                {/* {activeTab === tab.id && (
                  <span className="absolute -bottom-px left-0 right-0 h-0.5 bg-saffaron rounded-full" />
                )} */}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Tab Content - Our Vision */}
      {activeTab === 'vision' && (
        <div className="bg-white">
         <div className="max-w-7xl mx-auto px-6 py-20">
           <div className="mb-16">
             <Animate>
               <span className="inline-block px-4 py-1.5 bg-saffaron/20 text-saffaron text-xs font-semibold rounded-full mb-6 tracking-widest uppercase">Our Vision</span>
             </Animate>
             <Animate delay={100}>
               <h2 className="text-4xl font-semibold text-darkSerpent leading-tight max-w-3xl mb-6">
                 Financial investment solving global challenges
               </h2>
             </Animate>
             <Animate delay={200}>
               <p className="text-darkSerpent/60 text-base leading-relaxed max-w-2xl">
                 We envision a world where strategic investment drives social and environmental transformation across Africa and the Indian sub-continent.
               </p>
             </Animate>
           </div>
          
           <div className="grid md:grid-cols-2 gap-6">
             <Animate delay={100}>
               <div className="bg-darkSerpent rounded-2xl p-10 text-white shadow-lg md:row-span-2 flex flex-col justify-between h-full">
                 <div>
                   <h3 className="text-2xl font-semibold mb-4">Transforming Communities</h3>
                   <p className="text-white/80 leading-relaxed mb-6">
                     Through purposeful partnerships and sustainable investment, we empower communities to create lasting economic and social transformation. We bring proven methods and experience directly to those who need it most.
                   </p>
                   <div className="w-12 h-1 bg-saffaron rounded-full" />
                 </div>
                 <div className="mt-8 pt-8 border-t border-white/20">
                   <p className="text-sm text-white/70">Working with new intelligence for a better world</p>
                 </div>
               </div>
             </Animate>

             <div className="space-y-6">
               <div className="grid grid-cols-2 gap-4">
                 {[
                  { num: '20+', label: 'Countries' },
                  { num: '2004', label: 'Founded' },
                  { num: '56K+', label: 'Resources' },
                  { num: '40+', label: 'Centers' },
                ].map((s, i) => (
                  <Animate key={i} delay={150 + (i * 50)}>
                    <div className="bg-darkSerpent/5 rounded-xl p-6 hover:bg-darkSerpent/10 transition-colors duration-300 border border-darkSerpent/10 h-full">
                      <div className="text-3xl font-bold text-saffaron mb-2">{s.num}</div>
                      <div className="text-darkSerpent text-xs font-medium uppercase tracking-wide">{s.label}</div>
                    </div>
                  </Animate>
                ))}
              </div>

              <Animate delay={350}>
                <div className="bg-darkSerpent/5 rounded-2xl p-8 border border-darkSerpent/10">
                  <h3 className="text-lg font-semibold text-darkSerpent mb-6">Impact Areas</h3>
                  <div className="space-y-4">
                    {[
                      { icon: '🌍', title: 'Social Investment', desc: 'Education and community development' },
                      { icon: '💚', title: 'Environmental', desc: 'Sustainable growth initiatives' },
                      { icon: '🤝', title: 'Partnerships', desc: 'Collaborative solutions' },
                    ].map((item, i) => (
                      <div key={i} className="flex gap-4">
                        <div className="text-2xl flex-shrink-0">{item.icon}</div>
                        <div>
                          <div className="font-semibold text-darkSerpent text-sm">{item.title}</div>
                          <div className="text-darkSerpent/60 text-xs">{item.desc}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </Animate>
            </div>
          </div>
        </div>
      </div>
      )}

      {/* Tab Content - How We Work */}
      {activeTab === 'how-we-work' && (
        <div className="bg-white">
          <div className="max-w-7xl mx-auto px-6 py-20">
            <Animate>
              <h2 className="text-3xl font-semibold text-darkSerpent text-center mb-12">How We Work</h2>
            </Animate>
            <ShowcaseSlider />
          </div>
        </div>
      )}

      {/* Tab Content - Where We Operate */}
      {activeTab === 'where-we-operate' && (
        <div className="bg-white">
          <div className="max-w-7xl mx-auto px-6 py-20">
            <div className="text-center mb-8">
              <Animate>
                <h2 className="text-3xl font-semibold text-darkSerpent mb-2">Where We Operate</h2>
              </Animate>
              <Animate delay={100}>
                <p className="text-darkSerpent/70 max-w-xl mx-auto text-sm">
                  Lifewood has expanded operations in the following countries in partnership with our philanthropic partners.
                </p>
              </Animate>
            </div>
            
            <div className="grid lg:grid-cols-4 gap-6">
              {/* Map Container */}
              <Animate delay={150} className="lg:col-span-3">
                <div className="rounded-2xl overflow-hidden bg-darkSerpent shadow-xl" style={{ minHeight: '550px', height: '550px' }}>
                  <OperationsMap ref={mapRef} selectedCountry={selectedCountry} />
                </div>
              </Animate>
              
              {/* Scrollable Country List */}
              <Animate delay={200}>
                <div className="lg:col-span-1 bg-darkSerpent/5 rounded-2xl shadow-xl overflow-hidden border border-darkSerpent/10">
                  <div className="p-3 bg-darkSerpent text-white">
                    <h3 className="font-semibold text-sm flex items-center gap-2">
                      <span>🌍</span> 
                      Countries ({COUNTRIES_WITH_COORDS.length})
                    </h3>
                    <p className="text-white/60 text-xs mt-1">Click to zoom</p>
                  </div>
                  
                  <div className="h-[calc(550px-70px)] overflow-y-auto custom-scrollbar">
                    {COUNTRIES_WITH_COORDS.map((country, index) => (
                      <button
                        key={index}
                        onClick={() => zoomToCountry(country)}
                        className={`w-full text-left px-3 py-2 transition-all duration-200 flex items-center gap-2 hover:bg-darkSerpent/10 border-b border-darkSerpent/10 last:border-0 ${
                          selectedCountry === country.name ? 'bg-darkSerpent/20' : ''
                        }`}
                      >
                        <span className="text-xl">{country.flag}</span>
                        <div className="flex-1 min-w-0">
                          <div className={`font-medium text-xs truncate ${selectedCountry === country.name ? 'text-saffaron' : 'text-darkSerpent'}`}>
                            {country.name}
                          </div>
                          <div className="text-xs text-darkSerpent/40 truncate">{country.city}</div>
                        </div>
                        <span className="text-darkSerpent/20 text-xs flex-shrink-0">📍</span>
                      </button>
                    ))}
                  </div>
                </div>
              </Animate>
            </div>
          </div>
        </div>
      )}

      {/* Custom Scrollbar Styles */}
      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(0, 0, 0, 0.05);
          border-radius: 10px;
        }
        
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #FFB347;
          border-radius: 10px;
        }
        
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #FFC370;
        }
        
        @keyframes fadeUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}