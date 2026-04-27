import { useState } from 'react';
import Animate from '../components/Animate.tsx';
import partnershipImg from '../assets/partnership.jpeg';
import applicationImg from '../assets/application.jpeg';
import expandingImg from '../assets/expanding.jpeg';

const CARDS = [
  {
    label: 'Partnership', title: 'Building Together',
    desc: 'In partnership with our philanthropic partners, Lifewood has expanded operations across Africa and Bangladesh — bringing our methods and experience directly to communities that need it most.',
    bg: 'bg-darkSerpent', text: 'text-white', sub: 'text-white/60', img: partnershipImg,
  },
  {
    label: 'Application', title: 'Methods & Experience',
    desc: 'The development of people in under resourced economies requires the deliberate application of our methods and experience. We bring proven approaches to each community.',
    bg: 'bg-castletonGreen', text: 'text-white', sub: 'text-white/60', img: applicationImg,
  },
  {
    label: 'Expanding', title: 'Sustainable Change',
    desc: 'We are expanding access to training, establishing equitable wage structures and career and leadership progression to create sustainable change.',
    bg: 'bg-saffaron', text: 'text-darkSerpent', sub: 'text-darkSerpent/60', img: expandingImg,
  },
];

function ShowcaseSlider() {
  const [active, setActive] = useState(0);
  const [cursor, setCursor] = useState({ x: 0, y: 0, visible: false });
  const card = CARDS[active];

  return (
    <div className="w-full"
      onMouseMove={(e) => { const r = e.currentTarget.getBoundingClientRect(); setCursor({ x: e.clientX - r.left, y: e.clientY - r.top, visible: true }); }}
      onMouseLeave={() => setCursor(p => ({ ...p, visible: false }))}
      style={{ cursor: 'none' }}
    >
      <div className="grid md:grid-cols-2 gap-8 items-stretch relative">
        {cursor.visible && (
          <span className="absolute pointer-events-none z-50 rounded-full bg-saffaron" style={{
            left: cursor.x, top: cursor.y, width: 14, height: 14,
            transform: 'translate(-50%,-50%)', boxShadow: '0 0 10px 3px rgba(255,179,71,0.53)',
          }} />
        )}
        <div className="flex flex-col gap-4 h-[550px]">
          {CARDS.map((c, i) => {
            const isActive = i === active;
            return (
              <Animate key={i} delay={i * 100} className="flex-1">
                <div
                  onClick={() => setActive(i)}
                  style={{ cursor: 'none' }}
                  className={`rounded-2xl p-6 transition-all duration-300 h-full flex flex-col justify-center ${
                    isActive ? `${c.bg} shadow-xl scale-[1.02]` : 'bg-darkSerpent/20 hover:bg-darkSerpent/30 shadow-md'
                  }`}
                >
                  <span className={`text-xs font-semibold tracking-widest uppercase ${isActive ? c.sub : 'text-darkSerpent/40'}`}>{c.label}</span>
                  <h3 className={`text-xl font-semibold mt-2 mb-3 ${isActive ? c.text : 'text-darkSerpent/50'}`}>{c.title}</h3>
                  {isActive && <p className={`text-sm leading-relaxed ${c.sub} mt-2`}>{c.desc}</p>}
                </div>
              </Animate>
            );
          })}
        </div>
        <Animate delay={300} className="h-[550px]">
          <div className="relative rounded-2xl overflow-hidden h-full shadow-xl">
            <img key={active} src={card.img} alt={card.label} className="w-full h-full object-cover" style={{ animation: 'fadeUp 0.4s ease' }} />
            <div className={`absolute inset-0 ${card.bg} opacity-20`} />
            <div className="absolute bottom-5 left-5">
              <span className={`px-3 py-1 rounded-full text-xs font-semibold tracking-widest uppercase ${card.bg} ${card.text}`}>{card.label}</span>
            </div>
          </div>
        </Animate>
      </div>
    </div>
  );
}

