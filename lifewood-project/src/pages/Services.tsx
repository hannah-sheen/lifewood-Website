import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Database, Globe, Truck, Video, ChevronDown, ChevronUp, VolumeX, Volume2 } from 'lucide-react';
import Animate from '../components/Animate';
import svcData from '../assets/services/data_servicing.mp4';
import svcHorizontal from '../assets/services/horizontal_LLM.mp4';
import svcVertical from '../assets/services/vertical_LLM.mp4';
import svcAigc from '../assets/services/aigc.mp4';

const SERVICES = [
  {
    video: svcData,
    id: 'data',
    title: 'Data Servicing',
    icon: Database,
    color: 'bg-darkSerpent',
    desc: 'End-to-end data services: document capture, extraction, cleaning, labeling, and quality assurance for multi-language datasets. Expert in genealogy archives and high-volume song/lyric processing.',
    details: [
      { title: 'Objective', text: 'Scan document for preservation, extract data and structure into database.' },
      { title: 'Key Features', text: 'Features include Auto Crop, Auto De-skew, Blur Detection, Foreign Object Detection, and AI Data Extraction.' },
      { title: 'Results', text: 'Accurate and precise data is ensured through validation and quality assurance. The system is efficient and scalable, enabling fast and adaptable data extraction. It supports multiple languages and formats, allowing the handling of diverse documents. Advanced features include auto-crop, de-skew, blur, and object detection. With AI integration, the solution provides structured data for AI tools and delivers clear, visual, and easy-to-understand results.' }
    ]
  },
  {
    video: svcHorizontal,
    id: 'horizontal',
    title: 'Horizontal LLM Data',
    icon: Globe,
    color: 'bg-castletonGreen',
    desc: 'Comprehensive AI data solutions for LLMs, including collection, annotation, and model testing. Proven expertise in multimodal datasets (voice, image, text) for large-scale global projects.',
    details: [
      { title: 'Target', text: 'Capture and transcribe recordings from native speakers from 23 different countries (Netherlands, Spain, Norway, France, Germany, Poland, Russia, Italy, Japan, South Korea, Mexico, UAE, Saudi Arabia, Egypt, etc.). Voice content involves 6 project types and 9 data domains  A total of 25,400 valid hours durations' },
      { title: 'Solutions', text: '30,000+ native speaking human resources from more than 30 countries were mobilized.    Use our flexible industrial processes and continuously optimize them.    Use PBI to track the progress of daily collection and transcription in real time, analyze and improve the results in real time.' },
      { title: 'Results', text: '5 months to complete the voice collection and annotation of 25,400 valid hours on time and with quality' }
    ]
  },
  {
    video: svcVertical,
    id: 'vertical',
    title: 'Vertical LLM Data',
    icon: Truck,
    color: 'bg-saffaron',
    desc: 'Specialized data annotation and collection for industry-specific verticals, including autonomous driving, smart cockpits, and enterprise-grade private LLMs like "ShipGPT".',
    details: [
      { title: 'Target', text: 'Annotate vehicles, pedestrians, and road objects with 2D & 3D techniques to enable accurate object detection for autonomous driving. Self-driving cars rely on precise visual training to detect, classify, and respond safely in real-world conditions.' },
      { title: 'Solutions', text: 'Dedicated Process Engineering team for analysis and optimization AI-enhanced workflow with multi-level quality checks Scalable global delivery through crowdsourced workforce management' },
      { title: 'Results', text: 'Achieved 25% production in Month 1 with 95% accuracy (Target: 90%) and 50% production in Month 2 with 99% accuracy (Target: 95%). Maintained an overall accuracy of 99% with on-time delivery. Successfully expanded operations to Malaysia with 100 annotators and Indonesia with 150 annotators.' }
    ]
  },
  {
    video: svcAigc,
    id: 'aigc',
    title: 'AI Generated Content (AIGC)',
    icon: Video,
    color: 'bg-lightGreen',
    desc: 'Integrating advanced generative AI with traditional production and storytelling. We create cinematic-quality video, voice, and imagery for brands leading the communication revolution.',
    details: [
      { title: 'Approach', text: 'Our motivation is to express the personality of your brand in a compelling and distinctive way. We specialize in story-driven content, for companies looking to join the communication revolution.' },
      { title: 'Techniques', text: 'We use advanced film, video and editing techniques, combined with generative Al, to create cinematic worlds for your videos, advertisements and corporate communications.' }
    ]
  }
];

function VideoPlayer() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [muted, setMuted] = useState(true);
  const toggleMute = () => { if (videoRef.current) { videoRef.current.muted = !muted; setMuted(!muted); } };
  return (
    <div className="relative rounded-3xl overflow-hidden shadow-2xl aspect-video bg-darkSerpent/20">
      <video ref={videoRef} autoPlay muted loop playsInline className="w-full h-full object-cover" src="/src/assets/Lifewood Philippines AIGC Revolution Empowering Innovation.mp4" />
      <button onClick={toggleMute} className="absolute top-4 right-4 p-2.5 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20 transition-all">
        {muted ? <VolumeX className="w-4 h-4 text-white" /> : <Volume2 className="w-4 h-4 text-white" />}
      </button>
    </div>
  );
}

