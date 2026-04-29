import { motion } from 'framer-motion';
import Animate from '../components/Animate.tsx';
import { ArrowRight, Sparkles } from 'lucide-react';

export default function Hero() {
  return (
    <section className="min-h-screen bg-seaSalt flex items-center pt-20 overflow-hidden relative">
      {/* Background Decorative Element */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-saffaron/5 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/4" />
      
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center relative z-10">
        <div className="space-y-10">
          <Animate>
            <div className="inline-flex items-center gap-3 bg-white px-5 py-2.5 rounded-full border border-darkSerpent/5 shadow-sm">
              <Sparkles className="w-4 h-4 text-saffaron" />
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-darkSerpent">
                AI-Powered Data Excellence
              </span>
            </div>
          </Animate>
          
          <Animate delay={100}>
            <h1 className="text-6xl md:text-[5.5rem] font-bold leading-[0.9] text-darkSerpent tracking-tighter">
              Transforming Data.<br />
              <span className="text-white/20 italic">Empowering</span> <span className="text-darkSerpent">Humanity.</span>
            </h1>
          </Animate>
          
          <Animate delay={200}>
            <p className="text-xl text-darkSerpent/60 max-w-lg leading-relaxed font-medium">
              The world’s leading provider of ethical AI data solutions. 
              We turn complex data into <span className="text-darkSerpent">meaningful intelligence</span> for the next generation of machine learning.
            </p>
          </Animate>

          <Animate delay={300} className="flex flex-wrap gap-4">
            <a href="#contact" className="bg-darkSerpent hover:bg-saffaron hover:text-darkSerpent text-white px-10 py-5 rounded-2xl font-bold transition-all text-sm uppercase tracking-widest flex items-center gap-2 shadow-xl shadow-darkSerpent/10">
              Get In Touch <ArrowRight className="w-4 h-4" />
            </a>
            <a href="#about" className="bg-white border border-darkSerpent/10 text-darkSerpent hover:bg-darkSerpent hover:text-white px-10 py-5 rounded-2xl font-bold transition-all text-sm uppercase tracking-widest">
              Learn More
            </a>
          </Animate>
        </div>

        <div className="relative hidden md:block">
          <Animate delay={400} className="relative">
            <div className="bg-darkSerpent rounded-[3rem] aspect-square flex items-center justify-center text-white/5 text-[280px] font-black tracking-tighter shadow-2xl relative overflow-hidden group">
              LD
              <div className="absolute inset-0 bg-linear-to-tr from-saffaron/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
            </div>
            
            {/* Stats Badge */}
            <motion.div 
              initial={{ x: 20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.6 }}
              className="absolute -bottom-6 -left-6 bg-white p-10 rounded-[2.5rem] shadow-2xl border border-darkSerpent/5"
            >
              <div className="text-6xl font-bold text-darkSerpent tracking-tighter mb-1">
                40<span className="text-saffaron">+</span>
              </div>
              <div className="text-[10px] font-black uppercase tracking-[0.2em] text-darkSerpent/40">
                Global Centers
              </div>
            </motion.div>
          </Animate>
        </div>
      </div>
    </section>
  );
}