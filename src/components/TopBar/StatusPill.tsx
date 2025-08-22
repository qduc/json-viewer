import type { ValidationResult } from '../../utils/json';

interface StatusPillProps {
  validation?: ValidationResult;
  compact?: boolean;
}

export function StatusPill({ validation, compact = false }: StatusPillProps) {
  const statusClass = validation ? (validation.isValid ? 'valid' : 'invalid') : 'pending';

  const message = (() => {
    if (!validation) return 'Not validated';
    if (validation.isValid) return 'Valid JSON';
    return validation.error?.message ?? 'Invalid JSON';
  })();

  return (
    <div className={`validation-status ${statusClass}`} aria-live="polite" style={{ alignItems: compact ? 'center' : 'baseline' }}>
      <span className="status-indicator" />
      {!compact && (
        <span className="status-text" title={message}>
          {message}
        </span>
      )}
    </div>
  );
}

export default StatusPill;
