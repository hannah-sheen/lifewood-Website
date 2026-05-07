// import { useState } from 'react';
// import { TrendingUp, Users, CheckCircle, Clock } from 'lucide-react';
// import { motion, AnimatePresence } from 'framer-motion';
// import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
// import ConfirmationModal from '../components/ConfirmationModal';
// import { useNavigate } from 'react-router-dom';
// import { supabase } from '../lib/supabase';
// import Position from './position/Positions';
// import Applications from './application/Applications';
// import { showSuccessToast, showErrorToast } from '../components/Toast';
// import DashboardSidebar from '../components/DashboardSidebar';
// import DashboardHeader from '../components/DashboardHeader';

// const weeklyApplicationsData = [
//   { day: 'Mon', applications: 40, hired: 8 },
//   { day: 'Tue', applications: 70, hired: 12 },
//   { day: 'Wed', applications: 45, hired: 9 },
//   { day: 'Thu', applications: 90, hired: 18 },
//   { day: 'Fri', applications: 60, hired: 11 },
//   { day: 'Sat', applications: 110, hired: 22 },
//   { day: 'Sun', applications: 85, hired: 15 },
// ];

// // Chart colors use hex since they are passed as JS values to Recharts, not Tailwind classes
// const departmentData = [
//   { name: 'Engineering', value: 60, color: '#046241' },
//   { name: 'Design', value: 30, color: '#417256' },
//   { name: 'HR', value: 10, color: '#FFB347' },
// ];

// const statusData = [
//   { name: 'Pending', value: 35 },
//   { name: 'Shortlisted', value: 20 },
//   { name: 'Hired', value: 30 },
//   { name: 'Declined', value: 15 },
// ];

// const hiringVelocityData = [
//   { position: 'Data Engineer', days: 14 },
//   { position: 'AI Trainer', days: 18 },
//   { position: 'Data Analyst', days: 11 },
//   { position: 'Security Lead', days: 16 },
//   { position: 'Strategy', days: 13 },
// ];

// const ADMIN_LOGIN_PATH = import.meta.env.VITE_ADMIN_LOGIN_PATH;

// export default function AdminDashboard() {
//   const [activeTab, setActiveTab] = useState('dashboard');
//   const [isCollapsed, setIsCollapsed] = useState(false);
//   const [showLogoutModal, setShowLogoutModal] = useState(false);
//   const [isLoggingOut, setIsLoggingOut] = useState(false);
//   const navigate = useNavigate();

//   const confirmLogout = async () => {
//     setIsLoggingOut(true);
    
//     try {
//       // Sign out from Supabase
//       const { error } = await supabase.auth.signOut();
      
//       if (error) throw error;
      
//       // Clear any session storage items
//       sessionStorage.removeItem('admin_access');
//       sessionStorage.removeItem('adminName');
//       sessionStorage.removeItem('adminUsername');
//       sessionStorage.removeItem('security_verified');
      
//       showSuccessToast('Logged out successfully');
//       setShowLogoutModal(false);
      
//       // Navigate to login page (the secret admin path)
//       navigate(`${ADMIN_LOGIN_PATH}?key=${import.meta.env.VITE_ADMIN_SECRET_KEY}`, { replace: true });
//     } catch (error) {
//       // console.error('Logout error:', error);
//       showErrorToast('Failed to logout. Please try again.');
//     } finally {
//       setIsLoggingOut(false);
//     }
//   };

//   return (
//     <div className="flex h-screen bg-seaSalt font-sans overflow-hidden text-darkSerpent">
//       <DashboardSidebar
//         activeTab={activeTab}
//         isCollapsed={isCollapsed}
//         onTabChange={setActiveTab}
//         onToggleCollapse={() => setIsCollapsed(!isCollapsed)}
//         onLogout={() => setShowLogoutModal(true)}
//       />

//       <div className="flex-1 flex flex-col overflow-hidden">
//         <DashboardHeader />

//         <main className="flex-1 overflow-hidden p-6">
//           <div className="h-full">
//             <AnimatePresence mode="wait">
//               <motion.div
//                 key={activeTab}
//                 initial={{ opacity: 0, x: 10 }}
//                 animate={{ opacity: 1, x: 0 }}
//                 exit={{ opacity: 0, x: -10 }}
//                 transition={{ duration: 0.2 }}
//                 className="h-full"
//               >
//                 {activeTab === 'dashboard' && <DashboardView />}
//                 {activeTab === 'applications' && <Applications />}
//                 {activeTab === 'positions' && <Position />}
//               </motion.div>
//             </AnimatePresence>
//           </div>
//         </main>
//       </div>

