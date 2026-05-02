import { useRef, useState, useEffect } from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import ContactButton from '../components/ContactButton.tsx';
import Animate from '../components/Animate.tsx';
import Button from '../components/Button.tsx';
import lifewoodRoundLogo from '../assets/lifewood-round-logo.png';
import googleLogo from '../assets/google.avif';
import microsoftLogo from '../assets/microsoft.avif';
import appleLogo from '../assets/apple.avif';
import ancestryLogo from '../assets/ancestry.avif';
import familysearchLogo from '../assets/familysearch.avif';
import byuLogo from '../assets/byu.avif';
import mooreLogo from '../assets/moore.avif';
import MouseTrail from '../components/MouseTrail.tsx';
import { motion } from 'framer-motion';

interface HomeProps {
  playVideoRef: React.MutableRefObject<(() => void) | null>;
}

const PARTNERS = [
  { src: googleLogo, alt: 'Google', url: 'https://www.google.com', height: '300px' },
  { src: microsoftLogo, alt: 'Microsoft', url: 'https://www.microsoft.com', height: '300px' },
  { src: appleLogo, alt: 'Apple', url: 'https://www.apple.com', height: '300px' },
  { src: ancestryLogo, alt: 'Ancestry', url: 'https://www.ancestry.com', height: '300px' },
  { src: familysearchLogo, alt: 'FamilySearch', url: 'https://www.familysearch.org', height: '300px' },
  { src: byuLogo, alt: 'BYU', url: 'https://www.byu.edu', height: '300px' },
  { src: mooreLogo, alt: 'Moore', url: 'https://www.moore.global', height: '200px' },
];

const STATS = [
  { num: '40+', label: 'Global Delivery Centers', desc: 'With over 40 delivery centers worldwide, Lifewood ensures seamless, high-quality data operations across every time zone — keeping your projects moving around the clock.' },
  { num: '30+', label: 'Countries Across All Continents', desc: 'A truly global presence spanning all continents, blending worldwide scale with local expertise to deliver relevant AI data solutions.' },
  { num: '50+', label: 'Languages & Dialects', desc: 'Our diverse team of native speakers covers 50+ languages and dialects, enabling precise, nuanced data annotation that reflects the richness of human communication.' },
  { num: '56,000+', label: 'Global Online Resources', desc: 'A powerful network of over 56,000 online contributors gives Lifewood the flexibility and scale to handle any data project — no matter the size, scope, or complexity.' },
];

