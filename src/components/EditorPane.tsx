import { useRef, useEffect } from 'react';
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

export default function EditorPane({ 
  value, 
  onChange, 
  validation, 
  theme, 
  fontSize,
  onMount 
}: EditorPaneProps) {
  const editorRef = useRef<any>(null);

  useEffect(() => {
    if (editorRef.current && validation && !validation.isValid && validation.error) {
      const model = editorRef.current.getModel();
      if (model) {
        // Clear previous markers
        window.monaco?.editor.setModelMarkers(model, 'json-validation', []);
        
        // Add error marker
        const { line, column, message } = validation.error;
        window.monaco?.editor.setModelMarkers(model, 'json-validation', [{
          startLineNumber: line,
          startColumn: column,
          endLineNumber: line,
          endColumn: column + 1,
          message,
          severity: window.monaco?.MarkerSeverity.Error || 8
        }]);
      }
    } else if (editorRef.current && validation?.isValid) {
      // Clear markers when valid
      const model = editorRef.current.getModel();
      if (model) {
        window.monaco?.editor.setModelMarkers(model, 'json-validation', []);
      }
    }
  }, [validation]);

  const handleEditorDidMount = (editor: any) => {
    editorRef.current = editor;
    onMount?.(editor);
  };

  return (
    <div className="editor-pane" style={{ height: '100%' }}>
      <Editor
        height="100%"
        language="json"
        theme={theme === 'dark' ? 'vs-dark' : 'vs'}
        value={value}
        onChange={(value) => onChange(value || '')}
        onMount={handleEditorDidMount}
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