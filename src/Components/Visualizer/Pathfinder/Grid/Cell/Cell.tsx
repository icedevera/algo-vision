import React from "react";

import "./cell.css";
import { useTheme } from "@material-ui/core/styles";

type coordinates = {
  x: number;
  y: number;
};

interface IProps {
  id: string;
  coordinates: coordinates;
  startNode: coordinates;
  setStartNode: React.Dispatch<any>;
  endNode: coordinates;
  setEndNode: React.Dispatch<any>;
  isStartNodeDragging: boolean;
  setIsStartNodeDragging: React.Dispatch<any>;
  isEndNodeDragging: boolean;
  setIsEndNodeDragging: React.Dispatch<any>;
  setBarriers: React.Dispatch<any>;
  mouseDown: boolean;
  setMouseDown: React.Dispatch<any>;
  gridSize: number;
  quickAnalyze: boolean;
  isAnalyzing: boolean;
}

const Cell: React.FC<IProps> = React.memo(
  ({
    gridSize,
    id,
    coordinates,
    startNode,
    setStartNode,
    endNode,
    setEndNode,
    isStartNodeDragging,
    setIsStartNodeDragging,
    isEndNodeDragging,
    setIsEndNodeDragging,
    setBarriers,
    mouseDown,
    setMouseDown,
    quickAnalyze,
    isAnalyzing
  }) => {
    const theme = useTheme();

    const [hoverGreen, setHoverGreen] = React.useState<boolean>(false);
    const [hoverRed, setHoverRed] = React.useState<boolean>(false);

    const [wasBarrier, setWasBarrier] = React.useState<boolean>(false);

    var isStartNode =
      coordinates.x === startNode.x && coordinates.y === startNode.y;

    var isEndNode = coordinates.x === endNode.x && coordinates.y === endNode.y;

    const cellElement = document.getElementById(
      `${coordinates.x}-${coordinates.y}`
    );

    const removeItemOnce = (arr: string[], value: string) => {
      var index = arr.indexOf(value);
      if (index > -1) {
        arr.splice(index, 1);
      }
      return arr;
    };

    const removeBarrier = () => {
      setBarriers((prev: string[]) => removeItemOnce(prev, id));
      if (document.getElementById(id)) {
        //@ts-ignore
        document.getElementById(
          id
        ).className = `cell-node ${theme.palette.type}-node`;
      }
    };

    const addBarrier = () => {
      setBarriers((prev: string[]) => [...prev, id]);
      if (document.getElementById(id)) {
        //@ts-ignore
        document.getElementById(id).className = "cell-node barrier-node";
      }
    };

    const handleMouseDown = () => {
      if (isStartNode && !isAnalyzing) {
        setIsStartNodeDragging(true);
      }

      if (isEndNode && !isAnalyzing) {
        setIsEndNodeDragging(true);
      }

      if (
        !isStartNode &&
        !isEndNode &&
        !isStartNodeDragging &&
        !isEndNodeDragging &&
        !isAnalyzing
      ) {
        setMouseDown(true);
        if (cellElement && cellElement.classList.contains("barrier-node")) {
          removeBarrier();
        } else {
          addBarrier();
        }
      }

      if (wasBarrier) {
        setWasBarrier(false);
      }

      return;
    };

    const handleMouseEnter = () => {
      if (isStartNodeDragging) {
        if (quickAnalyze) {
          if (cellElement && cellElement.classList.contains("barrier-node")) {
            setWasBarrier(true);
          }
          setStartNode(coordinates);
          removeBarrier();
        }
        setHoverGreen(true);
      }
      if (isEndNodeDragging) {
        if (quickAnalyze) {
          if (cellElement && cellElement.classList.contains("barrier-node")) {
            setWasBarrier(true);
          }
          setEndNode(coordinates);
          removeBarrier();
        }
        setHoverRed(true);
      }
      if (mouseDown && !isStartNode && !isEndNode &&
        !isAnalyzing) {
        if (cellElement && cellElement.classList.contains("barrier-node")) {
          removeBarrier();
        } else {
          addBarrier();
        }
      }
      return;
    };

    const handleMouseLeave = () => {
      if (isStartNodeDragging) {
        if (quickAnalyze && wasBarrier) {
          addBarrier();
        }
        setHoverGreen(false);
      }
      if (isEndNodeDragging) {
        if (quickAnalyze && wasBarrier) {
          addBarrier();
        }
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
      if (mouseDown) {
        setMouseDown(false);
      }
      return;
    };

    return (
      <div
        id={id}
        style={{
          border:
            theme.palette.type === "dark"
              ? `1px solid ${theme.palette.grey[800]}`
              : `1px solid ${theme.palette.grey[300]}`,
          cursor:
            isStartNode || isEndNode || isStartNodeDragging || isEndNodeDragging
              ? "move"
              : "default",
          width: `${gridSize}px`,
          height: `${gridSize}px`,
        }}
        className={`cell-node ${
          isStartNode || hoverGreen
            ? "green"
            : isEndNode || hoverRed
            ? "red"
            : wasBarrier
            ? "barrier-node"
            : `${theme.palette.type}-node`
        }`}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      />
    );
  }
);

export default Cell;