//       <ConfirmationModal
//         isOpen={showLogoutModal}
//         title="Logout Confirmation"
//         message="Are you sure you want to logout?"
//         buttonName="Logout"
//         isDangerous={true}
//         onConfirm={confirmLogout}
//         onCancel={() => setShowLogoutModal(false)}
//         loadingText="Logging out..."
//         isLoading={isLoggingOut}
//       />
//     </div>
//   );
// }

// function StatCard({ icon: Icon, label, value, trend, color }: any) {
//   return (
//     <div className="bg-white p-6 rounded-2xl border border-seaSalt hover:shadow-lg transition-shadow">
//       <div className="flex items-start justify-between mb-4">
//         <div className="p-3 rounded-lg" style={{ backgroundColor: `${color}15` }}>
//           <Icon size={24} style={{ color }} />
//         </div>
//         {trend && (
//           <div className="flex items-center gap-1 text-castletonGreen text-sm font-semibold">
//             <TrendingUp size={16} />
//             {trend}
//           </div>
//         )}
//       </div>
//       <p className="text-gray-600 text-sm font-medium mb-1">{label}</p>
//       <p className="text-3xl font-bold text-darkSerpent">{value}</p>
//     </div>
//   );
// }

// function DashboardView() {
//   return (
//     <div className="space-y-8">
//       <div>
//         <h2 className="text-3xl font-bold text-darkSerpent">Dashboard</h2>
//         <p className="text-gray-600 text-sm mt-1">Manage and monitor your recruitment operations</p>
//       </div>

//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
//         <StatCard icon={Users} label="Total Applications" value="345" trend="+12%" color="#046241" />
//         <StatCard icon={CheckCircle} label="Hired" value="82" trend="+8%" color="#417256" />
//         <StatCard icon={Clock} label="Avg Time to Hire" value="14 days" trend="-2d" color="#FFB347" />
//         <StatCard icon={TrendingUp} label="Conversion Rate" value="18.4%" trend="+2.1%" color="#046241" />
//       </div>

//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//         <div className="bg-white p-6 rounded-2xl border border-seaSalt hover:shadow-lg transition-shadow">
//           <h3 className="text-lg font-bold mb-4 text-darkSerpent">Weekly Applications & Hires</h3>
//           <ResponsiveContainer width="100%" height={300}>
//             <LineChart data={weeklyApplicationsData}>
//               <CartesianGrid strokeDasharray="3 3" stroke="#F0F0F0" />
//               <XAxis dataKey="day" stroke="#999" style={{ fontSize: '12px' }} />
//               <YAxis stroke="#999" style={{ fontSize: '12px' }} />
//               <Tooltip contentStyle={{ backgroundColor: '#FFF', border: '1px solid #F9F7F7', borderRadius: '8px' }} />
//               <Legend />
//               <Line type="monotone" dataKey="applications" stroke="#046241" strokeWidth={2} dot={{ fill: '#046241', r: 4 }} activeDot={{ r: 6 }} />
//               <Line type="monotone" dataKey="hired" stroke="#FFB347" strokeWidth={2} dot={{ fill: '#FFB347', r: 4 }} activeDot={{ r: 6 }} />
//             </LineChart>
//           </ResponsiveContainer>
//         </div>

//         <div className="bg-white p-6 rounded-2xl border border-seaSalt hover:shadow-lg transition-shadow">
//           <h3 className="text-lg font-bold mb-4 text-darkSerpent">Time to Hire by Position</h3>
//           <ResponsiveContainer width="100%" height={300}>
//             <BarChart data={hiringVelocityData}>
//               <CartesianGrid strokeDasharray="3 3" stroke="#F0F0F0" />
//               <XAxis dataKey="position" stroke="#999" style={{ fontSize: '11px' }} angle={-45} textAnchor="end" height={80} />
//               <YAxis stroke="#999" style={{ fontSize: '12px' }} />
//               <Tooltip contentStyle={{ backgroundColor: '#FFF', border: '1px solid #F9F7F7', borderRadius: '8px' }} />
//               <Bar dataKey="days" fill="#417256" radius={[8, 8, 0, 0]} />
//             </BarChart>
//           </ResponsiveContainer>
//         </div>
//       </div>

