// import { useState } from 'react';
// import { motion } from 'framer-motion';
// import { X, FileText, Mail, Phone, Calendar, MapPin} from 'lucide-react';
// import { formatDateTime, formatDate } from '../../helpers/datetime';
// import type { ApplicationDetails } from '../types';

// export default function ApplicationsView({ application, onClose }: { 
//   application: ApplicationDetails;
//   onClose: () => void;
// }) {
//   const [activeTab, setActiveTab] = useState<'details' | 'logs'>('details');

//   return (
//     <>
//       <motion.div 
//         key="overlay" 
//         initial={{ opacity: 0 }} 
//         animate={{ opacity: 0.4 }} 
//         exit={{ opacity: 0 }} 
//         className="fixed inset-0 bg-black z-40" 
//         onClick={onClose} 
//       />
//       <motion.div 
//         key="drawer" 
//         initial={{ x: '100%' }} 
//         animate={{ x: 0 }} 
//         exit={{ x: '100%' }} 
//         transition={{ type: 'spring', stiffness: 300, damping: 30 }}
//         className="fixed top-0 right-0 h-full w-[520px] bg-white shadow-2xl z-50 flex flex-col"
//       >
//         {/* Header */}
//         <div className="flex items-center justify-between p-8 border-b border-seaSalt">
//           <div>
//             <h3 className="text-2xl font-bold text-darkSerpent">
//               {application.applicant.firstname} {application.applicant.lastname}
//             </h3>
//             <p className="text-xs text-darkSerpent/40 mt-1 uppercase tracking-widest">{application.applicationId}</p>
//           </div>
//           <button onClick={onClose} className="p-2 rounded-xl hover:bg-seaSalt transition-colors cursor-pointer">
//             <X size={24} className="text-gray-400" />
//           </button>
//         </div>

//         {/* Tabs */}
//         <div className="flex gap-2 px-8">
//           {(['details', 'logs'] as const).map((tab) => (
//             <button
//               key={tab}
//               onClick={() => setActiveTab(tab)}
//               className={`px-6 py-2.5 rounded-full text-xs font-bold uppercase tracking-widest transition-all ${
//                 activeTab === tab ? 'bg-darkSerpent text-white shadow-md' : 'bg-seaSalt text-darkSerpent/40 hover:bg-gray-100'
//               }`}
//             >
//               {tab === 'details' ? 'Application Profile' : `Timeline (${application.logs.length})`}
//             </button>
//           ))}
//         </div>

//         {/* Content Area */}
//         <div className="flex-1 overflow-y-auto p-8">
//           {activeTab === 'details' ? (
//             <div className="space-y-8">
//               {/* Position Card */}
//               <div className="bg-gradient-to-br from-seaSalt to-white border border-gray-100 rounded-2xl p-4">
//                 <p className="text-[10px] uppercase font-bold text-saffaron tracking-widest mb-2">Applied Position</p>
//                 <p className="text-lg font-bold text-darkSerpent">{application.position.title}</p>
//                 <p className="text-sm text-darkSerpent/70 leading-relaxed">{application.position.description}</p>
//               </div>

//               {/* Contact Grid */}
//               <div className="grid grid-cols-2 gap-6">
//                 {[
//                     { icon: Mail, label: 'Email Address', value: application.applicant.email },
//                     { icon: Phone, label: 'Phone Number', value: application.applicant.phone },
//                     { icon: Calendar, label: 'Date of Birth', value: formatDate(application.applicant.dob) },
//                     { icon: null, label: 'Gender', value: application.applicant.gender },
//                 ].map((item, i) => (
//                     <div key={i} className="space-y-1">
//                     <p className="text-[10px] uppercase font-bold text-darkSerpent/30 tracking-widest flex items-center gap-1.5">
//                         {item.icon && <item.icon className="w-3.5 h-3.5" />} {item.label}
//                     </p>
//                     <p className="text-sm font-medium text-darkSerpent">{item.value}</p>
//                     </div>
//                 ))}
//               </div>

//               <div>
//                 <p className="text-[10px] uppercase font-bold text-darkSerpent/30 tracking-widest flex items-center gap-1.5 mb-2">
//                     <MapPin className="w-3.5 h-3.5" />Address
//                 </p>
//                 <div className="bg-white border-2 border-seaSalt rounded-xl p-4 shadow-sm">
//                     <p className="text-sm font-semibold text-darkSerpent leading-relaxed">
//                     {application.applicant.address}
//                     </p>
//                 </div>
//               </div>

