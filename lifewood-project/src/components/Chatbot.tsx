import { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Bot } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface Message {
  from: 'bot' | 'user';
  text: string;
}

const KB: { keywords: string[]; answer: string }[] = [
  // ── GENERAL ──────────────────────────────────────────────────────────────
  {
    keywords: ['what is lifewood', 'about lifewood', 'who is lifewood', 'tell me about lifewood', 'company'],
    answer:
      'Lifewood is a global leader in AI data technology, specializing in precision data engineering and labeling to power the next generation of machine learning. Founded in 2004, we are also a social enterprise that establishes centers in under-resourced economies to provide high-tech skills and equitable wages.',
  },
  {
    keywords: ['founded', 'history', 'since', 'how long', 'established', 'when was'],
    answer: 'Lifewood was founded in 2004 and has since grown into a global leader in AI data solutions with a strong social impact mission.',
  },
  {
    keywords: ['tagline', 'slogan', 'motto'],
    answer: 'Lifewood\'s tagline is "Intelligence with Purpose" — reflecting our commitment to AI innovation that drives real-world social impact.',
  },

  // ── VISION & MISSION ─────────────────────────────────────────────────────
  {
    keywords: ['vision'],
    answer:
      'Our vision is to be the global champion in AI data solutions, igniting a culture of innovation and sustainability that enriches lives and transforms communities worldwide.',
  },
  {
    keywords: ['mission'],
    answer:
      'Our mission is to develop and deploy cutting-edge AI technologies that solve real-world problems, empower communities, and advance sustainable practices — fostering innovation and making a meaningful impact on society and the environment.',
  },

  // ── CORE VALUES ──────────────────────────────────────────────────────────
  {
    keywords: ['core values', 'values', 'culture', 'what do you stand for', 'principles'],
    answer:
      'Lifewood\'s core values are:\n• Diversity – We celebrate differences in belief, philosophy, and ways of life.\n• Caring – We care for every person deeply and equally.\n• Innovation – Innovation is at the heart of all we do.\n• Integrity – We act ethically and sustainably in everything we do.',
  },

  // ── SERVICES (Services page) ─────────────────────────────────────────────
  {
    keywords: ['services', 'what do you offer', 'offerings', 'what does lifewood do'],
    answer:
      'Lifewood offers four main services:\n1. Data Servicing – Document capture, extraction, cleaning, labeling, and QA.\n2. Horizontal LLM Data – AI data solutions for LLMs including multimodal datasets.\n3. Vertical LLM Data – Specialized annotation for autonomous driving, smart cockpits, and enterprise LLMs.\n4. AI Generated Content (AIGC) – Cinematic-quality video, voice, and imagery using generative AI.',
  },
  {
    keywords: ['data servicing', 'data service', 'document capture', 'data extraction'],
    answer:
      'Data Servicing covers end-to-end data services: document capture, extraction, cleaning, labeling, and quality assurance for multi-language datasets. Key features include Auto Crop, Auto De-skew, Blur Detection, Foreign Object Detection, and AI Data Extraction. It ensures accurate, scalable, and structured data for AI tools.',
  },
  {
    keywords: ['horizontal llm', 'llm data', 'large language model', 'multimodal'],
    answer:
      'Horizontal LLM Data provides comprehensive AI data solutions for LLMs — collection, annotation, and model testing. We mobilized 30,000+ native-speaking resources from 30+ countries to complete 25,400 valid hours of voice collection and annotation across 23 countries in just 5 months.',
  },
  {
    keywords: ['vertical llm', 'autonomous driving', 'smart cockpit', 'shipgpt'],
    answer:
      'Vertical LLM Data specializes in annotation for industry-specific verticals including autonomous driving, smart cockpits, and enterprise-grade private LLMs like "ShipGPT". We achieved 99% accuracy with on-time delivery, expanding operations to Malaysia and Indonesia.',
  },
  {
    keywords: ['aigc', 'ai generated content', 'generative ai', 'video content', 'cinematic'],
    answer:
      'AIGC (AI Generated Content) integrates advanced generative AI with traditional production and storytelling. We create cinematic-quality video, voice, and imagery for brands leading the communication revolution using advanced film, video, and editing techniques.',
  },

  // ── SOLUTIONS (Solutions page) ───────────────────────────────────────────
  {
    keywords: ['solutions', 'ai solutions', 'data solutions', 'comprehensive'],
    answer:
      'Lifewood\'s comprehensive data solutions include:\n• Data Acquisition – End-to-end capturing, processing, and managing of large-scale datasets.\n• Data Collection – Multi-modal collection across text, audio, image, and video.\n• Data Curation – Sifting, selecting, and indexing data for reliability and accessibility.\n• Data Annotation – High-quality annotation services fueling AI and machine learning.\n• Data Validation – Ensuring data is consistent, accurate, and complete.',
  },
  {
    keywords: ['data acquisition'],
    answer: 'Data Acquisition provides end-to-end solutions for capturing, processing, and managing large-scale, diverse datasets to power AI systems.',
  },
  {
    keywords: ['data collection'],
    answer: 'Data Collection delivers multi-modal data collection across text, audio, image, and video, supported by advanced workflows for global AI projects.',
  },
  {
    keywords: ['data curation'],
    answer: 'Data Curation involves sifting, selecting, and indexing data to ensure reliability, accessibility, and ease of classification for AI training.',
  },
  {
    keywords: ['data annotation', 'annotation'],
    answer: 'Data Annotation provides high-quality annotation services — the fuel for all analytic and machine learning models — at global scale.',
  },
  {
    keywords: ['data validation', 'validation'],
    answer: 'Data Validation ensures data is consistent, accurate, and complete, preventing data loss or errors in AI training pipelines.',
  },

  // ── AI SERVICES (Solutions page) ─────────────────────────────────────────
  {
    keywords: ['ai services', 'text solutions', 'audio data', 'computer vision', 'video intelligence'],
    answer:
      'Lifewood\'s AI Services include four capability areas:\n• Text Solutions – LLM-ready linguistic datasets (collection, labelling, transcription, sentiment).\n• Audio Data – High-fidelity acoustic tagging (voice categorization, music tagging, intelligent CS).\n• Computer Vision – Visual structuring & audit (image collection, object detection, classification).\n• Video Intelligence – Context-aware stream analysis (video labelling, live audit, subtitle generation).',
  },
  {
    keywords: ['text solution', 'linguistic', 'transcription', 'sentiment'],
    answer: 'Text Solutions provide LLM-ready linguistic datasets including text collection, labelling, transcription, and sentiment analysis.',
  },
  {
    keywords: ['audio data', 'voice', 'music tagging', 'acoustic'],
    answer: 'Audio Data services cover high-fidelity acoustic tagging including voice categorization, music tagging, intelligent customer service, and labelling.',
  },
  {
    keywords: ['computer vision', 'image', 'object detection', 'classification'],
    answer: 'Computer Vision services include image collection, object detection, classification, and audit — structuring visual data for AI models.',
  },
  {
    keywords: ['video intelligence', 'video labelling', 'subtitle', 'live audit'],
    answer: 'Video Intelligence provides context-aware stream analysis including video labelling, live audit, subtitle generation, and collection.',
  },

  // ── AI PROJECTS (Solutions page) ─────────────────────────────────────────
  {
    keywords: ['ai projects', 'projects', 'innovation lab', 'specialized'],
    answer:
      'Lifewood\'s AI Projects include:\n• AI Data Extraction – Image and text acquisition from multiple sources including onsite scanning and drone photography.\n• Machine Learning Enablement – High-quality datasets for complex model training.\n• Autonomous Driving – Large-scale visual labeling and object detection for self-driving systems.\n• AI-Enabled Customer Service – Linguistic models and sentiment analysis for smarter support.\n• NLP & Speech – Natural Language Processing across 30+ languages and dialects.\n• Computer Vision – Visual data classification, audit, and real-time live video intelligence.\n• Genealogy – Digitization and transcription of historical records.',
  },
  {
    keywords: ['genealogy', 'historical records', 'digitization', 'heritage'],
    answer: 'Lifewood\'s Genealogy project focuses on digitization and transcription of historical records, making heritage data accessible and classified for genealogy research.',
  },
  {
    keywords: ['nlp', 'natural language', 'speech', 'language processing'],
    answer: 'NLP & Speech services cover Natural Language Processing and Speech Acquisition across 30+ languages and regional dialects.',
  },
  {
    keywords: ['machine learning', 'model training', 'algorithmic'],
    answer: 'Machine Learning Enablement builds high-quality datasets that fuel complex model training and algorithmic refinement for AI systems.',
  },
  {
    keywords: ['customer service', 'ai-enabled', 'sentiment analysis', 'support'],
    answer: 'AI-Enabled Customer Service develops linguistic models and sentiment analysis for smarter, context-aware support interactions.',
  },

  // ── CAREERS ───────────────────────────────────────────────────────────────
  {
    keywords: ['careers', 'jobs', 'hiring', 'work', 'apply', 'employment', 'join', 'open roles', 'positions', 'opportunities'],
    answer:
      'Lifewood is always looking for talented individuals to join our global team. Visit our Careers page to explore open positions. You can:\n• Apply Now – Submit your application to join our talent pool.\n• Check Application – Track your existing application status using your application ID.\nWe offer roles across AI data operations, technology, and more.',
  },
  {
    keywords: ['check application', 'application status', 'track application', 'application id'],
    answer: 'You can check your application status on the Careers page by clicking "Check Application" and entering your application ID.',
  },
  {
    keywords: ['why work', 'why lifewood', 'work culture', 'employee', 'team'],
    answer:
      'Working at Lifewood means being part of a purpose-driven organization where high-performance AI data engineering meets real-world social impact. Our culture is built on Diversity, Caring, Innovation, and Integrity — empowering communities while driving AI innovation forward.',
  },

  // ── GLOBAL REACH ─────────────────────────────────────────────────────────
  {
    keywords: ['global reach', 'countries', 'offices', 'locations', 'where', 'presence', 'delivery centers'],
    answer:
      'Lifewood operates in 30+ countries across all continents with 40+ global delivery centers. Our offices span Africa (South Africa, Nigeria, Kenya, Egypt, Ghana, Madagascar, Uganda, Tanzania, Zimbabwe, and more) and Asia (Bangladesh). We maintain a 24/7 follow-the-sun model for rapid global delivery.',
  },
  {
    keywords: ['africa', 'african'],
    answer: 'Lifewood has a strong presence across Africa including offices in South Africa (Johannesburg), Nigeria (Lagos), Kenya (Nairobi), Egypt (Cairo), Ghana (Accra), Uganda (Kampala), Tanzania (Dar es Salaam), Zimbabwe (Harare), and many more countries.',
  },
  {
    keywords: ['bangladesh', 'asia', 'dhaka'],
    answer: 'Lifewood\'s South Asia headquarters is in Dhaka, Bangladesh with 300+ employees, serving as a key hub for AI data operations.',
  },
  {
    keywords: ['stats', 'numbers', 'scale', 'how big', 'size', 'resources'],
    answer:
      'Lifewood by the numbers:\n• 40+ Global Delivery Centers\n• 30+ Countries across all continents\n• 50+ Languages & Dialects\n• 56,000+ Global Online Resources',
  },

  // ── PARTNERS & CLIENTS ───────────────────────────────────────────────────
  {
    keywords: ['partners', 'clients', 'partnerships', 'who do you work with'],
    answer:
      'Lifewood partners with globally recognized leaders including Google, Microsoft, Apple, Ancestry, FamilySearch, BYU, and Moore Global — delivering impactful AI-driven data solutions across technology, genealogy, and research.',
  },

  // ── SOCIAL IMPACT ────────────────────────────────────────────────────────
  {
    keywords: ['social impact', 'community', 'philanthropy', 'social enterprise', 'empowerment'],
    answer:
      'Lifewood is a social enterprise. In partnership with philanthropic partners, we have expanded operations across Africa and Bangladesh — bringing high-tech skills, equitable wages, and career progression to under-resourced communities. We are committed to sustainable change and inclusive growth worldwide.',
  },

  // ── CONTACT ───────────────────────────────────────────────────────────────
  {
    keywords: ['contact', 'reach', 'email', 'get in touch', 'phone', 'call'],
    answer:
      'You can reach Lifewood through:\n• Email: lifewood@lifewood.com\n• Phone: +41 123 456 123\n• Or use the Contact form on our website to send a message directly.',
  },

  // ── SOCIAL MEDIA ─────────────────────────────────────────────────────────
  {
    keywords: ['social media', 'socials', 'linkedin', 'facebook', 'instagram', 'youtube', 'follow'],
    answer:
      'Follow Lifewood on social media:\n• LinkedIn: linkedin.com/company/lifewood-data-technology-ltd.\n• Facebook: facebook.com/LifewoodPH\n• Instagram: instagram.com/lifewood_official\n• YouTube: youtube.com/@LifewoodDataTechnology',
  },
  {
    keywords: ['linkedin'],
    answer: 'Find Lifewood on LinkedIn at: linkedin.com/company/lifewood-data-technology-ltd.',
  },
  {
    keywords: ['facebook'],
    answer: 'Follow Lifewood on Facebook at: facebook.com/LifewoodPH',
  },
  {
    keywords: ['instagram'],
    answer: 'Follow Lifewood on Instagram at: instagram.com/lifewood_official',
  },
  {
    keywords: ['youtube'],
    answer: 'Watch Lifewood on YouTube at: youtube.com/@LifewoodDataTechnology',
  },

  // ── LEGAL ─────────────────────────────────────────────────────────────────
  {
    keywords: ['legal', 'policies', 'policy', 'terms', 'privacy', 'cookie'],
    answer:
      'Lifewood has the following legal documents available on the website:\n• Privacy Policy – How we collect, use, and protect your personal data.\n• Cookie Policy – How we use cookies on our website.\n• Terms & Conditions – Rules for using the Lifewood website.',
  },
  {
    keywords: ['privacy policy', 'personal data', 'data protection', 'gdpr', 'your rights'],
    answer:
      'Lifewood\'s Privacy Policy covers:\n• We collect personal identifiers, professional info, communications, and technical data.\n• Data is used for processing applications, responding to inquiries, and improving services.\n• Application data is retained up to 2 years; contact form data up to 1 year.\n• We do not sell your personal information to third parties.\n• You have rights to access, correct, delete, or restrict your data.\nContact: lifewood@lifewood.com',
  },
  {
    keywords: ['cookie policy', 'cookies', 'tracking'],
    answer:
      'Lifewood uses the following types of cookies:\n• Strictly Necessary – Essential for the website to function.\n• Analytics – To measure and improve site performance (aggregated, anonymous).\n• Functional – For enhanced personalization like language preferences.\n• Marketing – To show relevant ads on other sites.\nYou can manage cookie preferences through Cookie Settings in the footer.',
  },
  {
    keywords: ['terms and conditions', 'terms of use', 'terms of service', 'website terms'],
    answer:
      'Lifewood\'s Terms & Conditions state:\n• You must use the website lawfully and not infringe others\' rights.\n• All website content is Lifewood\'s intellectual property.\n• Job application submissions do not guarantee an interview or employment.\n• The website is provided "as is" without warranties.\n• Lifewood is not liable for indirect or consequential damages.\nContact: lifewood@lifewood.com',
  },
  {
    keywords: ['intellectual property', 'copyright', 'content ownership'],
    answer: 'All content on the Lifewood website — including text, graphics, logos, images, and software — is the property of Lifewood Data Technology and is protected by intellectual property laws. Reproduction requires express written permission.',
  },
  {
    keywords: ['data retention', 'how long', 'store data'],
    answer: 'Lifewood retains application data for up to 2 years after a recruitment process concludes. Contact form submissions are retained for up to 1 year.',
  },
];

