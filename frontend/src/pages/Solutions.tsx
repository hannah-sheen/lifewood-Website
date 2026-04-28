import { motion } from 'framer-motion';
import { useState, useRef } from 'react';
import { Volume2, VolumeX, ArrowRight, FileText, Layers, Target, Eye } from 'lucide-react';
import Animate from '../components/Animate.tsx';

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
    <div className="relative rounded-3xl overflow-hidden shadow-2xl aspect-video">
      <video
        ref={videoRef}
        autoPlay
        muted
        loop
        playsInline
        className="w-full h-full object-cover"
        src="/src/assets/Lifewood Services.mp4"
      />

      <button
        onClick={toggleMute}
        className="absolute top-4 right-4 p-2.5 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20 transition-all duration-200"
      >
        {muted ? <VolumeX className="w-4 h-4 text-white" /> : <Volume2 className="w-4 h-4 text-white" />}
      </button>
    </div>
  );
}
const DocumentStack = () => (
  <div className="relative w-12 h-12 mb-6 group-hover:scale-110 transition-transform duration-500">
    <div className="absolute inset-0 bg-saffaron/20 rounded-lg rotate-6 transition-transform group-hover:rotate-12" />
    <div className="absolute inset-0 bg-white border-2 border-darkSerpent/10 rounded-lg flex items-center justify-center shadow-sm">
      <FileText className="w-6 h-6 text-saffaron" />
    </div>
  </div>
);

const AudioNode = () => (
  <div className="relative w-12 h-12 mb-6 flex items-center justify-center">
    <motion.div 
      animate={{ scale: [1, 1.2, 1] }}
      transition={{ duration: 2, repeat: Infinity }}
      className="absolute inset-0 bg-saffaron/20 rounded-full" 
    />
    <div className="relative w-10 h-10 bg-white border-2 border-darkSerpent/10 rounded-full flex items-center justify-center shadow-sm">
      <Layers className="w-5 h-5 text-darkSerpent" />
    </div>
  </div>
);

const VisionGrid = () => (
  <div className="relative w-12 h-12 mb-6 grid grid-cols-2 gap-1 p-1 bg-white/[0.03] border border-white/10 rounded-xl">
    {[0, 1, 2, 3].map((i) => (
      <motion.div 
        key={i}
        animate={{ opacity: [0.3, 1, 0.3] }}
        transition={{ duration: 2, delay: i * 0.2, repeat: Infinity }}
        className="bg-saffaron/40 rounded-[4px]" 
      />
    ))}
    <Target className="absolute inset-0 m-auto w-5 h-5 text-white/40" />
  </div>
);

const VideoLens = () => (
  <div className="relative w-12 h-12 mb-6 rounded-2xl border-2 border-darkSerpent/30 flex items-center justify-center overflow-hidden bg-white shadow-inner">
    <motion.div 
      animate={{ x: [-20, 20, -20] }}
      transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      className="absolute inset-y-0 w-1/2 bg-darkSerpent/10 skew-x-12"
    />
    <Eye className="w-6 h-6 text-darkSerpent relative z-10" />
  </div>
);

// --- REFINED DATA ---

const SERVICES = [
  {
    title: "Text Solutions",
    desc: "Precision linguistic processing for LLMs.",
    capabilities: ["Text Collection", "Labelling", "Transcription", "Sentiment Analysis"],
    visual: <DocumentStack />,
    accent: "bg-earthYellow"
  },
  {
    title: "Audio Data",
    desc: "High-fidelity acoustic categorization.",
    capabilities: ["Voice Categorization", "Music Tagging", "Intelligent CS", "Audio Labelling"],
    visual: <AudioNode />,
    accent: "bg-earthYellow"
  },
  {
    title: "Computer Vision",
    desc: "Visual data structuring & audit.",
    capabilities: ["Image Collection", "Object Detection", "Classification", "Image Audit"],
    visual: <VisionGrid />,
    accent: "bg-earthYellow"
  },
  {
    title: "Video Intelligence",
    desc: "Context-aware video stream analysis.",
    capabilities: ["Video Labelling", "Live Broadcast Audit", "Subtitle Gen", "Video Collection"],
    visual: <VideoLens />,
    accent: "bg-earthYellow"
  }
];

