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
    <div className="toolbar" style={{ padding: 0, background: 'transparent', border: 'none' }}>
      <button
        type="button"
        className="btn-secondary"
        aria-pressed={value === 'editor'}
        onClick={() => onChange('editor')}
      >
        Editor
      </button>
      <button
        type="button"
        className="btn-secondary"
        aria-pressed={value === 'tree'}
        onClick={() => onChange('tree')}
      >
        Tree
      </button>
    </div>
  );
}

export default ViewSwitcher;
