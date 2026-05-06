// import { useState, useEffect, useMemo } from "react";
// import Button from "../../components/Button";
// import { AnimatePresence, motion } from "framer-motion";
// import { PlusCircle, X, Archive, RotateCcw, Search } from "lucide-react";
// import { PositionForm } from "./PositionForm";
// import { fetchPositions, archivePosition, restorePosition } from "./positionService";
// import Card from "../../components/Card";
// import { LoadingScreen } from "../../components/LoadingScreen"; 
// import type { Position } from "../types";
// import ConfirmationModal from "../../components/ConfirmationModal";
// import { showSuccessToast, showErrorToast } from '../../components/Toast';
// import InputField from "../../components/InputField";
// import ComboBox from "../../components/ComboBox";
// import Pagination from "../../components/Pagination";

// export default function Position() {
//   const [showForm, setShowForm] = useState(false);
//   const [positions, setPositions] = useState<Position[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [editingPosition, setEditingPosition] = useState<Position | null>(null);
//   const [search, setSearch] = useState('');
//   const [filterStatus, setFilterStatus] = useState<'All' | 'Open' | 'Full' | 'Archived' | 'Urgent'>('All');
//   const [sortBy, setSortBy] = useState<'default' | 'az' | 'za'>('default');
//   const [currentPage, setCurrentPage] = useState(1);
//   const [itemsPerPage, setItemsPerPage] = useState(6);
  
//   // Confirmation modal states
//   const [showArchiveModal, setShowArchiveModal] = useState(false);
//   const [positionToArchive, setPositionToArchive] = useState<{ id: number; title: string; isArchived: boolean } | null>(null);
//   const [isProcessing, setIsProcessing] = useState(false);

//   const loadPositions = async () => {
//     setLoading(true);
//     const data = await fetchPositions();
//     setPositions(data || []);
//     setLoading(false);
//   };

//   useEffect(() => { loadPositions(); }, []);

//   // Reset to page 1 whenever filters change
//   useEffect(() => {
//     setCurrentPage(1);
//   }, [search, filterStatus, sortBy]);

//   const handleEditPosition = (pos: Position) => {
//     setEditingPosition(pos);
//     setShowForm(true);
//   };

//   const handleAddPosition = () => {
//     setEditingPosition(null);
//     setShowForm(true);
//   };

//   const handleSuccess = () => {
//     loadPositions();
//     setShowForm(false);
//     setEditingPosition(null);
//   };

//   const handleClose = () => {
//     setShowForm(false);
//     setEditingPosition(null);
//   };

//   // Open confirmation modal for archive/restore
//   const confirmArchiveRestore = (id: number, title: string, isArchived: boolean) => {
//     setPositionToArchive({ id, title, isArchived });
//     setShowArchiveModal(true);
//   };

//   // Handle archive or restore action
//   const handleArchiveRestore = async () => {
//     if (!positionToArchive) return;
    
//     setIsProcessing(true);
    
//     try {
//       if (positionToArchive.isArchived) {
//         await restorePosition(positionToArchive.id);
//         showSuccessToast(`"${positionToArchive.title}" restored successfully!`);
//       } else {
//         await archivePosition(positionToArchive.id);
//         showSuccessToast(`"${positionToArchive.title}" archived successfully!`);
//       }
//       await loadPositions();
//     } catch (error) {
//       const msg = error instanceof Error ? error.message : 'Failed to process position';
//       showErrorToast(msg);
//     } finally {
//       setIsProcessing(false);
//       setShowArchiveModal(false);
//       setPositionToArchive(null);
//     }
//   };

//   const closeModal = () => {
//     setShowArchiveModal(false);
//     setPositionToArchive(null);
//   };

//   const activePositions = positions.filter(p => !p.is_archive);
//   const openPositions = activePositions.filter(p => p.status?.toLowerCase() === 'open').length;
//   const fullPositions = activePositions.filter(p => p.status?.toLowerCase() === 'full').length;
//   const urgentPositions = activePositions.filter(p => p.is_urgent).length;
//   const archivedCount = positions.filter(p => p.is_archive).length;
//   const totalCount = positions.length;

//   const filteredPositions = useMemo(() => {
//     let data = [...positions];

//     // Search
//     if (search.trim()) {
//       const q = search.toLowerCase();
//       data = data.filter(p =>
//         p.title.toLowerCase().includes(q) ||
//         p.description.toLowerCase().includes(q)
//       );
//     }

