import React, { ReactNode } from "react";

import { Cell } from "../Cell/Cell";

export interface FieldProps {
  start?: number;
}

export const Field: React.FC<FieldProps> = ({ start = 10 }) => {
  const handleClick = (x: number, y: number): void => {
    console.log(`data-key: ${x},  ${y}`);
  };

  const initField = (size: number): Array<ReactNode> => {
    const field: Array<ReactNode> = new Array(size);
    let i = 0;
    while (i < size) {
      const rowOfField: Array<ReactNode> = new Array(size);
      let j = 0;
      while (j < size) {
        const key = j + i * size;
        rowOfField.push(
          <Cell key={key} getCoordsClick={handleClick} coordX={i} coordY={j}>
            {key}
          </Cell>
        );
        j += 1;
      }
      field.push(
        <div key={i} style={{ display: "table-row" }}>
          {rowOfField}
        </div>
      );
      i += 1;
    }
    return field;
  };

  const field: Array<ReactNode> = initField(start);

  return <div style={{ display: "table" }}>{field}</div>;
};
