'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { libraryItems, versions, LibraryItem } from '@/data/ramayana';
import { getTranslatedLibrary, getTranslatedVersions, getTranslation } from '@/data/translations';
import { useUserProgress, useAppLanguage } from '@/components/Providers';
import { BookOpen, Shield, Sword, Award, Sparkles, AlertCircle } from 'lucide-react';

export default function LibraryAndVersions() {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const { language } = useAppLanguage();
  const [selectedTopic, setSelectedTopic] = useState<string>(language === 'Hindi' ? 'लक्ष्मण रेखा' : 'Laxman Rekha');
  const { addXp } = useUserProgress();
  const [readItems, setReadItems] = useState<string[]>([]);

  const translatedLibrary = getTranslatedLibrary(language);
  const translatedVersions = getTranslatedVersions(language);

  // Sync comparison topic with active language
  useEffect(() => {
    setSelectedTopic(language === 'Hindi' ? 'लक्ष्मण रेखा' : 'Laxman Rekha');
  }, [language]);

  // Filter library items
  const filteredItems = activeCategory === 'all'
    ? translatedLibrary
    : translatedLibrary.filter((item) => item.category === activeCategory);

  const markItemAsRead = (itemId: string) => {
    if (!readItems.includes(itemId)) {
      setReadItems((prev) => [...prev, itemId]);
      addXp(15); // Earn 15 XP for reading library cards
    }
  };

  // Unique topics of version differences to compare
  const comparisonTopics = language === 'Hindi'
    ? ['लक्ष्मण रेखा', 'सीता हरण']
    : ['Laxman Rekha', 'Sita\'s Abduction'];

  return (
    <section id="library" className="py-24 px-6 md:px-12 border-b border-white/5 relative overflow-hidden bg-gradient-to-b from-[#080808] to-[#050505]">
      {/* Background glow decoration */}
      <div className="absolute top-1/3 left-1/3 w-80 h-80 bg-gold/5 blur-[100px] pointer-events-none" />

      <div className="max-w-6xl mx-auto w-full z-10 relative">
        
        {/* PART 1: KNOWLEDGE LIBRARY */}
        <div className="mb-20">
          <div className="mb-10">
            <span className="text-saffron font-bold text-xs tracking-[0.25em] uppercase">
              {language === 'Hindi' ? 'संग्रह — दिव्य विश्वकोश' : 'Compendium — Divine Encyclopedia'}
            </span>
            <h2 className="text-3xl md:text-5xl font-bold font-outfit mt-2">
              {language === 'Hindi' ? 'ज्ञान पुस्तकालय' : 'Knowledge Library'}
            </h2>
            <p className="text-sm text-white/50 mt-2">
              {language === 'Hindi' ? 'महाकाव्य के प्रसिद्ध अस्त्रों, दिव्य प्राणियों, उत्सवों और पवित्र वस्तुओं की खोज करें।' : 'Discover legendary weapons, divine creatures, festivals, and sacred objects of the epic.'}
            </p>
          </div>

          {/* Filter Categories */}
          <div className="flex flex-wrap gap-2 mb-8 overflow-x-auto pb-2 no-scrollbar">
            {[
              { id: 'all', label: language === 'Hindi' ? 'सभी कलाकृतियां' : 'All Artifacts' },
              { id: 'weapons', label: language === 'Hindi' ? 'अस्त्र-शस्त्र' : 'Weapons' },
              { id: 'creatures', label: language === 'Hindi' ? 'प्राणी' : 'Creatures' },
              { id: 'objects', label: language === 'Hindi' ? 'वस्तुएं' : 'Objects' },
              { id: 'festivals', label: language === 'Hindi' ? 'त्योहार' : 'Festivals' },
            ].map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-wider transition duration-300 border ${
                  activeCategory === cat.id
                    ? 'bg-gradient-to-r from-gold to-saffron text-black border-transparent'
                    : 'border-white/10 text-white/70 hover:border-gold/30 bg-white/5'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Library Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence mode="popLayout">
              {filteredItems.map((item) => {
                const isRead = readItems.includes(item.id);
                return (
                  <motion.div
                    key={item.id}
                    layout
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.3 }}
                    onClick={() => markItemAsRead(item.id)}
                    className="glass p-6 rounded-2xl flex flex-col justify-between hover:border-gold/50 transition bg-black/40 min-h-[220px] cursor-pointer group relative overflow-hidden"
                  >
                    {/* Glow tag when read */}
                    {isRead && (
                      <div className="absolute -top-6 -right-6 w-16 h-16 rounded-full bg-gold/10 blur-md pointer-events-none" />
                    )}

                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <span className="text-[9px] uppercase font-mono tracking-widest text-saffron bg-saffron/10 px-2 py-0.5 rounded border border-saffron/15">
                          {item.category}
                        </span>
                        {item.category === 'weapons' ? (
                          <Sword className="w-4 h-4 text-gold/60 group-hover:text-gold transition" />
                        ) : (
                          <Shield className="w-4 h-4 text-gold/60 group-hover:text-gold transition" />
                        )}
                      </div>

                      <h3 className="text-lg font-bold font-outfit text-white mb-2 group-hover:text-gold transition">
                        {item.name}
                      </h3>

                      <p className="text-xs text-white/60 leading-relaxed mb-4">
                        {item.description}
                      </p>
                    </div>

                    <div className="border-t border-white/5 pt-4 mt-auto">
                      <span className="block text-[9px] uppercase font-bold text-white/40 mb-1">
                        {language === 'Hindi' ? 'महत्व' : 'Significance'}
                      </span>
                      <p className="text-[11px] text-gold/90 italic leading-relaxed">
                        {item.significance}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        </div>

        {/* PART 2: REGIONAL VERSIONS COMPARISON */}
        <div className="border-t border-white/5 pt-20">
          <div className="mb-10">
            <span className="text-saffron font-bold text-xs tracking-[0.25em] uppercase">
              {language === 'Hindi' ? 'शास्त्र मीमांसा — विभिन्न पाठ्य रूपांतरण' : 'Hermeneutics — Textual Adaptations'}
            </span>
            <h2 className="text-3xl md:text-5xl font-bold font-outfit mt-2">
              {language === 'Hindi' ? 'रामायण के विभिन्न संस्करण' : 'Versions of Ramayana'}
            </h2>
            <p className="text-sm text-white/50 mt-2">
              {language === 'Hindi' ? 'विभिन्न क्षेत्रीय पारंपरिक ग्रंथों और दृष्टिकोणों के बीच तुलनात्मक अध्ययन।' : 'Respectful comparisons showing differences in perspectives across regional traditional epics.'}
            </p>
          </div>

          {/* Quick Info Banner */}
          <div className="p-4 rounded-2xl bg-white/5 border border-white/5 flex items-start gap-3 mb-10">
            <AlertCircle className="w-5 h-5 text-gold flex-shrink-0 mt-0.5" />
            <p className="text-xs text-white/60 leading-relaxed">
              {language === 'Hindi' ? (
                <>
                  <strong>दृष्टिकोण का महत्व है</strong>: रामायण का कोई भी संस्करण छोटा या बड़ा नहीं है। जहां महर्षि वाल्मीकि ने संस्कृत में राम को आदर्श मनुष्य के रूप में चित्रित किया, वहीं तुलसीदास जी ने भक्ति पर ध्यान केंद्रित किया, और कंबन ने सुंदर तमिल साहित्यिक शैली का उपयोग किया। कृपया सभी का सम्मान करें।
                </>
              ) : (
                <>
                  <strong>Perspective matters</strong>: No single version of the Ramayana is superior. While Sage Valmiki wrote in classical Sanskrit highlighting Rama's struggles as an exemplary human, Tulsidas wrote medieval Hindi poetry focused on pure devotion, and Kambar wrote highly stylistic Tamil literature. Explore their unique lenses respectfully.
                </>
              )}
            </p>
          </div>

          {/* Interactive Grid comparing core metadata */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-12">
            {translatedVersions.map((ver: any, idx: number) => (
              <div key={idx} className="glass p-6 rounded-2xl bg-black/30 border border-white/5 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-sm font-bold text-gold font-outfit">
                      {ver.name}
                    </span>
                    <span className="text-[9px] font-mono text-white/45">
                      {ver.language}
                    </span>
                  </div>

                  <ul className="text-xs space-y-2 text-white/70">
                    <li><strong>{language === 'Hindi' ? 'रचयिता:' : 'Author:'}</strong> {ver.author}</li>
                    <li><strong>{language === 'Hindi' ? 'काल:' : 'Period:'}</strong> {ver.period}</li>
                    <li className="leading-relaxed"><strong>{language === 'Hindi' ? 'मुख्य ध्यान:' : 'Primary Focus:'}</strong> {ver.focus}</li>
                  </ul>
                </div>
              </div>
            ))}
          </div>

          {/* Specific Narrative Difference comparison tool */}
          <div className="rounded-3xl glass-premium p-6 md:p-8 bg-black/60 border border-white/5">
            <h4 className="text-xs uppercase font-bold text-white/40 tracking-wider mb-6 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-gold animate-pulse" />
              {language === 'Hindi' ? 'कथा व्याख्याओं की तुलना करें' : 'Compare Narrative Interpretations'}
            </h4>

            {/* Difference topics selector */}
            <div className="flex gap-2 mb-6">
              {comparisonTopics.map((topic) => (
                <button
                  key={topic}
                  onClick={() => setSelectedTopic(topic)}
                  className={`px-4 py-2 rounded-lg text-xs font-semibold uppercase tracking-wider transition duration-300 ${
                    selectedTopic === topic
                      ? 'bg-saffron/20 border border-saffron/40 text-saffron'
                      : 'border-white/5 hover:border-white/10 bg-white/5 text-white/60'
                  }`}
                >
                  {topic}
                </button>
              ))}
            </div>

            {/* Side-by-side comparative table */}
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="border-b border-white/10 text-white/40 uppercase font-mono tracking-widest">
                    <th className="py-3 px-4">{language === 'Hindi' ? 'रामायण संस्करण' : 'Epic Version'}</th>
                    <th className="py-3 px-4">{language === 'Hindi' ? 'विषय' : 'Topic'}</th>
                    <th className="py-3 px-4">{language === 'Hindi' ? 'शास्त्रों के अनुसार विवरण' : 'Scriptural Account'}</th>
                  </tr>
                </thead>
                <tbody>
                  {translatedVersions.map((ver: any, idx: number) => {
                    const diff = ver.differences.find((d: any) => d.topic === selectedTopic) || ver.differences[0];
                    return (
                      <tr key={idx} className="border-b border-white/5 hover:bg-white/5 transition">
                        <td className="py-4 px-4 font-bold text-white">
                          {ver.name}
                          <span className="block text-[10px] text-white/40 font-mono mt-0.5 font-normal">
                            {language === 'Hindi' ? `रचयिता: ${ver.author}` : `By ${ver.author}`}
                          </span>
                        </td>
                        <td className="py-4 px-4 text-gold font-medium font-outfit">
                          {selectedTopic}
                        </td>
                        <td className="py-4 px-4 text-white/80 leading-relaxed font-inter">
                          {diff ? diff.narrative : (language === 'Hindi' ? 'मानक मौखिक प्रस्तुति का उल्लेख।' : 'Referenced standard oral representation.')}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
