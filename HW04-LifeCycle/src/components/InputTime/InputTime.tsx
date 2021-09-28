import React from "react";

interface InputTimeState {
  timeValue: string;
}

export class InputTime extends React.Component<unknown, InputTimeState> {
  // eslint-disable-next-line no-undef
  timerID?: NodeJS.Timeout;

  constructor(props: never) {
    super(props);
    this.state = { timeValue: new Date().toLocaleTimeString() };
  }

  componentDidMount(): void {
    this.timerID = setInterval(() => this.tick(), 1000);
  }

  componentWillUnmount(): void {
    if (this.timerID) {
      clearInterval(this.timerID);
      this.timerID = undefined;
    }
  }

  tick(): void {
    this.setState({
      timeValue: new Date().toLocaleTimeString(),
    });
  }

  render(): React.ReactElement {
    return (
      <input
        data-testid="inputTime"
        readOnly
        type="text"
        value={this.state.timeValue}
      />
    );
  }
}
