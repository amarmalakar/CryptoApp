module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      animation: {
        bounce200: 'bounce .75s infinite 200ms',
        bounce400: 'bounce .75s infinite 400ms',
      },
    },
  },
  plugins: [],
}