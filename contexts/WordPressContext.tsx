"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';
import { WordPressSettings } from '../types';

interface WordPressContextType {
  settings: WordPressSettings;
  updateSettings: (settings: WordPressSettings) => void;
  isLoaded: boolean;
}

const WordPressContext = createContext<WordPressContextType | undefined>(undefined);

export const WordPressProvider = ({ children }: { children: React.ReactNode }) => {
  const [settings, setSettings] = useState<WordPressSettings>({
    siteUrl: '',
    username: '',
    appPassword: '',
    isConnected: false
  });
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('wp_settings');
    if (saved) {
      try {
        setSettings(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to parse settings", e);
      }
    }
    setIsLoaded(true);
  }, []);

  const updateSettings = (newSettings: WordPressSettings) => {
    setSettings(newSettings);
    localStorage.setItem('wp_settings', JSON.stringify(newSettings));
  };

  return (
    <WordPressContext.Provider value={{ settings, updateSettings, isLoaded }}>
      {children}
    </WordPressContext.Provider>
  );
};

export const useWordPress = () => {
  const context = useContext(WordPressContext);
  if (!context) throw new Error('useWordPress must be used within WordPressProvider');
  return context;
};