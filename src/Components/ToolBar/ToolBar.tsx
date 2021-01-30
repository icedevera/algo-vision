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
import { Switch } from "@material-ui/core";
import { Refresh } from "@material-ui/icons";
import Button from "@material-ui/core/Button";

interface IProps {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
  refresh: () => void;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    title: {
      flexGrow: 1,
      color: theme.palette.type === "dark" ? "rgba(0, 0, 0, 0.87)" : "#fff",
    },
    text: {
      color: theme.palette.type === "dark" ? "rgba(0, 0, 0, 0.87)" : "#fff",
    },
    appBar: {
      backgroundColor: theme.palette.type === "dark" ? "#90caf9" : "#1976d2",
    },
  })
);

const ToolBar: React.FC<IProps> = ({ isDarkMode, toggleDarkMode, refresh }) => {
  const theme = useTheme();
  const classes = useStyles(theme);

  return (
    <div className={classes.root}>
      <AppBar position="static" className={classes.appBar}>
        <Toolbar>
          <div className="app-bar">
            <Typography variant="h6" className={classes.title}>
              Algorithm Visualizer
            </Typography>

            <button onClick={refresh} className="refresh-algorithm">
              <Refresh
                fontSize="large"
                style={{ color: isDarkMode ? "#f50057" : "white" }}
              />
            </button>

            <div className="dark-mode-switch">
              <Typography className={classes.text}>Dark Mode</Typography>
              <Switch checked={isDarkMode} onChange={toggleDarkMode} />
            </div>
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default ToolBar;
