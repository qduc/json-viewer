import React from 'react';

type Variant = 'primary' | 'secondary' | 'success' | 'ghost';
type Size = 'sm' | 'md';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
  pressed?: boolean; // for toggle/segmented controls
  loading?: boolean;
}

function cx(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(' ').trim();
}

export default function Button({
  variant = 'secondary',
  size = 'sm',
  startIcon,
  endIcon,
  pressed = false,
  loading = false,
  className,
  children,
  disabled,
  ...props
}: ButtonProps) {
  const base = cx(
    'inline-flex items-center justify-center gap-2 rounded-md border transition-all duration-150 select-none',
    'font-medium whitespace-nowrap',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-color)] focus-visible:ring-offset-2',
    'focus-visible:ring-offset-[var(--bg-primary)]',
    'disabled:opacity-60 disabled:cursor-not-allowed',
  );

  const sizes: Record<Size, string> = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-sm',
  };

  const variants: Record<Variant, string> = {
    primary: 'bg-[var(--accent-color)] border-[var(--accent-color)] text-white hover:opacity-90 hover:-translate-y-px [box-shadow:var(--shadow)]',
    secondary: 'bg-[var(--bg-primary)] border-[var(--border-color)] text-[var(--text-primary)] hover:bg-[var(--bg-tertiary)] hover:-translate-y-px [box-shadow:var(--shadow)]',
    success: 'bg-[var(--success-color)] border-[var(--success-color)] text-white',
    ghost: 'bg-transparent border-transparent text-[var(--text-secondary)] hover:bg-[var(--bg-secondary)]',
  };

  const pressedStyles = pressed
    ? 'bg-[var(--bg-tertiary)] border-[var(--accent-color)] shadow-[inset_0_0_0_1px_var(--accent-color)]'
    : '';

  return (
    <button
      className={cx(base, sizes[size], variants[variant], pressedStyles, className)}
      disabled={disabled || loading}
      aria-pressed={pressed || undefined}
      aria-busy={loading || undefined}
      {...props}
    >
      {loading && (
        <svg
          className="animate-spin h-4 w-4 opacity-80"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden
        >
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
        </svg>
      )}
      {startIcon}
      <span>{children}</span>
      {endIcon}
    </button>
  );
}

