import { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import { Briefcase, Users, Clock, CheckCircle, Ban, UserMinus, AlertTriangle } from 'lucide-react';
import { formatDateTime } from '../../helpers/datetime';
import { fetchAllApplications } from './applicationServices';
import type { ApplicationDetails } from '../types';
import { LoadingScreen } from '../../components/LoadingScreen';
import ApplicationsView from './ApplicationView';

export default function Applications() {
  const [applications, setApplications] = useState<ApplicationDetails[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedApplication, setSelectedApplication] = useState<ApplicationDetails | null>(null);

  // Fetch applications
  const loadApplications = async () => {
    setLoading(true);
    try {
      const data = await fetchAllApplications();
      setApplications(data);
    } catch (error) {
      // console.error('Error loading applications:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadApplications();
  }, []);

  const getStatusColor = (status: string) => {
    switch (status?.toLowerCase()) {
      case 'hired': return 'bg-castletonGreen/15 text-castletonGreen border border-castletonGreen/20';
      case 'shortlisted': return 'bg-sky-50 text-sky-700 border border-sky-100';
      case 'declined': return 'bg-red-50 text-red-700 border border-red-100';
      case 'withdraw': return 'bg-gray-100 text-gray-600 border border-gray-200';
      case 'withdrawn': return 'bg-gray-100 text-gray-600 border border-gray-200';
      case 'not selected': return 'bg-amber-50 text-amber-700 border border-amber-100';
      case 'pending': return 'bg-saffaron/10 text-saffaron border border-saffaron/20';
      default: return 'bg-saffaron/10 text-saffaron border border-saffaron/20';
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status?.toLowerCase()) {
      case 'hired': return 'Hired';
      case 'shortlisted': return 'Shortlisted';
      case 'declined': return 'Declined';
      case 'withdraw': return 'Withdrawn';
      case 'withdrawn': return 'Withdrawn';
      case 'not selected': return 'Not Selected';
      default: return 'Pending';
    }
  };

  const stats = [
    { label: 'Total', value: applications.length, icon: Users, color: 'text-darkSerpent' },
    { label: 'Pending', value: applications.filter(a => a.status?.toLowerCase() === 'pending').length, icon: Clock, color: 'text-saffaron' },
    { label: 'Shortlisted', value: applications.filter(a => a.status?.toLowerCase() === 'shortlisted').length, icon: Briefcase, color: 'text-sky-600' },
    { label: 'Hired', value: applications.filter(a => a.status?.toLowerCase() === 'hired').length, icon: CheckCircle, color: 'text-castletonGreen' },
    { label: 'Not Selected', value: applications.filter(a => a.status?.toLowerCase() === 'not selected').length, icon: AlertTriangle, color: 'text-amber-600' },
    { label: 'Declined', value: applications.filter(a => a.status?.toLowerCase() === 'declined').length, icon: Ban, color: 'text-red-600' },
    { label: 'Withdrawn', value: applications.filter(a => a.status?.toLowerCase() === 'withdraw' || a.status?.toLowerCase() === 'withdrawn').length, icon: UserMinus, color: 'text-gray-500' },
  ];

  return (
    <div className="flex flex-col h-full">
      {/* Header: Fixed at top - Always visible */}
      <div className="flex-shrink-0 pb-8">
        <h2 className="text-3xl font-bold text-darkSerpent">Applications</h2>
        <p className="text-gray-600 text-sm mt-1">Review, track, and manage all incoming job applications</p>
      </div>

      {/* Scrollable Content Area */}
      <div className="flex-1 overflow-y-auto min-h-0">
        {loading ? (
          <div className="h-64 flex items-center justify-center">
            <LoadingScreen message="Loading applications..." variant="full" />
          </div>
        ) : (
          <>
            {/* Stats Bar */}
            <div className="grid grid-cols-4 lg:grid-cols-7 gap-2 pb-6">
              {stats.map((stat) => (
                <div key={stat.label} className="bg-white border border-seaSalt rounded-xl p-3 shadow-sm flex flex-col justify-between">
                  <div className="flex items-center gap-2">
                    <stat.icon className={`w-3 h-3 ${stat.color}`} />
                    <p className="text-[9px] uppercase font-bold text-darkSerpent/40 tracking-wider truncate">{stat.label}</p>
                  </div>
                  <p className="text-lg font-bold text-darkSerpent mt-1">{stat.value}</p>
                </div>
              ))}
            </div>

            {/* Table Area */}
            <div className="rounded-3xl border border-seaSalt shadow-sm bg-white [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
              {applications.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-20 text-darkSerpent/40">
                  <Briefcase className="w-12 h-12 mb-3" />
                  <p className="text-sm">No applications yet</p>
                </div>
              ) : (
                <table className="w-full text-left border-collapse">
                  <thead className="bg-seaSalt text-xs uppercase text-castletonGreen tracking-widest font-bold border-b border-gray-100 sticky top-0 z-10">
                    <tr>
                      <th className="p-4">Application No.</th>
                      <th className="p-4">Applicant Name</th>
                      <th className="p-4">Position Applied</th>
                      <th className="p-4">Submitted At</th>
                      <th className="p-4">Current Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {applications.map((app) => (
                      <tr 
                        key={app.applicationId} 
                        onClick={() => setSelectedApplication(app)} 
                        className="border-t border-gray-100 hover:bg-seaSalt/50 transition-colors cursor-pointer"
                      >
                        <td className="p-4 text-sm text-darkSerpent/60">{app.applicationId}</td>
                        <td className="p-4 font-semibold text-sm text-darkSerpent">
                          {app.applicant.firstname} {app.applicant.lastname}
                        </td>
                        <td className="p-4 text-sm text-gray-700">{app.position.title}</td>
                        <td className="p-4 text-sm text-gray-500">{formatDateTime(app.dateSubmitted)}</td>
                        <td className="p-4">
                          <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-wider ${getStatusColor(app.status)}`}>
                            {getStatusBadge(app.status)}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </>
        )}
      </div>

      {/* Side Drawer - Application Details View */}
      <AnimatePresence>
        {selectedApplication && (
          <ApplicationsView 
            application={selectedApplication} 
            onClose={() => setSelectedApplication(null)}
            onStatusUpdate={loadApplications} // Add this line to refresh after status update
          />
        )}
      </AnimatePresence>
    </div>
  );
}