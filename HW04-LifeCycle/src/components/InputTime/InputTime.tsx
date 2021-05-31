import React from "react";

interface InputTimeProps {
  handleChangeTime: (e: React.ChangeEvent<HTMLInputElement>) => void;
  timeValue: string;
}

interface InputTimeState {
  timeValue: string;
}

export default class InputTime extends React.Component<
  InputTimeProps,
  InputTimeState
> {
  // eslint-disable-next-line no-undef
  timerID?: NodeJS.Timeout;

  constructor(props: InputTimeProps) {
    super(props);
    this.state = { timeValue: new Date().toLocaleTimeString() };
  }

  componentDidMount(): void {
    console.log("DidMout!");
    this.timerID = setInterval(() => this.tick(), 1000);
  }

  componentWillUnmount(): void {
    console.log("WillUnmout!");
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
        readOnly
        type="text"
        value={this.state.timeValue}
        onChange={this.props.handleChangeTime}
      />
    );
  }
}
