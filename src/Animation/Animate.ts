type coordinates = {
  x: number;
  y: number;
};

//now for the fun part
//handle animation & visualization of the pathfinding algorithm!
export const animateAlgorithm = (
  analyze: string[],
  optimalPath: string[],
  animationSpeed: number,
  startNode: coordinates,
  endNode: coordinates,
  setIsAnalyzing: React.Dispatch<any>
) => {
  for (let i = 0; i <= analyze.length; i++) {
    if (i === analyze.length) {
      setTimeout(() => {
        animateShortestPath(
          optimalPath,
          animationSpeed,
          startNode,
          endNode,
          setIsAnalyzing
        );
      }, animationSpeed * i);
      return;
    }
    setTimeout(() => {
      const node = analyze[i];
      if (
        document.getElementById(node) &&
        node !== `${startNode.x}-${startNode.y}` &&
        node !== `${endNode.x}-${endNode.y}`
      ) {
        //@ts-ignore
        document.getElementById(node).className = "cell-node analyzing";
      }
    }, animationSpeed * i);
  }
  return true;
};

export const animateShortestPath = (
  optimalPath: string[],
  animationSpeed: number,
  startNode: coordinates,
  endNode: coordinates,
  setIsAnalyzing: React.Dispatch<any>
) => {
  for (let i = 0; i < optimalPath.length; i++) {
    setTimeout(() => {
      const node = optimalPath[i];
      if (
        document.getElementById(node) &&
        node !== `${startNode.x}-${startNode.y}` &&
        node !== `${endNode.x}-${endNode.y}`
      ) {
        //@ts-ignore
        document.getElementById(node).className = "cell-node shortest-path";
      }
      if (i === optimalPath.length - 1) {
        setIsAnalyzing(false);
      }
    }, animationSpeed * i);
  }
};

export const showAlgorithm = (
  analyze: string[],
  startNode: coordinates,
  endNode: coordinates
) => {
  for (let i = 0; i <= analyze.length; i++) {
    const node = analyze[i];
    if (
      document.getElementById(node) &&
      node !== `${startNode.x}-${startNode.y}` &&
      node !== `${endNode.x}-${endNode.y}`
    ) {
      //@ts-ignore
      document.getElementById(node).className = "cell-node analyzing";
    }
  }
};

export const showShortestPath = (
  optimalPath: string[],
  startNode: coordinates,
  endNode: coordinates
) => {
  for (let i = 0; i < optimalPath.length; i++) {
    const node = optimalPath[i];
    if (
      document.getElementById(node) &&
      node !== `${startNode.x}-${startNode.y}` &&
      node !== `${endNode.x}-${endNode.y}`
    ) {
      //@ts-ignore
      document.getElementById(node).className = "cell-node shortest-path";
    }
  }
};

export const animateMaze = (
  mazeBarriers: string[],
  setBarriers: React.Dispatch<any>,
  animationSpeed: number,
  setIsAnalyzing: React.Dispatch<any>
) => {
  for (let i = 0; i < mazeBarriers.length; i++) {
    setTimeout(() => {
      const node = mazeBarriers[i];
      if (document.getElementById(node)) {
        //@ts-ignore
        document.getElementById(node).className =
          "cell-node barrier-node animation";
      }
      if (i === mazeBarriers.length - 1) {
        setBarriers(mazeBarriers);
        setIsAnalyzing(false);
      }
    }, animationSpeed * 2 * i);
  }
};

export const animateRandomWeightMaze = (
  weights: string[],
  setWeights: React.Dispatch<any>,
  weightSize: number,
  animationSpeed: number,
  setIsAnalyzing: React.Dispatch<any>
) => {
  type Weight = {
    node: string;
    size: number;
  };

  for (let i = 0; i < weights.length; i++) {
    setTimeout(() => {
      const node = weights[i];
      setWeights((prev: Weight[]) => [
        ...prev,
        {
          node: node,
          size: weightSize,
        },
      ]);

      if (i === weights.length - 1) {
        setIsAnalyzing(false);
      }
    }, animationSpeed / 2);
  }
};
