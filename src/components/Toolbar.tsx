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
    <div className="flex items-center gap-4 p-2 px-6 bg-[var(--bg-secondary)] border-b border-[var(--border-color)] flex-wrap min-h-[48px]">
      {/* Primary Actions */}
      <div className="flex items-center gap-3 relative flex-1 min-w-0 after:content-[''] after:absolute after:-right-3 after:top-1/2 after:-translate-y-1/2 after:w-px after:h-6 after:bg-[var(--border-color)] last:after:hidden">
        <button
          className="px-4 py-2 border border-[var(--accent-color)] rounded bg-[var(--accent-color)] text-white font-semibold transition-all hover:opacity-90 hover:-translate-y-px [box-shadow:var(--shadow)] hover:[box-shadow:var(--shadow)]"
          onClick={onValidate}
          title="Validate JSON (Ctrl/Cmd + Enter)"
        >
          Validate
        </button>

        <div
          className={[
            'flex items-center gap-2 text-sm px-2 py-1 rounded-full border bg-[var(--bg-primary)]',
            getValidationStatus() === 'valid' ? 'border-[var(--success-color)]' : '',
            getValidationStatus() === 'invalid' ? 'border-[var(--error-color)]' : '',
            getValidationStatus() === 'pending' ? 'border-[var(--border-color)]' : '',
          ].join(' ')}
          aria-live="polite"
        >
          <span
            className={[
              'w-2 h-2 rounded-full shrink-0',
              getValidationStatus() === 'valid' ? 'bg-[var(--success-color)]' : '',
              getValidationStatus() === 'invalid' ? 'bg-[var(--error-color)]' : '',
              getValidationStatus() === 'pending' ? 'bg-[var(--text-secondary)]' : '',
            ].join(' ')}
          />
          <span className="text-[var(--text-primary)]" title={getValidationMessage()}>
            {getValidationMessage()}
          </span>
          {validation?.error && (
            <span className="text-[var(--error-color)] text-xs">
              Line {validation.error.line}, Column {validation.error.column}
            </span>
          )}
        </div>
      </div>

      {/* Format Actions */}
      <div className="flex items-center gap-3 relative after:content-[''] after:absolute after:-right-3 after:top-1/2 after:-translate-y-1/2 after:w-px after:h-6 after:bg-[var(--border-color)] last:after:hidden">
        <div className="flex items-center gap-2">
          <button
            onClick={onBeautify}
            title="Format JSON with proper indentation (Ctrl/Cmd + Shift + B)"
            className="px-3 py-1.5 border border-[var(--border-color)] rounded bg-[var(--bg-primary)] text-[var(--text-primary)] transition-all text-sm font-medium whitespace-nowrap hover:bg-[var(--bg-tertiary)] hover:-translate-y-px [box-shadow:var(--shadow)] hover:[box-shadow:var(--shadow)]"
          >
            Format
          </button>

          <button
            onClick={onMinify}
            title="Remove all whitespace and formatting (Ctrl/Cmd + Shift + M)"
            className="px-3 py-1.5 border border-[var(--border-color)] rounded bg-[var(--bg-primary)] text-[var(--text-primary)] transition-all text-sm font-medium whitespace-nowrap hover:bg-[var(--bg-tertiary)] hover:-translate-y-px [box-shadow:var(--shadow)] hover:[box-shadow:var(--shadow)]"
          >
            Minify
          </button>
        </div>

        <select
          value={indentSize}
          onChange={(e) => onIndentSizeChange(Number(e.target.value))}
          title="Indentation size"
          className="min-w-[100px] text-sm px-3 py-1.5 border border-[var(--border-color)] rounded bg-[var(--bg-primary)] text-[var(--text-primary)] cursor-pointer transition-all hover:bg-[var(--bg-tertiary)] hover:-translate-y-px [box-shadow:var(--shadow)] hover:[box-shadow:var(--shadow)]"
        >
          <option value={2}>2 spaces</option>
          <option value={4}>4 spaces</option>
          <option value={8}>8 spaces</option>
        </select>
      </div>

      {/* Tree Actions */}
      <div className="flex items-center gap-3 relative after:content-[''] after:absolute after:-right-3 after:top-1/2 after:-translate-y-1/2 after:w-px after:h-6 after:bg-[var(--border-color)] last:after:hidden">
        <div className="flex items-center gap-2">
          <button
            onClick={onExpandAll}
            title="Expand all nodes in tree view (Ctrl/Cmd + Shift + K)"
            className="px-3 py-1.5 border border-[var(--border-color)] rounded bg-transparent text-[var(--text-secondary)] font-normal transition-all text-sm whitespace-nowrap hover:bg-[var(--bg-primary)] hover:text-[var(--text-primary)]"
          >
            Expand All
          </button>

          <button
            onClick={onCollapseAll}
            title="Collapse all nodes in tree view (Ctrl/Cmd + K)"
            className="px-3 py-1.5 border border-[var(--border-color)] rounded bg-transparent text-[var(--text-secondary)] font-normal transition-all text-sm whitespace-nowrap hover:bg-[var(--bg-primary)] hover:text-[var(--text-primary)]"
          >
            Collapse All
          </button>
        </div>

        <select
          onChange={(e) => onExpandToLevel(Number(e.target.value))}
          title="Expand tree to specific level"
          defaultValue=""
          className="min-w-[100px] text-sm px-3 py-1.5 border border-[var(--border-color)] rounded bg-[var(--bg-primary)] text-[var(--text-primary)] cursor-pointer transition-all hover:bg-[var(--bg-tertiary)] hover:-translate-y-px [box-shadow:var(--shadow)] hover:[box-shadow:var(--shadow)]"
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
      <div className="flex items-center gap-3 ml-auto relative last:after:hidden">
        <details className="relative group">
          <summary className="bg-[var(--bg-primary)] border border-[var(--border-color)] rounded px-4 py-2 text-sm cursor-pointer relative transition-all hover:bg-[var(--bg-tertiary)] group-open:bg-[var(--bg-tertiary)] group-open:rounded-b-none">
            More
            <span className="ml-2 text-xs opacity-70" aria-hidden="true">▾</span>
          </summary>
          <div className="absolute top-full left-0 right-0 bg-[var(--bg-primary)] border border-[var(--border-color)] border-t-0 rounded-b shadow [z-index:1000] min-w-[160px]">
            <button
              onClick={onEscape}
              title="Convert to escaped JSON string"
              className="block w-full px-4 py-3 text-left text-sm transition hover:bg-[var(--bg-secondary)] first:border-t first:border-[var(--border-color)] aria-pressed:true:bg-[var(--bg-tertiary)] aria-pressed:true:shadow-[inset_2px_0_0_0_var(--accent-color)]"
            >
              Escape String
            </button>

            <button
              onClick={onUnescape}
              title="Parse escaped JSON string"
              className="block w-full px-4 py-3 text-left text-sm transition hover:bg-[var(--bg-secondary)] first:border-t first:border-[var(--border-color)] aria-pressed:true:bg-[var(--bg-tertiary)] aria-pressed:true:shadow-[inset_2px_0_0_0_var(--accent-color)]"
            >
              Unescape String
            </button>
          </div>
        </details>

        <label className="cursor-pointer px-3 py-1.5 border border-[var(--border-color)] rounded bg-[var(--bg-primary)] text-[var(--text-primary)] transition-all hover:bg-[var(--bg-tertiary)]">
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
