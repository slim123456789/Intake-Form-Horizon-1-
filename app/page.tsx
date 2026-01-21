"use client";

import React, { useState, useRef } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import { 
  ArrowRight, Check, ChevronRight, ChevronLeft, Activity, Zap, 
  Shield, Brain, Moon, TrendingDown, Clock, 
  Dumbbell, ShieldAlert, Sparkles, Beaker, Layers,
  Volume2, VolumeX, Play, Pause, User, Mail, Phone, Calendar,
  Stethoscope, Target
} from 'lucide-react';

// --- Diagnostic Configuration ---
const SURVEY_STEPS = [
  {
    id: 'objective',
    title: "Primary Objective",
    subtitle: "Identify your target physiological optimization goal.",
    questions: [
      {
        id: 'goal',
        label: "What are you trying to improve most?",
        options: [
          { id: 'muscles', label: 'Hypertrophy & Strength', sub: 'Muscle density and power' },
          { id: 'feeling_better', label: 'General Vitality', sub: 'Mood and daily well-being' },
          { id: 'endurance', label: 'Stamina & Endurance', sub: 'Cardiovascular output' },
          { id: 'mental_clarity', label: 'Cognitive Performance', sub: 'Focus and mental speed' }
        ]
      }
    ]
  },
  {
    id: 'health',
    title: "Biological Baseline",
    subtitle: "Clinical markers of metabolic and hormonal efficiency.",
    questions: [
      {
        id: 'energy_crash',
        label: "How often do you experience a midday brain fog?",
        options: [
          { id: 'daily', label: 'Daily / Chronic', sub: 'Persistent impairment' },
          { id: 'occasional', label: 'Occasionally', sub: 'Variable performance' },
          { id: 'never', label: 'Rarely / Never', sub: 'Sustained focus' }
        ]
      },
      {
        id: 'vitality',
        label: "Do you wake up feeling fully restored?",
        options: [
          { id: 'low', label: 'Rarely Restored', sub: 'Morning fatigue' },
          { id: 'moderate', label: 'Somewhat', sub: 'Inconsistent recovery' },
          { id: 'high', label: 'Fully Restored', sub: 'Optimal vitality' }
        ]
      }
    ]
  },
  {
    id: 'lifestyle',
    title: "Lifestyle Resistance",
    subtitle: "Quantifying environmental stressors on your biology.",
    questions: [
      {
        id: 'stress_resilience',
        label: "Stress resilience change (last 24 months):",
        options: [
          { id: 'decreased', label: 'Noticeably Decreased', sub: 'Heightened sensitivity' },
          { id: 'stable', label: 'Remained Stable', sub: 'Baseline maintained' }
        ]
      },
      {
        id: 'routine',
        label: "Does workload interfere with your health routine?",
        options: [
          { id: 'constantly', label: 'Frequently', sub: 'Routine fragmentation' },
          { id: 'manageable', label: 'Manageable', sub: 'Consistent routine' }
        ]
      }
    ]
  },
  {
    id: 'fitness',
    title: "Performance ROI",
    subtitle: "Evaluating physical return on effort (ROE).",
    questions: [
      {
        id: 'workout_roi',
        label: "Workout ROI vs. 5 years ago:",
        options: [
          { id: 'plateau', label: 'Hitting a plateau', sub: 'Diminished returns' },
          { id: 'slower', label: 'Results are slower', sub: 'Lagging adaptation' },
          { id: 'yes', label: 'Still optimizing', sub: 'Positive progression' }
        ]
      },
      {
        id: 'recovery',
        label: "Physical recovery time after high exertion:",
        options: [
          { id: 'slow', label: 'Slow (2+ Days)', sub: 'Extended latency' },
          { id: 'average', label: 'Average (24h)', sub: 'Standard window' },
          { id: 'fast', label: 'Fast / Efficient', sub: 'Rapid repair' }
        ]
      }
    ]
  },
  {
    id: 'clinical',
    title: "Clinical Preferences",
    subtitle: "Defining protocol constraints for long-term health.",
    questions: [
      {
        id: 'fertility',
        label: "Do you desire to preserve fertility?",
        options: [
          { id: 'yes', label: 'Yes, Preservation Required', sub: 'Prioritizing spermatogenesis' },
          { id: 'no', label: 'Not a Priority', sub: 'Maximize hormonal efficiency' }
        ]
      }
    ]
  }
];

