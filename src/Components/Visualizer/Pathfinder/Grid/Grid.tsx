import React from "react";
import "./grid.css";
import Cell from "./Cell/Cell";

type coordinates = {
  x: number;
  y: number;
};

type Weights = {
  node: string;
  size: number;
};

interface IProps {
  startNode: coordinates;
  setStartNode: React.Dispatch<any>;
  endNode: coordinates;
  setEndNode: React.Dispatch<any>;
  screenSize: {
    width: number;
    height: number;
  };
  setBarriers: React.Dispatch<any>;
  gridSize: number;
  isAnalyzing: boolean;
  weightSize: number;
  leftClickState: "barriers" | "weights";
  setWeights: React.Dispatch<any>;
  weights: Weights[];
}

const Grid: React.FC<IProps> = React.memo(
  ({
    screenSize,
    startNode,
    endNode,
    setStartNode,
    setEndNode,
    setBarriers,
    gridSize,
    isAnalyzing,
    weightSize,
    leftClickState,
    setWeights,
    weights
  }) => {
    const [
      isStartNodeDragging,
      setIsStartNodeDragging,
    ] = React.useState<boolean>(false);
    const [isEndNodeDragging, setIsEndNodeDragging] = React.useState<boolean>(
      false
    );

    const [mouseDown, setMouseDown] = React.useState<boolean>(false);

    const generateGrid = () => {
      const grid = [];
      const columnCellCount = Math.floor(screenSize.width / (gridSize + 2));
      const rowCellCount = Math.floor(
        (screenSize.height - 64) / (gridSize + 2)
      );

      const generateColumn = (i: number) => {
        const column = [];

        for (let j = 0; j < columnCellCount; j++) {
          column.push(
            <td key={`cell-node-${j}-${i}`} style={{ padding: 0 }}>
              <Cell
                id={`${j}-${i}`}
                gridSize={gridSize}
                isStartNodeDragging={isStartNodeDragging}
                setIsStartNodeDragging={setIsStartNodeDragging}
                isEndNodeDragging={isEndNodeDragging}
                setIsEndNodeDragging={setIsEndNodeDragging}
                startNode={startNode}
                setStartNode={setStartNode}
                endNode={endNode}
                setEndNode={setEndNode}
                coordinates={{ x: j, y: i }}
                setBarriers={setBarriers}
                mouseDown={mouseDown}
                setMouseDown={setMouseDown}
                isAnalyzing={isAnalyzing}
                weightSize={weightSize}
                leftClickState={leftClickState}
                setWeights={setWeights}
                weights={weights}
              />
            </td>
          );
        }
        return column;
      };

      for (let i = 0; i < rowCellCount; i++) {
        grid.push(<tr key={i}>{generateColumn(i)}</tr>);
      }

      return grid;
    };

    return (
      <table className="table-grid">
        <tbody>{generateGrid()}</tbody>
      </table>
    );
  }
);

export default Grid;
