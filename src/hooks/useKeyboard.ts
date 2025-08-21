import { useState, useEffect } from 'react';

export function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}

export function useKeyboardShortcuts(shortcuts: Record<string, () => void>) {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const isMac = navigator.platform.toUpperCase().indexOf('MAC') >= 0;
      const modifier = isMac ? event.metaKey : event.ctrlKey;
      
      if (!modifier) return;

      const key = event.key.toLowerCase();
      const shift = event.shiftKey;
      
      let shortcutKey = '';
      
      if (key === 'enter') {
        shortcutKey = 'validate';
      } else if (key === 'b' && shift) {
        shortcutKey = 'beautify';
      } else if (key === 'm' && shift) {
        shortcutKey = 'minify';
      } else if (key === 'k' && shift) {
        shortcutKey = 'expandAll';
      } else if (key === 'k' && !shift) {
        shortcutKey = 'collapseAll';
      } else if (key === 'f') {
        shortcutKey = 'focusFilter';
      }
      
      if (shortcutKey && shortcuts[shortcutKey]) {
        event.preventDefault();
        shortcuts[shortcutKey]();
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && shortcuts.clearFilter) {
        shortcuts.clearFilter();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('keydown', handleEscape);
    
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('keydown', handleEscape);
    };
  }, [shortcuts]);
}