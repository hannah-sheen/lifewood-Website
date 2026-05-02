import { motion, AnimatePresence } from 'framer-motion';
import { useState, useRef } from 'react';
import {  Volume2, VolumeX, ArrowRight, Database, Globe, Filter,  Brain, CheckCircle, Search, Cpu, Car, MessageSquare,  Languages, Eye, Users } from 'lucide-react';
import aiService1 from "../assets/ai services/ai_service_1.jpeg";
import aiService2 from "../assets/ai services/ai_service_2.jpeg";
import aiService3 from "../assets/ai services/ai_service_3.jpeg";
import aiService4 from "../assets/ai services/ai_service_4.jpeg";
import aiService5 from "../assets/ai services/ai_service_5.jpeg";
import aiEnabled from "../assets/ai projects/ai_enabled_cs.mp4";
import autoDrive from "../assets/ai projects/autonomous_driving.mp4";
import compVision from "../assets/ai projects/computer_vision.mp4";
import dataExtract from "../assets/ai projects/data_extraction.mp4";
import genealogy from "../assets/ai projects/genealogy.mp4";
import machineLearning from "../assets/ai projects/machine_learning.mp4";
import nlp from "../assets/ai projects/nlp.mp4";
import Animate from '../components/Animate.tsx';
import { DocumentStack, AudioNode, VisionGrid, VideoLens } from '../components/AIServices.tsx';


// 1. UPDATED NAV ITEMS
const SECTIONS = [
  { id: "services", label: "AI Services" },
  { id: "solutions", label: "Comprehensive Data Solutions" },
  { id: "projects", label: "AI Projects" }
];

const SOLUTIONS_DATA = [
  { title: "Data Acquisition", desc: "We provide end-to-end data acquisition solutions—capturing, processing, and managing large-scale, diverse datasets.", icon: <Database className="w-6 h-6" />, image: aiService1 },
  { title: "Data Collection", desc: "Lifewood delivers multi-modal data collection across text, audio, image, and video, supported by advanced workflows.", icon: <Globe className="w-6 h-6" />, image: aiService2 },
  { title: "Data Curation", desc: "We sift, select and index data to ensure reliability, accessibility and ease of classification.", icon: <Filter className="w-6 h-6" />, image: aiService3 },
  { title: "Data Annotation", desc: "In the age of AI, data is the fuel for all analytic and machine learning. Lifewood provides high quality annotation services.", icon: <Brain className="w-6 h-6" />, image: aiService4 },
  { title: "Data Validation", desc: "The goal is to create data that is consistent, accurate and complete, preventing data loss or errors.", icon: <CheckCircle className="w-6 h-6" />, image: aiService5 }
];

const SPECIALIZED_PROJECTS = [
  { title: "AI Data Extraction", desc: "Optimizing the acquisition of image and text from multiple sources including onsite scanning and drone photography.", icon: <Search className="w-5 h-5" />, video: dataExtract },
  { title: "Machine Learning Enablement", desc: "Building high-quality datasets that fuel complex model training and algorithmic refinement.", icon: <Cpu className="w-5 h-5" />, video: machineLearning },
  { title: "Autonomous Driving", desc: "Large-scale visual labeling and object detection datasets specifically for self-driving system validation.", icon: <Car className="w-5 h-5" />, video: autoDrive },
  { title: "AI-Enabled Customer Service", desc: "Developing linguistic models and sentiment analysis for smarter, context-aware support interactions.", icon: <MessageSquare className="w-5 h-5" />, video: aiEnabled },
  { title: "NLP & Speech", desc: "Natural Language Processing and Speech Acquisition across 30+ languages and regional dialects.", icon: <Languages className="w-5 h-5" />, video: nlp },
  { title: "Computer Vision", desc: "Structuring visual data through classification, audit, and real-time live video intelligence.", icon: <Eye className="w-5 h-5" />, video: compVision },
  { title: "Genealogy", desc: "Digitization and transcription of historical records, making heritage data accessible and classified.", icon: <Users className="w-5 h-5" />, video: genealogy }
];

