import { useState, useRef, useEffect } from 'react';

interface SearchBarProps {
  searchText: string;
  onSearchChange: (text: string) => void;
  isRegex: boolean;
  onRegexToggle: () => void;
  matchCount: number;
  currentMatch: number;
  onNextMatch: () => void;
  onPrevMatch: () => void;
  onClear: () => void;
  onFocus?: () => void;
}

export default function SearchBar({
  searchText,
  onSearchChange,
  isRegex,
  onRegexToggle,
  matchCount,
  currentMatch,
  onNextMatch,
  onPrevMatch,
  onClear,
  onFocus
}: SearchBarProps) {
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (onFocus) {
      const handleKeyDown = (e: KeyboardEvent) => {
        const isMac = navigator.platform.toUpperCase().indexOf('MAC') >= 0;
        const modifier = isMac ? e.metaKey : e.ctrlKey;
        
        if (modifier && e.key.toLowerCase() === 'f') {
          e.preventDefault();
          inputRef.current?.focus();
          onFocus();
        }
      };

      document.addEventListener('keydown', handleKeyDown);
      return () => document.removeEventListener('keydown', handleKeyDown);
    }
  }, [onFocus]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      if (e.shiftKey) {
        onPrevMatch();
      } else {
        onNextMatch();
      }
    } else if (e.key === 'Escape') {
      onClear();
      inputRef.current?.blur();
    }
  };

  const handleClear = () => {
    onClear();
    inputRef.current?.focus();
  };

  return (
    <div className={`flex flex-col gap-2 p-2 bg-bg-secondary border border-border-color rounded ${isFocused ? '[box-shadow:var(--shadow)]' : ''}`}>
      <div className="relative flex items-center">
        <input
          ref={inputRef}
          type="text"
          placeholder="Search keys and values... (Ctrl/Cmd + F)"
          value={searchText}
          onChange={(e) => onSearchChange(e.target.value)}
          onKeyDown={handleKeyDown}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          className="flex-1 p-2 border border-border-color rounded bg-bg-primary text-text-primary text-sm focus:outline-none focus:border-[var(--accent-color)]"
        />
        
        {searchText && (
          <button
            className="absolute right-2 bg-transparent border-0 text-text-secondary cursor-pointer p-1"
            onClick={handleClear}
            title="Clear search (Esc)"
          >
            ✕
          </button>
        )}
      </div>

      <div className="flex items-center gap-2">
        <button
          className={`px-2 py-1 border border-border-color rounded bg-bg-primary text-text-secondary font-mono text-xs cursor-pointer ${isRegex ? 'bg-[var(--accent-color)] text-white border-[var(--accent-color)]' : ''}`}
          onClick={onRegexToggle}
          title="Use regular expressions"
        >
          .*
        </button>

        {searchText && (
          <>
            <div className="text-xs text-text-secondary">
              {matchCount > 0 ? (
                <span>{currentMatch + 1} of {matchCount}</span>
              ) : (
                <span>No matches</span>
              )}
            </div>

            <div className="flex">
              <button
                onClick={onPrevMatch}
                disabled={matchCount === 0}
                title="Previous match (Shift + Enter)"
                className="px-2 py-1 border border-border-color bg-bg-primary text-text-primary text-xs rounded-l disabled:opacity-50 disabled:cursor-not-allowed"
              >
                ↑
              </button>
              <button
                onClick={onNextMatch}
                disabled={matchCount === 0}
                title="Next match (Enter)"
                className="px-2 py-1 border border-border-color bg-bg-primary text-text-primary text-xs rounded-r -ml-px disabled:opacity-50 disabled:cursor-not-allowed"
              >
                ↓
              </button>
            </div>
          </>
        )}
      </div>

      {searchText && (
        <div className="text-xs text-text-secondary">
          <small>
            Press <kbd className="bg-bg-tertiary px-1 rounded-[2px]">Enter</kbd> for next, <kbd className="bg-bg-tertiary px-1 rounded-[2px]">Shift+Enter</kbd> for previous, <kbd className="bg-bg-tertiary px-1 rounded-[2px]">Esc</kbd> to clear
          </small>
        </div>
      )}
    </div>
  );
}