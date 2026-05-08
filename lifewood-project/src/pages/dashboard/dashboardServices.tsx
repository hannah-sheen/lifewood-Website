// services/dashboardServices.ts
import { supabase } from "../../lib/supabase";
import type { DashboardStats, RecentActivity, WeeklyTrend, TopPosition, StatusDistribution, MonthlyData } from "../types";

export async function fetchDashboardStats(): Promise<DashboardStats> {
  const now = new Date();
  const thirtyDaysAgo = new Date();
  thirtyDaysAgo.setDate(now.getDate() - 30);

  // Fetch all applications with their logs
  const { data: applications, error: appsError } = await supabase
    .from('application')
    .select(`
      id,
      date_submitted,
      application_log!inner (status, datetime)
    `);

  if (appsError) throw new Error('Failed to fetch application stats');

  // Get applications with their latest status
  const appsWithStatus = applications?.map(app => {
    const latestLog = app.application_log?.sort((a: any, b: any) => 
      new Date(b.datetime).getTime() - new Date(a.datetime).getTime()
    )[0];
    return {
      id: app.id,
      date_submitted: app.date_submitted,
      status: latestLog?.status || 'Pending'
    };
  }) || [];

  const totalApplications = appsWithStatus.length;
  const totalHired = appsWithStatus.filter(a => a.status === 'Hired').length;
  const shortlisted = appsWithStatus.filter(a => a.status === 'Shortlisted').length;
  const pendingReviews = appsWithStatus.filter(a => a.status === 'Pending').length;
  const notSelected = appsWithStatus.filter(a => a.status === 'Not Selected').length;
  const declined = appsWithStatus.filter(a => a.status === 'Declined').length;
  const withdrawn = appsWithStatus.filter(a => a.status === 'Withdrawn').length;

  // Get applicants count
  const { count: totalApplicants, error: applicantsError } = await supabase
    .from('applicant')
    .select('*', { count: 'exact', head: true });

  if (applicantsError) throw new Error('Failed to fetch applicant count');

  // Get active positions (not archived and status Open)
  const { count: activePositions, error: positionsError } = await supabase
    .from('position')
    .select('*', { count: 'exact', head: true })
    .eq('is_archive', false)
    .eq('status', 'open');

  if (positionsError) throw new Error('Failed to fetch position count');

  // Get urgent positions count
  const { count: urgentPositions, error: urgentError } = await supabase
    .from('position')
    .select('*', { count: 'exact', head: true })
    .eq('is_archive', false)
    .eq('is_urgent', true)
    .eq('status', 'open');

  if (urgentError) console.error('Failed to fetch urgent positions count');

  // Calculate average time to hire
  const hiredApps = appsWithStatus.filter(a => a.status === 'Hired');
  let avgTimeToHire = 0;
  if (hiredApps.length > 0) {
    const hireTimes = await Promise.all(hiredApps.map(async (app) => {
      const { data: logs } = await supabase
        .from('application_log')
        .select('datetime')
        .eq('app_id', app.id)
        .order('datetime', { ascending: true });
      
      if (logs && logs.length >= 2) {
        const submittedDate = new Date(logs[0].datetime);
        const hiredDate = new Date(logs[logs.length - 1].datetime);
        return Math.ceil((hiredDate.getTime() - submittedDate.getTime()) / (1000 * 60 * 60 * 24));
      }
      return 0;
    }));
    const validTimes = hireTimes.filter(t => t > 0);
    avgTimeToHire = validTimes.length > 0 ? Math.round(validTimes.reduce((a, b) => a + b, 0) / validTimes.length) : 0;
  }

  // Calculate conversion rate
  const conversionRate = totalApplications > 0 ? (totalHired / totalApplications) * 100 : 0;

  // Calculate monthly growth
  const applicationsLast30Days = appsWithStatus.filter(a => 
    new Date(a.date_submitted) >= thirtyDaysAgo
  ).length;
  const previous30Days = appsWithStatus.filter(a => {
    const date = new Date(a.date_submitted);
    return date < thirtyDaysAgo && date >= new Date(thirtyDaysAgo.getTime() - 30 * 24 * 60 * 60 * 1000);
  }).length;
  
  const monthlyGrowth = previous30Days > 0 
    ? ((applicationsLast30Days - previous30Days) / previous30Days) * 100 
    : applicationsLast30Days > 0 ? 100 : 0;

  return {
    totalApplications,
    totalHired,
    activePositions: activePositions || 0,
    totalApplicants: totalApplicants || 0,
    pendingReviews,
    shortlisted,
    avgTimeToHire,
    conversionRate: parseFloat(conversionRate.toFixed(1)),
    monthlyGrowth: parseFloat(monthlyGrowth.toFixed(1)),
    notSelected,
    declined,
    withdrawn,
    urgentPositions: urgentPositions || 0
  };
}

export async function fetchWeeklyTrends(): Promise<WeeklyTrend[]> {
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  const result: WeeklyTrend[] = days.map(day => ({ day, applications: 0, hired: 0, shortlisted: 0 }));

  const { data: applications, error } = await supabase
    .from('application')
    .select(`
      date_submitted,
      application_log!inner (status, datetime)
    `);

  if (error) throw new Error('Failed to fetch weekly trends');

  applications?.forEach(app => {
    const date = new Date(app.date_submitted);
    const dayIndex = date.getDay();
    const dayName = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'][dayIndex];
    const trendDay = result.find(d => d.day === dayName);
    
    if (trendDay) {
      trendDay.applications++;
      
      const latestLog = app.application_log?.sort((a: any, b: any) => 
        new Date(b.datetime).getTime() - new Date(a.datetime).getTime()
      )[0];
      
      if (latestLog?.status === 'Hired') trendDay.hired++;
      if (latestLog?.status === 'Shortlisted') trendDay.shortlisted++;
    }
  });

  // Reorder to start with Monday
  return ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map(day => result.find(r => r.day === day)!);
}

