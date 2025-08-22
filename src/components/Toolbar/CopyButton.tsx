import { useState } from 'react';

interface CopyButtonProps {
  value: string;
  disabled?: boolean;
  className?: string;
}

export default function CopyButton({ value, disabled = false, className = '' }: CopyButtonProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    if (disabled) return;
    try {
      if (navigator.clipboard && typeof navigator.clipboard.writeText === 'function') {
        await navigator.clipboard.writeText(value);
      } else {
        // Fallback for older browsers
        const textarea = document.createElement('textarea');
        textarea.value = value;
        textarea.setAttribute('readonly', '');
        textarea.style.position = 'absolute';
        textarea.style.left = '-9999px';
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
      }
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1500);
    } catch (e) {
      console.error('Copy failed', e);
    }
  };

  return (
    <button
      className={`btn ${copied ? 'btn-success' : 'btn-secondary'} ${className}`.trim()}
      onClick={handleCopy}
      disabled={disabled}
      title={disabled ? 'Nothing to copy' : 'Copy formatted JSON to clipboard'}
      aria-live="polite"
    >
      {copied ? 'Copied!' : 'Copy'}
    </button>
  );
}
