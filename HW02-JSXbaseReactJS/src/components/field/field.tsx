import React, { ReactNode } from "react";

import { Cell } from "../cell/cell";

interface FieldProp {
  start?: number;
}

export const Field: React.FC<FieldProp> = ({ start = 10 }) => {
  const handleClick = (e: React.MouseEvent): void => {
    const target = e.target as HTMLDivElement;
    console.log(`data-key: ${target.dataset.key}`);
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
          <Cell key={key} handleClick={handleClick} dataKey={key}>
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
