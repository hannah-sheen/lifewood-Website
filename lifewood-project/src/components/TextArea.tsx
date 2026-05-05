import React from 'react';
import type { LucideIcon } from 'lucide-react';

interface TextAreaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  icon?: LucideIcon;
  label?: string;
  containerClassName?: string;
}

export const TextArea = ({ 
  icon: Icon, 
  label, 
  className = "", 
  containerClassName = "", 
  ...props 
}: TextAreaProps) => {
  return (
    <div className={`flex flex-col gap-1.5 w-full ${containerClassName}`}>
      {/* Optional Label */}
      {label && (
        <label className="text-[10px] font-black uppercase tracking-[0.2em] text-darkSerpent/40">
          {label}
        </label>
      )}

      {/* Container with top-aligned icon */}
    <div className={`relative border-b-2 border-darkSerpent/10 focus-within:border-saffaron transition-colors pb-2 ${Icon ? 'items-start' : 'items-center'}`}>
        {Icon && (
          <div className="mr-3 mt-0.5 text-darkSerpent/30">
            <Icon className="w-4 h-4" />
          </div>
        )}
        
        <textarea
          {...props}
          className={`w-full bg-transparent border-none p-0 outline-none text-darkSerpent resize-none 
                     placeholder:text-darkSerpent/10 disabled:opacity-50 ${className}`}
        />
      </div>
    </div>
  );
};