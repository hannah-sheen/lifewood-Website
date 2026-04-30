// import { useState } from 'react';
// import { Mail, Send, Globe, MessageSquare, Clock } from 'lucide-react';
// import Animate from '../components/Animate.tsx';

// export default function Contact() {
//   const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
    
//     console.log("Form Submitted:", formData);
//   };

//   return (
//     <div className="bg-seaSalt min-h-screen selection:bg-saffaron/30">
      
//       {/* 1. HERO / HEADER */}
//       <section className="pt-32 pb-20 bg-darkSerpent text-white relative overflow-hidden">
//         {/* Decorative Glow */}
//         <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(circle_at_center,rgba(255,179,71,0.05),transparent_70%)]" />
        
//         <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">
//           <Animate>
//             <span className="text-saffaron font-bold text-xs uppercase tracking-[0.2em] mb-4 block">Get in Touch</span>
//             <h1 className="text-6xl md:text-8xl font-bold tracking-tighter leading-tight mb-6">
//               Let's build the <br/> <span className="text-white/20 italic">Future of AI.</span>
//             </h1>
//             <p className="text-white/60 text-xl max-w-2xl mx-auto leading-relaxed">
//               Have a project in mind or want to learn more about our global data services? Our team is ready to connect.
//             </p>
//           </Animate>
//         </div>
//       </section>

//       {/* 2. MAIN CONTACT GRID */}
//       <section className="py-24 relative z-20 -mt-10">
//         <div className="max-w-7xl mx-auto px-6">
//           <div className="grid lg:grid-cols-12 gap-12 items-start">
            
//             {/* LEFT: INFO CARDS */}
//             <div className="lg:col-span-5 space-y-6">
//               <Animate delay={100}>
//                 <div className="bg-white p-10 rounded-[2.5rem] shadow-xl shadow-darkSerpent/5 border border-darkSerpent/[0.03]">
//                   <h2 className="text-3xl font-bold text-darkSerpent mb-8 tracking-tight">Contact Information</h2>
                  
//                   <div className="space-y-8">
//                     <div className="flex gap-6 group">
//                       <div className="w-12 h-12 rounded-2xl bg-seaSalt flex items-center justify-center text-saffaron group-hover:bg-saffaron group-hover:text-darkSerpent transition-all duration-500">
//                         <Mail className="w-5 h-5" />
//                       </div>
//                       <div>
//                         <p className="text-[10px] font-black uppercase tracking-widest text-darkSerpent/30 mb-1">Email Us</p>
//                         <a href="mailto:info@lifewood.com" className="text-lg font-bold text-darkSerpent hover:text-saffaron transition-colors">lifewood@lifewood.com</a>
//                       </div>
//                     </div>

//                     <div className="flex gap-6 group">
//                       <div className="w-12 h-12 rounded-2xl bg-seaSalt flex items-center justify-center text-saffaron group-hover:bg-saffaron group-hover:text-darkSerpent transition-all duration-500">
//                         <Globe className="w-5 h-5" />
//                       </div>
//                       <div>
//                         <p className="text-[10px] font-black uppercase tracking-widest text-darkSerpent/30 mb-1">Headquarters</p>
//                         <p className="text-lg font-bold text-darkSerpent">San Jose, California, US</p>
//                       </div>
//                     </div>

//                     <div className="flex gap-6 group">
//                       <div className="w-12 h-12 rounded-2xl bg-seaSalt flex items-center justify-center text-saffaron group-hover:bg-saffaron group-hover:text-darkSerpent transition-all duration-500">
//                         <Clock className="w-5 h-5" />
//                       </div>
//                       <div>
//                         <p className="text-[10px] font-black uppercase tracking-widest text-darkSerpent/30 mb-1">Operations</p>
//                         <p className="text-lg font-bold text-darkSerpent">24/7 Follow-the-Sun Model</p>
//                       </div>
//                     </div>
//                   </div>

//                   <div className="mt-12 pt-10 border-t border-darkSerpent/5">
//                     <p className="text-sm text-darkSerpent/50 leading-relaxed italic">
//                       "Bridging local expertise with global infrastructure to empower communities worldwide."
//                     </p>
//                   </div>
//                 </div>
//               </Animate>
              
