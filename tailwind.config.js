/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./dist/**/*.{html,js}"],
  theme: {
    extend: {
      colors: {
        "main-orange": "#d67243",
        "main-orange-op": "#d67249a8",
        "white-trans": "#ffffff87",
      },
      height: {
        "half-screen": "50vh",
      },
      backgroundImage: {
        "landing-img": "url('../media/photos/general-photos/cheesecover.jpg')",
        "market-img": "url('../media/photos/home-photos/slider/cow.png')",
        "organ-img": "url('../media/photos/home-photos/organizer.webp')",
      },
      gridTemplateColumns: {
        // Simple 16 column grid
        "2-cust": "auto 1fr",
      },
      width: {
        "i-frame": "560px",
      },
    },
  },
  plugins: [],
};
