import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';

export default function DashboardHeader() {
  const [adminName, setAdminName] = useState({ firstname: '', lastname: '' });
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    const fetchAdmin = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) return;
      const { data } = await supabase
        .from('admin')
        .select('firstname, lastname')
        .eq('auth_uid', session.user.id)
        .single();
      if (data) setAdminName({ firstname: data.firstname, lastname: data.lastname });
    };
    
    fetchAdmin();
    return () => clearInterval(timer);
  }, []);

  const dateString = currentTime.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  const timeString = currentTime.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit' });

  return (
    <header className="h-14 sm:h-16 px-4 sm:px-8 flex items-center justify-between bg-white border-b border-darkSerpent/10">
      
      {/* Left: System Time */}
      <div>
        <p className="text-[8px] sm:text-[9px] font-black uppercase tracking-[0.15em] sm:tracking-[0.2em] text-saffaron">System Time</p>
        <p className="text-[10px] sm:text-xs font-bold text-darkSerpent mt-0.5 tracking-wide">
          <span className="hidden sm:inline">{dateString} <span className="text-pastelGreen/50 px-1">|</span> {timeString}</span>
          <span className="sm:hidden">{timeString}</span>
        </p>
      </div>

      {/* Right: Applicant/Admin Name */}
      <div className="flex items-center gap-2 sm:gap-4">
        <div className="text-right">
          <p className="text-[8px] sm:text-[9px] font-black uppercase tracking-[0.15em] sm:tracking-[0.2em] text-pastelGreen">Account</p>
          <p className="text-xs sm:text-sm font-black text-darkSerpent mt-0.5 truncate max-w-[120px] sm:max-w-none">
            {adminName.firstname || '—'} {adminName.lastname || '—'}
          </p>
        </div>
        <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-saffaron flex items-center justify-center text-darkSerpent font-black text-[9px] sm:text-[10px] border border-darkSerpent/5 flex-shrink-0">
          {adminName.firstname?.[0]?.toUpperCase()}{adminName.lastname?.[0]?.toUpperCase()}
        </div>
      </div>
      
    </header>
  );
}