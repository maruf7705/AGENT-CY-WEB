/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: '#040406',
        surface: '#0A0A0F',
        neonBlue: '#00F0FF',
        cyberPurple: '#8A2BE2',
        agentGreen: '#00FF66'
      },
      fontFamily: {
        sans: ['var(--font-inter)'],
        mono: ['var(--font-jetbrains-mono)'],
      }
    },
  },
  plugins: [],
}
