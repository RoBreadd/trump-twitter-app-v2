/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      keyframes: {
        centerTweet1: {
          "0%": { left: "0px", transform: "translateX(0%)" },
          "100%": { left: "50%", transform: "translateX(-50%)" },
        },
        centerTweet2: {
          "0%": { left: "0px", transform: "translateX(0%)" },
          "100%": { left: "-50%", transform: "translateX(50%)" },
        },
      },
      animation: {
        centerTweet1: "centerTweet1 1s ease-in-out",
        centerTweet2: "centerTweet2 1s ease-in-out",
      },
    },
  },
  plugins: [],
};
