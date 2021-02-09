import { Heap } from "heap-js";

type coordinates = {
  x: number;
  y: number;
};

type Weights = {
  node: string;
  size: number;
};

export const BestFirstSearch = async (
  startNode: coordinates,
  endNode: coordinates,
  barriers: string[],
  totalColumns: number,
  totalRows: number,
  type: "astar" | "greedy",
  weights: Weights[]
) => {
  //type of each node that will contain the data we need
  type NodeValue = {
    node: string;
    //f Total Distance to reach from start to end
    priorityScore: number;
    //g distance from start to current node
    distanceFromStart: number;
    //h distance to endNode
    distanceToEnd: number;
    cost: number;
    closed: boolean;
    visited: boolean;
    parent: NodeValue | null;
  };

  //heurisitc to determine distance between nodes
  const manhattanDistanceHeuristic = (
    nodeOne: coordinates,
    nodeTwo: coordinates
  ) => {
    let xChange = Math.abs(nodeTwo.x - nodeOne.x);
    let yChange = Math.abs(nodeTwo.y - nodeOne.y);

    return xChange + yChange;
  };

  //search node in Heap
  const searchHeap = (nodeId: string) => {
    return graphMap.find((nodeValue) => nodeValue.node === nodeId);
  };

  //find weight of node from weights
  const findWeight = (node: string) => {
    let weightIndex = weights.findIndex(
      (weightedNode) => weightedNode.node === node
    );
    let weight = weightIndex >= 0 ? weights[weightIndex].size : 1;

    return weight;
  };

  //get neighbors of a node
  const getNeighbors = (node: string) => {
    let returnValue: NodeValue[] = [];
    let nodeX = parseInt(node.split("-")[0]);
    let nodeY = parseInt(node.split("-")[1]);

    let up = `${nodeX}-${nodeY - 1}`;
    let right = `${nodeX + 1}-${nodeY}`;
    let bottom = `${nodeX}-${nodeY + 1}`;
    let left = `${nodeX - 1}-${nodeY}`;

    if (!barriers.includes(up) && nodeY - 1 >= 0) {
      //@ts-ignore
      let upNeighbor = searchHeap(up);
      if (upNeighbor) {
        returnValue.push(upNeighbor);
      }
    }

    if (!barriers.includes(right) && nodeX + 1 < totalColumns) {
      //@ts-ignore
      let rightNeighbor = searchHeap(right);
      if (rightNeighbor) {
        returnValue.push(rightNeighbor);
      }
    }

    if (!barriers.includes(bottom) && nodeY + 1 < totalRows) {
      //@ts-ignore
      let bottomNeighbor = searchHeap(bottom);
      if (bottomNeighbor) {
        returnValue.push(bottomNeighbor);
      }
    }
    if (!barriers.includes(left) && nodeX - 1 >= 0) {
      //@ts-ignore
      let leftNeighbor = searchHeap(left);
      if (leftNeighbor) {
        returnValue.push(leftNeighbor);
      }
    }

    return returnValue;
  };

  //create a priority min heap for a more optimized algorithm
  const customComparator = (a: NodeValue, b: NodeValue) =>
    a.priorityScore - b.priorityScore;
  const priorityHeap = new Heap(customComparator);

  let graphMap: NodeValue[] = [];

  //initialize graph array
  for (let row = 0; row < totalRows; row++) {
    for (let col = 0; col < totalColumns; col++) {
      if (!barriers.includes(`${col}-${row}`)) {
        graphMap.push({
          node: `${col}-${row}`,
          priorityScore: Infinity,
          distanceFromStart: Infinity,
          distanceToEnd: Infinity,
          cost: findWeight(`${col}-${row}`),
          visited: false,
          closed: false,
          parent: null,
        });
      }
    }
  }

  let start = {
    node: `${startNode.x}-${startNode.y}`,
    priorityScore: manhattanDistanceHeuristic(startNode, endNode),
    distanceFromStart: 0,
    distanceToEnd: manhattanDistanceHeuristic(startNode, endNode),
    cost: 0,
    visited: false,
    closed: false,
    parent: null,
  };

  //return value needed for visualization
  let optimalPath: string[] = [`${endNode.x}-${endNode.y}`];
  let analyzed: string[] = [];
  let distance: number = 0;

  // initialize priority heap with startnode
  priorityHeap.add(start);

  //loop through grid prioritizing the closest node first
  while (priorityHeap.size() > 0) {
    // Grab the lowest f(x) to process next.  Heap keeps this sorted for us.
    let currentNode = priorityHeap.pop();

    if (
      currentNode?.node !== `${startNode.x}-${startNode.y}` &&
      currentNode?.node !== `${endNode.x}-${endNode.y}`
    ) {
      //@ts-ignore
      analyzed.push(currentNode?.node);
    }

    //end case --> A Star is Born
    if (currentNode?.node === `${endNode.x}-${endNode.y}`) {
      let current = currentNode;
      distance = current.distanceFromStart - 1;
      let returnValue = [];
      //trace back to start node by looking at parents
      while (current.parent) {
        returnValue.push(current.node);
        current = current.parent;
      }

      optimalPath = returnValue.reverse();

      return {
        analyzed,
        optimalPath,
        distance: distance !== 0 ? distance : Infinity,
      };
    }

    //Normal case -- move currentNode from open to closed and process its neighbors

    //@ts-ignore
    currentNode.closed = true;

    //find all neighbors for the current Node.
    //@ts-ignore
    const neighbors = getNeighbors(currentNode.node);

    for (let i = 0; i < neighbors.length; i++) {
      let neighbor = neighbors[i];

      if (neighbor.closed) {
        continue;
      }

      //g score is the shortest distance from start to current
      //check if the path to this neighbor is the shortest one yet
      //@ts-ignore
      let gScore = currentNode?.distanceFromStart + neighbor.cost;
      let beenVisited = neighbor.visited;
      let neighborCoordinates = {
        x: parseInt(neighbor.node.split("-")[0]),
        y: parseInt(neighbor.node.split("-")[1]),
      };

      //@ts-ignore
      if (!beenVisited || gScore < neighbor.distanceFromStart) {
        //found a better path. Record the path for future iterations
        neighbor.visited = true;
        //@ts-ignore
        neighbor.parent = currentNode;
        neighbor.distanceToEnd =
          neighbor.distanceToEnd === Infinity
            ? manhattanDistanceHeuristic(neighborCoordinates, endNode)
            : neighbor.distanceToEnd;
        //@ts-ignore
        neighbor.distanceFromStart = gScore;
        neighbor.priorityScore =
          type === "astar"
            ? gScore + neighbor.distanceToEnd
            : neighbor.distanceToEnd + neighbor.cost;

        if (!beenVisited) {
          //pushing to heap will put it in its proper place
          priorityHeap.add(neighbor);
        } else {
          //already seen the node but since it is recorded again, we add abck to heap
          priorityHeap.remove(neighbor);
          priorityHeap.add(neighbor);
        }
      }
    }
  }

  return {
    analyzed,
    optimalPath,
    distance: distance !== 0 ? distance : Infinity,
  };
};
