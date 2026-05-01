// import React, { useState } from 'react';
// import { Mail, Lock, ArrowRight, ChevronLeft } from 'lucide-react';
// import { useNavigate } from 'react-router-dom';
// import dataTechImg from '../../assets/login/data_tech.jpeg';
// import lifewoodLogo from '../../assets/lifewood-logo.avif';
// import Button from '../../components/Button.tsx';
// import { loginAuth } from './auth.tsx';

// export default function LoginPage() {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const navigate = useNavigate();

//   const handleLogin = (e: React.FormEvent) => {
//     e.preventDefault();
//     loginAuth(email, password).then(() => {
//       navigate('/dashboard');
//     });
//   };

//   return (
//     <div className="min-h-screen w-full flex bg-seaSalt font-sans selection:bg-saffaron/30 overflow-hidden">
      
//       {/* LEFT SIDE: LOGIN FORM */}
//       {/* Added 'relative' and ensured z-index is high */}
//       <div className="w-full lg:w-[450px] flex flex-col justify-center px-8 md:px-16 bg-white shadow-xl z-20 relative">
        
//         {/* BACK BUTTON - Increased z-index and top padding */}
//         <button 
//           onClick={() => navigate(-1)} 
//           type="button"
//           className="absolute top-12 left-8 md:left-16 flex items-center gap-2 text-darkSerpent hover:text-saffaron transition-colors group text-sm font-bold z-50"
//         >
//           <ChevronLeft className="w-5 h-5 transition-transform group-hover:-translate-x-1" />
//           <span>Back</span>
//         </button>

//         <div className="mb-10 mt-20 lg:mt-0">
//           <div className="mb-6">
//             <img src={lifewoodLogo} alt="Lifewood" className="h-8 w-auto" />
//           </div>
//           <h1 className="text-3xl font-bold text-darkSerpent tracking-tight">Welcome back</h1>
//           <p className="text-darkSerpent/50 mt-2">Enter your credentials to access your dashboard.</p>
//         </div>

//         <form onSubmit={handleLogin} className="space-y-6">
//           <div>
//             <label className="block text-xs font-black uppercase tracking-widest text-darkSerpent/60 mb-2">Email Address</label>
//             <div className="relative">
//               <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-darkSerpent/30" />
//               <input 
//                 type="email" 
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//                 className="w-full pl-10 pr-4 py-3 bg-seaSalt border border-darkSerpent/5 rounded-xl focus:outline-none focus:ring-2 focus:ring-saffaron/50 transition-all"
//                 placeholder="name@company.com"
//                 required
//               />
//             </div>
//           </div>

//           <div>
//             <label className="block text-xs font-black uppercase tracking-widest text-darkSerpent/60 mb-2">Password</label>
//             <div className="relative">
//               <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-darkSerpent/30" />
//               <input 
//                 type="password" 
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//                 className="w-full pl-10 pr-4 py-3 bg-seaSalt border border-darkSerpent/5 rounded-xl focus:outline-none focus:ring-2 focus:ring-saffaron/50 transition-all"
//                 placeholder="••••••••"
//                 required
//               />
//             </div>
//           </div>

//           <Button type="submit" className="w-full py-4 rounded-xl shadow-lg shadow-darkSerpent/20">
//             Sign In <ArrowRight className="w-4 h-4" />
//           </Button>
//         </form>

//         <p className="mt-8 text-sm text-center text-darkSerpent/40">
//           Don't have an account? <a href="#" className="text-darkSerpent font-bold hover:underline">Contact Admin</a>
//         </p>
//       </div>

//       {/* RIGHT SIDE: MEDIA ZONE */}
//       <div className="hidden lg:block relative flex-1 bg-darkSerpent overflow-hidden">
//         <div className="absolute inset-0">
//           <img 
//             src={dataTechImg} 
//             alt="Data Technology" 
//             className="w-full h-full object-cover opacity-60 grayscale-[20%]"
//           />
//           <div className="absolute inset-0 bg-gradient-to-t from-darkSerpent via-darkSerpent/20 to-transparent" />
//         </div>

//         <div className="absolute bottom-20 left-20 right-20 text-white z-20">
//           <span className="text-saffaron font-bold text-xs uppercase tracking-[0.2em] mb-4 block">Inclusive Intelligence</span>
//           <h2 className="text-5xl font-bold leading-tight mb-6">
//             Empowering the future <br /> 
//             <span className="text-white/40 italic">through data.</span>
//           </h2>
//           <div className="h-1 w-20 bg-saffaron rounded-full" />
//         </div>
//       </div>
//     </div>
//   );
// }

import React, { useState } from 'react';
import { Mail, Lock, ArrowRight, ChevronLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import dataTechImg from '../../assets/login/data_tech.jpeg';
import lifewoodLogo from '../../assets/lifewood-logo.avif';
import Button from '../../components/Button.tsx';
import { loginAuth } from './auth.tsx';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const authData = await loginAuth(email, password);
      const userId = authData.user.id; 
      
      console.log('User UID:', userId);
      
      navigate('/dashboard');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Invalid email or password');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex bg-seaSalt font-sans selection:bg-saffaron/30 overflow-hidden">
      
      <div className="w-full lg:w-[450px] flex flex-col justify-center px-8 md:px-16 bg-white shadow-xl z-20 relative">
        
        <button 
          onClick={() => navigate(-1)} 
          type="button"
          className="absolute top-12 left-8 md:left-16 flex items-center gap-2 text-darkSerpent hover:text-saffaron transition-colors group text-sm font-bold z-50"
        >
          <ChevronLeft className="w-5 h-5 transition-transform group-hover:-translate-x-1" />
          <span>Back</span>
        </button>

        <div className="mb-10 mt-20 lg:mt-0">
          <div className="mb-6">
            <img src={lifewoodLogo} alt="Lifewood" className="h-8 w-auto" />
          </div>
          <h1 className="text-3xl font-bold text-darkSerpent tracking-tight">Welcome back</h1>
          <p className="text-darkSerpent/50 mt-2">Enter your credentials to access your dashboard.</p>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-xl text-red-600 text-sm">
            {error}
          </div>
        )}

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
                disabled={loading}
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
                disabled={loading}
              />
            </div>
          </div>

          <Button type="submit" className="w-full py-4 rounded-xl shadow-lg shadow-darkSerpent/20" disabled={loading}>
            {loading ? 'Signing in...' : 'Sign In'}
            {!loading && <ArrowRight className="w-4 h-4" />}
          </Button>
        </form>

        <p className="mt-8 text-sm text-center text-darkSerpent/40">
          Don't have an account? <a href="#" className="text-darkSerpent font-bold hover:underline">Contact Admin</a>
        </p>
      </div>

      <div className="hidden lg:block relative flex-1 bg-darkSerpent overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src={dataTechImg} 
            alt="Data Technology" 
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