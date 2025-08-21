import type { ValidationResult } from '../utils/json';

interface ToolbarProps {
  validation?: ValidationResult;
  onValidate: () => void;
  onBeautify: () => void;
  onMinify: () => void;
  onExpandAll: () => void;
  onCollapseAll: () => void;
  onExpandToLevel: (level: number) => void;
  onEscape: () => void;
  onUnescape: () => void;
  onFileUpload: (file: File) => void;
  indentSize: number;
  onIndentSizeChange: (size: number) => void;
}

export default function Toolbar({
  validation,
  onValidate,
  onBeautify,
  onMinify,
  onExpandAll,
  onCollapseAll,
  onExpandToLevel,
  onEscape,
  onUnescape,
  onFileUpload,
  indentSize,
  onIndentSizeChange
}: ToolbarProps) {
  
  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      onFileUpload(file);
    }
    // Reset input so same file can be selected again
    event.target.value = '';
  };

  const getValidationStatus = () => {
    if (!validation) return 'pending';
    return validation.isValid ? 'valid' : 'invalid';
  };

  const getValidationMessage = () => {
    if (!validation) return 'Not validated';
    if (validation.isValid) return 'Valid JSON';
    return validation.error?.message || 'Invalid JSON';
  };

  return (
    <div className="toolbar">
      <div className="toolbar-section">
        <button 
          className="btn-primary" 
          onClick={onValidate}
          title="Validate JSON (Ctrl/Cmd + Enter)"
        >
          ✓ Validate
        </button>
        
        <div className={`validation-status ${getValidationStatus()}`}>
          <span className="status-indicator" />
          <span className="status-text" title={getValidationMessage()}>
            {getValidationMessage()}
          </span>
          {validation?.error && (
            <span className="error-location">
              Line {validation.error.line}, Column {validation.error.column}
            </span>
          )}
        </div>
      </div>

      <div className="toolbar-section">
        <button 
          onClick={onBeautify}
          title="Beautify JSON (Ctrl/Cmd + Shift + B)"
        >
          🎨 Beautify
        </button>
        
        <button 
          onClick={onMinify}
          title="Minify JSON (Ctrl/Cmd + Shift + M)"
        >
          📦 Minify
        </button>
        
        <select 
          value={indentSize} 
          onChange={(e) => onIndentSizeChange(Number(e.target.value))}
          title="Indentation size"
        >
          <option value={2}>2 spaces</option>
          <option value={4}>4 spaces</option>
          <option value={8}>8 spaces</option>
        </select>
      </div>

      <div className="toolbar-section">
        <button 
          onClick={onExpandAll}
          title="Expand All (Ctrl/Cmd + Shift + K)"
        >
          📂 Expand All
        </button>
        
        <button 
          onClick={onCollapseAll}
          title="Collapse All (Ctrl/Cmd + K)"
        >
          📁 Collapse All
        </button>
        
        <select 
          onChange={(e) => onExpandToLevel(Number(e.target.value))}
          title="Expand to level"
          defaultValue=""
        >
          <option value="" disabled>Expand to level...</option>
          <option value={0}>Level 0</option>
          <option value={1}>Level 1</option>
          <option value={2}>Level 2</option>
          <option value={3}>Level 3</option>
          <option value={4}>Level 4</option>
          <option value={5}>Level 5</option>
        </select>
      </div>

      <div className="toolbar-section">
        <button 
          onClick={onEscape}
          title="Escape as JSON string"
        >
          ↗️ Escape
        </button>
        
        <button 
          onClick={onUnescape}
          title="Unescape JSON string"
        >
          ↙️ Unescape
        </button>
      </div>

      <div className="toolbar-section">
        <label className="file-upload-btn">
          📁 Upload
          <input
            type="file"
            accept=".json,.txt"
            onChange={handleFileUpload}
            style={{ display: 'none' }}
          />
        </label>
      </div>
    </div>
  );
}