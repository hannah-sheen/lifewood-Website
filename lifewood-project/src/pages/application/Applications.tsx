// import { useState } from 'react';
// import { motion, AnimatePresence } from 'framer-motion';
// import { X, Briefcase, Users, Clock, CheckCircle, Ban, UserMinus, AlertTriangle } from 'lucide-react';
// import { formatDateTime } from '../../helpers/datetime';

// const applicationsData = [
//   { id: 1, name: 'John Doe', position: 'Data Engineer', status: 'Pending', submitted: '2026-04-30 11:30 AM' },
//   { id: 2, name: 'Jane Smith', position: 'AI Trainer', status: 'Shortlisted', submitted: '2026-04-29 02:30 PM' },
//   { id: 3, name: 'Marcus Aurelius', position: 'Data Analyst', status: 'Hired', submitted: '2026-04-28 09:00 AM' },
//   { id: 4, name: 'Elena Gilbert', position: 'Linguistics Expert', status: 'Declined', submitted: '2026-04-27 01:15 PM' },
//   { id: 5, name: 'Sam Wilson', position: 'Data Engineer', status: 'Pending', submitted: '2026-04-26 10:00 AM' },
//   { id: 6, name: 'Bruce Wayne', position: 'Security Lead', status: 'Shortlisted', submitted: '2026-04-25 04:45 PM' },
//   { id: 7, name: 'Diana Prince', position: 'Strategy Consultant', status: 'Hired', submitted: '2026-04-24 08:30 AM' },
//   { id: 8, name: 'Clark Kent', position: 'Data Entry', status: 'Withdraw', submitted: '2026-04-23 03:00 PM' },
//   { id: 9, name: 'Barry Allen', position: 'AI Trainer', status: 'Not Selected', submitted: '2026-04-22 11:00 AM' },
//   { id: 10, name: 'Arthur Curry', position: 'Researcher', status: 'Pending', submitted: '2026-04-21 09:30 AM' },
// ];

// export default function Applications() {
//   const [selectedApplication, setSelectedApplication] = useState<typeof applicationsData[0] | null>(null);

//   const getStatusColor = (status: string) => {
//     switch (status) {
//       case 'Hired': return 'bg-castletonGreen/15 text-castletonGreen border border-castletonGreen/20';
//       case 'Shortlisted': return 'bg-sky-50 text-sky-700 border border-sky-100';
//       case 'Declined': return 'bg-red-50 text-red-700 border border-red-100';
//       case 'Withdraw': return 'bg-gray-100 text-gray-600 border border-gray-200';
//       case 'Not Selected': return 'bg-amber-50 text-amber-700 border border-amber-100';
//       default: return 'bg-saffaron/10 text-saffaron border border-saffaron/20';
//     }
//   };

//   const stats = [
//     { label: 'Total', value: applicationsData.length, icon: Users, color: 'text-darkSerpent' },
//     { label: 'Pending', value: applicationsData.filter(a => a.status === 'Pending').length, icon: Clock, color: 'text-saffaron' },
//     { label: 'Shortlisted', value: applicationsData.filter(a => a.status === 'Shortlisted').length, icon: Briefcase, color: 'text-sky-600' },
//     { label: 'Hired', value: applicationsData.filter(a => a.status === 'Hired').length, icon: CheckCircle, color: 'text-castletonGreen' },
//     { label: 'Not Selected', value: applicationsData.filter(a => a.status === 'Not Selected').length, icon: AlertTriangle, color: 'text-amber-600' },
//     { label: 'Declined', value: applicationsData.filter(a => a.status === 'Declined').length, icon: Ban, color: 'text-red-600' },
//     { label: 'Withdrawn', value: applicationsData.filter(a => a.status === 'Withdraw').length, icon: UserMinus, color: 'text-gray-500' },
//   ];

//   return (
//     <div className="flex flex-col h-full">
//       {/* Header */}
//       <div className="flex-none pb-8">
//         <h2 className="text-3xl font-bold text-darkSerpent">Applications</h2>
//         <p className="text-gray-600 text-sm mt-1">Review, track, and manage all incoming job applications</p>
//       </div>

//       {/* Stats Bar */}
//       <div className="flex-none grid grid-cols-4 lg:grid-cols-7 gap-2 pb-6">
//         {stats.map((stat) => (
//           <div key={stat.label} className="bg-white border border-seaSalt rounded-xl p-3 shadow-sm flex flex-col justify-between">
//             <div className="flex items-center gap-2">
//               <stat.icon className={`w-3 h-3 ${stat.color}`} />
//               <p className="text-[9px] uppercase font-bold text-darkSerpent/40 tracking-wider truncate">{stat.label}</p>
//             </div>
//             <p className="text-lg font-bold text-darkSerpent mt-1">{stat.value}</p>
//           </div>
//         ))}
//       </div>

