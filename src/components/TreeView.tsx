import { useState, useMemo } from 'react';
import type { TreeNode } from '../utils/tree';
import { getNodeSummary } from '../utils/tree';
import { copyToClipboard } from '../utils/storage';

interface TreeViewProps {
  tree: TreeNode | null;
  onToggleExpand: (path: string[]) => void;
}

interface TreeNodeProps {
  node: TreeNode;
  onToggleExpand: (path: string[]) => void;
  level: number;
}

function TreeNodeComponent({ node, onToggleExpand, level }: TreeNodeProps) {
  const [showActions, setShowActions] = useState(false);

  if (!node.isVisible) {
    return null;
  }

  const hasChildren = node.children && node.children.length > 0;
  const summary = getNodeSummary(node);
  const indent = level * 20;

  const handleCopyValue = async () => {
    await copyToClipboard(JSON.stringify(node.value));
  };

  const handleCopyKey = async () => {
    await copyToClipboard(node.key);
  };

  const handleCopyPath = async () => {
    await copyToClipboard(node.jsonPath);
  };

  const getTypeIcon = () => {
    switch (node.type) {
      case 'object': return '{}';
      case 'array': return '[]';
      case 'string': return '"';
      case 'number': return '#';
      case 'boolean': return 'T/F';
      case 'null': return '∅';
      default: return '?';
    }
  };

  return (
    <div>
      <div
        className={`group flex items-center gap-2 px-2 py-1 text-sm leading-snug rounded transition-colors relative ${node.matchesFilter ? 'bg-[rgba(255,193,7,0.25)] text-[var(--text-primary)]' : 'hover:bg-[var(--bg-secondary)]'} focus-visible:outline focus-visible:outline-2 focus-visible:outline-[var(--accent-color)] focus-visible:outline-offset-[-2px] focus-visible:bg-[var(--bg-secondary)]`}
        style={{ paddingLeft: indent }}
        onMouseEnter={() => setShowActions(true)}
        onMouseLeave={() => setShowActions(false)}
      >
        {hasChildren && (
          <button
            className="w-4 h-4 border-0 bg-transparent cursor-pointer flex items-center justify-center text-[0.75rem] text-[var(--text-secondary)] hover:text-[var(--accent-color)]"
            onClick={() => onToggleExpand(node.path)}
            aria-label={node.isExpanded ? 'Collapse' : 'Expand'}
          >
            {node.isExpanded ? '▼' : '▶'}
          </button>
        )}

        <span className="w-5 h-4 flex items-center justify-center text-[0.75rem] font-bold bg-[var(--bg-tertiary)] rounded-[2px] text-[var(--text-secondary)]" title={node.type}>
          {getTypeIcon()}
        </span>

        <span className="font-semibold text-[var(--accent-color)]">{node.key}:</span>
        <span className="text-[var(--text-primary)] flex-1 overflow-hidden text-ellipsis whitespace-nowrap" title={summary}>
          {summary}
        </span>

        {showActions && (
          <div className="flex gap-1">
            <button className="p-1 bg-transparent border-0 cursor-pointer rounded-[2px] text-[0.75rem] hover:bg-[var(--bg-tertiary)]" onClick={handleCopyValue} title="Copy value">📋</button>
            <button className="p-1 bg-transparent border-0 cursor-pointer rounded-[2px] text-[0.75rem] hover:bg-[var(--bg-tertiary)]" onClick={handleCopyKey} title="Copy key">🔑</button>
            <button className="p-1 bg-transparent border-0 cursor-pointer rounded-[2px] text-[0.75rem] hover:bg-[var(--bg-tertiary)]" onClick={handleCopyPath} title="Copy JSONPath">📍</button>
          </div>
        )}
      </div>

      {hasChildren && node.isExpanded && (
        <div>
          {node.children!.map((child, index) => (
            <TreeNodeComponent
              key={`${child.key}-${index}`}
              node={child}
              onToggleExpand={onToggleExpand}
              level={level + 1}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default function TreeView({ tree, onToggleExpand }: TreeViewProps) {
  const nodeCount = useMemo(() => {
    if (!tree) return 0;
    const count = (node: TreeNode): number => {
      let total = 1;
      if (node.children) {
        total += node.children.reduce((sum, child) => sum + count(child), 0);
      }
      return total;
    };
    return count(tree);
  }, [tree]);

  if (!tree) {
    return (
      <div className="flex-1 border border-[var(--border-color)] rounded overflow-auto bg-[var(--bg-primary)] min-h-0 h-full flex items-center justify-center text-[var(--text-secondary)]">
        <p className="m-0">No valid JSON to display</p>
      </div>
    );
  }

  return (
    <div className="flex-1 border border-[var(--border-color)] rounded overflow-auto bg-[var(--bg-primary)] min-h-0 h-full" role="tree">
      <div className="px-4 py-2 bg-[var(--bg-secondary)] border-b border-[var(--border-color)] text-sm text-[var(--text-secondary)]">
        <span>{nodeCount} nodes</span>
      </div>
      <div className="p-2">
        <TreeNodeComponent
          node={tree}
          onToggleExpand={onToggleExpand}
          level={0}
        />
      </div>
    </div>
  );
}