const SUGGESTIONS = [
  'What is Lifewood?',
  'What services do you offer?',
  'Tell me about AI Solutions',
  'Are there open job positions?',
  'How can I contact Lifewood?',
  'What are your social media pages?',
];

function getAnswer(input: string): string {
  const lower = input.toLowerCase();
  for (const entry of KB) {
    if (entry.keywords.some((kw) => lower.includes(kw))) {
      return entry.answer;
    }
  }
  return "I'm not sure about that. You can explore our website for more details, or contact us at lifewood@lifewood.com or +41 123 456 123.";
}

export default function Chatbot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { from: 'bot', text: "Hi! 👋 I'm the Lifewood assistant. Ask me anything about our services, solutions, careers, or company!" },
  ]);
  const [input, setInput] = useState('');
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, open]);

  const send = (text: string) => {
    const trimmed = text.trim();
    if (!trimmed) return;
    setMessages((prev) => [
      ...prev,
      { from: 'user', text: trimmed },
      { from: 'bot', text: getAnswer(trimmed) },
    ]);
    setInput('');
  };

  return (
    <>
      {/* FLOATING BUTTON */}
      <motion.button
        onClick={() => setOpen((o) => !o)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        className="fixed bottom-6 right-6 z-[200] w-14 h-14 rounded-full bg-saffaron shadow-lg flex items-center justify-center cursor-pointer"
        aria-label="Open chat"
      >
        <AnimatePresence mode="wait" initial={false}>
          {open ? (
            <motion.span key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.2 }}>
              <X className="w-6 h-6 text-darkSerpent" />
            </motion.span>
          ) : (
            <motion.span key="open" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.2 }}>
              <MessageCircle className="w-6 h-6 text-darkSerpent" />
            </motion.span>
          )}
        </AnimatePresence>
      </motion.button>

      {/* CHAT POPUP */}
      <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0, y: 24, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 16, scale: 0.95 }}
          transition={{ type: 'spring', stiffness: 340, damping: 28 }}
          className="fixed bottom-24 right-6 z-[200] w-80 sm:w-96 bg-white rounded-2xl shadow-2xl flex flex-col overflow-hidden border border-darkSerpent/10"
          style={{ maxHeight: '520px' }}
        >
          {/* Header */}
          <div className="bg-darkSerpent px-4 py-3 flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-saffaron flex items-center justify-center shrink-0">
              <Bot className="w-4 h-4 text-darkSerpent" />
            </div>
            <div>
              <p className="text-white text-sm font-bold leading-none">Lifewood Assistant</p>
              <p className="text-white/50 text-xs mt-0.5">Ask me about Lifewood</p>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-seaSalt" style={{ minHeight: 0 }}>
            {messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.from === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div
                  className={`max-w-[80%] px-3 py-2 rounded-2xl text-sm whitespace-pre-line leading-relaxed ${
                    msg.from === 'user'
                      ? 'bg-saffaron text-darkSerpent rounded-br-sm'
                      : 'bg-white text-darkSerpent border border-darkSerpent/10 rounded-bl-sm'
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
            <div ref={bottomRef} />
          </div>

          {/* Suggestions (only on first message) */}
          {messages.length === 1 && (
            <div className="px-4 pb-2 bg-seaSalt flex flex-wrap gap-2">
              {SUGGESTIONS.map((s) => (
                <button
                  key={s}
                  onClick={() => send(s)}
                  className="text-xs px-3 py-1.5 rounded-full border border-saffaron/50 text-darkSerpent hover:bg-saffaron/20 transition-colors cursor-pointer"
                >
                  {s}
                </button>
              ))}
            </div>
          )}

          {/* Input */}
          <div className="p-3 bg-white border-t border-darkSerpent/10 flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && send(input)}
              placeholder="Type a question..."
              className="flex-1 text-sm px-3 py-2 rounded-xl border border-darkSerpent/15 outline-none focus:border-saffaron bg-seaSalt text-darkSerpent placeholder:text-darkSerpent/40"
            />
            <button
              onClick={() => send(input)}
              className="w-9 h-9 rounded-xl bg-saffaron flex items-center justify-center hover:bg-earthYellow transition-colors cursor-pointer shrink-0"
            >
              <Send className="w-4 h-4 text-darkSerpent" />
            </button>
          </div>
        </motion.div>
      )}
      </AnimatePresence>
    </>
  );
}
