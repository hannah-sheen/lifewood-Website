import { useRef, useState, useCallback } from 'react';

export interface Trail { id: number; x: number; y: number; size: number; color: string; }

const TRAIL_COLORS = ['#FFB347', '#FFC370', '#ffffff', '#046241', '#FFB347'];

export function useTrail(colors = TRAIL_COLORS) {
  const ref = useRef<HTMLDivElement>(null);
  const [trails, setTrails] = useState<Trail[]>([]);
  const [glow, setGlow] = useState({ x: 50, y: 50 });
  const counter = useRef(0);

  const onMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setGlow({ x: (x / rect.width) * 100, y: (y / rect.height) * 100 });
    const id = counter.current++;
    const size = Math.random() * 10 + 4;
    const color = colors[Math.floor(Math.random() * colors.length)];
    setTrails(prev => [...prev.slice(-30), { id, x, y, size, color }]);
    setTimeout(() => setTrails(prev => prev.filter(t => t.id !== id)), 800);
  }, [colors]);

  return { ref, trails, glow, onMouseMove };
}

export function TrailParticles({ trails }: { trails: Trail[] }) {
  const last = trails[trails.length - 1];
  return (
    <>
      {trails.map((t, idx) => (
        <span key={t.id} className="absolute pointer-events-none rounded-full" style={{
          left: t.x, top: t.y,
          width: t.size, height: t.size,
          transform: 'translate(-50%, -50%)',
          background: t.color,
          boxShadow: `0 0 ${t.size * 2}px ${t.size}px ${t.color}55`,
          opacity: 1 - (idx / trails.length) * 0.6,
          animation: 'trailFade 0.8s ease forwards',
        }} />
      ))}
      {last && (
        <span className="absolute pointer-events-none rounded-full z-20" style={{
          left: last.x, top: last.y,
          width: 14, height: 14,
          transform: 'translate(-50%, -50%)',
          background: '#FFB347',
          boxShadow: '0 0 12px 4px #FFB34799',
        }} />
      )}
    </>
  );
}
