import React from "react";
import { ButtonValue } from "../";
import { InputSize } from "../";
import { InputTime } from "../";

const stylesSubmit = {
  background: "white",
  border: "1px solid grey",
  borderRadius: "5px",
  width: "50px",
  height: "34px",
};

interface FormDataGameState {
  size: string;
  timeValue: string;
  isTime: boolean;
  buttonValue: string;
}

export interface FormDataGameProps {
  onSubmit: (sizeX: number, sizeY: number) => void;
  errorInfoElem: React.ReactElement;
}

export class FormDataGame extends React.Component<
  FormDataGameProps,
  FormDataGameState
> {
  // eslint-disable-next-line no-undef
  timerID?: NodeJS.Timeout;

  constructor(props: FormDataGameProps) {
    super(props);
    this.state = {
      size: "10",
      timeValue: "now",
      isTime: false,
      buttonValue: "Show it Time!",
    };

    this.handleChangeSize = this.handleChangeSize.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

    this.handleClick = this.handleClick.bind(this);
  }

  handleSubmit(event: React.FormEvent): void {
    event.preventDefault();
    const size = Number(this.state.size);
    this.props.onSubmit(size, size);
  }

  handleChangeSize(event: React.ChangeEvent<HTMLInputElement>): void {
    this.setState({ size: event.target.value });
  }

  handleClick(): void {
    const newButtonValue = this.state.isTime ? "Show it Time!" : "Down";
    this.setState({ isTime: !this.state.isTime, buttonValue: newButtonValue });
  }

  render(): React.ReactElement {
    let inputTimeVar: React.ReactElement = <></>;
    if (this.state.isTime) {
      inputTimeVar = <InputTime />;
    }
    if (isNaN(Number(this.state.size))) {
      throw new Error("Size must be a number!");
    }
    return (
      <>
        {inputTimeVar}
        <ButtonValue
          value={this.state.buttonValue}
          handleClick={this.handleClick}
        />
        <form onSubmit={this.handleSubmit}>
          <InputSize
            size={this.state.size}
            handleChangeSize={this.handleChangeSize}
          ></InputSize>
          <input style={stylesSubmit} type="submit" value="Ok" />
          {this.props.errorInfoElem}
        </form>
      </>
    );
  }
}
