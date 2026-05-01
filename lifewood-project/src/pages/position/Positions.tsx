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

import { useState, useEffect } from "react";
import Button from "../../components/Button";
import { AnimatePresence } from "framer-motion";
import { motion } from "framer-motion";
import { PlusCircle, X } from "lucide-react";
import { PositionForm } from "./PositionForm";
import { fetchPositions } from "./positionService";

export default function Position() {
  const [showForm, setShowForm] = useState(false);
  const [positions, setPositions] = useState([]);

  // Load positions from database
//   const loadPositions = async () => {
//     try {
//       const data = await fetchPositions();
//       setPositions(data);
//     } catch (error) {
//       console.error('Failed to load positions:', error);
//     }
//   };

  useEffect(() => {
    // loadPositions();
  }, []);

  const handleAddPosition = () => {
    setShowForm(true);
  };

  const handleSuccess = () => {
    // loadPositions(); // Refresh the list after successful save
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <div className="flex justify-between items-start mb-8">
        <div>
          <h2 className="text-3xl font-bold text-darkSerpent">Manage Positions</h2>
          <p className="text-gray-600 text-sm mt-1">Create and manage job openings</p>
        </div>
        <Button className="px-6 py-3 rounded-xl text-sm shadow-md" onClick={handleAddPosition}>
          <PlusCircle size={18} /> New Position
        </Button>
      </div>

      {/* Side drawer overlay */}
      <AnimatePresence>
        {showForm && (
          <>
            <motion.div
              key="overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.4 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="fixed inset-0 bg-black z-40"
              onClick={() => setShowForm(false)}
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
                <h3 className="text-xl font-bold text-darkSerpent">New Position</h3>
                <button onClick={() => setShowForm(false)} className="p-2 rounded-lg hover:bg-seaSalt transition-colors">
                  <X size={20} className="text-gray-500" />
                </button>
              </div>
              <div className="flex-1 overflow-y-auto p-6">
                <PositionForm
                  onClose={() => setShowForm(false)}
                  onSuccess={handleSuccess}
                  isEditMode={false}
                />
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {positions.map((pos) => (
          <div key={pos.id} className="bg-white p-6 rounded-2xl border border-seaSalt hover:border-saffaron/30 hover:shadow-lg transition-all group">
            <div className="mb-4">
              <h3 className="font-bold text-lg text-darkSerpent mb-2 group-hover:text-castletonGreen transition-colors">
                {pos.title}
              </h3>
              <p className="text-xs text-gray-500 uppercase tracking-wider">POS-{String(pos.id).padStart(4, '0')}</p>
            </div>
            <div className="bg-seaSalt p-3 rounded-lg mb-4">
              <p className="text-sm text-gray-700 line-clamp-2">{pos.description}</p>
              <p className="text-xs text-gray-500 mt-2">
                Status: <span className={pos.status === 'active' ? 'text-green-600 font-semibold' : 'text-red-600 font-semibold'}>
                  {pos.status}
                </span>
              </p>
            </div>
          </div>
        ))}
      </div> */}
    </motion.div>
  );
}