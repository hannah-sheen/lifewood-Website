import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Home } from 'lucide-react';
import Animate from '../components/Animate';
import Button from '../components/Button';

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-darkSerpent flex items-center justify-center overflow-hidden relative">

      {/* Radial glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,179,71,0.06),transparent_70%)]" />

      {/* Large 404 background text */}
      <span className="absolute select-none font-black text-white/[0.03] leading-none pointer-events-none"
        style={{ fontSize: 'clamp(180px, 35vw, 420px)' }}>
        404
      </span>

      <div className="relative z-10 text-center px-6 max-w-2xl mx-auto">
        <Animate>
          <span className="text-saffaron font-bold text-xs uppercase tracking-[0.25em] mb-6 block">
            Page Not Found
          </span>
        </Animate>

        <Animate delay={100}>
          <h1 className="text-6xl md:text-8xl font-black tracking-tighter text-white leading-none mb-6">
            Lost in the <span className="text-white/20 italic">data.</span>
          </h1>
        </Animate>

        <Animate delay={200}>
          <p className="text-white/50 text-lg leading-relaxed mb-12 max-w-md mx-auto">
            The page you're looking for doesn't exist or has been moved. Let's get you back on track.
          </p>
        </Animate>

        <Animate delay={300}>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              onClick={() => navigate(-1)}
              variant="outline"
              className="border-white/20 text-white hover:border-saffaron px-8 py-4 rounded-2xl text-sm uppercase tracking-widest"
            >
              <ArrowLeft className="w-4 h-4" /> Go Back
            </Button>
            <Button
              onClick={() => navigate('/')}
              className="px-8 py-4 rounded-2xl text-sm uppercase tracking-widest"
            >
              <Home className="w-4 h-4" /> Back to Home
            </Button>
          </div>
        </Animate>

        <Animate delay={400}>
          <p className="mt-16 text-white/20 text-xs uppercase tracking-widest">
            © {new Date().getFullYear()} Lifewood Data Technology
          </p>
        </Animate>
      </div>
    </div>
  );
}
