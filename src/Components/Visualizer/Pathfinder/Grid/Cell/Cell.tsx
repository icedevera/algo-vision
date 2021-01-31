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
  addingBarriers: boolean;
  mouseDown: boolean;
  setMouseDown: React.Dispatch<any>;
  gridSize: number;
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
    addingBarriers,
    mouseDown,
    setMouseDown,
  }) => {
    const theme = useTheme();

    const [hoverGreen, setHoverGreen] = React.useState<boolean>(false);
    const [hoverRed, setHoverRed] = React.useState<boolean>(false);

    var isStartNode =
      coordinates.x === startNode.x && coordinates.y === startNode.y;

    var isEndNode = coordinates.x === endNode.x && coordinates.y === endNode.y;

    const handleMouseDown = () => {
      if (isStartNode && !isStartNodeDragging) {
        setIsStartNodeDragging(true);
      }

      if (isEndNode && !isEndNodeDragging) {
        setIsEndNodeDragging(true);
      }

      if (addingBarriers && !isStartNode && !isEndNode) {
        setMouseDown(true);
        setBarriers((prev: string[]) => [
          ...prev,
          `${coordinates.x}-${coordinates.y}`,
        ]);
        if (document.getElementById(`${coordinates.x}-${coordinates.y}`)) {
          //@ts-ignore
          document.getElementById(
            `${coordinates.x}-${coordinates.y}`
          ).className = "cell-node barrier-node";
        }
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
      if (addingBarriers && mouseDown && !isStartNode && !isEndNode) {
        setBarriers((prev: string[]) => [
          ...prev,
          `${coordinates.x}-${coordinates.y}`,
        ]);
        if (document.getElementById(`${coordinates.x}-${coordinates.y}`)) {
          //@ts-ignore
          document.getElementById(
            `${coordinates.x}-${coordinates.y}`
          ).className = "cell-node barrier-node";
        }
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
      if (addingBarriers && mouseDown) {
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
            height: `${gridSize}px`
        }}
        className={`cell-node ${
          isStartNode || hoverGreen
            ? "green"
            : isEndNode || hoverRed
            ? "red"
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