export async function fetchTopPositions(limit: number = 5): Promise<TopPosition[]> {
  const { data: applications, error } = await supabase
    .from('application')
    .select(`
      position:pos_id (id, title, is_urgent),
      application_log!inner (status, datetime)
    `);

  if (error) throw new Error('Failed to fetch top positions');

  const positionMap = new Map<string, { title: string; applications: number; hired: number; isUrgent: boolean }>();

  applications?.forEach(app => {
    const positionData = app.position as any;
    const positionTitle = positionData?.title;
    
    if (!positionTitle) return;

    if (!positionMap.has(positionTitle)) {
      positionMap.set(positionTitle, { 
        title: positionTitle, 
        applications: 0, 
        hired: 0,
        isUrgent: positionData?.is_urgent || false
      });
    }

    const stats = positionMap.get(positionTitle)!;
    stats.applications++;

    const latestLog = app.application_log?.sort((a: any, b: any) => 
      new Date(b.datetime).getTime() - new Date(a.datetime).getTime()
    )[0];

    if (latestLog?.status === 'Hired') stats.hired++;
  });

  const sorted = Array.from(positionMap.values())
    .sort((a, b) => b.applications - a.applications)
    .slice(0, limit)
    .map(pos => ({
      title: pos.title,
      applications: pos.applications,
      hired: pos.hired,
      fillRate: pos.applications > 0 ? (pos.hired / pos.applications) * 100 : 0,
      isUrgent: pos.isUrgent
    }));

  return sorted;
}

export async function fetchStatusDistribution(): Promise<StatusDistribution[]> {
  const { data: applications, error } = await supabase
    .from('application')
    .select(`
      id,
      application_log!inner (status, datetime)
    `);

  if (error) throw new Error('Failed to fetch status distribution');

  const statusMap = new Map<string, number>();

  applications?.forEach(app => {
    const latestLog = app.application_log?.sort((a: any, b: any) => 
      new Date(b.datetime).getTime() - new Date(a.datetime).getTime()
    )[0];
    
    const status = latestLog?.status || 'Pending';
    statusMap.set(status, (statusMap.get(status) || 0) + 1);
  });

  const colorMap: Record<string, string> = {
    'Pending': '#FFB347',
    'Shortlisted': '#417256',
    'Hired': '#046241',
    'Declined': '#dc2626',
    'Not Selected': '#f59e0b',
    'Withdrawn': '#6b7280'
  };

  return Array.from(statusMap.entries()).map(([name, value]) => ({
    name,
    value,
    color: colorMap[name] || '#999'
  }));
}

export async function fetchMonthlyTrends(): Promise<MonthlyData[]> {
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const result: MonthlyData[] = months.map(month => ({ month, applications: 0, hired: 0 }));

  const { data: applications, error } = await supabase
    .from('application')
    .select(`
      date_submitted,
      application_log!inner (status, datetime)
    `);

  if (error) throw new Error('Failed to fetch monthly trends');

  applications?.forEach(app => {
    const date = new Date(app.date_submitted);
    const monthIndex = date.getMonth();
    
    if (date.getFullYear() === new Date().getFullYear()) {
      result[monthIndex].applications++;

      const latestLog = app.application_log?.sort((a: any, b: any) => 
        new Date(b.datetime).getTime() - new Date(a.datetime).getTime()
      )[0];

      if (latestLog?.status === 'Hired') result[monthIndex].hired++;
    }
  });

  // Return last 6 months with data
  const monthsWithData = result.filter(m => m.applications > 0);
  return monthsWithData.length > 6 ? monthsWithData.slice(-6) : monthsWithData;
}

export async function fetchRecentActivities(limit: number = 6): Promise<RecentActivity[]> {
  const activities: RecentActivity[] = [];

  // Fetch recent applications
  const { data: recentApps, error: appsError } = await supabase
    .from('application')
    .select(`
      id,
      date_submitted,
      applicant:apl_id (fname, lname),
      position:pos_id (title)
    `)
    .order('date_submitted', { ascending: false })
    .limit(4);

  if (!appsError && recentApps) {
    recentApps.forEach(app => {
      const applicantData = app.applicant as any;
      const positionData = app.position as any;
      activities.push({
        id: app.id,
        type: 'application',
        title: 'New Application',
        description: `${applicantData?.fname} ${applicantData?.lname} applied for ${positionData?.title}`,
        timestamp: app.date_submitted,
        applicantName: `${applicantData?.fname} ${applicantData?.lname}`,
        positionTitle: positionData?.title
      });
    });
  }

  // Fetch recent status changes
  const { data: recentLogs, error: logsError } = await supabase
    .from('application_log')
    .select(`
      datetime,
      status,
      application:app_id (id, applicant:apl_id (fname, lname), position:pos_id (title))
    `)
    .order('datetime', { ascending: false })
    .limit(4);

  if (!logsError && recentLogs) {
    recentLogs.forEach(log => {
      const appData = log.application as any;
      const applicantData = appData?.applicant as any;
      const positionData = appData?.position as any;
      if (applicantData && positionData) {
        activities.push({
          id: log.datetime,
          type: 'status_change',
          title: 'Status Updated',
          description: `${applicantData?.fname} ${applicantData?.lname}'s application for ${positionData?.title} changed to ${log.status}`,
          timestamp: log.datetime,
          status: log.status,
          applicantName: `${applicantData?.fname} ${applicantData?.lname}`,
          positionTitle: positionData?.title
        });
      }
    });
  }

  // Sort by timestamp and return top limit
  return activities
    .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
    .slice(0, limit);
}