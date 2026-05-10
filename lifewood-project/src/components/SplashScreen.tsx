import { useMemo, useState, useRef, useCallback } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring } from 'framer-motion';
import lifewoodLogo from '../assets/lifewood-paper-logo.avif';

interface SplashProps {
  onEnter: () => void;
  isTransitioning: boolean;
}

const SLICES = 9;
const REPEL_RADIUS = 180;
const REPEL_STRENGTH = 100;
const BG = 'radial-gradient(ellipse at 50% 50%, #133020 0%, #0a1f14 40%, #000000 100%)';

function Speck({ x, y, size, floatY, floatDuration, floatDelay, opacity, mousePos }: {
  x: number; y: number; size: number; floatY: number; floatDuration: number; floatDelay: number; opacity: number;
  mousePos: React.MutableRefObject<{ x: number; y: number }>;
}) {
  const tx = useMotionValue(0);
  const ty = useMotionValue(0);
  const springX = useSpring(tx, { stiffness: 120, damping: 18 });
  const springY = useSpring(ty, { stiffness: 120, damping: 18 });
  const ref = useRef<HTMLDivElement>(null);

  const onFrame = useCallback(() => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = cx - mousePos.current.x;
    const dy = cy - mousePos.current.y;
    const dist = Math.sqrt(dx * dx + dy * dy);
    if (dist < REPEL_RADIUS && dist > 0) {
      const force = (1 - dist / REPEL_RADIUS) * REPEL_STRENGTH;
      tx.set((dx / dist) * force);
      ty.set((dy / dist) * force);
    } else {
      tx.set(0);
      ty.set(0);
    }
  }, [mousePos, tx, ty]);

  return (
    <motion.div
      ref={ref}
      className="absolute rounded-full bg-saffaron"
      style={{
        left: `${x}%`,
        top: `${y}%`,
        width: size,
        height: size,
        opacity,
        x: springX,
        y: springY,
      }}
      animate={{ y: [0, -floatY, 0] }}
      transition={{ duration: floatDuration, delay: floatDelay, repeat: Infinity, ease: 'easeInOut' }}
      onUpdate={onFrame}
    />
  );
}

export default function SplashScreen({ onEnter, isTransitioning }: SplashProps) {
  const [clicked, setClicked] = useState(false);
  const mousePos = useRef({ x: -9999, y: -9999 });

  const specks = useMemo(() => {
    return [...Array(80)].map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: 1.5 + Math.random() * 3.5,
      floatY: 12 + Math.random() * 28,
      floatDuration: 3 + Math.random() * 5,
      floatDelay: Math.random() * 5,
      opacity: 0.1 + Math.random() * 0.4,
    }));
  }, []);

  const handleClick = () => {
    setClicked(true);
    setTimeout(onEnter, 300);
  };

  return (
    <div
      className="fixed inset-0 z-[500]"
      onMouseMove={(e) => { mousePos.current = { x: e.clientX, y: e.clientY }; }}
      onMouseLeave={() => { mousePos.current = { x: -9999, y: -9999 }; }}
    >
      {/* SLICES — each is a full-screen strip that wipes left */}
      {[...Array(SLICES)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute left-0 right-0 overflow-hidden"
          style={{
            top: `${(i / SLICES) * 100}%`,
            height: `${100 / SLICES}%`,
          }}
          initial={{ x: '0%' }}
          animate={isTransitioning ? { x: '-102%' } : { x: '0%' }}
          transition={{
            duration: 0.75,
            delay: isTransitioning ? i * 0.07 : 0,
            ease: [0.76, 0, 0.24, 1],
          }}
        >
          {/* Full viewport canvas offset per slice */}
          <div
            className="absolute left-0 right-0"
            style={{
              top: `-${(i / SLICES) * 100}vh`,
              height: '100vh',
              background: BG,
            }}
          >
            {/* SPECKS */}
            <div className={`absolute inset-0 transition-opacity duration-700 ${clicked ? 'opacity-0' : 'opacity-100'}`}>
              {specks.map((s) => (
                <Speck key={s.id} {...s} mousePos={mousePos} />
              ))}
            </div>

            {/* CENTER CONTENT */}
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <motion.div
                animate={clicked ? { scale: 1.15, opacity: 0 } : { scale: 1, opacity: 1 }}
                transition={{ duration: 0.4, ease: 'easeIn' }}
                className="flex flex-col items-center"
              >
                <div className="relative">
                  <div className="absolute inset-0 rounded-full blur-[60px] bg-saffaron/10 scale-150" />
                  <img
                    src={lifewoodLogo}
                    alt="Lifewood Logo"
                    className="relative h-24 w-auto drop-shadow-[0_0_40px_rgba(255,179,71,0.2)]"
                  />
                </div>

                <div className="mt-10 text-center max-w-sm space-y-3">
                  <p className="text-seaSalt/90 text-2xl font-semibold leading-snug tracking-tight">
                    Where human intelligence<br />
                    <span className="text-saffaron italic">meets</span> the age of AI.
                  </p>
                  <div className="h-[1px] w-10 bg-saffaron/40 mx-auto" />
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      ))}

      {/* BUTTON & FOOTER — outside slices, never clipped */}
      <AnimatePresence>
        {!clicked && (
          <motion.div
            className="fixed inset-0 z-[501] flex flex-col items-center justify-center pointer-events-none"
            exit={{ opacity: 0, transition: { duration: 0.25 } }}
          >
            <div className="mt-[280px] pointer-events-auto">
              <button
                onClick={handleClick}
                className="px-12 py-4 bg-transparent border border-saffaron/50 text-saffaron rounded-full font-black uppercase tracking-[0.6em] text-[11px]
                           hover:bg-saffaron hover:text-black transition-all duration-500 hover:shadow-[0_0_30px_rgba(255,179,71,0.4)] active:scale-95"
              >
                Initialize Workspace
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {!clicked && (
          <motion.div
            className="fixed bottom-10 left-0 right-0 flex justify-center z-[501]"
            exit={{ y: 16, opacity: 0, transition: { duration: 0.3 } }}
          >
            <p className="text-pastelGreen/60 text-[8px] font-bold uppercase tracking-[0.8em]">
              Ready for synchronization
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
