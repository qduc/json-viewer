import { useRef, useEffect, useState } from 'react';
import Editor from '@monaco-editor/react';
import type { ValidationResult } from '../utils/json';

interface EditorPaneProps {
  value: string;
  onChange: (value: string) => void;
  validation?: ValidationResult;
  theme: 'light' | 'dark';
  fontSize: number;
  onMount?: (editor: any) => void;
}

function FallbackEditor({ value, onChange, validation, fontSize }: EditorPaneProps) {
  return (
    <div className="fallback-editor">
      <div className="fallback-info">
        <small>Using fallback editor (Monaco Editor failed to load)</small>
      </div>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="fallback-textarea"
        style={{ 
          fontSize: `${fontSize}px`,
          fontFamily: 'Monaco, Menlo, "Ubuntu Mono", monospace'
        }}
        placeholder="Enter JSON here..."
        spellCheck={false}
      />
      {validation && !validation.isValid && validation.error && (
        <div className="fallback-error">
          Error at line {validation.error.line}, column {validation.error.column}: {validation.error.message}
        </div>
      )}
    </div>
  );
}

export default function EditorPane({ 
  value, 
  onChange, 
  validation, 
  theme, 
  fontSize,
  onMount 
}: EditorPaneProps) {
  const editorRef = useRef<any>(null);
  const [monacoLoaded, setMonacoLoaded] = useState<boolean | null>(null);
  const timeoutRef = useRef<number | null>(null);

  useEffect(() => {
    // Set a timeout to fallback if Monaco doesn't load within 5 seconds
    timeoutRef.current = window.setTimeout(() => {
      if (monacoLoaded === null) {
        console.warn('Monaco Editor timeout - switching to fallback');
        setMonacoLoaded(false);
      }
    }, 5000);

    return () => {
      if (timeoutRef.current) {
        window.clearTimeout(timeoutRef.current);
      }
    };
  }, [monacoLoaded]);

  useEffect(() => {
    if (editorRef.current && validation && !validation.isValid && validation.error) {
      const model = editorRef.current.getModel();
      if (model && window.monaco) {
        // Clear previous markers
        window.monaco.editor.setModelMarkers(model, 'json-validation', []);
        
        // Add error marker
        const { line, column, message } = validation.error;
        window.monaco.editor.setModelMarkers(model, 'json-validation', [{
          startLineNumber: line,
          startColumn: column,
          endLineNumber: line,
          endColumn: column + 1,
          message,
          severity: window.monaco.MarkerSeverity.Error || 8
        }]);
      }
    } else if (editorRef.current && validation?.isValid && window.monaco) {
      // Clear markers when valid
      const model = editorRef.current.getModel();
      if (model) {
        window.monaco.editor.setModelMarkers(model, 'json-validation', []);
      }
    }
  }, [validation]);

  const handleEditorDidMount = (editor: any) => {
    editorRef.current = editor;
    setMonacoLoaded(true);
    if (timeoutRef.current) {
      window.clearTimeout(timeoutRef.current);
    }
    onMount?.(editor);
  };

  // Show fallback if Monaco failed to load
  if (monacoLoaded === false) {
    return <FallbackEditor {...{ value, onChange, validation, theme, fontSize, onMount }} />;
  }

  return (
    <div className="editor-pane" style={{ height: '100%' }}>
      <Editor
        height="100%"
        language="json"
        theme={theme === 'dark' ? 'vs-dark' : 'vs'}
        value={value}
        onChange={(value) => onChange(value || '')}
        onMount={handleEditorDidMount}
        loading={<div className="editor-loading">Loading Monaco Editor...</div>}
        options={{
          fontSize,
          lineNumbers: 'on',
          minimap: { enabled: false },
          scrollBeyondLastLine: false,
          automaticLayout: true,
          bracketPairColorization: { enabled: true },
          folding: true,
          wordWrap: 'on',
          formatOnPaste: true,
          formatOnType: true
        }}
      />
    </div>
  );
}