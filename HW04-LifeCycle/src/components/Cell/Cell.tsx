import React from "react";

export interface CellProps {
  dataKey: number;
  handleClick: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
}

const stylesCell = {
  background: "yellow",
  width: "30px",
  height: "30px",
  border: "1px solid black",
  borderRadius: "5px",
  display: "table-cell",
};

export const Cell: React.FC<CellProps> = ({ dataKey, handleClick }) => (
  <div
    data-testid="items-field-item"
    data-key={dataKey}
    style={stylesCell}
    onClick={handleClick}
  ></div>
);
