import { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Bot } from 'lucide-react';

interface Message {
  from: 'bot' | 'user';
  text: string;
}

const KB: { keywords: string[]; answer: string }[] = [
  {
    keywords: ['what is lifewood', 'about lifewood', 'who is lifewood', 'tell me about'],
    answer:
      'Lifewood is a global leader in AI data technology, specializing in precision data engineering and labeling to power the next generation of machine learning. Founded in 2004, we are also a social enterprise that establishes centers in under-resourced economies to provide high-tech skills and equitable wages.',
  },
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
  {
    keywords: ['core values', 'values'],
    answer:
      'Lifewood\'s core values are:\n• Diversity – We celebrate differences in belief, philosophy, and ways of life.\n• Caring – We care for every person deeply and equally.\n• Innovation – Innovation is at the heart of all we do.\n• Integrity – We act ethically and sustainably in everything we do.',
  },
  {
    keywords: ['services', 'what do you offer', 'offerings'],
    answer:
      'Lifewood offers four main services:\n1. Data Servicing – Document capture, extraction, cleaning, labeling, and QA.\n2. Horizontal LLM Data – AI data solutions for LLMs including multimodal datasets.\n3. Vertical LLM Data – Specialized annotation for autonomous driving, smart cockpits, and enterprise LLMs.\n4. AI Generated Content (AIGC) – Cinematic-quality video, voice, and imagery using generative AI.',
  },
  {
    keywords: ['data servicing', 'data service'],
    answer:
      'Data Servicing covers end-to-end data services: document capture, extraction, cleaning, labeling, and quality assurance for multi-language datasets. Features include Auto Crop, Auto De-skew, Blur Detection, Foreign Object Detection, and AI Data Extraction.',
  },
  {
    keywords: ['horizontal llm', 'llm data', 'large language model'],
    answer:
      'Horizontal LLM Data provides comprehensive AI data solutions for LLMs — collection, annotation, and model testing. We have proven expertise in multimodal datasets (voice, image, text) for large-scale global projects across 30+ countries.',
  },
  {
    keywords: ['vertical llm', 'autonomous driving', 'smart cockpit'],
    answer:
      'Vertical LLM Data specializes in annotation for industry-specific verticals including autonomous driving, smart cockpits, and enterprise-grade private LLMs. We achieved 99% accuracy with on-time delivery across multiple countries.',
  },
  {
    keywords: ['aigc', 'ai generated content', 'generative ai', 'video content'],
    answer:
      'AIGC (AI Generated Content) integrates advanced generative AI with traditional production and storytelling. We create cinematic-quality video, voice, and imagery for brands leading the communication revolution.',
  },
  {
    keywords: ['global reach', 'countries', 'offices', 'locations', 'where'],
    answer:
      'Lifewood operates in 30+ countries across all continents with 40+ global delivery centers. Our offices span Africa (South Africa, Nigeria, Kenya, Egypt, Ghana, and more) and Asia (Bangladesh). We cover 50+ languages and dialects with 56,000+ global online resources.',
  },
  {
    keywords: ['partners', 'clients', 'partnerships'],
    answer:
      'Lifewood partners with globally recognized leaders including Google, Microsoft, Apple, Ancestry, FamilySearch, BYU, and Moore Global — delivering impactful AI-driven data solutions across technology, genealogy, and research.',
  },
  {
    keywords: ['careers', 'jobs', 'hiring', 'work', 'apply', 'employment'],
    answer:
      'Lifewood is always looking for talented individuals to join our global team. Visit our Careers page to explore open positions and apply. We offer opportunities across AI data operations, technology, and more.',
  },
  {
    keywords: ['contact', 'reach', 'email', 'get in touch'],
    answer:
      'You can reach Lifewood through our Contact page on the website. We\'d love to hear from you whether you\'re a potential client, partner, or job seeker.',
  },
  {
    keywords: ['founded', 'history', 'since', 'how long'],
    answer:
      'Lifewood was founded in 2004 and has since grown into a global leader in AI data solutions with a strong social impact mission.',
  },
  {
    keywords: ['social impact', 'community', 'philanthropy', 'africa', 'bangladesh'],
    answer:
      'Lifewood is a social enterprise. In partnership with philanthropic partners, we have expanded operations across Africa and Bangladesh — bringing high-tech skills, equitable wages, and career progression to under-resourced communities.',
  },
  {
    keywords: ['stats', 'numbers', 'scale', 'how big', 'size'],
    answer:
      'Lifewood by the numbers:\n• 40+ Global Delivery Centers\n• 30+ Countries across all continents\n• 50+ Languages & Dialects\n• 56,000+ Global Online Resources',
  },
];

const SUGGESTIONS = [
  'What is Lifewood?',
  'What services do you offer?',
  'Where are your offices?',
  'Who are your partners?',
  'Tell me about your mission',
];

function getAnswer(input: string): string {
  const lower = input.toLowerCase();
  for (const entry of KB) {
    if (entry.keywords.some((kw) => lower.includes(kw))) {
      return entry.answer;
    }
  }
  return "I'm not sure about that. You can explore our website for more details, or visit our Contact page to reach our team directly.";
}

export default function Chatbot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { from: 'bot', text: 'Hi! 👋 I\'m the Lifewood assistant. Ask me anything about Lifewood — our services, mission, offices, and more!' },
  ]);
  const [input, setInput] = useState('');
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, open]);

  const send = (text: string) => {
    const trimmed = text.trim();
    if (!trimmed) return;
    const userMsg: Message = { from: 'user', text: trimmed };
    const botMsg: Message = { from: 'bot', text: getAnswer(trimmed) };
    setMessages((prev) => [...prev, userMsg, botMsg]);
    setInput('');
  };

  return (
    <>
      {/* FLOATING BUTTON */}
      <button
        onClick={() => setOpen((o) => !o)}
        className="fixed bottom-6 right-6 z-[200] w-14 h-14 rounded-full bg-saffaron shadow-lg flex items-center justify-center hover:scale-110 transition-transform cursor-pointer"
        aria-label="Open chat"
      >
        {open ? <X className="w-6 h-6 text-darkSerpent" /> : <MessageCircle className="w-6 h-6 text-darkSerpent" />}
      </button>

      {/* CHAT POPUP */}
      {open && (
        <div className="fixed bottom-24 right-6 z-[200] w-80 sm:w-96 bg-white rounded-2xl shadow-2xl flex flex-col overflow-hidden border border-darkSerpent/10"
          style={{ maxHeight: '520px' }}>
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
        </div>
      )}
    </>
  );
}
