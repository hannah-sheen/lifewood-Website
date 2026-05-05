import type { InputHTMLAttributes, TextareaHTMLAttributes, ReactNode } from 'react';

type BaseProps = {
  label?: string;
  icon?: ReactNode;
  error?: string;
  className?: string;
  required?: boolean;
};

type InputProps = BaseProps & InputHTMLAttributes<HTMLInputElement> & { as?: 'input' };
type TextareaProps = BaseProps & TextareaHTMLAttributes<HTMLTextAreaElement> & { as: 'textarea'; rows?: number };

type InputFieldProps = InputProps | TextareaProps;

export default function InputField({ label, icon, error, className = '', required, as = 'input', ...props }: InputFieldProps) {
  const baseClass = `w-full bg-seaSalt rounded-2xl border border-transparent focus:ring-2 focus:ring-saffaron/50 outline-none transition-all text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed ${icon ? 'pl-11 pr-4 py-3.5' : 'px-4 py-3.5'} ${error ? 'ring-2 ring-red-400/50' : ''} ${className}`;

  const field = as === 'textarea'
    ? <textarea {...(props as TextareaHTMLAttributes<HTMLTextAreaElement>)} className={`${baseClass} resize-none`} />
    : <input {...(props as InputHTMLAttributes<HTMLInputElement>)} className={baseClass} />;

  if (!label && !icon) return (
    <div>
      {field}
      {error && <p className="text-red-500 text-[10px] mt-1 ml-2">{error}</p>}
    </div>
  );

  return (
    <div className="space-y-2">
      {label && (
        <label className="text-[10px] font-black uppercase tracking-widest text-darkSerpent/40 ml-2">
          {label}{required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      <div className="relative">
        {icon && <div className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-saffaron opacity-70 pointer-events-none">{icon}</div>}
        {field}
      </div>
      {error && <p className="text-red-500 text-[10px] ml-2">{error}</p>}
    </div>
  );
}
