import { createTheme } from "@mui/material/styles";
import green from '@mui/material/colors/green';
// import green from '@mui/material/colors/green';
let theme = createTheme({
  palette: {
    primary: {
      main: green[600],
    },
    secondary: {
      main: "#edf2ff",
    },
  },
});

export default theme;