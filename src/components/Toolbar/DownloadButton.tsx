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
      className={`btn ${saved ? 'btn-success' : 'btn-secondary'} ${className}`.trim()}
      onClick={handleDownload}
      disabled={disabled}
      title={disabled ? 'Nothing to download' : 'Download formatted JSON as file'}
      aria-live="polite"
    >
      {saved ? 'Saved!' : 'Download'}
    </button>
  );
}
