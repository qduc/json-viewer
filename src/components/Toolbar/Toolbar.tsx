import React from 'react';

interface ToolbarProps {
  children?: React.ReactNode;
  className?: string;
}

export function Toolbar({ children, className = '' }: ToolbarProps) {
  return (
    <div className={`toolbar ${className}`.trim()}>
      {children}
    </div>
  );
}

export default Toolbar;