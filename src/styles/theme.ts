import { blue, deepPurple, teal, }from '@mui/material/colors'
import { createTheme } from '@mui/material/styles'



// A custom theme for this app
const theme = createTheme({
  palette: {
    primary: {
      main: deepPurple.A100,
    },
    secondary: {
      main: teal[400],
    },

    common: {
      white: '#E5E5E5',
    },
    
    error: {
      main: blue.A400,
    },
    warning: {
      main: blue.A100,
    },
    background: {
      default: '#fff',
    },
  },

  shape: {
    borderRadius: 8,
  },
})


export default theme
