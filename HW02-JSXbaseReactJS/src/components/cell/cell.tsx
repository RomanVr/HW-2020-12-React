import React from "react";

interface Prop {
  children: number;
}

export const Cell: React.FC<Prop> = ({ children }) => (
  <div
    style={{
      background: "yellow",
      width: "50px",
      height: "50px",
      // outline: "1px solid black",
      border: "1px solid black",
      borderRadius: "5px",
      display: "table-cell",
      textAlign: "center",
      verticalAlign: "middle",
    }}
  >
    <span
      style={{
        margin: "auto",
      }}
    >
      {children}
    </span>
  </div>
);
