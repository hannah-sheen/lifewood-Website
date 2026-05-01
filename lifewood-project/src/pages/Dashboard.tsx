import { useState } from 'react';
import { LayoutGrid, FileText, Briefcase, ChevronLeft, LogOut, Settings, Bell, Search, PlusCircle, TrendingUp, Users, CheckCircle, Clock, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import ConfirmationModal from '../components/ConfirmationModal';
import { useNavigate } from 'react-router-dom';
import lifewoodPaperLogo from '../assets/lifewood-paper-logo.avif';
import lifewoodRoundLogo from '../assets/lifewood-round-logo.png';
import Position from './position/Positions';

const applicationsData = [
  { id: 1, name: 'John Doe', position: 'Data Engineer', status: 'Pending' },
  { id: 2, name: 'Jane Smith', position: 'AI Trainer', status: 'Shortlisted' },
  { id: 3, name: 'Marcus Aurelius', position: 'Data Analyst', status: 'Hired' },
  { id: 4, name: 'Elena Gilbert', position: 'Linguistics Expert', status: 'Declined' },
  { id: 5, name: 'Sam Wilson', position: 'Data Engineer', status: 'Pending' },
  { id: 6, name: 'Bruce Wayne', position: 'Security Lead', status: 'Shortlisted' },
  { id: 7, name: 'Diana Prince', position: 'Strategy Consultant', status: 'Hired' },
  { id: 8, name: 'Clark Kent', position: 'Data Entry', status: 'Withdraw' },
  { id: 9, name: 'Barry Allen', position: 'AI Trainer', status: 'Pending' },
  { id: 10, name: 'Arthur Curry', position: 'Researcher', status: 'Pending' },
];

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
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const navigate = useNavigate();

  const confirmLogout = () => {
    setShowLogoutModal(false);
    navigate('/');
  };

  return (
    <div className="flex h-screen bg-seaSalt font-sans overflow-hidden text-darkSerpent">
      {/* SIDEBAR */}
      <motion.aside
        initial={false}
        animate={{ width: isCollapsed ? 80 : 260 }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        className="bg-darkSerpent text-white p-6 flex flex-col relative shadow-2xl z-50"
      >
        <motion.button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="absolute -right-3 top-10 bg-saffaron p-1 rounded-full text-darkSerpent z-50 hover:shadow-lg transition-shadow"
        >
          <motion.div animate={{ rotate: isCollapsed ? 180 : 0 }} transition={{ duration: 0.3 }}>
            <ChevronLeft size={16} />
          </motion.div>
        </motion.button>

        <div className="mb-12 flex items-center justify-center">
          {isCollapsed
            ? <img src={lifewoodRoundLogo} alt="Lifewood" className="w-14 h-14 object-contain" />
            : <img src={lifewoodPaperLogo} alt="Lifewood" className="h-8 w-auto object-contain" />
          }
        </div>

        <nav className="flex-1 space-y-3">
          <NavItem active={activeTab === 'dashboard'} onClick={() => setActiveTab('dashboard')} icon={<LayoutGrid size={20} />} label="Dashboard" collapsed={isCollapsed} />
          <NavItem active={activeTab === 'applications'} onClick={() => setActiveTab('applications')} icon={<FileText size={20} />} label="Applications" collapsed={isCollapsed} />
          <NavItem active={activeTab === 'positions'} onClick={() => setActiveTab('positions')} icon={<Briefcase size={20} />} label="Positions" collapsed={isCollapsed} />
        </nav>

        <div className="border-t border-white/10 pt-6 space-y-3">
          <NavItem icon={<Settings size={20} />} label="Settings" collapsed={isCollapsed} />
          <NavItem icon={<LogOut size={20} />} label="Logout" collapsed={isCollapsed} onClick={() => setShowLogoutModal(true)} />
        </div>
      </motion.aside>

      {/* MAIN CONTENT */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="h-20 bg-white border-b border-gray-100 px-10 flex items-center justify-between shadow-sm">
          <div className="relative w-64">
            <Search className="absolute left-3 top-3 text-gray-300" size={18} />
            <input placeholder="Search records..." className="w-full bg-seaSalt p-2.5 pl-10 rounded-xl text-sm outline-none focus:ring-2 ring-saffaron/50 transition-all" />
          </div>
          <div className="flex items-center gap-6">
            <Bell size={20} className="text-gray-400 cursor-pointer hover:text-gray-600 transition-colors" />
            <div className="w-10 h-10 rounded-full bg-saffaron flex items-center justify-center font-bold text-darkSerpent">AD</div>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-10">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              transition={{ duration: 0.2 }}
            >
              {activeTab === 'dashboard' && <DashboardView />}
              {activeTab === 'applications' && <ApplicationsView />}
              {activeTab === 'positions' && <Position />}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>

      <ConfirmationModal
        isOpen={showLogoutModal}
        title="Logout Confirmation"
        message="Are you sure you want to logout?"
        buttonName="Logout"
        isDangerous={true}
        onConfirm={confirmLogout}
        onCancel={() => setShowLogoutModal(false)}
      />
    </div>
  );
}

function NavItem({ icon, label, active, onClick, collapsed }: any) {
  return (
    <button
      onClick={onClick}
      title={collapsed ? label : ''}
      className={`relative flex items-center justify-center gap-4 w-full p-3.5 rounded-r-xl transition-colors duration-200 ${active ? 'bg-saffaron/20 text-saffaron font-bold' : 'text-white/60 hover:text-white hover:bg-white/5'}`}
    >
      {active && <div className="absolute left-0 top-2 bottom-2 w-1 bg-saffaron rounded-r-full" />}
      <span className="flex-shrink-0 flex items-center justify-center">{icon}</span>
      {!collapsed && <span className="text-sm tracking-tight truncate flex-1">{label}</span>}
    </button>
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

function ApplicationsView() {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-darkSerpent">Applications</h2>
        <p className="text-gray-600 text-sm mt-1">Review and manage all job applications</p>
      </div>
      <div className="bg-white rounded-2xl border border-seaSalt overflow-hidden shadow-sm hover:shadow-md transition-shadow">
        <table className="w-full text-left">
          <thead className="bg-seaSalt text-[11px] uppercase text-castletonGreen tracking-wider font-bold border-b border-gray-200">
            <tr>
              <th className="p-6">Applicant</th>
              <th className="p-6">Position</th>
              <th className="p-6">Status</th>
              <th className="p-6">Action</th>
            </tr>
          </thead>
          <tbody>
            {applicationsData.map((app) => (
              <tr key={app.id} className="border-t border-seaSalt hover:bg-seaSalt/50 transition-colors">
                <td className="p-6 font-bold text-sm text-darkSerpent">{app.name}</td>
                <td className="p-6 text-sm text-gray-600">{app.position}</td>
                <td className="p-6">
                  <span className={`px-3 py-1.5 rounded-lg text-[10px] font-bold uppercase transition-colors ${
                    app.status === 'Hired' ? 'bg-castletonGreen/15 text-castletonGreen' :
                    app.status === 'Shortlisted' ? 'bg-castletonGreen/10 text-castletonGreen' :
                    app.status === 'Declined' ? 'bg-red-100 text-red-700' :
                    'bg-saffaron/20 text-saffaron'
                  }`}>
                    {app.status}
                  </span>
                </td>
                <td className="p-6">
                  <button className="text-castletonGreen font-semibold text-xs hover:underline underline-offset-2 transition-colors">View</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
}