//       {/* Table Area */}
//       <div className="flex-1 overflow-y-auto rounded-3xl border border-seaSalt shadow-sm bg-white [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
//         <table className="w-full text-left border-collapse">
//           <thead className="bg-seaSalt text-xs uppercase text-castletonGreen tracking-widest font-bold border-b border-gray-100 sticky top-0 z-10">
//             <tr>
//               <th className="p-4">Applicant Name</th>
//               <th className="p-4">Position Applied</th>
//               <th className="p-4">Submitted At</th>
//               <th className="p-4">Current Status</th>
//             </tr>
//           </thead>
//           <tbody>
//             {applicationsData.map((app) => (
//               <tr key={app.id} onClick={() => setSelectedApplication(app)} className="border-t border-gray-100 hover:bg-seaSalt/50 transition-colors cursor-pointer">
//                 <td className="p-4 font-semibold text-sm text-darkSerpent">{app.name}</td>
//                 <td className="p-4 text-sm text-gray-700">{app.position}</td>
//                 <td className="p-4 text-sm text-gray-500">{formatDateTime(app.submitted)}</td>
//                 <td className="p-4">
//                   <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-wider ${getStatusColor(app.status)}`}>
//                     {app.status}
//                   </span>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>

//       {/* Side Drawer and Overlay (Fixed position outside main flow) */}
//       <AnimatePresence>
//         {selectedApplication && (
//           <>
//             <motion.div 
//               key="overlay" 
//               initial={{ opacity: 0 }} 
//               animate={{ opacity: 0.4 }} 
//               exit={{ opacity: 0 }} 
//               className="fixed inset-0 bg-black z-40" 
//               onClick={() => setSelectedApplication(null)} 
//             />
//             <motion.div 
//               key="drawer" 
//               initial={{ x: '100%' }} 
//               animate={{ x: 0 }} 
//               exit={{ x: '100%' }} 
//               transition={{ type: 'spring', stiffness: 300, damping: 30 }}
//               className="fixed top-0 right-0 h-full w-[450px] bg-white shadow-2xl z-50 flex flex-col"
//             >
//               <div className="flex items-center justify-between p-6 border-b border-seaSalt">
//                 <h3 className="text-xl font-bold text-darkSerpent">{selectedApplication.name}</h3>
//                 <button onClick={() => setSelectedApplication(null)} className="p-2 rounded-lg hover:bg-seaSalt transition-colors cursor-pointer">
//                   <X size={20} className="text-gray-500" />
//                 </button>
//               </div>
//               <div className="flex-1 overflow-y-auto p-8">
//                 <p className="text-gray-600">Details for {selectedApplication.position} will appear here.</p>
//               </div>
//             </motion.div>
//           </>
//         )}
//       </AnimatePresence>
//     </div>
//   );
// }

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Briefcase, Users, Clock, CheckCircle, Ban, UserMinus, AlertTriangle, Loader2, FileText, Mail, Phone, Calendar, MapPin } from 'lucide-react';
import { formatDateTime } from '../../helpers/datetime';
import { fetchAllApplications } from './applicationServices';
import type { ApplicationDetails } from '../types';
import { LoadingScreen } from '../../components/LoadingScreen';

