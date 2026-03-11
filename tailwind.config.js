/**
 * Tailwind CSS configuration
 *
 * The colour palette reflects the Leo7TV brand: deep cobalt and electric gold on a dark background.
 */
module.exports = {
  darkMode: 'class',
  content: [
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        cobalt: {
          DEFAULT: '#1e3a8a', // deep cobalt
        },
        gold: {
          DEFAULT: '#eab308', // electric gold
        },
      },
    },
  },
  plugins: [],
};
