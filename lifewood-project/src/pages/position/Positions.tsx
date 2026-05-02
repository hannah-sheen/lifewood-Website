// import { useState, useEffect } from "react";
// import Button from "../../components/Button";
// import { AnimatePresence } from "framer-motion";
// import { motion } from "framer-motion";
// import { PlusCircle, X } from "lucide-react";
// import { PositionForm } from "./PositionForm";
// import { fetchPositions } from "./positionService";

// export default function Position() {
//   const [showForm, setShowForm] = useState(false);
//   const [isEditMode, setIsEditMode] = useState(false);
//   const [selectedPosition, setSelectedPosition] = useState(null);
//   const [positions, setPositions] = useState([]);

//   // Load positions from database
//   const loadPositions = async () => {
//     try {
//       const data = await fetchPositions();
//       setPositions(data);
//     } catch (error) {
//       console.error('Failed to load positions:', error);
//     }
//   };

//   useEffect(() => {
//     loadPositions();
//   }, []);

//   const handleAddPosition = () => {
//     setIsEditMode(false);
//     setSelectedPosition(null);
//     setShowForm(true);
//   };

//   const handleEditPosition = (position) => {
//     setIsEditMode(true);
//     setSelectedPosition(position);
//     setShowForm(true);
//   };

//   const handleSuccess = () => {
//     loadPositions(); // Refresh the list after successful save
//   };

//   return (
//     <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
//       <div className="flex justify-between items-start mb-8">
//         <div>
//           <h2 className="text-3xl font-bold text-darkSerpent">Manage Positions</h2>
//           <p className="text-gray-600 text-sm mt-1">Create and manage job openings</p>
//         </div>
//         <Button className="px-6 py-3 rounded-xl text-sm shadow-md" onClick={handleAddPosition}>
//           <PlusCircle size={18} /> New Position
//         </Button>
//       </div>

//       {/* Side drawer overlay */}
//       <AnimatePresence>
//         {showForm && (
//           <>
//             <motion.div
//               key="overlay"
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 0.4 }}
//               exit={{ opacity: 0 }}
//               transition={{ duration: 0.25 }}
//               className="fixed inset-0 bg-black z-40"
//               onClick={() => setShowForm(false)}
//             />
//             <motion.div
//               key="drawer"
//               initial={{ x: '100%' }}
//               animate={{ x: 0 }}
//               exit={{ x: '100%' }}
//               transition={{ type: 'spring', stiffness: 300, damping: 30 }}
//               className="fixed top-0 right-0 h-full w-[420px] bg-white shadow-2xl z-50 flex flex-col"
//             >
//               <div className="flex items-center justify-between p-6 border-b border-seaSalt">
//                 <h3 className="text-xl font-bold text-darkSerpent">
//                   {isEditMode ? 'Edit Position' : 'New Position'}
//                 </h3>
//                 <button onClick={() => setShowForm(false)} className="p-2 rounded-lg hover:bg-seaSalt transition-colors">
//                   <X size={20} className="text-gray-500" />
//                 </button>
//               </div>
//               <div className="flex-1 overflow-y-auto p-6">
//                 <PositionForm
//                   isEditMode={isEditMode}
//                   initialData={selectedPosition ? {
//                     id: selectedPosition.id,
//                     title: selectedPosition.title,
//                     description: selectedPosition.description,
//                     status: selectedPosition.status === 'active' ? 'Active' : 'Inactive'
//                   } : undefined}
//                   onClose={() => setShowForm(false)}
//                   onSuccess={handleSuccess}
//                 />
//               </div>
//             </motion.div>
//           </>
//         )}
//       </AnimatePresence>