export default function Services() {
  const [activeIdx, setActiveIdx] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const style = document.createElement('style');
    style.innerHTML = `
      #service-scroll-container::-webkit-scrollbar { display: none; }
      #service-scroll-container { scrollbar-width: none; -ms-overflow-style: none; }
    `;
    document.head.appendChild(style);
    return () => { document.head.removeChild(style); };
  }, []);

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const { scrollTop, clientHeight } = e.currentTarget;
    const newIdx = Math.round(scrollTop / clientHeight);
    if (newIdx !== activeIdx && newIdx < SERVICES.length) setActiveIdx(newIdx);
  };

  const scrollUp = () => scrollRef.current?.scrollBy({ top: -scrollRef.current.clientHeight, behavior: 'smooth' });
  const scrollDown = () => scrollRef.current?.scrollBy({ top: scrollRef.current.clientHeight, behavior: 'smooth' });

  const ActiveIcon = SERVICES[activeIdx].icon;

  return (
    <div className="bg-seaSalt min-h-screen">
      <section className="pt-25 pb-20 bg-darkSerpent">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <Animate>
              <VideoPlayer />
            </Animate>
            <Animate delay={150}>
              <span className="text-saffaron font-bold text-xs uppercase tracking-[0.2em] mb-4 block">Our Services</span>
              <h1 className="text-6xl md:text-8xl font-bold tracking-tighter leading-[0.9] mb-8 text-white">
                Data for <span className="text-white/30 italic">Innovation.</span>
              </h1>
              <p className="text-xl text-white/70 leading-relaxed">
                Precision-engineered datasets powering the world's most advanced AI models and autonomous systems.
              </p>
            </Animate>
          </div>
        </div>
      </section>

      <div className="h-screen relative overflow-hidden">
        <section className="h-screen flex items-center max-w-7xl mx-auto px-6">
          <div className="relative w-1/2 h-screen">
            {activeIdx > 0 && (
              <button onClick={scrollUp} className="absolute top-[calc(50%-270px)] left-1/2 -translate-x-1/2 z-20 bg-white p-2 rounded-full shadow-lg hover:bg-saffaron transition-all cursor-pointer">
                <ChevronUp className="w-5 h-5 text-darkSerpent" />
              </button>
            )}

            <div ref={scrollRef} id="service-scroll-container" onScroll={handleScroll} className="h-full overflow-y-scroll snap-y snap-mandatory flex flex-col items-center">
              {SERVICES.map((service) => (
                <div key={service.id} className="min-h-screen w-full snap-start flex items-center justify-center p-12">
                  <div className={`h-[500px] w-full rounded-[2rem] shadow-2xl flex flex-col justify-end p-10 text-white relative overflow-hidden group`}>
                    <video autoPlay muted loop playsInline className="absolute inset-0 w-full h-full object-cover" src={service.video} />
                    <div className="absolute inset-0 bg-darkSerpent/55" />
                    <div className="absolute top-6 right-6 opacity-10 group-hover:opacity-20 transition-opacity z-10">
                      <service.icon className="w-24 h-24" />
                    </div>
                    <div className="relative z-10">
                      <h2 className="text-4xl font-bold tracking-tighter mb-3">{service.title}</h2>
                      <p className="opacity-80 text-base leading-relaxed whitespace-pre-line">{service.desc}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {activeIdx < SERVICES.length - 1 && (
              <button onClick={scrollDown} className="absolute bottom-[calc(50%-270px)] left-1/2 -translate-x-1/2 z-20 bg-white p-2 rounded-full shadow-lg hover:bg-saffaron transition-all cursor-pointer">
                <ChevronDown className="w-5 h-5 text-darkSerpent" />
              </button>
            )}
          </div>

          <div className="w-1/2 p-12">
            <div className="sticky top-32">
              <span className="text-saffaron font-black text-xs uppercase tracking-[0.2em] mb-4 block">Workflow Implementation</span>
              <AnimatePresence mode="wait">
                <motion.div 
                  key={SERVICES[activeIdx].id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-6"
                >
                  <div className="flex items-center gap-4 pb-6 border-b border-darkSerpent/10">
                    <div className="p-3 rounded-xl bg-saffaron/10">
                      <ActiveIcon className="w-8 h-8 text-saffaron" />
                    </div>
                    <h3 className="text-2xl font-bold text-darkSerpent">{SERVICES[activeIdx].title}</h3>
                  </div>

                  {SERVICES[activeIdx].details.map((item, i) => (
                    <div key={i} className="pb-4 border-b border-darkSerpent/10 last:border-0">
                      <h4 className="text-lg font-bold text-darkSerpent mb-1">{item.title}</h4>
                      <p className="text-sm text-darkSerpent/70 leading-relaxed">{item.text}</p>
                    </div>
                  ))}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}