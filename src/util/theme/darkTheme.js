import { createTheme } from "@mui/material";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      light: "#D8B05A",
      main: "#D0A039",
      dark: "#B68A2B",
    },
    secondary: {
      light: "#B377CF",
      main: "#A359C5",
      dark: "#9040B5",
      contrastText: "#000",
    },

    mastermind: {
      0: {
        main: "rgba(255,255,255,.1)",
        contrastText: "#000",
      },
      1: {
        main: "#77AECF",
        contrastText: "#000",
      },
      2: {
        main: "#896FD4",
        contrastText: "#000",
      },
      3: {
        main: "#CF77AE",
        contrastText: "#000",
      },
      4: {
        main: "#D4896F",
        contrastText: "#000",
      },
      5: {
        main: "#AECF77",
        contrastText: "#000",
      },
      6: {
        main: "#6FD489",
        contrastText: "#000",
      },
    },
  },
});

export default darkTheme;
