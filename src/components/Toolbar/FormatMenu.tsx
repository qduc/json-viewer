
import { useEffect, useRef } from 'react';

export type FormatType = '2-spaces' | '4-spaces' | 'tabs' | 'minify';

interface FormatMenuProps {
  value: FormatType;
  onChange: (format: FormatType) => void;
  onFormat: () => void;
}

const formatOptions = [
  { value: '2-spaces' as const, label: '2 Spaces' },
  { value: '4-spaces' as const, label: '4 Spaces' },
  { value: 'tabs' as const, label: 'Tabs' },
  { value: 'minify' as const, label: 'Minify' },
];

export function FormatMenu({ value, onChange, onFormat }: FormatMenuProps) {
  const selectedOption = formatOptions.find(option => option.value === value);
  const detailsRef = useRef<HTMLDetailsElement | null>(null);

  useEffect(() => {
    function handleDocumentClick(e: MouseEvent) {
      const details = detailsRef.current;
      if (!details || !details.open) return;
      const target = e.target as Node | null;
      if (target && !details.contains(target)) {
        details.open = false;
      }
    }

    function handleKeyDown(e: KeyboardEvent) {
      const details = detailsRef.current;
      if (!details || !details.open) return;
      if (e.key === 'Escape') details.open = false;
    }

    document.addEventListener('click', handleDocumentClick);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('click', handleDocumentClick);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return (
    <div className="toolbar-group">
      <details ref={detailsRef} className="dropdown">
        <summary className="dropdown-toggle" title="Format JSON">
          Format: {selectedOption?.label}
        </summary>
        <div className="dropdown-menu">
          {formatOptions.map((option) => (
            <button
              key={option.value}
              className="dropdown-item"
              onClick={() => {
                onChange(option.value);
                // Close the details dropdown explicitly
                if (detailsRef.current) detailsRef.current.open = false;
              }}
              aria-pressed={value === option.value}
            >
              {option.label}
              {value === option.value && ' ✓'}
            </button>
          ))}
        </div>
      </details>

      <button
        className="btn-primary"
        onClick={onFormat}
        title="Apply selected formatting"
      >
        Apply Format
      </button>
    </div>
  );
}

export default FormatMenu;