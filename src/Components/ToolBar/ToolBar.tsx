import "./toolbar.css";
import {
  createStyles,
  makeStyles,
  Theme,
  useTheme,
} from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import {
  Refresh,
  Brightness4,
  Brightness7,
  BorderClear,
} from "@material-ui/icons";

interface IProps {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
  clearGrid: () => void;
  resetGrid: () => void;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    title: {
      color: theme.palette.type === "dark" ? "#fff" : "#fff",
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
    refresh: {
      color:
        theme.palette.type === "dark" ? "white" : theme.palette.warning.main,
    },
    darkSwitch: {
      color:
        theme.palette.type === "dark" ? "white" : theme.palette.warning.main,
    },
  })
);

const ToolBar: React.FC<IProps> = ({
  isDarkMode,
  toggleDarkMode,
  resetGrid,
  clearGrid,
}) => {
  const theme = useTheme();
  const classes = useStyles(theme);

  return (
    <div className={classes.root}>
      <AppBar position="static" className={classes.appBar} color="default">
        <Toolbar>
          <div className="app-bar">
            <Typography variant="h6" className={classes.title}>
              Algorithm Visualizer
            </Typography>
            <button onClick={clearGrid} className="refresh-algorithm">
              <BorderClear className={classes.refresh} fontSize="large" />
            </button>
            <button onClick={resetGrid} className="refresh-algorithm">
              <Refresh className={classes.refresh} fontSize="large" />
            </button>
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
};

export default ToolBar;
