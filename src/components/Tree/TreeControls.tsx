// React import not required with new JSX transform

interface TreeControlsProps {
  onExpandAll: () => void;
  onCollapseAll: () => void;
}

export default function TreeControls({ onExpandAll, onCollapseAll }: TreeControlsProps) {
  return (
    <div className="flex items-center gap-2" aria-label="Tree controls">
      <button
        className="px-3 py-1.5 border border-[var(--border-color)] rounded bg-[var(--bg-primary)] text-[var(--text-primary)] transition-all text-sm font-medium whitespace-nowrap hover:bg-[var(--bg-tertiary)] hover:-translate-y-px [box-shadow:var(--shadow)] hover:[box-shadow:var(--shadow)]"
        onClick={onExpandAll}
        title="Expand all"
      >
        Expand All
      </button>
      <button
        className="px-3 py-1.5 border border-[var(--border-color)] rounded bg-[var(--bg-primary)] text-[var(--text-primary)] transition-all text-sm font-medium whitespace-nowrap hover:bg-[var(--bg-tertiary)] hover:-translate-y-px [box-shadow:var(--shadow)] hover:[box-shadow:var(--shadow)]"
        onClick={onCollapseAll}
        title="Collapse all"
      >
        Collapse All
      </button>
    </div>
  );
}
