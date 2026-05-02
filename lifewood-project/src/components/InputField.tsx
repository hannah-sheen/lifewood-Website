export default function InputField({ label, icon, ...props }: any) {
  return (
    <div className="space-y-2">
      <label className="text-[10px] font-black uppercase tracking-widest text-darkSerpent/40 ml-2">{label}</label>
      <div className="relative">
        <div className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-saffaron opacity-70">{icon}</div>
        <input {...props} className="w-full pl-11 pr-4 py-3.5 bg-seaSalt rounded-2xl border-none focus:ring-2 focus:ring-saffaron/50 transition-all outline-none text-sm font-medium" />
      </div>
    </div>
  );
}