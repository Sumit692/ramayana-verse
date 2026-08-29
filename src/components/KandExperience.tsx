'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { kands, Kand, characters } from '@/data/ramayana';
import { getTranslatedKands, getTranslation, speakText } from '@/data/translations';
import { useKidsMode, useUserProgress, useAppLanguage } from '@/components/Providers';
import { Volume2, VolumeX, CheckCircle, BookOpen, Quote, Sparkles, Award } from 'lucide-react';

export default function KandExperience() {
  const [activeKandIndex, setActiveKandIndex] = useState(0);
  const [activeTab, setActiveTab] = useState<'summary' | 'verses' | 'themes' | 'lessons'>('summary');
  const [isSpeaking, setIsSpeaking] = useState(false);
  const { isKidsMode } = useKidsMode();
  const { completedKands, completeKand, xp } = useUserProgress();
  const { language } = useAppLanguage();
  
  const translatedKands = getTranslatedKands(language);
  const currentKand = translatedKands[activeKandIndex];

  // Kids Mode content overrides (fully translated to Hindi when active)
  const getKandSummary = (kand: Kand) => {
    if (isKidsMode) {
      if (language === 'Hindi') {
        switch (kand.id) {
          case 'bal-kand':
            return 'मिलिए नन्हे राजकुमार राम से! उनका जन्म सोने की नगरी अयोध्या में हुआ था। वह अपने भाई लक्ष्मण के साथ ऋषियों की रक्षा करने वन गए, और फिर जनकपुर जाकर विशाल धनुष को तोड़कर माता सीता से विवाह किया!';
          case 'ayodhya-kand':
            return 'राम बड़े हो गए हैं और राजा बनने वाले हैं! लेकिन रानी कैकेयी ने महाराज दशरथ से राम को 14 वर्ष के वनवास भेजने का वरदान मांग लिया। राम मुस्कुराते हुए मान गए, और सीता तथा लक्ष्मण भी उनके साथ वन चले गए।';
          case 'aranya-kand':
            return 'वन में रहते हुए एक दिन सोने का हिरण दिखाई दिया। सीता जी को वह बहुत पसंद आया, इसलिए राम उसे पकड़ने गए। पीछे से दुष्ट रावण ने छल से सीता जी का अपहरण कर लिया।';
          case 'kishkindha-kand':
            return 'राम सीता जी को ढूंढते हुए वानर राज सुग्रीव और हनुमान जी से मिले। राम ने सुग्रीव को राजा बनाया और वानर सेना ने चारों दिशाओं में सीता जी की खोज शुरू की।';
          case 'sundara-kand':
            return 'हनुमान जी ने विशाल समुद्र लांघा और लंका जाकर अशोक वाटिका में माता सीता को राम जी की अंगूठी दी। उन्होंने लंका जला दी और राम जी के पास अच्छी खबर लेकर लौटे।';
          case 'yuddha-kand':
            return 'वानर सेना ने समुद्र पर पत्थरों का राम सेतु बनाया! एक बड़ा युद्ध हुआ, जिसमें राम ने रावण को हराया। वे सब अयोध्या लौटे और नगरवासियों ने दीप जलाकर दीपोत्सव मनाया!';
          case 'uttara-kand':
            return 'राम ने अयोध्या पर न्यायपूर्ण शासन किया। उनके जुड़वां बेटे लव और कुश बड़े होकर पूरी रामायण का गान करते हैं और सबको याद दिलाते हैं कि सत्य और कर्तव्य अमर हैं।';
          default:
            return kand.summary;
        }
      } else {
        switch (kand.id) {
          case 'bal-kand':
            return 'Meet little Prince Rama! He was born in the golden city of Ayodhya. Along with his brother Lakshmana, he studied with wise teachers, helped protect sages from scary monsters in the forest, and went to a grand palace in Mithila where he lifted a giant, heavy bow of Lord Shiva to marry the beautiful Princess Sita!';
          case 'ayodhya-kand':
            return 'Rama is grown up and ready to be King! But Queen Kaikeyi, influenced by her maid, asks the King to send Rama to live in the forest for 14 years so her own son Bharata can rule. Rama smiles and accepts, traveling to the wild forest. Sita and Lakshmana refuse to leave him and go along.';
          case 'aranya-kand':
            return 'Living in the deep forest, Rama, Sita, and Lakshmana meet sages and live in a beautiful hut. One day, a golden deer runs by. Sita loves it, so Rama goes to catch it. While he is away, the ten-headed demon king Ravana tricks Sita and abducts her. The brave bird Jatayu tries to stop Ravana but is hurt.';
          case 'kishkindha-kand':
            return 'Rama searches for Sita and meets the Vanaras (monkey heroes)! He meets Hanuman, who becomes his best friend. Rama helps the monkey king Sugriva regain his throne. In return, Sugriva orders all the monkeys in the land to search the world for Sita.';
          case 'sundara-kand':
            return 'Hanuman takes a giant leap across the wide ocean to Lanka! He finds Sita crying under an Ashoka tree. He gives her Rama\'s ring to make her happy, defeats Ravana\'s soldiers, and uses his burning tail to burn down the demon\'s city before returning to Rama with good news.';
          case 'yuddha-kand':
            return 'The monkeys build a floating bridge of stones over the ocean to Lanka! A giant war begins. Rama defeats the ten-headed Ravana, rescues Sita, and they return home to Ayodhya. The citizens light thousands of clay lamps (Diwali) to welcome their new King!';
          case 'uttara-kand':
            return 'Rama rules Ayodhya fairly. He has two brave twin sons, Luv and Kush, who grow up learning the entire Ramayana song. They sing it to their father, reminding everyone that love, truth, and duty live on forever.';
          default:
            return kand.summary;
        }
      }
    }
    return kand.summary;
  };

  // Text-To-Speech handler
  const toggleNarration = () => {
    if (typeof window === 'undefined') return;

    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      return;
    }

    const textToRead = getKandSummary(currentKand) + `. ${language === 'Hindi' ? 'इस अध्याय की नैतिक सीख' : 'Moral of this chapter'}: ${currentKand.moral}`;
    
    // Call centralized speakText utility
    speakText(textToRead, language);
    setIsSpeaking(true);
    
    // Fallback timer to reset the state if speech ends without firing onend in some browsers
    setTimeout(() => {
      setIsSpeaking(false);
    }, 28000);
  };

  // Cancel speaking on Kand swap
  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    }
  }, [activeKandIndex]);

  const handleComplete = () => {
    completeKand(currentKand.id);
  };

  const isCompleted = completedKands.includes(currentKand.id);

  return (
    <section id="kand" className="relative py-24 px-6 md:px-12 flex flex-col justify-center min-h-screen overflow-hidden transition-colors duration-500">
      {/* Background Cinematic Aura */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[70vw] h-[70vw] rounded-full bg-gradient-to-tr ${currentKand.themeColor} opacity-5 blur-[150px] transition-all duration-700`} />
      </div>

      <div className="max-w-6xl mx-auto w-full z-10 relative">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <span className="text-saffron font-bold text-xs tracking-[0.25em] uppercase">
              {language === 'Hindi' ? 'कहानी मोड — सात अध्याय' : 'Story Mode — The Seven Chapters'}
            </span>
            <h2 className="text-3xl md:text-5xl font-bold font-outfit mt-2">
              {language === 'Hindi' ? 'सात कांड' : 'The Seven Kands'}
            </h2>
          </div>

          {/* Chapter Selector Tabs */}
          <div className="flex items-center gap-2 mt-6 md:mt-0 overflow-x-auto pb-2 no-scrollbar border-b border-white/5 md:border-none">
            {translatedKands.map((kand, idx) => (
              <button
                key={kand.id}
                onClick={() => {
                  setActiveKandIndex(idx);
                  setActiveTab('summary');
                }}
                className={`px-4 py-2 text-xs uppercase tracking-widest font-semibold rounded-full border transition duration-300 ${
                  activeKandIndex === idx
                    ? 'bg-gradient-to-r from-gold to-saffron text-black border-transparent shadow-lg'
                    : 'border-white/10 hover:border-gold/30 text-white/60 hover:text-white bg-white/5'
                }`}
              >
                {idx + 1}. {kand.name}
              </button>
            ))}
          </div>
        </div>

        {/* Cinematic Split Slide */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch min-h-[500px]">
          
          {/* Left Panel: Visual/Cover Card */}
          <div className="lg:col-span-5 flex flex-col justify-between p-8 rounded-3xl glass-premium relative overflow-hidden group">
            {/* Morphing Liquid Gradient Background */}
            <div className={`absolute inset-0 bg-gradient-to-br ${currentKand.themeColor} opacity-20 group-hover:opacity-30 transition-all duration-700`} />
            
            {/* Top row */}
            <div className="z-10 flex items-center justify-between">
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] px-3 py-1 bg-white/10 rounded-full border border-white/10 text-white/80">
                {language === 'Hindi' ? `कांड ${activeKandIndex + 1} / 7` : `Kand ${activeKandIndex + 1} of 7`}
              </span>
              
              {isCompleted ? (
                <div className="flex items-center gap-1.5 text-emerald-400 font-semibold text-xs tracking-wider uppercase">
                  <CheckCircle className="w-4 h-4" />
                  {language === 'Hindi' ? 'पूर्ण' : 'Completed'}
                </div>
              ) : (
                <button
                  onClick={handleComplete}
                  className="flex items-center gap-1.5 text-gold hover:text-white font-semibold text-xs tracking-wider uppercase transition duration-300"
                >
                  <Award className="w-4 h-4" />
                  {language === 'Hindi' ? 'पूर्ण मार्क करें (+100 XP)' : 'Mark Completed (+100 XP)'}
                </button>
              )}
            </div>

            {/* Title & Cover Text */}
            <div className="z-10 my-12 text-center lg:text-left">
              <h3 className="text-2xl font-bold text-gold font-outfit uppercase tracking-widest mb-1">
                {currentKand.name}
              </h3>
              <h4 className="text-4xl md:text-5xl font-extrabold font-outfit text-white leading-tight mb-3">
                {currentKand.title}
              </h4>
              <p className="text-xs uppercase tracking-widest text-white/50 font-semibold">
                {currentKand.translation}
              </p>
            </div>

            {/* Bottom Actions */}
            <div className="z-10 flex items-center justify-between border-t border-white/10 pt-6">
              <button
                onClick={toggleNarration}
                className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-white/5 border border-white/10 hover:border-gold/30 hover:bg-white/10 text-xs font-semibold uppercase tracking-wider transition duration-300 text-white/95"
              >
                {isSpeaking ? (
                  <>
                    <VolumeX className="w-4 h-4 text-saffron" />
                    {language === 'Hindi' ? 'कथा रोकें' : 'Pause Narration'}
                  </>
                ) : (
                  <>
                    <Volume2 className="w-4 h-4 text-gold" />
                    {language === 'Hindi' ? 'कहानी सुनें' : 'Listen to Story'}
                  </>
                )}
              </button>

              <span className="text-[10px] text-white/40 font-medium font-mono uppercase">
                {language === 'Hindi' ? 'सक्रिय भाषा: हिन्दी' : `Active Lang: ${language}`}
              </span>
            </div>

            {/* Decorative Sanskrit Pattern Outline in background */}
            <div className="absolute right-[-40px] bottom-[-40px] w-48 h-48 border border-white/5 rounded-full flex items-center justify-center opacity-30 select-none">
              <div className="w-36 h-36 border border-dashed border-white/5 rounded-full flex items-center justify-center">
                <Sparkles className="w-10 h-10 text-gold/10" />
              </div>
            </div>
          </div>

          {/* Right Panel: Content tabs */}
          <div className="lg:col-span-7 flex flex-col justify-between p-8 md:p-10 rounded-3xl glass border-white/5 relative bg-black/40">
            <div>
              {/* Internal Tab Nav */}
              <div className="flex gap-6 border-b border-white/5 pb-4 mb-6">
                {[
                  { id: 'summary', label: language === 'Hindi' ? 'कथा सारांश' : 'Chronicle' },
                  { id: 'verses', label: language === 'Hindi' ? 'पावन श्लोक' : 'Sacred Verses' },
                  { id: 'themes', label: language === 'Hindi' ? 'दर्शन / Themes' : 'Themes' },
                  { id: 'lessons', label: language === 'Hindi' ? 'जीवन की सीख' : 'Lessons for Life' },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as any)}
                    className={`text-xs uppercase tracking-wider font-semibold transition duration-300 pb-1 relative ${
                      activeTab === tab.id
                        ? 'text-gold'
                        : 'text-white/40 hover:text-white/70'
                    }`}
                  >
                    {tab.label}
                    {activeTab === tab.id && (
                      <motion.div
                        layoutId="activeKandTab"
                        className="absolute bottom-[-17px] left-0 right-0 h-[2px] bg-gradient-to-r from-gold to-saffron"
                      />
                    )}
                  </button>
                ))}
              </div>

              {/* Tab Content Area */}
              <div className="min-h-[260px]">
                <AnimatePresence mode="wait">
                  {activeTab === 'summary' && (
                    <motion.div
                      key="summary"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="space-y-4"
                    >
                      <p className="text-sm md:text-base text-white/80 leading-relaxed font-inter">
                        {getKandSummary(currentKand)}
                      </p>
                      
                      <div>
                        <h5 className="text-[11px] uppercase tracking-widest text-gold font-bold mb-2 flex items-center gap-1.5">
                          <BookOpen className="w-3.5 h-3.5" /> {language === 'Hindi' ? 'मुख्य पड़ाव / घटनाएं' : 'Key Milestones'}
                        </h5>
                        <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                          {currentKand.keyEvents.map((evt: string, idx: number) => (
                            <li key={idx} className="text-xs text-white/70 flex items-start gap-2">
                              <span className="text-saffron">•</span> {evt}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </motion.div>
                  )}

                  {activeTab === 'verses' && (
                    <motion.div
                      key="verses"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="space-y-6"
                    >
                      {currentKand.verses.map((v: any, i: number) => (
                        <div key={i} className="p-4 rounded-xl bg-white/5 border border-white/5">
                          <div className="flex items-center gap-2 mb-2">
                            <Quote className="w-4 h-4 text-saffron" />
                            <span className="text-[10px] font-mono tracking-widest text-white/50">
                              {v.reference}
                            </span>
                          </div>
                          <p className="text-base text-gold font-semibold tracking-wide text-center py-2 border-b border-white/5 mb-3 leading-loose font-outfit">
                            {v.sanskrit}
                          </p>
                          <p className="text-xs text-white/40 italic text-center mb-3">
                            {v.transliteration}
                          </p>
                          <p className="text-xs md:text-sm text-white/80 leading-relaxed">
                            "{v.translation}"
                          </p>
                        </div>
                      ))}
                    </motion.div>
                  )}

                  {activeTab === 'themes' && (
                    <motion.div
                      key="themes"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="space-y-4 font-inter"
                    >
                      <div className="space-y-4">
                        {currentKand.themes?.map((theme, idx) => (
                          <div key={idx} className="p-4 rounded-xl bg-white/5 border border-white/5">
                            <h6 className="text-sm font-bold text-gold mb-1.5 flex items-center gap-2">
                              <span className="inline-block w-1.5 h-1.5 rounded-full bg-saffron" />
                              {theme.title}
                            </h6>
                            <p className="text-xs md:text-sm text-white/70 leading-relaxed">
                              {theme.description}
                            </p>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  )}

                  {activeTab === 'lessons' && (
                    <motion.div
                      key="lessons"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="space-y-4"
                    >
                      <div className="p-4 rounded-xl bg-saffron/5 border border-saffron/10 mb-2">
                        <h6 className="text-xs uppercase tracking-wider font-bold text-saffron mb-1">
                          {language === 'Hindi' ? 'मुख्य नैतिक सीख' : 'Moral Core'}
                        </h6>
                        <p className="text-xs md:text-sm text-white/90 italic leading-relaxed">
                          {currentKand.moral}
                        </p>
                      </div>

                      <div>
                        <h5 className="text-[11px] uppercase tracking-widest text-gold font-bold mb-2">
                          {language === 'Hindi' ? 'आध्यात्मिक सीख' : 'Spiritual Takeaways'}
                        </h5>
                        <ul className="space-y-2">
                          {currentKand.lessons.map((lesson: string, idx: number) => (
                            <li key={idx} className="text-xs md:text-sm text-white/70 flex items-start gap-3 bg-white/5 p-3 rounded-lg border border-white/5">
                              <span className="text-gold font-semibold">0{idx + 1}</span>
                              <span className="leading-relaxed">{lesson}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            {/* Next Kand Action */}
            <div className="border-t border-white/5 pt-6 mt-8 flex items-center justify-between">
              <div className="flex gap-1">
                {translatedKands.map((_, idx) => (
                  <span
                    key={idx}
                    className={`h-1 rounded-full transition-all duration-300 ${
                      activeKandIndex === idx ? 'w-6 bg-gold' : 'w-2 bg-white/10'
                    }`}
                  />
                ))}
              </div>

              <div className="flex gap-2">
                <button
                  disabled={activeKandIndex === 0}
                  onClick={() => {
                    setActiveKandIndex((prev) => prev - 1);
                    setActiveTab('summary');
                  }}
                  className="px-4 py-2 rounded-full border border-white/10 bg-white/5 hover:bg-white/10 text-xs font-semibold uppercase tracking-wider disabled:opacity-40 disabled:hover:bg-white/5 transition duration-300 text-white"
                >
                  {language === 'Hindi' ? 'पिछला' : 'Prev'}
                </button>
                <button
                  disabled={activeKandIndex === kands.length - 1}
                  onClick={() => {
                    setActiveKandIndex((prev) => prev + 1);
                    setActiveTab('summary');
                  }}
                  className="px-4 py-2 rounded-full bg-gradient-to-r from-gold to-saffron text-black text-xs font-semibold uppercase tracking-wider disabled:opacity-40 disabled:hover:opacity-10 transition duration-300"
                >
                  {language === 'Hindi' ? 'अगला कांड' : 'Next Kand'}
                </button>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
