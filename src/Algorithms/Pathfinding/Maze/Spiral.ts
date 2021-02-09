type coordinates = {
  x: number;
  y: number;
};

export const SpiralMaze = (
  startNode: coordinates,
  endNode: coordinates,
  totalRows: number,
  totalColumns: number
) => {
  var width = totalColumns;
  var height = totalRows;

  var x = -(width - height) / 2;
  var y = 0;
  var dx = 1;
  var dy = 0;
  var x_limit = (width - height) / 2;
  var y_limit = 0;
  var skip = true;
  let barriers: string[] = [];

  while (true) {
    //end case
    if (width / 2 + x > totalColumns && height / 2 - y > totalRows) {
      return { barriers };
    }

    if (
      -width / 2 < x &&
      x <= width / 2 &&
      -height / 2 < y &&
      y <= height / 2 &&
      !skip
    ) {
      if (
        (Math.floor(width / 2 + x) !== startNode.x ||
          Math.floor(height / 2 - y) !== startNode.y) &&
        (Math.floor(width / 2 + x) !== endNode.x ||
          Math.floor(height / 2 - y) !== endNode.y)
      ) {
        barriers.push(
          `${Math.floor(width / 2 + x)}-${Math.floor(height / 2 - y)}`
        );
      }
    }
    if (dx > 0) {
      //Dir right
      if (x > x_limit) {
        dx = 0;
        dy = 1;
        skip = false;
      }
    } else if (dy > 0) {
      //Dir up
      if (y > y_limit) {
        dx = -1;
        dy = 0;
      }
    } else if (dx < 0) {
      //Dir left
      if (x < -1 * x_limit) {
        dx = 0;
        dy = -1;
      }
    } else if (dy < 0) {
      //Dir down
      if (y < -1 * y_limit) {
        dx = 1;
        dy = 0;
        x_limit += 2;
        y_limit += 2;
      }
    }
    x += dx;
    y += dy;
  }
};
