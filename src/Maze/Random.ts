type coordinates = {
  x: number;
  y: number;
};

export const RandomMaze = (
  startNode: coordinates,
  endNode: coordinates,
  totalRows: number,
  totalColumns: number,
  iterationAmount: number
) => {
  const startNodeId = `${startNode.x}-${startNode.y}`;
  const endNodeId = `${endNode.x}-${endNode.y}`;
  var barriers: string[] = [];
  for (let i = 0; i < iterationAmount; i++) {
    let randomX = Math.round(Math.random() * totalColumns);
    let randomY = Math.round(Math.random() * totalRows);
    let newBarrierNode = `${randomX}-${randomY}`;
    if (
      !barriers.includes(newBarrierNode) &&
      newBarrierNode !== startNodeId &&
      newBarrierNode !== endNodeId
    ) {
      barriers.push(newBarrierNode);
    }
  }
  return { barriers };
};
