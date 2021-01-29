import React from "react";

import "./cell.css";
import { useTheme } from "@material-ui/core/styles";

type coordinates = {
  x: number;
  y: number;
};

interface IProps {
  coordinates: coordinates;
  screenSize: {
    width: number;
    height: number;
  };
  startNode: coordinates;
  setStartNode: React.Dispatch<any>;
  endNode: coordinates;
  setEndNode: React.Dispatch<any>;
  isStartNodeDragging: boolean;
  setIsStartNodeDragging: React.Dispatch<any>;
  isEndNodeDragging: boolean;
  setIsEndNodeDragging: React.Dispatch<any>;
  analyzedNodes: coordinates[];
  shortestPath: coordinates[];
}

const Cell: React.FC<IProps> = React.memo(
  ({
    coordinates,
    screenSize,
    startNode,
    setStartNode,
    endNode,
    setEndNode,
    isStartNodeDragging,
    setIsStartNodeDragging,
    isEndNodeDragging,
    setIsEndNodeDragging,
    analyzedNodes,
    shortestPath,
  }) => {
    const theme = useTheme();
    const [hoverGreen, setHoverGreen] = React.useState<boolean>(false);
    const [hoverRed, setHoverRed] = React.useState<boolean>(false);

    const isStartNode =
      coordinates.x === startNode.x && coordinates.y === startNode.y;

    const isEndNode =
      coordinates.x === endNode.x && coordinates.y === endNode.y;

    const handleMouseDown = () => {
      if (isStartNode && !isStartNodeDragging) {
        setIsStartNodeDragging(true);
      }

      if (isEndNode && !isEndNodeDragging) {
        setIsEndNodeDragging(true);
      }
      return;
    };

    const handleMouseEnter = () => {
      if (isStartNodeDragging) {
        setHoverGreen(true);
      }
      if (isEndNodeDragging) {
        setHoverRed(true);
      }
      return;
    };

    const handleMouseLeave = () => {
      if (isStartNodeDragging) {
        setHoverGreen(false);
      }
      if (isEndNodeDragging) {
        setHoverRed(false);
      }
      return;
    };

    const handleMouseUp = () => {
      if (isStartNodeDragging) {
        setIsStartNodeDragging(false);
        setStartNode(coordinates);
      }

      if (isEndNodeDragging) {
        setIsEndNodeDragging(false);
        setEndNode(coordinates);
      }
      return;
    };

    //change to blue if analyzed
    const [isAnalyzed, setIsAnalyzed] = React.useState<boolean>(false);
    React.useEffect(() => {
      for (let i = 0; i < analyzedNodes.length; i++) {
        if (
          analyzedNodes[i].x === coordinates.x &&
          analyzedNodes[i].y === coordinates.y
        ) {
          setIsAnalyzed(true);
        }
        break;
      }
    }, [analyzedNodes]);

    //change to yellow if shortest path
    const [isShortestPath, setIsShortestPath] = React.useState<boolean>(false);

    React.useEffect(() => {
      for (let i = 0; i < shortestPath.length; i++) {
        if (
          shortestPath[i].x === coordinates.x &&
          shortestPath[i].y === coordinates.y
        ) {
          setIsShortestPath(true);
        }
        break;
      }
    }, [shortestPath]);

    return (
      <div
        style={{
          border:
            theme.palette.type === "dark"
              ? `1px solid ${theme.palette.grey[800]}`
              : `1px solid ${theme.palette.grey[300]}`,
          backgroundColor:
            isStartNode || hoverGreen
              ? "green"
              : isEndNode || hoverRed
              ? "red"
              : isAnalyzed
              ? "blue"
              : isShortestPath
              ? "yellow"
              : theme.palette.background.default,
          cursor:
            isStartNode || isEndNode || isStartNodeDragging || isEndNodeDragging
              ? "move"
              : "default",
        }}
        className="cell-node"
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      />
    );
  }
);

export default Cell;
