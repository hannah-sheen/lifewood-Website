import React, { type ReactNode } from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  icon?: ReactNode; // Changed from LucideIcon to ReactNode for better flexibility
  label?: string;
  containerClassName?: string;
}

export const Input = ({ 
  icon, 
  label, 
  className = "", 
  containerClassName = "", 
  ...props 
}: InputProps) => {
  return (
    <div className={`flex flex-col gap-1.5 w-full ${containerClassName}`}>
      {/* Optional Label */}
      {label && (
        <label className="text-[10px] font-black uppercase tracking-[0.2em] text-darkSerpent/40">
          {label}
        </label>
      )}

      {/* Input Wrapper */}
      <div className="relative border-b-2 border-darkSerpent/10 focus-within:border-saffaron transition-colors pb-2">
        {icon && (
          <div className="mr-3 flex items-center justify-center text-darkSerpent/30">
            {icon}
          </div>
        )}
        
        <input
          {...props}
          className={`w-full bg-transparent border-none p-0 outline-none text-darkSerpent
                     placeholder:text-darkSerpent/10 disabled:opacity-50 ${className}`}
        />
      </div>
    </div>
  );
};