//       {/* <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
//         {positions.map((pos) => (
//           <div key={pos.id} className="bg-white p-6 rounded-2xl border border-seaSalt hover:border-saffaron/30 hover:shadow-lg transition-all group">
//             <div className="mb-4">
//               <h3 className="font-bold text-lg text-darkSerpent mb-2 group-hover:text-castletonGreen transition-colors">
//                 {pos.title}
//               </h3>
//               <p className="text-xs text-gray-500 uppercase tracking-wider">POS-{String(pos.id).padStart(4, '0')}</p>
//             </div>
//             <div className="bg-seaSalt p-3 rounded-lg mb-4">
//               <p className="text-sm text-gray-700 line-clamp-2">{pos.description}</p>
//               <p className="text-xs text-gray-500 mt-2">
//                 Status: <span className={pos.status === 'active' ? 'text-green-600 font-semibold' : 'text-red-600 font-semibold'}>
//                   {pos.status}
//                 </span>
//               </p>
//             </div>
//             <button 
//               onClick={() => handleEditPosition(pos)}
//               className="text-castletonGreen font-bold text-xs underline underline-offset-4 hover:text-darkSerpent transition-colors"
//             >
//               Update Details →
//             </button>
//           </div>
//         ))}
//       </div> */}
//     </motion.div>
//   );
// }

// import { useState, useEffect } from "react";
// import Button from "../../components/Button";
// import { AnimatePresence } from "framer-motion";
// import { motion } from "framer-motion";
// import { PlusCircle, X } from "lucide-react";
// import { PositionForm } from "./PositionForm";
// import { fetchPositions } from "./positionService";
// import Card from "../../components/Card";

// export default function Position() {
//   const [showForm, setShowForm] = useState(false);
//   const [positions, setPositions] = useState([]);

//   // Load positions from database
// //   const loadPositions = async () => {
// //     try {
// //       const data = await fetchPositions();
// //       setPositions(data);
// //     } catch (error) {
// //       console.error('Failed to load positions:', error);
// //     }
// //   };

//   useEffect(() => {
//     // loadPositions();
//   }, []);

//   const handleAddPosition = () => {
//     setShowForm(true);
//   };

//   const handleSuccess = () => {
//     // loadPositions(); // Refresh the list after successful save
//   };

//   return (
//     <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
//       <div className="flex justify-between items-start mb-8">
//         <div>
//           <h2 className="text-3xl font-bold text-darkSerpent">Manage Positions</h2>
//           <p className="text-gray-600 text-sm mt-1">Create and manage job openings</p>
//         </div>
//         <Button className="px-6 py-3 rounded-xl text-sm shadow-md" onClick={handleAddPosition}>
//           <PlusCircle size={18} /> New Position
//         </Button>
//       </div>

//       {/* Side drawer overlay */}
//       <AnimatePresence>
//         {showForm && (
//           <>
//             <motion.div
//               key="overlay"
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 0.4 }}
//               exit={{ opacity: 0 }}
//               transition={{ duration: 0.25 }}
//               className="fixed inset-0 bg-black z-40"
//               onClick={() => setShowForm(false)}
//             />
//             <motion.div
//               key="drawer"
//               initial={{ x: '100%' }}
//               animate={{ x: 0 }}
//               exit={{ x: '100%' }}
//               transition={{ type: 'spring', stiffness: 300, damping: 30 }}
//               className="fixed top-0 right-0 h-full w-[420px] bg-white shadow-2xl z-50 flex flex-col"
//             >
//               <div className="flex items-center justify-between p-6 border-b border-seaSalt">
//                 <h3 className="text-xl font-bold text-darkSerpent">New Position</h3>
//                 <button onClick={() => setShowForm(false)} className="p-2 rounded-lg hover:bg-seaSalt transition-colors">
//                   <X size={20} className="text-gray-500" />
//                 </button>
//               </div>
//               <div className="flex-1 overflow-y-auto p-6">
//                 <PositionForm
//                   onClose={() => setShowForm(false)}
//                   onSuccess={handleSuccess}
//                   isEditMode={false}
//                 />
//               </div>
//             </motion.div>
//           </>
//         )}
//       </AnimatePresence>

//       {/* <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
//         {positions.map((pos) => (
//           <div key={pos.id} className="bg-white p-6 rounded-2xl border border-seaSalt hover:border-saffaron/30 hover:shadow-lg transition-all group">
//             <div className="mb-4">
//               <h3 className="font-bold text-lg text-darkSerpent mb-2 group-hover:text-castletonGreen transition-colors">
//                 {pos.title}
//               </h3>
//               <p className="text-xs text-gray-500 uppercase tracking-wider">POS-{String(pos.id).padStart(4, '0')}</p>
//             </div>
//             <div className="bg-seaSalt p-3 rounded-lg mb-4">
//               <p className="text-sm text-gray-700 line-clamp-2">{pos.description}</p>
//               <p className="text-xs text-gray-500 mt-2">
//                 Status: <span className={pos.status === 'active' ? 'text-green-600 font-semibold' : 'text-red-600 font-semibold'}>
//                   {pos.status}
//                 </span>
//               </p>
//             </div>
//           </div>
//         ))}
//       </div> */}
//     </motion.div>
//   );
// }

