import React from "react";

interface Prop {
  dataKey: string;
  handleClick: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
}

export const Cell: React.FC<Prop> = ({ dataKey, handleClick }) => (
  <div
    data-key={dataKey}
    style={{
      background: "yellow",
      width: "30px",
      height: "30px",
      border: "1px solid black",
      borderRadius: "5px",
      display: "table-cell",
    }}
    onClick={handleClick}
  ></div>
);
