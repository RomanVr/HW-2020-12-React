import React, { ReactNode } from "react";

import { Cell } from "../Cell/Cell";

export type CellType = "live" | "dead";

export interface FieldProps {
  sizeX: number;
  sizeY: number;
}

export class Field extends React.Component<FieldProps, unknown> {
  constructor(props: FieldProps) {
    super(props);
    this.state = {
      fieldData: this.generateDataField(props.sizeX, props.sizeY),
    }
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(x: number, y: number): void {
    console.log(`data-key: ${x},  ${y}`);
  }

  generateDataField(sizeX: number, sizeY: number): number[][] {
    return new Array(sizeX).fill(null).map(() => new Array(sizeY).fill(0));
  }

  initField(size: number): Array<ReactNode> {
    const field: Array<ReactNode> = new Array(size);
    let i = 0;
    while (i < size) {
      const rowOfField: Array<ReactNode> = new Array(size);
      let j = 0;
      while (j < size) {
        const key = j + i * size;
        rowOfField.push(
          <Cell
            key={key}
            getCoordsClick={this.handleClick}
            coordX={i}
            coordY={j}
            live={}
          >
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

  render(): React.ReactElement {
    const field: Array<ReactNode> = this.initField(this.props.start);

    return <div style={{ display: "table" }}>{field}</div>;
  }
}
