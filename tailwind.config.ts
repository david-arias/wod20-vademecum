import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        // Abyssal Gothic — core surfaces
        void:      '#0A0A0A',
        surface:   '#131313',
        'surface-low':  '#1C1B1B',
        'surface-mid':  '#201F1F',
        'surface-high': '#2A2A2A',
        'surface-top':  '#353534',

        // Typography
        cream:   '#F5F5F0',
        'on-surface': '#E5E2E1',
        'on-surface-variant': '#E7BDB8',

        // Accent — game-system tokens (CSS vars override at runtime)
        accent:  'var(--accent, #FF3333)',

        // Game system palettes
        blood:   '#FF3333',   // V20 Vampiro
        rage:    '#C07800',   // W20 Hombre Lobo
        quint:   '#1A6EFF',   // M20 Mago
        dream:   '#9333EA',   // C20 Changeling
        angst:   '#6B7280',   // Wr20 Wraith

        // Structural
        keyline: '#333333',
      },
      fontFamily: {
        garamond: ['"EB Garamond"', 'Georgia', 'serif'],
        inter:    ['Inter', 'system-ui', 'sans-serif'],
        mono:     ['"JetBrains Mono"', '"Fira Code"', 'monospace'],
      },
      fontSize: {
        'hero':   ['clamp(2.5rem, 5vw, 4rem)', { lineHeight: '1.05', letterSpacing: '-0.03em' }],
        'h1':     ['3rem',  { lineHeight: '1.1',  letterSpacing: '-0.02em' }],
        'h2':     ['2rem',  { lineHeight: '1.2',  letterSpacing: '-0.01em' }],
        'h3':     ['1.5rem',{ lineHeight: '1.2' }],
        'label':  ['0.875rem', { lineHeight: '1.4', letterSpacing: '0.05em' }],
        'micro':  ['0.75rem',  { lineHeight: '1.3', letterSpacing: '0.08em' }],
      },
      borderRadius: {
        DEFAULT: '0px',
        none:    '0px',
        sm:      '0px',
        md:      '0px',
        lg:      '0px',
        xl:      '0px',
        full:    '0px',
      },
      spacing: {
        gutter: '24px',
        margin: '32px',
      },
      maxWidth: {
        container: '1280px',
      },
      keyframes: {
        'accent-pulse': {
          '0%, 100%': { opacity: '1' },
          '50%':       { opacity: '0.4' },
        },
      },
      animation: {
        'accent-pulse': 'accent-pulse 2s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}

export default config
