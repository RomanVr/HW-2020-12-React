import React from "react";
import { ButtonValue } from "../";
import { InputTime } from "../";
import { ButtonSubmit } from "../ButtonSubmit/ButtonSubmit";
import { InputMultiInForm } from "./InputMultiInForm";

export interface FormDataGameState {
  sizeX: string;
  sizeY: string;
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
      sizeX: "10",
      sizeY: "20",
      timeValue: "now",
      isTime: false,
      buttonValue: "Show it Time!",
    };

    // this.handleChangeSize = this.handleChangeSize.bind(this);
    this.getHandleFormChange = this.getHandleFormChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

    this.handleClick = this.handleClick.bind(this);
  }

  handleSubmit(event: React.FormEvent): void {
    event.preventDefault();
    const sizeX = Number(this.state.sizeX);
    const sizeY = Number(this.state.sizeY);
    this.props.onSubmit(sizeX, sizeY);
  }

  getHandleFormChange =
    (inputProp: keyof Pick<FormDataGameState, "sizeX" | "sizeY">) =>
    (ev: React.ChangeEvent<HTMLInputElement>): void => {
      this.setState({ [inputProp]: ev.target.value } as never);
    };

  handleClick(): void {
    const newButtonValue = this.state.isTime ? "Show it Time!" : "Down";
    this.setState({ isTime: !this.state.isTime, buttonValue: newButtonValue });
  }

  render(): React.ReactElement {
    let inputTimeVar: React.ReactElement = <></>;
    if (this.state.isTime) {
      inputTimeVar = <InputTime />;
    }
    if (isNaN(Number(this.state.sizeX))) {
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
          {[
            {
              sizeState: this.state.sizeX,
              onChange: this.getHandleFormChange("sizeX"),
              placeHolder: "Значение по горизонтали",
              label: "X: ",
            },
            {
              sizeState: this.state.sizeY,
              onChange: this.getHandleFormChange("sizeY"),
              placeHolder: "Значение по вертикали",
              label: "Y: ",
            },
          ].map((propsItem) => (
            <InputMultiInForm
              key={propsItem.label}
              sizeState={propsItem.sizeState}
              onChange={propsItem.onChange}
              placeHolder={propsItem.placeHolder}
              label={propsItem.label}
            />
          ))}
          <ButtonSubmit />
          {this.props.errorInfoElem}
        </form>
      </>
    );
  }
}