const SERVICES = [
  { title: "Text Solutions", desc: "LLM-ready linguistic datasets.", capabilities: ["Text Collection", "Labelling", "Transcription", "Sentiment"], visual: <DocumentStack />, color: "hover:border-saffaron/40 hover:border-[2px]" },
  { title: "Audio Data", desc: "High-fidelity acoustic tagging.", capabilities: ["Voice Categorization", "Music Tagging", "Intelligent CS", "Labelling"], visual: <AudioNode />, color: "hover:border-castletonGreen/40 hover:border-[2px]" },
  { title: "Computer Vision", desc: "Visual structuring & audit.", capabilities: ["Image Collection", "Object Detection", "Classification", "Audit"], visual: <VisionGrid />, color: "hover:border-saffaron/40 hover:border-[2px]" },
  { title: "Video Intelligence", desc: "Context-aware stream analysis.", capabilities: ["Video Labelling", "Live Audit", "Subtitle Gen", "Collection"], visual: <VideoLens />, color: "hover:border-castletonGreen/40 hover:border-[2px]" }
];

function VideoPlayer() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [muted, setMuted] = useState(true);
  const toggleMute = () => { if (videoRef.current) { videoRef.current.muted = !muted; setMuted(!muted); } };
  return (
    <div className="relative rounded-3xl overflow-hidden shadow-2xl aspect-video bg-darkSerpent/20">
      <video ref={videoRef} autoPlay muted loop playsInline className="w-full h-full object-cover" src="/src/assets/Lifewood Services.mp4" />
      <button onClick={toggleMute} className="absolute top-4 right-4 p-2.5 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20 transition-all">
        {muted ? <VolumeX className="w-4 h-4 text-white" /> : <Volume2 className="w-4 h-4 text-white" />}
      </button>
    </div>
  );
}

