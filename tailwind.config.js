module.exports = {
  mode: 'jit',
  purge: [
    './public/**/*.html',
    './src/**/*.{js,jsx,ts,tsx,vue}',
  ],
  theme: {
    extend: {
      fontFamily: {
        nova: ['"Nova Oval"', 'system-ui'],
        puritan: ['"Puritan"', 'sans-serif'],
        orienta: ['"Orienta"', 'sans-serif'],
      },
      colors: {
        salmon: '#ebccc1',
        offWhite: '#FFFFF8',
        darkPink: '#BA7C7C',
        teal: '#9CCECF'
      },
      fontSize: {
        '84': '35px',
        '96': '96px',
      },
      textShadow: {
        'default': '2px 2px 4px rgba(0, 0, 0, 0.5)',
      },
    },
  },
  plugins: [
    function ({ addUtilities }) {
      addUtilities({
        '.text-shadow': {
          'text-shadow': '0px 2px 1px #708BA0',
        },
      });
    },
  ],
}
