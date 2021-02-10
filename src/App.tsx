import React from "react";
import "./App.css";
import Visualizer from "./Components/Visualizer/Visualizer";
import { Grid, Paper } from "@material-ui/core";
import { ThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import "@fontsource/roboto";

const App = () => {
  const [darkMode, setDarkMode] = React.useState<boolean>(true);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const theme = createMuiTheme({
    palette: {
      type: darkMode ? "dark" : "light",
    },
    breakpoints: {
      values: {
        xs: 400,
        sm: 600,
        md: 960,
        lg: 1500,
        xl: 1920,
      },
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <Paper  style={{ height: "100vh" }} square>
        <Grid container direction="column">
          <Visualizer isDarkMode={darkMode} toggleDarkMode={toggleDarkMode} />
        </Grid>
      </Paper>
    </ThemeProvider>
  );
};

export default App;
