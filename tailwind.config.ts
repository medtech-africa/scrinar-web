import type { Config } from 'tailwindcss'
import plugin from 'tailwindcss/plugin'

const config: Config = {
  darkMode: ['class'],
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px',
      },
    },
    fontFamily: {
      sans: ['Aeonik', 'sans-serif'],
    },
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      colors: {
        border: 'var(--border)',
        input: 'var(--input)',
        ring: 'var(--ring)',
        background: '#F9FAFB',
        primary: {
          DEFAULT: '#E31B23',
          // foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: '#F7CC3B',
          // foreground: "hsl(var(--secondary-foreground))",
        },
        lust: {
          900: '#E31B23',
          800: '#E63239',
          700: '#E9494F',
          600: '#EB5F65',
          500: '#EE767B',
          400: '#F18D91',
          300: '#F4A4A7',
          200: '#F7BBBD',
          100: '#F9D1D3',
          50: '#FCE8E9',
        },
        sunglow: {
          900: '#F7CC3B',
          800: '#F8D14F',
          700: '#F9D662',
          600: '#F9DB76',
          500: '#FAE089',
          400: '#FBE69D',
          300: '#FCEBB1',
          200: '#FDF0C4',
          100: '#FDF5D8',
          50: '#FEFAEB',
        },
        grey: {
          900: '#101828',
          800: '#1D2939',
          700: '#344054',
          600: '#475467',
          500: '#667085',
          400: '#98A2B3',
          300: '#D0D5DD',
          200: '#E4E7EC',
          100: '#F2F4F7',
          50: '#F9FAFB',
        },
        'spanish-violet': {
          900: '#42307D',
          800: '#55458A',
          700: '#685997',
          600: '#7B6EA4',
          500: '#8E83B1',
          400: '#A198BE',
          300: '#B3ACCB',
          200: '#C6C1D8',
          100: '#D9D6E5',
          50: '#ECEAF2',
        },

        iris: {
          900: '#6941C6',
          800: '#7854CC',
          700: '#8767D1',
          600: '#967AD7',
          500: '#A58DDD',
          400: '#B4A0E3',
          300: '#C3B3E8',
          200: '#D2C6EE',
          100: '#E1D9F4',
          50: '#F0ECF9',
        },
        'carmine-pink-red': {
          900: '#F04438',
          800: '#F2574C',
          700: '#F36960',
          600: '#F57C74',
          500: '#F68F88',
          400: '#F8A29C',
          300: '#F9B4AF',
          200: '#FBC7C3',
          100: '#FCDAD7',
          50: '#FEECEB',
        },
        orange: {
          900: '#FB6514',
          800: '#FB742C',
          700: '#FC8443',
          600: '#FC935B',
          500: '#FDA372',
          400: '#FDB28A',
          300: '#FDC1A1',
          200: '#FED1B9',
          100: '#FEE0D0',
          50: ' #FFF0E8',
        },
        'yellow-orange': {
          900: '#F79009',
          800: '#F89B22',
          700: '#F9A63A',
          600: '#F9B153',
          500: '#FABC6B',
          400: '#FBC884',
          300: '#FCD39D',
          200: '#FDDEB5',
          100: '#FDE9CE',
          50: '#FEF4E6',
        },
        blue: {
          900: '#1570EF',
          800: '#2C7EF1',
          700: '#448DF2',
          600: '#5B9BF4',
          500: '#73A9F5',
          400: '#8AB8F7',
          300: '#A1C6F9',
          200: '#B9D4FA',
          100: '#D0E2FC',
          50: '#E8F1FD',
        },
        green: {
          900: '#12B76A',
          800: '#2ABE79',
          700: '#41C588',
          600: '#59CD97',
          500: '#71D4A6',
          400: '#89DBB5',
          300: '#A0E2C3',
          200: '#B8E9D2',
          100: '#D0F1E1',
          50: '#E7F8F0',
        },
        error: {
          500: '#F04438',
        },
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
      },
      spacing: {
        1.1: '0.3125rem',
        1.2: '0.375rem',
        2.2: '0.625rem',
      },
    },
  },
  plugins: [
    require('tailwindcss-animate'),
    plugin(function ({ theme, addComponents }) {
      const focusOutset = {
        'box-shadow': `0px 0px 0px 4px ${theme(
          'colors.lust[50]'
        )}, 0px 1px 2px 0px rgba(16, 24, 40, 0.05)`,
      }

      addComponents({
        '.utils-focus-outset': {
          'transition-property': 'all',
          'transition-timing-function': 'cubic-bezier(0.4, 0, 0.2, 1)',
          'transition-duration': '200ms',
          outline: '0',
          'box-shadow': '0px 1px 2px 0px rgba(16, 24, 40, 0.05)',
          '&:focus': focusOutset,
        },
        '.sidebar-shadow': {
          'box-shadow': '0px 0px 37px 0px rgba(16, 24, 40, 0.02)',
        },
        '@media (max-width: 1130px)': {
          '.dashboard-home-cards-container': {
            'grid-template-columns': 'repeat(2, minmax(0, 1fr))',
          },
        },
      })
    }),
  ],
}
export default config
