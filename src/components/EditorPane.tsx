import { useRef, useEffect, useState, useCallback } from 'react';
import Editor from '@monaco-editor/react';
import type { OnMount } from '@monaco-editor/react';
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
    <div className="h-full flex flex-col">
      <div className="bg-bg-secondary px-4 py-2 border-b border-border-color text-text-secondary text-xs">
        <small>Using fallback editor (Monaco Editor failed to load)</small>
      </div>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="flex-1 p-4 border-none outline-none bg-bg-primary text-text-primary resize-none leading-relaxed"
        style={{
          fontSize: `${fontSize}px`,
          fontFamily: 'Monaco, Menlo, "Ubuntu Mono", monospace',
          tabSize: 2
        }}
        placeholder="Enter JSON here..."
        spellCheck={false}
      />
      {validation && !validation.isValid && validation.error && (
        <div className="bg-error-color text-white px-4 py-2 text-sm border-t border-border-color">
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
  const monacoRef = useRef<any>(null);
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

  // Update markers when validation changes
  useEffect(() => {
    if (!editorRef.current || !monacoRef.current) return;

    const model = editorRef.current.getModel();
    if (!model) return;

    if (validation && !validation.isValid && validation.error) {
      const { line, column, message } = validation.error;
      monacoRef.current.editor.setModelMarkers(model, 'json-validation', [{
        startLineNumber: line,
        startColumn: column,
        endLineNumber: line,
        endColumn: column + 1,
        message,
        severity: monacoRef.current.MarkerSeverity?.Error ?? 8
      }]);
    } else {
      monacoRef.current.editor.setModelMarkers(model, 'json-validation', []);
    }
  }, [validation]);

  const handleEditorDidMount: OnMount = useCallback((editor, monaco) => {
    editorRef.current = editor;
    monacoRef.current = monaco;
    setMonacoLoaded(true);
    if (timeoutRef.current) {
      window.clearTimeout(timeoutRef.current);
    }
    onMount?.(editor);
  }, [onMount]);

  // Show fallback if Monaco failed to load
  if (monacoLoaded === false) {
    return <FallbackEditor {...{ value, onChange, validation, theme, fontSize, onMount }} />;
  }

  return (
    <div className="flex-1 border border-border-color rounded overflow-hidden" style={{ height: '100%' }}>
      <Editor
        height="100%"
        language="json"
        theme={theme === 'dark' ? 'vs-dark' : 'vs'}
        value={value}
        onChange={(v) => onChange(v || '')}
        onMount={handleEditorDidMount}
        loading={<div className="flex items-center justify-center h-full text-text-secondary italic">Loading Monaco Editor...</div>}
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
          formatOnType: true,
          // keep aria and accessibility sensible
          ariaLabel: 'JSON editor',
        }}
      />
    </div>
  );
}