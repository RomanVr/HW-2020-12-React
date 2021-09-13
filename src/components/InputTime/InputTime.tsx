import React from "react";

interface InputTimeState {
  timeValue: number;
}

export class InputTime extends React.Component<unknown, InputTimeState> {
  // eslint-disable-next-line no-undef
  timerID?: NodeJS.Timeout;

  constructor(props: never) {
    super(props);
    this.state = { timeValue: 0 };
  }

  moment(timeSeconds: number): string {
    function num(val: number) {
      val = Math.floor(val);
      return val < 10 ? "0" + val : val;
    }
    const hours = (timeSeconds / 3600) % 24;
    const minutes = (timeSeconds / 60) % 60;
    const seconds = timeSeconds % 60;
    return `${num(hours)}:${num(minutes)}:${num(seconds)}`;
  }

  componentDidMount(): void {
    this.timerID = setInterval(() => this.tick(), 1000);
  }

  componentWillUnmount(): void {
    clearInterval(Number(this.timerID));
    this.timerID = undefined;
  }

  tick(): void {
    this.setState({
      timeValue: this.state.timeValue + 1,
    });
  }

  render(): React.ReactElement {
    const timeValue = this.moment(this.state.timeValue);
    return (
      <input
        data-testid="inputTime"
        readOnly
        type="text"
        value={timeValue}
        style={{ width: timeValue.length * 7, textAlign: "center" }}
      />
    );
  }
}
