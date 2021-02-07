import React from "react";

import "./cell.css";
import { useTheme } from "@material-ui/core/styles";

type coordinates = {
  x: number;
  y: number;
};

type Weights = {
  node: string;
  size: number;
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
  isAnalyzing: boolean;
  weightSize: number;
  leftClickState: "barriers" | "weights";
  setWeights: React.Dispatch<any>;
  weights: Weights[];
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
    isAnalyzing,
    weightSize,
    leftClickState,
    setWeights,
    weights,
  }) => {
    const theme = useTheme();

    const [hoverGreen, setHoverGreen] = React.useState<boolean>(false);
    const [hoverRed, setHoverRed] = React.useState<boolean>(false);

    //was variables to bring back the barrier/weight if start or end node is being changed
    const [wasBarrier, setWasBarrier] = React.useState<boolean>(false);

    const [wasWeight, setWasWeight] = React.useState<number>(1);

    const [weightOfNode, setWeightOfNode] = React.useState<number>(1);

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

    React.useEffect(() => {
      if (weights.find((weightNode) => weightNode.node === id)) {
        return;
      } else {
        setWeightOfNode(1);
      }
    }, [weights, id]);

    const addWeight = (weightSize: number) => {
      setWeights((prev: Weights[]) => [
        ...prev,
        {
          node: id,
          size: weightSize,
        },
      ]);
      setWeightOfNode(weightSize);
    };

    const removeWeight = () => {
      let prevState = weights;
      let removeIndex = prevState.findIndex(
        (nodeWeight) => nodeWeight.node === id
      );
      let newState = prevState.splice(removeIndex, 1);

      setWeights(newState);

      setWeightOfNode(1);
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
        if (leftClickState === "barriers") {
          setMouseDown(true);
          if (cellElement && cellElement.classList.contains("barrier-node")) {
            removeBarrier();
          } else {
            addBarrier();
          }

          if (weightOfNode > 1) {
            removeWeight();
          }
        } else {
          setMouseDown(true);
          if (cellElement && cellElement.classList.contains("barrier-node")) {
            removeBarrier();
          }
          addWeight(weightSize);
        }
      }

      if (wasBarrier) {
        setWasBarrier(false);
      }

      if (wasWeight > 1) {
        setWasWeight(1);
      }

      return;
    };

    const handleMouseEnter = () => {
      if (isStartNodeDragging) {
        if (cellElement && cellElement.classList.contains("barrier-node")) {
          setWasBarrier(true);
          removeBarrier();
        } else if (weightOfNode > 1) {
          setWasWeight(weightOfNode);
          removeWeight();
        }

        setStartNode(coordinates);
        setHoverGreen(true);
      }
      if (isEndNodeDragging) {
        if (cellElement && cellElement.classList.contains("barrier-node")) {
          setWasBarrier(true);
          removeBarrier();
        } else if (weightOfNode > 1) {
          removeWeight();
          setWasWeight(weightOfNode);
        }
        setEndNode(coordinates);
        setHoverRed(true);
      }

      if (mouseDown && !isStartNode && !isEndNode && !isAnalyzing) {
        if (leftClickState === "barriers") {
          if (cellElement && cellElement.classList.contains("barrier-node")) {
            removeBarrier();
          } else {
            addBarrier();
          }
        } else {
          if (cellElement && cellElement.classList.contains("barrier-node")) {
            removeBarrier();
          }
          addWeight(weightSize);
        }
      }
      return;
    };

    const handleMouseLeave = () => {
      if (isStartNodeDragging) {
        if (wasBarrier) {
          addBarrier();
        }
        if (wasWeight > 1) {
          addWeight(wasWeight);
        }
        setHoverGreen(false);
      }
      if (isEndNodeDragging) {
        if (wasBarrier) {
          addBarrier();
        }
        if (wasWeight > 1) {
          addWeight(wasWeight);
        }
        setHoverRed(false);
      }
      return;
    };

    const handleMouseUp = () => {
      if (isStartNodeDragging) {
        setIsStartNodeDragging(false);
        setStartNode(coordinates);
        if (weightOfNode > 1) {
          removeWeight();
        }
      }

      if (isEndNodeDragging) {
        setIsEndNodeDragging(false);
        setEndNode(coordinates);
        if (weightOfNode > 1) {
          removeWeight();
        }
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
      >
        {weightOfNode > 1 ? weightOfNode : null}
      </div>
    );
  }
);

export default Cell;
