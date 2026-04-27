// import { useState } from 'react';
// import Animate from '../components/Animate.tsx';
// import OperationsMap from '../components/OperationsMap.tsx';
// import partnershipImg from '../assets/partnership.jpeg';
// import applicationImg from '../assets/application.jpeg';
// import expandingImg from '../assets/expanding.jpeg';

// const CARDS = [
//   {
//     label: 'Partnership', title: 'Building Together',
//     desc: 'In partnership with our philanthropic partners, Lifewood has expanded operations across Africa and Bangladesh — bringing our methods and experience directly to communities that need it most.',
//     bg: 'bg-darkSerpent', text: 'text-white', sub: 'text-white/60', img: partnershipImg,
//   },
//   {
//     label: 'Application', title: 'Methods & Experience',
//     desc: 'The development of people in under resourced economies requires the deliberate application of our methods and experience. We bring proven approaches to each community.',
//     bg: 'bg-castletonGreen', text: 'text-white', sub: 'text-white/60', img: applicationImg,
//   },
//   {
//     label: 'Expanding', title: 'Sustainable Change',
//     desc: 'We are expanding access to training, establishing equitable wage structures and career and leadership progression to create sustainable change.',
//     bg: 'bg-saffaron', text: 'text-darkSerpent', sub: 'text-darkSerpent/60', img: expandingImg,
//   },
// ];

// function ShowcaseSlider() {
//   const [active, setActive] = useState(0);
//   const [cursor, setCursor] = useState({ x: 0, y: 0, visible: false });
//   const card = CARDS[active];
  