//               <Animate delay={200}>
//                 <div className="bg-darkSerpent p-8 rounded-[2rem] text-white overflow-hidden relative group">
//                     <div className="relative z-10">
//                         <h4 className="font-bold mb-2">Technical Support</h4>
//                         <p className="text-white/50 text-sm mb-4">Existing clients requiring technical assistance with data delivery.</p>
//                         <button className="text-saffaron text-xs font-bold uppercase tracking-widest flex items-center gap-2 group-hover:gap-3 transition-all">
//                             Open Ticket <Send className="w-3 h-3" />
//                         </button>
//                     </div>
//                     <MessageSquare className="absolute -bottom-4 -right-4 w-32 h-32 text-white/[0.03] -rotate-12" />
//                 </div>
//               </Animate>
//             </div>

//             {/* RIGHT: CONTACT FORM */}
//             <div className="lg:col-span-7">
//               <Animate delay={300}>
//                 <div className="bg-white p-10 md:p-14 rounded-[3rem] shadow-2xl shadow-darkSerpent/10 border border-darkSerpent/[0.03]">
//                   <form onSubmit={handleSubmit} className="space-y-6">
//                     <div className="grid md:grid-cols-2 gap-6">
//                       <div className="space-y-2">
//                         <label className="text-[10px] font-black uppercase tracking-widest text-darkSerpent/40 ml-1">Full Name</label>
//                         <input 
//                           type="text" 
//                           placeholder="John Doe"
//                           className="w-full bg-seaSalt border-none rounded-2xl p-4 focus:ring-2 focus:ring-saffaron/50 transition-all outline-none text-darkSerpent font-medium"
//                         />
//                       </div>
//                       <div className="space-y-2">
//                         <label className="text-[10px] font-black uppercase tracking-widest text-darkSerpent/40 ml-1">Email Address</label>
//                         <input 
//                           type="email" 
//                           placeholder="john@example.com"
//                           className="w-full bg-seaSalt border-none rounded-2xl p-4 focus:ring-2 focus:ring-saffaron/50 transition-all outline-none text-darkSerpent font-medium"
//                         />
//                       </div>
//                     </div>

//                     <div className="space-y-2">
//                       <label className="text-[10px] font-black uppercase tracking-widest text-darkSerpent/40 ml-1">Your Message</label>
//                       <textarea 
//                         rows={5}
//                         placeholder="Message here..."
//                         className="w-full bg-seaSalt border-none rounded-2xl p-4 focus:ring-2 focus:ring-saffaron/50 transition-all outline-none text-darkSerpent font-medium resize-none"
//                       />
//                     </div>

//                     <button className="w-full bg-darkSerpent text-white py-5 rounded-2xl font-bold text-sm uppercase tracking-widest hover:bg-saffaron hover:text-darkSerpent transition-all duration-300 flex items-center justify-center gap-3 shadow-lg shadow-darkSerpent/10">
//                       Send Message <Send className="w-4 h-4" />
//                     </button>
//                   </form>
//                 </div>
//               </Animate>
//             </div>

//           </div>
//         </div>
//       </section>

//       {/* 3. MAP / GLOBAL FOOTPRINT TEASER */}
//       <section className="py-20 bg-seaSalt overflow-hidden">
//         <div className="max-w-7xl mx-auto px-6 text-center">
//             <Animate>
//                 <div className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-full shadow-sm border border-darkSerpent/5 mb-8">
//                     <span className="relative flex h-2 w-2">
//                         <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-saffaron opacity-75"></span>
//                         <span className="relative inline-flex rounded-full h-2 w-2 bg-saffaron"></span>
//                     </span>
//                     <span className="text-[10px] font-black uppercase tracking-widest text-darkSerpent">40+ Global Centers</span>
//                 </div>
//                 <h2 className="text-4xl font-bold text-darkSerpent mb-4">A Footprint on Every Continent</h2>
//                 <p className="text-darkSerpent/50 max-w-2xl mx-auto mb-12">
//                     Our decentralized model ensures we capture cultural and linguistic diversity for more accurate AI training data.
//                 </p>
                
//                 <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
//                     {['Africa', 'Asia', 'Europe', 'Americas'].map((region) => (
//                         <div key={region} className="bg-white p-6 rounded-3xl border border-darkSerpent/[0.03] group hover:border-saffaron/50 transition-colors">
//                             <p className="text-xs font-black uppercase tracking-[0.2em] text-darkSerpent/30 group-hover:text-saffaron transition-colors">{region}</p>
//                         </div>
//                     ))}
//                 </div>
//             </Animate>
//         </div>
//       </section>
//     </div>
//   );
// }

