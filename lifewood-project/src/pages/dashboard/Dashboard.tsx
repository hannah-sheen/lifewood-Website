import { useState, useEffect, useCallback } from 'react';
import { 
  TrendingUp, Users, CheckCircle, Clock, Briefcase, FileText, 
  UserCheck, Activity, Eye, Award, Zap, ArrowUp, 
  ArrowDown, AlertTriangle, XCircle, UserMinus, Flame
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, 
  CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area, Legend
} from 'recharts';

import Position from '../position/Positions';
import Applications from '../application/Applications';
import DashboardSidebar from '../../components/DashboardSidebar';
import DashboardHeader from '../../components/DashboardHeader';
import { DashboardSkeleton } from '../../components/LoadingScreen';
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

function KpiCard({ title, value, icon: Icon, trend, subtitle, delay = 0 }: any) {
  const isPositive = trend?.startsWith('+');
  
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: delay, duration: 0.4, ease: "easeOut" }}
      className="group relative bg-white rounded-2xl p-6 border border-lightGray/30 cursor-default overflow-hidden transition-all duration-500 hover:shadow-xl hover:border-saffaron/40"
    >
      {/* THE HOVER EFFECT: Geometric accent sliding from top-right */}
      <div 
        className="absolute top-0 right-0 w-24 h-24 bg-darkSerpent/[0.04] rounded-bl-[100px] 
                   translate-x-12 -translate-y-12 group-hover:translate-x-4 group-hover:-translate-y-4 
                   transition-transform duration-500 ease-out z-0" 
      />
      
      {/* Vertical line that "grows" on the right side */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[2px] h-0 bg-darkSerpent/20 group-hover:h-1/2 transition-all duration-500" />

      {/* Grid Pattern (Optional: Kept from your original code but lowered opacity) */}
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none group-hover:opacity-[0.04] transition-opacity">
        <svg width="100%" height="100%"><defs><pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse"><path d="M 20 0 L 0 0 0 20" fill="none" stroke="currentColor" strokeWidth="1"/></pattern></defs><rect width="100%" height="100%" fill="url(#grid)" /></svg>
      </div>

      <div className="flex items-start justify-between mb-4 relative z-10">
        <div className="relative flex-shrink-0 w-12 h-12">
          {/* Pulse Ring on hover */}
          <div className="absolute inset-0 rounded-xl bg-darkSerpent opacity-0 group-hover:animate-ping group-hover:opacity-10" />
          
          <div className="relative w-12 h-12 rounded-xl flex items-center justify-center bg-darkSerpent text-saffaron shadow-lg z-10 transition-transform duration-300 group-hover:-rotate-6">
            <Icon size={20} style={{ color: BRAND_COLORS.saffaron }} />
          </div>
        </div>

        {trend && (
          <div className={`flex items-center gap-1.5 text-xs font-black uppercase tracking-wider ${isPositive ? 'text-castletonGreen' : 'text-red-600'}`}>
            {isPositive ? <ArrowUp size={14} /> : <ArrowDown size={14} />}
            {trend}
          </div>
        )}
      </div>

      <div className="relative z-10">
        <p className="text-4xl font-black text-darkSerpent tracking-tight leading-none">
          {value}
        </p>
        <p className="text-[10px] font-black text-ashGray mt-2 uppercase tracking-[0.2em] group-hover:text-darkSerpent/60 transition-colors">
          {title}
        </p>
        {subtitle && (
          <p className="text-[10px] text-pastelGreen font-semibold mt-1 italic opacity-80">
            {subtitle}
          </p>
        )}
      </div>

      {/* Saffaron Glow Dot */}
      <div 
        className="absolute bottom-3 left-4 w-1 h-1 rounded-full bg-darkSerpent/20 group-hover:bg-saffaron group-hover:scale-[2] transition-all duration-300" 
      />
    </motion.div>
  );
}

