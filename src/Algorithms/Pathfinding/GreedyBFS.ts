import { BestFirstSearch } from "./BestFirstSearch";

type coordinates = {
  x: number;
  y: number;
};

type Weights = {
  node: string;
  size: number;
};

export const GreedyBFS = (
  startNode: coordinates,
  endNode: coordinates,
  barriers: string[],
  totalColumns: number,
  totalRows: number,
  type: "greedy",
  weights: Weights[]
) => {
  return BestFirstSearch(startNode, endNode, barriers, totalColumns, totalRows, type, weights);
};
