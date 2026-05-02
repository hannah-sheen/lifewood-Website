// import { useState } from 'react';
// import Button from '../../components/Button.tsx';
// import { addPosition, updatePosition } from './positionService.tsx';

// interface PositionFormProps {
//   isEditMode: boolean;
//   initialData?: {
//     title: string;
//     description: string;
//     status: 'Active' | 'Inactive';
//   };
//   onClose: () => void;
//   onSubmit: (data: any) => void;
// }

// export function PositionForm({ isEditMode, initialData, onClose, onSubmit }: PositionFormProps) {
//   const [formData, setFormData] = useState(initialData || {
//     title: '',
//     description: '',
//     status: 'Active'
//   });

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     onSubmit(formData);
//   };

//   return (
//     <form onSubmit={handleSubmit} className="space-y-6">
//       {/* Title Input */}
//       <div>
//         <label className="block text-xs font-bold uppercase text-castletonGreen mb-2 tracking-widest">Position Title</label>
//         <input
//           required
//           className="w-full p-3 bg-seaSalt rounded-xl border border-gray-200 focus:ring-2 ring-saffaron/50 outline-none transition-all"
//           value={formData.title}
//           onChange={(e) => setFormData({ ...formData, title: e.target.value })}
//         />
//       </div>

//       {/* Description Input */}
//       <div>
//         <label className="block text-xs font-bold uppercase text-castletonGreen mb-2 tracking-widest">Description</label>
//         <textarea
//           required
//           rows={4}
//           className="w-full p-3 bg-seaSalt rounded-xl border border-gray-200 focus:ring-2 ring-saffaron/50 outline-none transition-all"
//           value={formData.description}
//           onChange={(e) => setFormData({ ...formData, description: e.target.value })}
//         />
//       </div>

//       {/* Status Toggle */}
//       <div>
//         <label className="block text-xs font-bold uppercase text-castletonGreen mb-2 tracking-widest">Status</label>
//         <div className="flex bg-castletonGreen/70 p-1 rounded-xl border border-gray-200">
//           {(['Active', 'Inactive'] as const).map((status) => (
//             <label key={status} className="flex-1 cursor-pointer">
//               <input
//                 type="radio"
//                 className="sr-only"
//                 checked={formData.status === status}
//                 onChange={() => setFormData({ ...formData, status })}
//               />
//               <div className={`text-center py-2 text-xs font-bold uppercase tracking-wider rounded-lg transition-all ${
//                 formData.status === status 
//                   ? 'bg-darkSerpent text-white shadow-sm' 
//                   : 'text-white hover:text-darkSerpent'
//               }`}>
//                 {status}
//               </div>
//             </label>
//           ))}
//         </div>
//       </div>

//       {/* Action Buttons */}
//       <div className="flex gap-3 pt-4">
//         <Button
//           onClick={onClose}
//           variant="outline"
//           className="flex-1 hover:!bg-darkSerpent hover:!text-white hover:!border-darkSerpent"
//         >
//           Cancel
//         </Button>
//         <Button
//           type="submit"
//           className="flex-1 !bg-saffaron !text-darkSerpent hover:!bg-earthYellow"
//         >
//           {isEditMode ? 'Update' : 'Save'}
//         </Button>
//       </div>
//     </form>
//   );
// }


import { useState } from 'react';
import Button from '../../components/Button.tsx';
import { addPosition, updatePosition } from './positionService.tsx';

interface PositionFormProps {
  isEditMode: boolean;
  initialData?: {
    id?: number;
    title: string;
    description: string;
    status: string;
  };
  onClose: () => void;
  onSuccess: () => void;
}

export function PositionForm({ isEditMode, initialData, onClose, onSuccess }: PositionFormProps) {
  const [formData, setFormData] = useState({
    title: initialData?.title || '',
    description: initialData?.description || '',
    status: initialData?.status || 'Active'
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate required fields
    if (!formData.title.trim()) {
      setError('Position title is required');
      return;
    }
    
    if (!formData.description.trim()) {
      setError('Description is required');
      return;
    }
    
    setLoading(true);
    setError('');

    try {
      if (isEditMode && initialData?.id) {
        await updatePosition(initialData.id, {
          title: formData.title.trim(),
          description: formData.description.trim(),
          status: formData.status.toLowerCase()
        });
      } else {
        await addPosition(
          formData.title.trim(),
          formData.description.trim(),
          formData.status.toLowerCase()
        );
      }
      
      // Success - close form and refresh parent data
      onSuccess();
      onClose();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to save position');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-red-600 text-sm">
          {error}
        </div>
      )}

      {/* Title Input */}
      <div>
        <label className="block text-xs font-bold uppercase text-castletonGreen mb-2 tracking-widest">
          Position Title <span className="text-red-500">*</span>
        </label>
        <input
          required
          type="text"
          className="w-full p-3 text-sm bg-seaSalt rounded-xl border border-gray-200 focus:ring-2 ring-saffaron/50 outline-none transition-all"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          disabled={loading}
          placeholder="e.g., Senior Software Engineer"
        />
      </div>

      {/* Description Input */}
      <div>
        <label className="block text-xs font-bold uppercase text-castletonGreen mb-2 tracking-widest">
          Description <span className="text-red-500">*</span>
        </label>
        <textarea
          required
          rows={4}
          className="w-full p-3 text-sm bg-seaSalt rounded-xl border border-gray-200 focus:ring-2 ring-saffaron/50 outline-none transition-all"
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          disabled={loading}
          placeholder="Describe the role, responsibilities, and requirements..."
        />
      </div>

      {/* Status Toggle */}
      <div>
        <label className="block text-xs font-bold uppercase text-castletonGreen mb-2 tracking-widest">
          Status
        </label>
        <div className="flex bg-castletonGreen/70 p-1 rounded-xl border border-gray-200">
          {(['Open', 'Full'] as const).map((status) => (
            <label key={status} className="flex-1 cursor-pointer">
              <input
                type="radio"
                className="sr-only"
                name="status"
                checked={formData.status === status}
                onChange={() => setFormData({ ...formData, status })}
                disabled={loading}
              />
              <div className={`text-center py-2 text-xs font-bold uppercase tracking-wider rounded-lg transition-all ${
                formData.status === status 
                  ? 'bg-darkSerpent text-white shadow-sm' 
                  : 'text-white hover:text-darkSerpent'
              }`}>
                {status}
              </div>
            </label>
          ))}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-3 pt-4">
        <Button
          type="button"
          onClick={onClose}
          variant="outline"
          className="flex-1 hover:!bg-darkSerpent hover:!text-white hover:!border-darkSerpent"
          disabled={loading}
        >
          Cancel
        </Button>
        <Button
          type="submit"
          className="flex-1 !bg-saffaron !text-darkSerpent hover:!bg-earthYellow"
          disabled={loading}
        >
          {loading ? 'Saving...' : (isEditMode ? 'Update' : 'Save')}
        </Button>
      </div>
    </form>
  );
}

