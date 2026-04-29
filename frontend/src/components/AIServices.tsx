import { FileText, Layers, Target, Eye } from "lucide-react";
import { motion } from "framer-motion";

export const DocumentStack = () => (
  <div className="relative w-14 h-14 mb-8">
    <div className="absolute inset-0 bg-saffaron/10 rounded-2xl rotate-6 group-hover:rotate-12 transition-transform duration-500" />
    <div className="absolute inset-0 bg-white border border-darkSerpent/15 rounded-2xl flex items-center justify-center shadow-sm">
      <FileText className="w-6 h-6 text-saffaron" />
    </div>
  </div>
);

export const AudioNode = () => (
  <div className="relative w-12 h-12 mb-6 flex items-center justify-center">
    <motion.div
      animate={{ scale: [1, 1.2, 1] }}
      transition={{ duration: 2, repeat: Infinity }}
      className="absolute inset-0 bg-saffaron/20 rounded-full"
    />
    <div className="relative w-10 h-10 bg-white border-2 border-darkSerpent/10 rounded-full flex items-center justify-center shadow-sm">
      <Layers className="w-5 h-5 text-darkSerpent" />
    </div>
  </div>
);

export const VisionGrid = () => (
  <div className="relative w-14 h-14 mb-8 p-1.5 bg-white border border-darkSerpent/15 rounded-2xl overflow-hidden group shadow-sm">
    <div className="grid grid-cols-2 gap-1 h-full w-full">
      {[0, 1, 2, 3].map((i) => (
        <motion.div 
          key={i}
          animate={{ opacity: [0.2, 0.6, 0.2] }}
          transition={{ duration: 2, delay: i * 0.3, repeat: Infinity }}
          className="bg-saffaron/50 rounded-md" 
        />
      ))}
    </div>
    <Target className="absolute inset-0 m-auto w-5 h-5 text-darkSerpent/20 group-hover:scale-110 transition-transform" />
  </div>
);

export const VideoLens = () => (
  <div className="relative w-14 h-14 mb-8 rounded-2xl border border-darkSerpent/5 flex items-center justify-center overflow-hidden bg-white shadow-sm group">
    <motion.div 
      animate={{ x: [-20, 20, -20] }}
      transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      className="absolute inset-y-0 w-full bg-darkSerpent/[0.03] skew-x-12"
    />
    <Eye className="w-6 h-6 text-darkSerpent relative z-10 group-hover:scale-110 transition-transform" />
  </div>
);