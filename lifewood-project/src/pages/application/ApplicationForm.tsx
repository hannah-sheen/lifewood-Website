import { useState, useRef, useEffect } from 'react';
import type { ChangeEvent } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { User, Mail, MapPin, Calendar, Search, Upload, X, Briefcase, ArrowLeft, ArrowRight, CheckCircle2, ChevronDown } from 'lucide-react';
import Button from '../../components/Button.tsx';
import InputField from '../../components/InputField.tsx';
import { submitApplication, sendApplicationConfirmation } from './applicationServices.tsx';
import type { ApplicationFormData } from '../types';
import { fetchAvailablePositions } from '../position/positionService.tsx';
import type { Position } from '../types';
import { showSuccessToast, showErrorToast } from '../../components/Toast.tsx';

const COUNTRY_OPTIONS = [
  { code: "+1", name: "US/Canada"},
  { code: "+44", name: "UK"},
  { code: "+63", name: "Philippines"},
  { code: "+86", name: "China" },
  { code: "+91", name: "India"},
  { code: "+81", name: "Japan"},
  { code: "+61", name: "Australia"},
  { code: "+49", name: "Germany"},
  { code: "+33", name: "France"}
];

const STEPS = [
  { id: 1, label: 'Profile', description: 'Personal details' },
  { id: 2, label: 'Contact', description: 'Reach & Location' },
  { id: 3, label: 'Roles', description: 'Position & Resume' }
];