// import { useState, useEffect } from "react";
// import Button from "../../components/Button";
// import { AnimatePresence } from "framer-motion";
// import { motion } from "framer-motion";
// import { PlusCircle, X, Archive, RotateCcw } from "lucide-react"; // Imported icons
// import { PositionForm } from "./PositionForm";
// import { fetchPositions } from "./positionService";
// import Card from "../../components/Card";

// export default function Position() {
//   const [showForm, setShowForm] = useState(false);
//   // Updated Mock Data with 'Archived' status
//   const [positions, setPositions] = useState([
//     { id: 1, title: 'Senior Developer', description: 'Lead the frontend architecture and mentor junior developers.', status: 'Active' },
//     { id: 2, title: 'Product Designer', description: 'Design intuitive user experiences for our internal dashboard tools.', status: 'Active' },
//     { id: 3, title: 'Project Manager', description: 'Coordinate with stakeholders and manage development sprints.', status: 'Inactive' },
//     { id: 4, title: 'QA Engineer', description: 'Develop automated test suites and ensure software quality.', status: 'Archived' },
//   ]);

//   useEffect(() => {
//     // loadPositions();
//   }, []);

//   const handleAddPosition = () => {
//     setShowForm(true);
//   };

//   const handleSuccess = () => {
//     // loadPositions(); // Refresh the list after successful save
//   };

//   // Mock function for archiving/unarchiving
//   const handleToggleArchive = (id: number, currentStatus: string) => {
//     console.log(`Toggling archive for ${id}. Current: ${currentStatus}`);
//     // In reality, this would call positionService
//   };

//   return (
//     <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
//       <div className="flex justify-between items-start mb-8">
//         <div>
//           <h2 className="text-3xl font-bold text-darkSerpent">Manage Positions</h2>
//           <p className="text-gray-600 text-sm mt-1">Create and manage job openings</p>
//         </div>
//         <Button className="px-6 py-3 rounded-xl text-sm shadow-md" onClick={handleAddPosition}>
//           <PlusCircle size={18} /> New Position
//         </Button>
//       </div>

//       {/* Side drawer overlay */}
//       <AnimatePresence>
//         {showForm && (
//           <>
//             <motion.div
//               key="overlay"
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 0.4 }}
//               exit={{ opacity: 0 }}
//               transition={{ duration: 0.25 }}
//               className="fixed inset-0 bg-black z-40"
//               onClick={() => setShowForm(false)}
//             />
//             <motion.div
//               key="drawer"
//               initial={{ x: '100%' }}
//               animate={{ x: 0 }}
//               exit={{ x: '100%' }}
//               transition={{ type: 'spring', stiffness: 300, damping: 30 }}
//               className="fixed top-0 right-0 h-full w-[420px] bg-white shadow-2xl z-50 flex flex-col"
//             >
//               <div className="flex items-center justify-between p-6 border-b border-seaSalt">
//                 <h3 className="text-xl font-bold text-darkSerpent">New Position</h3>
//                 <button onClick={() => setShowForm(false)} className="p-2 rounded-lg hover:bg-seaSalt transition-colors">
//                   <X size={20} className="text-gray-500" />
//                 </button>
//               </div>
//               <div className="flex-1 overflow-y-auto p-6">
//                 <PositionForm
//                   onClose={() => setShowForm(false)}
//                   onSuccess={handleSuccess}
//                   isEditMode={false}
//                 />
//               </div>
//             </motion.div>
//           </>
//         )}
//       </AnimatePresence>

//      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
//         {positions.map((pos) => {
//             const isArchived = pos.status === 'Archived';
//             const getStatusStyle = (status: string) => {
//             switch (status) {
//                 case 'Active': return 'bg-castletonGreen/10 text-castletonGreen';
//                 case 'Inactive': return 'bg-amber-100 text-amber-700';
//                 default: return 'bg-gray-100 text-gray-600';
//             }
//             };

