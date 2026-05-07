import React from 'react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  itemsPerPage: number;
  onPageChange: (page: number) => void;
  onItemsPerPageChange: (itemsPerPage: number) => void;
  showItemsPerPage?: boolean;
  itemsPerPageOptions?: number[];
  className?: string;
}

export default function Pagination({
  currentPage,
  totalPages,
  itemsPerPage,
  onPageChange,
  onItemsPerPageChange,
  showItemsPerPage = true,
  itemsPerPageOptions = [5, 10, 25, 50, 100],
  className = '',
}: PaginationProps) {
  
  const handleItemsPerPage = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onItemsPerPageChange(Number(e.target.value));
    onPageChange(1);
  };

  return (
    <div className={`flex-shrink-0 p-4 border-t border-seaSalt flex items-center justify-between bg-seaSalt ${className}`}>
      
      {/* Left side: Items per page selector */}
      {showItemsPerPage && (
        <div className="flex items-center gap-3 text-[11px] font-bold text-darkSerpent/50">
          <span>Showing</span>
          <select
            value={itemsPerPage}
            onChange={handleItemsPerPage}
            className="bg-seaSalt/50 border border-darkSerpent/10 rounded-lg px-2 py-1 outline-none text-darkSerpent cursor-pointer focus:ring-1 ring-saffaron"
          >
            {itemsPerPageOptions.map(n => (
              <option key={n} value={n}>{n}</option>
            ))}
          </select>
          <span>per page</span>
        </div>
      )}

      {/* Right side: Navigation Controls */}
      <div className="flex items-center gap-1">
        <button
          disabled={currentPage === 1}
          onClick={() => onPageChange(currentPage - 1)}
          className={`
            px-3 py-1.5 rounded-lg text-[11px] font-bold text-darkSerpent/60 
            hover:bg-seaSalt/50 disabled:opacity-30 transition-all
            ${currentPage !== 1 ? 'cursor-pointer' : 'cursor-not-allowed'}
          `}
        >
          Prev
        </button>
        
        <span className="text-[11px] font-mono font-bold text-darkSerpent/30 px-2">
          {currentPage} / {Math.max(1, totalPages)}
        </span>
        
        <button
          disabled={currentPage >= totalPages}
          onClick={() => onPageChange(currentPage + 1)}
          className={`
            px-3 py-1.5 rounded-lg text-[11px] font-bold text-darkSerpent/60 
            hover:bg-seaSalt/50 disabled:opacity-30 transition-all
            ${currentPage < totalPages ? 'cursor-pointer' : 'cursor-not-allowed'}
          `}
        >
          Next
        </button>
      </div>
    </div>
  );
}