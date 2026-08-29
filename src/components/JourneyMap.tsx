'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { journeyLocations, JourneyLocation } from '@/data/ramayana';
import { MapPin, Info, Users, Sparkles, BookOpen, Navigation, ArrowRight, X, Volume2, VolumeX } from 'lucide-react';
import { useUserProgress, useAppLanguage } from '@/components/Providers';
import { getTranslatedLocations, getTranslation, speakText, cancelSpeech } from '@/data/translations';

export default function JourneyMap() {
  const [selectedLocId, setSelectedLocId] = useState<string>('ayodhya');
  const [hoveredLocId, setHoveredLocId] = useState<string | null>(null);
  const { addXp } = useUserProgress();
  const [visitedLocs, setVisitedLocs] = useState<string[]>(['ayodhya']);
  const [viewEra, setViewEra] = useState<'ancient' | 'modern'>('ancient');
  const [showDeepDetail, setShowDeepDetail] = useState<boolean>(false);
  const { language } = useAppLanguage();
  const [isSpeaking, setIsSpeaking] = useState(false);

  const translatedLocations = getTranslatedLocations(language);

  // Reset image view to ancient when selected location changes
  React.useEffect(() => {
    setViewEra('ancient');
  }, [selectedLocId]);

  const activeLoc = translatedLocations.find((l) => l.id === selectedLocId) || translatedLocations[0];
  const activeLocIndex = translatedLocations.findIndex((l) => l.id === selectedLocId);

  const handleNextLoc = () => {
    if (activeLocIndex < translatedLocations.length - 1) {
      handleSelectLoc(translatedLocations[activeLocIndex + 1].id);
    }
  };

  const handlePrevLoc = () => {
    if (activeLocIndex > 0) {
      handleSelectLoc(translatedLocations[activeLocIndex - 1].id);
    }
  };

  const handleSelectLoc = (locId: string) => {
    setSelectedLocId(locId);
    if (!visitedLocs.includes(locId)) {
      setVisitedLocs((prev) => [...prev, locId]);
      addXp(25); // Reward 25 XP for unlocking map coordinates
    }
  };

  const toggleNarration = (loc: JourneyLocation) => {
    if (isSpeaking) {
      cancelSpeech();
      setIsSpeaking(false);
      return;
    }
    const textToRead = `${loc.name}. ${loc.description}. ${language === 'Hindi' ? 'इतिहास' : 'History'}: ${loc.history}. ${language === 'Hindi' ? 'आध्यात्मिक महत्व' : 'Spiritual Significance'}: ${loc.spiritualSignificance}`;
    speakText(
      textToRead,
      language,
      () => setIsSpeaking(false),
      () => setIsSpeaking(false)
    );
    setIsSpeaking(true);
  };

  // Cancel speaking when switching sites or closing details
  useEffect(() => {
    if (typeof window !== 'undefined') {
      cancelSpeech();
      setIsSpeaking(false);
    }
  }, [selectedLocId, showDeepDetail]);

  // Coordinates mapping from data
  // Dotted route sequence: Ayodhya -> Mithila -> Ayodhya -> Chitrakoot -> Panchavati -> Kishkindha -> Rameshwaram -> Lanka
  const travelPath = [
    { x: 35, y: 32 }, // Ayodhya
    { x: 55, y: 30 }, // Mithila
    { x: 35, y: 32 }, // Ayodhya
    { x: 38, y: 45 }, // Chitrakoot
    { x: 28, y: 60 }, // Panchavati
    { x: 30, y: 78 }, // Kishkindha
    { x: 33, y: 92 }, // Rameshwaram
    { x: 35, y: 97 }, // Lanka
  ];

  return (
    <section id="map" className="py-24 px-6 md:px-12 border-b border-white/5 relative overflow-hidden bg-gradient-to-b from-[#080808] to-[#050505]">
      {/* Background decoration */}
      <div className="absolute top-1/4 right-0 w-80 h-80 rounded-full bg-saffron/5 blur-[100px] pointer-events-none" />

      <div className="max-w-6xl mx-auto w-full z-10 relative">
        {/* Header */}
        <div className="mb-12">
          <span className="text-saffron font-bold text-xs tracking-[0.25em] uppercase">
            {language === 'Hindi' ? 'मानचित्र कला — दिव्य गमन' : 'Cartography — Sacred Trajectory'}
          </span>
          <h2 className="text-3xl md:text-5xl font-bold font-outfit mt-2">
            {language === 'Hindi' ? 'भौगोलिक यात्रा मानचित्र' : 'Interactive Journey Map'}
          </h2>
          <p className="text-xs text-white/50 mt-2 font-mono uppercase">
            {language === 'Hindi' ? 'वनवास, संधियों और युद्ध के दिव्य पड़ावों को देखने के लिए चमकीले नोड्स पर क्लिक करें' : 'Click pulsing nodes to track the epic coordinates of exile, alliances, and battle'}
          </p>
        </div>

        {/* Map Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Left Column: Interactive Vector Map Canvas */}
          <div className="lg:col-span-7 rounded-3xl glass-premium p-6 flex flex-col justify-between relative bg-black/50 border border-white/5 min-h-[500px] overflow-hidden">
            {/* SVG Interactive Canvas */}
            <div className="relative w-full h-full min-h-[400px] flex items-center justify-center">
              
              {/* Grid Overlay background lines */}
              <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />

              <svg
                viewBox="0 0 100 100"
                className="w-full h-full max-h-[480px] drop-shadow-[0_0_15px_rgba(212,175,55,0.15)] z-10"
              >
                {/* 1. Indian Subcontinent Outline Path Mockup */}
                <path
                  d="M20,20 Q30,10 45,15 T60,20 T70,30 T65,50 T50,75 T35,95 Q33,98 34,99 Q36,99 37,95 T43,78 T45,60 T35,45 T25,35 Z"
                  fill="none"
                  stroke="rgba(255, 255, 255, 0.08)"
                  strokeWidth="0.75"
                />

                {/* 2. Dotted Travel Route Path */}
                <polyline
                  points={travelPath.map((p) => `${p.x},${p.y}`).join(' ')}
                  fill="none"
                  stroke="url(#routeGradient)"
                  strokeWidth="0.7"
                  strokeDasharray="2,2"
                  className="animate-pulse"
                />

                {/* Gradients definitions */}
                <defs>
                  <linearGradient id="routeGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#f27b21" />
                    <stop offset="50%" stopColor="#d4af37" />
                    <stop offset="100%" stopColor="#ef4444" />
                  </linearGradient>
                </defs>

                {/* 3. Interactive pulsing coordinate locations */}
                {translatedLocations.map((loc) => {
                  const isHovered = hoveredLocId === loc.id;
                  const isSelected = selectedLocId === loc.id;
                  const isVisited = visitedLocs.includes(loc.id);

                  return (
                    <g
                      key={loc.id}
                      className="cursor-pointer"
                      onClick={() => handleSelectLoc(loc.id)}
                      onMouseEnter={() => setHoveredLocId(loc.id)}
                      onMouseLeave={() => setHoveredLocId(null)}
                    >
                      {/* Outer pulse animation rings */}
                      {(isHovered || isSelected) && (
                        <circle
                          cx={loc.coordinates.x}
                          cy={loc.coordinates.y}
                          r="4"
                          className="fill-saffron/20 stroke-saffron/40 stroke-[0.3] animate-ping origin-center"
                        />
                      )}
                      
                      {/* Core Node Circle */}
                      <circle
                        cx={loc.coordinates.x}
                        cy={loc.coordinates.y}
                        r={isSelected ? '2' : '1.3'}
                        className={`transition-all duration-300 ${
                          isSelected
                            ? 'fill-saffron stroke-white stroke-[0.4]'
                            : isVisited
                            ? 'fill-gold stroke-gold/40 stroke-[0.2]'
                            : 'fill-white/40'
                        }`}
                      />

                      {/* Text tags for coordinates */}
                      {(isHovered || isSelected) && (
                        <text
                          x={loc.coordinates.x + 3}
                          y={loc.coordinates.y + 1}
                          className="text-[3px] font-semibold font-outfit fill-white select-none drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]"
                        >
                          {loc.name}
                        </text>
                      )}
                    </g>
                  );
                })}
              </svg>

              {/* Compass Card decoration */}
              <div className="absolute bottom-4 left-4 p-3 rounded-xl glass border-white/5 flex items-center gap-2 pointer-events-none opacity-60">
                <Navigation className="w-5 h-5 text-saffron rotate-45" />
                <div className="text-[9px] uppercase tracking-wider font-mono">
                  <span className="block text-white/40">{language === 'Hindi' ? 'पैमाना' : 'Scale'}</span>
                  <span className="text-white font-bold">{language === 'Hindi' ? '1 : युग' : '1 : Yuga'}</span>
                </div>
              </div>
            </div>

            {/* Bottom Row route progression info */}
            <div className="border-t border-white/5 pt-4 mt-6 flex justify-between items-center text-xs text-white/40">
              <div className="flex items-center gap-1.5">
                <Navigation className="w-4 h-4 text-gold" />
                <span>{language === 'Hindi' ? `खोजे गए स्थान: ${visitedLocs.length} / ${translatedLocations.length}` : `Explored Landmarks: ${visitedLocs.length} of ${translatedLocations.length}`}</span>
              </div>
              <div className="flex gap-1.5 items-center">
                <span>{language === 'Hindi' ? 'प्रारंभ: अयोध्या' : 'Start: Ayodhya'}</span>
                <ArrowRight className="w-3.5 h-3.5" />
                <span>{language === 'Hindi' ? 'गंतव्य: लंका' : 'Destination: Lanka'}</span>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Details Drawer */}
          <div className="lg:col-span-5 rounded-3xl glass p-6 md:p-8 flex flex-col justify-between relative bg-black/30">
            <div>
              {/* Landmark Header */}
              <div className="flex items-start justify-between border-b border-white/5 pb-4 mb-6">
                <div>
                  <div className="flex items-center gap-2 mb-1.5">
                    <MapPin className="w-4 h-4 text-saffron" />
                    <span className="text-[10px] font-bold font-mono tracking-widest text-saffron uppercase">
                      {language === 'Hindi' ? 'भौगोलिक निर्देशांक' : 'Geographical Coordinate'}
                    </span>
                  </div>
                  <h3 className="text-2xl md:text-3xl font-extrabold font-outfit text-white flex items-center gap-2">
                    {activeLoc.name}
                    {/* Speak Button */}
                    <button
                      onClick={() => toggleNarration(activeLoc)}
                      className="p-1.5 rounded-full hover:bg-white/10 text-white/50 hover:text-gold transition cursor-pointer"
                      title="Read Aloud"
                    >
                      {isSpeaking ? (
                        <VolumeX className="w-4.5 h-4.5 text-saffron animate-pulse" />
                      ) : (
                        <Volume2 className="w-4.5 h-4.5" />
                      )}
                    </button>
                  </h3>
                </div>

                <span className="text-[10px] font-mono font-bold text-gold px-2.5 py-1 bg-gold/15 rounded border border-gold/25">
                  {language === 'Hindi' ? `पड़ाव 0${translatedLocations.indexOf(activeLoc) + 1}` : `Node 0${translatedLocations.indexOf(activeLoc) + 1}`}
                </span>
              </div>

              {/* Chronicle description */}
              <div className="space-y-4 text-sm text-white/80 leading-relaxed font-inter mb-6">
                <p>{activeLoc.description}</p>
                <div className="p-4 rounded-xl bg-white/5 border border-white/5">
                  <h5 className="text-[10px] uppercase font-bold text-white/40 tracking-wider mb-1 flex items-center gap-1.5">
                    <Info className="w-3.5 h-3.5 text-gold" /> {language === 'Hindi' ? 'पावन इतिहास' : 'Epic History'}
                  </h5>
                  <p className="text-xs text-white/70">
                    {activeLoc.history}
                  </p>
                </div>
              </div>

              {/* Past vs Present visual comparison */}
              <div className="mb-6">
                <div className="flex items-center justify-between mb-3">
                  <h5 className="text-[10px] uppercase font-bold text-white/40 tracking-wider flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-gold animate-pulse" /> {language === 'Hindi' ? 'प्राचीन बनाम आधुनिक तुलना' : 'Past vs. Present Comparison'}
                  </h5>
                  
                  {/* Era Tabs Toggle */}
                  <div className="flex bg-black/40 rounded-lg p-0.5 border border-white/5">
                    <button
                      onClick={() => setViewEra('ancient')}
                      className={`text-[9px] uppercase font-semibold tracking-wider px-2.5 py-1 rounded transition duration-300 cursor-pointer ${
                        viewEra === 'ancient'
                          ? 'bg-gold text-black font-bold'
                          : 'text-white/60 hover:text-white'
                      }`}
                    >
                      {language === 'Hindi' ? 'प्राचीन युग' : 'Ancient Era'}
                    </button>
                    <button
                      onClick={() => setViewEra('modern')}
                      className={`text-[9px] uppercase font-semibold tracking-wider px-2.5 py-1 rounded transition duration-300 cursor-pointer ${
                        viewEra === 'modern'
                          ? 'bg-gold text-black font-bold'
                          : 'text-white/60 hover:text-white'
                      }`}
                    >
                      {language === 'Hindi' ? 'वर्तमान काल' : 'Current Day'}
                    </button>
                  </div>
                </div>

                {/* Image Frame with Smooth Fade */}
                <div className="relative h-44 md:h-52 w-full rounded-2xl overflow-hidden border border-white/10 shadow-inner group bg-black/40">
                  <AnimatePresence mode="wait">
                    <motion.img
                      key={viewEra + activeLoc.id}
                      src={viewEra === 'ancient' ? activeLoc.imageAncient : activeLoc.imageModern}
                      alt={`${activeLoc.name} ${viewEra}`}
                      initial={{ opacity: 0, scale: 1.02 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                  </AnimatePresence>

                  {/* Absolute watermark label on top of image */}
                  <div className="absolute bottom-3 left-3 bg-black/75 backdrop-blur-md px-2.5 py-1 rounded-lg border border-white/10 text-[9px] uppercase font-mono tracking-widest text-gold font-bold">
                    {viewEra === 'ancient' ? (language === 'Hindi' ? 'प्राचीन पुनर्निर्माण' : 'Ancient Reconstruction') : (language === 'Hindi' ? 'आधुनिक स्थल चित्र' : 'Modern Site Photo')}
                  </div>
                </div>
              </div>

              {/* Spiritual significance */}
              <div className="bg-saffron/5 border border-saffron/10 p-4 rounded-xl mb-6">
                <h5 className="text-[10px] uppercase tracking-wider font-bold text-saffron mb-1.5 flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5" /> {language === 'Hindi' ? 'आध्यात्मिक महत्व' : 'Spiritual Significance'}
                </h5>
                <p className="text-xs text-white/90 italic leading-relaxed">
                  {activeLoc.spiritualSignificance}
                </p>
              </div>

              {/* Connected figures */}
              <div className="mb-6">
                <h5 className="text-[10px] uppercase font-bold text-white/40 tracking-wider mb-2.5 flex items-center gap-1.5">
                  <Users className="w-3.5 h-3.5 text-emerald-400" /> {language === 'Hindi' ? 'संबंधित चरित्र' : 'Connected Characters'}
                </h5>
                <div className="flex flex-wrap gap-1.5">
                  {activeLoc.relatedCharacters.map((char: string, i: number) => (
                    <span
                      key={i}
                      className="text-[9px] uppercase font-semibold tracking-wider bg-emerald-500/10 text-emerald-400 px-2.5 py-1 rounded border border-emerald-500/15"
                    >
                      {char}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Quote of the Site */}
            <div className="border-t border-white/5 pt-6 bg-gold/5 p-4 rounded-xl border border-gold/10">
              <h5 className="text-[10px] uppercase tracking-wider font-bold text-gold mb-1.5 flex items-center gap-1">
                <BookOpen className="w-3.5 h-3.5" /> {language === 'Hindi' ? 'ध्यान योग्य विचार' : 'Meditative Quote'}
              </h5>
              <p className="text-xs text-white/80 italic leading-relaxed">
                "{activeLoc.quote}"
              </p>
            </div>

            {/* Navigation buttons */}
            <div className="border-t border-white/5 pt-4 mt-6 flex flex-col md:flex-row items-center justify-between gap-4">
              <span className="text-[10px] text-white/40 uppercase font-mono">
                {language === 'Hindi' ? `निर्देशांक ${activeLocIndex + 1} / ${translatedLocations.length}` : `Coordinate ${activeLocIndex + 1} of ${translatedLocations.length}`}
              </span>
              
              {/* More Details Button */}
              <button
                onClick={() => {
                  setShowDeepDetail(true);
                  addXp(10); // Reward 10 XP for opening deep details
                }}
                className="px-5 py-2.5 rounded-full bg-white/10 hover:bg-gold hover:text-black border border-white/10 hover:border-gold text-xs font-bold uppercase tracking-wider transition duration-300 text-white cursor-pointer flex items-center gap-1.5 shadow-md"
              >
                <Info className="w-4 h-4" /> {language === 'Hindi' ? 'विस्तृत विवरण' : 'More Details'}
              </button>

              <div className="flex gap-2">
                <button
                  disabled={activeLocIndex === 0}
                  onClick={handlePrevLoc}
                  className="px-4 py-2 rounded-full border border-white/10 bg-white/5 hover:bg-white/10 text-xs font-semibold uppercase tracking-wider disabled:opacity-40 disabled:hover:bg-white/5 transition duration-300 text-white cursor-pointer"
                >
                  {language === 'Hindi' ? 'पिछला' : 'Prev'}
                </button>
                <button
                  disabled={activeLocIndex === translatedLocations.length - 1}
                  onClick={handleNextLoc}
                  className="px-4 py-2 rounded-full bg-gradient-to-r from-gold to-saffron text-black text-xs font-semibold uppercase tracking-wider disabled:opacity-40 disabled:hover:opacity-10 transition duration-300 font-bold cursor-pointer"
                >
                  {language === 'Hindi' ? 'अगला पड़ाव' : 'Next Node'}
                </button>
              </div>
            </div>

          </div>

        </div>
      </div>

      {/* FULL-SCREEN DEEP-DIVE OVERLAY */}
      <AnimatePresence>
        {showDeepDetail && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8 bg-black/95 backdrop-blur-md"
          >
            {/* Blurred ancient picture in background */}
            <div
              className="absolute inset-0 bg-cover bg-center opacity-30 filter blur-xl scale-105 pointer-events-none"
              style={{ backgroundImage: `url(${activeLoc.imageAncient})` }}
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/90 to-black pointer-events-none" />

            {/* Modal Content Panel */}
            <motion.div
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              transition={{ duration: 0.3 }}
              data-lenis-prevent
              className="relative w-full max-w-4xl max-h-[85vh] overflow-y-auto rounded-3xl border border-white/10 bg-[#0f0e0f]/85 backdrop-blur-xl p-6 md:p-10 shadow-2xl flex flex-col justify-between"
            >
              <div>
                {/* Header */}
                <div className="flex items-start justify-between border-b border-white/10 pb-6 mb-8">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <MapPin className="w-4 h-4 text-saffron" />
                      <span className="text-xs font-bold font-mono tracking-widest text-saffron uppercase">
                        {language === 'Hindi' ? 'गहन महाकाव्य अभिलेख' : 'Deep Epic Records'}
                      </span>
                    </div>
                    <h3 className="text-3xl md:text-5xl font-extrabold font-outfit text-white leading-none">
                      {activeLoc.name}
                    </h3>
                  </div>

                  <button
                    onClick={() => setShowDeepDetail(false)}
                    className="p-3 rounded-full border border-white/10 bg-white/5 hover:bg-white/10 hover:border-white/20 transition text-white/70 hover:text-white cursor-pointer shadow-md"
                    aria-label="Close details"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Grid Content */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-sm text-white/80 font-inter leading-relaxed">
                  
                  {/* Left Column */}
                  <div className="space-y-6">
                    <div>
                      <h4 className="text-xs uppercase font-bold text-gold tracking-wider mb-2 flex items-center gap-1.5">
                        <Navigation className="w-4 h-4 rotate-45" /> {language === 'Hindi' ? 'भौगोलिक स्थिति' : 'Geographical Location'}
                      </h4>
                      <p className="text-white/70 bg-white/5 border border-white/5 p-4 rounded-2xl">
                        {activeLoc.deepDive.geography}
                      </p>
                    </div>

                    <div>
                      <h4 className="text-xs uppercase font-bold text-saffron tracking-wider mb-2 flex items-center gap-1.5">
                        <BookOpen className="w-4 h-4" /> {language === 'Hindi' ? 'शास्त्र संदर्भ' : 'Scriptural References'}
                      </h4>
                      <div className="text-white/90 bg-saffron/5 border border-saffron/10 p-4 rounded-2xl italic font-serif">
                        "{activeLoc.deepDive.scriptureRef}"
                      </div>
                    </div>

                    <div>
                      <h4 className="text-xs uppercase font-bold text-emerald-400 tracking-wider mb-2 flex items-center gap-1.5">
                        <Users className="w-4 h-4" /> {language === 'Hindi' ? 'संबंधित पात्र' : 'Connected Characters'}
                      </h4>
                      <div className="flex flex-wrap gap-2 p-2.5 rounded-2xl bg-white/5 border border-white/5">
                        {activeLoc.relatedCharacters.map((char: string, i: number) => (
                          <span
                            key={i}
                            className="text-[10px] uppercase font-bold tracking-wider bg-emerald-500/10 text-emerald-400 px-3.5 py-1.5 rounded-lg border border-emerald-500/15"
                          >
                            {char}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Right Column */}
                  <div className="space-y-6">
                    <div>
                      <h4 className="text-xs uppercase font-bold text-white/50 tracking-wider mb-2 flex items-center gap-1.5">
                        <Info className="w-4 h-4 text-blue-400" /> {language === 'Hindi' ? 'पौराणिक कथाएं और इतिहास' : 'Epic Legends & Chronicles'}
                      </h4>
                      <p className="text-white/70 bg-white/5 border border-white/5 p-4 rounded-2xl">
                        {activeLoc.deepDive.legends}
                      </p>
                    </div>

                    <div>
                      <h4 className="text-xs uppercase font-bold text-white/50 tracking-wider mb-2 flex items-center gap-1.5">
                        <Sparkles className="w-4 h-4 text-purple-400" /> {language === 'Hindi' ? 'पुरातात्विक खोजें' : 'Archaeological Discoveries'}
                      </h4>
                      <p className="text-white/70 bg-white/5 border border-white/5 p-4 rounded-2xl">
                        {activeLoc.deepDive.archaeology}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Bottom Full-Width Spiritual Explanation */}
                <div className="border-t border-white/10 pt-6 mt-8">
                  <h4 className="text-xs uppercase font-bold text-gold tracking-wider mb-2 flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4" /> {language === 'Hindi' ? 'आध्यात्मिक और प्रतीकात्मक महत्व' : 'Spiritual & Symbolic Significance'}
                  </h4>
                  <p className="text-sm text-white/90 bg-gold/5 border border-gold/10 p-5 rounded-2xl italic leading-relaxed">
                    {activeLoc.deepDive.spiritualTheme}
                  </p>
                </div>
              </div>

              {/* Close Button Footer */}
              <div className="border-t border-white/10 pt-6 mt-8 flex justify-end">
                <button
                  onClick={() => setShowDeepDetail(false)}
                  className="px-6 py-2.5 rounded-full bg-gradient-to-r from-gold to-saffron text-black text-xs font-bold uppercase tracking-wider transition duration-300 shadow-md hover:scale-105 cursor-pointer"
                >
                  {language === 'Hindi' ? 'मानचित्र पर लौटें' : 'Return to Map'}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
