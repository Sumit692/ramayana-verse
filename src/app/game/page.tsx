'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { quizzes } from '@/data/ramayana';
import { useUserProgress, useAppLanguage, useAppTheme } from '@/components/Providers';
import { getTranslatedQuizzes, getTranslation, speakText } from '@/data/translations';
import {
  Trophy,
  Star,
  Calendar,
  CheckCircle2,
  XCircle,
  Award,
  RefreshCw,
  Info,
  X,
  Volume2,
  VolumeX,
  Sparkles,
  ArrowRight,
  ArrowLeft,
  BookOpen,
  ChevronRight,
  Globe,
  Sun,
  Moon
} from 'lucide-react';

export default function GamePage() {
  const { xp, streak, addXp, resetProgress } = useUserProgress();
  const { language, setLanguage } = useAppLanguage();
  const { theme, toggleTheme } = useAppTheme();

  // Navigation states
  const [gameState, setGameState] = useState<'intro' | 'active'>('intro');
  const [introStep, setIntroStep] = useState<'prompt' | 'firing' | 'diwali'>('prompt');
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);

  // Quiz states
  const [activeQuizIndex, setActiveQuizIndex] = useState(0);
  const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [quizScore, setQuizScore] = useState(0);
  const [quizFinished, setQuizFinished] = useState(false);
  const [activeQuestions, setActiveQuestions] = useState<any[]>([]);
  const [isQuestionSpeaking, setIsQuestionSpeaking] = useState(false);

  const activeQuizzes = getTranslatedQuizzes(language);
  const activeQuiz = activeQuizzes[activeQuizIndex] || activeQuizzes[0];
  const currentQuestion = activeQuestions[currentQuestionIdx];

  // Simple date-seeded PRNG (Linear Congruential Generator / Sine hash)
  const seedRandom = (str: string) => {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
    return () => {
      const x = Math.sin(hash++) * 10000;
      return x - Math.floor(x);
    };
  };

  // Date-seeded Shuffle
  const shuffleArrayWithSeed = (array: any[], seed: string) => {
    const arr = [...array];
    const random = seedRandom(seed);
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  };

  // Select 10 questions based on today's calendar date seed
  useEffect(() => {
    const todaySeed = new Date().toDateString() + '-' + activeQuizIndex;
    const quizPool = activeQuizzes[activeQuizIndex]?.questions || [];
    const randomized = shuffleArrayWithSeed(quizPool, todaySeed).slice(0, 10);
    setActiveQuestions(randomized);
    setCurrentQuestionIdx(0);
    setSelectedOption(null);
    setIsAnswered(false);
    setQuizScore(0);
    setQuizFinished(false);
    if (typeof window !== 'undefined') window.speechSynthesis.cancel();
    setIsQuestionSpeaking(false);
  }, [activeQuizIndex, language]);

  const prevLevelRef = useRef<number | null>(null);
  const [showLevelUp, setShowLevelUp] = useState(false);
  const [levelUpVal, setLevelUpVal] = useState(1);

  // Play ascending C major arpeggio level up sound
  const playLevelUpSound = () => {
    if (!soundEnabled) return;
    try {
      const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
      const notes = [261.63, 329.63, 392.00, 523.25, 659.25, 783.99, 1046.50];
      notes.forEach((freq, idx) => {
        setTimeout(() => {
          const osc = audioCtx.createOscillator();
          const gain = audioCtx.createGain();
          osc.connect(gain);
          gain.connect(audioCtx.destination);
          osc.type = 'sine';
          osc.frequency.setValueAtTime(freq, audioCtx.currentTime);
          gain.gain.setValueAtTime(0.15, audioCtx.currentTime);
          gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.55);
          osc.start();
          osc.stop(audioCtx.currentTime + 0.55);
        }, idx * 110);
      });
    } catch (e) {
      console.warn('Audio Context failed', e);
    }
  };

  // Monitor Level Up events based on XP points increments
  useEffect(() => {
    const currentLevel = Math.floor(xp / 200) + 1;
    // Only trigger if we had a previous level recorded, and the level increased
    if (prevLevelRef.current !== null && currentLevel > prevLevelRef.current) {
      setLevelUpVal(currentLevel);
      setShowLevelUp(true);
      playLevelUpSound();
    }
    prevLevelRef.current = currentLevel;
  }, [xp]);

  // Synthesize Arrow Firing sound
  const playFireSound = () => {
    if (!soundEnabled) return;
    try {
      const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();

      osc.connect(gain);
      gain.connect(audioCtx.destination);

      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(120, audioCtx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(1600, audioCtx.currentTime + 0.8);

      gain.gain.setValueAtTime(0.25, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.8);

      osc.start();
      osc.stop(audioCtx.currentTime + 0.8);
    } catch (e) {
      console.warn('Audio Context failed', e);
    }
  };

  // Synthesize Explosion/Victory sound
  const playExplodeSound = () => {
    if (!soundEnabled) return;
    try {
      const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
      
      // Sub-bass rumble
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(280, audioCtx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(25, audioCtx.currentTime + 1.8);
      gain.gain.setValueAtTime(0.4, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 1.8);
      osc.start();
      osc.stop(audioCtx.currentTime + 1.8);

      // Spark/Chime tone
      const osc2 = audioCtx.createOscillator();
      const gain2 = audioCtx.createGain();
      osc2.connect(gain2);
      gain2.connect(audioCtx.destination);
      osc2.type = 'sine';
      osc2.frequency.setValueAtTime(880, audioCtx.currentTime);
      osc2.frequency.setValueAtTime(1100, audioCtx.currentTime + 0.1);
      osc2.frequency.setValueAtTime(1320, audioCtx.currentTime + 0.2);
      gain2.gain.setValueAtTime(0.15, audioCtx.currentTime);
      gain2.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.6);
      osc2.start();
      osc2.stop(audioCtx.currentTime + 0.6);
    } catch (e) {
      console.warn('Audio Context failed', e);
    }
  };

  const handleFireArrow = () => {
    setIntroStep('firing');
    playFireSound();
    
    // Trigger explosion after arrow reaches Ravana (0.9s travel time)
    setTimeout(() => {
      playExplodeSound();
      setIntroStep('diwali');
    }, 900);
  };

  const handleOptionClick = (idx: number) => {
    if (isAnswered) return;
    setSelectedOption(idx);
  };

  const handleCheckAnswer = () => {
    if (selectedOption === null || isAnswered || !currentQuestion) return;
    
    const isCorrect = selectedOption === currentQuestion.answer;
    if (isCorrect) {
      setQuizScore((prev) => prev + 1);
      addXp(25);
    }
    setIsAnswered(true);

    if (currentQuestionIdx === activeQuestions.length - 1) {
      const finalScore = quizScore + (isCorrect ? 1 : 0);
      fetch('/api/user', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          quizType: activeQuiz.category,
          score: finalScore,
          maxScore: activeQuestions.length,
        }),
      }).catch(console.error);
    }
  };

  const handleNextQuestion = () => {
    setSelectedOption(null);
    setIsAnswered(false);

    if (currentQuestionIdx < activeQuestions.length - 1) {
      setCurrentQuestionIdx((prev) => prev + 1);
    } else {
      setQuizFinished(true);
      addXp(50);
    }
  };

  const toggleQuestionSpeech = () => {
    if (isQuestionSpeaking) {
      if (typeof window !== 'undefined') window.speechSynthesis.cancel();
      setIsQuestionSpeaking(false);
      return;
    }

    if (!currentQuestion) return;
    const textToRead = `${currentQuestion.question}. ` + currentQuestion.options.map((opt: string, i: number) => `${i + 1}. ${opt}.`).join(' ');
    
    if (typeof window !== 'undefined') {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(textToRead);
      utterance.lang = language === 'Hindi' ? 'hi-IN' : 'en-US';
      utterance.rate = language === 'Hindi' ? 0.88 : 0.9;
      
      utterance.onend = () => setIsQuestionSpeaking(false);
      utterance.onerror = () => setIsQuestionSpeaking(false);
      
      setIsQuestionSpeaking(true);
      window.speechSynthesis.speak(utterance);
    }
  };

  const resetQuiz = () => {
    const todaySeed = new Date().toDateString() + '-' + activeQuizIndex;
    const quizPool = activeQuizzes[activeQuizIndex]?.questions || [];
    const randomized = shuffleArrayWithSeed(quizPool, todaySeed).slice(0, 10);
    setActiveQuestions(randomized);
    setCurrentQuestionIdx(0);
    setSelectedOption(null);
    setIsAnswered(false);
    setQuizScore(0);
    setQuizFinished(false);
    if (typeof window !== 'undefined') window.speechSynthesis.cancel();
    setIsQuestionSpeaking(false);
  };

  const badgesList = [
    {
      name: language === 'Hindi' ? 'सरयू अग्रगामी' : 'Sarayu Pioneer',
      description: language === 'Hindi' ? 'शास्त्रों की पावन यात्रा शुरू करें।' : 'Begin your journey across the scriptures.',
      xpRequired: 50
    },
    {
      name: language === 'Hindi' ? 'परम भक्त' : 'Devoted Disciple',
      description: language === 'Hindi' ? 'हनुमान एआई मार्गदर्शक से परामर्श करें।' : 'Consult the AI Hanuman Guide.',
      xpRequired: 150
    },
    {
      name: language === 'Hindi' ? 'सागर लांघक' : 'Ocean Leaper',
      description: language === 'Hindi' ? 'समयरेखा के 3 पड़ावों को अनलॉक करें।' : 'Unlock 3 timeline milestones.',
      xpRequired: 300
    },
    {
      name: language === 'Hindi' ? 'सेतु निर्माता' : 'Setu Architect',
      description: language === 'Hindi' ? 'सभी मानचित्र स्थलों का भ्रमण करें।' : 'Visits all sacred map coordinates.',
      xpRequired: 500
    },
    {
      name: language === 'Hindi' ? 'धर्म सम्राट' : 'Dharma King',
      description: language === 'Hindi' ? 'महाकाव्य पर पूर्ण विजय प्राप्त करें।' : 'Achieve absolute mastery of the epic.',
      xpRequired: 800
    },
  ];

  return (
    <div className="min-h-screen w-full bg-[#050505] text-white flex flex-col justify-between relative overflow-hidden font-inter">
      {/* Floating stars backdrop */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-saffron/5 via-transparent to-transparent pointer-events-none" />

      {/* HEADER CONTROLS */}
      <header className="fixed top-0 left-0 w-full px-6 py-4 flex items-center justify-between z-50 bg-[#050505]/70 backdrop-blur-md border-b border-white/5 shadow-md animate-fade-in">
        <a href="/" className="flex items-center gap-2 text-white/70 hover:text-white transition duration-300">
          <ArrowLeft className="w-4 h-4" />
          <span className="text-xs font-bold uppercase tracking-wider font-mono">
            {language === 'Hindi' ? 'मुख्य पृष्ठ पर लौटें' : 'Return Home'}
          </span>
        </a>
        <div className="flex items-center gap-4">
          <span className="text-saffron text-lg font-bold tracking-widest font-outfit hidden sm:inline">
            {language === 'Hindi' ? '🛕 राम की खोज' : '🛕 QUEST OF RAMA'}
          </span>

          {/* Language Selector Dropdown */}
          <div className="relative">
            <button
              onClick={() => setLangDropdownOpen(!langDropdownOpen)}
              className="p-2 rounded-full border border-white/10 bg-white/5 hover:border-gold/40 hover:bg-white/10 transition duration-300 text-white/80 flex items-center justify-center gap-1.5 cursor-pointer text-xs font-semibold uppercase tracking-wider"
            >
              <Globe className="w-4 h-4 text-gold" />
              <span className="hidden xs:inline">{language === 'Hindi' ? 'हिन्दी' : 'English'}</span>
            </button>
            
            <AnimatePresence>
              {langDropdownOpen && (
                <>
                  <div className="fixed inset-0 z-40" onClick={() => setLangDropdownOpen(false)} />
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    className="absolute right-0 mt-2 w-32 rounded-xl bg-black/90 border border-white/10 shadow-2xl backdrop-blur-lg p-1.5 z-50 flex flex-col gap-1"
                  >
                    <button
                      onClick={() => {
                        setLanguage('English');
                        setLangDropdownOpen(false);
                      }}
                      className={`w-full text-left px-3 py-2 rounded-lg text-xs font-medium transition cursor-pointer ${
                        language === 'English'
                          ? 'bg-gold/15 text-gold font-bold'
                          : 'text-white/70 hover:bg-white/5'
                      }`}
                    >
                      English
                    </button>
                    <button
                      onClick={() => {
                        setLanguage('Hindi');
                        setLangDropdownOpen(false);
                      }}
                      className={`w-full text-left px-3 py-2 rounded-lg text-xs font-medium transition cursor-pointer ${
                        language === 'Hindi'
                          ? 'bg-gold/15 text-gold font-bold'
                          : 'text-white/70 hover:bg-white/5'
                      }`}
                    >
                      हिन्दी
                    </button>
                  </motion.div>
                </>
              )}
            </AnimatePresence>
          </div>

          {/* Theme Selector Toggle */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full border border-white/10 bg-white/5 hover:border-gold/40 hover:bg-white/10 transition duration-300 text-white/80 cursor-pointer flex items-center justify-center gap-1.5 text-xs font-semibold uppercase tracking-wider"
            title={language === 'Hindi' ? 'थीम बदलें' : 'Toggle Theme'}
          >
            {theme === 'dark' ? <Sun className="w-4 h-4 text-gold" /> : <Moon className="w-4 h-4 text-gold" />}
            <span className="hidden xs:inline">
              {theme === 'dark' 
                ? (language === 'Hindi' ? 'प्रकाश' : 'Light') 
                : (language === 'Hindi' ? 'अंधकार' : 'Dark')}
            </span>
          </button>

          <button
            onClick={() => setSoundEnabled(!soundEnabled)}
            className="p-2 rounded-full border border-white/10 bg-white/5 hover:border-gold/40 hover:bg-white/10 transition duration-300 text-white/80 cursor-pointer"
          >
            {soundEnabled ? <Volume2 className="w-4 h-4 text-gold" /> : <VolumeX className="w-4 h-4" />}
          </button>
        </div>
      </header>

      {/* GAME STATE VIEWPORTS */}
      <main className="flex-1 w-full max-w-6xl mx-auto px-6 pt-24 pb-16 flex items-center justify-center z-10 relative">
        <AnimatePresence mode="wait">
          
          {/* CINEMATIC INTRO SEQUENCE */}
          {gameState === 'intro' && (
            <motion.div
              key="game-intro"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="w-full flex flex-col items-center justify-center text-center min-h-[70vh] relative"
            >
              {/* Skip Intro button */}
              <button
                onClick={() => setGameState('active')}
                className="absolute top-0 right-0 text-xs font-bold uppercase tracking-widest text-white/40 hover:text-white bg-white/5 border border-white/5 px-4 py-2 rounded-full cursor-pointer transition duration-300"
              >
                {language === 'Hindi' ? 'युद्ध अनुकरण छोड़ें >>' : 'Skip Battle Simulation >>'}
              </button>

              {introStep === 'prompt' && (
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  className="max-w-2xl space-y-6"
                >
                  <span className="text-saffron font-bold text-xs tracking-[0.25em] uppercase font-mono">
                    {language === 'Hindi' ? 'अनुकरण — लंका का महान युद्ध' : 'Simulation — The Great War of Lanka'}
                  </span>
                  <h1 className="text-4xl md:text-6xl font-extrabold font-outfit drop-shadow-md">
                    {language === 'Hindi' ? 'रावण वध' : 'Slayeth Ravana'}
                  </h1>
                  <p className="text-sm text-white/70 leading-relaxed font-inter">
                    {language === 'Hindi'
                      ? 'सोने की लंका घिर चुकी है। भगवान राम कोदंड धनुष उठाए तैयार खड़े हैं। रावण के कवच को भेदने और ब्रह्मांडीय संतुलन को बहाल करने के लिए एक अंतिम बाण बाकी है।'
                      : 'The golden citadel of Lanka is besieged. Lord Rama stands ready, Kodanda bow raised. One final arrow remains to pierce the armor of Ravana and restore cosmic balance.'}
                  </p>

                  {/* High-Fidelity Split Vector Battlefield Preview Panel */}
                  <div className="relative h-60 w-full rounded-3xl overflow-hidden border border-white/10 bg-black/40 flex items-center justify-between px-8 mb-4">
                    <div className="absolute inset-0 bg-gradient-to-r from-orange-950/15 via-black/90 to-purple-950/15 z-0 pointer-events-none" />
                    
                    {/* Rama Vector Side */}
                    <div className="z-10 opacity-40 hover:opacity-75 transition duration-300">
                      <svg className="w-32 h-32 text-gold drop-shadow-[0_0_15px_rgba(212,175,55,0.4)]" viewBox="0 0 100 100" fill="currentColor">
                        <path d="M 25,20 Q 55,50 25,80" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
                        <path d="M 25,20 L 15,50 L 25,80" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="2,2" />
                        <path d="M 15,50 L 22,50 L 25,35 L 12,35 Z" fill="currentColor" />
                        <circle cx="18" cy="28" r="4" fill="currentColor" />
                        <polygon points="17,24 19,16 21,24" fill="currentColor" />
                        <path d="M 12,50 L 35,50" fill="none" stroke="#FFF" strokeWidth="2" />
                        <polygon points="35,48 40,50 35,52" fill="#FFF" />
                      </svg>
                    </div>

                    <div className="z-10 p-6 flex flex-col items-center">
                      <Sparkles className="w-8 h-8 text-gold animate-bounce mb-2" />
                      <span className="text-[10px] text-white/50 uppercase tracking-widest font-mono">
                        {language === 'Hindi' ? 'ब्रह्मास्त्र बाण चलाएं' : 'Unleash the Brahmastra Arrow'}
                      </span>
                    </div>

                    {/* Ravana Vector Side */}
                    <div className="z-10 opacity-30 hover:opacity-60 transition duration-300">
                      <svg className="w-36 h-32 text-purple-600 drop-shadow-[0_0_20px_rgba(168,85,247,0.4)]" viewBox="0 0 120 100" fill="currentColor">
                        <path d="M 80,80 L 95,80 L 105,55 L 75,55 Z" fill="currentColor" />
                        <circle cx="90" cy="35" r="5.5" fill="currentColor" />
                        <polygon points="87,30 90,20 93,30" fill="gold" />
                        <circle cx="88.5" cy="35" r="0.8" fill="red" />
                        <circle cx="91.5" cy="35" r="0.8" fill="red" />
                        <circle cx="81" cy="37" r="4.5" fill="currentColor" />
                        <circle cx="80" cy="37" r="0.6" fill="red" />
                        <circle cx="82" cy="37" r="0.6" fill="red" />
                        <circle cx="99" cy="37" r="4.5" fill="currentColor" />
                        <circle cx="98" cy="37" r="0.6" fill="red" />
                        <circle cx="100" cy="37" r="0.6" fill="red" />
                      </svg>
                    </div>
                  </div>

                  <button
                    onClick={handleFireArrow}
                    className="w-full sm:w-auto px-8 py-4 rounded-full bg-gradient-to-r from-gold via-saffron to-orange-600 text-black font-extrabold text-sm uppercase tracking-widest transition duration-300 shadow-[0_0_30px_rgba(242,123,33,0.35)] hover:scale-105 cursor-pointer"
                  >
                    {language === 'Hindi' ? 'दिव्य बाण छोड़ें' : 'Release Divine Arrow'}
                  </button>
                </motion.div>
              )}

              {introStep === 'firing' && (
                <div className="w-full max-w-4xl h-80 border border-white/10 bg-black/60 rounded-3xl relative overflow-hidden flex items-center justify-between px-16">
                  {/* Flashing atmospheric lightning backdrop */}
                  <motion.div 
                    animate={{ opacity: [0.1, 0.3, 0.1, 0.4, 0.1] }}
                    transition={{ repeat: Infinity, duration: 2.5 }}
                    className="absolute inset-0 bg-gradient-to-r from-orange-950/20 via-black to-purple-950/20 z-0" 
                  />
                  
                  {/* Left Side: Lord Rama drawing Bow */}
                  <motion.div
                    animate={{ y: [-2, 2, -2] }}
                    transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}
                    className="z-10 flex flex-col items-center gap-2"
                  >
                    <svg className="w-48 h-48 text-gold drop-shadow-[0_0_20px_rgba(212,175,55,0.7)]" viewBox="0 0 100 100" fill="currentColor">
                      <path d="M 25,20 Q 55,50 25,80" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
                      <path d="M 25,20 L 15,50 L 25,80" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="2,2" />
                      <path d="M 15,50 L 22,50 L 25,35 L 12,35 Z" fill="currentColor" />
                      <path d="M 12,35 Q 2,42 0,55 Q 8,50 12,45" fill="currentColor" opacity="0.5" />
                      <circle cx="18" cy="28" r="4" fill="currentColor" />
                      <polygon points="17,24 19,16 21,24" fill="currentColor" />
                      <path d="M 15,28 Q 5,30 2,38 Q 8,34 15,31" fill="currentColor" opacity="0.9" />
                      <path d="M 18,36 L 15,50 L 24,50" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                      <path d="M 12,50 L 35,50" fill="none" stroke="#FFF" strokeWidth="2" />
                      <polygon points="35,48 40,50 35,52" fill="#FFF" />
                    </svg>
                    <span className="text-[9px] font-bold text-gold tracking-widest font-mono uppercase">
                      {language === 'Hindi' ? 'भगवान राम' : 'LORD RAMA'}
                    </span>
                  </motion.div>

                  {/* Traveling Divine Arrow */}
                  <motion.div
                    initial={{ x: 0, opacity: 0, scale: 0.8 }}
                    animate={{ x: 420, opacity: [0, 1, 1, 0.7], scale: [0.8, 1.2, 1] }}
                    transition={{ duration: 0.9, ease: 'easeIn' }}
                    className="absolute left-44 z-20"
                  >
                    <svg className="w-16 h-8 text-gold drop-shadow-[0_0_12px_rgba(242,123,33,0.9)]" viewBox="0 0 60 20" fill="currentColor">
                      <path d="M 0,10 L 45,10" stroke="#FFF" strokeWidth="3" strokeLinecap="round" />
                      <polygon points="45,6 58,10 45,14" fill="gold" />
                      <path d="M 0,10 L 10,4 M 0,10 L 10,16" stroke="gold" strokeWidth="2" />
                    </svg>
                  </motion.div>

                  {/* Right Side: Ravana (Ten crowned heads, glowing red eyes) */}
                  <motion.div
                    animate={{ x: [-1, 1, -1], rotate: [-0.5, 0.5, -0.5] }}
                    transition={{ repeat: Infinity, duration: 0.15 }}
                    className="z-10 flex flex-col items-center gap-2"
                  >
                    <svg className="w-56 h-48 text-purple-700/80 drop-shadow-[0_0_20px_rgba(168,85,247,0.5)]" viewBox="0 0 120 100" fill="currentColor">
                      <path d="M 80,80 L 95,80 L 105,55 L 75,55 Z" fill="currentColor" opacity="0.8" />
                      
                      {/* Head 1 (Center) */}
                      <circle cx="90" cy="35" r="5.5" fill="currentColor" />
                      <polygon points="87,30 90,20 93,30" fill="gold" />
                      <circle cx="88.5" cy="35" r="1.1" fill="red" />
                      <circle cx="91.5" cy="35" r="1.1" fill="red" />
                      
                      {/* Left heads */}
                      <circle cx="81" cy="37" r="4.5" fill="currentColor" />
                      <polygon points="79,33 81,25 83,33" fill="gold" />
                      <circle cx="80" cy="37" r="0.8" fill="red" />
                      <circle cx="82" cy="37" r="0.8" fill="red" />

                      <circle cx="73" cy="40" r="4" fill="currentColor" />
                      <polygon points="71,36 73,28 75,36" fill="gold" />
                      <circle cx="72" cy="40" r="0.7" fill="red" />
                      <circle cx="74" cy="40" r="0.7" fill="red" />

                      <circle cx="66" cy="44" r="3.5" fill="currentColor" />
                      <circle cx="65.2" cy="44" r="0.6" fill="red" />
                      <circle cx="66.8" cy="44" r="0.6" fill="red" />

                      <circle cx="60" cy="49" r="3" fill="currentColor" />
                      <circle cx="59.3" cy="49" r="0.5" fill="red" />
                      <circle cx="60.7" cy="49" r="0.5" fill="red" />

                      {/* Right heads */}
                      <circle cx="99" cy="37" r="4.5" fill="currentColor" />
                      <polygon points="97,33 99,25 101,33" fill="gold" />
                      <circle cx="98" cy="37" r="0.8" fill="red" />
                      <circle cx="100" cy="37" r="0.8" fill="red" />

                      <circle cx="107" cy="40" r="4" fill="currentColor" />
                      <polygon points="105,36 107,28 109,36" fill="gold" />
                      <circle cx="106" cy="40" r="0.7" fill="red" />
                      <circle cx="108" cy="40" r="0.7" fill="red" />

                      <circle cx="114" cy="44" r="3.5" fill="currentColor" />
                      <circle cx="113.2" cy="44" r="0.6" fill="red" />
                      <circle cx="114.8" cy="44" r="0.6" fill="red" />

                      <circle cx="120" cy="49" r="3" fill="currentColor" />
                      <circle cx="119.3" cy="49" r="0.5" fill="red" />
                      <circle cx="120.7" cy="49" r="0.5" fill="red" />
                    </svg>
                    <span className="text-[9px] font-bold text-purple-400 tracking-widest font-mono uppercase">
                      {language === 'Hindi' ? 'रावण' : 'RAVANA'}
                    </span>
                  </motion.div>
                </div>
              )}

              {introStep === 'diwali' && (
                <DiwaliCelebration 
                  soundEnabled={soundEnabled} 
                  language={language}
                  onComplete={() => {
                    setGameState('active');
                  }} 
                />
              )}

            </motion.div>
          )}

          {/* ACTIVE QUEST DASHBOARD & QUIZZES */}
          {gameState === 'active' && (
            <motion.div
              key="game-dashboard"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="w-full flex flex-col gap-12"
            >
              {/* Dashboard Header */}
              <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-white/5 pb-6">
                <div>
                  <span className="text-saffron font-bold text-xs tracking-[0.25em] uppercase font-mono">
                    {language === 'Hindi' ? 'प्रगति — आध्यात्मिक स्तर' : 'Progression — Spiritual Level'}
                  </span>
                  <h1 className="text-3xl md:text-5xl font-bold font-outfit mt-2">
                    {language === 'Hindi' ? 'प्रगति और प्रश्नोत्तरी' : 'Progression & Quizzes'}
                  </h1>
                </div>
              </div>

              {/* Main Layout Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
                
                {/* Left Column: Progress Board & Badges */}
                <div className="lg:col-span-5 flex flex-col gap-6">
                  
                  {/* Status Board */}
                  <div className="glass p-6 rounded-3xl bg-black/40 border border-white/5 flex flex-col gap-6">
                    <h4 className="text-xs uppercase font-bold text-white/40 tracking-wider font-mono">
                      {language === 'Hindi' ? 'स्थिति फलक' : 'Status Board'}
                    </h4>

                    <div className="grid grid-cols-3 gap-4 text-center">
                      <div className="bg-white/5 p-4 rounded-2xl border border-white/5 flex flex-col items-center">
                        <Star className="w-5 h-5 text-gold mb-1" />
                        <span className="block text-[9px] text-white/40 uppercase font-mono mb-1">
                          {language === 'Hindi' ? 'XP अंक' : 'XP Points'}
                        </span>
                        <strong className="text-lg font-bold text-white font-outfit">{xp}</strong>
                      </div>

                      <div className="bg-white/5 p-4 rounded-2xl border border-white/5 flex flex-col items-center">
                        <Calendar className="w-5 h-5 text-saffron mb-1" />
                        <span className="block text-[9px] text-white/40 uppercase font-mono mb-1">
                          {language === 'Hindi' ? 'सक्रियता' : 'Streak'}
                        </span>
                        <strong className="text-lg font-bold text-white font-outfit">
                          {streak} {language === 'Hindi' ? 'दिन' : 'Days'}
                        </strong>
                      </div>

                      <div className="bg-white/5 p-4 rounded-2xl border border-white/5 flex flex-col items-center">
                        <Trophy className="w-5 h-5 text-emerald-400 mb-1" />
                        <span className="block text-[9px] text-white/40 uppercase font-mono mb-1">
                          {language === 'Hindi' ? 'स्तर' : 'Level'}
                        </span>
                        <strong className="text-lg font-bold text-white font-outfit">{Math.floor(xp / 200) + 1}</strong>
                      </div>
                    </div>

                    {/* Reset Button */}
                    <button
                      onClick={async () => {
                        const confirmMsg = language === 'Hindi'
                          ? "क्या आप निश्चित रूप से अपनी सभी प्रगति, XP और सक्रियता को शून्य पर रीसेट करना चाहते हैं? इसे बदला नहीं जा सकता।"
                          : "Are you sure you want to reset all your progress, XP, and streaks back to zero? This cannot be undone.";
                        if (confirm(confirmMsg)) {
                          await resetProgress();
                          setIntroStep('prompt');
                          setGameState('intro');
                          alert(
                            language === 'Hindi'
                              ? "सभी प्रगति सफलतापूर्वक रीसेट हो गई! अपनी खोज को पुनः सक्रिय करने के लिए युद्ध में लौटें।"
                              : "All progression reset successfully! Return to battle to unlock your quest again."
                          );
                        }
                      }}
                      className="w-full py-2.5 rounded-2xl border border-red-500/20 bg-red-500/5 hover:bg-red-500/10 text-red-400 text-xs font-bold uppercase tracking-wider transition duration-300 cursor-pointer flex items-center justify-center gap-2"
                    >
                      <RefreshCw className="w-3.5 h-3.5" />
                      {language === 'Hindi' ? 'प्रगति रीसेट करें' : 'Reset All Quest Progress'}
                    </button>
                  </div>

                  {/* Achievements Badges Card */}
                  <div className="glass p-6 rounded-3xl bg-black/40 border border-white/5 flex flex-col">
                    <h4 className="text-xs uppercase font-bold text-white/40 tracking-wider mb-4 font-mono">
                      {language === 'Hindi' ? 'उपलब्धि पदक' : 'Achievements Badges'}
                    </h4>

                    <div className="space-y-3">
                      {badgesList.map((badge, idx) => {
                        const isUnlocked = xp >= badge.xpRequired;
                        return (
                          <div
                            key={idx}
                            className={`p-3 rounded-2xl border flex items-center gap-4 transition duration-300 ${
                              isUnlocked
                                ? 'border-gold/25 bg-gold/5 text-white'
                                : 'border-white/5 bg-black/30 text-white/40'
                            }`}
                          >
                            <div className={`p-2 rounded-xl ${
                              isUnlocked ? 'bg-gold/10 text-gold shadow-[0_0_15px_rgba(212,175,55,0.25)]' : 'bg-white/5 text-white/30'
                            }`}>
                              <Award className="w-5 h-5" />
                            </div>
                            <div>
                              <h5 className="text-xs font-bold font-outfit">{badge.name}</h5>
                              <p className="text-[9px] text-white/50 leading-relaxed mt-0.5">{badge.description}</p>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                </div>

                {/* Right Column: Quiz Module */}
                <div className="lg:col-span-7 rounded-3xl glass-premium p-6 md:p-8 flex flex-col justify-between relative bg-black/60 border border-white/5 overflow-hidden">
                  
                  <AnimatePresence mode="wait">
                    {!quizFinished ? (
                      <motion.div
                        key="quiz-body"
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        className="flex flex-col justify-between h-full min-h-[420px]"
                      >
                        {!currentQuestion ? (
                          <div className="flex-1 flex flex-col items-center justify-center text-center p-12">
                            <RefreshCw className="w-8 h-8 animate-spin text-gold mb-3" />
                            <span className="text-xs text-white/50 uppercase tracking-widest font-mono">
                              {language === 'Hindi' ? '१० प्रश्न तैयार किए जा रहे हैं...' : 'Drawing 10 Quest Questions...'}
                            </span>
                          </div>
                        ) : (
                          <>
                            <div>
                              {/* Quiz title header */}
                              <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-white/5 pb-4 mb-6 gap-3">
                                <div>
                                  <span className="text-[9px] font-bold font-mono tracking-widest text-saffron uppercase">
                                    {language === 'Hindi' ? 'इंटरैक्टिव चुनौती' : 'Interactive Challenge'}
                                  </span>
                                  <h3 className="text-lg font-bold text-white font-outfit mt-0.5">
                                    {activeQuiz.title}
                                  </h3>
                                </div>
                                <div className="flex flex-wrap gap-1.5">
                                  {activeQuizzes.map((q, idx) => (
                                    <button
                                      key={q.id}
                                      onClick={() => {
                                        setActiveQuizIndex(idx);
                                      }}
                                      className={`text-[9px] font-semibold uppercase tracking-wider px-2.5 py-1.5 rounded border transition cursor-pointer ${
                                        activeQuizIndex === idx
                                          ? 'bg-gold/15 border-gold/40 text-gold'
                                          : 'border-white/5 text-white/40 hover:text-white bg-white/5'
                                      }`}
                                    >
                                      {language === 'Hindi' ? `प्रश्नोत्तरी ${idx + 1}` : `Quiz ${idx + 1}`}
                                    </button>
                                  ))}
                                </div>
                              </div>

                              {/* Question Card */}
                              <div className="mb-6 flex items-start justify-between gap-4">
                                <div>
                                  <span className="text-[10px] text-gold font-bold uppercase tracking-wider font-mono">
                                    {language === 'Hindi' ? `प्रश्न ${currentQuestionIdx + 1} / ${activeQuestions.length}` : `Question ${currentQuestionIdx + 1} of ${activeQuestions.length}`}
                                  </span>
                                  <h4 className="text-base md:text-lg font-bold text-white mt-1 leading-relaxed">
                                    {currentQuestion.question}
                                  </h4>
                                </div>
                                <button
                                  onClick={toggleQuestionSpeech}
                                  className={`p-2 rounded-full border transition duration-300 flex-shrink-0 ${
                                    isQuestionSpeaking
                                      ? 'bg-gold/20 border-gold text-gold shadow-[0_0_12px_rgba(212,175,55,0.4)] animate-pulse'
                                      : 'bg-white/5 border-white/10 hover:border-gold/40 text-white/70 hover:text-white'
                                  } cursor-pointer`}
                                  title={language === 'Hindi' ? 'प्रश्न सुनें' : 'Listen to Question'}
                                >
                                  {isQuestionSpeaking ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
                                </button>
                              </div>

                              {/* Options list */}
                              <div className="space-y-2.5 mb-6">
                                {currentQuestion.options.map((opt: string, i: number) => {
                                  const isSelected = selectedOption === i;
                                  const isCorrectAnswer = i === currentQuestion.answer;
                                  
                                  return (
                                    <div
                                      key={i}
                                      onClick={() => handleOptionClick(i)}
                                      className={`p-4 rounded-2xl border transition duration-300 cursor-pointer flex items-center justify-between ${
                                        isAnswered
                                          ? isCorrectAnswer
                                            ? 'border-emerald-500/30 bg-emerald-500/10 text-emerald-400'
                                            : isSelected
                                            ? 'border-red-500/30 bg-red-500/10 text-red-400'
                                            : 'border-white/5 bg-black/20 text-white/40'
                                          : isSelected
                                          ? 'border-gold bg-gold/5 text-white'
                                          : 'border-white/5 bg-black/40 hover:border-white/20 text-white/80'
                                      }`}
                                    >
                                      <span className="text-xs font-medium font-inter">{opt}</span>
                                      {isAnswered && (
                                        <span>
                                          {isCorrectAnswer ? (
                                            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                                          ) : isSelected ? (
                                            <XCircle className="w-4 h-4 text-red-400" />
                                          ) : null}
                                        </span>
                                      )}
                                    </div>
                                  );
                                })}
                              </div>
                            </div>

                            {/* Action buttons */}
                            <div className="border-t border-white/5 pt-4 flex justify-between items-center">
                              <span className="text-[10px] text-white/40 uppercase font-mono">
                                {isAnswered 
                                  ? (language === 'Hindi' ? 'व्याख्या देखें' : 'Check Explanation') 
                                  : (language === 'Hindi' ? 'आगे बढ़ने के लिए विकल्प चुनें' : 'Choose option to proceed')}
                              </span>
                              {!isAnswered ? (
                                <button
                                  disabled={selectedOption === null}
                                  onClick={handleCheckAnswer}
                                  className="px-6 py-2.5 rounded-full bg-gold text-black text-xs font-bold uppercase tracking-wider disabled:opacity-40 transition cursor-pointer"
                                >
                                  {language === 'Hindi' ? 'उत्तर सबमिट करें' : 'Submit Answer'}
                                </button>
                              ) : (
                                <button
                                  onClick={handleNextQuestion}
                                  className="px-6 py-2.5 rounded-full bg-gradient-to-r from-gold to-saffron text-black text-xs font-bold uppercase tracking-wider transition cursor-pointer flex items-center gap-1.5"
                                >
                                  <span>
                                    {currentQuestionIdx < activeQuestions.length - 1
                                      ? (language === 'Hindi' ? 'अगला प्रश्न' : 'Next Question')
                                      : (language === 'Hindi' ? 'प्रश्नोत्तरी समाप्त करें' : 'Finish Quiz')}
                                  </span>
                                  <ChevronRight className="w-4 h-4" />
                                </button>
                              )}
                            </div>
                          </>
                        )}

                      </motion.div>
                    ) : (
                      <motion.div
                        key="quiz-results"
                        initial={{ opacity: 0, scale: 0.98 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0 }}
                        className="flex flex-col items-center justify-center text-center h-full min-h-[400px] space-y-6"
                      >
                        <div className="p-4 rounded-full bg-gold/10 border border-gold/20 text-gold shadow-[0_0_30px_rgba(212,175,55,0.25)]">
                          <Trophy className="w-12 h-12" />
                        </div>

                        <div>
                          <h3 className="text-2xl font-extrabold font-outfit text-white">
                            {language === 'Hindi' ? 'प्रश्नोत्तरी पूर्ण!' : 'Quiz Complete!'}
                          </h3>
                          <p className="text-sm text-white/60 mt-2 max-w-md mx-auto leading-relaxed">
                            {language === 'Hindi' ? (
                              <>
                                आपने <strong>{activeQuestions.length}</strong> में से <strong>{quizScore}</strong> प्रश्नों के सही उत्तर दिए हैं। आपको <strong>+५० XP</strong> बोनस अंक प्राप्त हुए हैं!
                              </>
                            ) : (
                              <>
                                You got <strong>{quizScore}</strong> out of {activeQuestions.length} questions correct. You have been rewarded with <strong>+50 XP</strong> bonus points!
                              </>
                            )}
                          </p>
                        </div>

                        <div className="flex gap-3">
                          <button
                            onClick={resetQuiz}
                            className="px-6 py-2.5 rounded-full border border-white/10 bg-white/5 hover:bg-white/10 text-xs font-bold uppercase tracking-wider transition cursor-pointer flex items-center gap-1.5 text-white"
                          >
                            <RefreshCw className="w-4 h-4" /> {language === 'Hindi' ? 'पुनः प्रयास करें' : 'Try Again'}
                          </button>
                          <a
                            href="/#universe"
                            className="px-6 py-2.5 rounded-full bg-gradient-to-r from-gold to-saffron text-black text-xs font-bold uppercase tracking-wider transition hover:scale-105 cursor-pointer shadow-md"
                          >
                            {language === 'Hindi' ? 'चरित्र संग्रह देखें' : 'Browse Pantheon'}
                          </a>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                </div>
              </div>

              {/* WARNING SIGN FOOTER */}
              <div className="border border-red-500/20 bg-red-500/5 p-5 rounded-3xl flex flex-col md:flex-row items-center gap-4 text-center md:text-left mt-8">
                <div className="p-3 rounded-2xl bg-red-500/10 text-red-500 shadow-md">
                  <XCircle className="w-8 h-8" />
                </div>
                <div className="space-y-1">
                  <h4 className="text-sm font-extrabold uppercase tracking-widest text-red-500 font-mono">
                    {language === 'Hindi' ? '⚠️ महत्वपूर्ण चेतावनी — सक्रियता काउंटर सक्रिय' : '⚠️ Critical Warning — Streak Decay Active'}
                  </h4>
                  <p className="text-xs text-white/70 leading-relaxed font-inter">
                    {language === 'Hindi'
                      ? 'धर्म के लिए निरंतर दैनिक समर्पण आवश्यक है। अपनी आध्यात्मिक प्रगति और सक्रियता बनाए रखने के लिए, आपको प्रतिदिन रामानुजवर्स क्वेस्ट खोलना होगा। यदि आप एक भी दिन छोड़ते हैं, तो आपकी दैनिक सक्रियता तुरंत समाप्त (० दिन) हो जाएगी।'
                      : 'Dharma requires absolute, daily dedication. To maintain your spiritual streak progress, you must open the RamayanaVerse Quest every single day. If you miss a single day, the server-side streak counter resets to 0 Days immediately and your progression streak starts from scratch.'}
                  </p>
                </div>
              </div>

            </motion.div>
          )}

        </AnimatePresence>
      </main>

      {/* FOOTER BAR */}
      <footer className="w-full border-t border-white/5 py-6 px-6 text-center text-xs text-white/40 bg-[#050505] z-10 pointer-events-auto">
        <div className="max-w-6xl mx-auto w-full flex flex-col sm:flex-row items-center justify-between gap-4">
          <span>&copy; {new Date().getFullYear()} RamayanaVerse Quest. {language === 'Hindi' ? 'सर्वाधिकार सुरक्षित।' : 'All Rights Reserved.'}</span>
          <span className="font-mono text-[10px] uppercase text-gold">
            {language === 'Hindi' ? 'धर्मो रक्षति रक्षितः' : 'Dharma Protects Those Who Protect It'}
          </span>
        </div>
      </footer>

      {/* LEVEL UP CELEBRATION MODAL */}
      <AnimatePresence>
        {showLevelUp && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/90 backdrop-blur-md z-[100] flex items-center justify-center p-6 text-center"
          >
            <motion.div
              initial={{ scale: 0.9, y: 30 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: -30 }}
              className="max-w-md p-8 rounded-3xl border border-gold/30 bg-[#080808]/90 shadow-[0_0_50px_rgba(212,175,55,0.25)] flex flex-col items-center gap-6"
            >
              <div className="w-20 h-20 rounded-full bg-gold/15 border border-gold/30 flex items-center justify-center text-4xl animate-bounce shadow-inner">
                🌟
              </div>
              
              <div className="space-y-2">
                <span className="text-[10px] font-bold font-mono tracking-widest text-saffron uppercase">
                  {language === 'Hindi' ? 'आध्यात्मिक आरोहण' : 'Spiritual Ascension'}
                </span>
                <h2 className="text-3xl font-extrabold font-outfit text-white">
                  {language === 'Hindi' ? 'स्तर बढ़ा!' : 'Level Up!'}
                </h2>
                <p className="text-sm text-white/70 leading-relaxed font-inter">
                  {language === 'Hindi'
                    ? 'बधाई हो! आपकी भक्ति और पवित्र ग्रंथों के ज्ञान ने आपको नए स्तर पर पहुंचा दिया है:'
                    : 'Congratulations! Your devotion and knowledge of the epic scriptures has elevated you to:'}
                </p>
                <div className="text-4xl font-extrabold font-outfit text-gold py-2 mt-2">
                  {language === 'Hindi' ? `स्तर ${levelUpVal}` : `LEVEL ${levelUpVal}`}
                </div>
              </div>

              <button
                onClick={() => setShowLevelUp(false)}
                className="px-8 py-3 rounded-full bg-gradient-to-r from-gold to-saffron text-black font-extrabold text-xs uppercase tracking-widest shadow-lg hover:scale-105 transition cursor-pointer"
              >
                {language === 'Hindi' ? 'खोज जारी रखें' : 'Continue Quest'}
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}

interface DiwaliCelebrationProps {
  soundEnabled: boolean;
  language: string;
  onComplete: () => void;
}

function DiwaliCelebration({ soundEnabled, language, onComplete }: DiwaliCelebrationProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    let particles: any[] = [];
    let rockets: any[] = [];

    const playPopSound = () => {
      if (!soundEnabled) return;
      try {
        const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        osc.connect(gain);
        gain.connect(audioCtx.destination);
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(160 + Math.random() * 80, audioCtx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(10, audioCtx.currentTime + 0.12);
        gain.gain.setValueAtTime(0.15, audioCtx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.12);
        osc.start();
        osc.stop(audioCtx.currentTime + 0.12);
      } catch (e) {}
    };

    const loop = () => {
      ctx.fillStyle = 'rgba(5, 5, 5, 0.2)';
      ctx.fillRect(0, 0, width, height);

      if (Math.random() < 0.05 && rockets.length < 5) {
        rockets.push({
          x: Math.random() * width,
          y: height,
          tx: Math.random() * width,
          ty: Math.random() * (height * 0.5) + height * 0.1,
          vx: (Math.random() - 0.5) * 2,
          vy: -(Math.random() * 5 + 8),
          color: `hsl(${Math.random() * 360}, 100%, 60%)`,
        });
      }

      for (let i = rockets.length - 1; i >= 0; i--) {
        const r = rockets[i];
        r.x += r.vx;
        r.y += r.vy;

        ctx.beginPath();
        ctx.arc(r.x, r.y, 2, 0, Math.PI * 2);
        ctx.fillStyle = '#FFF';
        ctx.fill();

        if (r.vy >= 0 || r.y <= r.ty) {
          playPopSound();
          const numParticles = 40 + Math.floor(Math.random() * 20);
          for (let p = 0; p < numParticles; p++) {
            const angle = Math.random() * Math.PI * 2;
            const speed = Math.random() * 4 + 1;
            particles.push({
              x: r.x,
              y: r.y,
              vx: Math.cos(angle) * speed,
              vy: Math.sin(angle) * speed,
              color: r.color,
              alpha: 1,
              decay: Math.random() * 0.02 + 0.015,
              size: Math.random() * 2 + 1,
            });
          }
          rockets.splice(i, 1);
        }
      }

      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.06;
        p.alpha -= p.decay;

        if (p.alpha <= 0) {
          particles.splice(i, 1);
          continue;
        }

        ctx.save();
        ctx.globalAlpha = p.alpha;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.shadowBlur = 6;
        ctx.shadowColor = p.color;
        ctx.fill();
        ctx.restore();
      }

      animationId = requestAnimationFrame(loop);
    };

    loop();

    const timer = setTimeout(() => {
      onComplete();
    }, 5000);

    return () => {
      cancelAnimationFrame(animationId);
      clearTimeout(timer);
      window.removeEventListener('resize', handleResize);
    };
  }, [soundEnabled, onComplete]);

  return (
    <div className="absolute inset-0 w-full h-full z-[85] bg-[#050505] flex flex-col justify-between items-center overflow-hidden">
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none" />

      <div className="z-10 text-center px-6 mt-32 max-w-xl space-y-6">
        <motion.h2
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl md:text-5xl font-extrabold font-outfit text-gold drop-shadow-[0_0_20px_rgba(212,175,55,0.4)] tracking-wide uppercase"
        >
          {language === 'Hindi' ? '🛕 रामराज्य का युग प्रारंभ' : '🛕 The Age of Ramrajya Begins'}
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="text-sm text-white/80 leading-relaxed font-inter"
        >
          {language === 'Hindi'
            ? 'धर्म की पुनर्स्थापना हुई है, और अंधकार पराजित हुआ है। ज्ञान और भक्ति के दिव्य दीपक जलाकर अयोध्या में भगवान राम के आगमन का स्वागत करें।'
            : 'Dharma is restored, and the darkness is vanquished. Welcome the return of Lord Rama to Ayodhya by lighting the divine diyas of wisdom and devotion.'}
        </motion.p>
      </div>

      <div className="z-10 flex gap-8 mb-20">
        {[...Array(5)].map((_, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 * idx + 0.8 }}
            className="flex flex-col items-center relative"
          >
            <div className="relative w-16 h-12">
              <motion.div
                animate={{
                  scaleY: [1, 1.2, 0.9, 1.1, 1],
                  rotate: [-3, 3, -1, 2, 0],
                  x: [-0.5, 0.5, -0.2, 0.2, 0],
                }}
                transition={{
                  repeat: Infinity,
                  duration: 1.5,
                  ease: 'easeInOut',
                  delay: idx * 0.1,
                }}
                className="absolute left-[24px] -top-8 w-6 h-10 origin-bottom"
              >
                <svg className="w-full h-full" viewBox="0 0 24 40">
                  <path
                    d="M 12,0 C 24,18 20,32 12,40 C 4,32 0,18 12,0 Z"
                    fill="url(#flame-grad-outer)"
                    filter="drop-shadow(0 0 8px rgba(249,115,22,0.8))"
                  />
                  <path
                    d="M 12,10 C 18,22 16,30 12,35 C 8,30 6,22 12,10 Z"
                    fill="url(#flame-grad-inner)"
                  />
                </svg>
              </motion.div>

              <svg className="w-16 h-12 text-[#b45309] drop-shadow-[0_4px_10px_rgba(0,0,0,0.5)]" viewBox="0 0 60 40" fill="currentColor">
                <defs>
                  <linearGradient id="flame-grad-outer" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#ef4444" />
                    <stop offset="50%" stopColor="#f97316" />
                    <stop offset="100%" stopColor="#eab308" />
                  </linearGradient>
                  <linearGradient id="flame-grad-inner" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#ffffff" />
                    <stop offset="100%" stopColor="#fbbf24" />
                  </linearGradient>
                </defs>
                <path d="M 5,10 C 5,30 55,30 55,10 Q 55,25 30,35 Q 5,25 5,10 Z" fill="#78350f" />
                <path d="M 5,10 C 15,18 45,18 55,10 C 55,10 52,14 30,14 C 8,14 5,10 5,10 Z" fill="#92400e" opacity="0.8" />
                <path d="M 5,10 Q 30,12 55,10" fill="none" stroke="#f59e0b" strokeWidth="1" opacity="0.6" />
              </svg>

              <div className="absolute top-4 left-1/2 -translate-x-1/2 w-14 h-6 rounded-full bg-saffron/10 blur-[8px] pointer-events-none" />
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
