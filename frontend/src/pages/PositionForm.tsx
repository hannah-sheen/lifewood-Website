import { useState } from 'react';
import Button from '../components/Button.tsx';

interface PositionFormProps {
  isEditMode: boolean;
  initialData?: {
    title: string;
    description: string;
    status: 'Active' | 'Inactive';
  };
  onClose: () => void;
  onSubmit: (data: any) => void;
}

export function PositionForm({ isEditMode, initialData, onClose, onSubmit }: PositionFormProps) {
  const [formData, setFormData] = useState(initialData || {
    title: '',
    description: '',
    status: 'Active'
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Title Input */}
      <div>
        <label className="block text-xs font-bold uppercase text-castletonGreen mb-2 tracking-widest">Position Title</label>
        <input
          required
          className="w-full p-3 bg-seaSalt rounded-xl border border-gray-200 focus:ring-2 ring-saffaron/50 outline-none transition-all"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
        />
      </div>

      {/* Description Input */}
      <div>
        <label className="block text-xs font-bold uppercase text-castletonGreen mb-2 tracking-widest">Description</label>
        <textarea
          required
          rows={4}
          className="w-full p-3 bg-seaSalt rounded-xl border border-gray-200 focus:ring-2 ring-saffaron/50 outline-none transition-all"
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
        />
      </div>

      {/* Status Toggle */}
      <div>
        <label className="block text-xs font-bold uppercase text-castletonGreen mb-2 tracking-widest">Status</label>
        <div className="flex gap-4">
          {(['Active', 'Inactive'] as const).map((status) => (
            <Button
              key={status}
              type="button"
              onClick={() => setFormData({ ...formData, status })}
              variant={formData.status === status ? 'primary' : 'outline'}
              className="flex-1 py-3 rounded-xl text-sm"
            >
              {status}
            </Button>
          ))}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-3 pt-4">
        <Button
          type="button"
          onClick={onClose}
          variant="outline"
          className="flex-1 py-3 rounded-xl text-sm"
        >
          Cancel
        </Button>
        <Button
          type="submit"
          variant="primary"
          className="flex-1 py-3 rounded-xl text-sm"
        >
          {isEditMode ? 'Update Position' : 'Save Position'}
        </Button>
      </div>
    </form>
  );
}
