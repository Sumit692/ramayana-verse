'use client';

import React from 'react';
import Hero from '@/components/Hero';
import KandExperience from '@/components/KandExperience';
import Timeline from '@/components/Timeline';
import CharacterUniverse from '@/components/CharacterUniverse';
import JourneyMap from '@/components/JourneyMap';
import AiHanumanGuide from '@/components/AiHanumanGuide';
import LibraryAndVersions from '@/components/LibraryAndVersions';
import { useAppTheme } from '@/components/Providers';
import { ArrowRight } from 'lucide-react';

export default function Home() {
  const { theme } = useAppTheme();

  const handleBeginJourney = () => {
    const nextSection = document.getElementById('kand');
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <main className="w-full flex flex-col relative">
      
      {/* 1. Immersive Hero Landing Section */}
      <Hero onBeginJourney={handleBeginJourney} />

      {/* Aurora visual accents globally layered between segments */}
      <div className="relative w-full overflow-hidden">
        
        {/* Accent Light Glows */}
        <div className="absolute top-[10%] left-[-10%] w-[50vw] h-[50vw] rounded-full bg-saffron/5 blur-[120px] pointer-events-none" />
        <div className="absolute top-[40%] right-[-10%] w-[50vw] h-[50vw] rounded-full bg-gold/5 blur-[120px] pointer-events-none" />
        <div className="absolute top-[75%] left-10 w-[40vw] h-[40vw] rounded-full bg-emerald/5 blur-[150px] pointer-events-none" />

        {/* 2. Cinematic Kand Story Chapter Slideshow */}
        <KandExperience />

        {/* 3. Apple-style Horizontal Drag-Scroll Timeline */}
        <Timeline />

        {/* 4. Interactive Vector Journey Map */}
        <JourneyMap />

        {/* 5. 3D Character Universe Card Pantheon */}
        <CharacterUniverse />

        {/* 6. Hanuman RAG AI Scriptural Companion */}
        <AiHanumanGuide />

        {/* 7. Knowledge Library & Comparative Regional Versions */}
        <LibraryAndVersions />
      </div>

      {/* Immersive Footer Section */}
      <footer className="w-full py-16 px-6 md:px-12 border-t border-white/5 bg-[#030303] text-center relative z-40">
        <div className="max-w-4xl mx-auto space-y-6">
          <span className="text-saffron text-xl font-bold tracking-[0.25em] font-outfit">
            🛕 RAMAYANAVERSE
          </span>
          <p className="text-xs text-white/40 leading-relaxed font-inter max-w-lg mx-auto">
            A world-class digital museum dedicated to bringing the values, geography, chronology, and philosophy of the ancient epic Ramayana into a cinematic web experience.
          </p>
          <div className="flex justify-center gap-6 text-[10px] uppercase tracking-widest text-white/55 font-mono">
            <span>Valmiki Ramayana</span>
            <span>•</span>
            <span>Ramcharitmanas</span>
            <span>•</span>
            <span>Kamba Ramayanam</span>
          </div>
          <div className="text-[10px] text-white/30 pt-4 border-t border-white/5 font-mono">
            © {new Date().getFullYear()} RamayanaVerse. Developed with reverence and technical excellence.
          </div>
        </div>
      </footer>

    </main>
  );
}
