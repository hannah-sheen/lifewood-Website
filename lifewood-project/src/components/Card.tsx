interface CardProps {
  title?: React.ReactNode | string;
  content: React.ReactNode;
  footer?: React.ReactNode;
  className?: string;
  onClick?: () => void;
  showTrail?: boolean; 
}

export default function Card({ 
  title, 
  content, 
  footer, 
  className = '', 
  onClick, 
  showTrail = false 
}: CardProps) {
  
  const wrapperClass = `
    group relative p-[2px] rounded-[26px] transition-all duration-300
    ${onClick ? 'cursor-pointer hover:-translate-y-1' : ''} 
    ${className}
  `;

  const base = `
    flex flex-col h-full rounded-[24px] transition-all duration-300 ease-out 
    bg-white/70 backdrop-blur-sm border border-darkSerpent/10 shadow-sm 
    overflow-hidden
    /* LOGIC: If no trail, show saffaron border on hover. If trail is on, keep border neutral. */
    ${!showTrail ? 'hover:border-saffaron' : 'border-darkSerpent/10'}
  `;

  return (
    <div className={wrapperClass} onClick={onClick}>
      
      {/* THE MOVING DOUBLE BORDER TRAIL */}
      {showTrail && (
        <div className="absolute inset-0 rounded-[26px] overflow-hidden opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
          <div className="absolute inset-[-50%] animate-border-trail bg-[conic-gradient(from_0deg,transparent_0_300deg,#FFCC33_360deg),conic-gradient(from_180deg,transparent_0_300deg,#FFCC33_360deg)]" />
        </div>
      )}

      {/* Internal Content Container */}
      <div className={base}>
        {title && (
          <div className="p-6 pb-3 border-b border-darkSerpent/10">
            {title}
          </div>
        )}
        
        <div className="p-6 flex-grow text-darkSerpent/90 font-medium leading-relaxed">
          {content}
        </div>

        {footer && (
          <div className="relative mt-auto px-6 pb-6">
            {/* 
               ANIMATED PROGRESS DIVIDER:
               Removed absolute left-0 to respect the parent's padding 
            */}
            <div className="relative w-full h-[1px] bg-darkSerpent/10">
                <div className="absolute inset-0 h-full w-0 bg-saffaron group-hover:w-full transition-all duration-700 ease-in-out" />
            </div>
            
            <div className="pt-4">
              {footer}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}