import { useState } from 'react';
import { Mail, Send, Phone } from 'lucide-react';
import Animate from '../components/Animate.tsx';

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form Submitted:", formData);
  };

  return (
    <div className="bg-white min-h-screen selection:bg-saffaron/30">
      
      {/* 1. HERO - Kept as is */}
      <section className="pt-32 pb-20 bg-darkSerpent text-white relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(circle_at_center,rgba(255,179,71,0.05),transparent_70%)]" />
        
        <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">
          <Animate>
            <span className="text-saffaron font-bold text-xs uppercase tracking-[0.2em] mb-4 block">Get in Touch</span>
            <h1 className="text-6xl md:text-8xl font-bold tracking-tighter leading-tight mb-6">
              Let's build the <br/> <span className="text-white/20 italic">Future of AI.</span>
            </h1>
            <p className="text-white/60 text-xl max-w-2xl mx-auto leading-relaxed">
              Have a project in mind or want to learn more about our global data services? Our team is ready to connect.
            </p>
          </Animate>
        </div>
      </section>

      {/* 2. UPDATED MINIMAL SECTION */}
      <section className="py-24">
        <div className="max-w-4xl mx-auto px-6">
          <div className="grid lg:grid-cols-12 gap-16 items-start">
            
            {/* Direct Contact Links */}
            <div className="lg:col-span-4 space-y-8">
              <Animate delay={100}>
                <div className="space-y-8">
                  <div>
                    <h3 className="text-xs font-black uppercase tracking-[0.2em] text-darkSerpent/30 mb-4">Direct Contact</h3>
                    <div className="space-y-4">
                      <a href="mailto:lifewood@lifewood.com" className="flex items-center gap-3 text-lg font-bold text-darkSerpent hover:text-saffaron transition-colors group">
                        <Mail className="w-5 h-5 text-saffaron" />
                        lifewood@lifewood.com
                      </a>
                      <a href="tel:+41123456123" className="flex items-center gap-3 text-lg font-bold text-darkSerpent hover:text-saffaron transition-colors group">
                        <Phone className="w-5 h-5 text-saffaron" />
                        +41 123 456 123
                      </a>
                    </div>
                  </div>

                  <div className="pt-8 border-t border-darkSerpent/5">
                    <p className="text-sm text-darkSerpent/50 leading-relaxed italic">
                      "Bridging local expertise with global infrastructure to empower communities worldwide."
                    </p>
                  </div>
                </div>
              </Animate>
            </div>

            {/* Streamlined Form */}
            <div className="lg:col-span-8">
              <Animate delay={200}>
                <form onSubmit={handleSubmit} className="space-y-8">
                  <div className="grid md:grid-cols-2 gap-8">
                    <div className="relative border-b-2 border-darkSerpent/10 focus-within:border-saffaron transition-colors pb-2">
                      <label className="text-[10px] font-black uppercase tracking-widest text-darkSerpent/30 block mb-1">Full Name</label>
                      <input 
                        type="text" 
                        placeholder="John Doe"
                        className="w-full bg-transparent border-none p-0 outline-none text-darkSerpent font-bold placeholder:text-darkSerpent/10"
                      />
                    </div>
                    <div className="relative border-b-2 border-darkSerpent/10 focus-within:border-saffaron transition-colors pb-2">
                      <label className="text-[10px] font-black uppercase tracking-widest text-darkSerpent/30 block mb-1">Email Address</label>
                      <input 
                        type="email" 
                        placeholder="john@example.com"
                        className="w-full bg-transparent border-none p-0 outline-none text-darkSerpent font-bold placeholder:text-darkSerpent/10"
                      />
                    </div>
                  </div>

                  <div className="relative border-b-2 border-darkSerpent/10 focus-within:border-saffaron transition-colors pb-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-darkSerpent/30 block mb-1">How can we help?</label>
                    <textarea 
                      rows={4}
                      placeholder="Describe your project or inquiry..."
                      className="w-full bg-transparent border-none p-0 outline-none text-darkSerpent font-bold resize-none placeholder:text-darkSerpent/10"
                    />
                  </div>

                  <button className="bg-darkSerpent text-white px-12 py-5 rounded-2xl font-bold text-sm uppercase tracking-widest hover:bg-saffaron hover:text-darkSerpent transition-all duration-300 flex items-center justify-center gap-3 shadow-lg active:scale-95">
                    Send Message <Send className="w-4 h-4" />
                  </button>
                </form>
              </Animate>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
}