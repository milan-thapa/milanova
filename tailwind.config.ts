import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        'hero-dark': '#0B3D2E',
        'hero-mid': '#0E4A38',
        'teal': '#1A6B55',
        'teal-mid': '#1C5C3E',
        'green-card': '#3BAB6C',
        'lime': '#B5E12A',
        'cream': '#FDFDE8',
        'off-white': '#F4F9F4',
        'text-dark': '#0D1F1A',
        'text-body': '#3A4A44',
        'text-muted': '#A8B8B0',
        'brand-dark': '#033E34',
      },
      fontFamily: {
        sans: ['var(--font-poppins)', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        '2xl': '16px',
      },
    },
  },
  plugins: [],
};
export default config;
