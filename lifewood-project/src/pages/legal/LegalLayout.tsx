import type { ReactNode } from 'react';

interface LegalLayoutProps {
  icon: ReactNode;
  title: string;
  children: ReactNode;
}

export default function LegalLayout({ icon, title, children }: LegalLayoutProps) {
  return (
    <div className="min-h-screen bg-seaSalt">
      {/* Hero */}
      <div className="bg-darkSerpent text-white pt-24 pb-10">
        <div className="max-w-3xl mx-auto px-6">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2.5 rounded-xl bg-saffaron/10 text-saffaron">{icon}</div>
            <span className="text-xs font-black uppercase tracking-[0.2em] text-white/30">Legal</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight">{title}</h1>
        </div>
      </div>

      {/* Saffron bar */}
      <div className="h-1 bg-saffaron" />

      {/* Content */}
      <div className="max-w-3xl mx-auto px-6 py-16">
        <div className="prose-legal">
          {children}
        </div>
      </div>
    </div>
  );
}
