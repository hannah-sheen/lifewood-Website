interface CardProps {
  title?: string;
  content: React.ReactNode;
  className?: string;
  // Add onClick as an optional function
  onClick?: () => void;
}

export default function Card({ title, content, className = '', onClick }: CardProps) {
  const base = 'bg-white border border-gray-100 rounded-3xl p-6 shadow-sm transition-all duration-300';

  return (
    <div 
      className={`${base} ${className} ${onClick ? 'cursor-pointer' : ''}`}
      onClick={onClick}
    >
      {title && (
        <h3 className="text-darkSerpent text-lg font-bold mb-4 uppercase tracking-wider">
          {title}
        </h3>
      )}
      
      <div className="text-gray-600">
        {content}
      </div>
    </div>
  );
}