'use client';

import React, { useRef, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { timelineEvents, TimelineEvent } from '@/data/ramayana';
import { Calendar, MapPin, Users, Award, BookOpen, X, ChevronRight, ChevronLeft, Volume2, VolumeX } from 'lucide-react';
import { useUserProgress, useAppLanguage } from '@/components/Providers';
import { getTranslatedTimeline, getTranslation, speakText } from '@/data/translations';

export default function Timeline() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [selectedEvent, setSelectedEvent] = useState<TimelineEvent | null>(null);
  const { addXp } = useUserProgress();
  const [exploredEvents, setExploredEvents] = useState<string[]>([]);
  const { language } = useAppLanguage();
  const [isSpeaking, setIsSpeaking] = useState(false);

  const translatedEvents = getTranslatedTimeline(language);

  // Smooth mouse-wheel horizontal scroll handler
  const handleWheel = (e: React.WheelEvent) => {
    if (containerRef.current) {
      containerRef.current.scrollLeft += e.deltaY;
    }
  };

  const scroll = (direction: 'left' | 'right') => {
    if (containerRef.current) {
      const scrollAmount = 340; // Card width + gap
      containerRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  const selectEvent = (evt: TimelineEvent) => {
    setSelectedEvent(evt);
    if (!exploredEvents.includes(evt.id)) {
      setExploredEvents((prev) => [...prev, evt.id]);
      addXp(20); // Reward 20 XP for exploring a timeline milestone
    }
  };

  const toggleNarration = (evt: TimelineEvent) => {
    if (isSpeaking) {
      if (typeof window !== 'undefined') window.speechSynthesis.cancel();
      setIsSpeaking(false);
      return;
    }
    const textToRead = `${evt.title}. ${evt.description}. ${getTranslation('moral', language)}: ${evt.lesson}`;
    speakText(
      textToRead,
      language,
      () => setIsSpeaking(false),
      () => setIsSpeaking(false)
    );
    setIsSpeaking(true);
  };

  const closeModal = () => {
    if (typeof window !== 'undefined') window.speechSynthesis.cancel();
    setIsSpeaking(false);
    setSelectedEvent(null);
  };

  // Cancel speaking when switching events
  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    }
  }, [selectedEvent]);

  return (
    <section id="timeline" className="py-24 px-6 md:px-12 border-b border-white/5 relative overflow-hidden bg-gradient-to-b from-[#080808] to-[#050505]">
      {/* Background decoration */}
      <div className="absolute top-0 right-1/4 w-96 h-96 rounded-full bg-saffron/5 blur-[120px] pointer-events-none" />

      <div className="max-w-6xl mx-auto w-full z-10 relative">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <span className="text-saffron font-bold text-xs tracking-[0.25em] uppercase">
              {language === 'Hindi' ? 'कालक्रम — दिव्य प्रगति' : 'Chronology — Divine Progression'}
            </span>
            <h2 className="text-3xl md:text-5xl font-bold font-outfit mt-2">
              {language === 'Hindi' ? 'श्री राम की समयरेखा' : 'The Timeline of Rama'}
            </h2>
            <p className="text-xs text-white/50 mt-2 font-mono uppercase">
              {language === 'Hindi' ? 'नेविगेट करने के लिए तीरों या माउस स्क्रॉल का उपयोग करें • कार्ड पर क्लिक करें' : 'Use arrows, drag, or trackpad to navigate chronologically • Click card to expand'}
            </p>
          </div>

          {/* Navigation Arrows */}
          <div className="flex gap-2 mt-4 md:mt-0">
            <button
              onClick={() => scroll('left')}
              className="p-3 rounded-full border border-white/10 hover:border-gold/40 hover:bg-white/5 text-white/70 hover:text-white transition duration-300 cursor-pointer"
              aria-label="Scroll left"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={() => scroll('right')}
              className="p-3 rounded-full border border-white/10 hover:border-gold/40 hover:bg-white/5 text-white/70 hover:text-white transition duration-300 cursor-pointer"
              aria-label="Scroll right"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Timeline Container (Horizontal Track) */}
        <div
          ref={containerRef}
          onWheel={handleWheel}
          data-lenis-prevent
          className="flex overflow-x-auto gap-6 pb-8 pt-4 no-scrollbar cursor-grab active:cursor-grabbing snap-x snap-mandatory relative"
          style={{ scrollBehavior: 'smooth' }}
        >
          {/* Saffron-Gold Connecting Line */}
          <div className="absolute top-[48%] left-10 right-10 h-[1.5px] bg-gradient-to-r from-saffron/30 via-gold/80 to-saffron/10 z-0 pointer-events-none" />

          {translatedEvents.map((evt, idx) => {
            const isExplored = exploredEvents.includes(evt.id);
            return (
              <motion.div
                key={evt.id}
                onClick={() => selectEvent(evt)}
                className="flex-shrink-0 w-[280px] md:w-[320px] snap-center z-10"
                whileHover={{ y: -8 }}
                transition={{ duration: 0.3 }}
              >
                {/* Event Card */}
                <div className="glass hover:border-gold/50 p-6 rounded-2xl h-full flex flex-col justify-between relative bg-black/50 overflow-hidden cursor-pointer select-none group shadow-lg min-h-[300px]">
                  
                  {/* Glowing halo when explored */}
                  {isExplored && (
                    <div className="absolute -top-10 -right-10 w-24 h-24 rounded-full bg-gold/15 blur-xl pointer-events-none" />
                  )}

                  {/* Header/Date info */}
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-[10px] uppercase font-mono tracking-widest text-saffron bg-saffron/10 px-2 py-0.5 rounded border border-saffron/20 font-semibold">
                        {evt.period}
                      </span>
                      <span className="text-[10px] text-white/40 font-mono">
                        0{idx + 1}
                      </span>
                    </div>

                    <h3 className="text-lg font-bold font-outfit text-white group-hover:text-gold transition mb-2">
                      {evt.title}
                    </h3>

                    <p className="text-xs text-white/60 leading-relaxed line-clamp-3">
                      {evt.description}
                    </p>
                  </div>

                  {/* Bottom row metadata */}
                  <div className="border-t border-white/5 pt-4 mt-4 flex items-center justify-between">
                    <span className="text-[10px] font-semibold text-white/40 uppercase flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-saffron" />
                      {evt.location}
                    </span>

                    <span className="text-[10px] text-gold font-bold flex items-center gap-1 group-hover:translate-x-1 transition duration-300">
                      {language === 'Hindi' ? 'खोजें' : 'Explore'} <ChevronRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Exploration Status / Gamification Prompt */}
        <div className="flex justify-between items-center mt-6 text-xs text-white/40 border-t border-white/5 pt-6">
          <div className="flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-gold" />
            <span>{language === 'Hindi' ? `खोजे गए पड़ाव: ${exploredEvents.length} / ${translatedEvents.length}` : `Milestones Discovered: ${exploredEvents.length} of ${translatedEvents.length}`}</span>
          </div>
          {exploredEvents.length === timelineEvents.length && (
            <div className="flex items-center gap-1.5 text-emerald-400 font-bold uppercase tracking-wider animate-pulse">
              <Award className="w-4 h-4" />
              All milestones unlocked!
            </div>
          )}
        </div>
      </div>

      {/* IMMERSIVE EXPANDED EVENT OVERLAY MODAL */}
      <AnimatePresence>
        {selectedEvent && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md"
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="w-full max-w-2xl rounded-3xl glass-premium overflow-hidden shadow-2xl relative flex flex-col max-h-[90vh] bg-black/90"
            >
              {/* Top cover/gradient banner */}
              <div className="relative h-44 flex items-end p-6 bg-gradient-to-tr from-saffron/20 via-gold/10 to-transparent border-b border-white/10">
                
                {/* Narrator Button */}
                <button
                  onClick={() => toggleNarration(selectedEvent)}
                  className="absolute top-4 right-16 p-2 rounded-full bg-black/40 border border-white/10 text-white/60 hover:text-white hover:border-gold/40 transition duration-300 z-50 pointer-events-auto cursor-pointer"
                  title="Read Aloud"
                >
                  {isSpeaking ? (
                    <VolumeX className="w-4 h-4 text-saffron" />
                  ) : (
                    <Volume2 className="w-4 h-4 text-gold" />
                  )}
                </button>

                {/* Close Button */}
                <button
                  onClick={closeModal}
                  className="absolute top-4 right-4 p-2 rounded-full bg-black/40 border border-white/10 text-white/60 hover:text-white hover:border-gold/40 transition duration-300 z-50 pointer-events-auto cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>

                <div>
                  <div className="flex items-center gap-2 mb-1.5">
                    <Calendar className="w-3.5 h-3.5 text-saffron" />
                    <span className="text-[10px] font-semibold font-mono tracking-widest text-saffron uppercase">
                      {selectedEvent.period}
                    </span>
                  </div>
                  <h3 className="text-2xl md:text-3xl font-extrabold font-outfit text-white">
                    {selectedEvent.title}
                  </h3>
                </div>
              </div>

              {/* Modal Body */}
              <div className="p-6 md:p-8 overflow-y-auto space-y-6 no-scrollbar text-sm text-white/80 leading-relaxed font-inter">
                
                {/* Event Description */}
                <div>
                  <h4 className="text-[11px] uppercase tracking-widest text-gold font-bold mb-2">
                    {language === 'Hindi' ? 'घटना का विवरण' : 'Event Chronicle'}
                  </h4>
                  <p className="text-white/90">
                    {selectedEvent.description}
                  </p>
                </div>

                {/* Sub Metadata columns */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-white/5 p-4 rounded-xl border border-white/5">
                    <h5 className="text-[10px] uppercase font-bold text-white/40 tracking-wider mb-2 flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-saffron" /> {getTranslation('location', language)}
                    </h5>
                    <p className="text-xs font-semibold text-white">
                      {selectedEvent.location}
                    </p>
                  </div>
                  <div className="bg-white/5 p-4 rounded-xl border border-white/5">
                    <h5 className="text-[10px] uppercase font-bold text-white/40 tracking-wider mb-2 flex items-center gap-1.5">
                      <Users className="w-3.5 h-3.5 text-gold" /> {language === 'Hindi' ? 'मुख्य पात्र' : 'Key Figures'}
                    </h5>
                    <div className="flex flex-wrap gap-1">
                      {selectedEvent.characters.map((char, index) => (
                        <span
                          key={index}
                          className="text-[9px] uppercase font-semibold tracking-wider bg-gold/10 text-gold px-2 py-0.5 rounded border border-gold/15"
                        >
                          {char}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Lesson / Spiritual takeaway */}
                <div className="bg-saffron/5 border border-saffron/10 p-4 rounded-xl flex items-start gap-3">
                  <Award className="w-5 h-5 text-saffron flex-shrink-0 mt-0.5" />
                  <div>
                    <h5 className="text-xs uppercase tracking-wider font-bold text-saffron mb-1">
                      {language === 'Hindi' ? 'धर्म विवेक / नैतिक सीख' : 'Dharma Wisdom / Moral Lesson'}
                    </h5>
                    <p className="text-xs text-white/95 italic leading-relaxed">
                      {selectedEvent.lesson}
                    </p>
                  </div>
                </div>

                {/* Scriptural Source Citation */}
                <div className="border-t border-white/5 pt-4 flex justify-between items-center text-xs text-white/40 font-mono">
                  <span>{language === 'Hindi' ? 'शास्त्र संदर्भ' : 'Scriptural Citation'}</span>
                  <span className="text-gold">{selectedEvent.source}</span>
                </div>

              </div>

              {/* Modal Footer */}
              <div className="p-4 bg-white/5 border-t border-white/5 text-center">
                <button
                  onClick={closeModal}
                  className="px-6 py-2.5 rounded-full bg-gradient-to-r from-gold to-saffron text-black text-xs font-semibold uppercase tracking-wider hover:opacity-90 transition duration-300 cursor-pointer"
                >
                  {language === 'Hindi' ? 'समयरेखा पर लौटें' : 'Return to Timeline'}
                </button>
              </div>

            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </section>
  );
}
