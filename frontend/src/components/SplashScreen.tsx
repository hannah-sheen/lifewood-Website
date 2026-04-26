import { useState, useEffect, useRef } from 'react';
import lifewoodLogo from '../assets/lifewood-logo.avif';

interface SplashScreenProps {
  onEnter: () => void;
}

export default function SplashScreen({ onEnter }: SplashScreenProps) {
  const [fading, setFading] = useState(false);
  const triggered = useRef(false);

  useEffect(() => {
    const handleScroll = (e: WheelEvent | TouchEvent) => {
      if (triggered.current) return;
      const isScrollDown = e instanceof WheelEvent ? e.deltaY > 0 : e.type === 'touchmove';
      if (!isScrollDown) return;

      triggered.current = true;
      setFading(true);
      setTimeout(onEnter, 800);
    };

    window.addEventListener('wheel', handleScroll, { passive: true });
    window.addEventListener('touchmove', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('wheel', handleScroll);
      window.removeEventListener('touchmove', handleScroll);
    };
  }, [onEnter]);

  return (
    <div
      className="fixed inset-0 z-50 bg-black overflow-hidden"
      style={{ transition: 'opacity 0.8s ease', opacity: fading ? 0 : 1 }}
    >
      <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6 gap-8">
        <img src={lifewoodLogo} alt="Lifewood" className="h-10 w-auto brightness-0 invert opacity-90" />
        <div className="space-y-4">
          <h1 className="text-5xl md:text-6xl font-semibold text-white tracking-tight">Welcome to Lifewood</h1>
          <p className="text-white/50 text-lg max-w-md mx-auto">Always switched on, never off.</p>
        </div>
        <div className="absolute bottom-12 flex flex-col items-center gap-2">
          <p className="text-white/30 text-xs tracking-[0.3em] uppercase">Scroll to enter</p>
          <div className="flex flex-col items-center gap-1 mt-2">
            <div className="w-[1.5px] h-10 rounded-full bg-linear-to-b from-transparent via-white/50 to-transparent animate-pulse" />
            <svg className="w-4 h-4 text-white/40 animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}
