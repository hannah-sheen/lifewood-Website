import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowRight, Briefcase, MapPin, Clock, Users, 
  Heart, Lightbulb, ShieldCheck, Volume2, VolumeX
} from 'lucide-react';
import Animate from '../components/Animate.tsx';

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

// SAMPLE JOB DATA
const POSITIONS = [
  { 
    id: 1, 
    title: "AI Data Specialist", 
    department: "Operations", 
    location: "Cebu City, Philippines", 
    type: "Full-time",
    desc: "Join our core data team to engineer high-fidelity datasets for global AI leaders. You will manage complex labeling projects across text, audio, and visual modalities."
  },
  { 
    id: 2, 
    title: "Digital Marketing Officer", 
    department: "Marketing", 
    location: "Remote / Hybrid", 
    type: "Full-time",
    desc: "Drive brand visibility for Lifewood's AI services. You'll lead data-driven campaigns and manage our digital presence across emerging markets."
  },
  { 
    id: 3, 
    title: "Senior ML Data Architect", 
    department: "Engineering", 
    location: "Johannesburg, South Africa", 
    type: "Contract",
    desc: "Design scalable data acquisition pipelines. Experience with autonomous driving datasets or NLP speech acquisition is highly preferred."
  },
  { 
    id: 4, 
    title: "Admin/Accounting Assistant", 
    department: "Administration", 
    location: "Lagos, Nigeria", 
    type: "Full-time",
    desc: "Support our regional finance operations. This role handles AP/AR, record management, and ensures financial compliance across our West Africa hub."
  }
];

const CULTURE_VALUES = [
  { title: "Diversity", icon: <Users className="w-5 h-5" />, desc: "We celebrate unique perspectives that move us forward." },
  { title: "Caring", icon: <Heart className="w-5 h-5" />, desc: "We care for every person equally; work is meaningless without it." },
  { title: "Innovation", icon: <Lightbulb className="w-5 h-5" />, desc: "The heart of our service, challenging us to improve daily." },
  { title: "Integrity", icon: <ShieldCheck className="w-5 h-5" />, desc: "Ethical and sustainable action is our foundation." }
];

export default function Careers() {
  const [filter, setFilter] = useState("All");
  const categories = ["All", "Operations", "Marketing", "Engineering", "Administration"];

  const filteredJobs = filter === "All" 
    ? POSITIONS 
    : POSITIONS.filter(job => job.department === filter);

  return (
    <div className="bg-seaSalt min-h-screen selection:bg-saffaron/30">
      
      {/* 1. HERO SECTION */}
      <section className="pt-32 pb-20 bg-darkSerpent text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-castletonGreen/10 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/4" />
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Left: Text */}
            <Animate>
              <span className="text-saffaron font-bold text-xs uppercase tracking-[0.2em] mb-4 block">Work With Us</span>
              <h1 className="text-6xl md:text-8xl font-bold tracking-tighter leading-[0.9] mb-8">
                Empower Your <br/> <span className="text-white/20 italic">Global Career.</span>
              </h1>
              <p className="text-white/60 text-xl leading-relaxed">
                Lifewood is more than a tech provider—we are a social enterprise. Join a team where high-performance AI data engineering meets real-world social impact.
              </p>
            </Animate>
            {/* Right: Video */}
            <Animate delay={150}>
              <VideoPlayer src="/src/assets/careers/Lifewood Empowering the Future Through AI 2025.mp4" />
            </Animate>
          </div>
        </div>
      </section>


      {/* 2. CULTURE & VALUES */}
      <section className="py-24 bg-white">
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
                <div className="p-8 rounded-3xl bg-seaSalt hover:bg-white border border-darkSerpent/[0.03] hover:shadow-xl transition-all group">
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

      {/* 3. OPEN POSITIONS SECTION */}
      <section id="openings" className="py-24 bg-seaSalt">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-16">
            <Animate>
              <span className="text-saffaron font-bold text-xs uppercase tracking-[0.2em] mb-4 block">Current Openings</span>
              <h2 className="text-5xl font-bold tracking-tighter text-darkSerpent mb-8">Join the Lab</h2>
              
              {/* FILTERS */}
              <div className="flex flex-wrap justify-center gap-2">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setFilter(cat)}
                    className={`px-6 py-2 rounded-full text-[10px] font-black uppercase tracking-widest transition-all ${
                      filter === cat 
                      ? "bg-saffaron text-darkSerpent shadow-lg shadow-saffaron/20" 
                      : "bg-white text-darkSerpent/40 hover:text-darkSerpent border border-darkSerpent/5"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </Animate>
          </div>

          {/* JOBS LIST */}
          <div className="space-y-4">
            <AnimatePresence mode="popLayout">
              {filteredJobs.map((job) => (
                <motion.div
                  key={job.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="group bg-white p-8 rounded-[2rem] border border-darkSerpent/[0.02] shadow-sm hover:shadow-xl transition-all cursor-pointer overflow-hidden relative"
                >
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="px-3 py-1 bg-castletonGreen/5 text-castletonGreen text-[9px] font-bold uppercase tracking-wider rounded-md">
                          {job.department}
                        </span>
                        <span className="text-[9px] font-bold text-darkSerpent/30 uppercase tracking-widest flex items-center gap-1">
                          <Clock className="w-3 h-3" /> {job.type}
                        </span>
                      </div>
                      <h3 className="text-2xl font-bold text-darkSerpent mb-4 group-hover:text-saffaron transition-colors">
                        {job.title}
                      </h3>
                      <p className="text-darkSerpent/50 text-sm leading-relaxed max-w-2xl mb-6">
                        {job.desc}
                      </p>
                      <div className="flex items-center gap-4 text-[11px] font-bold text-darkSerpent/40 uppercase tracking-widest">
                        <span className="flex items-center gap-1.5"><MapPin className="w-3.5 h-3.5 text-saffaron" /> {job.location}</span>
                        <span className="flex items-center gap-1.5"><Briefcase className="w-3.5 h-3.5 text-saffaron" /> Remote Options</span>
                      </div>
                    </div>
                    
                    <button className="bg-darkSerpent text-white px-8 py-4 rounded-2xl font-bold text-sm flex items-center justify-center gap-2 hover:bg-saffaron hover:text-darkSerpent transition-all shrink-0">
                      Apply Now <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                  
                  {/* HOVER ACCENT */}
                  <div className="absolute top-0 right-0 w-32 h-32 bg-saffaron/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 group-hover:bg-saffaron/20 transition-all" />
                </motion.div>
              ))}
            </AnimatePresence>

            {filteredJobs.length === 0 && (
              <div className="text-center py-20 bg-white/50 rounded-[2rem] border border-dashed border-darkSerpent/10">
                <p className="text-darkSerpent/40 font-medium">No current openings in this department.</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* 4. FOOTER CALL TO ACTION */}
      {/* <section className="py-20 bg-darkSerpent">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <Animate>
            <h2 className="text-4xl font-bold text-white mb-6">Don't see a fit?</h2>
            <p className="text-white/50 mb-10 text-lg">
              We are always looking for passionate people in AI, data engineering, and linguistics. Send us your resume for future opportunities.
            </p>
            <a href="mailto:careers@lifewood.com" className="text-saffaron font-bold border-b-2 border-saffaron/20 hover:border-saffaron pb-1 transition-all text-xl">
              careers@lifewood.com
            </a>
          </Animate>
        </div>
      </section> */}
    </div>
  );
}