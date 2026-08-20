import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Check, 
  ArrowRight, 
  ArrowLeft, 
  Sparkles, 
  ShieldCheck, 
  Clock, 
  AlertCircle,
  Briefcase,
  Layers
} from 'lucide-react';
import { MEMBERSHIP_TIERS, MembershipTierId } from './TierCards';
import { MemberCardData } from './MemberCardPreview';

interface JoinMovementFormProps {
  initialTier?: MembershipTierId;
  onSuccess: (cardData: MemberCardData) => void;
}

const INTEREST_AREAS = [
  { id: 'agri', label: 'Agriculture & Food Security', icon: '🌾' },
  { id: 'youth', label: 'Youth Empowerment & Education', icon: '🎓' },
  { id: 'tech', label: 'Technology & Digital Innovation', icon: '💻' },
  { id: 'health', label: 'Healthcare & Public Wellness', icon: '🏥' },
  { id: 'business', label: 'MSMEs & Small Business Growth', icon: '📈' },
  { id: 'logistics', label: 'Logistics, Events & Canvassing', icon: '🚚' },
  { id: 'governance', label: 'Governance & Fiscal Transparency', icon: '⚖️' },
  { id: 'community', label: 'Sports, Arts & Community Cohesion', icon: '⚽' },
];

const TIME_COMMITMENTS = [
  { id: '1-2', label: '1 - 2 hours / week', desc: 'Online actions & community surveys' },
  { id: '3-5', label: '3 - 5 hours / week', desc: 'Town halls & ward coordination' },
  { id: '6-10', label: '6 - 10 hours / week', desc: 'Active fieldwork & team leadership' },
  { id: 'flexible', label: 'Flexible / Event-Based', desc: 'On-call for rallies and special initiatives' },
];

const KENYA_COUNTIES = [
  {
    name: 'Nairobi',
    constituencies: ['Westlands', 'Dagoretti North', 'Dagoretti South', 'Langata', 'Kibra', 'Roysambu', 'Kasarani', 'Ruaraka', 'Embakasi South', 'Starehe'],
    wards: ['Parklands/Highridge', 'Kitisuru', 'Kangemi', 'Kilimani', 'Karen', 'Nairobi Central', 'South C', 'Zimmerman', 'Kasarani', 'Pangani']
  },
  {
    name: 'Kiambu',
    constituencies: ['Gatundu South', 'Gatundu North', 'Juja', 'Thika Town', 'Ruiru', 'Githunguri', 'Kiambu', 'Kabete', 'Kikuyu', 'Limuru'],
    wards: ['Township', 'Kamenu', 'Kahawa Sukari', 'Biashara', 'Kikuyu', 'Karuri', 'Tigoni', 'Gatundu', 'Ndenderu', 'Rongai']
  },
  {
    name: 'Nakuru',
    constituencies: ['Nakuru Town East', 'Nakuru Town West', 'Naivasha', 'Gilgil', 'Kuresoi', 'Molo', 'Rongai', 'Subukia'],
    wards: ['Biashara', 'Kivumbini', 'Flamingo', 'Hellsgate', 'Olkaria', 'Mai Mahiu', 'Molo', 'Elburgon']
  },
  {
    name: 'Mombasa',
    constituencies: ['Mvita', 'Nyali', 'Kisauni', 'Likoni', 'Changamwe', 'Jomvu'],
    wards: ['Old Town', 'Tudor', 'Kongowea', 'Frere Town', 'Bamburi', 'Likoni', 'Airport']
  },
  {
    name: 'Machakos',
    constituencies: ['Machakos Town', 'Mavoko', 'Kangundo', 'Matungulu', 'Yatta', 'Mwala'],
    wards: ['Syokimau/Mulolongo', 'Athi River', 'Machakos Central', 'Mumbuni', 'Tala']
  }
];

