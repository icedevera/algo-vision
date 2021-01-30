import React from "react";

import Grid from "./Grid/Grid";
import ToolBar from "../../ToolBar/ToolBar";
import Fab from "@material-ui/core/Fab";
import { makeStyles } from "@material-ui/core/styles";
import { PlayArrow } from "@material-ui/icons";
import Dijkstra from "../../../Algorithms/Pathfinding/Dijkstra";
import { useTheme } from "@material-ui/core/styles";

interface IProps {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
  screenSize: { height: number; width: number };
}

type coordinates = {
  x: number;
  y: number;
};

const useStyles = makeStyles((theme) => ({
  runAlgorithm: {
    position: "absolute",
    bottom: "40px",
    right: "40px",
  },
  fab: {
    backgroundColor: theme.palette.warning.main,
  },
  play: {
    color: "white",
  },
}));

const Pathfinder: React.FC<IProps> = ({
  screenSize,
  isDarkMode,
  toggleDarkMode,
}) => {
  const theme = useTheme();
  const classes = useStyles();

  const [startNode, setStartNode] = React.useState<coordinates>({
    x: Math.round(screenSize.width / 22 / 3),
    y: Math.round(screenSize.height / 22 / 2.5),
  });

  const [endNode, setEndNode] = React.useState<coordinates>({
    x: Math.round(screenSize.width / 22 / 1.5),
    y: Math.round(screenSize.height / 22 / 2.5),
  });

  const clearGrid = () => {
    let analyzing = document.getElementsByClassName("analyzing");
    let shortestPath = document.getElementsByClassName("shortest-path");
    while (analyzing.length)
      analyzing[0].className = analyzing[0].className.replace(
        /\banalyzing\b/g,
        `${theme.palette.type}-node`
      );
    while (shortestPath.length)
      shortestPath[0].className = shortestPath[0].className.replace(
        /\bshortest-path\b/g,
        `${theme.palette.type}-node`
      );
    //@ts-ignore
    document.getElementById(`${startNode.x}-${startNode.y}`).className =
      "cell-node green";
    //@ts-ignore
    document.getElementById(`${endNode.x}-${endNode.y}`).className =
      "cell-node red";
  };

  const resetGrid = () => {
    if (
      startNode.x !== Math.round(screenSize.width / 22 / 3) &&
      startNode.y !== Math.round(screenSize.height / 22 / 2.5)
    ) {
      //@ts-ignore
      document.getElementById(
        `${startNode.x}-${startNode.y}`
      ).className = `cell-node ${theme.palette.type}-node`;
    }

    if (
      endNode.x !== Math.round(screenSize.width / 22 / 1.5) &&
      endNode.y !== Math.round(screenSize.height / 22 / 2.5)
    ) {
      //@ts-ignore
      document.getElementById(
        `${endNode.x}-${endNode.y}`
      ).className = `cell-node ${theme.palette.type}-node`;
    }

    setStartNode({
      x: Math.round(screenSize.width / 22 / 3),
      y: Math.round(screenSize.height / 22 / 2.5),
    });
    setEndNode({
      x: Math.round(screenSize.width / 22 / 1.5),
      y: Math.round(screenSize.height / 22 / 2.5),
    });
  };

  const runAlgorithm = () => {
    Dijkstra({
      screenSize,
      startNode,
      endNode,
    });
  };

  return (
    <>
      <ToolBar
        isDarkMode={isDarkMode}
        toggleDarkMode={toggleDarkMode}
        resetGrid={resetGrid}
        clearGrid={clearGrid}
      />
      <div>
        <Grid
          screenSize={screenSize}
          startNode={startNode}
          endNode={endNode}
          setStartNode={setStartNode}
          setEndNode={setEndNode}
        />
        <div className={classes.runAlgorithm}>
          <Fab onClick={runAlgorithm} className={classes.fab}>
            <PlayArrow className={classes.play} />
          </Fab>
        </div>
      </div>
    </>
  );
};

export default Pathfinder;
