import { useState, useEffect } from 'react';
import { 
  TrendingUp, Users, CheckCircle, Clock, Briefcase, FileText, 
  UserCheck, Activity, Eye, Award, Zap, ArrowUp, 
  ArrowDown, AlertTriangle, XCircle, UserMinus, Flame
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, 
  CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area 
} from 'recharts';

import Position from '../position/Positions';
import Applications from '../application/Applications';
import DashboardSidebar from '../../components/DashboardSidebar';
import DashboardHeader from '../../components/DashboardHeader';
import { LoadingScreen } from '../../components/LoadingScreen';
import { formatDateTime } from '../../helpers/datetime';

import { 
  fetchDashboardStats, 
  fetchWeeklyTrends, 
  fetchTopPositions, 
  fetchStatusDistribution, 
  fetchMonthlyTrends,
  fetchRecentActivities
} from './dashboardServices';

import type { 
  DashboardStats as DashboardStatsType, 
  WeeklyTrend, 
  TopPosition, 
  StatusDistribution, 
  MonthlyData, 
  RecentActivity 
} from '../types';

const BRAND_COLORS = {
  paper: '#f5eedb',
  seaSalt: '#F9F7F7',
  darkSerpent: '#133020',
  castletonGreen: '#046241',
  lightGreen: '#417256',
  pastelGreen: '#708E7C',
  saffaron: '#FFB347',
  earthYellow: '#FFC370',
  darkYellow: '#C17110',
  darkGray: '#666666',
  ashGray: '#999999',
  lightGray: '#CCCCCC',
  red: '#dc2626' ,
  white: '#ffffff'
};

const CustomTooltip = ({ active, payload, label, formatter }: any) => {
  if (active && payload && payload.length) {
    const formattedLabel = formatter ? formatter(payload[0].value, payload[0].name) : [payload[0].value, payload[0].name];
    return (
      <div className="bg-darkSerpent text-white px-4 py-2 rounded-xl shadow-2xl border border-lightGray/20 font-mono text-[11px] leading-relaxed">
        <p className="font-bold text-ashGray uppercase tracking-widest">{label}</p>
        <div className="w-12 h-px bg-white/10 my-2" />
        <p className="font-bold text-base text-saffaron">
          {formattedLabel[0]} <span className="text-ashGray text-xs">{formattedLabel[1]}</span>
        </p>
      </div>
    );
  }
  return null;
};

function KpiCard({ title, value, icon: Icon, trend, color, subtitle, delay = 0 }: any) {
  const isPositive = trend?.startsWith('+');
  
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: delay, duration: 0.4, ease: "easeOut" }}
      whileHover="hover"
      className="bg-white rounded-2xl p-6 border border-lightGray/30 cursor-default transition-all duration-300 hover:shadow-xl hover:border-saffaron/40 relative overflow-hidden group"
    >
      {/* Inner Pattern Background */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none group-hover:opacity-[0.05] transition-opacity">
        <svg width="100%" height="100%"><defs><pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse"><path d="M 20 0 L 0 0 0 20" fill="none" stroke="currentColor" strokeWidth="1"/></pattern></defs><rect width="100%" height="100%" fill="url(#grid)" /></svg>
      </div>

      <div className="flex items-start justify-between mb-3 relative z-10">
        <motion.div 
          variants={{ hover: { scale: 1.1, rotate: 5 } }}
          className="p-3.5 rounded-xl bg-darkSerpent shadow-lg shadow-darkSerpent/20"
        >
          <Icon size={20} style={{ color }} />
        </motion.div>
        {trend && (
          <div className={`flex items-center gap-1.5 text-xs font-black uppercase tracking-wider ${isPositive ? 'text-castletonGreen' : 'text-red-600'}`}>
            {isPositive ? <ArrowUp size={14} /> : <ArrowDown size={14} />}
            {trend}
          </div>
        )}
      </div>

      <div className="relative z-10">
        <p className="text-4xl font-black text-darkSerpent tracking-tight leading-none">{value}</p>
        <p className="text-xs font-bold text-ashGray mt-1.5 uppercase tracking-widest">{title}</p>
        {subtitle && <p className="text-[10px] text-pastelGreen font-semibold mt-1 italic">{subtitle}</p>}
      </div>
    </motion.div>
  );
}

