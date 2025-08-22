import type { ValidationError } from '../../utils/json';

interface ValidationErrorProps {
  error: ValidationError;
  className?: string;
}

export function ValidationError({ error, className = '' }: ValidationErrorProps) {
  return (
    <div className={`validation-error ${className}`} role="alert" aria-live="assertive">
      <div className="error-message">
        {error.message}
      </div>
      <div className="error-location">
        Line {error.line}, Column {error.column}
      </div>
    </div>
  );
}

interface ValidationErrorsProps {
  errors: ValidationError[];
  className?: string;
}

export function ValidationErrors({ errors, className = '' }: ValidationErrorsProps) {
  if (errors.length === 0) {
    return null;
  }

  return (
    <div className={`validation-errors ${className}`}>
      {errors.map((error, index) => (
        <ValidationError 
          key={`${error.line}-${error.column}-${index}`} 
          error={error} 
        />
      ))}
    </div>
  );
}

export default ValidationError;