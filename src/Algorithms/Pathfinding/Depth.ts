import { UninformedAlgorithm } from "./Uninformed";

type coordinates = {
  x: number;
  y: number;
};

export const Depth = (
  startNode: coordinates,
  endNode: coordinates,
  barriers: string[],
  type: "depth",
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
