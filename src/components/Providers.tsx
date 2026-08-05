'use client';

import React, { createContext, useContext, useState, useEffect, useRef } from 'react';
import Lenis from 'lenis';

// Language Type
export type Language = 
  | 'English' 
  | 'Hindi' 
  | 'Sanskrit' 
  | 'Tamil' 
  | 'Kannada' 
  | 'Telugu' 
  | 'Bengali' 
  | 'Marathi' 
  | 'Gujarati';

// Context Interfaces
interface ThemeContextType {
  theme: 'dark' | 'light';
  toggleTheme: () => void;
}

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
}

interface KidsModeContextType {
  isKidsMode: boolean;
  toggleKidsMode: () => void;
}

interface UserContextType {
  xp: number;
  streak: number;
  completedKands: string[];
  addXp: (amount: number) => void;
  incrementStreak: () => void;
  completeKand: (kandId: string) => void;
  loadUserProgress: () => Promise<void>;
  username: string;
  updateUsername: (name: string) => Promise<void>;
  resetProgress: () => Promise<void>;
}

// Create Contexts
const ThemeContext = createContext<ThemeContextType | undefined>(undefined);
const LanguageContext = createContext<LanguageContextType | undefined>(undefined);
const KidsModeContext = createContext<KidsModeContextType | undefined>(undefined);
const UserContext = createContext<UserContextType | undefined>(undefined);

// Hooks for easy usage
export const useAppTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) throw new Error('useAppTheme must be used within ThemeProvider');
  return context;
};

export const useAppLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) throw new Error('useAppLanguage must be used within LanguageProvider');
  return context;
};

export const useKidsMode = () => {
  const context = useContext(KidsModeContext);
  if (!context) throw new Error('useKidsMode must be used within KidsModeProvider');
  return context;
};

export const useUserProgress = () => {
  const context = useContext(UserContext);
  if (!context) throw new Error('useUserProgress must be used within UserProvider');
  return context;
};

// Unified Providers Wrapper
export default function Providers({ children }: { children: React.ReactNode }) {
  // Theme State
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'light') {
      root.classList.add('light-theme');
    } else {
      root.classList.remove('light-theme');
    }
  }, [theme]);

  // Language State
  const [language, setLanguage] = useState<Language>('English');

  // Kids Mode State
  const [isKidsMode, setIsKidsMode] = useState<boolean>(false);
  const toggleKidsMode = () => setIsKidsMode((prev) => !prev);

  // User Dynamic State (syncs to local MySQL DB)
  const [xp, setXp] = useState<number>(0);
  const [streak, setStreak] = useState<number>(1);
  const [username, setUsername] = useState<string>('Arya');
  const [completedKands, setCompletedKands] = useState<string[]>([]);
  const deviceIdRef = useRef<string>('default-device');

  const loadUserProgress = async () => {
    try {
      const res = await fetch('/api/user', {
        headers: { 'x-device-id': deviceIdRef.current }
      });
      if (res.ok) {
        const data = await res.json();
        if (data.user) {
          setXp(data.user.xp);
          setStreak(data.user.streak);
          setUsername(data.user.username);
          setIsKidsMode(data.user.kidsMode);
          setLanguage(data.user.language as Language);
        }
      }
    } catch (e) {
      console.warn('Failed to load user from db, using client default', e);
    }
  };

  const addXp = async (amount: number) => {
    setXp((prev) => {
      const nextXp = prev + amount;
      // Sync with DB
      fetch('/api/user', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'x-device-id': deviceIdRef.current
        },
        body: JSON.stringify({ xp: nextXp }),
      }).catch(console.error);
      return nextXp;
    });
  };

  const incrementStreak = async () => {
    setStreak((prev) => {
      const nextStreak = prev + 1;
      fetch('/api/user', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'x-device-id': deviceIdRef.current
        },
        body: JSON.stringify({ streak: nextStreak }),
      }).catch(console.error);
      return nextStreak;
    });
  };

  const completeKand = (kandId: string) => {
    setCompletedKands((prev) => {
      if (prev.includes(kandId)) return prev;
      const next = [...prev, kandId];
      addXp(100); // Reward 100 XP for completing a Kand
      return next;
    });
  };

  const updateUsername = async (name: string) => {
    setUsername(name);
    try {
      await fetch('/api/user', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'x-device-id': deviceIdRef.current
        },
        body: JSON.stringify({ username: name }),
      });
    } catch (e) {
      console.error(e);
    }
  };

  const resetProgress = async () => {
    setXp(0);
    setStreak(1);
    try {
      await fetch('/api/user', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'x-device-id': deviceIdRef.current
        },
        body: JSON.stringify({ reset: true }),
      });
    } catch (e) {
      console.error('Reset failed', e);
    }
  };

  useEffect(() => {
    if (typeof window !== 'undefined') {
      let storedId = localStorage.getItem('ramayana_device_id');
      if (!storedId) {
        storedId = 'dev-' + Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
        localStorage.setItem('ramayana_device_id', storedId);
      }
      deviceIdRef.current = storedId;
    }
    loadUserProgress();
  }, []);

  // Initialize Lenis smooth scroll
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <LanguageContext.Provider value={{ language, setLanguage }}>
        <KidsModeContext.Provider value={{ isKidsMode, toggleKidsMode }}>
          <UserContext.Provider
            value={{
              xp,
              streak,
              completedKands,
              addXp,
              incrementStreak,
              completeKand,
              loadUserProgress,
              username,
              updateUsername,
              resetProgress,
            }}
          >
            {children}
          </UserContext.Provider>
        </KidsModeContext.Provider>
      </LanguageContext.Provider>
    </ThemeContext.Provider>
  );
}
