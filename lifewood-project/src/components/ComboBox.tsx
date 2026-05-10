import { useState, useRef, useEffect } from 'react';
import type { ReactNode } from 'react';
import { ChevronDown } from 'lucide-react';

type Option = { label: string; value: string | number };

type ComboBoxProps = {
  label?: string;
  icon?: ReactNode;
  error?: string;
  options: Option[];
  value?: string | number;
  onChange: (value: string | number) => void;
  placeholder?: string;
  required?: boolean;
  className?: string;
};

export default function ComboBox({ label, icon, error, options, value, onChange, placeholder = "Select...", required, className = "" }: ComboBoxProps) {  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Close when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) setIsOpen(false);
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const selectedLabel = options.find(o => o.value === value)?.label || placeholder;

  return (
    <div className={`space-y-2 ${className}`} ref={containerRef}>      
    {label && (
        <label className="text-[10px] font-black uppercase tracking-widest text-darkSerpent/40 ml-2">
          {label}{required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}

      <div className="relative">
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className={`w-full bg-white rounded-2xl border ${error ? 'border-red-400/50' : 'border-darkSerpent/10'} focus:border-transparent focus:ring-2 focus:ring-saffaron/50 outline-none transition-all text-sm font-medium text-left flex items-center justify-between ${icon ? 'pl-11 pr-4 py-3.5' : 'px-4 py-3.5'} ${error ? 'ring-2 ring-red-400/50' : ''}`}
        >
          <span className="flex items-center gap-3 flex-1 min-w-0">
            {icon && <div className="w-4 h-4 text-saffaron opacity-70 flex-shrink-0">{icon}</div>}
            <span className={`truncate ${value ? 'text-darkSerpent' : 'text-darkSerpent/40'}`}>{selectedLabel}</span>
          </span>
          <ChevronDown className={`w-4 h-4 text-darkSerpent/40 transition-transform flex-shrink-0 ml-2 ${isOpen ? 'rotate-180' : ''}`} />
        </button>

        {/* Dropdown List */}
        {isOpen && (
          <div className="absolute top-full left-0 w-full mt-2 bg-white border border-seaSalt rounded-2xl shadow-xl z-50 overflow-hidden py-1 max-h-60 overflow-y-auto">
            {options.map((option) => (
              <button
                key={option.value}
                type="button"
                className="w-full text-left px-4 py-2.5 text-sm text-darkSerpent hover:bg-seaSalt transition-colors whitespace-normal break-words"
                onClick={() => {
                  onChange(option.value);
                  setIsOpen(false);
                }}
              >
                {option.label}
              </button>
            ))}
          </div>
        )}
      </div>

      {error && <p className="text-red-500 text-[10px] ml-2">{error}</p>}
    </div>
  );
}