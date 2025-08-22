import { useMemo, useState } from 'react';
import { beautifyJson, minifyJson, escapeJsonString, unescapeJsonString } from '../utils/json';
import { copyToClipboard } from '../utils/storage';
import { downloadAsJson, downloadAsText } from '../utils/download';
import hljs from 'highlight.js/lib/core';
import jsonLang from 'highlight.js/lib/languages/json';
import plaintext from 'highlight.js/lib/languages/plaintext';


// Register only the languages we need to keep bundle size small
hljs.registerLanguage('json', jsonLang);
hljs.registerLanguage('plaintext', plaintext);

interface OutputTabsProps {
  inputText: string;
  // Accept either a numeric indent (spaces) or a string (e.g. '\t' for tabs)
  indentSize: number | string;
}

type TabType = 'beautified' | 'minified' | 'escaped' | 'unescaped';

export default function OutputTabs({ inputText, indentSize }: OutputTabsProps) {
  const [activeTab, setActiveTab] = useState<TabType>('beautified');

  const getTabContent = () => {
    switch (activeTab) {
      case 'beautified':
        return beautifyJson(inputText, indentSize);
      case 'minified':
        return minifyJson(inputText);
      case 'escaped':
        return escapeJsonString(inputText);
      case 'unescaped': {
        const result = unescapeJsonString(inputText);
        return result.error || result.result || '';
      }
      default:
        return inputText;
    }
  };

  const isError = () => {
    if (activeTab === 'unescaped') {
      const result = unescapeJsonString(inputText);
      return !!result.error;
    }
    return false;
  };

  const handleCopy = async () => {
    const content = getTabContent();
    await copyToClipboard(content);
  };

  const handleDownload = () => {
    const content = getTabContent();
    const timestamp = new Date().toISOString().split('T')[0];

    if (activeTab === 'escaped' || activeTab === 'unescaped') {
      downloadAsText(content, `json-${activeTab}-${timestamp}.txt`);
    } else {
      downloadAsJson(content, `json-${activeTab}-${timestamp}.json`);
    }
  };

  const tabs: { key: TabType; label: string; description: string }[] = [
    { key: 'beautified', label: 'Beautified', description: 'Pretty-printed JSON with indentation' },
    { key: 'minified', label: 'Minified', description: 'Compact JSON with no whitespace' },
    { key: 'escaped', label: 'Escaped', description: 'JSON as escaped string literal' },
    { key: 'unescaped', label: 'Unescaped', description: 'Parse JSON string literal to raw text' }
  ];

  const content = useMemo(() => getTabContent(), [activeTab, inputText, indentSize]);
  const language: 'json' | 'plaintext' = useMemo(() => (
    activeTab === 'beautified' || activeTab === 'minified' ? 'json' : 'plaintext'
  ), [activeTab]);

  const highlightedHtml = useMemo(() => {
    try {
      return hljs.highlight(content, { language }).value;
    } catch {
      // Fallback: basic escape to avoid breaking the UI if highlighting fails
      return content
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;');
    }
  }, [content, language]);

  return (
    <div className="flex flex-col h-full min-h-0">
      <div className="flex items-center justify-between mb-2">
        <div className="flex gap-1">
          {tabs.map(tab => (
            <button
              key={tab.key}
              className={`px-3 py-2 border border-border-color bg-bg-secondary text-text-primary cursor-pointer rounded-t transition-all hover:bg-bg-tertiary ${activeTab === tab.key ? 'bg-bg-primary border-b-transparent [box-shadow:inset_0_-2px_0_0_var(--accent-color)]' : ''}`}
              onClick={() => setActiveTab(tab.key)}
              title={tab.description}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <button onClick={handleCopy} title="Copy to clipboard" className="px-3 py-2 border border-border-color rounded bg-bg-primary text-text-primary transition-all text-sm font-medium whitespace-nowrap hover:bg-bg-tertiary hover:-translate-y-px [box-shadow:var(--shadow)] hover:[box-shadow:var(--shadow)]">
            Copy
          </button>
          <button onClick={handleDownload} title="Download file" className="px-3 py-2 border border-border-color rounded bg-bg-primary text-text-primary transition-all text-sm font-medium whitespace-nowrap hover:bg-bg-tertiary hover:-translate-y-px [box-shadow:var(--shadow)] hover:[box-shadow:var(--shadow)]">
            Download
          </button>
        </div>
      </div>

      <div className="flex-1 border border-border-color rounded rounded-tl-none overflow-hidden">
        <pre className={`h-full p-4 m-0 font-mono text-sm leading-snug bg-bg-primary text-text-primary overflow-auto whitespace-pre-wrap break-all ${isError() ? 'text-[var(--error-color)]' : ''}`}>
          <code className={`hljs language-${language}`} dangerouslySetInnerHTML={{ __html: highlightedHtml }} />
        </pre>
      </div>

      {activeTab === 'unescaped' && (
        <div className="mt-2 p-3 bg-bg-secondary rounded text-sm text-text-secondary">
          <p>
            <strong>Unescape:</strong> Converts a JSON string literal (wrapped in quotes) back to raw text.
            <br />
            Example: <code>"Hello\nworld"</code> → <code>Hello<br />world</code>
          </p>
        </div>
      )}

      {activeTab === 'escaped' && (
        <div className="mt-2 p-3 bg-bg-secondary rounded text-sm text-text-secondary">
          <p>
            <strong>Escape:</strong> Converts text into a JSON string literal with proper escaping.
            <br />
            Example: <code>Hello<br />world</code> → <code>"Hello\nworld"</code>
          </p>
        </div>
      )}
    </div>
  );
}