//               {/* Actions */}
//               {application.applicant.resume && (
//                 <a href={application.applicant.resume} target="_blank" rel="noopener noreferrer"
//                   className=" bg-earthYellow flex items-center justify-center gap-2 w-full py-3 rounded-xl border-2 border-saffaron font-bold text-sm text-darkSerpent hover:border-saffaron transition-colors"
//                 >
//                   <FileText className="w-4 h-4" /> Open Resume Document
//                 </a>
//               )}
//             </div>
//           ) : (
//             <div className="space-y-6">
//               {application.logs.map((log, index) => (
//                 <div key={index} className="flex gap-4 group">
//                   <div className="flex flex-col items-center">
//                     <div className="w-3 h-3 rounded-full bg-saffaron group-hover:scale-125 transition-transform" />
//                     {index !== application.logs.length - 1 && <div className="w-px h-full bg-seaSalt mt-2" />}
//                   </div>
//                   <div className="pb-6">
//                     <p className="text-sm font-bold text-darkSerpent">{log.status}</p>
//                     <p className="text-xs text-darkSerpent/40 mt-1">{formatDateTime(log.datetime)}</p>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           )}
//         </div>

//         {/* Status Update Buttons */}
//         <div className="border-t border-seaSalt p-8 bg-white">
//         <p className="text-[10px] font-bold uppercase tracking-widest text-darkSerpent/40 mb-4">
//             Update Application Status
//         </p>
//         <div className="flex flex-wrap gap-2">
//             {['Pending', 'Shortlisted', 'Hired', 'Not Selected', 'Declined'].map((status) => {
//             // Check if this button represents the current status
//             const isActive = application.status.toLowerCase() === status.toLowerCase();
            
//             return (
//                 <button 
//                 key={status}
//                 onClick={() => console.log(`Update status to: ${status}`)} // Add your update logic here
//                 className={`px-4 py-2 text-xs font-bold uppercase rounded-lg transition-all cursor-pointer border ${
//                     isActive 
//                     ? 'bg-darkSerpent text-white border-darkSerpent' 
//                     : 'bg-seaSalt text-darkSerpent/60 border-transparent hover:bg-gray-100'
//                 }`}
//                 >
//                 {status}
//                 </button>
//             );
//             })}
//         </div>
//         </div>
//       </motion.div>
//     </>
//   );
// }

import { useState } from 'react';
import { motion } from 'framer-motion';
import { X, FileText, Mail, Phone, Calendar, MapPin, Loader2 } from 'lucide-react';
import { formatDateTime, formatDate } from '../../helpers/datetime';
import { updateApplicationStatus } from './applicationServices';
import type { ApplicationDetails } from '../types';

