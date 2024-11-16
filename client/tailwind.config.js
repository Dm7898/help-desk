/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        h4: "#464168",
        h1: "#191439",
        button: "#3d06f6",
        paragraph: "#9c9aac",
      },
      backgroundImage: {
        "custom-img": "url('./public/pattern.webp')",
      },
    },
  },
  plugins: [],
};
