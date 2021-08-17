import React from "react";

interface InputTimeProps {
  timeValue: string;
}

interface InputTimeState {
  timeValue: string;
}

export class InputTime extends React.Component<InputTimeProps, InputTimeState> {
  // eslint-disable-next-line no-undef
  timerID?: NodeJS.Timeout;

  constructor(props: InputTimeProps) {
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
    return <input readOnly type="text" value={this.state.timeValue} />;
  }
}
