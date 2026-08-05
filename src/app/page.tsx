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

        {/* 8. Call to Action Game Banner */}
        <section className="py-24 px-6 md:px-12 border-t border-white/5 relative overflow-hidden bg-gradient-to-b from-[#080808] to-[#030303] text-center">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(212,175,55,0.05),_transparent_60%)] pointer-events-none" />
          <div className="max-w-xl mx-auto space-y-6 z-10 relative">
            <span className="text-saffron font-bold text-xs tracking-[0.25em] uppercase font-mono">Interactive Gameplay</span>
            <h2 className="text-3xl md:text-5xl font-bold font-outfit text-white leading-tight">
              Enter the Game of Ramayana Verse
            </h2>
            <p className="text-sm text-white/60 leading-relaxed font-inter">
              Test your knowledge, unlock divine character badges, and earn XP points. Slay Ravana in the final battle simulation to launch your daily spiritual quest!
            </p>
            <div className="pt-4">
              <a
                href="/game"
                className="inline-flex items-center gap-2.5 px-8 py-4 rounded-full bg-gradient-to-r from-gold via-saffron to-orange-600 text-black font-extrabold text-sm uppercase tracking-widest transition duration-300 shadow-[0_0_30px_rgba(242,123,33,0.35)] hover:scale-105 cursor-pointer hover:shadow-[0_0_40px_rgba(242,123,33,0.5)]"
              >
                <span>Enter Quest Game</span>
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </section>

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
