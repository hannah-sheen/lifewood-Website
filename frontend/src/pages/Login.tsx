import React, { useState } from 'react';
import { Mail, Lock, ArrowRight, ChevronLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Logging in with:", email, password);
  };

  return (
    <div className="min-h-screen w-full flex bg-seaSalt font-sans selection:bg-saffaron/30 overflow-hidden">
      
      {/* LEFT SIDE: LOGIN FORM */}
      {/* Added 'relative' and ensured z-index is high */}
      <div className="w-full lg:w-[450px] flex flex-col justify-center px-8 md:px-16 bg-white shadow-xl z-20 relative">
        
        {/* BACK BUTTON - Increased z-index and top padding */}
        <button 
          onClick={() => navigate(-1)} 
          type="button"
          className="absolute top-12 left-8 md:left-16 flex items-center gap-2 text-darkSerpent hover:text-saffaron transition-colors group text-sm font-bold z-50"
        >
          <ChevronLeft className="w-5 h-5 transition-transform group-hover:-translate-x-1" />
          <span>Back</span>
        </button>

        <div className="mb-10 mt-20 lg:mt-0">
          <div className="h-12 w-12 bg-darkSerpent rounded-xl mb-6 flex items-center justify-center">
             <span className="text-saffaron font-bold">LW</span>
          </div>
          <h1 className="text-3xl font-bold text-darkSerpent tracking-tight">Welcome back</h1>
          <p className="text-darkSerpent/50 mt-2">Enter your credentials to access your dashboard.</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block text-xs font-black uppercase tracking-widest text-darkSerpent/60 mb-2">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-darkSerpent/30" />
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-seaSalt border border-darkSerpent/5 rounded-xl focus:outline-none focus:ring-2 focus:ring-saffaron/50 transition-all"
                placeholder="name@company.com"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-black uppercase tracking-widest text-darkSerpent/60 mb-2">Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-darkSerpent/30" />
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-seaSalt border border-darkSerpent/5 rounded-xl focus:outline-none focus:ring-2 focus:ring-saffaron/50 transition-all"
                placeholder="••••••••"
                required
              />
            </div>
          </div>

          <button 
            type="submit"
            className="w-full bg-darkSerpent text-white py-4 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-darkSerpent/90 transition-transform active:scale-[0.98] shadow-lg shadow-darkSerpent/20"
          >
            Sign In <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <p className="mt-8 text-sm text-center text-darkSerpent/40">
          Don't have an account? <a href="#" className="text-darkSerpent font-bold hover:underline">Contact Admin</a>
        </p>
      </div>

      {/* RIGHT SIDE: MEDIA ZONE */}
      <div className="hidden lg:block relative flex-1 bg-darkSerpent overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80" 
            alt="Office Culture" 
            className="w-full h-full object-cover opacity-60 grayscale-[20%]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-darkSerpent via-darkSerpent/20 to-transparent" />
        </div>

        <div className="absolute bottom-20 left-20 right-20 text-white z-20">
          <span className="text-saffaron font-bold text-xs uppercase tracking-[0.2em] mb-4 block">Inclusive Intelligence</span>
          <h2 className="text-5xl font-bold leading-tight mb-6">
            Empowering the future <br /> 
            <span className="text-white/40 italic">through data.</span>
          </h2>
          <div className="h-1 w-20 bg-saffaron rounded-full" />
        </div>
      </div>
    </div>
  );
}