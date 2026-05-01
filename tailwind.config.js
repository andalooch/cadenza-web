/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app/**/*.{js,ts,jsx,tsx,mdx}', './components/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        ink: '#0F1B2D',
        'ink-soft': '#3D4A5E',
        bg: '#FAF7F2',
        card: '#FFFFFF',
        accent: '#1F6B4A',
        'accent-soft': '#E8F2EC',
        warning: '#C68A1F',
        danger: '#B5443A',
        muted: '#8B95A3',
        border: '#E5E0D6',
      },
      fontFamily: {
        sans: ['system-ui', '-apple-system', 'sans-serif'],
      },
      borderRadius: {
        sm: '6px',
        md: '12px',
        lg: '20px',
        xl: '28px',
        pill: '9999px',
      },
    },
  },
  plugins: [],
};
