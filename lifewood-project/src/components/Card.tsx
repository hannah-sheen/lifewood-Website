// interface CardProps {
//   title?: string;
//   content: React.ReactNode;
//   className?: string;
//   // Add onClick as an optional function
//   onClick?: () => void;
// }

// export default function Card({ title, content, className = '', onClick }: CardProps) {
//   const base = 'bg-white border border-gray-100 rounded-3xl p-6 shadow-sm transition-all duration-300';

//   return (
//     <div 
//       className={`${base} ${className} ${onClick ? 'cursor-pointer' : ''}`}
//       onClick={onClick}
//     >
//       {title && (
//         <h3 className="text-darkSerpent text-lg font-bold mb-4 uppercase tracking-wider">
//           {title}
//         </h3>
//       )}
      
//       <div className="text-gray-600">
//         {content}
//       </div>
//     </div>
//   );
// }

// interface CardProps {
//   title?: React.ReactNode | string;
//   content: React.ReactNode;
//   footer?: React.ReactNode;
//   className?: string;
//   onClick?: () => void;
// }

// export default function Card({ title, content, footer, className = '', onClick }: CardProps) {
//   const base = `
//     group flex flex-col p-6 rounded-3xl transition-all duration-300 ease-out 
//     bg-white/70 backdrop-blur-sm border border-darkSerpent/10 shadow-sm
//   `;

//   return (
//     <div className={`${base} ${onClick ? 'cursor-pointer hover:shadow-lg hover:border-saffaron/30' : ''} ${className}`} onClick={onClick}>
      
//       {/* Title Area: Now renders whatever node you pass in */}
//       {title && (
//         <div className="mb-4 pb-3 border-b border-darkSerpent/10">
//           {title}
//         </div>
//       )}
      
//       <div className="flex-grow text-darkSerpent/90 font-medium leading-relaxed">
//         {content}
//       </div>

//       {footer && (
//         <div className="mt-4 pt-4 border-t border-darkSerpent/10">
//           {footer}
//         </div>
//       )}
//     </div>
//   );
// }

interface CardProps {
  title?: React.ReactNode | string;
  content: React.ReactNode;
  footer?: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

export default function Card({ title, content, footer, className = '', onClick }: CardProps) {
  // 1. We keep the p-[2px] structure to define the trail width
  const wrapperClass = `
    group relative p-[2px] rounded-[26px] transition-all duration-300
    ${onClick ? 'cursor-pointer hover:-translate-y-1' : ''} 
    ${className}
  `;

  const base = `
    flex flex-col rounded-[24px] transition-all duration-300 ease-out 
    bg-white/70 backdrop-blur-sm border border-darkSerpent/10 shadow-sm h-full
  `;

  return (
    <div className={wrapperClass} onClick={onClick}>
      
      {/* THE MOVING DOUBLE BORDER TRAIL */}
      <div className="absolute inset-0 rounded-[26px] overflow-hidden opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
        {/*
          TECHNICAL UPDATE: We're using multiple conic gradients.
          Gradient 1: Starts top-right, trails long yellow (saffaron)
          Gradient 2: Starts bottom-left (180deg offset), trails long green (castletonGreen)
          Angle Stops: changed from 340->300 for a much longer, sweeping trail
        */}
        <div className="absolute inset-[-50%] animate-border-trail bg-[conic-gradient(from_0deg,transparent_0_300deg,#FFCC33_360deg),conic-gradient(from_180deg,transparent_0_300deg,#FFCC33_360deg)]" />
      </div>

      {/* Your original Card content */}
      <div className={base}>
        {title && (
          <div className="mb-4 pb-3 border-b border-darkSerpent/10">
            {title}
          </div>
        )}
        
        <div className="flex-grow text-darkSerpent/90 font-medium leading-relaxed">
          {content}
        </div>

        {footer && (
          <div className="mt-4 pt-4 border-t border-darkSerpent/10">
            {footer}
          </div>
        )}
      </div>
    </div>
  )
  }
