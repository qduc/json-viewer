import React from 'react';

interface ToolbarProps {
  children?: React.ReactNode;
  className?: string;
}

export function Toolbar({ children, className = '' }: ToolbarProps) {
  return (
    <div
      className={[
        'flex items-center gap-4 p-2 px-6',
        'bg-[var(--bg-secondary)] border-b border-[var(--border-color)]',
        'flex-wrap min-h-[48px]',
        className,
      ].join(' ').trim()}
    >
      {children}
    </div>
  );
}

export default Toolbar;
