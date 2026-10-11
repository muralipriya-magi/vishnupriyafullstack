/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      // Design tokens: change the whole site's colors from here
      colors: {
        cream: '#0b1220', // page background
        card: '#111b30', // cards and panels
        soft: '#16233f', // icon tiles, tinted blocks
        chip: '#1a2640', // tags and inactive tabs
        'chip-hover': '#223156',
        line: '#22304a', // borders and dividers
        ink: '#e6edf7', // main text
        muted: '#94a3b8', // secondary text
        deep: '#2563eb', // primary buttons
        accent: '#38bdf8', // highlights and links
        banner: '#10264a', // contact banner
        code: '#0a1222', // hero code card
        'code-fg': '#cbd5e1',
        'code-hl': '#7dd3fc',
      },
      fontFamily: {
        sans: ['DM Sans', 'sans-serif'],
        serif: ['Playfair Display', 'serif'],
        hand: ['Caveat', 'cursive'],
      },
      maxWidth: {
        content: '1120px',
      },
    },
  },
  plugins: [],
};
