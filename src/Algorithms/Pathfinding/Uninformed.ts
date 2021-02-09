type coordinates = {
  x: number;
  y: number;
};

export const UninformedAlgorithm = (
  startNode: coordinates,
  endNode: coordinates,
  barriers: string[],
  type: "breadth" | "depth",
  totalRows: number,
  totalColumns: number
) => {
  const getNeighbors = (id: string, type: "breadth" | "depth") => {
    let coordinates = id.split("-");
    let x = parseInt(coordinates[0]);
    let y = parseInt(coordinates[1]);
    let neighbors = [];
    let potentialNeighbor;

    if (x - 1 >= 0) {
      potentialNeighbor = `${x - 1}-${y}`;
      if (!barriers.includes(`${x - 1}-${y}`)) {
        if (type === "breadth") {
          neighbors.push(potentialNeighbor);
        } else {
          neighbors.unshift(potentialNeighbor);
        }
      }
    }
    if (y + 1 < totalRows) {
      potentialNeighbor = `${x}-${y + 1}`;
      if (!barriers.includes(`${x}-${y + 1}`)) {
        if (type === "breadth") {
          neighbors.push(potentialNeighbor);
        } else {
          neighbors.unshift(potentialNeighbor);
        }
      }
    }
    if (x + 1 < totalColumns) {
      potentialNeighbor = `${x + 1}-${y}`;
      if (!barriers.includes(`${x + 1}-${y}`)) {
        if (type === "breadth") {
          neighbors.push(potentialNeighbor);
        } else {
          neighbors.unshift(potentialNeighbor);
        }
      }
    }
    if (y - 1 >= 0) {
      potentialNeighbor = `${x}-${y - 1}`;
      if (!barriers.includes(`${x}-${y - 1}`)) {
        if (type === "breadth") {
          neighbors.push(potentialNeighbor);
        } else {
          neighbors.unshift(potentialNeighbor);
        }
      }
    }
    return neighbors;
  };

  type Structure = {
    node: string;
    parent: Structure | null;
  };

  let structure: Structure[] = [
    { node: `${startNode.x}-${startNode.y}`, parent: null },
  ];
  let exploredNodes: { [node: string]: boolean } = { start: true };
  let analyzed = [];
  let optimalPath: string[] = [`${endNode.x}-${endNode.y}`];

  while (structure.length) {
    if (structure.length === 0) {
      break;
    }
    //@ts-ignore
    let currentNode: Structure =
      type === "breadth" ? structure.shift() : structure.pop();

    analyzed.push(currentNode.node);

    if (type === "depth") {
      exploredNodes[currentNode.node] = true;
    }

    //end case return optimal path
    if (currentNode.node === `${endNode.x}-${endNode.y}`) {
      console.log(`${endNode.x}-${endNode.y}`);
      console.log(structure);
      let current = currentNode;
      let returnValue = [];

      //trace back to start node by looking at parents
      //@ts-ignore
      while (current.parent) {
        //@ts-ignore
        returnValue.push(current.node);

        current = current.parent;
      }

      optimalPath = returnValue.reverse();

      return {
        analyzed,
        optimalPath,
        distance:
          optimalPath.length - 1 !== 0 ? optimalPath.length - 1 : Infinity,
      };
    }

    let currentNeighbors = getNeighbors(currentNode.node, type);

    currentNeighbors.forEach((neighbor) => {
      if (!exploredNodes[neighbor]) {
        if (type === "breadth") {
          exploredNodes[neighbor] = true;
        }

        let neighborStructure = {
          node: neighbor,
          parent: currentNode,
        };

        structure.push(neighborStructure);
      }
    });
  }

  return {
    analyzed,
    optimalPath,
    distance: optimalPath.length - 1 !== 0 ? optimalPath.length - 1 : Infinity,
  };
};