//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//         <div className="bg-white p-6 rounded-2xl border border-seaSalt hover:shadow-lg transition-shadow">
//           <h3 className="text-lg font-bold mb-4 text-darkSerpent">Department Distribution</h3>
//           <ResponsiveContainer width="100%" height={300}>
//             <PieChart>
//               <Pie data={departmentData} cx="50%" cy="50%" innerRadius={60} outerRadius={100} paddingAngle={2} dataKey="value">
//                 {departmentData.map((entry, index) => (
//                   <Cell key={`cell-${index}`} fill={entry.color} />
//                 ))}
//               </Pie>
//               <Tooltip formatter={(value: any) => `${value}%`} />
//             </PieChart>
//           </ResponsiveContainer>
//           <div className="flex justify-center gap-6 mt-4">
//             {departmentData.map((dept) => (
//               <div key={dept.name} className="flex items-center gap-2">
//                 <div className="w-3 h-3 rounded-full" style={{ backgroundColor: dept.color }} />
//                 <span className="text-sm text-gray-600">{dept.name}: {dept.value}%</span>
//               </div>
//             ))}
//           </div>
//         </div>

//         <div className="bg-white p-6 rounded-2xl border border-seaSalt hover:shadow-lg transition-shadow">
//           <h3 className="text-lg font-bold mb-4 text-darkSerpent">Application Status</h3>
//           <ResponsiveContainer width="100%" height={300}>
//             <BarChart data={statusData} layout="vertical">
//               <CartesianGrid strokeDasharray="3 3" stroke="#F0F0F0" />
//               <XAxis type="number" stroke="#999" style={{ fontSize: '12px' }} />
//               <YAxis dataKey="name" type="category" stroke="#999" style={{ fontSize: '12px' }} width={80} />
//               <Tooltip contentStyle={{ backgroundColor: '#FFF', border: '1px solid #F9F7F7', borderRadius: '8px' }} />
//               <Bar dataKey="value" fill="#046241" radius={[0, 8, 8, 0]} />
//             </BarChart>
//           </ResponsiveContainer>
//         </div>
//       </div>
//     </div>
//   );
// }

import { useState } from 'react';
import { TrendingUp, Users, CheckCircle, Clock } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import Position from './position/Positions';
import Applications from './application/Applications';
import DashboardSidebar from '../components/DashboardSidebar';
import DashboardHeader from '../components/DashboardHeader';

const weeklyApplicationsData = [
  { day: 'Mon', applications: 40, hired: 8 },
  { day: 'Tue', applications: 70, hired: 12 },
  { day: 'Wed', applications: 45, hired: 9 },
  { day: 'Thu', applications: 90, hired: 18 },
  { day: 'Fri', applications: 60, hired: 11 },
  { day: 'Sat', applications: 110, hired: 22 },
  { day: 'Sun', applications: 85, hired: 15 },
];

// Chart colors use hex since they are passed as JS values to Recharts, not Tailwind classes
const departmentData = [
  { name: 'Engineering', value: 60, color: '#046241' },
  { name: 'Design', value: 30, color: '#417256' },
  { name: 'HR', value: 10, color: '#FFB347' },
];

const statusData = [
  { name: 'Pending', value: 35 },
  { name: 'Shortlisted', value: 20 },
  { name: 'Hired', value: 30 },
  { name: 'Declined', value: 15 },
];

const hiringVelocityData = [
  { position: 'Data Engineer', days: 14 },
  { position: 'AI Trainer', days: 18 },
  { position: 'Data Analyst', days: 11 },
  { position: 'Security Lead', days: 16 },
  { position: 'Strategy', days: 13 },
];


export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <div className="flex h-screen bg-seaSalt font-sans text-darkSerpent overflow-hidden">
      <DashboardSidebar
        activeTab={activeTab}
        isCollapsed={isCollapsed}
        onTabChange={setActiveTab}
        onToggleCollapse={() => setIsCollapsed(!isCollapsed)}
      />

      <div className="flex-1 flex flex-col overflow-hidden">
        <DashboardHeader />

        <main className="flex-1 overflow-y-auto p-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              transition={{ duration: 0.2 }}
            >
              {activeTab === 'dashboard' && <DashboardView />}
              {activeTab === 'applications' && <Applications />}
              {activeTab === 'positions' && <Position />}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>    
    </div>
  );
}

