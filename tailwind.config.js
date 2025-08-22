/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'selector', // Using 'selector' strategy for data-theme attribute
  theme: {
    extend: {
      colors: {
        // Custom color palette matching existing CSS variables
        primary: {
          light: '#ffffff',
          DEFAULT: '#ffffff',
          dark: '#1a1a1a',
        },
        secondary: {
          light: '#f8f9fa',
          DEFAULT: '#f8f9fa',
          dark: '#2d2d2d',
        },
        tertiary: {
          light: '#e9ecef',
          DEFAULT: '#e9ecef',
          dark: '#404040',
        },
        text: {
          primary: {
            light: '#212529',
            DEFAULT: '#212529',
            dark: '#e9ecef',
          },
          secondary: {
            light: '#6c757d',
            DEFAULT: '#6c757d',
            dark: '#adb5bd',
          },
        },
        border: {
          light: '#dee2e6',
          DEFAULT: '#dee2e6',
          dark: '#404040',
        },
        accent: {
          light: '#0066cc',
          DEFAULT: '#0066cc',
          dark: '#4dabf7',
        },
        success: {
          light: '#28a745',
          DEFAULT: '#28a745',
          dark: '#51cf66',
        },
        error: {
          light: '#dc3545',
          DEFAULT: '#dc3545',
          dark: '#ff6b6b',
        },
        warning: {
          light: '#ffc107',
          DEFAULT: '#ffc107',
          dark: '#ffd43b',
        },
      },
      fontFamily: {
        sans: ['-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
        mono: ['Monaco', 'Menlo', 'Ubuntu Mono', 'monospace'],
      },
      fontSize: {
        '2xs': '0.6875rem', // 11px
        'xs': '0.75rem',    // 12px
        'sm': '0.875rem',   // 14px
        'base': '1rem',     // 16px
        'lg': '1.125rem',   // 18px
        'xl': '1.25rem',    // 20px
      },
      spacing: {
        '0.75': '0.1875rem', // 3px
        '3.5': '0.875rem',   // 14px
        '4.5': '1.125rem',   // 18px
        '5.5': '1.375rem',   // 22px
        '6.5': '1.625rem',   // 26px
        '7.5': '1.875rem',   // 30px
      },
      borderRadius: {
        'sm': '0.125rem',    // 2px
        DEFAULT: '0.25rem',  // 4px (matches --radius)
        'md': '0.375rem',    // 6px
        'lg': '0.5rem',      // 8px (matches --radius-lg)
        'xl': '0.75rem',     // 12px
      },
      boxShadow: {
        'sm': '0 1px 2px rgba(0,0,0,0.05)',
        DEFAULT: '0 2px 4px rgba(0,0,0,0.1)', // matches --shadow light
        'md': '0 4px 6px rgba(0,0,0,0.1)',
        'lg': '0 8px 15px rgba(0,0,0,0.1)',
        'dark': '0 2px 4px rgba(0,0,0,0.3)', // matches --shadow dark
      },
      animation: {
        'fade-in': 'fadeIn 0.2s ease-in-out',
        'slide-up': 'slideUp 0.2s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
}
