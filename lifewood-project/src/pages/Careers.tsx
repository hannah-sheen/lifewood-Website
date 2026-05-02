// import { useState, useRef, useEffect } from 'react';
// import { motion, AnimatePresence } from 'framer-motion'; 
// import { ArrowRight, Users, Heart, Lightbulb, ShieldCheck, Volume2, VolumeX, X } from 'lucide-react';
// import ApplicationForm from './application/ApplicationForm.tsx';
// import Animate from '../components/Animate.tsx';
// import ApplicationChecker from './application/ApplicationChecker.tsx';

// const SECTIONS = [
//   { id: 'culture', label: 'Culture' },
//   { id: 'join', label: 'Join Us' },
// ];

// function VideoPlayer({ src }: { src: string }) {
//   const videoRef = useRef<HTMLVideoElement>(null);
//   const [muted, setMuted] = useState(true);
//   const toggleMute = () => { if (videoRef.current) { videoRef.current.muted = !muted; setMuted(!muted); } };
//   return (
//     <div className="relative rounded-3xl overflow-hidden shadow-2xl aspect-video bg-darkSerpent/20">
//       <video ref={videoRef} autoPlay muted loop playsInline className="w-full h-full object-cover" src={src} />
//       <button onClick={toggleMute} className="absolute top-4 right-4 p-2.5 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20 transition-all">
//         {muted ? <VolumeX className="w-4 h-4 text-white" /> : <Volume2 className="w-4 h-4 text-white" />}
//       </button>
//     </div>
//   );
// }

// const CULTURE_VALUES = [
//   { title: "Diversity", icon: <Users className="w-5 h-5" />, desc: "We celebrate unique perspectives that move us forward." },
//   { title: "Caring", icon: <Heart className="w-5 h-5" />, desc: "We care for every person equally; work is meaningless without it." },
//   { title: "Innovation", icon: <Lightbulb className="w-5 h-5" />, desc: "The heart of our service, challenging us to improve daily." },
//   { title: "Integrity", icon: <ShieldCheck className="w-5 h-5" />, desc: "Ethical and sustainable action is our foundation." }
// ];

// export default function Careers() {
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [modalMode, setModalMode] = useState<'apply' | 'check'>('apply');

//   // Helper to open modal with a specific mode
//   const openModal = (mode: 'apply' | 'check') => {
//     setModalMode(mode);
//     setIsModalOpen(true);
//   };

//   useEffect(() => {
//     if (isModalOpen) {
//       document.body.style.overflow = 'hidden';
//     } else {
//       document.body.style.overflow = 'unset';
//     }
//     // Cleanup on unmount
//     return () => { document.body.style.overflow = 'unset'; };
//   }, [isModalOpen]);

//   const scrollToSection = (id: string) => {
//     const element = document.getElementById(id);
//     if (element) {
//       element.scrollIntoView({ behavior: 'smooth' });
//     }
//   };

//   return (
//     <div className="bg-seaSalt min-h-screen selection:bg-saffaron/30 relative">
      
//       {/* --- MODAL OVERLAY --- */}
//       <AnimatePresence>
//         {isModalOpen && (
//           <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 md:p-8">
//             <motion.div 
//               initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
//               onClick={() => setIsModalOpen(false)}
//               className="absolute inset-0 bg-darkSerpent/90 backdrop-blur-xl"
//             />
            
//             <motion.div 
//               initial={{ opacity: 0, scale: 0.9, y: 30 }}
//               animate={{ opacity: 1, scale: 1, y: 0 }}
//               exit={{ opacity: 0, scale: 0.9, y: 30 }}
//               className="relative w-full max-w-5xl max-h-[90vh] overflow-y-auto bg-white rounded-[3.5rem] shadow-2xl no-scrollbar p-10 md:p-20 pb-20"
//             >
//               <button 
//                 onClick={() => setIsModalOpen(false)}
//                 className="absolute top-8 right-8 z-[310] p-3 rounded-full bg-seaSalt text-darkSerpent hover:bg-saffaron transition-all"
//               >
//                 <X className="w-6 h-6" />
//               </button>

//               <div className="max-w-3xl mx-auto">
//                 {/* Dynamic Content Switching */}
//                 {modalMode === 'apply' ? <ApplicationForm /> : <ApplicationChecker />}
//               </div>
//             </motion.div>
//           </div>
//         )}
//       </AnimatePresence>

