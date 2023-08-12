import { createTheme } from "@mui/material";
import variables from '@/app/variables.module.scss'


const calcFontSize = (expectedBodyFontSize: number)=>{
  return (12/16)*expectedBodyFontSize
}

const theme = createTheme({
    palette: {
      primary: {
        main: variables.main
      },
      secondary: {
        main: variables.second
      }
    },
    typography: {
      fontFamily: '',
      fontSize: calcFontSize(Number(variables.littleFont)),
      button: {
        textTransform: 'none',
        fontWeight: 400,
      }
    },
    components: {
      MuiFormControlLabel: {
        styleOverrides: {
          label: {
            fontSize: Number(variables.smallFont),
          },
        },
      },
      MuiSlider: {
        styleOverrides: {
          thumb: {
            color: variables.main
          },
          track: {
            color: variables.main
          },
          rail: {
            color: variables.main
          },
        }
      }
    },
  })

export default theme
