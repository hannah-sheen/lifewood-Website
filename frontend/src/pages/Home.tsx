import { useRef, useState, useEffect } from 'react';
import React from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import ContactButton from '../components/ContactButton.tsx';
import { useInView } from '../hooks/useInView';

interface HomeProps {
  playVideoRef: React.MutableRefObject<(() => void) | null>;
}

// Reusable animated wrapper
function Animate({ children, delay = 0, className = '' }: { children: React.ReactNode; delay?: number; className?: string }) {
  const { ref, inView } = useInView();
  return (
    <div
      ref={ref}
      className={className}
      style={{
        transition: `opacity 0.7s ease ${delay}ms, transform 0.7s ease ${delay}ms`,
        opacity: inView ? 1 : 0,
        transform: inView ? 'translateY(0)' : 'translateY(32px)',
      }}
    >
      {children}
    </div>
  );
}

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
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsHeroVisible(entry.isIntersecting);
        if (videoRef.current) {
          if (entry.isIntersecting) videoRef.current.play();
          else videoRef.current.pause();
        }
      },
      { threshold: 0.3 }
    );
    if (heroRef.current) observer.observe(heroRef.current);
    return () => observer.disconnect();
  }, []);

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !muted;
      setMuted(!muted);
    }
  };

  return (
    <>
      {/* HERO */}
      <section ref={heroRef} className="relative text-white min-h-screen flex items-center overflow-hidden">
        <video
          ref={videoRef}
          autoPlay
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
          src="/src/assets/landing_bg.mp4"
        />
        <div className="absolute inset-0 bg-darkSerpent/60" />

        {isHeroVisible && (
          <button
            onClick={toggleMute}
            className="absolute top-6 right-6 z-20 p-3 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-sm transition-all border border-white/20"
          >
            {muted ? <VolumeX className="w-5 h-5 text-white" /> : <Volume2 className="w-5 h-5 text-white" />}
          </button>
        )}

        <div className="relative z-10 max-w-5xl mx-auto px-6 text-center w-full">
          <h1 className="text-5xl md:text-7xl font-semibold leading-tight tracking-tighter mb-6">
            The world's leading provider<br />
            of <span className="text-saffaron">AI-powered</span> data solutions
          </h1>
          <p className="max-w-2xl mx-auto text-lg opacity-90 mb-10">
            Transforming raw data into intelligence that drives innovation and positive impact worldwide.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <ContactButton />
            <button
              onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
              className="border-2 border-white/70 hover:border-white text-white px-8 py-3 rounded-2xl font-medium transition-all"
            >
              Learn More
            </button>
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <Animate>
              <span className="inline-block px-4 py-1.5 bg-paper text-castletonGreen text-sm font-medium rounded-full mb-6">About Us</span>
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
              <div className="bg-seaSalt p-10 rounded-3xl">
                <div className="text-6xl font-light text-castletonGreen mb-4">"</div>
                <p className="italic text-xl">
                  Connecting local expertise with global AI infrastructure to empower communities everywhere.
                </p>
                <div className="mt-8 flex items-center gap-4">
                  <div className="w-12 h-12 bg-castletonGreen rounded-full"></div>
                  <div>
                    <div className="font-medium">Lifewood Team</div>
                    <div className="text-sm text-castletonGreen">Since 2004</div>
                  </div>
                </div>
              </div>
            </Animate>
          </div>
        </div>
      </section>

      {/* GLOBAL FOOTPRINT */}
      <section id="global" className="py-24 relative overflow-hidden">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
          src="/src/assets/global_reach.mp4"
        />
        <div className="absolute inset-0 bg-darkSerpent/70" />
        <div className="relative z-10 max-w-6xl mx-auto px-6 text-center">
          <Animate>
            <h2 className="text-5xl font-semibold mb-16 text-saffaron">Our Global Reach</h2>
          </Animate>
          <div className="grid md:grid-cols-4 gap-8">
            {[
              { num: '40+', label: 'Global Delivery Centers' },
              { num: '30+', label: 'Countries Across All Continents' },
              { num: '50+', label: 'Languages & Dialects' },
              { num: '56,000+', label: 'Global Online Resources' },
            ].map((stat, i) => (
              <Animate key={i} delay={i * 100}>
                <div className="h-56 bg-white/5 border border-white/10 backdrop-blur-sm p-8 rounded-3xl group cursor-default transition-all duration-300 hover:bg-white hover:shadow-2xl hover:-translate-y-2 flex flex-col justify-end">
                  <div>
                    <div className="text-4xl font-bold text-white mb-2 transition-colors duration-300 group-hover:text-castletonGreen">{stat.num}</div>
                    <div className="text-sm text-white/60 leading-snug transition-colors duration-300 group-hover:text-darkSerpent/70">{stat.label}</div>
                  </div>
                </div>
              </Animate>
            ))}
          </div>
        </div>
      </section>

      {/* CLIENTS */}
      <section id="clients" className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <Animate>
            <div className="text-center mb-16">
              <h2 className="text-5xl font-semibold">Our Clients & Partners</h2>
              <p className="mt-4 text-lg max-w-2xl mx-auto text-darkSerpent/70">
                Trusted by leading organizations worldwide to transform data into meaningful AI solutions.
              </p>
            </div>
          </Animate>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 opacity-70">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
              <Animate key={i} delay={i * 60}>
                <div className="h-20 bg-paper rounded-2xl flex items-center justify-center font-medium text-darkSerpent/60">
                  Partner {i}
                </div>
              </Animate>
            ))}
          </div>
        </div>
      </section>

      {/* INNOVATION */}
      <section id="innovation" className="py-24 bg-darkSerpent text-white">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <Animate>
            <h2 className="text-5xl font-semibold tracking-wide mb-6">
              CONSTANT INNOVATION.<br />UNLIMITED POSSIBILITIES.
            </h2>
          </Animate>
          <Animate delay={150}>
            <p className="text-2xl opacity-80 max-w-3xl mx-auto">
              No matter the industry, size, or type of data involved, our solutions are capable of satisfying any AI-data processing requirement.
            </p>
          </Animate>
          <Animate delay={300}>
            <div className="mt-20 text-8xl font-light text-earthYellow">+ AI Data Projects at Scale</div>
          </Animate>
        </div>
      </section>

      {/* CASE STUDIES */}
      <section className="py-24 bg-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <Animate>
            <h2 className="text-4xl font-semibold mb-6">Real challenges, proven solutions</h2>
            <p className="text-lg text-darkSerpent/70 mb-10">
              Check out our case studies to see our impact, then drop us a line to start your own transformation.
            </p>
            <button className="bg-castletonGreen text-white px-10 py-4 rounded-2xl font-medium hover:bg-darkSerpent transition-colors">
              Explore Case Studies
            </button>
          </Animate>
        </div>
      </section>
    </>
  );
}
