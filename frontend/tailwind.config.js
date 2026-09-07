/** @type {import('tailwindcss').Config} */
// Tailwind scans index.html and everything under src for class names.
// Neutral, unbranded palette for now — this is an internal dashboard, not
// the Stock/HPP business app, so it doesn't inherit stock-frontend's
// "ledger & hangtag" design tokens. Extend here once the dashboard's own
// visual design is settled.
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [],
};
