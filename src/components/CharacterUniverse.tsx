'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { characters, Character } from '@/data/ramayana';
import { useKidsMode, useUserProgress, useAppLanguage } from '@/components/Providers';
import { getTranslatedCharacters, getTranslation } from '@/data/translations';
import { Shield, Sparkles, Heart, Sword, UserPlus, Info, Quote, BookOpen } from 'lucide-react';

export default function CharacterUniverse() {
  const { isKidsMode } = useKidsMode();
  const { addXp } = useUserProgress();
  const { language } = useAppLanguage();

  const translatedCharacters = getTranslatedCharacters(language);

  const [selectedCharId, setSelectedCharId] = useState<string>(translatedCharacters[0].id);
  const [exploredChars, setExploredChars] = useState<string[]>([translatedCharacters[0].id]);

  const activeChar = translatedCharacters.find((c) => c.id === selectedCharId) || translatedCharacters[0];

  const handleSelectChar = (charId: string) => {
    setSelectedCharId(charId);
    if (!exploredChars.includes(charId)) {
      setExploredChars((prev) => [...prev, charId]);
      addXp(15); // Reward 15 XP for discovering character profiles
    }
  };

  // Kids Mode descriptions overrides (fully translated to Hindi when active)
  const getKidsDescription = (char: Character) => {
    if (language === 'Hindi') {
      switch (char.id) {
        case 'rama':
          return 'राजकुमार राम एक स्नेही भाई, एक वीर योद्धा और हमारी कहानी के नायक हैं। वह अपने धर्म का पालन करने, कठिन समय में भी शांत रहने और सभी के साथ—चाहे वह पक्षी हो या गिलहरी—दयालुता से पेश आने के लिए जाने जाते हैं।';
        case 'sita':
          return 'राजकुमारी सीता अत्यंत साहसी और बलवान हैं। रावण की वाटिका में बंदी रहने पर भी उन्होंने कभी हिम्मत नहीं हारी। वह प्रकृति से प्रेम करती थीं, और सत्य एवं स्वाभिमान का प्रतीक हैं।';
        case 'hanuman':
          return 'हनुमान जी अद्भुत वानर वीर हैं जो उड़ सकते हैं, पहाड़ जितने बड़े हो सकते हैं या चींटी जितने छोटे हो सकते हैं! वे परम बलशाली हैं, लेकिन राम जी के प्रति अपनी भक्ति और निष्ठा के लिए सबसे अधिक प्रसिद्ध हैं।';
        case 'ravana':
          return 'रावण दस सिर वाला एक अत्यंत बुद्धिमान राजा था, जिसका अर्थ है कि वह एक साथ कई बातें सोच सकता था! परंतु उसके अहंकार और घमंड ने उसे गलत रास्ते पर धकेल दिया।';
        default:
          return char.description;
      }
    } else {
      switch (char.id) {
        case 'rama':
          return 'Prince Rama is a loving brother, a brave warrior, and the hero of our story. He is known for always doing the right thing, staying calm even when things are hard, and treating everyone—from birds to squirrels—with deep kindness.';
        case 'sita':
          return 'Princess Sita is incredibly brave and strong. Even when locked in Ravana\'s gardens, she refused to let him scare her. She loves nature, took care of forest animals, and represents absolute truth and self-respect.';
        case 'hanuman':
          return 'Hanuman is the amazing monkey hero who can fly, grow as big as a mountain, or shrink as small as an ant! He has super strength, but he is most famous for being a humble and loyal friend to Rama.';
        case 'ravana':
          return 'Ravana was a very smart king with ten heads, meaning he could think about many things at once! However, his huge ego and pride made him make bad choices, leading to his defeat.';
        default:
          return char.description;
      }
    }
  };

  return (
    <section id="universe" className="py-24 px-6 md:px-12 border-b border-white/5 relative overflow-hidden bg-gradient-to-b from-[#050505] to-[#080808]">
      {/* Background radial glow */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full bg-gold/5 blur-[150px] pointer-events-none" />

      <div className="max-w-6xl mx-auto w-full z-10 relative">
        {/* Header */}
        <div className="mb-12">
          <span className="text-saffron font-bold text-xs tracking-[0.25em] uppercase">
            {language === 'Hindi' ? 'देव मंडल — प्राचीन दिव्य रूप' : 'Pantheon — Ancient Personas'}
          </span>
          <h2 className="text-3xl md:text-5xl font-bold font-outfit mt-2">
            {language === 'Hindi' ? 'पात्र ब्रह्मांड' : 'Character Universe'}
          </h2>
          <p className="text-xs text-white/50 mt-2 font-mono uppercase">
            {language === 'Hindi' ? 'पारिवारिक इतिहास, अस्त्र-शस्त्र और दिव्य लक्षणों को जानने के लिए कार्ड पर क्लिक करें' : 'Click a card to reveal family trees, legendary weapons, and divine traits'}
          </p>
        </div>

        {/* Outer Split layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Left Column: Grid of Character Cards */}
          <div className="lg:col-span-5 flex flex-col gap-4">
            <h4 className="text-xs uppercase font-bold text-white/40 tracking-wider mb-2">
              {language === 'Hindi' ? 'चरित्र चुनें' : 'Select Character'}
            </h4>
            <div data-lenis-prevent className="grid grid-cols-2 gap-4 max-h-[620px] overflow-y-auto pr-2">
              {translatedCharacters.map((char) => {
                const isActive = char.id === selectedCharId;
                const isDiscovered = exploredChars.includes(char.id);
                return (
                  <motion.div
                    key={char.id}
                    onClick={() => handleSelectChar(char.id)}
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    className={`cursor-pointer rounded-2xl p-5 border relative overflow-hidden flex flex-col justify-between min-h-[160px] transition-all duration-500 ${
                      isActive
                        ? 'border-gold bg-gradient-to-tr from-gold/15 via-saffron/10 to-transparent shadow-[0_0_20px_rgba(212,175,55,0.15)]'
                        : 'border-white/5 bg-black/40 hover:border-white/20'
                    }`}
                  >
                    {/* Background color glow corresponding to character */}
                    <div
                      className="absolute inset-0 pointer-events-none opacity-20 transition duration-500"
                      style={{ backgroundColor: char.aestheticColor }}
                    />

                    <div className="z-10 flex items-center justify-between">
                      <span className="text-[9px] uppercase font-mono tracking-widest text-white/50">
                        {char.role}
                      </span>
                      {isDiscovered && (
                        <span className="w-1.5 h-1.5 rounded-full bg-gold animate-pulse" />
                      )}
                    </div>

                    <div className="z-10 mt-6">
                      <h3 className="text-xl font-bold text-white font-outfit">
                        {char.name}
                      </h3>
                      <p className="text-[10px] text-white/50 uppercase tracking-wider font-semibold line-clamp-1 mt-0.5">
                        {char.title}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* Micro Gamification */}
            <div className="mt-4 p-4 rounded-xl bg-white/5 border border-white/5 text-xs text-white/50 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-gold" />
              <span>{language === 'Hindi' ? `चरित्र मंडल प्रगति: ${exploredChars.length} / ${translatedCharacters.length} शोधित।` : `Pantheon Progress: ${exploredChars.length} of ${translatedCharacters.length} researched.`}</span>
            </div>
          </div>

          {/* Right Column: Dynamic Deep Profile Details */}
          <div className="lg:col-span-7 rounded-3xl glass-premium p-6 md:p-8 flex flex-col justify-between relative overflow-hidden bg-black/60">
            {/* Morphing color overlay behind profiles */}
            <div
              className="absolute inset-0 pointer-events-none opacity-5 transition-all duration-700 blur-[80px]"
              style={{ backgroundColor: activeChar.aestheticColor }}
            />

            <div>
              {/* Profile Header */}
              <div className="flex flex-col md:flex-row md:items-start justify-between border-b border-white/5 pb-6 mb-6">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[10px] uppercase font-bold tracking-widest text-saffron bg-saffron/10 px-2 py-0.5 rounded border border-saffron/20">
                      {activeChar.role}
                    </span>
                    <span className="text-[10px] text-white/40 font-mono">
                      ID: {activeChar.id.toUpperCase()}
                    </span>
                  </div>
                  <h3 className="text-3xl md:text-4xl font-extrabold font-outfit text-white">
                    {activeChar.name}
                  </h3>
                  <p className="text-sm text-gold font-medium font-outfit uppercase tracking-wider mt-0.5">
                    {activeChar.title}
                  </p>
                </div>
              </div>

              {/* Character Description */}
              <p className="text-sm text-white/80 leading-relaxed font-inter mb-6">
                {isKidsMode ? getKidsDescription(activeChar) : activeChar.description}
              </p>

              {/* Biography Section */}
              {activeChar.biography && (
                <div className="bg-white/5 p-5 rounded-2xl border border-white/5 mb-6">
                  <h4 className="text-[10px] uppercase font-bold text-white/40 tracking-wider mb-2.5 flex items-center gap-1.5">
                    <Info className="w-3.5 h-3.5 text-gold" /> {language === 'Hindi' ? 'जीवन यात्रा और विस्तृत कथा' : 'Biography & Narrative Journey'}
                  </h4>
                  <p className="text-xs md:text-sm text-white/70 leading-relaxed font-inter max-h-[160px] overflow-y-auto pr-2">
                    {activeChar.biography}
                  </p>
                </div>
              )}

              {/* Weapons & Powers grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div className="bg-white/5 p-4 rounded-xl border border-white/5">
                  <h4 className="text-[10px] uppercase font-bold text-white/40 tracking-wider mb-2.5 flex items-center gap-1.5">
                    <Sword className="w-3.5 h-3.5 text-saffron" /> {language === 'Hindi' ? 'पौराणिक शस्त्र' : 'Legendary Weapons'}
                  </h4>
                  <div className="flex flex-wrap gap-1.5">
                    {activeChar.weapons.map((w: string, i: number) => (
                      <span key={i} className="text-[10px] font-semibold text-white bg-white/5 px-2.5 py-1 rounded border border-white/5">
                        {w}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="bg-white/5 p-4 rounded-xl border border-white/5">
                  <h4 className="text-[10px] uppercase font-bold text-white/40 tracking-wider mb-2.5 flex items-center gap-1.5">
                    <Shield className="w-3.5 h-3.5 text-gold" /> {language === 'Hindi' ? 'दिव्य शक्तियां / गुण' : 'Divine Powers'}
                  </h4>
                  <div className="flex flex-wrap gap-1.5">
                    {activeChar.powers.map((p: string, i: number) => (
                      <span key={i} className="text-[10px] font-semibold text-gold bg-gold/5 px-2.5 py-1 rounded border border-gold/10">
                        {p}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Family Tree Panel */}
              <div className="bg-white/5 p-5 rounded-2xl border border-white/5 mb-6">
                <h4 className="text-[10px] uppercase font-bold text-white/40 tracking-wider mb-4 flex items-center gap-1.5">
                  <UserPlus className="w-3.5 h-3.5 text-emerald-400" /> {language === 'Hindi' ? 'पारिवारिक वंशावली / संबंध' : 'Interactive Lineage / Family'}
                </h4>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-center text-xs">
                  {activeChar.family.father && (
                    <div className="bg-black/40 p-2.5 rounded-lg border border-white/5">
                      <span className="block text-[9px] text-white/45 uppercase tracking-wider mb-0.5">{language === 'Hindi' ? 'पिता' : 'Father'}</span>
                      <strong className="text-white font-medium">{activeChar.family.father}</strong>
                    </div>
                  )}
                  {activeChar.family.mother && (
                    <div className="bg-black/40 p-2.5 rounded-lg border border-white/5">
                      <span className="block text-[9px] text-white/45 uppercase tracking-wider mb-0.5">{language === 'Hindi' ? 'माता' : 'Mother'}</span>
                      <strong className="text-white font-medium">{activeChar.family.mother}</strong>
                    </div>
                  )}
                  {activeChar.family.spouse && (
                    <div className="bg-black/40 p-2.5 rounded-lg border border-white/5">
                      <span className="block text-[9px] text-white/45 uppercase tracking-wider mb-0.5">{language === 'Hindi' ? 'जीवनसाथी' : 'Spouse'}</span>
                      <strong className="text-gold font-medium">{activeChar.family.spouse}</strong>
                    </div>
                  )}
                  {activeChar.family.siblings && activeChar.family.siblings.length > 0 && (
                    <div className="bg-black/40 p-2.5 rounded-lg border border-white/5 col-span-2 md:col-span-1">
                      <span className="block text-[9px] text-white/45 uppercase tracking-wider mb-0.5">{language === 'Hindi' ? 'भाई-बहन' : 'Siblings'}</span>
                      <strong className="text-white font-medium line-clamp-1">{activeChar.family.siblings.join(', ')}</strong>
                    </div>
                  )}
                </div>
              </div>

              {/* Famous quotes */}
              <div className="bg-white/5 p-5 rounded-2xl border border-white/5 mb-6">
                <h4 className="text-[10px] uppercase font-bold text-white/40 tracking-wider mb-3 flex items-center gap-1.5">
                  <Quote className="w-3.5 h-3.5 text-saffron" /> {language === 'Hindi' ? 'प्रसिद्ध कथन' : 'Legendary Quotes'}
                </h4>
                <div className="space-y-3">
                  {activeChar.quotes.map((q: any, i: number) => (
                    <div key={i} className="border-l-2 border-saffron/40 pl-3 py-0.5">
                      <p className="text-xs md:text-sm text-white font-medium italic">
                        "{q.text}"
                      </p>
                      <span className="text-[9px] text-white/40 block mt-1 font-mono uppercase">
                        {language === 'Hindi' ? 'संदर्भ: ' : 'Context: '}{q.context}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Allies and enemies relationship grid */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h5 className="text-[10px] uppercase font-bold text-emerald-400 tracking-wider mb-2 flex items-center gap-1.5">
                    <Heart className="w-3 h-3" /> {language === 'Hindi' ? 'मुख्य सहयोगी' : 'Key Allies'}
                  </h5>
                  <div className="flex flex-wrap gap-1">
                    {activeChar.allies.map((a: string, i: number) => (
                      <span
                        key={i}
                        className="text-[9px] uppercase font-semibold tracking-wider bg-emerald-500/10 text-emerald-400 px-2 py-0.5 rounded border border-emerald-500/10"
                      >
                        {a}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <h5 className="text-[10px] uppercase font-bold text-red-400 tracking-wider mb-2 flex items-center gap-1.5">
                    <Sword className="w-3 h-3" /> {language === 'Hindi' ? 'मुख्य विरोधी' : 'Key Adversaries'}
                  </h5>
                  <div className="flex flex-wrap gap-1">
                    {activeChar.enemies.map((e: string, i: number) => (
                      <span
                        key={i}
                        className="text-[9px] uppercase font-semibold tracking-wider bg-red-500/10 text-red-400 px-2 py-0.5 rounded border border-red-500/10"
                      >
                        {e}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

            </div>

            {/* Spiritual Lessons */}
            <div className="mt-8 border-t border-white/5 pt-6 flex items-start gap-3 bg-gold/5 p-4 rounded-xl border border-gold/10">
              <BookOpen className="w-5 h-5 text-gold flex-shrink-0 mt-0.5" />
              <div>
                <h5 className="text-[10px] uppercase tracking-wider font-bold text-gold mb-1">
                  {language === 'Hindi' ? `${activeChar.name} से जीवन की सीख` : `Life Lesson from ${activeChar.name}`}
                </h5>
                <ul className="list-disc pl-4 text-xs text-white/80 space-y-1">
                  {activeChar.lessons.map((lesson: string, idx: number) => (
                    <li key={idx} className="leading-relaxed">{lesson}</li>
                  ))}
                </ul>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
