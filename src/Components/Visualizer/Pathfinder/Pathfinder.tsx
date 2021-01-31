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

const Pathfinder: React.FC<IProps> = React.memo(
  ({ screenSize, isDarkMode, toggleDarkMode }) => {
    const theme = useTheme();
    const classes = useStyles();

    const [gridSize, setGridSize] = React.useState<number>(40);

    const [startNode, setStartNode] = React.useState<coordinates>({
      x: Math.round(screenSize.width / (gridSize + 2) / 3),
      y: Math.round(screenSize.height / (gridSize + 2) / 2.5),
    });

    const [endNode, setEndNode] = React.useState<coordinates>({
      x: Math.round(screenSize.width / (gridSize + 2) / 1.5),
      y: Math.round(screenSize.height / (gridSize + 2) / 2.5),
    });

    const [addingBarriers, setAddingBarriers] = React.useState<boolean>(false);
    const [barriers, setBarriers] = React.useState<string[]>([]);

    React.useEffect(() => {
      console.log(barriers);
    }, [barriers]);

    const toggleAddingBarriers = () => [setAddingBarriers(!addingBarriers)];

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

    const clearBarriers = () => {
      let barrierNodes = document.getElementsByClassName("barrier-node");
      while (barrierNodes.length)
        barrierNodes[0].className = barrierNodes[0].className.replace(
          /\bbarrier-node\b/g,
          `${theme.palette.type}-node`
        );
      setBarriers([]);
    };

    const resetGrid = () => {
      clearGrid();
      if (
        startNode.x !== Math.round(screenSize.width / (gridSize + 2) / 3) &&
        startNode.y !== Math.round(screenSize.height / (gridSize + 2) / 2.5)
      ) {
        //@ts-ignore
        document.getElementById(
          `${startNode.x}-${startNode.y}`
        ).className = `cell-node ${theme.palette.type}-node`;
      }

      if (
        endNode.x !== Math.round(screenSize.width / (gridSize + 2)/ 1.5) &&
        endNode.y !== Math.round(screenSize.height / (gridSize + 2) / 2.5)
      ) {
        //@ts-ignore
        document.getElementById(
          `${endNode.x}-${endNode.y}`
        ).className = `cell-node ${theme.palette.type}-node`;
      }

      setStartNode({
        x: Math.round(screenSize.width / (gridSize + 2) / 3),
        y: Math.round(screenSize.height / (gridSize + 2) / 2.5),
      });
      setEndNode({
        x: Math.round(screenSize.width / (gridSize + 2) / 1.5),
        y: Math.round(screenSize.height / (gridSize + 2) / 2.5),
      });
    };

    const cleanGrid = () => {
      clearGrid();
      clearBarriers();
    };

    const runAlgorithm = () => {
      clearGrid();
      Dijkstra({
        screenSize,
        startNode,
        endNode,
        barriers,
        gridSize
      });
    };

    const onGridSizeCommitted = (event: object, value: number) => {
      setGridSize(value);
      resetGrid()
    };

    return (
      <>
        <ToolBar
          isDarkMode={isDarkMode}
          toggleDarkMode={toggleDarkMode}
          resetGrid={resetGrid}
          cleanGrid={cleanGrid}
          toggleAddingBarriers={toggleAddingBarriers}
          addingBarriers={addingBarriers}
          onGridSizeCommitted={onGridSizeCommitted}
        />
        <div>
          <Grid
            gridSize={gridSize}
            screenSize={screenSize}
            startNode={startNode}
            endNode={endNode}
            setStartNode={setStartNode}
            setEndNode={setEndNode}
            setBarriers={setBarriers}
            addingBarriers={addingBarriers}
          />
          <div className={classes.runAlgorithm}>
            <Fab onClick={runAlgorithm} className={classes.fab}>
              <PlayArrow className={classes.play} />
            </Fab>
          </div>
        </div>
      </>
    );
  }
);

export default Pathfinder;
