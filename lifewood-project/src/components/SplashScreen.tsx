import lifewoodLogo from '../assets/lifewood-logo.avif';

export default function SplashScreen({ progress }: { progress: number }) {
  // Text fades out early
  const textOpacity = Math.max(1 - progress * 4, 0);

  return (
    <div className="flex flex-col items-center justify-center text-center px-6 gap-8">
      {/* Logo stays 100% visible */}
      <img src={lifewoodLogo} alt="Lifewood" className="h-10 w-auto brightness-0 invert" />
      
      <div style={{ opacity: textOpacity }} className="space-y-4 transition-opacity">
        <h1 className="text-5xl font-semibold text-white tracking-tight">Welcome to Lifewood</h1>
        <p className="text-white/50 text-lg">Scroll to explore</p>
      </div>
    </div>
  );
}