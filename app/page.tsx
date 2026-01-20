"use client";

import React, { useState, useRef } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import { 
  ArrowRight, Check, ChevronRight, ChevronLeft, Activity, Zap, 
  Shield, Brain, Moon, TrendingDown, Clock, 
  Dumbbell, ShieldAlert, Sparkles, Beaker, Layers,
  Volume2, VolumeX, Play, Pause, User, Mail, Phone, Calendar,
  Stethoscope
} from 'lucide-react';

// --- Diagnostic Configuration ---
const SURVEY_STEPS = [
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
    if (formData.gender === 'Male') {
      const testosteroneMed = formData.answers['fertility'] === 'yes' 
        ? { name: 'Enclomiphene', role: 'Boosts natural levels while protecting fertility.', tag: 'Stronger' }
        : { name: 'Injectable TRT', role: 'Optimizes energy, muscle recovery, and mental drive.', tag: 'Stronger' };
      hormonal.push(testosteroneMed);
    } else {
      hormonal.push({ name: 'Estradiol Patch', role: 'Smooths out mood and supports bone and heart health.', tag: 'Brighter' });
      hormonal.push({ name: 'Progesterone', role: 'Helps restore deep sleep and keeps hormones in balance.', tag: 'Brighter' });
    }
    if (formData.answers['energy_crash'] === 'daily') {
      longevity.push({ name: 'NAD+ Injection', role: 'Clears brain fog and fuels your cells with steady energy.', tag: 'Longer' });
    } else {
      longevity.push({ name: 'Sermorelin Injection', role: 'Speeds up tissue repair and promotes leaner body composition.', tag: 'Longer' });
    }
    longevity.push({ name: 'MIC-B12 Injection', role: 'Kicks your metabolism into gear and supports natural fat burning.', tag: 'Longer' });
    return { hormonal, longevity };
  };

  const { hormonal, longevity } = getUnifiedStack();

  return (
    <div className="min-h-screen bg-black text-[#F5F5F7] font-sans selection:bg-[#0033FF]">
      <div className="fixed inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_80%_80%_at_50%_0%,#000_60%,transparent_100%)]" />

      <nav className="relative z-20 flex justify-between items-center max-w-6xl mx-auto p-10">
        <div className="relative h-6 w-32">
          <Image src="/Enhanced-Logo-White.png" alt="Enhanced" fill className="object-contain object-left" priority />
        </div>
        <div className="h-px w-16 bg-white/10" />
      </nav>

      <main className="relative z-10 max-w-2xl mx-auto px-6 pt-8 pb-32">
        <AnimatePresence mode="wait">
          
          {step === 'intro' && (
            <motion.div key="intro" variants={containerVariants} initial="initial" animate="animate" exit="exit">
              <h1 className="text-6xl md:text-8xl font-black mb-8 tracking-tighter leading-[0.85] uppercase text-white">
                Live <br/><span className="text-[#0033FF]">Enhanced</span>
              </h1>
              <p className="text-xl text-gray-400 font-medium mb-16 max-w-md leading-relaxed">
                Precision protocols for high-performance biology. Initializing diagnostic sequence.
              </p>
              
              <div className="space-y-10">
                <div className="grid grid-cols-2 gap-3 font-black uppercase tracking-widest text-xs">
                  {['Male', 'Female'].map((g) => (
                    <button key={g} onClick={() => setFormData({...formData, gender: g})}
                      className={`py-8 rounded-2xl border transition-all ${formData.gender === g ? 'bg-white text-black border-white' : 'bg-white/5 border-white/10 hover:border-white/20 text-gray-500'}`}>
                      {g}
                    </button>
                  ))}
                </div>
                <div className="relative font-black uppercase tracking-widest text-xs">
                  <select className="w-full bg-white/5 border border-white/10 rounded-2xl py-8 px-6 focus:border-white outline-none appearance-none text-white"
                    value={formData.state}
                    onChange={(e) => setFormData({...formData, state: e.target.value})}>
                    <option value="">Select State</option>
                    <option value="CA">California</option><option value="FL">Florida</option><option value="NY">New York</option><option value="TX">Texas</option>
                  </select>
                  <ChevronRight className="absolute right-6 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
                </div>
                <button disabled={!formData.gender || !formData.state} onClick={() => setStep('survey')}
                  className="w-full bg-[#0033FF] py-8 rounded-full font-black text-xs uppercase tracking-[0.2em] transition-all hover:brightness-110 active:scale-[0.98] disabled:opacity-20 shadow-[0_20px_40px_rgba(0,51,255,0.2)]">
                  Start Diagnostic
                </button>
              </div>
            </motion.div>
          )}

          {step === 'survey' && (
            <motion.div key={SURVEY_STEPS[currentIdx].id} variants={containerVariants} initial="initial" animate="animate" exit="exit">
              <div className="mb-16">
                <div className="flex items-center gap-4 mb-2 opacity-40">
                  <span className="text-[10px] font-black tracking-[0.3em] uppercase">Metric 0{currentIdx + 1}</span>
                  <div className="flex-1 h-px bg-white" />
                </div>
                <h2 className="text-5xl font-black uppercase tracking-tighter text-white leading-none">
                  {SURVEY_STEPS[currentIdx].title}
                </h2>
              </div>

              <div className="space-y-12">
                {SURVEY_STEPS[currentIdx].questions.map((q) => (
                  <div key={q.id}>
                    <p className="text-[10px] font-black uppercase tracking-widest text-gray-500 mb-6">{q.label}</p>
                    <div className="grid grid-cols-1 gap-3">
                      {q.options.map((opt) => (
                        <button key={opt.id} onClick={() => setFormData({...formData, answers: {...formData.answers, [q.id]: opt.id}})}
                          className={`flex items-center justify-between p-7 rounded-2xl border transition-all duration-500 ${formData.answers[q.id] === opt.id ? 'bg-white border-white text-black' : 'bg-white/5 border-white/10 hover:border-white/30 text-white'}`}>
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
                  className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-gray-500 hover:text-white transition-colors"
                >
                  <ChevronLeft size={16} /> Back
                </button>
                <div className="h-1 bg-white/10 w-24 rounded-full overflow-hidden">
                  <motion.div initial={{ width: 0 }} animate={{ width: `${((currentIdx + 1) / SURVEY_STEPS.length) * 100}%` }} className="h-full bg-[#0033FF]" />
                </div>
                <button disabled={!SURVEY_STEPS[currentIdx].questions.every(q => formData.answers[q.id])} onClick={handleNext}
                  className="bg-[#0033FF] px-10 py-6 rounded-full font-black uppercase tracking-widest text-xs disabled:opacity-20 hover:px-12 transition-all flex items-center gap-3 shadow-lg shadow-[#0033FF]/20">
                  Continue <ChevronRight size={18} />
                </button>
              </div>
            </motion.div>
          )}

          {step === 'loading' && (
            <motion.div key="loading" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, scale: 1.05 }} className="flex flex-col items-center justify-center py-20 text-center min-h-[60vh]">
              <div className="relative w-48 h-48 mb-20">
                <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 3, ease: "linear" }} className="absolute inset-0 border-[3px] border-transparent border-t-[#0033FF] rounded-full shadow-[0_0_50px_-10px_#0033FF]" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <motion.div animate={{ scale: [1, 1.3, 1], opacity: [0.3, 1, 0.3], boxShadow: ["0 0 20px #0033FF", "0 0 60px #0033FF", "0 0 20px #0033FF"] }} transition={{ repeat: Infinity, duration: 2 }} className="w-6 h-6 bg-[#0033FF] rounded-full" />
                </div>
              </div>
              <div className="space-y-4">
                <motion.h2 initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="text-white font-black uppercase tracking-[0.4em] text-xs">Analyzing Biological Signatures</motion.h2>
                <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }} className="text-gray-500 font-bold uppercase tracking-[0.2em] text-[10px] max-w-xs mx-auto leading-loose">Creating a personalized <span className="text-white">LIVE ENHANCED</span> protocol based on your answers</motion.p>
              </div>
            </motion.div>
          )}

          {step === 'results' && (
            <motion.div key="results" variants={containerVariants} initial="initial" animate="animate" exit="exit" className="space-y-12">
              <div className="space-y-2">
                <h1 className="text-6xl font-black uppercase tracking-tighter text-white">LIVE ENHANCED<span className="text-[#0033FF]"> Protocol for You</span></h1>
                <p className="text-gray-500 font-bold uppercase tracking-[0.2em] text-[10px]">A unified biological system for {formData.gender} optimization</p>
                <p className="text-[#0033FF] font-bold uppercase tracking-[0.2em] text-[10px]">Note: Your personalized protocol is subjected to change after your clinical consultation.</p>
              </div>

              <div className="group relative aspect-video w-full rounded-[2rem] overflow-hidden border border-white/10 bg-[#111111]">
                <video ref={videoRef} src="/clinical-video.mp4" autoPlay loop playsInline className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute bottom-8 left-8 right-8 flex items-center justify-between">
                    <div className="flex items-center gap-6">
                      <button onClick={togglePlay} className="p-3 bg-white/10 backdrop-blur-md rounded-full hover:bg-white/20 transition-colors">{isPlaying ? <Pause size={20} className="text-white" /> : <Play size={20} className="text-white" fill="currentColor" />}</button>
                      <div className="flex items-center gap-3">
                        <div className="p-2">{isMuted ? <VolumeX size={18} className="text-gray-400" /> : <Volume2 size={18} className="text-white" />}</div>
                        <input type="range" min="0" max="1" step="0.01" value={volume} onChange={handleVolumeChange} className="w-24 h-1 bg-white/20 rounded-full appearance-none cursor-pointer accent-[#0033FF]" />
                      </div>
                    </div>
                    <div className="flex items-center gap-3"><div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" /><span className="text-[10px] font-black uppercase tracking-widest text-white/80">Clinical Overview: Phase I</span></div>
                  </div>
                </div>
              </div>

              <div className="bg-[#111111] border border-white/5 rounded-[3rem] p-10 md:p-14 relative overflow-hidden">
                <div className="relative z-10 space-y-12">
                  <div className="space-y-6">
                    <div className="flex items-center gap-4 text-[#0033FF]"><Activity size={18} /><span className="text-[10px] font-black uppercase tracking-[0.4em]">Part A: Hormonal Integration</span></div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {hormonal.map((med, i) => (
                        <div key={i} className="bg-white/5 border border-white/10 p-8 rounded-3xl flex flex-col justify-between min-h-[160px]">
                          <div><span className="text-[9px] font-black uppercase tracking-widest text-[#0033FF] mb-1 block">{med.tag}</span><h3 className="text-2xl font-black uppercase tracking-tight leading-none text-white">{med.name}</h3></div>
                          <p className="text-[11px] font-medium leading-relaxed text-gray-400">{med.role}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="space-y-6">
                    <div className="flex items-center gap-4 text-[#0033FF]"><Zap size={18} /><span className="text-[10px] font-black uppercase tracking-[0.4em]">Part B: Cellular Longevity</span></div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {longevity.map((med, i) => (
                        <div key={i} className="bg-white/5 border border-white/10 p-8 rounded-3xl flex flex-col justify-between min-h-[160px]">
                          <div><span className="text-[9px] font-black uppercase tracking-widest text-[#0033FF] mb-1 block">{med.tag}</span><h3 className="text-2xl font-black uppercase tracking-tight leading-none text-white">{med.name}</h3></div>
                          <p className="text-[11px] font-medium leading-relaxed text-gray-400">{med.role}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                <Layers className="absolute -bottom-10 -right-10 text-white/[0.02] w-64 h-64" />
              </div>

              <button onClick={() => setStep('intake')} className="w-full py-10 bg-[#0033FF] text-white rounded-full font-black text-xl uppercase tracking-[0.2em] shadow-[0_20px_50px_rgba(0,51,255,0.3)] hover:brightness-110 active:scale-[0.99] transition-all flex items-center justify-center gap-4">Complete Medical Intake <ArrowRight size={24} /></button>
            </motion.div>
          )}

          {step === 'intake' && (
            <motion.div key="intake" variants={containerVariants} initial="initial" animate="animate" exit="exit" className="space-y-12">
              <div className="space-y-2">
                <h2 className="text-xs font-black tracking-[0.4em] uppercase text-[#0033FF]">Step {intakeStep} of 2</h2>
                <h1 className="text-5xl font-black uppercase tracking-tighter text-white">Eligibility <br/>Verification.</h1>
              </div>

              <div className="bg-[#111111] border border-white/5 rounded-[3rem] p-8 md:p-12 space-y-8">
                {intakeStep === 1 ? (
                  <div className="space-y-6">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 ml-4">First Name</label>
                        <input type="text" placeholder="John" className="w-full bg-white/5 border border-white/10 rounded-2xl py-6 px-6 text-white outline-none focus:border-[#0033FF]" value={formData.firstName} onChange={(e) => setFormData({...formData, firstName: e.target.value})} />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 ml-4">Last Name</label>
                        <input type="text" placeholder="Doe" className="w-full bg-white/5 border border-white/10 rounded-2xl py-6 px-6 text-white outline-none focus:border-[#0033FF]" value={formData.lastName} onChange={(e) => setFormData({...formData, lastName: e.target.value})} />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 ml-4">Email Address</label>
                      <input type="email" placeholder="john@doe.com" className="w-full bg-white/5 border border-white/10 rounded-2xl py-6 px-6 text-white outline-none focus:border-[#0033FF]" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 ml-4">Phone Number</label>
                      <input type="tel" placeholder="(555) 000-0000" className="w-full bg-white/5 border border-white/10 rounded-2xl py-6 px-6 text-white outline-none focus:border-[#0033FF]" value={formData.phone} onChange={(e) => setFormData({...formData, phone: e.target.value})} />
                    </div>
                  </div>
                ) : (
                  <div className="space-y-6">
                    <p className="text-[10px] font-black uppercase tracking-widest text-gray-500 ml-4">Check any that apply to your medical history:</p>
                    <div className="space-y-3">
                      {['Diagnosed heart condition', 'Current hormone therapy', 'Active treatment for prostate cancer', 'Known liver or kidney disease'].map((item) => (
                        <button key={item} onClick={() => {
                          const history = formData.medicalHistory.includes(item) ? formData.medicalHistory.filter(i => i !== item) : [...formData.medicalHistory, item];
                          setFormData({...formData, medicalHistory: history});
                        }} className={`w-full text-left p-6 rounded-2xl border transition-all ${formData.medicalHistory.includes(item) ? 'bg-white text-black border-white' : 'bg-white/5 border-white/10 text-gray-400'}`}>
                          <div className="flex justify-between items-center">
                            <span className="text-xs font-bold uppercase tracking-tight">{item}</span>
                            {formData.medicalHistory.includes(item) && <Check size={16} strokeWidth={4} />}
                          </div>
                        </button>
                      ))}
                      <button onClick={() => setFormData({...formData, medicalHistory: formData.medicalHistory.includes('None') ? [] : ['None']})} className={`w-full text-left p-6 rounded-2xl border transition-all ${formData.medicalHistory.includes('None') ? 'bg-white text-black border-white' : 'bg-white/5 border-white/10 text-gray-400'}`}>
                         <span className="text-xs font-bold uppercase tracking-tight">None of the above apply</span>
                      </button>
                    </div>
                  </div>
                )}
                
                <div className="flex items-center justify-between gap-6 pt-4">
                  <button 
                    onClick={() => intakeStep === 1 ? setStep('results') : setIntakeStep(1)}
                    className="text-[10px] font-black uppercase tracking-widest text-gray-500 hover:text-white transition-colors px-6"
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
                <div className="w-24 h-24 bg-[#0033FF] rounded-full flex items-center justify-center shadow-[0_0_50px_#0033FF]">
                  <Check size={48} className="text-white" strokeWidth={4} />
                </div>
                <div className="space-y-2">
                  <h1 className="text-6xl font-black uppercase tracking-tighter text-white">Status: <span className="text-[#0033FF]">Qualified.</span></h1>
                </div>
              </div>

              <div className="bg-[#111111] border border-white/5 rounded-[3rem] p-10 space-y-10">
                <p className="text-gray-400 text-lg leading-relaxed font-medium">
                  {formData.firstName}, your results indicate high compatibility for optimization. To finalize your protocol, we must complete the medical sequence below.
                </p>
                
                <div className="h-px bg-white/10" />
                
                <div className="space-y-6">
                  <h3 className="text-xs font-black uppercase tracking-[0.3em] text-[#0033FF] text-left">Your Next Mandated Steps</h3>
                  
                  <div className="space-y-4">
                    <div className="flex items-start gap-4 text-left bg-white/5 p-6 rounded-3xl border border-white/5">
                      <Calendar className="text-[#0033FF] shrink-0" size={24} />
                      <div className="space-y-1">
                        <p className="text-white font-black uppercase text-sm tracking-tight">1. Clinical Blood Analysis</p>
                        <p className="text-xs text-gray-500 font-medium">A precision biomarker panel is required to analyze your baseline levels and ensure safe administration.</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4 text-left bg-white/5 p-6 rounded-3xl border border-white/5">
                      <Stethoscope className="text-[#0033FF] shrink-0" size={24} />
                      <div className="space-y-1">
                        <p className="text-white font-black uppercase text-sm tracking-tight">2. Clinician Consultation</p>
                        <p className="text-xs text-gray-500 font-medium">Once labs are received, you will meet with a specialist to finalize your custom dosing and delivery routes.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <button className="w-full py-10 bg-white text-black rounded-full font-black text-xl uppercase tracking-[0.2em] shadow-[0_20px_50px_rgba(255,255,255,0.1)] hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-4">
                Schedule Your Blood Test <ArrowRight size={24} />
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}