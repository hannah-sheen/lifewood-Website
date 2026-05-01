import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface ConfirmationModalProps {
  isOpen: boolean;
  title: string;
  message: string;
  buttonName?: string;
  onConfirm: () => void | Promise<void>;
  onCancel?: () => void;
  isLoading?: boolean;
  isDangerous?: boolean;
}

export default function ConfirmationModal({
isOpen,
  title,
  message,
  buttonName = 'Confirm',
  onConfirm,
  onCancel,
  isLoading = false,
  isDangerous = false,
}: ConfirmationModalProps) {
  
  // Close on Escape key
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => { if (e.key === 'Escape') onCancel?.(); };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [onCancel]);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onCancel}
            className="fixed inset-0 bg-[#133020]/40 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          >
            {/* Modal Content */}
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside
              className="bg-white rounded-3xl p-8 max-w-sm w-full shadow-2xl border border-gray-100"
            >
              <h3 className="text-xl font-bold text-[#133020] mb-3">{title}</h3>
              <p className="text-gray-600 mb-8">{message}</p>

              <div className="flex gap-3 justify-end">
                <button
                  onClick={onCancel}
                  disabled={isLoading}
                  className="px-6 py-2.5 rounded-xl text-sm font-bold text-gray-600 hover:bg-gray-100 transition-all"
                >
                  Cancel
                </button>
                <button
                  onClick={onConfirm}
                  disabled={isLoading}
                  className={`px-6 py-2.5 rounded-xl text-sm font-bold transition-all ${
                    isDangerous
                      ? 'bg-red-600 text-white hover:bg-red-700'
                      : 'bg-[#FFB347] text-[#133020] hover:bg-[#FFC370]'
                  } disabled:opacity-50`}
                >
                  {isLoading ? 'Processing...' : buttonName}
                </button>
              </div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}