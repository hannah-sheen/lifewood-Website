// import { useState } from 'react';
// import { motion } from 'framer-motion';
// import { X, FileText, Mail, Phone, Calendar, MapPin, Loader2 } from 'lucide-react';
// import { formatDateTime, formatDate } from '../../helpers/datetime';
// import { updateApplicationStatus, sendStatusUpdateEmail } from './applicationServices';
// import type { ApplicationDetails } from '../types';
// import { showSuccessToast, showErrorToast } from '../../components/Toast';

// export default function ApplicationsView({ application, onClose, onStatusUpdate }: { 
//   application: ApplicationDetails;
//   onClose: () => void;
//   onStatusUpdate?: () => void; 
// }) {
//   const [activeTab, setActiveTab] = useState<'details' | 'logs'>('details');
//   const [selectedStatus, setSelectedStatus] = useState<string>(application.status);
//   const [message, setMessage] = useState('');
//   const [isUpdating, setIsUpdating] = useState(false);
//   const [error, setError] = useState<string | null>(null);

//   const handleStatusUpdate = async () => {
//     // Prevent updating to the same status
//     if (application.status.toLowerCase() === selectedStatus.toLowerCase()) {
//       return;
//     }

//     setIsUpdating(true);
//     setError(null);

//     try {
//       await updateApplicationStatus(application.applicationId, selectedStatus);
//       sendStatusUpdateEmail(
//         `${application.applicant.firstname} ${application.applicant.lastname}`,
//         application.applicant.email,
//         application.applicationId,
//         application.position.title,
//         selectedStatus,
//         message.trim()
//       );
//       if (onStatusUpdate) onStatusUpdate();
//       onClose();
//       setTimeout(() => showSuccessToast(`Status updated to "${selectedStatus}"`), 300);
//     } catch (err) {
//       const msg = err instanceof Error ? err.message : 'Failed to update status';
//       setError(msg);
//       showErrorToast(msg);
//     } finally {
//       setIsUpdating(false);
//     }
//   };

//   const statusOptions = [
//     { value: 'Pending', label: 'Pending', color: 'text-saffaron border-saffaron/30 bg-saffaron/5' },
//     { value: 'Withdrawn', label: 'Withdrawn', color: 'text-blue-600 border-blue-200 bg-blue-50' },
//     { value: 'Shortlisted', label: 'Shortlisted', color: 'text-sky-600 border-sky-200 bg-sky-50' },
//     { value: 'Hired', label: 'Hired', color: 'text-castletonGreen border-castletonGreen/30 bg-castletonGreen/5' },
//     { value: 'Not Selected', label: 'Not Selected', color: 'text-amber-600 border-amber-200 bg-amber-50' },
//     { value: 'Declined', label: 'Declined', color: 'text-red-600 border-red-200 bg-red-50' },
//   ];

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
//           <button onClick={onClose} className="p-2 rounded-xl hover:bg-seaSalt transition-colors cursor-pointer" disabled={isUpdating}>
//             <X size={24} className="text-gray-400" />
//           </button>
//         </div>

//         {/* Current Status Badge */}
//         <div className="px-8 pt-4">
//           <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-saffaron/10 border border-saffaron/20">
//             <span className="text-[9px] font-black uppercase tracking-wider text-saffaron">Current Status:</span>
//             <span className="text-xs font-bold text-darkSerpent">{application.status}</span>
//           </div>
//         </div>

//         {/* Tabs */}
//         <div className="flex gap-2 px-8 pt-4">
//           {(['details', 'logs'] as const).map((tab) => (
//             <button
//               key={tab}
//               onClick={() => setActiveTab(tab)}
//               className={`px-6 py-2.5 rounded-full text-xs font-bold uppercase tracking-widest transition-all ${
//                 activeTab === tab ? 'bg-darkSerpent text-white shadow-md' : 'bg-seaSalt text-darkSerpent/40 hover:bg-gray-100'
//               }`}
//               disabled={isUpdating}
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