//   return (
//     <div className="w-full"
//       onMouseMove={(e) => { const r = e.currentTarget.getBoundingClientRect(); setCursor({ x: e.clientX - r.left, y: e.clientY - r.top, visible: true }); }}
//       onMouseLeave={() => setCursor(p => ({ ...p, visible: false }))}
//       style={{ cursor: 'none' }}
//     >
//       <div className="grid md:grid-cols-2 gap-8 items-center relative">
//         {cursor.visible && (
//           <span className="absolute pointer-events-none z-50 rounded-full bg-saffaron" style={{
//             left: cursor.x, top: cursor.y, width: 14, height: 14,
//             transform: 'translate(-50%,-50%)', boxShadow: '0 0 10px 3px #FFB34788',
//           }} />
//         )}
//         <div className="flex flex-col gap-3">
//           {CARDS.map((c, i) => {
//             const isActive = i === active;
//             return (
//               <div key={i} onClick={() => setActive(i)} style={{ cursor: 'none' }}
//                 className={`rounded-2xl p-6 transition-all duration-300 ${isActive ? `${c.bg} shadow-xl scale-[1.02]` : 'bg-white/10 hover:bg-white/20'}`}
//               >
//                 <span className={`text-xs font-semibold tracking-widest uppercase ${isActive ? c.sub : 'text-white/30'}`}>{c.label}</span>
//                 <h3 className={`text-lg font-semibold mt-1 mb-2 ${isActive ? c.text : 'text-white/70'}`}>{c.title}</h3>
//                 {isActive && <p className={`text-sm leading-relaxed ${c.sub}`}>{c.desc}</p>}
//               </div>
//             );
//           })}
//         </div>
//         <div className="relative rounded-2xl overflow-hidden h-[340px] shadow-xl">
//           <img key={active} src={card.img} alt={card.label} className="w-full h-full object-cover" style={{ animation: 'fadeUp 0.4s ease' }} />
//           <div className={`absolute inset-0 ${card.bg} opacity-20`} />
//           <div className="absolute bottom-5 left-5">
//             <span className={`px-3 py-1 rounded-full text-xs font-semibold tracking-widest uppercase ${card.bg} ${card.text}`}>{card.label}</span>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default function Philanthropy() {
//   return (
//     <div className="bg-darkSerpent min-h-screen">
//       {/* Hero Section */}
//       <div className="bg-darkSerpent">
//         <div className="max-w-7xl mx-auto px-6 py-20">
//           <div className="grid md:grid-cols-2 gap-10 items-center">
//             <div>
//               <span className="inline-block px-4 py-1.5 bg-saffaron/20 text-saffaron text-xs font-semibold rounded-full mb-6 tracking-widest uppercase">Philanthropy & Impact</span>
//               <h1 className="text-4xl font-semibold text-white leading-tight mb-6">Philanthropy and Impact</h1>
//               <p className="text-white/60 text-base leading-relaxed mb-8">
//                 We direct resources into education and developmental projects that create lasting change.
//                 Our approach goes beyond giving: it builds sustainable growth and empowers communities for the future.
//               </p>
//               <a href="/contact" className="inline-block bg-saffaron text-darkSerpent font-semibold px-7 py-3 rounded-2xl hover:bg-earthYellow transition-colors duration-200">
//                 Contact Us
//               </a>
//             </div>
//             <div className="rounded-2xl overflow-hidden shadow-2xl aspect-video">
//               <video autoPlay muted loop playsInline className="w-full h-full object-cover" src="/src/assets/Lifewood Services.mp4" />
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Vision Section */}
//       <div className="bg-seaSalt">
//         <div className="max-w-7xl mx-auto px-6 py-20">
//           <div className="grid md:grid-cols-2 gap-0 rounded-2xl overflow-hidden shadow-xl">
//             <div className="bg-darkSerpent p-12 flex flex-col justify-between">
//               <div>
//                 <span className="inline-block w-8 h-[3px] bg-saffaron mb-6" />
//                 <h2 className="text-2xl font-semibold text-white leading-relaxed">
//                   Our vision is of a world where financial investment plays a central role in solving the social
//                   and environmental challenges facing the global community, specifically in
//                   <span className="text-saffaron"> Africa and the Indian sub-continent.</span>
//                 </h2>
//               </div>
//               <div className="mt-8">
//                 <p className="text-white/50 text-sm mb-4">
//                   Through purposeful partnerships and sustainable investment, we empower communities across
//                   Africa and the Indian sub-continent to create lasting economic and social transformation.
//                   We are working with new intelligence for a better world.
//                 </p>
//                 <h3 className="text-lg font-semibold text-white">Transforming Communities Worldwide</h3>
//               </div>
//             </div>
//             <div className="bg-white p-12 flex flex-col justify-center gap-5">
//               {[
//                 { num: '20+', label: 'Countries in Africa & Bangladesh' },
//                 { num: '2004', label: 'Founded with Purpose' },
//                 { num: '56K+', label: 'Global Online Resources' },
//                 { num: '40+', label: 'Global Delivery Centers' },
//               ].map((s, i) => (
//                 <div key={i} className="flex items-center gap-5 border-b border-darkSerpent/10 pb-4 last:border-0 last:pb-0">
//                   <span className="text-3xl font-bold text-castletonGreen w-20 shrink-0">{s.num}</span>
//                   <span className="text-darkSerpent/60 text-sm">{s.label}</span>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* How We Work Section */}
//       <div className="bg-darkSerpent">
//         <div className="max-w-7xl mx-auto px-6 py-20">
//           <h2 className="text-3xl font-semibold text-white text-center mb-8">How We Work</h2>
//           <ShowcaseSlider />
//         </div>
//       </div>

