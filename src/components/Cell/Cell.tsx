import React from "react";
import { CellItem } from "./CellItem";

export interface CellProps {
  coordX: number;
  coordY: number;
  onClick: (x: number, y: number) => void;
  isLive: boolean;
  "data-testid"?: string;
}

export const Cell: React.FC<CellProps> = ({
  coordX,
  coordY,
  onClick,
  isLive,
}) => (
  <CellItem
    isLive={isLive}
    data-testid="items-field-item"
    onClick={() => onClick(coordX, coordY)}
  ></CellItem>
);
