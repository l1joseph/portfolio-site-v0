/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"JetBrains Mono Variable"', 'ui-monospace', 'monospace'],
        mono: ['"JetBrains Mono Variable"', 'ui-monospace', 'monospace']
      }
    }
  },
  plugins: []
};