//     // Filter
//     if (filterStatus === 'Open') data = data.filter(p => !p.is_archive && p.status?.toLowerCase() === 'open');
//     else if (filterStatus === 'Full') data = data.filter(p => !p.is_archive && p.status?.toLowerCase() === 'full');
//     else if (filterStatus === 'Archived') data = data.filter(p => p.is_archive);
//     else if (filterStatus === 'Urgent') data = data.filter(p => !p.is_archive && p.is_urgent);

//     // Sort
//     if (sortBy === 'az') data.sort((a, b) => a.title.localeCompare(b.title));
//     else if (sortBy === 'za') data.sort((a, b) => b.title.localeCompare(a.title));

//     return data;
//   }, [positions, search, filterStatus, sortBy]);

//   // Pagination calculations
//   const paginatedPositions = useMemo(() => {
//     const startIndex = (currentPage - 1) * itemsPerPage;
//     return filteredPositions.slice(startIndex, startIndex + itemsPerPage);
//   }, [filteredPositions, currentPage, itemsPerPage]);

//   const totalPages = Math.max(1, Math.ceil(filteredPositions.length / itemsPerPage));

//   const getStatusStyle = (status: string) => {
//     switch (status?.toLowerCase()) {
//       case 'open': return 'bg-saffaron/10 text-saffaron';
//       case 'full': return 'bg-darkSerpent text-white';
//       default: return 'bg-gray-100 text-gray-600';
//     }
//   };

//   return (
//     <div className="flex flex-col h-full">
//       {/* Header */}
//       <div className="flex-shrink-0 flex justify-between items-start pb-4">
//         <div>
//           <h2 className="text-2xl font-bold text-darkSerpent">Manage Positions</h2>
//           <p className="text-gray-600 text-xs mt-1">Create and manage job openings</p>
//         </div>
//       </div>

//       {/* Stats Cards - Moved above search */}
//       <div className="flex-shrink-0 grid grid-cols-5 gap-3 pb-4">
//         <div className="bg-white rounded-lg p-3 border border-gray-200 shadow-sm">
//           <p className="text-xs text-gray-500">Total</p>
//           <p className="text-xl font-bold text-darkSerpent">{totalCount}</p>
//         </div>
//         <div className="bg-white rounded-lg p-3 border border-gray-200 shadow-sm">
//           <p className="text-xs text-gray-500">Open</p>
//           <p className="text-xl font-bold text-saffaron">{openPositions}</p>
//         </div>
//         <div className="bg-white rounded-lg p-3 border border-gray-200 shadow-sm">
//           <p className="text-xs text-gray-500">Full</p>
//           <p className="text-xl font-bold text-darkSerpent">{fullPositions}</p>
//         </div>
//         <div className="bg-white rounded-lg p-3 border border-gray-200 shadow-sm">
//           <p className="text-xs text-gray-500">Urgent</p>
//           <p className="text-xl font-bold text-red-600">{urgentPositions}</p>
//         </div>
//         <div className="bg-white rounded-lg p-3 border border-gray-200 shadow-sm">
//           <p className="text-xs text-gray-500">Archived</p>
//           <p className="text-xl font-bold text-gray-500">{archivedCount}</p>
//         </div>
//       </div>

//       {/* Search + Filter + Sort (Left) and New Position (Right) */}
//       <div className="flex-shrink-0 flex gap-3 items-center pb-4 justify-between">
        
//         {/* Left Side: Search (Expands), Filter, Sort */}
//         <div className="flex gap-3 items-center flex-grow">
          
//           {/* Search container */}
//           <div className="relative flex-grow max-w-lg"> 
//             <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-darkSerpent/30" />
//             <InputField
//               type="text"
//               placeholder="Search by title or description..."
//               value={search}
//               onChange={e => setSearch(e.target.value)}
//               className="w-full pl-9 pr-4 py-2.5 bg-white border border-darkSerpent/10 rounded-xl text-sm outline-none focus:ring-2 ring-saffaron/40 transition-all text-darkSerpent"
//             />
//           </div>

//           {/* Filter ComboBox */}
//           <div className="w-36 shrink-0">
//             <ComboBox
//               value={filterStatus}
//               onChange={(val) => setFilterStatus(val as any)}
//               options={['All', 'Open', 'Full', 'Archived', 'Urgent'].map(s => ({ label: s, value: s }))}
//             />
//           </div>

