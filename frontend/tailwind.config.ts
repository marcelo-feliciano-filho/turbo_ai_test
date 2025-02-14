import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        background: '#FDF6EC',
        cardBorder: '#547171',
        primaryText: '#5C3D1D',
        buttonBorder: '#A47A5A',
        categoryRandom: '#E8A87C',
        categorySchool: '#F2D388',
        categoryPersonal: '#99B898',
        buttonBackground: '#E8E4E1',
        buttonHover: '#D6C7B9'
      },
      fontFamily: {
        body: ['Inter', 'sans-serif'],
        title: ['Merriweather', 'serif'],
      },
    },
  },
  plugins: [],
};

export default config;
