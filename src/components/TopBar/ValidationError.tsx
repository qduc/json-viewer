import type { ValidationError } from '../../utils/json';

interface ValidationErrorProps {
  error: ValidationError;
  className?: string;
}

export function ValidationError({ error, className = '' }: ValidationErrorProps) {
  return (
    <div 
      className={`bg-error-color text-white px-3 py-2 rounded text-sm mb-1 last:mb-0 border-l-4 border-white/30 ${className}`} 
      role="alert" 
      aria-live="assertive"
    >
      <div className="font-medium mb-1">
        {error.message}
      </div>
      <div className="text-xs opacity-90">
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
    <div className={`mt-2 ${className}`}>
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