//       {/* --- SIDE NAVIGATION --- */}
//       <nav className="fixed right-6 md:right-10 top-1/2 -translate-y-1/2 z-[100] hidden lg:flex flex-col gap-8">
//         {SECTIONS.map((s) => (
//           <button
//             key={s.id}
//             onClick={() => scrollToSection(s.id)}
//             className="group flex items-center justify-end gap-4 outline-none"
//           >
//             <span className="opacity-0 group-hover:opacity-100 transition-all duration-300 text-[10px] font-black uppercase tracking-[0.2em] text-darkSerpent bg-white/90 backdrop-blur-md px-3 py-1 rounded-full shadow-md pointer-events-none translate-x-2 group-hover:translate-x-0">
//               {s.label}
//             </span>
//             <div className="relative flex items-center justify-center">
//               <div className="h-4 w-4 rounded-full border-2 border-saffaron group-hover:border-saffaron transition-all duration-300" />
//               <div className="absolute h-1.5 w-1.5 rounded-full bg-earthYellow scale-0 group-hover:scale-100 transition-transform duration-300 shadow-[0_0_8px_rgba(255,179,71,0.8)]" />
//             </div>
//           </button>
//         ))}
//       </nav>

//       {/* 1. HERO SECTION */}
//       <section id="hero" className="pt-32 pb-20 bg-darkSerpent text-white relative overflow-hidden">
//         <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-castletonGreen/10 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/4" />
//         <div className="max-w-7xl mx-auto px-6 relative z-10">
//           <div className="grid md:grid-cols-2 gap-12 items-center">
//             <Animate>
//               <span className="text-saffaron font-bold text-xs uppercase tracking-[0.2em] mb-4 block">Work With Us</span>
//               <h1 className="text-6xl md:text-8xl font-bold tracking-tighter leading-[0.9] mb-8">
//                 Empower Your <br/> <span className="text-white/20 italic">Global Career.</span>
//               </h1>
//               <p className="text-white/60 text-xl leading-relaxed">
//                 Lifewood is more than a tech provider—we are a social enterprise. Join a team where high-performance AI data engineering meets real-world social impact.
//               </p>
//             </Animate>
//             <Animate delay={150}>
//               <VideoPlayer src="/src/assets/careers/Lifewood Empowering the Future Through AI 2025.mp4" />
//             </Animate>
//           </div>
//         </div>
//       </section>

//       {/* 2. CULTURE & VALUES */}
//       <section id="culture" className="pt-20 pb-10 bg-white">
//         <div className="max-w-7xl mx-auto px-6">
//           <div className="flex flex-col md:flex-row items-end justify-between gap-8 mb-10">
//             <div className="md:w-1/2">
//               <span className="text-saffaron font-bold text-xs uppercase tracking-[0.2em] mb-3 block">Why Lifewood</span>
//               <h2 className="text-5xl font-bold tracking-tighter text-darkSerpent">Our Culture</h2>
//             </div>
//             <p className="md:w-1/3 text-darkSerpent/50 text-right">
//               We bridge the gap between raw data and actionable intelligence while uplifting communities.
//             </p>
//           </div>

//           <div className="grid md:grid-cols-4 gap-6">
//             {CULTURE_VALUES.map((val, i) => (
//               <Animate key={i} delay={i * 100}>
//                 <div className="p-8 rounded-3xl bg-seaSalt hover:bg-white border border-darkSerpent/[0.03] hover:shadow-xl transition-all group shadow-md">
//                   <div className="w-12 h-12 rounded-2xl bg-darkSerpent text-saffaron flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
//                     {val.icon}
//                   </div>
//                   <h3 className="text-xl font-bold mb-3">{val.title}</h3>
//                   <p className="text-sm text-darkSerpent/50 leading-relaxed">{val.desc}</p>
//                 </div>
//               </Animate>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* 3. JOIN US CTA SECTION */}
//       <section id="join" className="py-32 bg-white relative">
//         <div className="max-w-4xl mx-auto px-6">
//           <Animate>
//             <div className="text-center mb-15">
//               <span className="text-saffaron font-bold text-[10px] uppercase tracking-[0.3em] mb-6 block">Talent Acquisition</span>
//               <h2 className="text-6xl md:text-8xl font-bold tracking-tighter text-darkSerpent leading-[0.9]">
//                 Shape the <br /><span className="text-darkSerpent/20 italic">Future.</span>
//               </h2>
//             </div>

//             <div className="flex flex-col md:flex-row items-center justify-center gap-10 md:gap-10">
//               <button
//                 onClick={() => openModal('apply')} // Changed to openModal
//                 className="group flex flex-row md:flex-col items-center gap-6 md:gap-6 flex-1 w-full md:justify-center"
//               >
//                 <div className="w-20 h-20 rounded-3xl bg-darkSerpent text-white flex items-center justify-center group-hover:bg-saffaron transition-colors duration-300 shadow-md shadow-darkSerpent/20">
//                   <ArrowRight className="w-7 h-7 rotate-[-45deg]" />
//                 </div>
//                 <div className="text-left md:text-center space-y-1">
//                   <h4 className="text-lg font-bold text-darkSerpent">Join Our Talent Pool</h4>
//                   <p className="text-xs text-saffaron font-bold uppercase tracking-widest">Apply Now</p>
//                 </div>
//               </button>

//               <div className="hidden md:block w-px h-24 bg-darkSerpent/10" />

