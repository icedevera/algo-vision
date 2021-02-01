import React from "react";

import Grid from "./Grid/Grid";
import ToolBar from "../../ToolBar/ToolBar";
import Fab from "@material-ui/core/Fab";
import { makeStyles } from "@material-ui/core/styles";
import { PlayArrow } from "@material-ui/icons";
import Dijkstra from "../../../Algorithms/Pathfinding/Dijkstra";
import { useTheme } from "@material-ui/core/styles";
import {
  animateAlgorithm,
  showAlgorithm,
  showShortestPath,
} from "../../../Animation/Animate";

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

    const [animationSpeed, setAnimationSpeed] = React.useState<number>(20);

    const [quickAnalyze, setQuickAnalyze] = React.useState<boolean>(false);

    const [isAnalyzing, setIsAnalyzing] = React.useState<boolean>(false);

    const [startNode, setStartNode] = React.useState<coordinates>({
      x: Math.round(screenSize.width / (gridSize + 2) / 3),
      y: Math.round(screenSize.height / (gridSize + 2) / 2.5),
    });

    const [endNode, setEndNode] = React.useState<coordinates>({
      x: Math.round(screenSize.width / (gridSize + 2) / 1.5),
      y: Math.round(screenSize.height / (gridSize + 2) / 2.5),
    });

    const [barriers, setBarriers] = React.useState<string[]>([]);

    const clearAnalysis = () => {
      setQuickAnalyze(false);
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
      clearAnalysis();
      clearBarriers();
      if (
        startNode.x !== Math.round(screenSize.width / (gridSize + 2) / 3) ||
        startNode.y !== Math.round(screenSize.height / (gridSize + 2) / 2.5)
      ) {
        //@ts-ignore
        document.getElementById(
          `${startNode.x}-${startNode.y}`
        ).className = `cell-node ${theme.palette.type}-node`;
      }

      if (
        endNode.x !== Math.round(screenSize.width / (gridSize + 2) / 1.5) ||
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

    React.useEffect(() => {
      console.log(isAnalyzing);
    }, [isAnalyzing]);

    const cleanGrid = () => {
      clearAnalysis();
      clearBarriers();
    };

    const runAlgorithm = async () => {
      clearAnalysis();
      setIsAnalyzing(true);
      const results = await Dijkstra({
        screenSize,
        startNode,
        endNode,
        barriers,
        gridSize,
      });
      animateAlgorithm(
        //@ts-ignore
        results.analyzed,
        //@ts-ignore
        results.optimalPath,
        animationSpeed,
        startNode,
        endNode,
        setIsAnalyzing
      );

      setQuickAnalyze(true);
    };

    React.useEffect(() => {
      if (quickAnalyze) {
        const analyze = async () => {
          clearAnalysis();
          setQuickAnalyze(true);
          const results = await Dijkstra({
            screenSize,
            startNode,
            endNode,
            barriers,
            gridSize,
          });

          if (results) {
            showAlgorithm(results.analyzed, startNode, endNode);
            showShortestPath(results.optimalPath, startNode, endNode);
          }
        };

        analyze();
      }
      //eslint-disable-next-line
    }, [startNode, endNode]);

    const onGridSizeCommitted = (event: object, value: number) => {
      resetGrid();
      setGridSize(value);
      setStartNode({
        x: Math.round(screenSize.width / (value + 2) / 3),
        y: Math.round(screenSize.height / (value + 2) / 2.5),
      });
      setEndNode({
        x: Math.round(screenSize.width / (value + 2) / 1.5),
        y: Math.round(screenSize.height / (value + 2) / 2.5),
      });
    };

    return (
      <>
        <ToolBar
          isDarkMode={isDarkMode}
          toggleDarkMode={toggleDarkMode}
          resetGrid={resetGrid}
          clearAnalysis={clearAnalysis}
          cleanGrid={cleanGrid}
          onGridSizeCommitted={onGridSizeCommitted}
          gridSize={gridSize}
          animationSpeed={animationSpeed}
          setAnimationSpeed={setAnimationSpeed}
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
            quickAnalyze={quickAnalyze}
            isAnalyzing={isAnalyzing}
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
