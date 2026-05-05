import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title?: string;        
  subtitle?: string;     
  footer?: React.ReactNode;
  className?: string;
} 

export default function Modal({ isOpen, onClose, children, title, subtitle, footer, className = "" }: ModalProps) {
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : 'unset';
    const handleEsc = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handleEsc);
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleEsc);
    };
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 md:p-6">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-darkSerpent/90 backdrop-blur-xl"
          />
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 30 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className={`relative w-full max-w-2xl max-h-[90vh] bg-white rounded-[2rem] shadow-2xl overflow-hidden flex flex-col ${className}`}
          >
            <button
              onClick={onClose}
              className="absolute top-8 right-8 z-20 p-3 rounded-full bg-seaSalt hover:bg-saffaron transition-all cursor-pointer"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Sticky Header */}
            {(title || subtitle) && (
              <div className="pt-10 px-10 md:pt-16 md:px-16 pb-8 shrink-0">
                <div className="max-w-3xl mx-auto">
                  {title && <h2 className="text-3xl font-bold tracking-tighter text-darkSerpent">{title}</h2>}
                  {subtitle && <p className="text-darkSerpent/40 text-sm italic mt-2">{subtitle}</p>}
                </div>
              </div>
            )}

            {/* Scrollable Content */}
            <div className={`flex-1 overflow-y-auto modal-scroll ${title || subtitle ? '' : 'pt-10 md:pt-16'} px-10 md:px-16 pb-10 md:pb-16`}>
              <div className="max-w-3xl mx-auto">
                {children}
              </div>
            </div>

            {/* Footer */}
            {footer && (
              <div className="bg-seaSalt/50 border-t border-darkSerpent/5 p-8 shrink-0">
                <div className="max-w-3xl mx-auto">
                  {footer}
                </div>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}