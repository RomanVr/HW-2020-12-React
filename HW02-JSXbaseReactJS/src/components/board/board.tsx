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

  render(): ReactElement {
    const { size } = this.state;
    const board: Array<ReactNode> = new Array(size);
    let i = 0;
    while (i < size) {
      board.push(<Cell key={i}>{i}</Cell>);
      i += 1;
    }
    return <div>{board}</div>;
  }
}
