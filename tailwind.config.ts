// tailwind.config.ts
import type { Config } from 'tailwindcss';
import scrollbar from 'tailwind-scrollbar';

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        // Optional custom colors
      },
      keyframes: {
        'text-slide': {
          '0%, 10%': { marginTop: '0' },
          '20%, 30%': { marginTop: '-2.8125rem' },
          '40%, 60%': { marginTop: '-5.625rem' },
          '70%, 80%': { marginTop: '-2.8125rem' },
          '90%, 100%': { marginTop: '0' },
        },
      },
      animation: {
        'text-slide': 'text-slide 8s infinite',
      },
    },
  },
  plugins: [scrollbar],
};

export default config;
