/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: ['./apps/portfolio-web/src/**/*.{html,ts}', './libs/**/*.{html,ts}'],
  theme: {
    extend: {
      colors: {
        // Paleta marina profesional
        marine: {
          50: '#f0f9ff',
          100: '#e0f2fe',
          200: '#b9e3fe',
          300: '#7ccbfd',
          400: '#36aefa',
          500: '#0c90eb',
          600: '#0070c9',
          700: '#0159a3',
          800: '#064c86',
          900: '#0b406f',
          950: '#07294a',
        },
        ocean: {
          50: '#f0fdfa',
          100: '#ccfbf1',
          200: '#99f6e4',
          300: '#5eecc6',
          400: '#2dd4a7',
          500: '#14b48d',
          600: '#0d9373',
          700: '#0f765c',
          800: '#115e4a',
          900: '#134e3d',
          950: '#042f26',
        },
        deep: {
          50: '#f8fafc',
          100: '#f1f5f9',
          200: '#e2e8f0',
          300: '#cbd5e1',
          400: '#94a3b8',
          500: '#64748b',
          600: '#475569',
          700: '#334155',
          800: '#1e293b',
          900: '#0f172a',
          950: '#020617',
        },
      },
      fontFamily: {
        sans: [
          'Inter',
          'system-ui',
          '-apple-system',
          'BlinkMacSystemFont',
          '"Segoe UI"',
          'Roboto',
          'Arial',
          'sans-serif',
        ],
        mono: ['JetBrains Mono', 'Menlo', 'Monaco', 'Courier New', 'monospace'],
      },
      backgroundImage: {
        'gradient-marine': 'linear-gradient(135deg, #0c90eb 0%, #0159a3 50%, #07294a 100%)',
        'gradient-ocean': 'linear-gradient(135deg, #14b48d 0%, #0d9373 50%, #042f26 100%)',
      },
      boxShadow: {
        marine: '0 10px 40px -10px rgba(12, 144, 235, 0.3)',
        'marine-lg': '0 20px 60px -15px rgba(12, 144, 235, 0.4)',
      },
    },
  },
  plugins: [],
};
