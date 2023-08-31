import twConfig from '../../tailwind.config'
type Colors = {
  [key: string]:
    | string
    | {
        DEFAULT: string
        900: string
        800: string
        700: string
        600: string
        500: string
        400: string
        300: string
        200: string
        100: string
        50: string
      }
}

const colors = twConfig.theme?.extend?.colors as Colors

export default colors
