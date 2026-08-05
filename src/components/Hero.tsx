'use client';

import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { Bell, ArrowDown, Volume2, VolumeX, Globe } from 'lucide-react';
import { useAppLanguage } from '@/components/Providers';
import { getTranslation } from '@/data/translations';

interface HeroProps {
  onBeginJourney: () => void;
}

export default function Hero({ onBeginJourney }: HeroProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [mounted, setMounted] = useState(false);
  const [bellRinging, setBellRinging] = useState(false);
  const { language, setLanguage } = useAppLanguage();
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);

  const manualRingBell = () => {
    setBellRinging(true);
    playRealisticBell().catch(console.error);
    setTimeout(() => setBellRinging(false), 1200);
  };

  const handleToggleSound = () => {
    setSoundEnabled((prev) => {
      const next = !prev;
      localStorage.setItem('ramayana_sound_enabled', String(next));
      return next;
    });
  };

  // Play real temple bell MP3 audio, trimmed to only play the first strike
  const playRealisticBell = async () => {
    try {
      console.log('🔔 [RamayanaVerse] Playing trimmed temple bell audio...');
      const audio = new Audio('/temple-bell.mp3');
      audio.volume = 1.0;
      await audio.play();

      // Trim audio: fade out and pause after 2.3 seconds to capture only the first bell ring
      setTimeout(() => {
        let fadeInterval = setInterval(() => {
          if (audio.volume > 0.05) {
            audio.volume = Math.max(0, audio.volume - 0.05);
          } else {
            clearInterval(fadeInterval);
            audio.pause();
            audio.currentTime = 0;
          }
        }, 25);
      }, 2300);
    } catch (e) {
      console.warn('🔔 [RamayanaVerse] Bell audio playback blocked or failed:', e);
    }
  };

  // Play bell on load/refresh, using interactive capture-phase fallback listeners to guarantee playback around browser autoplay block
  useEffect(() => {
    let isEnabled = true;
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('ramayana_sound_enabled');
      if (stored === 'false') {
        isEnabled = false;
        setSoundEnabled(false);
      } else {
        setSoundEnabled(true);
      }
    }

    let hasPlayed = false;
    
    const triggerBell = () => {
      if (hasPlayed || !isEnabled) return;
      hasPlayed = true;
      console.log('🔔 [RamayanaVerse] Trigger event caught. Initializing audio...');
      playRealisticBell().catch(console.error);
      
      // Cleanup all fallback listeners
      window.removeEventListener('click', triggerBell, { capture: true });
      window.removeEventListener('touchstart', triggerBell, { capture: true });
      window.removeEventListener('scroll', triggerBell, { capture: true });
      window.removeEventListener('mousedown', triggerBell, { capture: true });
      window.removeEventListener('keydown', triggerBell, { capture: true });
    };

    // Attempt direct play immediately (works in browsers that allow autoplay based on engagement score)
    const timeout = setTimeout(triggerBell, 300);

    // Register capture-phase interaction event listeners to guarantee prompt trigger
    window.addEventListener('click', triggerBell, { capture: true, once: true });
    window.addEventListener('touchstart', triggerBell, { capture: true, once: true });
    window.addEventListener('scroll', triggerBell, { capture: true, once: true });
    window.addEventListener('mousedown', triggerBell, { capture: true, once: true });
    window.addEventListener('keydown', triggerBell, { capture: true, once: true });

    return () => {
      clearTimeout(timeout);
      window.removeEventListener('click', triggerBell, { capture: true });
      window.removeEventListener('touchstart', triggerBell, { capture: true });
      window.removeEventListener('scroll', triggerBell, { capture: true });
      window.removeEventListener('mousedown', triggerBell, { capture: true });
      window.removeEventListener('keydown', triggerBell, { capture: true });
    };
  }, []);

  // Track mouse coordinates for subtle parallax tilt
  useEffect(() => {
    setMounted(true);
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const x = (clientX / window.innerWidth - 0.5) * 30; // Max 30px drift
      const y = (clientY / window.innerHeight - 0.5) * 30;
      setMousePos({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Track scroll position for parallax camera zoom/push
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  const skyY = useTransform(scrollYProgress, [0, 1], [0, 100]);
  const sunScale = useTransform(scrollYProgress, [0, 1], [1, 1.4]);
  const mountainY = useTransform(scrollYProgress, [0, 1], [0, -50]);
  const palaceY = useTransform(scrollYProgress, [0, 1], [0, -90]);
  const riverScale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);
  const heroContentY = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const heroContentOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  return (
    <div
      ref={containerRef}
      className="relative w-full h-screen overflow-hidden flex flex-col justify-between pt-24 sm:pt-28 lg:pt-32"
      style={{
        background: 'linear-gradient(to bottom, #030303 0%, #0d0a0d 50%, #171015 100%)',
      }}
    >
      {/* 1. SKY & SUNRISE LAYER */}
      <motion.div
        className="absolute inset-0 pointer-events-none z-0"
        style={{ y: skyY }}
      >
        {/* Dynamic Sunrise Radial Aura */}
        <div className="absolute top-[25%] left-1/2 -translate-x-1/2 w-[80vw] h-[80vw] max-w-[800px] max-h-[800px] rounded-full bg-gradient-to-tr from-saffron/40 via-gold/15 to-transparent blur-[120px] mix-blend-screen" />
        
        {/* Pulsing Sun Orb */}
        <motion.div
          className="absolute top-[35%] left-1/2 -translate-x-1/2 w-48 h-48 rounded-full bg-gradient-to-tr from-orange-400 via-yellow-200 to-white shadow-[0_0_100px_rgba(251,146,60,0.6)] mix-blend-screen"
          style={{ scale: sunScale, x: mousePos.x * -0.2, y: mousePos.y * -0.2 }}
        />

        {/* Floating Clouds */}
        <div className="absolute inset-0 z-10 opacity-30">
          <div className="absolute top-[20%] left-[-10%] w-[120%] h-[30%] bg-[radial-gradient(ellipse_at_center,_rgba(242,123,33,0.15),_transparent_60%)] animate-pulse" />
        </div>
      </motion.div>


      {/* 2. BACKGROUND MOUNTAINS */}
      <motion.div
        className="absolute bottom-[20%] w-full h-[50%] pointer-events-none z-10 opacity-40 mix-blend-lighten"
        style={{
          y: mountainY,
          x: mousePos.x * 0.25,
          scale: 1.05,
        }}
      >
        <svg viewBox="0 0 1440 320" className="w-full h-full fill-stone-800">
          <path d="M0,224L48,208C96,192,192,160,288,165.3C384,171,480,213,576,208C672,203,768,149,864,138.7C960,128,1056,160,1152,176C1248,192,1344,192,1392,192L1440,192L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z" />
        </svg>
      </motion.div>

      {/* 3. DYNAMIC VOLUMETRIC PALACE (Ayodhya Spires) */}
      <motion.div
        className="absolute bottom-[10%] w-full h-[60%] pointer-events-none z-20"
        style={{
          y: palaceY,
          x: mousePos.x * 0.5,
          scale: 1.02,
        }}
      >
        <div className="absolute inset-0 flex items-end justify-center">
          {/* Ayodhya Temple Outline Layer */}
          <svg viewBox="0 0 1000 600" className="w-full max-w-[1200px] h-auto fill-[#130f14] filter drop-shadow-[0_0_15px_rgba(212,175,55,0.1)]">
            {/* Left Spires */}
            <path d="M100,600 L120,450 L130,460 L140,400 L150,410 L160,300 L170,310 L180,200 L195,200 L205,310 L215,300 L225,410 L235,400 L245,460 L255,450 L275,600 Z" />
            <path d="M50,600 L70,500 L80,510 L90,460 L100,470 L110,380 L125,380 L135,470 L145,460 L155,510 L165,500 L185,600 Z" opacity="0.7" />
            
            {/* Center Garbhagriha / Main Dome */}
            <path d="M350,600 L380,380 L400,390 L420,300 L440,310 L460,180 L475,190 L488,80 L498,80 L500,40 L502,80 L512,80 L525,190 L540,180 L560,310 L580,300 L600,390 L620,380 L650,600 Z" />
            {/* Saffron Flag flapping */}
            <path d="M500,40 L500,10 L525,20 L500,30 Z" className="fill-saffron" />

            {/* Right Spires */}
            <path d="M725,600 L745,450 L755,460 L765,400 L775,410 L785,300 L795,310 L805,200 L820,200 L830,310 L840,300 L850,410 L860,400 L870,460 L880,450 L900,600 Z" />
            <path d="M815,600 L835,500 L845,510 L855,460 L865,470 L875,380 L890,380 L900,470 L910,460 L920,510 L930,500 L950,600 Z" opacity="0.7" />
          </svg>
        </div>
      </motion.div>

      {/* 4. FLYING BIRDS AND PARTICLES */}
      <div className="absolute inset-0 pointer-events-none z-25">
        {/* Particle dust */}
        <div className="absolute inset-0">
          {mounted && [...Array(25)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1.5 h-1.5 rounded-full bg-gold/50 shadow-[0_0_8px_rgba(212,175,55,0.8)]"
              style={{
                top: `${Math.random() * 80 + 10}%`,
                left: `${Math.random() * 90 + 5}%`,
              }}
              animate={{
                y: [0, -100 - Math.random() * 100],
                x: [0, (Math.random() - 0.5) * 50],
                opacity: [0, 0.8, 0],
              }}
              transition={{
                duration: 6 + Math.random() * 8,
                repeat: Infinity,
                delay: Math.random() * 8,
                ease: 'easeInOut',
              }}
            />
          ))}
        </div>

        {/* Flying birds */}
        <motion.div
          className="absolute top-1/4 w-[150px] h-[50px] opacity-60"
          initial={{ x: '-20vw', y: '20vh' }}
          animate={{ x: '110vw', y: '5vh' }}
          transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
        >
          <svg viewBox="0 0 100 50" className="w-full h-full fill-gold/80">
            <path d="M 0 25 Q 10 15 20 25 T 40 25 L 35 27 Q 20 20 10 27 Z" />
            <path d="M 40 15 Q 48 5 56 15 T 72 15 L 68 17 Q 56 10 48 17 Z" transform="scale(0.8) translate(20, 10)" />
          </svg>
        </motion.div>
      </div>

      {/* 6. TEMPLE BELLS (Interactive overlay option) */}
      <div className="absolute top-24 left-10 z-40 hidden md:block">
        <motion.div
          onClick={manualRingBell}
          className="cursor-pointer p-4 rounded-full glass border-white/10 flex flex-col items-center group relative shadow-lg bg-black/30 backdrop-blur-md"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <motion.div
            animate={bellRinging ? {
              rotate: [0, -15, 15, -12, 12, -8, 8, 0],
            } : {}}
            transition={{ duration: 1.2, ease: 'easeInOut' }}
          >
            <Bell className="w-8 h-8 text-gold group-hover:glow-gold transition duration-300" />
          </motion.div>
          <span className="text-[9px] uppercase tracking-widest text-white/50 mt-1 font-medium group-hover:text-gold transition">
            {getTranslation('ringBell', language)}
          </span>

          {/* Sound wave ripple */}
          {bellRinging && (
            <span className="absolute inset-0 rounded-full border border-gold/40 animate-ping pointer-events-none" />
          )}
        </motion.div>
      </div>

      {/* 5. FLOWING SARAYU RIVER */}
      <motion.div
        className="absolute bottom-0 w-full h-[22%] z-30 pointer-events-none"
        style={{ scaleY: riverScale }}
      >
        {/* Soft morning fog rising over river */}
        <div className="absolute top-[-30px] left-0 w-full h-[60px] bg-gradient-to-t from-saffron/20 to-transparent blur-md" />

        {/* River layer 1 */}
        <svg viewBox="0 0 1200 100" preserveAspectRatio="none" className="absolute bottom-0 w-full h-full fill-[#0b080d] opacity-95">
          <path className="animate-river" d="M 0 40 Q 150 20 300 40 T 600 40 T 900 40 T 1200 40 L 1200 100 L 0 100 Z" />
        </svg>

        {/* River layer 2 (Golden reflections) */}
        <svg viewBox="0 0 1200 100" preserveAspectRatio="none" className="absolute bottom-0 w-full h-full fill-gradient opacity-20 mix-blend-overlay">
          <defs>
            <linearGradient id="riverReflect" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#f27b21" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#d4af37" stopOpacity="0" />
            </linearGradient>
          </defs>
          <path d="M 0 45 Q 180 55 360 45 T 720 45 T 1080 45 L 1200 100 L 0 100 Z" fill="url(#riverReflect)" />
        </svg>
      </motion.div>



      {/* HEADER NAVBAR */}
      <header className="fixed top-0 left-0 w-full px-6 py-4 flex items-center justify-between z-50 pointer-events-auto bg-[#050505]/70 backdrop-blur-md border-b border-white/5 shadow-md">
        <div className="flex items-center gap-3">
          <span className="text-saffron text-2xl font-bold tracking-widest font-outfit drop-shadow-[0_0_10px_rgba(242,123,33,0.3)]">
            🛕 RAMAYANAVERSE
          </span>
        </div>
        <div className="flex items-center gap-6">
          <nav className="hidden lg:flex items-center gap-8 text-sm uppercase tracking-widest font-medium text-white/70">
            <a href="#kand" className="hover:text-gold transition">{getTranslation('navChapters', language)}</a>
            <a href="#timeline" className="hover:text-gold transition">{getTranslation('navTimeline', language)}</a>
            <a href="#map" className="hover:text-gold transition">{getTranslation('navMap', language)}</a>
            <a href="#universe" className="hover:text-gold transition">{getTranslation('navUniverse', language)}</a>
            <a href="#ai-guide" className="hover:text-gold transition">{getTranslation('navHanuman', language)}</a>
            <a href="#library" className="hover:text-gold transition">{getTranslation('navLibrary', language)}</a>
          </nav>
          
          {/* Mute toggle inside navbar */}
          <button
            onClick={handleToggleSound}
            className="p-2.5 rounded-full glass border-white/10 hover:border-gold/40 transition duration-300 group flex items-center gap-2 text-white/70 hover:text-gold cursor-pointer"
          >
            {soundEnabled ? (
              <Volume2 className="w-4 h-4 text-gold" />
            ) : (
              <VolumeX className="w-4 h-4" />
            )}
            <span className="text-[10px] font-semibold uppercase tracking-wider hidden sm:inline">
              {soundEnabled ? getTranslation('soundOn', language) : getTranslation('soundMuted', language)}
            </span>
          </button>

          {/* Language Selector Dropdown */}
          <div className="relative">
            <button
              onClick={() => setLangDropdownOpen(!langDropdownOpen)}
              className="p-2.5 rounded-full glass border-white/10 hover:border-gold/40 transition duration-300 group flex items-center gap-2 text-white/70 hover:text-gold cursor-pointer"
            >
              <Globe className="w-4 h-4 text-gold" />
              <span className="text-[10px] font-semibold uppercase tracking-wider">
                {language === 'Hindi' ? 'हिन्दी' : 'English'}
              </span>
            </button>
            <AnimatePresence>
              {langDropdownOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="absolute right-0 mt-2 w-32 rounded-xl glass border border-white/10 bg-black/85 backdrop-blur-lg shadow-xl z-50 overflow-hidden"
                >
                  <button
                    onClick={() => {
                      setLanguage('English');
                      setLangDropdownOpen(false);
                    }}
                    className={`w-full px-4 py-2 text-left text-xs hover:bg-gold/15 transition cursor-pointer font-medium ${language === 'English' ? 'text-gold font-semibold' : 'text-white/80'}`}
                  >
                    English
                  </button>
                  <button
                    onClick={() => {
                      setLanguage('Hindi');
                      setLangDropdownOpen(false);
                    }}
                    className={`w-full px-4 py-2 text-left text-xs hover:bg-gold/15 transition cursor-pointer font-medium ${language === 'Hindi' ? 'text-gold font-semibold' : 'text-white/80'}`}
                  >
                    हिन्दी
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          
          {/* Enter Game Button in Navbar */}
          <a
            href="/game"
            className="px-4 py-2 rounded-full bg-gradient-to-r from-gold to-saffron text-black text-xs font-bold uppercase tracking-wider hover:scale-105 transition duration-300 cursor-pointer shadow-md"
          >
            {getTranslation('navGame', language)}
          </a>
        </div>
      </header>

      {/* HERO MAIN CONTENT */}
      <motion.div
        className="w-full max-w-4xl mx-auto px-6 text-center z-45 mb-[15vh] pointer-events-auto"
        style={{ y: heroContentY, opacity: heroContentOpacity }}
      >
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.2 }}
        >
          {/* Sanskrit greeting tag */}
          <span className="text-saffron font-semibold text-xs tracking-[0.25em] uppercase px-4 py-1.5 rounded-full border border-saffron/20 bg-saffron/5 inline-block mb-6">
            {getTranslation('greeting', language)}
          </span>

          <h1 className="text-4xl md:text-7xl font-bold font-outfit tracking-tight leading-tight text-white mb-6">
            {language === 'Hindi' ? (
              <>
                रामायण महाकाव्य की <br />
                <span className="bg-gradient-to-r from-gold via-saffron to-amber-500 bg-clip-text text-transparent drop-shadow-[0_2px_15px_rgba(212,175,55,0.2)]">
                  पावन गाथा खोजें
                </span>
              </>
            ) : (
              <>
                Discover the <br />
                <span className="bg-gradient-to-r from-gold via-saffron to-amber-500 bg-clip-text text-transparent drop-shadow-[0_2px_15px_rgba(212,175,55,0.2)]">
                  Greatest Epic Ever Told
                </span>
              </>
            )}
          </h1>

          <p className="text-sm md:text-lg text-white/75 font-inter max-w-2xl mx-auto mb-10 leading-relaxed">
            {getTranslation('subtitle', language)}
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={onBeginJourney}
              className="px-8 py-4 rounded-full bg-gradient-to-r from-gold to-saffron text-black font-semibold text-sm tracking-wider uppercase shadow-[0_4px_20px_rgba(242,123,33,0.3)] hover:shadow-[0_6px_25px_rgba(242,123,33,0.5)] transform hover:-translate-y-0.5 transition duration-300 pointer-events-auto"
            >
              {getTranslation('beginJourney', language)}
            </button>
            <a
              href="#timeline"
              className="px-8 py-4 rounded-full border border-white/10 hover:border-gold/30 bg-white/5 hover:bg-white/10 text-white font-medium text-sm tracking-wider uppercase transition duration-300 flex items-center gap-2 pointer-events-auto"
            >
              {getTranslation('exploreTimeline', language)}
            </a>
          </div>
        </motion.div>
      </motion.div>

      {/* SCROLL DOWN INDICATOR */}
      <div className="w-full flex justify-center pb-8 z-40 pointer-events-none">
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
          className="flex flex-col items-center gap-2 cursor-pointer pointer-events-auto opacity-60 hover:opacity-100 transition"
          onClick={onBeginJourney}
        >
          <span className="text-[10px] uppercase tracking-[0.2em] font-semibold text-white/55">
            {getTranslation('scrollToEnter', language)}
          </span>
          <ArrowDown className="w-4 h-4 text-saffron" />
        </motion.div>
      </div>
    </div>
  );
}
