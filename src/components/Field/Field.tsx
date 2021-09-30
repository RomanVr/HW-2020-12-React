import React, { ReactNode } from "react";

import { Cell } from "@/components";

export type CellType = "live" | "dead";

export interface FieldProps {
  fieldData: number[][];
  handleClickOnCell: (x: number, y: number) => void;
}

export const Field: React.FC<FieldProps> = ({
  fieldData,
  handleClickOnCell,
}) => {
  const initField = (
    fieldData: number[][],
    handleClickOnCell: (x: number, y: number) => void
  ): Array<ReactNode> => {
    const sizeX: number = fieldData.length;
    const sizeY: number = fieldData[0].length;
    const field: Array<ReactNode> = new Array(sizeX);
    let i = 0;
    while (i < sizeX) {
      const rowOfField: Array<ReactNode> = new Array(sizeY);
      let j = 0;
      while (j < sizeY) {
        const key = j + i * sizeX;
        rowOfField.push(
          <Cell
            key={key}
            onClick={handleClickOnCell}
            coordX={i}
            coordY={j}
            isLive={Boolean(fieldData[i][j])}
          >
            {key}
          </Cell>
        );
        j += 1;
      }
      field.push(
        <div key={i} style={{ display: "flex" }}>
          {rowOfField}
        </div>
      );
      i += 1;
    }
    return field;
  };

  const field: Array<ReactNode> = initField(fieldData, handleClickOnCell);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        borderCollapse: "collapse",
        borderSpacing: 0,
        width: "100%",
        tableLayout: "fixed",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {field}
    </div>
  );
};
