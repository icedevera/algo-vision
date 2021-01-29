import React from "react";

import Grid from "./Grid/Grid";
import Fab from "@material-ui/core/Fab";
import { makeStyles } from "@material-ui/core/styles";
import { PlayArrow } from "@material-ui/icons";
import Dijkstra from "../../../Algorithms/Pathfinding/Dijkstra";

interface IProps {
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
}));

const Pathfinder: React.FC<IProps> = ({ screenSize }) => {
  const classes = useStyles();

  const [startNode, setStartNode] = React.useState<coordinates>({
    x: Math.round(screenSize.width / 22 / 3),
    y: Math.round(screenSize.height / 22 / 2.5),
  });

  const [endNode, setEndNode] = React.useState<coordinates>({
    x: Math.round(screenSize.width / 22 / 1.5),
    y: Math.round(screenSize.height / 22 / 2.5),
  });

  const [analyzedNodes, setAnalyzedNodes] = React.useState<coordinates[]>([]);

  const [shortestPath, setShortestPath] = React.useState<coordinates[]>([]);

  const runAlgorithm = () => {
    Dijkstra({ startNode, endNode, setAnalyzedNodes, setShortestPath });
  };

  return (
    <div>
      <Grid
        screenSize={screenSize}
        startNode={startNode}
        endNode={endNode}
        setStartNode={setStartNode}
        setEndNode={setEndNode}
        analyzedNodes={analyzedNodes}
        shortestPath={shortestPath}
      />
      <div className={classes.runAlgorithm}>
        <Fab onClick={runAlgorithm} color="primary">
          <PlayArrow />
        </Fab>
      </div>
    </div>
  );
};

export default Pathfinder;
