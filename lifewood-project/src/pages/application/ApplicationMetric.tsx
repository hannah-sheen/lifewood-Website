import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Layers, UserCheck, Clock, CheckCircle2, 
  XCircle, Ban, ArrowLeftCircle, HelpCircle,
  ChevronLeft, ChevronRight 
} from 'lucide-react';
import type { ApplicationDetails } from '../types';

interface MetricProps {
  applications: ApplicationDetails[];
}

export default function ApplicationMetrics({ applications }: MetricProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const scrollTo = direction === 'left' 
        ? scrollLeft - clientWidth / 2 
        : scrollLeft + clientWidth / 2;
      
      scrollRef.current.scrollTo({ left: scrollTo, behavior: 'smooth' });
    }
  };

  const checkScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setShowLeftArrow(scrollLeft > 10);
      setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  useEffect(() => {
    const el = scrollRef.current;
    if (el) {
      el.addEventListener('scroll', checkScroll);
      window.addEventListener('resize', checkScroll);
      checkScroll();
    }
    return () => {
      el?.removeEventListener('scroll', checkScroll);
      window.removeEventListener('resize', checkScroll);
    };
  }, [applications]);

  const getStatusIcon = (status: string) => {
    switch (status.toLowerCase()) {
      case 'all': return <Layers size={20} />;
      case 'pending': return <Clock size={20} />;
      case 'shortlisted': return <UserCheck size={20} />;
      case 'hired': return <CheckCircle2 size={20} />;
      case 'not selected': return <XCircle size={20} />;
      case 'declined': return <Ban size={20} />;
      case 'withdrawn': return <ArrowLeftCircle size={20} />;
      default: return <HelpCircle size={20} />;
    }
  };

  const statusOptions = ['All', 'Pending', 'Shortlisted', 'Hired', 'Not Selected', 'Declined', 'Withdrawn'];
  const stats = statusOptions.map((status) => ({
    label: status === 'All' ? 'Total Applications' : status,
    value: status === 'All' 
      ? applications.length 
      : applications.filter(a => (a.status || 'Pending').toLowerCase() === status.toLowerCase()).length,
    icon: getStatusIcon(status),
  }));

  return (
    <div className="relative group/metrics w-full pb-4">
      {/* LEFT NAVIGATION BUTTON */}
      <AnimatePresence>
        {showLeftArrow && (
          <motion.button
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -10 }}
            onClick={() => scroll('left')}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-30 w-10 h-10 bg-white border border-darkSerpent/10 rounded-full shadow-md flex items-center justify-center text-darkSerpent hover:bg-darkSerpent hover:text-saffaron transition-all"
          >
            <ChevronLeft size={20} strokeWidth={3} />
          </motion.button>
        )}
      </AnimatePresence>

      {/* RIGHT NAVIGATION BUTTON */}
      <AnimatePresence>
        {showRightArrow && (
          <motion.button
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 10 }}
            onClick={() => scroll('right')}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-30 w-10 h-10 bg-white border border-darkSerpent/10 rounded-full shadow-md flex items-center justify-center text-darkSerpent hover:bg-darkSerpent hover:text-saffaron transition-all"
          >
            <ChevronRight size={20} strokeWidth={3} />
          </motion.button>
        )}
      </AnimatePresence>

      {/* SCROLL CONTAINER */}
      <div 
        ref={scrollRef}
        className="flex gap-4 overflow-x-auto no-scrollbar scroll-smooth"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05, duration: 0.4 }}
            className="group relative bg-white border border-darkSerpent/10 rounded-2xl p-4 w-56 cursor-default overflow-hidden transition-all duration-500 flex-shrink-0 hover:shadow-lg hover:border-saffaron/20"
          >
            {/* THE HOVER EFFECT: DarkSerpent geometric accent that slides in from the top-right corner */}
            <div 
              className="absolute top-0 right-0 w-24 h-24 bg-darkSerpent/[0.03] rounded-bl-[100px] 
                         translate-x-12 -translate-y-12 group-hover:translate-x-4 group-hover:-translate-y-4 
                         transition-transform duration-500 ease-out" 
            />
            
            {/* A crisp vertical DarkSerpent line that "grows" on the right side on hover */}
            <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[2px] h-0 bg-darkSerpent/20 group-hover:h-1/2 transition-all duration-500" />

            <div className="relative z-10 flex items-center gap-4">
              {/* ICON CONTAINER: DarkSerpent Box + Saffaron Icon */}
              <div className="relative flex-shrink-0 w-10 h-10">
                {/* The "Pulse" Ring - only visible on hover */}
                <div className="absolute inset-0 rounded-xl bg-darkSerpent opacity-0 group-hover:animate-ping group-hover:opacity-10" />
                
                <div className="relative w-10 h-10 rounded-xl flex items-center justify-center bg-darkSerpent text-saffaron shadow-lg z-10 transition-transform duration-300 group-hover:-rotate-6">
                  {stat.icon}
                </div>
              </div>

              {/* TEXT SECTION */}
              <div className="flex flex-col min-w-0">
                <span className="text-[9px] font-black uppercase tracking-[0.15em] text-gray-400 group-hover:text-darkSerpent/60 transition-colors truncate">
                  {stat.label}
                </span>
                <span className="text-xl font-black text-darkSerpent tracking-tight">
                  {stat.value}
                </span>
              </div>
            </div>

            {/* SEASALT CONTRAST: Bottom-left Saffaron "Dot" that turns into a small glow on hover */}
            <div 
              className="absolute bottom-3 left-4 w-1 h-1 rounded-full bg-darkSerpent/20 group-hover:bg-saffaron group-hover:scale-[2] transition-all duration-300" 
            />
          </motion.div>
        ))}
      </div>
    </div>
  );
}