import { createMuiTheme } from '@material-ui/core/styles'

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#1B1F23',
    },
    secondary: {
      light: '#c8e1ff',
      main: '#2288FF',
    },
    error: {
      main: '#bf0000',
    },
    background: {
      default: '#fff',
    },
  },
})

export default theme