//       {/* Where We Operate Section */}
//       <div className="bg-castletonGreen">
//         <div className="max-w-7xl mx-auto px-6 py-20">
//           <div className="text-center mb-6">
//             <h2 className="text-3xl font-semibold text-white mb-2">Where We Operate</h2>
//             <p className="text-white/70 max-w-xl mx-auto text-sm">
//               Lifewood has expanded operations in the following countries in partnership with our philanthropic partners.
//             </p>
//           </div>
//           <div className="rounded-2xl overflow-hidden bg-darkSerpent" style={{ minHeight: '500px', height: '600px' }}>
//             <OperationsMap />
//           </div>
//           <div className="mt-8 text-center">
//             <div className="inline-flex flex-wrap gap-3 justify-center">
//               {[
//                 'South Africa', 'Nigeria', 'Republic of the Congo', 'Democratic Republic of the Congo',
//                 'Ghana', 'Madagascar', 'Benin', 'Uganda', 'Kenya', 'Ivory Coast', 'Egypt', 'Ethiopia',
//                 'Niger', 'Tanzania', 'Namibia', 'Zambia', 'Zimbabwe', 'Liberia', 'Sierra Leone', 'Bangladesh',
//               ].map((country, index) => (
//                 <span key={index} className="px-3 py-1 bg-white/10 rounded-full text-white/80 text-xs">
//                   {country}
//                 </span>
//               ))}
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

