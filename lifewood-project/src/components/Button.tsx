// interface ButtonProps {
//   children: React.ReactNode;
//   onClick?: () => void;
//   type?: 'button' | 'submit' | 'reset';
//   className?: string;
//   disabled?: boolean;
//   variant?: 'primary' | 'outline';
// }

// export default function Button({
//   children,
//   onClick,
//   type = 'button',
//   className = '',
//   disabled = false,
//   variant = 'primary',
// }: ButtonProps) {
//   const base = 'inline-flex items-center justify-center gap-2 font-bold px-12 py-5 rounded-2xl text-sm uppercase tracking-widest shadow-lg transition-all duration-300 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed';

//   const variants = {
//     primary: 'bg-darkSerpent text-white hover:bg-saffaron hover:text-darkSerpent',
//     outline: 'border-2 border-darkSerpent text-darkSerpent hover:bg-saffaron hover:border-saffaron hover:text-darkSerpent',
//   };

//   return (
//     <button
//       type={type}
//       onClick={onClick}
//       disabled={disabled}
//       className={`${base} ${variants[variant]} ${className}`}
//     >
//       {children}
//     </button>
//   );
// }


interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  className?: string; // This is the user-provided override
  disabled?: boolean;
  variant?: 'primary' | 'outline';
}

export default function Button({
  children,
  onClick,
  type = 'button',
  className = '',
  disabled = false,
  variant = 'primary',
}: ButtonProps) {
  
  const base = 'inline-flex items-center justify-center gap-2 font-bold px-12 py-5 rounded-2xl text-sm uppercase tracking-widest shadow-lg transition-all duration-300 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer';

  const variants = {
    primary: 'bg-darkSerpent text-white hover:bg-saffaron hover:text-darkSerpent',
    outline: 'border-2 border-darkSerpent text-darkSerpent hover:bg-saffaron hover:border-saffaron hover:text-darkSerpent',
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      /* Logic: base + variant + className.
         Because className is last, it will override any 
         conflicting styles in base or variant.
      */
      className={`${base} ${variants[variant]} ${className}`}
    >
      {children}
    </button>
  );
}