export default function Solutions() {
  return (
    <div className="selection:bg-saffaron/30">
      
       <section className="bg-darkSerpent pt-25 pb-20 relative overflow-hidden text-white">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-castletonGreen/10 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-saffaron/5 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2" />
        
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Left: Text */}
            <Animate>
              <span className="text-saffaron font-bold text-xs uppercase tracking-[0.3em] mb-6 block">Industry Leader</span>
              <h1 className="text-6xl md:text-8xl font-bold tracking-tighter leading-[0.9] mb-8">
                AI Solutions <br/> 
                <span className="text-white/20 italic">at Scale.</span>
              </h1>
              <p className="text-white/60 text-xl leading-relaxed max-w-2xl">
                Empowering global enterprises with high-fidelity data engineering. We transform raw information into the foundational intelligence that powers the world's most advanced AI models.
              </p>
            </Animate>

            {/* Right: Video */}
            <Animate delay={150}>
              <VideoPlayer />
            </Animate>
          </div>
        </div>
      </section>

      <section id="services" className="py-20 bg-[#F8F9FA] text-darkSerpent relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          
          {/* Section Header */}
          <div className="max-w-2xl mb-7">
            <Animate>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-darkSerpent/5 border border-darkSerpent/5 mb-6">
                <span className="w-2 h-2 rounded-full bg-saffaron animate-pulse" />
                <span className="text-[10px] font-bold uppercase tracking-widest text-darkSerpent/60">Core Capabilities</span>
              </div>
              <h2 className="text-5xl md:text-6xl font-bold tracking-tight mb-6">AI Services</h2>
              <p className="text-darkSerpent/50 text-xl leading-relaxed">
                Modular data services engineered for the next generation of machine learning.
              </p>
            </Animate>
          </div>

          {/* Interactive Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-20">
            {SERVICES.map((service, i) => (
              <Animate key={i} delay={i * 50}>
                <motion.div 
                  whileHover={{ y: -5 }}
                  className="group relative p-8 rounded-[2rem] bg-darkSerpent border border-darkSerpent/[0.06] transition-all duration-300 hover:border-darkSerpent/10 hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.05)] h-full flex flex-col"
                >
                  {/* Static Header */}
                  <div className="mb-6">{service.visual}</div>
                  <h3 className="text-xl font-bold mb-2 text-white transition-colors">{service.title}</h3>
                  <p className="text-sm text-white/40 mb-8 leading-relaxed">{service.desc}</p>

                  {/* Interactive Capabilities List */}
                  <div className="mt-auto space-y-3">
                    {service.capabilities.map((item, idx) => (
                      <div 
                        key={idx} 
                        className="flex items-center justify-between group/item py-2 border-b last:border-0"
                      >
                        <span className="text-xs font-semibold text-white/60 group-hover/item:text-white transition-colors">
                          {item}
                        </span>
                        <ArrowRight className="w-3 h-3 opacity-0 -translate-x-2 group-hover/item:opacity-100 group-hover/item:translate-x-0 transition-all text-saffaron" />
                      </div>
                    ))}
                  </div>

                  {/* Top Progress bar decoration */}
                  <div className={`absolute top-0 left-12 right-12 h-1 rounded-b-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${service.accent}`} />
                </motion.div>
              </Animate>
            ))}
          </div>

          {/* --- SUBSECTION: COMPREHENSIVE DATA SOLUTIONS --- */}
          {/* ... (Kept the dark box from previous turn as it provides great contrast) ... */}
          <div className="relative">
            <div className="bg-darkSerpent rounded-[3rem] p-10 md:p-20 shadow-2xl relative overflow-hidden text-white">
              <div className="grid lg:grid-cols-12 gap-12 items-center relative z-10">
                <div className="lg:col-span-5">
                  <Animate>
                    <h2 className="text-3xl md:text-4xl font-bold mb-6 tracking-tight">Full-Cycle Data Engineering</h2>
                    <p className="text-white/40 leading-relaxed mb-8">
                      We manage the complexity of global data sourcing so your engineering team can focus on model architecture.
                    </p>
                    <div className="flex gap-4">
                      <div className="px-5 py-2 rounded-xl bg-white/5 border border-white/10 text-[10px] font-bold uppercase tracking-widest text-saffaron">Ethical Sourcing</div>
                      <div className="px-5 py-2 rounded-xl bg-white/5 border border-white/10 text-[10px] font-bold uppercase tracking-widest text-castletonGreen">Human-In-The-Loop</div>
                    </div>
                  </Animate>
                </div>
                <div className="lg:col-span-7 grid grid-cols-1 md:grid-cols-3 gap-4">
                  {/* Simplified Steps */}
                  {["Sourcing", "Synthesis", "Audit"].map((step, idx) => (
                    <div key={idx} className="p-6 rounded-2xl bg-white/[0.02] border border-white/5 hover:bg-white/5 transition-colors">
                      <span className="text-xs font-bold text-saffaron mb-2 block">Phase 0{idx + 1}</span>
                      <h4 className="font-bold text-lg mb-1">{step}</h4>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}