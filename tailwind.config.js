/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      animation: {
        wiggle: 'pulse 1s ease-in-out infinite',
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        secondary: {
          100: "#1A1A1A",
          200: "#2C2E33",
        },
        textSecondary: "#B3B3B3",
        primaryGolden: '#D8A353', 
        primary: "orange-700",
        secondary: "#F7941D",
        mutedGray: "#909296",
        primaryDark: "#141517",
        lightYellow: "#fef8ee",
        secondaryWhite: "#E6E6E6",
        lightBrown: "#333333",
        offWhite: "#F5F5F5"
      },
      backgroundImage: {
        'primaryGradient': 'linear-gradient(98.87deg, #E05B31 -16.25%, #F7941D 90.71%)',
        'secondaryGradient': 'linear-gradient(#FFF, #F0A027, #FFF)'
      },
      fontSize: {
        'xxxs': '7.5px', 
        'xxs': "8.5px"
      },
    },
  },
  plugins: [],
};
