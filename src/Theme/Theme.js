import { createTheme } from "@mui/material";
import { green, purple } from "@mui/material/colors";

export const theme = createTheme({
    typography: {
        fontFamily: [
         'Montserrat',
          'sans-serif',
          
        ].join(','),
    },
})

export const darkTheme = createTheme({
    palette: {
        mode: 'dark',
        
      },
})