module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      gridTemplateColumns: {
        // Simple 16 column grid
        '16': 'repeat(10, minmax(30px, 30px))',
    },
    gridTemplateRows: {
      // Simple 16 column grid
      '16': 'repeat(10, minmax(30px, 30px))',
  },
  },
  plugins: [],
}
}