function DashboardView({ stats, weeklyTrends, topPositions, statusDistribution, monthlyTrends, recentActivities, isRefetching }: any) {
  const totalActiveInPipeline = (stats.pendingReviews || 0) + (stats.shortlisted || 0);
  const totalClosed = (stats.totalHired || 0) + (stats.notSelected || 0) + (stats.declined || 0) + (stats.withdrawn || 0);

  const pieColors = [
    BRAND_COLORS.darkSerpent,     
    BRAND_COLORS.castletonGreen,  
    BRAND_COLORS.pastelGreen,    
    BRAND_COLORS.darkYellow,     
    BRAND_COLORS.saffaron,       
    BRAND_COLORS.ashGray,        
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-2xl font-bold text-darkSerpent">Dashboard</h1>
          <p className="text-gray-500 text-xs mt-1">Overview of your recruitment operations</p>
        </div>
      </div>

      {/* Primary KPI Cards Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        <KpiCard title="Total Applications" value={stats.totalApplications} icon={FileText} trend={`+${stats.monthlyGrowth}%`} color={BRAND_COLORS.saffaron} subtitle="Last 30 days" delay={0} />
        <KpiCard title="Active Positions" value={stats.activePositions} icon={Briefcase} color={BRAND_COLORS.earthYellow} subtitle={`${stats.urgentPositions} urgent`} delay={0.1} />
        <KpiCard title="Total Hired" value={stats.totalHired} icon={CheckCircle} color={BRAND_COLORS.pastelGreen} subtitle={`${stats.conversionRate}% conversion`} delay={0.2} />
        <KpiCard title="Total Applicants" value={stats.totalApplicants} icon={Users} color={BRAND_COLORS.lightGreen} delay={0.3} />
      </div>

      {/* Secondary KPI Row */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 pt-2">
        <KpiCard title="Pending" value={stats.pendingReviews} icon={Clock} color={BRAND_COLORS.saffaron} delay={0.4} />
        <KpiCard title="Shortlisted" value={stats.shortlisted} icon={UserCheck} color={BRAND_COLORS.earthYellow} delay={0.45} />
        <KpiCard title="Rejected" value={stats.notSelected || 0} icon={XCircle} color={BRAND_COLORS.red} delay={0.5} />
        <KpiCard title="Declined" value={stats.declined || 0} icon={AlertTriangle} color={BRAND_COLORS.darkYellow} delay={0.55} />
        <KpiCard title="Withdrawn" value={stats.withdrawn || 0} icon={UserMinus} color={BRAND_COLORS.ashGray} delay={0.6} />
      </div>

      {/* Pipeline Summary */}
      <div className="bg-gradient-to-r from-darkSerpent/[0.03] to-castletonGreen/[0.03] rounded-2xl p-6 border border-lightGray/20 shadow-inner relative overflow-hidden">
         <motion.div 
           animate={{ x: ["-100%", "100%"] }} 
           transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
          className="absolute top-0 left-0 w-1/2 h-full bg-gradient-to-r from-transparent via-white/40 to-transparent skew-x-12"
         />
        <div className="flex items-center justify-between flex-wrap gap-4 relative z-10">
          {[
            { label: 'Active Pipeline', value: totalActiveInPipeline, subtitle: 'In Review & Shortlisted' },
            { label: 'Avg Time to Hire', value: `${stats.avgTimeToHire} days`, subtitle: 'Current velocity' },
            { label: 'Conversion Rate', value: `${stats.conversionRate}%`, subtitle: 'Success ratio' },
            { label: 'Closed Cases', value: totalClosed, subtitle: 'Finalized entries' },
          ].map((item, i) => (
            <div key={i} className="flex items-center gap-6">
              <div className="text-center">
                <p className="text-[10px] uppercase font-bold text-ashGray tracking-widest">{item.label}</p>
                <p className="text-3xl font-black text-darkSerpent tracking-tight my-1">{item.value}</p>
                <p className="text-[10px] text-pastelGreen font-semibold italic">{item.subtitle}</p>
              </div>
              {i !== 3 && <div className="w-px h-16 bg-lightGray/30 hidden md:block" />}
            </div>
          ))}
        </div>
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl p-6 border border-lightGray/20 shadow-sm">
          <div className="flex items-center justify-between mb-4 pb-2 border-b border-seaSalt">
            <h3 className="text-sm font-bold text-darkSerpent uppercase tracking-wider">Weekly Activity Flow</h3>
            <Activity size={16} className="text-lightGreen" />
          </div>
          <ResponsiveContainer width="100%" height={280}>
            <LineChart data={weeklyTrends} margin={{ top: 10, right: 10, bottom: 0, left: -10 }}>
              <CartesianGrid strokeDasharray="6 6" stroke="#f0f0f0" vertical={false} />
              <XAxis dataKey="day" stroke={BRAND_COLORS.darkSerpent} fontSize={11} tick={{ fill: BRAND_COLORS.darkSerpent, fontWeight: 600 }} axisLine={false} tickLine={false} />
              <YAxis stroke={BRAND_COLORS.darkSerpent} fontSize={11} tick={{ fill: BRAND_COLORS.darkSerpent, fontWeight: 600 }} axisLine={false} tickLine={false} />
              <Tooltip content={<CustomTooltip formatter={(value: any, name: any) => {
                const labels: Record<string, string> = { applications: 'Applications', hired: 'Hired', shortlisted: 'Shortlisted' };
                return [value, labels[name as string] || name];
              }} />} />
              <Line type="monotone" dataKey="applications" stroke={BRAND_COLORS.castletonGreen} strokeWidth={3} dot={{ fill: BRAND_COLORS.castletonGreen, r: 4, strokeWidth: 2, stroke: BRAND_COLORS.white }} />
              <Line type="monotone" dataKey="shortlisted" stroke={BRAND_COLORS.lightGreen} strokeWidth={3} dot={{ fill: BRAND_COLORS.lightGreen, r: 4, strokeWidth: 2, stroke: BRAND_COLORS.white }} />
              <Line type="monotone" dataKey="hired" stroke={BRAND_COLORS.saffaron} strokeWidth={3} dot={{ fill: BRAND_COLORS.saffaron, r: 4, strokeWidth: 2, stroke: BRAND_COLORS.white }} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white rounded-2xl p-6 border border-lightGray/20 shadow-sm">
          <div className="flex items-center justify-between mb-4 pb-2 border-b border-seaSalt">
            <h3 className="text-sm font-bold text-darkSerpent uppercase tracking-wider">Monthly Pulse</h3>
            <TrendingUp size={16} className="text-lightGreen" />
          </div>
          <ResponsiveContainer width="100%" height={280}>
            <AreaChart data={monthlyTrends} margin={{ top: 10, right: 10, bottom: 0, left: -10 }}>
              <defs>
                <linearGradient id="applicationsGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={BRAND_COLORS.castletonGreen} stopOpacity={0.2}/>
                  <stop offset="95%" stopColor={BRAND_COLORS.castletonGreen} stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="hiredGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={BRAND_COLORS.saffaron} stopOpacity={0.2}/>
                  <stop offset="95%" stopColor={BRAND_COLORS.saffaron} stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="6 6" stroke="#f0f0f0" vertical={false} />
              <XAxis dataKey="month" stroke={BRAND_COLORS.darkSerpent} fontSize={11} tick={{ fill: BRAND_COLORS.darkSerpent, fontWeight: 600 }} axisLine={false} tickLine={false} />
              <YAxis stroke={BRAND_COLORS.darkSerpent} fontSize={11} tick={{ fill: BRAND_COLORS.darkSerpent, fontWeight: 600 }} axisLine={false} tickLine={false} />
              <Tooltip content={<CustomTooltip formatter={(value: any, name: any) => {
                const labels: Record<string, string> = { applications: 'Applications', hired: 'Hired' };
                return [value, labels[name as string] || name];
              }} />} />
              <Area type="monotone" dataKey="applications" stroke={BRAND_COLORS.castletonGreen} fill="url(#applicationsGradient)" strokeWidth={3} />
              <Area type="monotone" dataKey="hired" stroke={BRAND_COLORS.saffaron} fill="url(#hiredGradient)" strokeWidth={3} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Bottom Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 pt-2">
        <div className="bg-white rounded-2xl p-6 border border-lightGray/20 shadow-sm">
          <div className="flex items-center justify-between mb-6 pb-2 border-b border-seaSalt">
            <h3 className="text-sm font-bold text-darkSerpent uppercase tracking-wider">Position Performance</h3>
            <Award size={16} className="text-lightGreen" />
          </div>
          <div className="space-y-5">
            {topPositions.map((pos: any, idx: number) => {
              const maxApplicants = topPositions[0]?.applications || 1;
              const barWidth = `${Math.min((pos.applications / maxApplicants) * 100, 100)}%`;
              return (
                <div key={idx} className="flex items-center gap-4">
                  <div className="w-8 h-8 rounded-full bg-darkSerpent flex items-center justify-center flex-shrink-0">
                    <span className="text-[11px] font-black text-saffaron">#{idx + 1}</span>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between gap-2 mb-1.5">
                      <p className="text-sm font-bold text-darkSerpent truncate tracking-tighter">{pos.title}</p>
                      {pos.isUrgent && (
                        <span className="flex items-center gap-1.5 text-[9px] font-black text-white bg-red-600 px-2.5 py-1 rounded-full uppercase tracking-widest">
                          <Flame size={10} className="fill-white" /> Urgent
                        </span>
                      )}
                    </div>
                    <div className="relative h-2 bg-paper rounded-full overflow-hidden">
                      <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: barWidth }}
                        transition={{ delay: 0.3 + (idx * 0.1), duration: 0.6 }}
                        className="absolute h-full bg-castletonGreen rounded-full"
                      />
                    </div>
                  </div>
                  <div className="text-right w-16">
                    <p className="text-base font-black text-darkSerpent leading-none">{pos.applications}</p>
                    <p className="text-[10px] text-pastelGreen font-semibold">candidates</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 border border-lightGray/20 shadow-sm">
          <div className="flex items-center justify-between mb-4 pb-2 border-b border-seaSalt">
            <h3 className="text-sm font-bold text-darkSerpent uppercase tracking-wider">Candidate Distribution</h3>
            <Eye size={16} className="text-lightGreen" />
          </div>
          <div className="flex items-center gap-8">
            <div className="w-1/2 h-[190px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={statusDistribution}
                    cx="50%" cy="50%"
                    innerRadius={55} outerRadius={80}
                    paddingAngle={4} dataKey="value"
                  >
                    {statusDistribution.map((entry: any, index: number) => (
                      <Cell key={`cell-${index}`} fill={pieColors[index % pieColors.length]} stroke={BRAND_COLORS.white} strokeWidth={2} />
                    ))}
                  </Pie>
                  <Tooltip content={<CustomTooltip formatter={(value: any) => [`${value}`, 'Candidates']} />} />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="flex-1 space-y-2.5">
              {statusDistribution.map((status: any, idx: number) => (
                <div key={idx} className="flex items-center justify-between group cursor-default">
                  <div className="flex items-center gap-3">
                    <div className="relative">
                       <div className="w-2.5 h-2.5 rounded-full z-10 relative" style={{ backgroundColor: pieColors[idx % pieColors.length] }} />
                       <motion.div 
                         animate={{ scale: [1, 1.6, 1], opacity: [0.4, 0, 0.4] }}
                         transition={{ repeat: Infinity, duration: 2.5, delay: idx * 0.3 }}
                         className="absolute inset-0 rounded-full"
                         style={{ backgroundColor: pieColors[idx % pieColors.length] }}
                       />
                    </div>
                    <span className="text-[10px] font-bold text-ashGray uppercase tracking-widest group-hover:text-darkSerpent transition-colors">{status.name}</span>
                  </div>
                  <span className="text-sm font-black text-darkSerpent leading-none">{status.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-2xl p-6 border border-lightGray/20 shadow-sm">
        <div className="flex items-center justify-between mb-6 pb-2 border-b border-seaSalt">
          <h3 className="text-sm font-bold text-darkSerpent uppercase tracking-wider flex items-center gap-2">
             <div className="w-2 h-2 bg-saffaron rounded-full animate-pulse" />
             Live Stream
          </h3>
          <Zap size={16} className="text-lightGreen" />
        </div>
        <div className="space-y-4">
          {recentActivities.map((activity: any, idx: number) => (
            <div key={idx} className="flex items-start gap-4 pb-4 border-b border-seaSalt last:border-0 last:pb-0 group">
              <div className="relative mt-1">
                <div className={`w-3 h-3 rounded-full flex-shrink-0 ${activity.type === 'application' ? 'bg-castletonGreen' : 'bg-saffaron'}`} />
                <motion.div 
                  animate={{ scale: [1, 2, 1], opacity: [0.5, 0, 0.5] }}
                  transition={{ repeat: Infinity, duration: 2 }}
                  className={`absolute inset-0 rounded-full ${activity.type === 'application' ? 'bg-castletonGreen/40' : 'bg-saffaron/40'}`}
                />
              </div>
              <div className="flex-1">
                <p className="text-sm font-bold text-darkSerpent uppercase transition-colors group-hover:text-castletonGreen">{activity.title}</p>
                <p className="text-xs text-pastelGreen font-semibold tracking-tighter">{activity.description}</p>
              </div>
              <p className="text-[11px] font-bold text-ashGray/60 pt-0.5 italic">{formatDateTime(activity.timestamp)}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [stats, setStats] = useState<DashboardStatsType | null>(null);
  const [weeklyTrends, setWeeklyTrends] = useState<WeeklyTrend[]>([]);
  const [topPositions, setTopPositions] = useState<TopPosition[]>([]);
  const [statusDistribution, setStatusDistribution] = useState<StatusDistribution[]>([]);
  const [monthlyTrends, setMonthlyTrends] = useState<MonthlyData[]>([]);
  const [recentActivities, setRecentActivities] = useState<RecentActivity[]>([]);
  const [loading, setLoading] = useState(true);
  const [isRefetching, setIsRefetching] = useState(false);

  const loadDashboardData = async (silent = false) => {
    if (!silent) setLoading(true);
    else setIsRefetching(true);

    try {
      const [statsData, weeklyData, positionsData, statusData, monthlyData, activitiesData] = await Promise.all([
        fetchDashboardStats(), fetchWeeklyTrends(), fetchTopPositions(5), 
        fetchStatusDistribution(), fetchMonthlyTrends(), fetchRecentActivities(6)
      ]);

      setStats(statsData);
      setWeeklyTrends(weeklyData);
      setTopPositions(positionsData);
      setStatusDistribution(statusData);
      setMonthlyTrends(monthlyData);
      setRecentActivities(activitiesData);
    } catch (error) {
      console.error('Error loading dashboard:', error);
    } finally {
      setLoading(false);
      setIsRefetching(false);
    }
  };

  useEffect(() => {
    loadDashboardData();

    // Auto-refetch every 60 seconds
    const interval = setInterval(() => {
      loadDashboardData(true);
    }, 60000);

    return () => clearInterval(interval);
  }, []);

  if (loading) return <LoadingScreen />;

  return (
    <div className="flex h-screen bg-seaSalt font-sans text-darkSerpent overflow-hidden">
      <DashboardSidebar activeTab={activeTab} isCollapsed={isCollapsed} onTabChange={setActiveTab} onToggleCollapse={() => setIsCollapsed(!isCollapsed)} />
      <div className="flex-1 flex flex-col overflow-hidden relative">
        <DashboardHeader />
        <main className="flex-1 overflow-y-auto p-6 z-10">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              {activeTab === 'dashboard' && stats && (
                <DashboardView 
                  stats={stats} 
                  weeklyTrends={weeklyTrends} 
                  topPositions={topPositions} 
                  statusDistribution={statusDistribution} 
                  monthlyTrends={monthlyTrends} 
                  recentActivities={recentActivities}
                  isRefetching={isRefetching}
                />
              )}
              {activeTab === 'applications' && <Applications />}
              {activeTab === 'positions' && <Position />}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>    
    </div>
  );
}

// import { useState, useEffect } from 'react';
// import { 
//   TrendingUp, Users, CheckCircle, Clock, Briefcase, FileText, 
//   UserCheck, Activity, Eye, Award, Zap, ArrowUp, 
//   ArrowDown, AlertTriangle, XCircle, UserMinus, Flame
// } from 'lucide-react';
// import { motion, AnimatePresence } from 'framer-motion';
// import { 
//   LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, 
//   CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area 
// } from 'recharts';

// import Position from '../position/Positions';
// import Applications from '../application/Applications';
// import DashboardSidebar from '../../components/DashboardSidebar';
// import DashboardHeader from '../../components/DashboardHeader';
// import { LoadingScreen } from '../../components/LoadingScreen';
// import { formatDateTime } from '../../helpers/datetime';

// import { 
//   fetchDashboardStats, 
//   fetchWeeklyTrends, 
//   fetchTopPositions, 
//   fetchStatusDistribution, 
//   fetchMonthlyTrends,
//   fetchRecentActivities
// } from './dashboardServices';

// import type { 
//   DashboardStats as DashboardStatsType, 
//   WeeklyTrend, 
//   TopPosition, 
//   StatusDistribution, 
//   MonthlyData, 
//   RecentActivity 
// } from '../types';

// const BRAND_COLORS = {
//   paper: '#f5eedb',
//   seaSalt: '#F9F7F7',
//   darkSerpent: '#133020',
//   castletonGreen: '#046241',
//   lightGreen: '#417256',
//   pastelGreen: '#708E7C',
//   saffaron: '#FFB347',
//   earthYellow: '#FFC370',
//   darkYellow: '#C17110',
//   darkGray: '#666666',
//   ashGray: '#999999',
//   lightGray: '#CCCCCC',
//   red: '#dc2626' ,
//   white: '#ffffff'
// };

// const CustomTooltip = ({ active, payload, label, formatter }: any) => {
//   if (active && payload && payload.length) {
//     const formattedLabel = formatter ? formatter(payload[0].value, payload[0].name) : [payload[0].value, payload[0].name];
//     return (
//       <div className="bg-darkSerpent text-white px-4 py-2 rounded-xl shadow-2xl border border-lightGray/20 font-mono text-[11px] leading-relaxed">
//         <p className="font-bold text-ashGray uppercase tracking-widest">{label}</p>
//         <div className="w-12 h-px bg-white/10 my-2" />
//         <p className="font-bold text-base text-saffaron">
//           {formattedLabel[0]} <span className="text-ashGray text-xs">{formattedLabel[1]}</span>
//         </p>
//       </div>
//     );
//   }
//   return null;
// };

// function KpiCard({ title, value, icon: Icon, trend, color, subtitle, delay = 0 }: any) {
//   const isPositive = trend?.startsWith('+');
  
//   return (
//     <motion.div 
//       initial={{ opacity: 0, y: 20 }}
//       animate={{ opacity: 1, y: 0 }}
//       transition={{ delay: delay, duration: 0.4, ease: "easeOut" }}
//       className="group relative bg-white rounded-2xl border border-lightGray/30 cursor-default overflow-hidden transition-all duration-500 hover:shadow-xl hover:border-saffaron/40"
//     >
//       {/* Inner Pattern Background */}
//       <div className="absolute inset-0 opacity-[0.02] pointer-events-none group-hover:opacity-[0.04] transition-opacity">
//         <svg width="100%" height="100%">
//           <defs>
//             <pattern id={`grid-${title}`} width="20" height="20" patternUnits="userSpaceOnUse">
//               <path d="M 20 0 L 0 0 0 20" fill="none" stroke="currentColor" strokeWidth="1"/>
//             </pattern>
//           </defs>
//           <rect width="100%" height="100%" fill={`url(#grid-${title})`} />
//         </svg>
//       </div>

//       {/* THE HOVER EFFECT: DarkSerpent geometric accent that slides in from the top-right corner */}
//       <div 
//         className="absolute top-0 right-0 w-24 h-24 bg-darkSerpent/[0.03] rounded-bl-[100px] 
//                    translate-x-12 -translate-y-12 group-hover:translate-x-4 group-hover:-translate-y-4 
//                    transition-transform duration-500 ease-out" 
//       />
      
//       {/* A crisp vertical DarkSerpent line that "grows" on the right side on hover */}
//       <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[2px] h-0 bg-darkSerpent/20 group-hover:h-1/2 transition-all duration-500" />

//       <div className="p-6 relative z-10">
//         <div className="flex items-start justify-between mb-3">
//           <motion.div 
//             whileHover={{ scale: 1.1, rotate: 5 }}
//             className="p-3.5 rounded-xl bg-darkSerpent shadow-lg shadow-darkSerpent/20"
//           >
//             <Icon size={20} style={{ color }} />
//           </motion.div>
//           {trend && (
//             <div className={`flex items-center gap-1.5 text-xs font-black uppercase tracking-wider ${isPositive ? 'text-castletonGreen' : 'text-red-600'}`}>
//               {isPositive ? <ArrowUp size={14} /> : <ArrowDown size={14} />}
//               {trend}
//             </div>
//           )}
//         </div>

//         <div>
//           <p className="text-4xl font-black text-darkSerpent tracking-tight leading-none">{value}</p>
//           <p className="text-xs font-bold text-ashGray mt-1.5 uppercase tracking-widest">{title}</p>
//           {subtitle && <p className="text-[10px] text-pastelGreen font-semibold mt-1 italic">{subtitle}</p>}
//         </div>

//         {/* Bottom-left dot that scales on hover */}
//         <div className="absolute bottom-3 left-4 w-1 h-1 rounded-full bg-darkSerpent/20 group-hover:bg-saffaron group-hover:scale-[2.5] transition-all duration-300" />
//       </div>
//     </motion.div>
//   );
// }

// function DashboardView({ stats, weeklyTrends, topPositions, statusDistribution, monthlyTrends, recentActivities, isRefetching }: any) {
//   const totalActiveInPipeline = (stats.pendingReviews || 0) + (stats.shortlisted || 0);
//   const totalClosed = (stats.totalHired || 0) + (stats.notSelected || 0) + (stats.declined || 0) + (stats.withdrawn || 0);

//   const pieColors = [
//     BRAND_COLORS.darkSerpent,     
//     BRAND_COLORS.castletonGreen,  
//     BRAND_COLORS.pastelGreen,    
//     BRAND_COLORS.darkYellow,     
//     BRAND_COLORS.saffaron,       
//     BRAND_COLORS.ashGray,        
//   ];

//   return (
//     <div className="space-y-6">
//       <div className="flex justify-between items-end">
//         <div>
//           <h1 className="text-2xl font-bold text-darkSerpent">Dashboard</h1>
//           <p className="text-gray-500 text-xs mt-1">Overview of your recruitment operations</p>
//         </div>
//         {isRefetching && (
//           <div className="flex items-center gap-2 text-xs text-ashGray">
//             <div className="w-2 h-2 bg-saffaron rounded-full animate-pulse" />
//             Syncing...
//           </div>
//         )}
//       </div>

//       {/* Primary KPI Cards Row */}
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
//         <KpiCard title="Total Applications" value={stats.totalApplications} icon={FileText} trend={`+${stats.monthlyGrowth}%`} color={BRAND_COLORS.saffaron} subtitle="Last 30 days" delay={0} />
//         <KpiCard title="Active Positions" value={stats.activePositions} icon={Briefcase} color={BRAND_COLORS.earthYellow} subtitle={`${stats.urgentPositions} urgent`} delay={0.1} />
//         <KpiCard title="Total Hired" value={stats.totalHired} icon={CheckCircle} color={BRAND_COLORS.pastelGreen} subtitle={`${stats.conversionRate}% conversion`} delay={0.2} />
//         <KpiCard title="Total Applicants" value={stats.totalApplicants} icon={Users} color={BRAND_COLORS.lightGreen} delay={0.3} />
//       </div>

//       {/* Secondary KPI Row */}
//       <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 pt-2">
//         <KpiCard title="Pending" value={stats.pendingReviews} icon={Clock} color={BRAND_COLORS.saffaron} delay={0.4} />
//         <KpiCard title="Shortlisted" value={stats.shortlisted} icon={UserCheck} color={BRAND_COLORS.earthYellow} delay={0.45} />
//         <KpiCard title="Rejected" value={stats.notSelected || 0} icon={XCircle} color={BRAND_COLORS.red} delay={0.5} />
//         <KpiCard title="Declined" value={stats.declined || 0} icon={AlertTriangle} color={BRAND_COLORS.darkYellow} delay={0.55} />
//         <KpiCard title="Withdrawn" value={stats.withdrawn || 0} icon={UserMinus} color={BRAND_COLORS.ashGray} delay={0.6} />
//       </div>

//       {/* Pipeline Summary */}
//       <div className="bg-gradient-to-r from-darkSerpent/[0.03] to-castletonGreen/[0.03] rounded-2xl p-6 border border-lightGray/20 shadow-inner relative overflow-hidden">
//         <motion.div 
//           animate={{ x: ["-100%", "100%"] }} 
//           transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
//           className="absolute top-0 left-0 w-1/2 h-full bg-gradient-to-r from-transparent via-white/40 to-transparent skew-x-12"
//         />
//         <div className="flex items-center justify-between flex-wrap gap-4 relative z-10">
//           {[
//             { label: 'Active Pipeline', value: totalActiveInPipeline, subtitle: 'In Review & Shortlisted' },
//             { label: 'Avg Time to Hire', value: `${stats.avgTimeToHire} days`, subtitle: 'Current velocity' },
//             { label: 'Conversion Rate', value: `${stats.conversionRate}%`, subtitle: 'Success ratio' },
//             { label: 'Closed Cases', value: totalClosed, subtitle: 'Finalized entries' },
//           ].map((item, i) => (
//             <div key={i} className="flex items-center gap-6">
//               <div className="text-center">
//                 <p className="text-[10px] uppercase font-bold text-ashGray tracking-widest">{item.label}</p>
//                 <p className="text-3xl font-black text-darkSerpent tracking-tight my-1">{item.value}</p>
//                 <p className="text-[10px] text-pastelGreen font-semibold italic">{item.subtitle}</p>
//               </div>
//               {i !== 3 && <div className="w-px h-16 bg-lightGray/30 hidden md:block" />}
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* Charts Row - We'll keep these without the card hover effect since they're different components */}
//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//         {/* Weekly Trends Chart */}
//         <div className="bg-white rounded-2xl p-6 border border-lightGray/20 shadow-sm transition-all duration-300 hover:shadow-xl hover:border-saffaron/40">
//           <div className="flex items-center justify-between mb-4 pb-2 border-b border-seaSalt">
//             <h3 className="text-sm font-bold text-darkSerpent uppercase tracking-wider">Weekly Activity Flow</h3>
//             <Activity size={16} className="text-lightGreen" />
//           </div>
//           <ResponsiveContainer width="100%" height={280}>
//             <LineChart data={weeklyTrends} margin={{ top: 10, right: 10, bottom: 0, left: -10 }}>
//               <CartesianGrid strokeDasharray="6 6" stroke="#f0f0f0" vertical={false} />
//               <XAxis dataKey="day" stroke={BRAND_COLORS.darkSerpent} fontSize={11} tick={{ fill: BRAND_COLORS.darkSerpent, fontWeight: 600 }} axisLine={false} tickLine={false} />
//               <YAxis stroke={BRAND_COLORS.darkSerpent} fontSize={11} tick={{ fill: BRAND_COLORS.darkSerpent, fontWeight: 600 }} axisLine={false} tickLine={false} />
//               <Tooltip content={<CustomTooltip formatter={(value: any, name: any) => {
//                 const labels: Record<string, string> = { applications: 'Applications', hired: 'Hired', shortlisted: 'Shortlisted' };
//                 return [value, labels[name as string] || name];
//               }} />} />
//               <Line type="monotone" dataKey="applications" stroke={BRAND_COLORS.castletonGreen} strokeWidth={3} dot={{ fill: BRAND_COLORS.castletonGreen, r: 4, strokeWidth: 2, stroke: BRAND_COLORS.white }} />
//               <Line type="monotone" dataKey="shortlisted" stroke={BRAND_COLORS.lightGreen} strokeWidth={3} dot={{ fill: BRAND_COLORS.lightGreen, r: 4, strokeWidth: 2, stroke: BRAND_COLORS.white }} />
//               <Line type="monotone" dataKey="hired" stroke={BRAND_COLORS.saffaron} strokeWidth={3} dot={{ fill: BRAND_COLORS.saffaron, r: 4, strokeWidth: 2, stroke: BRAND_COLORS.white }} />
//             </LineChart>
//           </ResponsiveContainer>
//         </div>

//         {/* Monthly Performance Chart */}
//         <div className="bg-white rounded-2xl p-6 border border-lightGray/20 shadow-sm transition-all duration-300 hover:shadow-xl hover:border-saffaron/40">
//           <div className="flex items-center justify-between mb-4 pb-2 border-b border-seaSalt">
//             <h3 className="text-sm font-bold text-darkSerpent uppercase tracking-wider">Monthly Pulse</h3>
//             <TrendingUp size={16} className="text-lightGreen" />
//           </div>
//           <ResponsiveContainer width="100%" height={280}>
//             <AreaChart data={monthlyTrends} margin={{ top: 10, right: 10, bottom: 0, left: -10 }}>
//               <defs>
//                 <linearGradient id="applicationsGradient" x1="0" y1="0" x2="0" y2="1">
//                   <stop offset="5%" stopColor={BRAND_COLORS.castletonGreen} stopOpacity={0.2}/>
//                   <stop offset="95%" stopColor={BRAND_COLORS.castletonGreen} stopOpacity={0}/>
//                 </linearGradient>
//                 <linearGradient id="hiredGradient" x1="0" y1="0" x2="0" y2="1">
//                   <stop offset="5%" stopColor={BRAND_COLORS.saffaron} stopOpacity={0.2}/>
//                   <stop offset="95%" stopColor={BRAND_COLORS.saffaron} stopOpacity={0}/>
//                 </linearGradient>
//               </defs>
//               <CartesianGrid strokeDasharray="6 6" stroke="#f0f0f0" vertical={false} />
//               <XAxis dataKey="month" stroke={BRAND_COLORS.darkSerpent} fontSize={11} tick={{ fill: BRAND_COLORS.darkSerpent, fontWeight: 600 }} axisLine={false} tickLine={false} />
//               <YAxis stroke={BRAND_COLORS.darkSerpent} fontSize={11} tick={{ fill: BRAND_COLORS.darkSerpent, fontWeight: 600 }} axisLine={false} tickLine={false} />
//               <Tooltip content={<CustomTooltip formatter={(value: any, name: any) => {
//                 const labels: Record<string, string> = { applications: 'Applications', hired: 'Hired' };
//                 return [value, labels[name as string] || name];
//               }} />} />
//               <Area type="monotone" dataKey="applications" stroke={BRAND_COLORS.castletonGreen} fill="url(#applicationsGradient)" strokeWidth={3} />
//               <Area type="monotone" dataKey="hired" stroke={BRAND_COLORS.saffaron} fill="url(#hiredGradient)" strokeWidth={3} />
//             </AreaChart>
//           </ResponsiveContainer>
//         </div>
//       </div>

//       {/* Bottom Grid */}
//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 pt-2">
//         {/* Top Positions */}
//         <div className="bg-white rounded-2xl p-6 border border-lightGray/20 shadow-sm transition-all duration-300 hover:shadow-xl hover:border-saffaron/40">
//           <div className="flex items-center justify-between mb-6 pb-2 border-b border-seaSalt">
//             <h3 className="text-sm font-bold text-darkSerpent uppercase tracking-wider">Position Performance</h3>
//             <Award size={16} className="text-lightGreen" />
//           </div>
//           <div className="space-y-5">
//             {topPositions.map((pos: any, idx: number) => {
//               const maxApplicants = topPositions[0]?.applications || 1;
//               const barWidth = `${Math.min((pos.applications / maxApplicants) * 100, 100)}%`;
//               return (
//                 <div key={idx} className="flex items-center gap-4 group/item">
//                   <div className="w-8 h-8 rounded-full bg-darkSerpent flex items-center justify-center flex-shrink-0 transition-transform duration-300 group-hover/item:scale-110">
//                     <span className="text-[11px] font-black text-saffaron">#{idx + 1}</span>
//                   </div>
//                   <div className="flex-1">
//                     <div className="flex items-center justify-between gap-2 mb-1.5">
//                       <p className="text-sm font-bold text-darkSerpent truncate tracking-tighter">{pos.title}</p>
//                       {pos.isUrgent && (
//                         <span className="flex items-center gap-1.5 text-[9px] font-black text-white bg-red-600 px-2.5 py-1 rounded-full uppercase tracking-widest">
//                           <Flame size={10} className="fill-white" /> Urgent
//                         </span>
//                       )}
//                     </div>
//                     <div className="relative h-2 bg-paper rounded-full overflow-hidden">
//                       <motion.div 
//                         initial={{ width: 0 }}
//                         animate={{ width: barWidth }}
//                         transition={{ delay: 0.3 + (idx * 0.1), duration: 0.6 }}
//                         className="absolute h-full bg-castletonGreen rounded-full"
//                       />
//                     </div>
//                   </div>
//                   <div className="text-right w-16">
//                     <p className="text-base font-black text-darkSerpent leading-none">{pos.applications}</p>
//                     <p className="text-[10px] text-pastelGreen font-semibold">candidates</p>
//                   </div>
//                 </div>
//               );
//             })}
//           </div>
//         </div>

//         {/* Status Distribution */}
//         <div className="bg-white rounded-2xl p-6 border border-lightGray/20 shadow-sm transition-all duration-300 hover:shadow-xl hover:border-saffaron/40">
//           <div className="flex items-center justify-between mb-4 pb-2 border-b border-seaSalt">
//             <h3 className="text-sm font-bold text-darkSerpent uppercase tracking-wider">Candidate Distribution</h3>
//             <Eye size={16} className="text-lightGreen" />
//           </div>
//           <div className="flex items-center gap-8">
//             <div className="w-1/2 h-[190px]">
//               <ResponsiveContainer width="100%" height="100%">
//                 <PieChart>
//                   <Pie
//                     data={statusDistribution}
//                     cx="50%" cy="50%"
//                     innerRadius={55} outerRadius={80}
//                     paddingAngle={4} dataKey="value"
//                   >
//                     {statusDistribution.map((entry: any, index: number) => (
//                       <Cell key={`cell-${index}`} fill={pieColors[index % pieColors.length]} stroke={BRAND_COLORS.white} strokeWidth={2} />
//                     ))}
//                   </Pie>
//                   <Tooltip content={<CustomTooltip formatter={(value: any) => [`${value}`, 'Candidates']} />} />
//                 </PieChart>
//               </ResponsiveContainer>
//             </div>
//             <div className="flex-1 space-y-2.5">
//               {statusDistribution.map((status: any, idx: number) => (
//                 <div key={idx} className="flex items-center justify-between group cursor-default">
//                   <div className="flex items-center gap-3">
//                     <div className="relative">
//                        <div className="w-2.5 h-2.5 rounded-full z-10 relative" style={{ backgroundColor: pieColors[idx % pieColors.length] }} />
//                        <motion.div 
//                          animate={{ scale: [1, 1.6, 1], opacity: [0.4, 0, 0.4] }}
//                          transition={{ repeat: Infinity, duration: 2.5, delay: idx * 0.3 }}
//                          className="absolute inset-0 rounded-full"
//                          style={{ backgroundColor: pieColors[idx % pieColors.length] }}
//                        />
//                     </div>
//                     <span className="text-[10px] font-bold text-ashGray uppercase tracking-widest group-hover:text-darkSerpent transition-colors">{status.name}</span>
//                   </div>
//                   <span className="text-sm font-black text-darkSerpent leading-none">{status.value}</span>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Recent Activity */}
//       <div className="bg-white rounded-2xl p-6 border border-lightGray/20 shadow-sm transition-all duration-300 hover:shadow-xl hover:border-saffaron/40">
//         <div className="flex items-center justify-between mb-6 pb-2 border-b border-seaSalt">
//           <h3 className="text-sm font-bold text-darkSerpent uppercase tracking-wider flex items-center gap-2">
//              <div className="w-2 h-2 bg-saffaron rounded-full animate-pulse" />
//              Live Stream
//           </h3>
//           <Zap size={16} className="text-lightGreen" />
//         </div>
//         <div className="space-y-4">
//           {recentActivities.map((activity: any, idx: number) => (
//             <div key={idx} className="flex items-start gap-4 pb-4 border-b border-seaSalt last:border-0 last:pb-0 group">
//               <div className="relative mt-1">
//                 <div className={`w-3 h-3 rounded-full flex-shrink-0 ${activity.type === 'application' ? 'bg-castletonGreen' : 'bg-saffaron'}`} />
//                 <motion.div 
//                   animate={{ scale: [1, 2, 1], opacity: [0.5, 0, 0.5] }}
//                   transition={{ repeat: Infinity, duration: 2 }}
//                   className={`absolute inset-0 rounded-full ${activity.type === 'application' ? 'bg-castletonGreen/40' : 'bg-saffaron/40'}`}
//                 />
//               </div>
//               <div className="flex-1">
//                 <p className="text-sm font-bold text-darkSerpent uppercase transition-colors group-hover:text-castletonGreen">{activity.title}</p>
//                 <p className="text-xs text-pastelGreen font-semibold tracking-tighter">{activity.description}</p>
//               </div>
//               <p className="text-[11px] font-bold text-ashGray/60 pt-0.5 italic">{formatDateTime(activity.timestamp)}</p>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }

// export default function AdminDashboard() {
//   const [activeTab, setActiveTab] = useState('dashboard');
//   const [isCollapsed, setIsCollapsed] = useState(false);
//   const [stats, setStats] = useState<DashboardStatsType | null>(null);
//   const [weeklyTrends, setWeeklyTrends] = useState<WeeklyTrend[]>([]);
//   const [topPositions, setTopPositions] = useState<TopPosition[]>([]);
//   const [statusDistribution, setStatusDistribution] = useState<StatusDistribution[]>([]);
//   const [monthlyTrends, setMonthlyTrends] = useState<MonthlyData[]>([]);
//   const [recentActivities, setRecentActivities] = useState<RecentActivity[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [isRefetching, setIsRefetching] = useState(false);

//   const loadDashboardData = async (silent = false) => {
//     if (!silent) setLoading(true);
//     else setIsRefetching(true);

//     try {
//       const [statsData, weeklyData, positionsData, statusData, monthlyData, activitiesData] = await Promise.all([
//         fetchDashboardStats(), fetchWeeklyTrends(), fetchTopPositions(5), 
//         fetchStatusDistribution(), fetchMonthlyTrends(), fetchRecentActivities(6)
//       ]);

//       setStats(statsData);
//       setWeeklyTrends(weeklyData);
//       setTopPositions(positionsData);
//       setStatusDistribution(statusData);
//       setMonthlyTrends(monthlyData);
//       setRecentActivities(activitiesData);
//     } catch (error) {
//       console.error('Error loading dashboard:', error);
//     } finally {
//       setLoading(false);
//       setIsRefetching(false);
//     }
//   };

//   useEffect(() => {
//     loadDashboardData();

//     // Auto-refetch every 60 seconds
//     const interval = setInterval(() => {
//       loadDashboardData(true);
//     }, 60000);

//     return () => clearInterval(interval);
//   }, []);

//   if (loading) return <LoadingScreen />;

//   return (
//     <div className="flex h-screen bg-seaSalt font-sans text-darkSerpent overflow-hidden">
//       <DashboardSidebar activeTab={activeTab} isCollapsed={isCollapsed} onTabChange={setActiveTab} onToggleCollapse={() => setIsCollapsed(!isCollapsed)} />
//       <div className="flex-1 flex flex-col overflow-hidden relative">
//         <DashboardHeader />
//         <main className="flex-1 overflow-y-auto p-6 z-10">
//           <AnimatePresence mode="wait">
//             <motion.div
//               key={activeTab}
//               initial={{ opacity: 0, y: 10 }}
//               animate={{ opacity: 1, y: 0 }}
//               exit={{ opacity: 0, y: -10 }}
//               transition={{ duration: 0.3 }}
//             >
//               {activeTab === 'dashboard' && stats && (
//                 <DashboardView 
//                   stats={stats} 
//                   weeklyTrends={weeklyTrends} 
//                   topPositions={topPositions} 
//                   statusDistribution={statusDistribution} 
//                   monthlyTrends={monthlyTrends} 
//                   recentActivities={recentActivities}
//                   isRefetching={isRefetching}
//                 />
//               )}
//               {activeTab === 'applications' && <Applications />}
//               {activeTab === 'positions' && <Position />}
//             </motion.div>
//           </AnimatePresence>
//         </main>
//       </div>    
//     </div>
//   );
// }