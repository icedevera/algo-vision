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
import { Brightness4, Brightness7 } from "@material-ui/icons";
import Button from "@material-ui/core/Button";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";

interface IProps {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
  cleanGrid: () => void;
  resetGrid: () => void;
  onGridSizeCommitted: (event: object, value: number) => void;
  gridSize: number;
  setAnimationSpeed: React.Dispatch<any>;
  animationSpeed: number;
  clearAnalysis: () => void;
  setMaze: React.Dispatch<any>;
  maze: "none" | "recursive" | "recursive horizontal" | "recursive vertical";
  handleSpeedChange: (event: React.ChangeEvent<{ value: unknown }>) => void;
  handleMazeChange: (event: React.ChangeEvent<{ value: unknown }>) => void;
  isAnalyzing: boolean;
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
    setSpeed: {
      minWidth: 150,
      color: "white",
      "&:before": {
        borderColor:
          theme.palette.type === "dark" ? "white" : theme.palette.warning.main,
      },
      "&:after": {
        borderColor:
          theme.palette.type === "dark" ? "white" : theme.palette.warning.main,
      },
    },
    setSpeedIcon: {
      fill:
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
    clearAnalysis,
    onGridSizeCommitted,
    gridSize,
    animationSpeed,
    maze,
    handleSpeedChange,
    handleMazeChange,
    isAnalyzing,
  }) => {
    const theme = useTheme();
    const classes = useStyles(theme);

    const ToolSlider = withStyles({
      root: {
        color: theme.palette.warning.main,
      },
      thumb: {
        backgroundColor: "#fff",
      },
    })(Slider);

    return (
      <div className={classes.root}>
        <AppBar position="static" className={classes.appBar} color="default">
          <Toolbar>
            <div className="app-bar">
              <Typography variant="h6" className={classes.span}>
                Algorithm Visualizer
              </Typography>

              <div className="toolbar-speed">
                <InputLabel style={{ color: "#fff" }} id="set-maze">
                  Mazes & Patterns
                </InputLabel>
                <Select
                  className={classes.setSpeed}
                  labelId="set-maze"
                  value={maze}
                  onChange={handleMazeChange}
                  inputProps={{
                    classes: {
                      icon: classes.setSpeedIcon,
                    },
                  }}
                  disabled={isAnalyzing}
                >
                  <MenuItem value={"none"}>None</MenuItem>
                  <MenuItem value={"recursive"}>Recursive Division</MenuItem>
                  <MenuItem value={"recursive horizontal"}>
                    Recursive Division (horizontal)
                  </MenuItem>
                  <MenuItem value={"recursive vertical"}>
                    Recursive Division (vertical)
                  </MenuItem>
                </Select>
              </div>

              <div className="toolbar-slider">
                <Typography className={classes.span} id="discrete-slider">
                  Grid Size
                </Typography>
                <ToolSlider
                  key={`slider-gridSize`}
                  className={classes.slider}
                  defaultValue={gridSize}
                  aria-labelledby="discrete-slider"
                  valueLabelDisplay="auto"
                  step={10}
                  marks
                  min={10}
                  max={70}
                  //@ts-ignore
                  onChangeCommitted={onGridSizeCommitted}
                  style={{ width: "100px" }}
                  disabled={isAnalyzing}
                />
              </div>

              <div className="toolbar-speed">
                <InputLabel style={{ color: "#fff" }} id="set-speed">
                  Animation Speed
                </InputLabel>
                <Select
                  className={classes.setSpeed}
                  labelId="set-speed"
                  value={animationSpeed}
                  onChange={handleSpeedChange}
                  inputProps={{
                    classes: {
                      icon: classes.setSpeedIcon,
                    },
                  }}
                  disabled={isAnalyzing}
                >
                  <MenuItem value={100}>Snail</MenuItem>
                  <MenuItem value={40}>Slower</MenuItem>
                  <MenuItem value={30}>Slow</MenuItem>
                  <MenuItem value={20}>Normal</MenuItem>
                  <MenuItem value={10}>Fast</MenuItem>
                  <MenuItem value={5}>Faster</MenuItem>
                  <MenuItem value={1}>Lightning</MenuItem>
                </Select>
              </div>

              <Button
                className={classes.button}
                onClick={clearAnalysis}
                variant="contained"
                disabled={isAnalyzing}
              >
                Clear Analysis
              </Button>

              <Button
                className={classes.button}
                onClick={cleanGrid}
                variant="contained"
                disabled={isAnalyzing}
              >
                Clear All
              </Button>

              <Button
                className={classes.button}
                onClick={resetGrid}
                variant="contained"
                disabled={isAnalyzing}
              >
                Reset
              </Button>

              <button
                onClick={toggleDarkMode}
                className="light-switch"
                disabled={isAnalyzing}
              >
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
