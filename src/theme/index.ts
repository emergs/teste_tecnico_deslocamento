import { createTheme } from "@mui/material";
import { red, yellow } from "@mui/material/colors";

export const MainTheme = createTheme({
  palette: {
    primary: {
      main: red[600],
      dark: red[800],
      light: red[500],
      contrastText: "#fff"
    },
    secondary: {
      main: yellow[600],
      dark: yellow[800],
      light: yellow[500],
      contrastText: "#fff"
    },
    background: {
      default: "#f8f8f8",
      paper: "#fff"
    }
  }
})