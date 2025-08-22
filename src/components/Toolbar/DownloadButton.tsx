import { useState } from 'react';

interface DownloadButtonProps {
  value: string;
  disabled?: boolean;
  className?: string;
  /** Optional filename, defaults to data.json */
  filename?: string;
}

export default function DownloadButton({ value, disabled = false, className = '', filename = 'data.json' }: DownloadButtonProps) {
  const [saved, setSaved] = useState(false);

  const handleDownload = () => {
    if (disabled) return;
    try {
      const blob = new Blob([value], { type: 'application/json;charset=utf-8' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = filename.endsWith('.json') ? filename : `${filename}.json`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);

      setSaved(true);
      window.setTimeout(() => setSaved(false), 1500);
    } catch (e) {
      console.error('Download failed', e);
    }
  };

  return (
    <button
      className={[
        'px-3 py-1.5 border rounded transition-all text-sm font-medium whitespace-nowrap',
        '[box-shadow:var(--shadow)] hover:[box-shadow:var(--shadow)] hover:-translate-y-px',
        'disabled:opacity-50 disabled:cursor-not-allowed',
        saved
          ? 'bg-[var(--success-color)] text-white border-[var(--success-color)]'
          : 'bg-[var(--bg-primary)] text-[var(--text-primary)] border-[var(--border-color)] hover:bg-[var(--bg-tertiary)]',
        className,
      ].join(' ').trim()}
      onClick={handleDownload}
      disabled={disabled}
      title={disabled ? 'Nothing to download' : 'Download formatted JSON as file'}
      aria-live="polite"
    >
      {saved ? 'Saved!' : 'Download'}
    </button>
  );
}
