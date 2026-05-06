// import React from 'react';
// import { ChevronLeft, ChevronRight } from 'lucide-react';

// interface PaginationProps {
//   currentPage: number;
//   totalPages: number;
//   itemsPerPage: number;
//   onPageChange: (page: number) => void;
//   onItemsPerPageChange: (itemsPerPage: number) => void;
//   showItemsPerPage?: boolean;
//   itemsPerPageOptions?: number[];
//   className?: string;
// }

// export default function Pagination({
//   currentPage,
//   totalPages,
//   itemsPerPage,
//   onPageChange,
//   onItemsPerPageChange,
//   showItemsPerPage = true,
//   itemsPerPageOptions = [5, 10, 25, 50, 100],
//   className = '',
// }: PaginationProps) {
  
//   const handlePrevious = () => {
//     if (currentPage > 1) {
//       onPageChange(currentPage - 1);
//     }
//   };

//   const handleNext = () => {
//     if (currentPage < totalPages) {
//       onPageChange(currentPage + 1);
//     }
//   };

//   const handleItemsPerPage = (e: React.ChangeEvent<HTMLSelectElement>) => {
//     onItemsPerPageChange(Number(e.target.value));
//     onPageChange(1); // Reset to first page when changing items per page
//   };

//   // Generate page numbers with ellipsis
//   const getPageNumbers = () => {
//     const pages: (number | string)[] = [];
//     const maxVisible = 5;
    
//     if (totalPages <= maxVisible) {
//       for (let i = 1; i <= totalPages; i++) {
//         pages.push(i);
//       }
//     } else {
//       if (currentPage <= 3) {
//         for (let i = 1; i <= 4; i++) pages.push(i);
//         pages.push('...');
//         pages.push(totalPages);
//       } else if (currentPage >= totalPages - 2) {
//         pages.push(1);
//         pages.push('...');
//         for (let i = totalPages - 3; i <= totalPages; i++) pages.push(i);
//       } else {
//         pages.push(1);
//         pages.push('...');
//         for (let i = currentPage - 1; i <= currentPage + 1; i++) pages.push(i);
//         pages.push('...');
//         pages.push(totalPages);
//       }
//     }
//     return pages;
//   };

//   return (
//     <div className={`flex items-center justify-between ${className}`}>
//       {/* Left side: Items per page selector */}
//       {showItemsPerPage && (
//         <div className="flex items-center gap-3 text-[11px] font-bold text-darkSerpent/50">
//           <span>Showing</span>
//           <select
//             value={itemsPerPage}
//             onChange={handleItemsPerPage}
//             className="bg-seaSalt/50 border border-seaSalt rounded-lg px-2 py-1 outline-none text-darkSerpent cursor-pointer focus:ring-1 ring-saffaron transition-all"
//           >
//             {itemsPerPageOptions.map(n => (
//               <option key={n} value={n}>{n}</option>
//             ))}
//           </select>
//           <span>per page</span>
//         </div>
//       )}

//       {/* Right side: Pagination controls */}
//       <div className="flex items-center gap-2">
//         {/* Previous button */}
//         <button
//           disabled={currentPage === 1}
//           onClick={handlePrevious}
//           className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-[11px] font-bold text-darkSerpent/60 hover:bg-seaSalt/50 disabled:opacity-30 disabled:cursor-not-allowed transition-all cursor-pointer"
//         >
//           <ChevronLeft size={14} />
//           Prev
//         </button>

//         {/* Page numbers */}
//         <div className="flex items-center gap-1">
//           {getPageNumbers().map((page, index) => (
//             <button
//               key={index}
//               onClick={() => typeof page === 'number' && onPageChange(page)}
//               className={`min-w-[32px] h-8 px-2 rounded-lg text-[11px] font-bold transition-all cursor-pointer ${
//                 page === currentPage
//                   ? 'bg-saffaron text-white'
//                   : page === '...'
//                   ? 'text-darkSerpent/30 cursor-default hover:bg-transparent'
//                   : 'text-darkSerpent/60 hover:bg-seaSalt/50'
//               }`}
//               disabled={page === '...'}
//             >
//               {page}
//             </button>
//           ))}
//         </div>

//         {/* Next button */}
//         <button
//           disabled={currentPage >= totalPages}
//           onClick={handleNext}
//           className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-[11px] font-bold text-darkSerpent/60 hover:bg-seaSalt/50 disabled:opacity-30 disabled:cursor-not-allowed transition-all cursor-pointer"
//         >
//           Next
//           <ChevronRight size={14} />
//         </button>
//       </div>
//     </div>
//   );
// }

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
            className="bg-seaSalt/50 border border-seaSalt rounded-lg px-2 py-1 outline-none text-darkSerpent cursor-pointer focus:ring-1 ring-saffaron"
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
          className="px-3 py-1.5 rounded-lg text-[11px] font-bold text-darkSerpent/60 hover:bg-seaSalt/50 disabled:opacity-30 transition-all"
        >
          Prev
        </button>
        
        <span className="text-[11px] font-mono font-bold text-darkSerpent/30 px-2">
          {currentPage} / {Math.max(1, totalPages)}
        </span>
        
        <button
          disabled={currentPage >= totalPages}
          onClick={() => onPageChange(currentPage + 1)}
          className="px-3 py-1.5 rounded-lg text-[11px] font-bold text-darkSerpent/60 hover:bg-seaSalt/50 disabled:opacity-30 transition-all"
        >
          Next
        </button>
      </div>
    </div>
  );
}