//           {/* Sort ComboBox */}
//           <div className="w-36 shrink-0">
//             <ComboBox
//               value={sortBy}
//               onChange={(val) => setSortBy(val as any)}
//               options={[
//                 { label: 'Default', value: 'default' },
//                 { label: 'A → Z', value: 'az' },
//                 { label: 'Z → A', value: 'za' }
//               ]}
//             />
//           </div>
//         </div>

//         {/* Right Side: New Position Button */}
//         <Button className="rounded-xl text-xs shadow-md whitespace-nowrap shrink-0" onClick={handleAddPosition}>
//           <PlusCircle size={18} /> New Position
//         </Button>
//       </div>

//       {/* Scrollable Cards Container */}
//       <div className="flex-1 overflow-y-auto min-h-0">
//         {loading ? (
//           <div className="h-64 flex items-center justify-center">
//             <LoadingScreen message="Loading positions..." variant="full" />
//           </div>
//         ) : paginatedPositions.length === 0 ? (
//           <div className="h-64 flex flex-col items-center justify-center text-darkSerpent/30">
//             <Search className="w-8 h-8 mb-3 opacity-30" />
//             <p className="text-sm font-medium">No positions match your search</p>
//           </div>
//         ) : (
//           <>
//             <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 pb-8">
//               {paginatedPositions.map((pos) => {
//                 const isArchived = pos.is_archive;

//                 return (
//                   <Card 
//                     key={pos.id} 
//                     onClick={() => !isArchived && handleEditPosition(pos)}
//                     className={`bg-castletonGreen/50 hover:border-saffaron/30 hover:shadow-xl group relative overflow-hidden transition-all ${isArchived ? 'opacity-70 cursor-not-allowed' : 'cursor-pointer'}`}
//                     content={
//                       <div className="flex flex-col h-full space-y-4">
//                         {isArchived && (
//                           <div className="absolute top-0 right-0 bg-gray-500 text-white text-[10px] uppercase font-bold px-3 py-1 rounded-bl-lg tracking-widest z-10">
//                             Archived
//                           </div>
//                         )}
//                         <div className="flex justify-start items-center gap-2">
//                           {!isArchived && (
//                             <span className={`text-[10px] font-bold uppercase px-3 py-1 rounded-full ${getStatusStyle(pos.status)}`}>
//                               {pos.status}
//                             </span>
//                           )}
//                           {!isArchived && pos.is_urgent && (
//                             <span className="text-[10px] font-bold uppercase px-3 py-1 rounded-full bg-red-100 text-red-600 border border-red-200">
//                               🔴 Urgent
//                             </span>
//                           )}
//                         </div>
//                         <div className="flex-1 space-y-4">
//                           <h3 className={`font-bold text-lg transition-colors ${isArchived ? 'text-gray-500' : 'text-darkSerpent group-hover:text-castletonGreen'}`}>
//                             {pos.title}
//                           </h3>
//                           <div className="bg-seaSalt p-4 rounded-xl border border-gray-100">
//                             <p className={`text-sm line-clamp-2 ${isArchived ? 'text-gray-400' : 'text-gray-700'}`}>
//                               {pos.description}
//                             </p>
//                           </div>
//                         </div>
//                         <div className="pt-4 mt-auto border-t border-gray-100 flex justify-end">
//                           <button 
//                             onClick={(e) => {
//                               e.stopPropagation();
//                               confirmArchiveRestore(pos.id, pos.title, pos.is_archive);
//                             }}
//                             className={`text-xs font-bold uppercase tracking-wider flex items-center gap-2 transition-colors cursor-pointer ${
//                               isArchived ? 'text-castletonGreen hover:text-darkSerpent' : 'text-gray-400 hover:text-red-600'
//                             }`}
//                           >
//                             {isArchived ? <><RotateCcw size={14} /> Restore</> : <><Archive size={14} /> Archive</>}
//                           </button>
//                         </div>
//                       </div>
//                     }
//                   />
//                 );
//               })}
//             </div>
//           </>
//         )}
//       </div>

//       {/* Pagination */}
//       <Pagination
//         currentPage={currentPage}
//         totalPages={totalPages}
//         itemsPerPage={itemsPerPage}
//         onPageChange={setCurrentPage}
//         onItemsPerPageChange={setItemsPerPage}
//         showItemsPerPage={true}
//         itemsPerPageOptions={[6, 9, 12, 18, 24]}
//       />

