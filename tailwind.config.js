/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./layouts/**/*.html", "./content/**/*.md"],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#6BDDB0",
          light: "#DDF7EC",
          dark: "#00C27B",
        },
        background: {
          default: "#FDFBF7",
          paper: "#F4F0E6",
        },
        text: {
          main: "#3D3D3D",
          muted: "#71717A",
        },
        btn: {
          bg: "#3D3D3D",
          text: "#FFFFFF",
        },
      },
      fontFamily: {
        sans: ["Cardo", "serif"],
        serif: ["Cardo", "serif"],
      },
    },
  },
  safelist: [
    "translate-x-0",
    "translate-x-full",
    "opacity-0",
    "opacity-100",
    "pointer-events-none",
    "pointer-events-auto",
    "overflow-hidden",
    "translate-y-0",
    "translate-y-8",
    "scale-95",
    "scale-100",
    "is-visible",
    "shadow-2xl",
  ],
  plugins: [],
};
