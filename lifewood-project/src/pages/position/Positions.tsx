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
import { showSuccessToast, showErrorToast } from '../../components/Toast';

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
        showSuccessToast(`"${positionToArchive.title}" restored successfully!`);
      } else {
        await archivePosition(positionToArchive.id);
        showSuccessToast(`"${positionToArchive.title}" archived successfully!`);
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
  const archivedCount = positions.filter(p => p.is_archive).length;
  const totalCount = positions.length;

  return (
    <div className="flex flex-col h-full">
      {/* Header: Fixed at top */}
      <div className="flex-shrink-0 flex justify-between items-start pb-8">
        <div>
          <h2 className="text-3xl font-bold text-darkSerpent">Manage Positions</h2>
          <p className="text-gray-600 text-sm mt-1">Create and manage job openings</p>
        </div>
        <Button className="px-6 py-3 rounded-xl text-sm shadow-md" onClick={handleAddPosition}>
          <PlusCircle size={18} /> New Position
        </Button>
      </div>

      {/* Scrollable Cards Container */}
      <div className="flex-1 overflow-y-auto min-h-0">
        {loading ? (
          <div className="h-64 flex items-center justify-center">
            <LoadingScreen message="Loading positions..." variant="full" />
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
                          className={`text-xs font-bold uppercase tracking-wider flex items-center gap-2 transition-colors cursor-pointer ${
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

      <div className="flex-shrink-0 pt-2 mt-2 border-t border-gray-100 flex items-center gap-6 text-xs font-bold uppercase tracking-widest text-darkSerpent/40">
        <span>Total: <span className="text-darkSerpent">{totalCount}</span></span>
        <span className="w-px h-3 bg-gray-200" />
        <span>Open: <span className="text-saffaron">{openPositions}</span></span>
        <span className="w-px h-3 bg-gray-200" />
        <span>Full: <span className="text-darkSerpent">{fullPositions}</span></span>
        <span className="w-px h-3 bg-gray-200" />
        <span>Archived: <span className="text-gray-500">{archivedCount}</span></span>
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
    </div>
  );
}