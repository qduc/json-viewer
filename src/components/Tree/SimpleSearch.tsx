// React import not required with new JSX transform

interface SimpleSearchProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export default function SimpleSearch({ value, onChange, placeholder }: SimpleSearchProps) {
  return (
    <div className="flex items-center gap-2">
      <input
        type="text"
        className="flex-1 min-w-0 p-2 border border-[var(--border-color)] rounded bg-[var(--bg-primary)] text-[var(--text-primary)] text-sm focus:outline-none focus:border-[var(--accent-color)] placeholder:text-[var(--text-secondary)]"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder || 'Search keys and values...'}
        aria-label="Search in tree"
      />
      {value && (
        <button
          className="px-3 py-1.5 border border-[var(--border-color)] rounded bg-[var(--bg-primary)] text-[var(--text-primary)] transition-all text-sm font-medium hover:bg-[var(--bg-tertiary)] hover:-translate-y-px [box-shadow:var(--shadow)] hover:[box-shadow:var(--shadow)]"
          onClick={() => onChange('')}
          aria-label="Clear search"
          title="Clear search"
        >
          ✕
        </button>
      )}
    </div>
  );
}
