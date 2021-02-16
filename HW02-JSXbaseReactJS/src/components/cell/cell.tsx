import { color } from "@storybook/addon-knobs";
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
      outline: "1px solid black",
      // border: "1px solid black",
      display: "flex",
      textAlign: "center",
      verticalAlign: "middle",
      float: "left",
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
