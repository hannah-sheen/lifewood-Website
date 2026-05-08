import { motion } from 'framer-motion';
import { LayoutGrid, FileText, Briefcase, ChevronLeft, LogOut, Settings } from 'lucide-react';
import lifewoodPaperLogo from '../assets/lifewood-paper-logo.avif';
import lifewoodRoundLogo from '../assets/lifewood-round-logo.png';
import ConfirmationModal from './ConfirmationModal';
import { useState } from 'react';
import { showSuccessToast, showErrorToast } from './Toast';
import { supabase } from '../lib/supabase';
import { useNavigate } from 'react-router-dom';

function NavItem({ icon, label, active, onClick, collapsed }: any) {
  return (
    <button
      onClick={onClick}
      title={collapsed ? label : ''}
      className={`relative flex items-center justify-center gap-4 w-full p-3.5 rounded-r-xl transition-colors duration-200 cursor-pointer z-10 ${
        active ? 'bg-saffaron/20 text-saffaron font-bold' : 'text-white/60 hover:text-white hover:bg-white/5'
      }`}
    >
      {active && <div className="absolute left-0 top-2 bottom-2 w-1 bg-saffaron rounded-r-full" />}
      <span className="flex-shrink-0 flex items-center justify-center">{icon}</span>
      {!collapsed && <span className="text-sm tracking-tight truncate flex-1 text-left">{label}</span>}
    </button>
  );
}

interface DashboardSidebarProps {
  activeTab: string;
  isCollapsed: boolean;
  onTabChange: (tab: string) => void;
  onToggleCollapse: () => void;
  // onLogout: () => void;
}

const ADMIN_LOGIN_PATH = import.meta.env.VITE_ADMIN_LOGIN_PATH;

export default function DashboardSidebar({ activeTab, isCollapsed, onTabChange, onToggleCollapse }: DashboardSidebarProps) {
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false); 
  const navigate = useNavigate();
 
  const confirmLogout = async () => {
      setIsLoggingOut(true);
      
      try {
        // Sign out from Supabase
        const { error } = await supabase.auth.signOut();
        
        if (error) throw error;
        
        // Clear any session storage items
        sessionStorage.removeItem('admin_access');
        sessionStorage.removeItem('adminName');
        sessionStorage.removeItem('adminUsername');
        sessionStorage.removeItem('security_verified');
        
        showSuccessToast('Logged out successfully');
        setShowLogoutModal(false);
        
        // Navigate to login page (the secret admin path)
        navigate(`${ADMIN_LOGIN_PATH}?key=${import.meta.env.VITE_ADMIN_SECRET_KEY}`, { replace: true });
      } catch (error) {
        // console.error('Logout error:', error);
        showErrorToast('Failed to logout. Please try again.');
      } finally {
        setIsLoggingOut(false);
      }
    };

  return (
    <>
      <motion.aside
        initial={false}
        animate={{ width: isCollapsed ? 80 : 260 }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        // z-30 keeps it below the modal overlay (z-50) but above the dashboard
        className="bg-darkSerpent text-white p-6 flex flex-col relative shadow-2xl z-30"
      >
        {/* ANIMATED GRADIENT WRAPPER (Prevents yellow leaking while allowing button to show) */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none rounded-r-xl">
          <motion.div 
            animate={{ scale: [1, 1.3, 1], rotate: [0, -45, 0], opacity: [0.2, 0.4, 0.2] }}
            transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
            className="absolute -bottom-20 -right-20 w-80 h-80 bg-saffaron rounded-full blur-[100px]"
          />
        </div>

        {/* TOGGLE BUTTON */}
        <motion.button
          onClick={onToggleCollapse}
          className="absolute -right-3 top-10 bg-saffaron p-1 rounded-full text-darkSerpent z-50 hover:shadow-lg transition-shadow cursor-pointer"
        >
          <motion.div animate={{ rotate: isCollapsed ? 180 : 0 }} transition={{ duration: 0.3 }}>
            <ChevronLeft size={16} />
          </motion.div>
        </motion.button>

        <div className="mb-12 flex items-center justify-center relative z-10">
          {isCollapsed
            ? <img src={lifewoodRoundLogo} alt="Lifewood" className="w-14 h-14 object-contain" />
            : <img src={lifewoodPaperLogo} alt="Lifewood" className="h-8 w-auto object-contain" />
          }
        </div>

        <nav className="flex-1 space-y-3 relative z-10">
          <NavItem active={activeTab === 'dashboard'} onClick={() => onTabChange('dashboard')} icon={<LayoutGrid size={20} />} label="Dashboard" collapsed={isCollapsed} />
          <NavItem active={activeTab === 'applications'} onClick={() => onTabChange('applications')} icon={<FileText size={20} />} label="Applications" collapsed={isCollapsed} />
          <NavItem active={activeTab === 'positions'} onClick={() => onTabChange('positions')} icon={<Briefcase size={20} />} label="Positions" collapsed={isCollapsed} />
        </nav>

        <div className="border-t border-white/10 pt-6 space-y-3 relative z-10">
          <NavItem icon={<Settings size={20} />} label="Settings" collapsed={isCollapsed} />
          {/* 3. Change onClick to trigger the modal instead of immediate logout */}
          <NavItem 
            icon={<LogOut size={20} />} 
            label="Logout" 
            collapsed={isCollapsed} 
            onClick={() => setShowLogoutModal(true)} 
          />
        </div>
      </motion.aside>

      {/* 4. THE MODAL (Placed outside the sidebar to avoid clipping) */}
      <ConfirmationModal
        isOpen={showLogoutModal}
        title="Logout Confirmation"
        message="Are you sure you want to logout?"
        buttonName="Logout"
        isDangerous={true}
        onConfirm={confirmLogout}
        onCancel={() => setShowLogoutModal(false)}
        loadingText="Logging out..."
        isLoading={isLoggingOut}
      />
    </>
  );
}