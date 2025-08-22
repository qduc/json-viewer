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
      className={[
        'flex items-center gap-2',
        'px-4 py-2 border border-border-color rounded',
        'bg-bg-primary text-text-primary',
        'transition-all text-sm font-medium whitespace-nowrap',
        'hover:bg-bg-tertiary hover:-translate-y-px',
        '[box-shadow:var(--shadow)] hover:[box-shadow:var(--shadow)]',
      ].join(' ')}
      onClick={handleToggle}
      title={`Current theme: ${getLabel()}. Click to cycle.`}
    >
      <span aria-hidden="true">{getIcon()}</span>
      <span>{getLabel()}</span>
    </button>
  );
}
