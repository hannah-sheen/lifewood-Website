import { toast } from 'sonner';
import { CheckCircle, AlertTriangle, XCircle } from 'lucide-react';

export const showSuccessToast = (message: string) => {
  toast.success(message, {
    duration: 3000,
    icon: <CheckCircle className="w-5 h-5 text-castletonGreen" />,
    style: {
      background: '#e6f4ea', // Very light green background
      border: '2px solid #046241', // Dark castletonGreen border
      color: '#046241',
      borderRadius: '12px',
      padding: '12px 16px',
      fontSize: '14px',
      fontWeight: '500',
    },
  });
};

export const showErrorToast = (message: string) => {
  toast.error(message, {
    duration: 3000,
    icon: <XCircle className="w-5 h-5 text-red-600" />,
    style: {
      background: '#fef2f2', // Very light red background
      border: '2px solid #dc2626', // Dark red border
      color: '#991b1b',
      borderRadius: '12px',
      padding: '12px 16px',
      fontSize: '14px',
      fontWeight: '500',
    },
  });
};

export const showWarningToast = (message: string) => {
  toast.warning(message, {
    duration: 3000,
    icon: <AlertTriangle className="w-5 h-5 text-saffaron" />,
    style: {
      background: '#FFF8ED', // Very light earthYellow background
      border: '2px solid #FFB347', // earthYellow border
      color: '#78350f',
      borderRadius: '12px',
      padding: '12px 16px',
      fontSize: '14px',
      fontWeight: '500',
    },
  });
};