function StatCard({ icon: Icon, label, value, trend, color }: any) {
  return (
    <div className="bg-white p-6 rounded-2xl border border-seaSalt hover:shadow-lg transition-shadow">
      <div className="flex items-start justify-between mb-4">
        <div className="p-3 rounded-lg" style={{ backgroundColor: `${color}15` }}>
          <Icon size={24} style={{ color }} />
        </div>
        {trend && (
          <div className="flex items-center gap-1 text-castletonGreen text-sm font-semibold">
            <TrendingUp size={16} />
            {trend}
          </div>
        )}
      </div>
      <p className="text-gray-600 text-sm font-medium mb-1">{label}</p>
      <p className="text-3xl font-bold text-darkSerpent">{value}</p>
    </div>
  );
}

function DashboardView() {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold text-darkSerpent">Dashboard</h2>
        <p className="text-gray-600 text-sm mt-1">Manage and monitor your recruitment operations</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard icon={Users} label="Total Applications" value="345" trend="+12%" color="#046241" />
        <StatCard icon={CheckCircle} label="Hired" value="82" trend="+8%" color="#417256" />
        <StatCard icon={Clock} label="Avg Time to Hire" value="14 days" trend="-2d" color="#FFB347" />
        <StatCard icon={TrendingUp} label="Conversion Rate" value="18.4%" trend="+2.1%" color="#046241" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-seaSalt hover:shadow-lg transition-shadow">
          <h3 className="text-lg font-bold mb-4 text-darkSerpent">Weekly Applications & Hires</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={weeklyApplicationsData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#F0F0F0" />
              <XAxis dataKey="day" stroke="#999" style={{ fontSize: '12px' }} />
              <YAxis stroke="#999" style={{ fontSize: '12px' }} />
              <Tooltip contentStyle={{ backgroundColor: '#FFF', border: '1px solid #F9F7F7', borderRadius: '8px' }} />
              <Legend />
              <Line type="monotone" dataKey="applications" stroke="#046241" strokeWidth={2} dot={{ fill: '#046241', r: 4 }} activeDot={{ r: 6 }} />
              <Line type="monotone" dataKey="hired" stroke="#FFB347" strokeWidth={2} dot={{ fill: '#FFB347', r: 4 }} activeDot={{ r: 6 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-seaSalt hover:shadow-lg transition-shadow">
          <h3 className="text-lg font-bold mb-4 text-darkSerpent">Time to Hire by Position</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={hiringVelocityData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#F0F0F0" />
              <XAxis dataKey="position" stroke="#999" style={{ fontSize: '11px' }} angle={-45} textAnchor="end" height={80} />
              <YAxis stroke="#999" style={{ fontSize: '12px' }} />
              <Tooltip contentStyle={{ backgroundColor: '#FFF', border: '1px solid #F9F7F7', borderRadius: '8px' }} />
              <Bar dataKey="days" fill="#417256" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-seaSalt hover:shadow-lg transition-shadow">
          <h3 className="text-lg font-bold mb-4 text-darkSerpent">Department Distribution</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie data={departmentData} cx="50%" cy="50%" innerRadius={60} outerRadius={100} paddingAngle={2} dataKey="value">
                {departmentData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip formatter={(value: any) => `${value}%`} />
            </PieChart>
          </ResponsiveContainer>
          <div className="flex justify-center gap-6 mt-4">
            {departmentData.map((dept) => (
              <div key={dept.name} className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: dept.color }} />
                <span className="text-sm text-gray-600">{dept.name}: {dept.value}%</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-seaSalt hover:shadow-lg transition-shadow">
          <h3 className="text-lg font-bold mb-4 text-darkSerpent">Application Status</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={statusData} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="#F0F0F0" />
              <XAxis type="number" stroke="#999" style={{ fontSize: '12px' }} />
              <YAxis dataKey="name" type="category" stroke="#999" style={{ fontSize: '12px' }} width={80} />
              <Tooltip contentStyle={{ backgroundColor: '#FFF', border: '1px solid #F9F7F7', borderRadius: '8px' }} />
              <Bar dataKey="value" fill="#046241" radius={[0, 8, 8, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}