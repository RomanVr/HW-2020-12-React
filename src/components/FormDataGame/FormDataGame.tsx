import React from "react";
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
      sizeX: "20",
      sizeY: "30",
      timeValue: "now",
      isTime: false,
      buttonValue: "Show it Time!",
    };

    // this.handleChangeSize = this.handleChangeSize.bind(this);
    this.getHandleFormChange = this.getHandleFormChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
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

  render(): React.ReactElement {
    if (isNaN(Number(this.state.sizeX))) {
      throw new Error("Size must be a number!");
    }
    return (
      <>
        <form onSubmit={this.handleSubmit} style={{ display: "inline-block" }}>
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