//       {/* Side Drawer for Form */}
//       <AnimatePresence>
//         {showForm && (
//           <>
//             <motion.div 
//               key="overlay" 
//               initial={{ opacity: 0 }} 
//               animate={{ opacity: 0.4 }} 
//               exit={{ opacity: 0 }} 
//               className="fixed inset-0 bg-black z-40" 
//               onClick={handleClose} 
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
//                   {editingPosition ? 'Edit Position' : 'New Position'}
//                 </h3>
//                 <button onClick={handleClose} className="p-2 rounded-lg hover:bg-seaSalt transition-colors cursor-pointer">
//                   <X size={20} className="text-gray-500" />
//                 </button>
//               </div>
//               <div className="flex-1 overflow-y-auto p-6">
//                 <PositionForm 
//                   key={editingPosition ? `edit-${editingPosition.id}` : 'new'} 
//                   isEditMode={!!editingPosition} 
//                   initialData={editingPosition ? {
//                     id: editingPosition.id,
//                     title: editingPosition.title,
//                     description: editingPosition.description,
//                     status: editingPosition.status === 'Open' || editingPosition.status === 'open' ? 'Open' : 'Full',
//                     is_urgent: editingPosition.is_urgent,
//                   } : undefined}
//                   onClose={handleClose} 
//                   onSuccess={handleSuccess} 
//                 />
//               </div>
//             </motion.div>
//           </>
//         )}
//       </AnimatePresence>

//       {/* Confirmation Modal for Archive/Restore */}
//       <ConfirmationModal
//         isOpen={showArchiveModal}
//         title={positionToArchive?.isArchived ? 'Restore Position' : 'Archive Position'}
//         message={
//           positionToArchive?.isArchived 
//             ? `Are you sure you want to restore "${positionToArchive.title}"? It will appear in active positions.`
//             : `Are you sure you want to archive "${positionToArchive?.title}"? This position will be hidden from active listings.`
//         }
//         buttonName={positionToArchive?.isArchived ? 'Restore' : 'Archive'}
//         onConfirm={handleArchiveRestore}
//         onCancel={closeModal}
//         isLoading={isProcessing}
//         loadingText={positionToArchive?.isArchived ? 'Restoring...' : 'Archiving...'}
//         isDangerous={!positionToArchive?.isArchived}
//       />
//     </div>
//   );
// }

import { useState, useEffect, useMemo } from "react";
import Button from "../../components/Button";
import { AnimatePresence, motion } from "framer-motion";
import { PlusCircle, X, Archive, RotateCcw, Search } from "lucide-react";
import { PositionForm } from "./PositionForm";
import { fetchPositions, archivePosition, restorePosition } from "./positionService";
import Card from "../../components/Card";
import { LoadingScreen } from "../../components/LoadingScreen"; 
import type { Position } from "../types";
import ConfirmationModal from "../../components/ConfirmationModal";
import { showSuccessToast, showErrorToast } from '../../components/Toast';
import InputField from "../../components/InputField";
import ComboBox from "../../components/ComboBox";
import Pagination from "../../components/Pagination";

