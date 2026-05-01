import { useState } from 'react';
import { Mail, Send, Phone } from 'lucide-react';
import Animate from '../components/Animate.tsx';
import Button from '../components/Button.tsx';

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
                      placeholder="Message here..."
                      className="w-full bg-transparent border-none p-0 outline-none text-darkSerpent font-bold resize-none placeholder:text-darkSerpent/10"
                    />
                  </div>

                  <Button type="submit" className="px-12 py-5 rounded-2xl text-sm uppercase tracking-widest shadow-lg">
                    Send Message <Send className="w-4 h-4" />
                  </Button>
                </form>
              </Animate>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
}