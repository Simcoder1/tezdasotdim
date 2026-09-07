/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#eef4ff",
          100: "#d9e6ff",
          500: "#3b5bfd",
          600: "#2c46e0",
          700: "#2236b3",
          900: "#141b4d",
        },
      },
    },
  },
  plugins: [],
};
