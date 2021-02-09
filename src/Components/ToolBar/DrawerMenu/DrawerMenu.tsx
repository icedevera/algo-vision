import React from "react";
import {
  createStyles,
  makeStyles,
  Theme,
  useTheme,
  withStyles,
} from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Slider from "@material-ui/core/Slider";
import { Brightness4, Brightness7 } from "@material-ui/icons";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import Button from '@material-ui/core/Button';

interface IProps {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
  onGridSizeCommitted: (event: object, value: number) => void;
  gridSize: number;
  animationSpeed: number;
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
  randomizeStartEndNodes: () => void;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    span: {
      color: "#fff",
    },
    text: {
      color: theme.palette.type === "dark" ? "rgba(0, 0, 0, 0.87)" : "#fff",
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
    menuButton: {
      marginRight: theme.spacing(2),
    },
    drawerMenu: {
      height: "100%",
      backgroundColor:
        theme.palette.type === "dark"
          ? theme.palette.background.default
          : "#1976d2",
      display: "flex",
      flexFlow: "column nowrap",
      alignItems: "center",
      width: "260px",
      padding: "15px 0",
    },
    list: {
      display: "flex",
      flexFlow: "column nowrap",
      justifyContent: "space-between",
      alignItems: "flex-end",
      width: "80%",
      height: "60%",
    },
    listItem: {
      margin: "10px 0",
    },
    button: {
      
    }
  })
);

const DrawerMenu: React.FC<IProps> = ({
  isDarkMode,
  toggleDarkMode,
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
  randomizeStartEndNodes
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
    <>
      <div className={classes.drawerMenu}>
        <div className={classes.list}>
          <Divider />

          <List className={classes.listItem}>
            <ListItem
              button
              onClick={toggleDarkMode}
              className="light-switch-drawer"
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
            </ListItem>
          </List>

          <Divider />

          <List className={classes.listItem}>
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
          </List>

          <Divider />

          <List className={classes.listItem}>
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
          </List>

          <Divider />

          <List className={classes.listItem}>
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
          </List>

          <Divider />

          {leftClickState === "weights" &&
          algorithm !== "breadth" &&
          algorithm !== "depth" ? (
            <>
              <List className={classes.listItem}>
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
              </List>
              <Divider />
            </>
          ) : null}

          <List className={classes.listItem}>
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
          </List>

          <Divider />
          <List className={classes.listItem}>
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
          </List>

          <Button variant="contained" className={classes.button} onClick={randomizeStartEndNodes} >
            Randomize Target Nodes
          </Button>

          <Divider />
        </div>
      </div>
    </>
  );
};

export default DrawerMenu;
