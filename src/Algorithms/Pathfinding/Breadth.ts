import { UninformedAlgorithm } from "./Uninformed";

type coordinates = {
  x: number;
  y: number;
};

export const Breadth = (
  startNode: coordinates,
  endNode: coordinates,
  barriers: string[],
  type: "breadth",
  totalRows: number,
  totalColumns: number
) => {
  return UninformedAlgorithm(
    startNode,
    endNode,
    barriers,
    type,
    totalRows,
    totalColumns
  );
};
