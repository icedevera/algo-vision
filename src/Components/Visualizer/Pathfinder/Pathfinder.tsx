import React from "react";

import "./pathfinder.css";
import Grid from "./Grid/Grid";
import ToolBar from "../../ToolBar/ToolBar";
import Fab from "@material-ui/core/Fab";
import { makeStyles } from "@material-ui/core/styles";
import { PlayArrow } from "@material-ui/icons";
import Dijkstra from "../../../Algorithms/Pathfinding/Dijkstra";
import { useTheme } from "@material-ui/core/styles";
import {
  animateAlgorithm,
  animateMaze,
  animateRandomWeightMaze,
  showAlgorithm,
  showShortestPath,
} from "../../../Animation/Animate";
import { recursiveDivisionMaze } from "../../../Maze/RecursizeDivision";
import { RandomMaze } from "../../../Maze/Random";
import { SpiralMaze } from "../../../Maze/Spiral";
import { aStarIsBorn } from "../../../Algorithms/Pathfinding/aStar";
import { GreedyBFS } from "../../../Algorithms/Pathfinding/GreedyBFS";
import { Breadth } from "../../../Algorithms/Pathfinding/Breadth";
import { Depth } from "../../../Algorithms/Pathfinding/Depth";
import Snackbar from "@material-ui/core/Snackbar";
import { IconButton } from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import Button from "@material-ui/core/Button";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import ShowChartIcon from "@material-ui/icons/ShowChart";
import ClearIcon from "@material-ui/icons/Clear";
import RefreshIcon from "@material-ui/icons/Refresh";

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
  clearButtons: {
    position: "absolute",
    bottom: "40px",
  },
}));

