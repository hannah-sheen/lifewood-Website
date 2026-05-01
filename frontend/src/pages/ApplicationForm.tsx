import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  User, Mail, Phone, MapPin, Calendar, Search, 
  Upload, X, Briefcase, Globe, ArrowLeft, 
  ArrowRight, CheckCircle2 
} from 'lucide-react';
import Button from '../components/Button.tsx';

const POSITION_OPTIONS = [
  "Casual Video Models (Video Data Collection)", "Moderator & Voice Participants (Voice Data Collection)",
  "Data Annotator (Iphone User)", "Image Data Collector (Capturing Text - Rich Items)",
  "Data Curation (Genealogy Project)", "Voice Recording Participants (Short Sentences Recording)",
  "Text Data Collector (Gemini User)", "Voice Recording Participants (FaceTime Audio Recording Session)",
  "Image Data Collector (Capturing Home Dishes and Menu)", "Al Video Creator/Editor",
  "Genealogy Project Team Leader", "Data Scraper/Crawler (Int'l Text)",
  "Social Media Content Marketing", "Admin Accounting", "HR/Admin Assistant",
  "Marketing & Sales Executive", "Operation Manager", "All of the Above",
  "Intern (Applicable to PH Only)"
];

const STEPS = [
  { id: 1, label: 'Profile', description: 'Personal details' },
  { id: 2, label: 'Contact', description: 'Reach & Location' },
  { id: 3, label: 'Roles', description: 'Position & Resume' }
];

