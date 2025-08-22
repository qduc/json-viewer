import { useState, useMemo, type MouseEvent } from 'react';

// TreeNode interface as specified in requirements
interface TreeNode {
  key: string;
  value: any;
  type: 'object' | 'array' | 'string' | 'number' | 'boolean' | 'null';
  path: string[];
  children?: TreeNode[];
  expanded?: boolean;
}

// TreeViewProps interface as specified in requirements
interface TreeViewProps {
  data: any;
  onNodeSelect?: (node: TreeNode) => void;
  searchTerm?: string;
}

interface TreeNodeComponentProps {
  node: TreeNode;
  onToggleExpand: (path: string[]) => void;
  onNodeSelect?: (node: TreeNode) => void;
  level: number;
  searchTerm?: string;
}

// Build tree from JSON data
function buildTreeFromData(data: any, path: string[] = [], key: string = 'root'): TreeNode {
  let type: TreeNode['type'];
  let children: TreeNode[] | undefined;

  if (data === null) {
    type = 'null';
  } else if (Array.isArray(data)) {
    type = 'array';
    children = data.map((item, index) => 
      buildTreeFromData(item, [...path, index.toString()], index.toString())
    );
  } else if (typeof data === 'object') {
    type = 'object';
    children = Object.entries(data).map(([childKey, childValue]) => 
      buildTreeFromData(childValue, [...path, childKey], childKey)
    );
  } else if (typeof data === 'string') {
    type = 'string';
  } else if (typeof data === 'number') {
    type = 'number';
  } else if (typeof data === 'boolean') {
    type = 'boolean';
  } else {
    type = 'string'; // fallback
  }

  return {
    key,
    value: data,
    type,
    path,
    children,
    expanded: path.length < 2 // Auto-expand first two levels
  };
}

// Toggle expansion state
function toggleNodeExpansion(node: TreeNode, targetPath: string[]): TreeNode {
  if (node.path.length === targetPath.length && 
      node.path.every((p, i) => p === targetPath[i])) {
    return { ...node, expanded: !node.expanded };
  }

  if (node.children) {
    return {
      ...node,
      children: node.children.map(child => toggleNodeExpansion(child, targetPath))
    };
  }

  return node;
}

// Check if node matches search term
function nodeMatchesSearch(node: TreeNode, searchTerm: string): boolean {
  if (!searchTerm) return true;
  
  const term = searchTerm.toLowerCase();
  const keyMatches = node.key.toLowerCase().includes(term);
  const valueMatches = String(node.value).toLowerCase().includes(term);
  
  return keyMatches || valueMatches;
}

// Check if node or any descendant matches search
function nodeOrDescendantMatches(node: TreeNode, searchTerm: string): boolean {
  if (nodeMatchesSearch(node, searchTerm)) return true;
  
  if (node.children) {
    return node.children.some(child => nodeOrDescendantMatches(child, searchTerm));
  }
  
  return false;
}