export default function Applications() {
  const [applications, setApplications] = useState<ApplicationDetails[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedApplication, setSelectedApplication] = useState<ApplicationDetails | null>(null);
  const [activeTab, setActiveTab] = useState<'details' | 'logs'>('details');

  // Fetch applications
  const loadApplications = async () => {
    setLoading(true);
    try {
      const data = await fetchAllApplications();
      setApplications(data);
    } catch (error) {
      console.error('Error loading applications:', error);
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
      case 'under review': return 'bg-blue-50 text-blue-700 border border-blue-100';
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
      case 'under review': return 'Under Review';
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

  if (loading) {
    return(
      <div className="h-64 flex items-center justify-center">
        <LoadingScreen message="Loading applications..." variant="full" />
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="flex-none pb-8">
        <h2 className="text-3xl font-bold text-darkSerpent">Applications</h2>
        <p className="text-gray-600 text-sm mt-1">Review, track, and manage all incoming job applications</p>
      </div>

      {/* Stats Bar */}
      <div className="flex-none grid grid-cols-4 lg:grid-cols-7 gap-2 pb-6">
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
      <div className="flex-1 overflow-y-auto rounded-3xl border border-seaSalt shadow-sm bg-white [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
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

      {/* Side Drawer and Overlay */}
      <AnimatePresence>
        {selectedApplication && (
          <>
            <motion.div 
              key="overlay" 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 0.4 }} 
              exit={{ opacity: 0 }} 
              className="fixed inset-0 bg-black z-40" 
              onClick={() => setSelectedApplication(null)} 
            />
            <motion.div 
              key="drawer" 
              initial={{ x: '100%' }} 
              animate={{ x: 0 }} 
              exit={{ x: '100%' }} 
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              className="fixed top-0 right-0 h-full w-[500px] bg-white shadow-2xl z-50 flex flex-col"
            >
              <div className="flex items-center justify-between p-6 border-b border-seaSalt">
                <div>
                  <h3 className="text-xl font-bold text-darkSerpent">
                    {selectedApplication.applicant.firstname} {selectedApplication.applicant.lastname}
                  </h3>
                  <p className="text-xs text-darkSerpent/50 mt-0.5 font-mono">{selectedApplication.applicationId}</p>
                </div>
                <button onClick={() => setSelectedApplication(null)} className="p-2 rounded-lg hover:bg-seaSalt transition-colors cursor-pointer">
                  <X size={20} className="text-gray-500" />
                </button>
              </div>

              {/* Tabs */}
              <div className="flex gap-6 px-6 pt-4 border-b border-darkSerpent/10">
                <button
                  onClick={() => setActiveTab('details')}
                  className={`pb-2 text-xs font-bold uppercase tracking-widest transition-colors flex items-center gap-2 ${
                    activeTab === 'details' ? 'text-saffaron border-b-2 border-saffaron' : 'text-darkSerpent/30 hover:text-darkSerpent/60'
                  }`}
                >
                  <FileText className="w-3 h-3" /> Application Details
                </button>
                <button
                  onClick={() => setActiveTab('logs')}
                  className={`pb-2 text-xs font-bold uppercase tracking-widest transition-colors flex items-center gap-2 ${
                    activeTab === 'logs' ? 'text-saffaron border-b-2 border-saffaron' : 'text-darkSerpent/30 hover:text-darkSerpent/60'
                  }`}
                >
                  <Clock className="w-3 h-3" /> Timeline ({selectedApplication.logs.length})
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-6">
                {activeTab === 'details' ? (
                  <div className="space-y-4">
                    {/* Position */}
                    <div className="bg-seaSalt rounded-xl p-4">
                      <p className="text-[9px] uppercase font-bold text-darkSerpent/30 tracking-widest">Position Applied</p>
                      <p className="text-sm font-semibold text-darkSerpent mt-1">{selectedApplication.position.title}</p>
                      <p className="text-xs text-darkSerpent/60 mt-2">{selectedApplication.position.description}</p>
                    </div>

                    {/* Contact Information */}
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <p className="text-[9px] uppercase font-bold text-darkSerpent/30 tracking-widest flex items-center gap-1">
                          <Mail className="w-3 h-3" /> Email
                        </p>
                        <p className="text-sm text-darkSerpent">{selectedApplication.applicant.email}</p>
                      </div>
                      <div>
                        <p className="text-[9px] uppercase font-bold text-darkSerpent/30 tracking-widest flex items-center gap-1">
                          <Phone className="w-3 h-3" /> Phone
                        </p>
                        <p className="text-sm text-darkSerpent">{selectedApplication.applicant.phone}</p>
                      </div>
                      <div>
                        <p className="text-[9px] uppercase font-bold text-darkSerpent/30 tracking-widest flex items-center gap-1">
                          <Calendar className="w-3 h-3" /> Date of Birth
                        </p>
                        <p className="text-sm text-darkSerpent">
                          {new Date(selectedApplication.applicant.dob).toLocaleDateString()}
                        </p>
                      </div>
                      <div>
                        <p className="text-[9px] uppercase font-bold text-darkSerpent/30 tracking-widest">Gender</p>
                        <p className="text-sm text-darkSerpent">{selectedApplication.applicant.gender}</p>
                      </div>
                      <div className="col-span-2">
                        <p className="text-[9px] uppercase font-bold text-darkSerpent/30 tracking-widest flex items-center gap-1">
                          <MapPin className="w-3 h-3" /> Address
                        </p>
                        <p className="text-sm text-darkSerpent">{selectedApplication.applicant.address}</p>
                      </div>
                    </div>

                    {/* Resume Link */}
                    {selectedApplication.applicant.resume && (
                      <div>
                        <a 
                          href={selectedApplication.applicant.resume} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 text-xs text-saffaron hover:underline"
                        >
                          <FileText className="w-3 h-3" /> View Resume
                        </a>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="space-y-3">
                    {selectedApplication.logs.length > 0 ? (
                      selectedApplication.logs.map((log, index) => (
                        <div key={index} className="flex justify-between items-center border-b border-darkSerpent/5 pb-3">
                          <div className="flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full bg-saffaron" />
                            <span className="text-sm font-medium text-darkSerpent/80">{log.status}</span>
                          </div>
                          <span className="text-darkSerpent/30 text-[11px]">{formatDateTime(log.datetime)}</span>
                        </div>
                      ))
                    ) : (
                      <p className="text-sm text-darkSerpent/40 text-center py-8">No timeline updates yet</p>
                    )}
                  </div>
                )}
              </div>

              {/* Status Update Section */}
              <div className="border-t border-seaSalt p-6">
                <label className="text-[10px] font-bold uppercase tracking-widest text-darkSerpent/40 mb-2 block">
                  Update Application Status
                </label>
                <div className="flex gap-2">
                  <select className="flex-1 px-4 py-2 bg-seaSalt rounded-xl text-sm outline-none focus:ring-2 ring-saffaron/50">
                    <option value="pending">Pending</option>
                    <option value="under_review">Under Review</option>
                    <option value="shortlisted">Shortlisted</option>
                    <option value="hired">Hired</option>
                    <option value="not_selected">Not Selected</option>
                    <option value="declined">Declined</option>
                  </select>
                  <button className="px-4 py-2 bg-saffaron text-darkSerpent rounded-xl text-sm font-bold hover:bg-earthYellow transition-colors">
                    Update
                  </button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}