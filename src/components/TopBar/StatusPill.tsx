import type { ValidationResult } from '../../utils/json';

interface StatusPillProps {
  validation?: ValidationResult;
  compact?: boolean;
}

export function StatusPill({ validation, compact = false }: StatusPillProps) {
  const isValid = validation?.isValid;
  const isPending = !validation;
  const isInvalid = validation && !validation.isValid;

  const message = (() => {
    if (!validation) return 'Not validated';
    if (validation.isValid) return 'Valid JSON';
    return validation.error?.message ?? 'Invalid JSON';
  })();

  const containerClasses = `
    flex gap-2 text-sm px-2 py-1 rounded-full border bg-bg-primary
    ${compact ? 'items-center' : 'items-baseline'}
    ${isValid ? 'border-success-color' : ''}
    ${isInvalid ? 'border-error-color' : ''}
    ${isPending ? 'border-border-color' : ''}
  `.trim();

  const indicatorClasses = `
    w-2 h-2 rounded-full shrink-0
    ${isValid ? 'bg-success-color' : ''}
    ${isInvalid ? 'bg-error-color' : ''}
    ${isPending ? 'bg-text-secondary' : ''}
  `.trim();

  return (
    <div className={containerClasses} aria-live="polite">
      <span className={indicatorClasses} />
      {!compact && (
        <span className="text-text-primary" title={message}>
          {message}
        </span>
      )}
    </div>
  );
}

export default StatusPill;