export function JoinMovementForm({ initialTier = 'volunteer', onSuccess }: JoinMovementFormProps) {
  const [currentStep, setCurrentStep] = useState<1 | 2 | 3>(1);
  const [tier, setTier] = useState<MembershipTierId>(initialTier);

  // Form State
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [county, setCounty] = useState('Nairobi');
  const [constituency, setConstituency] = useState('Westlands');
  const [ward, setWard] = useState('Parklands/Highridge');

  const [selectedInterests, setSelectedInterests] = useState<string[]>(['youth', 'tech']);
  const [timeCommitment, setTimeCommitment] = useState('3-5');
  const [skills, setSkills] = useState('');
  const [motivation, setMotivation] = useState('');
  const [acceptedTerms, setAcceptedTerms] = useState(true);

  // Validation Errors
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const activeCountyObj = KENYA_COUNTIES.find((c) => c.name === county) || KENYA_COUNTIES[0];

  const handleCountyChange = (newCounty: string) => {
    setCounty(newCounty);
    const found = KENYA_COUNTIES.find((c) => c.name === newCounty);
    if (found) {
      setConstituency(found.constituencies[0] || '');
      setWard(found.wards[0] || '');
    }
  };

  const toggleInterest = (id: string) => {
    if (selectedInterests.includes(id)) {
      if (selectedInterests.length > 1) {
        setSelectedInterests(selectedInterests.filter((item) => item !== id));
      }
    } else {
      setSelectedInterests([...selectedInterests, id]);
    }
  };

  const validateStep1 = () => {
    const errs: Record<string, string> = {};
    if (!fullName.trim() || fullName.trim().length < 3) {
      errs.fullName = 'Please enter your full legal or preferred name.';
    }
    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      errs.email = 'Please enter a valid email address.';
    }
    if (!phone.trim() || phone.trim().length < 9) {
      errs.phone = 'Please provide a valid phone or WhatsApp number.';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const validateStep2 = () => {
    const errs: Record<string, string> = {};
    if (selectedInterests.length === 0) {
      errs.interests = 'Please select at least one area of interest.';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleNextStep = () => {
    if (currentStep === 1) {
      if (validateStep1()) setCurrentStep(2);
    } else if (currentStep === 2) {
      if (validateStep2()) setCurrentStep(3);
    }
  };

  const handlePrevStep = () => {
    if (currentStep === 2) setCurrentStep(1);
    if (currentStep === 3) setCurrentStep(2);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateStep1() || !validateStep2()) {
      return;
    }
    if (!acceptedTerms) {
      setErrors({ terms: 'Please agree to the member code of conduct to complete registration.' });
      return;
    }

    setIsSubmitting(true);

    // Simulate API registration call
    setTimeout(() => {
      setIsSubmitting(false);
      const randomNum = Math.floor(1000 + Math.random() * 9000);
      const randomYear = new Date().getFullYear();
      const code = `KWM-${randomYear}-${randomNum}`;
      
      const registeredAt = new Date().toLocaleDateString('en-KE', {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
      });

      const memberData: MemberCardData = {
        fullName: fullName.trim(),
        email: email.trim(),
        phone: phone.trim(),
        county,
        constituency,
        ward,
        tierId: tier,
        interests: selectedInterests,
        membershipId: code,
        registeredAt
      };

      onSuccess(memberData);
    }, 900);
  };

  return (
    <section id="register-form" className="py-12 sm:py-20 bg-white relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Form Container */}
        <div className="bg-[#F8FBFF] rounded-3xl p-6 sm:p-10 border border-slate-200/90 shadow-xl relative overflow-hidden">
          
          {/* Header */}
          <div className="text-center max-w-xl mx-auto mb-8">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#1148B8]/10 text-[#1148B8] text-xs font-bold uppercase tracking-wider mb-2">
              <Sparkles size={14} /> Official Registration
            </span>
            <h3 className="font-heading text-2xl sm:text-3xl font-extrabold text-[#14213D]">
              Complete Your Membership Profile
            </h3>
            <p className="text-slate-600 text-xs sm:text-sm mt-1.5">
              Step {currentStep} of 3 • Takes less than 2 minutes to verify
            </p>
          </div>

          {/* Step Progress Bar */}
          <div className="mb-10">
            <div className="flex items-center justify-between max-w-md mx-auto relative">
              {/* Line */}
              <div className="absolute left-6 right-6 top-1/2 -translate-y-1/2 h-1 bg-slate-200 -z-0" />
              <div 
                className="absolute left-6 top-1/2 -translate-y-1/2 h-1 bg-[#1148B8] transition-all duration-300 -z-0"
                style={{ width: currentStep === 1 ? '0%' : currentStep === 2 ? '50%' : '100%' }}
              />

              {/* Step 1 Bubble */}
              <div className="relative z-10 flex flex-col items-center">
                <div className={`w-10 h-10 rounded-2xl flex items-center justify-center font-bold text-xs transition-all ${
                  currentStep >= 1 ? 'bg-[#1148B8] text-white shadow-md' : 'bg-slate-200 text-slate-500'
                }`}>
                  {currentStep > 1 ? <Check size={16} strokeWidth={3} /> : '1'}
                </div>
                <span className="text-[11px] font-bold text-slate-700 mt-1.5">Details</span>
              </div>

              {/* Step 2 Bubble */}
              <div className="relative z-10 flex flex-col items-center">
                <div className={`w-10 h-10 rounded-2xl flex items-center justify-center font-bold text-xs transition-all ${
                  currentStep >= 2 ? 'bg-[#1148B8] text-white shadow-md' : 'bg-slate-200 text-slate-500'
                }`}>
                  {currentStep > 2 ? <Check size={16} strokeWidth={3} /> : '2'}
                </div>
                <span className="text-[11px] font-bold text-slate-700 mt-1.5">Interests</span>
              </div>

              {/* Step 3 Bubble */}
              <div className="relative z-10 flex flex-col items-center">
                <div className={`w-10 h-10 rounded-2xl flex items-center justify-center font-bold text-xs transition-all ${
                  currentStep === 3 ? 'bg-[#1148B8] text-white shadow-md' : 'bg-slate-200 text-slate-500'
                }`}>
                  3
                </div>
                <span className="text-[11px] font-bold text-slate-700 mt-1.5">Skills</span>
              </div>
            </div>
          </div>

          {/* Form Element */}
          <form onSubmit={handleSubmit}>
            <AnimatePresence mode="wait">
              
              {/* STEP 1: Personal Details */}
              {currentStep === 1 && (
                <motion.div
                  key="step1"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.25 }}
                  className="space-y-6"
                >
                  {/* Full Name & Email */}
                  <div className="grid sm:grid-cols-2 gap-5">
                    {/* Full Name */}
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                        Full Name <span className="text-rose-500">*</span>
                      </label>
                      <div className="relative">
                        <User size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                        <input
                          type="text"
                          value={fullName}
                          onChange={(e) => setFullName(e.target.value)}
                          placeholder="e.g. Grace Wanjiku Mwangi"
                          className={`w-full bg-white rounded-2xl pl-10 pr-4 py-3 text-sm text-slate-900 border transition-all ${
                            errors.fullName 
                              ? 'border-rose-500 ring-2 ring-rose-100' 
                              : 'border-slate-200 focus:border-[#1148B8] focus:ring-4 focus:ring-[#1148B8]/10'
                          }`}
                        />
                      </div>
                      {errors.fullName && (
                        <p className="text-xs text-rose-500 font-semibold mt-1 flex items-center gap-1">
                          <AlertCircle size={12} /> {errors.fullName}
                        </p>
                      )}
                    </div>

                    {/* Email */}
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                        Email Address <span className="text-rose-500">*</span>
                      </label>
                      <div className="relative">
                        <Mail size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                        <input
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="grace@example.com"
                          className={`w-full bg-white rounded-2xl pl-10 pr-4 py-3 text-sm text-slate-900 border transition-all ${
                            errors.email 
                              ? 'border-rose-500 ring-2 ring-rose-100' 
                              : 'border-slate-200 focus:border-[#1148B8] focus:ring-4 focus:ring-[#1148B8]/10'
                          }`}
                        />
                      </div>
                      {errors.email && (
                        <p className="text-xs text-rose-500 font-semibold mt-1 flex items-center gap-1">
                          <AlertCircle size={12} /> {errors.email}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Phone / WhatsApp */}
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                      Phone / WhatsApp <span className="text-rose-500">*</span>
                    </label>
                    <div className="relative">
                      <Phone size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                      <input
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="e.g. +254 712 345 678"
                        className={`w-full bg-white rounded-2xl pl-10 pr-4 py-3 text-sm text-slate-900 border transition-all ${
                          errors.phone 
                            ? 'border-rose-500 ring-2 ring-rose-100' 
                            : 'border-slate-200 focus:border-[#1148B8] focus:ring-4 focus:ring-[#1148B8]/10'
                        }`}
                      />
                    </div>
                    {errors.phone && (
                      <p className="text-xs text-rose-500 font-semibold mt-1 flex items-center gap-1">
                        <AlertCircle size={12} /> {errors.phone}
                      </p>
                    )}
                  </div>
                </motion.div>
              )}

              {/* STEP 2: Engagement Preferences */}
              {currentStep === 2 && (
                <motion.div
                  key="step2"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.25 }}
                  className="space-y-6"
                >
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                      Select Areas of Focus & Interest <span className="text-rose-500">*</span>
                    </label>
                    <p className="text-xs text-slate-500 mb-4">
                      Select the policy and community pillars you are most excited to contribute towards.
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {INTEREST_AREAS.map((area) => {
                        const isSelected = selectedInterests.includes(area.id);
                        return (
                          <button
                            key={area.id}
                            type="button"
                            onClick={() => toggleInterest(area.id)}
                            className={`p-3.5 rounded-2xl border text-left flex items-center justify-between transition-all ${
                              isSelected
                                ? 'bg-white border-[#1148B8] ring-2 ring-[#1148B8]/15 shadow-sm'
                                : 'bg-white/60 border-slate-200 hover:border-slate-300 hover:bg-white'
                            }`}
                          >
                            <div className="flex items-center gap-3 min-w-0">
                              <span className="text-xl">{area.icon}</span>
                              <span className="text-xs font-bold text-slate-800 truncate">{area.label}</span>
                            </div>
                            <div className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 ${
                              isSelected ? 'bg-[#1148B8] text-white' : 'border border-slate-300'
                            }`}>
                              {isSelected && <Check size={12} strokeWidth={3} />}
                            </div>
                          </button>
                        );
                      })}
                    </div>
                    {errors.interests && (
                      <p className="text-xs text-rose-500 font-semibold mt-2 flex items-center gap-1">
                        <AlertCircle size={12} /> {errors.interests}
                      </p>
                    )}
                  </div>
                </motion.div>
              )}

              {/* STEP 3: Availability & Skills */}
              {currentStep === 3 && (
                <motion.div
                  key="step3"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.25 }}
                  className="space-y-6"
                >
                  {/* Time Commitment */}
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                      Availability / Expected Time Commitment
                    </label>
                    <div className="grid sm:grid-cols-2 gap-3">
                      {TIME_COMMITMENTS.map((time) => (
                        <button
                          key={time.id}
                          type="button"
                          onClick={() => setTimeCommitment(time.id)}
                          className={`p-3.5 rounded-2xl border text-left flex items-start justify-between transition-all ${
                            timeCommitment === time.id
                              ? 'bg-white border-[#1148B8] ring-2 ring-[#1148B8]/15 shadow-sm'
                              : 'bg-white/60 border-slate-200 hover:bg-white'
                          }`}
                        >
                          <div>
                            <p className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                              <Clock size={13} className="text-[#1148B8]" />
                              {time.label}
                            </p>
                            <p className="text-[11px] text-slate-500 mt-1">{time.desc}</p>
                          </div>
                          <div className={`w-4 h-4 rounded-full flex items-center justify-center shrink-0 mt-0.5 ${
                            timeCommitment === time.id ? 'bg-[#1148B8] text-white' : 'border border-slate-300'
                          }`}>
                            {timeCommitment === time.id && <Check size={10} strokeWidth={3} />}
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Specific Skills */}
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                      Professional or Practical Skills (Optional)
                    </label>
                    <div className="relative">
                      <Briefcase size={16} className="absolute left-3.5 top-3.5 text-slate-400" />
                      <input
                        type="text"
                        value={skills}
                        onChange={(e) => setSkills(e.target.value)}
                        placeholder="e.g. Agronomy, Graphic Design, Legal Advice, Event Planning, Public Health..."
                        className="w-full bg-white rounded-2xl pl-10 pr-4 py-3 text-sm text-slate-900 border border-slate-200 focus:border-[#1148B8] focus:ring-4 focus:ring-[#1148B8]/10"
                      />
                    </div>
                  </div>

                  {/* Motivation / Note */}
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                      Why do you want to join this leadership journey? (Optional)
                    </label>
                    <textarea
                      rows={2}
                      value={motivation}
                      onChange={(e) => setMotivation(e.target.value)}
                      placeholder="Share what inspires you to be part of Kamau Wa Mbiu's vision..."
                      className="w-full bg-white rounded-2xl px-4 py-3 text-sm text-slate-900 border border-slate-200 focus:border-[#1148B8] focus:ring-4 focus:ring-[#1148B8]/10"
                    />
                  </div>

                  {/* Code of Conduct Checkbox */}
                  <div className="pt-2">
                    <label className="flex items-start gap-3 cursor-pointer select-none">
                      <input
                        type="checkbox"
                        checked={acceptedTerms}
                        onChange={(e) => setAcceptedTerms(e.target.checked)}
                        className="mt-1 w-4 h-4 rounded text-[#1148B8] focus:ring-[#1148B8]"
                      />
                      <span className="text-xs text-slate-600 leading-normal">
                        I agree to uphold the <strong>Civic Code of Conduct</strong> and respect servant leadership, peaceful community advocacy, and honest citizen dialogue.
                      </span>
                    </label>
                    {errors.terms && (
                      <p className="text-xs text-rose-500 font-semibold mt-1.5 flex items-center gap-1">
                        <AlertCircle size={12} /> {errors.terms}
                      </p>
                    )}
                  </div>
                </motion.div>
              )}

            </AnimatePresence>

            {/* Bottom Form Action Buttons */}
            <div className="mt-10 pt-6 border-t border-slate-200/80 flex items-center justify-between gap-4">
              {currentStep > 1 ? (
                <button
                  type="button"
                  onClick={handlePrevStep}
                  className="px-5 py-3 rounded-2xl bg-white border border-slate-200 text-slate-700 font-bold text-xs hover:bg-slate-50 transition-colors flex items-center gap-2"
                >
                  <ArrowLeft size={14} />
                  <span>Previous Step</span>
                </button>
              ) : (
                <div className="flex items-center gap-1.5 text-xs text-slate-400">
                  <ShieldCheck size={14} className="text-emerald-500" />
                  <span>Encrypted & Privacy Protected</span>
                </div>
              )}

              {currentStep < 3 ? (
                <button
                  type="button"
                  onClick={handleNextStep}
                  className="px-7 py-3 rounded-2xl bg-[#1148B8] text-white font-bold text-xs shadow-md shadow-[#1148B8]/20 hover:bg-[#0d3aa0] transition-all flex items-center gap-2"
                >
                  <span>Continue to Next Step</span>
                  <ArrowRight size={14} />
                </button>
              ) : (
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-8 py-3.5 rounded-2xl bg-gradient-to-r from-[#1148B8] to-[#0EA5D8] text-white font-bold text-xs shadow-lg shadow-[#1148B8]/25 hover:opacity-95 transition-all flex items-center gap-2 disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-4 h-4 rounded-full border-2 border-white border-t-transparent animate-spin" />
                      <span>Generating Digital Card...</span>
                    </>
                  ) : (
                    <>
                      <Sparkles size={16} />
                      <span>Submit & Generate Member Card</span>
                    </>
                  )}
                </button>
              )}
            </div>
          </form>

        </div>

      </div>
    </section>
  );
}
