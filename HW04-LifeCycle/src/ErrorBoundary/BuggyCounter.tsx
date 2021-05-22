import React from "react";

interface StateBuggyCounter {
  counter: number;
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface PropsBuggyCounter {}

export default class BuggyCounter extends React.Component<
  PropsBuggyCounter,
  StateBuggyCounter
> {
  constructor(props: PropsBuggyCounter) {
    super(props);
    this.state = { counter: 0 };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(): void {
    this.setState(({ counter }) => ({
      counter: counter + 1,
    }));
  }

  render(): React.ReactNode {
    if (this.state.counter === 5) {
      //Simulate a JS error
      throw new Error("I crashed!");
    }

    return <h1 onClick={this.handleClick}>{this.state.counter}</h1>;
  }
}