//               {/* Address */}
//               <div>
//                 <p className="text-[10px] uppercase font-bold text-darkSerpent/30 tracking-widest flex items-center gap-1.5 mb-2">
//                     <MapPin className="w-3.5 h-3.5" /> Address
//                 </p>
//                 <div className="bg-white border-2 border-seaSalt rounded-xl p-4 shadow-sm">
//                     <p className="text-sm font-semibold text-darkSerpent leading-relaxed">
//                     {application.applicant.address}
//                     </p>
//                 </div>
//               </div>

//               {/* Resume Link */}
//               {application.applicant.resume && (
//                 <a href={application.applicant.resume} target="_blank" rel="noopener noreferrer"
//                   className="bg-earthYellow flex items-center justify-center gap-2 w-full py-3 rounded-xl border-2 border-saffaron font-bold text-sm text-darkSerpent hover:bg-saffaron transition-colors"
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

//         {/* Status Update Section */}
//         <div className="border-t border-seaSalt p-8 bg-white">
//           <p className="text-[10px] font-bold uppercase tracking-widest text-darkSerpent/40 mb-4">
//             Update Application Status
//           </p>
          
//           <div className="flex gap-2 mb-3">    
//             <select 
//               className="flex-1 px-4 py-2.5 bg-seaSalt rounded-xl text-sm text-darkSerpent font-medium outline-none focus:ring-2 ring-saffaron/50 border border-transparent hover:border-gray-200 transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
//               value={selectedStatus}
//               onChange={(e) => setSelectedStatus(e.target.value)}
//               disabled={isUpdating}
//             >
//               {statusOptions.map((option) => (
//                 <option key={option.value} value={option.value}>
//                   {option.label}
//                 </option>
//               ))}
//             </select>

//             <button 
//               onClick={handleStatusUpdate}
//               disabled={isUpdating || selectedStatus === application.status}
//               className="px-6 py-2.5 bg-darkSerpent text-white rounded-xl text-sm font-bold hover:bg-castletonGreen transition-colors flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
//             >
//               {isUpdating ? (
//                 <><Loader2 className="w-4 h-4 animate-spin" /> Updating...</>
//               ) : (
//                 'Update'
//               )}
//             </button>
//           </div>

//           <textarea
//             rows={3}
//             placeholder="Add a message to the applicant (optional)..."
//             value={message}
//             onChange={(e) => setMessage(e.target.value)}
//             disabled={isUpdating}
//             className="w-full px-4 py-3 bg-seaSalt rounded-xl text-sm text-darkSerpent outline-none focus:ring-2 ring-saffaron/50 border border-transparent hover:border-gray-200 transition-all resize-none disabled:opacity-50"
//           />
          
//           {error && (
//             <p className="text-red-500 text-xs mt-3">{error}</p>
//           )}
//         </div>
//       </motion.div>
//     </>
//   );
// }

// import { useState } from 'react';
// import { motion } from 'framer-motion';
// import { X, FileText, Mail, Phone, Calendar, MapPin, Loader2, User } from 'lucide-react';
// import { formatDateTime, formatDate } from '../../helpers/datetime';
// import { updateApplicationStatus, sendStatusUpdateEmail } from './applicationServices';
// import type { ApplicationDetails } from '../types';
// import { showSuccessToast, showErrorToast } from '../../components/Toast';

// export default function ApplicationsView({ application, onClose, onStatusUpdate }: { 
//   application: ApplicationDetails;
//   onClose: () => void;
//   onStatusUpdate?: () => void; 
// }) {
//   const [activeTab, setActiveTab] = useState<'details' | 'logs'>('details');
//   const [selectedStatus, setSelectedStatus] = useState<string>(application.status);
//   const [message, setMessage] = useState('');
//   const [isUpdating, setIsUpdating] = useState(false);
//   const [error, setError] = useState<string | null>(null);

//   const handleStatusUpdate = async () => {
//     if (application.status.toLowerCase() === selectedStatus.toLowerCase()) return;
//     setIsUpdating(true);
//     setError(null);

//     try {
//       await updateApplicationStatus(application.applicationId, selectedStatus);
//       sendStatusUpdateEmail(
//         `${application.applicant.firstname} ${application.applicant.lastname}`,
//         application.applicant.email,
//         application.applicationId,
//         application.position.title,
//         selectedStatus,
//         message.trim()
//       );
//       if (onStatusUpdate) onStatusUpdate();
//       onClose();
//       setTimeout(() => showSuccessToast(`Status updated to "${selectedStatus}"`), 300);
//     } catch (err) {
//       const msg = err instanceof Error ? err.message : 'Failed to update status';
//       setError(msg);
//       showErrorToast(msg);
//     } finally {
//       setIsUpdating(false);
//     }
//   };

