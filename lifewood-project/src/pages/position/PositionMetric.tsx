import { motion } from 'framer-motion';
import { Activity, Unlock, CheckCircle, AlertTriangle, Archive as ArchiveIcon } from 'lucide-react';

export default function PositionMetrics({ totalCount, openPositions, fullPositions, urgentPositions, archivedCount }: {
  totalCount: number;
  openPositions: number;
  fullPositions: number;
  urgentPositions: number;
  archivedCount: number;
}) {
  const stats = [
    { label: 'Total', value: totalCount, icon: <Activity size={20}/> },
    { label: 'Open', value: openPositions, icon: <Unlock size={20}/> },
    { label: 'Full', value: fullPositions, icon: <CheckCircle size={20}/> },
    { label: 'Urgent', value: urgentPositions, icon: <AlertTriangle size={20}/> },
    { label: 'Archived', value: archivedCount, icon: <ArchiveIcon size={20}/> },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 pb-8">
      {stats.map((stat, i) => (
        <motion.div
          key={stat.label}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.05 }}
          className="group relative bg-white border border-darkSerpent/10 rounded-2xl p-4 cursor-default overflow-hidden transition-all duration-500"
        >
          {/* THE HOVER EFFECT: A DarkSerpent geometric accent that slides in from the top-right corner */}
          <div 
            className="absolute top-0 right-0 w-24 h-24 bg-darkSerpent/[0.03] rounded-bl-[100px] 
                       translate-x-12 -translate-y-12 group-hover:translate-x-4 group-hover:-translate-y-4 
                       transition-transform duration-500 ease-out" 
          />
          
          {/* A crisp vertical DarkSerpent line that "grows" on the right side on hover */}
          <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[2px] h-0 bg-darkSerpent/20 group-hover:h-1/2 transition-all duration-500" />

          <div className="relative z-10 flex items-center gap-4">
            
            {/* ICON CONTAINER: DarkSerpent Box + Saffaron Icon */}
            <div className="relative flex-shrink-0 w-12 h-12">
              {/* The "Pulse" Ring - only visible on hover */}
              <div className="absolute inset-0 rounded-xl bg-darkSerpent opacity-0 group-hover:animate-ping group-hover:opacity-10" />
              
              <div className="relative w-12 h-12 rounded-xl flex items-center justify-center bg-darkSerpent text-saffaron shadow-lg z-10 transition-transform duration-300 group-hover:-rotate-6">
                {stat.icon}
              </div>
            </div>

            {/* TEXT SECTION */}
            <div className="flex flex-col min-w-0">
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 group-hover:text-darkSerpent/60 transition-colors">
                {stat.label}
              </span>
              <span className="text-2xl font-black text-darkSerpent tracking-tight">
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
  );
}