import React, { ReactNode } from "react";

import { Cell } from "../Cell/Cell";

export type CellType = "live" | "dead";

export interface FieldProps {
  sizeX: number;
  sizeY: number;
}

interface FieldState {
  fieldData: number[][];
}

export class Field extends React.Component<FieldProps, FieldState> {
  constructor(props: FieldProps) {
    super(props);

    this.state = {
      fieldData: this.generateDataField(props.sizeX, props.sizeY),
    };

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(x: number, y: number): void {
    console.log(`data-key: ${x},  ${y}`);
    console.log(`array fieldData[x][y] : ${this.state.fieldData[x][y]}`);
    const newFieldData = new Array(this.props.sizeY)
      .fill(null)
      .map((itemRow, indexRow) => [...this.state.fieldData[indexRow]]);
    newFieldData[x][y] = this.state.fieldData[x][y] ? 0 : 1;
    this.setState({ fieldData: newFieldData });
  }

  generateDataField(sizeX: number, sizeY: number): number[][] {
    return new Array(sizeX).fill(null).map(() => new Array(sizeY).fill(0));
  }

  initField(sizeX: number, sizeY: number): Array<ReactNode> {
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
            onClick={this.handleClick}
            coordX={i}
            coordY={j}
            isLive={Boolean(this.state.fieldData[i][j])}
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
  }

  render(): React.ReactElement {
    const field: Array<ReactNode> = this.initField(
      this.props.sizeX,
      this.props.sizeY
    );

    return <div style={{ display: "table" }}>{field}</div>;
  }
}
