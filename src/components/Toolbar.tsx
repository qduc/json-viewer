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
      {/* Primary Actions */}
      <div className="toolbar-group toolbar-group-primary">
        <button 
          className="btn-primary" 
          onClick={onValidate}
          title="Validate JSON (Ctrl/Cmd + Enter)"
        >
          Validate
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

      {/* Format Actions */}
      <div className="toolbar-group">
        <div className="toolbar-section">
          <button 
            onClick={onBeautify}
            title="Format JSON with proper indentation (Ctrl/Cmd + Shift + B)"
            className="btn-secondary"
          >
            Format
          </button>
          
          <button 
            onClick={onMinify}
            title="Remove all whitespace and formatting (Ctrl/Cmd + Shift + M)"
            className="btn-secondary"
          >
            Minify
          </button>
        </div>
        
        <select 
          value={indentSize} 
          onChange={(e) => onIndentSizeChange(Number(e.target.value))}
          title="Indentation size"
          className="indent-select"
        >
          <option value={2}>2 spaces</option>
          <option value={4}>4 spaces</option>
          <option value={8}>8 spaces</option>
        </select>
      </div>

      {/* Tree Actions */}
      <div className="toolbar-group">
        <div className="toolbar-section">
          <button 
            onClick={onExpandAll}
            title="Expand all nodes in tree view (Ctrl/Cmd + Shift + K)"
            className="btn-outline"
          >
            Expand All
          </button>
          
          <button 
            onClick={onCollapseAll}
            title="Collapse all nodes in tree view (Ctrl/Cmd + K)"
            className="btn-outline"
          >
            Collapse All
          </button>
        </div>
        
        <select 
          onChange={(e) => onExpandToLevel(Number(e.target.value))}
          title="Expand tree to specific level"
          defaultValue=""
          className="level-select"
        >
          <option value="" disabled>Level...</option>
          <option value={0}>0</option>
          <option value={1}>1</option>
          <option value={2}>2</option>
          <option value={3}>3</option>
          <option value={4}>4</option>
          <option value={5}>5</option>
        </select>
      </div>

      {/* Utility Actions */}
      <div className="toolbar-group toolbar-group-secondary">
        <details className="dropdown">
          <summary className="dropdown-toggle" title="More tools">
            More
          </summary>
          <div className="dropdown-menu">
            <button 
              onClick={onEscape}
              title="Convert to escaped JSON string"
              className="dropdown-item"
            >
              Escape String
            </button>
            
            <button 
              onClick={onUnescape}
              title="Parse escaped JSON string"
              className="dropdown-item"
            >
              Unescape String
            </button>
          </div>
        </details>

        <label className="file-upload-btn">
          Upload File
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