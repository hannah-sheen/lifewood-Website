import { useState, useEffect } from 'react';
import { motion } from 'framer-motion'; 
import { ArrowRight, Users, Heart, Lightbulb, ShieldCheck, Loader2, ChevronLeft, ChevronRight } from 'lucide-react';
import ApplicationForm from './application/ApplicationForm.tsx';
import Animate from '../components/Animate.tsx';
import ApplicationChecker from './application/ApplicationChecker.tsx';
import { fetchAvailablePositions } from './position/positionService.tsx';
import type { Position } from './types';
import Modal from '../components/Modal.tsx';
import VideoPlayer from '../components/VideoPlayer.tsx';

const SECTIONS = [
  { id: 'culture', label: 'Culture' },
  { id: 'positions', label: 'Open Roles' },
  { id: 'join', label: 'Join Us' },
];

const CULTURE_VALUES = [
  { title: "Diversity", icon: <Users className="w-5 h-5" />, desc: "We celebrate unique perspectives that move us forward." },
  { title: "Caring", icon: <Heart className="w-5 h-5" />, desc: "We care for every person equally; work is meaningless without it." },
  { title: "Innovation", icon: <Lightbulb className="w-5 h-5" />, desc: "The heart of our service, challenging us to improve daily." },
  { title: "Integrity", icon: <ShieldCheck className="w-5 h-5" />, desc: "Ethical and sustainable action is our foundation." }
];

