/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
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
        'max-xxs': {'max': '374px'},
        'max-xs': {'max': '479px'},
        'max-sm': {'max': '639px'},
        'max-md': {'max': '767px'},
        'max-2md': {'max': '959px'},
        'max-lg': {'max': '1023px'},
        'max-2lg': {'max': '1119px'},
        'max-xl': {'max': '1279px'},
        'max-2xl': {'max': '1439px'},
      },
      backgroundImage: {
        'gradient-blue': 'linear-gradient(121.27deg, #69D1F6 0%, #65BADF 21.35%, #2E7097 47.4%, #035177 69.79%, #52A9C5 98.96%)',
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
        'size-subtitle3': ['.875rem', '1.8']
      }
    },
  },
  plugins: [],
};