const Pathfinder: React.FC<IProps> = React.memo(
  ({ screenSize, isDarkMode, toggleDarkMode }) => {
    const mediaQuery = useMediaQuery("(max-width:550px)");
    const theme = useTheme();
    const classes = useStyles();

    const [gridSize, setGridSize] = React.useState<number>(40);

    const [animationSpeed, setAnimationSpeed] = React.useState<number>(15);

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

    const [weightSize, setWeightSize] = React.useState<number>(5);

    type Weights = {
      node: string;
      size: number;
    };

    const [weights, setWeights] = React.useState<Weights[]>([]);

    const [maze, setMaze] = React.useState<
      | "none"
      | "recursive"
      | "recursive horizontal"
      | "recursive vertical"
      | "spiral"
      | "random barriers"
      | "random weights"
    >("none");

    const [algorithm, setAlgorithm] = React.useState<
      "aStar" | "dijkstra" | "greedy" | "breadth" | "depth"
    >("dijkstra");

    const [openResults, setOpenResults] = React.useState<boolean>(false);

    const [algoDuration, setAlgoDuration] = React.useState<number>(0);
    const [algoAnalyzed, setAlgoAnalyzed] = React.useState<number>(0);
    const [algoDistance, setAlgoDistance] = React.useState<number>(0);

    const [leftClickState, setLeftClickState] = React.useState<
      "barriers" | "weights"
    >("barriers");

    React.useEffect(() => {
      if (algorithm === "breadth" || algorithm === "depth") {
        setLeftClickState("barriers");
        setWeights([]);
      }
    }, [algorithm]);

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
      setMaze("none");
      let barrierNodes = document.getElementsByClassName("barrier-node");
      while (barrierNodes.length)
        barrierNodes[0].className = barrierNodes[0].className.replace(
          /\bbarrier-node\b/g,
          `${theme.palette.type}-node`
        );
      setBarriers([]);
    };

    const clearWeights = () => {
      setWeights([]);
    };

    const resetGrid = () => {
      clearAnalysis();
      clearBarriers();
      clearWeights();
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

    const cleanGrid = () => {
      clearAnalysis();
      clearBarriers();
      clearWeights();
    };

    const runAlgorithm = async () => {
      clearAnalysis();
      setIsAnalyzing(true);
      let startTime = performance.now();
      let endTime = 0;
      let totalRows = Math.floor((screenSize.height - 64) / (gridSize + 2));
      let totalColumns = Math.floor(screenSize.width / (gridSize + 2));
      let results:
        | { analyzed: string[]; optimalPath: string[]; distance: number }
        | undefined = {
        analyzed: [],
        optimalPath: [],
        distance: 0,
      };
      if (algorithm === "dijkstra") {
        results = await Dijkstra({
          screenSize,
          startNode,
          endNode,
          barriers,
          gridSize,
          weights,
        });
        endTime = performance.now();
      } else if (algorithm === "aStar") {
        //@ts-ignore
        results = await aStarIsBorn(
          startNode,
          endNode,
          barriers,
          totalColumns,
          totalRows,
          "astar",
          weights
        );
        endTime = performance.now();
      } else if (algorithm === "greedy") {
        //@ts-ignore
        results = await GreedyBFS(
          startNode,
          endNode,
          barriers,
          totalColumns,
          totalRows,
          "greedy",
          weights
        );
        endTime = performance.now();
      } else if (algorithm === "breadth") {
        results = await Breadth(
          startNode,
          endNode,
          barriers,
          "breadth",
          totalRows,
          totalColumns
        );
        endTime = performance.now();
      } else if (algorithm === "depth") {
        results = await Depth(
          startNode,
          endNode,
          barriers,
          "depth",
          totalRows,
          totalColumns
        );
        endTime = performance.now();
      }

      if (results) {
        await animateAlgorithm(
          //@ts-ignore
          results.analyzed,
          //@ts-ignore
          results.optimalPath,
          animationSpeed,
          startNode,
          endNode,
          setIsAnalyzing
        );

        setAlgoDistance(results.distance);
        setAlgoAnalyzed(results.analyzed.length);
        setAlgoDuration(Math.floor(endTime - startTime));
        setOpenResults(true);
      } else {
        setIsAnalyzing(false);
      }

      setQuickAnalyze(true);
    };

    //drag nodes to quickly see shortest path analysis
    React.useEffect(() => {
      const analyze = async () => {
        clearAnalysis();
        setQuickAnalyze(true);
        let startTime = performance.now();
        let endTime = 0;

        let totalRows = Math.floor((screenSize.height - 64) / (gridSize + 2));
        let totalColumns = Math.floor(screenSize.width / (gridSize + 2));

        let results:
          | { analyzed: string[]; optimalPath: string[]; distance: number }
          | undefined = {
          analyzed: [],
          optimalPath: [],
          distance: 0,
        };

        if (algorithm === "dijkstra") {
          results = await Dijkstra({
            screenSize,
            startNode,
            endNode,
            barriers,
            gridSize,
            weights,
          });
          endTime = performance.now();
        } else if (algorithm === "aStar") {
          results = await aStarIsBorn(
            startNode,
            endNode,
            barriers,
            totalColumns,
            totalRows,
            "astar",
            weights
          );
          endTime = performance.now();
        } else if (algorithm === "greedy") {
          results = await GreedyBFS(
            startNode,
            endNode,
            barriers,
            totalColumns,
            totalRows,
            "greedy",
            weights
          );
          endTime = performance.now();
        } else if (algorithm === "breadth") {
          results = await Breadth(
            startNode,
            endNode,
            barriers,
            "breadth",
            totalRows,
            totalColumns
          );
          endTime = performance.now();
        } else if (algorithm === "depth") {
          results = await Depth(
            startNode,
            endNode,
            barriers,
            "depth",
            totalRows,
            totalColumns
          );
          endTime = performance.now();
        }

        if (results) {
          showAlgorithm(results.analyzed, startNode, endNode);
          showShortestPath(results.optimalPath, startNode, endNode);
          //log results for showing
          setAlgoDistance(results.distance);
          setAlgoAnalyzed(results.analyzed.length);
          setAlgoDuration(Math.floor(endTime - startTime));
          setOpenResults(true);
        }
      };

      if (quickAnalyze) {
        analyze();
      }
      //eslint-disable-next-line
    }, [startNode, endNode, algorithm, barriers, weights]);

    //create maze via the set algorithm
    React.useEffect(() => {
      const createMaze = async (
        orientation: "horizontal" | "vertical",
        bias: "none" | "horizontal" | "vertical"
      ) => {
        setIsAnalyzing(true);
        let rowEnd = Math.floor((screenSize.height - 64) / (gridSize + 2)) - 1;
        let columnEnd = Math.floor(screenSize.width / (gridSize + 2)) - 1;
        let mazeBarriers: string[] = [];
        let totalGridSize = {
          rowCount: rowEnd,
          columnCount: columnEnd,
        };
        await recursiveDivisionMaze(
          startNode,
          endNode,
          2,
          rowEnd - 1,
          2,
          columnEnd - 1,
          orientation,
          false,
          mazeBarriers,
          totalGridSize,
          bias
        );
        await animateMaze(
          mazeBarriers,
          setBarriers,
          animationSpeed,
          setIsAnalyzing
        );
      };

      const createRandomBarrierMaze = async () => {
        setIsAnalyzing(true);
        const totalRows =
          Math.floor((screenSize.height - 64) / (gridSize + 2)) - 1;
        const totalColumns = Math.floor(screenSize.width / (gridSize + 2)) - 1;
        const totalSize = totalRows * totalColumns;
        const iterationAmount = totalSize / 2.5;

        const results = await RandomMaze(
          startNode,
          endNode,
          totalRows,
          totalColumns,
          iterationAmount
        );

        await animateMaze(
          results.barriers,
          setBarriers,
          animationSpeed,
          setIsAnalyzing
        );
      };

      const createRandomWeightsMaze = async () => {
        setIsAnalyzing(true);

        const totalRows =
          Math.floor((screenSize.height - 64) / (gridSize + 2)) - 1;
        const totalColumns = Math.floor(screenSize.width / (gridSize + 2)) - 1;
        const totalSize = totalRows * totalColumns;
        const iterationAmount = totalSize / 1.7;

        const results = await RandomMaze(
          startNode,
          endNode,
          totalRows,
          totalColumns,
          iterationAmount
        );

        await animateRandomWeightMaze(
          results.barriers,
          setWeights,
          weightSize,
          animationSpeed,
          setIsAnalyzing
        );
      };

      const createSpiralMaze = async () => {
        setIsAnalyzing(true);
        const totalRows =
          Math.floor((screenSize.height - 64) / (gridSize + 2)) - 1;
        const totalColumns = Math.floor(screenSize.width / (gridSize + 2)) - 1;
        const results = await SpiralMaze(
          startNode,
          endNode,
          totalRows,
          totalColumns
        );

        await animateMaze(
          //@ts-ignore
          results.barriers,
          setBarriers,
          animationSpeed,
          setIsAnalyzing
        );
      };

      if (maze === "none") {
        clearBarriers();
      } else if (maze === "recursive") {
        cleanGrid();
        setMaze("recursive");
        createMaze("horizontal", "none");
      } else if (maze === "recursive horizontal") {
        cleanGrid();
        setMaze("recursive horizontal");
        createMaze("horizontal", "horizontal");
      } else if (maze === "recursive vertical") {
        cleanGrid();
        setMaze("recursive vertical");
        createMaze("vertical", "vertical");
      } else if (maze === "spiral") {
        cleanGrid();
        setMaze("spiral");
        createSpiralMaze();
      } else if (maze === "random barriers") {
        cleanGrid();
        setMaze("random barriers");
        createRandomBarrierMaze();
      } else if (maze === "random weights") {
        cleanGrid();
        setMaze("random weights");
        createRandomWeightsMaze();
      }
      //eslint-disable-next-line
    }, [maze]);

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

    const handleSpeedChange = (
      event: React.ChangeEvent<{ value: unknown }>
    ) => {
      setAnimationSpeed(event.target.value as number);
    };

    const handleMazeChange = (event: React.ChangeEvent<{ value: unknown }>) => {
      //@ts-ignore
      setMaze(event.target.value as string);
    };

    const handleAlgoChange = (event: React.ChangeEvent<{ value: unknown }>) => {
      //@ts-ignore
      setAlgorithm(event.target.value as string);
    };

    const handleLeftClickState = (
      event: React.ChangeEvent<{ value: unknown }>
    ) => {
      //@ts-ignore
      setLeftClickState(event.target.value as string);
    };

    const onWeightSizeChange = (event: object, value: number) => {
      setWeightSize(value);
    };

    const randomizeStartEndNodes = () => {
      let startX = Math.floor(
        Math.random() * (Math.floor(screenSize.width / (gridSize + 2)) - 1)
      );
      let startY = Math.floor(
        Math.random() *
          (Math.floor((screenSize.height - 64) / (gridSize + 2)) - 1)
      );
      let endX = Math.floor(
        Math.random() * (Math.floor(screenSize.width / (gridSize + 2)) - 1)
      );
      let endY = Math.floor(
        Math.random() *
          (Math.floor((screenSize.height - 64) / (gridSize + 2)) - 1)
      );

      setStartNode({
        x: startX,
        y: startY,
      });

      setEndNode({
        x: endX,
        y: endY,
      });
    };

    return (
      <>
        <ToolBar
          isDarkMode={isDarkMode}
          toggleDarkMode={toggleDarkMode}
          onGridSizeCommitted={onGridSizeCommitted}
          gridSize={gridSize}
          animationSpeed={animationSpeed}
          setAnimationSpeed={setAnimationSpeed}
          setMaze={setMaze}
          maze={maze}
          handleSpeedChange={handleSpeedChange}
          handleMazeChange={handleMazeChange}
          isAnalyzing={isAnalyzing}
          algorithm={algorithm}
          handleAlgoChange={handleAlgoChange}
          handleLeftClickState={handleLeftClickState}
          leftClickState={leftClickState}
          weightSize={weightSize}
          onWeightSizeChange={onWeightSizeChange}
          randomizeStartEndNodes={randomizeStartEndNodes}
        />
        <Snackbar
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left",
          }}
          open={openResults}
          autoHideDuration={null}
          onClose={() => setOpenResults(false)}
          message={
            <>
              <div className="snack-bar-line">
                <p style={{ marginRight: "10px" }}>Distance:</p>
                <h3>{algoDistance}</h3>
              </div>
              <div className="snack-bar-line">
                <p style={{ marginRight: "10px" }}>Analyzed Nodes:</p>
                <h3>{algoAnalyzed}</h3>
              </div>
              <div className="snack-bar-line">
                <p style={{ marginRight: "10px" }}>Duration:</p>
                <h3>{algoDuration}ms</h3>
              </div>
            </>
          }
          action={
            <React.Fragment>
              <IconButton
                size="small"
                aria-label="close"
                color="inherit"
                onClick={() => setOpenResults(false)}
              >
                <CloseIcon fontSize="small" />
              </IconButton>
            </React.Fragment>
          }
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
            isAnalyzing={isAnalyzing}
            weightSize={weightSize}
            leftClickState={leftClickState}
            setWeights={setWeights}
            weights={weights}
          />
          <div
            className={classes.clearButtons}
            style={{
              left: mediaQuery ? "40px" : "calc(50% - 165px)",
            }}
          >
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
                {mediaQuery ? <ShowChartIcon /> : "Clear Analysis"}
              </Button>
              <Button
                className={classes.button}
                onClick={cleanGrid}
                disabled={isAnalyzing}
              >
                {mediaQuery ? <ClearIcon /> : "Clear All"}
              </Button>

              <Button
                className={classes.button}
                onClick={resetGrid}
                disabled={isAnalyzing}
              >
                {mediaQuery ? <RefreshIcon /> : "Reset"}
              </Button>
            </ButtonGroup>
          </div>
          <div className={classes.runAlgorithm}>
            <Fab
              onClick={runAlgorithm}
              className={classes.fab}
              disabled={isAnalyzing}
            >
              <PlayArrow className={classes.play} />
            </Fab>
          </div>
        </div>
      </>
    );
  }
);

export default Pathfinder;
