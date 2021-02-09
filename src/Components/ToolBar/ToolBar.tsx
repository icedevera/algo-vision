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
import ButtonGroup from "@material-ui/core/ButtonGroup";

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
  maze:
    | "none"
    | "recursive"
    | "recursive horizontal"
    | "recursive vertical"
    | "spiral"
    | "random barriers"
    | "random weights";
  handleSpeedChange: (event: React.ChangeEvent<{ value: unknown }>) => void;
  handleMazeChange: (event: React.ChangeEvent<{ value: unknown }>) => void;
  isAnalyzing: boolean;
  algorithm: "aStar" | "dijkstra" | "greedy" | "breadth" | "depth";
  handleAlgoChange: (event: React.ChangeEvent<{ value: unknown }>) => void;
  handleLeftClickState: (event: React.ChangeEvent<{ value: unknown }>) => void;
  leftClickState: "barriers" | "weights";
  weightSize: number;
  onWeightSizeChange: (event: object, value: number) => void;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    title: {
      fontWeight: 900,
      color: "#fff",
    },
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
      "&:hover": {
        color:
          theme.palette.type === "dark" ? "white" : theme.palette.warning.main,
        backgroundColor:
          theme.palette.type === "dark" ? theme.palette.warning.main : "white",
      },
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
    algorithm,
    handleAlgoChange,
    handleLeftClickState,
    leftClickState,
    weightSize,
    onWeightSizeChange,
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
              <Typography variant="h5" className={classes.title}>
                ALGO VISION
              </Typography>

              <div className="toolbar-speed">
                <InputLabel style={{ color: "#fff" }} id="set-algo">
                  Algorithm
                </InputLabel>
                <Select
                  className={classes.setSpeed}
                  labelId="set-algo"
                  value={algorithm}
                  onChange={handleAlgoChange}
                  inputProps={{
                    classes: {
                      icon: classes.setSpeedIcon,
                    },
                  }}
                  disabled={isAnalyzing}
                >
                  <MenuItem value={"aStar"}>A* Search</MenuItem>
                  <MenuItem value={"dijkstra"}>Dijkstra's Algorithm</MenuItem>
                  <MenuItem value={"greedy"}>Greedy Best-first Search</MenuItem>
                  <MenuItem value={"breadth"}>Breadth-first Search</MenuItem>
                  <MenuItem value={"depth"}>Depth-first Search</MenuItem>
                </Select>
              </div>

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
                  <MenuItem value={"spiral"}>Spiral</MenuItem>
                  <MenuItem
                    disabled={algorithm === "breadth" || algorithm === "depth"}
                    value={"random barriers"}
                  >
                    Random Barriers
                  </MenuItem>
                  <MenuItem value={"random weights"}>Random Weights</MenuItem>
                </Select>
              </div>

              <div className="left-click-state">
                <InputLabel style={{ color: "#fff" }} id="set-maze">
                  Left Click Action
                </InputLabel>
                <Select
                  className={classes.setSpeed}
                  labelId="set-maze"
                  value={leftClickState}
                  onChange={handleLeftClickState}
                  inputProps={{
                    classes: {
                      icon: classes.setSpeedIcon,
                    },
                  }}
                  disabled={isAnalyzing}
                >
                  <MenuItem value={"barriers"}>Barriers</MenuItem>
                  <MenuItem
                    disabled={algorithm === "breadth" || algorithm === "depth"}
                    value={"weights"}
                  >
                    Weights
                  </MenuItem>
                </Select>
              </div>

              {leftClickState === "weights" &&
              algorithm !== "breadth" &&
              algorithm !== "depth" ? (
                <div className="toolbar-slider">
                  <Typography className={classes.span} id="discrete-slider">
                    Weight Size
                  </Typography>
                  <ToolSlider
                    key={`slider-gridSize`}
                    className={classes.slider}
                    defaultValue={weightSize}
                    aria-labelledby="discrete-slider"
                    valueLabelDisplay="auto"
                    step={1}
                    marks
                    min={1}
                    max={100}
                    //@ts-ignore
                    onChangeCommitted={onWeightSizeChange}
                    style={{ width: "100px" }}
                    disabled={isAnalyzing}
                  />
                </div>
              ) : null}

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
                  step={5}
                  marks
                  min={5}
                  max={90}
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
                  <MenuItem value={60}>Slower</MenuItem>
                  <MenuItem value={30}>Slow</MenuItem>
                  <MenuItem value={15}>Normal</MenuItem>
                  <MenuItem value={8}>Fast</MenuItem>
                  <MenuItem value={2}>Faster</MenuItem>
                  <MenuItem value={0}>Lightning</MenuItem>
                </Select>
              </div>

              <ButtonGroup
                variant="contained"
                color="primary"
                aria-label="contained primary button group"
              >
                <Button
                  className={classes.button}
                  onClick={clearAnalysis}
                  disabled={isAnalyzing}
                >
                  Clear Analysis
                </Button>
                <Button
                  className={classes.button}
                  onClick={cleanGrid}
                  disabled={isAnalyzing}
                >
                  Clear All
                </Button>

                <Button
                  className={classes.button}
                  onClick={resetGrid}
                  disabled={isAnalyzing}
                >
                  Reset
                </Button>
              </ButtonGroup>

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
