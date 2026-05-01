
import { useRef, useState } from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import { useScroll, useTransform, motion, useSpring } from 'framer-motion'; 
import Animate from '../components/Animate.tsx';
import OperationsMap from '../components/OperationsMap.tsx';
import partnershipImg from '../assets/partnership.jpeg';
import applicationImg from '../assets/application.jpeg';
import expandingImg from '../assets/expanding.jpeg';
import visionImg from '../assets/vision.jpeg';
import missionImg from '../assets/mission.jpeg';
import MouseTrail from '../components/MouseTrail.tsx';


const CARDS = [
  {
    label: 'Partnership', title: 'Building Together',
    desc: 'In partnership with our philanthropic partners, Lifewood has expanded operations across Africa and Bangladesh — bringing our methods and experience directly to communities that need it most.',
    bg: 'bg-darkSerpent', text: 'text-white', sub: 'text-white/60', img: partnershipImg,
  },
  {
    label: 'Application', title: 'Methods & Experience',
    desc: 'The development of people in under resourced economies requires the deliberate application of our methods and experience. We bring proven approaches to each community.',
    bg: 'bg-castletonGreen', text: 'text-white', sub: 'text-white/60', img: applicationImg,
  },
  {
    label: 'Expanding', title: 'Sustainable Change',
    desc: 'We are expanding access to training, establishing equitable wage structures and career and leadership progression to create sustainable change.',
    bg: 'bg-saffaron', text: 'text-darkSerpent', sub: 'text-darkSerpent/60', img: expandingImg,
  },
];

const CORE_VALUES = [
  { title: "Diversity", desc: "We celebrate differences in belief, philosophy and ways of life, because they bring unique perspectives and ideas that encourage everyone to move forward." },
  { title: "Caring", desc: "We care for every person deeply and equally, because without care work becomes meaningless." },
  { title: "Innovation", desc: "Innovation is at the heart of all we do, enriching our lives and challenging us to continually improve ourselves and our service." },
  { title: "Integrity", desc: "We are dedicated to act ethically and sustainably in everything we do. It is the basis of our existence as a company." }
];

const OFFICE_LOCATIONS = [
  { name: 'South Africa', lng: 28.0473, lat: -26.1958, city: 'Johannesburg', details: 'Regional HQ - 150+ employees' },
  { name: 'Nigeria', lng: 3.3792, lat: 6.5244, city: 'Lagos', details: 'West Africa Hub - 200+ employees' },
  { name: 'Kenya', lng: 36.8219, lat: -1.2921, city: 'Nairobi', details: 'East Africa Operations - 120+ employees' },
  { name: 'Egypt', lng: 31.2357, lat: 30.0444, city: 'Cairo', details: 'North Africa Base - 80+ employees' },
  { name: 'Bangladesh', lng: 90.4125, lat: 23.8103, city: 'Dhaka', details: 'South Asia HQ - 300+ employees' },
  { name: 'Republic of the Congo', lng: 15.2429, lat: -4.2634, city: 'Brazzaville', details: 'Central Africa Office - 45+ employees' },
  { name: 'DR Congo', lng: 15.4068, lat: -4.4419, city: 'Kinshasa', details: 'DRC Operations - 60+ employees' },
  { name: 'Ghana', lng: -0.186964, lat: 5.6037, city: 'Accra', details: 'West Africa Center - 90+ employees' },
  { name: 'Madagascar', lng: 47.5079, lat: -18.8792, city: 'Antananarivo', details: 'Indian Ocean Hub - 30+ employees' },
  { name: 'Benin', lng: 2.6323, lat: 6.4969, city: 'Porto-Novo', details: 'Regional Office - 25+ employees' },
  { name: 'Uganda', lng: 32.5825, lat: 0.3136, city: 'Kampala', details: 'East Africa Center - 55+ employees' },
  { name: 'Ivory Coast', lng: -4.0083, lat: 5.3599, city: 'Abidjan', details: 'West Africa Operations - 70+ employees' },
  { name: 'Ethiopia', lng: 38.7578, lat: 8.9806, city: 'Addis Ababa', details: 'Horn of Africa Hub - 40+ employees' },
  { name: 'Niger', lng: 2.1254, lat: 13.5127, city: 'Niamey', details: 'Sahel Region Office - 20+ employees' },
  { name: 'Tanzania', lng: 39.2022, lat: -6.7924, city: 'Dar es Salaam', details: 'East Africa Hub - 65+ employees' },
  { name: 'Namibia', lng: 17.0846, lat: -22.5609, city: 'Windhoek', details: 'Southern Africa Office - 35+ employees' },
  { name: 'Zambia', lng: 28.3217, lat: -15.4167, city: 'Lusaka', details: 'Central Africa Hub - 45+ employees' },
  { name: 'Zimbabwe', lng: 31.0335, lat: -17.8252, city: 'Harare', details: 'Southern Africa Hub - 50+ employees' },
  { name: 'Liberia', lng: -10.8005, lat: 6.3106, city: 'Monrovia', details: 'West Africa Office - 25+ employees' },
  { name: 'Sierra Leone', lng: -13.2348, lat: 8.4844, city: 'Freetown', details: 'West Africa Hub - 30+ employees' },
];