//   const statusOptions = [
//     { value: 'Pending', label: 'Pending' },
//     { value: 'Shortlisted', label: 'Shortlisted' },
//     { value: 'Hired', label: 'Hired' },
//     { value: 'Not Selected', label: 'Not Selected' },
//     { value: 'Withdrawn', label: 'Withdrawn' },
//     { value: 'Declined', label: 'Declined' },
//   ];

//   return (
//     <>
//       <motion.div 
//         initial={{ opacity: 0 }} animate={{ opacity: 0.4 }} exit={{ opacity: 0 }}
//         className="fixed inset-0 bg-black/20 z-40 backdrop-blur-[2px]" 
//         onClick={onClose} 
//       />
//       <motion.div 
//         initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }}
//         transition={{ type: 'spring', damping: 25, stiffness: 200 }}
//         className="fixed top-0 right-0 h-full w-[500px] bg-white shadow-2xl z-50 flex flex-col"
//       >
//         {/* 1. Header: Clean & Branded */}
//         <div className="p-8 pb-6 flex justify-between items-center border-b border-seaSalt">
//           <div className="flex items-center gap-4">
//             <div className="w-12 h-12 bg-darkSerpent rounded-xl flex items-center justify-center text-saffaron">
//               <User size={24} />
//             </div>
//             <div>
//               <h3 className="text-xl font-bold text-darkSerpent leading-tight">
//                 {application.applicant.firstname} {application.applicant.lastname}
//               </h3>
//               <p className="text-[10px] font-black uppercase tracking-[0.1em] text-darkSerpent/40">
//                 {application.position.title} • {application.applicationId}
//               </p>
//             </div>
//           </div>
//           <button onClick={onClose} className="p-2 hover:bg-seaSalt rounded-lg transition-colors">
//             <X size={20} className="text-darkSerpent/40" />
//           </button>
//         </div>

//         {/* 2. Scrollable Body Container */}
//         <div className="flex-1 overflow-y-auto no-scrollbar">
          
//           {/* Tabbing Component */}
//           <div className="px-8 pt-6">
//             <div className="flex border-b border-seaSalt gap-8">
//               {(['details', 'logs'] as const).map((tab) => (
//                 <button
//                   key={tab}
//                   onClick={() => setActiveTab(tab)}
//                   className={`pb-4 text-xs font-black uppercase tracking-widest transition-all relative ${
//                     activeTab === tab ? 'text-darkSerpent' : 'text-darkSerpent/30 hover:text-darkSerpent/60'
//                   }`}
//                 >
//                   {tab === 'details' ? 'Profile' : `History (${application.logs.length})`}
//                   {activeTab === tab && (
//                     <motion.div layoutId="tab-underline" className="absolute bottom-0 left-0 right-0 h-0.5 bg-saffaron" />
//                   )}
//                 </button>
//               ))}
//             </div>
//           </div>

//           <div className="p-8">
//             {activeTab === 'details' ? (
//               <div className="space-y-10">
//                 {/* Info Grid */}
//                 <div className="grid grid-cols-2 gap-x-6 gap-y-8">
//                   {[
//                     { icon: Mail, label: 'Email', value: application.applicant.email },
//                     { icon: Phone, label: 'Phone', value: application.applicant.phone },
//                     { icon: Calendar, label: 'DOB', value: formatDate(application.applicant.dob) },
//                     { icon: MapPin, label: 'Address', value: application.applicant.address, full: true },
//                   ].map((item, i) => (
//                     <div key={i} className={item.full ? 'col-span-2' : ''}>
//                       <p className="text-[9px] font-black uppercase text-darkSerpent/30 tracking-widest mb-1.5 flex items-center gap-2">
//                         <item.icon size={12} className="text-saffaron" /> {item.label}
//                       </p>
//                       <p className="text-sm font-semibold text-darkSerpent leading-relaxed">{item.value}</p>
//                     </div>
//                   ))}
//                 </div>

