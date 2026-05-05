interface LoadingScreenProps {
  message?: string;
  variant?: 'full' | 'overlay' | 'skeleton' | 'modal';
}

export function LoadingScreen({ 
  message = 'Loading...', 
  variant = 'full' 
}: LoadingScreenProps) {
  // Full-page loading screen
 if (variant === 'full') {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <div className="flex flex-col items-center gap-6">
        {/* Animated Spinner */}
        <div className="relative w-12 h-12">
          <div className="absolute inset-0 rounded-full border-4 border-saffaron/20" />
          <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-saffaron border-r-castletonGreen animate-spin" />
        </div>
        
        {/* Loading Text */}
        {message && (
          <div className="text-center">
            <p className="text-darkSerpent font-medium text-lg">{message}</p>
            <div className="flex gap-1 mt-3 justify-center">
              <span className="w-2 h-2 bg-saffaron rounded-full animate-bounce" style={{ animationDelay: '0s' }} />
              <span className="w-2 h-2 bg-castletonGreen rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
              <span className="w-2 h-2 bg-lightGreen rounded-full animate-bounce" style={{ animationDelay: '0.4s' }} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

  // Overlay loading (semi-transparent with content underneath)
  if (variant === 'overlay') {
    return (
      <div className="fixed inset-0 bg-darkSerpent/30 backdrop-blur-sm flex items-center justify-center z-40">
        <div className="bg-white rounded-2xl p-8 shadow-2xl flex flex-col items-center gap-6">
          {/* Animated Spinner */}
          <div className="relative w-16 h-16">
            <div className="absolute inset-0 rounded-full border-4 border-saffaron/20" />
            <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-saffaron border-r-castletonGreen animate-spin" />
          </div>
          
          {/* Loading Text */}
          {message && (
            <p className="text-darkSerpent font-medium text-base">{message}</p>
          )}
        </div>
      </div>
    );
  }

  // Skeleton variant - reusable placeholder for content
  if (variant === 'skeleton') {
    return (
      <div className="space-y-4 p-6">
        {/* Skeleton Header */}
        <div className="h-8 bg-gradient-to-r from-saffaron/20 to-castletonGreen/20 rounded-lg animate-pulse" />
        
        {/* Skeleton Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="space-y-3 p-4 bg-seaSalt rounded-lg">
              <div className="h-4 bg-gradient-to-r from-saffaron/20 to-castletonGreen/20 rounded animate-pulse" />
              <div className="h-6 bg-gradient-to-r from-saffaron/20 to-castletonGreen/20 rounded animate-pulse" />
              <div className="h-3 bg-gradient-to-r from-saffaron/10 to-castletonGreen/10 rounded animate-pulse" />
            </div>
          ))}
        </div>

        {/* Skeleton Table */}
        <div className="space-y-2 pt-4">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="h-12 bg-gradient-to-r from-saffaron/20 to-castletonGreen/20 rounded-lg animate-pulse" />
          ))}
        </div>
      </div>
    );
  }
  
  if (variant === 'modal') {
    return (
      <div className="flex items-center justify-center gap-4 py-4 px-6 bg-white rounded-xl shadow-lg border border-seaSalt">
        {/* Smaller Spinner */}
        <div className="relative w-6 h-6">
          <div className="absolute inset-0 rounded-full border-2 border-saffaron/20" />
          <div className="absolute inset-0 rounded-full border-2 border-transparent border-t-saffaron border-r-castletonGreen animate-spin" />
        </div>
        
        {/* Compact Text */}
        {message && (
          <p className="text-darkSerpent/70 font-semibold text-sm">{message}</p>
        )}
      </div>
    );
  }
}



/**
 * SkeletonLoader Component - Lightweight skeleton placeholder
 * Use this for individual sections that are loading
 */
export function SkeletonLoader({ 
  count = 3,
  type = 'card' 
}: { 
  count?: number;
  type?: 'card' | 'line' | 'avatar';
}) {
  if (type === 'card') {
    return (
      <div className="space-y-3">
        {Array.from({ length: count }).map((_, i) => (
          <div key={i} className="p-4 bg-seaSalt rounded-lg space-y-3">
            <div className="h-4 bg-gradient-to-r from-saffaron/20 to-castletonGreen/20 rounded animate-pulse" />
            <div className="h-6 bg-gradient-to-r from-saffaron/20 to-castletonGreen/20 rounded animate-pulse w-3/4" />
            <div className="h-3 bg-gradient-to-r from-saffaron/10 to-castletonGreen/10 rounded animate-pulse" />
          </div>
        ))}
      </div>
    );
  }

  if (type === 'line') {
    return (
      <div className="space-y-2">
        {Array.from({ length: count }).map((_, i) => (
          <div key={i} className="h-4 bg-gradient-to-r from-saffaron/20 to-castletonGreen/20 rounded animate-pulse" />
        ))}
      </div>
    );
  }

  if (type === 'avatar') {
    return (
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 bg-gradient-to-r from-saffaron/20 to-castletonGreen/20 rounded-full animate-pulse" />
        <div className="space-y-2 flex-1">
          <div className="h-4 bg-gradient-to-r from-saffaron/20 to-castletonGreen/20 rounded animate-pulse w-3/4" />
          <div className="h-3 bg-gradient-to-r from-saffaron/10 to-castletonGreen/10 rounded animate-pulse w-1/2" />
        </div>
      </div>
    );
  }
}