export default function Position() {
  const [showForm, setShowForm] = useState(false);
  const [positions, setPositions] = useState<Position[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingPosition, setEditingPosition] = useState<Position | null>(null);
  const [search, setSearch] = useState('');
  const [filterStatus, setFilterStatus] = useState<'All' | 'Open' | 'Full' | 'Archived' | 'Urgent'>('All');
  const [sortBy, setSortBy] = useState<'default' | 'az' | 'za'>('default');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(6);
  
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

  // Reset to page 1 whenever filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [search, filterStatus, sortBy]);

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
        showSuccessToast('Position restored successfully!');
      } else {
        await archivePosition(positionToArchive.id);
        showSuccessToast('Position archived successfully!');
      }
      await loadPositions();
    } catch (error) {
      const msg = error instanceof Error ? error.message : 'Failed to process position';
      showErrorToast(msg);
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

  const activePositions = positions.filter(p => !p.is_archive);
  const openPositions = activePositions.filter(p => p.status?.toLowerCase() === 'open').length;
  const fullPositions = activePositions.filter(p => p.status?.toLowerCase() === 'full').length;
  const urgentPositions = activePositions.filter(p => p.is_urgent).length;
  const archivedCount = positions.filter(p => p.is_archive).length;
  const totalCount = positions.length;

  const filteredPositions = useMemo(() => {
    let data = [...positions];

    // Search
    if (search.trim()) {
      const q = search.toLowerCase();
      data = data.filter(p =>
        p.title.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q)
      );
    }

    // Filter
    if (filterStatus === 'Open') data = data.filter(p => !p.is_archive && p.status?.toLowerCase() === 'open');
    else if (filterStatus === 'Full') data = data.filter(p => !p.is_archive && p.status?.toLowerCase() === 'full');
    else if (filterStatus === 'Archived') data = data.filter(p => p.is_archive);
    else if (filterStatus === 'Urgent') data = data.filter(p => !p.is_archive && p.is_urgent);

    // Sort
    if (sortBy === 'az') data.sort((a, b) => a.title.localeCompare(b.title));
    else if (sortBy === 'za') data.sort((a, b) => b.title.localeCompare(a.title));

    return data;
  }, [positions, search, filterStatus, sortBy]);

  // Pagination calculations
  const paginatedPositions = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredPositions.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredPositions, currentPage, itemsPerPage]);

  const totalPages = Math.max(1, Math.ceil(filteredPositions.length / itemsPerPage));

  const getStatusStyle = (status: string) => {
  switch (status?.toLowerCase()) {
    case 'open':
      // Vibrant but subtle: Saffaron with a hint of border
      return 'bg-saffaron/10 text-saffaron border border-saffaron/20';
    case 'full':
      // Sophisticated: Castleton Green with a border
      return 'bg-castletonGreen/10 text-castletonGreen border border-castletonGreen/20';
    case 'urgent':
      // High alert: Red with a subtle border
      return 'bg-red-50 text-red-600 border border-red-200';
    default:
      // Neutral: Subtle grey
      return 'bg-gray-100 text-gray-600 border border-gray-200';
  }
};

  return (
    <div className="h-full overflow-y-auto">
      {/* Header */}
      <div className="flex-shrink-0 flex justify-between items-start pb-4">
        <div>
          <h2 className="text-2xl font-bold text-darkSerpent">Manage Positions</h2>
          <p className="text-gray-600 text-xs mt-1">Create and manage job openings</p>
        </div>
      </div>

      {/* Stats Cards - Moved above search */}
      <div className="flex-shrink-0 grid grid-cols-5 gap-3 pb-4">
        <div className="bg-white rounded-lg p-3 border border-gray-200 shadow-sm">
          <p className="text-xs text-gray-500">Total</p>
          <p className="text-xl font-bold text-darkSerpent">{totalCount}</p>
        </div>
        <div className="bg-white rounded-lg p-3 border border-gray-200 shadow-sm">
          <p className="text-xs text-gray-500">Open</p>
          <p className="text-xl font-bold text-saffaron">{openPositions}</p>
        </div>
        <div className="bg-white rounded-lg p-3 border border-gray-200 shadow-sm">
          <p className="text-xs text-gray-500">Full</p>
          <p className="text-xl font-bold text-darkSerpent">{fullPositions}</p>
        </div>
        <div className="bg-white rounded-lg p-3 border border-gray-200 shadow-sm">
          <p className="text-xs text-gray-500">Urgent</p>
          <p className="text-xl font-bold text-red-600">{urgentPositions}</p>
        </div>
        <div className="bg-white rounded-lg p-3 border border-gray-200 shadow-sm">
          <p className="text-xs text-gray-500">Archived</p>
          <p className="text-xl font-bold text-gray-500">{archivedCount}</p>
        </div>
      </div>

      {/* Search + Filter + Sort (Left) and New Position (Right) */}
      <div className="flex-shrink-0 flex gap-3 items-center pb-4 justify-between">
        
        {/* Left Side: Search (Expands), Filter, Sort */}
        <div className="flex gap-3 items-center flex-grow">
          
          {/* Search container */}
          <div className="relative flex-grow max-w-lg"> 
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-darkSerpent/30" />
            <InputField
              type="text"
              placeholder="Search by title or description..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2.5 bg-white border border-darkSerpent/10 rounded-xl text-sm outline-none focus:ring-2 ring-saffaron/40 transition-all text-darkSerpent"
            />
          </div>

          {/* Filter ComboBox */}
          <div className="w-36 shrink-0">
            <ComboBox
              value={filterStatus}
              onChange={(val) => setFilterStatus(val as any)}
              options={['All', 'Open', 'Full', 'Archived', 'Urgent'].map(s => ({ label: s, value: s }))}
            />
          </div>

          {/* Sort ComboBox */}
          <div className="w-36 shrink-0">
            <ComboBox
              value={sortBy}
              onChange={(val) => setSortBy(val as any)}
              options={[
                { label: 'Default', value: 'default' },
                { label: 'A → Z', value: 'az' },
                { label: 'Z → A', value: 'za' }
              ]}
            />
          </div>
        </div>

        {/* Right Side: New Position Button */}
        <Button className="rounded-xl text-xs shadow-md whitespace-nowrap shrink-0" onClick={handleAddPosition}>
          <PlusCircle size={18} /> New Position
        </Button>
      </div>

      {/* Cards Container */}
      {loading ? (
        <div className="h-64 flex items-center justify-center">
          <LoadingScreen message="Loading positions..." variant="full" />
        </div>
      ) : paginatedPositions.length === 0 ? (
        <div className="h-64 flex flex-col items-center justify-center text-darkSerpent/30">
          <Search className="w-8 h-8 mb-3 opacity-30" />
          <p className="text-sm font-medium">No positions match your search</p>
        </div>
      ) : (
        <>
         <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {paginatedPositions.map((pos) => {
            const isArchived = pos.is_archive;

            return (
              <Card 
                  key={pos.id} 
                  onClick={() => !isArchived && handleEditPosition(pos)}
                  className={`
                    relative rounded-3xl p-[2px] transition-all duration-500 group
                    hover:shadow-md hover:-translate-y-1
                    ${isArchived ? 'opacity-70 cursor-not-allowed' : 'cursor-pointer'}
                  `}
                  content={
                    <div className="relative h-full w-full rounded-[22px] bg-white p-6 flex flex-col space-y-4 overflow-hidden">

                      {/* Main Content */}
                      <div className="relative z-10 flex flex-col h-full space-y-4 bg-white">
                        {isArchived && (
                          <div className="absolute -top-6 -right-6 bg-gray-500 text-white text-[10px] uppercase font-bold px-3 py-1 rounded-bl-lg tracking-widest z-10">
                            Archived
                          </div>
                        )}

                        <div className="flex justify-start items-center gap-2">
                            {!isArchived && (
                              <span className={`text-[10px] font-bold uppercase px-3 py-1 rounded-full ${getStatusStyle(pos.status)}`}>
                                {pos.status}
                              </span>
                            )}
                            {!isArchived && pos.is_urgent && (
                              <span className="text-[10px] font-bold uppercase px-3 py-1 rounded-full bg-red-100 text-red-600 border border-red-200">
                                🔴 Urgent
                              </span>
                            )}
                        </div>
                        
                        <div className="flex-1 space-y-4">
                          <h3 className="font-bold uppercase tracking-[0.13em] text-md text-darkSerpent">
                            {pos.title}
                          </h3>
                          <div className="p-4 rounded-xl border border-darkSerpent/10 bg-castletonGreen/10">
                            <p className="text-xs italic line-clamp-2 text-gray-700">
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
                            className={`
                              text-xs font-bold uppercase tracking-wider flex items-center gap-2 transition-colors cursor-pointer
                              ${isArchived 
                                ? 'text-castletonGreen hover:text-castletonGreen/80' // Green for Restore
                                : 'text-gray-400 hover:text-red-600'                // Red for Archive
                              }
                            `}
                          >
                            <span>
                              {isArchived ? <RotateCcw size={14} /> : <Archive size={14} />}
                            </span>
                            {isArchived ? 'Restore' : 'Archive'}
                          </button>
                        </div>
                      </div>
                    </div>
                  }
                />
              );
            })}
          </div>
          </>
        )}

      {/* Pagination */}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        itemsPerPage={itemsPerPage}
        onPageChange={setCurrentPage}
        onItemsPerPageChange={setItemsPerPage}
        showItemsPerPage={true}
        itemsPerPageOptions={[6, 9, 12, 18, 24]}
      />

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
                <button onClick={handleClose} className="p-2 rounded-lg hover:bg-seaSalt transition-colors cursor-pointer">
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
                    status: editingPosition.status === 'Open' || editingPosition.status === 'open' ? 'Open' : 'Full',
                    is_urgent: editingPosition.is_urgent,
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
    </div>
  );
}