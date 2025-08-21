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
  indentSize: number;
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
    <div className="output-tabs">
      <div className="tab-header">
        <div className="tab-buttons">
          {tabs.map(tab => (
            <button
              key={tab.key}
              className={`tab-button ${activeTab === tab.key ? 'active' : ''}`}
              onClick={() => setActiveTab(tab.key)}
              title={tab.description}
            >
              {tab.label}
            </button>
          ))}
        </div>
        
        <div className="tab-actions">
          <button onClick={handleCopy} title="Copy to clipboard" className="action-btn">
            Copy
          </button>
          <button onClick={handleDownload} title="Download file" className="action-btn">
            Download
          </button>
        </div>
      </div>
      
      <div className="tab-content">
        <pre className={`output-content ${isError() ? 'error' : ''}`}>
          <code className={`hljs language-${language}`} dangerouslySetInnerHTML={{ __html: highlightedHtml }} />
        </pre>
      </div>
      
      {activeTab === 'unescaped' && (
        <div className="tab-help">
          <p>
            <strong>Unescape:</strong> Converts a JSON string literal (wrapped in quotes) back to raw text.
            <br />
            Example: <code>"Hello\nworld"</code> → <code>Hello<br />world</code>
          </p>
        </div>
      )}
      
      {activeTab === 'escaped' && (
        <div className="tab-help">
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