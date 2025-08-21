import { describe, it, expect } from 'vitest';
import { validateJson, beautifyJson, minifyJson, escapeJsonString, unescapeJsonString } from './json';

describe('JSON Utilities', () => {
  describe('validateJson', () => {
    it('should validate valid JSON', () => {
      const result = validateJson('{"hello": "world"}');
      expect(result.isValid).toBe(true);
      expect(result.parsed).toEqual({ hello: 'world' });
    });

    it('should detect invalid JSON', () => {
      const result = validateJson('{"hello": world}');
      expect(result.isValid).toBe(false);
      expect(result.error).toBeDefined();
      expect(result.error?.line).toBe(1);
    });

    it('should handle empty input', () => {
      const result = validateJson('');
      expect(result.isValid).toBe(true);
      expect(result.parsed).toBe(null);
    });
  });

  describe('beautifyJson', () => {
    it('should beautify JSON with default indentation', () => {
      const input = '{"hello":"world","array":[1,2,3]}';
      const result = beautifyJson(input);
      expect(result).toContain('  "hello": "world"');
      expect(result).toContain('  "array": [');
    });

    it('should use custom indentation', () => {
      const input = '{"hello":"world"}';
      const result = beautifyJson(input, 4);
      expect(result).toContain('    "hello": "world"');
    });
  });

  describe('minifyJson', () => {
    it('should minify JSON', () => {
      const input = '{\n  "hello": "world",\n  "array": [1, 2, 3]\n}';
      const result = minifyJson(input);
      expect(result).toBe('{"hello":"world","array":[1,2,3]}');
    });
  });

  describe('escapeJsonString', () => {
    it('should escape a string as JSON', () => {
      const input = 'Hello\nWorld';
      const result = escapeJsonString(input);
      expect(result).toBe('"Hello\\nWorld"');
    });
  });

  describe('unescapeJsonString', () => {
    it('should unescape a JSON string', () => {
      const input = '"Hello\\nWorld"';
      const result = unescapeJsonString(input);
      expect(result.result).toBe('Hello\nWorld');
      expect(result.error).toBeUndefined();
    });

    it('should return error for invalid JSON string', () => {
      const input = 'Hello World';
      const result = unescapeJsonString(input);
      expect(result.error).toBeDefined();
      expect(result.result).toBeUndefined();
    });
  });
});