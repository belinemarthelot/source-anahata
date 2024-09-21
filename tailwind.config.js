module.exports = {
    mode: 'jit',
    purge: ['./public/**/*.html', './src/**/*.{astro,js,jsx,ts,tsx,vue}'],
    theme: {
      extend: {
        colors: {
          transparent: 'transparent',
          current: 'currentColor',
          'primary': 'hsl(156.7, 47.47%, 57.45%)',
          'primary-alt': 'hsl(156.7, 47.47%, 47.45%)',
          'background': 'hsl(0, 0%, 100%)',
          'background-alt': 'hsl(0, 0%, 90%)',
        },
        fontFamily: {
          'Inter': ['Inter', 'sans-serif']
        },
        translate: {
          'none': '-100%'
        }

      }
      },
};