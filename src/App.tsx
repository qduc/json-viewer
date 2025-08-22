import { useState } from 'react';
import './App.css';
import { SplitPane } from './components/Layout/SplitPane';
import { ViewSwitcher } from './components/Layout/ViewSwitcher';
import StatusPill from './components/TopBar/StatusPill';
import { ValidationErrors } from './components/TopBar/ValidationError';
import Toolbar from './components/Toolbar/Toolbar';
import FormatMenu, { type FormatType } from './components/Toolbar/FormatMenu';
import { useValidation } from './hooks/useValidation';
import TreeView from './components/Tree/TreeView';

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

  // Parse JSON data for tree view
  let parsedData = null;
  try {
    if (validation.valid) {
      parsedData = JSON.parse(text);
    }
  } catch (e) {
    // Invalid JSON, parsedData stays null
  }

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
                </Toolbar>
                
                <div className="editor-pane">
                  <textarea
                    className="fallback-textarea"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    aria-label="JSON editor"
                  />
                </div>
                
                {/* Validation status and inline errors */}
                <div style={{ marginTop: 8, fontSize: 12, color: 'var(--text-secondary)' }}>
                  {validation.valid ? 'Valid JSON' : 'Invalid JSON'} • {validation.lineCount} lines
                </div>
                
                {/* Inline validation errors */}
                {!validation.valid && validation.errors.length > 0 && (
                  <ValidationErrors errors={validation.errors} className="editor-validation-errors" />
                )}
              </section>

              {/* Right: Output panel placeholder */}
              <section className="output-panel">
                <div className="panel-header">
                  <h3>Output (placeholder)</h3>
                </div>
                <div className="tree-empty-state">
                  <p>Output panels will appear here</p>
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
                <TreeView 
                  data={parsedData}
                  onNodeSelect={(node) => {
                    console.log('Selected node:', node);
                  }}
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
