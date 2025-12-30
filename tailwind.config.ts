import type { Config } from "tailwindcss";

const {
  iconsPlugin,
  getIconCollections,
} = require("@egoist/tailwindcss-icons");

const config: Config = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  plugins: [require("@tailwindcss/typography"),
    iconsPlugin({
      collections: getIconCollections(["tabler"]),
    })
  ],
  darkMode: 'class',
};
export default config;
