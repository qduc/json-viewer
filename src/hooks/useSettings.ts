import { useState, useEffect, useCallback } from 'react';
import { loadSettings, saveSettings, getEffectiveTheme } from '../utils/storage';
import type { AppSettings } from '../utils/storage';

export function useSettings() {
  const [settings, setSettings] = useState<AppSettings>(loadSettings);

  const updateSettings = useCallback((updates: Partial<AppSettings>) => {
    setSettings(prev => {
      const newSettings = { ...prev, ...updates };
      saveSettings(updates);
      return newSettings;
    });
  }, []);

  const effectiveTheme = getEffectiveTheme(settings.theme);

  useEffect(() => {
    // Apply theme to document
    document.documentElement.setAttribute('data-theme', effectiveTheme);
  }, [effectiveTheme]);

  useEffect(() => {
    // Listen for system theme changes
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = () => {
      if (settings.theme === 'system') {
        const newTheme = getEffectiveTheme('system');
        document.documentElement.setAttribute('data-theme', newTheme);
      }
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, [settings.theme]);

  return {
    settings,
    updateSettings,
    effectiveTheme
  };
}