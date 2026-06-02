import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        forest:      "#2F4F3A",
        olive:       "#70835A",
        sand:        "#D4B483",
        ivory:       "#FAF9F5",
        "ivory-alt": "#F8F6F2",
        charcoal:    "#222222",
        "text-muted":"#666666",
      },
      fontFamily: {
        heading: ["var(--font-cormorant)", "Georgia", "serif"],
        body:    ["var(--font-inter)", "system-ui", "sans-serif"],
        ui:      ["var(--font-montserrat)", "sans-serif"],
      },
      borderRadius: {
        btn:     "10px",
        card:    "16px",
        img:     "18px",
        gallery: "12px",
      },
      transitionDuration: {
        400: "400ms",
      },
    },
  },
  plugins: [],
};

export default config;