//               <button 
//                 onClick={() => openModal('check')} // Changed to openModal
//                 className="group flex flex-row md:flex-col items-center gap-6 md:gap-6 flex-1 w-full md:justify-center"
//               >
//                 <div className="w-20 h-20 rounded-3xl bg-white border border-darkSerpent/20 text-darkSerpent/60 flex items-center justify-center group-hover:border-earthYellow group-hover:text-saffaron transition-all duration-300">
//                   <ShieldCheck className="w-8 h-8" />
//                 </div>
//                 <div className="text-left md:text-center space-y-1">
//                   <h4 className="text-lg font-bold text-darkSerpent">Check Application</h4>
//                   <p className="text-xs text-saffaron font-bold uppercase tracking-widest">Existing Candidates</p>
//                 </div>
//               </button>
//             </div>
//           </Animate>
//         </div>
//       </section>
//     </div>
//   );
// }

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion'; 
import { ArrowRight, Users, Heart, Lightbulb, ShieldCheck, Volume2, VolumeX, X } from 'lucide-react';
import ApplicationForm from './application/ApplicationForm.tsx';
import Animate from '../components/Animate.tsx';
import ApplicationChecker from './application/ApplicationChecker.tsx';

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
      <button onClick={toggleMute} className="absolute top-4 right-4 p-2.5 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20 transition-all cursor-pointer">
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
  const [modalMode, setModalMode] = useState<'apply' | 'check'>('apply');

  // Helper to open modal with a specific mode
  const openModal = (mode: 'apply' | 'check') => {
    setModalMode(mode);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleFormSuccess = () => {
    // Close modal after successful submission
    setTimeout(() => {
      closeModal();
    }, 2000); // Wait 2 seconds to show success message before closing
  };

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
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              exit={{ opacity: 0 }}
              onClick={closeModal}
              className="absolute inset-0 bg-darkSerpent/90 backdrop-blur-xl"
            />
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 30 }}
              className="relative w-full max-w-5xl max-h-[90vh] overflow-y-auto bg-white rounded-[3.5rem] shadow-2xl no-scrollbar p-10 md:p-20 pb-20"
            >
              <button 
                onClick={closeModal}
                className="absolute top-8 right-8 z-[310] p-3 rounded-full bg-seaSalt text-darkSerpent hover:bg-saffaron transition-all cursor-pointer"
              >
                <X className="w-6 h-6" />
              </button>

              <div className="max-w-3xl mx-auto">
                {/* Dynamic Content Switching */}
                {modalMode === 'apply' ? 
                  <ApplicationForm onSuccess={handleFormSuccess} /> : 
                  <ApplicationChecker />
                }
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
      <section id="join" className="py-32 bg-white relative">
        <div className="max-w-4xl mx-auto px-6">
          <Animate>
            <div className="text-center mb-15">
              <span className="text-saffaron font-bold text-[10px] uppercase tracking-[0.3em] mb-6 block">Talent Acquisition</span>
              <h2 className="text-6xl md:text-8xl font-bold tracking-tighter text-darkSerpent leading-[0.9]">
                Shape the <br /><span className="text-darkSerpent/20 italic">Future.</span>
              </h2>
            </div>

            <div className="flex flex-col md:flex-row items-center justify-center gap-10 md:gap-10">
              <button
                onClick={() => openModal('apply')}
                className="group flex flex-row md:flex-col items-center gap-6 md:gap-6 flex-1 w-full md:justify-center cursor-pointer"
              >
                <div className="w-20 h-20 rounded-3xl bg-darkSerpent text-white flex items-center justify-center group-hover:bg-saffaron transition-colors duration-300 shadow-md shadow-darkSerpent/20">
                  <ArrowRight className="w-7 h-7 rotate-[-45deg]" />
                </div>
                <div className="text-left md:text-center space-y-1">
                  <h4 className="text-lg font-bold text-darkSerpent">Join Our Talent Pool</h4>
                  <p className="text-xs text-saffaron font-bold uppercase tracking-widest">Apply Now</p>
                </div>
              </button>

              <div className="hidden md:block w-px h-24 bg-darkSerpent/10" />

              <button 
                onClick={() => openModal('check')}
                className="group flex flex-row md:flex-col items-center gap-6 md:gap-6 flex-1 w-full md:justify-center cursor-pointer"
              >
                <div className="w-20 h-20 rounded-3xl bg-white border border-darkSerpent/20 text-darkSerpent/60 flex items-center justify-center group-hover:border-earthYellow group-hover:text-saffaron transition-all duration-300">
                  <ShieldCheck className="w-8 h-8" />
                </div>
                <div className="text-left md:text-center space-y-1">
                  <h4 className="text-lg font-bold text-darkSerpent">Check Application</h4>
                  <p className="text-xs text-saffaron font-bold uppercase tracking-widest">Existing Candidates</p>
                </div>
              </button>
            </div>
          </Animate>
        </div>
      </section>
    </div>
  );
}