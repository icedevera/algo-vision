import React from "react";
import "./grid.css";
import Cell from "./Cell/Cell";

type coordinates = {
  x: number;
  y: number;
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
  analyzedNodes: coordinates[]
  shortestPath: coordinates[]
}

const Grid: React.FC<IProps> = ({
  screenSize,
  startNode,
  endNode,
  setStartNode,
  setEndNode,
  analyzedNodes,
  shortestPath
}) => {
  const [isStartNodeDragging, setIsStartNodeDragging] = React.useState<boolean>(
    false
  );
  const [isEndNodeDragging, setIsEndNodeDragging] = React.useState<boolean>(
    false
  );

  const generateGrid = () => {
    const grid = [];
    const columnCellCount = Math.floor(screenSize.width / 22);
    const rowCellCount = Math.floor((screenSize.height - 64) / 22);

    const generateColumn = (i: number) => {
      const column = [];

      for (let j = 0; j < columnCellCount; j++) {
        column.push(
          <td style={{ padding: 0 }}>
            <Cell
              isStartNodeDragging={isStartNodeDragging}
              setIsStartNodeDragging={setIsStartNodeDragging}
              isEndNodeDragging={isEndNodeDragging}
              setIsEndNodeDragging={setIsEndNodeDragging}
              startNode={startNode}
              setStartNode={setStartNode}
              endNode={endNode}
              setEndNode={setEndNode}
              screenSize={screenSize}
              coordinates={{ x: j, y: i }}
              analyzedNodes={analyzedNodes}
              shortestPath={shortestPath}
            />
          </td>
        );
      }

      return column;
    };

    for (let i = 0; i < rowCellCount; i++) {
      grid.push(<tr>{generateColumn(i)}</tr>);
    }

    return grid;
  };

  return <table className="table-grid">{generateGrid()}</table>;
};

export default Grid;
