import type { AppSettings } from '../utils/storage';

interface ThemeToggleProps {
  theme: AppSettings['theme'];
  onThemeChange: (theme: AppSettings['theme']) => void;
  effectiveTheme: 'light' | 'dark';
}

export default function ThemeToggle({ theme, onThemeChange, effectiveTheme }: ThemeToggleProps) {
  const handleToggle = () => {
    if (theme === 'light') {
      onThemeChange('dark');
    } else if (theme === 'dark') {
      onThemeChange('system');
    } else {
      onThemeChange('light');
    }
  };

  const getIcon = () => {
    switch (theme) {
      case 'light':
        return '☀️';
      case 'dark':
        return '🌙';
      case 'system':
        return '💻';
      default:
        return '☀️';
    }
  };

  const getLabel = () => {
    switch (theme) {
      case 'light':
        return 'Light';
      case 'dark':
        return 'Dark';
      case 'system':
        return `System (${effectiveTheme})`;
      default:
        return 'Light';
    }
  };

  return (
    <button
      className="theme-toggle"
      onClick={handleToggle}
      title={`Current theme: ${getLabel()}. Click to cycle.`}
    >
      <span className="theme-icon">{getIcon()}</span>
      <span className="theme-label">{getLabel()}</span>
    </button>
  );
}