export default function Home({ playVideoRef }: HomeProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [muted, setMuted] = useState(true);
  const [isHeroVisible, setIsHeroVisible] = useState(true);
  const heroRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (videoRef.current) videoRef.current.muted = true;
    playVideoRef.current = () => {
      if (videoRef.current) {
        videoRef.current.muted = false;
        setMuted(false);
        videoRef.current.play().catch(() => {
          videoRef.current!.muted = true;
          setMuted(true);
        });
      }
    };
  }, [playVideoRef]);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      setIsHeroVisible(entry.isIntersecting);
      if (videoRef.current) {
        if (entry.isIntersecting) videoRef.current.play();
        else videoRef.current.pause();
      }
    }, { threshold: 0.3 });
    if (heroRef.current) observer.observe(heroRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <>
      {/* HERO */}
     <section ref={heroRef} className="relative text-white min-h-screen flex items-center overflow-hidden">
      {/* BACKGROUND VIDEO */}
      <video 
        ref={videoRef} 
        autoPlay 
        loop 
        muted // Recommended to keep true by default for autoPlay compatibility
        playsInline 
        className="absolute inset-0 w-full h-full object-cover scale-105" // slight scale to prevent edge gaps
        src="/src/assets/landing_bg.mp4" 
      />
      
      {/* BRANDED OVERLAY */}
      <div className="absolute inset-0 bg-darkSerpent/70 backdrop-blur-[2px]" />

      {/* MUTE TOGGLE */}
      {isHeroVisible && (
            <button 
              onClick={() => { if (videoRef.current) { videoRef.current.muted = !muted; setMuted(!muted); } }}
              className="absolute top-8 right-8 z-20 p-4 rounded-2xl bg-white/5 hover:bg-white/10 backdrop-blur-md transition-all border border-white/10 group cursor-pointer"
            >
          {muted ? (
            <VolumeX className="w-5 h-5 text-white/60 group-hover:text-saffaron transition-colors" />
          ) : (
            <Volume2 className="w-5 h-5 text-saffaron animate-pulse" />
          )}
        </button>
      )}

      {/* CONTENT */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 text-center w-full">
        <Animate>
            <span className="text-saffaron font-bold text-xs uppercase tracking-[0.2em] mb-4 block">Intelligence with Purpose</span>
        </Animate>

        <Animate delay={100}>
          <h1 className="text-6xl md:text-[5.5rem] font-bold leading-[0.9] tracking-tighter mb-8">
            The world's leading provider <br />
            of <span className="text-saffaron">AI-powered</span> <span className="text-white/20 italic">solutions</span>
          </h1>
        </Animate>

        <Animate delay={200}>
          <p className="max-w-2xl mx-auto text-xl text-white/60 mb-12 leading-relaxed">
            Transforming raw data into actionable intelligence that drives innovation and sustainable social impact worldwide.
          </p>
        </Animate>

        <Animate delay={300}>
          <div className="flex flex-col sm:flex-row gap-5 justify-center items-center">
            <ContactButton /> {/* Ensure your ContactButton matches the new rounded-2xl style */}
            <Button
              onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
              variant="outline"
              className="border-white/20 text-white hover:border-saffaron px-10 py-4 rounded-2xl text-sm uppercase tracking-widest backdrop-blur-sm"
            >
              Learn More
            </Button>
          </div>
        </Animate>
      </div>

      {/* DECORATIVE BOTTOM GRADIENT */}
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-seaSalt to-transparent" />
    </section>

      {/* ABOUT */}
      <MouseTrail id="about" bg="bg-white" glowColor="rgba(255,179,71,0.06)" className="py-24">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <Animate>
              <span className="text-saffaron font-bold text-xs uppercase tracking-[0.2em] mb-4 block">About Us</span>
              <h2 className="text-5xl font-semibold leading-tight mb-8">We bring big data to life</h2>
              <p className="text-lg text-darkSerpent/80 leading-relaxed">
                At Lifewood we empower our company and our clients to realize the transformative power of AI:
                bringing big data to life, launching new ways of thinking, learning and doing — for the good of humankind.
              </p>
              <p className="mt-6 text-lg text-darkSerpent/80 leading-relaxed">
                By connecting local expertise with our global AI data infrastructure, we create opportunities,
                empower communities, and drive inclusive growth worldwide.
              </p>
            </Animate>
            <Animate delay={150}>
              <div className="bg-seaSalt p-10 rounded-3xl shadow-md">
                <div className="text-6xl font-light text-castletonGreen mb-4">"</div>
                <p className="italic text-xl">Connecting local expertise with global AI infrastructure to empower communities everywhere.</p>
                <div className="mt-8 flex items-center gap-4">
                  <img src={lifewoodRoundLogo} alt="Lifewood" className="w-12 h-12 rounded-full object-cover" />
                  <div>
                    <div className="font-medium">Lifewood Team</div>
                    <div className="text-sm text-castletonGreen">Since 2004</div>
                  </div>
                </div>
              </div>
            </Animate>
          </div>
        </div>
      </MouseTrail>

      {/* GLOBAL FOOTPRINT */}
      <section id="global" className="py-24 relative overflow-hidden">
        <video autoPlay muted loop playsInline className="absolute inset-0 w-full h-full object-cover" src="/src/assets/global_reach.mp4" />
        <div className="absolute inset-0 bg-darkSerpent/70" />
        <div className="relative z-10 max-w-6xl mx-auto px-6 text-center">
          <Animate>
            <h2 className="text-5xl font-semibold mb-16 text-saffaron">Our Global Reach</h2>
          </Animate>
          <div className="grid md:grid-cols-4 gap-8">
            {STATS.map((stat, i) => (
              <Animate key={i} delay={i * 100}>
                <div className="h-56 [perspective:1000px] cursor-default">
                  <div className="relative w-full h-full transition-transform duration-700 [transform-style:preserve-3d] hover:[transform:rotateY(180deg)]">
                    <div className="absolute inset-0 bg-white/5 border border-white/10 backdrop-blur-sm p-8 rounded-3xl flex flex-col justify-end [backface-visibility:hidden]">
                      <div className="text-4xl font-bold text-white mb-2">{stat.num}</div>
                      <div className="text-sm text-white/60 leading-snug">{stat.label}</div>
                    </div>
                    <div className="absolute inset-0 bg-white p-8 rounded-3xl flex flex-col justify-center [backface-visibility:hidden] [transform:rotateY(180deg)]">
                      <div className="text-lg font-bold text-castletonGreen mb-3">{stat.label}</div>
                      <div className="text-sm text-darkSerpent/70 leading-relaxed">{stat.desc}</div>
                    </div>
                  </div>
                </div>
              </Animate>
            ))}
          </div>
        </div>
      </section>

      {/* CLIENTS */}
      <section id="clients" className="py-24 bg-white overflow-hidden">
        <div className="max-w-6xl mx-auto px-6">
          <Animate>
            <div className="text-center mb-16">
              <h2 className="text-5xl font-semibold">Our Clients & Partners</h2>
              <p className="mt-4 text-lg max-w-2xl mx-auto text-darkSerpent/70">
                Collaborating with globally recognized leaders across technology, genealogy, and research to deliver impactful AI-driven data solutions.
              </p>
            </div>
          </Animate>
        </div>
        <div className="flex overflow-hidden">
          <div className="flex shrink-0 items-center animate-marquee" style={{ gap: '60px' }}>
            {[...PARTNERS, ...PARTNERS].map((p, i) => (
              <a key={i} href={p.url} target="_blank" rel="noopener noreferrer" className="opacity-70 hover:opacity-100 transition-opacity duration-300 shrink-0">
                <img src={p.src} alt={p.alt} style={{ height: p.height, width: 'auto', objectFit: 'contain' }} />
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* INNOVATION */}
      <MouseTrail id="innovation" bg="bg-darkSerpent" glowColor="rgba(255,179,71,0.12)" className="py-20">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <Animate>
            {/* Editorial Header: Tight tracking and leading for a modern tech feel */}
            <h2 className="text-6xl md:text-[5.5rem] font-bold text-white leading-[0.9] tracking-tighter mb-10">
              Constant Innovation:<br />
              <span className="text-white/20 italic">Unlimited</span> <span className="text-saffaron">Possibilities.</span>
            </h2>
          </Animate>
          
          <Animate delay={150}>
            {/* Refined Paragraph: Slightly larger text with better weight for readability */}
            <p className="text-white/40 text-xl max-w-3xl mx-auto leading-relaxed font-medium">
              No matter the industry, size, or the type of data involved, our solutions are capable of satisfying any 
              <span className="text-white"> AI-data processing requirement</span> at a global scale.
            </p>
          </Animate>
          
          <Animate delay={250}>
            <div className="mt-20 flex items-center justify-center gap-6">
              <div className="h-[1px] w-24 bg-gradient-to-r from-transparent via-saffaron/50 to-saffaron" />
              
              {/* Metadata Styling: Black weight and wide tracking for a technical aesthetic */}
              <div className="flex items-center gap-3">
                <span className="text-saffaron text-[11px] font-black tracking-[0.2em] uppercase">Global</span>
                <span className="text-white/20 text-xs">+</span>
                <span className="text-white/60 text-[11px] font-black tracking-[0.2em] uppercase">AI Data Projects at Scale</span>
              </div>
              
              <div className="h-[1px] w-24 bg-gradient-to-l from-transparent via-saffaron/50 to-saffaron" />
            </div>
          </Animate>
        </div>
      </MouseTrail>

      {/* TAGLINE */}
    <section className="py-24 bg-white overflow-hidden">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <Animate>
            <h2 className="text-4xl font-semibold mb-6">Always switched on, never off.</h2>
            <p className="text-lg text-darkSerpent/70 mb-16">
              Bridging local expertise with global AI infrastructure to empower the world, around the clock.
            </p>
          </Animate>
        </div>

        {/* Full-width container */}
        <div className="w-screen overflow-hidden flex font-['Manrope',sans-serif]">
          <motion.div 
            className="flex gap-20 whitespace-nowrap"
            animate={{ x: ["0%", "-50%"] }}
            transition={{ repeat: Infinity, ease: "linear", duration: 25 }}
          >
            {[...Array(8)].map((_, i) => (
              <div key={i} className="flex items-center gap-12 shrink-0">
                {/* Alternating text colors */}
                <span className={`text-6xl font-black uppercase tracking-tighter ${i % 2 === 0 ? 'text-darkSerpent/15' : 'text-saffaron/25'}`}>
                  Be Amazed
                </span>
                {/* Saffaron decorative dot */}
                <div className="w-4 h-4 rounded-full bg-earthYellow" />
              </div>
            ))}
          </motion.div>
        </div>
      </section>
    </>
  );
}
