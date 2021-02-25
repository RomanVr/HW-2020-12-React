import React, { Component, ReactElement, ReactNode } from "react";

import { Cell } from "../cell/cell";

interface Prop {
  start?: number;
}

interface State {
  size: number;
}

export class Field extends Component<Prop, State> {
  constructor(props: Prop) {
    super(props);
    this.state = {
      size: props.start || 1,
    };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(e: React.MouseEvent): void {
    const target = e.target as HTMLDivElement;
    console.log(`data-key: ${target.dataset.key}`);
  }

  initField(size: number): Array<ReactNode> {
    const field: Array<ReactNode> = new Array(size);
    let i = 0;
    while (i < size) {
      const rowOfField: Array<ReactNode> = new Array(size);
      let j = 0;
      while (j < size) {
        rowOfField.push(
          <Cell handleClick={this.handleClick} dataKey={i * 10 + j}>
            {i * 10 + j}
          </Cell>
        );
        j += 1;
      }
      field.push(<div style={{ display: "table-row" }}>{rowOfField}</div>);
      i += 1;
    }
    return field;
  }

  render(): ReactElement {
    const { size } = this.state;
    const field: Array<ReactNode> = this.initField(size);
    return <div style={{ display: "table" }}>{field}</div>;
  }
}
