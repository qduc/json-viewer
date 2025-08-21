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
    <div className={`search-bar ${isFocused ? 'focused' : ''}`}>
      <div className="search-input-container">
        <input
          ref={inputRef}
          type="text"
          placeholder="Search keys and values... (Ctrl/Cmd + F)"
          value={searchText}
          onChange={(e) => onSearchChange(e.target.value)}
          onKeyDown={handleKeyDown}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          className="search-input"
        />
        
        {searchText && (
          <button
            className="clear-button"
            onClick={handleClear}
            title="Clear search (Esc)"
          >
            ✕
          </button>
        )}
      </div>

      <div className="search-controls">
        <button
          className={`regex-toggle ${isRegex ? 'active' : ''}`}
          onClick={onRegexToggle}
          title="Use regular expressions"
        >
          .*
        </button>

        {searchText && (
          <>
            <div className="match-info">
              {matchCount > 0 ? (
                <span>{currentMatch + 1} of {matchCount}</span>
              ) : (
                <span>No matches</span>
              )}
            </div>

            <div className="navigation-buttons">
              <button
                onClick={onPrevMatch}
                disabled={matchCount === 0}
                title="Previous match (Shift + Enter)"
              >
                ↑
              </button>
              <button
                onClick={onNextMatch}
                disabled={matchCount === 0}
                title="Next match (Enter)"
              >
                ↓
              </button>
            </div>
          </>
        )}
      </div>

      {searchText && (
        <div className="search-help">
          <small>
            Press <kbd>Enter</kbd> for next, <kbd>Shift+Enter</kbd> for previous, <kbd>Esc</kbd> to clear
          </small>
        </div>
      )}
    </div>
  );
}