//             return (
//             <Card 
//                 key={pos.id} 
//                 className={`hover:border-saffaron/30 hover:shadow-xl group relative overflow-hidden transition-all ${isArchived ? 'opacity-70' : ''}`}
//                 content={
//                 <div className="flex flex-col h-full space-y-4">
//                     {/* Archived Indication Banner (Corner Style) */}
//                     {isArchived && (
//                     <div className="absolute top-0 right-0 bg-gray-500 text-white text-[10px] uppercase font-bold px-3 py-1 rounded-bl-lg tracking-widest z-10">
//                         Archived
//                     </div>
//                     )}

//                     {/* Status Pill (Top Left) */}
//                     <div className="flex justify-start">
//                     {!isArchived && (
//                         <span className={`text-[10px] font-bold uppercase px-3 py-1 rounded-full ${getStatusStyle(pos.status)}`}>
//                         {pos.status === 'Active' ? 'Open' : 'Full'}
//                         </span>
//                     )}
//                     </div>

//                     <div className="flex-1 space-y-4">
//                     <div>
//                         <h3 className={`font-bold text-lg transition-colors ${isArchived ? 'text-gray-500' : 'text-darkSerpent group-hover:text-castletonGreen'}`}>
//                         {pos.title}
//                         </h3>
//                     </div>

//                     <div className="bg-seaSalt p-4 rounded-xl border border-gray-100">
//                         <p className={`text-sm line-clamp-2 ${isArchived ? 'text-gray-400' : 'text-gray-700'}`}>
//                         {pos.description}
//                         </p>
//                     </div>
//                     </div>

//                     {/* Archive Action Area */}
//                     <div className="pt-4 mt-auto border-t border-gray-100 flex justify-end">
//                     <button 
//                         onClick={() => handleToggleArchive(pos.id, pos.status)}
//                         className={`text-xs font-bold uppercase tracking-wider flex items-center gap-2 transition-colors ${
//                         isArchived 
//                             ? 'text-castletonGreen hover:text-darkSerpent' 
//                             : 'text-gray-400 hover:text-red-600'
//                         }`}
//                     >
//                         {isArchived ? (
//                         <><RotateCcw size={14} /> Restore</>
//                         ) : (
//                         <><Archive size={14} /> Archive</>
//                         )}
//                     </button>
//                     </div>
//                 </div>
//                 }
//             />
//             );
//         })}
//         </div>
//     </motion.div>
//   );
// }

// import { useState, useEffect } from "react";
// import Button from "../../components/Button";
// import { AnimatePresence } from "framer-motion";
// import { motion } from "framer-motion";
// import { PlusCircle, X, Archive, RotateCcw } from "lucide-react";
// import { PositionForm } from "./PositionForm";
// import { fetchPositions } from "./positionService";
// import Card from "../../components/Card";
// import type { Position } from "../types";

// export default function Position() {
//   const [showForm, setShowForm] = useState(false);
//   const [positions, setPositions] = useState<Position[]>([]); // Initialized as empty array
//   const [loading, setLoading] = useState(true); // Added loading state

//   const loadPositions = async () => {
//     try {
//       setLoading(true);
//       const data = await fetchPositions();
//       setPositions(data || []);
//     } catch (error) {
//       console.error('Failed to load positions:', error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     loadPositions(); // Call the real service
//   }, []);

//   const handleAddPosition = () => {
//     setShowForm(true);
//   };

//   const handleSuccess = () => {
//     loadPositions(); // Refresh the list after successful save
//   };

//   const handleToggleArchive = (id: number, currentStatus: boolean) => {
//     console.log(`Toggling archive for ${id}. Current: ${currentStatus}`);
//   };

//   return (
//     <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
//       <div className="flex justify-between items-start mb-8">
//         <div>
//           <h2 className="text-3xl font-bold text-darkSerpent">Manage Positions</h2>
//           <p className="text-gray-600 text-sm mt-1">Create and manage job openings</p>
//         </div>
//         <Button className="px-6 py-3 rounded-xl text-sm shadow-md" onClick={handleAddPosition}>
//           <PlusCircle size={18} /> New Position
//         </Button>
//       </div>

