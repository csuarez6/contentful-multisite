/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    screens: {
      'xxs': '375px',
      'xs': '480px',
      'sm': '640px',
      'md': '768px',
      '2md': '960px',
      'lg': '1024px',
      '2lg': '1120px',
      'xl': '1280px',
      '2xl': '1440px',
      'max-xxs': { 'max': '374px' },
      'max-xs': { 'max': '479px' },
      'max-sm': { 'max': '639px' },
      'max-md': { 'max': '767px' },
      'max-2md': { 'max': '959px' },
      'max-lg': { 'max': '1023px' },
      'max-2lg': { 'max': '1119px' },
      'max-xl': { 'max': '1279px' },
      'max-2xl': { 'max': '1439px' },
    },
    extend: {
      backgroundImage: {
        'gradient-blue': 'linear-gradient(121.27deg, #69D1F6 0%, #65BADF 21.35%, #2E7097 47.4%, #035177 69.79%, #52A9C5 98.96%)',
        'gradient-1': 'radial-gradient(148.75% 692.85% at -9.09% -12.96%, #191580 0%, #035177 32.03%, #113455 68.96%, #000000 100%)',
        'gradient-2': 'linear-gradient(98.84deg, #FFFFFF 53.13%, #F6CC5C 70.64%, #0D2D4F 97.56%)',
        'gradient-3': 'linear-gradient(98.84deg, #FFFFFF 46.88%, #ACE1F3 70.31%, #113455 90.62%)',
        'gradient-4': 'linear-gradient(98.84deg, #FFFFFF 53.65%, #5F3DC2 78.65%, #333BBD 94.79%)',
        'gradient-5': 'radial-gradient(148.75% 692.85% at -9.09% -12.96%, #191580 0%, #035177 32.03%, #52A9C5 68.96%, #69D1F6 100%)',
        'gradient-6': 'linear-gradient(90deg, #113455 0%, #69D1F6 127.33%)',
        'gradient-7': 'linear-gradient(265.61deg, #69D1F6 -8.27%, #035177 29.91%, #035177 104.96%)',
        'gradient-8': 'linear-gradient(89.35deg, #52A9C5 -4.21%, #035177 19.86%, #035177 61.55%, #69D1F6 103.28%)',
        'gradient-blue-dark': 'linear-gradient(121.27deg, #191580 0%, #035177 32.03%, #113455 68.96%, #000000 100%)',
        'gradient-footer-mobile': 'radial-gradient(148.75% 692.85% at -9.09% -12.96%, #191580 0%, #035177 32.03%, #113455 68.96%, #000000 100%)'
      },
      fontFamily: {
        'mulish': ['Mulish', 'sans-serif'],
      },
      colors: {
        blue: {
          dark: {
            DEFAULT: "#113455",
            8: "#00182B",
            90: "#EFF3FF"
          }
        },
        grey: {
          10: "#231400",
          30: "#594F40",
          60: "#ADABA5",
          80: "#DBDAD8",
          90: "#F2F2F2",
          100: "#F7F7F7",
          120: "#EDEDED"
        },
        neutral: {
          10: "#001924",
          20: "#1C394A",
          30: "#36556C",
          70: "#A6BCD1",
          80: "#CAD8E8",
          90: "#EDF5FF"
        },
        lucuma: {
          DEFAULT: "#F6CC5C",
          60: "#DFB75E",
          80: "#FFF5BD"
        },
        category: {
          blue: {
            DEFAULT: "#332AA2",
            light: {
              DEFAULT: "#919DD4",
              40: "#495986",
              90: "#F2F3FF"
            },
            dark: {
              DEFAULT: "#035177"
            },
            20: "#191580",
            70: "#A7A2DA"
          },
          green: {
            DEFAULT: "#2E6152",
            10: "#173E31",
            60: "#8DBFB3"
          },
          orange: {
            light: {
              DEFAULT: "#FF8E67",
              40: "#9C4734",
              90: "#FFF1E8"
            }
          },
          "sky-blue": {
            DEFAULT: "#69D1F6",
            50: "#52A9C5",
            90: "#E9F6FF"
          }
        },
        states: {
          success: "#38A169",
          info: "#3182CE",
          warning: "#DD6B20",
          error: {
            DEFAULT: "#E53E3E",
            txt: "#A42D30"
          }
        }
      },
      fontSize: {
        'size-p1': ['1.125rem', '1.8'],
        'size-p2': ['1rem', '1.8'],
        'size-p3': ['.875rem', '1.2'],
        'size-small': ['.75rem', '1.5'],
        'size-button': ['1rem', '1.6'],
        'size-subtitle1': ['1.125rem', '1.2'],
        'size-subtitle2': ['1rem', '1.8'],
        'size-subtitle3': ['.875rem', '1.8'],
        'size-span': ['.6rem', '1']
      }
    },
  },
  plugins: [
    function ({ addUtilities }) {
      const underlineUtilities = {};
      for (let index = 1; index < 5; index++) {
        const underlineFull = {
          backgroundImage: "linear-gradient(to right, currentColor, currentColor)",
          backgroundSize: `100% ${index}px`
        };

        underlineUtilities[`.underline-animated-${index}`] = {
          backgroundImage: "linear-gradient(to right, transparent, currentColor)",
          backgroundSize: `0px ${index}px`,
          backgroundPosition: "0 100%",
          backgroundRepeat: "no-repeat",
          transition: "background-size ease-in-out 0.5s",
          transitionDuration: "500ms",
          '&:hover': underlineFull,
        };
        underlineUtilities[`.underline-animated-full-${index}`] = {
          ...underlineUtilities[`.underline-animated-${index}`],
          ...underlineFull
        };
      }

      addUtilities(underlineUtilities);
    }
  ],
};