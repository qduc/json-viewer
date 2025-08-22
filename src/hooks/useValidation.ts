import { useMemo } from 'react';
import { validateJson, type ValidationResult, type ValidationError } from '../utils/json';

export interface ValidationState {
  valid: boolean;
  errors: ValidationError[];
  lineCount: number;
  result?: ValidationResult;
}

export function useValidation(text: string): ValidationState {
  return useMemo(() => {
    const lineCount = text.split('\n').length;
    const result = validateJson(text);
    
    if (result.isValid) {
      return {
        valid: true,
        errors: [],
        lineCount,
        result
      };
    } else {
      return {
        valid: false,
        errors: result.error ? [result.error] : [],
        lineCount,
        result
      };
    }
  }, [text]);
}