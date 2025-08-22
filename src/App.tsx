import { useEffect, useMemo, useState } from 'react';
import './App.css';
import { SplitPane } from './components/Layout/SplitPane';
import EditorPane from './components/EditorPane';
import { ViewSwitcher } from './components/Layout/ViewSwitcher';
import StatusPill from './components/TopBar/StatusPill';
import { ValidationErrors } from './components/TopBar/ValidationError';
import Toolbar from './components/Toolbar/Toolbar';
import FormatMenu, { type FormatType } from './components/Toolbar/FormatMenu';
import CopyButton from './components/Toolbar/CopyButton';
import DownloadButton from './components/Toolbar/DownloadButton';
import { useValidation } from './hooks/useValidation';
import TreeView from './components/TreeView';
import TreeControls from './components/Tree/TreeControls';
import SimpleSearch from './components/Tree/SimpleSearch';
import { buildTree, expandAll, collapseAll, filterTree, type TreeNode } from './utils/tree';
import OutputTabs from './components/OutputTabs';
import ThemeToggle from './components/ThemeToggle';
import { useSettings } from './hooks/useSettings';

type ViewMode = 'editor' | 'tree';


function App() {
  // View mode (controlled by ViewSwitcher)
  const [viewMode, setViewMode] = useState<ViewMode>('editor');

  // Minimal editor state for skeleton
  const [text, setText] = useState<string>(
    '{\n  "hello": "world",\n  "array": [1, 2, 3]\n}'
  );

  // Format options state
  const [formatType, setFormatType] = useState<FormatType>('2-spaces');

  // Use validation hook
  const validation = useValidation(text);

  // App-wide settings (theme, etc.)
  const { settings, updateSettings, effectiveTheme } = useSettings();

  // Tree state derived from editor text
  const [tree, setTree] = useState<TreeNode | null>(null);

  // Simple search text for tree filtering
  const [searchText, setSearchText] = useState<string>('');

  // Build tree whenever valid JSON changes
  useEffect(() => {
    try {
      if (validation.valid) {
        const parsed = JSON.parse(text);
        setTree(buildTree(parsed));
      } else {
        setTree(null);
      }
    } catch {
      setTree(null);
    }
  }, [text, validation.valid]);

  const toggleExpandAtPath = (root: TreeNode, path: string[], idx: number = 0): TreeNode => {
    const clone: TreeNode = { ...root };
    if (idx >= path.length) {
      clone.isExpanded = !clone.isExpanded;
      return clone;
    }
    if (!clone.children) return clone;
    const segment = path[idx];
    clone.children = clone.children.map((child) =>
      child.path[idx] === segment ? toggleExpandAtPath(child, path, idx + 1) : child
    );
    return clone;
  };

  const handleToggleExpand = (path: string[]) => {
    if (!tree) return;
    setTree(toggleExpandAtPath(tree, path));
  };

  const handleExpandAll = () => {
    if (!tree) return;
    setTree(expandAll(tree));
  };

  const handleCollapseAll = () => {
    if (!tree) return;
    setTree(collapseAll(tree));
  };

  // Derive filtered tree according to search text (simple contains)
  const filteredTree: TreeNode | null = ((): TreeNode | null => {
    if (!tree) return null;
    if (!searchText) return tree;
    return filterTree(tree, searchText);
  })();

  // Format JSON based on selected format type
  const handleFormat = () => {
    try {
      const parsed = JSON.parse(text);
      let formatted: string;

      switch (formatType) {
        case '2-spaces':
          formatted = JSON.stringify(parsed, null, 2);
          break;
        case '4-spaces':
          formatted = JSON.stringify(parsed, null, 4);
          break;
        case 'tabs':
          formatted = JSON.stringify(parsed, null, '\t');
          break;
        case 'minify':
          formatted = JSON.stringify(parsed);
          break;
        default:
          formatted = JSON.stringify(parsed, null, 2);
      }

      setText(formatted);
    } catch (e) {
      // If JSON is invalid, don't format (validation will show the error)
      console.error('Cannot format invalid JSON:', e);
    }
  };

  const formattedForCopy = useMemo(() => {
    if (!validation.valid) return '';
    try {
      const parsed = JSON.parse(text);
      switch (formatType) {
        case '2-spaces':
          return JSON.stringify(parsed, null, 2);
        case '4-spaces':
          return JSON.stringify(parsed, null, 4);
        case 'tabs':
          return JSON.stringify(parsed, null, '\t');
        case 'minify':
          return JSON.stringify(parsed);
        default:
          return JSON.stringify(parsed, null, 2);
      }
    } catch {
      return '';
    }
  }, [text, formatType, validation.valid]);

  const copyDisabled = !validation.valid || text.trim().length === 0;

  return (
    <div className="app">
      <header className="app-header">
        <h1>🧩 JSON Viewer</h1>
        {/* ViewSwitcher (Task 3) */}
        <div className="toolbar-section" aria-label="View switcher">
          <span style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>View:</span>
          <ViewSwitcher value={viewMode} onChange={setViewMode} />
        </div>

        {/* Status indicator (Task 4) */}
        <div className="toolbar-section" aria-label="Validation status">
          <StatusPill validation={validation.result} />
        </div>

        {/* Theme toggle */}
        <div className="toolbar-section" aria-label="Theme toggle">
          <ThemeToggle
            theme={settings.theme}
            onThemeChange={(t) => updateSettings({ theme: t })}
            effectiveTheme={effectiveTheme}
          />
        </div>
      </header>

      <main className="app-main">
        <div style={{ padding: '0.75rem', height: '100%' }}>
          {viewMode === 'editor' ? (
            /* Editor View */
            <SplitPane>
              {/* Left: Editor */}
              <section className="editor-panel">
                <h3>Editor</h3>

                {/* Basic Toolbar container (Task 5) */}
                <Toolbar>
                  <FormatMenu
                    value={formatType}
                    onChange={setFormatType}
                    onFormat={handleFormat}
                  />
                  <CopyButton value={formattedForCopy} disabled={copyDisabled} />
                  <DownloadButton value={formattedForCopy} disabled={copyDisabled} />
                </Toolbar>

                <EditorPane
                  value={text}
                  onChange={setText}
                  validation={validation.result}
                  theme={effectiveTheme}
                  fontSize={14}
                />

                {/* Validation status and inline errors */}
                <div style={{ marginTop: 8, fontSize: 12, color: 'var(--text-secondary)' }}>
                  {validation.valid ? 'Valid JSON' : 'Invalid JSON'} • {validation.lineCount} lines
                </div>

                {/* Inline validation errors */}
                {!validation.valid && validation.errors.length > 0 && (
                  <ValidationErrors errors={validation.errors} className="editor-validation-errors" />
                )}
              </section>

              {/* Right: Output panel */}
              <section className="output-panel">
                <div className="panel-header">
                  <h3>Output</h3>
                </div>
                <div className="output-tabs-container">
                  <OutputTabs inputText={text} indentSize={formatType === 'tabs' ? '\t' : formatType === '4-spaces' ? 4 : 2} />
                </div>
              </section>
            </SplitPane>
          ) : (
            /* Tree View */
            <section className="tree-container">
              <div className="panel-header">
                <h3>Tree View</h3>
              </div>
              <div className="tree-content-wrapper">
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
                  <TreeControls onExpandAll={handleExpandAll} onCollapseAll={handleCollapseAll} />
                  <div style={{ flex: 1 }}>
                    <SimpleSearch value={searchText} onChange={setSearchText} />
                  </div>
                </div>
                <TreeView
                  tree={filteredTree}
                  onToggleExpand={handleToggleExpand}
                />
              </div>
            </section>
          )}
        </div>
      </main>
    </div>
  );
}

export default App;
