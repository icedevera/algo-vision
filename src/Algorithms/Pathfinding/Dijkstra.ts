type coordinates = {
  x: number;
  y: number;
};

interface IProps {
  startNode: coordinates;
  endNode: coordinates;
  screenSize: { width: number; height: number };
  barriers: string[];
  gridSize: number;
}

const Dijkstra = ({
  startNode,
  endNode,
  screenSize,
  barriers,
  gridSize,
}: IProps) => {
  type Distances = {
    [node: string]: number;
  };

  const findShortestDistanceNode = (
    distances: Distances,
    analyzed: string[]
  ) => {
    const knownNodes = Object.keys(distances);
    const shortestDistanceNode = knownNodes.reduce(
      (shortest: string | null, node) => {
        if (shortest === null && !analyzed.includes(node)) {
          shortest = node;
        }

        //@ts-ignore
        if (distances[node] < distances[shortest] && !analyzed.includes(node)) {
          shortest = node;
        }
        return shortest;
      },
      null
    );

    return shortestDistanceNode;
  };

  //if finish node is right next to startnode, finish algo
  if (
    (startNode.x === endNode.x && startNode.y - 1 === endNode.y) ||
    (startNode.x + 1 === endNode.x && startNode.y === endNode.y) ||
    (startNode.x === endNode.x && startNode.y + 1 === endNode.y) ||
    (startNode.x - 1 === endNode.x && startNode.y === endNode.y)
  ) {
    return { analyzed: [], optimalPath: [] };
  }

  //set initial state of distances that track shortest distance to reach end node
  //accounting for barriers
  //top
  const topDistance = !barriers.includes(`${startNode.x}-${startNode.y - 1}`)
    ? { [`${startNode.x}-${startNode.y - 1}`]: 1 }
    : null;
  //right
  const rightDistance = !barriers.includes(`${startNode.x + 1}-${startNode.y}`)
    ? { [`${startNode.x + 1}-${startNode.y}`]: 1 }
    : null;
  //bottom
  const bottomDistance = !barriers.includes(`${startNode.x}-${startNode.y + 1}`)
    ? { [`${startNode.x}-${startNode.y + 1}`]: 1 }
    : null;
  //left
  const leftDistance = !barriers.includes(`${startNode.x - 1}-${startNode.y}`)
    ? { [`${startNode.x - 1}-${startNode.y}`]: 1 }
    : null;

  const distances: Distances = {
    [`${endNode.x}-${endNode.y}`]: Infinity,
    ...topDistance,
    ...rightDistance,
    ...bottomDistance,
    ...leftDistance,
  };

  if (
    barriers.includes(`${startNode.x}-${startNode.y - 1}`) &&
    barriers.includes(`${startNode.x + 1}-${startNode.y}`) &&
    barriers.includes(`${startNode.x}-${startNode.y + 1}`) &&
    barriers.includes(`${startNode.x - 1}-${startNode.y}`)
  ) {
    return;
  }

  type Parents = {
    [node: string]: string | null;
  };

  //track paths taking into account the borders of the table and barriers
  var parents: Parents = { [`${endNode.x}-${endNode.y}`]: null };
  if (
    startNode.y - 1 >= 0 &&
    !barriers.includes(`${startNode.x}-${startNode.y - 1}`)
  ) {
    parents[`${startNode.x}-${startNode.y - 1}`] = "start";
  } else {
  }
  if (
    startNode.x + 1 < Math.floor(screenSize.width / (gridSize + 2)) &&
    !barriers.includes(`${startNode.x + 1}-${startNode.y}`)
  ) {
    parents[`${startNode.x + 1}-${startNode.y}`] = "start";
  }
  if (
    startNode.y + 1 < Math.floor((screenSize.height - 64) / (gridSize + 2)) &&
    !barriers.includes(`${startNode.x}-${startNode.y + 1}`)
  ) {
    parents[`${startNode.x}-${startNode.y + 1}`] = "start";
  }
  if (
    startNode.x - 1 >= 0 &&
    !barriers.includes(`${startNode.x - 1}-${startNode.y}`)
  ) {
    parents[`${startNode.x - 1}-${startNode.y}`] = "start";
  }

  const analyzed: string[] = [];

  //Set the initial value of the node being processed
  //We set it via the findShortestDistance function.
  //From there, we do a while loop which will keep iterating for the shortest node

  let node = findShortestDistanceNode(distances, analyzed);

  while (node) {
    //get the distance of the current node
    let distance = distances[node];

    //Get adjacent nodes of current node
    type Children = {
      [node: string]: number;
    };
    let children: Children = {};

    //get coordinates by destructuring string
    let x = parseInt(node.split("-")[0]);
    let y = parseInt(node.split("-")[1]);

    //top
    if (y - 1 >= 0 && !barriers.includes(`${x}-${y - 1}`)) {
      children[`${x}-${y - 1}`] = 1;
    }
    //right
    if (
      x + 1 < Math.floor(screenSize.width / (gridSize + 2)) &&
      !barriers.includes(`${x + 1}-${y}`)
    ) {
      children[`${x + 1}-${y}`] = 1;
    }
    //bottom
    if (
      y + 1 < Math.floor((screenSize.height - 64) / (gridSize + 2)) &&
      !barriers.includes(`${x}-${y + 1}`)
    ) {
      children[`${x}-${y + 1}`] = 1;
    }
    //left
    if (x - 1 >= 0 && !barriers.includes(`${x - 1}-${y}`)) {
      children[`${x - 1}-${y}`] = 1;
    }

    //loop through each child while calculating the distance to reach that child node. The distance of the node will only be updated if it is the lowest or the only distance

    for (let n in children) {
      let newDistance = distance + children[n];
      if (!distances[n] || distances[n] > newDistance) {
        distances[n] = newDistance;
        parents[n] = node;
      }
    }

    //push analyzed data into the mega list
    analyzed.push(node);

    //keep going until all nodes has been processed
    node = findShortestDistanceNode(distances, analyzed);

    //if endNode is popped from list, end search
    if (
      //top
      (analyzed.includes(`${endNode.x}-${endNode.y - 1}`) ||
        barriers.includes(`${endNode.x}-${endNode.y - 1}`)) &&
      //right
      (analyzed.includes(`${endNode.x + 1}-${endNode.y}`) ||
        barriers.includes(`${endNode.x + 1}-${endNode.y}`)) &&
      //bottom
      (analyzed.includes(`${endNode.x}-${endNode.y + 1}`) ||
        barriers.includes(`${endNode.x}-${endNode.y + 1}`)) &&
      //left
      (analyzed.includes(`${endNode.x - 1}-${endNode.y}`) ||
        barriers.includes(`${endNode.x - 1}-${endNode.y}`))
    ) {
      break;
    }

    // if (node === `${endNode.x}-${endNode.y}`) {
    //   break;
    // }
  }

  //now that we looped through each node and found the shortest distance through each, we can now find the optimal path through a final function that looks through the parent object

  let optimalPath = [`${endNode.x}-${endNode.y}`];
  let parent = parents[`${endNode.x}-${endNode.y}`];

  while (parent) {
    optimalPath.unshift(parent);
    //add parent to start of the optimal path array
    parent = parents[parent];
  }

  // const dijkstrasResult = {
  //   distance: distances[`${endNode.x}-${endNode.y}`],
  //   path: optimalPath,
  // };

  // console.log(dijkstrasResult);

  return { analyzed, optimalPath };
};

export default Dijkstra;
