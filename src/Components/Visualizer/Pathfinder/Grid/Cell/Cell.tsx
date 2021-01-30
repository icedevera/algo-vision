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
}

const Cell: React.FC<IProps> = React.memo(
  ({
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
  }) => {
    const theme = useTheme();

    const [hoverGreen, setHoverGreen] = React.useState<boolean>(false);
    const [hoverRed, setHoverRed] = React.useState<boolean>(false);
    // const [isStartNode, setIsStartNode] = React.useState<boolean>(false);
    // const [isEndNode, setIsEndNode] = React.useState<boolean>(false);

    // React.useEffect(() => {
    //   if (coordinates.x === startNode.x && coordinates.y === startNode.y) {
    //     setIsStartNode(true);
    //   } else {
    //     setIsStartNode(false);
    //   }
    // }, [coordinates, startNode]);

    // React.useEffect(() => {
    //   if (coordinates.x === endNode.x && coordinates.y === endNode.y) {
    //     setIsEndNode(true);
    //   } else {
    //     setIsEndNode(false);
    //   }
    // }, [coordinates, endNode]);

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