export default function Philanthropy() {
  const [activeTab, setActiveTab] = useState('vision');

  const TABS = [
    { id: 'vision', label: 'Our Vision', icon: '👁️' },
    { id: 'how-we-work', label: 'How We Work', icon: '⚙️' },
  ];

  return (
    <div className="bg-darkSerpent min-h-screen">

      {/* HERO */}
      <div className="max-w-7xl mx-auto px-6 py-20">
        <div className="grid md:grid-cols-2 gap-10 items-center">
          <Animate>
            <span className="inline-block px-4 py-1.5 bg-saffaron/20 text-saffaron text-xs font-semibold rounded-full mb-6 tracking-widest uppercase">
              Philanthropy & Impact
            </span>
            <h1 className="text-4xl font-semibold text-white leading-tight mb-6">Philanthropy and Impact</h1>
            <p className="text-white/60 text-base leading-relaxed mb-8">
              We direct resources into education and developmental projects that create lasting change.
              Our approach goes beyond giving: it builds sustainable growth and empowers communities for the future.
            </p>
            <a href="/contact" className="inline-block bg-saffaron text-darkSerpent font-semibold px-7 py-3 rounded-2xl hover:bg-earthYellow transition-colors duration-200">
              Contact Us
            </a>
          </Animate>
          <Animate delay={150}>
            <div className="rounded-2xl overflow-hidden shadow-2xl aspect-video">
              <video autoPlay muted loop playsInline className="w-full h-full object-cover" src="/src/assets/Lifewood Services.mp4" />
            </div>
          </Animate>
        </div>
      </div>

      {/* TABS */}
      <div className="bg-white border-b border-darkSerpent/10 sticky top-16 z-20 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-center gap-3">
          {TABS.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-6 py-2.5 rounded-full transition-all duration-300 flex items-center gap-2 text-sm font-medium ${
                activeTab === tab.id
                  ? 'bg-darkSerpent text-white shadow-lg'
                  : 'bg-darkSerpent/5 text-darkSerpent/60 hover:bg-darkSerpent/10 hover:text-darkSerpent'
              }`}
            >
              <span>{tab.icon}</span>
              <span>{tab.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* TAB: Our Vision */}
      {activeTab === 'vision' && (
        <div className="bg-white">
          <div className="max-w-7xl mx-auto px-6 py-20">
            <div className="mb-16">
              <Animate>
                <span className="inline-block px-4 py-1.5 bg-saffaron/20 text-saffaron text-xs font-semibold rounded-full mb-6 tracking-widest uppercase">Our Vision</span>
              </Animate>
              <Animate delay={100}>
                <h2 className="text-4xl font-semibold text-darkSerpent leading-tight max-w-3xl mb-6">
                  Financial investment solving global challenges
                </h2>
              </Animate>
              <Animate delay={200}>
                <p className="text-darkSerpent/60 text-base leading-relaxed max-w-2xl">
                  We envision a world where strategic investment drives social and environmental transformation across Africa and the Indian sub-continent.
                </p>
              </Animate>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              <Animate delay={100}>
                <div className="bg-darkSerpent rounded-2xl p-10 text-white shadow-lg flex flex-col justify-between h-full">
                  <div>
                    <h3 className="text-2xl font-semibold mb-4">Transforming Communities</h3>
                    <p className="text-white/80 leading-relaxed mb-6">
                      Through purposeful partnerships and sustainable investment, we empower communities to create lasting economic and social transformation. We bring proven methods and experience directly to those who need it most.
                    </p>
                    <div className="w-12 h-1 bg-saffaron rounded-full" />
                  </div>
                  <div className="mt-8 pt-8 border-t border-white/20">
                    <p className="text-sm text-white/70">Working with new intelligence for a better world</p>
                  </div>
                </div>
              </Animate>
              <div className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { num: '20+', label: 'Countries' },
                    { num: '2004', label: 'Founded' },
                    { num: '56K+', label: 'Resources' },
                    { num: '40+', label: 'Centers' },
                  ].map((s, i) => (
                    <Animate key={i} delay={150 + i * 50}>
                      <div className="bg-darkSerpent/5 rounded-xl p-6 hover:bg-darkSerpent/10 transition-colors duration-300 border border-darkSerpent/10 h-full">
                        <div className="text-3xl font-bold text-saffaron mb-2">{s.num}</div>
                        <div className="text-darkSerpent text-xs font-medium uppercase tracking-wide">{s.label}</div>
                      </div>
                    </Animate>
                  ))}
                </div>
                <Animate delay={350}>
                  <div className="bg-darkSerpent/5 rounded-2xl p-8 border border-darkSerpent/10">
                    <h3 className="text-lg font-semibold text-darkSerpent mb-6">Impact Areas</h3>
                    <div className="space-y-4">
                      {[
                        { icon: '🌍', title: 'Social Investment', desc: 'Education and community development' },
                        { icon: '💚', title: 'Environmental', desc: 'Sustainable growth initiatives' },
                        { icon: '🤝', title: 'Partnerships', desc: 'Collaborative solutions' },
                      ].map((item, i) => (
                        <div key={i} className="flex gap-4">
                          <div className="text-2xl flex-shrink-0">{item.icon}</div>
                          <div>
                            <div className="font-semibold text-darkSerpent text-sm">{item.title}</div>
                            <div className="text-darkSerpent/60 text-xs">{item.desc}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </Animate>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB: How We Work */}
      {activeTab === 'how-we-work' && (
        <div className="bg-white">
          <div className="max-w-7xl mx-auto px-6 py-20">
            <Animate>
              <h2 className="text-3xl font-semibold text-darkSerpent text-center mb-12">How We Work</h2>
            </Animate>
            <ShowcaseSlider />
          </div>
        </div>
      )}

    </div>
  );
}
