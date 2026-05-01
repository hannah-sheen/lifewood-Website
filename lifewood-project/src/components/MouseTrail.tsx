import { useTrail, TrailParticles } from '../hooks/useTrail.tsx';

interface MouseTrailProps {
  children: React.ReactNode;
  bg?: string;
  glowColor?: string;
  className?: string;
  id?: string;
  as?: 'div' | 'section';
}

export default function MouseTrail({
  children,
  bg = '',
  glowColor = 'rgba(255,179,71,0.08)',
  className = '',
  id,
  as: Tag = 'div',
}: MouseTrailProps) {
  const { ref, trails, glow, onMouseMove } = useTrail();

  return (
    <Tag
      id={id}
      ref={ref as any}
      onMouseMove={onMouseMove}
      className={`relative overflow-hidden cursor-none ${bg} ${className}`}
    >
      <div
        className="absolute inset-0 pointer-events-none transition-all duration-75"
        style={{
          background: `radial-gradient(500px circle at ${glow.x}% ${glow.y}%, ${glowColor}, transparent 60%)`,
        }}
      />
      <TrailParticles trails={trails} />
      <div className="relative z-10">{children}</div>
    </Tag>
  );
}
