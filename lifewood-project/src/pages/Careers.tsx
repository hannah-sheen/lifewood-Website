import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion'; 
import { ArrowRight, Users, Heart, Lightbulb, ShieldCheck, Volume2, VolumeX, X } from 'lucide-react';
import ApplicationForm from './ApplicationForm.tsx';
import Animate from '../components/Animate.tsx';
import Button from '../components/Button.tsx';

const SECTIONS = [
  { id: 'culture', label: 'Culture' },
  { id: 'join', label: 'Join Us' },
];

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

const CULTURE_VALUES = [
  { title: "Diversity", icon: <Users className="w-5 h-5" />, desc: "We celebrate unique perspectives that move us forward." },
  { title: "Caring", icon: <Heart className="w-5 h-5" />, desc: "We care for every person equally; work is meaningless without it." },
  { title: "Innovation", icon: <Lightbulb className="w-5 h-5" />, desc: "The heart of our service, challenging us to improve daily." },
  { title: "Integrity", icon: <ShieldCheck className="w-5 h-5" />, desc: "Ethical and sustainable action is our foundation." }
];

export default function Careers() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    // Cleanup on unmount
    return () => { document.body.style.overflow = 'unset'; };
  }, [isModalOpen]);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="bg-seaSalt min-h-screen selection:bg-saffaron/30 relative">
      
      {/* --- MODAL OVERLAY --- */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 md:p-8">
            {/* Backdrop with heavy blur */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              className="absolute inset-0 bg-darkSerpent/90 backdrop-blur-xl"
            />
            
            {/* Expanded Modal Container */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 30 }}
              /* Reduced bottom padding from pb-48 to pb-20 */
              className="relative w-full max-w-5xl max-h-[90vh] overflow-y-auto bg-white rounded-[3.5rem] shadow-2xl no-scrollbar p-10 md:p-20 pb-20"
            >
              {/* Close Button - High Z-index to stay above form elements */}
              <button 
                onClick={() => setIsModalOpen(false)}
                className="absolute top-8 right-8 z-[310] p-3 rounded-full bg-seaSalt text-darkSerpent hover:bg-saffaron hover:scale-110 transition-all shadow-sm"
              >
                <X className="w-6 h-6" />
              </button>

              {/* Centered Form Wrapper - prevents inputs from becoming too wide on large screens */}
              <div className="max-w-3xl mx-auto">
                <ApplicationForm />
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* --- SIDE NAVIGATION --- */}
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

      {/* 1. HERO SECTION */}
      <section id="hero" className="pt-32 pb-20 bg-darkSerpent text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-castletonGreen/10 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/4" />
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <Animate>
              <span className="text-saffaron font-bold text-xs uppercase tracking-[0.2em] mb-4 block">Work With Us</span>
              <h1 className="text-6xl md:text-8xl font-bold tracking-tighter leading-[0.9] mb-8">
                Empower Your <br/> <span className="text-white/20 italic">Global Career.</span>
              </h1>
              <p className="text-white/60 text-xl leading-relaxed">
                Lifewood is more than a tech provider—we are a social enterprise. Join a team where high-performance AI data engineering meets real-world social impact.
              </p>
            </Animate>
            <Animate delay={150}>
              <VideoPlayer src="/src/assets/careers/Lifewood Empowering the Future Through AI 2025.mp4" />
            </Animate>
          </div>
        </div>
      </section>

      {/* 2. CULTURE & VALUES */}
      <section id="culture" className="pt-20 pb-10 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row items-end justify-between gap-8 mb-10">
            <div className="md:w-1/2">
              <span className="text-saffaron font-bold text-xs uppercase tracking-[0.2em] mb-3 block">Why Lifewood</span>
              <h2 className="text-5xl font-bold tracking-tighter text-darkSerpent">Our Culture</h2>
            </div>
            <p className="md:w-1/3 text-darkSerpent/50 text-right">
              We bridge the gap between raw data and actionable intelligence while uplifting communities.
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-6">
            {CULTURE_VALUES.map((val, i) => (
              <Animate key={i} delay={i * 100}>
                <div className="p-8 rounded-3xl bg-seaSalt hover:bg-white border border-darkSerpent/[0.03] hover:shadow-xl transition-all group shadow-md">
                  <div className="w-12 h-12 rounded-2xl bg-darkSerpent text-saffaron flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                    {val.icon}
                  </div>
                  <h3 className="text-xl font-bold mb-3">{val.title}</h3>
                  <p className="text-sm text-darkSerpent/50 leading-relaxed">{val.desc}</p>
                </div>
              </Animate>
            ))}
          </div>
        </div>
      </section>

      {/* 3. JOIN US CTA SECTION */}
      <section id="join" className="pb-20 pt-10 bg-white relative overflow-hidden">
        <div className="max-w-4xl mx-auto px-6 relative z-10 text-center">
          <Animate>
            <span className="text-saffaron font-bold text-xs uppercase tracking-[0.2em] mb-3 block">
              Become Part of the Mission
            </span>
            
            <h2 className="text-5xl md:text-7xl font-bold tracking-tighter text-darkSerpent mb-8 leading-[0.95]">
              Ready to help shape <br /> 
              <span className="text-darkSerpent/30 italic underline decoration-saffaron/40 decoration-8 underline-offset-[12px]">
                the future of AI?
              </span>
            </h2>
            
            <p className="text-darkSerpent/60 text-lg md:text-xl leading-relaxed mb-10 max-w-2xl mx-auto">
              We are constantly seeking talented individuals across Data Engineering, AI Operations, and Linguistic Research. Share your profile with us today.
            </p>

            {/* Glow wrapper removed, keeping just the clean button */}
            <div className="relative inline-block">
            <Button
              onClick={() => setIsModalOpen(true)}
              className="px-12 py-7 rounded-[2rem] text-xl shadow-xl"
            >
              Join Our Talent Pool
              <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform duration-300" />
            </Button>
            </div>
          </Animate>
        </div>
      </section>
    </div>
  );
}