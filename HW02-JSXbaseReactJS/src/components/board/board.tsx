import React, { Component, ReactElement, ReactNode } from "react";

import { Cell } from "../cell/cell";

interface Prop {
  start?: number;
}

interface State {
  size: number;
}

export class Board extends Component<Prop, State> {
  constructor(props: Prop) {
    super(props);
    this.state = {
      size: props.start || 0,
    };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(e: React.MouseEvent): void {
    const target = e.target as HTMLDivElement;
    console.log(target.dataset.key);
  }

  initBoard(size: number): Array<ReactNode> {
    const board: Array<ReactNode> = new Array(size);
    let i = 0;
    while (i < size) {
      const rowOfBoard: Array<ReactNode> = new Array(size);
      let j = 0;
      while (j < size) {
        rowOfBoard.push(
          <Cell
            handleClick={this.handleClick}
            dataKey={(i * 10 + j).toString()}
          >
            {i * 10 + j}
          </Cell>
        );
        j += 1;
      }
      board.push(<div style={{ display: "table-row" }}>{rowOfBoard}</div>);
      i += 1;
    }

    return board;
  }

  render(): ReactElement {
    const { size } = this.state;
    const board: Array<ReactNode> = this.initBoard(size);
    return (
      <div
        style={{
          display: "table",
        }}
      >
        {board}
      </div>
    );
  }
}
