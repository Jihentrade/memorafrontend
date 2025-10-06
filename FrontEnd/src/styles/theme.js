import { createTheme, responsiveFontSizes } from "@mui/material";

let theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#597E52",
      contrastText: "rgb(30,30,30)",
    },
    secondary: {
      main: "#C6A969",
      contrastText: "#ffffff",
    },
  },
  typography: {
    fontFamily: "'Poppins', sans-serif",
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        "*::-webkit-scrollbar": {
          height: "10px",
          width: "12px",
          backgroundColor: "rgba(0, 24, 53, 0.5)",
        },
        "*::-webkit-scrollbar-track": {
          boxShadow: "inset 0 0 6px rgba(80, 80, 80, 0.1)",
        },
        "*::-webkit-scrollbar-thumb": {
          borderRadius: "5px",
          backgroundColor: "rgba(255, 255, 255, 0.5)",
        },
      },
    },
  },
});
theme = responsiveFontSizes(theme);
export default theme;