export default function ApplicationForm({ onSuccess }: { onSuccess?: () => void }) {
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [selectedPositions, setSelectedPositions] = useState<Position[]>([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
  const [isPhoneDropdownOpen, setIsPhoneDropdownOpen] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [phoneSearchTerm, setPhoneSearchTerm] = useState<string>('');
  const [file, setFile] = useState<File | null>(null);
  const [selectedCountry, setSelectedCountry] = useState<{ code: string; name: string}>(COUNTRY_OPTIONS[2]);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [positions, setPositions] = useState<Position[]>([]);
  const [loadingPositions, setLoadingPositions] = useState<boolean>(true);
  
  // Single form data object
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    gender: '',
    birthDate: '',
    email: '',
    phoneNumber: '',
    address: ''
  });
  
  // Validation errors for step 1 and 2 only
  const [step1Errors, setStep1Errors] = useState({
    firstName: '',
    lastName: '',
    gender: '',
    birthDate: ''
  });
  const [step2Errors, setStep2Errors] = useState({
    email: '',
    phoneNumber: '',
    address: ''
  });
  // Track which validations have been triggered
  const [validationsTriggered, setValidationsTriggered] = useState({
    step1: false,
    step2: false,
    step3: false
  });
  
  const fileInputRef = useRef<HTMLInputElement>(null);
  const phoneContainerRef = useRef<HTMLDivElement>(null);

  // Fetch positions
  useEffect(() => {
    const loadPositions = async () => {
      try {
        const data = await fetchAvailablePositions();
        setPositions(data || []);
      } catch (error) {
        console.error('Failed to load positions:', error);
        showErrorToast('Failed to load positions. Please refresh the page.');
      } finally {
        setLoadingPositions(false);
      }
    };
    loadPositions();
  }, []);

  // Generic input handler
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error when user types
    if (step1Errors[name as keyof typeof step1Errors]) {
      setStep1Errors(prev => ({ ...prev, [name]: '' }));
    }
    if (step2Errors[name as keyof typeof step2Errors]) {
      setStep2Errors(prev => ({ ...prev, [name]: '' }));
    }
  };

  // Validate Step 1
  const validateStep1 = (): boolean => {
    const errors = { firstName: '', lastName: '', gender: '', birthDate: '' };
    let isValid = true;

    if (!formData.firstName.trim()) {
      errors.firstName = 'First name is required';
      isValid = false;
    }
    if (!formData.lastName.trim()) {
      errors.lastName = 'Last name is required';
      isValid = false;
    }
    if (!formData.gender) {
      errors.gender = 'Please select your gender';
      isValid = false;
    }
    if (!formData.birthDate) {
      errors.birthDate = 'Birth date is required';
      isValid = false;
    } else {
      const age = new Date().getFullYear() - new Date(formData.birthDate).getFullYear();
      if (age < 18) {
        errors.birthDate = 'You must be at least 18 years old';
        isValid = false;
      }
    }

    setStep1Errors(errors);
    return isValid;
  };

  // Validate Step 2
  const validateStep2 = (): boolean => {
    const errors = { email: '', phoneNumber: '', address: '' };
    let isValid = true;

    if (!formData.email.trim()) {
      errors.email = 'Email is required';
      isValid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = 'Enter a valid email';
      isValid = false;
    }
    if (!formData.phoneNumber.trim()) {
      errors.phoneNumber = 'Phone number is required';
      isValid = false;
    }
    if (!formData.address.trim()) {
      errors.address = 'Address is required';
      isValid = false;
    }

    setStep2Errors(errors);
    return isValid; 
  };

  const nextStep = (): void => {
    let isValid = false;
    if (currentStep === 1) {
      setValidationsTriggered(prev => ({ ...prev, step1: true }));
      isValid = validateStep1();
      if (isValid) setCurrentStep(prev => Math.min(prev + 1, STEPS.length));
    } else if (currentStep === 2) {
      setValidationsTriggered(prev => ({ ...prev, step2: true }));
      isValid = validateStep2();
      if (isValid) {
        setCurrentStep(prev => Math.min(prev + 1, STEPS.length));
      }
    }
  };

  const prevStep = (): void => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
    setValidationsTriggered({
      step1: false,
      step2: false,
      step3: false
    });
    setStep1Errors({ firstName: '', lastName: '', gender: '', birthDate: '' });
    setStep2Errors({ email: '', phoneNumber: '', address: '' });
  };

  const togglePosition = (position: Position): void => {
    setSelectedPositions(prev => 
      prev.some(p => p.id === position.id) 
        ? prev.filter(p => p.id !== position.id) 
        : [...prev, position]
    );
  };

  // Select All positions
  const selectAllPositions = (): void => {
    if (selectedPositions.length === positions.length) {
      setSelectedPositions([]);
    } else {
      setSelectedPositions([...positions]);
    }
  };

  const selectCountry = (country: typeof COUNTRY_OPTIONS[0]): void => {
    setSelectedCountry(country);
    setIsPhoneDropdownOpen(false);
    setPhoneSearchTerm('');
  };

  const filteredPhoneCountries = COUNTRY_OPTIONS.filter(country =>
    country.name.toLowerCase().includes(phoneSearchTerm.toLowerCase()) ||
    country.code.includes(phoneSearchTerm)
  );

  const filteredPositions = positions.filter(position =>
    position.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setFile(e.target.files?.[0] || null);
  };
  
  const handleSubmitButton = async () => {
    setValidationsTriggered(prev => ({ ...prev, step3: true }));
    
    const isStep1Valid = validateStep1();
    const isStep2Valid = validateStep2();
    const isStep3Valid = selectedPositions.length > 0 && file !== null;
    
    if (!isStep1Valid) {
      setValidationsTriggered(prev => ({ ...prev, step1: true }));
      setCurrentStep(1);
      return;
    }
    
    if (!isStep2Valid) {
      setValidationsTriggered(prev => ({ ...prev, step2: true }));
      setCurrentStep(2);
      return;
    }
    
    if (!isStep3Valid) {
      setCurrentStep(3);
      return;
    }
    
    setIsSubmitting(true);
    
    const applicationData: ApplicationFormData = {
      fname: formData.firstName,
      lname: formData.lastName,
      gender: formData.gender,
      dob: formData.birthDate,
      email: formData.email,
      phone: formData.phoneNumber,
      address: formData.address,
      country: selectedCountry.code,
      positions: selectedPositions.map(p => p.title),
      resumeFile: file as File
    };
    
    try {
      const result = await submitApplication(applicationData);
      
      if (result?.success) {
        // Reset form first
        setCurrentStep(1);
        setFormData({
          firstName: '', lastName: '', gender: '', birthDate: '',
          email: '', phoneNumber: '', address: ''
        });
        setSelectedPositions([]);
        setFile(null);
        setValidationsTriggered({ step1: false, step2: false, step3: false });
        setStep1Errors({ firstName: '', lastName: '', gender: '', birthDate: '' });
        setStep2Errors({ email: '', phoneNumber: '', address: '' });
        
        if (onSuccess) onSuccess();

        // Send confirmation email (non-blocking)
        sendApplicationConfirmation(
          `${formData.firstName} ${formData.lastName}`,
          formData.email,
          result.submittedPositions.map(p => p.title),
          result.submittedPositions.map(p => p.id)
        );

        showSuccessToast(
          result.isExistingApplicant
            ? 'Additional applications submitted successfully!'
            : 'Application submitted successfully! Check your email for confirmation.'
        );
      }
    } catch (error) {
      console.error('Submission error:', error);
      const errorMessage = error instanceof Error ? error.message : 'Failed to submit application';
      showErrorToast(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      {/* PROGRESS INDICATOR */}
     <div className="mb-14 flex justify-between items-center relative pt-2">
        <div className="absolute top-1/2 left-0 w-full h-0.5 bg-darkSerpent/5 -translate-y-1/2 z-0" />
        <motion.div 
          className="absolute top-1/2 left-0 h-0.5 bg-saffaron -translate-y-1/2 z-0 transition-all duration-500"
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
            <div className="absolute top-11 left-1/2 -translate-x-1/2 whitespace-nowrap text-center">
              <p className={`text-[9px] font-black uppercase tracking-widest ${currentStep >= step.id ? 'text-darkSerpent' : 'text-darkSerpent/20'}`}>{step.label}</p>
            </div>
          </div>
        ))}
      </div>

      <form 
        className="space-y-3" 
        onKeyDown={(e) => {
          if (e.key === 'Enter' && e.target instanceof HTMLInputElement && e.target.type !== 'submit') {
            e.preventDefault();
          }
        }}
      >
        <AnimatePresence mode="wait">
          {/* STEP 1 - PROFILE */}
          {currentStep === 1 && (
            <motion.div 
              key="step1"
              initial={{ opacity: 0, x: 10 }} 
              animate={{ opacity: 1, x: 0 }} 
              exit={{ opacity: 0, x: -10 }}
              className="space-y-6"
            >
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <InputField 
                    name="firstName"
                    label="First Name" 
                    icon={<User />} 
                    placeholder="John" 
                    value={formData.firstName}
                    onChange={handleInputChange}
                    required
                  />
                  {validationsTriggered.step1 && step1Errors.firstName && <p className="text-red-500 text-[10px] ml-2">{step1Errors.firstName}</p>}
                </div>
                <div className="space-y-1">
                  <InputField 
                    name="lastName"
                    label="Last Name" 
                    icon={<User />} 
                    placeholder="Doe" 
                    value={formData.lastName}
                    onChange={handleInputChange}
                    required
                  />
                  {validationsTriggered.step1 && step1Errors.lastName && <p className="text-red-500 text-[10px] ml-2">{step1Errors.lastName}</p>}
                </div>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-darkSerpent/40 ml-2">Gender <span className="text-red-500">*</span></label>
                  <div className="flex gap-3">
                    {['Male', 'Female'].map((g) => (
                      <label key={g} className="flex-1 cursor-pointer">
                        <input 
                          type="radio" 
                          name="gender" 
                          value={g}
                          checked={formData.gender === g}
                          onChange={handleInputChange}
                          className="hidden peer" 
                        />
                        <div className={`py-3 text-center bg-seaSalt rounded-xl border transition-all text-xs font-bold ${
                          formData.gender === g 
                            ? 'border-saffaron bg-white text-darkSerpent' 
                            : 'border-transparent text-darkSerpent/40'
                        }`}>
                          {g}
                        </div>
                      </label>
                    ))}
                  </div>
                  {validationsTriggered.step1 && step1Errors.gender && <p className="text-red-500 text-[10px] ml-2">{step1Errors.gender}</p>}
                </div>
                <div className="space-y-1">
                  <InputField 
                    name="birthDate"
                    label="Birth Date" 
                    icon={<Calendar />} 
                    type="date" 
                    value={formData.birthDate}
                    onChange={handleInputChange}
                    required
                  />
                  {validationsTriggered.step1 && step1Errors.birthDate && <p className="text-red-500 text-[10px] ml-2">{step1Errors.birthDate}</p>}
                </div>
              </div>
            </motion.div>
          )}

          {/* STEP 2 - CONTACT */}
          {currentStep === 2 && (
            <motion.div 
                key="step2"
                initial={{ opacity: 0, x: 10 }} 
                animate={{ opacity: 1, x: 0 }} 
                exit={{ opacity: 0, x: -10 }}
                className="space-y-6"
            >
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <InputField 
                      name="email"
                      label="Email Address" 
                      icon={<Mail />} 
                      placeholder="john@example.com" 
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                    />
                    {validationsTriggered.step2 && step2Errors.email && <p className="text-red-500 text-[10px] ml-2">{step2Errors.email}</p>}
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-darkSerpent/40 ml-2">
                      Phone Number <span className="text-red-500">*</span>
                    </label>
                    
                    <div className="flex gap-2 items-center" ref={phoneContainerRef}>
                      <button
                        type="button"
                        onClick={() => setIsPhoneDropdownOpen(!isPhoneDropdownOpen)}
                        className="flex items-center gap-2 px-4 h-[52px] bg-seaSalt rounded-2xl text-sm font-medium hover:bg-seaSalt/80 transition-colors whitespace-nowrap"
                      >
                        <span>{selectedCountry.code}</span>
                        <ChevronDown className={`w-4 h-4 transition-transform ${isPhoneDropdownOpen ? 'rotate-180' : ''}`} />
                      </button>

                      <input
                        name="phoneNumber"
                        type="tel"
                        placeholder="912 345 6789"
                        className="flex-1 h-[52px] px-4 bg-seaSalt rounded-2xl border-none focus:ring-2 focus:ring-saffaron/50 transition-all outline-none text-sm font-medium"
                        value={formData.phoneNumber}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    {validationsTriggered.step2 && step2Errors.phoneNumber && <p className="text-red-500 text-[10px] ml-2">{step2Errors.phoneNumber}</p>}

                    <AnimatePresence>
                      {isPhoneDropdownOpen && (
                        <>
                          <div className="fixed inset-0 z-[299]" onClick={() => setIsPhoneDropdownOpen(false)} />
                          <motion.div
                              initial={{ opacity: 0, y: -10 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: -10 }}
                              className="fixed z-[300] w-64 bg-white rounded-3xl shadow-2xl border border-darkSerpent/10 overflow-hidden"
                              style={{
                                top: phoneContainerRef.current ? phoneContainerRef.current.getBoundingClientRect().bottom + 8 : 0,
                                left: phoneContainerRef.current ? phoneContainerRef.current.getBoundingClientRect().left : 0
                              }}
                          >
                              <div className="p-3 border-b border-gray-100">
                                <div className="relative">
                                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-darkSerpent/30" />
                                  <input
                                    type="text"
                                    placeholder="Search..."
                                    className="w-full pl-9 pr-3 py-2 bg-seaSalt rounded-xl text-sm outline-none"
                                    value={phoneSearchTerm}
                                    onChange={(e) => setPhoneSearchTerm(e.target.value)}
                                    autoFocus
                                  />
                                </div>
                              </div>
                              <div className="max-h-60 overflow-y-auto">
                                {filteredPhoneCountries.map((country) => (
                                  <button
                                    key={country.code}
                                    type="button"
                                    onClick={() => selectCountry(country)}
                                    className="w-full flex items-center gap-3 px-4 py-3 hover:bg-seaSalt transition-colors text-left"
                                  >
                                    <span className="text-sm font-bold">{country.code}</span>
                                    <span className="text-sm text-darkSerpent">{country.name}</span>
                                  </button>
                                ))}
                              </div>
                          </motion.div>
                        </>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
                
                <div className="grid md:grid-cols-1 gap-4">
                  <div className="space-y-1">
                    <InputField 
                      name="address"
                      label="Full Address" 
                      icon={<MapPin />} 
                      placeholder="Unit #, Building, Street, City, Province" 
                      value={formData.address}
                      onChange={handleInputChange}
                      required
                    />
                    {validationsTriggered.step2 && step2Errors.address && <p className="text-red-500 text-[10px] ml-2">{step2Errors.address}</p>}
                  </div>
                </div>
            </motion.div>
          )}

          {/* STEP 3 - APPLICATION DETAILS */}
          {currentStep === 3 && (
            <motion.div 
              key="step3"
              initial={{ opacity: 0, x: 10 }} 
              animate={{ opacity: 1, x: 0 }} 
              exit={{ opacity: 0, x: -10 }}
              className="space-y-6"
            >
              <div className="space-y-2 relative">
                <label className="text-[10px] font-black uppercase tracking-widest text-darkSerpent/40 ml-2">
                  Applied Position(s) <span className="text-red-500">*</span>
                </label>
                
                <div 
                  onClick={() => !loadingPositions && setIsDropdownOpen(!isDropdownOpen)} 
                  className={`w-full min-h-[56px] p-4 bg-seaSalt rounded-2xl flex flex-wrap gap-2 items-center cursor-pointer border-2 transition-all ${
                    validationsTriggered.step3 && selectedPositions.length === 0 ? 'border-red-500' : 'hover:border-saffaron border-transparent'
                  }`}
                >
                  <Briefcase className="w-4 h-4 text-saffaron mr-2" />
                  {loadingPositions ? (
                    <span className="text-darkSerpent/30 text-sm">Loading positions...</span>
                  ) : selectedPositions.length === 0 ? (
                    <span className="text-darkSerpent/30 text-sm">Select positions...</span>
                  ) : (
                    selectedPositions.map(pos => (
                      <span key={pos.id} className="bg-darkSerpent text-white text-[9px] font-bold px-3 py-1.5 rounded-full flex items-center gap-2">
                        {pos.title.length > 30 ? pos.title.substring(0, 27) + '...' : pos.title}
                        <X 
                          className="w-3 h-3 text-saffaron cursor-pointer" 
                          onClick={(e) => { e.stopPropagation(); togglePosition(pos); }} 
                        />
                      </span>
                    ))
                  )}
                </div>
                {validationsTriggered.step3 && selectedPositions.length === 0 && (
                  <p className="text-red-500 text-[10px] ml-2">Please select at least one position</p>
                )}

                <AnimatePresence>
                  {isDropdownOpen && !loadingPositions && (
                    <motion.div 
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="absolute top-full mt-2 z-[300] w-full bg-white rounded-3xl shadow-2xl border border-darkSerpent/10 overflow-hidden"
                    >
                      <div className="p-4 border-b flex items-center gap-3 bg-white">
                        <Search className="w-4 h-4 text-darkSerpent/30" />
                        <input 
                          placeholder="Search positions..." 
                          className="w-full outline-none text-sm" 
                          onChange={(e) => setSearchTerm(e.target.value)} 
                          autoFocus
                        />
                      </div>
                      <div className="max-h-60 overflow-y-auto p-2 bg-white">
                        {positions.length > 0 && (
                          <div 
                            onClick={selectAllPositions}
                            className="flex items-center gap-3 p-3 rounded-xl hover:bg-saffaron/10 cursor-pointer transition-colors border-b border-darkSerpent/10 mb-2"
                          >
                            <div className={`w-4 h-4 rounded border transition-colors flex items-center justify-center ${
                              selectedPositions.length === positions.length 
                                ? 'bg-saffaron border-saffaron' 
                                : 'border-darkSerpent/20'
                            }`}>
                              {selectedPositions.length === positions.length && <CheckCircle2 className="w-3 h-3 text-darkSerpent" />}
                            </div>
                            <span className="text-xs font-bold text-saffaron">Select All ({positions.length} positions)</span>
                          </div>
                        )}
                        
                        {filteredPositions.length === 0 ? (
                          <div className="text-center py-8 text-darkSerpent/40 text-sm">
                            No positions found
                          </div>
                        ) : (
                          filteredPositions.map((position) => (
                            <div 
                              key={position.id} 
                              onClick={() => togglePosition(position)} 
                              className="flex items-center gap-3 p-3 rounded-xl hover:bg-seaSalt cursor-pointer transition-colors"
                            >
                              <div className={`w-4 h-4 rounded border transition-colors ${
                                selectedPositions.some(p => p.id === position.id) 
                                  ? 'bg-saffaron border-saffaron' 
                                  : 'border-darkSerpent/20'
                              }`}>
                                {selectedPositions.some(p => p.id === position.id) && <CheckCircle2 className="w-3 h-3 text-darkSerpent mx-auto" />}
                              </div>
                              <div className="flex-1">
                                <span className="text-xs font-bold text-darkSerpent/80">{position.title}</span>
                                <p className="text-[9px] text-darkSerpent/40 mt-0.5 line-clamp-1">{position.description}</p>
                              </div>
                            </div>
                          ))
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <div 
                onClick={() => fileInputRef.current?.click()} 
                className={`border-2 border-dashed rounded-[2rem] p-8 text-center hover:bg-seaSalt transition-all cursor-pointer group ${
                  validationsTriggered.step3 && !file ? 'border-red-500' : 'border-darkSerpent/10'
                }`}
              >
                <input 
                  type="file" 
                  ref={fileInputRef} 
                  className="hidden" 
                  onChange={handleFileChange} 
                  accept=".pdf,.doc,.docx" 
                  required 
                />
                <Upload className="w-6 h-6 text-saffaron mx-auto mb-2 group-hover:scale-110 transition-transform" />
                <p className="text-xs font-bold text-darkSerpent">{file ? file.name : "Upload Resume (PDF, DOC, DOCX)"}</p>
                {file && (
                  <p className="text-[10px] text-darkSerpent/40 mt-1">
                    {(file.size / 1024).toFixed(1)} KB
                  </p>
                )}
                {validationsTriggered.step3 && !file && (
                  <p className="text-red-500 text-[10px] mt-2">Please upload your resume</p>
                )}
              </div>
            </motion.div>
          )}
       
        </AnimatePresence>

        {/* BUTTONS - Added directly here */}
        <div className="flex gap-4 pt-8 mt-4 border-darkSerpent/10">
          {currentStep > 1 && (
            <Button type="button" onClick={prevStep} variant="outline" className="flex-1 py-4 rounded-2xl text-sm" disabled={isSubmitting}>
              <ArrowLeft className="w-4 h-4" /> Back
            </Button>
          )}
          {currentStep < 3 ? (
            <Button type="button" onClick={nextStep} className="flex-1 py-4 rounded-2xl text-sm" disabled={isSubmitting}>
              Next Step <ArrowRight className="w-4 h-4" />
            </Button>
          ) : (
            <Button type="button" onClick={handleSubmitButton} className="flex-1 py-4 rounded-2xl text-sm shadow-xl" disabled={isSubmitting}>
              {isSubmitting ? 'Submitting...' : 'Submit Application'}
            </Button>
          )}
        </div>
      </form>
    </div>
  );
}