type coordinates = {
  x: number;
  y: number;
};

export const recursiveDivisionMaze = (
  startNode: coordinates,
  endNode: coordinates,
  rowStart: number,
  rowEnd: number,
  colStart: number,
  colEnd: number,
  orientation: "horizontal" | "vertical",
  surroundingWalls: boolean,
  mazeState: string[],
  totalGridSize: {
    rowCount: number;
    columnCount: number;
  },
  bias: "none" | "vertical" | "horizontal"
) => {
  // variable that will be return value of maze shown on the grid
  var mazeBarriers: string[] = mazeState;

  //end recursive division and return walls to be drawn
  if (rowEnd < rowStart || colEnd < colStart) {
    return;
  }

  if (!surroundingWalls) {
    //loop through border of grid and place walls
    for (let row = 0; row <= totalGridSize.rowCount; row++) {
      for (let col = 0; col <= totalGridSize.columnCount; col++) {
        if (
          row === 0 ||
          col === 0 ||
          row === totalGridSize.rowCount ||
          col === totalGridSize.columnCount
        ) {
          if (
            (col !== startNode.x || row !== startNode.y) &&
            (col !== endNode.x || row !== endNode.y)
          ) {
            let nodeId = `${col}-${row}`;
            mazeState.push(nodeId);
          }
        }
      }
    }
    surroundingWalls = true;
  }

  if (orientation === "horizontal") {
    //create array of existing rows on grid
    let possibleRows = [];
    for (let number = rowStart; number <= rowEnd; number += 2) {
      possibleRows.push(number);
    }

    //create array of existing columns on grid
    let possibleCols = [];
    for (let number = colStart - 1; number <= colEnd + 1; number += 2) {
      possibleCols.push(number);
    }

    //randomize a row
    let randomRowIndex = Math.floor(Math.random() * possibleRows.length);
    //randomize a column
    let randomColIndex = Math.floor(Math.random() * possibleCols.length);

    let currentRow = possibleRows[randomRowIndex];
    //random blank barrier for entrance point of maze
    let colRandom = possibleCols[randomColIndex];

    //
    for (let row = 0; row <= rowEnd; row++) {
      for (let col = 0; col <= colEnd; col++) {
        let nodeId = `${col}-${row}`;

        if (
          row === currentRow &&
          col !== colRandom &&
          col >= colStart - 1 &&
          col <= colEnd + 1
        ) {
          //make sure to not add barrier in target nodes
          if (
            (row !== startNode.y || col !== startNode.x) &&
            (row !== endNode.y || col !== endNode.x)
          ) {
            mazeBarriers.push(nodeId);
          }
        }
      }
    }

    //recursive time!
    //if height is greater than width of next iteration
    if (currentRow - 1 - rowStart > colEnd - colStart) {
      recursiveDivisionMaze(
        startNode,
        endNode,
        rowStart,
        currentRow - 1,
        colStart,
        colEnd,
        orientation,
        surroundingWalls,
        mazeBarriers,
        totalGridSize,
        bias
      );
    } else {
      //account for bias
      if (bias === "horizontal") {
        recursiveDivisionMaze(
          startNode,
          endNode,
          rowStart,
          currentRow - 1,
          colStart,
          colEnd,
          "horizontal",
          surroundingWalls,
          mazeBarriers,
          totalGridSize,
          bias
        );
      } else if (bias === "vertical") {
        recursiveDivisionMaze(
          startNode,
          endNode,
          rowStart,
          currentRow - 1,
          colStart,
          colEnd,
          "vertical",
          surroundingWalls,
          mazeBarriers,
          totalGridSize,
          bias
        );
      } else {
        recursiveDivisionMaze(
          startNode,
          endNode,
          rowStart,
          currentRow - 1,
          colStart,
          colEnd,
          "vertical",
          surroundingWalls,
          mazeBarriers,
          totalGridSize,
          bias
        );
      }
    }

//if height is greater than width of next iteration
    if (rowEnd - (currentRow + 2) > colEnd - colStart) {
      //account for bias
      if (bias === "horizontal") {
        recursiveDivisionMaze(
          startNode,
          endNode,
          currentRow + 2,
          rowEnd,
          colStart,
          colEnd,
          orientation,
          surroundingWalls,
          mazeBarriers,
          totalGridSize,
          bias
        );
      } else if (bias === "vertical") {
        recursiveDivisionMaze(
          startNode,
          endNode,
          currentRow + 2,
          rowEnd,
          colStart,
          colEnd,
          "vertical",
          surroundingWalls,
          mazeBarriers,
          totalGridSize,
          bias
        );
      } else {
        recursiveDivisionMaze(
          startNode,
          endNode,
          currentRow + 2,
          rowEnd,
          colStart,
          colEnd,
          orientation,
          surroundingWalls,
          mazeBarriers,
          totalGridSize,
          bias
        );
      }
    } else {
      //account for bias
      if (bias === "horizontal") {
        recursiveDivisionMaze(
          startNode,
          endNode,
          currentRow + 2,
          rowEnd,
          colStart,
          colEnd,
          "vertical",
          surroundingWalls,
          mazeBarriers,
          totalGridSize,
          bias
        );
      } else if (bias === "vertical") {
        recursiveDivisionMaze(
          startNode,
          endNode,
          currentRow + 2,
          rowEnd,
          colStart,
          colEnd,
          "vertical",
          surroundingWalls,
          mazeBarriers,
          totalGridSize,
          bias
        );
      } else {
        recursiveDivisionMaze(
          startNode,
          endNode,
          currentRow + 2,
          rowEnd,
          colStart,
          colEnd,
          "vertical",
          surroundingWalls,
          mazeBarriers,
          totalGridSize,
          bias
        );
      }
    }

    //if vertical
  } else {
    let possibleCols = [];
    for (let number = colStart; number <= colEnd; number += 2) {
      possibleCols.push(number);
    }

    let possibleRows = [];
    for (let number = rowStart - 1; number <= rowEnd + 1; number += 2) {
      possibleRows.push(number);
    }

    let randomColIndex = Math.floor(Math.random() * possibleCols.length);
    let randomRowIndex = Math.floor(Math.random() * possibleRows.length);

    let currentCol = possibleCols[randomColIndex];
    let rowRandom = possibleRows[randomRowIndex];

    for (let row = 0; row <= rowEnd; row++) {
      for (let col = 0; col <= colEnd; col++) {
        if (
          col === currentCol &&
          row !== rowRandom &&
          row >= rowStart - 1 &&
          row <= rowEnd + 1
        ) {
          let nodeId = `${col}-${row}`;
          if (
            (row !== startNode.y || col !== startNode.x) &&
            (row !== endNode.y || col !== endNode.x)
          ) {
            mazeBarriers.push(nodeId);
          }
        }
      }
    }

    //recursive time!
    if (rowEnd - rowStart > currentCol - 1 - colStart) {
      //account for bias
      if (bias === "horizontal") {
        recursiveDivisionMaze(
          startNode,
          endNode,
          rowStart,
          rowEnd,
          colStart,
          currentCol - 1,
          "horizontal",
          surroundingWalls,
          mazeBarriers,
          totalGridSize,
          bias
        );
      } else if (bias === "vertical") {
        recursiveDivisionMaze(
          startNode,
          endNode,
          rowStart,
          rowEnd,
          colStart,
          currentCol - 1,
          "vertical",
          surroundingWalls,
          mazeBarriers,
          totalGridSize,
          bias
        );
      } else {
        recursiveDivisionMaze(
          startNode,
          endNode,
          rowStart,
          rowEnd,
          colStart,
          currentCol - 1,
          "horizontal",
          surroundingWalls,
          mazeBarriers,
          totalGridSize,
          bias
        );
      }
    } else {
      //account for bias
      if (bias === "horizontal") {
        recursiveDivisionMaze(
          startNode,
          endNode,
          rowStart,
          rowEnd,
          colStart,
          currentCol - 1,
          "horizontal",
          surroundingWalls,
          mazeBarriers,
          totalGridSize,
          bias
        );
      } else if (bias === "vertical") {
        recursiveDivisionMaze(
          startNode,
          endNode,
          rowStart,
          rowEnd,
          colStart,
          currentCol - 1,
          orientation,
          surroundingWalls,
          mazeBarriers,
          totalGridSize,
          bias
        );
      } else {
        recursiveDivisionMaze(
          startNode,
          endNode,
          rowStart,
          rowEnd,
          colStart,
          currentCol - 1,
          orientation,
          surroundingWalls,
          mazeBarriers,
          totalGridSize,
          bias
        );
      }
    }

    if (rowEnd - rowStart > colEnd - (currentCol + 2)) {
      recursiveDivisionMaze(
        startNode,
        endNode,
        rowStart,
        rowEnd,
        currentCol + 2,
        colEnd,
        "horizontal",
        surroundingWalls,
        mazeBarriers,
        totalGridSize,
        bias
      );
    } else {
      recursiveDivisionMaze(
        startNode,
        endNode,
        rowStart,
        rowEnd,
        currentCol + 2,
        colEnd,
        orientation,
        surroundingWalls,
        mazeBarriers,
        totalGridSize,
        bias
      );
    }
  }
};
