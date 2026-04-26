import { useInView } from '../hooks/useInView';

interface AnimateProps {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}

export default function Animate({ children, delay = 0, className = '' }: AnimateProps) {
  const { ref, inView } = useInView();
  return (
    <div ref={ref} className={className} style={{
      transition: `opacity 0.7s ease ${delay}ms, transform 0.7s ease ${delay}ms`,
      opacity: inView ? 1 : 0,
      transform: inView ? 'translateY(0)' : 'translateY(32px)',
    }}>
      {children}
    </div>
  );
}
