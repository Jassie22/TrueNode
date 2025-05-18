/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Updated color palette
        primary: "#0A0A0A",        // Midnight Black - Primary background
        secondary: "#1F1F1F",      // Charcoal Gray - For section dividers, nav, footer
        accent: "#903ae7",         // Main Purple - Brand color
        "accent-light": "#a55ef0", // Lighter version of Brand Purple
        "accent-dark": "#7a2fd0",  // Darker version of Brand Purple
        "accent-blue": "#1B6CF2",  // Electric Blue - For vibrancy and high-tech feel
        "accent-magenta": "#D63384", // Soft Magenta - For lighting/highlights
        // Dark theme colors
        "bg-dark": "#0A0A0A",      // Midnight Black
        "bg-darker": "#0A0A0A",    // Matching bg-dark for consistent background
        "panel-bg": "rgba(31, 31, 31, 0.7)", // Charcoal Gray with transparency
        "border-subtle": "rgba(255, 255, 255, 0.1)",
        "text-primary": "#FFFFFF", // White - For bold headlines
        "text-secondary": "rgba(255, 255, 255, 0.7)",
      },
      fontFamily: {
        sans: ['Satoshi', 'sans-serif'],
      },
      boxShadow: {
        'glow': '0 0 20px rgba(144, 58, 231, 0.5)',
        'glow-accent': '0 0 15px rgba(144, 58, 231, 0.6)',
        'glow-blue': '0 0 15px rgba(27, 108, 242, 0.6)',
        'glow-white': '0 0 15px rgba(255, 255, 255, 0.2)',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'float-slow': 'float 15s ease-in-out infinite',
        'float-slow-reverse': 'floatReverse 18s ease-in-out infinite',
        'float-medium': 'float 10s ease-in-out infinite',
        'float-medium-reverse': 'floatReverse 12s ease-in-out infinite',
        'reveal': 'reveal 0.8s forwards',
        'scroll-bounce': 'scrollBounce 2s ease-in-out infinite',
        'wiggle': 'wiggle 4s ease-in-out infinite',
        'wiggle-delayed': 'wiggleDelayed 8s ease-in-out infinite',
        'shimmer': 'shimmer 4s linear infinite',
        'pop-in': 'popIn 0.4s forwards ease-out',
        'vine-growth': 'vineGrowth 2s forwards ease-out',
        'pulse-glow': 'pulseGlow 2s infinite ease-in-out',
        'fadeIn': 'fadeIn 0.5s ease-in forwards',
      },
      keyframes: {
        'float': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        'floatReverse': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(10px)' },
        },
        'reveal': {
          '0%': { transform: 'translateY(25px)', opacity: 0 },
          '100%': { transform: 'translateY(0)', opacity: 1 },
        },
        'scrollBounce': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(6px)' },
        },
        'wiggle': {
          '0%, 100%': { transform: 'rotate(-2deg)' },
          '50%': { transform: 'rotate(2deg)' },
        },
        'wiggleDelayed': {
          '0%, 20%, 100%': { transform: 'rotate(0deg)' },
          '33%': { transform: 'rotate(-1deg)' },
          '66%': { transform: 'rotate(1deg)' },
        },
        'shimmer': {
          '0%': { backgroundPosition: '0% 50%' },
          '100%': { backgroundPosition: '100% 50%' },
        },
        'popIn': {
          '0%': { transform: 'scale(0)', opacity: 0 },
          '80%': { transform: 'scale(1.1)' },
          '100%': { transform: 'scale(1)', opacity: 1 },
        },
        'vineGrowth': {
          '0%': { height: '0%', opacity: 0 },
          '100%': { height: '100%', opacity: 0.15 },
        },
        'pulseGlow': {
          '0%, 100%': { boxShadow: '0 0 15px rgba(144, 58, 231, 0.6)' },
          '50%': { boxShadow: '0 0 30px rgba(144, 58, 231, 0.9)' },
        },
        'fadeIn': {
          '0%': { opacity: 0, transform: 'translateY(10px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' },
        },
      },
      backdropFilter: {
        'none': 'none',
        'blur': 'blur(10px)',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      },
      dropShadow: {
        'glow': '0 0 8px rgba(144, 58, 231, 0.6)'
      },
      textShadow: {
        sm: '0 1px 2px var(--tw-shadow-color)',
        DEFAULT: '0 2px 4px var(--tw-shadow-color)',
        lg: '0 0px 16px var(--tw-shadow-color)',
      },
    },
  },
  plugins: [
    function ({ matchUtilities, theme }) {
      matchUtilities(
        {
          'text-shadow': (value) => ({
            textShadow: value,
          }),
        },
        { values: theme('textShadow') }
      )
    },
  ],
}; 