function TreeNodeComponent({ 
  node, 
  onToggleExpand, 
  onNodeSelect, 
  level, 
  searchTerm 
}: TreeNodeComponentProps) {
  const hasChildren = node.children && node.children.length > 0;
  const indent = level * 20;
  const isMatch = nodeMatchesSearch(node, searchTerm || '');
  const showNode = !searchTerm || nodeOrDescendantMatches(node, searchTerm);

  if (!showNode) {
    return null;
  }

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

  const getNodeSummary = () => {
    if (node.type === 'array') {
      return `Array(${node.children?.length || 0})`;
    } else if (node.type === 'object') {
      return `Object(${node.children?.length || 0})`;
    } else if (node.type === 'string') {
      const str = String(node.value);
      return str.length > 50 ? `"${str.substring(0, 47)}..."` : `"${str}"`;
    } else {
      return String(node.value);
    }
  };

  const handleNodeClick = () => {
    if (onNodeSelect) {
      onNodeSelect(node);
    }
  };

  const handleCopyValue = async (e: MouseEvent) => {
    e.stopPropagation();
    try {
      let text: string;
      if (node.type === 'object' || node.type === 'array') {
        text = JSON.stringify(node.value, null, 2);
      } else if (node.type === 'string') {
        text = String(node.value);
      } else {
        text = String(node.value);
      }
      await navigator.clipboard.writeText(text);
    } catch (err) {
      console.error('Failed to copy value:', err);
    }
  };

  return (
    <div>
      <div 
        className={`group flex items-center gap-2 px-2 py-1 text-sm leading-snug rounded transition-colors relative ${isMatch ? 'bg-[rgba(255,193,7,0.25)] text-[var(--text-primary)]' : 'hover:bg-[var(--bg-secondary)]'} focus-visible:outline focus-visible:outline-2 focus-visible:outline-[var(--accent-color)] focus-visible:outline-offset-[-2px] focus-visible:bg-[var(--bg-secondary)]`}
        style={{ paddingLeft: indent }}
        onClick={handleNodeClick}
        role="treeitem"
        tabIndex={0}
        aria-expanded={hasChildren ? node.expanded : undefined}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            if (hasChildren) {
              onToggleExpand(node.path);
            } else {
              handleNodeClick();
            }
          } else if (e.key === 'ArrowRight' && hasChildren && !node.expanded) {
            onToggleExpand(node.path);
          } else if (e.key === 'ArrowLeft' && hasChildren && node.expanded) {
            onToggleExpand(node.path);
          }
        }}
      >
        {hasChildren && (
          <button
            className="w-4 h-4 border-0 bg-transparent cursor-pointer flex items-center justify-center text-[0.75rem] text-[var(--text-secondary)] hover:text-[var(--accent-color)]"
            onClick={(e) => {
              e.stopPropagation();
              onToggleExpand(node.path);
            }}
            aria-label={node.expanded ? 'Collapse' : 'Expand'}
          >
            {node.expanded ? '▼' : '▶'}
          </button>
        )}
        
        <span className="w-5 h-4 flex items-center justify-center text-[0.75rem] font-bold bg-[var(--bg-tertiary)] rounded-[2px] text-[var(--text-secondary)]" title={node.type}>
          {getTypeIcon()}
        </span>
        
        <span className="font-semibold text-[var(--accent-color)]">{node.key}:</span>
        <span className="text-[var(--text-primary)] flex-1 overflow-hidden text-ellipsis whitespace-nowrap" title={getNodeSummary()}>
          {getNodeSummary()}
        </span>

        <div className="flex gap-1 opacity-0 transition-opacity group-hover:opacity-100" aria-label="Node actions">
          <button
            className="p-1 bg-transparent border-0 cursor-pointer rounded-[2px] text-[0.75rem] hover:bg-[var(--bg-tertiary)]"
            title="Copy value"
            aria-label="Copy value"
            onClick={handleCopyValue}
          >
            ⧉
          </button>
        </div>
      </div>
      
      {hasChildren && node.expanded && (
        <div>
          {node.children!.map((child, index) => (
            <TreeNodeComponent
              key={`${child.key}-${index}`}
              node={child}
              onToggleExpand={onToggleExpand}
              onNodeSelect={onNodeSelect}
              level={level + 1}
              searchTerm={searchTerm}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default function TreeView({ data, onNodeSelect, searchTerm }: TreeViewProps) {
  // Build tree from data
  const initialTree = useMemo(() => {
    if (!data) {
      return null;
    }
    try {
      return buildTreeFromData(data);
    } catch (error) {
      console.error('Error building tree:', error);
      return null;
    }
  }, [data]);

  // State for tree expansion
  const [tree, setTree] = useState<TreeNode | null>(initialTree);

  // Update tree when data changes
  useMemo(() => {
    setTree(initialTree);
  }, [initialTree]);

  const handleToggleExpand = (path: string[]) => {
    if (!tree) return;
    setTree(toggleNodeExpansion(tree, path));
  };

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
      <div className="flex-1 border border-[var(--border-color)] rounded overflow-auto bg-[var(--bg-primary)] min-h-0 h-full flex items-center justify-center text-[var(--text-secondary)]" role="status" aria-live="polite">
        <p className="m-0">No valid JSON to display</p>
      </div>
    );
  }

  return (
    <div className="flex-1 border border-[var(--border-color)] rounded overflow-auto bg-[var(--bg-primary)] min-h-0 h-full" role="tree" aria-label="JSON tree structure">
      <div className="px-4 py-2 bg-[var(--bg-secondary)] border-b border-[var(--border-color)] text-sm text-[var(--text-secondary)]">
        <span aria-live="polite">{nodeCount} nodes</span>
      </div>
      <div className="p-2">
        <TreeNodeComponent
          node={tree}
          onToggleExpand={handleToggleExpand}
          onNodeSelect={onNodeSelect}
          level={0}
          searchTerm={searchTerm}
        />
      </div>
    </div>
  );
}

export type { TreeNode, TreeViewProps };
