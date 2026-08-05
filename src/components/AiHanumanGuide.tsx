'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Send, Book, ShieldAlert, CornerDownLeft, MessageSquare } from 'lucide-react';
import { useUserProgress, useAppLanguage } from '@/components/Providers';

interface Message {
  role: 'user' | 'assistant';
  content: string;
  sources?: string;
}

export default function AiHanumanGuide() {
  const { language } = useAppLanguage();
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const { addXp } = useUserProgress();

  // Reset messages when language changes
  useEffect(() => {
    setMessages([
      {
        role: 'assistant',
        content: language === 'Hindi'
          ? 'जय श्री राम! मैं आपका विनम्र सेवक हनुमान हूँ। रामायण की कहानी, पात्रों, भौगोलिक स्थानों, अस्त्र-शस्त्रों या नैतिक सीखों के बारे में मुझसे कोई भी प्रश्न पूछें, और मैं शास्त्रों का दिव्य ज्ञान साझा करूँगा।'
          : 'Jai Shri Ram! I am Hanuman, your humble guide. Ask me any question regarding the story, characters, geographical locations, weapons, or spiritual morals of the Ramayana, and I shall share the wisdom from the sacred scriptures.',
        sources: language === 'Hindi' ? 'वाल्मीकि रामायण और रामचरितमानस कोर शिक्षाएं' : 'Valmiki Ramayana & Ramcharitmanas Core Teachings',
      },
    ]);
  }, [language]);

  const suggestions = language === 'Hindi'
    ? [
        'राम को वनवास क्यों हुआ था?',
        'हनुमान कौन हैं?',
        'लंका के पुल (राम सेतु) के बारे में बताएं',
        'युद्ध कांड की नैतिक सीख क्या है?',
      ]
    : [
        'Why was Rama exiled?',
        'Who is Hanuman?',
        'Tell me about the Bridge to Lanka',
        'What is the lesson of Yuddha Kand?',
      ];

  // Scroll inner container to bottom when new messages arrive
  useEffect(() => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTo({
        top: scrollContainerRef.current.scrollHeight,
        behavior: 'smooth',
      });
    }
  }, [messages, isLoading]);

  const handleSubmit = async (text: string) => {
    if (!text.trim() || isLoading) return;

    const userMessage = text.trim();
    setInput('');
    setMessages((prev) => [...prev, { role: 'user', content: userMessage }]);
    setIsLoading(true);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userMessage, language }),
      });

      if (res.ok) {
        const data = await res.json();
        setMessages((prev) => [
          ...prev,
          { role: 'assistant', content: data.reply, sources: data.sources },
        ]);
        addXp(10); // Reward 10 XP for engaging with the AI Guide
      } else {
        throw new Error('API request failed');
      }
    } catch (e) {
      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          content: language === 'Hindi'
            ? 'क्षमा करें, साधक। एक क्षणिक आध्यात्मिक बाधा के कारण संपर्क टूट गया है। कृपया कुछ समय बाद पुनः प्रयास करें।'
            : 'Apologies, seeker. A momentary spiritual disturbance has disconnected my link. Please try asking again shortly.',
          sources: language === 'Hindi' ? 'प्रणाली त्रुटि संपर्क' : 'System Error Connection',
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section id="ai-guide" className="py-24 px-6 md:px-12 border-b border-white/5 relative overflow-hidden bg-gradient-to-b from-[#050505] to-[#080808]">
      {/* Dynamic saffron backglow */}
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full bg-saffron/5 blur-[120px] pointer-events-none" />

      <div className="max-w-4xl mx-auto w-full z-10 relative">
        {/* Header */}
        <div className="text-center mb-12">
          <span className="text-saffron font-bold text-xs tracking-[0.25em] uppercase flex items-center justify-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 animate-pulse" />
            {language === 'Hindi' ? 'आध्यात्मिक साथी — हनुमान एआई' : 'Spiritual Companion — Hanuman AI'}
          </span>
          <h2 className="text-3xl md:text-5xl font-bold font-outfit mt-2">
            {language === 'Hindi' ? 'एआई गाइड से पूछें' : 'Ask the AI Guide'}
          </h2>
          <p className="text-sm text-white/60 max-w-xl mx-auto mt-2">
            {language === 'Hindi' ? 'सरल भाषा में शास्त्र सम्मत कथाओं, प्रतीकों, पारिवारिक कड़ियों और आध्यात्मिक सीखों का अन्वेषण करें।' : 'Explore stories, symbolisms, family links, and spiritual lessons in simple language with scriptural backing.'}
          </p>
        </div>

        {/* Chat Area Container */}
        <div className="rounded-3xl glass-premium overflow-hidden flex flex-col h-[550px] shadow-2xl bg-black/60 relative border border-white/5">
          
          {/* Top Info Bar */}
          <div className="px-6 py-4 border-b border-white/5 bg-white/5 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-saffron to-gold flex items-center justify-center shadow-md">
                <span className="text-black text-sm font-bold">🛕</span>
              </div>
              <div>
                <span className="block text-sm font-bold text-white leading-none">Hanuman</span>
                <span className="text-[10px] text-saffron uppercase font-semibold font-mono tracking-widest mt-0.5 block">
                  {language === 'Hindi' ? 'शास्त्र विशेषज्ञ' : 'Scriptural RAG Expert'}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-1.5 text-[10px] text-white/40 uppercase font-mono">
              <MessageSquare className="w-3.5 h-3.5" />
              {language === 'Hindi' ? 'संवाद मोड' : 'Conversation Mode'}
            </div>
          </div>

          {/* Messages Scroll View */}
          <div ref={scrollContainerRef} data-lenis-prevent className="flex-1 p-6 overflow-y-auto space-y-6 pr-2 no-scrollbar">
            {messages.map((msg, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`flex gap-3 max-w-[85%] ${
                  msg.role === 'user' ? 'ml-auto flex-row-reverse' : ''
                }`}
              >
                {/* Avatar Icon */}
                <div className={`w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center text-xs ${
                  msg.role === 'user'
                    ? 'bg-gold/10 border border-gold/20 text-gold'
                    : 'bg-saffron/10 border border-saffron/20 text-saffron'
                }`}>
                  {msg.role === 'user' ? 'U' : 'H'}
                </div>

                {/* Message Bubble */}
                <div className={`p-4 rounded-2xl text-sm leading-relaxed ${
                  msg.role === 'user'
                    ? 'bg-gold/10 border border-gold/15 text-white/95 rounded-tr-none'
                    : 'bg-white/5 border border-white/5 text-white/90 rounded-tl-none'
                }`}>
                  <p className="whitespace-pre-line font-inter">{msg.content}</p>

                  {/* Sources tag */}
                  {msg.sources && (
                    <div className="mt-3 pt-3 border-t border-white/5 flex items-center gap-1.5 text-[9px] text-white/40 font-mono">
                      <Book className="w-3 h-3 text-gold" />
                      <span>{language === 'Hindi' ? 'स्रोत: ' : 'Sources: '}<strong className="text-gold">{msg.sources}</strong></span>
                    </div>
                  )}
                </div>
              </motion.div>
            ))}

            {/* Loading Indicator */}
            {isLoading && (
              <div className="flex gap-3 max-w-[80%]">
                <div className="w-8 h-8 rounded-full bg-saffron/10 border border-saffron/20 text-saffron flex-shrink-0 flex items-center justify-center text-xs">
                  H
                </div>
                <div className="p-4 rounded-2xl bg-white/5 border border-white/5 rounded-tl-none flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-saffron animate-bounce" style={{ animationDelay: '0ms' }} />
                  <span className="w-2 h-2 rounded-full bg-saffron animate-bounce" style={{ animationDelay: '150ms' }} />
                  <span className="w-2 h-2 rounded-full bg-saffron animate-bounce" style={{ animationDelay: '300ms' }} />
                </div>
              </div>
            )}
          </div>

          {/* Quick Suggestions Chips */}
          <div className="px-6 py-2 flex flex-wrap gap-2 overflow-x-auto border-t border-white/5 bg-black/20 no-scrollbar">
            {suggestions.map((sug, i) => (
              <button
                key={i}
                onClick={() => handleSubmit(sug)}
                className="text-[10px] uppercase font-semibold tracking-wider bg-white/5 hover:bg-gold/10 hover:text-gold border border-white/10 hover:border-gold/30 text-white/70 px-3 py-1.5 rounded-full transition duration-300 flex-shrink-0 cursor-pointer"
              >
                {sug}
              </button>
            ))}
          </div>

          {/* Input Box Footer */}
          <div className="p-4 border-t border-white/5 bg-white/5 flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') handleSubmit(input);
              }}
              placeholder={language === 'Hindi' ? 'सीख, श्लोक या पात्रों के बारे में हनुमान जी से पूछें...' : 'Ask Hanuman about lessons, verses, or characters...'}
              className="flex-1 px-4 py-3 rounded-xl bg-black/40 border border-white/10 focus:border-gold/50 focus:outline-none text-sm text-white placeholder-white/40 font-inter"
            />
            <button
              onClick={() => handleSubmit(input)}
              className="p-3 rounded-xl bg-gradient-to-r from-gold to-saffron hover:opacity-90 active:scale-95 transition duration-300 text-black flex items-center justify-center font-bold cursor-pointer"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>

        </div>

        {/* Hallucination Disclaimer banner */}
        <div className="mt-4 p-3 rounded-xl bg-saffron/5 border border-saffron/15 text-[11px] text-white/55 flex items-start gap-2.5">
          <ShieldAlert className="w-4 h-4 text-saffron flex-shrink-0 mt-0.5" />
          <span>
            {language === 'Hindi' ? (
              <>
                <strong>सत्यापित शास्त्र RAG इंजन</strong>: हनुमान एआई साथी द्वारा दी जाने वाली सभी जानकारी वाल्मीकि और तुलसीदास के पवित्र ग्रंथों पर आधारित है। वह केवल सत्यापित महाकाव्य अभिलेखों से ही उत्तर देने के लिए बाध्य है।
              </>
            ) : (
              <>
                <strong>Verified RAG Engine</strong>: All information output by the Hanuman companion is checked against structured Valmiki and Tulsidas scriptures. He is constrained to teach and answer using verified epic records, preventing factual hallucinations.
              </>
            )}
          </span>
        </div>

      </div>
    </section>
  );
}