function ShowcaseSlider() {
  const [active, setActive] = useState(0);
  const [phase, setPhase] = useState<'idle' | 'stacking' | 'unstacking'>('idle');
  const [cursor, setCursor] = useState({ x: 0, y: 0, visible: false });

  const handleSelect = (i: number) => {
    if (i === active || phase !== 'idle') return;
    // Phase 1: stack all images together
    setPhase('stacking');
    setTimeout(() => {
      // Phase 2: set new active and unstack
      setActive(i);
      setPhase('unstacking');
      setTimeout(() => setPhase('idle'), 500);
    }, 400);
  };

 
  return (
    <div
      className="w-full"
      onMouseMove={(e) => { const r = e.currentTarget.getBoundingClientRect(); setCursor({ x: e.clientX - r.left, y: e.clientY - r.top, visible: true }); }}
      onMouseLeave={() => setCursor(p => ({ ...p, visible: false }))}
      style={{ cursor: 'none' }}
    >
      <div className="grid md:grid-cols-2 gap-8 items-center relative">
        {cursor.visible && (
          <span className="absolute pointer-events-none z-50 rounded-full bg-saffaron" style={{
            left: cursor.x, top: cursor.y, width: 14, height: 14,
            transform: 'translate(-50%,-50%)', boxShadow: '0 0 10px 3px rgba(255,179,71,0.53)',
          }} />
        )}

        {/* Left: Cards */}
        <div className="flex flex-col gap-4 h-[520px]">
          {CARDS.map((c, i) => {
            const isActive = i === active;
            return (
              <Animate key={i} delay={i * 100} className="flex-1">
                <div
                  onClick={() => handleSelect(i)}
                  className={`rounded-2xl p-6 transition-all duration-300 h-full flex flex-col justify-center cursor-none ${
                    isActive ? `${c.bg} shadow-xl scale-[1.02]` : 'bg-darkSerpent/5 hover:bg-darkSerpent/10 shadow-sm'
                  }`}
                >
                  <span className={`text-xs font-semibold tracking-widest uppercase ${isActive ? c.sub : 'text-darkSerpent/40'}`}>{c.label}</span>
                  <h3 className={`text-xl font-semibold mt-2 mb-3 ${isActive ? c.text : 'text-darkSerpent/50'}`}>{c.title}</h3>
                  {isActive && <p className={`text-sm leading-relaxed ${c.sub} mt-2`}>{c.desc}</p>}
                </div>
              </Animate>
            );
          })}
        </div>

        {/* Right: Stacked images */}
        <div className="relative h-[520px] w-full perspective-1000">
          {CARDS.map((c, i) => {
            const isActive = i === active;
            const isAhead = i < active;
            const isBehind = i > active;
            
            // Position relative to the active card
            const stackPosition = i - active;

            return (
              <motion.div
                key={i}
                className="absolute w-full h-[520px] rounded-[2rem] overflow-hidden shadow-2xl"
                initial={false}
                animate={{ 
                  // Cards already seen fly up and out
                  // Waiting cards shift down 30px to peek out
                  top: isActive ? 0 : isAhead ? -150 : stackPosition * 30,
                  
                  // Scale down back cards for depth
                  scale: isActive ? 1 : isAhead ? 0.8 : 1 - (stackPosition * 0.05),
                  
                  // Background cards stay visible but slightly faded
                  opacity: isActive ? 1 : isAhead ? 0 : 0.9,
                  
                  // Active card on top
                  zIndex: isActive ? 50 : CARDS.length - i,
                  
                  rotateX: isActive ? 0 : -5,
                }}
                transition={{ 
                  type: "spring", 
                  stiffness: 200, 
                  damping: 25 
                }}
                style={{ 
                  pointerEvents: isActive ? 'auto' : 'none',
                  transformOrigin: 'top center' 
                }}
              >
                <img 
                  src={c.img} 
                  alt={c.label} 
                  className="w-full h-full object-cover" 
                />
                
                {/* Depth overlay for images in the back */}
                {isBehind && (
                  <div className="absolute inset-0 bg-black/20" />
                )}
    
                {/* Brand color tint */}
                <div className={`absolute inset-0 ${c.bg} opacity-10`} />

                {isActive && (
                  <div className="absolute bottom-6 left-6">
                    <span className="bg-white/90 backdrop-blur-md px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-widest text-darkSerpent shadow-lg">
                      {c.label}
                    </span>
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function VideoPlayer({ src }: { src: string }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [muted, setMuted] = useState(true);
  const toggleMute = () => { if (videoRef.current) { videoRef.current.muted = !muted; setMuted(!muted); } };
  return (
    <div className="relative rounded-3xl overflow-hidden shadow-2xl aspect-video bg-darkSerpent/20">
      <video ref={videoRef} autoPlay muted loop playsInline className="w-full h-full object-cover" src={src} />
      <button onClick={toggleMute} className="absolute top-4 right-4 p-2.5 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20 transition-all">
        {muted ? <VolumeX className="w-4 h-4 text-white" /> : <Volume2 className="w-4 h-4 text-white" />}
      </button>
    </div>
  );
}

export default function About() {
  const mapRef = useRef<any>(null);
  const visionRef = useRef(null);
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null);

  const { scrollYProgress } = useScroll({
    target: visionRef,
    offset: ["start end", "end start"]
  });

  const springConfig = { stiffness: 50, damping: 20, restDelta: 0.001 };
  const rawXLeft = useTransform(scrollYProgress, [0.1, 0.4], [-250, 0]);
  const rawXRight = useTransform(scrollYProgress, [0.1, 0.4], [250, 0]);
  const rawOpacity = useTransform(scrollYProgress, [0.1, 0.3], [0, 1]);

  const xLeft = useSpring(rawXLeft, springConfig);
  const xRight = useSpring(rawXRight, springConfig);
  const opacity = useSpring(rawOpacity, springConfig);
  
  const SECTIONS = [
    { id: 'overview', label: 'Overview' },
    { id: 'vision', label: 'Vision & Mission' },
    { id: 'values', label: 'Core Values' },
    { id: 'how-we-work', label: 'How We Work' },
    { id: 'offices', label: 'Our Offices' }
  ];

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
      });
    }
  };

  const handleMapFocus = (loc: typeof OFFICE_LOCATIONS[0]) => {
    setSelectedCountry(loc.name);
    scrollToSection('offices');
    
    setTimeout(() => {
      if (mapRef.current && mapRef.current.zoomToCountry) {
        mapRef.current.zoomToCountry(loc.name, loc.lng, loc.lat);
      }
    }, 500);
  };

  return (
    <div className="bg-seaSalt min-h-screen selection:bg-saffaron/30 relative">
      
      {/* FLOATING SIDE NAV */}
      <nav className="fixed right-6 md:right-10 top-1/2 -translate-y-1/2 z-[100] hidden lg:flex flex-col gap-8">
        {SECTIONS.map((s) => (
          <button
            key={s.id}
            onClick={() => scrollToSection(s.id)}
            className="group flex items-center justify-end gap-4 outline-none"
          >
            <span className="opacity-0 group-hover:opacity-100 transition-all duration-300 text-[10px] font-black uppercase tracking-[0.2em] text-darkSerpent bg-white/90 backdrop-blur-md px-3 py-1 rounded-full shadow-md pointer-events-none translate-x-2 group-hover:translate-x-0">
              {s.label}
            </span>
            <div className="relative flex items-center justify-center">
              <div className="h-4 w-4 rounded-full border-2 border-saffaron group-hover:border-saffaron transition-all duration-300" />
              <div className="absolute h-1.5 w-1.5 rounded-full bg-earthYellow scale-0 group-hover:scale-100 transition-transform duration-300 shadow-[0_0_8px_rgba(255,179,71,0.8)]" />
            </div>
          </button>
        ))}
      </nav>

      {/* HERO SECTION */}
      <section className="pt-25 pb-20 bg-darkSerpent">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Left: Video */}
            <Animate>
              <VideoPlayer src="/src/assets/careers/Lifewood Empowering the Future Through AI 2025.mp4" />
            </Animate>
            {/* Right: Text */}
            <Animate delay={150}>
              <span className="text-saffaron font-bold text-xs uppercase tracking-[0.2em] mb-4 block">Our Story</span>
              <h1 className="text-6xl md:text-8xl font-bold tracking-tighter leading-[0.9] mb-8 text-white">
                Intelligence with <span className="text-white/30 italic">Purpose.</span>
              </h1>
              <p className="text-xl text-white/70 leading-relaxed">
                Since 2004, Lifewood has pioneered a unique model of high-performance AI data services rooted in social impact.
              </p>
            </Animate>
          </div>
        </div>
      </section>

      {/* SECTION: Overview */}
      <section id="overview" className="pt-20 pb-10 bg-seaSalt">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-start">
          <Animate>
            <span className="text-saffaron font-bold text-xs uppercase tracking-[0.2em] mb-4 block">The Lifewood Way</span>
            <h2 className="text-6xl md:text-5xl font-bold text-darkSerpent leading-tight">
              We bridge the gap between raw data and <span className="text-saffaron">actionable intelligence.</span>
            </h2>
          </Animate>
          <div className="space-y-6 text-lg text-darkSerpent/70 leading-relaxed">
            <Animate delay={100}>
              <p>
                Lifewood is a global leader in AI data technology, specializing in the precision engineering and labeling required to power the next generation of machine learning.
              </p>
              <p>
                But we are more than a tech provider. We are a social enterprise. By establishing centers in under-resourced economies, we provide thousands of individuals with high-tech skills and equitable wages.
              </p>
            </Animate>
          </div>
        </div>  
      </section>

      {/* SECTION: Vision & Mission */}
      <section id="vision" ref={visionRef} className="pt-10 pb-20 bg-seaSalt overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-15">
            <Animate>
              <span className="text-saffaron font-bold text-xs uppercase tracking-[0.2em] mb-4 block">Our Guiding Light</span>
              <h2 className="text-6xl md:text-6xl font-bold text-darkSerpent leading-tight">Vision & Mission</h2>
            </Animate>
          </div>

          <div className="flex flex-col md:flex-row gap-8 items-stretch justify-center relative min-h-[550px]">
            <motion.div 
              style={{ x: xLeft, opacity }} 
              className="flex-1 bg-darkSerpent rounded-[2rem] text-white shadow-2xl relative overflow-hidden group flex flex-col justify-end p-10 md:p-12"
            >
              <img src={visionImg} alt="Vision" className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-darkSerpent via-darkSerpent/70 to-transparent" />
              <div className="relative z-10">
                <span className="text-saffaron font-bold text-xs uppercase tracking-[0.2em] mb-4 block">The Vision</span>
                <h3 className="text-3xl md:text-4xl font-bold mb-6 leading-snug">Global champion in AI data solutions.</h3>
                <p className="text-white/60 text-base md:text-lg leading-relaxed">To ignite a culture of innovation and sustainability that enriches lives worldwide.</p>
              </div>
            </motion.div>

            <motion.div 
              style={{ x: xRight, opacity }} 
              className="flex-1 bg-seaSalt rounded-[2rem] text-darkSerpent shadow-2xl relative overflow-hidden flex flex-col justify-end p-10 md:p-12 border border-darkSerpent/10"
            >
              <img src={missionImg} alt="Mission" className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-seaSalt via-seaSalt/90 to-transparent" />
              <div className="relative z-10">
                <span className="text-saffaron font-bold text-xs uppercase tracking-[0.2em] mb-4 block">The Mission</span>
                <h3 className="text-3xl md:text-4xl font-bold mb-6 leading-snug">Empowering communities through AI.</h3>
                <p className="text-darkSerpent/60 text-base md:text-lg leading-relaxed">To develop technologies that solve real-world problems and advance sustainable practices.</p>
                <div className="w-12 h-1 bg-saffaron mt-8 transition-all duration-500" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>


      {/* SECTION: Core Values */}
      <MouseTrail id="values" bg="bg-darkSerpent" glowColor="rgba(255,179,71,0.12)" className="py-20 text-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-20">
            <Animate>
              <span className="text-saffaron font-bold text-xs uppercase tracking-[0.2em] mb-4 block">What we stand for</span>
              <h2 className="text-6xl font-bold">Core Values</h2>
            </Animate>
          </div>
          <div className="grid md:grid-cols-4 gap-8">
            {CORE_VALUES.map((v, i) => (
              <Animate key={i} delay={i * 100}>
                <div className="group">
                  <div className="text-saffaron text-sm font-bold mb-4">0{i+1}</div>
                  <h4 className="text-xl font-bold mb-4 border-b border-white/10 pb-4 group-hover:border-saffaron transition-colors">{v.title}</h4>
                  <p className="text-white/50 text-sm leading-relaxed">{v.desc}</p>
                </div>
              </Animate>
            ))}
          </div>
        </div>
      </MouseTrail>

      {/* SECTION: How We Work */}
      <section id="how-we-work" className="pt-20 pb-10 bg-seaSalt">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-10">
            <Animate>
              <div className="flex flex-col md:flex-row items-end justify-between gap-8">
                <div className="md:w-1/2 text-left">
                  <p className="text-darkSerpent/60 text-lg leading-relaxed max-w-md">
                     Our methodology for high-impact, high-quality data engineering.
                  </p>
                </div>
                <div className="md:w-1/2 text-right">
                  <span className="text-saffaron font-bold text-xs uppercase tracking-[0.2em] mb-3 block">The Process</span>
                  <h2 className="text-6xl md:text-6xl font-bold tracking-tighter text-darkSerpent">
                    How We Work
                  </h2>
                </div>
              </div>
            </Animate>
          </div>
          <ShowcaseSlider />
        </div>
      </section>

      {/* SECTION: Our Offices */}
      <section id="offices" className="py-10 pb-20 bg-seaSalt">
        <div className="max-w-7xl mx-auto px-6">
          <Animate className="mb-12">
            <div className="flex flex-col md:flex-row items-end justify-between gap-8">
              <div className="md:w-1/2 text-left">
                <span className="text-saffaron font-bold text-xs uppercase tracking-[0.2em] mb-4 block">Global Presence</span>
                <h2 className="text-6xl md:text-6xl font-bold text-darkSerpent">Our Offices</h2>
              </div>
              <div className="md:w-1/2 text-right">
                <p className="text-darkSerpent/50 text-lg leading-relaxed max-w-md ml-auto">
                  Strategic operation hubs across emerging markets, providing localized expertise and 24/7 delivery capabilities.
                </p>
              </div>
            </div>
          </Animate>

          <Animate delay={100} className="flex flex-wrap gap-3 mb-8">
            {OFFICE_LOCATIONS.map((loc, i) => (
              <button
                key={i}
                onClick={() => handleMapFocus(loc)}
                className={`px-4 py-2 rounded-full border text-[10px] font-black uppercase tracking-widest transition-all shadow-sm bg-white active:scale-95 ${
                  selectedCountry === loc.name
                    ? 'border-saffaron bg-saffaron text-darkSerpent'
                    : 'border-darkSerpent/10 text-darkSerpent hover:bg-darkSerpent hover:text-white'
                }`}
              >
                {loc.name}
              </button>
            ))}
          </Animate>

          <div className="h-[600px] rounded-[2.5rem] overflow-hidden border border-darkSerpent/5 shadow-2xl relative">
            <OperationsMap ref={mapRef} selectedCountry={selectedCountry} />
          </div>

          <div className='mt-10 text-center'>
             <Animate delay={100}>
              <p className="text-darkSerpent/60 text-lg leading-relaxed max-w-3xl mx-auto">
                With centers spanning across Africa and Asia, we maintain a 24/7 follow-the-sun model to ensure rapid delivery for our global clients.
              </p>
            </Animate>
          </div>
        </div>
      </section>
    </div>
  );
}
