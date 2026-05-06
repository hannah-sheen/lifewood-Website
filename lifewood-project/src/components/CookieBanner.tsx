import { AnimatePresence, motion } from 'framer-motion';
import { Cookie } from 'lucide-react';
import { showSuccessToast } from './Toast';

interface CookieBannerProps {
  visible: boolean;
  onClose: () => void;
}

export default function CookieBanner({ visible, onClose }: CookieBannerProps) {
  const accept = () => {
    localStorage.setItem('cookie-consent', 'accepted');
    onClose();
    showSuccessToast('Cookie preferences saved!');
  };

  const reject = () => {
    localStorage.setItem('cookie-consent', 'rejected');
    onClose();
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 16 }}
          transition={{ duration: 0.25 }}
          className="fixed bottom-6 left-6 z-[9999] max-w-sm w-full bg-darkSerpent text-white rounded-2xl shadow-2xl p-5 border border-saffaron/30"
        >
          <div className="flex items-center gap-2 mb-2">
            <Cookie className="w-4 h-4 text-saffaron shrink-0" />
            <p className="text-xs font-black uppercase tracking-widest text-saffaron">Cookie Settings</p>
          </div>
          <p className="text-sm text-white/70 leading-relaxed mb-4">
            We use cookies to personalize content, run ads, and analyze traffic.
          </p>
          <div className="flex gap-2">
            <button
              onClick={accept}
              className="flex-1 py-2 bg-saffaron text-darkSerpent text-xs font-black uppercase tracking-widest rounded-xl hover:bg-earthYellow transition-colors cursor-pointer"
            >
              Accept
            </button>
            <button
              onClick={reject}
              className="flex-1 py-2 bg-white/10 text-white/70 text-xs font-black uppercase tracking-widest rounded-xl hover:bg-white/20 transition-colors cursor-pointer"
            >
              Reject
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
