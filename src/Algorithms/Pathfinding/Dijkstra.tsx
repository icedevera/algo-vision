type coordinates = {
  x: number;
  y: number;
};

interface IProps {
  startNode: coordinates;
  endNode: coordinates;
  setAnalyzedNodes: React.Dispatch<any>;
  setShortestPath: React.Dispatch<any>;
}

const Dijkstra = ({
  startNode,
  endNode,
  setAnalyzedNodes,
  setShortestPath,
}: IProps) => {
  return null;
};

export default Dijkstra;
