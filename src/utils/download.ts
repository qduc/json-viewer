import { saveAs } from 'file-saver';

export function downloadAsJson(content: string, filename: string = 'data.json'): void {
  const blob = new Blob([content], { type: 'application/json;charset=utf-8' });
  saveAs(blob, filename);
}

export function downloadAsText(content: string, filename: string = 'data.txt'): void {
  const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
  saveAs(blob, filename);
}

export function readFileAsText(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result;
      if (typeof result === 'string') {
        resolve(result);
      } else {
        reject(new Error('Failed to read file as text'));
      }
    };
    reader.onerror = () => reject(new Error('Failed to read file'));
    reader.readAsText(file);
  });
}