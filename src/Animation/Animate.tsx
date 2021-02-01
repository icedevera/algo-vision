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