//                 {/* Resume Component */}
//                 {application.applicant.resume && (
//                   <a 
//                     href={application.applicant.resume} target="_blank" rel="noopener noreferrer"
//                     className="flex items-center justify-between p-4 bg-seaSalt hover:bg-darkSerpent hover:text-white transition-all rounded-xl group"
//                   >
//                     <div className="flex items-center gap-3 text-xs font-bold uppercase tracking-widest">
//                       <FileText size={18} className="text-saffaron" />
//                       View Document
//                     </div>
//                     <X size={14} className="rotate-45 opacity-40 group-hover:opacity-100" />
//                   </a>
//                 )}
//               </div>
//             ) : (
//               /* Timeline Component */
//               <div className="space-y-8 pl-2">
//                 {application.logs.map((log, i) => (
//                   <div key={i} className="flex gap-4">
//                     <div className="flex flex-col items-center">
//                       <div className="w-2 h-2 rounded-full bg-saffaron ring-4 ring-saffaron/10" />
//                       {i !== application.logs.length - 1 && <div className="w-[1px] h-full bg-seaSalt my-1" />}
//                     </div>
//                     <div className="pb-2">
//                       <p className="text-xs font-bold text-darkSerpent uppercase">{log.status}</p>
//                       <p className="text-[10px] text-darkSerpent/40 font-medium">{formatDateTime(log.datetime)}</p>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             )}

//             {/* 3. Status Action Component (Integrated into scroll) */}
//             <div className="mt-12 pt-12 border-t border-seaSalt">
//               <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-darkSerpent/30 mb-6">Process Action</h4>
              
//               <div className="space-y-4">
//                 <div className="flex gap-2">
//                   <select 
//                     value={selectedStatus}
//                     onChange={(e) => setSelectedStatus(e.target.value)}
//                     disabled={isUpdating}
//                     className="flex-1 bg-seaSalt px-4 py-3 rounded-xl text-sm font-bold text-darkSerpent outline-none border border-transparent focus:border-saffaron/30"
//                   >
//                     {statusOptions.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
//                   </select>
                  
//                   <button 
//                     onClick={handleStatusUpdate}
//                     disabled={isUpdating || selectedStatus === application.status}
//                     className="px-6 py-3 bg-darkSerpent text-white text-xs font-black uppercase tracking-widest rounded-xl hover:bg-castletonGreen transition-all disabled:opacity-20"
//                   >
//                     {isUpdating ? <Loader2 size={16} className="animate-spin" /> : 'Update'}
//                   </button>
//                 </div>

//                 <textarea
//                   placeholder="Note to applicant (optional)..."
//                   value={message}
//                   onChange={(e) => setMessage(e.target.value)}
//                   disabled={isUpdating}
//                   className="w-full bg-seaSalt p-4 rounded-xl text-sm text-darkSerpent min-h-[100px] outline-none border border-transparent focus:border-saffaron/30 resize-none"
//                 />
//               </div>
//             </div>
//           </div>
//         </div>
//       </motion.div>
//     </>
//   );
// }

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, FileText, Mail, Phone, Calendar, MapPin, Loader2, User, Send, CheckCircle2 } from 'lucide-react';
import { formatDateTime, formatDate } from '../../helpers/datetime';
import { updateApplicationStatus, sendStatusUpdateEmail } from './applicationServices';
import type { ApplicationDetails } from '../types';
import { showSuccessToast, showErrorToast } from '../../components/Toast';

