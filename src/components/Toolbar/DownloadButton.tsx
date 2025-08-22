import { useState } from 'react';
import Button from '../ui/Button';

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

  const DownloadIcon = (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <polyline points="7 10 12 15 17 10" />
      <line x1="12" y1="15" x2="12" y2="3" />
    </svg>
  );

  const CheckIcon = (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M20 6L9 17l-5-5" />
    </svg>
  );

  return (
    <Button
      variant={saved ? 'success' : 'secondary'}
      size="sm"
      startIcon={saved ? CheckIcon : DownloadIcon}
      onClick={handleDownload}
      disabled={disabled}
      title={disabled ? 'Nothing to download' : 'Download formatted JSON as file'}
      aria-live="polite"
      className={className}
    >
      {saved ? 'Saved' : 'Download'}
    </Button>
  );
}
