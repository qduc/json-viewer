export interface TreeNode {
  key: string;
  value: any;
  type: 'object' | 'array' | 'string' | 'number' | 'boolean' | 'null';
  path: string[];
  jsonPath: string;
  children?: TreeNode[];
  isExpanded?: boolean;
  isVisible?: boolean;
  matchesFilter?: boolean;
}

export function buildTree(data: any, path: string[] = []): TreeNode {
  const key = path.length === 0 ? 'root' : path[path.length - 1];
  const jsonPath = path.length === 0 ? '$' : '$.' + path.join('.');
  
  let type: TreeNode['type'];
  let children: TreeNode[] | undefined;

  if (data === null) {
    type = 'null';
  } else if (Array.isArray(data)) {
    type = 'array';
    children = data.map((item, index) => 
      buildTree(item, [...path, index.toString()])
    );
  } else if (typeof data === 'object') {
    type = 'object';
    children = Object.entries(data).map(([childKey, childValue]) => 
      buildTree(childValue, [...path, childKey])
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
    jsonPath,
    children,
    isExpanded: path.length < 2, // Auto-expand first two levels
    isVisible: true,
    matchesFilter: false
  };
}

export function filterTree(
  node: TreeNode, 
  searchText: string, 
  isRegex: boolean = false
): TreeNode {
  const cloned = { ...node };
  
  let matches = false;
  
  // Check if current node matches
  if (searchText) {
    let keyMatches = false;
    let valueMatches = false;
    
    if (isRegex) {
      try {
        const searchRegex = new RegExp(searchText, 'i');
        keyMatches = searchRegex.test(node.key);
        valueMatches = searchRegex.test(String(node.value));
      } catch {
        // Invalid regex, fall back to string search
        keyMatches = node.key.toLowerCase().includes(searchText.toLowerCase());
        valueMatches = String(node.value).toLowerCase().includes(searchText.toLowerCase());
      }
    } else {
      const searchLower = searchText.toLowerCase();
      keyMatches = node.key.toLowerCase().includes(searchLower);
      valueMatches = String(node.value).toLowerCase().includes(searchLower);
    }
    
    matches = keyMatches || valueMatches;
  }
  
  cloned.matchesFilter = matches;
  
  // Process children
  if (node.children) {
    const filteredChildren = node.children.map(child => filterTree(child, searchText, isRegex));
    const hasMatchingChild = filteredChildren.some(child => 
      child.matchesFilter || child.isVisible
    );
    
    cloned.children = filteredChildren;
    cloned.isVisible = matches || hasMatchingChild || !searchText;
  } else {
    cloned.isVisible = matches || !searchText;
  }
  
  return cloned;
}

export function expandAll(node: TreeNode): TreeNode {
  const cloned = { ...node };
  cloned.isExpanded = true;
  
  if (node.children) {
    cloned.children = node.children.map(expandAll);
  }
  
  return cloned;
}

export function collapseAll(node: TreeNode): TreeNode {
  const cloned = { ...node };
  cloned.isExpanded = false;
  
  if (node.children) {
    cloned.children = node.children.map(collapseAll);
  }
  
  return cloned;
}

export function expandToLevel(node: TreeNode, level: number, currentLevel: number = 0): TreeNode {
  const cloned = { ...node };
  cloned.isExpanded = currentLevel < level;
  
  if (node.children) {
    cloned.children = node.children.map(child => 
      expandToLevel(child, level, currentLevel + 1)
    );
  }
  
  return cloned;
}

export function getNodeSummary(node: TreeNode): string {
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
}

export function findMatches(node: TreeNode): TreeNode[] {
  const matches: TreeNode[] = [];
  
  if (node.matchesFilter) {
    matches.push(node);
  }
  
  if (node.children) {
    for (const child of node.children) {
      matches.push(...findMatches(child));
    }
  }
  
  return matches;
}