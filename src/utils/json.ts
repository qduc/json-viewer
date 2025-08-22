export interface ValidationError {
  line: number;
  column: number;
  message: string;
  position?: number;
}

export interface ValidationResult {
  isValid: boolean;
  error?: ValidationError;
  parsed?: any;
}

export function validateJson(text: string): ValidationResult {
  if (!text.trim()) {
    return { isValid: true, parsed: null };
  }

  try {
    const parsed = JSON.parse(text);
    return { isValid: true, parsed };
  } catch (error) {
    const match = (error as Error).message.match(/at position (\d+)/);
    const position = match ? parseInt(match[1], 10) : 0;

    const lines = text.substring(0, position).split('\n');
    const line = lines.length;
    const column = lines[lines.length - 1].length + 1;

    return {
      isValid: false,
      error: {
        line,
        column,
        message: (error as Error).message,
        position
      }
    };
  }
}

export function beautifyJson(text: string, indent: number | string = 2): string {
  try {
    const parsed = JSON.parse(text);
    // If indent is a string (e.g. '\t'), pass it through; otherwise ensure it's a number
    const space = typeof indent === 'string' ? indent : indent;
    return JSON.stringify(parsed, null, space as any);
  } catch {
    return text;
  }
}

export function minifyJson(text: string): string {
  try {
    const parsed = JSON.parse(text);
    return JSON.stringify(parsed);
  } catch {
    return text;
  }
}

export function escapeJsonString(text: string): string {
  return JSON.stringify(text);
}

export function unescapeJsonString(text: string): { result?: string; error?: string } {
  if (!text.startsWith('"') || !text.endsWith('"')) {
    return { error: 'Input must be a valid JSON string literal wrapped in quotes, e.g., "hello\\nworld"' };
  }

  try {
    const result = JSON.parse(text);
    if (typeof result !== 'string') {
      return { error: 'Input must be a JSON string literal, not another JSON type' };
    }
    return { result };
  } catch {
    return { error: 'Invalid JSON string literal. Make sure quotes and escapes are properly formatted.' };
  }
}