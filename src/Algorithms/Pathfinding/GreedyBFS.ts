import { BestFirstSearch } from "./BestFirstSearch";

type coordinates = {
  x: number;
  y: number;
};

export const GreedyBFS = (
  startNode: coordinates,
  endNode: coordinates,
  barriers: string[],
  totalColumns: number,
  totalRows: number,
  type: "greedy"
) => {
  return BestFirstSearch(startNode, endNode, barriers, totalColumns, totalRows, type);
};