export default function ApplicationsView({ application, onClose, onStatusUpdate }: { 
  application: ApplicationDetails;
  onClose: () => void;
  onStatusUpdate?: () => void; 
}) {
  const [activeTab, setActiveTab] = useState<'details' | 'logs'>('details');
  const [selectedStatus, setSelectedStatus] = useState<string>(application.status);
  const [message, setMessage] = useState('');
  const [isUpdating, setIsUpdating] = useState(false);

  const handleStatusUpdate = async () => {
    if (application.status.toLowerCase() === selectedStatus.toLowerCase()) return;
    setIsUpdating(true);
    try {
      await updateApplicationStatus(application.applicationId, selectedStatus);
      sendStatusUpdateEmail(
        `${application.applicant.firstname} ${application.applicant.lastname}`,
        application.applicant.email,
        application.applicationId,
        application.position.title,
        selectedStatus,
        message.trim()
      );
      if (onStatusUpdate) onStatusUpdate();
      onClose();
      setTimeout(() => showSuccessToast(`Status updated to "${selectedStatus}"`), 300);
    } catch (err) {
      showErrorToast('Failed to update status');
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <>
      <motion.div 
        initial={{ opacity: 0 }} animate={{ opacity: 0.4 }} exit={{ opacity: 0 }}
        className="fixed inset-0 bg-darkSerpent/40 z-40 backdrop-blur-sm" 
        onClick={onClose} 
      />
      <motion.div 
        initial={{ x: '100%', boxShadow: "0px 0px 0px rgba(0,0,0,0)" }} 
        animate={{ x: 0, boxShadow: "-20px 0px 50px rgba(0,0,0,0.1)" }} 
        exit={{ x: '100%' }}
        transition={{ type: 'spring', damping: 28, stiffness: 220 }}
        className="fixed top-0 right-0 h-full w-[520px] bg-white z-50 flex flex-col overflow-hidden"
      >
        {/* 1. ANIMATED HEADER */}
        <div className="relative p-8 overflow-hidden bg-darkSerpent">
          <motion.div 
            animate={{ 
              scale: [1, 1.2, 1],
              rotate: [0, 90, 0],
              opacity: [0.3, 0.5, 0.3] 
            }}
            transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
            className="absolute -top-20 -right-20 w-64 h-64 bg-saffaron rounded-full blur-[80px]"
          />
          
          <div className="relative z-10 flex justify-between items-start">
            <div className="flex gap-5">
              <div className="relative">
                <div className="w-16 h-16 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center text-saffaron border border-white/20">
                  <User size={32} />
                </div>
                <motion.div 
                   animate={{ scale: [1, 1.2, 1] }} 
                   transition={{ repeat: Infinity, duration: 2 }}
                   className="absolute -bottom-1 -right-1 w-4 h-4 bg-castletonGreen rounded-full border-2 border-darkSerpent" 
                />
              </div>
              <div>
                <h3 className="text-2xl font-black text-white tracking-tight leading-none uppercase">
                  {application.applicant.firstname} {application.applicant.lastname}
                </h3>
                <div className="flex items-center gap-2 mt-3">
                  <span className="px-2 py-0.5 bg-saffaron text-darkSerpent text-[10px] font-black rounded uppercase">
                    {application.status}
                  </span>
                  <span className="text-white/40 text-[10px] font-bold tracking-widest uppercase">
                    ID: {application.applicationId}
                  </span>
                </div>
              </div>
            </div>
            <button onClick={onClose} className="text-white/40 hover:text-white transition-colors">
              <X size={24} />
            </button>
          </div>
        </div>

        {/* 2. TAB NAVIGATION */}
        <div className="flex px-8 mt-6 gap-6 border-b border-seaSalt">
          {(['details', 'logs'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`pb-4 text-[11px] font-black uppercase tracking-[0.2em] relative transition-colors ${
                activeTab === tab ? 'text-darkSerpent' : 'text-gray-300 hover:text-gray-500'
              }`}
            >
              {tab === 'details' ? 'Candidate Profile' : 'Process Log'}
              {activeTab === tab && (
                <motion.div 
                  layoutId="activeTab"
                  className="absolute bottom-0 left-0 right-0 h-1 bg-saffaron rounded-t-full" 
                />
              )}
            </button>
          ))}
        </div>

        {/* 3. CONTENT AREA */}
        <div className="flex-1 overflow-y-auto p-8 no-scrollbar">
          <AnimatePresence mode="wait">
            {activeTab === 'details' ? (
              <motion.div 
                key="details"
                initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
                className="space-y-10"
              >
                <div className="grid grid-cols-2 gap-8">
                  {[
                    { icon: Mail, label: 'Email', value: application.applicant.email, color: 'text-blue-500' },
                    { icon: Phone, label: 'Phone', value: application.applicant.phone, color: 'text-castletonGreen' },
                    { icon: Calendar, label: 'Birthday', value: formatDate(application.applicant.dob), color: 'text-orange-500' },
                    { icon: MapPin, label: 'Address', value: application.applicant.address, full: true, color: 'text-red-500' },
                  ].map((item, i) => (
                    <motion.div 
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.1 }}
                      key={i} 
                      className={item.full ? 'col-span-2' : ''}
                    >
                      <p className="text-[10px] font-black uppercase text-gray-400 tracking-widest mb-2 flex items-center gap-2">
                        <item.icon size={12} className={item.color} /> {item.label}
                      </p>
                      <p className="text-sm font-bold text-darkSerpent">{item.value}</p>
                    </motion.div>
                  ))}
                </div>

                {application.applicant.resume && (
                  <motion.a 
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    href={application.applicant.resume} target="_blank"
                    className="flex items-center justify-between p-5 bg-gradient-to-r from-darkSerpent to-darkSerpent/90 text-white rounded-2xl shadow-xl shadow-darkSerpent/20 group"
                  >
                    <div className="flex items-center gap-4">
                      <div className="p-3 bg-saffaron rounded-xl text-darkSerpent">
                        <FileText size={20} />
                      </div>
                      <span className="text-xs font-black uppercase tracking-widest">Open Resume Portfolio</span>
                    </div>
                    <CheckCircle2 size={18} className="text-saffaron" />
                  </motion.a>
                )}

                {/* 4. DYNAMIC ACTION SECTION (Inside Details Tab) */}
                <div className="pt-10 border-t-2 border-seaSalt">
                  <div className="flex items-center gap-2 mb-6">
                    <div className="w-2 h-2 bg-saffaron rounded-full animate-ping" />
                    <h4 className="text-[11px] font-black uppercase tracking-[0.2em] text-darkSerpent">Update Application</h4>
                  </div>
                  
                  <div className="space-y-5">
                    <div className="grid grid-cols-3 gap-3">
                      <select 
                        value={selectedStatus}
                        onChange={(e) => setSelectedStatus(e.target.value)}
                        className="col-span-2 bg-seaSalt p-4 rounded-2xl text-xs font-black uppercase tracking-widest text-darkSerpent border-2 border-transparent focus:border-saffaron transition-all outline-none"
                      >
                        {['Pending', 'Shortlisted', 'Hired', 'Not Selected', 'Withdrawn', 'Declined'].map(opt => (
                          <option key={opt} value={opt}>{opt}</option>
                        ))}
                      </select>
                      
                      <motion.button 
                        whileHover={{ backgroundColor: '#1E3D33' }}
                        onClick={handleStatusUpdate}
                        disabled={isUpdating || selectedStatus === application.status}
                        className="bg-darkSerpent text-white rounded-2xl flex items-center justify-center disabled:opacity-20"
                      >
                        {isUpdating ? <Loader2 size={20} className="animate-spin" /> : <Send size={20} />}
                      </motion.button>
                    </div>

                    <textarea
                      placeholder="Type a custom message for the candidate email notification..."
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      className="w-full bg-seaSalt p-5 rounded-2xl text-sm font-medium text-darkSerpent min-h-[120px] outline-none border-2 border-transparent focus:border-saffaron/30 transition-all resize-none shadow-inner"
                    />
                  </div>
                </div>
              </motion.div>
            ) : (
              /* PROCESS LOG TAB */
              <motion.div 
                key="logs"
                initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
                className="space-y-6"
              >
                {application.logs.map((log, i) => (
                  <div key={i} className="flex gap-4 group">
                    <div className="flex flex-col items-center">
                      <div className="w-3 h-3 rounded-full bg-saffaron shadow-[0_0_10px_rgba(244,180,26,0.5)]" />
                      {i !== application.logs.length - 1 && <div className="w-0.5 h-12 bg-seaSalt mt-2" />}
                    </div>
                    <div>
                      <p className="text-xs font-black text-darkSerpent uppercase tracking-tighter">{log.status}</p>
                      <p className="text-[10px] text-gray-400 font-bold uppercase">{formatDateTime(log.datetime)}</p>
                    </div>
                  </div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </>
  );
}