export default function Careers() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<'apply' | 'check'>('apply');
  const [modalTitle, setModalTitle] = useState('Personal Profile');
  const [modalSubtitle, setModalSubtitle] = useState('Tell us a bit about yourself.');
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [positions, setPositions] = useState<Position[]>([]);
  const [loadingPositions, setLoadingPositions] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 6;

  const openModal = (mode: 'apply' | 'check') => { 
    setModalMode(mode);
    setIsModalOpen(true);
    if (mode === 'apply') {
      setModalTitle('Personal Profile');
      setModalSubtitle('Tell us a bit about yourself.');
    } else {
      setModalTitle('Check Your Application');
      setModalSubtitle('Enter your application ID to check your status.');
    }
  };
  
  const closeModal = () => setIsModalOpen(false);
  const handleFormSuccess = () => { closeModal();};
  const scrollToSection = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

  // Fetch available positions (not Full and not archived)
  useEffect(() => {
    const loadPositions = async () => {
      setLoadingPositions(true);
      try {
        const data = await fetchAvailablePositions();
        setPositions(data || []);
      } catch (error) {
        console.error('Error loading positions:', error);
      } finally {
        setLoadingPositions(false);
      }
    };
    loadPositions();
  }, []);

  return (
    <div className="bg-seaSalt min-h-screen selection:bg-saffaron/30 relative">
      <Modal 
        isOpen={isModalOpen} 
        onClose={closeModal}
        title={modalTitle}
        subtitle={modalSubtitle}
        className="max-w-4xl"
      >
        {modalMode === 'apply' 
          ? <ApplicationForm onSuccess={handleFormSuccess} /> 
          : <ApplicationChecker />}
      </Modal>

      {/* SIDE NAVIGATION */}
      <nav className="fixed right-6 md:right-10 top-1/2 -translate-y-1/2 z-[100] hidden lg:flex flex-col gap-8">
        {SECTIONS.map((s) => (
          <button key={s.id} onClick={() => scrollToSection(s.id)} className="group flex items-center justify-end gap-4 outline-none">
            <span className="opacity-0 group-hover:opacity-100 transition-all duration-300 text-[10px] font-black uppercase tracking-[0.2em] text-darkSerpent bg-white/90 backdrop-blur-md px-3 py-1 rounded-full shadow-md translate-x-2 group-hover:translate-x-0">{s.label}</span>
            <div className="relative flex items-center justify-center">
              <div className="h-4 w-4 rounded-full border-2 border-saffaron group-hover:border-saffaron transition-all duration-300" />
              <div className="absolute h-1.5 w-1.5 rounded-full bg-earthYellow scale-0 group-hover:scale-100 transition-transform duration-300 shadow-[0_0_8px_rgba(255,179,71,0.8)]" />
            </div>
          </button>
        ))}
      </nav>

      {/* HERO */}
      <section id="hero" className="pt-32 pb-20 bg-darkSerpent text-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 relative z-10 grid md:grid-cols-2 gap-12 items-center">
            <Animate>
              <span className="text-saffaron font-bold text-xs uppercase tracking-[0.2em] mb-4 block">Work With Us</span>
              <h1 className="text-6xl md:text-8xl font-bold tracking-tighter leading-[0.9] mb-8">Empower Your <br/> <span className="text-white/20 italic">Global Career.</span></h1>
              <p className="text-white/60 text-xl leading-relaxed">Lifewood is more than a tech provider—we are a social enterprise. Join a team where high-performance AI data engineering meets real-world social impact.</p>
            </Animate>
            <Animate delay={150}><VideoPlayer src="/src/assets/careers/Lifewood Empowering the Future Through AI 2025.mp4" /></Animate>
        </div>
      </section>

      {/* CULTURE */}
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

      {/* POSITIONS SECTION */}
      <section id="positions" className="py-24 bg-darkSerpent text-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-10">
            <Animate>
              <div className="flex flex-col md:flex-row items-end justify-between gap-8">
                <div className="md:w-1/2 text-left">
                  <p className="text-white/60 text-lg leading-relaxed max-w-md">
                    Be part of a purpose-driven organization. Explore roles that challenge you, empower communities, and drive AI innovation forward.
                  </p>
                </div>
                <div className="md:w-1/2 text-right">
                  <span className="text-saffaron font-bold text-xs uppercase tracking-[0.2em] mb-3 block">Open Roles</span>
                  <h2 className="text-6xl md:text-6xl font-bold tracking-tighter text-white">
                    Current Opportunities
                  </h2>
                </div>
              </div>
            </Animate>
          </div>

          {loadingPositions ? (
            <div className="flex justify-center items-center py-20">
              <Loader2 className="w-8 h-8 text-saffaron animate-spin" />
            </div>
          ) : positions.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-white/50 text-lg">No open positions at the moment. Please check back later!</p>
            </div>
          ) : (
            <>
            <motion.div 
              layoutRoot
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {positions
                .slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE)
                .map((pos, index) => {
                  const globalIndex = (currentPage - 1) * ITEMS_PER_PAGE + index;
                  return (
                <motion.div 
                  layout
                  initial={{ opacity: 0, y: 32 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ layout: { type: 'spring', stiffness: 400, damping: 35 }, opacity: { duration: 0.5, delay: index * 0.08 }, y: { duration: 0.5, delay: index * 0.08 } }}
                  key={pos.id}
                  onClick={() => setSelectedId(pos.id === selectedId ? null : pos.id)}
                  className={`cursor-pointer rounded-[2rem] p-8 border backdrop-blur-md overflow-hidden flex flex-col justify-between ${
                    selectedId === pos.id 
                      ? 'bg-gradient-to-br from-saffaron/10 via-white/5 to-transparent border-saffaron/30 text-white md:col-span-2 lg:col-span-2 row-span-2 shadow-[0_0_40px_rgba(255,179,71,0.05)]' 
                      : 'bg-white/[0.02] border-white/[0.05] hover:bg-white/[0.05] hover:border-white/[0.1] text-white h-56'
                  }`}
                >
                  <div className="flex justify-between items-start">
                    <span className={`text-4xl font-black ${selectedId === pos.id ? 'text-saffaron' : 'text-white/10'}`}>
                      {(globalIndex + 1).toString().padStart(2, '0')}
                    </span>
                    {pos.status === 'Open' && (
                      <span className="text-[10px] font-bold uppercase px-2 py-1 rounded-full bg-green-500/20 text-green-400">
                        Open
                      </span>
                    )}
                  </div>

                  <motion.h3 
                    layout="position"
                    className={`font-bold ${selectedId === pos.id ? 'text-5xl mt-6' : 'text-xl'}`}
                  >
                    {pos.title}
                  </motion.h3>

                  {selectedId === pos.id && (
                    <motion.div 
                      initial={{ opacity: 0 }} 
                      animate={{ opacity: 1 }} 
                      className="mt-8 space-y-8"
                    >
                      <p className="text-white/80 text-lg leading-relaxed max-w-xl font-light">{pos.description}</p>
                      <button 
                        onClick={(e) => { 
                          e.stopPropagation(); 
                          scrollToSection('join'); 
                        }}
                        className="relative px-8 py-4 rounded-xl font-bold bg-saffaron text-darkSerpent transition-all hover:scale-105"
                      >
                        Apply Now
                      </button>
                    </motion.div>
                  )}
                </motion.div>
                  );
                })}
            </motion.div>

            {/* PAGINATION */}
            {positions.length > ITEMS_PER_PAGE && (
              <div className="flex items-center justify-center gap-3 mt-12">
                <button
                  onClick={() => { setCurrentPage(p => p - 1); setSelectedId(null); }}
                  disabled={currentPage === 1}
                  className="p-2 rounded-full border border-white/20 text-white hover:border-saffaron hover:text-saffaron transition-all disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>

                {Array.from({ length: Math.ceil(positions.length / ITEMS_PER_PAGE) }, (_, i) => i + 1).map(page => (
                  <button
                    key={page}
                    onClick={() => { setCurrentPage(page); setSelectedId(null); }}
                    className={`w-9 h-9 rounded-full text-sm font-bold transition-all cursor-pointer ${
                      currentPage === page
                        ? 'bg-saffaron text-darkSerpent'
                        : 'border border-white/20 text-white hover:border-saffaron hover:text-saffaron'
                    }`}
                  >
                    {page}
                  </button>
                ))}

                <button
                  onClick={() => { setCurrentPage(p => p + 1); setSelectedId(null); }}
                  disabled={currentPage === Math.ceil(positions.length / ITEMS_PER_PAGE)}
                  className="p-2 rounded-full border border-white/20 text-white hover:border-saffaron hover:text-saffaron transition-all disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            )}
            </>
          )}
        </div>
      </section>

      {/* JOIN US */}
      <section id="join" className="py-20 bg-white relative">
        <div className="max-w-4xl mx-auto px-6">
          <Animate>
            <div className="text-center mb-15">
              <span className="text-saffaron font-bold text-[10px] uppercase tracking-[0.3em] mb-6 block">Talent Acquisition</span>
              <h2 className="text-6xl md:text-8xl font-bold tracking-tighter text-darkSerpent leading-[0.9]">Shape the <br /><span className="text-darkSerpent/20 italic">Future.</span></h2>
            </div>
            <div className="flex flex-col md:flex-row items-center justify-center gap-10">
              <button onClick={() => openModal('apply')} className="group flex flex-col items-center gap-6 flex-1 w-full justify-center cursor-pointer">
                <div className="w-20 h-20 rounded-3xl bg-darkSerpent text-white flex items-center justify-center group-hover:bg-saffaron transition-all"><ArrowRight className="w-7 h-7 rotate-[-45deg]" /></div>
                <div className="space-y-1 text-center"><h4 className="text-lg font-bold">Join Our Talent Pool</h4><p className="text-xs text-saffaron font-bold uppercase tracking-widest">Apply Now</p></div>
              </button>
              <div className="hidden md:block w-px h-24 bg-darkSerpent/10" />
              <button onClick={() => openModal('check')} className="group flex flex-col items-center gap-6 flex-1 w-full justify-center cursor-pointer">
                <div className="w-20 h-20 rounded-3xl bg-white border border-darkSerpent/20 text-darkSerpent/60 flex items-center justify-center group-hover:border-earthYellow group-hover:text-saffaron transition-all"><ShieldCheck className="w-8 h-8" /></div>
                <div className="space-y-1 text-center"><h4 className="text-lg font-bold">Check Application</h4><p className="text-xs text-saffaron font-bold uppercase tracking-widest">Existing Candidates</p></div>
              </button>
            </div>
          </Animate>
        </div>
      </section>
    </div>
  );
}