
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
    <div className="flex items-center gap-3">
      <details ref={detailsRef} className="relative group">
        <summary className="bg-[var(--bg-primary)] border border-[var(--border-color)] rounded px-4 py-2 text-sm cursor-pointer relative transition-all hover:bg-[var(--bg-tertiary)] group-open:bg-[var(--bg-tertiary)] group-open:rounded-b-none" title="Format JSON">
          Format: {selectedOption?.label}
          <span className="ml-2 text-xs opacity-70" aria-hidden="true">▾</span>
        </summary>
        <div className="absolute top-full left-0 right-0 bg-[var(--bg-primary)] border border-[var(--border-color)] border-t-0 rounded-b shadow [z-index:1000] min-w-[160px]">
          {formatOptions.map((option) => (
            <button
              key={option.value}
              className="block w-full px-4 py-3 text-left text-sm transition hover:bg-[var(--bg-secondary)] first:border-t first:border-[var(--border-color)] aria-pressed:true:bg-[var(--bg-tertiary)] aria-pressed:true:shadow-[inset_2px_0_0_0_var(--accent-color)]"
              onClick={() => {
                onChange(option.value);
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
        className="px-4 py-2 border border-[var(--accent-color)] rounded bg-[var(--accent-color)] text-white font-semibold transition-all hover:opacity-90 hover:-translate-y-px [box-shadow:var(--shadow)] hover:[box-shadow:var(--shadow)]"
        onClick={onFormat}
        title="Apply selected formatting"
      >
        Apply Format
      </button>
    </div>
  );
}

export default FormatMenu;
