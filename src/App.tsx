import { useState, useEffect, useRef, useMemo } from 'react';
import { PanelGroup, Panel, PanelResizeHandle } from 'react-resizable-panels';
import EditorPane from './components/EditorPane';
import TreeView from './components/TreeView';
import OutputTabs from './components/OutputTabs';
import Toolbar from './components/Toolbar';
import SearchBar from './components/SearchBar';
import ThemeToggle from './components/ThemeToggle';
import { useSettings } from './hooks/useSettings';
import { useDebounce, useKeyboardShortcuts } from './hooks/useKeyboard';
import { validateJson, beautifyJson, minifyJson, escapeJsonString, unescapeJsonString } from './utils/json';
import { buildTree, filterTree, expandAll, collapseAll, expandToLevel, findMatches } from './utils/tree';
import { readFileAsText } from './utils/download';
import JsonWorker from './workers/jsonWorker';
import './App.css';

function App() {
  const { settings, updateSettings, effectiveTheme } = useSettings();
  const [inputText, setInputText] = useState(settings.lastInput || '{"hello": "world", "array": [1, 2, 3], "nested": {"key": "value"}}');
  const [searchText, setSearchText] = useState('');
  const [isRegex, setIsRegex] = useState(false);
  const [currentMatchIndex, setCurrentMatchIndex] = useState(0);
  
  const debouncedInput = useDebounce(inputText, 300);
  const debouncedSearch = useDebounce(searchText, 200);
  
  const workerRef = useRef<JsonWorker | null>(null);
  const searchBarRef = useRef<HTMLDivElement>(null);
  
  // Initialize worker
  useEffect(() => {
    workerRef.current = new JsonWorker();
    return () => {
      workerRef.current?.destroy();
    };
  }, []);

  // Validate JSON
  const validation = useMemo(() => {
    return validateJson(debouncedInput);
  }, [debouncedInput]);

  // Build tree from validated JSON
  const tree = useMemo(() => {
    if (validation.isValid && validation.parsed !== undefined) {
      return buildTree(validation.parsed);
    }
    return null;
  }, [validation]);

  // Filter tree based on search
  const filteredTree = useMemo(() => {
    if (!tree) return null;
    return filterTree(tree, debouncedSearch, isRegex);
  }, [tree, debouncedSearch, isRegex]);

  // Find matches for navigation
  const matches = useMemo(() => {
    if (!filteredTree || !debouncedSearch) return [];
    return findMatches(filteredTree);
  }, [filteredTree, debouncedSearch]);

  // Save input to localStorage (debounced)
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      updateSettings({ lastInput: inputText });
    }, 1000); // Save after 1 second of no changes

    return () => clearTimeout(timeoutId);
  }, [inputText]); // Remove updateSettings dependency to avoid infinite loop

  // Keyboard shortcuts
  useKeyboardShortcuts({
    validate: () => validateJson(inputText),
    beautify: () => handleBeautify(),
    minify: () => handleMinify(),
    expandAll: () => handleExpandAll(),
    collapseAll: () => handleCollapseAll(),
    focusFilter: () => searchBarRef.current?.querySelector('input')?.focus(),
    clearFilter: () => setSearchText('')
  });

  const handleInputChange = (value: string) => {
    setInputText(value);
  };

  const handleBeautify = () => {
    const beautified = beautifyJson(inputText, settings.indentSize);
    setInputText(beautified);
  };

  const handleMinify = () => {
    const minified = minifyJson(inputText);
    setInputText(minified);
  };

  const handleEscape = () => {
    const escaped = escapeJsonString(inputText);
    setInputText(escaped);
  };

  const handleUnescape = () => {
    const result = unescapeJsonString(inputText);
    if (result.result) {
      setInputText(result.result);
    }
  };

  const handleFileUpload = async (file: File) => {
    try {
      const content = await readFileAsText(file);
      setInputText(content);
    } catch (error) {
      console.error('Failed to read file:', error);
    }
  };

  const [treeState, setTreeState] = useState(filteredTree);

  useEffect(() => {
    setTreeState(filteredTree);
  }, [filteredTree]);

  const handleToggleExpand = (path: string[]) => {
    if (!treeState) return;
    
    const updateNode = (node: any): any => {
      if (JSON.stringify(node.path) === JSON.stringify(path)) {
        return { ...node, isExpanded: !node.isExpanded };
      }
      if (node.children) {
        return {
          ...node,
          children: node.children.map(updateNode)
        };
      }
      return node;
    };
    
    setTreeState(updateNode(treeState));
  };

  const handleExpandAll = () => {
    if (treeState) {
      setTreeState(expandAll(treeState));
    }
  };

  const handleCollapseAll = () => {
    if (treeState) {
      setTreeState(collapseAll(treeState));
    }
  };

  const handleExpandToLevel = (level: number) => {
    if (treeState) {
      setTreeState(expandToLevel(treeState, level));
    }
  };

  const handleNextMatch = () => {
    if (matches.length > 0) {
      setCurrentMatchIndex((prev) => (prev + 1) % matches.length);
    }
  };

  const handlePrevMatch = () => {
    if (matches.length > 0) {
      setCurrentMatchIndex((prev) => (prev - 1 + matches.length) % matches.length);
    }
  };

  return (
    <div className="app" data-theme={effectiveTheme}>
      <header className="app-header">
        <h1>🧩 JSON Formatter & Explorer</h1>
        <ThemeToggle
          theme={settings.theme}
          onThemeChange={(theme) => updateSettings({ theme })}
          effectiveTheme={effectiveTheme}
        />
      </header>

      <main className="app-main">
        <Toolbar
          validation={validation}
          onValidate={() => validateJson(inputText)}
          onBeautify={handleBeautify}
          onMinify={handleMinify}
          onExpandAll={handleExpandAll}
          onCollapseAll={handleCollapseAll}
          onExpandToLevel={handleExpandToLevel}
          onEscape={handleEscape}
          onUnescape={handleUnescape}
          onFileUpload={handleFileUpload}
          indentSize={settings.indentSize}
          onIndentSizeChange={(indentSize) => updateSettings({ indentSize })}
        />

        <PanelGroup direction="horizontal" className="panel-group">
          <Panel defaultSize={50} minSize={30}>
            <div className="editor-panel">
              <h3>Editor</h3>
              <EditorPane
                value={inputText}
                onChange={handleInputChange}
                validation={validation}
                theme={effectiveTheme}
                fontSize={settings.editorFontSize}
              />
            </div>
          </Panel>
          
          <PanelResizeHandle className="panel-handle" />
          
          <Panel defaultSize={50} minSize={30}>
            <div className="output-panel">
              <div className="output-tabs-container">
                <h3>Output</h3>
                <OutputTabs 
                  inputText={inputText}
                  indentSize={settings.indentSize}
                />
              </div>
              
              <div className="tree-container">
                <div className="tree-header">
                  <h3>Tree View</h3>
                  <div ref={searchBarRef}>
                    <SearchBar
                      searchText={searchText}
                      onSearchChange={setSearchText}
                      isRegex={isRegex}
                      onRegexToggle={() => setIsRegex(!isRegex)}
                      matchCount={matches.length}
                      currentMatch={currentMatchIndex}
                      onNextMatch={handleNextMatch}
                      onPrevMatch={handlePrevMatch}
                      onClear={() => setSearchText('')}
                    />
                  </div>
                </div>
                
                {treeState && (
                  <TreeView
                    tree={treeState}
                    onToggleExpand={handleToggleExpand}
                  />
                )}
              </div>
            </div>
          </Panel>
        </PanelGroup>
      </main>
    </div>
  );
}

export default App;
