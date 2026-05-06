import { motion } from 'framer-motion';
import { LayoutGrid, FileText, Briefcase, ChevronLeft, LogOut, Settings } from 'lucide-react';
import lifewoodPaperLogo from '../assets/lifewood-paper-logo.avif';
import lifewoodRoundLogo from '../assets/lifewood-round-logo.png';

function NavItem({ icon, label, active, onClick, collapsed }: any) {
  return (
    <button
      onClick={onClick}
      title={collapsed ? label : ''}
      className={`relative flex items-center justify-center gap-4 w-full p-3.5 rounded-r-xl transition-colors duration-200 cursor-pointer ${
        active ? 'bg-saffaron/20 text-saffaron font-bold' : 'text-white/60 hover:text-white hover:bg-white/5'
      }`}
    >
      {active && <div className="absolute left-0 top-2 bottom-2 w-1 bg-saffaron rounded-r-full" />}
      <span className="flex-shrink-0 flex items-center justify-center">{icon}</span>
      {!collapsed && <span className="text-sm tracking-tight truncate flex-1">{label}</span>}
    </button>
  );
}

interface DashboardSidebarProps {
  activeTab: string;
  isCollapsed: boolean;
  onTabChange: (tab: string) => void;
  onToggleCollapse: () => void;
  onLogout: () => void;
}

export default function DashboardSidebar({ activeTab, isCollapsed, onTabChange, onToggleCollapse, onLogout }: DashboardSidebarProps) {
  return (
    <motion.aside
      initial={false}
      animate={{ width: isCollapsed ? 80 : 260 }}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      className="bg-darkSerpent text-white p-6 flex flex-col relative shadow-2xl z-50"
    >
      <motion.button
        onClick={onToggleCollapse}
        className="absolute -right-3 top-10 bg-saffaron p-1 rounded-full text-darkSerpent z-50 hover:shadow-lg transition-shadow cursor-pointer"
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
        <NavItem active={activeTab === 'dashboard'} onClick={() => onTabChange('dashboard')} icon={<LayoutGrid size={20} />} label="Dashboard" collapsed={isCollapsed} />
        <NavItem active={activeTab === 'applications'} onClick={() => onTabChange('applications')} icon={<FileText size={20} />} label="Applications" collapsed={isCollapsed} />
        <NavItem active={activeTab === 'positions'} onClick={() => onTabChange('positions')} icon={<Briefcase size={20} />} label="Positions" collapsed={isCollapsed} />
      </nav>

      <div className="border-t border-white/10 pt-6 space-y-3">
        <NavItem icon={<Settings size={20} />} label="Settings" collapsed={isCollapsed} />
        <NavItem icon={<LogOut size={20} />} label="Logout" collapsed={isCollapsed} onClick={onLogout} />
      </div>
    </motion.aside>
  );
}
