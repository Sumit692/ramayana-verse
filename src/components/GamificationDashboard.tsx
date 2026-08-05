'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { quizzes, Quiz, QuizQuestion } from '@/data/ramayana';
import { useKidsMode, useUserProgress } from '@/components/Providers';
import { Trophy, Star, Calendar, CheckCircle2, XCircle, Award, RefreshCw, ChevronRight } from 'lucide-react';

export default function GamificationDashboard() {
  const { xp, streak, addXp } = useUserProgress();
  const { isKidsMode, toggleKidsMode } = useKidsMode();
  
  // Quiz states
  const [activeQuizIndex, setActiveQuizIndex] = useState(0);
  const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [quizScore, setQuizScore] = useState(0);
  const [quizFinished, setQuizFinished] = useState(false);

  const activeQuiz = quizzes[activeQuizIndex] || quizzes[0];
  const currentQuestion = activeQuiz.questions[currentQuestionIdx];

  const handleOptionClick = (idx: number) => {
    if (isAnswered) return;
    setSelectedOption(idx);
  };

  const handleCheckAnswer = () => {
    if (selectedOption === null || isAnswered) return;
    
    const isCorrect = selectedOption === currentQuestion.answer;
    if (isCorrect) {
      setQuizScore((prev) => prev + 1);
      addXp(25); // Gain 25 XP for a correct answer
    }
    setIsAnswered(true);

    // Save attempt to database using API route
    if (currentQuestionIdx === activeQuiz.questions.length - 1) {
      const finalScore = quizScore + (isCorrect ? 1 : 0);
      fetch('/api/user', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          quizType: activeQuiz.category,
          score: finalScore,
          maxScore: activeQuiz.questions.length,
        }),
      }).catch(console.error);
    }
  };

  const handleNextQuestion = () => {
    setSelectedOption(null);
    setIsAnswered(false);

    if (currentQuestionIdx < activeQuiz.questions.length - 1) {
      setCurrentQuestionIdx((prev) => prev + 1);
    } else {
      setQuizFinished(true);
      addXp(50); // Finish quiz bonus: 50 XP
    }
  };

  const resetQuiz = () => {
    setCurrentQuestionIdx(0);
    setSelectedOption(null);
    setIsAnswered(false);
    setQuizScore(0);
    setQuizFinished(false);
  };

  // Badges lists corresponding to XP Milestones
  const badgesList = [
    { name: 'Sarayu Pioneer', description: 'Begin your journey across the scriptures.', xpRequired: 50 },
    { name: 'Devoted Disciple', description: 'Consult the AI Hanuman Guide.', xpRequired: 150 },
    { name: 'Ocean Leaper', description: 'Unlock 3 timeline milestones.', xpRequired: 300 },
    { name: 'Setu Architect', description: 'Visits all sacred map coordinates.', xpRequired: 500 },
    { name: 'Dharma King', description: 'Achieve absolute mastery of the epic.', xpRequired: 800 },
  ];

  return (
    <section id="gamification" className="py-24 px-6 md:px-12 border-b border-white/5 relative overflow-hidden bg-gradient-to-b from-[#050505] to-[#080808]">
      {/* Background glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 rounded-full bg-saffron/5 blur-[120px] pointer-events-none" />

      <div className="max-w-6xl mx-auto w-full z-10 relative">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <span className="text-saffron font-bold text-xs tracking-[0.25em] uppercase">
              Progression — Spiritual Level
            </span>
            <h2 className="text-3xl md:text-5xl font-bold font-outfit mt-2">
              Progression & Quizzes
            </h2>
          </div>

          {/* Kids Mode Toggle */}
          <div className="mt-4 md:mt-0 flex items-center gap-3">
            <span className="text-xs font-semibold text-white/55 uppercase tracking-wider">
              Toggle Kids Mode
            </span>
            <button
              onClick={toggleKidsMode}
              className={`w-14 h-7 rounded-full p-1 transition duration-300 relative ${
                isKidsMode ? 'bg-saffron' : 'bg-white/10'
              }`}
            >
              <div
                className={`w-5 h-5 rounded-full bg-black transition duration-300 ${
                  isKidsMode ? 'translate-x-7' : 'translate-x-0'
                }`}
              />
            </button>
          </div>
        </div>

        {/* Outer Split Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Left Column: Progress Board & Badges */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            
            {/* Stats Dashboard */}
            <div className="glass p-6 rounded-3xl bg-black/40 border border-white/5 flex flex-col gap-6">
              <h4 className="text-xs uppercase font-bold text-white/40 tracking-wider">
                Status Board
              </h4>

              <div className="grid grid-cols-3 gap-4 text-center">
                <div className="bg-white/5 p-4 rounded-2xl border border-white/5 flex flex-col items-center">
                  <Star className="w-5 h-5 text-gold mb-1" />
                  <span className="block text-[10px] text-white/40 uppercase font-mono mb-1">XP Points</span>
                  <strong className="text-xl font-bold text-white font-outfit">{xp}</strong>
                </div>

                <div className="bg-white/5 p-4 rounded-2xl border border-white/5 flex flex-col items-center">
                  <Calendar className="w-5 h-5 text-saffron mb-1" />
                  <span className="block text-[10px] text-white/40 uppercase font-mono mb-1">Streak</span>
                  <strong className="text-xl font-bold text-white font-outfit">{streak} Days</strong>
                </div>

                <div className="bg-white/5 p-4 rounded-2xl border border-white/5 flex flex-col items-center">
                  <Trophy className="w-5 h-5 text-emerald-400 mb-1" />
                  <span className="block text-[10px] text-white/40 uppercase font-mono mb-1">Level</span>
                  <strong className="text-xl font-bold text-white font-outfit">{Math.floor(xp / 200) + 1}</strong>
                </div>
              </div>
            </div>

            {/* Achievements Badges Card */}
            <div className="glass p-6 rounded-3xl bg-black/40 border border-white/5 flex-1 flex flex-col justify-between">
              <div>
                <h4 className="text-xs uppercase font-bold text-white/40 tracking-wider mb-4">
                  Achievements Badges
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
                          <p className="text-[10px] text-white/50 leading-relaxed mt-0.5">{badge.description}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
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
                  className="flex flex-col justify-between h-full min-h-[400px]"
                >
                  <div>
                    {/* Quiz title header */}
                    <div className="flex items-center justify-between border-b border-white/5 pb-4 mb-6">
                      <div>
                        <span className="text-[10px] font-bold font-mono tracking-widest text-saffron uppercase">
                          Interactive Challenge
                        </span>
                        <h3 className="text-xl font-bold text-white font-outfit mt-0.5">
                          {activeQuiz.title}
                        </h3>
                      </div>
                      <div className="flex gap-2">
                        {quizzes.map((q, idx) => (
                          <button
                            key={q.id}
                            onClick={() => {
                              setActiveQuizIndex(idx);
                              resetQuiz();
                            }}
                            className={`text-[9px] font-semibold uppercase tracking-wider px-2.5 py-1 rounded border transition ${
                              activeQuizIndex === idx
                                ? 'bg-gold/10 border-gold/40 text-gold'
                                : 'border-white/5 text-white/40 hover:text-white bg-white/5'
                            }`}
                          >
                            Quiz {idx + 1}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Question Card */}
                    <div className="mb-6">
                      <span className="text-[10px] text-gold font-bold uppercase tracking-wider font-mono">
                        Question {currentQuestionIdx + 1} of {activeQuiz.questions.length}
                      </span>
                      <h4 className="text-base md:text-lg font-bold text-white mt-1 leading-relaxed">
                        {currentQuestion.question}
                      </h4>
                    </div>

                    {/* Options list */}
                    <div className="space-y-2.5 mb-6">
                      {currentQuestion.options.map((opt, i) => {
                        const isSelected = selectedOption === i;
                        const isCorrectAnswer = i === currentQuestion.answer;
                        
                        return (
                          <button
                            key={i}
                            disabled={isAnswered}
                            onClick={() => handleOptionClick(i)}
                            className={`w-full p-4 rounded-xl text-xs md:text-sm text-left border flex items-center justify-between transition-all duration-300 ${
                              isAnswered
                                ? isCorrectAnswer
                                  ? 'border-emerald-500 bg-emerald-500/10 text-emerald-400 font-semibold'
                                  : isSelected
                                  ? 'border-red-500 bg-red-500/10 text-red-400 font-semibold'
                                  : 'border-white/5 bg-black/20 text-white/40'
                                : isSelected
                                ? 'border-gold bg-gold/15 text-white font-semibold'
                                : 'border-white/5 bg-white/5 hover:bg-white/10 text-white/80'
                            }`}
                          >
                            {opt}
                            {isAnswered && isCorrectAnswer && (
                              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                            )}
                            {isAnswered && isSelected && !isCorrectAnswer && (
                              <XCircle className="w-4 h-4 text-red-400" />
                            )}
                          </button>
                        );
                      })}
                    </div>

                    {/* Explanation */}
                    {isAnswered && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        className="p-4 rounded-xl bg-white/5 border border-white/5 text-xs text-white/60 leading-relaxed mb-6 font-inter"
                      >
                        <strong className="text-gold block mb-1 uppercase font-bold text-[10px]">
                          Morals & Wisdom Context
                        </strong>
                        {currentQuestion.explanation}
                      </motion.div>
                    )}
                  </div>

                  {/* Actions Footer */}
                  <div className="border-t border-white/5 pt-4 flex justify-between items-center">
                    <span className="text-[10px] text-white/40 uppercase font-semibold">
                      Answers Correct: {quizScore}
                    </span>

                    {!isAnswered ? (
                      <button
                        disabled={selectedOption === null}
                        onClick={handleCheckAnswer}
                        className="px-6 py-2.5 rounded-full bg-gradient-to-r from-gold to-saffron text-black text-xs font-semibold uppercase tracking-wider disabled:opacity-40 disabled:hover:opacity-10 transition duration-300 font-bold"
                      >
                        Submit Answer
                      </button>
                    ) : (
                      <button
                        onClick={handleNextQuestion}
                        className="px-6 py-2.5 rounded-full bg-white text-black text-xs font-semibold uppercase tracking-wider hover:bg-white/90 transition duration-300 flex items-center gap-1 font-bold"
                      >
                        Next <ChevronRight className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="quiz-finished"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex flex-col items-center justify-center text-center h-full min-h-[400px]"
                >
                  <Trophy className="w-16 h-16 text-gold mb-4 animate-bounce" />
                  <h3 className="text-2xl md:text-3xl font-extrabold font-outfit text-white mb-2">
                    Quiz Complete!
                  </h3>
                  <p className="text-sm text-white/60 max-w-sm mx-auto mb-6">
                    You got <strong>{quizScore}</strong> out of {activeQuiz.questions.length} questions correct. You have been rewarded with <strong>+50 XP</strong> bonus points!
                  </p>

                  <div className="flex gap-4">
                    <button
                      onClick={resetQuiz}
                      className="px-6 py-2.5 rounded-full border border-white/10 hover:border-gold/30 bg-white/5 hover:bg-white/10 text-xs font-semibold uppercase tracking-wider transition duration-300 flex items-center gap-2 text-white"
                    >
                      <RefreshCw className="w-4 h-4" /> Try Again
                    </button>
                    <a
                      href="#universe"
                      className="px-6 py-2.5 rounded-full bg-gradient-to-r from-gold to-saffron text-black text-xs font-semibold uppercase tracking-wider transition duration-300 font-bold"
                    >
                      Browse Pantheon
                    </a>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

          </div>

        </div>

      </div>
    </section>
  );
}
