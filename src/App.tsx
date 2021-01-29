import React from "react";
import "./App.css";
import Visualizer from "./Components/Visualizer/Visualizer";
import { Grid, Typography, Paper } from "@material-ui/core";
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