import { useState } from 'react';
import Animate from '../components/Animate.tsx';
import OperationsMap from '../components/OperationsMap.tsx';
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
      <div className="grid md:grid-cols-2 gap-8 items-center relative">
        {cursor.visible && (
          <span className="absolute pointer-events-none z-50 rounded-full bg-saffaron" style={{
            left: cursor.x, top: cursor.y, width: 14, height: 14,
            transform: 'translate(-50%,-50%)', boxShadow: '0 0 10px 3px #FFB34788',
          }} />
        )}
        <div className="flex flex-col gap-3">
          {CARDS.map((c, i) => {
            const isActive = i === active;
            return (
              <div key={i} onClick={() => setActive(i)} style={{ cursor: 'none' }}
                className={`rounded-2xl p-6 transition-all duration-300 ${isActive ? `${c.bg} shadow-xl scale-[1.02]` : 'bg-white/10 hover:bg-white/20'}`}
              >
                <span className={`text-xs font-semibold tracking-widest uppercase ${isActive ? c.sub : 'text-white/30'}`}>{c.label}</span>
                <h3 className={`text-lg font-semibold mt-1 mb-2 ${isActive ? c.text : 'text-white/70'}`}>{c.title}</h3>
                {isActive && <p className={`text-sm leading-relaxed ${c.sub}`}>{c.desc}</p>}
              </div>
            );
          })}
        </div>
        <div className="relative rounded-2xl overflow-hidden h-[340px] shadow-xl">
          <img key={active} src={card.img} alt={card.label} className="w-full h-full object-cover" style={{ animation: 'fadeUp 0.4s ease' }} />
          <div className={`absolute inset-0 ${card.bg} opacity-20`} />
          <div className="absolute bottom-5 left-5">
            <span className={`px-3 py-1 rounded-full text-xs font-semibold tracking-widest uppercase ${card.bg} ${card.text}`}>{card.label}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Philanthropy() {
  return (
    <div className="bg-darkSerpent min-h-screen">
      {/* Hero Section */}
      <div className="bg-darkSerpent">
        <div className="max-w-7xl mx-auto px-6 py-20">
          <div className="grid md:grid-cols-2 gap-10 items-center">
            <div>
              <span className="inline-block px-4 py-1.5 bg-saffaron/20 text-saffaron text-xs font-semibold rounded-full mb-6 tracking-widest uppercase">Philanthropy & Impact</span>
              <h1 className="text-4xl font-semibold text-white leading-tight mb-6">Philanthropy and Impact</h1>
              <p className="text-white/60 text-base leading-relaxed mb-8">
                We direct resources into education and developmental projects that create lasting change.
                Our approach goes beyond giving: it builds sustainable growth and empowers communities for the future.
              </p>
              <a href="/contact" className="inline-block bg-saffaron text-darkSerpent font-semibold px-7 py-3 rounded-2xl hover:bg-earthYellow transition-colors duration-200">
                Contact Us
              </a>
            </div>
            <div className="rounded-2xl overflow-hidden shadow-2xl aspect-video">
              <video autoPlay muted loop playsInline className="w-full h-full object-cover" src="/src/assets/Lifewood Services.mp4" />
            </div>
          </div>
        </div>
      </div>

      {/* Vision Section */}
      <div className="bg-paper">
        <div className="max-w-7xl mx-auto px-6 py-20">
          <div className="mb-16">
            <span className="inline-block px-4 py-1.5 bg-earthYellow/20 text-darkSerpent text-xs font-semibold rounded-full mb-6 tracking-widest uppercase">Our Vision</span>
            <h2 className="text-4xl font-semibold text-darkSerpent leading-tight max-w-3xl mb-6">
              Financial investment solving global challenges
            </h2>
            <p className="text-darkSerpent/70 text-base leading-relaxed max-w-2xl">
              We envision a world where strategic investment drives social and environmental transformation across Africa and the Indian sub-continent.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6">
            {/* Main vision card */}
            <div className="bg-gradient-to-br from-darkSerpent to-castletonGreen rounded-2xl p-10 text-white shadow-lg md:row-span-2 flex flex-col justify-between">
              <div>
                <h3 className="text-2xl font-semibold mb-4">Transforming Communities</h3>
                <p className="text-white/80 leading-relaxed mb-6">
                  Through purposeful partnerships and sustainable investment, we empower communities to create lasting economic and social transformation. We bring proven methods and experience directly to those who need it most.
                </p>
                <div className="w-12 h-1 bg-earthYellow rounded-full" />
              </div>
              <div className="mt-8 pt-8 border-t border-white/20">
                <p className="text-sm text-white/70">Working with new intelligence for a better world</p>
              </div>
            </div>

            {/* Stats grid */}
            <div className="grid grid-cols-2 gap-4">
              {[
                { num: '20+', label: 'Countries' },
                { num: '2004', label: 'Founded' },
                { num: '56K+', label: 'Resources' },
                { num: '40+', label: 'Centers' },
              ].map((s, i) => (
                <div key={i} className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow duration-300">
                  <div className="text-3xl font-bold text-castletonGreen mb-2">{s.num}</div>
                  <div className="text-darkSerpent/60 text-xs font-medium uppercase tracking-wide">{s.label}</div>
                </div>
              ))}
            </div>

            {/* Impact areas card */}
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-darkSerpent/5">
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
          </div>
        </div>
      </div>

      {/* How We Work Section */}
      <div className="bg-darkSerpent">
        <div className="max-w-7xl mx-auto px-6 py-20">
          <h2 className="text-3xl font-semibold text-white text-center mb-8">How We Work</h2>
          <ShowcaseSlider />
        </div>
      </div>

      {/* Where We Operate Section */}
      <div className="bg-castletonGreen">
        <div className="max-w-7xl mx-auto px-6 py-20">
          <div className="text-center mb-6">
            <h2 className="text-3xl font-semibold text-white mb-2">Where We Operate</h2>
            <p className="text-white/70 max-w-xl mx-auto text-sm">
              Lifewood has expanded operations in the following countries in partnership with our philanthropic partners.
            </p>
          </div>
          <div className="rounded-2xl overflow-hidden bg-darkSerpent" style={{ minHeight: '500px', height: '600px' }}>
            <OperationsMap />
          </div>
          <div className="mt-8 text-center">
            <div className="inline-flex flex-wrap gap-3 justify-center">
              {[
                'South Africa', 'Nigeria', 'Republic of the Congo', 'Democratic Republic of the Congo',
                'Ghana', 'Madagascar', 'Benin', 'Uganda', 'Kenya', 'Ivory Coast', 'Egypt', 'Ethiopia',
                'Niger', 'Tanzania', 'Namibia', 'Zambia', 'Zimbabwe', 'Liberia', 'Sierra Leone', 'Bangladesh',
              ].map((country, index) => (
                <span key={index} className="px-3 py-1 bg-white/10 rounded-full text-white/80 text-xs">
                  {country}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
