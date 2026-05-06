// import { useState } from 'react';
// import Button from '../../components/Button.tsx';
// import { addPosition, updatePosition } from './positionService.tsx';

// interface PositionFormProps {
//   isEditMode: boolean;
//   initialData?: {
//     id?: number;
//     title: string;
//     description: string;
//     status: string;
//   };
//   onClose: () => void;
//   onSuccess: () => void;
// }

// export function PositionForm({ isEditMode, initialData, onClose, onSuccess }: PositionFormProps) {
//   const [formData, setFormData] = useState({
//     title: initialData?.title || '',
//     description: initialData?.description || '',
//     status: initialData?.status || 'Active'
//   });
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState('');

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
    
//     // Validate required fields
//     if (!formData.title.trim()) {
//       setError('Position title is required');
//       return;
//     }
    
//     if (!formData.description.trim()) {
//       setError('Description is required');
//       return;
//     }
    
//     setLoading(true);
//     setError('');

//     try {
//       if (isEditMode && initialData?.id) {
//         await updatePosition(initialData.id, {
//           title: formData.title.trim(),
//           description: formData.description.trim(),
//           status: formData.status.toLowerCase()
//         });
//       } else {
//         await addPosition(
//           formData.title.trim(),
//           formData.description.trim(),
//           formData.status.toLowerCase()
//         );
//       }
      
//       // Success - close form and refresh parent data
//       onSuccess();
//       onClose();
//     } catch (err) {
//       setError(err instanceof Error ? err.message : 'Failed to save position');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit} className="space-y-6">
//       {error && (
//         <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-red-600 text-sm">
//           {error}
//         </div>
//       )}

//       {/* Title Input */}
//       <div>
//         <label className="block text-xs font-bold uppercase text-castletonGreen mb-2 tracking-widest">
//           Position Title <span className="text-red-500">*</span>
//         </label>
//         <input
//           required
//           type="text"
//           className="w-full p-3 text-sm bg-seaSalt rounded-xl border border-gray-200 focus:ring-2 ring-saffaron/50 outline-none transition-all"
//           value={formData.title}
//           onChange={(e) => setFormData({ ...formData, title: e.target.value })}
//           disabled={loading}
//           placeholder="e.g., Senior Software Engineer"
//         />
//       </div>

//       {/* Description Input */}
//       <div>
//         <label className="block text-xs font-bold uppercase text-castletonGreen mb-2 tracking-widest">
//           Description <span className="text-red-500">*</span>
//         </label>
//         <textarea
//           required
//           rows={4}
//           className="w-full p-3 text-sm bg-seaSalt rounded-xl border border-gray-200 focus:ring-2 ring-saffaron/50 outline-none transition-all"
//           value={formData.description}
//           onChange={(e) => setFormData({ ...formData, description: e.target.value })}
//           disabled={loading}
//           placeholder="Describe the role, responsibilities, and requirements..."
//         />
//       </div>

//       {/* Status Toggle */}
//       <div>
//         <label className="block text-xs font-bold uppercase text-castletonGreen mb-2 tracking-widest">
//           Status
//         </label>
//         <div className="flex bg-castletonGreen/70 p-1 rounded-xl border border-gray-200">
//           {(['Open', 'Full'] as const).map((status) => (
//             <label key={status} className="flex-1 cursor-pointer">
//               <input
//                 type="radio"
//                 className="sr-only"
//                 name="status"
//                 checked={formData.status === status}
//                 onChange={() => setFormData({ ...formData, status })}
//                 disabled={loading}
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
//           type="button"
//           onClick={onClose}
//           variant="outline"
//           className="flex-1 hover:!bg-darkSerpent hover:!text-white hover:!border-darkSerpent"
//           disabled={loading}
//         >
//           Cancel
//         </Button>
//         <Button
//           type="submit"
//           className="flex-1 !bg-saffaron !text-darkSerpent hover:!bg-earthYellow"
//           disabled={loading}
//         >
//           {loading ? 'Saving...' : (isEditMode ? 'Update' : 'Save')}
//         </Button>
//       </div>
//     </form>
//   );
// }


import { useState } from 'react';
import Button from '../../components/Button.tsx';
import { addPosition, updatePosition } from './positionService.tsx';
import InputField from '../../components/InputField.tsx';
import { showSuccessToast, showErrorToast } from '../../components/Toast.tsx';

interface PositionFormProps {
  isEditMode: boolean;
  initialData?: {
    id?: number;
    title: string;
    description: string;
    status: string;
    is_urgent?: boolean;
  };
  onClose: () => void;
  onSuccess: () => void;
}

export function PositionForm({ isEditMode, initialData, onClose, onSuccess }: PositionFormProps) {
  const [formData, setFormData] = useState({
    title: initialData?.title || '',
    description: initialData?.description || '',
    status: initialData?.status || (isEditMode ? '' : 'Open'),
    is_urgent: initialData?.is_urgent ?? false,
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
          status: formData.status.toLowerCase(),
          is_urgent: formData.is_urgent,
        });
      } else {
        await addPosition(
          formData.title.trim(),
          formData.description.trim(),
          formData.status.toLowerCase(),
          formData.is_urgent,
        );
      }
      
      // Success - close form and refresh parent data
      onSuccess();
      onClose();
      showSuccessToast(isEditMode ? 'Position updated successfully!' : 'Position created successfully!');
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Failed to save position';
      setError(msg);
      showErrorToast(msg);
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

      <InputField
        label="Position Title"
        required
        type="text"
        value={formData.title}
        onChange={(e) => setFormData({ ...formData, title: (e.target as HTMLInputElement).value })}
        disabled={loading}
        placeholder="e.g., Senior Software Engineer"
      />

      <InputField
        as="textarea"
        label="Description"
        required
        rows={4}
        value={formData.description}
        onChange={(e) => setFormData({ ...formData, description: (e.target as HTMLTextAreaElement).value })}
        disabled={loading}
        placeholder="Describe the role, responsibilities, and requirements..."
      />

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

      {/* Urgent Toggle */}
      <div>
        <label className={`block text-xs font-bold uppercase mb-2 tracking-widest ${ formData.status === 'Full' ? 'text-darkSerpent/20' : 'text-castletonGreen' }`}>
          Urgent Hiring
        </label>
        <button
          type="button"
          disabled={loading || formData.status === 'Full'}
          onClick={() => setFormData(p => ({ ...p, is_urgent: !p.is_urgent }))}
          className={`relative w-full flex items-center justify-between px-4 py-3 rounded-xl border transition-all ${
            formData.status === 'Full'
              ? 'bg-gray-50 border-gray-100 opacity-40 cursor-not-allowed'
              : formData.is_urgent
                ? 'bg-red-50 border-red-300 cursor-pointer'
                : 'bg-seaSalt border-gray-200 cursor-pointer'
          }`}
        >
          <span className={`text-sm font-bold ${
            formData.status === 'Full' ? 'text-darkSerpent/30' : formData.is_urgent ? 'text-red-600' : 'text-darkSerpent/40'
          }`}>
            {formData.status === 'Full' ? 'Not available when Full' : formData.is_urgent ? '🔴 Urgent — Hiring Immediately' : 'Not Urgent'}
          </span>
          <div className={`w-11 h-6 rounded-full transition-colors relative ${ formData.is_urgent && formData.status !== 'Full' ? 'bg-red-500' : 'bg-gray-300' }`}>
            <div className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform ${ formData.is_urgent && formData.status !== 'Full' ? 'translate-x-5' : 'translate-x-0.5' }`} />
          </div>
        </button>
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