function DashboardView({ stats, weeklyTrends, topPositions, statusDistribution, monthlyTrends, recentActivities }: any) {
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
      {/* Primary KPI Cards Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
        <KpiCard title="Total Applications" value={stats.totalApplications} icon={FileText} trend={`+${stats.monthlyGrowth}%`} subtitle="Last 30 days" delay={0} />
        <KpiCard title="Active Positions" value={stats.activePositions} icon={Briefcase} subtitle={`${stats.urgentPositions} urgent`} delay={0.1} />
        <KpiCard title="Total Hired" value={stats.totalHired} icon={CheckCircle} subtitle={`${stats.conversionRate}% conversion`} delay={0.2} />
        <KpiCard title="Total Applicants" value={stats.totalApplicants} icon={Users} delay={0.3} />
      </div>

      {/* Secondary KPI Row - Grid Adjusted for 5 columns */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4 pt-2">
        <KpiCard title="Pending" value={stats.pendingReviews} icon={Clock} delay={0.4} />
        <KpiCard title="Shortlisted" value={stats.shortlisted} icon={UserCheck} delay={0.45} />
        <KpiCard title="Rejected" value={stats.notSelected || 0} icon={XCircle} delay={0.5} />
        <KpiCard title="Declined" value={stats.declined || 0} icon={AlertTriangle} delay={0.55} />
        <KpiCard title="Withdrawn" value={stats.withdrawn || 0} icon={UserMinus} delay={0.6} />
      </div>

      {/* Pipeline Summary */}
      <div className="bg-gradient-to-r from-darkSerpent/[0.03] to-castletonGreen/[0.03] rounded-2xl p-4 sm:p-6 border border-lightGray/20 shadow-inner relative overflow-hidden">
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
            { label: 'Closed Applications', value: totalClosed, subtitle: 'Finalized entries' },
          ].map((item, i) => (
            <div key={i} className="flex items-center gap-4 sm:gap-6">
              <div className="text-center">
                <p className="text-[10px] uppercase font-bold text-ashGray tracking-widest">{item.label}</p>
                <p className="text-2xl sm:text-3xl font-black text-darkSerpent tracking-tight my-1">{item.value}</p>
                <p className="text-[10px] text-pastelGreen font-semibold italic">{item.subtitle}</p>
              </div>
              {i !== 3 && <div className="w-px h-12 sm:h-16 bg-lightGray/30 hidden md:block" />}
            </div>
          ))}
        </div>
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
        <div className="bg-white rounded-2xl p-6 border border-lightGray/20 shadow-sm">
          <div className="flex items-center justify-between mb-4 pb-2 border-b border-seaSalt">
            <h3 className="text-sm font-bold text-darkSerpent uppercase tracking-wider">Weekly Activity Flow</h3>
            <Activity size={16} className="text-lightGreen" />
          </div>
          <ResponsiveContainer width="100%" height={280}>
            <LineChart data={weeklyTrends} margin={{ top: 10, right: 10, bottom: 0, left: -10 }}>
              <CartesianGrid strokeDasharray="6 6" stroke="#f0f0f0" vertical={false} />
              <XAxis 
                dataKey="day" 
                stroke={BRAND_COLORS.darkSerpent} 
                fontSize={11} 
                tick={{ fill: BRAND_COLORS.darkSerpent, fontWeight: 600 }} 
                axisLine={false} 
                tickLine={false} 
              />
              <YAxis 
                stroke={BRAND_COLORS.darkSerpent} 
                fontSize={11} 
                tick={{ fill: BRAND_COLORS.darkSerpent, fontWeight: 600 }} 
                axisLine={false} 
                tickLine={false} 
              />
              <Tooltip content={<CustomTooltip formatter={(value: any, name: any) => {
                const labels: Record<string, string> = { applications: 'Applications', hired: 'Hired', shortlisted: 'Shortlisted' };
                return [value, labels[name as string] || name];
              }} />} />
              
              {/* THE LEGEND ADDITION */}
              <Legend 
                verticalAlign="top" 
                align="right" 
                iconType="circle"
                iconSize={8}
                wrapperStyle={{
                  paddingBottom: '20px',
                  fontSize: '10px',
                  fontWeight: 'bold',
                  textTransform: 'uppercase',
                  letterSpacing: '0.1em',
                  fontFamily: 'inherit'
                }}
                formatter={(value) => {
                  const labels: Record<string, string> = { applications: 'Applications', hired: 'Hired', shortlisted: 'Shortlisted' };
                  return <span style={{ color: BRAND_COLORS.darkSerpent }}>{labels[value] || value}</span>;
                }}
              />

              <Line type="monotone" dataKey="applications" stroke={BRAND_COLORS.castletonGreen} strokeWidth={3} dot={{ fill: BRAND_COLORS.castletonGreen, r: 4, strokeWidth: 2, stroke: BRAND_COLORS.white }} />
              <Line type="monotone" dataKey="shortlisted" stroke={BRAND_COLORS.ashGray} strokeWidth={3} dot={{ fill: BRAND_COLORS.ashGray, r: 4, strokeWidth: 2, stroke: BRAND_COLORS.white }} />
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
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 pt-2">
        <div className="bg-white rounded-2xl p-4 sm:p-6 border border-lightGray/20 shadow-sm">
          <div className="flex items-center justify-between mb-4 sm:mb-6 pb-2 border-b border-seaSalt">
            <h3 className="text-xs sm:text-sm font-bold text-darkSerpent uppercase tracking-wider">Position Performance</h3>
            <Award size={16} className="text-lightGreen" />
          </div>
          <div className="space-y-4 sm:space-y-5">
            {topPositions.map((pos: any, idx: number) => {
              const maxApplicants = topPositions[0]?.applications || 1;
              const barWidth = `${Math.min((pos.applications / maxApplicants) * 100, 100)}%`;
              return (
                <div key={idx} className="flex items-center gap-3 sm:gap-4">
                  <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-darkSerpent flex items-center justify-center flex-shrink-0">
                    <span className="text-[10px] sm:text-[11px] font-black text-saffaron">#{idx + 1}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2 mb-1.5">
                      <p className="text-xs sm:text-sm font-bold text-darkSerpent truncate tracking-tighter">{pos.title}</p>
                      {pos.isUrgent && (
                        <span className="flex items-center gap-1 sm:gap-1.5 text-[8px] sm:text-[9px] font-black text-white bg-red-600 px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-full uppercase tracking-widest flex-shrink-0">
                          <Flame size={10} className="fill-white" /> <span className="hidden sm:inline">Urgent</span>
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
                  <div className="text-right w-12 sm:w-16 flex-shrink-0">
                    <p className="text-sm sm:text-base font-black text-darkSerpent leading-none">{pos.applications}</p>
                    <p className="text-[9px] sm:text-[10px] text-pastelGreen font-semibold hidden sm:block">candidates</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="bg-white rounded-2xl p-4 sm:p-6 border border-lightGray/20 shadow-sm">
          <div className="flex items-center justify-between mb-4 pb-2 border-b border-seaSalt">
            <h3 className="text-xs sm:text-sm font-bold text-darkSerpent uppercase tracking-wider">Candidate Distribution</h3>
            <Eye size={16} className="text-lightGreen" />
          </div>
          <div className="flex flex-col sm:flex-row items-center gap-6 sm:gap-8">
            <div className="w-full sm:w-1/2 h-[160px] sm:h-[190px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={statusDistribution}
                    cx="50%" cy="50%"
                    innerRadius={45} outerRadius={65}
                    paddingAngle={4} dataKey="value"
                  >
                    {statusDistribution.map((_entry: any, index: number) => (
                      <Cell key={`cell-${index}`} fill={pieColors[index % pieColors.length]} stroke={BRAND_COLORS.white} strokeWidth={2} />
                    ))}
                  </Pie>
                  <Tooltip content={<CustomTooltip formatter={(value: any) => [`${value}`, 'Candidates']} />} />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="flex-1 space-y-2 sm:space-y-2.5 w-full">
              {statusDistribution.map((status: any, idx: number) => (
                <div key={idx} className="flex items-center justify-between group cursor-default">
                  <div className="flex items-center gap-2 sm:gap-3">
                    <div className="relative">
                       <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full z-10 relative" style={{ backgroundColor: pieColors[idx % pieColors.length] }} />
                       <motion.div 
                         animate={{ scale: [1, 1.6, 1], opacity: [0.4, 0, 0.4] }}
                         transition={{ repeat: Infinity, duration: 2.5, delay: idx * 0.3 }}
                         className="absolute inset-0 rounded-full"
                         style={{ backgroundColor: pieColors[idx % pieColors.length] }}
                       />
                    </div>
                    <span className="text-[9px] sm:text-[10px] font-bold text-ashGray uppercase tracking-widest group-hover:text-darkSerpent transition-colors">{status.name}</span>
                  </div>
                  <span className="text-xs sm:text-sm font-black text-darkSerpent leading-none">{status.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-2xl p-4 sm:p-6 border border-lightGray/20 shadow-sm">
        <div className="flex items-center justify-between mb-4 sm:mb-6 pb-2 border-b border-seaSalt">
          <h3 className="text-xs sm:text-sm font-bold text-darkSerpent uppercase tracking-wider flex items-center gap-2">
             <div className="w-2 h-2 bg-saffaron rounded-full animate-pulse" />
             Activity Feed
          </h3>
          <Zap size={16} className="text-lightGreen" />
        </div>
        <div className="space-y-3 sm:space-y-4">
          {recentActivities.map((activity: any, idx: number) => (
            <div key={idx} className="flex items-start gap-3 sm:gap-4 pb-3 sm:pb-4 border-b border-seaSalt last:border-0 last:pb-0 group">
              <div className="relative mt-1">
                <div className={`w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full flex-shrink-0 ${activity.type === 'application' ? 'bg-castletonGreen' : 'bg-saffaron'}`} />
                <motion.div 
                  animate={{ scale: [1, 2, 1], opacity: [0.5, 0, 0.5] }}
                  transition={{ repeat: Infinity, duration: 2 }}
                  className={`absolute inset-0 rounded-full ${activity.type === 'application' ? 'bg-castletonGreen/40' : 'bg-saffaron/40'}`}
                />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs sm:text-sm font-bold text-darkSerpent uppercase transition-colors group-hover:text-castletonGreen truncate">{activity.title}</p>
                <p className="text-[11px] sm:text-xs text-pastelGreen font-semibold tracking-tighter truncate">{activity.description}</p>
              </div>
              <p className="text-[10px] sm:text-[11px] font-bold text-ashGray/60 pt-0.5 italic flex-shrink-0">{formatDateTime(activity.timestamp)}</p>
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

  const loadDashboardData = useCallback(async (silent = false) => {
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
  }, []);

  useEffect(() => {
    if (activeTab === 'dashboard') {
      loadDashboardData();
    }
    // Scroll to top when switching tabs
    const mainContent = document.querySelector('main.flex-1.overflow-y-auto');
    if (mainContent) {
      mainContent.scrollTop = 0;
    }
  }, [activeTab, loadDashboardData]);

  return (
    <div className="flex h-screen bg-seaSalt font-sans text-darkSerpent overflow-hidden">
      <DashboardSidebar 
        activeTab={activeTab} 
        isCollapsed={isCollapsed} 
        onTabChange={setActiveTab} 
        onToggleCollapse={() => setIsCollapsed(!isCollapsed)} 
      />
      
      <div className="flex-1 flex flex-col overflow-hidden relative">
        <DashboardHeader />
        
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 z-10">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              {activeTab === 'dashboard' && (
                <>
                  {/* Header - Always visible */}
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-3 mb-4 sm:mb-6">
                    <div>
                      <h1 className="text-xl sm:text-2xl font-bold text-darkSerpent">Dashboard</h1>
                      <p className="text-gray-500 text-xs mt-1">Overview of your recruitment operations</p>
                    </div>
                  </div>

                  {/* Content - Shows loading or data */}
                  {(loading || isRefetching) && !stats ? (
                    <DashboardSkeleton />
                  ) : (
                    <div className={isRefetching ? "opacity-50 pointer-events-none transition-opacity duration-500" : "opacity-100 transition-opacity duration-500"}>
                      {stats && (
                        <DashboardView 
                          stats={stats} 
                          weeklyTrends={weeklyTrends} 
                          topPositions={topPositions} 
                          statusDistribution={statusDistribution} 
                          monthlyTrends={monthlyTrends} 
                          recentActivities={recentActivities}
                        />
                      )}
                    </div>
                  )}

                  {isRefetching && stats && (
                    <div className="absolute inset-0 z-20 p-6 bg-seaSalt/30 backdrop-blur-[1px]">
                      <DashboardSkeleton />
                    </div>
                  )}
                </>
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
