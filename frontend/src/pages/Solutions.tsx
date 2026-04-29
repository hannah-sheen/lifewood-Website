import { motion, AnimatePresence } from 'framer-motion';
import { useState, useRef } from 'react';
import { Volume2, VolumeX, ArrowRight, Database, Globe, Filter, Brain, CheckCircle } from 'lucide-react';
import aiService1 from "../assets/ai services/ai_service_1.jpeg";
import aiService2 from "../assets/ai services/ai_service_2.jpeg";
import aiService3 from "../assets/ai services/ai_service_3.jpeg";
import aiService4 from "../assets/ai services/ai_service_4.jpeg";
import aiService5 from "../assets/ai services/ai_service_5.jpeg";

import Animate from '../components/Animate.tsx';
import { DocumentStack, AudioNode, VisionGrid, VideoLens } from '../components/AIServices.tsx';

const SOLUTIONS_DATA = [
  { title: "Data Acquisition", desc: "We provide end-to-end data acquisition solutions—capturing, processing, and managing large-scale, diverse datasets.", icon: <Database className="w-6 h-6" />, image: aiService1 },
  { title: "Data Collection", desc: "Lifewood delivers multi-modal data collection across text, audio, image, and video, supported by advanced workflows for categorization, labeling, tagging, transcription, sentiment analysis, and subtitle generation.", icon: <Globe className="w-6 h-6" />, image: aiService2 },
  { title: "Data Curation", desc: "We sift, select and index data to ensure reliability, accessibility and ease of classification. Data can be curated to support business decisions, academic research, genealogies, scientific research and more.", icon: <Filter className="w-6 h-6" />, image: aiService3 },
  { title: "Data Annotation", desc: "In the age of AI, data is the fuel for all analytic and machine learning. Lifewood provides high quality annotation services for a wide range of mediums including text, image, audio and video.", icon: <Brain className="w-6 h-6" />, image: aiService4 },
  { title: "Data Validation", desc: "The goal is to create data that is consistent, accurate and complete, preventing data loss or errors in transfer, code or configuration.", icon: <CheckCircle className="w-6 h-6" />, image: aiService5 }
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

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !muted;
      setMuted(!muted);
    }
  };

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

  const paginate = (newIndex: number) => {
    setDirection(newIndex > active ? 1 : -1);
    setActive(newIndex);
  };

  const nextSlide = () => paginate((active + 1) % SOLUTIONS_DATA.length);
  const prevSlide = () => paginate((active - 1 + SOLUTIONS_DATA.length) % SOLUTIONS_DATA.length);

  return (
    <div className="selection:bg-saffaron/30 bg-seaSalt min-h-screen">
      
      {/* 1. HERO SECTION */}
      <section className="bg-darkSerpent pt-20 pb-15 relative overflow-hidden text-white">
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
      <section id="services" className="py-15 relative">
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="flex flex-col items-end text-right mb-10 w-full ml-auto">
            <Animate className="max-w-xl">
              <span className="text-saffaron font-bold text-xs uppercase tracking-[0.2em] mb-4 block">Our Capabilities</span>
              <h2 className="text-5xl md:text-7xl font-bold tracking-tighter mb-6">AI Services</h2>
            </Animate>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-3 mb-20">
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
      <section className="bg-darkSerpent py-15 overflow-hidden border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col items-center text-center mb-16">
            <Animate>
              <span className="text-saffaron font-bold text-xs uppercase tracking-[0.2em] mb-4 block">Why Brands Trust Us</span>
              <h2 className="text-5xl md:text-7xl font-bold tracking-tighter text-white mb-6">Comprehensive Data Solutions</h2>
              <p className="text-white/40 text-lg leading-relaxed max-w-2xl">High-fidelity data structures designed for professional-grade model training.</p>
            </Animate>
          </div>

          <div className="relative flex items-center justify-center h-[400px] md:h-[480px]">
            {/* Left Preview */}
            <div className="absolute left-0 w-1/4 h-[70%] z-0 hidden md:block overflow-hidden rounded-[2.5rem]">
              <AnimatePresence mode="wait">
                <motion.img
                  key={`prev-${active}`}
                  initial={{ opacity: 0 }} animate={{ opacity: 0.2 }} exit={{ opacity: 0 }}
                  transition={{ duration: 0.4 }}
                  src={SOLUTIONS_DATA[(active - 1 + SOLUTIONS_DATA.length) % SOLUTIONS_DATA.length].image}
                  className="w-full h-full object-cover cursor-pointer hover:opacity-40"
                  onClick={prevSlide}
                />
              </AnimatePresence>
            </div>

            {/* Focused Center Card */}
            <div className="relative w-full md:w-[60%] h-full z-20 overflow-hidden rounded-[3rem] shadow-2xl border border-white/10">
              <AnimatePresence mode="wait">
                <motion.div
                  key={active}
                  initial={{ opacity: 0, x: direction * 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: direction * -30 }}
                  transition={{ duration: 0.4 }}
                  className="absolute inset-0"
                >
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

            {/* Right Preview */}
            <div className="absolute right-0 w-1/4 h-[70%] z-0 hidden md:block overflow-hidden rounded-[2.5rem]">
              <AnimatePresence mode="wait">
                <motion.img
                  key={`next-${active}`}
                  initial={{ opacity: 0 }} animate={{ opacity: 0.2 }} exit={{ opacity: 0 }}
                  transition={{ duration: 0.4 }}
                  src={SOLUTIONS_DATA[(active + 1) % SOLUTIONS_DATA.length].image}
                  className="w-full h-full object-cover cursor-pointer hover:opacity-40"
                  onClick={nextSlide}
                />
              </AnimatePresence>
            </div>
          </div>

          {/* STATIONARY PAGING TRACK */}
          <div className="mt-12 flex justify-center w-full">
            <div className="flex gap-3 items-center">
              {SOLUTIONS_DATA.map((item, i) => (
                <button
                  key={i}
                  onClick={() => paginate(i)}
                  className={`relative h-12 w-20 flex-shrink-0 rounded-xl overflow-hidden border-2 transition-all duration-300 ${
                    active === i 
                      ? "border-saffaron scale-110 shadow-lg z-10 opacity-100" 
                      : "border-white/5 opacity-30 grayscale hover:grayscale-0 hover:opacity-100"
                  }`}
                >
                  <img src={item.image} className="w-full h-full object-cover" />
                  {active === i && (
                    <motion.div layoutId="active-nav-glow" className="absolute inset-0 bg-saffaron/10" />
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}