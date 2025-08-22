// React import not required with new JSX transform

interface SimpleSearchProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export default function SimpleSearch({ value, onChange, placeholder }: SimpleSearchProps) {
  return (
    <div className="simple-search" style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
      <input
        type="text"
        className="input"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder || 'Search keys and values...'}
        aria-label="Search in tree"
        style={{ flex: 1, minWidth: 0 }}
      />
      {value && (
        <button
          className="btn"
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