export default function ApplicationForm() {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedPositions, setSelectedPositions] = useState<string[]>([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const nextStep = () => setCurrentStep(prev => Math.min(prev + 1, STEPS.length));
  const prevStep = () => setCurrentStep(prev => Math.max(prev - 1, 1));

  const togglePosition = (pos: string) => {
    setSelectedPositions(prev => 
      prev.includes(pos) ? prev.filter(p => p !== pos) : [...prev, pos]
    );
  };

    return (
        <div className="w-full">
            {/* PROGRESS INDICATOR */}
            <div className="mb-12 flex justify-between items-center relative px-2">
                <div className="absolute top-1/2 left-0 w-full h-0.5 bg-darkSerpent/5 -translate-y-1/2 z-0" />
                <motion.div className="absolute top-1/2 left-0 h-0.5 bg-saffaron -translate-y-1/2 z-0 transition-all duration-500"
                style={{ width: `${((currentStep - 1) / (STEPS.length - 1)) * 100}%` }}
                />
                
                {STEPS.map((step) => (
                <div key={step.id} className="relative z-10 flex flex-col items-center">
                    <motion.div 
                    animate={{ 
                        backgroundColor: currentStep >= step.id ? '#F4B043' : '#FFFFFF',
                        scale: currentStep === step.id ? 1.1 : 1
                    }}
                    className={`w-9 h-9 rounded-full border-4 flex items-center justify-center transition-colors ${
                        currentStep >= step.id ? 'border-saffaron shadow-lg shadow-saffaron/10' : 'border-white text-darkSerpent/20'
                    }`}
                    >
                    {currentStep > step.id ? <CheckCircle2 className="w-4 h-4 text-darkSerpent" /> : <span className="font-black text-xs">{step.id}</span>}
                    </motion.div>
                    <div className="absolute top-11 whitespace-nowrap text-center">
                    <p className={`text-[9px] font-black uppercase tracking-widest ${currentStep >= step.id ? 'text-darkSerpent' : 'text-darkSerpent/20'}`}>{step.label}</p>
                    </div>
                </div>
                ))}
            </div>

            <form className="space-y-3" onSubmit={(e) => e.preventDefault()}>
                <AnimatePresence mode="wait">
                    {currentStep === 1 && (
                        <motion.div 
                        key="step1"
                        initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -10 }}
                        className="space-y-6"
                        >
                        <div>
                            <h2 className="text-3xl font-bold tracking-tighter text-darkSerpent">Personal Profile</h2>
                            <p className="text-darkSerpent/40 text-sm italic">Tell us a bit about yourself.</p>
                        </div>
                        <div className="grid md:grid-cols-2 gap-4">
                            <InputField label="First Name" icon={<User />} placeholder="John" />
                            <InputField label="Last Name" icon={<User />} placeholder="Doe" />
                        </div>
                        <div className="grid md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                            <label className="text-[10px] font-black uppercase tracking-widest text-darkSerpent/40 ml-2">Gender</label>
                                <div className="flex gap-3">
                                    {['Male', 'Female', 'Other'].map((g) => (
                                    <label key={g} className="flex-1 cursor-pointer">
                                        <input type="radio" name="gender" className="hidden peer" />
                                        <div className="py-3 text-center bg-seaSalt rounded-xl border border-transparent peer-checked:border-saffaron peer-checked:bg-white transition-all text-xs font-bold text-darkSerpent/40 peer-checked:text-darkSerpent">
                                        {g}
                                        </div>
                                    </label>
                                    ))}
                                </div>
                            </div>
                            <InputField label="Birth Date" icon={<Calendar />} type="date" />
                        </div>
                        </motion.div>
                    )}

                    {currentStep === 2 && (
                        <motion.div 
                        key="step2"
                        initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -10 }}
                        className="space-y-6"
                        >
                        <div>
                            <h2 className="text-3xl font-bold tracking-tighter text-darkSerpent">Contact & Location</h2>
                            <p className="text-darkSerpent/40 text-sm italic">How can we reach you?</p>
                        </div>
                        <div className="grid md:grid-cols-2 gap-4">
                            <InputField label="Email Address" icon={<Mail />} placeholder="john@example.com" type="email" />
                            <InputField label="Phone Number" icon={<Phone />} placeholder="+63 900 000 0000" />
                        </div>
                        <div className="grid md:grid-cols-3 gap-4">
                            <InputField label="Country" icon={<Globe />} placeholder="Philippines" />
                            <div className="md:col-span-2">
                            <InputField label="Full Address" icon={<MapPin />} placeholder="Unit #, Building, Street, City" />
                            </div>
                        </div>
                        </motion.div>
                    )}

                    {currentStep === 3 && (
                        <motion.div 
                        key="step3"
                        initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -10 }}
                        className="space-y-6"
                        >
                        <div>
                            <h2 className="text-3xl font-bold tracking-tighter text-darkSerpent">Application Details</h2>
                            <p className="text-darkSerpent/40 text-sm italic">Select roles and upload your CV.</p>
                        </div>
                        
                        <div className="space-y-2 relative">
                        <label className="text-[10px] font-black uppercase tracking-widest text-darkSerpent/40 ml-2">Applied Position(s)</label>
            
                        <div 
                            onClick={() => setIsDropdownOpen(!isDropdownOpen)} 
                            className="w-full min-h-[56px] p-4 bg-seaSalt rounded-2xl flex flex-wrap gap-2 items-center cursor-pointer border-2 border-transparent hover:border-saffaron transition-all"
                        >
                        <Briefcase className="w-4 h-4 text-saffaron mr-2" />
                        {selectedPositions.length === 0 ? (
                        <span className="text-darkSerpent/30 text-sm">Select positions...</span>
                        ) : (
                        selectedPositions.map(pos => (
                            <span key={pos} className="bg-darkSerpent text-white text-[9px] font-bold px-3 py-1.5 rounded-full flex items-center gap-2">
                            {pos} 
                            <X 
                                className="w-3 h-3 text-saffaron" 
                                onClick={(e) => { e.stopPropagation(); togglePosition(pos); }} 
                            />
                            </span>
                        ))
                        )}
                        </div>

                        {/* FIXED DROPDOWN POSITIONING */}
                        <AnimatePresence>
                            {isDropdownOpen && (
                                <motion.div 
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                /* Changed from bottom-full to top-full to open downwards */
                                className="absolute top-full mt-2 z-[300] w-full bg-white rounded-3xl shadow-2xl border border-darkSerpent/10 overflow-hidden"
                                >
                                <div className="p-4 border-b flex items-center gap-3 bg-white">
                                    <Search className="w-4 h-4 text-darkSerpent/30" />
                                    <input 
                                    placeholder="Search roles..." 
                                    className="w-full outline-none text-sm" 
                                    onChange={(e) => setSearchTerm(e.target.value)} 
                                    autoFocus
                                    />
                                </div>
                                <div className="max-h-60 overflow-y-auto p-2 bg-white">
                                        {POSITION_OPTIONS.filter(p => p.toLowerCase().includes(searchTerm.toLowerCase())).map(pos => (
                                            <div 
                                            key={pos} 
                                            onClick={() => togglePosition(pos)} 
                                            className="flex items-center gap-3 p-3 rounded-xl hover:bg-seaSalt cursor-pointer transition-colors"
                                            >
                                            <div className={`w-4 h-4 rounded border transition-colors ${
                                                selectedPositions.includes(pos) ? 'bg-saffaron border-saffaron' : 'border-darkSerpent/20'
                                            }`}>
                                                {selectedPositions.includes(pos) && <CheckCircle2 className="w-3 h-3 text-darkSerpent mx-auto" />}
                                            </div>
                                            <span className="text-xs font-bold text-darkSerpent/70">{pos}</span>
                                            </div>
                                        ))}
                                        </div>
                                    </motion.div>
                                    )}
                            </AnimatePresence>
                        </div>

                            <div onClick={() => fileInputRef.current?.click()} className="border-2 border-dashed border-darkSerpent/10 rounded-[2rem] p-8 text-center hover:bg-seaSalt transition-all cursor-pointer group">
                                <input type="file" ref={fileInputRef} className="hidden" onChange={(e) => setFile(e.target.files?.[0] || null)} />
                                <Upload className="w-6 h-6 text-saffaron mx-auto mb-2" />
                                <p className="text-xs font-bold text-darkSerpent">{file ? file.name : "Upload Resume (PDF)"}</p>
                            </div>
                            </motion.div>
                    )}
                </AnimatePresence>

                {/* NAVIGATION BUTTONS */}
                <div className="flex gap-4 pt-4">
                  {currentStep > 1 && (
                    <Button type="button" onClick={prevStep} variant="outline" className="flex-1 py-4 rounded-2xl text-sm">
                      <ArrowLeft className="w-4 h-4" /> Back
                    </Button>
                  )}
                  {currentStep < 3 ? (
                    <Button type="button" onClick={nextStep} className="flex-[2] py-4 rounded-2xl text-sm">
                      Next Step <ArrowRight className="w-4 h-4" />
                    </Button>
                  ) : (
                    <Button type="submit" className="flex-[2] py-4 rounded-2xl text-sm shadow-xl">
                      Submit Application
                    </Button>
                  )}
                </div>
            </form>
        </div>
    );
}

function InputField({ label, icon, ...props }: any) {
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