export default function Solutions() {
  const [active, setActive] = useState(0);
  const [direction, setDirection] = useState(0);
  const [cursor, setCursor] = useState({ x: 0, y: 0, visible: false });

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;
      window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
    }
  };

  const paginate = (newIndex: number) => {
    setDirection(newIndex > active ? 1 : -1);
    setActive(newIndex);
  };

  const nextSlide = () => paginate((active + 1) % SOLUTIONS_DATA.length);
  const prevSlide = () => paginate((active - 1 + SOLUTIONS_DATA.length) % SOLUTIONS_DATA.length);

  return (
    <div className="selection:bg-saffaron/30 bg-seaSalt min-h-screen">
      
      {/* FLOATING NAV */}
      <nav className="fixed right-6 md:right-10 top-1/2 -translate-y-1/2 z-[100] hidden lg:flex flex-col gap-8">
        {SECTIONS.map((s) => (
          <button key={s.id} onClick={() => scrollToSection(s.id)} className="group flex items-center justify-end gap-4 outline-none cursor-pointer">
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
      <section id="hero" className="bg-darkSerpent pt-25 pb-20 relative overflow-hidden text-white">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-castletonGreen/10 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2" />
        <div className="max-w-7xl mx-auto px-6 relative z-10 text-center md:text-left">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <Animate>
              <span className="text-saffaron font-bold text-xs uppercase tracking-[0.3em] mb-6 block">Industry Leader</span>
              <h1 className="text-6xl md:text-8xl font-bold tracking-tighter leading-[0.9] mb-8">
                AI Solutions <br/> <span className="text-white/20 italic">at Scale.</span>
              </h1>
              <p className="text-white/60 text-xl leading-relaxed max-w-2xl">
                Empowering global enterprises with high-fidelity data engineering.
              </p>
            </Animate>
            <Animate delay={150}><VideoPlayer /></Animate>
          </div>
        </div>
      </section>

      {/* 2. SERVICES SECTION */}
      <section id="services" className="py-20 relative">
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <Animate className="mb-10">
            <div className="flex flex-col md:flex-row items-end justify-between gap-8">
              <div className="md:w-1/2 text-left">
                <p className="text-darkSerpent/60 text-lg leading-relaxed max-w-md">
                  Comprehensive multi-modal services designed to structure, analyze, and refine your data for next-generation intelligence.
                </p>
              </div>
              <div className="md:w-1/2 text-right">
                <span className="text-saffaron font-bold text-xs uppercase tracking-[0.2em] mb-3 block">Our Capabilities</span>
                <h2 className="text-6xl md:text-6xl font-bold tracking-tighter text-darkSerpent">
                  AI Services
                </h2>
              </div>
            </div>
          </Animate>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-3 mb-15">
            {SERVICES.map((service, i) => (
              <Animate key={i} delay={i * 100}>
                <motion.div whileHover={{ y: -10 }} className={`shadow-md p-10 rounded-[2.5rem] bg-white border border-darkSerpent/[0.01] transition-all hover:shadow-2xl h-full flex flex-col ${service.color}`}>
                  {service.visual}
                  <h3 className="text-2xl font-bold mb-3 tracking-tight mt-4">{service.title}</h3>
                  <p className="text-sm text-darkSerpent/40 mb-10 leading-relaxed">{service.desc}</p>
                  <div className="space-y-1.5 mt-auto">
                    {service.capabilities.map((item, idx) => (
                      <div key={idx} className="flex items-center justify-between py-2 px-4 rounded-xl hover:bg-seaSalt transition-all group/item">
                        <span className="text-[11px] font-bold uppercase tracking-wider text-darkSerpent/40 group-hover/item:text-darkSerpent">{item}</span>
                        <ArrowRight className="w-3 h-3 text-saffaron opacity-0 group-hover/item:opacity-100 transition-all" />
                      </div>
                    ))}
                  </div>
                </motion.div>
              </Animate>
            ))}
          </div>
        </div>
      </section>

      {/* 3. COMPREHENSIVE DATA SOLUTIONS */}
      <section 
        id="solutions" 
        className="bg-darkSerpent py-20 overflow-hidden border-t border-white/5 relative"
        onMouseMove={(e) => {
          const r = e.currentTarget.getBoundingClientRect();
          setCursor({ x: e.clientX - r.left, y: e.clientY - r.top, visible: true });
        }}
        onMouseLeave={() => setCursor(p => ({ ...p, visible: false }))}
        style={{ cursor: cursor.visible ? 'none' : 'auto' }}
      >
        {cursor.visible && (
          <div 
            className="absolute pointer-events-none z-[9999] rounded-full bg-saffaron" 
            style={{
              left: cursor.x, top: cursor.y, width: 14, height: 14,
              transform: 'translate(-50%,-50%)', boxShadow: '0 0 12px 4px rgba(255,179,71,0.6)',
            }} 
          />
        )}

        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col items-center text-center mb-10">
            <Animate>
              <span className="text-saffaron font-bold text-xs uppercase tracking-[0.2em] mb-4 block">Why Brands Trust Us</span>
              <h2 className="text-5xl md:text-6xl font-bold tracking-tighter text-white mb-6">Comprehensive Data Solutions</h2>
              <p className="text-white/40 text-lg leading-relaxed max-w-2xl">High-fidelity data structures designed for professional-grade model training.</p>
            </Animate>
          </div>

          <div className="relative flex items-center justify-center h-[400px] md:h-[480px]">
            <div className="absolute left-0 w-1/4 h-[70%] z-0 hidden md:block overflow-hidden rounded-[2.5rem]">
              <AnimatePresence mode="wait">
                <motion.img key={`prev-${active}`} initial={{ opacity: 0 }} animate={{ opacity: 0.2 }} exit={{ opacity: 0 }} transition={{ duration: 0.4 }} src={SOLUTIONS_DATA[(active - 1 + SOLUTIONS_DATA.length) % SOLUTIONS_DATA.length].image} className="w-full h-full object-cover cursor-none hover:opacity-40" onClick={prevSlide} />
              </AnimatePresence>
            </div>
            <div className="relative w-full md:w-[60%] h-full z-20 overflow-hidden rounded-[3rem] shadow-2xl border border-white/10">
              <AnimatePresence mode="wait">
                <motion.div key={active} initial={{ opacity: 0, x: direction * 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: direction * -30 }} transition={{ duration: 0.4 }} className="absolute inset-0">
                  <img src={SOLUTIONS_DATA[active].image} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-darkSerpent via-darkSerpent/70 to-transparent" />
                  <div className="absolute bottom-8 left-10 right-10 text-white">
                    <div className="flex items-center gap-4 mb-3">
                      <div className="p-2.5 bg-saffaron rounded-lg text-darkSerpent shadow-lg">{SOLUTIONS_DATA[active].icon}</div>
                      <h3 className="text-3xl md:text-5xl font-bold tracking-tighter">{SOLUTIONS_DATA[active].title}</h3>
                    </div>
                    <p className="text-white/80 text-sm md:text-base max-w-xl leading-relaxed">{SOLUTIONS_DATA[active].desc}</p>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
            <div className="absolute right-0 w-1/4 h-[70%] z-0 hidden md:block overflow-hidden rounded-[2.5rem]">
              <AnimatePresence mode="wait">
                <motion.img key={`next-${active}`} initial={{ opacity: 0 }} animate={{ opacity: 0.2 }} exit={{ opacity: 0 }} transition={{ duration: 0.4 }} src={SOLUTIONS_DATA[(active + 1) % SOLUTIONS_DATA.length].image} className="w-full h-full object-cover cursor-none hover:opacity-40" onClick={nextSlide} />
              </AnimatePresence>
            </div>
          </div>

          <div className="mt-12 flex justify-center w-full">
            <div className="flex gap-3 items-center">
              {SOLUTIONS_DATA.map((item, i) => (
                <button key={i} onClick={() => paginate(i)} className={`relative h-12 w-20 flex-shrink-0 rounded-xl overflow-hidden border-2 transition-all duration-300 cursor-none ${active === i ? "border-saffaron scale-110 shadow-lg z-10 opacity-100" : "border-white/5 opacity-30 grayscale hover:grayscale-0 hover:opacity-100"}`}>
                  <img src={item.image} className="w-full h-full object-cover" />
                  {active === i && <motion.div layoutId="active-nav-glow" className="absolute inset-0 bg-saffaron/10" />}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 4. AI PROJECTS SECTION */}
      <section id="projects" className="py-20 bg-seaSalt relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <Animate className="mb-16">
            <div className="flex flex-col md:flex-row items-start justify-between gap-8">
              <div className="md:w-1/2 text-left">
                <span className="text-saffaron font-bold text-xs uppercase tracking-[0.2em] mb-3 block">Innovation Lab</span>
                <h2 className="text-6xl md:text-6xl font-bold tracking-tighter text-darkSerpent">
                  AI Projects
                </h2>
              </div>
              <div className="md:w-1/2 text-right self-end">
                <p className="text-darkSerpent/50 text-lg leading-relaxed max-w-md ml-auto">
                  From autonomous navigation to linguistic preservation, explore specialized initiatives applying advanced data engineering to solve real-world challenges.
                </p>
              </div>
            </div>
          </Animate>

          <div 
            className="flex flex-col gap-1 shadow-2xl"
            style={{ clipPath: 'polygon(0% 0%, 90% 0%, 100% 100%, 10% 100%)' }}
          >
            {SPECIALIZED_PROJECTS.map((project, i) => {
              const colors = ['bg-darkSerpent', 'bg-castletonGreen', 'bg-lightGreen', 'bg-pastelGreen', 'bg-saffaron', 'bg-earthYellow', 'bg-paper'];
              const bgColor = colors[i % colors.length];
              const isLight = i >= 4;

              return (
                <div key={i} className={`group relative w-full ${bgColor} transition-all duration-500`}>
                  <div className="px-[15%] md:px-[12%]">
                    <div className="py-5 md:py-6 flex items-center justify-between cursor-pointer">
                      <div className="flex items-center gap-6">
                        <span className={`text-[10px] font-black font-mono opacity-40 ${isLight ? 'text-darkSerpent' : 'text-seaSalt'}`}>0{i + 1}</span>
                        <h3 className={`text-lg md:text-xl font-bold tracking-tight group-hover:translate-x-2 transition-transform duration-300 ${isLight ? 'text-darkSerpent' : 'text-seaSalt'}`}>
                          {project.title}
                        </h3>
                      </div>
                      <div className={`w-8 h-8 rounded-full border flex items-center justify-center transition-all duration-300 group-hover:bg-white/10 ${isLight ? 'border-darkSerpent/20' : 'border-white/20'}`}>
                        <ArrowRight className={`w-3.5 h-3.5 ${isLight ? 'text-darkSerpent' : 'text-seaSalt'}`} />
                      </div>
                    </div>

                    <div className="max-h-0 opacity-0 group-hover:max-h-[700px] group-hover:opacity-100 transition-all duration-500 ease-in-out overflow-hidden">
                      <div className={`pb-10 grid lg:grid-cols-12 gap-10 items-center border-t ${isLight ? 'border-darkSerpent/10' : 'border-white/10'} pt-8`}>
                        <div className="lg:col-span-4 space-y-4">
                          <p className={`text-sm md:text-base leading-relaxed ${isLight ? 'text-darkSerpent/80' : 'text-seaSalt/70'}`}>
                            {project.desc}
                          </p>
                          <div className="flex items-center gap-2">
                            <div className={`w-1.5 h-1.5 rounded-full animate-pulse ${isLight ? 'bg-darkSerpent' : 'bg-saffaron'}`} />
                            <span className={`text-[9px] font-bold uppercase tracking-widest ${isLight ? 'text-darkSerpent/60' : 'text-seaSalt/40'}`}>Active Lab Integration</span>
                          </div>
                        </div>
                        <div className="lg:col-span-8 relative aspect-video rounded-2xl overflow-hidden bg-black/20 shadow-lg border border-white/5">
                          <video autoPlay muted loop playsInline className="w-full h-full object-cover opacity-90" src={project.video} />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}