const containerVariants: Variants = {
  initial: { opacity: 0, y: 15 },
  animate: { 
    opacity: 1, 
    y: 0, 
    transition: { 
      duration: 0.8, 
      ease: [0.16, 1, 0.3, 1] as const 
    } 
  },
  exit: { opacity: 0, y: -15, transition: { duration: 0.4 } }
};

export default function EnhancedFunnel() {
  const [step, setStep] = useState<'intro' | 'survey' | 'loading' | 'results' | 'intake' | 'qualified'>('intro');
  const [currentIdx, setCurrentIdx] = useState(0);
  const [intakeStep, setIntakeStep] = useState(1);
  const [formData, setFormData] = useState({
    gender: '',
    state: '',
    answers: {} as Record<string, string>,
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    medicalHistory: [] as string[]
  });

  // Video State
  const [isPlaying, setIsPlaying] = useState(true);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleNext = () => {
    if (currentIdx < SURVEY_STEPS.length - 1) {
      setCurrentIdx(currentIdx + 1);
    } else {
      setStep('loading');
      setTimeout(() => setStep('results'), 5500);
    }
  };

  const handleBack = () => {
    if (currentIdx > 0) {
      setCurrentIdx(currentIdx - 1);
    } else {
      setStep('intro');
    }
  };

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) videoRef.current.pause();
      else videoRef.current.play();
      setIsPlaying(!isPlaying);
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    setVolume(val);
    if (videoRef.current) {
      videoRef.current.volume = val;
      videoRef.current.muted = val === 0;
      setIsMuted(val === 0);
    }
  };

  const getUnifiedStack = () => {
    const hormonal = [];
    const longevity = [];
    const goal = formData.answers['goal'];

    if (formData.gender === 'Male') {
      const testosteroneMed = formData.answers['fertility'] === 'yes' 
        ? { name: 'Enclomiphene', role: 'Boosts natural levels while protecting fertility.', tag: 'Stronger' }
        : { name: 'Injectable TRT', role: 'Optimizes energy, muscle recovery, and mental drive.', tag: 'Stronger' };
      hormonal.push(testosteroneMed);
    } else {
      hormonal.push({ name: 'Estradiol Patch', role: 'Smooths out mood and supports bone and heart health.', tag: 'Brighter' });
      hormonal.push({ name: 'Progesterone', role: 'Helps restore deep sleep and keeps hormones in balance.', tag: 'Brighter' });
    }

    // Dynamic Longevity selection based on Primary Objective
    if (goal === 'mental_clarity' || formData.answers['energy_crash'] === 'daily') {
      longevity.push({ name: 'NAD+ Injection', role: 'Clears brain fog and fuels your cells with steady energy.', tag: 'Longer' });
    } else if (goal === 'muscles' || goal === 'endurance') {
      longevity.push({ name: 'Sermorelin Injection', role: 'Speeds up tissue repair and promotes leaner body composition.', tag: 'Longer' });
    } else {
      longevity.push({ name: 'MIC-B12 Injection', role: 'Kicks your metabolism into gear and supports natural fat burning.', tag: 'Longer' });
    }
    
    // Always include a secondary catalyst
    if (longevity[0].name !== 'MIC-B12 Injection') {
        longevity.push({ name: 'MIC-B12 Injection', role: 'Kicks your metabolism into gear and supports natural fat burning.', tag: 'Longer' });
    } else {
        longevity.push({ name: 'Sermorelin Injection', role: 'Speeds up tissue repair and promotes leaner body composition.', tag: 'Longer' });
    }

    return { hormonal, longevity };
  };

  const { hormonal, longevity } = getUnifiedStack();

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-[#0F172A] font-sans selection:bg-[#0033FF]/10">
      {/* Precision Grid Background (Light Mode) */}
      <div className="fixed inset-0 bg-[linear-gradient(to_right,#0033ff05_1px,transparent_1px),linear-gradient(to_bottom,#0033ff05_1px,transparent_1px)] bg-[size:40px_40px]" />

      <nav className="relative z-20 flex justify-between items-center max-w-6xl mx-auto p-10">
        <div className="relative h-6 w-32 filter brightness-0">
          <Image src="/Enhanced-Logo-White.png" alt="Enhanced" fill className="object-contain object-left" priority />
        </div>
        <div className="h-px w-16 bg-[#0033FF]/20" />
      </nav>

      <main className="relative z-10 max-w-2xl mx-auto px-6 pt-8 pb-32">
        <AnimatePresence mode="wait">
          
          {step === 'intro' && (
            <motion.div key="intro" variants={containerVariants} initial="initial" animate="animate" exit="exit">
              <h1 className="text-6xl md:text-8xl font-black mb-8 tracking-tighter leading-[0.85] uppercase text-[#0F172A]">
                Live <br/><span className="text-[#0033FF]">Enhanced</span>
              </h1>
              <p className="text-xl text-[#64748B] font-medium mb-16 max-w-md leading-relaxed">
                Precision protocols for high-performance biology. Initializing diagnostic sequence.
              </p>
              
              <div className="space-y-10">
                <div className="grid grid-cols-2 gap-3 font-black uppercase tracking-widest text-xs">
                  {['Male', 'Female'].map((g) => (
                    <button key={g} onClick={() => setFormData({...formData, gender: g})}
                      className={`py-8 rounded-2xl border transition-all ${formData.gender === g ? 'bg-[#0033FF] text-white border-[#0033FF] shadow-xl shadow-[#0033FF]/20' : 'bg-white border-slate-200 hover:border-[#0033FF]/30 text-slate-400'}`}>
                      {g}
                    </button>
                  ))}
                </div>
                <div className="relative font-black uppercase tracking-widest text-xs">
                  <select className="w-full bg-white border border-slate-200 rounded-2xl py-8 px-6 focus:border-[#0033FF] outline-none appearance-none text-[#0F172A]"
                    value={formData.state}
                    onChange={(e) => setFormData({...formData, state: e.target.value})}>
                    <option value="">Select State</option>
                    <option value="CA">California</option><option value="FL">Florida</option><option value="NY">New York</option><option value="TX">Texas</option>
                  </select>
                  <ChevronRight className="absolute right-6 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                </div>
                <button disabled={!formData.gender || !formData.state} onClick={() => setStep('survey')}
                  className="w-full bg-[#0033FF] py-8 rounded-full font-black text-xs uppercase tracking-[0.2em] text-white transition-all hover:brightness-110 active:scale-[0.98] disabled:opacity-20 shadow-[0_20px_40px_rgba(0,51,255,0.2)]">
                  Start Diagnostic
                </button>
              </div>
            </motion.div>
          )}

          {step === 'survey' && (
            <motion.div key={SURVEY_STEPS[currentIdx].id} variants={containerVariants} initial="initial" animate="animate" exit="exit">
              <div className="mb-16">
                <div className="flex items-center gap-4 mb-2 opacity-40">
                  <span className="text-[10px] font-black tracking-[0.3em] uppercase text-[#0F172A]">Metric 0{currentIdx + 1}</span>
                  <div className="flex-1 h-px bg-[#0033FF]/20" />
                </div>
                <h2 className="text-5xl font-black uppercase tracking-tighter text-[#0F172A] leading-none">
                  {SURVEY_STEPS[currentIdx].title}
                </h2>
              </div>

              <div className="space-y-12">
                {SURVEY_STEPS[currentIdx].questions.map((q) => (
                  <div key={q.id}>
                    <p className="text-[10px] font-black uppercase tracking-widest text-[#64748B] mb-6">{q.label}</p>
                    <div className="grid grid-cols-1 gap-3">
                      {q.options.map((opt) => (
                        <button key={opt.id} onClick={() => setFormData({...formData, answers: {...formData.answers, [q.id]: opt.id}})}
                          className={`flex items-center justify-between p-7 rounded-2xl border transition-all duration-500 ${formData.answers[q.id] === opt.id ? 'bg-white border-[#0033FF] text-[#0033FF] shadow-lg shadow-[#0033FF]/10' : 'bg-white border-slate-200 hover:border-[#0033FF]/30 text-slate-600'}`}>
                          <div className="text-left">
                            <div className="text-lg font-black uppercase tracking-tighter leading-none mb-1">{opt.label}</div>
                            <div className={`text-[10px] font-medium opacity-50 uppercase tracking-widest`}>{opt.sub}</div>
                          </div>
                          {formData.answers[q.id] === opt.id && <Check size={20} strokeWidth={4} />}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-16 flex justify-between items-center">
                <button 
                  onClick={handleBack}
                  className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-[#0033FF] transition-colors"
                >
                  <ChevronLeft size={16} /> Back
                </button>
                <div className="h-1 bg-slate-200 w-24 rounded-full overflow-hidden">
                  <motion.div initial={{ width: 0 }} animate={{ width: `${((currentIdx + 1) / SURVEY_STEPS.length) * 100}%` }} className="h-full bg-[#0033FF]" />
                </div>
                <button disabled={!SURVEY_STEPS[currentIdx].questions.every(q => formData.answers[q.id])} onClick={handleNext}
                  className="bg-[#0033FF] px-10 py-6 rounded-full font-black uppercase tracking-widest text-xs text-white disabled:opacity-20 hover:px-12 transition-all flex items-center gap-3 shadow-lg shadow-[#0033FF]/20">
                  Continue <ChevronRight size={18} />
                </button>
              </div>
            </motion.div>
          )}

          {step === 'loading' && (
            <motion.div key="loading" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, scale: 1.05 }} className="flex flex-col items-center justify-center py-20 text-center min-h-[60vh]">
              <div className="relative w-48 h-48 mb-20">
                <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 3, ease: "linear" }} className="absolute inset-0 border-[3px] border-transparent border-t-[#0033FF] rounded-full shadow-[0_0_50px_-10px_rgba(0,51,255,0.3)]" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <motion.div animate={{ scale: [1, 1.3, 1], opacity: [0.3, 1, 0.3] }} transition={{ repeat: Infinity, duration: 2 }} className="w-6 h-6 bg-[#0033FF] rounded-full shadow-[0_0_20px_rgba(0,51,255,0.5)]" />
                </div>
              </div>
              <div className="space-y-4">
                <motion.h2 initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="text-[#0F172A] font-black uppercase tracking-[0.4em] text-xs">Analyzing Biological Signatures</motion.h2>
                <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }} className="text-[#64748B] font-bold uppercase tracking-[0.2em] text-[10px] max-w-xs mx-auto leading-loose">Creating a personalized <span className="text-[#0033FF]">LIVE ENHANCED</span> protocol based on your answers</motion.p>
              </div>
            </motion.div>
          )}

          {step === 'results' && (
            <motion.div key="results" variants={containerVariants} initial="initial" animate="animate" exit="exit" className="space-y-12">
              <div className="space-y-2">
                <h1 className="text-6xl font-black uppercase tracking-tighter text-[#0F172A]">LIVE ENHANCED<span className="text-[#0033FF]"> Protocol for You</span></h1>
                <p className="text-[#64748B] font-bold uppercase tracking-[0.2em] text-[10px]">A unified biological system for {formData.gender} optimization</p>
                <p className="text-[#0033FF] font-bold uppercase tracking-[0.2em] text-[10px]">Note: Your personalized protocol is subjected to change after your clinical consultation.</p>
              </div>

              <div className="group relative aspect-video w-full rounded-[2rem] overflow-hidden border border-slate-200 bg-[#0F172A] shadow-2xl">
                <video ref={videoRef} src="/clinical-video.mp4" autoPlay loop playsInline className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0F172A]/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute bottom-8 left-8 right-8 flex items-center justify-between">
                    <div className="flex items-center gap-6">
                      <button onClick={togglePlay} className="p-3 bg-white/20 backdrop-blur-md rounded-full hover:bg-white/30 transition-colors text-white">{isPlaying ? <Pause size={20} /> : <Play size={20} fill="currentColor" />}</button>
                      <div className="flex items-center gap-3 text-white">
                        <div className="p-2">{isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}</div>
                        <input type="range" min="0" max="1" step="0.01" value={volume} onChange={handleVolumeChange} className="w-24 h-1 bg-white/20 rounded-full appearance-none cursor-pointer accent-white" />
                      </div>
                    </div>
                    <div className="flex items-center gap-3 text-white"><div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" /><span className="text-[10px] font-black uppercase tracking-widest opacity-80">Clinical Overview: Phase I</span></div>
                  </div>
                </div>
              </div>

              <div className="bg-white border border-slate-200 rounded-[3rem] p-10 md:p-14 relative overflow-hidden shadow-sm">
                <div className="relative z-10 space-y-12">
                  <div className="space-y-6">
                    <div className="flex items-center gap-4 text-[#0033FF]"><Activity size={18} /><span className="text-[10px] font-black uppercase tracking-[0.4em]">Part A: Hormonal Integration</span></div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {hormonal.map((med, i) => (
                        <div key={i} className="bg-slate-50 border border-slate-100 p-8 rounded-3xl flex flex-col justify-between min-h-[160px]">
                          <div><span className="text-[9px] font-black uppercase tracking-widest text-[#0033FF] mb-1 block">{med.tag}</span><h3 className="text-2xl font-black uppercase tracking-tight leading-none text-[#0F172A]">{med.name}</h3></div>
                          <p className="text-[11px] font-medium leading-relaxed text-[#64748B]">{med.role}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="space-y-6">
                    <div className="flex items-center gap-4 text-[#0033FF]"><Zap size={18} /><span className="text-[10px] font-black uppercase tracking-[0.4em]">Part B: Cellular Longevity</span></div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {longevity.map((med, i) => (
                        <div key={i} className="bg-slate-50 border border-slate-100 p-8 rounded-3xl flex flex-col justify-between min-h-[160px]">
                          <div><span className="text-[9px] font-black uppercase tracking-widest text-[#0033FF] mb-1 block">{med.tag}</span><h3 className="text-2xl font-black uppercase tracking-tight leading-none text-[#0F172A]">{med.name}</h3></div>
                          <p className="text-[11px] font-medium leading-relaxed text-[#64748B]">{med.role}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                <Layers className="absolute -bottom-10 -right-10 text-[#0033FF]/[0.03] w-64 h-64" />
              </div>

              <button onClick={() => setStep('intake')} className="w-full py-10 bg-[#0033FF] text-white rounded-full font-black text-xl uppercase tracking-[0.2em] shadow-[0_20px_50px_rgba(0,51,255,0.3)] hover:brightness-110 active:scale-[0.99] transition-all flex items-center justify-center gap-4">Complete Medical Intake <ArrowRight size={24} /></button>
            </motion.div>
          )}

          {step === 'intake' && (
            <motion.div key="intake" variants={containerVariants} initial="initial" animate="animate" exit="exit" className="space-y-12">
              <div className="space-y-2">
                <h2 className="text-xs font-black tracking-[0.4em] uppercase text-[#0033FF]">Step {intakeStep} of 2</h2>
                <h1 className="text-5xl font-black uppercase tracking-tighter text-[#0F172A]">Eligibility <br/>Verification.</h1>
              </div>

              <div className="bg-white border border-slate-200 rounded-[3rem] p-8 md:p-12 space-y-8 shadow-sm">
                {intakeStep === 1 ? (
                  <div className="space-y-6">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-widest text-[#64748B] ml-4">First Name</label>
                        <input type="text" placeholder="John" className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-6 px-6 text-[#0F172A] outline-none focus:border-[#0033FF]" value={formData.firstName} onChange={(e) => setFormData({...formData, firstName: e.target.value})} />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-widest text-[#64748B] ml-4">Last Name</label>
                        <input type="text" placeholder="Doe" className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-6 px-6 text-[#0F172A] outline-none focus:border-[#0033FF]" value={formData.lastName} onChange={(e) => setFormData({...formData, lastName: e.target.value})} />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-widest text-[#64748B] ml-4">Email Address</label>
                      <input type="email" placeholder="john@doe.com" className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-6 px-6 text-[#0F172A] outline-none focus:border-[#0033FF]" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-widest text-[#64748B] ml-4">Phone Number</label>
                      <input type="tel" placeholder="(555) 000-0000" className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-6 px-6 text-[#0F172A] outline-none focus:border-[#0033FF]" value={formData.phone} onChange={(e) => setFormData({...formData, phone: e.target.value})} />
                    </div>
                  </div>
                ) : (
                  <div className="space-y-6">
                    <p className="text-[10px] font-black uppercase tracking-widest text-[#64748B] ml-4">Check any that apply to your medical history:</p>
                    <div className="space-y-3">
                      {['Diagnosed heart condition', 'Current hormone therapy', 'Active treatment for prostate cancer', 'Known liver or kidney disease'].map((item) => (
                        <button key={item} onClick={() => {
                          const history = formData.medicalHistory.includes(item) ? formData.medicalHistory.filter(i => i !== item) : [...formData.medicalHistory, item];
                          setFormData({...formData, medicalHistory: history});
                        }} className={`w-full text-left p-6 rounded-2xl border transition-all ${formData.medicalHistory.includes(item) ? 'bg-[#0033FF] text-white border-[#0033FF]' : 'bg-slate-50 border-slate-200 text-slate-600'}`}>
                          <div className="flex justify-between items-center">
                            <span className="text-xs font-bold uppercase tracking-tight">{item}</span>
                            {formData.medicalHistory.includes(item) && <Check size={16} strokeWidth={4} />}
                          </div>
                        </button>
                      ))}
                      <button onClick={() => setFormData({...formData, medicalHistory: formData.medicalHistory.includes('None') ? [] : ['None']})} className={`w-full text-left p-6 rounded-2xl border transition-all ${formData.medicalHistory.includes('None') ? 'bg-[#0033FF] text-white border-[#0033FF]' : 'bg-slate-50 border-slate-200 text-slate-600'}`}>
                         <span className="text-xs font-bold uppercase tracking-tight">None of the above apply</span>
                      </button>
                    </div>
                  </div>
                )}
                
                <div className="flex items-center justify-between gap-6 pt-4">
                  <button 
                    onClick={() => intakeStep === 1 ? setStep('results') : setIntakeStep(1)}
                    className="text-[10px] font-black uppercase tracking-widest text-[#64748B] hover:text-[#0033FF] transition-colors px-6"
                  >
                    Back
                  </button>
                  <button 
                    disabled={intakeStep === 1 ? (!formData.firstName || !formData.lastName || !formData.email || !formData.phone) : formData.medicalHistory.length === 0}
                    onClick={() => intakeStep === 1 ? setIntakeStep(2) : setStep('qualified')}
                    className="flex-1 py-8 bg-[#0033FF] text-white rounded-full font-black text-xs uppercase tracking-[0.2em] shadow-lg disabled:opacity-20 transition-all"
                  >
                    {intakeStep === 1 ? "Next Step" : "Submit Verification"}
                  </button>
                </div>
              </div>
            </motion.div>
          )}

          {step === 'qualified' && (
            <motion.div key="qualified" variants={containerVariants} initial="initial" animate="animate" exit="exit" className="text-center space-y-12 py-10">
              <div className="flex flex-col items-center gap-6">
                <div className="w-24 h-24 bg-[#0033FF] rounded-full flex items-center justify-center shadow-[0_0_50px_rgba(0,51,255,0.3)]">
                  <Check size={48} className="text-white" strokeWidth={4} />
                </div>
                <div className="space-y-2">
                  <h1 className="text-6xl font-black uppercase tracking-tighter text-[#0F172A]">Status: <span className="text-[#0033FF]">Qualified.</span></h1>
                  <p className="text-[#64748B] font-bold uppercase tracking-[0.2em] text-[10px]">Candidate ID: {Math.random().toString(36).substr(2, 9).toUpperCase()}</p>
                </div>
              </div>

              <div className="bg-white border border-slate-200 rounded-[3rem] p-10 space-y-10 shadow-sm">
                <p className="text-[#64748B] text-lg leading-relaxed font-medium">
                  {formData.firstName}, your results indicate high compatibility for optimization. To finalize your protocol, we must complete the medical sequence below.
                </p>
                
                <div className="h-px bg-slate-100" />
                
                <div className="space-y-6">
                  <h3 className="text-xs font-black uppercase tracking-[0.3em] text-[#0033FF] text-left">Your Next Mandated Steps</h3>
                  
                  <div className="space-y-4">
                    <div className="flex items-start gap-4 text-left bg-slate-50 p-6 rounded-3xl border border-slate-100">
                      <Calendar className="text-[#0033FF] shrink-0" size={24} />
                      <div className="space-y-1">
                        <p className="text-[#0F172A] font-black uppercase text-sm tracking-tight">1. Clinical Blood Analysis</p>
                        <p className="text-xs text-[#64748B] font-medium">A precision biomarker panel is required to analyze your baseline levels and ensure safe administration.</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4 text-left bg-slate-50 p-6 rounded-3xl border border-slate-100">
                      <Stethoscope className="text-[#0033FF] shrink-0" size={24} />
                      <div className="space-y-1">
                        <p className="text-[#0F172A] font-black uppercase text-sm tracking-tight">2. Clinician Consultation</p>
                        <p className="text-xs text-[#64748B] font-medium">Once labs are received, you will meet with a specialist to finalize your custom dosing and delivery routes.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <button className="w-full py-10 bg-[#0F172A] text-white rounded-full font-black text-xl uppercase tracking-[0.2em] shadow-[0_20px_50px_rgba(15,23,42,0.2)] hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-4">
                Schedule Your Blood Test <ArrowRight size={24} />
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}