import React from "react";
import "./toolbar.css";
import {
  createStyles,
  makeStyles,
  Theme,
  useTheme,
  withStyles,
} from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Slider from "@material-ui/core/Slider";
import Switch from "@material-ui/core/Switch";
import { Brightness4, Brightness7 } from "@material-ui/icons";
import Button from "@material-ui/core/Button";

interface IProps {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
  cleanGrid: () => void;
  resetGrid: () => void;
  toggleAddingBarriers: () => void;
  addingBarriers: boolean;
  onGridSizeCommitted: (event: object, value: number) => void;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    span: {
      color: "#fff",
    },
    text: {
      color: theme.palette.type === "dark" ? "rgba(0, 0, 0, 0.87)" : "#fff",
    },
    appBar: {
      backgroundColor:
        theme.palette.type === "dark"
          ? theme.palette.background.default
          : "#1976d2",
    },
    button: {
      color:
        theme.palette.type === "dark"
          ? theme.palette.background.default
          : "white",
      backgroundColor:
        theme.palette.type === "dark" ? "white" : theme.palette.warning.main,
    },

    slider: {
      color:
        theme.palette.type === "dark" ? "white" : theme.palette.warning.main,
    },
    darkSwitch: {
      color:
        theme.palette.type === "dark" ? "white" : theme.palette.warning.main,
    },
  })
);

const ToolBar: React.FC<IProps> = React.memo(
  ({
    isDarkMode,
    toggleDarkMode,
    resetGrid,
    cleanGrid,
    toggleAddingBarriers,
    addingBarriers,
    onGridSizeCommitted,
  }) => {
    const theme = useTheme();
    const classes = useStyles(theme);

    const PurpleSwitch = withStyles({
      switchBase: {
        color:
          theme.palette.type === "dark" ? "white" : theme.palette.warning.main,
        "&$checked": {
          color:
            theme.palette.type === "dark"
              ? "white"
              : theme.palette.warning.main,
        },
        "&$checked + $track": {
          backgroundColor: theme.palette.warning.main,
        },
      },
      checked: {},
      track: {},
    })(Switch);

    const ToolSlider = withStyles({
      root: {
        color: theme.palette.warning.main,
      },
      thumb: {
        backgroundColor: "#fff",
      },
      active: {},
    })(Slider);

    return (
      <div className={classes.root}>
        <AppBar position="static" className={classes.appBar} color="default">
          <Toolbar>
            <div className="app-bar">
              <Typography variant="h6" className={classes.span}>
                Algorithm Visualizer
              </Typography>

              <div className="toolbar-slider">
                <Typography className={classes.span} id="discrete-slider">
                  Grid Size
                </Typography>
                <ToolSlider
                  className={classes.slider}
                  defaultValue={40}
                  aria-labelledby="discrete-slider"
                  valueLabelDisplay="auto"
                  step={10}
                  marks
                  min={10}
                  max={70}
                  //@ts-ignore
                  onChangeCommitted={onGridSizeCommitted}
                  style={{ width: "100px" }}
                />
              </div>

              <div className="toolbar-toggle-barriers">
                <Typography className={classes.span} id="barrier-switch">
                  Edit Barriers
                </Typography>
                <PurpleSwitch
                  checked={addingBarriers}
                  onChange={toggleAddingBarriers}
                  name="add barriers"
                  aria-labelledby="barrier-switch"
                />
              </div>

              <Button
                className={classes.button}
                onClick={cleanGrid}
                variant="contained"
              >
                Clear
              </Button>

              <Button
                className={classes.button}
                onClick={resetGrid}
                variant="contained"
              >
                Reset
              </Button>

              <button onClick={toggleDarkMode} className="light-switch">
                {isDarkMode ? (
                  <Brightness7
                    fontSize="large"
                    color="inherit"
                    className={classes.darkSwitch}
                  />
                ) : (
                  <Brightness4
                    fontSize="large"
                    color="primary"
                    className={classes.darkSwitch}
                  />
                )}
              </button>
            </div>
          </Toolbar>
        </AppBar>
      </div>
    );
  }
);

export default ToolBar;