export default function ApplicationsView({ application, onClose, onStatusUpdate }: { 
  application: ApplicationDetails;
  onClose: () => void;
  onStatusUpdate?: () => void; 
}) {
  const [activeTab, setActiveTab] = useState<'details' | 'logs'>('details');
  const [selectedStatus, setSelectedStatus] = useState<string>(application.status);
  const [isUpdating, setIsUpdating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleStatusUpdate = async () => {
    // Prevent updating to the same status
    if (application.status.toLowerCase() === selectedStatus.toLowerCase()) {
      return;
    }

    setIsUpdating(true);
    setError(null);

    try {
      await updateApplicationStatus(application.applicationId, selectedStatus);
      
      // Refresh the parent component
      if (onStatusUpdate) {
        onStatusUpdate();
      }
      
      // Close the drawer after successful update
      onClose();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update status');
    } finally {
      setIsUpdating(false);
    }
  };

  const statusOptions = [
    { value: 'Pending', label: 'Pending', color: 'text-saffaron border-saffaron/30 bg-saffaron/5' },
    { value: 'Under Review', label: 'Under Review', color: 'text-blue-600 border-blue-200 bg-blue-50' },
    { value: 'Shortlisted', label: 'Shortlisted', color: 'text-sky-600 border-sky-200 bg-sky-50' },
    { value: 'Hired', label: 'Hired', color: 'text-castletonGreen border-castletonGreen/30 bg-castletonGreen/5' },
    { value: 'Not Selected', label: 'Not Selected', color: 'text-amber-600 border-amber-200 bg-amber-50' },
    { value: 'Declined', label: 'Declined', color: 'text-red-600 border-red-200 bg-red-50' },
  ];

  return (
    <>
      <motion.div 
        key="overlay" 
        initial={{ opacity: 0 }} 
        animate={{ opacity: 0.4 }} 
        exit={{ opacity: 0 }} 
        className="fixed inset-0 bg-black z-40" 
        onClick={onClose} 
      />
      <motion.div 
        key="drawer" 
        initial={{ x: '100%' }} 
        animate={{ x: 0 }} 
        exit={{ x: '100%' }} 
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        className="fixed top-0 right-0 h-full w-[520px] bg-white shadow-2xl z-50 flex flex-col"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-8 border-b border-seaSalt">
          <div>
            <h3 className="text-2xl font-bold text-darkSerpent">
              {application.applicant.firstname} {application.applicant.lastname}
            </h3>
            <p className="text-xs text-darkSerpent/40 mt-1 uppercase tracking-widest">{application.applicationId}</p>
          </div>
          <button onClick={onClose} className="p-2 rounded-xl hover:bg-seaSalt transition-colors cursor-pointer" disabled={isUpdating}>
            <X size={24} className="text-gray-400" />
          </button>
        </div>

        {/* Current Status Badge */}
        <div className="px-8 pt-4">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-saffaron/10 border border-saffaron/20">
            <span className="text-[9px] font-black uppercase tracking-wider text-saffaron">Current Status:</span>
            <span className="text-xs font-bold text-darkSerpent">{application.status}</span>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 px-8 pt-4">
          {(['details', 'logs'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-2.5 rounded-full text-xs font-bold uppercase tracking-widest transition-all ${
                activeTab === tab ? 'bg-darkSerpent text-white shadow-md' : 'bg-seaSalt text-darkSerpent/40 hover:bg-gray-100'
              }`}
              disabled={isUpdating}
            >
              {tab === 'details' ? 'Application Profile' : `Timeline (${application.logs.length})`}
            </button>
          ))}
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto p-8">
          {activeTab === 'details' ? (
            <div className="space-y-8">
              {/* Position Card */}
              <div className="bg-gradient-to-br from-seaSalt to-white border border-gray-100 rounded-2xl p-4">
                <p className="text-[10px] uppercase font-bold text-saffaron tracking-widest mb-2">Applied Position</p>
                <p className="text-lg font-bold text-darkSerpent">{application.position.title}</p>
                <p className="text-sm text-darkSerpent/70 leading-relaxed">{application.position.description}</p>
              </div>

              {/* Contact Grid */}
              <div className="grid grid-cols-2 gap-6">
                {[
                    { icon: Mail, label: 'Email Address', value: application.applicant.email },
                    { icon: Phone, label: 'Phone Number', value: application.applicant.phone },
                    { icon: Calendar, label: 'Date of Birth', value: formatDate(application.applicant.dob) },
                    { icon: null, label: 'Gender', value: application.applicant.gender },
                ].map((item, i) => (
                    <div key={i} className="space-y-1">
                    <p className="text-[10px] uppercase font-bold text-darkSerpent/30 tracking-widest flex items-center gap-1.5">
                        {item.icon && <item.icon className="w-3.5 h-3.5" />} {item.label}
                    </p>
                    <p className="text-sm font-medium text-darkSerpent">{item.value}</p>
                    </div>
                ))}
              </div>

              {/* Address */}
              <div>
                <p className="text-[10px] uppercase font-bold text-darkSerpent/30 tracking-widest flex items-center gap-1.5 mb-2">
                    <MapPin className="w-3.5 h-3.5" /> Address
                </p>
                <div className="bg-white border-2 border-seaSalt rounded-xl p-4 shadow-sm">
                    <p className="text-sm font-semibold text-darkSerpent leading-relaxed">
                    {application.applicant.address}
                    </p>
                </div>
              </div>

              {/* Resume Link */}
              {application.applicant.resume && (
                <a href={application.applicant.resume} target="_blank" rel="noopener noreferrer"
                  className="bg-earthYellow flex items-center justify-center gap-2 w-full py-3 rounded-xl border-2 border-saffaron font-bold text-sm text-darkSerpent hover:bg-saffaron transition-colors"
                >
                  <FileText className="w-4 h-4" /> Open Resume Document
                </a>
              )}
            </div>
          ) : (
            <div className="space-y-6">
              {application.logs.map((log, index) => (
                <div key={index} className="flex gap-4 group">
                  <div className="flex flex-col items-center">
                    <div className="w-3 h-3 rounded-full bg-saffaron group-hover:scale-125 transition-transform" />
                    {index !== application.logs.length - 1 && <div className="w-px h-full bg-seaSalt mt-2" />}
                  </div>
                  <div className="pb-6">
                    <p className="text-sm font-bold text-darkSerpent">{log.status}</p>
                    <p className="text-xs text-darkSerpent/40 mt-1">{formatDateTime(log.datetime)}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Status Update Section */}
        <div className="border-t border-seaSalt p-8 bg-white">
          <p className="text-[10px] font-bold uppercase tracking-widest text-darkSerpent/40 mb-4">
            Update Application Status
          </p>
          
          <div className="flex gap-2">    
            <select 
              className="flex-1 px-4 py-2.5 bg-seaSalt rounded-xl text-sm text-darkSerpent font-medium outline-none focus:ring-2 ring-saffaron/50 border border-transparent hover:border-gray-200 transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              disabled={isUpdating}
            >
              {statusOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>

            <button 
              onClick={handleStatusUpdate}
              disabled={isUpdating || selectedStatus === application.status}
              className="px-6 py-2.5 bg-darkSerpent text-white rounded-xl text-sm font-bold hover:bg-castletonGreen transition-colors flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isUpdating ? (
                <><Loader2 className="w-4 h-4 animate-spin" /> Updating...</>
              ) : (
                'Update Status'
              )}
            </button>
          </div>
          
          {error && (
            <p className="text-red-500 text-xs mt-3">{error}</p>
          )}
        </div>
      </motion.div>
    </>
  );
}