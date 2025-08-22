type ViewMode = 'editor' | 'tree';

interface ViewSwitcherProps {
  value: ViewMode;
  onChange: (mode: ViewMode) => void;
}

/**
 * Simple Editor | Tree toggle.
 * Scope: UI control only (no layout wiring in this task).
 */
export function ViewSwitcher({ value, onChange }: ViewSwitcherProps) {
  return (
    <div className="flex items-center gap-1">
      <button
        type="button"
        className={`px-3 py-1.5 text-sm font-medium transition-all duration-200 border rounded ${
          value === 'editor'
            ? 'bg-bg-tertiary border-accent-color shadow-[inset_0_0_0_1px_var(--accent-color)] text-text-primary'
            : 'bg-bg-primary border-border-color text-text-primary hover:bg-bg-tertiary hover:-translate-y-px hover:shadow-shadow'
        }`}
        aria-pressed={value === 'editor'}
        onClick={() => onChange('editor')}
      >
        Editor
      </button>
      <button
        type="button"
        className={`px-3 py-1.5 text-sm font-medium transition-all duration-200 border rounded ${
          value === 'tree'
            ? 'bg-bg-tertiary border-accent-color shadow-[inset_0_0_0_1px_var(--accent-color)] text-text-primary'
            : 'bg-bg-primary border-border-color text-text-primary hover:bg-bg-tertiary hover:-translate-y-px hover:shadow-shadow'
        }`}
        aria-pressed={value === 'tree'}
        onClick={() => onChange('tree')}
      >
        Tree
      </button>
    </div>
  );
}

export default ViewSwitcher;