//       {/* Side drawer overlay remains the same */}
//       <AnimatePresence>
//         {showForm && (
//           <>
//             <motion.div
//               key="overlay"
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 0.4 }}
//               exit={{ opacity: 0 }}
//               transition={{ duration: 0.25 }}
//               className="fixed inset-0 bg-black z-40"
//               onClick={() => setShowForm(false)}
//             />
//             <motion.div
//               key="drawer"
//               initial={{ x: '100%' }}
//               animate={{ x: 0 }}
//               exit={{ x: '100%' }}
//               transition={{ type: 'spring', stiffness: 300, damping: 30 }}
//               className="fixed top-0 right-0 h-full w-[420px] bg-white shadow-2xl z-50 flex flex-col"
//             >
//               <div className="flex items-center justify-between p-6 border-b border-seaSalt">
//                 <h3 className="text-xl font-bold text-darkSerpent">New Position</h3>
//                 <button onClick={() => setShowForm(false)} className="p-2 rounded-lg hover:bg-seaSalt transition-colors">
//                   <X size={20} className="text-gray-500" />
//                 </button>
//               </div>
//               <div className="flex-1 overflow-y-auto p-6">
//                 <PositionForm
//                   onClose={() => setShowForm(false)}
//                   onSuccess={handleSuccess}
//                   isEditMode={false}
//                 />
//               </div>
//             </motion.div>
//           </>
//         )}
//       </AnimatePresence>

//       {/* Render logic using real data */}
//       {loading ? (
//         <div className="text-center py-20 text-gray-500">Loading positions...</div>
//       ) : (
//         <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
//             {positions.map((pos) => {
//             // Use your new boolean field
//             const isArchived = pos.is_archive; 
            
//             const getStatusStyle = (status: string) => {
//                 switch (status) {
//                 case 'Open': return 'bg-castletonGreen/10 text-castletonGreen';
//                 case 'Full': return 'bg-amber-100 text-amber-700';
//                 default: return 'bg-gray-100 text-gray-600';
//                 }
//             };

//             return (
//                 <Card 
//                 key={pos.id} 
//                 className={`hover:border-saffaron/30 hover:shadow-xl group relative overflow-hidden transition-all ${isArchived ? 'opacity-70' : ''}`}
//                 content={
//                     <div className="flex flex-col h-full space-y-4">
//                     {/* Archived Indication Banner */}
//                     {isArchived && (
//                         <div className="absolute top-0 right-0 bg-gray-500 text-white text-[10px] uppercase font-bold px-3 py-1 rounded-bl-lg tracking-widest z-10">
//                         Archived
//                         </div>
//                     )}

//                     {/* Status Pill */}
//                     <div className="flex justify-start">
//                         {!isArchived && (
//                         <span className={`text-[10px] font-bold uppercase px-3 py-1 rounded-full ${getStatusStyle(pos.status)}`}>
//                             {pos.status}
//                         </span>
//                         )}
//                     </div>

//                     <div className="flex-1 space-y-4">
//                         <h3 className={`font-bold text-lg transition-colors ${isArchived ? 'text-gray-500' : 'text-darkSerpent group-hover:text-castletonGreen'}`}>
//                         {pos.title}
//                         </h3>
//                         <div className="bg-seaSalt p-4 rounded-xl border border-gray-100">
//                         <p className={`text-sm line-clamp-2 ${isArchived ? 'text-gray-400' : 'text-gray-700'}`}>
//                             {pos.description}
//                         </p>
//                         </div>
//                     </div>

//                     {/* Archive Action Area */}
//                     <div className="pt-4 mt-auto border-t border-gray-100 flex justify-end">
//                         <button 
//                         onClick={() => handleToggleArchive(pos.id, pos.is_archive)}
//                         className={`text-xs font-bold uppercase tracking-wider flex items-center gap-2 transition-colors ${
//                             isArchived ? 'text-castletonGreen hover:text-darkSerpent' : 'text-gray-400 hover:text-red-600'
//                         }`}
//                         >
//                         {isArchived ? (
//                             <><RotateCcw size={14} /> Restore</>
//                         ) : (
//                             <><Archive size={14} /> Archive</>
//                         )}
//                         </button>
//                     </div>
//                     </div>
//                 }
//                 />
//             );
//             })}
//         </div>
//       )}
//     </motion.div>
//   );
// }   

