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
    <div className="tree-node">
      <div
        className={`tree-node-content ${node.matchesFilter ? 'highlighted' : ''}`}
        style={{ paddingLeft: indent }}
        onMouseEnter={() => setShowActions(true)}
        onMouseLeave={() => setShowActions(false)}
      >
        {hasChildren && (
          <button
            className="expand-button"
            onClick={() => onToggleExpand(node.path)}
            aria-label={node.isExpanded ? 'Collapse' : 'Expand'}
          >
            {node.isExpanded ? '▼' : '▶'}
          </button>
        )}

        <span className="type-icon" title={node.type}>
          {getTypeIcon()}
        </span>

        <span className="node-key">{node.key}:</span>
        <span className="node-summary" title={summary}>
          {summary}
        </span>

        {showActions && (
          <div className="node-actions">
            <button onClick={handleCopyValue} title="Copy value">📋</button>
            <button onClick={handleCopyKey} title="Copy key">🔑</button>
            <button onClick={handleCopyPath} title="Copy JSONPath">📍</button>
          </div>
        )}
      </div>

      {hasChildren && node.isExpanded && (
        <div className="tree-children">
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
      <div className="tree-view empty">
        <p>No valid JSON to display</p>
      </div>
    );
  }

  return (
    <div className="tree-view" role="tree">
      <div className="tree-header">
        <span className="node-count">{nodeCount} nodes</span>
      </div>
      <div className="tree-content">
        <TreeNodeComponent
          node={tree}
          onToggleExpand={onToggleExpand}
          level={0}
        />
      </div>
    </div>
  );
}