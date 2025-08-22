// React import not required with new JSX transform

interface TreeControlsProps {
  onExpandAll: () => void;
  onCollapseAll: () => void;
}

export default function TreeControls({ onExpandAll, onCollapseAll }: TreeControlsProps) {
  return (
    <div className="tree-controls" aria-label="Tree controls">
      <button className="btn" onClick={onExpandAll} title="Expand all">Expand All</button>
      <button className="btn" onClick={onCollapseAll} title="Collapse all" style={{ marginLeft: 8 }}>Collapse All</button>
    </div>
  );
}