import { useState, useEffect } from "react";
import Button from "../../components/Button";
import { AnimatePresence, motion } from "framer-motion";
import { PlusCircle, X, Archive, RotateCcw } from "lucide-react";
import { PositionForm } from "./PositionForm";
import { fetchPositions, archivePosition, restorePosition } from "./positionService";
import Card from "../../components/Card";
import { LoadingScreen } from "../../components/LoadingScreen"; 
import type { Position } from "../types";
import ConfirmationModal from "../../components/ConfirmationModal";

export default function Position() {
  const [showForm, setShowForm] = useState(false);
  const [positions, setPositions] = useState<Position[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingPosition, setEditingPosition] = useState<Position | null>(null);
  
  // Confirmation modal states
  const [showArchiveModal, setShowArchiveModal] = useState(false);
  const [positionToArchive, setPositionToArchive] = useState<{ id: number; title: string; isArchived: boolean } | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const loadPositions = async () => {
    setLoading(true);
    const data = await fetchPositions();
    setPositions(data || []);
    setLoading(false);
  };

  useEffect(() => { loadPositions(); }, []);

  const handleEditPosition = (pos: Position) => {
    setEditingPosition(pos);
    setShowForm(true);
  };

  const handleAddPosition = () => {
    setEditingPosition(null);
    setShowForm(true);
  };

  const handleSuccess = () => {
    loadPositions();
    setShowForm(false);
    setEditingPosition(null);
  };

  const handleClose = () => {
    setShowForm(false);
    setEditingPosition(null);
  };

  // Open confirmation modal for archive/restore
  const confirmArchiveRestore = (id: number, title: string, isArchived: boolean) => {
    setPositionToArchive({ id, title, isArchived });
    setShowArchiveModal(true);
  };

  // Handle archive or restore action
  const handleArchiveRestore = async () => {
    if (!positionToArchive) return;
    
    setIsProcessing(true);
    
    try {
      if (positionToArchive.isArchived) {
        await restorePosition(positionToArchive.id);
      } else {
        await archivePosition(positionToArchive.id);
      }
      await loadPositions();
    } catch (error) {
      console.error('Failed to process position:', error);
    } finally {
      setIsProcessing(false);
      setShowArchiveModal(false);
      setPositionToArchive(null);
    }
  };

  const closeModal = () => {
    setShowArchiveModal(false);
    setPositionToArchive(null);
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      className="flex flex-col h-full overflow-hidden"
    >
      {/* Header: Fixed at top */}
      <div className="flex-none flex justify-between items-start pb-8">
        <div>
          <h2 className="text-3xl font-bold text-darkSerpent">Manage Positions</h2>
          <p className="text-gray-600 text-sm mt-1">Create and manage job openings</p>
        </div>
        <Button className="px-6 py-3 rounded-xl text-sm shadow-md" onClick={handleAddPosition}>
          <PlusCircle size={18} /> New Position
        </Button>
      </div>

      {/* Scrollable Content Area */}
      <div className="flex-1 overflow-y-auto pr-2 relative">
        {loading ? (
          <div className="h-64 flex items-center justify-center">
            <LoadingScreen message="Fetching positions..." variant="full" />
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 pb-8">
            {positions.map((pos) => {
              const isArchived = pos.is_archive;
              const getStatusStyle = (status: string) => {
                switch (status?.toLowerCase()) {
                  case 'open': return 'bg-saffaron/10 text-saffaron';
                  case 'full': return 'bg-darkSerpent text-white';
                  default: return 'bg-gray-100 text-gray-600';
                }
              };

              return (
                <Card 
                  key={pos.id} 
                  onClick={() => !isArchived && handleEditPosition(pos)}
                  className={`hover:border-saffaron/30 hover:shadow-xl group relative overflow-hidden transition-all ${isArchived ? 'opacity-70 cursor-not-allowed' : 'cursor-pointer'}`}
                  content={
                    <div className="flex flex-col h-full space-y-4">
                      {isArchived && (
                        <div className="absolute top-0 right-0 bg-gray-500 text-white text-[10px] uppercase font-bold px-3 py-1 rounded-bl-lg tracking-widest z-10">
                          Archived
                        </div>
                      )}
                      <div className="flex justify-start">
                        {!isArchived && (
                          <span className={`text-[10px] font-bold uppercase px-3 py-1 rounded-full ${getStatusStyle(pos.status)}`}>
                            {pos.status}
                          </span>
                        )}
                      </div>
                      <div className="flex-1 space-y-4">
                        <h3 className={`font-bold text-lg transition-colors ${isArchived ? 'text-gray-500' : 'text-darkSerpent group-hover:text-castletonGreen'}`}>
                          {pos.title}
                        </h3>
                        <div className="bg-seaSalt p-4 rounded-xl border border-gray-100">
                          <p className={`text-sm line-clamp-2 ${isArchived ? 'text-gray-400' : 'text-gray-700'}`}>
                            {pos.description}
                          </p>
                        </div>
                      </div>
                      <div className="pt-4 mt-auto border-t border-gray-100 flex justify-end">
                        <button 
                          onClick={(e) => {
                            e.stopPropagation();
                            confirmArchiveRestore(pos.id, pos.title, pos.is_archive);
                          }}
                          className={`text-xs font-bold uppercase tracking-wider flex items-center gap-2 transition-colors ${
                            isArchived ? 'text-castletonGreen hover:text-darkSerpent' : 'text-gray-400 hover:text-red-600'
                          }`}
                        >
                          {isArchived ? <><RotateCcw size={14} /> Restore</> : <><Archive size={14} /> Archive</>}
                        </button>
                      </div>
                    </div>
                  }
                />
              );
            })}
          </div>
        )}
      </div>

      {/* Side Drawer for Form */}
      <AnimatePresence>
        {showForm && (
          <>
            <motion.div 
              key="overlay" 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 0.4 }} 
              exit={{ opacity: 0 }} 
              className="fixed inset-0 bg-black z-40" 
              onClick={handleClose} 
            />
            <motion.div 
              key="drawer" 
              initial={{ x: '100%' }} 
              animate={{ x: 0 }} 
              exit={{ x: '100%' }} 
              transition={{ type: 'spring', stiffness: 300, damping: 30 }} 
              className="fixed top-0 right-0 h-full w-[420px] bg-white shadow-2xl z-50 flex flex-col"
            >
              <div className="flex items-center justify-between p-6 border-b border-seaSalt">
                <h3 className="text-xl font-bold text-darkSerpent">
                  {editingPosition ? 'Edit Position' : 'New Position'}
                </h3>
                <button onClick={handleClose} className="p-2 rounded-lg hover:bg-seaSalt transition-colors">
                  <X size={20} className="text-gray-500" />
                </button>
              </div>
              <div className="flex-1 overflow-y-auto p-6">
                <PositionForm 
                  key={editingPosition ? `edit-${editingPosition.id}` : 'new'} 
                  isEditMode={!!editingPosition} 
                  initialData={editingPosition ? {
                    id: editingPosition.id,
                    title: editingPosition.title,
                    description: editingPosition.description,
                    status: editingPosition.status === 'Open' || editingPosition.status === 'open' ? 'Open' : 'Full'
                  } : undefined}
                  onClose={handleClose} 
                  onSuccess={handleSuccess} 
                />
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Confirmation Modal for Archive/Restore */}
      <ConfirmationModal
        isOpen={showArchiveModal}
        title={positionToArchive?.isArchived ? 'Restore Position' : 'Archive Position'}
        message={
          positionToArchive?.isArchived 
            ? `Are you sure you want to restore "${positionToArchive.title}"? It will appear in active positions.`
            : `Are you sure you want to archive "${positionToArchive?.title}"? This position will be hidden from active listings.`
        }
        buttonName={positionToArchive?.isArchived ? 'Restore' : 'Archive'}
        onConfirm={handleArchiveRestore}
        onCancel={closeModal}
        isLoading={isProcessing}
        loadingText={positionToArchive?.isArchived ? 'Restoring...' : 'Archiving...'}
        isDangerous={!positionToArchive?.isArchived}
      />
    </motion.div>
  );
}