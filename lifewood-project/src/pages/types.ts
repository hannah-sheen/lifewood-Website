//BASIC TABLE
export type Position={
    id: number;
    title: string;
    description: string;
    status: string;
    is_archive: boolean;
    is_urgent: boolean;
}

export type Applicant = {
  id: number;
  fname: string;
  lname: string;
  gender: string;
  dob: string;
  email: string;
  phone: string;
  address: string;
  country: string;
  resume: string | null;
}

export type Application ={
    id: string;
    date_submitted: string;
    pos_id: number;
    apl_id: number;
}

export type Admin = {
    id: number;
    firstname: string;
    lastname: string;
    username: string;
    auth_id: string;
}

export type ApplicationLog = {
    id: number;
    datetime: string;
    app_id: string;
    status: string; 
}


// APPLICATION FORM
export type ApplicationFormData = {
    fname: string;      
    lname: string;      
    gender: string;
    dob: string;
    email: string;
    phone: string;
    address: string;
    country: string;    
    positions: string[];
    resumeFile: File | null;
}

// FETCHING APPLICATION DETAILS
export type ApplicationDetails={
  applicationId: string;
  dateSubmitted: string;
  status: string;
  applicant: {
    firstname: string;
    lastname: string;
    dob: string;
    gender: string;
    email: string;
    phone: string;
    address: string;
    country: string;
    resume: string | null;
  };
  position: {
    id: number;
    title: string;
    description: string;
  };
  logs: Array<{
    status: string;
    datetime: string;
  }>;
}



export type DashboardStats = {
  totalApplications: number;
  totalHired: number;
  activePositions: number;
  totalApplicants: number;
  pendingReviews: number;
  shortlisted: number;
  notSelected: number;
  declined: number;
  withdrawn: number;
  urgentPositions: number;
  avgTimeToHire: number;
  conversionRate: number;
  monthlyGrowth: number;
}

export type RecentActivity = {
  id: string;
  type: 'application' | 'status_change' | 'new_position';
  title: string;
  description: string;
  timestamp: string;
  applicantName?: string;
  positionTitle?: string;
  status?: string;
}

export type WeeklyTrend = {
  day: string;
  applications: number;
  hired: number;
  shortlisted: number;
}

export type TopPosition = {
  title: string;
  applications: number;
  hired: number;
  fillRate: number;
}

export type StatusDistribution = {
  name: string;
  value: number;
  color: string;
}

export type MonthlyData = {
  month: string;
  applications: number;
  hired: number;
}

export type ApplicationWithJoin = {
  id: string;
  date_submitted: string;
  apl_id: number;
  pos_id: number;
  applicant: {
    id: number;
    fname: string;
    lname: string;
    gender: string;
    dob: string;
    email: string;
    phone: string;
    address: string;
    country: string;
    resume: string | null;
  } | any[];
  position: {
    id: number;
    title: string;
    description: string;
  } | any[];
}

export type ApplicationWithStatus = {
  id: string;
  pos_id: number;
  currentStatus: string;
}

export type ApplicationWithLogs = {
  id: string;
  date_submitted: string;
  application_log: ApplicationLog[];
}

export type ApplicationWithPositionJoin = {
  id: string;
  pos_id: number;
  position: { id: number; title: string }[]; 
}

