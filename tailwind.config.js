module.exports = {
  content: ["./pages/**/*.tsx", "./src/**/*.tsx"],
  theme: {
      extend: {
          colors: {
              "primary-color": "var(--primary-color)",
              "primary-dark-color": "var(--primary-dark-color)",
              "primary-light-color": "var(--primary-light-color)",
              "primary-mix-color": "var(--primary-mix-color)",
              "primary-black": "var(--primary-black)",
              "accent-color": "var(--accent-color)",
              "accent-light-color": "var(--accent-light-color)",
              "accent-dark-color": "var(--accent-dark-color)",
              "accent-mix-color": "var(--accent-mix-color)",
              "secondary-color": "var(--secondary-color)",
              "bg-color": "var(--bg-color)",
              "cta-block-color": "var(--cta-block-color)",
              "card-block-color": "var(--card-block-color)",
              "descriptive-block-color": "var(--descriptive-block-color)",
              "txt-color": "var(--txt-color)",
              "error-color": "#E03131",
              "off-white": "#F4F6FF",
              "bg-white": "#FCFCFF",
              "pure-white": "#FFFFFF",
              "secondary-black": "#222222",
              "darker-grey": "#333333",
              "dark-grey": "#555555",
              "grey": "#C0C0C0",
              "light-grey": "#E1E1E1",
              "lighter-grey": "#F5F5F5",
              "whatsapp-green": "#128C7E",
              "telegram-blue": "#2AABEE",
              "calendar-blue": "#2A83F8",
          },
          fontFamily: {
              display: ["Poppins"],
              body: ["Poppins"],
          },
          transitionProperty: {
              'height': 'height',
          },
          animation: {
              gradient: 'gradient 10s ease infinite',
              spinfast: 'spin 0.6s linear infinite',
          },
          keyframes: {
              gradient: {
                '0%, 100%': { backgroundPosition: '0% 50%' },
                '50%': { backgroundPosition: '100% 50%' },
              }
          }  
      },
  },
  variants: {
      extend: {},
  },
  plugins: [require("@tailwindcss/forms"), require("tailwindcss-safe-area")],
};
