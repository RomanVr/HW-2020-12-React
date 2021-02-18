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
  }

  componentDidMount(): void {
    console.log("Board: componentDidMount");
  }

  initBoard(size: number): Array<ReactNode> {
    const board: Array<ReactNode> = new Array(size);
    let i = 0;
    while (i < size) {
      const rowOfBoard: Array<ReactNode> = new Array(size);
      let j = 0;
      while (j < size) {
        rowOfBoard.push(<Cell key={i + j}>{i + j}</Cell>);
        j += 1;
      }
      board.push(<div style={{ float: "none" }}>{rowOfBoard}</div>);
      i += 1;
    }

    return board;
  }

  render(): ReactElement {
    const { size } = this.state;
    const board: Array<ReactNode> = this.initBoard(size);
    return <div>{board}</div>;
  }
}
